"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  FiPlay, 
  FiArrowLeft, 
  FiTerminal, 
  FiDatabase, 
  FiExternalLink, 
  FiDisc,
  FiChevronLeft,
  FiChevronRight,
  FiCornerDownRight
} from "react-icons/fi";
import Container from "@/app/_components/container";
import { motion, AnimatePresence } from "framer-motion";
import InstructionPopup from "@/app/_components/InstructionPopup";
import Tilt from 'react-parallax-tilt';

const TRACKS = [
	{ title: "The Evening Dispatch!", duration: "2:05", theme: "Jazz" },
	{ title: "Saxophone", duration: "2:05", theme: "Jazz, Hip-Hop" },
	{ title: "Oze II", duration: "2:09", theme: "Songwriting" },
	{ title: "Oze", duration: "2:19", theme: "Alternative" },
	{ title: "Wish Ya Told Me!", duration: "1:33", theme: "Breakcore" },
	{ title: "Intermission IV", duration: "2:11", theme: "Ambient" },
	{ title: "You Are The Reason", duration: "1:53", theme: "Songwriting" },
	{ title: "Blue Salmon", duration: "1:18", theme: "Alternative" },
	{ title: "Deglupta", duration: "1:37", theme: "Rock" },
	{ title: "Kept You Waiting", duration: "1:36", theme: "Alternative Rap" },
	{ title: "Karl Draisack", duration: "2:37", theme: "Alternative" },
	{ title: "Forbo", duration: "1:57", theme: "Alternative" },
	{ title: "Garble Surmount", duration: "2:33", theme: "Alternative" },
	{ title: "Impromptu", duration: "3:05", theme: "Alternative" },
	{ title: "Addis Abeba", duration: "2:42", theme: "Alternative" },
	{ title: "Abide by Klense", duration: "2:03", theme: "Alternative" },
];

/**
 * ClearRefractiveCover - The high-fidelity album cover with "clear liquid-glass" highlights and 3D Tilt
 */
function ClearRefractiveCover({ src, size = 400 }: { src: string, size?: number }) {
  return (
    <div className="relative group select-none flex items-center justify-center perspective-[1200px]" style={{ width: size, height: size }}>
      <div className="absolute inset-16 bg-pink-500/10 blur-[80px] rounded-full animate-pulse opacity-40 group-hover:opacity-100 transition-opacity duration-1000"></div>
      
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
             <FiDisc size={12} className="animate-spin-slow" /> DIGITAL RELEASE
          </div>
        </div>
      </Tilt>
    </div>
  );
}

