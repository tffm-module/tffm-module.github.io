import Comparison, { ComparisonHandle, ComparisonItem } from "./comparison";
import baselineArtery from "../assets/comparison/baseline_artery.png";
import tffmArtery from "../assets/comparison/tffm_artery.png";
import baselineVein from "../assets/comparison/baseline_vein.png";
import tffmVein from "../assets/comparison/tffm_vein.png";
import visualizationImg from "../assets/comparison/visualization.jpg";

const comparisonSections = [
  {
    id: "artery",
    title: "Artery Segmentation",
    leftImage: baselineArtery,
    rightImage: tffmArtery,
    leftLabel: "Baseline Artery",
    rightLabel: "TFFM (Ours)",
    leftLabelColor: "#9B59B6",
    rightLabelColor: "#E74C3C",
  },
  {
    id: "vein",
    title: "Vein Segmentation",
    leftImage: baselineVein,
    rightImage: tffmVein,
    leftLabel: "Baseline Vein",
    rightLabel: "TFFM (Ours)",
    leftLabelColor: "#F39C12",
    rightLabelColor: "#3498DB",
  },
];

const overlaySection = {
  id: "overlay",
  title: "Overlay visualization",
  image: visualizationImg,
};

export default function ComparisonExample() {
  return (
    <section className="py-16 bg-neutral-100">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center text-3xl font-semibold tracking-tight">
          Visual Comparison: Baseline vs. TFFM
        </div>

        {/* Comparison cards */}
        <div className="flex flex-col gap-8 md:flex-row">
          {comparisonSections.map((section) => (
            <div
              key={section.id}
              className="flex-1 rounded-md border border-gray-200 p-5 shadow-sm"
            >
              <div className="mb-2 text-lg font-semibold">{section.title}</div>

              <div className="mb-4 flex justify-center">
                <Comparison className="aspect-square w-full max-w-md rounded-lg overflow-hidden">
                  <ComparisonItem position="left">
                    <img
                      src={section.leftImage}
                      alt={section.leftLabel}
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  </ComparisonItem>
                  <ComparisonItem position="right">
                    <img
                      src={section.rightImage}
                      alt={section.rightLabel}
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  </ComparisonItem>
                  <ComparisonHandle position={50} />
                </Comparison>
              </div>

              <div className="flex justify-between text-xs font-bold">
                <span style={{ color: section.leftLabelColor }}>
                  {section.leftLabel}
                </span>
                <span style={{ color: section.rightLabelColor }}>
                  {section.rightLabel}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Results section */}
        <div className="mt-10 rounded-md border border-gray-200 p-5 shadow-sm">
          <div className="mb-5 text-xl font-semibold">
            {overlaySection.title}
          </div>
          <img
            src={overlaySection.image}
            alt={overlaySection.title}
            className="mx-auto w-full rounded-lg object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
