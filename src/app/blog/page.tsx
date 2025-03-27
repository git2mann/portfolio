import Container from "@/app/_components/container";
import Link from "next/link";
import Image from "next/image";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-neutral-100 dark:bg-slate-900">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <section className="text-center py-16">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight text-gray-800 dark:text-white">
              Welcome to the Blog
            </h1>
            <p className="text-lg md:text-xl font-medium text-gray-700 dark:text-gray-300 mt-4">
              Discover stories, tutorials, and insights from <span className="font-bold text-blue-600 dark:text-blue-400">Music</span> and <span className="font-bold text-purple-600 dark:text-purple-400">Tech</span>.
            </p>
          </section>

          {/* Category Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {[
              {
                category: "Music",
                description: "Explore music production tips, stories, and insights.",
                link: "/blog/music",
                icon: "🎵", // Simple text-based placeholder
                image: "/assets/blog/blog-post-covers/selina-farzaei-x2QHTVg2HqA-unsplash.jpg",
              },
              {
                category: "Tech",
                description: "Discover the latest in technology and development.",
                link: "/blog/tech",
                icon: "💻", // Simple text-based placeholder
                image: "/assets/blog/blog-post-covers/pontus-wellgraf-16_bFHg8Ouc-unsplash.jpg",
              },
            ].map(({ category, description, link, icon, image }) => (
              <div key={category} className="text-center">
                <Link
                  href={link}
                  className="block bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  <div className="relative h-96">
                    <Image
                      src={image}
                      alt={`${category} Category`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-6">
                      <span className="text-6xl">{icon}</span>
                      <h3 className="text-4xl font-bold text-white mt-6 drop-shadow-2xl">
                        {category}
                      </h3>
                    </div>
                  </div>
                </Link>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-4">
                  {description}
                </p>
              </div>
            ))}
          </section>
        </div>
      </Container>
    </main>
  );
}
