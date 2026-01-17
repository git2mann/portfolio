"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ArrowRight, Circle, Square, Triangle } from "lucide-react";
import Image from "next/image";

const navLinks = [
    { href: "/blog", label: "Blog" },
    { href: "/music", label: "Music" },
    { href: "/art", label: "Art" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" }
];

const Header = () => {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Format current path for the "System Display"
    const currentSection = pathname === "/" ? "ROOT" : pathname?.split('/')[1].toUpperCase();

    // Close the menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-[100] bg-[#F4F3EF] dark:bg-[#0A0A0A] border-b-4 border-black dark:border-white transition-colors duration-300">
            
            {/* 1. THE BAUHAUS STRIPE (Structural Anchor) */}
            <div className="absolute top-0 left-0 w-full h-[4px] flex z-20">
                <div className="w-[10%] bg-[#FF3B30]"></div> {/* International Orange */}
                <div className="w-[10%] bg-[#2B4592]"></div> {/* Klein Blue */}
                <div className="w-[10%] bg-[#F4B400]"></div> {/* Signal Yellow */}
                <div className="w-[70%] bg-black dark:bg-white opacity-10"></div>
            </div>

            {/* Background Texture (Grid) */}
            <div className="absolute inset-0 opacity-10 pointer-events-none z-0" 
                 style={{ 
                   backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
                   backgroundSize: '20px 20px'
                 }}>
            </div>

            <div className="max-w-[1920px] mx-auto px-4 md:px-8 relative z-10">
                <div className="flex justify-between items-stretch h-24">
                    
                    {/* --- LEFT: IDENTITY & SYSTEM STATUS --- */}
                    <div className="flex items-center gap-8">
                        <Link
                            href="/"
                            aria-label="Home"
                            className="flex items-center gap-4 group"
                        >
                            {/* Geometric Avatar Container */}
                            <div className="relative w-14 h-14 bg-white dark:bg-black border-[3px] border-black dark:border-white flex items-center justify-center overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-transform group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none">
                                <Image
                                    src="/assets/blog/authors/IMG_7908.PNG"
                                    alt="Klense"
                                    width={56}
                                    height={56}
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                                    priority
                                />
                            </div>
                            
                            {/* Typography Monolith */}
                            <div className="flex flex-col leading-none">
                                <span className="font-black uppercase text-2xl tracking-tighter text-black dark:text-white group-hover:text-[#FF3B30] transition-colors">
                                    Leon K Nduati
                                </span>
                            </div>
                        </Link>

                        {/* Vertical Divider */}
                        <div className="hidden xl:block w-[2px] h-10 bg-black/10 dark:bg-white/10"></div>

                        {/* Current Path Indicator (The "Breadcrumb") */}
                        <div className="hidden xl:flex flex-col font-mono text-xs uppercase tracking-widest text-gray-400">
                            <span className="text-[10px] text-[#2B4592]">Current_Sector</span>
                            <span className="text-black dark:text-white font-bold text-sm">
                                // {currentSection}
                            </span>
                        </div>
                    </div>

                    {/* --- CENTER: KINETIC NAVIGATION --- */}
                    <nav className="hidden lg:flex items-center h-full">
                        {navLinks.map(({ href, label }) => {
                            const isActive = pathname === href;
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`
                                        group relative h-full flex items-center px-6 font-bold uppercase text-sm tracking-[0.15em] transition-colors
                                        border-l-2 border-transparent hover:border-black/5 dark:hover:border-white/5
                                        ${isActive ? "text-[#FF3B30]" : "text-black dark:text-white"}
                                    `}
                                >
                                    {/* Hover Slide Effect */}
                                    <span className="absolute inset-x-0 bottom-0 h-0 bg-black dark:bg-white transition-all duration-200 ease-out group-hover:h-full -z-10 opacity-5 dark:opacity-20"></span>
                                    
                                    {/* Active Indicator Top */}
                                    {isActive && (
                                        <span className="absolute top-0 left-0 w-full h-[4px] bg-[#FF3B30]"></span>
                                    )}
                                    
                                    {label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* --- RIGHT: CONTROLS & CTA --- */}
                    <div className="flex items-center gap-6">
                        
                        {/* Desktop CTA: The "Ticket" */}
                        <Link
                            href="/music/sataop-live"
                            className="hidden xl:flex group relative bg-[#FF3B30] text-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all"
                        >
                            <div className="flex flex-col items-start leading-none gap-1">
                                <span className="text-[8px] opacity-70">New Release</span>
                                <span className="flex items-center gap-2">
                                    LIVE_LP <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                            
                            {/* Decorative Cutout Circles (Ticket style) */}
                            <div className="absolute top-1/2 -left-[5px] w-[8px] h-[8px] bg-[#F4F3EF] dark:bg-[#0A0A0A] rounded-full -translate-y-1/2 border-r-2 border-black"></div>
                            <div className="absolute top-1/2 -right-[5px] w-[8px] h-[8px] bg-[#F4F3EF] dark:bg-[#0A0A0A] rounded-full -translate-y-1/2 border-l-2 border-black"></div>
                        </Link>

                        {/* Theme Switcher */}
                        <div className="border-2 border-black dark:border-white p-1 bg-white dark:bg-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-shadow">
                            <ThemeSwitcher />
                        </div>

                        {/* Mobile Menu Trigger */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="lg:hidden w-12 h-12 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black border-2 border-transparent hover:bg-[#FF3B30] hover:text-white transition-colors"
                            aria-label="Toggle Menu"
                        >
                            {menuOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* --- MOBILE NAVIGATION DRAWER (The "Blueprint") --- */}
            {menuOpen && (
                <div
                    ref={menuRef}
                    className="lg:hidden absolute top-full left-0 w-full h-[calc(100vh-6rem)] bg-[#F4F3EF] dark:bg-[#0A0A0A] border-b-4 border-black dark:border-white shadow-2xl flex flex-col animate-in slide-in-from-top-2 duration-300 overflow-y-auto"
                >
                    {/* Drawer Header Decoration */}
                    <div className="h-4 w-full flex border-b-2 border-black dark:border-white">
                        <div className="w-full bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,#000_5px,#000_6px)] opacity-10"></div>
                    </div>

                    <nav className="flex flex-col p-6 gap-0">
                        {navLinks.map(({ href, label }, idx) => (
                            <Link
                                key={href}
                                href={href}
                                className={`
                                    group flex items-center justify-between
                                    text-4xl font-black uppercase tracking-tighter py-6 border-b-2 border-black/10 dark:border-white/10
                                    transition-all duration-200
                                    ${pathname === href
                                        ? "text-[#FF3B30] pl-4"
                                        : "text-black dark:text-white hover:pl-4 hover:bg-white dark:hover:bg-white/5"
                                    }
                                `}
                                onClick={() => setMenuOpen(false)}
                            >
                                <div className="flex items-baseline gap-4">
                                    <span className="font-mono text-sm text-gray-400 font-normal">0{idx + 1}</span>
                                    <span>{label}</span>
                                </div>
                                <ArrowRight className={`w-6 h-6 transition-opacity ${pathname === href ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                            </Link>
                        ))}
                        
                        {/* Mobile CTA */}
                        <div className="mt-8 p-6 bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white">
                            <div className="font-mono text-xs uppercase tracking-widest mb-2 opacity-70">Featured Release</div>
                            <Link
                                href="/music/sataop-live"
                                className="flex items-center justify-between"
                                onClick={() => setMenuOpen(false)}
                            >
                                <span className="text-xl font-bold uppercase">Squealer Live '25</span>
                                <div className="w-10 h-10 bg-[#FF3B30] flex items-center justify-center">
                                    <ArrowRight className="w-5 h-5 text-white" />
                                </div>
                            </Link>
                        </div>
                    </nav>
                    
                    {/* Drawer Footer */}
                    <div className="mt-auto p-6 border-t-4 border-black dark:border-white flex justify-between items-end bg-[#EAE8E3] dark:bg-zinc-900">
                        <div className="flex gap-2">
                            <Square className="w-4 h-4 fill-[#FF3B30] text-black" />
                            <Circle className="w-4 h-4 fill-[#2B4592] text-black" />
                            <Triangle className="w-4 h-4 fill-[#F4B400] text-black" />
                        </div>
                        <span className="font-mono text-[10px] uppercase">End of Navigation</span>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;