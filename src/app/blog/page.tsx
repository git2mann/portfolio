import { getAllPosts } from "@/lib/api";
import { Post } from "@/interfaces/post";
import BlogTabsClient, { CategoryItem } from "./BlogTabsClient";
import Image from "next/image";
import Container from "@/app/_components/container";
import { BookOpen, Sparkles } from "lucide-react";
import ScrollReveal from "@/app/_components/ScrollReveal";

export default function BlogPage() {
  const posts: Post[] = getAllPosts([
    "title",
    "date",
    "slug",
    "coverImage",
    "excerpt",
    "category",
  ]);
  
  const categories: CategoryItem[] = [
    {
      category: "Music",
      description: "Production logs, sonic theory, and performance data.",
      tagline: "AUDIO ENGINEERING // PROCESS",
      link: "/blog/music",
      icon: "🎵",
      image: "/assets/blog/blog-post-covers/selina-farzaei-x2QHTVg2HqA-unsplash.jpg",
      color: "accent-blue",
      textColor: "text-accent-blue",
      bgColor:  "liquid-glass" 
    },
    {
      category: "Tech",
      description: "Code repositories, system architecture, and development logs.",
      tagline: "FULL STACK // OPEN SOURCE",
      link: "/blog/tech",
      icon: "💻",
      image: "/assets/blog/blog-post-covers/pontus-wellgraf-16_bFHg8Ouc-unsplash.jpg",
      color: "accent-blue",
      textColor: "text-accent-blue",
      bgColor:  "liquid-glass" 
    },
  ];

  return (
    <main className="min-h-screen pb-32 bg-background-primary">
      
      {/* --- HERO SECTION: DICTIONARY ENTRY --- */}
      <section className="relative min-h-[60vh] md:h-[75vh] flex flex-col justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/blog/blog-post-covers/mr-cup-fabien-barral-Mwuod2cm8g4-unsplash.jpg"
            alt="Blog Hero"
            fill
            className="object-cover scale-110 blur-3xl opacity-10"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background-primary/50 via-transparent to-background-primary"></div>
        </div>

        <Container className="relative z-10 w-full !max-w-none px-6 md:px-20">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-24">
            <div className="flex-1 text-left relative z-10">
              <div className="mb-8 md:mb-12 animate-in fade-in slide-in-from-left-8 duration-1000">
                 <div className="flex items-center gap-4 mb-3 md:mb-4">
                    <span className="w-8 md:w-12 h-[1px] bg-accent-blue/50"></span>
                    <span className="text-accent-blue font-medium text-[12px] md:text-sm uppercase tracking-[0.5em]">The Paper Trail</span>
                 </div>
                 <h1 className="text-6xl sm:text-7xl md:text-[11rem] font-light tracking-tighter leading-[0.8] mb-4 md:mb-6 uppercase">
                   Archive
                 </h1>
                 <div className="flex flex-wrap items-center gap-2 md:gap-4 text-lg md:text-3xl font-mono text-secondary">
                   <span>/ˈɑːr.kaɪv/</span>
                   <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent-blue/50"></span>
                   <span>noun</span>
                 </div>
              </div>
              
              <ScrollReveal baseOpacity={0} enableBlur={true} blurStrength={10} textClassName="text-xl md:text-5xl font-light text-primary mt-8 md:mt-12 leading-tight max-w-2xl" stagger={0.08} duration={1} autoReveal={true}>
                1. A digital repository of technical breakthroughs and musical experiments. 2. A collection of posts documenting my journey through various projects.
              </ScrollReveal>
            </div>

            {/* Right: Figurine Visual */}
            <div className="flex-[0.6] md:flex-[0.8] w-full max-w-[350px] md:max-w-[700px] relative mt-8 md:mt-0">
               <div className="relative aspect-square w-full group animate-in fade-in zoom-in duration-1000 delay-300">
                  <div 
                    className="absolute inset-0 blur-3xl rounded-full opacity-60 animate-pulse"
                    style={{ backgroundColor: 'color-mix(in srgb, var(--accent-blue) 10%, transparent)' }}
                  ></div>
                  <div className="w-full h-full relative z-10 flex items-center justify-center">
                     <Image 
                        src="/assets/LN Portfolio Asset Figurine Hero Wave.png" 
                        alt="Figurine Wave" 
                        fill 
                        className="object-contain drop-shadow-[0_0_50px_rgba(43,69,146,0.2)] hover:scale-105 transition-transform duration-1000"
                     />
                     
                     {/* Orbiting element for tech flavor */}
                     <div className="absolute inset-0 border border-white/5 rounded-full scale-90 border-dashed animate-spin-slow"></div>
                     <div className="absolute top-0 left-1/2 w-2 h-2 bg-accent-blue rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(43,69,146,1)]"></div>
                  </div>
               </div>
            </div>
          </div>
        </Container>
      </section>

      {/* --- CONTENT FEED --- */}
      <Container className="!max-w-none px-6 md:px-20 mt-16 md:mt-0">
         <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <BlogTabsClient posts={posts} categories={categories} />
         </div>
      </Container>

    </main>
  );
}