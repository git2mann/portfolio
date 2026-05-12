import { CMS_NAME, SITE_NAME } from "@/lib/constants";

/**
 * Intro component
 * Displays the site title and a brief description
 * Used on the home page
 */
export function Intro() {
  return (
    <section className="flex flex-col items-start mt-16 mb-16 md:mb-12">
      {/* Site title and description stacked, left-aligned */}
      <div className="text-left">
        <h1 className="text-6xl md:text-9xl font-light tracking-tighter leading-tight -ml-1">
          {SITE_NAME}.
        </h1>
        <h4 className="text-xl mt-2 font-light">
          <span className="font-medium">klense</span> /klɛnz/ <span className="font-medium">n.</span> the artist.
        </h4>
      </div>
    </section>
  );
}