export default function HalfThoughtsPage() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const nextSlide = useCallback(() => {
    if (activeSlide < 2 && !isAnimating) {
      setActiveSlide(prev => prev + 1);
      setIsAnimating(true);
    }
  }, [activeSlide, isAnimating]);

  const prevSlide = useCallback(() => {
    if (activeSlide > 0 && !isAnimating) {
      setActiveSlide(prev => prev - 1);
      setIsAnimating(true);
    }
  }, [activeSlide, isAnimating]);

  // Handle Key Events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") nextSlide();
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  if (!mounted) return null;

  return (
    <main className="h-screen w-full overflow-hidden bg-background-primary text-primary font-noto-display-condensed relative">
      <InstructionPopup />

      {/* Background Atmosphere - Enhanced visibility with Noise fix */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ transform: 'translateZ(0)' }}>
           <Image src="/assets/music-assets/HalfThoughts1Cover.png" alt="" fill className="object-cover scale-125 blur-[100px] opacity-25" />
        </div>
        <div className="absolute inset-0 z-10 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url(/noise.png)' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background-primary/20 via-background-primary/80 to-background-primary"></div>
      </div>

      {/* Navigation Controls - Moved below header */}
      <div className="fixed top-32 left-8 md:top-40 md:left-12 z-[110] flex items-center gap-8 animate-in fade-in slide-in-from-left-4 duration-1000">
         <button onClick={() => router.push('/music')} className="flex items-center gap-3 px-6 py-2.5 rounded-full liquid-glass-clear text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all text-primary border-primary/20">
            <FiArrowLeft size={16} /> Back
         </button>
         <div className="flex items-center gap-4 text-pink-500 font-mono text-[10px] uppercase tracking-[0.4em] opacity-40">
            <span>Half Thoughts</span>
            <span className="w-1 h-1 rounded-full bg-pink-500"></span>
            <span>Slide 0{activeSlide + 1}</span>
         </div>
      </div>

      <motion.div 
        className="flex flex-row h-full will-change-transform"
        animate={{ x: `-${activeSlide * 100}vw` }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        {/* SLIDE 0: THE RELEASE */}
        <section className="w-[100vw] h-full flex-shrink-0 flex items-center justify-center pt-12">
           <Container className="!max-w-none px-6 md:px-24">
              <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
                 <div className="flex-shrink-0">
                    <ClearRefractiveCover src="/assets/music-assets/HalfThoughts1Cover.png" size={400} />
                 </div>
                 <div className="flex-grow space-y-10">
                    <div className="space-y-4">
                       <div className="flex items-center gap-4 text-pink-500 font-mono text-xs uppercase tracking-[0.5em]">
                          <div className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse"></div>
                          <span>RELEASE ACTIVE // 2025</span>
                       </div>
                       <h1 className="text-5xl md:text-7xl lg:text-[8.5rem] font-light tracking-tighter uppercase leading-[0.8] text-primary">
                          Half Thoughts
                       </h1>
                    </div>
                    <div className="flex gap-12 pt-6 border-t border-primary/10">
                       <div className="space-y-1">
                          <p className="font-mono text-[9px] uppercase text-primary/40 tracking-widest">Format</p>
                          <p className="text-2xl md:text-4xl font-light tracking-tighter text-primary">COLLECTION</p>
                       </div>
                       <div className="space-y-1">
                          <p className="font-mono text-[9px] uppercase text-primary/40 tracking-widest">Theme</p>
                          <p className="text-2xl md:text-4xl font-light tracking-tighter text-primary">EXPERIMENTAL</p>
                       </div>
                    </div>
                 </div>
              </div>
           </Container>
        </section>

        {/* SLIDE 1: THE CONTEXT */}
        <section className="w-[100vw] h-full flex-shrink-0 flex items-center justify-center pt-12">
           <Container className="!max-w-none px-6 md:px-24">
              <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-16 md:gap-24 items-center">
                 <div className="space-y-12">
                    <div className="max-w-3xl border-l-[3px] border-pink-500 pl-10 relative">
                       <h3 className="font-mono text-[10px] uppercase tracking-[0.6em] text-pink-500/60 mb-6 flex items-center gap-4">
                          <FiTerminal size={12} /> OVERVIEW
                       </h3>
                       <p className="text-3xl md:text-5xl font-light leading-tight text-primary">
                          The collection of half-formed ideas. Capturing moments of sonic clarity before they could be over-analyzed.
                       </p>
                    </div>
                    <div className="flex gap-6">
                       <button className="flex items-center gap-3 px-8 py-4 bg-primary text-background-primary font-medium uppercase text-[10px] tracking-widest hover:bg-pink-600 hover:text-white transition-all shadow-2xl">
                          <FiPlay size={16} fill="currentColor" /> Play System
                       </button>
                    </div>
                 </div>
                 
                 <div className="liquid-glass p-10 rounded-[2rem] space-y-10 border-pink-500/10">
                    <h5 className="font-mono text-[9px] uppercase tracking-[0.6em] text-pink-500/60 mb-6 flex items-center gap-4">
                       <FiDatabase size={12} /> ARCHIVE LOG
                    </h5>
                    <div className="grid grid-cols-1 gap-6">
                       {[
                         { label: 'Project', val: 'Half Thoughts' },
                         { label: 'Alias', val: 'Klense' },
                         { label: 'Tracks', val: '16 Units' },
                         { label: 'Status', val: 'Compiled' }
                       ].map(item => (
                         <div key={item.label} className="border-b border-primary/5 pb-3 group/item">
                            <span className="block font-mono text-[8px] uppercase tracking-widest opacity-30 group-hover/item:opacity-70 transition-opacity">{item.label}</span>
                            <span className="block text-xl font-light uppercase tracking-tighter mt-1 group-hover/item:text-primary transition-colors">{item.val}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </Container>
        </section>

        {/* SLIDE 2: THE INDEX */}
        <section className="w-[100vw] h-full flex-shrink-0 flex items-center justify-center pt-12">
           <Container className="!max-w-none px-6 md:px-24 h-[75vh] flex flex-col">
              <div className="flex items-end justify-between border-b border-primary/10 pb-4 mb-8">
                 <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter text-primary leading-none">The Tracklist</h2>
                 <span className="font-mono text-[9px] uppercase tracking-[0.5em] opacity-30 text-secondary">Sequence.sh // {TRACKS.length} Units</span>
              </div>
              <div className="flex-grow overflow-y-auto no-scrollbar space-y-1 pr-4 pb-24">
                 {TRACKS.map((track, i) => (
                   <div key={track.title} className="group border-b border-white/5 hover:bg-pink-500/[0.02] transition-all">
                      <div className="w-full flex items-center justify-between py-4 md:py-6 px-6 cursor-pointer">
                         <div className="flex items-center gap-10 md:gap-16">
                            <span className={`font-mono text-lg md:text-2xl opacity-20 group-hover:text-pink-500 group-hover:opacity-100 transition-all duration-700`}>
                               {String(i + 1).padStart(2, '0')}
                            </span>
                            <div>
                               <h4 className={`text-xl md:text-3xl font-light uppercase tracking-tighter text-primary/40 group-hover:text-primary transition-all duration-1000 group-hover:translate-x-4`}>
                                  {track.title}
                               </h4>
                               <span className="text-[9px] font-mono uppercase tracking-widest text-secondary opacity-30 group-hover:opacity-60">{track.theme}</span>
                            </div>
                         </div>
                         <span className="font-mono text-xs opacity-20 text-secondary">{track.duration}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </Container>
        </section>
      </motion.div>

      {/* Slide Navigation Dots */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50">
        <div className="liquid-glass px-6 py-3 rounded-full shadow-2xl border border-primary/10 flex items-center gap-6 hover:scale-100">
           <button onClick={prevSlide} disabled={activeSlide === 0} className={`p-2 rounded-full transition-all ${activeSlide === 0 ? 'opacity-10 cursor-not-allowed' : 'hover:bg-accent-blue/10 text-accent-blue'}`}>
              <FiChevronLeft size={24} />
           </button>
           <div className="flex gap-3">
              {[0, 1, 2].map(i => (
                <button 
                  key={i} 
                  onClick={() => setActiveSlide(i)} 
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${activeSlide === i ? 'bg-accent-blue w-10' : 'bg-primary opacity-40 hover:opacity-70'}`} 
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
           </div>
           <button onClick={nextSlide} disabled={activeSlide === 2} className={`p-2 rounded-full transition-all ${activeSlide === 2 ? 'opacity-10 cursor-not-allowed' : 'hover:bg-accent-blue/10 text-accent-blue'}`}>
              <FiChevronRight size={24} />
         </button>
        </div>
      </div>
    </main>
  );
}
