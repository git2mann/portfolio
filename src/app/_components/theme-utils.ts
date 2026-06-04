
export type Theme = {
  id: string;
  name: string;
  icon: string;
  class: string;
};

export const STORAGE_KEY = "theme";

export const themes: Theme[] = [
  { id: "system", name: "Auto_Sys", icon: "⚙️", class: "system" },
  { id: "light", name: "Light_Mode", icon: "☀️", class: "light" },
  { id: "dark", name: "Dark_Mode", icon: "🌑", class: "dark" },
  { id: "pastel", name: "Pastel", icon: "🌸", class: "theme-pastel" },
  { id: "forest", name: "Forest", icon: "🌲", class: "theme-forest" },
  { id: "ocean", name: "Ocean", icon: "🌊", class: "theme-ocean" },
  { id: "sunset", name: "Sunset", icon: "🌅", class: "theme-sunset" },
  { id: "metallic-silver", name: "Chrome", icon: "💿", class: "theme-metallic-silver" }
];

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

    // Only disable transitions on the initial load to prevent FOUC.
    // For runtime switches, we want transitions to happen smoothly.
    const isInitial = !(window as any).__initialThemeLoaded;
    const restoreTransitions = isInitial ? modifyTransition() : () => {};
    if (isInitial) {
      (window as any).__initialThemeLoaded = true;
    }
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

    // --- Clean up 8-Bit fragments if they exist ---
    document.documentElement.style.fontFamily = "";
    const existingOverlay = document.getElementById("eight-bit-overlay");
    if (existingOverlay) existingOverlay.remove();

    restoreTransitions();
  };

  (window as any).updateDOM = updateDOM;
  (window as any).updateDOM();

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (window as any).updateDOM);
}
