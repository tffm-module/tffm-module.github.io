import { FaFilePdf, FaGithub, FaQuoteRight } from "react-icons/fa";
import { SiArxiv } from "react-icons/si";

type Author = {
  name: string;
  email?: string;
  affiliation: string;
  profile?: string;
};

export default function PaperHero() {
  const title =
    "TFFM: Topology-Aware Feature Fusion Module via Latent Graph Reasoning for Retinal Vessel Segmentation";

  const venue = "P2P-CV — WACV 2026";

  const authors: Author[] = [
    {
      name: "Iftekhar Ahmed",
      email: "iftekharifat007@gmail.com",
      affiliation: "Leading University",
      profile: "https://openreview.net/profile?id=%7EIftekhar_Ahmed2",
    },
    {
      name: "Shakib Absar",
      email: "sabsar42@gmail.com",
      affiliation: "Leading University",
      profile: "https://openreview.net/profile?id=%7EShakib_Absar1",
    },
    {
      name: "Aftar Ahmad Sami",
      email: "asami5@uh.edu",
      affiliation: "University of Houston",
      profile: "https://openreview.net/profile?id=%7EAftar_Ahmad_Sami1",
    },
    {
      name: "Shadman Sakib",
      email: "ssakib1@umbc.edu",
      affiliation: "University of Maryland, Baltimore County",
      profile: "https://openreview.net/profile?id=~Shadman_Sakib1",
    },
    {
      name: "Debojyoti Biswas",
      email: "debojyoti_biswas@txstate.edu",
      affiliation: "Pennsylvania State University",
      profile: "https://openreview.net/profile?id=~Debojyoti_Biswas1",
    },
    {
      name: "Seraj Al Mahmud Mostafa",
      email: "serajmostafa@umbc.edu",
      affiliation: "University of Maryland, Baltimore County",
      profile: "https://openreview.net/profile?id=%7ESeraj_Al_Mahmud_Mostafa1",
    },
  ];

  /* Build affiliation index automatically */
  const affiliations = Array.from(new Set(authors.map((a) => a.affiliation)));

  return (
    <section className="bg-neutral-200 py-20">
      <div className="mx-auto max-w-5xl px-4 text-center">
        {/* Title */}
        <h1 className="mb-4 text-4xl font-semibold leading-tight tracking-tight text-neutral-900">
          {title}
        </h1>

        {/* Venue */}
        <p className="mb-4 text-xl font-medium text-neutral-700">{venue}</p>

        {/* Authors */}
        <div className="mb-4 text-base text-blue-600">
          {authors.length === 0 ? (
            <span className="italic text-neutral-600">Anonymous author</span>
          ) : (
            <div className="flex flex-wrap justify-center gap-x-2 gap-y-1">
              {authors.map((author, idx) => {
                const affIndex = affiliations.indexOf(author.affiliation) + 1;

                return (
                  <span key={idx} className="whitespace-nowrap">
                    {author.profile ? (
                      <a
                        href={author.profile}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline"
                      >
                        {author.name}
                      </a>
                    ) : (
                      author.name
                    )}
                    <sup className="ml-0.5 text-xs text-neutral-600">
                      {affIndex}
                    </sup>
                    {idx < authors.length - 1 && ","}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Affiliations */}
        {authors.length > 0 && (
          <div className="mb-8 text-sm text-neutral-600">
            {affiliations.map((aff, idx) => (
              <span key={idx} className="mx-2">
                <sup>{idx + 1}</sup> {aff}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="#pdf"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-800 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-900"
          >
            <FaFilePdf /> Paper
          </a>

          <a
            href="#arxiv"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-800 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-900"
          >
            <SiArxiv /> arXiv
          </a>

          <a
            href="#bibtex"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-800 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-900"
          >
            <FaQuoteRight /> BibTeX
          </a>

          <a
            href="#code"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-800 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-900"
          >
            <FaGithub /> Code
          </a>
        </div>
      </div>
    </section>
  );
}
