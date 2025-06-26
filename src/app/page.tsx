import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { getAllPosts } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { SectionSeparator } from "@/app/_components/section-separator";

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
      <section className="mb-24">
        <Container>
          <div className="rounded-2xl p-10 md:p-16 shadow-lg border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition-colors">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white tracking-tight">
              Welcome to My Creative Space
            </h2>
            <p className="text-lg md:text-xl mb-8 text-gray-700 dark:text-gray-300 leading-relaxed">
              I'm a creative individual passionate about music, art, and various projects. 
              This is where I share my journey, creations, and thoughts.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/blog" 
                className="bg-neutral-900 hover:bg-neutral-700 border border-neutral-900 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200 shadow-sm"
              >
                Read My Blog
              </Link>
              <Link 
                href="/music" 
                className="bg-neutral-900 hover:bg-neutral-700 border border-neutral-900 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200 shadow-sm"
              >
                Explore My Music
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <SectionSeparator />

      {/* Featured Sections */}
      <section className="mb-24" aria-labelledby="featured-heading">
        <Container>
          <h2 id="featured-heading" className="text-4xl md:text-5xl font-bold mb-14 text-center text-gray-900 dark:text-white tracking-tight">
            Featured Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Music Section */}
            <article className="relative group rounded-2xl overflow-hidden shadow-lg border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-black dark:text-white transition-transform hover:-translate-y-1 hover:shadow-xl duration-300 flex flex-col h-full">
              <div className="relative z-10 p-8 flex flex-col h-full">
                <h3 className="text-2xl font-bold mb-4">Music</h3>
                <p className="mb-6 flex-1 text-base leading-relaxed">
                  Discover my latest musical creations, releases, and live performances across various genres and styles.
                </p>
                <Link 
                  href="/music" 
                  className="inline-block font-semibold hover:underline mt-auto bg-neutral-900 hover:bg-neutral-700 text-white px-5 py-2 rounded-full transition"
                  aria-label="View all music content"
                >
                  View Music →
                </Link>
              </div>
            </article>

            {/* Art Section */}
            <article className="relative group rounded-2xl overflow-hidden shadow-lg border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-black dark:text-white transition-transform hover:-translate-y-1 hover:shadow-xl duration-300 flex flex-col h-full">
              <div className="relative z-10 p-8 flex flex-col h-full">
                <h3 className="text-2xl font-bold mb-4">Art</h3>
                <p className="mb-6 flex-1 text-base leading-relaxed">
                  Explore my artistic journey through illustrations, digital art, and experimental visual projects.
                </p>
                <Link 
                  href="/art" 
                  className="inline-block font-semibold hover:underline mt-auto bg-neutral-900 hover:bg-neutral-700 text-white px-5 py-2 rounded-full transition"
                  aria-label="View all art content"
                >
                  View Art →
                </Link>
              </div>
            </article>

            {/* Projects Section */}
            <article className="relative group rounded-2xl overflow-hidden shadow-lg border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-black dark:text-white transition-transform hover:-translate-y-1 hover:shadow-xl duration-300 flex flex-col h-full">
              <div className="relative z-10 p-8 flex flex-col h-full">
                <h3 className="text-2xl font-bold mb-4">Projects</h3>
                <p className="mb-6 flex-1 text-base leading-relaxed">
                  Dive into innovative projects spanning technology, creativity, and experimental concepts.
                </p>
                <Link 
                  href="/projects" 
                  className="inline-block font-semibold hover:underline mt-auto bg-neutral-900 hover:bg-neutral-700 text-white px-5 py-2 rounded-full transition"
                  aria-label="View all projects"
                >
                  View Projects →
                </Link>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <SectionSeparator />

      {/* Recent Blog Posts */}
      <section className="mb-24" aria-labelledby="recent-posts-heading">
        <Container>
          <h2 id="recent-posts-heading" className="text-4xl md:text-5xl font-bold mb-14 text-center text-gray-900 dark:text-white tracking-tight">
            Recent Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {allPosts.map((post) => (
              <article
                key={post.slug}
                className="group relative rounded-2xl overflow-hidden shadow-lg border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition-transform hover:-translate-y-1 hover:shadow-xl duration-300 flex flex-col h-full"
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
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                      className="text-gray-900 dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 flex-1 leading-relaxed">
                    {post.excerpt.substring(0, 140)}...
                  </p>
                  <Link 
                    href={`/posts/${post.slug}`} 
                    className="inline-flex items-center gap-2 font-semibold hover:underline mt-auto bg-neutral-900 hover:bg-neutral-700 text-white px-5 py-2 rounded-full transition"
                    aria-label={`Read full post: ${post.title}`}
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-14">
            <Link 
              href="/blog" 
              className="inline-block font-semibold bg-neutral-900 hover:bg-neutral-700 text-white px-8 py-4 rounded-full transition-colors duration-200 shadow-sm"
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