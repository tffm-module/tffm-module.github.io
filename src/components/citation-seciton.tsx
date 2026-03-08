import { useState } from "react";
import { FaClipboard, FaCheck } from "react-icons/fa";

interface CitationSectionProps {
  id?: string;
}

export default function CitationSection({
  id = "citation",
}: CitationSectionProps) {
  const [copied, setCopied] = useState(false);

  const bibTeX = `@InProceedings{Ahmed_2026_WACV,
    author    = {Ahmed, Iftekhar and Absar, Shakib and Sami, Aftar Ahmad and Sakib, Shadman and Biswas, Debojyoti and Al Mahmud Mostafa, Seraj},
    title     = {TFFM: Topology-Aware Feature Fusion Module via Latent Graph Reasoning for Retinal Vessel Segmentation},
    booktitle = {Proceedings of the IEEE/CVF Winter Conference on Applications of Computer Vision (WACV) Workshops},
    month     = {March},
    year      = {2026},
    pages     = {359-368}
}`;

  const handleCopyBibTeX = async () => {
    try {
      await navigator.clipboard.writeText(bibTeX);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <section id={id} className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="w-full lg:w-4/5">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-neutral-800">
              Citation
            </h2>

            <div className="relative bg-neutral-50 border border-neutral-200 rounded-lg p-6 font-mono">
              <button
                onClick={handleCopyBibTeX}
                className={`
                    absolute -top-3 -right-3
                    flex items-center justify-center gap-2
                    px-2 py-2 rounded-lg
                    transition-all duration-200
                    transform
                    ${
                      copied
                        ? "bg-green-500"
                        : "bg-blue-600 hover:cursor-pointer"
                    }
                    text-white font-medium text-sm
                    shadow-md hover:shadow-lg
                    border border-neutral-300
                    z-10
                  `}
                title="Copy BibTeX to clipboard"
                aria-label="Copy BibTeX citation"
              >
                {copied ? (
                  <>
                    <FaCheck className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    <FaClipboard className="w-5 h-5" />
                  </>
                )}
              </button>

              <pre className="text-sm md:text-base text-neutral-800 overflow-x-auto pt-1 pr-2">
                {bibTeX}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
