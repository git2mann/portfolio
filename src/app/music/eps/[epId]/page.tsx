'use client';

import { useParams } from 'next/navigation';
import Container from "@/app/_components/container";
import { useState, useEffect } from "react";
import LyricsComponent from "@/app/_components/LyricsComponent";
import { epLyrics } from "@/data/lyrics/eps";
import { eps as epsData } from "@/data/music";
import type { Song } from '@/interfaces/music';
import InstructionPopup from "@/app/_components/InstructionPopup";
import Image from "next/image";
import Tilt from 'react-parallax-tilt';


function injectLyrics(eps: any[], epLyrics: Record<string, Record<string, any[]>>) {
  return eps.map((ep) => {
    const lyricsForEp = epLyrics[ep.id] || {};
    // Use tracks from epsData and map to Song objects
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

export default function EPPage() {
  const params = useParams();
  const epId = params?.epId as string | undefined;
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const ep = eps.find((e) => e.id === epId);

  // Calculate total EP duration
  const calculateEpDuration = (songs: { duration: string }[]) => {
    let totalSeconds = 0;
    songs.forEach((song) => {
      const [minutes, seconds] = song.duration.split(":").map(Number);
      totalSeconds += minutes * 60 + seconds;
    });
    const totalMinutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${totalMinutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  const epDuration = ep ? calculateEpDuration(ep.songs) : "0:00";

  if (!ep) {
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
            {/* Use a left arrow icon for consistency */}
            <span className="inline-block mr-2">&#8592;</span> Back to Archive
         </button>
         <div className="hidden md:block font-mono text-[10px] uppercase tracking-[0.2em] text-textSecondary dark:text-gray-400">
            SEC. EP-{ep.id.padStart(3, '0')} // AUDIO_FILE
         </div>
      </div>

      <Container>
        <div className="max-w-[1600px] mx-auto py-12 px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-12 items-start">
            {/* --- LEFT COLUMN: THE MONOLITH (EP Metadata) --- */}
            <div className="lg:sticky lg:top-24 flex flex-col gap-0 border-4 border-borderPrimary bg-bgPanel shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] dark:border-[#222] dark:bg-[#222]">
              {/* Cover Image */}
              <div className="relative aspect-square w-full border-b-4 border-borderPrimary bg-black group overflow-hidden dark:border-[#222]">
                <Image
                  src={ep.coverImage}
                  alt={`Cover of ${ep.title}`}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Vinyl Texture Overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/assets/noise.png')]" />
                {/* Play Button Overlay */}
                <a 
                   href={`https://album.link/${ep.id === '1' ? 'some-of-ink-klense' : 'sataop-klense'}`}
                   target="_blank"
                   rel="noreferrer"
                   className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20"
                >
                   <div className="w-20 h-20 bg-accentPrimary border-4 border-borderPrimary flex items-center justify-center hover:scale-110 transition-transform cursor-pointer dark:bg-[#FF3B30] dark:border-black">
                      <span className="text-white text-3xl font-black">▶</span>
                   </div>
                </a>
              </div>
              {/* EP Data Panel */}
              <div className="p-8 bg-bgSubtle dark:bg-[#181818]">
                <div className="flex justify-between items-start mb-6">
                   <div className="flex flex-col gap-1">
                      <span className="bg-black text-white px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest inline-block w-fit dark:bg-white dark:text-black">
                         Official Release
                      </span>
                      <span className="font-mono text-xs text-textSecondary uppercase tracking-widest dark:text-gray-400">
                         Ref: {ep.releaseYear}
                      </span>
                   </div>
                   <span className="w-8 h-8 text-accentSecondary animate-[spin_10s_linear_infinite] dark:text-[#2B4592] text-3xl">●</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black uppercase leading-[0.9] tracking-tighter mb-6">
                  {ep.title}
                </h1>
                <div className="grid grid-cols-2 gap-4 border-t-2 border-borderPrimary pt-6 mb-6 dark:border-[#222]">
                   <div>
                      <p className="font-mono text-[10px] uppercase text-textSecondary mb-1 dark:text-gray-400">Total Runtime</p>
                      <p className="text-xl font-bold flex items-center gap-2">{epDuration}</p>
                   </div>
                   <div>
                      <p className="font-mono text-[10px] uppercase text-textSecondary mb-1 dark:text-gray-400">Track Count</p>
                      <p className="text-xl font-bold">{ep.songs.length}</p>
                   </div>
                </div>
                <div className="prose prose-sm prose-p:font-medium prose-p:leading-relaxed text-textSecondary border-l-4 border-accentPrimary pl-4 dark:text-gray-300 dark:border-[#FF3B30]">
                   <p>{ep.description}</p>
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
            {/* --- RIGHT COLUMN: THE TRACKLIST (The "File System") --- */}
            <div className="w-full">
              <div className="flex items-end gap-4 mb-8 border-b-4 border-borderPrimary pb-4 dark:border-[#222]">
                 <h2 className="text-6xl font-black uppercase tracking-tighter leading-none">Index</h2>
                 <span className="font-mono text-xs uppercase tracking-widest mb-2 text-accentSecondary dark:text-[#2B4592]">/// Audio_Files</span>
              </div>
              <div className="flex flex-col border-t-2 border-borderPrimary dark:border-[#222]">
                {ep.songs.map((song: Song, index: number) => (
                  <div key={song.id} className="group border-b-2 border-borderPrimary bg-bgSubtle hover:bg-bgPanel transition-colors duration-200 dark:border-[#222] dark:bg-[#181818] dark:hover:bg-[#222]">
                    {/* Track Row */}
                    <button
                      onClick={() => setSelectedTrack(selectedTrack === song.id ? null : song.id)}
                      className="w-full flex items-center justify-between p-4 md:p-6 outline-none text-left"
                    >
                      <div className="flex items-center gap-6 md:gap-8">
                         <span className="font-mono text-xl font-bold text-textTertiary group-hover:text-accentPrimary transition-colors dark:text-gray-600 dark:group-hover:text-[#FF3B30]">
                            {(index + 1).toString().padStart(2, '0')}
                         </span>
                         <div>
                            <span className="text-xl md:text-3xl font-bold uppercase tracking-tight group-hover:ml-2 transition-all duration-300 block">
                               {song.title}
                            </span>
                         </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <span className="font-mono text-xs md:text-sm font-bold text-textSecondary dark:text-gray-400">{song.duration}</span>
                         <span className={`w-5 h-5 transition-transform duration-300 ${selectedTrack === song.id ? 'rotate-180 text-accentPrimary dark:text-[#FF3B30]' : 'text-textTertiary group-hover:text-black dark:text-gray-600 dark:group-hover:text-white'}`}>▼</span>
                      </div>
                    </button>
                    {/* Expandable Content Area */}
                    <div 
                       className={`
                          overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] 
                          ${selectedTrack === song.id ? 'max-h-[2000px] border-t-2 border-dashed border-borderPrimary dark:border-[#222]' : 'max-h-0'}
                       `}
                    >
                       <div className="p-4 md:p-8 bg-bgPanel dark:bg-[#222]">
                          {/* Inner Tabs / Controls */}
                          <div className="flex gap-4 mb-8">
                             <button className="bg-black text-white px-4 py-2 font-mono text-xs uppercase tracking-widest hover:bg-accentPrimary transition-colors dark:bg-white dark:text-black dark:hover:bg-[#FF3B30] dark:hover:text-white">
                                Lyrics_Mode
                             </button>
                             <button 
                                onClick={() => setSelectedNote(selectedNote === song.id ? null : song.id)}
                                className="border-2 border-borderPrimary px-4 py-2 font-mono text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors dark:border-white dark:hover:bg-white dark:hover:text-black"
                             >
                                {selectedNote === song.id ? 'Hide_Data' : 'View_Data'}
                             </button>
                          </div>
                          {/* Lyrics Component Injection */}
                          <div className="relative pl-4 md:pl-8 border-l-4 border-accentSecondary dark:border-[#2B4592]">
                             <LyricsComponent lyrics={song.lyrics} />
                          </div>
                          {/* Track Breakdown Note */}
                          {selectedNote === song.id && (
                             <div className="mt-8 p-6 bg-accentTertiary border-2 border-borderPrimary shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:bg-[#F4B400] dark:border-black">
                                <div className="font-mono text-xs uppercase tracking-widest mb-2 border-b border-borderPrimary pb-1 w-fit dark:border-black">Author Note</div>
                                <p className="font-medium text-lg leading-relaxed">
                                  {ep.id === "1" && song.id === "1" ? (
                                    "Back Again, Again serves as a reimagined version of the original 'Back Again' from Klense's debut album. This updated rendition preserves the core energy of the original while introducing new production elements and refined lyrics. The track encapsulates Klense's artistic growth since his early work, demonstrating how his technical abilities have evolved while maintaining his authentic voice."
                                  ) : (
                                    `Technical breakdown for ${song.title} is currently encrypted. Please reference the full EP manifest.`
                                  )}
                                </p>
                             </div>
                          )}
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}