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
    "tags",
    "content",
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
        </div>
        <div className="absolute inset-0 z-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:32px_32px] opacity-75"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/5 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background-primary/30 via-transparent to-background-primary"></div>

        <Container className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-8 md:mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
               <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="w-8 md:w-12 h-[1px] bg-accent-blue/30"></span>
                  <span className="text-accent-blue font-medium text-[11px] md:text-xs uppercase tracking-[0.6em]">The Paper Trail</span>
                  <span className="w-8 md:w-12 h-[1px] bg-accent-blue/30"></span>
               </div>
               <h1 className="text-6xl sm:text-7xl md:text-[9rem] font-light tracking-tighter leading-[0.8] mb-6 uppercase text-primary">
                 Archive
               </h1>
               <div className="flex items-center justify-center gap-2 md:gap-4 text-sm md:text-xl font-mono text-secondary/60">
                 <span>/ˈɑːr.kaɪv/</span>
                 <span className="w-1.5 h-1.5 rounded-full bg-accent-blue/40"></span>
                 <span>noun</span>
               </div>
            </div>
            
            <ScrollReveal baseOpacity={0} enableBlur={true} blurStrength={10} textClassName="text-xl md:text-3xl font-light text-primary/80 leading-relaxed max-w-2xl mx-auto" stagger={0.08} duration={1} autoReveal={true}>
              1. A digital repository of technical breakthroughs and musical experiments. 2. A collection of posts documenting my journey through various projects.
            </ScrollReveal>
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