import Container from "@/app/_components/container";
//import Header from "@/app/_components/header";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <main>
      <Container>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-12">
          Projects
        </h1>
        
        <section className="mb-16">
          <div className="bg-neutral-100 dark:bg-slate-800 rounded-lg p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">My Creative Projects</h2>
            <p className="text-lg mb-6">
              Beyond music and art, I work on various projects spanning technology, education, and collaborative ventures.
              More projects will be added soon.
            </p>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Collaborations</h2>
          <div className="border border-neutral-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <div className="p-6">
              <p className="text-lg mb-6">
                I'm always open to interesting collaborations across disciplines. If you have a project in mind
                that you think would be a good fit, I'd love to hear about it.
              </p>
              <p className="text-lg mb-6">
                Some of my past collaborations include work with musicians, visual artists, developers, and educators.
              </p>
              <div className="bg-neutral-100 dark:bg-slate-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Interested in working together?</h3>
                <p className="mb-4">
                  Send me a message with details about your project and how you envision us collaborating.
                </p>
                <Link 
                  href="/contact" 
                  className="inline-block bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-2 px-4 duration-200 transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
