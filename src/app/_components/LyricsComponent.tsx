'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';

// --- TYPE DEFINITIONS ---
export interface LyricsGroup {
  lines: string[];
  explanation?: string;
}

export interface LyricsComponentProps {
  lyrics: LyricsGroup[];
}

// --- 1. THE GENERATIVE BAUHAUS ART ENGINE ---
// This component generates a unique SVG based on the text input
const GenerativeBauhaus = ({ text }: { text: string }) => {
  // Deterministic random number generator based on text
  const seed = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  }, [text]);

  // Derived properties from seed
  const hue = seed % 360; // Not used for strict Bauhaus, but good for variation
  const shapeType = seed % 3; // 0: Circle, 1: Rect, 2: Triangle pattern
  const rotation = (seed % 90) - 45;
  const lineCount = (seed % 5) + 3;
  
  // Bauhaus Palette
  const colors = ['#FF3B30', '#2B4592', '#F4B400', '#000000', '#F4F3EF'];
  const primaryColor = colors[seed % 3]; // Red, Blue, or Yellow
  const secondaryColor = colors[(seed + 1) % 3];

  return (
    <div className="w-full h-full overflow-hidden bg-[#F4F3EF] dark:bg-[#111] relative border-b-4 border-black dark:border-white">
      {/* Dynamic Grid Background */}
      <svg className="absolute inset-0 w-full h-full opacity-20" width="100%" height="100%">
        <pattern id={`grid-${seed}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill={`url(#grid-${seed})`} />
      </svg>

      {/* Main Composition */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-[120%] h-[120%] animate-spin-slow" style={{ animationDuration: '60s' }}>
          
          {/* Element 1: The Heavy Shape */}
          {shapeType === 0 && (
            <circle cx="100" cy="100" r={50 + (seed % 40)} fill={primaryColor} className="mix-blend-multiply dark:mix-blend-screen opacity-80" />
          )}
          {shapeType === 1 && (
            <rect x={50} y={50} width={100 + (seed % 40)} height={100} fill={primaryColor} transform={`rotate(${rotation} 100 100)`} className="mix-blend-multiply dark:mix-blend-screen opacity-80" />
          )}
          {shapeType === 2 && (
             <polygon points="100,20 180,180 20,180" fill={primaryColor} transform={`rotate(${rotation * -1} 100 100)`} className="mix-blend-multiply dark:mix-blend-screen opacity-80" />
          )}

          {/* Element 2: The Lines */}
          <g transform={`rotate(${rotation * 2} 100 100)`}>
            {Array.from({ length: lineCount }).map((_, i) => (
              <line 
                key={i} 
                x1="0" 
                y1={40 + (i * 20)} 
                x2="200" 
                y2={40 + (i * 20)} 
                stroke={secondaryColor} 
                strokeWidth={2 + (seed % 6)} 
              />
            ))}
          </g>

          {/* Element 3: The Contrast Accent */}
          <circle cx={150 - (seed % 100)} cy={50 + (seed % 100)} r="15" fill="black" className="dark:fill-white" />
        </svg>
      </div>

      {/* Overlay Text Texture */}
      <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase opacity-50 tracking-widest">
        GEN.SEED.{seed}
      </div>
    </div>
  );
};


// --- 2. MAIN COMPONENT ---

const LyricsComponent: React.FC<LyricsComponentProps> = ({ lyrics }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const lyricRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll selected lyric into view
  useEffect(() => {
    if (selectedIndex !== null && lyricRefs.current[selectedIndex]) {
      lyricRefs.current[selectedIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lyrics || lyrics.length === 0) return;
      if (document.activeElement && (document.activeElement as HTMLElement).tagName === 'INPUT') return;
      if (selectedIndex === null) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        setSelectedIndex(idx => (idx === null ? 0 : Math.min(idx + 1, lyrics.length - 1)));
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        setSelectedIndex(idx => (idx === null ? 0 : Math.max(idx - 1, 0)));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, lyrics]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('.mobile-modal') || target.closest('[data-lyric-btn]')) return;
      if (!target.closest('[data-bauhaus-interactive]')) {
        setSelectedIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!lyrics || lyrics.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[1800px] mx-auto py-16 px-6 lg:px-16 bg-[#F4F3EF] dark:bg-[#0A0A0A] text-black dark:text-[#F4F3EF] font-sans selection:bg-[#FF3B30] selection:text-white transition-colors duration-300"
    >
      
      {/* Desktop Architecture Lines */}
      <div className="absolute top-0 left-6 lg:left-16 bottom-0 w-[1px] bg-black/20 dark:bg-white/20 pointer-events-none" />
      <div className="hidden lg:block absolute top-0 right-[450px] bottom-0 w-[2px] bg-black dark:bg-white z-0 pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-end border-b-[4px] border-black dark:border-white pb-8 mb-16 pl-8 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 bg-[#FF3B30]"></div>
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase">Fig. 1 — Sequence</h2>
          </div>
          <div className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] uppercase">
            Lyrical Analysis
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-0 relative min-h-[50vh]">
        
        {/* --- LEFT COLUMN: LYRICS --- */}
        <div className="pl-8 lg:pr-16 pb-16 space-y-0 relative z-10 max-h-[70vh] overflow-y-auto">
          {lyrics.map((group, idx) => {
            const isActive = selectedIndex === idx;
            const isHovered = hoverIndex === idx;
            const hasAnnotation = !!group.explanation;
            return (
              <div
                key={idx}
                ref={(el) => { lyricRefs.current[idx] = el; }}
                className="group relative"
                data-bauhaus-interactive
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <div className="w-full h-[1px] bg-black/10 dark:bg-white/10 group-hover:bg-black dark:group-hover:bg-white transition-colors duration-200" />
                <button
                  data-lyric-btn
                  onClick={() => hasAnnotation && setSelectedIndex(idx)}
                  className={`
                    w-full text-left relative py-8 md:py-10 outline-none flex items-start gap-6
                    ${!hasAnnotation ? 'cursor-default' : 'cursor-pointer'}
                  `}
                  tabIndex={0}
                  aria-selected={isActive}
                >
                  {/* Marker */}
                  <div className={`
                    absolute left-[-2.5rem] md:left-[-3.5rem] top-1/2 -translate-y-1/2
                    flex flex-col gap-0 items-center justify-center
                    transition-all duration-300 ease-out
                    ${isActive ? 'opacity-100' : 'opacity-0'}
                  `}>
                    <div className="w-4 h-4 bg-[#FF3B30] rounded-none shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,1)]"></div>
                  </div>
                  
                  {/* Text and Explanation Side by Side */}
                  <div className="block w-full">
                    {group.lines.map((line, i) => (
                      <span
                        key={i}
                        className={`
                          block text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-[1.3] mb-1
                          transition-all duration-300 ease-out
                          ${isActive 
                            ? 'text-black dark:text-white translate-x-4' 
                            : isHovered && hasAnnotation
                              ? 'text-black dark:text-white translate-x-2'
                              : 'text-neutral-400 dark:text-neutral-600'
                          }
                        `}
                      >
                        {line}
                      </span>
                    ))}
                  </div>
                  
                </button>
              </div>
            );
          })}
        </div>

        {/* --- RIGHT COLUMN: DESKTOP PANEL --- */}
        <div className="hidden lg:block relative z-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-full pointer-events-auto">
            <div 
              className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
            >
              <div className={`
                  relative w-full border-l-0 border-t-2 border-r-2 border-b-2 border-black dark:border-white bg-[#F4F3EF] dark:bg-[#0A0A0A]
                  transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] origin-left
                  shadow-[24px_24px_0px_0px_rgba(0,0,0,1)] dark:shadow-[24px_24px_0px_0px_rgba(255,255,255,1)]
                  ${selectedIndex !== null ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0 pointer-events-none'}
              `}>
                {/* Desktop Panel Content (reusing simpler content here) */}
                <div className="h-6 w-full bg-black dark:bg-white flex border-b-2 border-black dark:border-white">
                  <div className="w-1/3 h-full bg-[#FF3B30]"></div>
                  <div className="w-1/3 h-full bg-[#2B4592]"></div> 
                  <div className="w-1/3 h-full bg-[#F4F3EF] dark:bg-[#0A0A0A]"></div>
                </div>
                <div className="p-8">
                    <div className="prose prose-lg prose-p:font-medium prose-p:text-black dark:prose-p:text-white prose-p:leading-[1.6]">
                    <p>{selectedIndex !== null ? lyrics[selectedIndex].explanation : ''}</p>
                    </div>
                </div>
                <div className="px-8 py-4 border-t-2 border-black dark:border-white bg-[#FF3B30] flex justify-between items-center">
                   <span className="font-mono text-[10px] uppercase text-white font-bold tracking-widest">Klense / Lyrics</span>
                   <button onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }} className="text-white font-black uppercase text-sm hover:underline">[ Close ]</button>
                </div>
              </div>
              <div className={`absolute top-16 -left-3 w-6 h-6 bg-[#F4F3EF] dark:bg-[#0A0A0A] border-l-2 border-b-2 border-black dark:border-white transform rotate-45 z-30 transition-all duration-300 delay-100 ${selectedIndex !== null ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}></div>
            </div>
          </div>
        </div>

      </div>
      
      {/* --- NEW: MOBILE BAUHAUS MODAL --- */}
      {/* This overlay appears only on mobile (lg:hidden) when a lyric is selected.
          It creates a stunning full-screen experience.
      */}
      {/* Mobile Modal: open at scroll position */}
      <div
        className={`
          lg:hidden fixed left-0 right-0 z-[100] flex flex-col items-end
          bg-black/40 backdrop-blur-sm
          transition-opacity duration-300 ease-in-out
          ${selectedIndex !== null ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        style={selectedIndex !== null ? { top: `${window.scrollY}px`, bottom: 'unset', height: '100vh' } : {}}
        onClick={() => setSelectedIndex(null)}
      >
        <div
          className={`
            mobile-modal
            w-full h-[85vh]
            bg-[#F4F3EF] dark:bg-[#0A0A0A]
            rounded-t-[2rem] overflow-hidden shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.5)]
            flex flex-col
            transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
            ${selectedIndex !== null ? 'translate-y-0' : 'translate-y-[100%]'}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 1. VISUALIZATION HEADER (Stunning Generative Art) */}
          <div className="relative h-[35%] w-full bg-neutral-100 border-b-4 border-black dark:border-white flex-shrink-0">
             {selectedIndex !== null && (
               <GenerativeBauhaus text={lyrics[selectedIndex].lines.join('')} />
             )}
             
             {/* Close Button Floating */}
             <button 
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold shadow-lg z-20"
             >
                ✕
             </button>
          </div>

          {/* 2. CONTENT SCROLL AREA */}
          <div className="flex-grow min-h-0 overflow-y-auto p-8">
            
            {/* Meta Labels */}
            <div className="flex items-center gap-2 mb-6 opacity-60">
              <span className="w-2 h-2 bg-[#FF3B30]"></span>
              <span className="font-mono text-xs uppercase tracking-widest text-black dark:text-white">
                Analysis Mode
              </span>
            </div>

            {/* Lyric Context */}
            <div className="mb-8 border-l-2 border-[#2B4592] pl-4">
               {selectedIndex !== null && lyrics[selectedIndex].lines.map((line, i) => (
                 <p key={i} className="text-xl font-bold text-neutral-400 leading-tight mb-1">{line}</p>
               ))}
            </div>

            {/* The Quote Mark */}
            <div className="text-6xl text-black dark:text-white font-serif leading-none mb-4">“</div>

            {/* Main Explanation */}
            <div className="prose prose-lg prose-p:text-black dark:prose-p:text-white prose-p:font-medium leading-relaxed pb-12">
               {selectedIndex !== null ? lyrics[selectedIndex].explanation : ''}
            </div>

          </div>

          {/* 3. FOOTER BAR */}
          <div className="h-4 w-full flex flex-shrink-0">
             <div className="w-1/3 bg-[#FF3B30]"></div>
             <div className="w-1/3 bg-[#2B4592]"></div>
             <div className="w-1/3 bg-black dark:bg-white"></div>
          </div>

        </div>
      </div>


      {/* Footer Bar (Main Page) */}
      <div className="mt-24 w-full h-12 bg-black dark:bg-white flex border-t-4 border-black dark:border-white">
         <div className="w-[15%] bg-[#FF3B30] h-full"></div>
         <div className="w-[15%] bg-[#2B4592] h-full"></div>
         <div className="flex-grow flex items-center justify-end px-4">
            <span className="font-mono text-[10px] text-white dark:text-black uppercase tracking-widest">End of File</span>
         </div>
      </div>
    </div>
  );
};

export default LyricsComponent;