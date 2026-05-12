"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check, X } from "lucide-react";
import { themes, STORAGE_KEY } from "./theme-utils";
import { motion, AnimatePresence } from "framer-motion";

declare global {
  interface Window {
    updateDOM: () => void;
  }
}

const ThemeSelector = () => {
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<string>("system");
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownCoords, setDropdownCoords] = useState({ top: 0, right: 0 });
  const [isMobile, setIsMobile] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dispatch global blur event
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('global-blur-toggle', { detail: isOpen }));
    return () => {
      // Cleanup on unmount if open
      if (isOpen) window.dispatchEvent(new CustomEvent('global-blur-toggle', { detail: false }));
    };
  }, [isOpen]);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage?.getItem(STORAGE_KEY) ?? "system";
    setCurrentTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage?.setItem(STORAGE_KEY, currentTheme);
    window.updateDOM?.();
  }, [currentTheme, mounted]);

  // Update dropdown position when opened or window resized
  useEffect(() => {
    const updatePosition = () => {
      if (isOpen && triggerRef.current && !isMobile) {
        const rect = triggerRef.current.getBoundingClientRect();
        // Match the "github" position: Align right edge of menu to right edge of button
        setDropdownCoords({
          top: rect.bottom,
          right: window.innerWidth - rect.right
        });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true); // Catch scroll events in the header
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, isMobile]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        const portalDropdown = document.getElementById("theme-portal-dropdown");
        if (portalDropdown && portalDropdown.contains(event.target as Node)) return;
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!mounted) return null;

  const currentThemeData = themes.find(t => t.id === currentTheme);

  return (
    <div className="relative" ref={containerRef}>
      
      {/* TRIGGER BUTTON */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-3 px-5 py-2.5 rounded-full liquid-glass transition-all duration-500
          ${isOpen ? "border-white/40 shadow-inner scale-[0.97]" : "hover:scale-[1.03] active:scale-95"}
        `}
        aria-label="Change Appearance"
      >
        <span className="text-xl leading-none">{currentThemeData?.icon}</span>
        <ChevronDown size={14} className={`transition-transform duration-500 text-primary/40 ${isOpen ? "rotate-180 text-primary/80" : ""}`} />
      </button>

      {/* DROPDOWN/MODAL MENU: Decoupled via Portal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay for Mobile */}
              {isMobile && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 bg-background-primary/60 backdrop-blur-xl z-[99999]"
                />
              )}

              <motion.div 
                id="theme-portal-dropdown"
                initial={isMobile ? { opacity: 0, scale: 0.9, y: "-45%" } : { opacity: 0, y: 10 }}
                animate={isMobile ? { opacity: 1, scale: 1, y: "-50%" } : { opacity: 1, y: 0 }}
                exit={isMobile ? { opacity: 0, scale: 0.9, y: "-45%" } : { opacity: 0, y: 10 }}
                className={`
                  fixed rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] z-[100000] p-4 
                  liquid-glass-clear overflow-hidden
                  ${isMobile 
                    ? 'left-6 right-6 top-1/2 -translate-y-1/2' 
                    : 'w-72'
                  }
                `}
                style={!isMobile ? { 
                  top: dropdownCoords.top + 12,
                  right: dropdownCoords.right,
                  transform: 'translate3d(0, 0, 0)',
                  WebkitTransform: 'translate3d(0, 0, 0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                } : {}}
              >
                <div className="py-2">
                  {isMobile && (
                    <div className="flex justify-between items-center mb-6 px-4 pt-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/50">Select Interface Theme</span>
                      <button 
                        onClick={() => setIsOpen(false)}
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary/60 hover:text-primary transition-colors border border-white/10"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  )}

                  <div className={`grid ${isMobile ? 'grid-cols-2 gap-2' : 'grid-cols-1'}`}>
                    {themes.map((theme) => {
                      const isActive = currentTheme === theme.id;
                      return (
                        <button
                          key={theme.id}
                          onClick={() => {
                            setCurrentTheme(theme.id);
                            setIsOpen(false);
                          }}
                          className={`
                            w-full flex items-center justify-between px-5 py-4 rounded-2xl text-left transition-all duration-300 group mb-1
                            ${isActive 
                              ? "bg-primary text-background-primary shadow-2xl scale-[1.02]" 
                              : "hover:bg-white/10 text-primary/60 hover:text-primary border border-transparent hover:border-white/20"
                            }
                          `}
                        >
                          <div className="flex items-center gap-4">
                            <span className={`text-2xl transition-transform duration-500 ${isActive ? 'scale-110' : 'opacity-70 group-hover:opacity-100 group-hover:scale-125'}`}>{theme.icon}</span>
                            <span className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-colors ${isActive ? 'text-background-primary' : 'text-primary/70 group-hover:text-primary'}`}>{theme.name.replace('_', ' ')}</span>
                          </div>
                          
                          {isActive && <Check size={16} className="text-background-primary animate-in zoom-in duration-500" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export const ThemeSwitcher = () => {
  return <ThemeSelector />;
};

