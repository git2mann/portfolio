import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import Image from "next/image";
import FeaturedTrack from "@/app/_components/featured-track";

export default function MusicPage() {
  // Featured song data
  const featuredSong = {
    title: "Roast",
    lyrics: "What you got?",
    year: "2021",
    audioUrl: "/assets/music/sataop-klense-mp3s/Roast - Klense.mp3", // This would be your actual audio file path
    description: "A hard-hitting track exploring themes of competition and self-confidence.",
    annotations: [
      {
        line: "What you got?" ,
        explanation: "A direct challenge to competitors, questioning their abilities and authenticity."
      }
    ]
  };

  const musicProjects = [
    {
      id: 1,
      title: "Squealer and the Aggressors of Peace",
      description: "My most recent musical creation, a concept album.",
      image: "/assets/music-assets/SQUEALER AND THE AGGRESSORS OF PEACE Album Cover.jpeg",
      releaseDate: "October 14, 2022",
      tracks: [
        { title: "Saudade in Err", duration: "1:17", audioUrl: "/path/to/audio1.mp3" },
        { title: "Hummer's Theme", duration: "2:19", audioUrl: "/path/to/audio2.mp3" }
      ],
      links: {
        spotify: "https://spotify.com",
        appleMusic: "https://music.apple.com",
        bandcamp: "https://bandcamp.com"
      }
    },
    {
      id: 2,
      title: "Allegory (Freestyle)",
      description: "A good old-fashioned hip-hop freestyle by yours truly",
      image: "/assets/blog/hello-world/cover.jpg",
      releaseDate: "2023-02-10",
      tracks: [
        { title: "Single", duration: "3:30", audioUrl: "/path/to/single.mp3" }
      ],
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
      tracks: [
        { title: "Collab Track", duration: "5:00", audioUrl: "/path/to/collab.mp3" }
      ],
      links: {
        spotify: "https://spotify.com",
        appleMusic: "https://music.apple.com",
        bandcamp: "https://bandcamp.com"
      }
    }
  ];

  const behindTheScenes = [
    {
      title: "Studio Setup",
      description: "My creative space where the magic happens. Using a mix of analog and digital equipment.",
      image: "/assets/blog/dynamic-routing/cover.jpg"
    },
    {
      title: "Production Process",
      description: "From initial concept to final master, each track goes through multiple iterations.",
      image: "/assets/blog/hello-world/cover.jpg"
    }
  ];

  const merchItems = [
    {
      title: "Album T-Shirt",
      price: "$25",
      image: "/assets/blog/preview/cover.jpg",
      link: "https://merch-store.com/album-shirt"
    },
    {
      title: "Limited Edition Vinyl",
      price: "$35",
      image: "/assets/blog/dynamic-routing/cover.jpg",
      link: "https://merch-store.com/vinyl"
    }
  ];

  return (
    <main>
      <Container>
        <Header />
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-12">
          Music
        </h1>

        {/* Featured Track Section with Lyrics */}
        <section className="mb-16">
          <FeaturedTrack song={featuredSong} />
        </section>
        
        {/* Music Catalog */}
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
                  
                  {/* Track List */}
                  <div className="mb-4">
                    <h4 className="font-bold mb-2">Tracks:</h4>
                    <ul className="space-y-2">
                      {project.tracks.map((track, index) => (
                        <li key={index} className="flex justify-between">
                          <span>{track.title}</span>
                          <span className="text-gray-500">{track.duration}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Streaming Links */}
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

        {/* Behind the Scenes */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Behind the Scenes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {behindTheScenes.map((item, index) => (
              <div key={index} className="border border-neutral-200 dark:border-slate-700 rounded-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Merchandise Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Merch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {merchItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-neutral-200 dark:border-slate-700 rounded-lg overflow-hidden hover:shadow-md transition-all"
              >
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{item.price}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mb-16">
          <div className="bg-neutral-100 dark:bg-slate-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="mb-6">Subscribe to get updates about new releases, behind-the-scenes content, and exclusive merch drops.</p>
            <form className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-neutral-300 dark:border-slate-600 dark:bg-slate-700"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-black text-white dark:bg-white dark:text-black font-bold rounded-lg hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </Container>
    </main>
  );
}
