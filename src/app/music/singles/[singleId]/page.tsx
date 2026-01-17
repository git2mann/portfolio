'use client';

import { useParams } from 'next/navigation';
import Container from "@/app/_components/container";
import { singles } from "@/data/music"; // Corrected import path
import { useState, useEffect } from "react";
import LyricsComponent from "@/app/_components/LyricsComponent";
import { singleLyrics } from "@/data/lyrics/singles";
import InstructionPopup from "@/app/_components/InstructionPopup";
import Image from "next/image";
import Tilt from 'react-parallax-tilt';



export default function SinglePage() {
  const params = useParams<{ singleId: string }>();
  const singleId = params?.singleId;
  const single = singles.find((s) => s.id === singleId);
  const lyrics = singleId && singleLyrics[singleId] ? singleLyrics[singleId] : [];
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  if (!single) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-bgPrimary dark:bg-[#181818]">
        <div className="border-4 border-borderPrimary dark:border-[#222] p-12 bg-bgPanel dark:bg-[#222] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center">
           <h1 className="text-4xl font-black uppercase mb-4 text-textPrimary dark:text-white">404: Not Found</h1>
           <p className="font-mono text-sm uppercase tracking-widest text-textSecondary dark:text-gray-400 mb-8">
             The requested record does not exist in the archives.
           </p>
           <button onClick={() => window.history.back()} className="bg-black text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-accentPrimary transition-colors">
              Return to Grid
           </button>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-bgPrimary text-textPrimary selection:bg-accentPrimary selection:text-white dark:bg-[#181818] dark:text-white">
      <InstructionPopup />
      {/* --- HEADER STRIP --- */}
      <div className="sticky top-0 z-50 bg-bgPrimary border-b-4 border-borderPrimary px-4 py-3 flex justify-between items-center dark:bg-[#181818] dark:border-[#222]">
         <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest hover:bg-black hover:text-white px-3 py-1 transition-colors border border-transparent hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white"
         >
            <span className="inline-block mr-2">&#8592;</span> Back to Archive
         </button>
         <div className="hidden md:block font-mono text-[10px] uppercase tracking-[0.2em] text-textSecondary dark:text-gray-400">
            SEC. SNG-{single.id.padStart(3, '0')} // AUDIO_FILE
         </div>
      </div>
      <Container>
        <div className="max-w-[1600px] mx-auto py-12 px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-12 items-start">
            {/* --- LEFT COLUMN: THE MONOLITH (Single Metadata) --- */}
            <div className="lg:sticky lg:top-24 flex flex-col gap-0 border-4 border-borderPrimary bg-bgPanel shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] dark:border-[#222] dark:bg-[#222]">
              {/* Cover Image */}
              <div className="relative aspect-square w-full border-b-4 border-borderPrimary bg-black group overflow-hidden dark:border-[#222]">
                <Image
                  src={single.coverImage}
                  alt={`Cover of ${single.title}`}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Vinyl Texture Overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/assets/noise.png')]" />
                {/* Play Button Overlay */}
                <a 
                   href={`https://song.link/${single.id === '1' ? 'allegory-freestyle-klense' : single.id === '2' ? 'eye-kan-klense' : 'first-interlude-klense'}`}
                   target="_blank"
                   rel="noreferrer"
                   className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20"
                >
                   <div className="w-20 h-20 bg-accentPrimary border-4 border-borderPrimary flex items-center justify-center hover:scale-110 transition-transform cursor-pointer dark:bg-[#FF3B30] dark:border-black">
                      <span className="text-white text-3xl font-black">▶</span>
                   </div>
                </a>
              </div>
              {/* Single Data Panel */}
              <div className="p-8 bg-bgSubtle dark:bg-[#181818]">
                <div className="flex justify-between items-start mb-6">
                   <div className="flex flex-col gap-1">
                      <span className="bg-black text-white px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest inline-block w-fit dark:bg-white dark:text-black">
                         Official Release
                      </span>
                      <span className="font-mono text-xs text-textSecondary uppercase tracking-widest dark:text-gray-400">
                         Ref: {single.releaseYear}
                      </span>
                   </div>
                   <span className="w-8 h-8 text-accentSecondary animate-[spin_10s_linear_infinite] dark:text-[#2B4592] text-3xl">●</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black uppercase leading-[0.9] tracking-tighter mb-6">
                  {single.title}
                </h1>
                <div className="grid grid-cols-2 gap-4 border-t-2 border-borderPrimary pt-6 mb-6 dark:border-[#222]">
                   <div>
                      <p className="font-mono text-[10px] uppercase text-textSecondary mb-1 dark:text-gray-400">Duration</p>
                      <p className="text-xl font-bold flex items-center gap-2">{single.duration}</p>
                   </div>
                   <div>
                      <p className="font-mono text-[10px] uppercase text-textSecondary mb-1 dark:text-gray-400">Release Year</p>
                      <p className="text-xl font-bold">{single.releaseYear}</p>
                   </div>
                </div>
                <div className="prose prose-sm prose-p:font-medium prose-p:leading-relaxed text-textSecondary border-l-4 border-accentPrimary pl-4 dark:text-gray-300 dark:border-[#FF3B30]">
                   <p><strong>{single.title}</strong> is a bold statement of Klense's artistry, blending intricate wordplay with a hard-hitting beat. This single showcases his ability to balance technical skill with raw emotion. The track dives into themes of self-confidence, perseverance, and artistic growth, offering listeners a glimpse into Klense's creative process and personal journey.</p>
                </div>
              </div>
              {/* Streaming Links Footer */}
              <div className="grid grid-cols-3 border-t-4 border-borderPrimary divide-x-2 divide-borderPrimary bg-black dark:border-[#222] dark:divide-[#222]">
                 <a href="#" className="h-12 flex items-center justify-center bg-bgPanel hover:bg-[#1DB954] hover:text-white transition-colors group dark:bg-[#222]">
                    <span className="font-bold uppercase text-xs tracking-widest group-hover:hidden">Spotify</span>
                    <img src="/assets/icons/icons8-spotify.svg" className="w-5 h-5 hidden group-hover:block filter brightness-0 invert" alt=""/>
                 </a>
                 <a href="#" className="h-12 flex items-center justify-center bg-bgPanel hover:bg-[#FA243C] hover:text-white transition-colors group dark:bg-[#222]">
                    <span className="font-bold uppercase text-xs tracking-widest group-hover:hidden">Apple</span>
                    <img src="/assets/icons/icons8-apple-music.svg" className="w-5 h-5 hidden group-hover:block filter brightness-0 invert" alt=""/>
                 </a>
                 <a href="#" className="h-12 flex items-center justify-center bg-bgPanel hover:bg-[#FF0000] hover:text-white transition-colors group dark:bg-[#222]">
                    <span className="font-bold uppercase text-xs tracking-widest group-hover:hidden">YouTube</span>
                    <img src="/assets/icons/icons8-youtube.svg" className="w-5 h-5 hidden group-hover:block filter brightness-0 invert" alt=""/>
                 </a>
              </div>
            </div>
            {/* --- RIGHT COLUMN: LYRICS & BREAKDOWN --- */}
            <div className="w-full">
              <div className="flex items-end gap-4 mb-8 border-b-4 border-borderPrimary pb-4 dark:border-[#222]">
                 <h2 className="text-6xl font-black uppercase tracking-tighter leading-none">Lyrics</h2>
                 <span className="font-mono text-xs uppercase tracking-widest mb-2 text-accentSecondary dark:text-[#2B4592]">/// Single_File</span>
              </div>
              <div className="flex flex-col border-t-2 border-borderPrimary dark:border-[#222]">
                <div className="group border-b-2 border-borderPrimary bg-bgSubtle hover:bg-bgPanel transition-colors duration-200 dark:border-[#222] dark:bg-[#181818] dark:hover:bg-[#222]">
                  {/* Expandable Content Area (always open for single) */}
                  <div className="p-4 md:p-8 bg-bgPanel dark:bg-[#222]">
                    {/* Inner Tabs / Controls */}
                    <div className="flex gap-4 mb-8">
                       <button className="bg-black text-white px-4 py-2 font-mono text-xs uppercase tracking-widest hover:bg-accentPrimary transition-colors dark:bg-white dark:text-black dark:hover:bg-[#FF3B30] dark:hover:text-white">
                          Lyrics_Mode
                       </button>
                       <button 
                          onClick={() => setSelectedNote(selectedNote === single.id ? null : single.id)}
                          className="border-2 border-borderPrimary px-4 py-2 font-mono text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors dark:border-white dark:hover:bg-white dark:hover:text-black"
                       >
                          {selectedNote === single.id ? 'Hide_Data' : 'View_Data'}
                       </button>
                    </div>
                    {/* Lyrics Component Injection */}
                    <div className="relative pl-4 md:pl-8 border-l-4 border-accentSecondary dark:border-[#2B4592]">
                       <LyricsComponent lyrics={lyrics} />
                    </div>
                    {/* Track Breakdown Note */}
                    {selectedNote === single.id && (
                       <div className="mt-8 p-6 bg-accentTertiary border-2 border-borderPrimary shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:bg-[#F4B400] dark:border-black">
                          <div className="font-mono text-xs uppercase tracking-widest mb-2 border-b border-borderPrimary pb-1 w-fit dark:border-black">Author Note</div>
                          <p className="font-medium text-lg leading-relaxed">
                            <strong>{single.title}</strong> features a production style that blends intricate beats with Klense's signature flow. The instrumental's dynamic bassline and melodic undertones complement the lyrical content perfectly, creating a cohesive listening experience that showcases Klense's growth as an artist.
                          </p>
                       </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}