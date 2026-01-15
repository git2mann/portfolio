"use client";

import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  alt = "Artwork",
  title,
  year,
  writeup,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [showUI, setShowUI] = useState(true);
  const [showShareMsg, setShowShareMsg] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const uiTimerRef = useRef<NodeJS.Timeout | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle SSR
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Handle Scroll Lock and Escape Key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  // Handle UI Idle hiding
  const handleMouseMove = () => {
    setShowUI(true);
    if (uiTimerRef.current) clearTimeout(uiTimerRef.current);
    uiTimerRef.current = setTimeout(() => {
      // Only hide UI if not hovering an interactive element (simplified here to just timeout)
      setShowUI(false);
    }, 3000);
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onMouseMove={handleMouseMove}
          onClick={handleMouseMove}
          // Changed from absolute to fixed inset-0 to ensure full coverage regardless of scroll
          className={`fixed inset-0 z-[101] bg-black overflow-hidden flex items-center justify-center ${styles["artwork-modal-mobile"]}`}
        >
          {/* --- 1. THE VOID BACKGROUND --- */}
          {/* Uses the image itself, scaled up and blurred for atmosphere */}
          <div className="absolute inset-0 z-0 select-none overflow-hidden pointer-events-none">
            <motion.img
              src={imageSrc}
              alt="Atmosphere"
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0.4 }}
              className="w-full h-full object-cover blur-[80px] md:blur-[120px] saturate-150"
            />
            {/* Vignette */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/80 mix-blend-multiply" />
          </div>

          {/* --- 2. MAIN ARTWORK --- */}
          <div
            className={`relative z-10 w-full h-full transition-all duration-500 ${
              isZoomed
                ? "flex items-center justify-center p-0 m-0"
                : "flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 px-2 md:px-0"
            } main-artwork`}
          >
            <motion.div
              className={`transition-all duration-700 ease-out flex-shrink-0 ${
                isZoomed
                  ? "fixed top-0 left-0 w-screen h-screen bg-black z-30 cursor-zoom-out overflow-auto flex items-center justify-center"
                  : "w-full max-w-[95vw] h-[45vh] md:w-auto md:h-[85vh] md:max-w-[60vw] cursor-zoom-in"
              }`}
              style={isZoomed ? { zIndex: 30 } : {}}
              layoutId={`artwork-${imageSrc}`}
              onClick={(e) => {
                e.stopPropagation();
                // Only allow zoom toggle on desktop/tablet usually, but enabled here generally
                if (window.innerWidth >= 768) setIsZoomed(!isZoomed);
              }}
            >
              {/* The Image */}
              <img
                src={imageSrc}
                alt={alt}
                className={`w-full h-full select-none drop-shadow-2xl shadow-black/50 ${
                  isZoomed ? "object-contain" : "object-contain"
                }`}
                draggable={false}
                style={
                  isZoomed
                    ? { maxWidth: "100vw", maxHeight: "100vh" }
                    : { maxHeight: "100%", maxWidth: "100%" }
                }
              />
            </motion.div>

            {/* Only show writeup if not zoomed */}
            {!isZoomed && writeup && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="w-full md:max-w-lg bg-black/60 rounded-lg p-4 md:p-8 text-white/90 shadow-xl backdrop-blur-lg mt-4 md:mt-0 artwork-writeup"
                style={{ maxHeight: "40vh", overflowY: "auto", fontSize: "1rem" }}
              >
                <div className="text-base md:text-lg font-semibold mb-2">
                  {title}
                </div>
                <div className="text-xs font-mono uppercase tracking-widest mb-2 md:mb-4 text-white/50">
                  {year} • Klense
                </div>
                <div className="text-sm md:text-base whitespace-pre-line leading-relaxed">
                  {writeup}
                </div>
              </motion.div>
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
            <div className="flex justify-between items-start gap-2">
              <div className="flex flex-col">
                <h2 className="text-white/90 font-medium text-lg md:text-2xl tracking-tight drop-shadow-md">
                  {title}
                </h2>
                <span className="text-white/50 text-xs font-mono uppercase tracking-widest mt-1">
                  {year} • Klense
                </span>
              </div>
              <button
                onClick={onClose}
                className="pointer-events-auto p-3 bg-black/20 hover:bg-white/10 backdrop-blur-md border border-white/5 rounded-full text-white/70 hover:text-white transition-all group"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* BOTTOM BAR - Controls */}
            <div className="flex justify-center md:justify-end gap-2 pointer-events-auto">
              {/* Zoom Toggle (hide on mobile) */}
              <span className="hidden md:inline-flex">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="p-3 bg-black/20 hover:bg-white/10 backdrop-blur-md border border-white/5 rounded-full text-white/70 hover:text-white transition-all"
                  title={isZoomed ? "Fit to Screen" : "Fill Screen"}
                >
                  {isZoomed ? (
                    <Minimize2 size={20} strokeWidth={1.5} />
                  ) : (
                    <Maximize2 size={20} strokeWidth={1.5} />
                  )}
                </button>
              </span>
              
              {/* Download */}
              <a
                href={imageSrc}
                download
                className="p-3 bg-black/20 hover:bg-white/10 backdrop-blur-md border border-white/5 rounded-full text-white/70 hover:text-white transition-all"
              >
                <Download size={20} strokeWidth={1.5} />
              </a>

              {/* Share */}
              <button
                onClick={async () => {
                  // Generate a unique share page URL for the artwork
                  let artworkId = imageSrc
                    ? encodeURIComponent(imageSrc.split("/").pop() || "")
                    : "";
                  let shareUrl = artworkId
                    ? `${window.location.origin}/art/share/${artworkId}`
                    : window.location.href;
                  
                  const shareData = {
                    title: title || "Artwork",
                    text: writeup
                      ? `${title ? title + " – " : ""}${writeup}`
                      : title || "Artwork",
                    url: shareUrl,
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
                <Share2 size={20} strokeWidth={1.5} />
                <AnimatePresence>
                    {showShareMsg && (
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-1/2 -translate-x-1/2 bottom-14 bg-black/90 text-white text-xs rounded px-3 py-1 shadow-lg pointer-events-none whitespace-nowrap z-50 border border-white/10"
                    >
                        Link copied!
                    </motion.span>
                    )}
                </AnimatePresence>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ArtworkFullscreen;