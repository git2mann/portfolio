'use client';

import { useState } from 'react';
import { Annotation } from '@/interfaces/music';

type LyricsBlockProps = {
  lyrics: Annotation[];
};

export default function LyricsBlock({ lyrics }: LyricsBlockProps) {
  const [selectedAnnotation, setSelectedAnnotation] = useState<string | null>(null);

  return (
    <div className="lyrics-container space-y-6">
      {lyrics.map((annotation) => (
        <div key={annotation.id} className="lyric-block">
          <div
            className={`text-lg cursor-pointer p-4 rounded-lg transition-colors ${
              selectedAnnotation === annotation.id
                ? 'bg-blue-100 dark:bg-blue-900'
                : 'hover:bg-neutral-100 dark:hover:bg-slate-700'
            }`}
            onClick={() => setSelectedAnnotation(annotation.id === selectedAnnotation ? null : annotation.id)}
          >
                {annotation.lines.join(' ')}
          </div>
          {selectedAnnotation === annotation.id && (
            <div className="mt-2 p-4 bg-neutral-50 dark:bg-slate-800 rounded-lg">
              <p className="text-neutral-700 dark:text-neutral-300">{annotation.explanation}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
