import { useState, useEffect, useMemo } from "react";
import * as Plotly from "plotly.js-dist-min";

// Types
interface FinalResult {
  dice: number;
  hd95: number;
  clDice: number;
  components: number;
}

interface ArchitectureData {
  name: string;
  dice: number;
  iou: number;
  hd95: number;
  params: number;
}

interface AblationData {
  name: string;
  dice: number;
  clDice: number;
  betti: number;
  juncF1: number;
  components: number;
}

interface CrossDatasetData {
  name: string;
  dice: number;
  hd95: number;
  clDice: number;
  betti: number;
  juncF1: number;
}

type VesselType = "combined" | "artery" | "vein";
type SortDirection = "asc" | "desc";

interface SortConfig {
  key: string | null;
  direction: SortDirection;
}

// Data constants
const FINAL_RESULTS: Record<VesselType, FinalResult> = {
  combined: { dice: 90.97, hd95: 3.5, clDice: 85.55, components: 25.3 },
  artery: { dice: 85.75, hd95: 21.22, clDice: 79.07, components: 23.3 },
  vein: { dice: 87.63, hd95: 14.59, clDice: 81.46, components: 26.1 },
};

const ARCHITECTURE_COMPARISON: ArchitectureData[] = [
  { name: "U-Net", dice: 77.1, iou: 62.86, hd95: 12.45, params: 31.0 },
  { name: "Attention U-Net", dice: 89.75, iou: 81.45, hd95: 4.6, params: 34.9 },
  { name: "U-Net++", dice: 89.89, iou: 81.69, hd95: 4.27, params: 36.6 },
  {
    name: "U-Net++ w/ Attn (Baseline)",
    dice: 91.0,
    iou: 83.52,
    hd95: 3.59,
    params: 39.2,
  },
  { name: "TFFM (Final)", dice: 90.97, iou: 85.55, hd95: 3.5, params: 42.1 },
];

const ABLATION_STUDY: AblationData[] = [
  {
    name: "Baseline",
    dice: 90.15,
    clDice: 84.54,
    betti: 43.0,
    juncF1: 63.64,
    components: 45.2,
  },
  {
    name: "+ TFFM",
    dice: 90.47,
    clDice: 85.05,
    betti: 26.0,
    juncF1: 65.44,
    components: 32.1,
  },
  {
    name: "+ clDice Loss",
    dice: 90.95,
    clDice: 85.3,
    betti: 24.5,
    juncF1: 66.2,
    components: 28.4,
  },
  {
    name: "Full (+ Augmentation)",
    dice: 90.97,
    clDice: 85.55,
    betti: 25.3,
    juncF1: 66.5,
    components: 25.3,
  },
];

const CROSS_DATASET: CrossDatasetData[] = [
  {
    name: "Fundus-AVSeg",
    dice: 90.97,
    hd95: 3.5,
    clDice: 85.55,
    betti: 25.3,
    juncF1: 66.5,
  },
  {
    name: "DRIVE",
    dice: 82.1,
    hd95: 10.2,
    clDice: 70.67,
    betti: 24.2,
    juncF1: 30.63,
  },
  {
    name: "CHASEDB1",
    dice: 80.61,
    hd95: 12.77,
    clDice: 68.71,
    betti: 50.5,
    juncF1: 41.42,
  },
  {
    name: "HRF",
    dice: 79.94,
    hd95: 12.67,
    clDice: 73.01,
    betti: 33.0,
    juncF1: 55.1,
  },
  {
    name: "RETA",
    dice: 82.18,
    hd95: 15.31,
    clDice: 73.57,
    betti: 34.57,
    juncF1: 51.34,
  },
  {
    name: "STARE",
    dice: 80.7,
    hd95: 33.25,
    clDice: 70.98,
    betti: 41.55,
    juncF1: 43.34,
  },
];

