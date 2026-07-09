"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
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

// --- HELPERS & CHRONOLOGICAL DATA ---
const liveEps = [
  {
    id: "live-1",
    title: "Squealer and the Aggressors of Peace (Live)",
    coverImage: "/assets/music-assets/Squealer and the Aggressors of Peace (Live) Front Cover.jpeg",
    releaseYear: "2025",
    type: "Live Performance",
    link: "/music/sataop-live"
  }
];

const allReleases = [
  { id: "cd", title: "Controlled Demolition", coverImage: "/assets/music-assets/ControlledDemolitionCover_v2.png", releaseYear: "2026", type: "EP", link: "/music/eps/2" },
  { id: "ht", title: "Half Thoughts", coverImage: "/assets/music-assets/HalfThoughts1Cover.png", releaseYear: "2025", type: "Album", link: "/music/4" },
  { id: "soi", title: "Some Of Ink", coverImage: "/assets/music-assets/Some Of Ink EP Cover.png", releaseYear: "2025", type: "EP", link: "/music/eps/1" },
  { id: "sl", title: "Squealer and the Aggressors of Peace (Live)", coverImage: "/assets/music-assets/Squealer and the Aggressors of Peace (Live) Front Cover.jpeg", releaseYear: "2025", type: "Live EP", link: "/music/sataop-live" },
  { id: "af", title: "Allegory (Freestyle)", coverImage: "/assets/music-assets/ALLEGORY (FREESTYLE) Single Cover.jpeg", releaseYear: "2025", type: "Single", link: "/music/singles/1" },
  { id: "gs", title: "Goodbye Song (Demo)", coverImage: "/assets/music-assets/GoodbyeSongSingleCover.png", releaseYear: "2025", type: "Single", link: "/music/singles/4" },
  { id: "sataop", title: "Squealer and the Aggressors of Peace", coverImage: "/assets/music-assets/SQUEALER AND THE AGGRESSORS OF PEACE Album Cover.jpeg", releaseYear: "2022", type: "Album", link: "/music/1" },
  { id: "lazlo", title: "Lazlo", coverImage: "/assets/music-assets/Lazlo Album Cover (Final).jpeg", releaseYear: "2021", type: "Album", link: "/music/2" },
  { id: "soi-album", title: "Son Of Ink", coverImage: "/assets/music-assets/Son Of Ink Album Cover.jpeg", releaseYear: "2021", type: "Album", link: "/music/3" },
  { id: "ek", title: "Eye Kan", coverImage: "/assets/music-assets/Eye Kan Single Cover.jpeg", releaseYear: "2021", type: "Single", link: "/music/singles/2" },
  { id: "fi", title: "First (Interlude)", coverImage: "/assets/music-assets/First(Interlude) Single Cover.jpeg", releaseYear: "2020", type: "Single", link: "/music/singles/3" }
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
      href={release.link} 
      className="group relative flex flex-col transition-all duration-500 rounded-xl overflow-hidden cursor-pointer"
    >
      <Tilt
        tiltMaxAngleX={12}
        tiltMaxAngleY={12}
        perspective={1000}
        scale={1}
        transitionSpeed={1200}
        glareEnable={false}
        glareMaxOpacity={0.35}
        glareColor="var(--text-primary)"
        glarePosition="all"
        className="w-full h-full"
      >
        <div className="flex flex-col bg-primary/[0.01] dark:bg-primary/[0.03] transition-all duration-500 rounded-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] h-full relative overflow-hidden backdrop-blur-md">
          {/* Subtle light sweep highlights */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
          
          <div className="relative aspect-square w-full overflow-hidden mb-4 md:mb-6 rounded-lg bg-black shadow-inner">
            <Image 
              src={release.coverImage} 
              alt={release.title} 
              fill 
              className="object-cover transition-transform duration-700" 
            />
          </div>
          
          <div className="flex justify-between items-center gap-2 mt-auto">
             <h3 className="text-xs md:text-sm font-light tracking-tight uppercase leading-tight group-hover:text-accent-blue transition-colors text-primary/80 break-words flex-1 pr-2">
                {release.title}
             </h3>
             <span className="text-[10px] md:text-xs font-mono text-accent-blue flex items-center gap-1 opacity-65 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <span>{release.releaseYear}</span> <ArrowUpRight size={10} />
             </span>
          </div>
        </div>
      </Tilt>
    </Link>
  );
}

