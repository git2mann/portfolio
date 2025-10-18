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
					<nav className="hidden lg:flex items-center space-x-10">
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
						<Link
							href="/music/sataop-live"
							className="font-semibold px-4 py-2 rounded-md bg-red-800 text-white shadow hover:bg-red-900 transition-all duration-200"
						>
							Purchase My Latest Album
						</Link>
					</nav>
					{/* Theme Switcher & Mobile Menu Button */}
					<div className="flex items-center space-x-6">
						<ThemeSwitcher />
						<button
							onClick={() => setMenuOpen(!menuOpen)}
							className="lg:hidden p-2 rounded-md hover:bg-[var(--hover-background)] transition"
							aria-label="Toggle Menu"
						>
							{menuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>
			</div>

			{/* 8-bit Lanton's Ant background overlay */}
			<div className="lanton-ant-bg pointer-events-none" aria-hidden="true" />

			{/* Mobile/iPad Navigation */}
			{menuOpen && (
				<div
					ref={menuRef}
					className="lg:hidden bg-[var(--background-primary)] border-t border-[var(--border-color)] shadow-lg"
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
						{/* Special Free Download Button in mobile menu */}
						{/*
						<Link
							href="/releases/half-thoughts"
							className="mt-2 px-5 py-3 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 shadow-lg border-2 border-pink-300/40 animate-download-glow focus:outline-none focus:ring-4 focus:ring-pink-400 text-center"
							style={{ letterSpacing: "0.04em" }}
							aria-label="Free Download: Half Thoughts"
							onClick={() => setMenuOpen(false)}
						>
							Free Download
						</Link>
						*/}
					</nav>
				</div>
			)}
			<style jsx global>{`
				@keyframes download-glow {
					0% {
						box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.7), 0 0 8px 2px #f472b6;
					}
					70% {
						box-shadow: 0 0 0 12px rgba(236, 72, 153, 0), 0 0 16px 4px #f472b6;
					}
					100% {
						box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.7), 0 0 8px 2px #f472b6;
					}
				}
				.animate-download-glow {
					animation: download-glow 2.2s infinite;
				}
			`}</style>
		</header>
	);
};

export default Header;
