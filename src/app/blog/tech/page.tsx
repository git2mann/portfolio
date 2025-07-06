import Container from "@/app/_components/container";
import { getAllPosts } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/interfaces/post";

export default async function TechBlogPage({
  searchParams,
}: {
  searchParams?: Promise<any> | undefined;
}) {
  const resolvedSearchParams = await searchParams;

  // Get tag and page from resolved search params
  const tag = Array.isArray(resolvedSearchParams?.tag) ? resolvedSearchParams?.tag[0] : resolvedSearchParams?.tag;
  const pageParam = Array.isArray(resolvedSearchParams?.page) ? resolvedSearchParams?.page[0] : resolvedSearchParams?.page;
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
    <main className="min-h-screen bg-[var(--background-primary)] px-4 sm:px-0 overflow-visible">
      <Container>
        <div className="max-w-6xl mx-auto py-12">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors"
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
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6 text-center text-[var(--text-primary)]">
              Tech Blog
            </h1>

            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xl text-[var(--text-secondary)] mb-8">
                Explore the latest in technology, coding tutorials, and industry news.
              </p>
            </div>
          </header>

          {/* Tag Filtering */}
          {techTags.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Tags</h2>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/blog/tech"
                  className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                    !tag
                      ? "bg-purple-600 text-white"
                      : "text-purple-600 bg-purple-100 hover:bg-purple-200"
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
                        : "text-purple-600 bg-purple-100 hover:bg-purple-200"
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
                <article className="bg-[var(--card-background)] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative border border-[var(--border-color)]">
                  <div className="relative aspect-[4/3] sm:aspect-[2/1] md:aspect-[3/1]">
                    <Image
                      src={featuredPost.coverImage}
                      alt={`Cover Image for ${featuredPost.title}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4 sm:p-8"
                      style={{
                        maxHeight: '100%',
                        overflow: 'auto',
                      }}
                    >
                      <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-purple-600 rounded-full mb-2 sm:mb-4">
                        Featured Post
                      </span>
                      <h3 className="text-xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-white break-words leading-tight">
                        {featuredPost.title}
                      </h3>
                      {featuredPost.excerpt && (
                        <p className="text-base sm:text-lg text-gray-100 mb-2 sm:mb-4 max-w-3xl line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-300 gap-2">
                        {featuredPost.date && (
                          <span>
                            {new Date(featuredPost.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        )}
                        {featuredPost.tags && featuredPost.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {featuredPost.tags.map(tagItem => (
                              <span 
                                key={tagItem}
                                className="px-2 py-1 text-xs font-medium bg-purple-500/50 rounded-full"
                              >
                                {tagItem}
                              </span>
                            ))}
                          </div>
                        )}
                        <span className="inline-block ml-auto px-4 py-2 text-white bg-purple-600/80 rounded-md group-hover:bg-purple-500 transition-colors">
                          Read Article
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          )}

          {/* Page indicator */}
          {totalPages > 1 && (
            <div className="mb-6 text-[var(--text-secondary)]">
              Page {currentPage} of {totalPages}
            </div>
          )}

          {/* Enhanced Posts Grid */}
          <div id="posts-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-[var(--card-background)] rounded-lg overflow-hidden shadow-md hover:shadow-lg transform hover:translate-y-[-8px] transition duration-300 ease-in-out flex flex-col h-full border border-[var(--border-color)]"
              >
                <Link href={`/posts/${post.slug}`} className="block group h-full">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={`Cover Image for ${post.title}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2 text-[var(--text-primary)] group-hover:text-purple-600 transition-colors">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-[var(--text-secondary)] mb-4 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-[var(--border-color)]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {post.date && (
                            <p className="text-sm text-[var(--text-secondary)]">
                              {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          )}
                          <span className="text-sm text-[var(--text-secondary)] flex items-center">
                            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {'5 min'} read
                          </span>
                        </div>
                        <span className="text-sm text-purple-600 font-medium">Read more</span>
                      </div>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {post.tags.map((tagItem: string) => (
                          <span 
                            key={tagItem}
                            className="px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-600 rounded-full"
                          >
                            {tagItem}
                          </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* No Results Message */}
          {paginatedPosts.length === 0 && !featuredPost && (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">No posts found</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                {tag ? `No posts found with the tag "${tag}".` : "No posts available at the moment."}
              </p>
              <Link 
                href="/blog/tech" 
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                View all posts
              </Link>
            </div>
          )}

          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="inline-flex items-center rounded-md shadow-sm">
                <Link
                  href={`/blog/tech?page=${Math.max(1, currentPage - 1)}${tag ? `&tag=${tag}` : ''}`}
                  className={`px-3 py-2 rounded-l-md font-medium border border-r-0 ${
                    currentPage === 1
                      ? 'bg-[var(--background-secondary)] text-[var(--text-secondary)] cursor-not-allowed'
                      : 'bg-[var(--card-background)] text-[var(--text-primary)] hover:bg-[var(--hover-background)]'
                  } border-[var(--border-color)]`}
                  aria-disabled={currentPage === 1}
                  tabIndex={currentPage === 1 ? -1 : 0}
                >
                  <span className="sr-only">Previous Page</span>
                  ←
                </Link>
                
                {pageNumbers.map(number => (
                  <Link 
                    key={number} 
                    href={`/blog/tech?page=${number}${tag ? `&tag=${tag}` : ''}`}
                    className={`px-4 py-2 font-medium border border-r-0 ${
                      currentPage === number 
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-[var(--card-background)] text-[var(--text-primary)] hover:bg-[var(--hover-background)] border-[var(--border-color)]'
                    }`}
                    aria-current={currentPage === number ? 'page' : undefined}
                  >
                    {number}
                  </Link>
                ))}
                
                <Link
                  href={`/blog/tech?page=${Math.min(totalPages, currentPage + 1)}${tag ? `&tag=${tag}` : ''}`}
                  className={`px-3 py-2 rounded-r-md font-medium border ${
                    currentPage === totalPages
                      ? 'bg-[var(--background-secondary)] text-[var(--text-secondary)] cursor-not-allowed'
                      : 'bg-[var(--card-background)] text-[var(--text-primary)] hover:bg-[var(--hover-background)]'
                  } border-[var(--border-color)]`}
                  aria-disabled={currentPage === totalPages}
                  tabIndex={currentPage === totalPages ? -1 : 0}
                >
                  <span className="sr-only">Next Page</span>
                  →
                </Link>
              </div>
            </div>
          )}

          {/* Scroll to top */}
          <Link 
            href="#top"
            className="fixed bottom-6 right-6 p-3 bg-[var(--card-background)] rounded-full shadow-lg z-10 hover:bg-[var(--hover-background)] transition-colors"
          >
            <svg className="h-6 w-6 text-[var(--text-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </Link>
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