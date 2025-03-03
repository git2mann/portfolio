import Container from "@/app/_components/container";
import { SITE_NAME } from "@/lib/constants";

/**
 * Footer component
 * Displays the site footer with site name and social links
 */
export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          {/* Site name */}
          <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            {SITE_NAME}
          </h3>
          <h4 className="text-center md:text-left text-lg mt-5 lg:mt-0">
            <em>/klɛnz/</em>
          </h4>
          {/* Social links */}
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <div className="flex space-x-4">
              <a
                href="https://x.com/leonnduati"
                className="mx-3 font-bold hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                X/Twitter
              </a>
              <a
                href="https://instagram.com/thoughtsofman_"
                className="mx-3 font-bold hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://github.com/git2mann"
                className="mx-3 font-bold hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
