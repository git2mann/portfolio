'use client';

import dynamic from "next/dynamic";

const WaveformPlayer = dynamic(() => import("@/app/_components/waveform-player"), {
  loading: () => (
    <div className="animate-pulse bg-neutral-200 dark:bg-slate-700 h-32 rounded-lg"></div>
  ),
});

type FeaturedTrackProps = {
  song: {
    title: string;
    lyrics: string;
    year: string;
    audioUrl: string;
    description: string;
    annotations: Array<{
      line: string;
      explanation: string;
    }>;
  };
};

export default function FeaturedTrack({ song }: FeaturedTrackProps) {
  return (
    <div className="bg-neutral-100 dark:bg-slate-800 rounded-lg p-8 md:p-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured Track</h2>
      
      {/* Waveform Player */}
      <div className="mb-8">
        <WaveformPlayer audioUrl={song.audioUrl} />
      </div>

      {/* Featured Lyric with Enhanced Animation */}
      <div className="relative overflow-hidden py-8 mb-8">
        <div className="typewriter-container relative">
          <p className="text-2xl md:text-3xl font-bold italic text-neutral-900 dark:text-neutral-100 typewriter-text">
            "{song.lyrics}"
          </p>
          <div className="typing-cursor"></div>
        </div>
        <p className="text-lg mt-4 text-neutral-600 dark:text-neutral-400">
          From the track <span className="font-semibold">"{song.title}"</span>, {song.year}
        </p>
      </div>

      {/* Lyrics Annotation */}
      <div className="bg-[var(--card-background)] rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">Behind the Lyrics</h3>
        {song.annotations.map((annotation, index) => (
          <div key={index} className="mb-4">
            <p className="font-semibold mb-2">"{annotation.line}"</p>
            <p className="text-[var(--text-secondary)]">{annotation.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
