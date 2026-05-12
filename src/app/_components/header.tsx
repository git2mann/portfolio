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
    { href: "/", label: "Home", icon: Home },
    { href: "/blog", label: "Blog", icon: FileText },
    { href: "/music", label: "Music", icon: Music },
    { href: "/art", label: "Art", icon: Palette },
    { href: "/projects", label: "Projects", icon: Briefcase },
    { href: "/contact", label: "Contact", icon: Mail }
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
                    liquid-glass relative rounded-[2.5rem] 
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
                            <span className="font-medium text-2xl tracking-tight text-primary">
                                Leon Nduati
                            </span>
                        </Link>
                    </div>

                    {/* --- CENTER: NAVIGATION (Desktop) --- */}
                    <div className="hidden md:flex items-center gap-2 z-10">
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
                        <ThemeSwitcher />

                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                            aria-label="Toggle Menu"
                        >
                            {menuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
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
                                className="fixed inset-0 bg-background-primary/60 backdrop-blur-xl z-[99999] md:hidden"
                            />

                            {/* Modal */}
                            <motion.div 
                                ref={menuRef}
                                initial={{ opacity: 0, scale: 0.9, y: "-45%" }}
                                animate={{ opacity: 1, scale: 1, y: "-50%" }}
                                exit={{ opacity: 0, scale: 0.9, y: "-45%" }}
                                className="fixed left-6 right-6 top-1/2 -translate-y-1/2 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] z-[100000] p-4 liquid-glass-clear overflow-hidden md:hidden"
                            >
                                <div className="py-2">
                                    <div className="flex justify-between items-center mb-6 px-4 pt-2">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent-blue">Navigation Hub</span>
                                        <button 
                                            onClick={() => setMenuOpen(false)}
                                            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-secondary hover:text-primary transition-colors border border-white/10"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>

                                    <nav className="grid grid-cols-2 gap-2">
                                        {navLinks.map(({ href, label, icon: Icon }) => {
                                            const isActive = pathname === href;
                                            return (
                                                <Link
                                                    key={href}
                                                    href={href}
                                                    className={`
                                                        flex flex-col items-center justify-center gap-3 p-6 rounded-2xl transition-all border
                                                        ${isActive 
                                                            ? "bg-primary text-background-primary border-white/20 shadow-2xl scale-[1.02]" 
                                                            : "bg-white/[0.02] border-white/5 text-secondary hover:bg-white/5 hover:text-primary"
                                                        }
                                                    `}
                                                >
                                                    <Icon size={28} className={isActive ? "text-background-primary" : "text-accent-blue"} />
                                                    <span className={`text-[10px] font-bold uppercase tracking-[0.3em] ${isActive ? "text-background-primary" : ""}`}>
                                                        {label}
                                                    </span>
                                                </Link>
                                            );
                                        })}
                                    </nav>
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