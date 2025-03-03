"use client";

import styles from "./switch.module.css";
import { memo, useEffect, useState } from "react";

// Extend global Window interface to include our custom function
declare global {
  var updateDOM: () => void;
}

// Define the possible color scheme preferences
type ColorSchemePreference = "system" | "dark" | "light";

// Key used for storing theme preference in localStorage
const STORAGE_KEY = "nextjs-blog-starter-theme";
// Available theme modes
const modes: ColorSchemePreference[] = ["system", "dark", "light"];

/**
 * NoFOUCScript - Function to be injected as a script tag
 * Prevents Flash of Unstyled Content (FOUC) when loading the page
 * Applies the correct theme before the page renders
 */
export const NoFOUCScript = (storageKey: string) => {
  /* can not use outside constants or function as this script will be injected in a different context */
  const [SYSTEM, DARK, LIGHT] = ["system", "dark", "light"];

  /** 
   * Modify transition globally to avoid patched transitions 
   * Temporarily disables all transitions to prevent flashing
   */
  const modifyTransition = () => {
    const css = document.createElement("style");
    css.textContent = "*,*:after,*:before{transition:none !important;}";
    document.head.appendChild(css);

    return () => {
      /* Force restyle */
      getComputedStyle(document.body);
      /* Wait for next tick before removing */
      setTimeout(() => document.head.removeChild(css), 1);
    };
  };

  // Media query to detect system preference for dark mode
  const media = matchMedia(`(prefers-color-scheme: ${DARK})`);

  /** 
   * Function to update the DOM based on theme preference
   * This is attached to the window object so it can be called from React
   */
  window.updateDOM = () => {
    const restoreTransitions = modifyTransition();
    // Get stored preference or default to system
    const mode = localStorage.getItem(storageKey) ?? SYSTEM;
    // Determine system mode (dark or light)
    const systemMode = media.matches ? DARK : LIGHT;
    // Use system mode if preference is "system", otherwise use stored preference
    const resolvedMode = mode === SYSTEM ? systemMode : mode;
    const classList = document.documentElement.classList;
    
    // Add or remove dark class based on resolved mode
    if (resolvedMode === DARK) classList.add(DARK);
    else classList.remove(DARK);
    
    // Set data-mode attribute for CSS targeting
    document.documentElement.setAttribute("data-mode", mode);
    
    // Re-enable transitions
    restoreTransitions();
  };
  
  // Initial update
  window.updateDOM();
  // Listen for system preference changes
  media.addEventListener("change", window.updateDOM);
};

// Will store the updateDOM function from the window object
let updateDOM: () => void;

/**
 * Switch component
 * Button that toggles between theme modes
 */
const Switch = () => {
  // Initialize state with stored preference or default to "system"
  const [mode, setMode] = useState<ColorSchemePreference>(
    () =>
      ((typeof localStorage !== "undefined" &&
        localStorage.getItem(STORAGE_KEY)) ??
        "system") as ColorSchemePreference,
  );

  useEffect(() => {
    // Store global function to local variable
    updateDOM = window.updateDOM;
    
    // Sync theme across tabs
    addEventListener("storage", (e: StorageEvent): void => {
      e.key === STORAGE_KEY && setMode(e.newValue as ColorSchemePreference);
    });
  }, []);

  useEffect(() => {
    // Update localStorage and apply theme when mode changes
    localStorage.setItem(STORAGE_KEY, mode);
    updateDOM();
  }, [mode]);

  /** Toggle between theme modes in sequence */
  const handleModeSwitch = () => {
    const index = modes.indexOf(mode);
    setMode(modes[(index + 1) % modes.length]);
  };
  
  return (
    <button
      suppressHydrationWarning
      className={styles.switch}
      onClick={handleModeSwitch}
    />
  );
};

// Memoized script component to prevent unnecessary re-renders
const Script = memo(() => (
  <script
    dangerouslySetInnerHTML={{
      __html: `(${NoFOUCScript.toString()})('${STORAGE_KEY}')`,
    }}
  />
));

/**
 * ThemeSwitcher component
 * Combines the script and switch button
 */
export const ThemeSwitcher = () => {
  return (
    <>
      <Script />
      <Switch />
    </>
  );
};