import { FaGithub, FaCreativeCommons } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200 py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <div className="text-center space-y-2">
            <p>
              The website is inspired from{" "}
              <a
                href="https://nerfies.github.io/"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline font-medium"
                rel="noopener noreferrer"
                target="_blank"
              >
                nerfies
              </a>
            </p>
            <div className="flex justify-center gap-2">
              <p>Source Code:</p>
              <a
                href="https://github.com/tffm-module/tffm-module.github.io"
                aria-label="GitHub Repository"
              >
                <FaGithub className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            </div>

            <div className="flex text-sm text-neutral-500 gap-2 justify-center">
              <p>Licensed under </p>
              <a
                href="http://creativecommons.org/licenses/by-sa/4.0/"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline font-medium"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaCreativeCommons className="w-4 h-4 mr-1" />
                CC BY-SA 4.0
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
