import AbstractSection from "./components/abstract-section";
import CitationSection from "./components/citation-seciton";
import ComparisonExample from "./components/comparison-example";
import Footer from "./components/footer";
import ModelArchitectureSection from "./components/model-architecture-section";
import HeadingSection from "./components/heading-section";
import ExperimentSection from "./components/experiment-section";

export default function App() {
  return (
    <div className="font-lb">
      <HeadingSection />
      <AbstractSection />
      <ModelArchitectureSection />
      <ComparisonExample />
      <ExperimentSection />
      <CitationSection />
      <Footer />
    </div>
  );
}
