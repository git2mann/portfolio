"use client";

import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * PostHeader component
 * Displays the header section of a blog post including title, cover image, date, and author
 * Optimized with scroll-driven parallax and fading transitions
 */
type Props = {
  title: string;       
  coverImage: string;  
  date: string;        
  author: Author;      
};

export function PostHeader({ title, coverImage, date, author }: Props) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Title and metadata fade and translate up slightly as we scroll down
  const headerOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.75], [0, -60]);

  // Cover image parallax zoom and translation
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <header ref={containerRef} className="relative w-full mb-20 md:mb-32">
      
      {/* 1. ATMOSPHERIC BACKGROUND */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-20">
         <div 
           className="absolute top-0 left-1/4 w-[500px] h-[500px] blur-[120px] rounded-full"
           style={{ backgroundColor: 'color-mix(in srgb, var(--accent-blue) 10%, transparent)' }}
         ></div>
         <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-red-500/5 blur-[100px] rounded-full"></div>
      </div>

      <div className="pt-20 md:pt-32 space-y-12">
        {/* Category / Sequence breadcrumb */}
        <div className="flex items-center gap-4 animate-in fade-in slide-in-from-left-4 duration-700">
           <div 
             className="w-12 h-px" 
             style={{ backgroundColor: 'color-mix(in srgb, var(--accent-blue) 40%, transparent)' }}
           />
           <span className="font-mono text-[10px] uppercase tracking-[0.6em] text-accent-blue">Data_Log // Sequence_Active</span>
        </div>

        {/* Title Artifact with Scroll Fade / Translate */}
        <motion.div 
          style={{ opacity: headerOpacity, y: headerY }}
          className="space-y-6"
        >
           <h1 className="text-6xl sm:text-7xl md:text-[10rem] font-light tracking-tighter leading-[0.8] uppercase text-primary">
              {title}
           </h1>
           
           <div className="flex flex-wrap items-center gap-6 md:gap-12 text-secondary">
              {date && (
                <div className="flex items-center gap-3 font-mono text-[10px] md:text-xs uppercase tracking-[0.4em]">
                   <span 
                     className="w-1.5 h-1.5 rounded-full"
                     style={{ backgroundColor: 'color-mix(in srgb, var(--accent-blue) 50%, transparent)' }}
                   ></span>
                   <DateFormatter dateString={date} />
                </div>
              )}
              {author?.name && (
                <div className="flex items-center gap-3 font-mono text-[10px] md:text-xs uppercase tracking-[0.4em]">
                   <span className="w-1.5 h-1.5 rounded-full bg-red-500/50"></span>
                   <span>{author.name}</span>
                </div>
              )}
           </div>
        </motion.div>

        {/* Hero Cover Artifact with Parallax Zoom */}
        <div className="relative aspect-[21/9] w-full rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.6)] border border-white/5 animate-in zoom-in-95 duration-1000">
           <motion.div 
             style={{ scale: imageScale, y: imageY }}
             className="absolute inset-0 w-full h-full"
           >
             <Image
                src={coverImage}
                alt={title}
                fill
                className="object-cover opacity-90"
                priority
             />
           </motion.div>
           <div 
             className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent pointer-events-none"
             style={{ backgroundImage: 'linear-gradient(to top, color-mix(in srgb, var(--background-primary) 40%, transparent), transparent)' }}
           ></div>
        </div>
      </div>
    </header>
  );
}