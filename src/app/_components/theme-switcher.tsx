"use client";

import { memo, useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { ChevronDown, Square, Circle } from "lucide-react";

declare global {
  interface Window {
    updateDOM: () => void;
  }
}

type Theme = {
  id: string;
  name: string;
  icon: string;
  class: string;
};

const STORAGE_KEY = "theme";

// Define themes (Data remains same, aesthetic changes via UI)
export const themes: Theme[] = [
  { id: "system", name: "Auto_Sys", icon: "⚙️", class: "system" },
  { id: "light", name: "Light_Mode", icon: "☀️", class: "light" },
  { id: "dark", name: "Dark_Mode", icon: "🌑", class: "dark" },
  { id: "pastel", name: "Pastel", icon: "🌸", class: "theme-pastel" },
  { id: "forest", name: "Forest", icon: "🌲", class: "theme-forest" },
  { id: "ocean", name: "Ocean", icon: "🌊", class: "theme-ocean" },
  { id: "sunset", name: "Sunset", icon: "🌅", class: "theme-sunset" },
  { id: "metallic-silver", name: "Chrome", icon: "💿", class: "theme-metallic-silver" },
  { id: "8bit", name: "8-Bit_OS", icon: "🕹️", class: "theme-8bit" }
];

// Define NoFOUCScript (Preserved functionality)
export function NoFOUCScript(storageKey: string, themeList: Theme[]) {
  const updateDOM = () => {
    const modifyTransition = () => {
      const css = document.createElement("style");
      css.type = "text/css";
      css.textContent = "*,*::before,*::after{transition:none!important;}";
      document.head.appendChild(css);
      return () => {
        getComputedStyle(document.body);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            document.head.removeChild(css);
          });
        });
      };
    };

    const restoreTransitions = modifyTransition();
    const theme = localStorage.getItem(storageKey) ?? "system";
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const resolvedTheme = theme === "system" ? systemTheme : theme;

    const allThemeClasses = themeList
      .map(t => t.class)
      .filter(c => c !== "system" && c !== "light");

    document.documentElement.classList.remove(...allThemeClasses);

    if (resolvedTheme !== "light" && resolvedTheme !== "system") {
      const themeObj = themeList.find(t => t.id === resolvedTheme);
      if (themeObj) {
        document.documentElement.classList.add(themeObj.class);
      }
    }

    document.documentElement.setAttribute("data-theme", theme);

    // --- 8-Bit Theme Logic ---
    document.documentElement.style.fontFamily = "";
    const existingOverlay = document.getElementById("eight-bit-overlay");
    if (existingOverlay) existingOverlay.remove();

    if (resolvedTheme === "8bit") {
      if (!document.getElementById("eight-bit-font-link")) {
        const fontLink = document.createElement("link");
        fontLink.id = "eight-bit-font-link";
        fontLink.rel = "stylesheet";
        fontLink.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap";
        document.head.appendChild(fontLink);
      }
      document.documentElement.style.fontFamily = "'Press Start 2P', 'VT323', monospace";

      const overlay = document.createElement("div");
      overlay.id = "eight-bit-overlay";
      overlay.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;opacity:0.18;background-image:repeating-linear-gradient(0deg, #ffb7ec 0 2px, transparent 2px 16px), repeating-linear-gradient(90deg, #a78bfa 0 2px, transparent 2px 16px);background-blend-mode:multiply;";
      document.body.appendChild(overlay);
    }

    // --- Background Logic ---
    if (resolvedTheme === "sunset") {
      document.body.style.background = "linear-gradient(120deg, #6d28d9 0%, #f472b6 100%)";
      document.body.style.backgroundAttachment = "fixed";
    } else if (resolvedTheme === "8bit") {
      document.body.style.background = "linear-gradient(135deg, #ffb7ec 0%, #a78bfa 100%)";
      document.body.style.backgroundAttachment = "fixed";
    } else {
      document.body.style.background = "";
      document.body.style.backgroundAttachment = "";
    }

    restoreTransitions();
  };

  window.updateDOM = updateDOM;
  window.updateDOM();

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", window.updateDOM);
}

// --- BAUHAUS THEME SELECTOR UI ---
const ThemeSelector = () => {
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<string>("system");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!mounted) return null;

  const currentThemeData = themes.find(t => t.id === currentTheme);

  return (
    <div className="relative font-sans" ref={containerRef}>
      
      {/* 1. THE TRIGGER BUTTON */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative flex items-center justify-between gap-3 px-4 py-2 
          bg-white dark:bg-black text-black dark:text-white
          border-2 border-black dark:border-white
          transition-all duration-100 ease-linear
          hover:bg-[#F4B400] hover:text-black hover:border-black
          focus:outline-none
          ${isOpen 
            ? "translate-x-[2px] translate-y-[2px] shadow-none bg-[#F4B400] text-black" 
            : "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
          }
        `}
        aria-label="Select Theme"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg leading-none filter grayscale">{currentThemeData?.icon}</span>
          <span className="font-mono text-xs font-bold uppercase tracking-widest hidden md:inline-block">
            {currentThemeData?.name.split('_')[0]}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* 2. THE DROPDOWN MENU */}
      {isOpen && (
        <div 
          className="absolute right-0 top-full mt-2 w-64 bg-[#F4F3EF] dark:bg-[#111] border-2 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] z-50 animate-in fade-in zoom-in-95 duration-100"
        >
          {/* Header Decoration */}
          <div className="h-2 w-full flex border-b-2 border-black dark:border-white">
             <div className="w-1/3 bg-[#FF3B30]"></div>
             <div className="w-1/3 bg-[#2B4592]"></div>
             <div className="w-1/3 bg-[#F4B400]"></div>
          </div>

          <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-black dark:scrollbar-thumb-white">
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
                    w-full flex items-center justify-between px-4 py-3 text-left border-b-2 border-black/10 dark:border-white/10 last:border-0
                    transition-colors duration-150 group
                    ${isActive 
                      ? "bg-black text-white dark:bg-white dark:text-black" 
                      : "hover:bg-[#2B4592] hover:text-white dark:hover:bg-[#FF3B30]"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl filter grayscale group-hover:grayscale-0 transition-all">{theme.icon}</span>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">{theme.name}</span>
                  </div>
                  
                  {isActive ? (
                    <Square className="w-3 h-3 fill-current" />
                  ) : (
                    <Circle className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export const Script = memo(() => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
        const themes = ${JSON.stringify(themes)};
        (${NoFOUCScript.toString()})('${STORAGE_KEY}', themes);
      `,
    }}
  />
));

Script.displayName = "ThemeScript";

const ClientScript = dynamic(() => Promise.resolve(Script), { ssr: false });

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <>
      {mounted && <ClientScript />}
      <ThemeSelector />
    </>
  );
};