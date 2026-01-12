interface AbstractSectionProps {
  id?: string;
}

export default function AbstractSection({
  id = "abstract",
}: AbstractSectionProps) {
  const abstractContent = `Precise segmentation of retinal arteries and veins carries the diagnosis of systemic cardiovascular conditions. However, standard convolutional architectures often yield topologically disjoint segmentations, characterized by gaps and discontinuities that render reliable graph-based clinical analysis impossible despite high pixel-level accuracy.

To address this, we introduce a topology-aware framework engineered to maintain vascular connectivity. Our architecture fuses a Topological Feature Fusion Module (TFFM) that maps local feature representations into a latent graph space, deploying Graph Attention Networks to capture global structural dependencies often missed by fixed receptive fields. We drive the learning process with a hybrid objective function, coupling Tversky loss for class imbalance with soft clDice loss to explicitly penalize topological disconnects.

Evaluation on the Fundus-AVSeg dataset reveals state-of-the-art performance, achieving a combined Dice score of 90.97% and a 95% Hausdorff Distance of 3.50 pixels. Notably, our method decreases vessel fragmentation by approximately 38% relative to baselines, yielding topologically coherent vascular trees viable for automated biomarker quantification.`;

  return (
    <section id={id} className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="w-full lg:w-4/5">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-neutral-800">
              Abstract
            </h2>

            {/* Abstract Content */}
            <div className="space-y-6">
              {abstractContent.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className={`leading-relaxed text-justify ${
                    index === 2
                      ? "italic bg-green-50 p-6 rounded-md border-l-4 border-green-500"
                      : ""
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
