"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/app/_components/container";
import ClearRefractiveCover from "@/app/_components/ClearRefractiveCover";
import { 
  FiArrowLeft, 
  FiDisc, 
  FiDownload, 
  FiExternalLink, 
  FiCheck, 
  FiCopy 
} from "react-icons/fi";

const GUMROAD_LINK = "https://klense.gumroad.com/l/wdill-album";
const COVER_IMAGE = "/assets/music-assets/WhatDoILookLikeCover.webp";
const BLUR_IMAGE = "/assets/music-assets/WhatDoILookLikeCover-blur.webp";

const DISC_1_TRACKS = [
  { number: "1", title: "Bad at Being Bad", duration: "1:47" },
  { number: "2", title: "As You Know", duration: "2:59" },
  { number: "3", title: "What's Changed?", duration: "3:12" },
  { number: "4", title: "Snail's In The Haus (Interlude)", duration: "1:08" },
  { number: "5", title: "Wochiwau?", duration: "2:32" },
  { number: "6", title: "Been Okay", duration: "2:03" },
];

const DISC_2_TRACKS = [
  { number: "7", title: "Radiostyle", duration: "3:23" },
  { number: "8", title: "Ye Wounded Dog", duration: "3:50" },
  { number: "9", title: "You Never Seem There, Saul", duration: "3:05" },
  { number: "10", title: "Tellin' 'Em", duration: "2:15" },
  { number: "11", title: "Pain Demands to be Felt", duration: "4:00" },
];

