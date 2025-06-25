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
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight -ml-1">
          {SITE_NAME}.
        </h1>
        <h4 className="text-lg mt-2">
          <b>klense</b> <em>/klɛnz/</em> <b><em>n. </em></b>the artist.
        </h4>
      </div>
    </section>
  );
}
