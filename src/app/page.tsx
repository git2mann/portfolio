import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { getAllPosts } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Music, PenTool, Code, Cpu } from "lucide-react";

/**
 * Bauhaus Separator Component
 * Replaces the invisible separator with a structural element
 */
const BauhausSeparator = () => (
  <div className="w-full h-12 flex items-center justify-center my-24 relative overflow-hidden">
    <div className="w-full h-[2px] bg-black dark:bg-white absolute"></div>
    <div className="bg-[#F4F3EF] dark:bg-[#0A0A0A] relative z-10 px-4 flex gap-4">
       <div className="w-4 h-4 bg-[#FF3B30] border-2 border-black dark:border-white"></div>
       <div className="w-4 h-4 bg-[#2B4592] rounded-full border-2 border-black dark:border-white"></div>
       <div className="w-4 h-4 bg-[#F4B400] transform rotate-45 border-2 border-black dark:border-white"></div>
    </div>
  </div>
);

/**
 * Home page component
 * Displays the main landing page with intro, featured sections, and recent blog posts
 * in a Neo-Bauhaus / Brutalist aesthetic.
 */
export default function Index() {
  const allPosts = getAllPosts().slice(0, 3);

  return (
    <main className="min-h-screen bg-[#F4F3EF] dark:bg-[#0A0A0A] text-black dark:text-[#F4F3EF] font-bauhaus selection:bg-[#FF3B30] selection:text-white">
      
      {/* Background Grid Texture */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0" 
           style={{ 
             backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
           }}>
      </div>

      <Container>
        {/* Intro / Header Area */}
        <div className="pt-12 relative z-10">
           <Intro />
        </div>

        {/* HERO SECTION: THE MANIFESTO */}
        <section className="mb-32 mt-16 relative z-10">
          <div className="relative border-4 border-black dark:border-white bg-white dark:bg-[#111] shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] dark:shadow-[16px_16px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-300">

            <div className="p-8 md:p-16 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 items-center">
               <div>
                  <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                    My <br/>Creative<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3B30] via-[#F4B400] to-[#2B4592]">Space</span>
                    <span className="text-black dark:text-white">.</span>
                  </h2>
                  <p className="text-lg md:text-xl font-medium border-l-4 border-[#2B4592] pl-6 mb-8 max-w-lg leading-relaxed text-gray-800 dark:text-gray-200">
                    I am a creative individual passionate about music, art, and experimental projects. 
                    This is the archive of my journey, creations, and thoughts.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <Link 
                      href="/blog" 
                      className="group relative px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest border-2 border-transparent hover:bg-[#FF3B30] hover:text-white dark:hover:bg-[#FF3B30] dark:hover:text-white transition-colors"
                    >
                      Visit Blog
                      <span className="absolute bottom-0 right-0 w-2 h-2 bg-white dark:bg-black group-hover:bg-black"></span>
                    </Link>
                    <Link 
                      href="/music" 
                      className="px-8 py-4 bg-transparent text-black dark:text-white font-bold uppercase tracking-widest border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                    >
                      Explore Audio
                    </Link>
                  </div>
               </div>

               {/* Geometric Decoration */}
               <div className="hidden lg:flex justify-center items-center relative h-64 border-l-4 border-black dark:border-white pl-12">
                  <div className="relative w-48 h-48">
                     <div className="absolute inset-0 bg-[#FF3B30] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-80 animate-[float_4s_ease-in-out_infinite]"></div>
                     <div className="absolute inset-0 bg-[#2B4592] transform translate-x-8 translate-y-4 mix-blend-multiply dark:mix-blend-screen opacity-80 animate-[float_5s_ease-in-out_infinite_1s]"></div>
                     <div className="absolute inset-0 bg-[#F4B400] transform -translate-x-4 translate-y-8 rounded-none mix-blend-multiply dark:mix-blend-screen opacity-80 animate-[float_6s_ease-in-out_infinite_0.5s]"></div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        <BauhausSeparator />

        {/* FEATURED WORK: THE TRIPTYCH */}
        <section className="mb-32 relative z-10" aria-labelledby="featured-heading">
          <div className="flex items-center gap-4 mb-16">
             <div className="w-12 h-12 bg-black dark:bg-white flex items-center justify-center text-white dark:text-black">
                <ArrowUpRight className="w-8 h-8" />
             </div>
             <h2 id="featured-heading" className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
               Modules
             </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Music Module */}
            <Link href="/music" className="group relative h-[500px] border-4 border-black dark:border-white bg-white dark:bg-[#111] overflow-hidden hover:-translate-y-2 transition-transform duration-300">
               {/* Hover Flood */}
               <div className="absolute inset-0 bg-[#FF3B30] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-0"></div>
               
               <div className="relative z-10 h-full flex flex-col justify-between p-8">
                  <div className="flex justify-between items-start">
                     <span className="font-mono text-xs uppercase tracking-widest border-b-2 border-black dark:border-white pb-1 group-hover:text-white group-hover:border-white">Fig. 01</span>
                     <Music className="w-12 h-12 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                     <h3 className="text-5xl font-black uppercase tracking-tighter mb-4 group-hover:text-white transition-colors">Music</h3>
                     <p className="font-medium text-sm leading-relaxed max-w-xs group-hover:text-white transition-colors">
                        Sonic architectures. Releases, live performances, and auditory experiments.
                     </p>
                  </div>
                  <div className="w-full h-12 border-2 border-black dark:border-white flex items-center justify-center uppercase font-bold tracking-widest text-sm bg-transparent group-hover:bg-white group-hover:text-black group-hover:border-white transition-all">
                     View Audio
                  </div>
               </div>
            </Link>

            {/* Art Module */}
            <Link href="/art" className="group relative h-[500px] border-4 border-black dark:border-white bg-white dark:bg-[#111] overflow-hidden hover:-translate-y-2 transition-transform duration-300">
               <div className="absolute inset-0 bg-[#2B4592] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-0"></div>
               
               <div className="relative z-10 h-full flex flex-col justify-between p-8">
                  <div className="flex justify-between items-start">
                     <span className="font-mono text-xs uppercase tracking-widest border-b-2 border-black dark:border-white pb-1 group-hover:text-white group-hover:border-white">Fig. 02</span>
                     <PenTool className="w-12 h-12 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                     <h3 className="text-5xl font-black uppercase tracking-tighter mb-4 group-hover:text-white transition-colors">Art</h3>
                     <p className="font-medium text-sm leading-relaxed max-w-xs group-hover:text-white transition-colors">
                        Visual research. Illustrations, digital compositions, and experimental forms.
                     </p>
                  </div>
                  <div className="w-full h-12 border-2 border-black dark:border-white flex items-center justify-center uppercase font-bold tracking-widest text-sm bg-transparent group-hover:bg-white group-hover:text-black group-hover:border-white transition-all">
                     View Visuals
                  </div>
               </div>
            </Link>

            {/* Projects Module */}
            <Link href="/projects" className="group relative h-[500px] border-4 border-black dark:border-white bg-white dark:bg-[#111] overflow-hidden hover:-translate-y-2 transition-transform duration-300">
               <div className="absolute inset-0 bg-[#F4B400] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-0"></div>
               
               <div className="relative z-10 h-full flex flex-col justify-between p-8">
                  <div className="flex justify-between items-start">
                     <span className="font-mono text-xs uppercase tracking-widest border-b-2 border-black dark:border-white pb-1 group-hover:text-black group-hover:border-black">Fig. 03</span>
                     <Code className="w-12 h-12 group-hover:text-black transition-colors" />
                  </div>
                  <div>
                     <h3 className="text-5xl font-black uppercase tracking-tighter mb-4 group-hover:text-black transition-colors">Projects</h3>
                     <p className="font-medium text-sm leading-relaxed max-w-xs group-hover:text-black transition-colors">
                        Applied technology. Code repositories, interactive systems, and prototypes.
                     </p>
                  </div>
                  <div className="w-full h-12 border-2 border-black dark:border-white flex items-center justify-center uppercase font-bold tracking-widest text-sm bg-transparent group-hover:bg-black group-hover:text-white group-hover:border-black transition-all">
                     View Source
                  </div>
               </div>
            </Link>
          </div>
        </section>

        <BauhausSeparator />

        {/* RECENT POSTS: THE ARCHIVE */}
        <section className="mb-32 relative z-10" aria-labelledby="recent-posts-heading">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#F4B400] border-2 border-black dark:border-white flex items-center justify-center text-black">
                   <Cpu className="w-8 h-8" />
                </div>
                <h2 id="recent-posts-heading" className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                  Recent Blog Entries
                </h2>
             </div>
             <div className="h-1 flex-grow bg-black dark:bg-white mx-8 hidden md:block opacity-20"></div>
             <Link 
               href="/blog" 
               className="font-mono text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-4 py-2 transition-colors border-2 border-transparent hover:border-transparent"
             >
               View Full Archive →
             </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allPosts.map((post, idx) => (
              <article
                key={post.slug}
                className="group flex flex-col h-full bg-[#F4F3EF] dark:bg-[#111] border-2 border-black dark:border-white hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] transition-all duration-200"
              >
                <div className="relative h-64 w-full border-b-2 border-black dark:border-white overflow-hidden">
                  <Link href={`/posts/${post.slug}`} aria-label={`Read post: ${post.title}`}>
                    <Image
                      src={post.coverImage}
                      alt={`Cover image for ${post.title}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:grayscale"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </Link>
                  <div className="absolute top-0 left-0 bg-black text-white px-3 py-1 font-mono text-xs uppercase tracking-widest">
                     Log_0{idx + 1}
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-1 bg-white dark:bg-[#111]">
                  <time 
                    className="font-mono text-xs text-[#2B4592] font-bold tracking-widest mb-4 block"
                    dateTime={post.date}
                  >
                    DATE: {new Date(post.date).toLocaleDateString('en-CA').replace(/-/g, '.')}
                  </time>
                  
                  <h3 className="text-2xl font-black leading-tight mb-4 uppercase tracking-tight group-hover:text-[#FF3B30] transition-colors">
                    <Link href={`/posts/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-6 flex-1 leading-relaxed border-l-2 border-gray-200 dark:border-gray-800 pl-4">
                    {post.excerpt.substring(0, 120)}...
                  </p>
                  
                  <Link 
                    href={`/posts/${post.slug}`} 
                    className="self-start inline-flex items-center gap-2 font-bold uppercase text-sm tracking-wider border-b-2 border-black dark:border-white pb-1 hover:text-[#FF3B30] hover:border-[#FF3B30] transition-colors"
                  >
                    Access File <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}