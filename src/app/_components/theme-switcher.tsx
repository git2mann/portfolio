"use client";

import { memo, useEffect, useState, useRef } from "react";

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

const themes: Theme[] = [
  { id: "system", name: "Auto", icon: "🔄", class: "system" },
  { id: "light", name: "Light", icon: "☀️", class: "light" },
  { id: "dark", name: "Dark Ocean", icon: "🌑", class: "dark" },
  { id: "pastel", name: "Pastel Pink", icon: "🌸", class: "theme-pastel" },
  { id: "forest", name: "Forest", icon: "🌲", class: "theme-forest" },
  { id: "ocean", name: "Ocean", icon: "🌊", class: "theme-ocean" },
  { id: "sunset", name: "Sunset", icon: "🌅", class: "theme-sunset" }
];

export const NoFOUCScript = (storageKey: string, themeList: Theme[]) => {
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
    restoreTransitions();
  };

  window.updateDOM = updateDOM;
  window.updateDOM();
  
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", window.updateDOM);
};

const ThemeSelector = () => {
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<string>("system");
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage?.getItem(STORAGE_KEY) ?? "system";
    setCurrentTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setCurrentTheme(e.newValue || "system");
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage?.setItem(STORAGE_KEY, currentTheme);
    window.updateDOM?.();
  }, [currentTheme, mounted]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    setIsOpen(false);
  };

  if (!mounted) return null;

  const currentThemeData = themes.find(t => t.id === currentTheme);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="theme-switcher-button flex items-center space-x-2 rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200"
        aria-label="Toggle theme selector"
      >
        <span className="text-xl">{currentThemeData?.icon}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0"
            onClick={() => setIsOpen(false)}
          />
          <div className="theme-switcher-menu absolute right-0 top-12 w-48 rounded-lg shadow-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`theme-option w-full flex items-center space-x-3 px-4 py-2 text-left transition-colors hover:bg-gray-100 dark:hover:bg-slate-700 ${
                  currentTheme === theme.id ? "bg-gray-100 dark:bg-slate-700" : ""
                }`}
              >
                <span className="text-xl">{theme.icon}</span>
                <span className="text-sm font-medium">{theme.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const Script = memo(() => (
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

export const ThemeSwitcher = () => {
  return (
    <>
      <Script />
      <ThemeSelector />
    </>
  );
};
