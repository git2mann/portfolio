import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { getAllPosts } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

/**
 * Home page component
 * Displays the main landing page with intro, featured sections, and recent blog posts
 */
export default function Index() {
  // Get the 3 most recent blog posts
  const allPosts = getAllPosts().slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* Site-wide intro */}
      <Container>
        <Intro />
      </Container>

      {/* Hero Section - Main welcome area */}
      <section className="mb-20">
        <Container>
          <div className="rounded-2xl p-8 md:p-12 shadow-xl border border-neutral-200 dark:border-slate-700 bg-neutral-100 dark:bg-[var(--background-primary)] transition-colors">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Welcome to My Creative Space
            </h2>
            <p className="text-lg md:text-xl mb-6 text-gray-700 dark:text-gray-300">
              I'm a creative individual passionate about music, art, and various projects. 
              This is where I share my journey, creations, and thoughts.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/blog" 
                className="bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-6 rounded-lg duration-200 transition-colors"
              >
                Read My Blog
              </Link>
              <Link 
                href="/music" 
                className="bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-6 rounded-lg duration-200 transition-colors"
              >
                Explore My Music
              </Link>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Featured Sections */}
      <section className="mb-20" aria-labelledby="featured-heading">
        <Container>
          <h2 id="featured-heading" className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-900 dark:text-white">
            Featured Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Music Section */}
            <article className="relative group rounded-xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-slate-700 bg-neutral-100 dark:bg-[var(--background-primary)] text-black dark:text-white transform transition-transform hover:scale-[1.025] hover:shadow-2xl duration-300 flex flex-col h-full">
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300 bg-[url('/assets/blog/blog-post-covers/jawz-9Ut0azurqg0-unsplash.jpg')] bg-cover bg-center pointer-events-none"></div>
              <div className="relative z-10 p-8 flex flex-col h-full">
                <h3 className="text-3xl font-extrabold mb-4 drop-shadow-lg">Music</h3>
                <p className="mb-6 flex-1 text-lg drop-shadow leading-relaxed">
                  Discover my latest musical creations, releases, and live performances across various genres and styles.
                </p>
                <Link 
                  href="/music" 
                  className="inline-block font-bold hover:underline mt-auto bg-black hover:bg-white hover:text-black border border-black text-white px-5 py-2 rounded-xl transition"
                  aria-label="View all music content"
                >
                  View Music →
                </Link>
              </div>
            </article>

            {/* Art Section */}
            <article className="relative group rounded-xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-slate-700 bg-neutral-100 dark:bg-[var(--background-primary)] text-black dark:text-white transform transition-transform hover:scale-[1.025] hover:shadow-2xl duration-300 flex flex-col h-full">
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300 bg-[url('/assets/blog/blog-post-covers/selina-farzaei-x2QHTVg2HqA-unsplash.jpg')] bg-cover bg-center pointer-events-none"></div>
              <div className="relative z-10 p-8 flex flex-col h-full">
                <h3 className="text-3xl font-extrabold mb-4 drop-shadow-lg">Art</h3>
                <p className="mb-6 flex-1 text-lg drop-shadow leading-relaxed">
                  Explore my artistic journey through illustrations, digital art, and experimental visual projects.
                </p>
                <Link 
                  href="/art" 
                  className="inline-block font-bold hover:underline mt-auto bg-black hover:bg-white hover:text-black border border-black text-white px-5 py-2 rounded-xl transition"
                  aria-label="View all art content"
                >
                  View Art →
                </Link>
              </div>
            </article>

            {/* Projects Section */}
            <article className="relative group rounded-xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-slate-700 bg-neutral-100 dark:bg-[var(--background-primary)] text-black dark:text-white transform transition-transform hover:scale-[1.025] hover:shadow-2xl duration-300 flex flex-col h-full">
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300 bg-[url('/assets/blog/blog-post-covers/amsterdam-city-archives-URnyBZCnlIs-unsplash.jpg')] bg-cover bg-center pointer-events-none"></div>
              <div className="relative z-10 p-8 flex-col h-full">
                <h3 className="text-3xl font-extrabold mb-4 drop-shadow-lg">Projects</h3>
                <p className="mb-6 flex-1 text-lg drop-shadow leading-relaxed">
                  Dive into innovative projects spanning technology, creativity, and experimental concepts.
                </p>
                <Link 
                  href="/projects" 
                  className="inline-block font-bold hover:underline mt-auto bg-black hover:bg-white hover:text-black border border-black text-white px-5 py-2 rounded-xl transition"
                  aria-label="View all projects"
                >
                  View Projects →
                </Link>
              </div>
            </article>
          </div>
        </Container>
      </section>
      
      {/* Recent Blog Posts */}
      <section className="mb-20" aria-labelledby="recent-posts-heading">
        <Container>
          <h2 id="recent-posts-heading" className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-900 dark:text-white">
            Recent Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allPosts.map((post) => (
              <article
                key={post.slug}
                className="group relative rounded-xl overflow-hidden shadow-xl border border-neutral-200 dark:border-slate-700 bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 hover:scale-[1.015] hover:shadow-2xl transition-transform duration-300 flex flex-col h-full"
              >
                <div className="relative overflow-hidden h-56">
                  <Link href={`/posts/${post.slug}`} aria-label={`Read post: ${post.title}`}>
                    <Image
                      src={post.coverImage}
                      alt={`Cover image for ${post.title}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </Link>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <time 
                    className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 block"
                    dateTime={post.date}
                  >
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <h3 className="text-2xl font-bold mb-4 leading-tight">
                    <Link 
                      href={`/posts/${post.slug}`} 
                      className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 flex-1 leading-relaxed">
                    {post.excerpt.substring(0, 140)}...
                  </p>
                  <Link 
                    href={`/posts/${post.slug}`} 
                    className="inline-flex items-center gap-2 font-bold hover:underline mt-auto bg-black hover:bg-white hover:text-black border border-black text-white px-5 py-2 rounded-xl transition"
                    aria-label={`Read full post: ${post.title}`}
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              href="/blog" 
              className="inline-block font-bold bg-black hover:bg-white hover:text-black border border-black text-white px-8 py-4 rounded-xl transition-colors duration-200"
              aria-label="View all blog posts"
            >
              View All Posts
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}