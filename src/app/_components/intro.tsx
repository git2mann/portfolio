import { CMS_NAME, SITE_NAME } from "@/lib/constants";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <div className="text-center md:text-left cursor-pointer" title="Click me multiple times!">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 transition-all duration-300 hover:scale-105">
          {SITE_NAME}.
        </h1>
        <h4 className="text-lg mt-2">
          <b>klense</b> <em>/klɛnz/</em> <b><em>n. </em></b>
          <span className="hover:animate-bounce inline-block">the</span>{' '}
          <span className="hover:animate-pulse inline-block">artist</span>.
        </h4>
      </div>
    </section>
  );
}
