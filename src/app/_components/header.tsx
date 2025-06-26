"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
	{ href: "/blog", label: "Blog" },
	{ href: "/music", label: "Music" },
	{ href: "/art", label: "Art" },
	{ href: "/projects", label: "Projects" },
	{ href: "/contact", label: "Contact Me" }
];

const Header = () => {
	const pathname = usePathname();
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	// Close the menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<header className="sticky top-0 z-50 bg-[var(--background-primary)]/80 backdrop-blur-lg border-b border-[var(--border-color)] shadow-md">
			<div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
				<div className="flex justify-between items-center h-16">
					{/* Logo / Home Link */}
					<Link
						href="/"
						aria-label="Home"
						className={`text-2xl md:text-3xl font-extrabold tracking-tight transition-colors ${
							pathname === "/"
								? "text-[var(--text-primary)]"
								: "text-[var(--text-primary)] hover:text-[var(--text-secondary)]"
						}`}
					>
						<Image
							src="/assets/blog/authors/IMG_7908.PNG"
							alt="Home"
							width={40}
							height={40}
							className="rounded-full border border-[var(--border-color)] shadow-sm"
							priority
						/>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-10">
						{navLinks.map(({ href, label }) => (
							<Link
								key={href}
								href={href}
								className={`relative text-lg font-medium transition-colors duration-200 after:content-[''] after:block after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full ${
									pathname === href
										? "text-[var(--text-primary)]"
										: "text-[var(--text-primary)] hover:text-[var(--text-secondary)]"
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
							className="md:hidden p-2 rounded-md hover:bg-[var(--hover-background)] transition"
							aria-label="Toggle Menu"
						>
							{menuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Navigation */}
			{menuOpen && (
				<div
					ref={menuRef}
					className="md:hidden bg-[var(--background-primary)] border-t border-[var(--border-color)] shadow-lg"
				>
					<nav className="flex flex-col space-y-4 p-6">
						{navLinks.map(({ href, label }) => (
							<Link
								key={href}
								href={href}
								className={`text-lg font-medium transition-colors ${
									pathname === href
										? "text-[var(--text-primary)]"
										: "text-[var(--text-primary)] hover:text-[var(--text-secondary)]"
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
