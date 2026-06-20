"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Play, 
  Clock, 
  Music, 
  ArrowRight, 
  ExternalLink,
  Info,
  Disc,
  Terminal,
  Database,
  Cpu,
  Activity,
  CornerDownRight,
  ChevronLeft,
  ChevronRight,
  ArrowLeft
} from "lucide-react";
import Container from "@/app/_components/container";
import ScrollReveal from "@/app/_components/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import InstructionPopup from "@/app/_components/InstructionPopup";
import Tilt from 'react-parallax-tilt';

const FiDisc = Disc; // Fix for runtime error

// --- ASSETS ---
const COVER_IMAGE = "/assets/music-assets/Squealer and the Aggressors of Peace (Live) Front Cover.jpeg";

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

// --- CONSTANTS ---
const TRACKLIST = [
  "Hummer's Theme",
  "Jungle Law",
  "Tisa",
  "Salamander Crowd",
  "Saudade In Err (Outro)",
];

export default function SataopLivePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
      <main className="min-h-screen w-full overflow-x-hidden bg-background-primary text-primary font-noto-display-condensed relative">
      <InstructionPopup />

      {/* Background Atmosphere - Enhanced visibility with Noise fix */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ transform: 'translateZ(0)' }}>
           <Image src={COVER_IMAGE} alt="" fill className="object-cover scale-125 blur-[100px] opacity-25" />
        </div>
        <div className="absolute inset-0 z-10 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url(/noise.png)' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background-primary/20 via-background-primary/80 to-background-primary"></div>
      </div>

      {/* Navigation Controls - Moved below header */}
      <div className="fixed top-20 left-4 sm:left-6 md:top-40 md:left-12 z-[110] flex items-center gap-4 md:gap-8 animate-in fade-in slide-in-from-left-4 duration-1000">
         <button onClick={() => router.push('/music')} className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-2.5 rounded-full liquid-glass-clear text-[10px] md:text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all text-primary">
            <ArrowLeft size={16} /> Back
         </button>
      </div>

      <div className="relative z-10 flex flex-col gap-14 md:gap-20 pt-20 md:pt-24 pb-16 md:pb-24">
        {/* SLIDE 0: THE RELEASE */}
        <section className="w-full flex items-center justify-center pt-6 md:pt-12">
           <Container className="!max-w-none px-4 sm:px-6 md:px-24">
              <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-24">
                 <div className="flex-shrink-0">
                    <ClearRefractiveCover src={COVER_IMAGE} size={400} />
                 </div>
                 <div className="flex-grow space-y-6 md:space-y-10">
                    <div className="space-y-4">
                       <div className="flex items-center gap-4 text-accent-blue font-mono text-xs uppercase tracking-[0.2em] font-semibold">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse"></div>
                          <span>LIVE PERFORMANCE - 2025</span>
                       </div>
                       <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-[8.5rem] font-light tracking-tighter uppercase leading-[0.85] md:leading-[0.8] text-primary">
                          Squealer Live
                       </h1>
                    </div>
                        <div className="flex flex-wrap gap-6 md:gap-12 pt-4 md:pt-6">
                           <div className="space-y-1">
                              <p className="font-mono text-[9px] uppercase text-primary/40 tracking-widest">Recording Type</p>
                              <p className="text-xl sm:text-2xl md:text-4xl font-light tracking-tighter text-primary">LIVE SHOW</p>
                           </div>
                           <div className="space-y-1">
                              <p className="font-mono text-[9px] uppercase text-primary/40 tracking-widest">Audio Style</p>
                              <p className="text-xl sm:text-2xl md:text-4xl font-light tracking-tighter text-primary">RAW & DIRECT</p>
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
                 <div className="space-y-8 md:space-y-12">
                     <div className="max-w-3xl pl-0 md:pl-10 relative">
                        <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-blue/60 mb-6 flex items-center gap-2 font-semibold">
                           <Terminal size={12} /> Overview
                        </h3>
                       <p className="text-xl sm:text-3xl md:text-5xl font-light leading-tight text-primary">
                          The Aggressors of Peace captured in raw motion. An investigation into noise, frequency, and collective energy.
                       </p>
                    </div>
                 </div>
                                  <div className="liquid-glass p-6 md:p-10 rounded-[1.5rem] md:rounded-[2rem] space-y-6 md:space-y-10">
                     <h5 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-blue/60 mb-6 flex items-center gap-2 font-semibold">
                        <Database size={12} /> Performance Details
                     </h5>
                    <div className="grid grid-cols-1 gap-6">
                       {[
                         { label: 'Location', val: 'Tallinn, EE' },
                         { label: 'State', val: 'Live' },
                         { label: 'Capture', val: 'Direct' },
                         { label: 'Status', val: 'Stable' }
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
                 <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-40 text-secondary font-semibold">{TRACKLIST.length} Songs</span>
              </div>
              <div className="flex-grow overflow-visible md:overflow-y-auto no-scrollbar space-y-1 pr-0 md:pr-4 pb-8 md:pb-24">
                 {TRACKLIST.map((track, i) => (
                   <div key={track} className="group">
                      <div className="w-full flex items-center justify-between py-4 md:py-8 px-3 sm:px-4 md:px-6 hover:bg-primary/[0.01] transition-all duration-700 cursor-pointer">
                         <div className="flex items-center gap-4 sm:gap-8 md:gap-16 min-w-0">
                            <span className={`font-mono text-base sm:text-lg md:text-2xl opacity-20 group-hover:text-accent-blue group-hover:opacity-100 transition-all duration-700`}>
                               {String(i + 1).padStart(2, '0')}
                            </span>
                            <h4 className={`text-base sm:text-xl md:text-4xl font-light uppercase tracking-tighter text-primary/40 group-hover:text-primary transition-all duration-1000 truncate md:group-hover:translate-x-4`}>
                               {track}
                            </h4>
                         </div>
                         <ArrowRight size={20} className="opacity-0 md:group-hover:opacity-100 transition-opacity text-accent-blue shrink-0" />
                      </div>
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
