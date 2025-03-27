import Container from "@/app/_components/container";
import { getPostsByCategory } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import DateFormatter from "@/app/_components/date-formatter";

export default function TechBlogPage() {
  const techPosts = getPostsByCategory("Tech");

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Container>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-12 text-center animate-fade-in">
            Tech Blog
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
              >
                <Link href={`/posts/${post.slug}`}>
                  <div className="relative h-64">
                    <Image
                      src={post.coverImage}
                      alt={`Cover Image for ${post.title}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {post.excerpt}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <DateFormatter dateString={post.date} />
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
