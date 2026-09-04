"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from "@/app/_components/container";
import LyricsComponent from "@/app/_components/LyricsComponent";
import MiniAudioPlayer from '@/app/_components/MiniAudioPlayer';
import ClearRefractiveCover from '@/app/_components/ClearRefractiveCover';
import { 
  FiArrowLeft, 
  FiDisc, 
  FiMusic, 
  FiVolume2 
} from 'react-icons/fi';

export default function SingleDetailClient({ single }: { single: any }) {
  const hasLyrics = single.lyrics && single.lyrics.length > 0;
  const hasAudio = !!single.audioUrl;

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background-primary text-primary font-noto-display-condensed relative pb-24">
      {/* Background Atmosphere - Enhanced visibility with Noise fix */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ transform: 'translateZ(0)' }}>
          <Image src={single.coverImage} alt="" fill sizes="100vw" className="object-cover scale-125 blur-[100px] opacity-20" priority unoptimized />
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
            <FiArrowLeft size={14} /> Back to Releases
          </Link>
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-secondary/60">
            Music / Singles / {single.title}
          </span>
        </div>

        {/* RELEASE HERO */}
        <section className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 lg:gap-16 items-start mb-16 md:mb-20">
          {/* Cover & Specs */}
          <div className="flex flex-col gap-6">
            <ClearRefractiveCover src={single.coverImage} size={380} />
            
            {/* Quick Specs Card */}
            <div className="bg-primary/[0.03] backdrop-blur-md p-5 rounded-2xl grid grid-cols-3 gap-3 text-center">
              <div className="space-y-0.5">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-secondary/70">Format</span>
                <span className="block text-sm font-medium uppercase text-primary">Single</span>
              </div>
              <div className="space-y-0.5 px-2">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-secondary/70">Duration</span>
                <span className="block text-sm font-medium uppercase text-primary">{single.duration || '01:13'}</span>
              </div>
              <div className="space-y-0.5">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-secondary/70">Year</span>
                <span className="block text-sm font-medium uppercase text-primary">{single.releaseYear}</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-start gap-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue font-mono text-[10px] uppercase tracking-widest font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
                Released {single.releaseYear}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-secondary/60">
                Single Release
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tighter uppercase leading-[0.85] text-primary my-2">
              {single.title}
            </h1>

            <div className="space-y-1">
              <p className="font-mono text-[11px] uppercase tracking-widest text-secondary">
                Artist: <span className="text-primary font-medium">Leon Nduati (Klense)</span>
              </p>
            </div>

            {/* Liner Notes / Single Context */}
            <div className="space-y-4 pt-2">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-blue font-semibold flex items-center gap-2">
                <FiDisc size={13} /> Release Context
              </h3>
              <div className="space-y-3 pl-4 md:pl-5">
                <p className="text-base sm:text-lg font-light leading-relaxed text-primary/90">
                  A standalone single exploring raw rhythm, cadence, and thematic expression.
                </p>
              </div>
            </div>

            {/* Audio player if audio is available */}
            {hasAudio && (
              <div className="pt-2">
                <MiniAudioPlayer 
                  src={single.audioUrl} 
                  title={`${single.title} - Klense`} 
                  durationString={single.duration} 
                />
              </div>
            )}
          </div>
        </section>

        {/* LYRICS SECTION - Naturally flowing in page, borderless aesthetic */}
        {hasLyrics && (
          <section className="w-full pt-6">
            <div className="max-w-4xl">
              <LyricsComponent lyrics={single.lyrics} />
            </div>
          </section>
        )}
      </Container>
    </main>
  );
}
