"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Link2, Check } from "lucide-react";

export default function PostInteractivity() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }

      // Show back to top button
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* 1. SCROLL PROGRESS BAR */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-accent-blue z-[100] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* 2. FLOATING SHARE & BACK-TO-TOP */}
      <div className="fixed bottom-10 right-10 z-50 flex flex-col gap-4">
        {/* Copy Link Button */}
        <button
          onClick={copyLink}
          className="w-12 h-12 rounded-full liquid-glass-clear flex items-center justify-center text-primary border border-white/10 hover:border-accent-blue/40 shadow-xl hover:scale-110 active:scale-95 transition-all group"
          title="Copy Link to Clipboard"
        >
          {copied ? (
            <Check size={16} className="text-emerald-500 animate-in zoom-in" />
          ) : (
            <Link2 size={16} className="group-hover:text-accent-blue transition-colors" />
          )}
          {copied && (
            <span className="absolute right-14 bg-emerald-950/80 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
              UPLINK_COPIED
            </span>
          )}
        </button>

        {/* Scroll To Top Button */}
        <button
          onClick={scrollToTop}
          className={`w-12 h-12 rounded-full bg-primary text-background-primary flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all ${
            showBackToTop ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
          }`}
          title="Back to Top"
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </>
  );
}
