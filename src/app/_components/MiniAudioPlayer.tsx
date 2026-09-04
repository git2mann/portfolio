'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface MiniAudioPlayerProps {
  src: string;
  title?: string;
  durationString?: string;
}

export default function MiniAudioPlayer({ src, title, durationString }: MiniAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setHasError(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = () => {
      setHasError(true);
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [src]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn('Audio playback error:', e);
        setIsPlaying(false);
      });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = Number(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (hasError) {
    return null;
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full my-4 p-3.5 sm:p-4 rounded-2xl bg-primary/[0.03] backdrop-blur-md shadow-md transition-all">
      <audio ref={audioRef} src={src} preload="metadata" />
      
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-accent-blue text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform flex-shrink-0"
        >
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="translate-x-0.5" />}
        </button>

        {/* Info & Scrubber */}
        <div className="flex-grow min-w-0 flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-accent-blue font-semibold truncate">
                {title || 'Audio Stream'}
              </span>
              {/* Animated Equalizer bars when playing */}
              {isPlaying && (
                <span className="inline-flex items-end gap-0.5 h-3">
                  <span className="w-0.5 bg-accent-blue animate-[pulse_0.6s_ease-in-out_infinite] h-full" />
                  <span className="w-0.5 bg-accent-blue animate-[pulse_0.9s_ease-in-out_infinite] h-2" />
                  <span className="w-0.5 bg-accent-blue animate-[pulse_0.4s_ease-in-out_infinite] h-3" />
                </span>
              )}
            </div>

            <div className="font-mono text-[10px] sm:text-xs text-secondary/70 whitespace-nowrap">
              <span>{formatTime(currentTime)}</span>
              <span className="mx-1">/</span>
              <span>{duration > 0 ? formatTime(duration) : (durationString || '0:00')}</span>
            </div>
          </div>

          {/* Timeline slider */}
          <div className="relative flex items-center w-full group">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              disabled={duration === 0}
              aria-label="Seek audio"
              className="w-full h-1.5 bg-primary/10 rounded-lg appearance-none cursor-pointer accent-accent-blue hover:h-2 transition-all focus:outline-none"
              style={{
                background: `linear-gradient(to right, var(--accent-blue) ${progress}%, rgba(128,128,128,0.2) ${progress}%)`
              }}
            />
          </div>
        </div>

        {/* Mute Toggle */}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          className="w-8 h-8 rounded-full flex items-center justify-center text-secondary hover:text-primary transition-colors flex-shrink-0 opacity-60 hover:opacity-100"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </div>
  );
}
