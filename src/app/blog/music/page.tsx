import Container from "@/app/_components/container";
import { getAllTags, getAllPosts } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/interfaces/post";

export default async function MusicBlogPage({
  searchParams,
}: {
  searchParams?: Record<string, string | undefined>;
}) {
  // Get tag from search params
  const tag = searchParams?.tag;
  const pageParam = searchParams?.page;
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  // Fetch posts filtered by tag if provided
  const musicPosts = tag 
    ? getPostsByCategory("Music", tag) 
    : getPostsByCategory("Music");

  // Get only tags that belong to Music category posts
  const musicTags = getMusicTags();

  // Pagination config
  const postsPerPage = 6;
  const totalPages = Math.ceil((musicPosts.length - 1) / postsPerPage);

  // Get featured post (first post)
  const featuredPost: { tags: string[]; [key: string]: any } = {
    ...musicPosts[0],
    tags: musicPosts[0]?.tags || [],
  };

  // Get paginated posts (excluding featured post)
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = musicPosts.slice(1).slice(startIndex, startIndex + postsPerPage);

  // Generate array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Container>
        <div className="max-w-6xl mx-auto py-12">
          {/* Back Button - Using Link instead of button with onClick */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
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
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6 text-center text-gray-800 dark:text-white animate-fade-in">
              Music Blog
            </h1>
            
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Discover the latest in music reviews, artist spotlights, and industry insights.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/blog/music"
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    !searchParams?.category
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700"
                  }`}
                  aria-current={!searchParams?.category ? "page" : undefined}
                >
                  All Posts
                </Link>
                <Link
                  href="/blog/music?category=reviews"
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    searchParams?.category === "reviews"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700"
                  }`}
                  aria-current={searchParams?.category === "reviews" ? "page" : undefined}
                >
                  Reviews
                </Link>
                <Link
                  href="/blog/music?category=artists"
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    searchParams?.category === "artists"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700"
                  }`}
                  aria-current={searchParams?.category === "artists" ? "page" : undefined}
                >
                  Artists
                </Link>
                <Link
                  href="/blog/music?category=news"
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    searchParams?.category === "news"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700"
                  }`}
                  aria-current={searchParams?.category === "news" ? "page" : undefined}
                >
                  News
                </Link>
              </div>
            </div>
          </header>

          {/* Tag Filtering - Only showing Music Tags */}
          {musicTags.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Tags</h2>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/blog/music"
                  className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                    !tag
                      ? "bg-blue-600 text-white"
                      : "text-blue-600 bg-blue-100 dark:bg-blue-700/30 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-600/40"
                  }`}
                >
                  All
                </Link>
                {musicTags.map((tagItem) => (
                  <Link
                    key={tagItem}
                    href={`/blog/music?tag=${tagItem}`}
                    className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                      tag === tagItem
                        ? "bg-blue-600 text-white"
                        : "text-blue-600 bg-blue-100 dark:bg-blue-700/30 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-600/40"
                    }`}
                  >
                    {tagItem}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div className="mb-12 max-w-xl mx-auto">
            <div className="relative">
              <form action="/search" method="GET">
                <input
                  type="text"
                  name="q"
                  placeholder="Search music articles..."
                  className="w-full py-3 pl-12 pr-4 text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </form>
            </div>
          </div>

          {/* Enhanced Featured Post Section - Only show if not filtered or if filtered and has posts */}
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
                      <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                        <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-full mb-4">
                          Featured Post
                        </span>
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                          {featuredPost.title}
                        </h3>
                        {featuredPost.excerpt && (
                          <p className="text-lg text-gray-100 mb-4 max-w-3xl">
                            {featuredPost.excerpt}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center text-sm text-gray-300">
                          {featuredPost.date && (
                            <span className="mr-2">
                              {new Date(featuredPost.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          )}
                          {featuredPost.tags && featuredPost.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mr-auto">
                              {featuredPost.tags.map(tagItem => (
                                <span 
                                  key={tagItem}
                                  className="px-2 py-1 text-xs font-medium bg-blue-500/50 rounded-full"
                                >
                                  {tagItem}
                                </span>
                              ))}
                            </div>
                          )}
                          <span className="inline-block ml-auto px-4 py-2 text-white bg-blue-600/80 rounded-md group-hover:bg-blue-500 transition-colors">
                            Read Article
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          )}

          {/* Page indicator */}
          {totalPages > 1 && (
            <div className="mb-6 text-gray-600 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </div>
          )}

          {/* Enhanced Posts Grid */}
          <div id="posts-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transform hover:translate-y-[-8px] transition duration-300 ease-in-out flex flex-col h-full"
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
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {post.date && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          )}
                          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {'5 min'} read
                          </span>
                        </div>
                        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">Read more</span>
                      </div>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {post.tags.map((tagItem: string) => (
                          <Link 
                            key={tagItem} 
                            href={`/blog/music?tag=${tagItem}`}
                            className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-600 dark:bg-blue-700/30 dark:text-blue-200 rounded-full hover:bg-blue-200 dark:hover:bg-blue-600/40 transition-colors"

                          >
                            {tagItem}
                          </Link>
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
              <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">No posts found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {tag ? `No posts found with the tag "${tag}".` : "No posts available at the moment."}
              </p>
              <Link 
                href="/blog/music" 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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
                  href={`/blog/music?page=${Math.max(1, currentPage - 1)}${tag ? `&tag=${tag}` : ''}`}
                  className={`px-3 py-2 rounded-l-md font-medium border border-r-0 ${
                    currentPage === 1
                      ? 'bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                  } border-gray-200 dark:border-slate-700`}
                  aria-disabled={currentPage === 1}
                  tabIndex={currentPage === 1 ? -1 : 0}
                >
                  <span className="sr-only">Previous Page</span>
                  ←
                </Link>
                
                {pageNumbers.map(number => (
                  <Link 
                    key={number} 
                    href={`/blog/music?page=${number}${tag ? `&tag=${tag}` : ''}`}
                    className={`px-4 py-2 font-medium border border-r-0 ${
                      currentPage === number 
                        ? 'bg-blue-600 text-white border-blue-600 dark:border-blue-600'
                        : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 border-gray-200 dark:border-slate-700'
                    }`}
                    aria-current={currentPage === number ? 'page' : undefined}
                  >
                    {number}
                  </Link>
                ))}
                
                <Link
                  href={`/blog/music?page=${Math.min(totalPages, currentPage + 1)}${tag ? `&tag=${tag}` : ''}`}
                  className={`px-3 py-2 rounded-r-md font-medium border ${
                    currentPage === totalPages
                      ? 'bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
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

          {/* Scroll to top - This would need to be a client component */}
          <Link 
            href="#top"
            className="fixed bottom-6 right-6 p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg z-10 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            <svg className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </Link>
        </div>
      </Container>
    </main>
  );
}

// Helper function to get tags only from Music category posts
function getMusicTags(): string[] {
  const musicPosts = getPostsByCategory("Music");
  const tags = musicPosts.flatMap((post) => post.tags || []);
  return Array.from(new Set(tags)); // Remove duplicates
}

function getPostsByCategory(category: string, tag?: string): Post[] {
  return getAllPosts().filter((post) => 
    post.category === category && (!tag || post.tags?.includes(tag))
  );
}