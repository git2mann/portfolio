'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, Terminal, Search, Layers, ChevronLeft, ChevronRight } from 'lucide-react';

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

  const getSelectableIndexes = () => lyrics.map((g, i) => (g.explanation ? i : -1)).filter(i => i >= 0);

  const selectNext = (direction: 1 | -1) => {
    const selectable = getSelectableIndexes();
    if (selectable.length === 0) return;

    if (selectedIndex === null || !selectable.includes(selectedIndex)) {
      setSelectedIndex(selectable[0]);
      return;
    }

    const currentPos = selectable.indexOf(selectedIndex);
    const nextPos = Math.min(Math.max(currentPos + direction, 0), selectable.length - 1);
    setSelectedIndex(selectable[nextPos]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lyrics || lyrics.length === 0) return;
      if (document.activeElement && (document.activeElement as HTMLElement).tagName === 'INPUT') return;
      
      if (e.key === 'Escape') {
        setSelectedIndex(null);
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        selectNext(1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        selectNext(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, lyrics]);

  useEffect(() => {
    if (selectedIndex === null) return;
    if (!lyrics[selectedIndex] || !lyrics[selectedIndex].explanation) {
      setSelectedIndex(null);
    }
  }, [lyrics, selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, [selectedIndex]);

  if (!lyrics || lyrics.length === 0) return null;

    const selectableIndexes = getSelectableIndexes();
    const currentSelectablePos = selectedIndex === null ? -1 : selectableIndexes.indexOf(selectedIndex);

    return (
      <div className="relative w-full py-3 md:py-4 transition-colors duration-500 font-noto-display-condensed">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-10 border-b border-primary/10 pb-3 md:pb-4 gap-3 md:gap-4">
        <div className="flex items-center gap-3 md:gap-6">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-accent-blue/10 flex items-center justify-center border border-accent-blue/20">
              <Layers size={18} className="text-accent-blue" />
           </div>
           <div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-light tracking-tighter uppercase leading-none text-primary">
             Lyrics Notes
              </h2>
          <p className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.25em] md:tracking-[0.4em] text-secondary mt-1">Select a section to read its note</p>
           </div>
        </div>
        <div className="hidden md:flex items-center gap-3 text-accent-blue font-mono text-[10px] uppercase tracking-widest opacity-40">
           <Search size={12} />
          <span>Use arrows to move</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 relative">
        
        {/* Lyrics column */}
        <div className="space-y-0 relative z-10">
          {lyrics.map((group, idx) => {
            const isActive = selectedIndex === idx;
            const isHovered = hoverIndex === idx;
            const hasAnnotation = !!group.explanation;
            
            return (
              <div
                key={idx}
                className="relative"
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <button
                  onClick={() => hasAnnotation && setSelectedIndex(isActive ? null : idx)}
                  className={`
                    w-full text-left relative py-4 md:py-8 outline-none transition-all duration-700 group
                    ${!hasAnnotation ? 'cursor-default' : 'cursor-pointer'}
                    ${selectedIndex !== null && !isActive ? 'opacity-50 md:opacity-20 md:blur-[1px] md:grayscale-[0.5]' : 'opacity-100'}
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
                    <span className="font-mono text-[8px] md:text-[10px] text-accent-blue">SECTION {String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  
                  {/* Lyric Lines */}
                  <div className={`
                    pl-14 md:pl-28 pr-4 md:pr-12 transition-all duration-700
                    ${isActive ? 'md:translate-x-4' : isHovered && hasAnnotation ? 'md:translate-x-2' : ''}
                  `}>
                    {group.lines.map((line, i) => (
                      <span
                        key={i}
                        className={`
                          block text-lg sm:text-xl md:text-4xl lg:text-5xl font-light tracking-tight leading-[1.1] mb-1 uppercase
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
                    <div className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-primary/5 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-primary/5">
                       <Info size={14} className="text-accent-blue" />
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Notes panel */}
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
                    className="flex-grow liquid-glass-clear rounded-[2rem] overflow-hidden shadow-2xl flex flex-col"
                  >
                    {/* Panel header */}
                    <div className="bg-accent-blue/[0.03] px-8 py-6 flex justify-between items-center border-b border-primary/5">
                       <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
                          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent-blue font-bold">Lyric Note</span>
                       </div>
                       <button onClick={() => setSelectedIndex(null)} className="p-2 rounded-full hover:bg-primary/5 transition-colors opacity-40 hover:opacity-100"><X size={16} /></button>
                    </div>

                    <div className="p-10 flex flex-col justify-between h-full">
                       <div className="space-y-12 overflow-y-auto no-scrollbar pb-8">
                          {/* Selected lines */}
                          <div className="space-y-2 opacity-40 border-l-2 border-accent-blue/20 pl-6 py-1">
                             {lyrics[selectedIndex].lines.map((line, i) => (
                               <p key={i} className="text-sm font-medium uppercase tracking-tight leading-tight">{line}</p>
                             ))}
                          </div>

                          {/* Explanation */}
                          <div className="space-y-4">
                             <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-blue font-bold flex items-center gap-2">
                                <Info size={12} /> Explanation
                             </h4>
                             <p className="text-xl text-primary font-light leading-relaxed">
                                {lyrics[selectedIndex].explanation}
                             </p>
                          </div>
                       </div>

                       {/* Panel footer */}
                          <div className="pt-8 border-t border-primary/5 flex justify-between items-center font-mono text-[9px] uppercase tracking-[0.25em] opacity-40">
                            <button
                             onClick={() => selectNext(-1)}
                             className="inline-flex items-center gap-1 hover:text-accent-blue transition-colors disabled:opacity-20"
                            disabled={currentSelectablePos <= 0}
                            >
                             <ChevronLeft size={12} /> Prev
                            </button>
                            <button
                             onClick={() => selectNext(1)}
                             className="inline-flex items-center gap-1 hover:text-accent-blue transition-colors disabled:opacity-20"
                            disabled={currentSelectablePos === selectableIndexes.length - 1 || currentSelectablePos === -1}
                            >
                             Next <ChevronRight size={12} />
                            </button>
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
                      Choose a section<br/>to view notes
                     </p>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
        </div>

      </div>

      {/* Mobile modal */}
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
               className="w-full max-h-[88dvh] overflow-y-auto no-scrollbar bg-background-primary border-t border-primary/20 p-5 sm:p-6 pt-8 sm:pt-10 rounded-t-[2rem] shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
             >
               <div className="sticky top-0 z-10 bg-background-primary/95 backdrop-blur-sm -mx-5 sm:-mx-6 px-5 sm:px-6 pb-4">
                <div className="w-12 h-1 bg-primary/10 rounded-full mx-auto mb-4" />
                <button onClick={() => setSelectedIndex(null)} className="absolute top-2 right-5 sm:right-6 w-9 h-9 flex items-center justify-center rounded-full bg-primary/5 hover:bg-accent-blue/10 transition-colors"><X size={18} /></button>
               </div>
                
               <div className="space-y-6 pb-4">
                 <div className="flex items-center gap-3 text-accent-blue">
                   <Terminal size={16} />
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.4em] font-bold">Lyric Note</span>
                   </div>

                 <div className="border-l-2 border-accent-blue/20 pl-4 sm:pl-6 opacity-50 py-1">
                      {lyrics[selectedIndex].lines.map((line, i) => (
                    <p key={i} className="text-sm sm:text-base font-light text-primary uppercase mb-1">{line}</p>
                      ))}
                   </div>

                 <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] text-accent-blue font-bold">Explanation</h3>
                   <p className="text-lg sm:text-xl md:text-2xl font-light leading-snug text-primary">
                         {lyrics[selectedIndex].explanation}
                      </p>
                   </div>

                 <div className="sticky bottom-0 bg-background-primary/95 backdrop-blur-sm pt-4 border-t border-primary/10 flex justify-between items-center font-mono text-[9px] uppercase tracking-widest opacity-60">
                     <button
                      onClick={() => selectNext(-1)}
                      className="inline-flex items-center gap-1 hover:text-accent-blue transition-colors disabled:opacity-20"
                   disabled={currentSelectablePos <= 0}
                     >
                      <ChevronLeft size={12} /> Prev
                     </button>
                     <button
                      onClick={() => selectNext(1)}
                      className="inline-flex items-center gap-1 hover:text-accent-blue transition-colors disabled:opacity-20"
                   disabled={currentSelectablePos === selectableIndexes.length - 1 || currentSelectablePos === -1}
                     >
                      Next <ChevronRight size={12} />
                     </button>
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