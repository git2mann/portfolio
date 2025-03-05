"use client";

import styles from "./switch.module.css";
import { memo, useEffect, useState } from "react";

declare global {
  interface Window {
    updateDOM: () => void;
  }
}

type ColorSchemePreference = "system" | "dark" | "light";

const STORAGE_KEY = "theme";
const modes: ColorSchemePreference[] = ["system", "dark", "light"];

export const NoFOUCScript = (storageKey: string) => {
  const [SYSTEM, DARK, LIGHT] = ["system", "dark", "light"];

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

  const media = matchMedia("(prefers-color-scheme: dark)");

  window.updateDOM = () => {
    const restoreTransitions = modifyTransition();
    const mode = localStorage.getItem(storageKey) ?? SYSTEM;
    const systemMode = media.matches ? DARK : LIGHT;
    const resolvedMode = mode === SYSTEM ? systemMode : mode;
    
    document.documentElement.classList.toggle(DARK, resolvedMode === DARK);
    document.documentElement.setAttribute("data-mode", mode);
    
    restoreTransitions();
  };

  window.updateDOM();
  media.addEventListener("change", window.updateDOM);
};

const Switch = () => {
  const [mode, setMode] = useState<ColorSchemePreference>(
    () => (localStorage.getItem(STORAGE_KEY) ?? "system") as ColorSchemePreference
  );

  useEffect(() => {
    const updateDOM = window.updateDOM;
    
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setMode(e.newValue as ColorSchemePreference);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
    window.updateDOM?.();
  }, [mode]);

  const handleModeSwitch = () => {
    const index = modes.indexOf(mode);
    setMode(modes[(index + 1) % modes.length]);
  };

  return (
    <button
      suppressHydrationWarning
      className={styles.switch}
      onClick={handleModeSwitch}
      aria-label="Toggle theme"
    />
  );
};

const Script = memo(() => (
  <script
    dangerouslySetInnerHTML={{
      __html: `(${NoFOUCScript.toString()})('${STORAGE_KEY}')`,
    }}
  />
));

Script.displayName = "ThemeScript";

export const ThemeSwitcher = () => {
  return (
    <>
      <Script />
      <Switch />
    </>
  );
};