/**
 * MobileReleaseStack - Stacked cover images for mobile scroll flipping
 */
function MobileReleaseStack({ releases }: { releases: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      const index = Math.min(
        releases.length - 1,
        Math.floor(latest * (releases.length + 0.8))
      );
      setActiveIndex(index);
    });
  }, [scrollYProgress, releases.length]);

  return (
    <div ref={containerRef} className="relative h-[360vh] w-full bg-background-primary z-10">
      {/* Dynamic Background Atmosphere for Mobile Stack */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={releases[activeIndex]?.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.22 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "linear" }}
            className="absolute inset-0"
            style={{ transform: 'translateZ(0)' }}
          >
            <Image
              src={releases[activeIndex]?.coverImage}
              alt=""
              fill
              sizes="32px"
              className="object-cover scale-125 blur-2xl"
              priority
            />
          </motion.div>
        </AnimatePresence>
        {/* Noise and Vignette overlay to smooth the color-mixing blurs */}
        <div className="absolute inset-0 z-10 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url(/noise.png)' }}></div>
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-background-primary/20 via-background-primary/75 to-background-primary"></div>
      </div>

      {/* Edge Feathering Gradients to prevent abrupt background edges */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background-primary via-background-primary/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background-primary via-background-primary/80 to-transparent z-10 pointer-events-none" />

      {/* Sticky Deck Wrapper */}
      <div className="sticky top-12 h-[calc(100vh-3rem)] w-full overflow-hidden flex flex-col items-center justify-center px-6 z-10">
        
        {/* Section info */}
        <div className="w-full max-w-[420px] mb-4 flex justify-between items-center text-[9px] font-mono text-secondary/50">
          <div className="flex items-center gap-1.5">
            <span className="text-accent-blue font-semibold uppercase tracking-[0.22em]">Chronicle</span>
            <span className="w-1 h-1 rounded-full bg-accent-blue/30"></span>
            <span>Index {activeIndex + 1} / {releases.length}</span>
          </div>
        </div>

        {/* Stack deck */}
        <div className="relative w-[85vw] max-w-[420px] aspect-square flex items-center justify-center mb-6">
          {releases.map((release, i) => {
            // Prune cards out of range to prevent WebKit memory crashes on iOS Safari
            if (i < activeIndex - 1 || i > activeIndex + 3) {
              return null;
            }

            const isPassed = i < activeIndex;
            const isActive = i === activeIndex;
            const diff = i - activeIndex;

            // Stack spacing logic
            let yOffset = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = releases.length - i;
            let rotate = 0;

            if (isPassed) {
              yOffset = -350;
              scale = 0.85;
              opacity = 0;
              zIndex = 100 + i;
              rotate = -8;
            } else if (isActive) {
              yOffset = 0;
              scale = 1;
              opacity = 1;
            } else {
              yOffset = diff * 8;
              scale = Math.max(0.75, 1 - diff * 0.04);
              opacity = Math.max(0, 1 - diff * 0.25);
            }

            return (
              <motion.div
                key={release.id}
                animate={{
                  y: yOffset,
                  scale: scale,
                  opacity: opacity,
                  rotate: rotate
                }}
                transition={{
                  type: "spring",
                  stiffness: 140,
                  damping: 22
                }}
                style={{ zIndex }}
                className="absolute inset-0 w-full h-full"
              >
                <Link href={release.link} className="block w-full h-full relative rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-white/10 bg-black">
                  <Image
                    src={release.coverImage}
                    alt={release.title}
                    fill
                    className="object-cover"
                    priority={i < 3}
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Active Release Info - Full Title display with zero truncation */}
        <div className="w-full max-w-[420px] px-2 text-center z-20 min-h-[110px]">
          <div className="flex items-center justify-center gap-3 mb-1.5">
            <span className="text-accent-blue font-mono text-[10px] font-bold uppercase tracking-[0.3em]">
              {releases[activeIndex]?.type}
            </span>
            <span className="w-1 h-1 rounded-full bg-accent-blue/40"></span>
            <span className="text-secondary font-mono text-[10px] uppercase tracking-wider">
              {releases[activeIndex]?.releaseYear}
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-light text-primary uppercase tracking-tight leading-tight break-words">
            {releases[activeIndex]?.title}
          </h3>
          <div className="text-[8px] font-mono text-secondary/40 uppercase tracking-[0.2em] mt-3 animate-pulse">
            Tap cover to open sequence
          </div>
        </div>
        
        {/* Swipe prompt indicator */}
        <div className="flex flex-col items-center gap-1.5 text-secondary/30 font-mono text-[8px] uppercase tracking-[0.3em] mt-2">
          <span className="animate-bounce">↓ Scroll down to flip stack ↓</span>
        </div>
      </div>
    </div>
  );
}

export default function MusicPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <main className="min-h-screen bg-background-primary" />;

  return (
    <main className="min-h-screen pb-0 md:pb-64 bg-background-primary relative font-noto-display-condensed selection:bg-accent-blue/30">
      
      {/* 1. PLAIN BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-background-primary" />

      {/* 2. HERO: DICTIONARY ENTRY */}
      <section className="relative min-h-[50vh] md:min-h-[70vh] md:h-[85vh] flex flex-col justify-center overflow-hidden pt-16 pb-4 md:pt-20">
        <div className="absolute inset-0 z-0 pointer-events-none bg-background-primary" />

        <Container className="relative z-10 w-full !max-w-none px-6 md:px-20">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-24">
            {/* Left: Dictionary Text */}
            <div className="flex-1 text-left relative z-10">
              <div className="mb-8 md:mb-12 animate-in fade-in slide-in-from-left-8 duration-1000">
                 {/* Selected Works line indicator */}
                 <div className="flex items-center gap-4 mb-3 md:mb-4">
                    <span className="block w-8 md:w-12 h-[1px] bg-accent-blue opacity-50"></span>
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
            <div className="flex-[0.6] md:flex-[0.8] w-full max-w-[300px] md:max-w-[600px] relative mt-4 md:mt-0">
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
      <div className="md:hidden mt-0">
        <MobileReleaseStack releases={allReleases} />
      </div>

      <Container id="collections" className="hidden md:block mt-24 md:mt-40 !max-w-none px-6 md:px-20 space-y-32 md:space-y-48 relative z-10">
        
        {/* Studio Albums */}
        <section>
          {/* Glass header panel */}
          <div className="relative mb-10 md:mb-16 rounded-2xl overflow-hidden p-6 md:p-8 bg-primary/[0.02] backdrop-blur-md shadow-lg">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
            {albums.map((album, idx) => (
              <MusicWorkCard key={album.id} release={{ ...album, link: `/music/${album.id}` }} index={idx} />
            ))}
          </div>
        </section>

        {/* EPs */}
        <section>
          {/* Glass header panel */}
          <div className="relative mb-10 md:mb-16 rounded-2xl overflow-hidden p-6 md:p-8 bg-primary/[0.02] backdrop-blur-md shadow-lg">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
            {eps.map((ep, idx) => (
              <MusicWorkCard key={ep.id} release={{ ...ep, link: `/music/eps/${ep.id}` }} index={idx + albums.length} />
            ))}
            {liveEps.map((ep, idx) => (
              <MusicWorkCard key={ep.id} release={{ ...ep, link: `/music/sataop-live` }} index={idx + albums.length + eps.length} />
            ))}
          </div>
        </section>

        {/* Singles & Live captures */}
        <section className="pb-32">
          {/* Glass header panel */}
          <div className="relative mb-10 md:mb-16 rounded-2xl overflow-hidden p-6 md:p-8 bg-primary/[0.02] backdrop-blur-md shadow-lg">
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
            {singles.map((single, idx) => (
              <MusicWorkCard key={single.id} release={{ ...single, link: `/music/singles/${single.id}` }} index={idx + albums.length + eps.length + liveEps.length} />
            ))}
          </div>
        </section>

      </Container>
    </main>
  );
}