// Component 1: Final Results Section
const FinalResultsSection = () => {
  const [activeTab, setActiveTab] = useState<VesselType>("combined");

  const metrics = [
    {
      key: "dice" as const,
      label: "Dice Score",
      desc: "Pixel overlap accuracy",
    },
    { key: "clDice" as const, label: "clDice", desc: "Skeleton similarity" },
    { key: "hd95" as const, label: "HD95", desc: "95th percentile distance" },
    {
      key: "components" as const,
      label: "Components",
      desc: "Disconnected segments",
    },
  ];

  const getMetricSuffix = (key: keyof FinalResult): string => {
    if (key === "hd95") return "px";
    if (key === "components") return "";
    return "%";
  };

  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-semibold tracking-tight">
          Model's Performance
        </h2>

        <div className="bg-white rounded border border-neutral-300 shadow-sm p-6">
          <div className="flex justify-center mb-8 gap-2 flex-wrap">
            {(["combined", "artery", "vein"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded font-medium text-sm transition ${
                  activeTab === tab
                    ? "bg-neutral-800 text-white"
                    : "bg-neutral-100 text-neutral-700 border border-neutral-300 hover:bg-neutral-100"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric) => (
              <div
                key={metric.key}
                className="bg-neutral-100 rounded border border-neutral-300 p-4 text-center"
              >
                <div className="text-3xl font-bold text-neutral-800 mb-1">
                  {FINAL_RESULTS[activeTab][metric.key]}
                  {getMetricSuffix(metric.key)}
                </div>
                <div className="text-sm font-medium text-neutral-700 mb-1">
                  {metric.label}
                </div>
                <div className="text-xs text-neutral-600">{metric.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Component 2: Analytics Dashboard
const AnalyticsDashboard = () => {
  const [plotView, setPlotView] = useState<string>("comparison");

  useEffect(() => {
    const createPlot = () => {
      try {
        if (plotView === "comparison") {
          createArchitectureComparisonPlot();
        } else if (plotView === "ablation") {
          createAblationPlot();
        } else if (plotView === "radar") {
          createRadarPlot();
        } else if (plotView === "parallel") {
          createParallelCoordinatesPlot();
        }
      } catch (error) {
        console.error("Error creating plot:", error);
      }
    };

    createPlot();
  }, [plotView]);

  const createArchitectureComparisonPlot = () => {
    const trace1: Partial<Plotly.PlotData> = {
      x: ARCHITECTURE_COMPARISON.map((d) => d.name),
      y: ARCHITECTURE_COMPARISON.map((d) => d.dice),
      type: "bar",
      name: "Dice Score",
      marker: { color: "#22d3ee" },
    };

    const trace2: Partial<Plotly.PlotData> = {
      x: ARCHITECTURE_COMPARISON.map((d) => d.name),
      y: ARCHITECTURE_COMPARISON.map((d) => d.iou),
      type: "bar",
      name: "IoU",
      marker: { color: "#a78bfa" },
    };

    const trace3: Partial<Plotly.PlotData> = {
      x: ARCHITECTURE_COMPARISON.map((d) => d.name),
      y: ARCHITECTURE_COMPARISON.map((d) => d.hd95),
      type: "scatter",
      mode: "lines+markers",
      name: "HD95",
      yaxis: "y2",
      marker: { color: "#f43f5e", size: 10 },
      line: { width: 3 },
    };

    const layout: Partial<Plotly.Layout> = {
      title: "Architecture Performance Comparison",
      xaxis: { title: "Architecture", tickangle: -45 },
      yaxis: { title: "Score (%)", side: "left" },
      yaxis2: { title: "HD95 (pixels)", overlaying: "y", side: "right" },
      barmode: "group",
      hovermode: "closest",
      plot_bgcolor: "#f8fafc",
      paper_bgcolor: "#ffffff",
      font: { family: "Inter, sans-serif" },
      showlegend: true,
      legend: { x: 0.01, y: 0.99 },
    };

    const element = document.getElementById("architecture-plot");
    if (element) {
      Plotly.newPlot(element, [trace1, trace2, trace3], layout, {
        responsive: true,
      });
    }
  };

  const createAblationPlot = () => {
    const metrics: Array<keyof AblationData> = [
      "dice",
      "clDice",
      "betti",
      "juncF1",
    ];
    const metricLabels: Record<string, string> = {
      dice: "Dice",
      clDice: "clDice",
      betti: "Betti",
      juncF1: "Junction F1",
    };

    const traces: Partial<Plotly.PlotData>[] = metrics.map((metric) => ({
      x: ABLATION_STUDY.map((d) => d.name),
      y: ABLATION_STUDY.map((d) => d[metric]),
      type: "scatter",
      mode: "lines+markers",
      name: metricLabels[metric] || metric,
      marker: { size: 10 },
      line: { width: 3 },
    }));

    const layout: Partial<Plotly.Layout> = {
      title: "Ablation Study: Progressive Improvement",
      xaxis: { title: "Configuration", tickangle: -45 },
      yaxis: { title: "Metric Value" },
      hovermode: "closest",
      plot_bgcolor: "#f8fafc",
      paper_bgcolor: "#ffffff",
      font: { family: "Inter, sans-serif" },
      showlegend: true,
      legend: { x: 0.01, y: 0.99 },
    };

    const element = document.getElementById("ablation-plot");
    if (element) {
      Plotly.newPlot(element, traces, layout, { responsive: true });
    }
  };

  const createRadarPlot = () => {
    const colors = ["#22d3ee", "#3b82f6", "#8b5cf6", "#ec4899"];

    ABLATION_STUDY.forEach((model, idx) => {
      const trace: Partial<Plotly.PlotData> = {
        type: "scatterpolar",
        r: [
          model.dice,
          model.clDice,
          100 - model.betti,
          model.juncF1,
          100 - model.components,
        ],
        theta: [
          "Dice",
          "clDice",
          "Topology<br>(100-Betti)",
          "Junction F1",
          "Connectivity<br>(100-Comp)",
        ],
        fill: "toself",
        name: model.name,
        marker: { color: colors[idx] },
        fillcolor: colors[idx] + "40",
      };

      const layout: Partial<Plotly.Layout> = {
        polar: {
          radialaxis: { visible: true, range: [0, 100] },
        },
        title: model.name,
        plot_bgcolor: "#f8fafc",
        paper_bgcolor: "#ffffff",
        font: { family: "Inter, sans-serif" },
        margin: { l: 50, r: 50, t: 80, b: 50 },
        showlegend: true,
        legend: {
          x: 0.5,
          y: -0.15,
          xanchor: "center",
          yanchor: "top",
          orientation: "h",
        },
      };

      const element = document.getElementById(`radar-plot-${idx}`);
      if (element) {
        Plotly.newPlot(element, [trace], layout, { responsive: true });
      }
    });
  };

  const createParallelCoordinatesPlot = () => {
    const dimensions = [
      {
        label: "Dice",
        values: ABLATION_STUDY.map((d) => d.dice),
        range: [88, 92],
      },
      {
        label: "clDice",
        values: ABLATION_STUDY.map((d) => d.clDice),
        range: [82, 88],
      },
      {
        label: "Betti Error",
        values: ABLATION_STUDY.map((d) => d.betti),
        range: [20, 50],
      },
      {
        label: "Junction F1",
        values: ABLATION_STUDY.map((d) => d.juncF1),
        range: [60, 70],
      },
      {
        label: "Components",
        values: ABLATION_STUDY.map((d) => d.components),
        range: [20, 50],
      },
    ];

    const trace: Partial<Plotly.PlotData> = {
      type: "parcoords",
      line: {
        color: ABLATION_STUDY.map((_, idx) => idx),
        colorscale: [
          [0, "#f43f5e"],
          [0.5, "#a78bfa"],
          [1, "#22d3ee"],
        ],
      },
      dimensions: dimensions,
    };

    const layout: Partial<Plotly.Layout> = {
      title: "Parallel Coordinates: Multi-Metric Analysis",
      plot_bgcolor: "#f8fafc",
      paper_bgcolor: "#ffffff",
      font: { family: "Inter, sans-serif" },
    };

    const element = document.getElementById("parallel-plot");
    if (element) {
      Plotly.newPlot(element, [trace], layout, { responsive: true });
    }
  };

  const viewOptions = [
    { id: "comparison", label: "Architecture Comparison" },
    { id: "ablation", label: "Ablation Study" },
    { id: "radar", label: "Radar Profile" },
    { id: "parallel", label: "Parallel Coordinates" },
  ];

  return (
    <section className="py-12 bg-neutral-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-semibold tracking-tight">
          Analytics Dashboard
        </h2>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {viewOptions.map((view) => (
              <button
                key={view.id}
                onClick={() => setPlotView(view.id)}
                className={`px-4 py-2 rounded font-medium text-sm transition ${
                  plotView === view.id
                    ? "bg-neutral-800 text-white"
                    : "bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-100"
                }`}
              >
                {view.label}
              </button>
            ))}
          </div>
        </div>

        {plotView === "radar" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {ABLATION_STUDY.map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded border border-neutral-300 p-6 shadow-sm"
              >
                <div id={`radar-plot-${idx}`} className="w-full h-80"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded border border-neutral-300 p-6 shadow-sm mb-8">
            <div
              id={
                plotView === "comparison"
                  ? "architecture-plot"
                  : plotView === "ablation"
                  ? "ablation-plot"
                  : "parallel-plot"
              }
              className="w-full h-96"
            ></div>
          </div>
        )}
      </div>
    </section>
  );
};

// Component 3: Cross-Dataset Generalization Section
const CrossDatasetSection = () => {
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });

  useEffect(() => {
    try {
      createCrossDatasetPlot();
    } catch (error) {
      console.error("Error creating cross-dataset plot:", error);
    }
  }, []);

  const createCrossDatasetPlot = () => {
    const trace1: Partial<Plotly.PlotData> = {
      type: "scatterpolar",
      r: CROSS_DATASET.map((d) => d.dice),
      theta: CROSS_DATASET.map((d) => d.name),
      fill: "toself",
      name: "Dice",
      marker: { color: "#22d3ee" },
      fillcolor: "#22d3ee40",
    };

    const trace2: Partial<Plotly.PlotData> = {
      type: "scatterpolar",
      r: CROSS_DATASET.map((d) => d.clDice),
      theta: CROSS_DATASET.map((d) => d.name),
      fill: "toself",
      name: "clDice",
      marker: { color: "#8b5cf6" },
      fillcolor: "#8b5cf640",
    };

    const layout: Partial<Plotly.Layout> = {
      polar: {
        radialaxis: { visible: true, range: [0, 100] },
      },
      title: "Cross-Dataset Generalization",
      showlegend: true,
      plot_bgcolor: "#f8fafc",
      paper_bgcolor: "#ffffff",
      font: { family: "Inter, sans-serif" },
      margin: { l: 80, r: 80, t: 80, b: 80 },
      legend: { x: 1.1, y: 1 },
    };

    const element = document.getElementById("cross-dataset-plot");
    if (element) {
      Plotly.newPlot(element, [trace1, trace2], layout, { responsive: true });
    }
  };

  const handleSort = (key: string) => {
    let direction: SortDirection = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedCrossDataset = useMemo(() => {
    const sortableItems = [...CROSS_DATASET];
    if (sortConfig.key) {
      const key = sortConfig.key as keyof CrossDatasetData;
      sortableItems.sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return 0;
      });
    }
    return sortableItems;
  }, [sortConfig]);

  const headers = [
    { key: "name", label: "Dataset" },
    { key: "dice", label: "Dice (%)" },
    { key: "hd95", label: "HD95 (px)" },
    { key: "cldice", label: "clDice (%)" },
    { key: "betti", label: "Betti Error" },
    { key: "juncf1", label: "Junction F1 (%)" },
  ];

  return (
    <section className="py-12 bg-neutral-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-semibold tracking-tight">
          Cross-Dataset Generalization
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white rounded border border-neutral-300 p-6 shadow-sm">
            <div id="cross-dataset-plot" className="w-full h-96"></div>
          </div>

          <div className="lg:col-span-2 bg-white rounded border border-neutral-300 shadow-sm">
            <div className="px-6 py-4 border-b border-neutral-300">
              <h3 className="text-xl font-bold text-neutral-800">
                Cross-Dataset Results
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-800 text-white">
                  <tr>
                    {headers.map((header) => (
                      <th
                        key={header.key}
                        onClick={() => handleSort(header.key)}
                        className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-neutral-900 transition"
                      >
                        {header.label}
                        {sortConfig.key === header.key && (
                          <span className="ml-2">
                            {sortConfig.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedCrossDataset.map((row, idx) => (
                    <tr
                      key={row.name}
                      onClick={() => setSelectedDataset(row.name)}
                      className={`border-b border-neutral-200 hover:bg-neutral-100 cursor-pointer transition text-sm ${
                        selectedDataset === row.name
                          ? "bg-green-50"
                          : idx === 0
                          ? "bg-neutral-100 font-semibold"
                          : ""
                      }`}
                    >
                      <td className="px-6 py-4 font-medium text-neutral-800">
                        {row.name}
                      </td>
                      <td className="px-6 py-4 text-center">{row.dice}</td>
                      <td className="px-6 py-4 text-center">{row.hd95}</td>
                      <td className="px-6 py-4 text-center">{row.clDice}</td>
                      <td className="px-6 py-4 text-center">{row.betti}</td>
                      <td className="px-6 py-4 text-center">{row.juncF1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedDataset && (
              <div className="px-6 py-4 bg-green-50 border-t border-neutral-300">
                <p className="text-sm text-neutral-700">
                  <strong className="text-neutral-800">Selected:</strong>{" "}
                  {selectedDataset}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Component 4: Ablation Study Section
const AblationStudySection = () => {
  const [showAblation, setShowAblation] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-semibold tracking-tight">
          Ablation Study: Progressive Enhancement
        </h2>

        <div className="bg-white rounded border border-neutral-300 shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <h3 className="text-xl font-bold text-neutral-800">
              Module-Wise Impact
            </h3>
            <button
              onClick={() => setShowAblation(!showAblation)}
              className="px-4 py-2 bg-neutral-800 text-white rounded font-medium text-sm hover:bg-neutral-900 transition"
            >
              {showAblation ? "Hide" : "Show"} Strategy
            </button>
          </div>

          {showAblation && (
            <div className="bg-neutral-100 rounded p-4 mb-6 border border-neutral-300">
              <h4 className="font-bold text-neutral-800 mb-3">
                Ablation Strategy
              </h4>
              <ul className="space-y-2 text-neutral-700 text-sm">
                <li>
                  • <strong>Baseline:</strong> U-Net++ (Attn) + EfficientNet-B0
                  + Tversky Loss
                </li>
                <li>
                  • <strong>+ TFFM:</strong> Add Topology-aware Feature Fusion
                  Module
                </li>
                <li>
                  • <strong>+ clDice Loss:</strong> Replace loss with Tversky +
                  soft clDice hybrid
                </li>
                <li>
                  • <strong>+ Augmentation:</strong> Apply comprehensive data
                  augmentation pipeline
                </li>
              </ul>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Configuration
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-semibold">
                    Dice (%)
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-semibold">
                    clDice (%)
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-semibold">
                    Betti Error
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-semibold">
                    Junction F1
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-semibold">
                    Components
                  </th>
                </tr>
              </thead>
              <tbody>
                {ABLATION_STUDY.map((row, idx) => (
                  <tr
                    key={row.name}
                    onClick={() => setSelectedModel(row.name)}
                    className={`border-b border-neutral-200 hover:bg-neutral-100 cursor-pointer transition text-sm ${
                      selectedModel === row.name
                        ? "bg-green-50"
                        : idx === ABLATION_STUDY.length - 1
                        ? "bg-neutral-100 font-semibold"
                        : ""
                    }`}
                  >
                    <td className="px-6 py-4 font-medium text-neutral-800">
                      {row.name}
                    </td>
                    <td className="px-4 py-4 text-center">{row.dice}</td>
                    <td className="px-4 py-4 text-center">{row.clDice}</td>
                    <td className="px-4 py-4 text-center">{row.betti}</td>
                    <td className="px-4 py-4 text-center">{row.juncF1}</td>
                    <td className="px-4 py-4 text-center">{row.components}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Component that combines all 4 sections
const ExperimentSection = () => {
  return (
    <div className="min-h-screen bg-emerald-50-100">
      <FinalResultsSection />
      {/* <AnalyticsDashboard /> */}
      <CrossDatasetSection />
      <AblationStudySection />
    </div>
  );
};

export default ExperimentSection;
