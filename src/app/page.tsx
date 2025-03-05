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
    <main>
      <Container>
        {/* Introduction section with site title and description */}
        <Intro />
        
        {/* Hero Section - Main welcome area */}
        <section className="mb-16">
          <div className="bg-neutral-100 dark:bg-slate-800 rounded-lg p-8 md:p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Welcome to My Creative Space</h2>
            <p className="text-lg md:text-xl mb-6">
              I'm a creative individual passionate about music, art, and various projects. 
              This is where I share my journey, creations, and thoughts.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/blog" 
                className="bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-6 duration-200 transition-colors"
              >
                Read My Blog
              </Link>
              <Link 
                href="/music" 
                className="bg-white hover:bg-black hover:text-white border border-black text-black font-bold py-3 px-6 duration-200 transition-colors"
              >
                Explore My Music
              </Link>
            </div>
          </div>
        </section>
        
        {/* Featured Sections - Quick links to main content areas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Music Section */}
          <div className="border border-neutral-200 dark:border-slate-700 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold mb-4">Music</h3>
            <p className="mb-4">Check out my latest musical creations, releases, and performances.</p>
            <Link href="/music" className="font-bold hover:underline">
              View Music →
            </Link>
          </div>
          
          {/* Art Section */}
          <div className="border border-neutral-200 dark:border-slate-700 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold mb-4">Art</h3>
            <p className="mb-4">Explore my artwork, illustrations, and creative visual projects.</p>
            <Link href="/art" className="font-bold hover:underline">
              View Art →
            </Link>
          </div>
          
          {/* Projects Section */}
          <div className="border border-neutral-200 dark:border-slate-700 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold mb-4">Projects</h3>
            <p className="mb-4">Discover various projects I've been working on across different domains.</p>
            <Link href="/projects" className="font-bold hover:underline">
              View Projects →
            </Link>
          </div>
        </div>
        
        {/* Recent Blog Posts - Preview of latest blog content */}
        <section className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Recent Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allPosts.map((post) => (
              <div key={post.slug} className="border border-neutral-200 dark:border-slate-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <Link href={`/posts/${post.slug}`}>
                  <Image
                    src={post.coverImage}
                    alt={`Cover Image for ${post.title}`}
                    width={600}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    <Link href={`/posts/${post.slug}`} className="hover:underline">
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
                  <p className="mb-4">{post.excerpt.substring(0, 120)}...</p>
                  <Link href={`/posts/${post.slug}`} className="font-bold hover:underline">
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              href="/blog" 
              className="inline-block bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-6 duration-200 transition-colors"
            >
              View All Posts
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
