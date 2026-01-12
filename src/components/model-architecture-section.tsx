import overallArchitecture from "../assets/comparison/overall-architecture_page-0001.jpg";
import tffmArchitecture from "../assets/comparison/TFFM.jpg";

interface ModelArchitectureSectionProps {
  id?: string;
}

export default function ModelArchitectureSection({
  id = "model-architecture",
}: ModelArchitectureSectionProps) {
  return (
    <section id={id} className="pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-neutral-800">
          Model Architecture
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2">
            <img
              src={overallArchitecture}
              alt="Overall model architecture"
              className="w-full h-auto rounded"
              loading="lazy"
            />
          </div>

          <div className="lg:col-span-1">
            <img
              src={tffmArchitecture}
              alt="TFFM module architecture"
              className="w-full h-auto rounded"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
