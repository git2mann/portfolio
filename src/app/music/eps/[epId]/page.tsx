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
      <div className="relative group select-none flex items-center justify-center perspective-[1200px]" style={{ width: `min(${size}px, 78vw)`, height: `min(${size}px, 78vw)` }}>
      <div className="absolute inset-16 bg-accent-blue/10 blur-[80px] rounded-full animate-pulse opacity-40 group-hover:opacity-100 transition-opacity duration-1000"></div>
      
      <Tilt
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        perspective={1200}
            scale={1}
        transitionSpeed={1500}
        gyroscope={true}
            glareEnable={false}
        glareMaxOpacity={0.45}
        glareColor="#ffffff"
        glarePosition="all"
        glareBorderRadius="0px"
        className="w-full h-full"
      >
            <div className="relative w-full h-full overflow-hidden bg-black shadow-[0_0_80px_rgba(0,0,0,0.5)] transition-all duration-700">
          <Image src={src} alt="Cover" fill className="object-cover" />
        </div>
      </Tilt>
    </div>
  );
}

export default function EPPage() {
  const params = useParams();
  const router = useRouter();
  const epId = params?.epId as string | undefined;
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const ep = eps.find((e) => e.id === epId);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!ep || !mounted) return null;

  return (
      <main className="min-h-screen w-full overflow-x-hidden bg-background-primary text-primary font-noto-display-condensed relative">
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
      <div className="fixed top-20 left-4 sm:left-6 md:top-40 md:left-12 z-[110] flex items-center gap-4 md:gap-8 animate-in fade-in slide-in-from-left-4 duration-1000">
         <button onClick={() => router.push('/music')} className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-2.5 rounded-full liquid-glass-clear text-[10px] md:text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all text-primary">
            <FiArrowLeft size={16} /> Back
         </button>
      </div>

      <div className="relative z-10 flex flex-col gap-14 md:gap-20 pt-20 md:pt-24 pb-16 md:pb-24">
        {/* SLIDE 0: THE RELEASE */}
        <section className="w-full flex items-center justify-center pt-6 md:pt-12">
           <Container className="!max-w-none px-4 sm:px-6 md:px-24">
              <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-24">
                 <div className="flex-shrink-0">
                    <ClearRefractiveCover src={ep.coverImage} size={400} />
                 </div>
                 <div className="flex-grow space-y-6 md:space-y-10">
                    <div className="space-y-4">
                       <div className="flex items-center gap-4 text-accent-blue font-mono text-xs uppercase tracking-[0.2em] font-semibold">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse"></div>
                          <span>RELEASED {ep.releaseYear}</span>
                       </div>
                       <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-[8.5rem] font-light tracking-tighter uppercase leading-[0.85] md:leading-[0.8] text-primary">
                          {ep.title}
                       </h1>
                    </div>
                    <div className="flex flex-wrap gap-6 md:gap-12 pt-4 md:pt-6">
                       <div className="space-y-1">
                          <p className="font-mono text-[9px] uppercase text-primary/40 tracking-widest">Format</p>
                          <p className="text-xl sm:text-2xl md:text-4xl font-light tracking-tighter text-primary">EXTENDED PLAY</p>
                       </div>
                    </div>
                 </div>
              </div>
           </Container>
        </section>

        {/* SLIDE 1: THE CONTEXT */}
      <section className="w-full flex items-center justify-center pt-6 md:pt-12">
           <Container className="!max-w-none px-4 sm:px-6 md:px-24">
              <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 md:gap-24 items-center">
                 <div className="space-y-8 md:space-y-10">
                    <div className="max-w-3xl pl-0 md:pl-10 relative">
                       <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-blue/60 mb-6 flex items-center gap-2 font-semibold">
                          <FiTerminal size={12} /> Overview
                       </h3>
                       <p className="text-xl sm:text-3xl md:text-5xl font-light leading-tight text-primary">
                          Focused explorations of specific sonic environments. Capturing the iterative process of the archive.
                       </p>
                    </div>
                 </div>
                 
                 <div className="liquid-glass p-6 md:p-10 rounded-[1.5rem] md:rounded-[2rem] space-y-6 md:space-y-10">
                    <h5 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-blue/60 mb-6 flex items-center gap-2 font-semibold">
                       <FiDatabase size={12} /> EP Details
                    </h5>
                    <div className="grid grid-cols-1 gap-6">
                       {[
                         { label: 'Format', val: 'EP' },
                                     { label: 'Artist', val: 'Klense' },
                         { label: 'Release', val: ep.releaseYear },
                         { label: 'Status', val: 'Published' }
                       ].map(item => (
                         <div key={item.label} className="pb-3 group/item">
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
      <section className="w-full flex items-center justify-center pt-6 md:pt-12">
           <Container className="!max-w-none w-full px-4 sm:px-6 md:px-24 h-auto md:h-[75vh] flex flex-col">
              <div className="md:pl-10">
              <div className="flex items-end justify-between pb-4 mb-5 md:mb-8">
                 <h2 className="text-3xl sm:text-4xl md:text-6xl font-light uppercase tracking-tighter text-primary leading-none">Tracks</h2>
                 <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-40 text-secondary font-semibold">{ep.songs.length} Songs</span>
              </div>
              <div className="flex-grow overflow-visible md:overflow-y-auto no-scrollbar space-y-1 pr-0 md:pr-4 pb-8 md:pb-24">
                 {ep.songs.map((track: any, i: number) => (
                   <div key={track.id} className="group">
                      <button 
                        onClick={() => setActiveTrackId(activeTrackId === track.id ? null : track.id)}
                        className={`w-full flex items-center justify-between py-4 md:py-8 px-3 sm:px-4 md:px-6 transition-all duration-500 ${activeTrackId === track.id ? 'bg-primary/[0.03] scale-[1.01]' : 'hover:bg-primary/[0.01]'}`}
                      >
                         <div className="flex items-center gap-4 sm:gap-8 md:gap-16 min-w-0">
                            <span className={`font-mono text-base sm:text-lg md:text-2xl transition-colors ${activeTrackId === track.id ? 'text-accent-blue' : 'opacity-20'}`}>
                               {String(i + 1).padStart(2, '0')}
                            </span>
                            <h4 className={`text-base sm:text-xl md:text-4xl font-light uppercase tracking-tight transition-all truncate ${activeTrackId === track.id ? 'text-primary md:translate-x-4' : 'text-primary/40 group-hover:text-primary'}`}>
                               {track.title}
                            </h4>
                         </div>
                         <div className="flex items-center gap-3 md:gap-6 shrink-0">
                            <span className="font-mono text-[10px] md:text-xs opacity-20 text-secondary">{track.duration}</span>
                            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${activeTrackId === track.id ? 'bg-accent-blue rotate-180 shadow-lg' : 'group-hover:bg-primary/10'}`}>
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
                              <div className="py-6 md:py-12 px-4 md:px-6 bg-primary/[0.01] backdrop-blur-sm">
                                 <LyricsComponent lyrics={track.lyrics} />
                              </div>
                           </motion.div>
                         )}
                      </AnimatePresence>
                   </div>
                 ))}
              </div>
              </div>
           </Container>
        </section>
         </div>
    </main>
  );
}
