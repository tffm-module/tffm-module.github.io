import React, { useState } from "react";
import Comparison, { ComparisonHandle, ComparisonItem } from "./comparison";
import baselineArtery from "../assets/comparison/baseline_artery.png";
import tffmArtery from "../assets/comparison/tffm_artery.png";
import baselineVein from "../assets/comparison/baseline_vein.png";
import tffmVein from "../assets/comparison/tffm_vein.png";
import architectureImg from "../assets/comparison/overall-architecture_page-0001.jpg";
import veinOverlay from "../assets/comparison/vein_tffm_vs_baseline_overlay.png";
import tffmModuleImg from "../assets/comparison/TFFM.jpg";
import visualizationImg from "../assets/comparison/visualization.jpg";

const ResearchPageEnhanced: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"combined" | "artery" | "vein">(
    "combined"
  );
  const [showAblation, setShowAblation] = useState(false);

  // Helper function to render metric boxes
  const MetricBox = ({
    label,
    value,
    icon = "📊",
  }: {
    label: string;
    value: string | number;
    icon?: string;
  }) => (
    <div className="metric-box">
      <span className="metric-icon">{icon}</span>
      <p className="metric-label">{label}</p>
      <p className="metric-value">{value}</p>
    </div>
  );

  // Final Results Data
  const finalResults = {
    combined: { dice: 90.97, hd95: 3.5, clDice: 85.55, components: 25.3 },
    artery: { dice: 85.75, hd95: 21.22, clDice: 79.07, components: 23.3 },
    vein: { dice: 87.63, hd95: 14.59, clDice: 81.46, components: 26.1 },
  };

  // Architecture Comparison
  const architectureComparison = [
    { name: "U-Net", dice: 77.1, iou: 62.86, hd95: 12.45 },
    { name: "Attention U-Net", dice: 89.75, iou: 81.45, hd95: 4.6 },
    { name: "U-Net++", dice: 89.89, iou: 81.69, hd95: 4.27 },
    { name: "U-Net++ w/ Attn (Baseline)", dice: 91.0, iou: 83.52, hd95: 3.59 },
    { name: "TFFM (Final)", dice: 90.97, iou: 85.55, hd95: 3.5 },
  ];

  // Loss Function Comparison
  const lossComparison = [
    { name: "BCEDice", dice: 89.2, topology: 28.5, fragmentation: 45.2 },
    { name: "BoundaryDoU", dice: 87.5, topology: 25.5, fragmentation: 27.2 },
    { name: "LogCoshDice", dice: 92.04, topology: 30.7, fragmentation: 32.1 },
    {
      name: "Tversky (α=0.65)",
      dice: 90.95,
      topology: 27.3,
      fragmentation: 28.4,
    },
  ];

  // Encoder Comparison
  const encoderComparison = [
    { name: "ResNet-50", arteryDice: 80.56, veinDice: 83.44, betti: 51.6 },
    { name: "ResNet-101", arteryDice: 80.98, veinDice: 84.05, betti: 44.4 },
    { name: "ConvNeXt-B", arteryDice: 80.96, veinDice: 83.98, betti: 48.1 },
    {
      name: "EfficientNet-B4",
      arteryDice: 79.11,
      veinDice: 82.14,
      betti: 38.4,
    },
    {
      name: "EfficientNet-B0 (Selected)",
      arteryDice: 81.8,
      veinDice: 84.32,
      betti: 38.6,
    },
  ];

  // Ablation Study
  const ablationStudy = [
    {
      name: "Baseline",
      dice: 90.15,
      clDice: 84.54,
      betti: 43.0,
      juncF1: 63.64,
    },
    { name: "+ TFFM", dice: 90.47, clDice: 85.05, betti: 26.0, juncF1: 65.44 },
    {
      name: "+ clDice Loss",
      dice: 90.95,
      clDice: 85.3,
      betti: 24.5,
      juncF1: 66.2,
    },
    {
      name: "Full (+ Augmentation)",
      dice: 90.97,
      clDice: 85.55,
      betti: 25.3,
      juncF1: 66.5,
    },
  ];

  // Cross-Dataset Evaluation
  const crossDataset = [
    {
      name: "Fundus-AVSeg (Source)",
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

  // Data Augmentation Details
  const augmentationStrategies = [
    { name: "Random Rotation", range: "[-30°, +30°]", probability: 0.5 },
    { name: "Vertical Flip", range: "-", probability: 0.5 },
    { name: "Horizontal Flip", range: "-", probability: 0.5 },
    { name: "Affine Translation", range: "5%", probability: 0.3 },
    { name: "Random Contrast", range: "[0.8, 1.2]", probability: 0.3 },
    { name: "Intensity Shift", range: "0.1", probability: 0.3 },
    { name: "Gaussian Noise", range: "σ=0.01", probability: 0.2 },
    { name: "Gaussian Smoothing", range: "σ∈[0.5, 1.0]", probability: 0.2 },
  ];

  return (
    <div className="w-full bg-[#0A0502]">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-linear-to-b from-[#870000] to-[#190A05] text-white px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            TFFM: Topology-Aware Feature Fusion Module via Latent Graph
            Reasoning for Retinal Vessel Segmentation
          </h1>

          <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
            Preserving vascular connectivity in retinal artery-vein segmentation
            through graph-based topology reasoning and hybrid loss formulation
          </p>

          {/* Author Information */}
          <div className="mb-10">
            <p className="text-lg text-red-50 mb-2">Anonymous Submission</p>
            <p className="text-red-200 text-sm">
              WACV 2026 Algorithms Track • Paper ID: 15
            </p>
          </div>

          {/* Conference/Journal */}
          <div className="mb-10">
            <span className="inline-block bg-red-900 text-white px-4 py-2 rounded-full text-sm font-medium border border-red-700">
              Under Review - WACV 2026
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a
              href="#pdf-link"
              className="inline-flex items-center gap-2 bg-amber-100 text-red-900 px-6 py-3 rounded-lg font-semibold hover:bg-amber-200 transition-colors"
            >
              📄 Paper (PDF)
            </a>
            <a
              href="#code-link"
              className="inline-flex items-center gap-2 bg-red-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors border border-red-600"
            >
              💻 Code (Coming Soon)
            </a>
            <a
              href="#dataset-link"
              className="inline-flex items-center gap-2 bg-red-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors border border-red-600"
            >
              📊 Fundus-AVSeg Dataset
            </a>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-red-900 bg-opacity-60 rounded-lg p-4 border border-red-700">
              <p className="text-sm text-red-100">Dice Score</p>
              <p className="text-3xl font-bold text-amber-300">90.97%</p>
            </div>
            <div className="bg-red-900 bg-opacity-60 rounded-lg p-4 border border-red-700">
              <p className="text-sm text-red-100">Fragmentation Reduction</p>
              <p className="text-3xl font-bold text-amber-300">38%</p>
            </div>
            <div className="bg-red-900 bg-opacity-60 rounded-lg p-4 border border-red-700">
              <p className="text-sm text-red-100">Topology Metric</p>
              <p className="text-3xl font-bold text-amber-300">85.55%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Abstract Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">
            Abstract
          </h2>
          <div className="bg-slate-50 border-l-4 border-blue-600 p-8 rounded-lg">
            <p className="text-slate-700 leading-relaxed text-lg mb-4">
              Precise segmentation of retinal arteries and veins carries the
              diagnosis of systemic cardiovascular conditions. However, standard
              convolutional architectures often yield topologically disjoint
              segmentations, characterized by gaps and discontinuities that
              render reliable graph-based clinical analysis impossible despite
              high pixel-level accuracy.
            </p>
            <p className="text-slate-700 leading-relaxed text-lg mb-4">
              To address this, we introduce a topology-aware framework
              engineered to maintain vascular connectivity. Our architecture
              fuses a{" "}
              <span className="font-semibold">
                Topological Feature Fusion Module (TFFM)
              </span>{" "}
              that maps local feature representations into a latent graph space,
              deploying{" "}
              <span className="font-semibold">Graph Attention Networks</span> to
              capture global structural dependencies often missed by fixed
              receptive fields. We drive the learning process with a hybrid
              objective function, coupling{" "}
              <span className="font-semibold">Tversky loss</span> for class
              imbalance with{" "}
              <span className="font-semibold">soft clDice loss</span> to
              explicitly penalize topological disconnects.
            </p>
            <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
              <p className="text-slate-700 leading-relaxed text-lg">
                Evaluation on the Fundus-AVSeg dataset reveals{" "}
                <span className="font-semibold text-green-700">
                  state-of-the-art performance, achieving a combined Dice score
                  of 90.97% and a 95% Hausdorff Distance of 3.50 pixels
                </span>
                . Notably, our method decreases vessel fragmentation by
                approximately{" "}
                <span className="font-semibold text-green-700">
                  38% relative to baselines
                </span>
                , yielding topologically coherent vascular trees viable for
                automated biomarker quantification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 px-4 bg-linear-to-b from-red-50 to-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
            The Topology Crisis in Vessel Segmentation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">
                The Semantic Gap
              </h3>
              <div className="space-y-4 mb-8">
                <div className="bg-white border-l-4 border-slate-700 p-4 rounded">
                  <p className="text-slate-700">
                    <span className="font-semibold">To a Clinician:</span>
                    <br />A blood vessel is a{" "}
                    <span className="italic font-medium">
                      continuous transport network
                    </span>
                  </p>
                </div>
                <div className="bg-white border-l-4 border-blue-600 p-4 rounded">
                  <p className="text-slate-700">
                    <span className="font-semibold">To a CNN:</span>
                    <br />
                    It is merely a{" "}
                    <span className="italic font-medium">
                      collection of disjoint pixels
                    </span>
                  </p>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-red-700 mb-4">
                The "Shattered Vessel" Phenomenon
              </h4>
              <ul className="space-y-3 text-slate-700">
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold text-2xl leading-none">
                    ✗
                  </span>
                  <span>
                    High Dice scores (95%+) with severely fragmented predictions
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold text-2xl leading-none">
                    ✗
                  </span>
                  <span>
                    Topologically invalid segmentations render graph analysis
                    impossible
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold text-2xl leading-none">
                    ✗
                  </span>
                  <span>
                    Pixel metrics (Dice, IoU) cannot penalize disconnections
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold text-2xl leading-none">
                    ✗
                  </span>
                  <span>
                    Clinically unusable despite impressive numerical accuracy
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">
                Clinical Requirements for Topology
              </h3>

              <div className="bg-linear-to-br from-blue-50 to-blue-100 border border-blue-300 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-blue-900 mb-3">
                  Why This Matters
                </h4>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Retinal arteries/veins serve as biomarkers for cardiovascular
                  disease, hypertension, and diabetic retinopathy. For automated
                  biomarker extraction and clinical deployment, segmentations
                  must preserve the vascular tree structure.
                </p>
              </div>

              <ul className="space-y-3 text-slate-700">
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold text-2xl leading-none">
                    ✓
                  </span>
                  <span>
                    Continuous vessel networks enable reliable graph-based
                    analysis
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold text-2xl leading-none">
                    ✓
                  </span>
                  <span>
                    Bifurcation preservation critical for tortuosity
                    quantification
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold text-2xl leading-none">
                    ✓
                  </span>
                  <span>Prevents false negatives in automated diagnosis</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold text-2xl leading-none">
                    ✓
                  </span>
                  <span>Enables downstream artery-vein classification</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Identical Dice Example */}
          <div className="bg-white rounded-lg border border-slate-300 p-8 shadow-lg">
            <h4 className="text-lg font-semibold text-slate-900 mb-6 text-center">
              Example: Identical Dice Score, Fundamentally Different Topology
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-6">
              <div className="p-4 bg-slate-100 rounded-lg">
                <div className="h-40 bg-linear-to-b from-slate-300 to-slate-200 rounded mb-3 flex items-center justify-center text-sm text-slate-600 font-medium">
                  Ground Truth
                </div>
                <p className="text-2xl font-bold text-slate-900">Dice: 95%</p>
                <p className="text-sm text-slate-600 mt-2">
                  Single connected tree
                </p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border-2 border-red-300">
                <div className="h-40 bg-linear-to-b from-red-200 to-red-100 rounded mb-3 flex items-center justify-center text-sm text-red-700 font-medium">
                  Fragmented <br />
                  Prediction
                </div>
                <p className="text-2xl font-bold text-red-700">Dice: 95%</p>
                <p className="text-sm text-red-600 mt-2">
                  50 disconnected fragments
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border-2 border-green-300">
                <div className="h-40 bg-linear-to-b from-green-200 to-green-100 rounded mb-3 flex items-center justify-center text-sm text-green-700 font-medium">
                  Topologically <br />
                  Correct
                </div>
                <p className="text-2xl font-bold text-green-700">Dice: 95%</p>
                <p className="text-sm text-green-600 mt-2">
                  Single continuous tree
                </p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
              <p className="text-slate-700 font-semibold">
                ⚠️ Both predictions score identically under traditional Dice/IoU
                metrics, yet only one is clinically usable. This is the
                fundamental problem TFFM solves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Method Overview */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
            Proposed Method
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Backbone */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Baseline Architecture
              </h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>
                  • <span className="font-medium">U-Net++</span> with nested
                  skip connections
                </li>
                <li>
                  • <span className="font-medium">Attention Gates</span> for
                  feature refinement
                </li>
                <li>
                  • <span className="font-medium">EfficientNet-B0</span> encoder
                  (optimal efficiency)
                </li>
                <li>
                  • Selected through systematic ablation (9 baselines tested)
                </li>
              </ul>
            </div>

            {/* TFFM Module */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-900 mb-4">
                TFFM: Graph-Based Reasoning
              </h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>
                  • Maps features to{" "}
                  <span className="font-medium">latent graph space</span>
                </li>
                <li>
                  •{" "}
                  <span className="font-medium">
                    Graph Attention Networks (GAT)
                  </span>{" "}
                  for connectivity
                </li>
                <li>• Multi-level deployment (5 decoder levels)</li>
                <li>• Adaptive pooling: 20×20 to 32×32 grid</li>
              </ul>
            </div>

            {/* Loss Function */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-orange-900 mb-4">
                Hybrid Loss Function
              </h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>
                  • <span className="font-medium">Tversky Loss</span> (α=0.65):
                  recall-weighted
                </li>
                <li>
                  • <span className="font-medium">soft clDice Loss</span>:
                  topology preservation
                </li>
                <li>
                  • <span className="font-medium">Combined weight</span>: Ltotal
                  = LTv + 0.5·LclDice
                </li>
                <li>• Penalizes disconnections explicitly</li>
              </ul>
            </div>
          </div>

          {/* Key Innovations */}
          <div className="bg-linear-to-r from-blue-50 to-purple-50 border border-blue-300 rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">
              Key Innovations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="text-3xl font-bold text-blue-600 min-w-fit">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Architecture-Integrated Topology Preservation
                  </h4>
                  <p className="text-slate-700 text-sm">
                    TFFM directly models global connectivity at the feature
                    extraction level, not just during loss computation
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl font-bold text-purple-600 min-w-fit">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Hybrid Topology-Aware Objective
                  </h4>
                  <p className="text-slate-700 text-sm">
                    Combines region overlap (Tversky) with skeleton similarity
                    (clDice) to balance accuracy and connectivity
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl font-bold text-green-600 min-w-fit">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Comprehensive Topological Evaluation
                  </h4>
                  <p className="text-slate-700 text-sm">
                    Evaluates beyond Dice/IoU: clDice, Betti error, skeleton-F1,
                    junction detection, fragmentation metrics
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl font-bold text-orange-600 min-w-fit">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Cross-Dataset Validation
                  </h4>
                  <p className="text-slate-700 text-sm">
                    Zero-shot inference on 5 external benchmarks demonstrates
                    robust topology preservation across domains
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Visualization */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
            Visual Comparison: Baseline vs. TFFM
          </h2>

          {/* Artery Comparison */}
          <div className="bg-white border border-slate-300 rounded-lg shadow-lg p-8 mb-12">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                Artery Segmentation: Interactive Slider Comparison
              </h3>
              <p className="text-slate-600 mb-4">
                Drag the slider to compare artery segmentation. TFFM preserves
                vessel continuity and reduces fragmentation significantly.
              </p>
            </div>

            <div className="mb-6">
              <Comparison className="w-full aspect-video rounded-lg overflow-hidden bg-black">
                <ComparisonItem position="left" className="w-full h-full">
                  <img
                    src={baselineArtery}
                    alt="Baseline Segmentation"
                    className="w-full h-full object-contain"
                  />
                </ComparisonItem>
                <ComparisonItem position="right">
                  <img
                    src={tffmArtery}
                    alt="TFFM Segmentation"
                    className="w-full h-full object-contain"
                  />
                </ComparisonItem>
                <ComparisonHandle position={50} />
              </Comparison>
            </div>

            <div className="flex justify-between px-2 mb-4">
              <span className="text-sm font-semibold text-[#9B59B6]">
                Baseline Vein
              </span>
              <span className="text-sm font-semibold text-[#E74C3C]">
                TFFM Method (Ours)
              </span>
            </div>

            <p className="text-xs text-slate-500 text-center mb-8">
              💡 Tip: Drag the slider handle to compare segmentations
            </p>

            {/* Visual Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="font-semibold text-blue-900 mb-2">
                  ✓ Enhanced Continuity
                </p>
                <p className="text-sm text-slate-700">
                  Maintains vessel connectivity throughout the network via graph
                  reasoning
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-semibold text-green-900 mb-2">
                  ✓ Reduced Fragmentation
                </p>
                <p className="text-sm text-slate-700">
                  38% reduction in vessel fragments (44.7 → 25.3 components)
                </p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="font-semibold text-purple-900 mb-2">
                  ✓ Topology Preservation
                </p>
                <p className="text-sm text-slate-700">
                  Preserves bifurcations and complex branching patterns
                </p>
              </div>
            </div>
          </div>

          {/* Vein Comparison */}
          <div className="bg-white border border-slate-300 rounded-lg shadow-lg p-8 mb-12">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                Vein Segmentation: Interactive Slider Comparison
              </h3>
              <p className="text-slate-600 mb-4">
                Vein segmentation demonstrates superior topology preservation
                with TFFM, achieving 87.63% Dice score and maintaining
                continuous vessel networks.
              </p>
            </div>

            <div className="mb-6">
              <Comparison className="w-full aspect-video rounded-lg overflow-hidden bg-black">
                <ComparisonItem position="left" className="w-full h-full">
                  <img
                    src={baselineVein}
                    alt="Baseline Vein Segmentation"
                    className="w-full h-full object-contain"
                  />
                </ComparisonItem>
                <ComparisonItem position="right">
                  <img
                    src={tffmVein}
                    alt="TFFM Vein Segmentation"
                    className="w-full h-full object-contain"
                  />
                </ComparisonItem>
                <ComparisonHandle position={50} />
              </Comparison>
            </div>

            <div className="flex justify-between px-2 mb-4">
              <span className="text-sm font-semibold text-[#F39C12]">
                Baseline Vein
              </span>
              <span className="text-sm font-semibold text-[#3498DB]">
                TFFM Method (Ours)
              </span>
            </div>

            <p className="text-xs text-slate-500 text-center mb-8">
              💡 Tip: Drag the slider handle to compare segmentations
            </p>

            {/* Vein Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="font-semibold text-blue-900 mb-2">
                  Vein Dice: 87.63%
                </p>
                <p className="text-sm text-slate-700">
                  Superior performance on vascular network segmentation
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-semibold text-green-900 mb-2">
                  clDice: 81.46%
                </p>
                <p className="text-sm text-slate-700">
                  Excellent skeleton similarity and continuity metrics
                </p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="font-semibold text-purple-900 mb-2">
                  HD95: 14.59px
                </p>
                <p className="text-sm text-slate-700">
                  Precise boundary estimation for clinical accuracy
                </p>
              </div>
            </div>
          </div>

          {/* Combined Artery-Vein Overlay */}
          <div className="bg-white border border-slate-300 rounded-lg shadow-lg p-8 mb-12">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                Combined Artery-Vein Analysis: TFFM Overlay Visualization
              </h3>
              <p className="text-slate-600 mb-4">
                Direct comparison of baseline and TFFM segmentations showing
                enhanced boundary definition and reduced vessel fragmentation in
                combined artery-vein analysis.
              </p>
            </div>

            <div className="mb-6 rounded-lg overflow-hidden border-2 border-slate-400 bg-black">
              <img
                src={veinOverlay}
                alt="Vein TFFM vs Baseline Overlay"
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="flex justify-between text-sm text-slate-600 px-2 mb-6">
              <span>← Baseline Method</span>
              <span>TFFM Segmentation (Ours) →</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-slate-700">
                  <span className="font-semibold">→</span> Enhanced vessel
                  boundary accuracy
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-slate-700">
                  <span className="font-semibold">→</span> Improved connectivity
                  preservation
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-slate-700">
                  <span className="font-semibold">→</span> 38% reduction in
                  fragmentation
                </p>
              </div>
            </div>
          </div>

          {/* Architecture and TFFM Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Architecture Diagram */}
            <div className="bg-white border border-slate-300 rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                ① Overall System Architecture
              </h3>
              <p className="text-slate-600 text-sm mb-6">
                Complete TFFM architecture diagram showing encoder-decoder
                structure with integrated modules at multiple scales.
              </p>

              <div className="mb-6 rounded-lg overflow-hidden border-2 border-slate-400 bg-gray-100">
                <img
                  src={architectureImg}
                  alt="Overall TFFM Architecture"
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: "400px" }}
                />
              </div>

              <div className="space-y-2 text-sm text-slate-700">
                <p>
                  <span className="font-semibold">⊕ Encoder:</span>{" "}
                  EfficientNet-B0
                </p>
                <p>
                  <span className="font-semibold">⊕ Decoder:</span> U-Net++ with
                  attention gates
                </p>
                <p>
                  <span className="font-semibold">⊕ TFFM:</span> 5 integrated
                  modules for topology
                </p>
              </div>
            </div>

            {/* TFFM Module Details */}
            <div className="bg-white border border-slate-300 rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                ② TFFM Module: Graph-Based Topology Reasoning
              </h3>
              <p className="text-slate-600 text-sm mb-6">
                Feature mapping to latent graph space with Graph Attention
                Networks for connectivity preservation.
              </p>

              <div className="mb-6 rounded-lg overflow-hidden border-2 border-slate-400 bg-gray-100">
                <img
                  src={tffmModuleImg}
                  alt="TFFM Module Deep Dive"
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: "400px" }}
                />
              </div>

              <div className="space-y-2 text-sm text-slate-700">
                <p>
                  <span className="font-semibold">◉ Mapping:</span> Features →
                  graph space
                </p>
                <p>
                  <span className="font-semibold">◉ Processing:</span> Graph
                  Attention Networks
                </p>
                <p>
                  <span className="font-semibold">◉ Loss:</span> Tversky +
                  clDice hybrid
                </p>
              </div>
            </div>
          </div>

          {/* Comprehensive Results */}
          <div className="bg-white border border-slate-300 rounded-lg shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">
              ④ Comprehensive Results & Performance Analysis
            </h3>
            <p className="text-slate-600 mb-6">
              Ablation studies, loss curves, topology metrics, cross-dataset
              generalization, and detailed performance comparisons.
            </p>

            <div className="mb-6 rounded-lg overflow-hidden border-2 border-slate-400 bg-gray-100">
              <img
                src={visualizationImg}
                alt="Comprehensive Results Visualization"
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="font-semibold text-blue-900 mb-2">
                  📊 Ablation Study
                </p>
                <p className="text-slate-700">
                  Impact of TFFM and loss functions
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-semibold text-green-900 mb-2">
                  📊 Cross-Dataset
                </p>
                <p className="text-slate-700">Validation on 6 benchmarks</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="font-semibold text-purple-900 mb-2">
                  📊 Topology Metrics
                </p>
                <p className="text-slate-700">
                  Betti error, clDice, junction F1
                </p>
              </div>
            </div>
          </div>

          {/* Key Findings Summary */}
          <div className="bg-linear-to-r from-slate-50 to-blue-50 border border-slate-300 rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-slate-900 mb-8 text-center">
              Summary: Key Results & Innovations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-300 rounded-lg p-6 text-center hover:shadow-md transition">
                <div className="text-3xl font-bold text-blue-600 mb-2">①</div>
                <p className="text-sm font-semibold text-slate-900 mb-2">
                  System Design
                </p>
                <p className="text-xs text-slate-600">
                  U-Net++ with integrated TFFM for topology-aware segmentation
                </p>
              </div>
              <div className="bg-white border border-slate-300 rounded-lg p-6 text-center hover:shadow-md transition">
                <div className="text-3xl font-bold text-green-600 mb-2">②</div>
                <p className="text-sm font-semibold text-slate-900 mb-2">
                  Graph Reasoning
                </p>
                <p className="text-xs text-slate-600">
                  Features to graphs with attention-based connectivity
                </p>
              </div>
              <div className="bg-white border border-slate-300 rounded-lg p-6 text-center hover:shadow-md transition">
                <div className="text-3xl font-bold text-purple-600 mb-2">③</div>
                <p className="text-sm font-semibold text-slate-900 mb-2">
                  Performance
                </p>
                <p className="text-xs text-slate-600">
                  Dice 90.97% | clDice 85.55% | 38% less fragmentation
                </p>
              </div>
              <div className="bg-white border border-slate-300 rounded-lg p-6 text-center hover:shadow-md transition">
                <div className="text-3xl font-bold text-orange-600 mb-2">④</div>
                <p className="text-sm font-semibold text-slate-900 mb-2">
                  Robustness
                </p>
                <p className="text-xs text-slate-600">
                  Generalized across 6 external datasets successfully
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Results Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
            Comprehensive Experimental Results
          </h2>

          {/* Final Results - Interactive Tabs */}
          <div className="mb-16">
            <div className="bg-white border border-slate-300 rounded-lg shadow-lg overflow-hidden">
              <div className="flex border-b border-slate-300">
                {(["combined", "artery", "vein"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                      activeTab === tab
                        ? "bg-blue-600 text-white"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-6">
                  Final Model Performance
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-300">
                    <p className="text-sm text-slate-600 mb-2">Dice Score</p>
                    <p className="text-3xl font-bold text-blue-700">
                      {finalResults[activeTab].dice}%
                    </p>
                  </div>
                  <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-300">
                    <p className="text-sm text-slate-600 mb-2">
                      clDice (Topology)
                    </p>
                    <p className="text-3xl font-bold text-purple-700">
                      {finalResults[activeTab].clDice}%
                    </p>
                  </div>
                  <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-300">
                    <p className="text-sm text-slate-600 mb-2">HD95 Distance</p>
                    <p className="text-3xl font-bold text-orange-700">
                      {finalResults[activeTab].hd95}px
                    </p>
                  </div>
                  <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-300">
                    <p className="text-sm text-slate-600 mb-2">Components</p>
                    <p className="text-3xl font-bold text-green-700">
                      {finalResults[activeTab].components}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Architecture Comparison Table */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">
              Step 1: Baseline Architecture Selection (9 Architectures
              Evaluated)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">
                      Architecture
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">
                      Dice (%)
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">
                      IoU (%)
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">
                      HD95 (px)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  {architectureComparison.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`${
                        row.name === "U-Net++ w/ Attn (Baseline)"
                          ? "bg-blue-50"
                          : row.name === "TFFM (Final)"
                          ? "bg-green-50"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {row.name}
                      </td>
                      <td className="px-4 py-3 text-center text-slate-700">
                        {row.dice}
                      </td>
                      <td className="px-4 py-3 text-center text-slate-700">
                        {row.iou}
                      </td>
                      <td className="px-4 py-3 text-center text-slate-700">
                        {row.hd95}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-600 mt-4">
              ✓ U-Net++ with Attention Gates selected as baseline (91.0% Dice,
              3.59 HD95)
            </p>
          </div>

          {/* Loss Function Comparison */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">
              Step 2: Loss Function Optimization
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">
                      Loss Function
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">
                      Dice (%)
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">
                      Topology Error
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">
                      Fragmentation
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  {lossComparison.map((row, idx) => (
                    <tr
                      key={idx}
                      className={
                        row.name === "Tversky (α=0.65)"
                          ? "bg-blue-50"
                          : "hover:bg-slate-50"
                      }
                    >
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {row.name}
                      </td>
                      <td className="px-4 py-3 text-center text-slate-700">
                        {row.dice}
                      </td>
                      <td className="px-4 py-3 text-center text-slate-700">
                        {row.topology}
                      </td>
                      <td className="px-4 py-3 text-center text-slate-700">
                        {row.fragmentation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-600 mt-4">
              ✓ Tversky loss (α=0.65) selected for balanced topology &
              connectivity preservation
            </p>
          </div>

          {/* Encoder Comparison */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">
              Step 3: Encoder Selection (5 Pre-trained Models)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">
                      Encoder
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">
                      Artery Dice (%)
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">
                      Vein Dice (%)
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">
                      Betti Error
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  {encoderComparison.map((row, idx) => (
                    <tr
                      key={idx}
                      className={
                        row.name === "EfficientNet-B0 (Selected)"
                          ? "bg-green-50"
                          : "hover:bg-slate-50"
                      }
                    >
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {row.name}
                      </td>
                      <td className="px-4 py-3 text-center text-slate-700">
                        {row.arteryDice}
                      </td>
                      <td className="px-4 py-3 text-center text-slate-700">
                        {row.veinDice}
                      </td>
                      <td className="px-4 py-3 text-center text-slate-700">
                        {row.betti}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-600 mt-4">
              ✓ EfficientNet-B0 selected: optimal vessel performance (81.80%
              artery, 84.32% vein) with 75% fewer parameters than B4
            </p>
          </div>

          {/* Ablation Study */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-slate-900">
                Step 4: Topological Refinement (TFFM Ablation)
              </h3>
              <button
                onClick={() => setShowAblation(!showAblation)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {showAblation ? "Hide" : "Show"} Details
              </button>
            </div>

            {showAblation && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-blue-900 mb-3">
                  Ablation Strategy
                </h4>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li>
                    • <span className="font-medium">Baseline:</span> U-Net++
                    (Attn) + EfficientNet-B0 + Tversky Loss
                  </li>
                  <li>
                    • <span className="font-medium">+ TFFM:</span> Add
                    Topology-aware Feature Fusion Module
                  </li>
                  <li>
                    • <span className="font-medium">+ clDice Loss:</span>{" "}
                    Replace loss with Tversky + soft clDice hybrid
                  </li>
                  <li>
                    • <span className="font-medium">+ Augmentation:</span> Apply
                    comprehensive data augmentation pipeline
                  </li>
                </ul>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">
                      Configuration
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">
                      Dice (%)
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">
                      clDice (%)
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">
                      Betti Error
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">
                      Junction F1 (%)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  {ablationStudy.map((row, idx) => (
                    <tr
                      key={idx}
                      className={
                        row.name === "Full (+ Augmentation)"
                          ? "bg-green-50 font-semibold"
                          : "hover:bg-slate-50"
                      }
                    >
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {row.name}
                      </td>
                      <td className="px-4 py-3 text-center text-slate-700">
                        {row.dice}
                      </td>
                      <td className="px-4 py-3 text-center text-slate-700">
                        {row.clDice}
                      </td>
                      <td className="px-4 py-3 text-center text-slate-700">
                        {row.betti}
                      </td>
                      <td className="px-4 py-3 text-center text-slate-700">
                        {row.juncF1}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-600 mt-4">
              ✓ TFFM alone: 39.5% Betti error reduction (43.0 → 26.0). With full
              pipeline: 41.2% reduction (43.0 → 25.3)
            </p>
          </div>

          {/* Key Metrics Comparison */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">
              Performance Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-linear-to-br from-green-50 to-emerald-50 border border-green-300 rounded-lg p-6">
                <p className="text-sm text-slate-600 mb-3 font-semibold">
                  Accuracy Improvements
                </p>
                <ul className="space-y-2 text-slate-700">
                  <li>• Combined Dice: +3.82% vs best architecture</li>
                  <li>• Artery Dice: 85.75% (per-class)</li>
                  <li>• Vein Dice: 87.63% (per-class)</li>
                  <li>• HD95: 3.50 px (excellent boundary accuracy)</li>
                </ul>
              </div>
              <div className="bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-300 rounded-lg p-6">
                <p className="text-sm text-slate-600 mb-3 font-semibold">
                  Topology Metrics (Critical)
                </p>
                <ul className="space-y-2 text-slate-700">
                  <li>• clDice: 85.55% (skeleton similarity)</li>
                  <li>• Fragmentation: 38% reduction (44.7 → 25.3)</li>
                  <li>• Skeleton F1: 87.63% (arteries), 88.48% (veins)</li>
                  <li>• Junction Detection: F1=66.50%, Prec=0.67</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Dataset Generalization */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
            Cross-Dataset Generalization & Robustness
          </h2>

          <div className="bg-white rounded-lg border border-slate-300 shadow-lg overflow-hidden mb-8">
            <div className="bg-slate-900 text-white px-6 py-4">
              <h3 className="text-lg font-semibold">
                Zero-Shot Inference on 5 External Benchmarks
              </h3>
              <p className="text-sm text-slate-300">
                Model trained on Fundus-AVSeg, tested directly on DRIVE,
                CHASEDB1, HRF, RETA, STARE
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 border-b border-slate-300">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">
                      Dataset
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-900">
                      Dice (%)
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-900">
                      HD95 (px)
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-900">
                      clDice (%)
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-900">
                      Betti Error
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-900">
                      Junc-F1 (%)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  {crossDataset.map((row, idx) => (
                    <tr
                      key={idx}
                      className={
                        idx === 0
                          ? "bg-green-50 font-semibold"
                          : "hover:bg-slate-50"
                      }
                    >
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {row.name}
                      </td>
                      <td className="px-4 py-3 text-center text-slate-700">
                        {row.dice}
                      </td>
                      <td className="px-4 py-3 text-center text-slate-700">
                        {row.hd95}
                      </td>
                      <td className="px-4 py-3 text-center text-slate-700">
                        {row.clDice}
                      </td>
                      <td className="px-4 py-3 text-center text-slate-700">
                        {row.betti}
                      </td>
                      <td className="px-4 py-3 text-center text-slate-700">
                        {row.juncF1}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cross-Dataset Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg border border-slate-300 p-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-4">
                ✓ Strengths
              </h4>
              <ul className="space-y-3 text-slate-700">
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>
                    <span className="font-medium">
                      Consistent topology preservation:
                    </span>{" "}
                    clDice maintains 68-74% across datasets
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>
                    <span className="font-medium">
                      Strong on similar domains:
                    </span>{" "}
                    DRIVE (82.1%) and RETA (82.2%) match source performance
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>
                    <span className="font-medium">
                      Low connectivity errors:
                    </span>{" "}
                    DRIVE shows lowest Betti-Error (24.2)
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg border border-slate-300 p-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-4">
                ⚠️ Challenges
              </h4>
              <ul className="space-y-3 text-slate-700">
                <li className="flex gap-3">
                  <span className="text-orange-600 font-bold">⚠️</span>
                  <span>
                    <span className="font-medium">CHASEDB1 fragmentation:</span>{" "}
                    Pediatric vasculature with different patterns (Betti=50.5)
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-600 font-bold">⚠️</span>
                  <span>
                    <span className="font-medium">STARE pathology:</span> High
                    myopia cases with altered vessel morphology (HD95=33.25)
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-600 font-bold">⚠️</span>
                  <span>
                    <span className="font-medium">
                      Junction detection limits:
                    </span>{" "}
                    Recall 0.44-0.52 (precision 0.63-0.71)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Data Augmentation */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
            Comprehensive Data Augmentation Pipeline
          </h2>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">
                    Technique
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Parameters
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Probability
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {augmentationStrategies.map((aug, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {aug.name}
                    </td>
                    <td className="px-4 py-3 text-center text-slate-700 font-mono text-sm">
                      {aug.range}
                    </td>
                    <td className="px-4 py-3 text-center text-slate-700">
                      {(aug.probability * 100).toFixed(0)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">
              Impact of Augmentation
            </h4>
            <p className="text-slate-700">
              Comprehensive augmentation improved validation Dice from 83.31%
              (non-augmented TFFM) to 87.20% (epoch 72), demonstrating that
              augmentation is critical for topology-aware learning and
              generalization.
            </p>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-20 px-4 bg-linear-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">
            Conclusion & Impact
          </h2>

          <div className="space-y-6">
            <div className="bg-white border border-blue-200 rounded-lg p-8 shadow-md">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Key Findings
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">→</span>
                  <span>
                    TFFM addresses the fundamental disconnect between
                    pixel-level accuracy and topological validity
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">→</span>
                  <span>
                    Architecture-integrated topology reasoning outperforms
                    loss-only approaches
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">→</span>
                  <span>
                    38% fragmentation reduction while maintaining high Dice
                    (90.97%)
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">→</span>
                  <span>
                    Cross-dataset evaluation confirms topology preservation is
                    domain-robust
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-green-200 rounded-lg p-8 shadow-md">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Clinical Significance
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                These topologically coherent segmentations are viable for
                automated biomarker quantification in cardiovascular disease
                screening, enabling:
              </p>
              <ul className="space-y-2 text-slate-700 ml-4">
                <li>• Automated tortuosity quantification</li>
                <li>• Artery-vein classification with graph-based features</li>
                <li>• Bifurcation point detection and analysis</li>
                <li>• Clinical decision support with reliable topology</li>
              </ul>
            </div>

            <div className="bg-white border border-orange-200 rounded-lg p-8 shadow-md">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Future Directions
              </h3>
              <ul className="space-y-2 text-slate-700">
                <li>• Extension to 3D volumetric vessel segmentation</li>
                <li>
                  • Specialized attention mechanisms for bifurcation
                  completeness
                </li>
                <li>
                  • Lightweight variants optimized for clinical deployment
                </li>
                <li>
                  • End-to-end graph architectures for vessel classification
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Citation */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">
            Citation
          </h2>

          <div className="bg-white border border-slate-300 rounded-lg p-6 shadow-md">
            <div className="bg-slate-100 p-4 rounded mb-4 font-mono text-sm overflow-x-auto">
              <pre>{`@article{anonymous2024tffm,
  title={TFFM: Topology-Aware Feature Fusion Module via Latent Graph 
         Reasoning for Retinal Vessel Segmentation},
  author={Anonymous},
  journal={WACV 2026 - Algorithms Track},
  year={2026},
  paperid={15}
}`}</pre>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              📋 Copy BibTeX
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">
            © 2025 TFFM Research Project. Built for WACV 2026 Submission.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Code & Data Available Upon Acceptance
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ResearchPageEnhanced;
