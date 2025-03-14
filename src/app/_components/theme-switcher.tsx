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

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    setIsOpen(false);
  };

  if (!mounted) return null;

  const currentThemeData = themes.find(t => t.id === currentTheme);

  
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
