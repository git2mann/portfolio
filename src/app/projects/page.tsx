"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from "@/app/_components/container";
import { ArrowRight, Terminal, Cpu, Box, Layout, Zap, Globe, Github, ExternalLink, Activity } from 'lucide-react';
import ScrollReveal from "@/app/_components/ScrollReveal";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', label: 'All Projects', icon: Layout },
    { id: 'web', label: 'Web Systems', icon: Globe },
    { id: 'mobile', label: 'Mobile Apps', icon: Terminal },
    { id: 'ai', label: 'Intelligence', icon: Cpu }
  ];

  return (
    <main className="min-h-screen pb-32">
      
      {/* --- HERO SECTION: DICTIONARY ENTRY --- */}
      <section className="relative min-h-[70vh] md:h-[85vh] flex flex-col justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            suppressHydrationWarning
            className="w-full h-full object-cover scale-105 blur-2xl opacity-20"
          >
            <source src="/assets/LN Portfolio Asset Figurine Projects Loop Video Square.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background-primary/50 via-transparent to-background-primary"></div>
        </div>

        <Container className="relative z-10 w-full !max-w-none px-6 md:px-20">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-24">
            {/* Left: Dictionary Text */}
            <div className="flex-1 text-left relative z-10">
              <div className="mb-8 md:mb-12 animate-in fade-in slide-in-from-left-8 duration-1000">
                 <div className="flex items-center gap-6 mb-4 md:mb-8">
                    <span className="w-12 md:w-20 h-[1px] bg-green-500/50"></span>
                    <span className="text-green-500 font-medium text-xs md:text-sm uppercase tracking-[0.5em]">Engineering</span>
                 </div>
                 <h1 className="text-6xl sm:text-7xl md:text-[11rem] font-light tracking-tighter leading-[0.8] mb-6 md:mb-10">
                   Code
                 </h1>
                 <div className="flex flex-wrap items-center gap-4 md:gap-8 text-xl md:text-4xl font-mono text-secondary">
                   <span>/koʊd/</span>
                   <span className="w-2 h-2 rounded-full bg-green-500/50"></span>
                   <span>noun</span>
                 </div>
              </div>
              
              <ScrollReveal 
                baseOpacity={0}
                enableBlur={true}
                blurStrength={10}
                textClassName="text-xl md:text-5xl font-light text-primary mt-8 md:mt-12 leading-tight max-w-2xl"
                stagger={0.08}
                duration={1}
                autoReveal={true}
              >
                1. The translation of human logic into machine execution. 2. A system of rules and structural protocols used to solve complex human problems.
              </ScrollReveal>

              <div className="mt-12 md:mt-24 flex flex-wrap gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                <Link 
                  href="https://github.com/git2mann"
                  target="_blank"
                  className="px-8 md:px-10 py-3 md:py-4 rounded-full font-medium text-sm md:text-base uppercase tracking-widest transition-all bg-primary text-background-primary shadow-[0_0_30px_rgba(var(--text-primary-rgb),0.2)] flex items-center gap-3 hover:scale-105 active:scale-95"
                >
                  <Github size={20} /> GitHub Profile
                </Link>
                <Link href="/contact" className="px-8 md:px-10 py-3 md:py-4 rounded-full liquid-glass-clear font-medium text-sm md:text-base uppercase tracking-widest hover:bg-white/5 transition-all hover:scale-105 active:scale-95">
                  Contact
                </Link>
              </div>
            </div>

            {/* Right: Layered Figurine Visual */}
            <div className="flex-[0.6] md:flex-[0.8] w-full max-w-[300px] md:max-w-[600px] relative mt-8 md:mt-0">
               <div className="relative aspect-square w-full group">
                  <div className="absolute inset-0 bg-green-500/5 blur-3xl rounded-full opacity-60"></div>
                  <Image 
                    src="/assets/LN Projects Still.png" 
                    alt="Engineering Figurine"
                    fill
                    className="object-contain z-10 transition-all duration-1000 group-hover:scale-105 drop-shadow-[0_20px_80px_rgba(0,0,0,0.4)]"
                    priority
                  />
               </div>
            </div>
          </div>
        </Container>
      </section>

      {/* --- NAVIGATION / TABS --- */}
      <div id="projects" className="sticky top-16 md:top-24 z-40 mb-12 md:mb-20 pt-6 md:pt-10">
        <div className="max-w-fit mx-auto liquid-glass px-2 py-2 rounded-full shadow-lg border border-white/5">
          <nav className="flex gap-1 md:gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`
                  flex items-center gap-3 px-6 md:px-10 py-2.5 md:py-3.5 rounded-full text-sm md:text-base font-medium uppercase tracking-widest transition-all
                  ${activeTab === cat.id 
                    ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]' 
                    : 'text-secondary hover:text-primary'
                  }
                `}
              >
                {cat.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <Container className="!max-w-none px-6 md:px-20">
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-20 gap-8 md:gap-12 border-l-2 border-green-500/20 pl-8 md:pl-12">
             <div>
                <div className="flex items-center gap-4 mb-4 md:mb-6">
                    <span className="text-green-500 font-medium text-xs md:text-sm uppercase tracking-[0.4em]">Section 01</span>
                    <span className="text-secondary opacity-30 font-mono text-xs md:text-sm">REPOSITORY</span>
                </div>
                <h2 className="text-4xl md:text-9xl font-light uppercase tracking-tighter leading-none text-primary">Coming Soon</h2>
                <p className="text-secondary font-medium text-base md:text-2xl mt-6 md:mt-10 max-w-2xl opacity-70 leading-relaxed">I am currently organizing my development projects for display. Detailed case studies, live demos, and source code will be available here soon.</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-32">
            <div className="group relative flex flex-col bg-white/[0.02] border border-white/5 p-10 md:p-20 rounded-sm overflow-hidden">
               <div className="absolute top-6 right-8 font-mono text-xs md:text-sm opacity-30 uppercase tracking-widest pointer-events-none text-secondary font-bold text-green-500">Status: In Progress</div>
               <div className="relative z-10">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-green-500/10 text-green-500 mb-8 md:mb-12 flex items-center justify-center border border-green-500/20">
                     <Activity size={24} />
                  </div>
                  <h3 className="text-4xl md:text-7xl font-light mb-6 md:mb-10 uppercase tracking-tight text-primary">Development In Progress</h3>
                  <p className="text-secondary text-lg md:text-2xl font-medium leading-relaxed max-w-xl mb-12 md:mb-16 opacity-80">
                     I am currently documenting my latest technical works and preparing my repositories for public access. In the meantime, you can explore my open-source contributions directly on GitHub.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 md:gap-12">
                     <Link 
                        href="https://github.com/git2mann" 
                        target="_blank"
                        className="group/btn flex items-center gap-4 text-sm md:text-lg font-medium uppercase tracking-[0.3em] pb-2 border-b-2 border-green-500/40 hover:border-green-500 transition-all hover:gap-8"
                     >
                        GitHub Profile <ExternalLink size={20} />
                     </Link>
                     <Link href="/contact" className="group/btn flex items-center gap-4 text-sm md:text-lg font-medium uppercase tracking-[0.3em] pb-2 border-b-2 border-white/20 hover:border-white transition-all hover:gap-8">
                        Inquire <ArrowRight size={20} />
                     </Link>
                  </div>
               </div>
               <div className="mt-16 md:mt-24 h-px w-full bg-white/5 relative overflow-hidden">
                  <motion.div 
                    animate={{ x: ["-100%", "200%"] }} 
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 h-full w-1/4 bg-gradient-to-r from-transparent via-green-500/40 to-transparent"
                  />
               </div>
            </div>

            <div className="hidden md:flex flex-col justify-center gap-6 opacity-10 pointer-events-none">
               {[1, 2, 3].map(i => (
                 <div key={i} className="h-24 md:h-32 border border-white/10 rounded-sm flex items-center px-12 justify-between font-mono text-sm md:text-base uppercase tracking-widest">
                    <span>Module_00{i}</span>
                    <span>Locked_Data</span>
                    <div className="w-2 h-2 rounded-full bg-white/20"></div>
                 </div>
               ))}
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
