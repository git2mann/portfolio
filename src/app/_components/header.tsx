import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-neutral-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Home Link */}
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight md:tracking-tighter">
            <Link 
              href="/" 
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              🏡
            </Link>
          </h2>

          {/* Navigation & Theme Switcher */}
          <div className="flex items-center space-x-8">
            <nav>
              <ul className="flex space-x-6">
                {[
                  { href: "/blog", label: "Blog" },
                  { href: "/music", label: "Music" },
                  { href: "/art", label: "Art" },
                  { href: "/projects", label: "Projects" }
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link 
                      href={href} 
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
