"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Disc,
  Info,
  Eye,
  ArrowUpRight,
  ArrowRight
} from "lucide-react";
import Container from "@/app/_components/container";
import ScrollReveal from "@/app/_components/ScrollReveal";
import TextPressure from "@/app/_components/TextPressure";
import { albums, eps, singles } from "@/data/music";
import Tilt from 'react-parallax-tilt';

// --- HELPERS ---
const liveAlbums = [
  {
    id: "live-1",
    title: "Squealer Live",
    coverImage: "/assets/music-assets/Squealer and the Aggressors of Peace (Live) Front Cover.jpeg",
    releaseYear: "2025",
    type: "Live Performance",
    link: "/music/sataop-live"
  }
];

const FiDisc = Disc; // Compatibility alias

/**
 * LiquidOrb - Floating glass bubble backgrounds that drift dynamically
 */
function LiquidOrb({ className, delay = 0, duration = 20, size = "w-96 h-96", color = "bg-accent-blue" }: { className?: string, delay?: number, duration?: number, size?: string, color?: string }) {
  return (
    <motion.div
      initial={{ x: 0, y: 0 }}
      animate={{
        x: [0, 60, -50, 30, 0],
        y: [0, -70, 60, -30, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={`absolute rounded-full filter blur-[100px] mix-blend-screen opacity-[0.06] dark:opacity-[0.08] pointer-events-none ${size} ${color} ${className}`}
    />
  );
}

/**
 * MusicWorkCard - Redesigned to match the Art Page aesthetic with 3D Tilt and Liquid Glass specifications
 */
function MusicWorkCard({ release, index }: { release: any, index: number }) {
  return (
    <Link 
      href={release.link || `/music/${release.id}`} 
      className="group relative flex flex-col transition-all duration-500 rounded-xl overflow-hidden cursor-pointer"
    >
      <Tilt
        tiltMaxAngleX={12}
        tiltMaxAngleY={12}
        perspective={1000}
        scale={1.03}
        transitionSpeed={1200}
        glareEnable={true}
        glareMaxOpacity={0.35}
        glareColor="var(--text-primary)"
        glarePosition="all"
        className="w-full h-full"
      >
        <div className="flex flex-col bg-primary/[0.01] dark:bg-primary/[0.03] border border-primary/10 hover:border-accent-blue/30 transition-all duration-500 rounded-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] h-full relative overflow-hidden backdrop-blur-md">
          {/* Subtle light sweep highlights */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
          
          <div className="absolute top-2 right-4 font-mono text-[11px] md:text-[12px] opacity-20 uppercase tracking-widest pointer-events-none transition-all group-hover:opacity-50 text-accent-blue">
            #{String(index + 1).padStart(3, '0')}
          </div>
          
          <div className="relative aspect-square w-full overflow-hidden mb-4 md:mb-6 rounded-lg bg-black border border-primary/5 shadow-inner">
            <Image 
              src={release.coverImage} 
              alt={release.title} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            {/* Spec glare sweep on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none"></div>

            {/* Simple elegant details overlay without cover blur */}
            <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="px-5 py-2.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 shadow-lg text-white font-mono text-xs uppercase tracking-widest transition-all duration-300">
                View Release
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-auto">
             <h3 className="text-xs md:text-sm font-light tracking-tight uppercase leading-none truncate max-w-[70%] group-hover:text-accent-blue transition-colors text-primary/80">
                {release.title}
             </h3>
             <span className="text-[10px] md:text-xs font-mono text-accent-blue flex items-center gap-1 opacity-65 group-hover:opacity-100 transition-opacity">
                <span>{release.releaseYear}</span> <ArrowUpRight size={10} />
             </span>
          </div>
        </div>
      </Tilt>
    </Link>
  );
}

export default function MusicPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <main className="min-h-screen bg-background-primary" />;

  return (
    <main className="min-h-screen pb-64 bg-background-primary relative font-noto-display-condensed selection:bg-accent-blue/30">
      
      {/* 1. GLOBAL BACKGROUND WITH DRIFTING LIQUID ORBS */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background-primary">
         <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url(/noise.png)' }}></div>
         
         <div className="absolute top-0 left-0 w-full h-full bg-radial-gradient from-accent-blue/5 to-transparent blur-[180px]" />
         
         {/* Floating Liquid Orbs */}
         <LiquidOrb color="bg-accent-blue" size="w-[30rem] h-[30rem]" duration={25} delay={0} className="top-1/4 -left-20" />
         <LiquidOrb color="bg-primary" size="w-[28rem] h-[28rem]" duration={30} delay={2} className="bottom-1/4 -right-20" />
         <LiquidOrb color="bg-accent-blue" size="w-[25rem] h-[25rem]" duration={22} delay={4} className="top-1/2 left-1/3" />
      </div>

      {/* 2. HERO: DICTIONARY ENTRY */}
      <section className="relative min-h-[70vh] md:h-[85vh] flex flex-col justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            suppressHydrationWarning
            className="w-full h-full object-cover scale-105 blur-2xl opacity-20"
          >
            <source src="/assets/LN Portfolio Asset Figurine Music Loop Video Square.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background-primary/50 via-transparent to-background-primary"></div>
        </div>

        <Container className="relative z-10 w-full !max-w-none px-6 md:px-20">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-24">
            {/* Left: Dictionary Text */}
            <div className="flex-1 text-left relative z-10">
              <div className="mb-8 md:mb-12 animate-in fade-in slide-in-from-left-8 duration-1000">
                 {/* Selected Works line indicator */}
                 <div className="flex items-center gap-4 mb-3 md:mb-4">
                    <span className="w-8 md:w-12 h-[1px] bg-accent-blue/50"></span>
                    <span className="text-accent-blue font-medium text-[12px] md:text-sm uppercase tracking-[0.5em]">Selected Works</span>
                 </div>
                 
                 <h1 className="text-6xl sm:text-7xl md:text-[11rem] font-light tracking-tighter leading-[0.8] mb-4 md:mb-6 uppercase text-primary">
                   Music
                 </h1>
                 
                 <div className="flex flex-wrap items-center gap-2 md:gap-4 text-lg md:text-3xl font-mono text-secondary">
                   <span>/ˈmjuːzɪk/</span>
                   <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent-blue/50"></span>
                   <span>noun</span>
                 </div>
              </div>
              
              <ScrollReveal baseOpacity={0} enableBlur={true} blurStrength={10} textClassName="text-xl md:text-5xl font-light text-primary mt-8 md:mt-12 leading-tight max-w-2xl" stagger={0.08} duration={1} autoReveal={true}>
                1. Vocal or instrumental sounds combined to produce beauty of form and expression. 2. A system of structural audio logs designed to process experience.
              </ScrollReveal>

              <div className="mt-12 md:mt-24 flex flex-wrap gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                <a href="#collections" className="px-10 md:px-12 py-3 md:py-4 rounded-full font-medium text-xs md:text-sm uppercase tracking-widest transition-all bg-primary text-background-primary shadow-xl hover:scale-105 active:scale-95 flex items-center gap-3">
                   <span>Explore Discography</span>
                   <ArrowRight size={16} />
                </a>
                <Link href="/music/sataop-live" className="px-10 md:px-12 py-3 md:py-4 rounded-full liquid-glass-clear font-medium text-xs md:text-sm uppercase tracking-widest hover:bg-white/5 transition-all hover:scale-105 active:scale-95 text-primary">Live Project</Link>
              </div>
            </div>

            {/* Right: Figurine Visual */}
            <div className="flex-[0.6] md:flex-[0.8] w-full max-w-[300px] md:max-w-[600px] relative mt-8 md:mt-0">
               <div className="relative aspect-square w-full group">
                  <div className="absolute inset-0 bg-accent-blue/5 blur-3xl rounded-full opacity-60"></div>
                  <Image 
                    src="/assets/LN Music Still.png" 
                    alt="Music Figurine"
                    fill
                    className="object-contain z-10 transition-all duration-1000 group-hover:scale-105 drop-shadow-[0_20px_80px_rgba(0,0,0,0.4)]"
                    priority
                  />
               </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. CONTENT SECTIONS (Art-style Architecture) */}
      <Container id="collections" className="mt-24 md:mt-40 !max-w-none px-6 md:px-20 space-y-32 md:space-y-48 relative z-10">
        
        {/* Studio Albums */}
        <section>
          {/* Glass header panel */}
          <div className="relative mb-10 md:mb-16 rounded-2xl overflow-hidden p-6 md:p-8 border border-primary/10 bg-primary/[0.02] backdrop-blur-md shadow-lg">
             <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent"></div>
             
             <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                   <div className="flex items-center gap-3 mb-2">
                       <span className="text-accent-blue font-mono text-[10px] uppercase tracking-[0.2em] font-semibold">Section 01</span>
                       <span className="w-1.5 h-1.5 rounded-full bg-accent-blue/40"></span>
                       <span className="text-secondary opacity-50 font-mono text-[10px] uppercase tracking-wider">Studio Albums</span>
                   </div>
                   <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter leading-none text-primary">Albums</h2>
                   <p className="text-secondary text-sm md:text-base mt-2 max-w-xl opacity-60">Full-length investigations into frequency and architectural sound.</p>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {albums.map((album, idx) => (
              <MusicWorkCard key={album.id} release={album} index={idx} />
            ))}
          </div>
        </section>

        {/* EPs */}
        <section>
          {/* Glass header panel */}
          <div className="relative mb-10 md:mb-16 rounded-2xl overflow-hidden p-6 md:p-8 border border-primary/10 bg-primary/[0.02] backdrop-blur-md shadow-lg">
             <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent"></div>
             
             <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                   <div className="flex items-center gap-3 mb-2">
                       <span className="text-accent-blue font-mono text-[10px] uppercase tracking-[0.2em] font-semibold">Section 02</span>
                       <span className="w-1.5 h-1.5 rounded-full bg-accent-blue/40"></span>
                       <span className="text-secondary opacity-50 font-mono text-[10px] uppercase tracking-wider">Extended Plays</span>
                   </div>
                   <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter leading-none text-primary">EPs</h2>
                   <p className="text-secondary text-sm md:text-base mt-2 max-w-xl opacity-60">Focused experiments capturing specific sonic environments.</p>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {eps.map((ep, idx) => (
              <MusicWorkCard key={ep.id} release={{ ...ep, link: `/music/eps/${ep.id}` }} index={idx + albums.length} />
            ))}
          </div>
        </section>

        {/* Singles & Live captures */}
        <section className="pb-32">
          {/* Glass header panel */}
          <div className="relative mb-10 md:mb-16 rounded-2xl overflow-hidden p-6 md:p-8 border border-primary/10 bg-primary/[0.02] backdrop-blur-md shadow-lg">
             <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent"></div>
             
             <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                   <div className="flex items-center gap-3 mb-2">
                       <span className="text-accent-blue font-mono text-[10px] uppercase tracking-[0.2em] font-semibold">Section 03</span>
                       <span className="w-1.5 h-1.5 rounded-full bg-accent-blue/40"></span>
                       <span className="text-secondary opacity-50 font-mono text-[10px] uppercase tracking-wider">Singles & Captures</span>
                   </div>
                   <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter leading-none text-primary">Singles</h2>
                   <p className="text-secondary text-sm md:text-base mt-2 max-w-xl opacity-60">Individual frequency modules and unfiltered captures.</p>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
             <div className="col-span-2">
                <MusicWorkCard release={liveAlbums[0]} index={99} />
             </div>
            {singles.map((single, idx) => (
              <MusicWorkCard key={single.id} release={{ ...single, link: `/music/singles/${single.id}` }} index={idx + albums.length + eps.length} />
            ))}
          </div>
        </section>

      </Container>
    </main>
  );
}
