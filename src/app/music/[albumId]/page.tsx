"use client";

import { useParams, useRouter } from 'next/navigation';
import Container from "@/app/_components/container";
import { useState, useRef, useEffect, useCallback } from 'react';
import LyricsComponent from '@/app/_components/LyricsComponent';
import { albumLyrics } from '@/data/lyrics/albums';
import type { Album, Song } from '@/interfaces/music';
import Image from 'next/image';
import InstructionPopup from "@/app/_components/InstructionPopup";
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
  FiChevronRight,
  FiChevronLeft
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

// --- HELPERS ---

function injectLyrics(albums: Album[], albumLyrics: Record<string, Record<string, any[]>>): Album[] {
  return albums.map((album: Album) => {
    const lyricsForAlbum = albumLyrics[album.id] || {};
    return {
      ...album,
      songs: album.songs.map((song: Song) => ({
        ...song,
        lyrics: lyricsForAlbum[song.id] || [],
      })),
    };
  });
}

const albumsData = injectLyrics([
  {
    id: "1",
    title: "Squealer and the Aggressors of Peace",
    coverImage: "/assets/music-assets/SQUEALER AND THE AGGRESSORS OF PEACE Album Cover.jpeg",
    releaseYear: "2022",
    description: "An investigation into power, peace, and sonic disruption. This concept album documents the friction between structural logic and raw human impulse.",
    songs: [
      { id: "1", title: "Saudade In Err (Intro)", duration: "1:17", audioUrl: "/assets/music/sataop-klense-mp3s/Saudade In Err (Intro) - Klense.mp3", lyrics: [] },
      { id: "2", title: "Hummer's Theme", duration: "2:18", audioUrl: "/assets/music/sataop-klense-mp3s/Hummer's Theme - Klense.mp3", lyrics: [] },
      { id: "3", title: "Chop Your Head", duration: "3:17", audioUrl: "/assets/music/sataop-klense-mp3s/Chop Your Head - Klense.mp3", lyrics: [] },
      { id: "4", title: "Roast", duration: "2:51", audioUrl: "/assets/music/sataop-klense-mp3s/Roast - Klense.mp3", lyrics: [] },
      { id: "5", title: "Salamander Crowd", duration: "2:01", audioUrl: "/assets/music/sataop-klense-mp3s/Salamander Crowd - Klense.mp3", lyrics: [] },
      { id: "6", title: "Me, Myself and I", duration: "2:31", audioUrl: "/assets/music/sataop-klense-mp3s/Me, Myself and I - Klense.mp3", lyrics: [] },
      { id: "7", title: "Help Me Run", duration: "2:50", audioUrl: "/assets/music/sataop-klense-mp3s/Help Me Run - Klense.mp3", lyrics: [] },
      { id: "8", title: "Jungle Law", duration: "2:01", audioUrl: "/assets/music/sataop-klense-mp3s/Jungle Law - Klense.mp3", lyrics: [] },
      { id: "9", title: "Tisa", duration: "3:23", audioUrl: "/assets/music/sataop-klense-mp3s/Tisa - Klense.mp3", lyrics: [] },
      { id: "10", title: "You In Mind", duration: "2:40", audioUrl: "/assets/music/sataop-klense-mp3s/You In Mind - Klense.mp3", lyrics: [] }
    ]
  },
  {
    id: "2",
    title: "Lazlo",
    coverImage: "/assets/music-assets/Lazlo Album Cover (Final).jpeg",
    releaseYear: "2021",
    description: "An introspective soundscape. A knowledge base of melodic experiments and internal architectures.",
    songs: [
      { id: "1", title: "The Return (Intro)", duration: "0:30", audioUrl: "", lyrics: [] },
      { id: "2", title: "Know About", duration: "1:43", audioUrl: "", lyrics: [] },
      { id: "3", title: "General Ike", duration: "2:15", audioUrl: "", lyrics: [] },
      { id: "4", title: "Me, You (Mii Yu)", duration: "2:25", audioUrl: "", lyrics: [] },
      { id: "5", title: "Lazlo's Camp", duration: "2:35", audioUrl: "", lyrics: [] },
      { id: "6", title: "S a t o r i", duration: "3:25", audioUrl: "", lyrics: [] },
      { id: "7", title: "With U", duration: "3:20", audioUrl: "", lyrics: [] },
      { id: "8", title: "Elay-AZ Theme", duration: "1:06", audioUrl: "", lyrics: [] },
      { id: "9", title: "On Da Fens", duration: "3:20", audioUrl: "", lyrics: [] }
    ]
  },
  {
    id: "3",
    title: "Son Of Ink",
    coverImage: "/assets/music-assets/Son Of Ink Album Cover.jpeg",
    releaseYear: "2021",
    description: "The intersection of graphic ink and sonic clarity. A deep-dive into high-fidelity expression.",
    songs: [
      { id: "1", title: "Back Again", duration: "3:17", audioUrl: "", lyrics: [] },
      { id: "4", title: "Ultimate", duration: "3:48", audioUrl: "", lyrics: [] },
      { id: "6", title: "Something", duration: "3:18", audioUrl: "", lyrics: [] }
    ],
  },
  {
    id: "4",
    title: "Half Thoughts",
    coverImage: "/assets/music-assets/HalfThoughts1Cover.png",
    releaseYear: "2025",
    description: `Melodic fragments and sonic dispatches. Documentation of half-formed ideas that reached completion.`,
    songs: [
      { id: "1", title: "The Evening Dispatch!", duration: "2:05", audioUrl: "", lyrics: [] },
      { id: "2", title: "Saxophone", duration: "2:05", audioUrl: "", lyrics: [] },
      { id: "3", title: "Oze II", duration: "2:09", audioUrl: "", lyrics: [] },
      { id: "4", title: "Oze", duration: "2:19", audioUrl: "", lyrics: [] },
      { id: "5", title: "Wish Ya Told Me!", duration: "1:33", audioUrl: "", lyrics: [] },
      { id: "6", title: "Intermission IV", duration: "2:11", audioUrl: "", lyrics: [] },
      { id: "7", title: "You Are The Reason", duration: "1:53", audioUrl: "", lyrics: [] },
      { id: "8", title: "Blue Salmon", duration: "1:18", audioUrl: "", lyrics: [] },
      { id: "9", title: "Deglupta", duration: "1:37", audioUrl: "", lyrics: [] },
      { id: "10", title: "Kept You Waiting", duration: "1:36", audioUrl: "", lyrics: [] },
      { id: "11", title: "Karl Draisack", duration: "2:37", audioUrl: "", lyrics: [] },
      { id: "12", title: "Forbo", duration: "1:57", audioUrl: "", lyrics: [] },
      { id: "13", title: "Garble Surmount", duration: "2:33", audioUrl: "", lyrics: [] },
      { id: "14", title: "Impromptu", duration: "3:05", audioUrl: "", lyrics: [] },
      { id: "15", title: "Addis Abeba", duration: "2:42", audioUrl: "", lyrics: [] },
      { id: "16", title: "Abide by Klense", duration: "2:03", audioUrl: "", lyrics: [] },
    ],
  },
], albumLyrics);

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

