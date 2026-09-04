'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ChevronLeft, ChevronRight, BookOpen, Layers } from 'lucide-react';

export interface LyricsGroup {
  lines: string[];
  explanation?: string;
  id?: string;
}

export interface LyricsComponentProps {
  lyrics: LyricsGroup[];
}

export default function LyricsComponent({ lyrics }: LyricsComponentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [expandAll, setExpandAll] = useState(false);

  // Get indexes of stanzas that have an explanation
  const annotatedIndexes = lyrics
    .map((g, i) => (g.explanation ? i : -1))
    .filter((i) => i >= 0);

  const totalAnnotations = annotatedIndexes.length;

  const selectNext = useCallback(
    (direction: 1 | -1) => {
      if (annotatedIndexes.length === 0) return;
      if (openIndex === null || !annotatedIndexes.includes(openIndex)) {
        setOpenIndex(annotatedIndexes[0]);
        return;
      }
      const currentPos = annotatedIndexes.indexOf(openIndex);
      const nextPos = Math.min(
        Math.max(currentPos + direction, 0),
        annotatedIndexes.length - 1
      );
      setOpenIndex(annotatedIndexes[nextPos]);
    },
    [annotatedIndexes, openIndex]
  );

  // Keyboard navigation when a note is active
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lyrics || lyrics.length === 0) return;
      if (document.activeElement && (document.activeElement as HTMLElement).tagName === 'INPUT') return;

      if (e.key === 'Escape') {
        setOpenIndex(null);
        setExpandAll(false);
        return;
      }

      if (openIndex !== null && !expandAll) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          selectNext(1);
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          selectNext(-1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openIndex, expandAll, lyrics, selectNext]);

  if (!lyrics || lyrics.length === 0) {
    return (
      <div className="py-8 px-6 rounded-2xl bg-primary/[0.02] text-center my-4">
        <p className="font-mono text-xs uppercase tracking-widest text-secondary">
          Instrumental / No lyrics available for this track
        </p>
      </div>
    );
  }

  const currentAnnotatedPos = openIndex === null ? -1 : annotatedIndexes.indexOf(openIndex);

  return (
    <div className="w-full py-2 sm:py-4 transition-colors font-noto-display-condensed">
      {/* Sleek Toolbar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue flex-shrink-0">
            <BookOpen size={15} />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-base sm:text-lg font-medium tracking-tight uppercase text-primary">
                Lyrics & Liner Notes
              </h3>
              {totalAnnotations > 0 && (
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded-full font-medium">
                  {totalAnnotations} {totalAnnotations === 1 ? 'Annotation' : 'Annotations'}
                </span>
              )}
            </div>
            {totalAnnotations > 0 && (
              <p className="font-mono text-[10px] uppercase tracking-wider text-secondary/70 mt-0.5">
                Select any highlighted verse to view commentary
              </p>
            )}
          </div>
        </div>

        {totalAnnotations > 0 && (
          <button
            onClick={() => {
              setExpandAll(!expandAll);
              if (!expandAll) setOpenIndex(null);
            }}
            className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full liquid-glass-clear text-[10px] font-mono uppercase tracking-widest text-secondary hover:text-accent-blue transition-all active:scale-95"
          >
            <Layers size={12} />
            <span>{expandAll ? 'Collapse All Notes' : 'Expand All Notes'}</span>
          </button>
        )}
      </div>

      {/* Lyrics Container - Flows naturally with zero nested scrollbars */}
      <div className="space-y-6 sm:space-y-8 max-w-3xl">
        {lyrics.map((group, idx) => {
          const hasAnnotation = !!group.explanation;
          const isSelected = openIndex === idx || expandAll;

          return (
            <div key={idx} className="relative group/stanza">
              <div
                onClick={() => {
                  if (hasAnnotation && !expandAll) {
                    setOpenIndex(openIndex === idx ? null : idx);
                  }
                }}
                className={`
                  relative transition-all duration-300 rounded-xl p-3 sm:p-4 -mx-3 sm:-mx-4
                  ${hasAnnotation ? 'cursor-pointer hover:bg-accent-blue/[0.04]' : 'cursor-default'}
                  ${isSelected && hasAnnotation ? 'bg-accent-blue/[0.06] shadow-sm' : hasAnnotation ? 'hover:bg-accent-blue/[0.03]' : ''}
                `}
              >
                {/* Annotation Indicator Pill on Top of Stanza */}
                {hasAnnotation && (
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-secondary/60">
                      Verse {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`
                        inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-wider transition-all
                        ${isSelected ? 'bg-accent-blue text-white shadow-sm' : 'bg-accent-blue/10 text-accent-blue group-hover/stanza:bg-accent-blue/20'}
                      `}
                    >
                      <Sparkles size={10} />
                      <span>{isSelected ? 'Note Open' : 'Note'}</span>
                    </span>
                  </div>
                )}

                {/* Stanza Lines - Beautiful, readable poetic typography */}
                <div className="space-y-1.5">
                  {group.lines.map((line, lineIdx) => (
                    <p
                      key={lineIdx}
                      className={`
                        text-base sm:text-lg md:text-xl font-light leading-relaxed tracking-wide transition-colors
                        ${isSelected ? 'text-primary font-normal' : hasAnnotation ? 'text-primary/90 group-hover/stanza:text-primary' : 'text-primary/75'}
                      `}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {/* Inline Annotation Card - Smooth Accordion Unroll directly below verse */}
              <AnimatePresence>
                {hasAnnotation && isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -6 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -6 }}
                    transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 mb-4 p-4 sm:p-6 rounded-2xl bg-accent-blue/[0.06] backdrop-blur-md shadow-lg relative">
                      {/* Card Header */}
                      <div className="flex items-center justify-between pb-3 mb-3">
                        <div className="flex items-center gap-2 text-accent-blue">
                          <Sparkles size={13} />
                          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest font-semibold">
                            Liner Note & Interpretation
                          </span>
                        </div>

                        <div className="flex items-center gap-1 sm:gap-2">
                          {!expandAll && totalAnnotations > 1 && (
                            <div className="flex items-center gap-1 mr-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  selectNext(-1);
                                }}
                                disabled={currentAnnotatedPos <= 0}
                                aria-label="Previous note"
                                className="w-6 h-6 rounded-full flex items-center justify-center text-secondary hover:text-accent-blue disabled:opacity-20 transition-colors"
                              >
                                <ChevronLeft size={14} />
                              </button>
                              <span className="font-mono text-[9px] text-secondary/60">
                                {currentAnnotatedPos + 1}/{totalAnnotations}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  selectNext(1);
                                }}
                                disabled={currentAnnotatedPos === totalAnnotations - 1}
                                aria-label="Next note"
                                className="w-6 h-6 rounded-full flex items-center justify-center text-secondary hover:text-accent-blue disabled:opacity-20 transition-colors"
                              >
                                <ChevronRight size={14} />
                              </button>
                            </div>
                          )}

                          {!expandAll && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenIndex(null);
                              }}
                              aria-label="Close note"
                              className="w-6 h-6 rounded-full flex items-center justify-center text-secondary hover:text-primary transition-colors opacity-60 hover:opacity-100"
                            >
                              <X size={14} />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Explanation Body */}
                      <p className="text-sm sm:text-base font-light leading-relaxed text-primary/90">
                        {group.explanation}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}