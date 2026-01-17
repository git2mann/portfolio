'use client';

import Container from "@/app/_components/container";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaSpotify, FaApple, FaYoutube, FaTicketAlt, FaPlay, FaCompactDisc } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";

// --- 1. RESTORED ASSETS: FLOWERS & HUMMINGBIRDS ---

function Flower({
  className = "",
  style = {},
  variant = 1,
}: {
  className?: string;
  style?: React.CSSProperties;
  variant?: number;
}) {
  let src = "/assets/music-assets/music-adjacents/FlowersOne.png";
  if (variant === 2) src = "/assets/music-assets/music-adjacents/FlowersTwo.png";
  else if (variant === 3) src = "/assets/music-assets/music-adjacents/FlowersThree.png";
  else if (variant === 4) src = "/assets/music-assets/music-adjacents/FlowersFour.png";
  return (
    <div className={`absolute ${className}`} style={style}>
        <Image
        src={src}
        alt={`Flower ${variant}`}
        width={40}
        height={40}
        className="object-contain drop-shadow-lg"
        draggable={false}
        priority
        />
    </div>
  );
}

function Hummingbird({ className = "", style = {}, variant = 1 }: { className?: string; style?: React.CSSProperties; variant?: number }) {
  const src =
    variant === 2
      ? "/assets/music-assets/music-adjacents/HummingbirdTwo.png.png"
      : "/assets/music-assets/music-adjacents/HummingbirdOne.png";
  return (
    <div className={`absolute ${className}`} style={style}>
        <Image
        src={src}
        alt={`Hummingbird ${variant}`}
        width={48}
        height={36}
        className="object-contain drop-shadow-xl"
        draggable={false}
        priority
        />
    </div>
  );
}