export default function AlbumPage() {
  const params = useParams();
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const album = params ? albumsData.find((a: Album) => a.id === params.albumId) : null;

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

  if (!album || !mounted) return null;

  return (
    <main className="h-screen w-full overflow-hidden bg-background-primary text-primary font-noto-display-condensed relative">
      <InstructionPopup />

      {/* Background Atmosphere - Enhanced blur with Noise to fix banding */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ transform: 'translateZ(0)' }}>
           <Image src={album.coverImage} alt="" fill className="object-cover scale-125 blur-[120px] opacity-25" />
        </div>
        {/* Noise overlay to break up banding blocks */}
        <div className="absolute inset-0 z-10 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url(/noise.png)' }}></div>
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-background-primary/20 via-background-primary/80 to-background-primary"></div>
      </div>

      {/* Navigation Controls - Moved below header */}
      <div className="fixed top-32 left-8 md:top-40 md:left-12 z-[110] flex items-center gap-8 animate-in fade-in slide-in-from-left-4 duration-1000">
         <button onClick={() => router.push('/music')} className="flex items-center gap-3 px-6 py-2.5 rounded-full liquid-glass-clear text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all text-primary border-primary/20">
            <FiArrowLeft size={16} /> Back
         </button>
         <div className="flex items-center gap-4 text-accent-blue font-mono text-[10px] uppercase tracking-[0.4em] opacity-60">
            <span>{album.title}</span>
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
        {/* SLIDE 0: THE RELEASE (Hero) */}
        <section className="w-[100vw] h-full flex-shrink-0 flex items-center justify-center pt-12">
           <Container className="!max-w-none px-6 md:px-24">
              <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
                 <div className="flex-shrink-0">
                    <ClearRefractiveCover src={album.coverImage} size={400} />
                 </div>
                 <div className="flex-grow space-y-8">
                    <div className="space-y-4">
                       <div className="flex items-center gap-4 text-accent-blue font-mono text-xs uppercase tracking-[0.5em]">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse"></div>
                          <span>RELEASE ACTIVE // {album.releaseYear}</span>
                       </div>
                       <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-light tracking-tighter uppercase leading-[0.8] text-primary">
                          {album.title}
                       </h1>
                    </div>
                    <div className="flex gap-12 pt-6 border-t border-primary/10">
                       <div className="space-y-1">
                          <p className="font-mono text-[9px] uppercase text-primary/40 tracking-widest">Format</p>
                          <p className="text-2xl md:text-4xl font-light tracking-tighter text-primary">ALBUM</p>
                       </div>
                       <div className="space-y-1">
                          <p className="font-mono text-[9px] uppercase text-primary/40 tracking-widest">Resolution</p>
                          <p className="text-2xl md:text-4xl font-light tracking-tighter text-primary">LOSSLESS</p>
                       </div>
                    </div>
                 </div>
              </div>
           </Container>
        </section>

        {/* SLIDE 1: THE CONTEXT (Overview & Specs) */}
        <section className="w-[100vw] h-full flex-shrink-0 flex items-center justify-center pt-12">
           <Container className="!max-w-none px-6 md:px-24">
              <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-16 md:gap-24 items-center">
                 <div className="space-y-10">
                    <div className="max-w-3xl border-l-[3px] border-accent-blue pl-10 relative">
                       <h3 className="font-mono text-[10px] uppercase tracking-[0.6em] text-accent-blue/60 mb-6 flex items-center gap-4">
                          <FiTerminal size={12} /> OVERVIEW
                       </h3>
                       <p className="text-3xl md:text-5xl font-light leading-tight text-primary">
                          {album.description}
                       </p>
                    </div>
                    <div className="flex flex-wrap gap-6">
                       <button className="flex items-center gap-3 px-8 py-4 bg-primary text-background-primary font-medium uppercase text-[10px] tracking-widest hover:bg-accent-blue hover:text-white transition-all shadow-2xl">
                          <FiPlay size={16} fill="currentColor" /> Play Album
                       </button>
                       <button className="flex items-center gap-3 px-8 py-4 border border-primary/10 liquid-glass-clear font-medium uppercase text-[10px] tracking-widest hover:bg-primary/5 transition-all text-primary">
                          <FiExternalLink size={16} /> External Links
                       </button>
                    </div>
                 </div>
                 
                 <div className="liquid-glass p-10 rounded-[2rem] space-y-10">
                    <h5 className="font-mono text-[9px] uppercase tracking-[0.6em] text-accent-blue/60 mb-6 flex items-center gap-4">
                       <FiDatabase size={12} /> METADATA
                    </h5>
                    <div className="grid grid-cols-1 gap-6">
                       {[
                         { label: 'Artist', val: 'Leon Nduati' },
                         { label: 'Alias', val: 'Klense' },
                         { label: 'Release', val: album.releaseYear },
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

        {/* SLIDE 2: THE INDEX (Tracklist) */}
        <section className="w-[100vw] h-full flex-shrink-0 flex items-center justify-center pt-12">
           <Container className="!max-w-none px-6 md:px-24 h-[75vh] flex flex-col">
              <div className="flex items-end justify-between border-b border-primary/10 pb-4 mb-8">
                 <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter text-primary leading-none">The Index</h2>
                 <span className="font-mono text-[9px] uppercase tracking-[0.5em] opacity-30 text-secondary">Track_Sequence // {album.songs.length} Units</span>
              </div>
              <div className="flex-grow overflow-y-auto no-scrollbar space-y-1 pr-4 pb-24">
                 {album.songs.map((song, i) => (
                   <div key={song.id} className="group border-b border-primary/5">
                      <button 
                        onClick={() => setActiveTrackId(activeTrackId === song.id ? null : song.id)}
                        className={`w-full flex items-center justify-between py-6 md:py-8 px-6 transition-all duration-500 ${activeTrackId === song.id ? 'bg-primary/[0.03] scale-[1.01]' : 'hover:bg-primary/[0.01]'}`}
                      >
                         <div className="flex items-center gap-10 md:gap-16">
                            <span className={`font-mono text-lg md:text-2xl transition-colors ${activeTrackId === song.id ? 'text-accent-blue' : 'opacity-20'}`}>
                               {String(i + 1).padStart(2, '0')}
                            </span>
                            <h4 className={`text-xl md:text-4xl font-light uppercase tracking-tighter transition-all ${activeTrackId === song.id ? 'text-primary translate-x-4' : 'text-primary/40 group-hover:text-primary'}`}>
                               {song.title}
                            </h4>
                         </div>
                         <div className="flex items-center gap-6">
                            <span className="font-mono text-xs opacity-20 text-secondary">{song.duration}</span>
                            <div className={`w-8 h-8 rounded-full border border-primary/10 flex items-center justify-center transition-all ${activeTrackId === song.id ? 'bg-accent-blue border-accent-blue rotate-180 shadow-lg' : 'group-hover:border-accent-blue'}`}>
                               <FiCornerDownRight size={14} className={activeTrackId === song.id ? 'text-white' : 'opacity-20'} />
                            </div>
                         </div>
                      </button>
                      <AnimatePresence>
                         {activeTrackId === song.id && (
                           <motion.div
                             initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                             className="overflow-hidden"
                           >
                              <div className="py-8 md:py-12 px-6 border-t border-dashed border-primary/10 bg-primary/[0.01] backdrop-blur-sm">
                                 <LyricsComponent lyrics={song.lyrics} />
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
