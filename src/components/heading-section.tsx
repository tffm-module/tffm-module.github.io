import { FaFilePdf, FaGithub, FaQuoteRight } from "react-icons/fa";
import { HiOutlinePresentationChartLine } from "react-icons/hi";
import { SiArxiv } from "react-icons/si";
import venueLogo from "../assets/venue-logo.webp";

type Author = {
  name: string;
  email?: string;
  affiliation: string;
  profile?: string;
};

export default function HeadingSection() {
  const title =
    "TFFM: Topology-Aware Feature Fusion Module via Latent Graph Reasoning for Retinal Vessel Segmentation";

  const venue = "P2P-CV — WACV 2026";

  const authors: Author[] = [
    {
      name: "Iftekhar Ahmed",
      email: "iftekharifat007@gmail.com",
      affiliation: "Leading University",
      profile: "https://iftekhar.vercel.app/",
    },
    {
      name: "Shakib Absar",
      email: "sabsar42@gmail.com",
      affiliation: "Leading University",
      profile: "https://shakibabsar.vercel.app/",
    },
    {
      name: "Aftar Ahmad Sami",
      email: "asami5@uh.edu",
      affiliation: "University of Houston",
      profile: "https://www.linkedin.com/in/aftar-ahmad-sami/",
    },
    {
      name: "Shadman Sakib",
      email: "ssakib1@umbc.edu",
      affiliation: "University of Maryland, Baltimore County",
      profile: "https://www.linkedin.com/in/shadman-sakib15/",
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

  const INFO = {
    paper:
      "https://openaccess.thecvf.com/content/WACV2026W/P2P/html/Ahmed_TFFM_Topology-Aware_Feature_Fusion_Module_via_Latent_Graph_Reasoning_for_WACVW_2026_paper.html",
    arxiv: "https://arxiv.org/abs/2601.19136",
    bibtex: "#citation",
    code: "https://github.com/tffm-module/tffm-code",
    presentation: "https://youtu.be/WdfXZXfyrzI?si=XXtFM1WRo6DVb68Z",
  };

  /* Build affiliation index automatically */
  const affiliations = Array.from(new Set(authors.map((a) => a.affiliation)));

  return (
    <section className="pt-20 pb-12">
      <div className="mx-auto max-w-5xl px-4 text-center">
        {/* Title */}
        <h1 className="mb-4 text-4xl font-semibold leading-tight tracking-tight text-neutral-900">
          {title}
        </h1>

        {/* Venue */}
        <p className="my-4 text-xl font-medium text-neutral-700">{venue}</p>

        <div className="my-4 flex justify-center">
          <img alt="venue-logo" src={venueLogo} className="w-60" />
        </div>

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
                <sup>{idx + 1}</sup> {aff}{" "}
                {idx < affiliations.length - 1 && ","}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <a
            target="_blank"
            rel="noreferrer"
            href={INFO.paper}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-800 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-900"
          >
            <FaFilePdf /> Paper
          </a>

          <a
            target="_blank"
            rel="noreferrer"
            href={INFO.arxiv}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-800 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-900"
          >
            <SiArxiv /> arXiv
          </a>

          <a
            href={INFO.bibtex}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-800 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-900"
          >
            <FaQuoteRight /> BibTeX
          </a>

          <a
            target="_blank"
            rel="noreferrer"
            href={INFO.code}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-800 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-900"
          >
            <FaGithub /> Code
          </a>

          <a
            target="_blank"
            rel="noreferrer"
            href={INFO.presentation}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-800 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-900"
          >
            <HiOutlinePresentationChartLine /> Presentation
          </a>
        </div>
        {/* <div className="mt-5">
          <em className="text-rose-700">Soon will be updated!</em>
        </div> */}
      </div>
    </section>
  );
}
