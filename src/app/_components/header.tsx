import Link from "next/link";

/**
 * Header component
 * Displays the site navigation with links to main sections
 */
const Header = () => {
  return (
    <div className="flex justify-between items-center mb-20 mt-8">
      {/* Home link */}
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight">
        <Link href="/" className="hover:underline">
          Home
        </Link>
      </h2>
      {/* Main navigation */}
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/music" className="hover:underline">
              Music
            </Link>
          </li>
          <li>
            <Link href="/art" className="hover:underline">
              Art
            </Link>
          </li>
          <li>
            <Link href="/projects" className="hover:underline">
              Projects
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;