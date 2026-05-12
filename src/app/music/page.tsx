"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Play, 
  ArrowRight, 
  Disc,
  Info
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

/**
 * ClearRefractiveCover - The high-fidelity album cover with "clear liquid-glass" highlights and 3D Tilt
 */
function ClearRefractiveCover({ src, size = 500 }: { src: string, size?: number }) {
  return (
    <div className="relative group select-none flex items-center justify-center" style={{ width: size, height: size }}>
      <div className="absolute inset-20 bg-accent-blue/10 blur-[100px] rounded-full animate-pulse opacity-40 group-hover:opacity-100 transition-opacity duration-1000"></div>
      
      <Tilt
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        perspective={1200}
        scale={1.02}
        transitionSpeed={1500}
        gyroscope={true}
        glareEnable={true}
        glareMaxOpacity={0.45}
        glareColor="#ffffff"
        glarePosition="all"
        glareBorderRadius="0px"
        className="w-full h-full"
      >
        <div 
          className="relative w-full h-full overflow-hidden border border-primary/20 bg-black shadow-[0_0_80px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:border-primary/40"
        >
          <Image src={src} alt="Cover" fill className="object-cover" />
          
          {/* Technical HUD */}
          <div className="absolute top-8 left-8 font-mono text-[10px] uppercase tracking-[0.4em] text-white/30 group-hover:text-white/80 transition-colors flex items-center gap-3">
             <FiDisc size={12} className="animate-spin-slow" /> PLAYBACK READY
          </div>
        </div>
      </Tilt>
    </div>
  );
}

const FiDisc = Disc; // Compatibility alias

/**
 * MusicWorkCard - Redesigned to match the Art Page aesthetic with 3D Tilt
 */
