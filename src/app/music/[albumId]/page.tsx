'use client';

import { useParams } from 'next/navigation';
import Container from "@/app/_components/container";
import { useState, useEffect } from 'react';
import LyricsComponent from '@/app/_components/LyricsComponent';
import { albumLyrics } from '@/data/lyrics/albums';
import type { Album, Song } from '@/interfaces/music';
import Image from 'next/image';
import InstructionPopup from "@/app/_components/InstructionPopup";
import { FiArrowLeft, FiClock, FiDisc, FiPlay, FiCornerDownRight } from 'react-icons/fi';

// Helper to inject lyrics
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
    description: "A concept album that pushes the signature Klense sound further.",
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
    description: "An introspective journey through soundscapes and storytelling.",
    songs: [
      { id: "1", title: "The Return (Intro)", duration: "0:30", audioUrl: "/assets/music/lazlo-klense-mp3s/The Return (Intro) - Klense.mp3", lyrics: [] },
      { id: "2", title: "Know About", duration: "1:43", audioUrl: "/assets/music/lazlo-klense-mp3s/Know About - Klense.mp3", lyrics: [] },
      { id: "3", title: "General Ike", duration: "2:15", audioUrl: "/assets/music/lazlo-klense-mp3s/General Ike - Klense.mp3", lyrics: [] },
      { id: "4", title: "Me, You (Mii Yu)", duration: "2:25", audioUrl: "/assets/music/lazlo-klense-mp3s/Me, You (Mii Yu) - Klense.mp3", lyrics: [] },
      { id: "5", title: "Lazlo's Camp", duration: "2:35", audioUrl: "/assets/music/lazlo-klense-mp3s/Lazlo's Camp - Klense.mp3", lyrics: [] },
      { id: "6", title: "S a t o r i", duration: "3:25", audioUrl: "/assets/music/lazlo-klense-mp3s/S a t o r i - Klense.mp3", lyrics: [] },
      { id: "7", title: "With U", duration: "3:20", audioUrl: "/assets/music/lazlo-klense-mp3s/With U - Klense.mp3", lyrics: [] },
      { id: "8", title: "Elay-AZ Theme", duration: "1:06", audioUrl: "/assets/music/lazlo-klense-mp3s/Elay-AZ Theme - Klense.mp3", lyrics: [] },
      { id: "9", title: "On Da Fens", duration: "3:20", audioUrl: "/assets/music/lazlo-klense-mp3s/On Da Fens - Klense.mp3", lyrics: [] }
    ]
  },
  {
    id: "3",
    title: "Son Of Ink",
    coverImage: "/assets/music-assets/Son Of Ink Album Cover.jpeg",
    releaseYear: "2021",
    description: "A deep dive into the paradox of chaos and calm in modern life.",
    songs: [
      { id: "1", title: "Back Again", duration: "3:17", audioUrl: "/assets/music/son-of-ink-klense-mp3s/Back Again - Klense.mp3", lyrics: [] },
      { id: "2", title: "Witness (Skit) (feat. Jeremy Olendo)", duration: "0:33", audioUrl: "/assets/music/son-of-ink-klense-mp3s/Witness (skit) (feat. Jeremy Olendo) - Klense.mp3", lyrics: [] },
      { id: "3", title: "Clarity (feat. Prescribed)", duration: "2:41", audioUrl: "/assets/music/son-of-ink-klense-mp3s/Clarity (feat. Prescribed) - Klense.mp3", lyrics: [] },
      { id: "4", title: "Ultimate", duration: "3:48", audioUrl: "/assets/music/son-of-ink-klense-mp3s/Ultimate - Klense.mp3", lyrics: [] },
      { id: "5", title: "Battle", duration: "1:54", audioUrl: "/assets/music/son-of-ink-klense-mp3s/Battle - Klense.mp3", lyrics: [] },
      { id: "6", title: "Something", duration: "3:18", audioUrl: "/assets/music/son-of-ink-klense-mp3s/Something - Klense.mp3", lyrics: [] },
      { id: "7", title: "Lunchtime (Freestyle)", duration: "1:17", audioUrl: "/assets/music/son-of-ink-klense-mp3s/Lunchtime (Freestyle) - Klense.mp3", lyrics: [] },
      { id: "8", title: "Local (Outro)", duration: "1:51", audioUrl: "/assets/music/son-of-ink-klense-mp3s/Local (Outro) - Klense.mp3", lyrics: [] }
    ],
  },
  {
    id: "4",
    title: "Half Thoughts",
    coverImage: "/assets/music-assets/HalfThoughts1Cover.png",
    releaseYear: "2025",
    description: `A sonic diary of incomplete ideas that found their voice. Across 16 tracks and 34 minutes, Klense weaves together alternative rock, jazz-tinged saxophone, alternative Hip-Hop, and ambient textures that feel both intimate and expansive.`,
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

export default function AlbumPage() {
  const params = useParams();
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);

  const album = params ? albumsData.find((a: Album) => a.id === params.albumId) : null;

  // Function to calculate total album duration
  const calculateAlbumDuration = (songs: { duration: string }[]) => {
    let totalSeconds = 0;
    songs.forEach((song) => {
      const [minutes, seconds] = song.duration.split(":").map(Number);
      totalSeconds += minutes * 60 + seconds;
    });
    const totalMinutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${totalMinutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const albumDuration = album ? calculateAlbumDuration(album.songs) : "0:00";

   if (!album) {
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
            <FiArrowLeft /> Back to Archive
         </button>
         <div className="hidden md:block font-mono text-[10px] uppercase tracking-[0.2em] text-textSecondary dark:text-gray-400">
            SEC. LP-{album.id.padStart(3, '0')} // AUDIO_FILE
         </div>
      </div>

      <Container>
        <div className="max-w-[1600px] mx-auto py-12 px-4 md:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-12 items-start">
            
            {/* --- LEFT COLUMN: THE MONOLITH (Album Metadata) --- */}
            <div className="lg:sticky lg:top-24 flex flex-col gap-0 border-4 border-borderPrimary bg-bgPanel shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] dark:border-[#222] dark:bg-[#222]">
              
              {/* Cover Image */}
              <div className="relative aspect-square w-full border-b-4 border-borderPrimary bg-black group overflow-hidden dark:border-[#222]">
                <Image
                  src={album.coverImage}
                  alt={`Cover of ${album.title}`}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Vinyl Texture Overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/assets/noise.png')]"></div>
                
                {/* Play Button Overlay */}
                <a 
                   href={`https://album.link/${album.id === '4' ? 'half-thoughts-klense' : 'sataop-klense'}`} // Generic link logic for demo
                   target="_blank"
                   rel="noreferrer"
                   className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20"
                >
                   <div className="w-20 h-20 bg-accentPrimary border-4 border-borderPrimary flex items-center justify-center hover:scale-110 transition-transform cursor-pointer dark:bg-[#FF3B30] dark:border-black">
                      <FiPlay className="w-8 h-8 text-white ml-1" />
                   </div>
                </a>
              </div>

              {/* Album Data Panel */}
              <div className="p-8 bg-bgSubtle dark:bg-[#181818]">
                <div className="flex justify-between items-start mb-6">
                   <div className="flex flex-col gap-1">
                      <span className="bg-black text-white px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest inline-block w-fit dark:bg-white dark:text-black">
                         Official Release
                      </span>
                      <span className="font-mono text-xs text-textSecondary uppercase tracking-widest dark:text-gray-400">
                         Ref: {album.releaseYear}
                      </span>
                   </div>
                   <FiDisc className="w-8 h-8 text-accentSecondary animate-[spin_10s_linear_infinite] dark:text-[#2B4592]" />
                </div>

                <h1 className="text-4xl md:text-5xl font-black uppercase leading-[0.9] tracking-tighter mb-6">
                  {album.title}
                </h1>

                <div className="grid grid-cols-2 gap-4 border-t-2 border-borderPrimary pt-6 mb-6 dark:border-[#222]">
                   <div>
                      <p className="font-mono text-[10px] uppercase text-textSecondary mb-1 dark:text-gray-400">Total Runtime</p>
                      <p className="text-xl font-bold flex items-center gap-2"><FiClock className="w-4 h-4"/> {albumDuration}</p>
                   </div>
                   <div>
                      <p className="font-mono text-[10px] uppercase text-textSecondary mb-1 dark:text-gray-400">Track Count</p>
                      <p className="text-xl font-bold">{album.songs.length}</p>
                   </div>
                </div>

                <div className="prose prose-sm prose-p:font-medium prose-p:leading-relaxed text-textSecondary border-l-4 border-accentPrimary pl-4 dark:text-gray-300 dark:border-[#FF3B30]">
                   <p>{album.description}</p>
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
                {album.songs.map((song: Song, index: number) => (
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
                         <FiCornerDownRight className={`w-5 h-5 transition-transform duration-300 ${selectedTrack === song.id ? 'rotate-180 text-accentPrimary dark:text-[#FF3B30]' : 'text-textTertiary group-hover:text-black dark:text-gray-600 dark:group-hover:text-white'}`} />
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
                                   {/* Content logic from previous file preserved here */}
                                   {album.id === "1" && song.id === "1" ? (
                                      "The opening sequence establishes the allegorical framework. Atmospheric tension meets narrative exposition."
                                   ) : (
                                      `Technical breakdown for ${song.title} is currently encrypted. Please reference the full album manifest.`
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