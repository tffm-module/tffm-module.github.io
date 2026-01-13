import { useState, useEffect, useMemo } from "react";
// plotly has no bundled TS types in this project; ignore the import type-check
// @ts-ignore
import * as Plotly from "plotly.js-dist-min";

const ResearchPageTFFM = () => {
  const [activeTab, setActiveTab] = useState<"combined" | "artery" | "vein">(
    "combined"
  );
  const [showAblation, setShowAblation] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  const [plotView, setPlotView] = useState("comparison");
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  // Data
  const finalResults = {
    combined: { dice: 90.97, hd95: 3.5, clDice: 85.55, components: 25.3 },
    artery: { dice: 85.75, hd95: 21.22, clDice: 79.07, components: 23.3 },
    vein: { dice: 87.63, hd95: 14.59, clDice: 81.46, components: 26.1 },
  };

  const architectureComparison = [
    { name: "U-Net", dice: 77.1, iou: 62.86, hd95: 12.45, params: 31.0 },
    {
      name: "Attention U-Net",
      dice: 89.75,
      iou: 81.45,
      hd95: 4.6,
      params: 34.9,
    },
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

  const ablationStudy = [
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

  const crossDataset = [
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

  // Plotting functions
  useEffect(() => {
    if (plotView === "comparison") {
      createArchitectureComparisonPlot();
    } else if (plotView === "ablation") {
      createAblationPlot();
    } else if (plotView === "cross-dataset") {
      createCrossDatasetPlot();
    } else if (plotView === "radar") {
      createRadarPlot();
    } else if (plotView === "parallel") {
      createParallelCoordinatesPlot();
    }
  }, [plotView, selectedModel]);

  const createArchitectureComparisonPlot = () => {
    const trace1 = {
      x: architectureComparison.map((d) => d.name),
      y: architectureComparison.map((d) => d.dice),
      type: "bar",
      name: "Dice Score",
      marker: { color: "#22d3ee" },
      visible: true,
    };

    const trace2 = {
      x: architectureComparison.map((d) => d.name),
      y: architectureComparison.map((d) => d.iou),
      type: "bar",
      name: "IoU",
      marker: { color: "#a78bfa" },
      visible: true,
    };

    const trace3 = {
      x: architectureComparison.map((d) => d.name),
      y: architectureComparison.map((d) => d.hd95),
      type: "scatter",
      mode: "lines+markers",
      name: "HD95",
      yaxis: "y2",
      marker: { color: "#f43f5e", size: 10 },
      line: { width: 3 },
      visible: true,
    };

    const layout = {
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

    Plotly.newPlot("architecture-plot", [trace1, trace2, trace3], layout, {
      responsive: true,
    });
  };

  const createAblationPlot = () => {
    const metrics = ["dice", "clDice", "betti", "juncF1"];
    const traces = metrics.map((metric) => ({
      x: ablationStudy.map((d) => d.name),
      y: ablationStudy.map((d) => (d as any)[metric]),
      type: "scatter",
      mode: "lines+markers",
      name:
        metric === "juncF1"
          ? "Junction F1"
          : metric === "clDice"
          ? "clDice"
          : metric.charAt(0).toUpperCase() + metric.slice(1),
      marker: { size: 10 },
      line: { width: 3 },
      visible: true,
    }));

    const layout = {
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

    Plotly.newPlot("ablation-plot", traces, layout, { responsive: true });
  };

  const createCrossDatasetPlot = () => {
    const trace1 = {
      type: "scatterpolar",
      r: crossDataset.map((d) => d.dice),
      theta: crossDataset.map((d) => d.name),
      fill: "toself",
      name: "Dice",
      marker: { color: "#22d3ee" },
      fillcolor: "#22d3ee40",
    };

    const trace2 = {
      type: "scatterpolar",
      r: crossDataset.map((d) => d.clDice),
      theta: crossDataset.map((d) => d.name),
      fill: "toself",
      name: "clDice",
      marker: { color: "#8b5cf6" },
      fillcolor: "#8b5cf640",
    };

    const layout = {
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

    Plotly.newPlot("cross-dataset-plot", [trace1, trace2], layout, {
      responsive: true,
    });
  };

  const createRadarPlot = () => {
    // Color palette for each model
    const colors = ["#22d3ee", "#3b82f6", "#8b5cf6", "#ec4899"];

    // Create radar plots for all ablation models in a 2x2 grid
    ablationStudy.forEach((model, idx) => {
      const trace = {
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
        fillcolor:
          colors[idx].replace(/(\w{2})(\w{2})(\w{2})/, "$1$2$3") + "40",
      };

      const layout = {
        polar: {
          radialaxis: { visible: true, range: [0, 100] },
        },
        title: `${model.name}`,
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

      const container = document.getElementById(`radar-plot-${idx}`);
      if (container) {
        Plotly.newPlot(`radar-plot-${idx}`, [trace], layout, {
          responsive: true,
        });
      }
    });
  };

  const createParallelCoordinatesPlot = () => {
    const dimensions = [
      {
        label: "Dice",
        values: ablationStudy.map((d) => d.dice),
        range: [88, 92],
      },
      {
        label: "clDice",
        values: ablationStudy.map((d) => d.clDice),
        range: [82, 88],
      },
      {
        label: "Betti Error",
        values: ablationStudy.map((d) => d.betti),
        range: [20, 50],
      },
      {
        label: "Junction F1",
        values: ablationStudy.map((d) => d.juncF1),
        range: [60, 70],
      },
      {
        label: "Components",
        values: ablationStudy.map((d) => d.components),
        range: [20, 50],
      },
    ];

    const trace = {
      type: "parcoords",
      line: {
        color: ablationStudy.map((_, idx) => idx),
        colorscale: [
          [0, "#f43f5e"],
          [0.5, "#a78bfa"],
          [1, "#22d3ee"],
        ],
      },
      dimensions: dimensions,
    };

    const layout = {
      title: "Parallel Coordinates: Multi-Metric Analysis",
      plot_bgcolor: "#f8fafc",
      paper_bgcolor: "#ffffff",
      font: { family: "Inter, sans-serif" },
    };

    Plotly.newPlot("parallel-plot", [trace], layout, { responsive: true });
  };

  // Table sorting
  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedCrossDataset = useMemo(() => {
    let sortableItems = [...crossDataset];
    if (sortConfig.key) {
      const key = sortConfig.key as keyof (typeof crossDataset)[0];
      sortableItems.sort((a, b) => {
        if ((a as any)[key] < (b as any)[key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if ((a as any)[key] > (b as any)[key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [crossDataset, sortConfig]);

  return (
    <div className="min-h-screen bg-emerald-50-100">
      {/* Final Results - Tab Interface */}
      <section className="py-16 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-semibold tracking-tight">
            Final Model Performance
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
                      : "bg-neutral-100 text-neutral-700 border border-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  key: "dice",
                  label: "Dice Score",
                  desc: "Pixel overlap accuracy",
                },
                {
                  key: "clDice",
                  label: "clDice",
                  desc: "Skeleton similarity",
                },
                {
                  key: "hd95",
                  label: "HD95",
                  desc: "95th percentile distance",
                },
                {
                  key: "components",
                  label: "Components",
                  desc: "Disconnected segments",
                },
              ].map((metric) => (
                <div
                  key={metric.key}
                  className="bg-neutral-50 rounded border border-neutral-300 p-4 text-center"
                >
                  <div className="text-3xl font-bold text-neutral-800 mb-1">
                    {(finalResults as any)[activeTab][metric.key]}
                    {metric.key === "hd95"
                      ? "px"
                      : metric.key === "components"
                      ? ""
                      : "%"}
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

      {/* Interactive Dashboard */}
      <section className="py-16 bg-neutral-100">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-semibold tracking-tight">
            Analytics Dashboard
          </h2>

          {/* Visualization Selection */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                {
                  id: "comparison",
                  label: "Architecture Comparison",
                },
                { id: "ablation", label: "Ablation Study" },
                // { id: "cross-dataset", label: "Cross-Dataset" },
                { id: "radar", label: "Radar Profile" },
                {
                  id: "parallel",
                  label: "Parallel Coordinates",
                },
              ].map((view) => (
                <button
                  key={view.id}
                  onClick={() => setPlotView(view.id)}
                  className={`px-4 py-2 rounded font-medium text-sm transition ${
                    plotView === view.id
                      ? "bg-neutral-800 text-white"
                      : "bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  {view.label}
                </button>
              ))}
            </div>
          </div>

          {/* Plot Container with responsive grid for radar */}
          {plotView === "radar" ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {[
                "Baseline",
                "+ TFFM",
                "+ clDice Loss",
                "Full (+ Augmentation)",
              ].map((_, idx) => (
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

      {/* Cross-Dataset Section */}
      <section className="py-16 bg-neutral-50">
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
                      {[
                        "Dataset",
                        "Dice (%)",
                        "HD95 (px)",
                        "clDice (%)",
                        "Betti Error",
                        "Junction F1 (%)",
                      ].map((header, idx) => (
                        <th
                          key={idx}
                          onClick={() =>
                            handleSort(header.split(" ")[0].toLowerCase())
                          }
                          className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-neutral-900 transition"
                        >
                          {header}
                          {sortConfig.key ===
                            header.split(" ")[0].toLowerCase() && (
                            <i
                              className={`fas fa-sort-${
                                sortConfig.direction === "asc" ? "up" : "down"
                              } ml-2`}
                            ></i>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sortedCrossDataset.map((row, idx) => (
                      <tr
                        key={idx}
                        onClick={() => setSelectedDataset(row.name)}
                        className={`border-b border-neutral-200 hover:bg-neutral-50 cursor-pointer transition text-sm ${
                          selectedDataset === row.name
                            ? "bg-green-50"
                            : idx === 0
                            ? "bg-neutral-50 font-semibold"
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

      {/* Ablation Study Section */}
      <section className="py-16 bg-neutral-50">
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
              <div className="bg-neutral-50 rounded p-4 mb-6 border border-neutral-300">
                <h4 className="font-bold text-neutral-800 mb-3">
                  Ablation Strategy
                </h4>
                <ul className="space-y-2 text-neutral-700 text-sm">
                  <li>
                    • <strong>Baseline:</strong> U-Net++ (Attn) +
                    EfficientNet-B0 + Tversky Loss
                  </li>
                  <li>
                    • <strong>+ TFFM:</strong> Add Topology-aware Feature Fusion
                    Module
                  </li>
                  <li>
                    • <strong>+ clDice Loss:</strong> Replace loss with Tversky
                    + soft clDice hybrid
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
                  {ablationStudy.map((row, idx) => (
                    <tr
                      key={idx}
                      onClick={() => setSelectedModel(row.name)}
                      className={`border-b border-neutral-200 hover:bg-neutral-50 cursor-pointer transition text-sm ${
                        selectedModel === row.name
                          ? "bg-green-50"
                          : idx === ablationStudy.length - 1
                          ? "bg-neutral-50 font-semibold"
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
                      <td className="px-4 py-4 text-center">
                        {row.components}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResearchPageTFFM;
