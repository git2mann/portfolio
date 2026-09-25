import { getAllPosts } from "@/lib/api";
import { Post } from "@/interfaces/post";
import BlogTabsClient, { CategoryItem } from "./BlogTabsClient";
import Container from "@/app/_components/container";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/app/_components/ScrollReveal";

export default function BlogPage() {
  const posts: Post[] = getAllPosts([
    "title",
    "date",
    "slug",
    "coverImage",
    "excerpt",
    "category",
    "tags",
    "content",
  ]);
  
  const categories: CategoryItem[] = [
    {
      category: "Music",
      description: "Essays on sound design, production workflows, and creative friction.",
      tagline: "Sound & Production",
      link: "/blog/music",
      icon: "🎵",
      image: "/assets/blog/blog-post-covers/selina-farzaei-x2QHTVg2HqA-unsplash.webp",
      color: "accent-blue",
      textColor: "text-accent-blue",
      bgColor:  "liquid-glass" 
    },
    {
      category: "Tech",
      description: "Engineering notes, architecture teardowns, and software experiments.",
      tagline: "Systems & Software",
      link: "/blog/tech",
      icon: "💻",
      image: "/assets/blog/blog-post-covers/pontus-wellgraf-16_bFHg8Ouc-unsplash.webp",
      color: "accent-blue",
      textColor: "text-accent-blue",
      bgColor:  "liquid-glass" 
    },
  ];

  return (
    <main className="min-h-screen pb-32 bg-background-primary relative selection:bg-accent-blue/30 font-noto-display-condensed">
      
      {/* Background layer */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-background-primary" />

      {/* --- HERO SECTION: DICTIONARY ENTRY --- */}
      <section className="relative min-h-[50vh] md:min-h-[70vh] md:h-[85vh] flex flex-col justify-center overflow-hidden pt-16 pb-4 md:pt-20">
        <div className="absolute inset-0 z-0 pointer-events-none bg-background-primary" />

        <Container className="relative z-10 w-full !max-w-none px-6 md:px-20">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-24">
            {/* Left: Dictionary Text */}
            <div className="flex-1 text-left relative z-10">
              <div className="mb-8 md:mb-12 animate-in fade-in slide-in-from-left-8 duration-1000">
                 <div className="flex items-center gap-4 mb-3 md:mb-4">
                    <span className="block w-8 md:w-12 h-[1px] bg-accent-blue opacity-50"></span>
                    <span className="text-accent-blue font-medium text-[12px] md:text-sm uppercase tracking-[0.5em]">The Paper Trail</span>
                 </div>
                 
                 <h1 className="text-6xl sm:text-7xl md:text-[11rem] font-light tracking-tighter leading-[0.8] mb-4 md:mb-6 uppercase text-primary">
                   Archive
                 </h1>
                 
                 <div className="flex flex-wrap items-center gap-2 md:gap-4 text-lg md:text-3xl font-mono text-secondary">
                   <span>/ˈɑːr.kaɪv/</span>
                   <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent-blue/50"></span>
                   <span>noun</span>
                 </div>
              </div>
              
              <ScrollReveal baseOpacity={0} enableBlur={true} blurStrength={10} textClassName="text-xl md:text-5xl font-light text-primary mt-8 md:mt-12 leading-tight max-w-2xl" stagger={0.08} duration={1} autoReveal={true}>
                1. A digital repository of technical breakdowns, sonic studies, and creative friction. 2. Field notes documenting the journey through code, sound, and visual design.
              </ScrollReveal>

              <div className="mt-12 md:mt-24 flex flex-wrap gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                <a href="#blog-feed" className="px-10 md:px-12 py-3 md:py-4 rounded-full font-medium text-xs md:text-sm uppercase tracking-widest transition-all bg-primary text-background-primary shadow-xl hover:scale-105 active:scale-95 flex items-center gap-3">
                   <span>Explore Archive</span>
                   <ArrowRight size={16} />
                </a>
                <Link href="/blog/music" className="px-10 md:px-12 py-3 md:py-4 rounded-full liquid-glass-clear font-medium text-xs md:text-sm uppercase tracking-widest hover:bg-white/5 transition-all hover:scale-105 active:scale-95 text-primary flex items-center gap-2">
                   <span>Music Journal</span>
                   <ArrowUpRight size={14} />
                </Link>
                <Link href="/blog/tech" className="px-10 md:px-12 py-3 md:py-4 rounded-full liquid-glass-clear font-medium text-xs md:text-sm uppercase tracking-widest hover:bg-white/5 transition-all hover:scale-105 active:scale-95 text-primary flex items-center gap-2">
                   <span>Tech Notes</span>
                   <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right: Figurine Visual */}
            <div className="flex-[0.6] md:flex-[0.8] w-full max-w-[300px] md:max-w-[600px] relative mt-4 md:mt-0">
               <div className="relative aspect-square w-full group">
                  <div className="absolute inset-0 bg-accent-blue/5 blur-3xl rounded-full opacity-60"></div>
                  <Image 
                    src="/assets/LN Portfolio Asset Figurine Hero Dictionary.webp" 
                    alt="Archive Figurine"
                    fill 
                    sizes="(max-width: 768px) 300px, 600px"
                    className="object-contain z-10 transition-all duration-1000 group-hover:scale-105 drop-shadow-[0_20px_80px_rgba(0,0,0,0.4)]"
                    priority
                  />
               </div>
            </div>
          </div>
        </Container>
      </section>

      {/* --- CONTENT FEED --- */}
      <div id="blog-feed" className="scroll-mt-24">
        <Container className="!max-w-none px-6 md:px-20 mt-12 md:mt-24 relative z-10">
           <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <BlogTabsClient posts={posts} categories={categories} />
           </div>
        </Container>
      </div>

    </main>
  );
}