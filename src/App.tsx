import AbstractSection from "./components/abstract-section";
import CitationSection from "./components/citation-seciton";
import ComparisonExample from "./components/comparison-example";
import ResearchPageTFFM from "./components/experiment-section";
import Footer from "./components/footer";
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
      <CitationSection />
      <Footer />
    </div>
  );
}
