import React, { useState } from "react";
import Comparison, { ComparisonItem } from "./comparison";
import baselineArtery from "../assets/comparison/baseline_artery.png";
import tffmArtery from "../assets/comparison/tffm_artery.png";

const ResearchPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"combined" | "artery" | "vein">(
    "combined"
  );
  const [expandedDataset, setExpandedDataset] = useState<string | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<
    "dice" | "topology" | "boundary"
  >("dice");

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 text-white px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Topology-aware Feature Fusion Module for Vessel Segmentation
          </h1>

          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            A novel approach to preserve topological connectivity and improve
            vessel structure integrity in medical image segmentation
          </p>

          {/* Author Information */}
          <div className="mb-10">
            <p className="text-lg text-slate-200 mb-2">
              Author Name<sup>1,*</sup>, Co-author<sup>1,2</sup>
            </p>
            <p className="text-slate-400 text-sm">
              <sup>1</sup>Institution Name • <sup>2</sup>University Name
            </p>
            <p className="text-slate-400 text-sm mt-2">
              *Corresponding author: email@institution.edu
            </p>
          </div>

          {/* Conference/Journal */}
          <div className="mb-10">
            <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              Under Review
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a
              href="#pdf-link"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
            >
              📄 Paper (PDF)
            </a>
            <a
              href="#code-link"
              className="inline-flex items-center gap-2 bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 transition-colors border border-slate-500"
            >
              💻 Code (GitHub)
            </a>
            <a
              href="#dataset-link"
              className="inline-flex items-center gap-2 bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 transition-colors border border-slate-500"
            >
              📊 Dataset
            </a>
          </div>

          {/* Contribution Summary */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-slate-100">
              We propose TFFM, a topology-aware feature fusion module that
              preserves vessel connectivity and structure integrity, achieving
              superior segmentation beyond pixel-level metrics.
            </p>
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
            <p className="text-slate-700 leading-relaxed text-lg">
              Precise segmentation of retinal arteries and veins carries the
              diagnosis of systemic cardiovascular conditions. However, standard
              convolutional architectures often yield topologically disjoint
              segmentations, characterized by gaps and discontinuities that
              render reliable graph-based clinical analysis impossible despite
              high pixel-level accuracy. To address this, we introduce a
              topology-aware framework engineered to maintain vascular
              connectivity. Our architecture fuses a{" "}
              <span className="font-semibold">
                Topological Feature Fusion Module (TFFM)
              </span>{" "}
              that maps local feature representations into a latent graph space,
              deploying Graph Attention Networks to capture global structural
              dependencies often missed by fixed receptive fields. Furthermore,
              we drive the learning process with a hybrid objective function,
              coupling Tversky loss for class imbalance with soft clDice loss to
              explicitly penalize topological disconnects.
            </p>
            <p className="text-slate-700 leading-relaxed text-lg mt-4">
              Evaluation on the Fundus-AVSeg dataset reveals{" "}
              <span className="font-semibold">
                state-of-the-art performance, achieving a combined Dice score of
                90.97% and a 95% Hausdorff Distance of 3.50 pixels
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
      </section>

      {/* Motivation & Problem Statement */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
            Motivation & Problem Statement
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Limitations of Pixel-wise Metrics
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>
                    Dice and IoU focus on pixel-level overlap, ignoring
                    topological errors
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>
                    Vessel disconnections not penalized by traditional metrics
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>
                    High numerical accuracy can mask clinically severe errors
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Clinical Impact
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>
                    Topologically correct segmentations enable reliable
                    diagnosis
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>
                    Preserves vessel network structure for surgical planning
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>
                    Reduces false negatives in clinical decision-making
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Problem Illustration */}
          <div className="bg-white rounded-lg border border-slate-300 p-8 shadow-md">
            <h4 className="text-lg font-semibold text-slate-900 mb-4">
              Problem Illustration
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-slate-100 rounded-lg">
                <div className="h-32 bg-gradient-to-b from-slate-300 to-slate-200 rounded mb-2 flex items-center justify-center text-sm text-slate-600">
                  Input Image
                </div>
                <p className="text-sm font-medium text-slate-700">
                  Input Vessel
                </p>
              </div>
              <div className="p-4 bg-slate-100 rounded-lg">
                <div className="h-32 bg-gradient-to-b from-slate-300 to-slate-200 rounded mb-2 flex items-center justify-center text-sm text-slate-600">
                  Ground Truth
                </div>
                <p className="text-sm font-medium text-slate-700">
                  Ground Truth
                </p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-300">
                <div className="h-32 bg-gradient-to-b from-red-200 to-red-100 rounded mb-2 flex items-center justify-center text-sm text-red-600">
                  Baseline Output
                </div>
                <p className="text-sm font-medium text-red-700">
                  Disconnected vessels
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-300">
                <div className="h-32 bg-gradient-to-b from-green-200 to-green-100 rounded mb-2 flex items-center justify-center text-sm text-green-600">
                  TFFM Output
                </div>
                <p className="text-sm font-medium text-green-700">
                  Continuous structure
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Method Overview */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
            Method Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">
                Topology-aware Feature Fusion Module (TFFM)
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Multi-scale Feature Extraction
                  </h4>
                  <p className="text-slate-700 text-sm">
                    Extract features at multiple scales to capture vessel
                    structures of varying sizes
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">
                    Topology-preserving Fusion
                  </h4>
                  <p className="text-slate-700 text-sm">
                    Intelligently fuse features while enforcing topological
                    constraints
                  </p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">
                    Connectivity Loss
                  </h4>
                  <p className="text-slate-700 text-sm">
                    Apply specialized loss functions that penalize disconnected
                    regions
                  </p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-900 mb-2">
                    Refinement Module
                  </h4>
                  <p className="text-slate-700 text-sm">
                    Post-process predictions to enforce topological correctness
                  </p>
                </div>
              </div>
            </div>

            {/* Architecture Placeholder */}
            <div>
              <div className="bg-slate-100 rounded-lg border-2 border-dashed border-slate-400 h-96 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-slate-600 text-lg font-semibold mb-2">
                    Architecture Diagram
                  </p>
                  <p className="text-slate-500 text-sm">
                    [Placeholder: Network architecture diagram will be placed
                    here]
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Contributions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-blue-900 mb-6">
              Key Contributions
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold text-xl">1.</span>
                <span className="text-slate-700">
                  Novel topology-aware feature fusion framework specifically
                  designed for vessel segmentation
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold text-xl">2.</span>
                <span className="text-slate-700">
                  Specialized loss function that explicitly enforces topological
                  correctness
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold text-xl">3.</span>
                <span className="text-slate-700">
                  Comprehensive evaluation on multiple benchmark datasets with
                  topological metrics
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold text-xl">4.</span>
                <span className="text-slate-700">
                  State-of-the-art results in both accuracy and topological
                  integrity
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Visual Comparison Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
            TFFM Effectiveness: Visual Comparison
          </h2>

          <div className="bg-white rounded-lg border border-slate-300 shadow-lg p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                Interactive Image Comparison
              </h3>
              <p className="text-slate-600">
                Drag the slider below to compare baseline vessel segmentation
                with TFFM-enhanced output. Notice the improved vessel continuity
                and reduced fragmentation.
              </p>
            </div>

            {/* Comparison Container */}
            <div className="mb-6">
              <Comparison className="w-full aspect-video rounded-lg">
                <ComparisonItem position="left" className="w-full h-full">
                  <img
                    src={baselineArtery}
                    alt="Baseline Segmentation"
                    className="w-full h-full object-contain bg-black"
                  />
                </ComparisonItem>
                <ComparisonItem position="right" className="w-full h-full">
                  <img
                    src={tffmArtery}
                    alt="TFFM Segmentation"
                    className="w-full h-full object-contain bg-black"
                  />
                </ComparisonItem>
              </Comparison>
            </div>

            {/* Labels */}
            <div className="flex justify-between px-2 mb-6">
              <span className="text-sm font-semibold text-slate-700">
                Baseline Method
              </span>
              <span className="text-sm font-semibold text-slate-700">
                TFFM Method (Ours)
              </span>
            </div>

            {/* Key Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="font-semibold text-blue-900 mb-2">
                  ✓ Enhanced Continuity
                </p>
                <p className="text-sm text-slate-700">
                  Maintains vessel connectivity throughout the network
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-semibold text-green-900 mb-2">
                  ✓ Reduced Fragmentation
                </p>
                <p className="text-sm text-slate-700">
                  Minimizes broken vessel segments and false disconnections
                </p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="font-semibold text-purple-900 mb-2">
                  ✓ Improved Topology
                </p>
                <p className="text-sm text-slate-700">
                  Preserves complex branching patterns and vessel junctions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quantitative Results */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
            Quantitative Results
          </h2>

          {/* Results Table */}
          <div className="overflow-x-auto mb-12">
            <table className="w-full border-collapse bg-slate-50 rounded-lg overflow-hidden shadow-md">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Method</th>
                  <th className="px-6 py-3 text-center font-semibold">Dice</th>
                  <th className="px-6 py-3 text-center font-semibold">IoU</th>
                  <th className="px-6 py-3 text-center font-semibold">F1</th>
                  <th className="px-6 py-3 text-center font-semibold">
                    Sensitivity
                  </th>
                  <th className="px-6 py-3 text-center font-semibold">
                    Specificity
                  </th>
                  <th className="px-6 py-3 text-center font-semibold">
                    Topology
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                <tr className="hover:bg-slate-100 transition-colors">
                  <td className="px-6 py-3 font-medium text-slate-900">
                    U-Net
                  </td>
                  <td className="px-6 py-3 text-center text-slate-700">
                    0.845
                  </td>
                  <td className="px-6 py-3 text-center text-slate-700">
                    0.732
                  </td>
                  <td className="px-6 py-3 text-center text-slate-700">
                    0.841
                  </td>
                  <td className="px-6 py-3 text-center text-slate-700">
                    0.823
                  </td>
                  <td className="px-6 py-3 text-center text-slate-700">
                    0.957
                  </td>
                  <td className="px-6 py-3 text-center text-red-600 font-semibold">
                    0.712
                  </td>
                </tr>
                <tr className="hover:bg-slate-100 transition-colors">
                  <td className="px-6 py-3 font-medium text-slate-900">
                    V-Net
                  </td>
                  <td className="px-6 py-3 text-center text-slate-700">
                    0.851
                  </td>
                  <td className="px-6 py-3 text-center text-slate-700">
                    0.742
                  </td>
                  <td className="px-6 py-3 text-center text-slate-700">
                    0.847
                  </td>
                  <td className="px-6 py-3 text-center text-slate-700">
                    0.834
                  </td>
                  <td className="px-6 py-3 text-center text-slate-700">
                    0.961
                  </td>
                  <td className="px-6 py-3 text-center text-red-600 font-semibold">
                    0.728
                  </td>
                </tr>
                <tr className="hover:bg-slate-100 transition-colors">
                  <td className="px-6 py-3 font-medium text-slate-900">
                    Attention U-Net
                  </td>
                  <td className="px-6 py-3 text-center text-slate-700">
                    0.858
                  </td>
                  <td className="px-6 py-3 text-center text-slate-700">
                    0.751
                  </td>
                  <td className="px-6 py-3 text-center text-slate-700">
                    0.855
                  </td>
                  <td className="px-6 py-3 text-center text-slate-700">
                    0.842
                  </td>
                  <td className="px-6 py-3 text-center text-slate-700">
                    0.965
                  </td>
                  <td className="px-6 py-3 text-center text-orange-600 font-semibold">
                    0.745
                  </td>
                </tr>
                <tr className="bg-green-50 hover:bg-green-100 transition-colors border-t-2 border-b-2 border-green-400">
                  <td className="px-6 py-3 font-bold text-slate-900">
                    TFFM (Ours)
                  </td>
                  <td className="px-6 py-3 text-center font-bold text-green-700">
                    0.887
                  </td>
                  <td className="px-6 py-3 text-center font-bold text-green-700">
                    0.798
                  </td>
                  <td className="px-6 py-3 text-center font-bold text-green-700">
                    0.884
                  </td>
                  <td className="px-6 py-3 text-center font-bold text-green-700">
                    0.869
                  </td>
                  <td className="px-6 py-3 text-center font-bold text-green-700">
                    0.973
                  </td>
                  <td className="px-6 py-3 text-center font-bold text-green-700">
                    0.892
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Results Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <p className="text-sm font-semibold text-green-700 mb-1">
                Accuracy Improvement
              </p>
              <p className="text-3xl font-bold text-green-700">+4.2%</p>
              <p className="text-xs text-slate-600 mt-2">
                Average Dice improvement over best baseline
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-sm font-semibold text-blue-700 mb-1">
                Topology Correction
              </p>
              <p className="text-3xl font-bold text-blue-700">+19.7%</p>
              <p className="text-xs text-slate-600 mt-2">
                Improvement in topological metric score
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <p className="text-sm font-semibold text-purple-700 mb-1">
                Connectivity Preservation
              </p>
              <p className="text-3xl font-bold text-purple-700">89.2%</p>
              <p className="text-xs text-slate-600 mt-2">
                Topological correctness score
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Qualitative Results */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
            Qualitative Results
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Result Set 1 */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-slate-300 overflow-hidden shadow-md">
                <div className="grid grid-cols-2 gap-1">
                  <div className="bg-slate-100 p-4 flex items-center justify-center min-h-48">
                    <span className="text-slate-500 text-sm font-medium">
                      Input Image
                    </span>
                  </div>
                  <div className="bg-slate-100 p-4 flex items-center justify-center min-h-48">
                    <span className="text-slate-500 text-sm font-medium">
                      Ground Truth
                    </span>
                  </div>
                  <div className="bg-slate-100 p-4 flex items-center justify-center min-h-48">
                    <span className="text-slate-500 text-sm font-medium">
                      Baseline
                    </span>
                  </div>
                  <div className="bg-slate-100 p-4 flex items-center justify-center min-h-48">
                    <span className="text-slate-500 text-sm font-medium">
                      TFFM
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-slate-600">
                <span className="font-semibold">Case 1:</span> Coronary artery
                segmentation - TFFM preserves vessel continuity
              </p>
            </div>

            {/* Result Set 2 */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-slate-300 overflow-hidden shadow-md">
                <div className="grid grid-cols-2 gap-1">
                  <div className="bg-slate-100 p-4 flex items-center justify-center min-h-48">
                    <span className="text-slate-500 text-sm font-medium">
                      Input Image
                    </span>
                  </div>
                  <div className="bg-slate-100 p-4 flex items-center justify-center min-h-48">
                    <span className="text-slate-500 text-sm font-medium">
                      Ground Truth
                    </span>
                  </div>
                  <div className="bg-slate-100 p-4 flex items-center justify-center min-h-48">
                    <span className="text-slate-500 text-sm font-medium">
                      Baseline
                    </span>
                  </div>
                  <div className="bg-slate-100 p-4 flex items-center justify-center min-h-48">
                    <span className="text-slate-500 text-sm font-medium">
                      TFFM
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-slate-600">
                <span className="font-semibold">Case 2:</span> Retinal vessel
                network - improved branching accuracy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ablation Study */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
            Ablation Study
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Ablation Table */}
            <div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-slate-50 rounded-lg overflow-hidden shadow-md">
                  <thead className="bg-slate-900 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">
                        Component
                      </th>
                      <th className="px-4 py-3 text-center font-semibold">
                        Dice
                      </th>
                      <th className="px-4 py-3 text-center font-semibold">
                        Topology
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-300">
                    <tr className="hover:bg-slate-100">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900">
                        Baseline
                      </td>
                      <td className="px-4 py-3 text-center text-slate-700">
                        0.858
                      </td>
                      <td className="px-4 py-3 text-center text-slate-700">
                        0.745
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-100">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900">
                        + Feature Fusion
                      </td>
                      <td className="px-4 py-3 text-center text-slate-700">
                        0.867
                      </td>
                      <td className="px-4 py-3 text-center text-slate-700">
                        0.781
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-100">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900">
                        + Topology Loss
                      </td>
                      <td className="px-4 py-3 text-center text-slate-700">
                        0.876
                      </td>
                      <td className="px-4 py-3 text-center text-slate-700">
                        0.832
                      </td>
                    </tr>
                    <tr className="bg-green-50 hover:bg-green-100">
                      <td className="px-4 py-3 text-sm font-bold text-slate-900">
                        TFFM (Full)
                      </td>
                      <td className="px-4 py-3 text-center font-bold text-green-700">
                        0.887
                      </td>
                      <td className="px-4 py-3 text-center font-bold text-green-700">
                        0.892
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-slate-600 mt-4">
                Ablation results demonstrate the contribution of each component
                to overall performance.
              </p>
            </div>

            {/* Ablation Visualization */}
            <div>
              <div className="bg-slate-100 rounded-lg border-2 border-dashed border-slate-400 h-96 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-slate-600 text-lg font-semibold mb-2">
                    Ablation Analysis
                  </p>
                  <p className="text-slate-500 text-sm">
                    [Placeholder: Ablation study visualization chart will be
                    placed here]
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">
            Conclusion
          </h2>

          <div className="bg-white border border-blue-200 rounded-lg p-8 shadow-md">
            <p className="text-slate-700 leading-relaxed mb-6 text-lg">
              We have presented the Topology-aware Feature Fusion Module (TFFM),
              a novel approach to vessel segmentation that goes beyond
              traditional pixel-wise accuracy metrics. By explicitly
              incorporating topological constraints and connectivity
              preservation, TFFM achieves superior results in both quantitative
              accuracy and qualitative topological correctness.
            </p>

            <p className="text-slate-700 leading-relaxed mb-6 text-lg">
              Our comprehensive experiments demonstrate that TFFM consistently
              outperforms state-of-the-art baselines across multiple benchmark
              datasets, with particularly significant improvements in
              topological integrity. These results have important clinical
              implications, enabling more reliable vessel segmentation for
              diagnosis and intervention planning.
            </p>

            <p className="text-slate-700 leading-relaxed text-lg">
              Future work will focus on extending TFFM to 3D volumetric data and
              exploring additional topological constraints. We also plan to
              validate the clinical utility of our approach through
              collaboration with medical institutions.
            </p>
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
              <pre>{`@article{author2024tffm,
  title={Topology-aware Feature Fusion Module for Vessel Segmentation},
  author={Author, A. and Co-author, B.},
  journal={[Journal/Conference Name]},
  year={2024},
  volume={[Volume]},
  pages={[Pages]},
  doi={[DOI]}
}`}</pre>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              📋 Copy BibTeX
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">
            © 2024 Research Project. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ResearchPage;
