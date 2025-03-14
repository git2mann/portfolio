"use client";

import { memo, useEffect, useState } from "react";

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
  { id: "dark", name: "True Black", icon: "🌑", class: "dark" },
  { id: "dark-ocean", name: "Dark Blue", icon: "🌙", class: "theme-dark-ocean" },
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
    
    // Get all theme classes
    const allThemeClasses = themeList
      .map(t => t.class)
      .filter(c => c !== "system" && c !== "light");
    
    // Remove all theme classes
    document.documentElement.classList.remove(...allThemeClasses);
    
    // Add the appropriate theme class
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

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem(STORAGE_KEY) ?? "system";
    setCurrentTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, currentTheme);
    document.documentElement.setAttribute("data-theme", currentTheme);
    if (window.updateDOM) {
      window.updateDOM();
    }
  }, [currentTheme, mounted]);

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    setIsOpen(false);
  };

  if (!mounted) return null;

  const currentThemeData = themes.find((t) => t.id === currentTheme);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-800 shadow-md hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
        aria-label="Toggle theme selector"
      >
        <span className="text-xl">{currentThemeData?.icon}</span>
        <span className="text-sm font-medium">{currentThemeData?.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-48 rounded-lg bg-white dark:bg-gray-900 shadow-lg z-50">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-colors
                ${currentTheme === theme.id ? "bg-blue-100 dark:bg-blue-800" : "hover:bg-gray-100 dark:hover:bg-gray-800"}
              `}
            >
              <span className="text-xl">{theme.icon}</span>
              <span className="text-sm font-medium">{theme.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


