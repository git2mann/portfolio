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
  FiChevronDown, 
  FiDisc, 
  FiMusic,
  FiVolume2
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function EpDetailClient({ ep }: { ep: any }) {
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background-primary text-primary font-noto-display-condensed relative pb-24">
      {/* Background Atmosphere - Enhanced visibility with Noise fix */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ transform: 'translateZ(0)' }}>
          <Image src={ep.coverImage} alt="" fill sizes="100vw" className="object-cover scale-125 blur-[100px] opacity-20" priority unoptimized />
        </div>
        <div className="absolute inset-0 z-10 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url(/noise.png)' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background-primary/30 via-background-primary/85 to-background-primary"></div>
      </div>

      <Container className="relative z-10 pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6 md:px-12 max-w-6xl">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <Link 
            href="/music" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/[0.04] hover:bg-primary/[0.08] text-xs uppercase tracking-widest text-primary/70 hover:text-primary transition-all active:scale-95"
          >
            <FiArrowLeft size={14} /> Back to Releases
          </Link>
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-secondary/60">
            Music / EPs / {ep.title}
          </span>
        </div>

        {/* RELEASE HERO & OVERVIEW */}
        <section className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 lg:gap-16 items-start mb-16 md:mb-24">
          {/* Cover & Specs */}
          <div className="flex flex-col gap-6">
            <ClearRefractiveCover src={ep.coverImage} size={380} />
            
            {/* Quick Specs Card */}
            <div className="bg-primary/[0.03] backdrop-blur-md p-5 rounded-2xl grid grid-cols-3 gap-3 text-center">
              <div className="space-y-0.5">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-secondary/70">Format</span>
                <span className="block text-sm font-medium uppercase text-primary">EP</span>
              </div>
              <div className="space-y-0.5 px-2">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-secondary/70">Tracks</span>
                <span className="block text-sm font-medium uppercase text-primary">{(ep.songs || []).length} Tracks</span>
              </div>
              <div className="space-y-0.5">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-secondary/70">Year</span>
                <span className="block text-sm font-medium uppercase text-primary">{ep.releaseYear}</span>
              </div>
            </div>
          </div>

          {/* Details & Concept Overview */}
          <div className="flex flex-col justify-start gap-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue font-mono text-[10px] uppercase tracking-widest font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
                {ep.id === "2" ? "Coming Soon" : "Released"} {ep.releaseYear}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-secondary/60">
                Extended Play
              </span>
            </div>

            {/* Typeface SVG or Title */}
            {ep.typefaceImage ? (
              <div className="relative w-full h-44 sm:h-56 md:h-72 lg:h-80 xl:h-96 select-none pointer-events-none flex items-center justify-start my-2 sm:my-4">
                <img
                  src={ep.typefaceImage}
                  alt={ep.title}
                  className="w-full h-full object-contain object-left release-typeface-img drop-shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                />
                <h1 className="sr-only">{ep.title}</h1>
              </div>
            ) : (
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tighter uppercase leading-[0.85] text-primary my-2">
                {ep.title}
              </h1>
            )}

            <div className="space-y-1">
              <p className="font-mono text-[11px] uppercase tracking-widest text-secondary">
                Artist: <span className="text-primary font-medium">Leon Nduati (Klense)</span>
              </p>
            </div>

            {/* Liner Notes / Concept Overview */}
            {ep.description && (
              <div className="space-y-4 pt-2">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-blue font-semibold flex items-center gap-2">
                  <FiDisc size={13} /> Concept & Liner Notes
                </h3>
                {(() => {
                  const text = ep.description;
                  const dotIndex = text.indexOf('.');
                  if (dotIndex === -1) {
                    return (
                      <p className="text-base sm:text-lg font-light leading-relaxed text-primary/90">
                        {text}
                      </p>
                    );
                  }
                  const firstSentence = text.substring(0, dotIndex + 1);
                  const remainingText = text.substring(dotIndex + 1).trim();
                  return (
                    <div className="space-y-3 pl-4 md:pl-5">
                      <p className="text-base sm:text-lg md:text-xl font-light leading-snug text-primary">
                        {firstSentence}
                      </p>
                      {remainingText && (
                        <p className="text-sm sm:text-base font-light leading-relaxed text-secondary/90">
                          {remainingText}
                        </p>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </section>

        {/* TRACKLIST - Pure natural page flow, borderless aesthetic */}
        <section className="w-full">
          <div className="flex items-end justify-between pb-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light uppercase tracking-tight text-primary">
                Tracklist
              </h2>
              <p className="font-mono text-[10px] uppercase tracking-widest text-secondary/70 mt-1">
                Select a track to listen and inspect lyrics & notes
              </p>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent-blue font-medium">
              {(ep.songs || []).length} Tracks
            </span>
          </div>

          {/* Tracklist Items - Borderless */}
          <div className="space-y-2.5">
            {(ep.songs || []).map((track: any, i: number) => {
              const isActive = activeTrackId === track.id;
              const hasLyrics = track.lyrics && track.lyrics.length > 0;
              const hasAudio = !!track.audioUrl;

              return (
                <div 
                  key={track.id} 
                  className={`rounded-2xl transition-all duration-300 ${isActive ? 'bg-primary/[0.05] shadow-lg' : 'bg-primary/[0.015] hover:bg-primary/[0.035]'}`}
                >
                  <button 
                    onClick={() => setActiveTrackId(isActive ? null : track.id)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left transition-colors"
                  >
                    <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                      <span className={`font-mono text-sm sm:text-base transition-colors ${isActive ? 'text-accent-blue font-semibold' : 'text-secondary/50'}`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <h4 className={`text-base sm:text-lg md:text-xl font-light uppercase tracking-tight truncate transition-colors ${isActive ? 'text-primary font-normal' : 'text-primary/80'}`}>
                          {track.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                      {hasAudio && (
                        <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent-blue/10 text-accent-blue font-mono text-[9px] uppercase tracking-wider">
                          <FiVolume2 size={11} /> Audio
                        </span>
                      )}
                      {hasLyrics && (
                        <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/5 text-secondary font-mono text-[9px] uppercase tracking-wider">
                          <FiMusic size={11} /> Lyrics
                        </span>
                      )}
                      <span className="font-mono text-xs text-secondary/60">
                        {track.duration}
                      </span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${isActive ? 'bg-accent-blue text-white rotate-180' : 'text-secondary/60 hover:text-primary'}`}>
                        <FiChevronDown size={16} />
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-6 pb-6 pt-2">
                          {hasAudio && (
                            <MiniAudioPlayer 
                              src={track.audioUrl} 
                              title={`${track.title} - Klense`} 
                              durationString={track.duration} 
                            />
                          )}
                          <LyricsComponent lyrics={track.lyrics} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      </Container>
    </main>
  );
}
