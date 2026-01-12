import AbstractSection from "./components/abstract-section";
import ComparisonExample from "./components/comparison-example";
import ResearchPageTFFM from "./components/experiment-section";
import ModelArchitectureSection from "./components/model-architecture-section";
import PaperHero from "./components/paper-hero";

export default function App() {
  return (
    <div className="font-lb">
      <PaperHero />
      <AbstractSection />
      <ModelArchitectureSection />
      <ComparisonExample />
      <ResearchPageTFFM />
    </div>
  );
}
