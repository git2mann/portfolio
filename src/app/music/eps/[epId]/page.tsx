"use client";

import { useParams, useRouter } from 'next/navigation';
import Container from "@/app/_components/container";
import { useState, useRef, useEffect, useCallback } from "react";
import LyricsComponent from "@/app/_components/LyricsComponent";
import { epLyrics } from "@/data/lyrics/eps";
import { eps as epsData } from "@/data/music";
import type { Song } from '@/interfaces/music';
import InstructionPopup from "@/app/_components/InstructionPopup";
import Image from "next/image";
import Tilt from 'react-parallax-tilt';
import { 
  FiArrowLeft, 
  FiClock, 
  FiDisc, 
  FiPlay, 
  FiCornerDownRight, 
  FiExternalLink, 
  FiTerminal, 
  FiDatabase, 
  FiCpu, 
  FiHash,
  FiActivity,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

function injectLyrics(eps: any[], epLyrics: Record<string, Record<string, any[]>>) {
  return eps.map((ep) => {
    const lyricsForEp = epLyrics[ep.id] || {};
    const songs = (ep.tracks || []).map((track: any) => ({
      id: track.id,
      title: track.title,
      duration: track.duration,
      audioUrl: track.audioUrl || "",
      lyrics: lyricsForEp[track.id] || [],
    }));
    return {
      ...ep,
      songs,
    };
  });
}

const eps = injectLyrics(epsData, epLyrics);

/**
 * ClearRefractiveCover - The high-fidelity album cover with "clear liquid-glass" highlights and 3D Tilt
 */
function ClearRefractiveCover({ src, size = 400 }: { src: string, size?: number }) {
  return (
    <div className="relative group select-none flex items-center justify-center perspective-[1200px]" style={{ width: size, height: size }}>
      <div className="absolute inset-16 bg-accent-blue/10 blur-[80px] rounded-full animate-pulse opacity-40 group-hover:opacity-100 transition-opacity duration-1000"></div>
      
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

export default function EPPage() {
  const params = useParams();
  const router = useRouter();
  const epId = params?.epId as string | undefined;
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const ep = eps.find((e) => e.id === epId);

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

  if (!ep || !mounted) return null;

  return (
    <main className="h-screen w-full overflow-hidden bg-background-primary text-primary font-noto-display-condensed relative">
      <InstructionPopup />

      {/* Background Atmosphere - Enhanced visibility with Noise fix */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ transform: 'translateZ(0)' }}>
           <Image src={ep.coverImage} alt="" fill className="object-cover scale-125 blur-[100px] opacity-25" />
        </div>
        <div className="absolute inset-0 z-10 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url(/noise.png)' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background-primary/20 via-background-primary/80 to-background-primary"></div>
      </div>

      {/* Navigation Controls - Moved below header */}
      <div className="fixed top-32 left-8 md:top-40 md:left-12 z-[110] flex items-center gap-8 animate-in fade-in slide-in-from-left-4 duration-1000">
         <button onClick={() => router.push('/music')} className="flex items-center gap-3 px-6 py-2.5 rounded-full liquid-glass-clear text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all text-primary border-primary/20">
            <FiArrowLeft size={16} /> Back
         </button>
         <div className="flex items-center gap-4 text-accent-blue font-mono text-[10px] uppercase tracking-[0.4em] opacity-40">
            <span>{ep.title}</span>
            <span className="w-1 h-1 rounded-full bg-accent-blue"></span>
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
                    <ClearRefractiveCover src={ep.coverImage} size={400} />
                 </div>
                 <div className="flex-grow space-y-10">
                    <div className="space-y-4">
                       <div className="flex items-center gap-4 text-accent-blue font-mono text-xs uppercase tracking-[0.5em]">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse"></div>
                          <span>RELEASE ACTIVE // {ep.releaseYear}</span>
                       </div>
                       <h1 className="text-5xl md:text-7xl lg:text-[8.5rem] font-light tracking-tighter uppercase leading-[0.8] text-primary">
                          {ep.title}
                       </h1>
                    </div>
                    <div className="flex gap-12 pt-6 border-t border-primary/10">
                       <div className="space-y-1">
                          <p className="font-mono text-[9px] uppercase text-primary/40 tracking-widest">Format</p>
                          <p className="text-2xl md:text-4xl font-light tracking-tighter text-primary">EXTENDED PLAY</p>
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
                 <div className="space-y-10">
                    <div className="max-w-3xl border-l-[3px] border-accent-blue pl-10 relative">
                       <h3 className="font-mono text-[10px] uppercase tracking-[0.6em] text-accent-blue/60 mb-6 flex items-center gap-4">
                          <FiTerminal size={12} /> OVERVIEW
                       </h3>
                       <p className="text-3xl md:text-5xl font-light leading-tight text-primary">
                          Focused explorations of specific sonic environments. Capturing the iterative process of the archive.
                       </p>
                    </div>
                 </div>
                 
                 <div className="liquid-glass p-10 rounded-[2rem] space-y-10">
                    <h5 className="font-mono text-[9px] uppercase tracking-[0.6em] text-accent-blue/60 mb-6 flex items-center gap-4">
                       <FiDatabase size={12} /> METADATA
                    </h5>
                    <div className="grid grid-cols-1 gap-6">
                       {[
                         { label: 'Format', val: 'EP' },
                         { label: 'Alias', val: 'Klense' },
                         { label: 'Release', val: ep.releaseYear },
                         { label: 'Status', val: 'Published' }
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
                 <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter text-primary leading-none">The Index</h2>
                 <span className="font-mono text-[9px] uppercase tracking-[0.5em] opacity-30 text-secondary">Track_Sequence // {ep.songs.length} Units</span>
              </div>
              <div className="flex-grow overflow-y-auto no-scrollbar space-y-1 pr-4 pb-24">
                 {ep.songs.map((track: any, i: number) => (
                   <div key={track.id} className="group border-b border-primary/5">
                      <button 
                        onClick={() => setActiveTrackId(activeTrackId === track.id ? null : track.id)}
                        className={`w-full flex items-center justify-between py-6 md:py-8 px-6 transition-all duration-500 ${activeTrackId === track.id ? 'bg-primary/[0.03] scale-[1.01]' : 'hover:bg-primary/[0.01]'}`}
                      >
                         <div className="flex items-center gap-10 md:gap-16">
                            <span className={`font-mono text-lg md:text-2xl transition-colors ${activeTrackId === track.id ? 'text-accent-blue' : 'opacity-20'}`}>
                               {String(i + 1).padStart(2, '0')}
                            </span>
                            <h4 className={`text-xl md:text-4xl font-light uppercase tracking-tight transition-all ${activeTrackId === track.id ? 'text-primary translate-x-4' : 'text-primary/40 group-hover:text-primary'}`}>
                               {track.title}
                            </h4>
                         </div>
                         <div className="flex items-center gap-6">
                            <span className="font-mono text-xs opacity-20 text-secondary">{track.duration}</span>
                            <div className={`w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center transition-all ${activeTrackId === track.id ? 'bg-accent-blue border-accent-blue rotate-180 shadow-lg' : 'group-hover:border-accent-blue'}`}>
                               <FiCornerDownRight size={14} className={activeTrackId === track.id ? 'text-white' : 'opacity-20'} />
                            </div>
                         </div>
                      </button>
                      <AnimatePresence>
                         {activeTrackId === track.id && (
                           <motion.div
                             initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                             className="overflow-hidden"
                           >
                              <div className="py-8 md:py-12 px-6 border-t border-dashed border-primary/10 bg-primary/[0.01] backdrop-blur-sm">
                                 <LyricsComponent lyrics={track.lyrics} />
                              </div>
                           </motion.div>
                         )}
                      </AnimatePresence>
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