// The "Organic Layer" - floats on top of the Bauhaus Grid
function AnimatedFloaters() {
  const floaters = [
    { type: "flower", variant: 4, className: "floater-flower", style: { left: "5%", top: "15%" }, delay: 0.87 },
    { type: "hummingbird", variant: 1, className: "floater-hummingbird", style: { left: "85%", top: "25%" }, delay: 0.23 },
    { type: "flower", variant: 1, className: "floater-flower", style: { left: "75%", top: "85%" }, delay: 1.22 },
    { type: "hummingbird", variant: 2, className: "floater-hummingbird", style: { left: "45%", top: "10%" }, delay: 0.76 },
    { type: "flower", variant: 3, className: "floater-flower", style: { left: "92%", top: "55%" }, delay: 0.86 },
    { type: "hummingbird", variant: 1, className: "floater-hummingbird", style: { left: "10%", top: "65%" }, delay: 1.5 },
    { type: "flower", variant: 2, className: "floater-flower", style: { left: "30%", top: "25%" }, delay: 1.1 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {floaters.map((floater, i) => (
        <div
          key={i}
          className={`animated-floater ${floater.className}`}
          style={{
            ...floater.style,
            animationDelay: `${floater.delay}s`,
          }}
        >
          {floater.type === "flower" && <Flower variant={floater.variant} />}
          {floater.type === "hummingbird" && <Hummingbird variant={floater.variant} />}
        </div>
      ))}
    </div>
  );
}

// --- 2. RESTORED ASSET: 3D VINYL SLEEVE ---

const COVER_IMAGE = "/assets/music-assets/Squealer and the Aggressors of Peace (Live) Front Cover.jpeg";
const BACK_COVER_IMAGE = "/assets/music-assets/Squealer and the Aggressors of Peace (Live) Back Cover.jpeg";

function VinylSleeve3D({ size = 340 }: { size?: number }) {
   const vinylMiddleStyle = { background: "#1a1a1a" };
   return (
      <div
         className="vinyl-sleeve group cursor-pointer"
         style={{ width: size, height: size }}
      >
         {/* Middle layers for thickness */}
         <div className="vinyl-middle" style={vinylMiddleStyle} />
         <div className="vinyl-middle-1" style={vinylMiddleStyle} />
         <div className="vinyl-middle-2" style={vinylMiddleStyle} />
         <div className="vinyl-middle-3" style={vinylMiddleStyle} />

         {/* Front cover */}
         <div className="vinyl-cover border-2 border-black">
            <Image
               src={COVER_IMAGE}
               alt="Squealer Live Cover"
               fill
               className="object-cover"
               sizes={`(max-width: 768px) 100vw, 500px`}
               priority
            />
            {/* Grain Overlay */}
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
         </div>

         {/* Back cover: now uses the actual back cover image */}
         <div className="vinyl-back-cover border-2 border-black bg-[#F4F3EF]">
            <Image
               src={BACK_COVER_IMAGE}
               alt="Squealer Live Back Cover"
               fill
               className="object-cover"
               sizes={`(max-width: 768px) 100vw, 500px`}
               priority
            />
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
         </div>
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
   return (
      <main className="min-h-screen bg-[#EAE8E3] text-black dark:bg-[#18181b] dark:text-white selection:bg-[#FF3B30] selection:text-white relative">
      
         {/* 1. ANIMATION STYLES (Restored & Optimized) */}
      <style jsx global>{`
        .animated-floater {
          position: absolute;
          animation: floaterMove 8s ease-in-out infinite alternate;
        }
        @keyframes floaterMove {
          0% { transform: translateY(0) scale(1) rotate(0deg); }
          50% { transform: translateY(-20px) scale(1.1) rotate(5deg); }
          100% { transform: translateY(10px) scale(0.95) rotate(-5deg); }
        }
        .vinyl-sleeve {
          position: relative;
          transform-style: preserve-3d;
          animation: rotate-y-axis 15s linear infinite;
          perspective: 1000px;
        }
        .vinyl-sleeve:hover {
          animation-play-state: paused;
          transform: rotateY(15deg) rotateX(10deg) scale(1.05);
          transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }
        @keyframes rotate-y-axis {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        .vinyl-cover, .vinyl-back-cover, [class^="vinyl-middle"] {
          position: absolute; width: 100%; height: 100%; border-radius: 4px;
        }
        .vinyl-cover { transform: translateZ(4px); backface-visibility: hidden; }
        .vinyl-back-cover { transform: rotateY(180deg) translateZ(4px); backface-visibility: hidden; }
        /* Middle layers create thickness */
        .vinyl-middle { transform: translateZ(0px); }
        .vinyl-middle-1 { transform: translateZ(-1px); }
        .vinyl-middle-2 { transform: translateZ(1px); }
        .vinyl-middle-3 { transform: translateZ(2px); }
      `}</style>

      {/* 2. BACKGROUND & OVERLAYS */}
         <div className="fixed inset-0 opacity-10 pointer-events-none z-0 dark:opacity-20" 
                style={{ 
                   backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
                   backgroundSize: '40px 40px'
                }}>
         </div>
      
      {/* The Organic Layer */}
      <AnimatedFloaters />

      {/* 3. HEADER STRIP */}
      <div className="sticky top-0 z-50 w-full border-b-4 border-black dark:border-white bg-[#F4F3EF] dark:bg-[#232326] flex justify-between items-center px-4 md:px-8 py-3 shadow-xl">
         <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#FF3B30] animate-pulse"></div>
            <span className="font-mono text-xs uppercase tracking-widest font-bold">Live Album</span>
         </div>
         <Link href="/music" className="font-mono text-xs uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors px-3 py-1 border border-transparent hover:border-black dark:hover:border-white flex items-center gap-2">
            <ArrowLeft className="w-3 h-3" /> Archive
         </Link>
      </div>

      <Container>
        <div className="max-w-[1600px] mx-auto pt-16 pb-32">
           
           {/* 4. HERO SECTION: ECO-BRUTALIST FUSION */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24 relative z-10">
              
              {/* Left: Bauhaus Typography */}
              <div className="order-2 lg:order-1 flex flex-col gap-6 relative">
                 
                 {/* Decorative Tape */}
                 <div className="absolute -top-12 -left-12 opacity-10 pointer-events-none">
                    <Flower variant={3} style={{ width: '80px', height: '80px' }} />
                 </div>
                 
                 <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.85] tracking-tighter mix-blend-darken text-black dark:text-white relative z-10">
                    <span className="dark:text-white">Squealer And The Aggressors Of Peace</span><br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3B30] to-[#2B4592] dark:text-white dark:bg-none">(Live)</span><br/>
                 </h1>

                 <div className="flex flex-col gap-4 mt-8 border-l-4 border-black dark:border-white pl-6 bg-white/50 dark:bg-white/10 backdrop-blur-sm p-4">
                    <div className="font-mono text-sm uppercase tracking-widest text-gray-600 dark:text-gray-300 flex justify-between border-b border-black/20 dark:border-white/20 pb-2">
                       <span>Artist</span>
                       <span className="font-bold text-black dark:text-white">Klense</span>
                    </div>
                    <div className="font-mono text-sm uppercase tracking-widest text-gray-600 dark:text-gray-300 flex justify-between border-b border-black/20 dark:border-white/20 pb-2">
                       <span>Location</span>
                       <span className="font-bold text-black dark:text-white">Nairobi, KE</span>
                    </div>
                    <div className="font-mono text-sm uppercase tracking-widest text-[#FF3B30] dark:text-[#FF3B30] font-bold flex justify-between">
                       <span>Status</span>
                       <span>Available Now</span>
                    </div>
                 </div>

                 <div className="flex flex-wrap gap-4 mt-8">
                    <a 
                       href="https://album.link/sataop-live-klense" 
                       className="bg-black text-white dark:bg-white dark:text-black px-8 py-4 font-bold uppercase tracking-widest border-2 border-transparent hover:bg-[#FF3B30] hover:border-black dark:hover:border-white hover:text-black dark:hover:bg-[#FF3B30] dark:hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none"
                    >
                       Stream Album
                    </a>
                    <a 
                       href="https://klense.gumroad.com/l/sataop-live-album-klense" 
                       target="_blank"
                       className="px-8 py-4 font-bold uppercase tracking-widest border-2 border-black dark:border-white hover:bg-white dark:hover:bg-black transition-colors flex items-center gap-2 bg-[#F4B400] dark:bg-[#2B4592] dark:text-white"
                    >
                       <FaTicketAlt /> Purchase
                    </a>
                 </div>
              </div>

              {/* Right: The 3D Artifact (Vinyl) */}
              <div className="order-1 lg:order-2 flex justify-center items-center relative h-[500px]">
                 {/* Geometric Background Shapes */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4B400] rounded-full mix-blend-multiply opacity-50 blur-3xl animate-pulse"></div>
                 <div className="absolute bottom-0 left-10 w-48 h-48 bg-[#2B4592] rounded-full mix-blend-multiply opacity-50 blur-3xl"></div>
                 
                 {/* Floating flowers specifically around the vinyl */}
                 <div className="absolute -top-4 right-10 z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                    <Hummingbird variant={1} />
                 </div>
                 <div className="absolute bottom-10 -left-4 z-20 animate-bounce" style={{ animationDuration: '4s' }}>
                    <Flower variant={2} />
                 </div>

                 {/* The Vinyl Component */}
                 <div className="drop-shadow-2xl hover:scale-105 transition-transform duration-500">
                    <VinylSleeve3D size={350} />
                 </div>
              </div>
           </div>

           {/* 5. THE SETLIST (Data Table) */}
           <div className="border-4 border-black dark:border-white bg-white dark:bg-[#232326] relative z-10 mb-24 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
              <div className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 font-mono text-xs uppercase tracking-widest flex justify-between items-center">
                 <span>// Setlist_Data</span>
                 <FaCompactDisc className="animate-spin-slow" />
              </div>
              
              <div className="divide-y-2 divide-black dark:divide-white">
                 {TRACKLIST.map((track, idx) => (
                    <div key={track} className="group flex items-center justify-between p-6 hover:bg-[#F4F3EF] dark:hover:bg-[#18181b] transition-colors relative overflow-hidden">
                       {/* Subtle hover reveal of flower */}
                       <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none transform translate-x-4 group-hover:translate-x-0 duration-300">
                          <Flower variant={(idx % 4) + 1} />
                       </div>

                       <div className="flex items-center gap-6 relative z-10">
                          <span className="font-mono text-xl font-bold text-gray-400 dark:text-gray-300 group-hover:text-[#FF3B30] dark:group-hover:text-[#FF3B30]">
                             {(idx + 1).toString().padStart(2, '0')}
                          </span>
                          <span className="text-xl md:text-3xl font-bold uppercase tracking-tight group-hover:translate-x-2 transition-transform">
                             {track}
                          </span>
                       </div>
                       <div className="hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
                          <span className="font-mono text-xs uppercase bg-black text-white dark:bg-white dark:text-black px-2 py-1">Live Ver.</span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* 6. STREAMING LINKS (The Output) */}
           <div id="stream" className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {[
                 { name: 'Spotify', icon: FaSpotify, color: 'hover:bg-[#1DB954] hover:text-white', link: 'https://album.link/sataop-live-klense' },
                 { name: 'Apple Music', icon: FaApple, color: 'hover:bg-black hover:text-white', link: 'https://album.link/sataop-live-klense' },
                 { name: 'YouTube', icon: FaYoutube, color: 'hover:bg-[#FF0000] hover:text-white', link: 'https://album.link/sataop-live-klense' }
              ].map((platform) => (
                 <a 
                    key={platform.name}
                    href={platform.link}
                    target="_blank"
                    className={`
                       group border-4 border-black dark:border-white bg-white dark:bg-[#232326] p-8 flex flex-col items-center justify-center gap-4 transition-all duration-300
                       ${platform.color} hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                    `}
                 >
                    <platform.icon className="w-12 h-12" />
                    <span className="font-bold uppercase tracking-widest">{platform.name}</span>
                 </a>
              ))}
           </div>

        </div>
      </Container>
    </main>
  );
}