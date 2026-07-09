"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronRight, FileText, Music, Palette, Briefcase, Mail, Home } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

const navLinks = [
    { href: "/", label: "Home", icon: Home, detail: "Landing overview" },
    { href: "/blog", label: "Blog", icon: FileText, detail: "Writing and field notes" },
    { href: "/music", label: "Music", icon: Music, detail: "Releases and sound" },
    { href: "/art", label: "Art", icon: Palette, detail: "Visual experiments" },
    { href: "/projects", label: "Projects", icon: Briefcase, detail: "Systems and builds" },
    { href: "/contact", label: "Contact", icon: Mail, detail: "Start a conversation" }
];

const Header = () => {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuOpen]);

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    return (
        <header 
            className={`sticky top-0 z-[100] transition-all duration-700 ${
                scrolled ? "py-2 md:py-3" : "py-4 md:py-6"
            }`}
        >
            <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                <nav className={`
                    header-glass relative overflow-hidden rounded-[2.5rem] 
                    transition-all duration-700 px-6 py-2.5 flex justify-between items-center
                    ${scrolled ? "scale-[0.99] shadow-2xl" : "scale-100 shadow-none"}
                    ${scrolled ? "hover:scale-[0.99]" : "hover:scale-100"}
                `}>
                    
                    {/* --- BACKGROUND EFFECTS LAYER --- */}
                    <div className="absolute inset-0 z-0 overflow-hidden rounded-[2.5rem] pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-40" />
                        <motion.div 
                          className="absolute -inset-[50%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_60%)] z-0"
                          animate={{ 
                            x: scrolled ? '20%' : '-10%',
                            y: scrolled ? '10%' : '-5%'
                          }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                    </div>

                    {/* --- LEFT: IDENTITY --- */}
                    <div className="flex items-center gap-6 z-10">
                        <Link href="/" className="flex items-center gap-4 group">
                            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/40 shadow-inner transition-transform group-hover:scale-110">
                                <Image
                                    src="/assets/blog/authors/IMG_7908.PNG"
                                    alt="Klense"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <span className="hidden sm:inline font-medium text-2xl tracking-tight text-primary">
                                Leon Nduati
                            </span>
                        </Link>
                    </div>

                    {/* --- CENTER: NAVIGATION (Desktop) --- */}
                    <div className="hidden lg:flex items-center gap-2 z-10">
                        {navLinks.filter(l => l.href !== '/').map(({ href, label }) => {
                            const isActive = pathname === href;
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`
                                        relative px-5 py-2.5 rounded-full text-base font-medium transition-all duration-500
                                        ${isActive 
                                            ? "text-primary bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] border border-white/20" 
                                            : "text-secondary hover:text-primary hover:bg-white/5 border border-transparent"
                                        }
                                    `}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* --- RIGHT: CONTROLS --- */}
                    <div className="flex items-center gap-2 md:gap-4 z-10">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-primary/5 hover:bg-primary/10 transition-colors"
                            aria-label="Toggle Menu"
                        >
                            {menuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>

                        <ThemeSwitcher />
                    </div>
                </nav>
            </div>
 
            {/* --- MOBILE NAVIGATION MODAL --- */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {menuOpen && (
                        <>
                            {/* Overlay */}
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setMenuOpen(false)}
                                className="fixed inset-0 bg-background-primary opacity-60 backdrop-blur-xl z-[99999] lg:hidden"
                            />
 
                            {/* Modal */}
                            <motion.div 
                                ref={menuRef}
                                initial={{ opacity: 0, y: "4%" }}
                                animate={{ opacity: 1, y: "0%" }}
                                exit={{ opacity: 0, y: "4%" }}
                                className="fixed inset-2 rounded-[2rem] shadow-[0_24px_60px_rgba(0,0,0,0.25)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.6)] z-[100000] overflow-hidden lg:hidden"
                            >
                                <div className="relative h-full glass px-5 py-6">
                                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                                        <div className="absolute -top-24 right-[-4rem] h-56 w-56 rounded-full bg-accent-blue/15 blur-3xl" />
                                        <div className="absolute -bottom-24 left-[-3rem] h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
                                    </div>

                                    <div className="relative z-10 h-full flex flex-col">
                                        <div className="flex justify-between items-start mb-8">
                                            <div>
                                                <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary/55">Navigation</span>
                                                <p className="text-2xl font-light text-primary mt-2 tracking-tight">Choose a destination</p>
                                            </div>
                                            <button 
                                                onClick={() => setMenuOpen(false)}
                                                className="w-11 h-11 rounded-full bg-primary/5 flex items-center justify-center text-primary opacity-70 hover:opacity-100 transition-all border border-primary/10"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>

                                        <nav className="flex-1 overflow-y-auto">
                                            <div className="space-y-1">
                                        {navLinks.map(({ href, label, icon: Icon, detail }) => {
                                            const isActive = pathname === href;
                                            return (
                                                <Link
                                                    key={href}
                                                    href={href}
                                                    className={`
                                                        flex items-center justify-between gap-4 px-2 py-3.5 rounded-xl transition-all duration-300 group
                                                        ${isActive 
                                                            ? "bg-primary/8 text-primary" 
                                                            : "text-primary/85 hover:text-primary hover:bg-primary/5"
                                                        }
                                                    `}
                                                >
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <span className={`h-10 w-10 rounded-full inline-flex items-center justify-center ${isActive ? "bg-primary/10" : "bg-primary/5"}`}>
                                                            <Icon size={17} className={`${isActive ? "text-accent-blue" : "text-primary/70"}`} />
                                                        </span>

                                                        <span className="min-w-0">
                                                            <span className={`block text-2xl leading-none font-light tracking-tight ${isActive ? "text-primary" : "text-primary/90"}`}>
                                                                {label}
                                                            </span>
                                                            <span className={`block text-xs mt-1 truncate uppercase tracking-[0.16em] ${isActive ? "text-accent-blue" : "text-secondary"}`}>
                                                                {detail}
                                                            </span>
                                                        </span>
                                                    </div>

                                                    <ChevronRight size={18} className={`${isActive ? "text-accent-blue" : "text-primary/30"}`} />
                                                </Link>
                                            );
                                        })}
                                            </div>
                                        </nav>

                                        <div className="pt-5 mt-4 border-t border-primary/10 flex items-center justify-between">
                                            <span className="text-[10px] uppercase tracking-[0.24em] text-secondary">Leon Nduati</span>
                                            <span className="text-[10px] uppercase tracking-[0.24em] text-secondary">Portfolio</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </header>
    );
};

export default Header;