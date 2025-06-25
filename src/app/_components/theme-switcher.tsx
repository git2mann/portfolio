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
  { id: "sunset", name: "Sunset", icon: "🌅", class: "theme-sunset" },
  { id: "metallic", name: "Space Grey", icon: "📱", class: "theme-metallic" }
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
  const [menuPosition, setMenuPosition] = useState<'bottom' | 'top'>('bottom');
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Add blur effect to entire page when menu is open
  useEffect(() => {
    if (isOpen) {
      // Get the current theme to handle Space Grey differently
      const currentThemeClass = document.documentElement.className;
      const isSpaceGrey = currentThemeClass.includes('theme-metallic');
      
      if (isSpaceGrey) {
        // For Space Grey theme, be more selective about what gets blurred
        const elementsToBlur = document.querySelectorAll('main > *, [data-main-content] > *, #app > *, #root > *:not(header):not(nav)');
        elementsToBlur.forEach(element => {
          if (!element.contains(containerRef.current!) && 
              element.tagName !== 'SCRIPT' && 
              element.tagName !== 'STYLE') {
            (element as HTMLElement).style.filter = 'blur(3px) saturate(110%)';
            (element as HTMLElement).style.transition = 'filter 300ms ease-out';
          }
        });
      } else {
        // For other themes, use the original approach
        const mainContent = document.querySelector('main, #__next, [data-reactroot]') as HTMLElement;
        if (mainContent && !mainContent.contains(containerRef.current)) {
          mainContent.style.filter = 'blur(4px) saturate(120%)';
          mainContent.style.transition = 'filter 300ms ease-out';
        } else {
          // Alternative: blur all direct children of body except our container
          const bodyChildren = Array.from(document.body.children);
          bodyChildren.forEach(child => {
            if (!child.contains(containerRef.current!) && 
                child.tagName !== 'SCRIPT' && 
                child.tagName !== 'STYLE') {
              (child as HTMLElement).style.filter = 'blur(4px) saturate(120%)';
              (child as HTMLElement).style.transition = 'filter 300ms ease-out';
            }
          });
        }
      }
    } else {
      // Remove blur effect from all possible elements
      const allPossibleElements = [
        ...Array.from(document.querySelectorAll('main > *, [data-main-content] > *, #app > *, #root > *')),
        ...Array.from(document.body.children),
        document.querySelector('main, #__next, [data-reactroot]')
      ].filter(Boolean);
      
      allPossibleElements.forEach(element => {
        if (element && element.tagName !== 'SCRIPT' && element.tagName !== 'STYLE') {
          (element as HTMLElement).style.filter = '';
        }
      });
    }

    return () => {
      // Cleanup on unmount - remove blur from all possible elements
      const allPossibleElements = [
        ...Array.from(document.querySelectorAll('main > *, [data-main-content] > *, #app > *, #root > *')),
        ...Array.from(document.body.children),
        document.querySelector('main, #__next, [data-reactroot]')
      ].filter(Boolean);
      
      allPossibleElements.forEach(element => {
        if (element && element.tagName !== 'SCRIPT' && element.tagName !== 'STYLE') {
          (element as HTMLElement).style.filter = '';
        }
      });
    };
  }, [isOpen]);

  // Calculate menu position to prevent viewport overflow
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const menuHeight = themes.length * 48 + 32;
      const spaceBelow = window.innerHeight - buttonRect.bottom - 8;
      const spaceAbove = buttonRect.top - 8;
      
      if (spaceBelow < menuHeight && spaceAbove > spaceBelow && spaceAbove > menuHeight) {
        setMenuPosition('top');
      } else {
        setMenuPosition('bottom');
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Keyboard navigation for menu
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const options = menuRef.current?.querySelectorAll<HTMLButtonElement>(".theme-option");
        if (!options || options.length === 0) return;
        const activeIndex = Array.from(options).findIndex(
          (el) => el.getAttribute("data-active") === "true"
        );
        let nextIndex = 0;
        if (e.key === "ArrowDown") {
          nextIndex = activeIndex === -1 ? 0 : (activeIndex + 1) % options.length;
        } else {
          nextIndex = activeIndex === -1 ? options.length - 1 : (activeIndex - 1 + options.length) % options.length;
        }
        options[nextIndex].focus();
      }
      if ((e.key === "Enter" || e.key === " ") && document.activeElement?.classList.contains("theme-option")) {
        (document.activeElement as HTMLButtonElement).click();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleThemeChange = (themeId: string) => {
    // Start the blur animation out first
    setIsOpen(false);
    
    // Delay the theme change to allow blur animation to complete
    setTimeout(() => {
      setCurrentTheme(themeId);
      buttonRef.current?.focus();
    }, 150); // Half of the 300ms animation duration
  };

  if (!mounted) return null;

  const currentThemeData = themes.find(t => t.id === currentTheme);

  return (
    <div className="relative" ref={containerRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((open) => !open)}
        className="theme-switcher-button flex items-center space-x-2 rounded-lg px-3 py-2
          hover:bg-gray-100 dark:hover:bg-slate-800
          transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
          border border-transparent"
        aria-label="Toggle theme selector"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        tabIndex={0}
        title={currentThemeData?.name}
      >
        <span className="text-xl">{currentThemeData?.icon}</span>
        <span className="sr-only">{currentThemeData?.name}</span>
        <svg className="ml-1 w-3 h-3 text-gray-500 dark:text-gray-400" viewBox="0 0 12 8" fill="none" aria-hidden="true">
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10 bg-black/5 dark:bg-black/10 
                       transition-all duration-300 ease-out"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            ref={menuRef}
            className={`theme-switcher-menu absolute w-48 max-h-80 overflow-auto rounded-lg shadow-xl 
              bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 z-20
              ${menuPosition === 'top' ? 'bottom-full right-0 mb-2' : 'top-full right-0 mt-2'}`}
            role="listbox"
            aria-activedescendant={currentTheme}
            style={{
              maxHeight: menuPosition === 'top' ? '60vh' : '80vh',
              overflowY: 'auto',
              minWidth: '12rem',
              maxWidth: '90vw',
              position: 'absolute',
              top: menuPosition === 'top' ? 'auto' : '100%',
              bottom: menuPosition === 'top' ? '100%' : 'auto',
              right: '0',
              left: 'auto',
              transform: 'none'
            }}
          >
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`theme-option w-full flex items-center space-x-3 px-4 py-2 text-left transition-colors
                  hover:bg-gray-100 dark:hover:bg-slate-700
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                  ${
                    currentTheme === theme.id
                      ? "bg-gray-100 dark:bg-slate-700 font-bold"
                      : ""
                  }`}
                role="option"
                aria-selected={currentTheme === theme.id}
                data-active={currentTheme === theme.id}
                tabIndex={0}
                autoFocus={currentTheme === theme.id}
              >
                <span className="text-xl">{theme.icon}</span>
                <span className="text-sm font-medium truncate">{theme.name}</span>
                {currentTheme === theme.id && (
                  <span className="ml-auto text-blue-500 flex-shrink-0" aria-hidden="true">✓</span>
                )}
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