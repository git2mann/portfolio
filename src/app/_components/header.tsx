"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/music", label: "Music" },
  { href: "/art", label: "Art" },
  { href: "/projects", label: "Projects" }
];

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-neutral-300 dark:border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Home Link */}
          <Link
            href="/"
            aria-label="Home"
            className={`text-2xl md:text-3xl font-extrabold tracking-tight transition-colors ${
              pathname === "/"
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
            }`}
          >
            🏡
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`relative text-lg font-medium transition-colors duration-200 after:content-[''] after:block after:h-[2px] after:w-0 after:bg-blue-500 dark:after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === href
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Theme Switcher & Mobile Menu Button */}
          <div className="flex items-center space-x-6">
            <ThemeSwitcher />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-neutral-300 dark:border-slate-800 shadow-lg">
          <nav className="flex flex-col space-y-4 p-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-lg font-medium transition-colors ${
                  pathname === href
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
