import Container from "@/app/_components/container";
import { getAllPosts } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/interfaces/post";

export default async function TechBlogPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // Get tag and page from search params
  const tag = Array.isArray(searchParams?.tag) ? searchParams?.tag[0] : searchParams?.tag;
  const pageParam = Array.isArray(searchParams?.page) ? searchParams?.page[0] : searchParams?.page;
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  // Fetch posts filtered by tag if provided
  const techPosts = getPostsByCategory("Tech", tag);

  // Get only tags that belong to Tech category posts
  const techTags = getTechTags();

  // Pagination config
  const postsPerPage = 6;
  const totalPages = Math.ceil((techPosts.length - 1) / postsPerPage);

  // Get featured post (first post)
  const featuredPost: Post | undefined = techPosts[0];

  // Get paginated posts (excluding featured post)
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = techPosts.slice(1).slice(startIndex, startIndex + postsPerPage);

  // Generate array of page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Container>
        <div className="max-w-6xl mx-auto py-12">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300 font-medium transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog Menu
            </Link>
          </div>

          {/* Enhanced Header */}
          <header className="mb-16">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6 text-center text-gray-800 dark:text-white">
              Tech Blog
            </h1>

            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Explore the latest in technology, programming, and digital innovation.
              </p>
            </div>
          </header>

          {/* Tag Filtering */}
          {techTags.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Tags</h2>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/blog/tech"
                  className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                    !tag
                      ? "bg-purple-600 text-white"
                      : "text-purple-600 bg-purple-100 dark:bg-purple-700/30 dark:text-purple-200 hover:bg-purple-200 dark:hover:bg-purple-600/40"
                  }`}
                >
                  All
                </Link>
                {techTags.map((tagItem) => (
                  <Link
                    key={tagItem}
                    href={`/blog/tech?tag=${tagItem}`}
                    className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                      tag === tagItem
                        ? "bg-purple-600 text-white"
                        : "text-purple-600 bg-purple-100 dark:bg-purple-700/30 dark:text-purple-200 hover:bg-purple-200 dark:hover:bg-purple-600/40"
                    }`}
                  >
                    {tagItem}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16">
              <Link href={`/posts/${featuredPost.slug}`} className="block group">
                <article className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative">
                  <div className="relative h-96 md:h-[500px]">
                    <Image
                      src={featuredPost.coverImage}
                      alt={`Cover Image for ${featuredPost.title}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                          {featuredPost.title}
                        </h3>
                        {featuredPost.excerpt && (
                          <p className="text-lg text-gray-100 mb-4 max-w-3xl">
                            {featuredPost.excerpt}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          )}

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.map((post) => (
              <article key={post.slug} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4">
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="inline-flex items-center rounded-md shadow-sm">
                <Link
                  href={`/blog/tech?page=${Math.max(1, currentPage - 1)}${tag ? `&tag=${tag}` : ""}`}
                  className={`px-3 py-2 rounded-l-md font-medium border border-r-0 ${
                    currentPage === 1
                      ? "bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                      : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700"
                  } border-gray-200 dark:border-slate-700`}
                  aria-disabled={currentPage === 1}
                  tabIndex={currentPage === 1 ? -1 : 0}
                >
                  <span className="sr-only">Previous Page</span>
                  ←
                </Link>

                {pageNumbers.map((number) => (
                  <Link
                    key={number}
                    href={`/blog/tech?page=${number}${tag ? `&tag=${tag}` : ""}`}
                    className={`px-4 py-2 font-medium border border-r-0 ${
                      currentPage === number
                        ? "bg-purple-600 text-white border-purple-600 dark:border-purple-600"
                        : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 border-gray-200 dark:border-slate-700"
                    }`}
                    aria-current={currentPage === number ? "page" : undefined}
                  >
                    {number}
                  </Link>
                ))}

                <Link
                  href={`/blog/tech?page=${Math.min(totalPages, currentPage + 1)}${tag ? `&tag=${tag}` : ""}`}
                  className={`px-3 py-2 rounded-r-md font-medium border ${
                    currentPage === totalPages
                      ? "bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                      : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700"
                  } border-gray-200 dark:border-slate-700`}
                  aria-disabled={currentPage === totalPages}
                  tabIndex={currentPage === totalPages ? -1 : 0}
                >
                  <span className="sr-only">Next Page</span>
                  →
                </Link>
              </div>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}

// Helper function to get tags only from Tech category posts
function getTechTags(): string[] {
  const techPosts = getPostsByCategory("Tech");
  const tags = techPosts.flatMap((post) => post.tags || []);
  return Array.from(new Set(tags)); // Remove duplicates
}

// Helper function to get posts by category and optionally filter by tag
function getPostsByCategory(category: string, tag?: string): Post[] {
  return getAllPosts().filter(
    (post) => post.category === category && (!tag || post.tags?.includes(tag))
  );
}