import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";

/**
 * Header component
 * Displays the site navigation with links to main sections and theme switcher
 */
const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-neutral-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Home link */}
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight md:tracking-tighter leading-tight">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              🏡
            </Link>
          </h2>

          <div className="flex items-center space-x-8">
            {/* Main navigation */}
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link 
                    href="/blog" 
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/music" 
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Music
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/art" 
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Art
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/projects" 
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Projects
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Theme Switcher */}
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
