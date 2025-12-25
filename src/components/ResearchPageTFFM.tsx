import React, { useState, useEffect } from "react";
import Comparison, { ComparisonHandle, ComparisonItem } from "./comparison";
import baselineArtery from "../assets/comparison/baseline_artery.png";
import tffmArtery from "../assets/comparison/tffm_artery.png";
import baselineVein from "../assets/comparison/baseline_vein.png";
import tffmVein from "../assets/comparison/tffm_vein.png";
import architectureImg from "../assets/comparison/overall-architecture_page-0001.jpg";
import veinOverlay from "../assets/comparison/vein_tffm_vs_baseline_overlay.png";
import tffmModuleImg from "../assets/comparison/TFFM.jpg";
import visualizationImg from "../assets/comparison/visualization.jpg";

const ResearchPageTFFM: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"combined" | "artery" | "vein">(
    "combined"
  );
  const [showAblation, setShowAblation] = useState(false);
  const [navbarActive, setNavbarActive] = useState(false);
  const [activeMetric, setActiveMetric] = useState<
    "dice" | "clDice" | "hd95" | "components"
  >("dice");

  useEffect(() => {
    // Close mobile menu when window is resized to desktop
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setNavbarActive(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCopyBibTeX = () => {
    const bibTeX = `@article{anonymous2024tffm,
title={TFFM: Topology-Aware Feature Fusion Module via Latent Graph Reasoning for Retinal Vessel Segmentation},
author={Anonymous},
journal={WACV 2026 - Algorithms Track},
year={2026},
paperid={15}
}`;
    navigator.clipboard.writeText(bibTeX).then(() => {
      alert("BibTeX copied to clipboard!");
    });
  };

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
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Google+Sans|Noto+Sans|Castoro"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/jpswalsh/academicons@1/css/academicons.min.css"
      />

      <style>
        {`
        body {
          font-family: 'Noto Sans', sans-serif;
          line-height: 1.6;
          color: #363636;
        }
        .tffm {
          font-variant: small-caps;
        }
        .hero-body {
          padding-top: 3rem;
          padding-bottom: 3rem;
        }
        .publication-title {
          font-family: 'Google Sans', sans-serif;
          line-height: 1.2;
        }
        .publication-authors {
          font-family: 'Google Sans', sans-serif;
        }
        .section {
          padding: 4rem 1.5rem;
        }
        .section-header {
          margin-bottom: 3rem;
          position: relative;
        }
        .section-header::after {
          content: '';
          display: block;
          width: 80px;
          height: 3px;
          background: #363636;
          margin: 1rem auto 0;
        }
        .publication-video {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 56.25%;
          overflow: hidden;
          border-radius: 10px !important;
        }
        .publication-video iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .comparison-container {
          border: 1px solid #dbdbdb;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 2rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
          background: #000;
        }
        .metric-card {
          border: 1px solid #dbdbdb;
          border-radius: 10px;
          padding: 1.5rem;
          text-align: center;
          background: #f5f5f5;
          transition: all 0.3s ease;
          cursor: pointer;
          height: 180px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .metric-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .metric-card.active {
          border-color: #363636;
          background: #e9e9e9;
          position: relative;
        }
        .metric-card.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 3px;
          background: #363636;
        }
        .navbar-burger {
          height: auto;
        }
        .icon-link {
          font-size: 25px;
          color: #000;
        }
        .table-container {
          overflow-x: auto;
          border-radius: 10px;
          margin-bottom: 2rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }
        .elegant-table {
          width: 100%;
          border-collapse: collapse;
          border-radius: 10px;
          overflow: hidden;
          font-size: 0.95rem;
        }
        .elegant-table th {
          background-color: #363636;
          color: white;
          font-weight: 600;
          padding: 1rem;
          text-align: left;
        }
        .elegant-table td {
          padding: 0.8rem 1rem;
          border-bottom: 1px solid #eee;
        }
        .elegant-table tr:last-child td {
          border-bottom: none;
        }
        .elegant-table tr:hover td {
          background-color: #f9f9f9;
        }
        .highlight-row {
          background-color: #f5fffa !important;
        }
        .highlight-row td {
          font-weight: 600;
        }
        .comparison-handle {
          width: 4px;
          background-color: #363636;
          height: 100%;
          cursor: ew-resize;
          position: absolute;
          top: 0;
          box-shadow: 0 0 10px rgba(0,0,0,0.2);
        }
        .diagram-container {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .diagram-box {
          flex: 1;
          border: 1px solid #dbdbdb;
          border-radius: 10px;
          padding: 1.5rem;
          background: white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }
        .diagram-image {
          width: 100%;
          height: 320px;
          object-fit: contain;
          margin-top: 1rem;
          border-radius: 8px;
          background: #f8f8f8;
          padding: 1rem;
        }
        .image-container {
          border: 1px solid #eee;
          border-radius: 8px;
          overflow: hidden;
          margin: 1.5rem 0;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
          background: #f9f9f9;
        }
        .content-image {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
          max-width: 100%;
          margin: 0 auto;
        }
        .tabs ul {
          border-bottom: 2px solid #dbdbdb;
        }
        .tabs li a {
          border-bottom: 3px solid transparent;
          padding: 0.5em 1.5em;
          font-weight: 500;
          color: #7a7a7a;
        }
        .tabs li.is-active a, .tabs li:hover a {
          border-bottom-color: #363636;
          color: #363636;
          font-weight: 600;
        }
        .box {
          border-radius: 10px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
          margin-bottom: 2rem;
          border: 1px solid #eee;
        }
        .key-innovation {
          border-left: 3px solid #363636;
          padding-left: 1rem;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }
        .key-innovation:hover {
          background: #f9f9f9;
          border-left-color: #ff3860;
        }
        .has-visual-padding {
          padding: 1.5rem;
          background: #fafafa;
          border-radius: 10px;
          border: 1px solid #eee;
        }
        .section-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #dbdbdb, transparent);
          margin: 3rem 0;
        }
        .image-comparison {
          position: relative;
          width: 100%;
          height: 400px;
          margin: 1.5rem 0;
        }
        .image-comparison img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }
        .image-label {
          position: absolute;
          bottom: 10px;
          background: rgba(0,0,0,0.7);
          color: white;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 500;
        }
        .image-label.left {
          left: 15px;
        }
        .image-label.right {
          right: 15px;
        }
        .metric-table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }
        .metric-table th, .metric-table td {
          padding: 0.75rem;
          text-align: center;
          border: 1px solid #eee;
        }
        .metric-table th {
          background-color: #363636;
          color: white;
          font-weight: 600;
        }
        .metric-table tr.highlight {
          background-color: #f5fffa;
          font-weight: 600;
        }
        .metric-table tr.best td {
          position: relative;
        }
        .metric-table tr.best td::after {
          content: '★';
          position: absolute;
          top: 2px;
          right: 5px;
          color: gold;
          font-size: 0.8rem;
        }
        .table-caption {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #363636;
          font-size: 1.1rem;
          display: block;
          width: 100%;
        }
        .table-footer {
          font-size: 0.9rem;
          color: #666;
          margin-top: 0.5rem;
          font-style: italic;
        }
        .table-col-30 { width: 30%; }
        .table-col-25 { width: 25%; }
        .table-col-20 { width: 20%; }
        .table-col-15 { width: 15%; }
        .table-col-40 { width: 40%; }
        .text-center { text-align: center; }
        @media (max-width: 768px) {
          .diagram-container {
            flex-direction: column;
          }
          .image-comparison {
            height: 300px;
          }
          .columns.is-mobile .column {
            display: block;
            text-align: center !important;
          }
          .tabs ul {
            flex-wrap: wrap;
          }
          .metric-card {
            height: auto;
            margin-bottom: 1rem;
          }
          .table-responsive {
            overflow-x: auto;
            display: block;
          }
        }
        .highlight-box {
          background: linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%);
          border-left: 4px solid #007bff;
          padding: 1.5rem;
          border-radius: 0 8px 8px 0;
          margin: 1.5rem 0;
        }
        .highlight-box.success {
          border-left-color: #28a745;
        }
        .highlight-box.warning {
          border-left-color: #ffc107;
        }
        .highlight-box.info {
          border-left-color: #17a2b8;
        }
        .caption {
          font-size: 0.9rem;
          color: #666;
          margin-top: 0.5rem;
          font-style: italic;
          text-align: center;
        }
        .table-header {
          background: #f5f5f5;
          padding: 1.5rem;
          border-radius: 10px 10px 0 0;
          border-bottom: 1px solid #dbdbdb;
          margin-bottom: 0;
        }
        .table-description {
          font-size: 0.95rem;
          color: #666;
          margin-bottom: 1rem;
        }
        .metric-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }
        .metric-box {
          border: 1px solid #dbdbdb;
          border-radius: 10px;
          padding: 1.5rem;
          text-align: center;
          background: #f9f9f9;
          transition: all 0.3s ease;
          min-height: 180px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .metric-box:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .metric-box h4 {
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
          color: #363636;
        }
        .metric-box .value {
          font-size: 2rem;
          font-weight: 700;
          color: #363636;
          margin: 0.25rem 0;
        }
        .metric-box .description {
          font-size: 0.85rem;
          color: #666;
        }
        .metric-box.highlight {
          background: #f5fffa;
          border-color: #28a745;
        }
        .tab-container .tabs {
          margin-bottom: 2rem;
        }
        `}
      </style>

      {/* Navbar */}
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <a
              role="button"
              className={`navbar-burger ${navbarActive ? "is-active" : ""}`}
              aria-label="menu"
              aria-expanded={navbarActive}
              onClick={() => setNavbarActive(!navbarActive)}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className={`navbar-menu ${navbarActive ? "is-active" : ""}`}>
            <div
              className="navbar-start"
              style={{ flexGrow: 1, justifyContent: "center" }}
            >
              <a className="navbar-item" href="/">
                <span className="icon">
                  <i className="fas fa-home"></i>
                </span>
              </a>
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">More Research</a>
                <div className="navbar-dropdown">
                  <a className="navbar-item" href="#">
                    Related Projects
                  </a>
                  <a className="navbar-item" href="#">
                    TFFM
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero is-light">
        <div className="hero-body">
          <div className="container is-max-desktop">
            <div className="columns is-centered">
              <div className="column has-text-centered">
                <h1 className="title is-1 publication-title">
                  TFFM: Topology-Aware Feature Fusion Module via Latent Graph
                  Reasoning for Retinal Vessel Segmentation
                </h1>
                <div className="is-size-5 publication-authors">
                  <span className="author-block">
                    <a href="#">Anonymous</a>
                  </span>
                </div>
                <div className="is-size-5 publication-authors">
                  <span className="author-block">
                    WACV 2026 - Algorithms Track
                  </span>
                  <span className="author-block">Paper ID: 15</span>
                </div>
                <div className="column has-text-centered">
                  <div className="publication-links">
                    <span className="link-block">
                      <a
                        href="#pdf"
                        className="external-link button is-normal is-rounded is-dark"
                      >
                        <span className="icon">
                          <i className="fas fa-file-pdf"></i>
                        </span>
                        <span>Paper</span>
                      </a>
                    </span>
                    <span className="link-block">
                      <a
                        href="#code"
                        className="external-link button is-normal is-rounded is-dark"
                      >
                        <span className="icon">
                          <i className="fab fa-github"></i>
                        </span>
                        <span>Code</span>
                      </a>
                    </span>
                    <span className="link-block">
                      <a
                        href="#dataset"
                        className="external-link button is-normal is-rounded is-dark"
                      >
                        <span className="icon">
                          <i className="far fa-images"></i>
                        </span>
                        <span>Dataset</span>
                      </a>
                    </span>
                    <span className="link-block">
                      <button
                        onClick={handleCopyBibTeX}
                        className="button is-normal is-rounded is-dark"
                      >
                        <span className="icon">
                          <i className="fas fa-quote-right"></i>
                        </span>
                        <span>Cite</span>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Abstract Section */}
      <section className="section">
        <div className="container is-max-desktop">
          <div className="columns is-centered">
            <div className="column is-four-fifths">
              <h2 className="title is-3 has-text-centered section-header">
                Abstract
              </h2>
              <div className="content has-text-justified">
                <p>
                  Precise segmentation of retinal arteries and veins carries the
                  diagnosis of systemic cardiovascular conditions. However,
                  standard convolutional architectures often yield topologically
                  disjoint segmentations, characterized by gaps and
                  discontinuities that render reliable graph-based clinical
                  analysis impossible despite high pixel-level accuracy.
                </p>
                <p>
                  To address this, we introduce a topology-aware framework
                  engineered to maintain vascular connectivity. Our architecture
                  fuses a{" "}
                  <span className="has-text-weight-semibold tffm">
                    Topological Feature Fusion Module (TFFM)
                  </span>{" "}
                  that maps local feature representations into a latent graph
                  space, deploying{" "}
                  <span className="has-text-weight-semibold">
                    Graph Attention Networks
                  </span>{" "}
                  to capture global structural dependencies often missed by
                  fixed receptive fields. We drive the learning process with a
                  hybrid objective function, coupling{" "}
                  <span className="has-text-weight-semibold">Tversky loss</span>{" "}
                  for class imbalance with{" "}
                  <span className="has-text-weight-semibold">
                    soft clDice loss
                  </span>{" "}
                  to explicitly penalize topological disconnects.
                </p>
                <p className="is-italic has-background-success-light p-4">
                  Evaluation on the Fundus-AVSeg dataset reveals{" "}
                  <span className="has-text-weight-bold has-text-success">
                    state-of-the-art performance, achieving a combined Dice
                    score of 90.97% and a 95% Hausdorff Distance of 3.50 pixels
                  </span>
                  . Notably, our method decreases vessel fragmentation by
                  approximately{" "}
                  <span className="has-text-weight-bold has-text-success">
                    38% relative to baselines
                  </span>
                  , yielding topologically coherent vascular trees viable for
                  automated biomarker quantification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="section">
        <div className="container is-max-desktop">
          <div className="columns is-centered">
            <div className="column is-four-fifths">
              <h2 className="title is-3 has-text-centered section-header">
                The Topology Crisis in Vessel Segmentation
              </h2>
              <div className="columns">
                <div className="column">
                  <h3 className="title is-4">The Semantic Gap</h3>
                  <div className="block">
                    <div className="message is-dark">
                      <div className="message-body">
                        <p className="has-text-weight-bold">To a Clinician:</p>A
                        blood vessel is a{" "}
                        <span className="has-text-weight-medium is-italic">
                          continuous transport network
                        </span>
                      </div>
                    </div>
                    <div className="message is-primary mt-4">
                      <div className="message-body">
                        <p className="has-text-weight-bold">To a CNN:</p>
                        It is merely a{" "}
                        <span className="has-text-weight-medium is-italic">
                          collection of disjoint pixels
                        </span>
                      </div>
                    </div>
                  </div>

                  <h4 className="title is-5 has-text-danger mt-5">
                    The "Shattered Vessel" Phenomenon
                  </h4>
                  <ul>
                    <li className="mb-2">
                      <span className="icon has-text-danger mr-2">
                        <i className="fas fa-times"></i>
                      </span>
                      High Dice scores (95%+) with severely fragmented
                      predictions
                    </li>
                    <li className="mb-2">
                      <span className="icon has-text-danger mr-2">
                        <i className="fas fa-times"></i>
                      </span>
                      Topologically invalid segmentations render graph analysis
                      impossible
                    </li>
                    <li className="mb-2">
                      <span className="icon has-text-danger mr-2">
                        <i className="fas fa-times"></i>
                      </span>
                      Pixel metrics (Dice, IoU) cannot penalize disconnections
                    </li>
                  </ul>
                </div>
                <div className="column">
                  <h3 className="title is-4">
                    Clinical Requirements for Topology
                  </h3>
                  <div className="message is-info mb-5">
                    <div className="message-header">
                      <p>Why This Matters</p>
                    </div>
                    <div className="message-body">
                      Retinal arteries/veins serve as biomarkers for
                      cardiovascular disease, hypertension, and diabetic
                      retinopathy. For automated biomarker extraction and
                      clinical deployment, segmentations must preserve the
                      vascular tree structure.
                    </div>
                  </div>
                  <ul>
                    <li className="mb-2">
                      <span className="icon has-text-success mr-2">
                        <i className="fas fa-check"></i>
                      </span>
                      Continuous vessel networks enable reliable graph-based
                      analysis
                    </li>
                    <li className="mb-2">
                      <span className="icon has-text-success mr-2">
                        <i className="fas fa-check"></i>
                      </span>
                      Bifurcation preservation critical for tortuosity
                      quantification
                    </li>
                    <li className="mb-2">
                      <span className="icon has-text-success mr-2">
                        <i className="fas fa-check"></i>
                      </span>
                      Enables downstream artery-vein classification
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Method Overview */}
      <section className="section">
        <div className="container is-max-desktop">
          <div className="columns is-centered">
            <div className="column is-four-fifths">
              <h2 className="title is-3 has-text-centered section-header">
                Proposed Method
              </h2>

              <div className="columns is-multiline">
                <div className="column is-one-third">
                  <div className="box has-equal-height">
                    <h3 className="title is-4">Baseline Architecture</h3>
                    <ul>
                      <li className="mb-1">
                        •{" "}
                        <span className="has-text-weight-medium">U-Net++</span>{" "}
                        with nested skip connections
                      </li>
                      <li className="mb-1">
                        •{" "}
                        <span className="has-text-weight-medium">
                          Attention Gates
                        </span>{" "}
                        for feature refinement
                      </li>
                      <li className="mb-1">
                        •{" "}
                        <span className="has-text-weight-medium">
                          EfficientNet-B0
                        </span>{" "}
                        encoder
                      </li>
                      <li className="mb-1">
                        • Selected through systematic ablation (9 baselines
                        tested)
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="column is-one-third">
                  <div className="box has-equal-height">
                    <h3 className="title is-4">TFFM: Graph-Based Reasoning</h3>
                    <ul>
                      <li className="mb-1">
                        • Maps features to{" "}
                        <span className="has-text-weight-medium">
                          latent graph space
                        </span>
                      </li>
                      <li className="mb-1">
                        •{" "}
                        <span className="has-text-weight-medium">
                          Graph Attention Networks (GAT)
                        </span>{" "}
                        for connectivity
                      </li>
                      <li className="mb-1">
                        • Multi-level deployment (5 decoder levels)
                      </li>
                      <li className="mb-1">
                        • Adaptive pooling: 20×20 to 32×32 grid
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="column is-one-third">
                  <div className="box has-equal-height">
                    <h3 className="title is-4">Hybrid Loss Function</h3>
                    <ul>
                      <li className="mb-1">
                        •{" "}
                        <span className="has-text-weight-medium">
                          Tversky Loss
                        </span>{" "}
                        (α=0.65): recall-weighted
                      </li>
                      <li className="mb-1">
                        •{" "}
                        <span className="has-text-weight-medium">
                          soft clDice Loss
                        </span>
                        : topology preservation
                      </li>
                      <li className="mb-1">
                        •{" "}
                        <span className="has-text-weight-medium">
                          Combined weight
                        </span>
                        : L<sub>total</sub> = L<sub>Tv</sub> + 0.5·L
                        <sub>clDice</sub>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="box mt-5">
                <h3 className="title is-4">Key Innovations</h3>
                <div className="columns is-multiline">
                  <div className="column is-half">
                    <div className="key-innovation">
                      <h4 className="title is-5">
                        1. Architecture-Integrated Topology Preservation
                      </h4>
                      <p>
                        TFFM directly models global connectivity at the feature
                        extraction level
                      </p>
                    </div>
                  </div>
                  <div className="column is-half">
                    <div className="key-innovation">
                      <h4 className="title is-5">
                        2. Hybrid Topology-Aware Objective
                      </h4>
                      <p>Combines region overlap with skeleton similarity</p>
                    </div>
                  </div>
                  <div className="column is-half">
                    <div className="key-innovation">
                      <h4 className="title is-5">
                        3. Comprehensive Topological Evaluation
                      </h4>
                      <p>
                        Evaluates beyond Dice/IoU: clDice, Betti error, junction
                        detection
                      </p>
                    </div>
                  </div>
                  <div className="column is-half">
                    <div className="key-innovation">
                      <h4 className="title is-5">
                        4. Cross-Dataset Validation
                      </h4>
                      <p>Zero-shot inference on 5 external benchmarks</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Interactive Visualization */}
      <section className="section">
        <div className="container is-max-desktop">
          <div className="columns is-centered">
            <div className="column is-four-fifths">
              <h2 className="title is-3 has-text-centered section-header">
                Visual Comparison: Baseline vs. TFFM
              </h2>

              <div className="box mb-6">
                <h3 className="title is-4">Artery Segmentation</h3>
                <p className="mb-4">
                  Drag the slider to compare artery segmentation. TFFM preserves
                  vessel continuity and reduces fragmentation significantly.
                </p>

                <div className="comparison-container">
                  <Comparison className="w-full aspect-video rounded-lg overflow-hidden">
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

                <div className="caption">
                  TFFM maintains continuous vessel structure with minimal
                  fragmentation compared to baseline method
                </div>
              </div>

              <div className="box mb-6">
                <h3 className="title is-4">Vein Segmentation</h3>
                <p className="mb-4">
                  Vein segmentation demonstrates superior topology preservation
                  with TFFM, achieving 87.63% Dice score.
                </p>

                <div className="comparison-container">
                  <Comparison className="w-full aspect-video rounded-lg overflow-hidden">
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

                <div className="caption">
                  Vein networks are particularly challenging due to their thin,
                  branching structures; TFFM effectively preserves connectivity
                </div>
              </div>

              <div className="box mb-6">
                <h3 className="title is-4">Combined Artery-Vein Analysis</h3>
                <p className="mb-4">
                  Direct comparison of baseline and TFFM segmentations showing
                  enhanced boundary definition.
                </p>
                <div className="image-container">
                  <img
                    src={veinOverlay}
                    alt="Vein TFFM vs Baseline Overlay"
                    className="content-image"
                  />
                </div>
                <div className="caption">
                  Overlay visualization showing TFFM's (green) vs baseline (red)
                  segmentation results. Note significantly fewer gaps and
                  disconnections with TFFM
                </div>
              </div>

              <div className="diagram-container">
                <div className="diagram-box">
                  <h3 className="title is-4">Overall System Architecture</h3>
                  <p className="mb-3">
                    Complete TFFM architecture diagram showing encoder-decoder
                    structure with integrated modules at multiple scales.
                  </p>
                  <img
                    src={architectureImg}
                    alt="Overall TFFM Architecture"
                    className="diagram-image"
                  />
                  <div className="caption">
                    TFFM integrates latent graph reasoning at multiple scales to
                    ensure global connectivity while maintaining local precision
                  </div>
                </div>
                <div className="diagram-box">
                  <h3 className="title is-4">
                    TFFM Module: Graph-Based Topology Reasoning
                  </h3>
                  <p className="mb-3">
                    Feature mapping to latent graph space with Graph Attention
                    Networks for connectivity preservation.
                  </p>
                  <img
                    src={tffmModuleImg}
                    alt="TFFM Module Deep Dive"
                    className="diagram-image"
                  />
                  <div className="caption">
                    TFFM module adaptively fuses feature maps by reasoning over
                    vascular connectivity in a latent graph space
                  </div>
                </div>
              </div>

              <div className="box mt-6">
                <h3 className="title is-4">
                  Comprehensive Results & Performance Analysis
                </h3>
                <p className="mb-4">
                  Ablation studies, loss curves, topology metrics, cross-dataset
                  generalization, and detailed performance comparisons.
                </p>
                <div className="image-container has-background-white">
                  <img
                    src={visualizationImg}
                    alt="Comprehensive Results Visualization"
                    className="content-image"
                  />
                </div>
                <div className="caption">
                  Performance metrics across different configurations and
                  datasets demonstrate TFFM's superiority in both pixel accuracy
                  and topological correctness
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Comprehensive Results Section */}
      <section className="section">
        <div className="container is-max-desktop">
          <div className="columns is-centered">
            <div className="column is-four-fifths">
              <h2 className="title is-3 has-text-centered section-header">
                Comprehensive Experimental Results
              </h2>

              {/* Final Results - Interactive Tabs */}
              <div className="box mb-6 tab-container">
                <div className="tabs is-toggle is-fullwidth">
                  {(["combined", "artery", "vein"] as const).map((tab) => (
                    <li
                      key={tab}
                      className={activeTab === tab ? "is-active" : ""}
                    >
                      <a onClick={() => setActiveTab(tab)}>
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </a>
                    </li>
                  ))}
                </div>

                <h3 className="title is-4 mb-4 has-text-centered">
                  Final Model Performance
                </h3>

                <div className="metric-container">
                  <div className="metric-box">
                    <h4>Dice Score</h4>
                    <div className="value">{finalResults[activeTab].dice}%</div>
                    <div className="description">Pixel overlap accuracy</div>
                  </div>
                  <div className="metric-box">
                    <h4>clDice</h4>
                    <div className="value">
                      {finalResults[activeTab].clDice}%
                    </div>
                    <div className="description">
                      Skeleton similarity metric
                    </div>
                  </div>
                  <div className="metric-box">
                    <h4>HD95</h4>
                    <div className="value">
                      {finalResults[activeTab].hd95}px
                    </div>
                    <div className="description">
                      95th percentile Hausdorff distance
                    </div>
                  </div>
                  <div className="metric-box">
                    <h4>Components</h4>
                    <div className="value">
                      {Math.round(finalResults[activeTab].components)}
                    </div>
                    <div className="description">
                      Number of disconnected vessel segments
                    </div>
                  </div>
                </div>
              </div>

              {/* Architecture Comparison Table */}
              <div className="box mb-6">
                <div className="table-header">
                  <h3 className="title is-4">
                    Step 1: Baseline Architecture Selection
                  </h3>
                  <p className="table-description">
                    We evaluated multiple encoder-decoder architectures to
                    establish a strong baseline for topological enhancement.
                  </p>
                </div>
                <div className="table-caption">
                  Table 1: Architecture Comparison on Fundus-AVSeg Dataset
                </div>
                <div className="table-container">
                  <table className="elegant-table">
                    <thead>
                      <tr>
                        <th className="table-col-30">Architecture</th>
                        <th className="table-col-20 text-center">Dice (%)</th>
                        <th className="table-col-20 text-center">IoU (%)</th>
                        <th className="table-col-30 text-center">HD95 (px)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {architectureComparison.map((row, idx) => (
                        <tr
                          key={idx}
                          className={
                            row.name === "TFFM (Final)" ? "highlight-row" : ""
                          }
                        >
                          <td className="has-text-weight-medium">{row.name}</td>
                          <td className="text-center">{row.dice}</td>
                          <td className="text-center">{row.iou}</td>
                          <td className="text-center">{row.hd95}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="table-footer">
                  Note: U-Net++ with Attention Gates showed the best balance of
                  accuracy and efficiency as our baseline architecture
                </div>
              </div>

              {/* Loss Function Comparison */}
              <div className="box mb-6">
                <div className="table-header">
                  <h3 className="title is-4">
                    Step 2: Loss Function Optimization
                  </h3>
                  <p className="table-description">
                    We compared multiple loss functions to balance pixel
                    accuracy with topological coherence.
                  </p>
                </div>
                <div className="table-caption">
                  Table 2: Loss Function Comparison (Baseline Architecture)
                </div>
                <div className="table-container">
                  <table className="elegant-table">
                    <thead>
                      <tr>
                        <th className="table-col-25">Loss Function</th>
                        <th className="table-col-20 text-center">Dice (%)</th>
                        <th className="table-col-25 text-center">
                          Topology Error
                        </th>
                        <th className="table-col-30 text-center">
                          Fragmentation
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {lossComparison.map((row, idx) => (
                        <tr key={idx}>
                          <td className="has-text-weight-medium">{row.name}</td>
                          <td className="text-center">{row.dice}</td>
                          <td className="text-center">{row.topology}</td>
                          <td className="text-center">{row.fragmentation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="table-footer">
                  Note: Tversky loss (α=0.65) achieved the best balance of
                  recall (vessel coverage) and topology preservation
                </div>
              </div>

              {/* Encoder Comparison */}
              <div className="box mb-6">
                <div className="table-header">
                  <h3 className="title is-4">Step 3: Encoder Selection</h3>
                  <p className="table-description">
                    We evaluated multiple backbone encoders to optimize feature
                    extraction for vessel topology.
                  </p>
                </div>
                <div className="table-caption">
                  Table 3: Encoder Backbone Comparison
                </div>
                <div className="table-container">
                  <table className="elegant-table">
                    <thead>
                      <tr>
                        <th className="table-col-30">Encoder</th>
                        <th className="table-col-20 text-center">
                          Artery Dice (%)
                        </th>
                        <th className="table-col-20 text-center">
                          Vein Dice (%)
                        </th>
                        <th className="table-col-30 text-center">
                          Betti Error
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {encoderComparison.map((row, idx) => (
                        <tr
                          key={idx}
                          className={
                            row.name === "EfficientNet-B0 (Selected)"
                              ? "highlight-row"
                              : ""
                          }
                        >
                          <td className="has-text-weight-medium">{row.name}</td>
                          <td className="text-center">{row.arteryDice}</td>
                          <td className="text-center">{row.veinDice}</td>
                          <td className="text-center">{row.betti}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="table-footer">
                  Note: EfficientNet-B0 provided the optimal balance of
                  accuracy, topology preservation, and computational efficiency
                </div>
              </div>

              {/* Ablation Study */}
              <div className="box">
                <div className="is-flex is-justify-content-space-between is-align-items-center mb-4">
                  <h3 className="title is-4">
                    Step 4: Topological Refinement (TFFM Ablation)
                  </h3>
                  <button
                    onClick={() => setShowAblation(!showAblation)}
                    className="button is-dark is-rounded"
                  >
                    {showAblation ? "Hide" : "Show"} Details
                  </button>
                </div>

                {showAblation && (
                  <div className="message is-info mb-4 has-visual-padding">
                    <div className="message-header">
                      <p>Ablation Strategy</p>
                    </div>
                    <div className="message-body">
                      <ul>
                        <li className="mb-1">
                          •{" "}
                          <span className="has-text-weight-medium">
                            Baseline:
                          </span>{" "}
                          U-Net++ (Attn) + EfficientNet-B0 + Tversky Loss
                        </li>
                        <li className="mb-1">
                          •{" "}
                          <span className="has-text-weight-medium">
                            + TFFM:
                          </span>{" "}
                          Add Topology-aware Feature Fusion Module
                        </li>
                        <li className="mb-1">
                          •{" "}
                          <span className="has-text-weight-medium">
                            + clDice Loss:
                          </span>{" "}
                          Replace loss with Tversky + soft clDice hybrid
                        </li>
                        <li className="mb-1">
                          •{" "}
                          <span className="has-text-weight-medium">
                            + Augmentation:
                          </span>{" "}
                          Apply comprehensive data augmentation pipeline
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                <div className="table-caption">
                  Table 4: Ablation Study of Topological Components
                </div>
                <div className="table-container">
                  <table className="elegant-table">
                    <thead>
                      <tr>
                        <th className="table-col-30">Configuration</th>
                        <th className="table-col-15 text-center">Dice (%)</th>
                        <th className="table-col-15 text-center">clDice (%)</th>
                        <th className="table-col-20 text-center">
                          Betti Error
                        </th>
                        <th className="table-col-20 text-center">
                          Junction F1 (%)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {ablationStudy.map((row, idx) => (
                        <tr
                          key={idx}
                          className={
                            row.name === "Full (+ Augmentation)"
                              ? "highlight-row has-text-weight-bold"
                              : ""
                          }
                        >
                          <td className="has-text-weight-medium">{row.name}</td>
                          <td className="text-center">{row.dice}</td>
                          <td className="text-center">{row.clDice}</td>
                          <td className="text-center">{row.betti}</td>
                          <td className="text-center">{row.juncF1}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="table-footer">
                  Note: Each component contributes significantly to topological
                  preservation, with TFFM module and clDice loss providing the
                  most substantial improvements
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Cross-Dataset Generalization */}
      <section className="section">
        <div className="container is-max-desktop">
          <div className="columns is-centered">
            <div className="column is-four-fifths">
              <h2 className="title is-3 has-text-centered section-header">
                Cross-Dataset Generalization & Robustness
              </h2>

              <div className="box mb-6">
                <div className="table-header">
                  <h3 className="title is-5">
                    Zero-Shot Inference on 5 External Benchmarks
                  </h3>
                  <p className="table-description">
                    Model trained on Fundus-AVSeg, tested directly on DRIVE,
                    CHASEDB1, HRF, RETA, STARE
                  </p>
                </div>

                <div className="table-caption">
                  Table 5: Cross-Dataset Generalization Performance
                </div>
                <div className="table-container">
                  <table className="elegant-table">
                    <thead>
                      <tr>
                        <th className="table-col-25">Dataset</th>
                        <th className="table-col-15 text-center">Dice (%)</th>
                        <th className="table-col-15 text-center">HD95 (px)</th>
                        <th className="table-col-15 text-center">clDice (%)</th>
                        <th className="table-col-15 text-center">
                          Betti Error
                        </th>
                        <th className="table-col-15 text-center">
                          Junc-F1 (%)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {crossDataset.map((row, idx) => (
                        <tr
                          key={idx}
                          className={
                            idx === 0
                              ? "highlight-row has-text-weight-bold"
                              : ""
                          }
                        >
                          <td className="has-text-weight-medium">{row.name}</td>
                          <td className="text-center">{row.dice}</td>
                          <td className="text-center">{row.hd95}</td>
                          <td className="text-center">{row.clDice}</td>
                          <td className="text-center">{row.betti}</td>
                          <td className="text-center">{row.juncF1}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="table-footer">
                  Note: TFFM demonstrates strong generalization across diverse
                  datasets, maintaining topology preservation even when
                  pixel-level metrics decrease
                </div>
              </div>

              <div className="columns">
                <div className="column">
                  <div className="box">
                    <h4 className="title is-4 has-text-success">✓ Strengths</h4>
                    <ul>
                      <li className="mb-3">
                        <span className="icon has-text-success mr-2">
                          <i className="fas fa-check"></i>
                        </span>
                        <span>
                          <span className="has-text-weight-medium">
                            Consistent topology preservation:
                          </span>{" "}
                          clDice maintains 68-74% across datasets
                        </span>
                      </li>
                      <li className="mb-3">
                        <span className="icon has-text-success mr-2">
                          <i className="fas fa-check"></i>
                        </span>
                        <span>
                          <span className="has-text-weight-medium">
                            Strong on similar domains:
                          </span>{" "}
                          DRIVE (82.1%) and RETA (82.2%)
                        </span>
                      </li>
                      <li className="mb-3">
                        <span className="icon has-text-success mr-2">
                          <i className="fas fa-check"></i>
                        </span>
                        <span>
                          <span className="has-text-weight-medium">
                            Low connectivity errors:
                          </span>{" "}
                          DRIVE shows lowest Betti-Error (24.2)
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="column">
                  <div className="box">
                    <h4 className="title is-4 has-text-warning">
                      ⚠️ Challenges
                    </h4>
                    <ul>
                      <li className="mb-3">
                        <span className="icon has-text-warning mr-2">
                          <i className="fas fa-exclamation-triangle"></i>
                        </span>
                        <span>
                          <span className="has-text-weight-medium">
                            CHASEDB1 fragmentation:
                          </span>{" "}
                          Pediatric vasculature (Betti=50.5)
                        </span>
                      </li>
                      <li className="mb-3">
                        <span className="icon has-text-warning mr-2">
                          <i className="fas fa-exclamation-triangle"></i>
                        </span>
                        <span>
                          <span className="has-text-weight-medium">
                            STARE pathology:
                          </span>{" "}
                          High myopia cases (HD95=33.25)
                        </span>
                      </li>
                      <li className="mb-3">
                        <span className="icon has-text-warning mr-2">
                          <i className="fas fa-exclamation-triangle"></i>
                        </span>
                        <span>
                          <span className="has-text-weight-medium">
                            Junction detection limits:
                          </span>{" "}
                          Recall 0.44-0.52
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="highlight-box info mt-5">
                <h4 className="title is-5">Clinical Translation Insight</h4>
                <p>
                  While pixel-level metrics (Dice) show expected performance
                  degradation on external datasets, our topology-focused metrics
                  (clDice, Betti error) remain remarkably consistent. This
                  demonstrates TFFM's robustness to domain shifts and its
                  clinical viability for automated biomarker extraction across
                  diverse patient populations and imaging conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Data Augmentation */}
      <section className="section">
        <div className="container is-max-desktop">
          <div className="columns is-centered">
            <div className="column is-four-fifths">
              <h2 className="title is-3 has-text-centered section-header">
                Data Augmentation Pipeline
              </h2>

              <div className="box">
                <div className="table-header">
                  <h3 className="title is-4">Data Augmentation Strategies</h3>
                  <p className="table-description">
                    Comprehensive data augmentation was essential for training a
                    robust model that generalizes well to unseen data. Our
                    pipeline includes geometric transformations, intensity
                    variations, and noise injection specifically designed to
                    improve topology preservation.
                  </p>
                </div>

                <div className="table-caption">
                  Table 6: Data Augmentation Strategies and Parameters
                </div>
                <div className="table-container">
                  <table className="elegant-table">
                    <thead>
                      <tr>
                        <th className="table-col-50">Technique</th>
                        <th className="table-col-50 text-center">Parameters</th>
                        {/* <th className="table-col-40 text-center">
                          Probability
                        </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {augmentationStrategies.map((aug, idx) => (
                        <tr key={idx}>
                          <td className="has-text-weight-medium">{aug.name}</td>
                          <td className="text-center has-text-weight-light">
                            {aug.range}
                          </td>
                          {/* <td className="text-center">
                            {(aug.probability * 100).toFixed(0)}%
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="table-footer">
                  Note: Augmentation strategies were carefully selected to
                  preserve topology while increasing robustness to imaging
                  variations
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Conclusion */}
      <section className="section">
        <div className="container is-max-desktop">
          <div className="columns is-centered">
            <div className="column is-four-fifths">
              <h2 className="title is-3 has-text-centered section-header">
                Conclusion & Impact
              </h2>

              <div className="box mb-5">
                <h3 className="title is-4">Key Findings</h3>
                <ul>
                  <li className="mb-2">
                    <span className="icon has-text-primary mr-2">
                      <i className="fas fa-arrow-right"></i>
                    </span>
                    <span>
                      TFFM addresses the disconnect between pixel-level accuracy
                      and topological validity
                    </span>
                  </li>
                  <li className="mb-2">
                    <span className="icon has-text-primary mr-2">
                      <i className="fas fa-arrow-right"></i>
                    </span>
                    <span>
                      Architecture-integrated topology reasoning outperforms
                      loss-only approaches
                    </span>
                  </li>
                  <li className="mb-2">
                    <span className="icon has-text-primary mr-2">
                      <i className="fas fa-arrow-right"></i>
                    </span>
                    <span>
                      38% fragmentation reduction while maintaining high Dice
                      (90.97%)
                    </span>
                  </li>
                  <li className="mb-2">
                    <span className="icon has-text-primary mr-2">
                      <i className="fas fa-arrow-right"></i>
                    </span>
                    <span>
                      Cross-dataset evaluation confirms robust topology
                      preservation
                    </span>
                  </li>
                </ul>
              </div>

              <div className="box">
                <h3 className="title is-4">Clinical Significance</h3>
                <p className="mb-3">
                  Topologically coherent segmentations viable for automated
                  biomarker quantification in cardiovascular disease screening:
                </p>
                <ul>
                  <li>• Automated tortuosity quantification</li>
                  <li>
                    • Artery-vein classification with graph-based features
                  </li>
                  <li>• Bifurcation point detection and analysis</li>
                  <li>• Clinical decision support with reliable topology</li>
                </ul>
                <div className="highlight-box success mt-4">
                  <p>
                    <strong>Clinical Impact:</strong> By preserving vascular
                    topology, TFFM enables direct translation of segmentation
                    results to clinical biomarkers without requiring
                    post-processing to reconnect fragmented vessels, potentially
                    accelerating diagnostic workflows for cardiovascular disease
                    screening.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Citation */}
      <section className="section">
        <div className="container is-max-desktop">
          <div className="columns is-centered">
            <div className="column is-four-fifths">
              <h2 className="title is-3 has-text-centered section-header">
                Citation
              </h2>

              <div className="box has-text-centered">
                <div
                  className="has-background-grey-lighter p-4 mb-4"
                  style={{ borderRadius: "10px" }}
                >
                  <pre
                    className="has-text-left has-text-grey-dark"
                    style={{ fontFamily: "monospace", overflowX: "auto" }}
                  >
                    {`@article{anonymous2024tffm,
  title={TFFM: Topology-Aware Feature Fusion Module
  via Latent Graph Reasoning for Retinal
  Vessel Segmentation},
  author={Anonymous},
  journal={WACV 2026 - Algorithms Track},
  year={2026},
  paperid={15}
}`}
                  </pre>
                </div>
                <button
                  onClick={handleCopyBibTeX}
                  className="button is-dark is-rounded is-large"
                >
                  <span className="icon">
                    <i className="fas fa-clipboard"></i>
                  </span>
                  <span>Copy BibTeX</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="content has-text-centered">
            <div className="mb-4">
              <a className="icon-link mx-2" href="#pdf">
                <i className="fas fa-file-pdf"></i>
              </a>
              <a className="icon-link mx-2" href="#code">
                <i className="fab fa-github"></i>
              </a>
            </div>
            <p>© 2025 TFFM Research Project. Built for WACV 2026 Submission.</p>
            <p className="mt-2">
              This website is licensed under a{" "}
              <a
                rel="license"
                href="http://creativecommons.org/licenses/by-sa/4.0/"
              >
                Creative Commons Attribution-ShareAlike 4.0 International
                License
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ResearchPageTFFM;
