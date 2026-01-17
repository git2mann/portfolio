'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Album, Song } from '@/interfaces/music';

import LyricsComponent from './LyricsComponent';

export default function AlbumSection({ album }: { album: Album }) {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  return (
    <div className="album-section mb-16">
      <div className="flex items-center gap-6 mb-8">
        <div className="relative w-48 h-48">
          <Image
            src={album.coverImage}
            alt={album.title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            quality={70}
            placeholder="blur"
            blurDataURL="/assets/placeholder.png"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold">{album.title}</h2>
          <p className="text-neutral-600 dark:text-neutral-400">{album.releaseYear}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="songs-list">
          <h3 className="text-xl font-semibold mb-4">Tracks</h3>
          <div className="space-y-2">
            {album.songs.map((song) => (
              <button
                key={song.id}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedSong?.id === song.id
                    ? 'bg-blue-100 dark:bg-blue-900'
                    : 'hover:bg-neutral-100 dark:hover:bg-slate-700'
                }`}
                onClick={() => setSelectedSong(song.id === selectedSong?.id ? null : song)}
              >
                {song.title}
              </button>
            ))}
          </div>
        </div>

        {selectedSong && (
            <div className="lyrics-section">
              <h3 className="text-xl font-semibold mb-4">{selectedSong.title} Lyrics</h3>
              <LyricsComponent lyrics={selectedSong.lyrics} />
            </div>
        )}
      </div>
    </div>
  );
}
