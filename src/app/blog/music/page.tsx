import Container from "@/app/_components/container";
import { getAllPosts } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/interfaces/post";
import { ArrowLeft, ArrowRight, Music, Tag, Disc, BarChart2 } from "lucide-react";
import ScrollReveal from "@/app/_components/ScrollReveal";

export default async function MusicBlogPage({
  searchParams,
}: {
  searchParams?: Promise<any> | undefined;
}) {
  const resolvedSearchParams = await searchParams;

  const tag = Array.isArray(resolvedSearchParams?.tag) ? resolvedSearchParams?.tag[0] : resolvedSearchParams?.tag;
  const pageParam = Array.isArray(resolvedSearchParams?.page) ? resolvedSearchParams?.page[0] : resolvedSearchParams?.page;
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  const musicPosts = getPostsByCategory("Music", tag);
  const musicTagsData = getMusicTagsWithCounts();

  const postsPerPage = 6;
  const totalPages = Math.ceil((musicPosts.length - 1) / postsPerPage);

  const featuredPost: Post | undefined = musicPosts[0];

  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = musicPosts.slice(1).slice(startIndex, startIndex + postsPerPage);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <main className="min-h-screen pb-32 bg-background-primary text-primary font-noto-display-condensed selection:bg-red-500/20">
      
      {/* --- HERO SECTION: DICTIONARY ENTRY --- */}
      <section className="relative min-h-[60vh] md:h-[70vh] flex flex-col justify-center overflow-hidden pt-20 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-red-500/5 blur-3xl opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background-primary/50 via-transparent to-background-primary"></div>
        </div>

        <Container className="relative z-10 w-full !max-w-none px-6 md:px-20">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-24">
            <div className="flex-1 text-left relative z-10">
              <div className="mb-8 md:mb-12 animate-in fade-in slide-in-from-left-8 duration-1000">
                 <Link href="/blog" className="inline-flex items-center gap-4 text-accent-blue font-mono text-[10px] uppercase tracking-[0.5em] mb-10 hover:gap-6 transition-all group">
                    <ArrowLeft size={12} className="group-hover:-translate-x-2 transition-transform" /> Back to Archive
                 </Link>
                 <div className="flex items-center gap-4 mb-3 md:mb-4">
                    <span className="block w-8 md:w-12 h-[1px] bg-red-500 opacity-50"></span>
                    <span className="text-red-500 font-medium text-[12px] md:text-sm uppercase tracking-[0.5em]">Music & Sound</span>
                 </div>
                 <h1 className="text-6xl sm:text-7xl md:text-[10rem] font-light tracking-tighter leading-[0.8] mb-4 md:mb-6 uppercase">
                   Sonic<br/>Studies
                 </h1>
              </div>
              
              <ScrollReveal baseOpacity={0} enableBlur={true} blurStrength={10} textClassName="text-xl md:text-4xl font-light text-secondary mt-8 md:mt-12 leading-tight max-w-2xl" stagger={0.08} duration={1} autoReveal={true}>
                Notes on sound design, songwriting, creative friction, and the craft of independent music production.
              </ScrollReveal>
            </div>

            {/* Right: Decorative Visual */}
            <div className="flex-[0.6] md:flex-[0.8] w-full max-w-[300px] md:max-w-[600px] relative mt-8 md:mt-0">
               <div className="relative aspect-square w-full group">
                  <div className="absolute inset-0 bg-red-500/5 blur-3xl rounded-full opacity-60"></div>
                  <div className="w-full h-full relative z-10 flex items-center justify-center">
                     <div className="w-64 h-64 border border-white/10 rounded-full flex items-center justify-center relative animate-spin-slow">
                        <div className="absolute inset-0 border border-white/5 rounded-full scale-90 border-dashed"></div>
                        <Disc size={48} className="text-red-500 opacity-40" />
                        <div className="absolute top-0 left-1/2 w-3 h-3 bg-red-500 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_15px_rgba(239,68,68,1)]"></div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="!max-w-none px-6 md:px-20 py-20">
        
        {/* --- TAG FILTERS --- */}
        {musicTagsData.length > 0 && (
          <div className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8">
             <div className="space-y-1">
                <div className="flex items-center gap-3">
                   <Tag className="text-red-500 w-3.5 h-3.5" />
                   <span className="font-mono text-[10px] uppercase tracking-[0.4em] opacity-40">Topic Filter</span>
                </div>
                <h2 className="text-2xl font-light uppercase tracking-tighter">Filter by Topic</h2>
             </div>

             <div className="flex flex-wrap gap-2 items-center">
                <Link
                  href="/blog/music"
                  className={`px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all border
                    ${!tag 
                      ? 'bg-primary text-background-primary border-primary shadow-lg font-medium' 
                      : 'text-secondary border-white/10 hover:border-red-500/40 hover:text-primary'
                    }
                  `}
                >
                  ALL POSTS
                </Link>
                {musicTagsData.map(({ tag: tagItem, count }) => (
                  <Link
                    key={tagItem}
                    href={tag === tagItem ? '/blog/music' : `/blog/music?tag=${encodeURIComponent(tagItem)}`}
                    className={`px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all border flex items-center gap-1.5
                      ${tag === tagItem
                        ? 'bg-red-500 text-white border-red-500 shadow-lg font-medium scale-105' 
                        : 'text-secondary border-white/10 hover:border-red-500/40 hover:text-primary'
                      }
                    `}
                  >
                    <span>{tagItem.toUpperCase()}</span>
                    <span className="text-[8px] opacity-60">({count})</span>
                  </Link>
                ))}
                {tag && (
                  <Link
                    href="/blog/music"
                    className="text-[9px] font-mono uppercase tracking-wider text-secondary/60 hover:text-primary transition-colors ml-2 underline"
                  >
                    Clear
                  </Link>
                )}
             </div>
          </div>
        )}

        {/* --- FEATURED ARTIFACT --- */}
        {featuredPost && (
          <div className="mb-24 animate-in fade-in slide-in-from-bottom-6 duration-1000">
              <Link href={`/posts/${featuredPost.slug}`} className="group block relative min-h-[480px] md:min-h-[540px] rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/5 bg-white/[0.01] flex flex-col justify-end">
                 <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    className="object-cover transition-all duration-[3000ms] group-hover:scale-105 opacity-60 group-hover:opacity-80 blur-[4px] group-hover:blur-[2px]"
                 />
                 <div 
                   className="absolute inset-0 bg-gradient-to-t from-background-primary via-background-primary/80 to-background-primary/20 opacity-95"
                 ></div>
                 <div className="relative z-10 p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-end">
                    <div className="max-w-4xl space-y-4 md:space-y-6">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-px bg-red-500" />
                          <span className="text-red-500 font-mono text-[10px] uppercase tracking-[0.6em]">Featured Article</span>
                       </div>
                       <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-tight leading-[1.08] text-primary">{featuredPost.title}</h3>
                       <p className="text-sm sm:text-base md:text-lg text-secondary font-light max-w-3xl leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">{featuredPost.excerpt}</p>
                       <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-4">
                          <div className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.4em] text-red-500 group-hover:gap-6 transition-all">
                             Read Article <ArrowRight size={18} />
                          </div>
                          {featuredPost.tags && featuredPost.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 items-center">
                              {featuredPost.tags.map((t) => (
                                <span key={t} className="text-[9px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border border-white/10 bg-white/5 text-secondary">
                                  #{t}
                                </span>
                              ))}
                            </div>
                          )}
                       </div>
                    </div>
                 </div>
              </Link>
          </div>
        )}

        {/* --- LOG GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
          {paginatedPosts.map((post, idx) => {
            const words = (post.content || "").trim().split(/\s+/).length;
            const readTime = Math.max(1, Math.ceil(words / 200));

            return (
              <article key={post.slug} className="group relative flex flex-col liquid-glass rounded-[2rem] p-6 hover:-translate-y-1 transition-all">
                 <Link href={`/posts/${post.slug}`} className="block flex-1 flex flex-col">
                    <div className="relative aspect-[4/3] w-full overflow-hidden mb-8 rounded-2xl">
                       <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-all duration-[3000ms] group-hover:scale-105 opacity-80 group-hover:opacity-100"
                       />
                       <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1 font-mono text-[9px] uppercase tracking-widest rounded-full">
                          {post.tags?.[0] || post.category}
                       </div>
                    </div>
                    <div className="flex flex-col flex-1">
                       <div className="flex items-center justify-between gap-4 mb-6">
                          <div className="flex items-center gap-3">
                             <div className="w-6 h-px bg-red-500/30" />
                             <time className="text-[10px] font-mono text-red-500 uppercase tracking-[0.3em]">
                                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                             </time>
                          </div>
                          <span className="text-[9px] font-mono text-secondary/50 uppercase tracking-widest">
                             {readTime} min read
                          </span>
                       </div>
                       <h3 className="text-3xl font-light tracking-tighter mb-6 group-hover:text-red-500 transition-colors uppercase leading-[0.9]">
                          {post.title}
                       </h3>
                       <p className="text-secondary font-light text-sm line-clamp-3 mb-8 leading-relaxed opacity-70 group-hover:opacity-90 transition-opacity">
                          {post.excerpt}
                       </p>
                       <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center opacity-60 group-hover:opacity-100 transition-all">
                          <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-secondary">Read Article</span>
                          <ArrowRight className="w-5 h-5 text-red-500 group-hover:translate-x-3 transition-transform" />
                       </div>
                    </div>
                 </Link>
              </article>
            );
          })}
        </div>

        {/* --- PAGINATION --- */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-20">
             <div className="inline-flex gap-4 p-2 rounded-full bg-white/[0.03] border border-white/5">
                <Link
                   href={`/blog/music?page=${Math.max(1, currentPage - 1)}${tag ? `&tag=${tag}` : ''}`}
                   className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      currentPage === 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-white/5 hover:text-red-500'
                   }`}
                >
                   <ArrowLeft size={18} />
                </Link>
                
                <div className="flex items-center gap-2 px-4">
                   {pageNumbers.map(number => (
                      <Link 
                         key={number} 
                         href={`/blog/music?page=${number}${tag ? `&tag=${tag}` : ''}`}
                         className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs transition-all ${
                            currentPage === number 
                               ? 'bg-red-500 text-white shadow-lg scale-110' 
                               : 'text-secondary hover:text-white hover:bg-white/5'
                         }`}
                      >
                         {number}
                      </Link>
                   ))}
                </div>
                
                <Link
                   href={`/blog/music?page=${Math.min(totalPages, currentPage + 1)}${tag ? `&tag=${tag}` : ''}`}
                   className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      currentPage === totalPages ? 'opacity-20 cursor-not-allowed' : 'hover:bg-white/5 hover:text-red-500'
                   }`}
                >
                   <ArrowRight size={18} />
                </Link>
             </div>
          </div>
        )}

      </Container>
    </main>
  );
}

// Helpers
function getMusicTagsWithCounts(): { tag: string; count: number }[] {
  const allMusicPosts = getAllPosts(["tags", "category"]).filter(
    (post) => post.category === "Music"
  );
  const counts: Record<string, number> = {};
  allMusicPosts.forEach((post) => {
    (post.tags || []).forEach((t) => {
      counts[t] = (counts[t] || 0) + 1;
    });
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }));
}

function getPostsByCategory(category: string, tag?: string): Post[] {
  return getAllPosts(["title", "date", "slug", "coverImage", "excerpt", "tags", "category", "content"]).filter(
    (post) => post.category === category && (!tag || post.tags?.includes(tag))
  );
}