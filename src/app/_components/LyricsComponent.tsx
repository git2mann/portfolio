'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, Activity, Terminal, Hash, Cpu, Search, Layers } from 'lucide-react';

// --- TYPE DEFINITIONS ---
export interface LyricsGroup {
  lines: string[];
  explanation?: string;
}

export interface LyricsComponentProps {
  lyrics: LyricsGroup[];
}

const LyricsComponent: React.FC<LyricsComponentProps> = ({ lyrics }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const lyricRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lyrics || lyrics.length === 0) return;
      if (document.activeElement && (document.activeElement as HTMLElement).tagName === 'INPUT') return;
      
      if (e.key === 'Escape') {
        setSelectedIndex(null);
        return;
      }

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

  if (!lyrics || lyrics.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full py-4 transition-colors duration-500 font-noto-display-condensed"
    >
      {/* 1. SPECTRAL HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-primary/10 pb-4 gap-4">
        <div className="flex items-center gap-6">
           <div className="w-10 h-10 rounded-full bg-accent-blue/10 flex items-center justify-center border border-accent-blue/20">
              <Layers size={18} className="text-accent-blue" />
           </div>
           <div>
              <h2 className="text-3xl md:text-5xl font-light tracking-tighter uppercase leading-none text-primary">
                Spectral Analysis
              </h2>
              <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-secondary mt-1">Component_Lyrics_v2.0 // Read-Only</p>
           </div>
        </div>
        <div className="hidden md:flex items-center gap-3 text-accent-blue font-mono text-[10px] uppercase tracking-widest opacity-40">
           <Search size={12} />
           <span>Select fragment to deconstruct</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 relative">
        
        {/* --- LEFT COLUMN: THE LYRICS (Fluid Flow) --- */}
        <div className="space-y-0 relative z-10">
          {lyrics.map((group, idx) => {
            const isActive = selectedIndex === idx;
            const isHovered = hoverIndex === idx;
            const hasAnnotation = !!group.explanation;
            
            return (
              <div
                key={idx}
                ref={(el) => { lyricRefs.current[idx] = el; }}
                className="relative"
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <button
                  onClick={() => hasAnnotation && setSelectedIndex(isActive ? null : idx)}
                  className={`
                    w-full text-left relative py-6 md:py-8 outline-none transition-all duration-700 group
                    ${!hasAnnotation ? 'cursor-default' : 'cursor-pointer'}
                    ${selectedIndex !== null && !isActive ? 'opacity-20 blur-[1px] grayscale-[0.5]' : 'opacity-100'}
                  `}
                >
                  {/* Focus Glow Overlay */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        layoutId="focus-glow"
                        className="absolute inset-0 bg-accent-blue/[0.03] rounded-xl border border-accent-blue/10 shadow-[inset_0_0_20px_rgba(var(--accent-blue-rgb),0.05)]"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Line Number / ID */}
                  <div className={`
                    absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-4 transition-all duration-700
                    ${isActive ? 'opacity-100 translate-x-0' : 'opacity-5 -translate-x-4 group-hover:opacity-30 group-hover:translate-x-0'}
                  `}>
                    <span className="font-mono text-[10px] text-accent-blue">FRAGMENT_{String(idx + 1).padStart(3, '0')}</span>
                  </div>
                  
                  {/* Lyric Lines */}
                  <div className={`
                    pl-20 md:pl-28 pr-12 transition-all duration-700
                    ${isActive ? 'translate-x-4' : isHovered && hasAnnotation ? 'translate-x-2' : ''}
                  `}>
                    {group.lines.map((line, i) => (
                      <span
                        key={i}
                        className={`
                          block text-2xl md:text-4xl lg:text-5xl font-light tracking-tight leading-[1.1] mb-1 uppercase
                          transition-all duration-700
                          ${isActive 
                            ? 'text-primary' 
                            : isHovered && hasAnnotation
                              ? 'text-primary'
                              : 'text-primary/30'
                          }
                        `}
                      >
                        {line}
                      </span>
                    ))}
                  </div>

                  {/* Interaction Hint */}
                  {hasAnnotation && !isActive && (
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-primary/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-primary/5">
                       <Info size={14} className="text-accent-blue" />
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* --- RIGHT COLUMN: ANALYSIS PANEL (Floating Spectral Card) --- */}
        <div className="hidden lg:block relative">
           <div className="sticky top-24 w-full h-[60vh] flex flex-col">
              <AnimatePresence mode="wait">
                {selectedIndex !== null ? (
                  <motion.div
                    key="panel"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    className="flex-grow liquid-glass-clear rounded-[2rem] overflow-hidden shadow-2xl flex flex-col border border-accent-blue/10 bg-background-secondary/40"
                  >
                    {/* Panel Header */}
                    <div className="bg-accent-blue/[0.03] px-8 py-6 flex justify-between items-center border-b border-primary/5">
                       <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
                          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent-blue font-bold">Analysis_Report</span>
                       </div>
                       <button onClick={() => setSelectedIndex(null)} className="p-2 rounded-full hover:bg-primary/5 transition-colors opacity-40 hover:opacity-100"><X size={16} /></button>
                    </div>

                    <div className="p-10 flex flex-col justify-between h-full">
                       <div className="space-y-12 overflow-y-auto no-scrollbar pb-8">
                          {/* Selected Lines Snippet */}
                          <div className="space-y-2 opacity-40 border-l-2 border-accent-blue/20 pl-6 py-1">
                             {lyrics[selectedIndex].lines.map((line, i) => (
                               <p key={i} className="text-sm font-medium uppercase tracking-tight leading-tight">{line}</p>
                             ))}
                          </div>

                          {/* Deconstructed Meaning */}
                          <div className="space-y-4">
                             <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-blue font-bold flex items-center gap-2">
                                <Cpu size={12} /> Semantic_Output
                             </h4>
                             <p className="text-xl text-primary font-light leading-relaxed">
                                {lyrics[selectedIndex].explanation}
                             </p>
                          </div>
                       </div>

                       {/* Technical Metadata Footer */}
                       <div className="pt-8 border-t border-primary/5 flex justify-between items-center font-mono text-[8px] uppercase tracking-[0.4em] opacity-30">
                          <span className="flex items-center gap-2"><Activity size={10} /> Signal_Verified</span>
                          <span>{new Date().getFullYear()} // v2.0</span>
                       </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="flex-grow border border-dashed border-primary/10 flex flex-col items-center justify-center text-center p-12 group rounded-[2.5rem] bg-primary/[0.01]"
                  >
                     <div className="w-20 h-20 rounded-full bg-primary/[0.02] flex items-center justify-center mb-8 border border-primary/5 group-hover:border-accent-blue/20 transition-colors">
                        <Terminal size={32} className="text-primary/10 group-hover:text-accent-blue/40 transition-colors" />
                     </div>
                     <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-secondary opacity-40 leading-relaxed">
                        Input_Pending<br/>Select Fragment
                     </p>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
        </div>

      </div>

      {/* --- MOBILE MODAL (Bottom Sheet Refined) --- */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-[200] bg-black/60 backdrop-blur-md flex items-end"
            onClick={() => setSelectedIndex(null)}
          >
             <motion.div
                initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="w-full bg-background-primary border-t border-primary/20 p-8 pt-12 rounded-t-[2.5rem] shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
             >
                <div className="w-12 h-1 bg-primary/10 rounded-full mx-auto mb-8" />
                <button onClick={() => setSelectedIndex(null)} className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-primary/5 hover:bg-accent-blue/10 transition-colors"><X size={18} /></button>
                
                <div className="space-y-10 pb-8">
                   <div className="flex items-center gap-4 text-accent-blue">
                      <Terminal size={18} />
                      <span className="font-mono text-xs uppercase tracking-[0.4em] font-bold">Analysis_Report</span>
                   </div>

                   <div className="border-l-2 border-accent-blue/20 pl-6 opacity-40 py-1">
                      {lyrics[selectedIndex].lines.map((line, i) => (
                        <p key={i} className="text-base font-light text-primary uppercase mb-1">{line}</p>
                      ))}
                   </div>

                   <div className="space-y-4">
                      <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-accent-blue font-bold">Interpretation</h3>
                      <p className="text-2xl font-light leading-snug text-primary">
                         {lyrics[selectedIndex].explanation}
                      </p>
                   </div>

                   <div className="pt-8 border-t border-primary/10 flex justify-between items-center font-mono text-[9px] uppercase tracking-widest opacity-40">
                      <span>Status: VERIFIED</span>
                      <span>Signal: ACTIVE</span>
                   </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LyricsComponent;