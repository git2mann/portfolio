import Container from "@/app/_components/container";
import { getAllPosts } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/interfaces/post";
import { ArrowLeft, ArrowRight, Terminal, Tag, Cpu, Code } from "lucide-react";
import ScrollReveal from "@/app/_components/ScrollReveal";

export default async function TechBlogPage({
  searchParams,
}: {
  searchParams?: Promise<any> | undefined;
}) {
  const resolvedSearchParams = await searchParams;

  const tag = Array.isArray(resolvedSearchParams?.tag) ? resolvedSearchParams?.tag[0] : resolvedSearchParams?.tag;
  const pageParam = Array.isArray(resolvedSearchParams?.page) ? resolvedSearchParams?.page[0] : resolvedSearchParams?.page;
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  const techPosts = getPostsByCategory("Tech", tag);
  const techTags = getTechTags();

  const postsPerPage = 6;
  const totalPages = Math.ceil((techPosts.length - 1) / postsPerPage);

  const featuredPost: Post | undefined = techPosts[0];

  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = techPosts.slice(1).slice(startIndex, startIndex + postsPerPage);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <main className="min-h-screen pb-32 bg-background-primary text-primary">
      
      {/* --- HERO SECTION: DICTIONARY ENTRY --- */}
      <section className="relative min-h-[60vh] md:h-[70vh] flex flex-col justify-center overflow-hidden pt-20 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-accent-blue/5 blur-3xl opacity-20"></div>
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
                    <span className="w-8 md:w-12 h-[1px] bg-accent-blue/50"></span>
                    <span className="text-accent-blue font-medium text-[12px] md:text-sm uppercase tracking-[0.5em]">Sector_Tech</span>
                 </div>
                 <h1 className="text-6xl sm:text-7xl md:text-[10rem] font-light tracking-tighter leading-[0.8] mb-4 md:mb-6 uppercase">
                   Dev<br/>Logs
                 </h1>
              </div>
              
              <ScrollReveal baseOpacity={0} enableBlur={true} blurStrength={10} textClassName="text-xl md:text-4xl font-light text-secondary mt-8 md:mt-12 leading-tight max-w-2xl" stagger={0.08} duration={1} autoReveal={true}>
                Technical architecture, full-stack development logs, and experimental breakthroughs in digital systems and logic.
              </ScrollReveal>
            </div>

            {/* Right: Decorative Visual */}
            <div className="flex-[0.6] md:flex-[0.8] w-full max-w-[300px] md:max-w-[600px] relative mt-8 md:mt-0">
               <div className="relative aspect-square w-full group">
                  <div className="absolute inset-0 bg-accent-blue/5 blur-3xl rounded-full opacity-60"></div>
                  <div className="w-full h-full relative z-10 flex items-center justify-center">
                     <div className="w-64 h-64 border border-white/10 rounded-full flex items-center justify-center relative animate-spin-slow">
                        <div className="absolute inset-0 border border-white/5 rounded-full scale-90 border-dashed"></div>
                        <Terminal size={48} className="text-accent-blue opacity-40" />
                        <div className="absolute top-0 left-1/2 w-3 h-3 bg-accent-blue -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_15px_rgba(43,69,146,1)]"></div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="!max-w-none px-6 md:px-20 py-20">
        
        {/* --- TAG FILTERS --- */}
        {techTags.length > 0 && (
          <div className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/5 pb-10">
             <div className="space-y-2">
                <div className="flex items-center gap-3">
                   <Tag className="text-accent-blue w-4 h-4" />
                   <span className="font-mono text-[10px] uppercase tracking-[0.4em] opacity-40">System_Filter</span>
                </div>
                <h2 className="text-3xl font-light uppercase tracking-tighter">Signal Selection</h2>
             </div>

             <div className="flex flex-wrap gap-2">
                <Link
                  href="/blog/tech"
                  className={`px-6 py-2.5 rounded-full text-[10px] font-medium uppercase tracking-[0.2em] transition-all border
                    ${!tag 
                      ? 'bg-primary text-background-primary border-primary shadow-lg scale-105' 
                      : 'text-secondary border-white/10 hover:border-accent-blue/40 hover:text-primary'
                    }
                  `}
                >
                  [ ALL_SYSTEMS ]
                </Link>
                {techTags.map((tagItem) => (
                  <Link
                    key={tagItem}
                    href={`/blog/tech?tag=${tagItem}`}
                    className={`px-6 py-2.5 rounded-full text-[10px] font-medium uppercase tracking-[0.2em] transition-all border
                      ${tag === tagItem
                        ? 'bg-accent-blue text-white border-accent-blue shadow-lg scale-105' 
                        : 'text-secondary border-white/10 hover:border-accent-blue/40 hover:text-primary'
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
             <Link href={`/posts/${featuredPost.slug}`} className="group block relative aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/5 bg-white/[0.01]">
                <Image
                   src={featuredPost.coverImage}
                   alt={featuredPost.title}
                   fill
                   className="object-cover transition-all duration-[3000ms] group-hover:scale-105 opacity-70 group-hover:opacity-100"
                />
                <div 
                  className="absolute inset-0 via-transparent to-transparent"
                  style={{ backgroundImage: 'linear-gradient(to top, var(--background-primary), color-mix(in srgb, var(--background-primary) 20%, transparent), transparent)' }}
                ></div>
                <div className="absolute inset-0 p-12 md:p-24 flex flex-col justify-end">
                   <div className="max-w-4xl space-y-6">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-px bg-accent-blue" />
                         <span className="text-accent-blue font-mono text-[10px] uppercase tracking-[0.6em]">System_Analysis</span>
                      </div>
                      <h3 className="text-5xl md:text-8xl font-light uppercase tracking-tighter leading-[0.8]">{featuredPost.title}</h3>
                      <p className="text-xl text-secondary font-light max-w-xl leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">{featuredPost.excerpt}</p>
                      <div className="pt-6">
                         <div className="inline-flex items-center gap-4 text-xs font-medium uppercase tracking-[0.4em] group-hover:gap-8 transition-all">
                            Access_Sequence <ArrowRight size={18} />
                         </div>
                      </div>
                   </div>
                </div>
             </Link>
          </div>
        )}

        {/* --- LOG GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
          {paginatedPosts.map((post, idx) => (
            <article key={post.slug} className="group relative flex flex-col bg-white/[0.01] border border-white/5 hover:border-accent-blue/30 transition-all duration-700 rounded-2xl p-6 shadow-xl hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
               <Link href={`/posts/${post.slug}`} className="block flex-1">
                  <div className="relative aspect-[4/3] w-full overflow-hidden mb-10 rounded-xl">
                     <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-all duration-[3000ms] group-hover:scale-110 opacity-70 group-hover:opacity-100"
                     />
                     <div className="absolute top-0 left-0 bg-accent-blue text-white px-3 py-1 font-mono text-[9px] uppercase tracking-widest rounded-br-lg">
                        LOG_0{idx + 2}
                     </div>
                  </div>
                  <div className="flex flex-col px-4 pb-4">
                     <time className="text-[10px] font-mono text-accent-blue uppercase tracking-[0.3em] mb-6 block">
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                     </time>
                     <h3 className="text-4xl font-light tracking-tighter mb-8 group-hover:text-white transition-colors uppercase leading-[0.85]">
                        {post.title}
                     </h3>
                     <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center opacity-30 group-hover:opacity-100 transition-all">
                        <span className="text-[9px] font-mono uppercase tracking-[0.4em]">Execute_Logic</span>
                        <ArrowRight className="w-5 h-5 text-accent-blue group-hover:translate-x-3 transition-transform" />
                     </div>
                  </div>
               </Link>
            </article>
          ))}
        </div>

        {/* --- PAGINATION --- */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-20">
             <div className="inline-flex gap-4 p-2 rounded-full bg-white/[0.03] border border-white/5">
                <Link
                   href={`/blog/tech?page=${Math.max(1, currentPage - 1)}${tag ? `&tag=${tag}` : ''}`}
                   className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      currentPage === 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-white/5 hover:text-accent-blue'
                   }`}
                >
                   <ArrowLeft size={18} />
                </Link>
                
                <div className="flex items-center gap-2 px-4">
                   {pageNumbers.map(number => (
                      <Link 
                         key={number} 
                         href={`/blog/tech?page=${number}${tag ? `&tag=${tag}` : ''}`}
                         className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs transition-all ${
                            currentPage === number 
                               ? 'bg-accent-blue text-white shadow-lg scale-110' 
                               : 'text-secondary hover:text-white hover:bg-white/5'
                         }`}
                      >
                         {number}
                      </Link>
                   ))}
                </div>
                
                <Link
                   href={`/blog/tech?page=${Math.min(totalPages, currentPage + 1)}${tag ? `&tag=${tag}` : ''}`}
                   className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      currentPage === totalPages ? 'opacity-20 cursor-not-allowed' : 'hover:bg-white/5 hover:text-accent-blue'
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
function getTechTags(): string[] {
  const techPosts = getPostsByCategory("Tech");
  const tags = techPosts.flatMap((post) => post.tags || []);
  return Array.from(new Set(tags));
}

function getPostsByCategory(category: string, tag?: string): Post[] {
  return getAllPosts(["title", "date", "slug", "coverImage", "excerpt", "tags", "category"]).filter(
    (post) => post.category === category && (!tag || post.tags?.includes(tag))
  );
}