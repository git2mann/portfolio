"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal, flushSync } from "react-dom";
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
  const [toast, setToast] = useState<{ emoji: string; name: string } | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isFirstRender = useRef(true);

  const selectTheme = (themeId: string, e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("selectTheme called", themeId);
    const themeData = themes.find(t => t.id === themeId);
    
    const triggerToast = () => {
      console.log("triggerToast selectTheme running", themeData);
      if (themeData) {
        const displayName = themeData.name === "Auto_Sys" ? "Auto System" : themeData.name.replace('_', ' ');
        setToast({
          emoji: themeData.icon,
          name: displayName
        });
      }
    };

    if (typeof document === "undefined" || !(document as any).startViewTransition) {
      setCurrentTheme(themeId);
      triggerToast();
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    
    // Calculate distance to furthest corner of the viewport
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.style.setProperty("--ripple-x", `${x}px`);
    document.documentElement.style.setProperty("--ripple-y", `${y}px`);
    document.documentElement.style.setProperty("--ripple-radius", `${endRadius}px`);

    (document as any).startViewTransition(() => {
      flushSync(() => {
        setCurrentTheme(themeId);
        triggerToast();
      });
    });
  };

  const cycleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentIndex = themes.findIndex(t => t.id === currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextThemeId = themes[nextIndex].id;
    const themeData = themes[nextIndex];
    console.log("cycleTheme called. Next theme is:", nextThemeId);

    const triggerToast = () => {
      console.log("triggerToast cycleTheme running", themeData);
      if (themeData) {
        const displayName = themeData.name === "Auto_Sys" ? "Auto System" : themeData.name.replace('_', ' ');
        setToast({
          emoji: themeData.icon,
          name: displayName
        });
      }
    };

    if (typeof document === "undefined" || !(document as any).startViewTransition) {
      setCurrentTheme(nextThemeId);
      triggerToast();
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.style.setProperty("--ripple-x", `${x}px`);
    document.documentElement.style.setProperty("--ripple-y", `${y}px`);
    document.documentElement.style.setProperty("--ripple-radius", `${endRadius}px`);

    (document as any).startViewTransition(() => {
      flushSync(() => {
        setCurrentTheme(nextThemeId);
        triggerToast();
        setIsOpen(false);
      });
    });
  };

  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (clickTimeoutRef.current) {
      // Second click within 250ms: cancel single-click and cycle themes
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      cycleTheme(e);
    } else {
      // First click: start 250ms timer
      clickTimeoutRef.current = setTimeout(() => {
        setIsOpen(prev => !prev);
        clickTimeoutRef.current = null;
      }, 250);
    }
  };

  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

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

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [toast]);

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

  console.log("Rendering ThemeSelector toast state:", toast);

  return (
    <div className="relative" ref={containerRef}>
      
      {/* TRIGGER BUTTON */}
      <button
        ref={triggerRef}
        onClick={handleClick}
        className={`
          flex items-center gap-3 px-5 py-2.5 rounded-full liquid-glass transition-all duration-500 select-none
          ${isOpen ? "border-white/40 shadow-inner scale-[0.97]" : "hover:scale-[1.03] active:scale-95"}
        `}
        aria-label="Change Appearance"
      >
        <span className="text-xl leading-none">{currentThemeData?.icon}</span>
        <ChevronDown size={14} className={`transition-transform duration-500 text-primary opacity-40 ${isOpen ? "rotate-180 text-primary opacity-80" : ""}`} />
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
                  className="fixed inset-0 bg-background-primary opacity-60 backdrop-blur-xl z-[99999]"
                />
              )}

              <motion.div 
                id="theme-portal-dropdown"
                initial={isMobile ? { opacity: 0, scale: 0.95, y: "-48%" } : { opacity: 0, y: 10 }}
                animate={isMobile ? { opacity: 1, scale: 1, y: "-50%" } : { opacity: 1, y: 0 }}
                exit={isMobile ? { opacity: 0, scale: 0.95, y: "-48%" } : { opacity: 0, y: 10 }}
                className={`
                  fixed rounded-[2.5rem] shadow-[0_24px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.5)] z-[100000] p-5 
                  glass overflow-hidden
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
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary opacity-50">Select Interface Theme</span>
                      <button 
                        onClick={() => setIsOpen(false)}
                        className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary opacity-60 hover:text-primary transition-colors border border-primary/10"
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
                          onClick={(e) => {
                            selectTheme(theme.id, e);
                            setIsOpen(false);
                          }}
                          className={`
                            w-full flex items-center justify-between px-5 py-4 rounded-[1.5rem] text-left transition-all duration-300 group mb-1 border
                            ${isActive 
                              ? "bg-primary text-background-primary border-primary/20 shadow-lg scale-[1.02]" 
                              : "bg-primary/5 border-primary/10 text-primary opacity-75 hover:opacity-100 hover:bg-primary/10 hover:scale-[1.02]"
                            }
                          `}
                        >
                          <div className="flex items-center gap-4">
                            <span className={`text-2xl transition-transform duration-500 ${isActive ? 'scale-110' : 'opacity-70 group-hover:opacity-100 group-hover:scale-125'}`}>{theme.icon}</span>
                            <span className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-colors ${isActive ? 'text-background-primary' : 'text-primary opacity-70 group-hover:text-primary'}`}>{theme.name.replace('_', ' ')}</span>
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

      {/* TOAST NOTIFICATION: Decoupled via Portal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -25, scale: 0.95, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 15, scale: 0.95, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-[100001] w-[300px] h-[64px] px-6 rounded-full glass theme-toast-container flex items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-primary/10 select-none pointer-events-none"
            >
              {/* Left Side: Glowing Badge for Emoji */}
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary/5 dark:bg-primary/10 border border-primary/10 shadow-inner">
                {/* Subtle backglow */}
                <div className="absolute inset-0 rounded-full bg-primary/5 blur-sm animate-pulse" />
                <motion.span 
                  initial={{ scale: 0.4, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.05 }}
                  className="text-xl relative z-10"
                >
                  {toast.emoji}
                </motion.span>
              </div>

              {/* Right Side: Text details */}
              <div className="flex flex-col pr-2">
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-primary opacity-40 leading-none mb-1">
                  Appearance
                </span>
                <span className="text-[13px] font-semibold text-primary tracking-wide leading-none">
                  {toast.name}
                </span>
              </div>
            </motion.div>
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

