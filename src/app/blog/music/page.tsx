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
  const musicTags = getMusicTags();

  const postsPerPage = 6;
  const totalPages = Math.ceil((musicPosts.length - 1) / postsPerPage);

  const featuredPost: Post | undefined = musicPosts[0];

  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = musicPosts.slice(1).slice(startIndex, startIndex + postsPerPage);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <main className="min-h-screen pb-32 bg-background-primary text-primary">
      
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
                    <span className="text-red-500 font-medium text-[12px] md:text-sm uppercase tracking-[0.5em]">Sector_Music</span>
                 </div>
                 <h1 className="text-6xl sm:text-7xl md:text-[10rem] font-light tracking-tighter leading-[0.8] mb-4 md:mb-6 uppercase">
                   Sonic<br/>Studies
                 </h1>
              </div>
              
              <ScrollReveal baseOpacity={0} enableBlur={true} blurStrength={10} textClassName="text-xl md:text-4xl font-light text-secondary mt-8 md:mt-12 leading-tight max-w-2xl" stagger={0.08} duration={1} autoReveal={true}>
                Technical analysis of audio engineering, production logs, and theoretical experiments in rhythm and frequency.
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
        {musicTags.length > 0 && (
          <div className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/5 pb-10">
             <div className="space-y-2">
                <div className="flex items-center gap-3">
                   <Tag className="text-red-500 w-4 h-4" />
                   <span className="font-mono text-[10px] uppercase tracking-[0.4em] opacity-40">Signal_Filter</span>
                </div>
                <h2 className="text-3xl font-light uppercase tracking-tighter">Frequency Selection</h2>
             </div>

             <div className="flex flex-wrap gap-2">
                <Link
                  href="/blog/music"
                  className={`px-6 py-2.5 rounded-full text-[10px] font-medium uppercase tracking-[0.2em] transition-all border
                    ${!tag 
                      ? 'bg-primary text-background-primary border-primary shadow-lg scale-105' 
                      : 'text-secondary border-white/10 hover:border-red-500/40 hover:text-primary'
                    }
                  `}
                >
                  [ ALL_SIGNALS ]
                </Link>
                {musicTags.map((tagItem) => (
                  <Link
                    key={tagItem}
                    href={`/blog/music?tag=${tagItem}`}
                    className={`px-6 py-2.5 rounded-full text-[10px] font-medium uppercase tracking-[0.2em] transition-all border
                      ${tag === tagItem
                        ? 'bg-red-500 text-white border-red-500 shadow-lg scale-105' 
                        : 'text-secondary border-white/10 hover:border-red-500/40 hover:text-primary'
                      }
                    `}
                  >
                    [ {tagItem.toUpperCase()} ]
                  </Link>
                ))}
             </div>
          </div>
        )}

        {/* --- FEATURED ARTIFACT --- */}
        {featuredPost && (
          <div className="mb-32 animate-in fade-in slide-in-from-bottom-6 duration-1000">
              <Link href={`/posts/${featuredPost.slug}`} className="group block relative min-h-[500px] md:min-h-[550px] lg:aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/5 bg-white/[0.01] flex flex-col justify-end">
                 <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-all duration-[3000ms] group-hover:scale-105 opacity-65 group-hover:opacity-85 blur-[6px] group-hover:blur-[4px]"
                 />
                 <div 
                   className="absolute inset-0 via-transparent to-transparent"
                   style={{ backgroundImage: 'linear-gradient(to top, var(--background-primary), color-mix(in srgb, var(--background-primary) 20%, transparent), transparent)' }}
                 ></div>
                 <div className="relative z-10 p-8 sm:p-12 md:p-20 flex flex-col justify-end mt-20">
                    <div className="max-w-4xl space-y-6">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-px bg-red-500" />
                          <span className="text-red-500 font-mono text-[10px] uppercase tracking-[0.6em]">Priority_Analysis</span>
                       </div>
                       <h3 className="text-5xl md:text-8xl font-light uppercase tracking-tighter leading-[0.8]">{featuredPost.title}</h3>
                       <p className="text-xl text-secondary font-light max-w-xl leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">{featuredPost.excerpt}</p>
                       <div className="pt-6">
                          <div className="inline-flex items-center gap-4 text-xs font-medium uppercase tracking-[0.4em] group-hover:gap-8 transition-all">
                             Access_Module <ArrowRight size={18} />
                          </div>
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
                          className="object-cover transition-all duration-[3000ms] group-hover:scale-105 opacity-80 group-hover:opacity-100"
                       />
                       <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1 font-mono text-[9px] uppercase tracking-widest rounded-full">
                          LOG_0{idx + 2}
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
                          <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-secondary">Execute_Analysis</span>
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
function getMusicTags(): string[] {
  const musicPosts = getPostsByCategory("Music");
  const tags = musicPosts.flatMap((post) => post.tags || []);
  return Array.from(new Set(tags));
}

function getPostsByCategory(category: string, tag?: string): Post[] {
  return getAllPosts(["title", "date", "slug", "coverImage", "excerpt", "tags", "category", "content"]).filter(
    (post) => post.category === category && (!tag || post.tags?.includes(tag))
  );
}