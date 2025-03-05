import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { getAllPosts } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

/**
 * Home page component
 * Displays the main landing page with intro, featured sections, and recent blog posts
 * Enhanced with advanced animations and styling
 */
export default function Index() {
  // Get the 3 most recent blog posts
  const allPosts = getAllPosts().slice(0, 3);

  return (
    <main className="bg-white dark:bg-slate-900">
      <Container>
        {/* Introduction section with site title and description */}
        <Intro />
        
        {/* Hero Section - Main welcome area */}
        <section className="mb-16 animate-fade-in">
          <div className="bg-neutral-100 dark:bg-slate-800 rounded-xl p-8 md:p-12 glass hover-card">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Welcome to My Creative Space
            </h2>
            <p className="text-lg md:text-xl mb-6 dark:text-gray-300">
              I'm a creative individual passionate about music, art, and various projects. 
              This is where I share my journey, creations, and thoughts.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/blog" 
                className="btn btn-primary animate-slide-in"
              >
                Read My Blog
              </Link>
              <Link 
                href="/music" 
                className="btn btn-secondary animate-slide-in"
              >
                Explore My Music
              </Link>
            </div>
          </div>
        </section>
        
        {/* Featured Sections - Quick links to main content areas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Music Section */}
          <div className="hover-card animate-scale-in border border-neutral-200 dark:border-slate-700 rounded-lg p-6 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-400">Music</h3>
            <p className="mb-4 dark:text-gray-300">
              Check out my latest musical creations, releases, and performances.
            </p>
            <Link href="/music" className="font-bold text-purple-600 hover:underline dark:text-purple-300">
              View Music →
            </Link>
          </div>
          
          {/* Art Section */}
          <div className="hover-card animate-scale-in border border-neutral-200 dark:border-slate-700 rounded-lg p-6 transition-all duration-300 delay-100">
            <h3 className="text-2xl font-bold mb-4 text-pink-700 dark:text-pink-400">Art</h3>
            <p className="mb-4 dark:text-gray-300">
              Explore my artwork, illustrations, and creative visual projects.
            </p>
            <Link href="/art" className="font-bold text-pink-600 hover:underline dark:text-pink-300">
              View Art →
            </Link>
          </div>
          
          {/* Projects Section */}
          <div className="hover-card animate-scale-in border border-neutral-200 dark:border-slate-700 rounded-lg p-6 transition-all duration-300 delay-200">
            <h3 className="text-2xl font-bold mb-4 text-red-700 dark:text-red-400">Projects</h3>
            <p className="mb-4 dark:text-gray-300">
              Discover various projects I've been working on across different domains.
            </p>
            <Link href="/projects" className="font-bold text-red-600 hover:underline dark:text-red-300">
              View Projects →
            </Link>
          </div>
        </div>
        
        {/* Recent Blog Posts - Preview of latest blog content */}
        <section className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 animate-slide-in">Recent Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allPosts.map((post, index) => (
              <div 
                key={post.slug} 
                className={`hover-card animate-scale-in border border-neutral-200 dark:border-slate-700 rounded-lg overflow-hidden transition-all duration-300 ${index === 0 ? '' : 'delay-' + (index * 100)}`}
              >
                <Link href={`/posts/${post.slug}`} className="block">
                  <Image
                    src={post.coverImage}
                    alt={`Cover Image for ${post.title}`}
                    width={600}
                    height={300}
                    className="w-full h-48 object-cover image-hover"
                  />
                </Link>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    <Link 
                      href={`/posts/${post.slug}`} 
                      className="hover:underline text-gray-900 dark:text-white"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm mb-4 text-gray-500 dark:text-gray-400">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="mb-4 dark:text-gray-300">
                    {post.excerpt.substring(0, 120)}...
                  </p>
                  <Link 
                    href={`/posts/${post.slug}`} 
                    className="font-bold text-purple-600 hover:underline dark:text-purple-300"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 animate-fade-in">
            <Link 
              href="/blog" 
              className="btn btn-primary"
            >
              View All Posts
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
