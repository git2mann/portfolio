import Container from "@/app/_components/container";
import { getAllPosts } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/interfaces/post";
import { ArrowLeft, ArrowRight, Music, Tag, Disc, BarChart2 } from "lucide-react";

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
    <main className="min-h-screen bg-[#EAE8E3] text-black selection:bg-[#2B4592] selection:text-white">
      
      {/* 1. BACKGROUND TEXTURE */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0" 
           style={{ 
             backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
           }}>
      </div>

      {/* 2. HEADER MODULE */}
      <div className="relative z-10 w-full border-b-4 border-black bg-[#F4F3EF]">
         {/* Ticker Tape */}
         <div className="w-full bg-black text-[#F4F3EF] py-2 overflow-hidden border-b-2 border-black">
            <div className="animate-marquee whitespace-nowrap font-mono text-xs uppercase tracking-[0.3em] flex items-center gap-12">
               <span>/// AUDIO_LOGS: ONLINE</span>
               <span>/// FREQUENCY: 20HZ - 20KHZ</span>
               <span>/// SYSTEM: RECORDING</span>
               <span>/// AUDIO_LOGS: ONLINE</span>
               <span>/// FREQUENCY: 20HZ - 20KHZ</span>
               <span>/// SYSTEM: RECORDING</span>
            </div>
         </div>

         <Container>
            <div className="py-12 md:py-24 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
               <div>
                  <Link 
                     href="/blog" 
                     className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest border-b-2 border-black pb-1 hover:text-[#2B4592] hover:border-[#2B4592] transition-colors mb-8"
                  >
                     <ArrowLeft className="w-3 h-3" /> Return to Main Index
                  </Link>
                  <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter mb-6 relative z-10">
                     Music<br/>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2B4592] to-[#FF3B30]">Logs</span>
                  </h1>
                  <p className="text-lg font-medium border-l-4 border-[#2B4592] pl-6 max-w-lg leading-relaxed">
                     Sonic analysis, production notes, and industry observations.
                  </p>
               </div>
               
               {/* Decorative Abstract Visual */}
               <div className="hidden lg:flex items-center justify-center relative">
                  <div className="w-64 h-64 border-4 border-black rounded-full flex items-center justify-center relative animate-spin-slow">
                     <div className="absolute inset-0 border-2 border-black rounded-full scale-75 border-dashed"></div>
                     <Music className="w-16 h-16" />
                     <div className="absolute top-0 left-1/2 w-4 h-4 bg-[#FF3B30] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black"></div>
                  </div>
               </div>
            </div>
         </Container>
      </div>

      <Container>
        <div className="max-w-[1920px] mx-auto py-12 relative z-10">

          {/* 3. TAG FILTER BANK */}
          {musicTags.length > 0 && (
            <div className="mb-16 border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-3 mb-6 border-b-2 border-black/10 pb-4">
                 <Tag className="w-5 h-5" />
                 <h2 className="font-mono text-sm font-bold uppercase tracking-widest">Signal Filter</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/blog/music"
                  className={`
                    px-4 py-2 border-2 text-xs font-bold uppercase tracking-wider transition-all duration-150
                    ${!tag 
                      ? "bg-black text-white border-black" 
                      : "bg-transparent text-black border-black hover:bg-[#2B4592] hover:text-white hover:border-[#2B4592]"
                    }
                  `}
                >
                  [ ALL_SIGNALS ]
                </Link>
                {musicTags.map((tagItem) => (
                  <Link
                    key={tagItem}
                    href={`/blog/music?tag=${tagItem}`}
                    className={`
                      px-4 py-2 border-2 text-xs font-bold uppercase tracking-wider transition-all duration-150
                      ${tag === tagItem
                        ? "bg-[#2B4592] text-white border-[#2B4592]" 
                        : "bg-transparent text-black border-black hover:bg-[#FF3B30] hover:text-white hover:border-[#FF3B30]"
                      }
                    `}
                  >
                    [ {tagItem.toUpperCase()} ]
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 4. FEATURED POST (HERO CARD) */}
          {featuredPost && (
            <div className="mb-24 group relative">
               <div className="absolute -inset-2 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 translate-x-2 translate-y-2"></div>
               <Link href={`/posts/${featuredPost.slug}`} className="block border-4 border-black bg-white relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                     <div className="relative min-h-[400px] border-b-4 lg:border-b-0 lg:border-r-4 border-black overflow-hidden">
                        <Image
                           src={featuredPost.coverImage}
                           alt={featuredPost.title}
                           fill
                           className="object-cover transition-transform duration-700 group-hover:scale-105"
                           priority
                        />
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                     </div>
                     <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4">
                           <span className="bg-[#FF3B30] text-white px-3 py-1 font-mono text-[10px] uppercase tracking-widest border border-black">
                              Priority_Read
                           </span>
                           {featuredPost.date && (
                              <span className="font-mono text-xs text-gray-500">
                                 {new Date(featuredPost.date).toLocaleDateString('en-CA')}
                              </span>
                           )}
                        </div>
                        <h3 className="text-4xl lg:text-5xl font-black uppercase leading-[0.9] tracking-tighter mb-6 group-hover:text-[#2B4592] transition-colors">
                           {featuredPost.title}
                        </h3>
                        <p className="text-lg font-medium text-gray-700 mb-8 line-clamp-3">
                           {featuredPost.excerpt}
                        </p>
                        <div className="flex items-center gap-2 font-bold uppercase text-sm tracking-widest group-hover:gap-4 transition-all">
                           Access File <ArrowRight className="w-4 h-4" />
                        </div>
                     </div>
                  </div>
               </Link>
            </div>
          )}

          {/* 5. DATA GRID (POSTS) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {paginatedPosts.map((post, idx) => (
              <article
                key={post.slug}
                className="group flex flex-col h-full bg-[#F4F3EF] border-2 border-black hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
              >
                <Link href={`/posts/${post.slug}`} className="block flex-1 flex flex-col">
                   <div className="relative h-64 w-full border-b-2 border-black overflow-hidden bg-black">
                      <Image
                         src={post.coverImage}
                         alt={post.title}
                         fill
                         className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-0 left-0 bg-black text-white px-3 py-1 font-mono text-xs uppercase tracking-widest border-r-2 border-b-2 border-white">
                         Log_0{idx + 2}
                      </div>
                   </div>
                   
                   <div className="p-6 flex flex-col flex-1 bg-white">
                      <time className="font-mono text-xs text-[#2B4592] font-bold tracking-widest mb-3 block">
                         {new Date(post.date).toLocaleDateString()}
                      </time>
                      
                      <h3 className="text-2xl font-black leading-tight mb-4 uppercase tracking-tight group-hover:text-[#FF3B30] transition-colors">
                         {post.title}
                      </h3>
                      
                      {post.excerpt && (
                         <p className="text-sm font-medium text-gray-600 mb-6 flex-1 leading-relaxed border-l-2 border-gray-200 pl-4">
                            {post.excerpt.substring(0, 100)}...
                         </p>
                      )}
                      
                      <div className="mt-auto pt-4 border-t-2 border-black/10 flex justify-between items-center">
                         <span className="font-mono text-xs font-bold uppercase">Read</span>
                         <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform" />
                      </div>
                   </div>
                </Link>
              </article>
            ))}
          </div>

          {/* 6. NO RESULTS STATE */}
          {paginatedPosts.length === 0 && !featuredPost && (
            <div className="border-4 border-black border-dashed p-16 text-center bg-white">
               <div className="w-16 h-16 bg-[#F4B400] mx-auto mb-6 flex items-center justify-center border-2 border-black rounded-full">
                  <BarChart2 className="w-8 h-8" />
               </div>
               <h3 className="text-3xl font-black uppercase mb-2">No Data Found</h3>
               <p className="font-mono text-sm text-gray-500 mb-8 uppercase tracking-widest">
                  {tag ? `Filter "${tag}" returned 0 results.` : "Archive is currently empty."}
               </p>
               <Link 
                  href="/blog/music" 
                  className="inline-block px-8 py-3 bg-black text-white font-bold uppercase tracking-widest hover:bg-[#FF3B30] transition-colors"
               >
                  Reset Filters
               </Link>
            </div>
          )}

          {/* 7. SEQUENCE CONTROLLER (PAGINATION) */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-16">
               <div className="inline-flex border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Link
                     href={`/blog/music?page=${Math.max(1, currentPage - 1)}${tag ? `&tag=${tag}` : ''}`}
                     className={`px-6 py-3 font-bold uppercase tracking-widest border-r-2 border-black transition-colors ${
                        currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-[#FF3B30] hover:text-white'
                     }`}
                     aria-disabled={currentPage === 1}
                     tabIndex={currentPage === 1 ? -1 : 0}
                  >
                     Prev
                  </Link>
                  
                  {pageNumbers.map(number => (
                     <Link 
                        key={number} 
                        href={`/blog/music?page=${number}${tag ? `&tag=${tag}` : ''}`}
                        className={`px-4 py-3 font-mono font-bold border-r-2 border-black last:border-r-0 transition-colors ${
                           currentPage === number 
                              ? 'bg-black text-white' 
                              : 'hover:bg-[#2B4592] hover:text-white'
                        }`}
                     >
                        {number}
                     </Link>
                  ))}
                  
                  <Link
                     href={`/blog/music?page=${Math.min(totalPages, currentPage + 1)}${tag ? `&tag=${tag}` : ''}`}
                     className={`px-6 py-3 font-bold uppercase tracking-widest border-l-2 border-black transition-colors ${
                        currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-[#FF3B30] hover:text-white'
                     }`}
                     aria-disabled={currentPage === totalPages}
                     tabIndex={currentPage === totalPages ? -1 : 0}
                  >
                     Next
                  </Link>
               </div>
            </div>
          )}

        </div>
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
  return getAllPosts().filter(
    (post) => post.category === category && (!tag || post.tags?.includes(tag))
  );
}