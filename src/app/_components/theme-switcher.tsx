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

  const handleQuickSwitch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    cycleTheme(e);
  };

  const handleToggleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
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
      
      {/* QUICK SWITCH + MENU TOGGLE */}
      <div
        className={`
          flex items-center rounded-full liquid-glass transition-all duration-500 select-none overflow-hidden
          ${isOpen ? "border-white/40 shadow-inner scale-[0.97]" : "hover:scale-[1.03]"}
        `}
      >
        <button
          onClick={handleQuickSwitch}
          className="h-[42px] px-4 inline-flex items-center justify-center"
          aria-label="Quick switch theme"
        >
          <span className="text-xl leading-none">{currentThemeData?.icon}</span>
        </button>

        <button
          ref={triggerRef}
          onClick={handleToggleMenu}
          className="h-[42px] w-9 inline-flex items-center justify-center border-l border-primary/10"
          aria-label="Open theme menu"
        >
          <ChevronDown size={14} className={`transition-transform duration-500 text-primary opacity-40 ${isOpen ? "rotate-180 text-primary opacity-80" : ""}`} />
        </button>
      </div>

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
                initial={isMobile ? { opacity: 0, scale: 0.96 } : { opacity: 0, y: 10 }}
                animate={isMobile ? { opacity: 1, scale: 1 } : { opacity: 1, y: 0 }}
                exit={isMobile ? { opacity: 0, scale: 0.96 } : { opacity: 0, y: 10 }}
                className={`
                  fixed rounded-[2rem] shadow-[0_24px_60px_rgba(0,0,0,0.2)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.55)] z-[100000]
                  overflow-hidden
                  ${isMobile 
                    ? 'w-[min(92vw,440px)] inset-x-0 mx-auto top-4' 
                    : 'w-72 glass p-5'
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
                {isMobile ? (
                  <div className="relative h-full glass px-5 py-6">
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                      <div className="absolute -top-24 right-[-4rem] h-56 w-56 rounded-full bg-accent-blue/15 blur-3xl" />
                      <div className="absolute -bottom-24 left-[-3rem] h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
                    </div>

                    <div className="relative z-10 h-full flex flex-col">
                      <div className="flex justify-between items-start mb-8">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary/55">Appearance</span>
                          <p className="text-2xl font-light text-primary mt-2 tracking-tight">Choose a theme</p>
                        </div>
                        <button
                          onClick={() => setIsOpen(false)}
                          className="w-11 h-11 rounded-full bg-primary/5 flex items-center justify-center text-primary opacity-70 hover:opacity-100 transition-all border border-primary/10"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      <div className="flex-1 overflow-y-auto">
                        <div className="space-y-1">
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
                                  w-full flex items-center justify-between gap-4 px-2 py-3.5 rounded-xl text-left transition-all duration-300 group
                                  ${isActive ? "bg-primary/8 text-primary" : "text-primary/85 hover:text-primary hover:bg-primary/5"}
                                `}
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <span className={`h-10 w-10 rounded-full inline-flex items-center justify-center ${isActive ? "bg-primary/10" : "bg-primary/5"}`}>
                                    <span className="text-xl leading-none">{theme.icon}</span>
                                  </span>

                                  <span className="min-w-0">
                                    <span className={`block text-2xl leading-none font-light tracking-tight ${isActive ? "text-primary" : "text-primary/90"}`}>
                                      {theme.name.replace('_', ' ')}
                                    </span>
                                    <span className={`block text-xs mt-1 uppercase tracking-[0.16em] ${isActive ? "text-accent-blue" : "text-secondary"}`}>
                                      {theme.id === 'system' ? 'Follow device preference' : 'Apply interface palette'}
                                    </span>
                                  </span>
                                </div>

                                {isActive ? (
                                  <Check size={18} className="text-accent-blue" />
                                ) : (
                                  <ChevronDown size={16} className="text-primary/30 -rotate-90" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="pt-5 mt-4 border-t border-primary/10 flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-[0.24em] text-secondary">Theme Studio</span>
                        <span className="text-[10px] uppercase tracking-[0.24em] text-secondary">Personalization</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-2">
                    <div className="grid grid-cols-1">
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
                              w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-left transition-all duration-300 group mb-1
                              ${isActive 
                                ? "bg-primary text-background-primary shadow-md" 
                                : "bg-transparent text-primary opacity-70 hover:opacity-100 hover:bg-primary/5"
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
                )}
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

