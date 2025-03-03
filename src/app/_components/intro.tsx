import { CMS_NAME, SITE_NAME } from "@/lib/constants";

/**
 * Intro component
 * Displays the site title and a brief description
 * Used on the home page
 */
export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      {/* Site title */}
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        {SITE_NAME}
      </h1>
      {/* Site description */}
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        <b>klense</b> <em>/klɛnz/</em>
      </h4>
    </section>
  );
}
