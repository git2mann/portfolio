import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import Image from "next/image";

export default function MusicPage() {
  const lyric = "What you got?";
  const musicProjects = [
    {
      id: 1,
      title: "Latest Album",
      description: "My most recent musical creation exploring themes of nature and technology.",
      image: "/assets/blog/dynamic-routing/cover.jpg",
      releaseDate: "2023-05-15",
      links: {
        spotify: "https://spotify.com",
        appleMusic: "https://music.apple.com",
        bandcamp: "https://bandcamp.com"
      }
    },
    {
      id: 2,
      title: "Single Release",
      description: "An experimental track combining electronic elements with acoustic instruments.",
      image: "/assets/blog/hello-world/cover.jpg",
      releaseDate: "2023-02-10",
      links: {
        spotify: "https://spotify.com",
        appleMusic: "https://music.apple.com",
        bandcamp: "https://bandcamp.com"
      }
    },
    {
      id: 3,
      title: "Collaboration Project",
      description: "A joint venture with other musicians creating a unique soundscape.",
      image: "/assets/blog/preview/cover.jpg",
      releaseDate: "2022-11-22",
      links: {
        spotify: "https://spotify.com",
        appleMusic: "https://music.apple.com",
        bandcamp: "https://bandcamp.com"
      }
    }
  ];

  return (
    <main>
      <Container>
        <Header />
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-12">
          Music
        </h1>

        {/* Lyric Section with Typewriter Effect */}
        <section className="mb-16">
          <div className="bg-neutral-100 dark:bg-slate-800 rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured Lyric</h2>
            <div className="typewriter">
              <p className="text-2xl md:text-3xl font-bold italic text-neutral-900 dark:text-neutral-100">
                "{lyric}"
              </p>
            </div>
            <p className="text-lg mt-4 text-neutral-600 dark:text-neutral-400">
              From the track <span className="font-semibold">"Roast"</span>, 2021
            </p>
          </div>
        </section>
        
        <section className="mb-16">
          <div className="bg-neutral-100 dark:bg-slate-800 rounded-lg p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About My Music</h2>
            <p className="text-lg mb-6">
              I create music that blends various genres and influences. My work explores the intersection of 
              electronic production, traditional instrumentation, and experimental sound design.
            </p>
            <p className="text-lg">
              Listen to my music on various platforms and follow me to stay updated on new releases.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <a 
                href="https://spotify.com/artist/klense" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1DB954] hover:bg-[#1ed760] text-white font-bold py-2 px-4 rounded-full"
              >
                Spotify
              </a>
              <a 
                href="https://music.apple.com/artist/klense" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FA243C] hover:bg-[#fb3a50] text-white font-bold py-2 px-4 rounded-full"
              >
                Apple Music
              </a>
              <a 
                href="https://soundcloud.com/yourprofile" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FF7700] hover:bg-[#ff8822] text-white font-bold py-2 px-4 rounded-full"
              >
                SoundCloud
              </a>
              <a 
                href="https://bandcamp.com/yourprofile" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#629aa9] hover:bg-[#74a7b5] text-white font-bold py-2 px-4 rounded-full"
              >
                Bandcamp
              </a>
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Releases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {musicProjects.map((project) => (
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
                  <p className="text-sm mb-4 text-gray-500 dark:text-gray-400">
                    Released: {new Date(project.releaseDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="mb-4">{project.description}</p>
                  <div className="flex space-x-3">
                    <a 
                      href={project.links.spotify} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:underline"
                    >
                      Spotify
                    </a>
                    <a 
                      href={project.links.appleMusic} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:underline"
                    >
                      Apple Music
                    </a>
                    <a 
                      href={project.links.bandcamp} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:underline"
                    >
                      Bandcamp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Upcoming Shows</h2>
          <div className="border border-neutral-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <div className="p-6">
              <p className="text-lg mb-4">No upcoming shows at the moment. Check back soon!</p>
              <p>Want to book me for a show? Get in touch at <a href="mailto:nduatileon@gmail.com" className="underline hover:text-blue-600">nduatileon@gmail.com</a></p>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
