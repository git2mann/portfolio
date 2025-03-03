import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import Image from "next/image";

export default function ArtPage() {
  const artworks = [
    {
      id: 1,
      title: "Abstract Composition",
      description: "A mixed media piece exploring color and form.",
      image: "/assets/blog/dynamic-routing/cover.jpg",
      year: "2023",
      medium: "Acrylic and collage on canvas"
    },
    {
      id: 2,
      title: "Urban Landscape",
      description: "A study of city architecture and light.",
      image: "/assets/blog/hello-world/cover.jpg",
      year: "2022",
      medium: "Oil on canvas"
    },
    {
      id: 3,
      title: "Digital Dreamscape",
      description: "A digital illustration exploring surreal themes.",
      image: "/assets/blog/preview/cover.jpg",
      year: "2023",
      medium: "Digital illustration"
    },
    {
      id: 4,
      title: "Nature Study",
      description: "A detailed observation of natural forms.",
      image: "/assets/blog/dynamic-routing/cover.jpg",
      year: "2021",
      medium: "Watercolor on paper"
    },
    {
      id: 5,
      title: "Portrait Series",
      description: "Exploring human expression and emotion.",
      image: "/assets/blog/hello-world/cover.jpg",
      year: "2022",
      medium: "Charcoal and pastel"
    },
    {
      id: 6,
      title: "Experimental Piece",
      description: "Pushing boundaries with unconventional materials.",
      image: "/assets/blog/preview/cover.jpg",
      year: "2023",
      medium: "Mixed media installation"
    }
  ];

  return (
    <main>
      <Container>
        <Header />
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-12">
          Art
        </h1>
        
        <section className="mb-16">
          <div className="bg-neutral-100 dark:bg-slate-800 rounded-lg p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About My Art</h2>
            <p className="text-lg mb-6">
              My artistic practice spans various mediums including painting, digital art, and mixed media. 
              I explore themes of nature, technology, and human experience through my work.
            </p>
            <p className="text-lg">
              Below you'll find a selection of my recent works. For inquiries about commissions or purchases, 
              please contact me directly.
            </p>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map((artwork) => (
              <div key={artwork.id} className="border border-neutral-200 dark:border-slate-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{artwork.title}</h3>
                  <p className="text-sm mb-4 text-gray-500 dark:text-gray-400">
                    {artwork.year} • {artwork.medium}
                  </p>
                  <p>{artwork.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Exhibitions</h2>
          <div className="border border-neutral-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Solo Exhibition: "Inner Landscapes"</h3>
                <p className="text-sm mb-4 text-gray-500 dark:text-gray-400">
                  Gallery Name, City • June 2023
                </p>
                <p>A collection of works exploring the connection between internal emotional states and external environments.</p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Group Show: "New Perspectives"</h3>
                <p className="text-sm mb-4 text-gray-500 dark:text-gray-400">
                  Contemporary Art Space, City • March 2022
                </p>
                <p>Featured alongside emerging artists exploring innovative approaches to traditional mediums.</p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-2">Digital Art Festival</h3>
                <p className="text-sm mb-4 text-gray-500 dark:text-gray-400">
                  Virtual Exhibition • November 2021
                </p>
                <p>Participated in an international online exhibition showcasing digital art and new media works.</p>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}