'use client';

import { useState, useEffect } from 'react';
import { X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InstructionPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the popup has already been shown in this session
    const hasSeenPopup = sessionStorage.getItem('hasSeenInstructionPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('hasSeenInstructionPopup', 'true');
      }, 800); // 800ms delay for promptness
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-[200] px-6"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="liquid-glass-clear p-8 md:p-12 rounded-[2.5rem] shadow-2xl max-w-lg w-full text-center relative overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-6 right-8 text-white/40 hover:text-white transition-all hover:scale-110 active:scale-90"
              aria-label="Close"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            {/* Popup Content */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-8 border border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.2)]">
                <Info size={32} className="text-red-500" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-light mb-4 text-primary uppercase tracking-tight">
                Lyrics & Annotations
              </h2>
              
              <p className="text-secondary text-base md:text-lg font-light leading-relaxed mb-10 opacity-80">
                Click on a highlighted lyric fragment to extract its interpretation. Deactivate by clicking again or selecting another unit.
              </p>

              <button
                onClick={() => setIsVisible(false)}
                className="w-full py-4 bg-white text-black font-medium uppercase text-xs tracking-[0.3em] hover:bg-red-500 hover:text-white transition-all shadow-xl hover:scale-[1.02] active:scale-95"
              >
                System Receptive
              </button>
            </div>

            {/* Decorative Grid detail */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}