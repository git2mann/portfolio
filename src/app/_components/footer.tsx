import Container from "@/app/_components/container";
import { SITE_NAME } from "@/lib/constants";

/**
 * Footer component
 * Displays the site footer with site name, definition, and social links
 */
export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800">
      <Container>
        {/* Main Footer Content */}
        <div className="py-16 flex flex-col lg:flex-row justify-between items-center">
          {/* Site Name + Definition */}
          <div className="text-center lg:text-left">
            <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight">
              {SITE_NAME}.
            </h3>
            <p className="text-lg text-neutral-500 dark:text-neutral-400 mt-1">
              <b>klense</b> <em>/klɛnz/</em> <b><em>n. </em></b>the artist.
            </p>
          </div>

          {/* Social Links as a List */}
          <ul className="flex space-x-6 mt-6 lg:mt-0">
            {[
              { name: "X", url: "https://x.com/leonnduati" },
              { name: "Instagram", url: "https://instagram.com/thoughtsofman_" },
              { name: "GitHub", url: "https://github.com/git2mann" },
            ].map(({ name, url }) => (
              <li key={name}>
                <a
                  href={url}
                  className="font-bold hover:underline transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Secondary Footer for Copyright Info */}
        <div className="border-t border-neutral-200 dark:border-neutral-600 text-center py-4 text-sm">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
