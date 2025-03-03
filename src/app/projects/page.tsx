import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "Web Development Portfolio",
      description: "A collection of websites and web applications I've built using modern technologies.",
      image: "/assets/blog/dynamic-routing/cover.jpg",
      tags: ["React", "Next.js", "Tailwind CSS"],
      link: "https://github.com/yourusername/web-portfolio"
    },
    {
      id: 2,
      title: "Music Production Course",
      description: "An online course I created teaching the fundamentals of electronic music production.",
      image: "/assets/blog/hello-world/cover.jpg",
      tags: ["Education", "Music Production", "Ableton Live"],
      link: "https://yourcoursename.com"
    },
    {
      id: 3,
      title: "Interactive Art Installation",
      description: "A collaborative project combining digital art with physical sensors for an immersive experience.",
      image: "/assets/blog/preview/cover.jpg",
      tags: ["Interactive Art", "Arduino", "Processing"],
      link: "https://yourprojectsite.com"
    },
    {
      id: 4,
      title: "Photography Series",
      description: "A collection of urban landscape photographs exploring light and architecture.",
      image: "/assets/blog/dynamic-routing/cover.jpg",
      tags: ["Photography", "Urban", "Fine Art"],
      link: "https://yourphotographysite.com"
    }
  ];

  return (
    <main>
      <Container>
        <Header />
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-12">
          Projects
        </h1>
        
        <section className="mb-16">
          <div className="bg-neutral-100 dark:bg-slate-800 rounded-lg p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">My Creative Projects</h2>
            <p className="text-lg mb-6">
              Beyond music and art, I work on various projects spanning technology, education, and collaborative ventures.
              Here you'll find a collection of my diverse creative endeavors.
            </p>
          </div>
        </section>
        
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="border border-neutral-200 dark:border-slate-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="bg-neutral-200 dark:bg-slate-700 px-2 py-1 text-sm rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mb-4">{project.description}</p>
                  <a 
                    href={project.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold hover:underline"
                  >
                    View Project →
                  </a>
                </div>
              </div>
            ))}
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