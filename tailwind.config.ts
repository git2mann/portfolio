import type { Config } from "tailwindcss";

// Tailwind CSS configuration
const config: Config = {
  // Enables class-based dark mode (e.g., 'dark:bg-black')
  darkMode: "class",

  // Defines the paths to all files that contain Tailwind CSS classes
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        'sans': [
          'Lato',
          'sans-serif',
        ],
        'serif': [
          'Lato',
          'sans-serif',
        ],
        'noto-display-condensed': [
          'Lato',
          'sans-serif',
        ],
        'skinny-serif': [
          'Cormorant Garamond',
          'serif',
        ],
      },
      // Custom background gradients
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      // Custom color palette mapped to theme variables
      colors: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        "background-primary": "var(--background-primary)",
        "background-secondary": "var(--background-secondary)",
        "accent-blue": "var(--accent-blue)",
        "glass-bg": "var(--glass-bg)",
        "glass-border": "var(--glass-border)",
        "accent-1": "#FAFAFA",
        "accent-2": "#EAEAEA",
        "accent-7": "#333",
        success: "#0070f3",
        cyan: "#79FFE1",
      },

      // Additional spacing values for layout flexibility
      spacing: {
        28: "7rem", // Custom spacing value
      },

      // Letter spacing adjustments
      letterSpacing: {
        tighter: "-.04em", // Makes text more compact
      },

      // Custom font sizes for better typography
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },

      // Custom box shadows for depth and elevation effects
      boxShadow: {
        sm: "0 5px 10px rgba(0, 0, 0, 0.12)",
        md: "0 8px 30px rgba(0, 0, 0, 0.12)",
        highlight: "0 0 15px rgba(55, 65, 81, 0.1)",
      },

      // Custom animations for UI effects
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'spin-slow': 'spin 8s linear infinite',
      },

      // Keyframes for custom animations
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },

      // Custom easing function for smooth animations
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },

      // Custom container settings
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },

  // Tailwind plugins (empty for now, but can be extended later)
  plugins: [],
};

export default config;
