import Link from "next/link";
import { ThemeSwitcher } from "@/app/_components/theme-switcher";

/**
 * Header component
 * Displays the site navigation with links to main sections
 */
const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white/70 dark:bg-black/70 backdrop-blur-md shadow-md rounded-xl">
      {/* Home link */}
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight">
        <Link href="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
          Home
        </Link>
      </h2>
      
      {/* Main navigation */}
      <nav className="flex items-center space-x-6">
        <ul className="flex space-x-4">
          {["Blog", "Music", "Art", "Projects"].map((item) => (
            <li key={item}>
              <Link
                href={/${item.toLowerCase()}}
                className="relative px-4 py-2 text-sm font-medium rounded-md transition-all
                hover:bg-blue-500 hover:text-white dark:hover:bg-blue-400
                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
        
        {/* Integrated Theme Switcher */}
        <ThemeSwitcher />
      </nav>
    </header>
  );
};

export default Header;
