"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/music", label: "Music" },
  { href: "/art", label: "Art" },
  { href: "/projects", label: "Projects" }
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-neutral-300 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Home Link */}
          <Link 
            href="/" 
            className={`text-2xl md:text-3xl font-extrabold tracking-tight hover:text-blue-500 dark:hover:text-blue-400 transition duration-200 ease-in-out ${
              pathname === "/" ? "text-blue-600 dark:text-blue-400" : ""
            }`}
          >
            🏡
          </Link>

          {/* Navigation & Theme Switcher */}
          <div className="flex items-center space-x-10">
            <nav>
              <ul className="flex space-x-8">
                {navLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link 
                      href={href} 
                      className={`font-medium transition duration-200 ease-in-out ${
                        pathname === href 
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