function MusicWorkCard({ release, index }: { release: any, index: number }) {
  return (
    <Link 
      href={release.link || `/music/${release.id}`} 
      className="group relative flex flex-col transition-all duration-500 rounded-sm overflow-hidden cursor-pointer"
    >
      <Tilt
        tiltMaxAngleX={12}
        tiltMaxAngleY={12}
        perspective={1000}
        scale={1.02}
        transitionSpeed={1500}
        glareEnable={true}
        glareMaxOpacity={0.3}
        glareColor="var(--text-primary)"
        glarePosition="all"
        className="w-full h-full"
      >
        <div className="flex flex-col bg-primary/[0.02] border border-primary/5 hover:border-accent-blue/30 transition-all duration-500 rounded-sm p-3 md:p-4 shadow-xl h-full">
          <div className="absolute top-2 right-4 font-mono text-[11px] md:text-[12px] opacity-10 uppercase tracking-widest pointer-events-none transition-opacity group-hover:opacity-30">
            {String(index + 1).padStart(3, '0')}
          </div>
          
          <div className="relative aspect-square w-full overflow-hidden mb-4 md:mb-6 rounded-sm bg-black">
            <Image 
              src={release.coverImage} 
              alt={release.title} 
              fill 
              className="object-cover" 
            />
            <div className="absolute inset-0 bg-accent-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
               <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-primary/30 flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-500 bg-primary/5 backdrop-blur-[4px] shadow-2xl">
                  <Play size={24} className="text-primary ml-1 fill-primary" />
               </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-auto">
             <h3 className="text-sm md:text-base font-light tracking-tight uppercase leading-none truncate max-w-[70%] group-hover:text-primary transition-colors">
                {release.title}
             </h3>
             <span className="text-[11px] md:text-sm font-medium text-accent-blue">
                {release.releaseYear}
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
    <main className="min-h-screen pb-64 bg-background-primary relative font-noto-display-condensed selection:bg-red-500/30">
      
      {/* 1. GLOBAL BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-radial-gradient from-red-500/5 to-transparent blur-[180px]" />
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
                 <div className="flex items-center gap-6 mb-4 md:mb-8">
                    <span className="w-12 md:w-20 h-[1px] bg-red-500/50"></span>
                    <span className="text-red-500 font-medium text-xs md:text-sm uppercase tracking-[0.5em]">Selected Works</span>
                 </div>
                 <h1 className="text-6xl sm:text-7xl md:text-[11rem] font-light tracking-tighter leading-[0.8] mb-6 md:mb-10">
                   Music
                 </h1>
                 <div className="flex flex-wrap items-center gap-4 md:gap-8 text-xl md:text-4xl font-mono text-secondary">
                   <span>/ˈmjuːzɪk/</span>
                   <span className="w-2 h-2 rounded-full bg-red-500/50"></span>
                   <span>noun</span>
                 </div>
              </div>
              
              <ScrollReveal baseOpacity={0} enableBlur={true} blurStrength={10} textClassName="text-xl md:text-5xl font-light text-primary mt-8 md:mt-12 leading-tight max-w-2xl" stagger={0.08} duration={1} autoReveal={true}>
                1. Vocal or instrumental sounds combined to produce beauty of form and expression. 2. A system of structural audio logs designed to process experience.
              </ScrollReveal>

              <div className="mt-12 md:mt-24 flex flex-wrap gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                <a href="#collections" className="px-8 md:px-10 py-3 md:py-4 rounded-full font-medium text-sm md:text-base uppercase tracking-widest transition-all bg-primary text-background-primary shadow-[0_0_30px_rgba(239,68,68,0.2)] hover:scale-105 active:scale-95">View Discography</a>
                <Link href="/music/sataop-live" className="px-8 md:px-10 py-3 md:py-4 rounded-full liquid-glass-clear font-medium text-sm md:text-base uppercase tracking-widest hover:bg-white/5 transition-all hover:scale-105 active:scale-95">Live Project</Link>
              </div>
            </div>

            {/* Right: Figurine Visual */}
            <div className="flex-[0.6] md:flex-[0.8] w-full max-w-[300px] md:max-w-[600px] relative mt-8 md:mt-0">
               <div className="relative aspect-square w-full group">
                  <div className="absolute inset-0 bg-red-500/5 blur-3xl rounded-full opacity-60"></div>
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
      <Container id="collections" className="mt-24 md:mt-40 !max-w-none px-6 md:px-20 space-y-32 md:space-y-48">
        
        {/* Studio Albums */}
        <section>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 md:mb-16 gap-6 md:gap-8 border-l-2 border-red-500/20 pl-6 md:pl-8">
             <div>
                <div className="flex items-center gap-3 mb-2 md:mb-4">
                    <span className="text-red-500 font-medium text-[12px] md:text-sm uppercase tracking-[0.4em]">Section 01</span>
                    <span className="text-secondary opacity-30 font-mono text-[12px] md:text-sm uppercase">STUDIO RELEASES</span>
                </div>
                <h2 className="text-4xl md:text-8xl font-light uppercase tracking-tighter leading-none">Albums</h2>
                <p className="text-secondary font-medium text-base md:text-xl mt-4 md:mt-6 max-w-xl opacity-70">Full-length investigations into frequency and architectural sound.</p>
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
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 md:mb-16 gap-6 md:gap-8 border-l-2 border-red-500/20 pl-6 md:pl-8">
            <div>
              <div className="flex items-center gap-3 mb-2 md:mb-4">
                  <span className="text-red-500 font-medium text-[12px] md:text-sm uppercase tracking-[0.4em]">Section 02</span>
                  <span className="text-secondary opacity-30 font-mono text-[12px] md:text-sm uppercase">FOCUSED DISPATCHES</span>
              </div>
              <h2 className="text-4xl md:text-8xl font-light uppercase tracking-tighter leading-none">EPs</h2>
              <p className="text-secondary font-medium text-base md:text-xl mt-4 md:mt-6 max-w-2xl opacity-70">Focused experiments capturing specific sonic environments.</p>
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
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 md:mb-16 gap-6 md:gap-8 border-l-2 border-red-500/20 pl-6 md:pl-8">
            <div>
              <div className="flex items-center gap-3 mb-2 md:mb-4">
                  <span className="text-red-500 font-medium text-[12px] md:text-sm uppercase tracking-[0.4em]">Section 03</span>
                  <span className="text-secondary opacity-30 font-mono text-[12px] md:text-sm uppercase">ACTIVE STREAM</span>
              </div>
              <h2 className="text-4xl md:text-8xl font-light uppercase tracking-tighter leading-none">Singles</h2>
              <p className="text-secondary font-medium text-base md:text-xl mt-4 md:mt-6 max-w-2xl opacity-70">Individual frequency modules and unfiltered captures.</p>
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
