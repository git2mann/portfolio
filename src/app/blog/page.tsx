import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { getAllPosts } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import DateFormatter from "@/app/_components/date-formatter";

export default function BlogPage() {
  const allPosts = getAllPosts();

  // Group posts by year
  const postsByYear = allPosts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as Record<number, typeof allPosts>);

  // Sort years in descending order
  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <main className="min-h-screen">
      <Container>
        <Header />
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-8 animate-fade-in">
            Blog
          </h1>

          {/* Featured Post */}
          {allPosts[0] && (
            <div className="mb-16 animate-slide-up">
              <Link href={`/posts/${allPosts[0].slug}`}>
                <div className="group relative h-[60vh] overflow-hidden rounded-xl">
                  <Image
                    src={allPosts[0].coverImage}
                    alt={`Cover Image for ${allPosts[0].title}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="absolute bottom-0 p-8">
                      <p className="text-white/70 mb-2">
                        <DateFormatter dateString={allPosts[0].date} />
                      </p>
                      <h2 className="text-4xl font-bold text-white mb-4">{allPosts[0].title}</h2>
                      <p className="text-white/90 text-lg max-w-2xl">{allPosts[0].excerpt}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Posts by Year */}
          {years.map((year) => (
            <section key={year} className="mb-16 animate-fade-in">
              <h2 className="text-3xl font-bold mb-8 sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm py-4 z-10">
                {year}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> 
                {postsByYear[year].map((post) => (
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
                        {/* Content type indicator */}
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70 text-white text-sm">
                          {post.coverImage.includes('.mp4') ? '🎥 Video' : 
                           post.coverImage.includes('.mp3') ? '🎵 Audio' : 
                           '📝 Article'}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <Image
                            src={post.author.picture}
                            alt={post.author.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div className="ml-3">
                            <p className="font-medium">{post.author.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              <DateFormatter dateString={post.date} />
                            </p>
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>
                        
                        {/* Tags (if available) */}
                        {post.tags && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {post.tags.map((tag: string) => (
                              <span 
                                key={tag}
                                className="px-3 py-1 bg-gray-200 dark:bg-slate-700 rounded-full text-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </main>
  );
}
