
'use client';

import { useParams } from 'next/navigation';
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { Album } from "@/interfaces/music";
import { useState } from 'react';
import Image from 'next/image';
import LyricsBlock from '@/app/_components/lyrics-block';

const albums: Album[] = [
  {
    id: "1",
    title: "Squealer and the Aggressors of Peace",
    coverImage: "/assets/music-assets/SQUEALER AND THE AGGRESSORS OF PEACE Album Cover.jpeg",
    releaseYear: "2023",
    description: "A groundbreaking album that pushes boundaries and challenges conventions.",
    songs: [
      {
        id: "1",
        title: "Roast",
        year: "2023",
        audioUrl: "/assets/music/sataop-klense-mp3s/Roast - Klense.mp3",
        lyrics: [
          {
            id: "1",
            text: "What you got?",
            explanation: "A direct challenge to competitors, questioning their abilities and authenticity."
          },
          {
            id: "2",
            text: "I just want you to know that as far as things go\nIf I never said it before\nThat I know I'm always the GOAT",
            explanation: "Expressing confidence and establishing dominance in the current state of affairs."
          }
        ]
      }
    ]
  },
  {
    id: "2",
    title: "Moths and Pretty Lights",
    coverImage: "/assets/music-assets/MOTHS AND PRETTY LIGHTS Album Cover.jpeg",
    releaseYear: "2025",
    description: "An exploration of obsession, illusion, and the beauty in self-destruction.",
    songs: [
      {
        id: "1",
        title: "Phantom Glow",
        year: "2025",
        audioUrl: "/assets/music/moths-klense-mp3s/Phantom Glow - Klense.mp3",
        lyrics: [
          {
            id: "1",
            text: "Chasing after shadows, drawn to the neon burn",
            explanation: "Symbolizing the allure of fleeting beauty and the dangers of obsession."
          }
        ]
      }
    ]
  },
  {
    id: "3",
    title: "Stillness Amidst",
    coverImage: "/assets/music-assets/STILLNESS AMIDST Album Cover.jpeg",
    releaseYear: "2024",
    description: "A deep dive into the paradox of chaos and calm in modern life.",
    songs: [
      {
        id: "1",
        title: "Brain Fog",
        year: "2024",
        audioUrl: "/assets/music/stillness-klense-mp3s/Brain Fog - Klense.mp3",
        lyrics: [
          {
            id: "1",
            text: "Words are swimming but they never land",
            explanation: "Capturing the feeling of mental exhaustion and disorientation."
          }
        ]
      }
    ]
  }
];

export default function AlbumPage() {
  const params = useParams();
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  
  const album = albums.find(a => a.id === params.albumId);
  
  if (!album) {
    return <div>Album not found</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-100 to-white dark:from-slate-900 dark:to-slate-800">
      <Container>
        <Header />
        <div className="max-w-6xl mx-auto py-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative w-full md:w-96 aspect-square">
              <Image
                src={album.coverImage}
                alt={album.title}
                fill
                className="object-cover rounded-lg shadow-xl"
                sizes="(max-width: 768px) 100vw, 384px"
              />
            </div>
            
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{album.title}</h1>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-6">{album.releaseYear}</p>
              <p className="text-lg mb-8">{album.description}</p>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-4">Tracks</h2>
                {album.songs.map((song) => (
                  <div key={song.id} className="border-b border-neutral-200 dark:border-neutral-700 last:border-0">
                    <button
                      onClick={() => setSelectedSong(selectedSong === song.id ? null : song.id)}
                      className="w-full py-4 px-6 text-left hover:bg-neutral-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg">{song.title}</span>
                        <span className="text-sm text-neutral-500">{song.year}</span>
                      </div>
                    </button>
                    
                    {selectedSong === song.id && (
                      <div className="p-6 bg-neutral-50 dark:bg-slate-800 rounded-lg mb-4">
                        <LyricsBlock lyrics={song.lyrics} />
                      </div>
                    )}
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