export default function WhatDoILookLikeClient() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(GUMROAD_LINK).catch(() => {});
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background-primary text-primary font-noto-display-condensed relative pb-24">
      {/* Background Atmosphere - Memory-optimized for Mobile Safari */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 z-0" style={{ transform: "translate3d(0, 0, 0)" }}>
          <Image 
            src={BLUR_IMAGE} 
            alt="" 
            fill 
            sizes="(max-width: 768px) 100vw, 50vw" 
            className="object-cover scale-110 md:scale-125 blur-2xl md:blur-[100px] opacity-20" 
            priority 
          />
        </div>
        <div 
          className="absolute inset-0 z-10 opacity-[0.12] mix-blend-overlay pointer-events-none" 
          style={{ backgroundImage: "url(/noise.png)" }}
        />
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-background-primary/30 via-background-primary/85 to-background-primary" />
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
            Music / What Do I Look Like?
          </span>
        </div>

        {/* RELEASE HERO & OVERVIEW */}
        <section className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 lg:gap-16 items-start mb-16 md:mb-20">
          {/* Cover & Specs */}
          <div className="flex flex-col gap-6">
            <ClearRefractiveCover src={COVER_IMAGE} size={380} alt="What Do I Look Like?" priority />

            {/* Specs Card */}
            <div className="bg-primary/[0.03] backdrop-blur-md p-5 rounded-2xl grid grid-cols-3 gap-3 text-center">
              <div className="space-y-0.5">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-secondary/70">Format</span>
                <span className="block text-sm font-medium uppercase text-primary">2-Disc LP</span>
              </div>
              <div className="space-y-0.5 px-2">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-secondary/70">Tracks</span>
                <span className="block text-sm font-medium uppercase text-primary">11 Songs</span>
              </div>
              <div className="space-y-0.5">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-secondary/70">Year</span>
                <span className="block text-sm font-medium uppercase text-primary">2026</span>
              </div>
            </div>

            {/* Direct Download Card */}
            <div className="bg-primary/[0.03] backdrop-blur-md p-5 rounded-2xl space-y-3">
              <div className="space-y-1">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-secondary/70">
                  Model
                </span>
                <p className="text-xs text-secondary/90 leading-relaxed">
                  Pay what you want. Download for free ($0) or pay whatever amount you want.
                </p>
              </div>
              <a
                href={GUMROAD_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent-blue text-white hover:bg-accent-blue/90 text-xs font-mono uppercase tracking-widest font-medium transition-all active:scale-95"
              >
                <FiDownload size={14} /> Download Album
              </a>
            </div>
          </div>

          {/* Details & Concept Overview */}
          <div className="flex flex-col justify-start gap-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue font-mono text-[10px] uppercase tracking-widest font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
                Pay-What-You-Want
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-secondary/60">
                Hip-Hop/Rap • 2026
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tighter uppercase leading-[0.85] text-primary my-2">
              What Do I Look Like?
            </h1>

            <div className="space-y-1">
              <p className="font-mono text-[11px] uppercase tracking-widest text-secondary">
                Artist: <span className="text-primary font-medium">Leon Nduati (Klense)</span>
              </p>
            </div>

            {/* Concept & Liner Notes */}
            <div className="space-y-4 pt-2">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-blue font-semibold flex items-center gap-2">
                <FiDisc size={13} /> Concept & Liner Notes
              </h3>
              <div className="space-y-4 pl-4 md:pl-5">
                <p className="text-base sm:text-lg md:text-xl font-light leading-snug text-primary">
                  This album lived as one of many scrapped projects I've created and merely sat on.
                </p>
                <p className="text-sm sm:text-base font-light leading-relaxed text-secondary/90">
                  I spent months building out these two discs, questioning the ideas, re-working the arrangements, and constantly second-guessing what version of myself was showing up on the record. Eventually, as newer sounds arrived and newer obsessions took over, I simply shelved it. It joined the quiet pile of finished and half-finished records that never left my laptop.
                </p>
                <p className="text-sm sm:text-base font-light leading-relaxed text-secondary/90">
                  Keeping music locked away because it missed some arbitrary release window never made sense. Rather than letting it sit on a hard drive indefinitely, I'm putting it out here as it was.
                </p>
                <p className="text-sm sm:text-base font-light leading-relaxed text-secondary/90">
                  As always, the release is on a pay-what-you-want model: you can literally download the album for free ($0) or pay whatever amount you want to.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DOWNLOAD LINK SECTION */}
        <section className="bg-primary/[0.02] backdrop-blur-md rounded-2xl p-6 sm:p-8 mb-16 md:mb-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-light uppercase tracking-tight text-primary">
              Download Album
            </h3>
            <p className="text-sm font-light text-secondary/90 leading-relaxed">
              Available on Gumroad as a pay-what-you-want release. You can enter <strong className="text-primary font-medium">$0</strong> to download the entire album for free, or pay whatever amount you want to support.
            </p>
            <div className="pt-2 text-xs font-mono text-secondary/60 truncate max-w-full">
              {GUMROAD_LINK}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary/[0.04] hover:bg-primary/[0.08] text-primary font-mono text-xs uppercase tracking-wider transition-all active:scale-95"
            >
              {copied ? <FiCheck size={14} className="text-emerald-500" /> : <FiCopy size={14} />}
              <span>{copied ? "Copied Link" : "Copy Link"}</span>
            </button>
            <a
              href={GUMROAD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent-blue text-white hover:bg-accent-blue/90 font-mono text-xs uppercase tracking-widest font-medium transition-all active:scale-95"
            >
              <span>Get on Gumroad</span>
              <FiExternalLink size={13} />
            </a>
          </div>
        </section>

        {/* TRACKLIST */}
        <section className="w-full">
          <div className="flex items-end justify-between pb-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light uppercase tracking-tight text-primary">
                Tracklist
              </h2>
              <p className="font-mono text-[10px] uppercase tracking-widest text-secondary/70 mt-1">
                2 Discs • 11 Songs • 30 Minutes
              </p>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent-blue font-medium">
              11 Tracks
            </span>
          </div>

          <div className="space-y-8">
            {/* DISC 1 */}
            <div>
              <div className="border-b border-primary/10 pb-2 mb-3">
                <span className="font-mono text-xs uppercase tracking-widest text-secondary/70">
                  DISC 1
                </span>
              </div>
              <div className="space-y-2">
                {DISC_1_TRACKS.map((track) => (
                  <div 
                    key={track.number}
                    className="rounded-2xl bg-primary/[0.015] hover:bg-primary/[0.035] transition-colors p-4 sm:p-5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                      <span className="font-mono text-sm sm:text-base text-secondary/50">
                        {track.number}
                      </span>
                      <h4 className="text-base sm:text-lg md:text-xl font-light uppercase tracking-tight truncate text-primary/80">
                        {track.title}
                      </h4>
                    </div>
                    <span className="font-mono text-xs text-secondary/60">
                      {track.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* DISC 2 */}
            <div>
              <div className="border-b border-primary/10 pb-2 mb-3">
                <span className="font-mono text-xs uppercase tracking-widest text-secondary/70">
                  DISC 2
                </span>
              </div>
              <div className="space-y-2">
                {DISC_2_TRACKS.map((track) => (
                  <div 
                    key={track.number}
                    className="rounded-2xl bg-primary/[0.015] hover:bg-primary/[0.035] transition-colors p-4 sm:p-5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                      <span className="font-mono text-sm sm:text-base text-secondary/50">
                        {track.number}
                      </span>
                      <h4 className="text-base sm:text-lg md:text-xl font-light uppercase tracking-tight truncate text-primary/80">
                        {track.title}
                      </h4>
                    </div>
                    <span className="font-mono text-xs text-secondary/60">
                      {track.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
