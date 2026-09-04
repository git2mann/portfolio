"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft,
  Disc, 
  Terminal,
  Activity,
  Music
} from "lucide-react";
import Container from "@/app/_components/container";
import ClearRefractiveCover from "@/app/_components/ClearRefractiveCover";

// --- CONSTANTS ---
const TRACKLIST = [
  { id: "1", title: "Saudade In Err (Live)", duration: "1:22", audioUrl: "" },
  { id: "2", title: "Hummer's Theme (Live)", duration: "2:25", audioUrl: "" },
  { id: "3", title: "Chop Your Head (Live)", duration: "3:30", audioUrl: "" },
  { id: "4", title: "Roast (Live)", duration: "3:05", audioUrl: "" },
  { id: "5", title: "Salamander Crowd (Live)", duration: "2:15", audioUrl: "" },
  { id: "6", title: "Me, Myself and I (Live)", duration: "2:45", audioUrl: "" },
  { id: "7", title: "Help Me Run (Live)", duration: "3:02", audioUrl: "" },
  { id: "8", title: "Jungle Law (Live)", duration: "2:10", audioUrl: "" },
  { id: "9", title: "Tisa (Live)", duration: "3:40", audioUrl: "" },
  { id: "10", title: "You In Mind (Live)", duration: "2:55", audioUrl: "" },
];

const COVER_IMAGE = "/assets/music-assets/Squealer and the Aggressors of Peace (Live) Front Cover.webp";
const TYPEFACE_IMAGE = "/assets/music-assets/Portfolio Music Typefaces/Sataop Live Text.svg";

export default function SataopLivePage() {
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background-primary text-primary font-noto-display-condensed relative pb-24">
      {/* Background Atmosphere - Enhanced visibility with Noise fix */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ transform: 'translateZ(0)' }}>
          <Image src={COVER_IMAGE} alt="" fill sizes="100vw" className="object-cover scale-125 blur-[100px] opacity-20" priority unoptimized />
        </div>
        <div className="absolute inset-0 z-10 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url(/noise.png)' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background-primary/30 via-background-primary/85 to-background-primary"></div>
      </div>

      <Container className="relative z-10 pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6 md:px-12 max-w-6xl">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <Link 
            href="/music" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass-clear text-xs uppercase tracking-widest text-primary/70 hover:text-primary transition-all active:scale-95"
          >
            <ArrowLeft size={14} /> Back to Releases
          </Link>
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-secondary/60">
            Music / Live / Sataop (Live)
          </span>
        </div>

        {/* RELEASE HERO & OVERVIEW */}
        <section className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 lg:gap-16 items-start mb-16 md:mb-24">
          {/* Cover & Specs */}
          <div className="flex flex-col gap-6">
            <ClearRefractiveCover src={COVER_IMAGE} size={380} />
            
            {/* Quick Specs Card */}
            <div className="bg-primary/[0.03] backdrop-blur-md p-5 rounded-2xl grid grid-cols-3 gap-3 text-center">
              <div className="space-y-0.5">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-secondary/70">Format</span>
                <span className="block text-sm font-medium uppercase text-primary">Live Album</span>
              </div>
              <div className="space-y-0.5 px-2">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-secondary/70">Tracks</span>
                <span className="block text-sm font-medium uppercase text-primary">{TRACKLIST.length} Songs</span>
              </div>
              <div className="space-y-0.5">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-secondary/70">Year</span>
                <span className="block text-sm font-medium uppercase text-primary">2025</span>
              </div>
            </div>
          </div>

          {/* Details & Concept Overview */}
          <div className="flex flex-col justify-start gap-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue font-mono text-[10px] uppercase tracking-widest font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
                Live Performance • 2025
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-secondary/60">
                Live Recording
              </span>
            </div>

            {/* Typeface SVG */}
            <div className="relative w-full h-44 sm:h-56 md:h-72 lg:h-80 xl:h-96 select-none pointer-events-none flex items-center justify-start my-2 sm:my-4">
              <img
                src="/assets/music-assets/Portfolio Music Typefaces/Sataop Live Text.svg"
                alt="Squealer and the Aggressors of Peace (Live)"
                className="w-full h-full object-contain object-left release-typeface-img drop-shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
              />
              <h1 className="sr-only">Squealer and the Aggressors of Peace (Live)</h1>
            </div>

            <div className="space-y-1">
              <p className="font-mono text-[11px] uppercase tracking-widest text-secondary">
                Artist: <span className="text-primary font-medium">Leon Nduati (Klense)</span>
              </p>
            </div>

            {/* Liner Notes / Concept Overview */}
            <div className="space-y-4 pt-2">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-blue font-semibold flex items-center gap-2">
                <Disc size={13} /> Concept & Live Performance Notes
              </h3>
              <div className="space-y-3 pl-4 md:pl-5">
                <p className="text-base sm:text-lg md:text-xl font-light leading-snug text-primary">
                  My stripping away of the studio polish, putting my material through its paces.
                </p>
                <p className="text-sm sm:text-base font-light leading-relaxed text-secondary/90">
                  Of note is that the songs that made the cut for the live album represent the strongest story aspects of the original project. The contradictions of the original record are quelled here, as each track is intense, and almost too much to listen to. It is the chaotic, beautiful clash of this project’s energy where the concept of aggressing peace is truly evident, years later.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TRACKLIST - Pure natural page flow, borderless aesthetic */}
        <section className="w-full">
          <div className="flex items-end justify-between pb-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light uppercase tracking-tight text-primary">
                Live Tracklist
              </h2>
              <p className="font-mono text-[10px] uppercase tracking-widest text-secondary/70 mt-1">
                Recorded live in performance
              </p>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent-blue font-medium">
              {TRACKLIST.length} Tracks
            </span>
          </div>

          <div className="space-y-2.5">
            {TRACKLIST.map((track, i) => (
              <div 
                key={track.id} 
                className="rounded-2xl transition-all duration-300 bg-primary/[0.015] hover:bg-primary/[0.04] p-4 sm:p-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                  <span className="font-mono text-sm sm:text-base text-secondary/50">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 className="text-base sm:text-lg md:text-xl font-light uppercase tracking-tight truncate text-primary/80">
                    {track.title}
                  </h4>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-secondary/60">
                    {track.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue font-mono text-[9px] uppercase tracking-wider">
                    <Activity size={10} /> Live
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
