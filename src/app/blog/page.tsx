import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { getAllPosts } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import DateFormatter from "@/app/_components/date-formatter";

/**
 * Blog page component
 * Displays a grid of all blog posts
 */
export default function BlogPage() {
  // Get all blog posts
  const allPosts = getAllPosts();

  return (
    <main>
      <Container>
        <Header />
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-12">
          Blog
        </h1>
        
        {/* Grid of blog posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20 mb-32">
          {allPosts.map((post) => (
            <article key={post.slug} className="border border-neutral-200 dark:border-slate-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              {/* Post cover image with link to post */}
              <Link href={`/posts/${post.slug}`}>
                <Image
                  src={post.coverImage}
                  alt={`Cover Image for ${post.title}`}
                  width={600}
                  height={300}
                  className="w-full h-64 object-cover"
                />
              </Link>
              <div className="p-6">
                {/* Post title with link to post */}
                <h3 className="text-2xl font-bold mb-3">
                  <Link href={`/posts/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                {/* Post date */}
                <div className="text-lg mb-4 text-gray-500 dark:text-gray-400">
                  <DateFormatter dateString={post.date} />
                </div>
                {/* Post excerpt */}
                <p className="text-lg mb-4">{post.excerpt}</p>
                {/* Author information */}
                <div className="flex items-center">
                  <img src={post.author.picture} className="w-10 h-10 rounded-full mr-4" alt={post.author.name} />
                  <span className="text-md font-medium">{post.author.name}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}