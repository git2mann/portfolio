"use client";

import React, { useRef, useEffect, useState } from "react";
import styles from "./artwork-modal.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { X, Share2, Download, Maximize2, Minimize2 } from "lucide-react";

interface ArtworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  alt?: string;
  title?: string;
  year?: string;
  writeup?: string;
}

const ArtworkFullscreen: React.FC<ArtworkModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  alt,
  title = "Untitled",
  year = "2026",
  writeup
}) => {
  const [showUI, setShowUI] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showShareMsg, setShowShareMsg] = useState(false);
  const hideUITimer = useRef<NodeJS.Timeout | null>(null);

  // Auto-hide UI after 3 seconds of inactivity
  const resetUITimer = () => {
    setShowUI(true);
    if (hideUITimer.current) clearTimeout(hideUITimer.current);
    hideUITimer.current = setTimeout(() => setShowUI(false), 3000);
  };

  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen) {
      resetUITimer();
      window.addEventListener("mousemove", resetUITimer);
      // Request fullscreen only, no pre-modal
      setTimeout(() => {
        if (modalRef.current && document.fullscreenEnabled && !document.fullscreenElement) {
          modalRef.current.requestFullscreen().catch(() => {});
        }
      }, 100);
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }
    return () => {
      window.removeEventListener("mousemove", resetUITimer);
      if (hideUITimer.current) clearTimeout(hideUITimer.current);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, [isOpen]);

  // Handle ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (document.fullscreenElement) {
          document.exitFullscreen()
            .then(() => {
              onClose();
            })
            .catch(() => {
              onClose();
            });
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Always render modal when isOpen is true
  useEffect(() => {
    if (!isOpen) return;
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        onClose();
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`fixed inset-0 z-[100] bg-black overflow-hidden flex items-center justify-center ${styles["artwork-modal-mobile"]}`}
        >
          {/* --- 1. THE VOID BACKGROUND --- */}
          {/* This uses the image itself, scaled up massively and blurred to create the color atmosphere */}
          <div className="absolute inset-0 z-0 select-none overflow-hidden">
             <motion.img 
               src={imageSrc} 
               alt="Atmosphere"
               initial={{ scale: 1.2, opacity: 0 }}
               animate={{ scale: 1.5, opacity: 0.4 }} // Low opacity lets the black background deepen the colors
               className="w-full h-full object-cover blur-[80px] md:blur-[120px] saturate-150"
             />
             {/* Vignette to darken the edges and center focus */}
             <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/80 mix-blend-multiply" />
          </div>

          {/* --- 2. MAIN ARTWORK --- */}
          <div
            className={`relative z-10 w-full h-full ${isZoomed ? 'flex items-center justify-center p-0 m-0' : 'flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 px-2 md:px-0'} main-artwork`}
            style={isZoomed ? { padding: 0, margin: 0 } : {}}
          >
            <motion.div
              className={`transition-all duration-700 ease-out flex-shrink-0 ${isZoomed ? 'fixed top-0 left-0 w-screen h-screen bg-black z-30 cursor-zoom-out' : 'w-full max-w-[95vw] h-[45vh] md:w-auto md:h-[85vh] md:max-w-[60vw] cursor-zoom-in'}`}
              style={isZoomed ? { zIndex: 30 } : {}}
              layoutId={imageSrc}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              {/* The Image */}
              <img
                src={imageSrc}
                alt={alt}
                className={`w-full h-full select-none drop-shadow-2xl shadow-black/50 ${isZoomed ? 'object-cover' : 'object-contain'}`}
                draggable={false}
                style={isZoomed ? { maxHeight: '100vh', maxWidth: '100vw', width: '100vw', height: '100vh' } : {}}
              />
            </motion.div>
            {/* Only show writeup if not zoomed */}
            {!isZoomed && writeup && (
              <div
                className="w-full md:max-w-lg bg-black/60 rounded-lg p-4 md:p-8 text-white/90 shadow-xl backdrop-blur-lg mt-4 md:mt-0 artwork-writeup"
                style={{ maxHeight: '40vh', overflowY: 'auto' }}
              >
                <div className="text-base md:text-lg font-semibold mb-2">{title}</div>
                <div className="text-xs font-mono uppercase tracking-widest mb-2 md:mb-4 text-white/50">{year} • Klense</div>
                <div className="text-sm md:text-base whitespace-pre-line leading-relaxed">{writeup}</div>
              </div>
            )}
          </div>

          {/* --- 3. FLOATING UI (Fades out when inactive) --- */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showUI ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 md:p-12 floating-ui"
          >
            {/* TOP BAR */}
            <div className="flex justify-between items-start">
               <div className="flex flex-col">
                 <h2 className="text-white/90 font-medium text-lg md:text-2xl tracking-tight drop-shadow-md">{title}</h2>
                 <span className="text-white/50 text-xs font-mono uppercase tracking-widest mt-1">{year} • Klense</span>
               </div>
               <button 
                 onClick={onClose}
                 className="pointer-events-auto p-3 bg-black/20 hover:bg-white/10 backdrop-blur-md border border-white/5 rounded-full text-white/70 hover:text-white transition-all group"
               >
                 <X size={24} strokeWidth={1.5} />
               </button>
            </div>

            {/* BOTTOM BAR - Controls */}
            <div className="flex justify-center md:justify-end gap-4 pointer-events-auto">
               {/* Zoom Toggle */}
               <button 
                 onClick={() => setIsZoomed(!isZoomed)}
                 className="p-3 bg-black/20 hover:bg-white/10 backdrop-blur-md border border-white/5 rounded-full text-white/70 hover:text-white transition-all"
                 title={isZoomed ? "Fit to Screen" : "Fill Screen"}
               >
                 {isZoomed ? <Minimize2 size={20} strokeWidth={1.5}/> : <Maximize2 size={20} strokeWidth={1.5}/>}
               </button>
               
               {/* Download */}
               <a 
                 href={imageSrc} 
                 download 
                 className="p-3 bg-black/20 hover:bg-white/10 backdrop-blur-md border border-white/5 rounded-full text-white/70 hover:text-white transition-all"
               >
                 <Download size={20} strokeWidth={1.5}/>
               </a>

               {/* Share */}
               <button
                 onClick={async () => {
                   // Generate a unique share page URL for the artwork
                   let artworkId = imageSrc ? encodeURIComponent(imageSrc.split('/').pop() || '') : '';
                   let shareUrl = artworkId ? `${window.location.origin}/art/share/${artworkId}` : window.location.href;
                   const shareData = {
                     title: title || 'Artwork',
                     text: writeup ? `${title ? title + ' – ' : ''}${writeup}` : title || 'Artwork',
                     url: shareUrl
                   };
                   if (navigator.share) {
                     try {
                       await navigator.share(shareData);
                     } catch (e) {
                       // User cancelled or error
                     }
                   } else {
                     try {
                       await navigator.clipboard.writeText(shareUrl);
                       setShowShareMsg(true);
                       setTimeout(() => setShowShareMsg(false), 1800);
                     } catch (e) {}
                   }
                 }}
                 className="p-3 bg-black/20 hover:bg-white/10 backdrop-blur-md border border-white/5 rounded-full text-white/70 hover:text-white transition-all relative"
                 title="Share"
               >
                 <Share2 size={20} strokeWidth={1.5}/>
                 {showShareMsg && (
                   <span className="absolute left-1/2 -translate-x-1/2 bottom-12 bg-black/90 text-white text-xs rounded px-3 py-1 shadow-lg animate-fade-in-out pointer-events-none whitespace-nowrap z-50">
                     Link copied!
                   </span>
                 )}
               </button>
            </div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArtworkFullscreen;