import Comparison, { ComparisonHandle, ComparisonItem } from "./comparison";
import baselineArtery from "../assets/comparison/baseline_artery.png";
import tffmArtery from "../assets/comparison/tffm_artery.png";
import baselineVein from "../assets/comparison/baseline_vein.png";
import tffmVein from "../assets/comparison/tffm_vein.png";
import architectureImg from "../assets/comparison/overall-architecture_page-0001.jpg";
import veinOverlay from "../assets/comparison/vein_tffm_vs_baseline_overlay.png";
import tffmModuleImg from "../assets/comparison/TFFM.jpg";
import visualizationImg from "../assets/comparison/visualization.jpg";

export default function ComparisonExample() {
  return (
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

              <div className="flex justify-center">
                <Comparison className="w-[700px] h-[700px] rounded-lg">
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
                  TFFM (Ours)
                </span>
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

              <div className="flex justify-center">
                <Comparison className="w-[700px] h-[700px] rounded-lg overflow-hidden">
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
                Performance metrics across different configurations and datasets
                demonstrate TFFM's superiority in both pixel accuracy and
                topological correctness
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
