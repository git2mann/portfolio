"use client";

import { useRef, useEffect, useState } from "react";
import Container from "@/app/_components/container";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cpu, Briefcase, GraduationCap, Award, FileText, ExternalLink, Terminal, Activity, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/app/_components/ScrollReveal";
import { Footer } from "@/app/_components/footer";
import { Post } from "@/interfaces/post";
import { RefractiveButton } from "@/app/_components/RefractiveButton";

const systemsData = {
  qrams: {
    name: "QR-AMS: Attendance Manager",
    role: "Full-Stack Verification System",
    accentColor: "#f05340",
    glowColor: "rgba(240, 83, 64, 0.15)",
    description: "A proposed QR code attendance management system built for Strathmore University, streamlining student check-ins and reducing record manipulation.",
    metrics: [
      { label: "Check-in time", value: "<3s" },
      { label: "Uptime", value: "99.8%" },
      { label: "Deployment", value: "Staging" }
    ],
    stack: ["PHP", "Laravel", "Blade", "MySQL"],
    flow: [
      { name: "QR Code Scan", type: "Input", details: "Mobile student client" },
      { name: "Token Verification", type: "Security", details: "AES-encrypted dynamic keys" },
      { name: "Attendance Log DB", type: "Storage", details: "Relational record storage" },
      { name: "Lecturer Dashboard", type: "Output", details: "Real-time class analytics" }
    ],
    logs: [
      "Generating dynamic attendance session QR...",
      "Awaiting check-in connection...",
      "Checked in student 173922 (Timestamp verified).",
      "Syncing attendance record to academic database."
    ],
    github: "https://github.com/git2mann/QR-AMS"
  },
  prisonGuide: {
    name: "Estonian Prison Tablet Guide",
    role: "Bilingual Digital Handbook App",
    accentColor: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.15)",
    description: "A secure, tablet-focused digital handbook developed for Estonian prisons. Features offline searchability, dark mode, quick tools, and accessibility controls.",
    metrics: [
      { label: "Loading Speed", value: "<100ms" },
      { label: "Languages", value: "Bilingual" },
      { label: "Interface", value: "Tablet Opt" }
    ],
    stack: ["JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
    flow: [
      { name: "Bilingual Handbook Docs", type: "Input", details: "Local JSON resources" },
      { name: "Fuzzy Search Engine", type: "Process", details: "Boyer-Moore offline search" },
      { name: "Accessibility Engine", type: "UI View", details: "Contrast & text size controls" },
      { name: "Inmate Tablet View", type: "Output", details: "Sandboxed client interface" }
    ],
    logs: [
      "Caching handbook content databases...",
      "Accessibility styles loaded successfully.",
      "Offline search database index complete (324 entries).",
      "Ready for client request (Secure sandboxed environment)."
    ],
    github: "https://github.com/git2mann/tablet-prison-guide-estonia"
  },
  k2y: {
    name: "K2Y: Kernel 2 Year",
    role: "2D Time-Manipulation Game",
    accentColor: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.15)",
    description: "A 2D puzzle-platformer game featuring reverse-time mechanics, designed and engineered in Unity in collaboration with Hyperlúdica Studio.",
    metrics: [
      { label: "Platform", value: "Unity" },
      { label: "Framerate", value: "60 FPS" },
      { label: "Engine", value: "C# / .NET" }
    ],
    stack: ["C#", "Unity 2D", "WebGL", "FMOD Audio"],
    flow: [
      { name: "Input & Physics", type: "Input", details: "Player actions & triggers" },
      { name: "Time Buffer Stack", type: "Process", details: "Saves player coordinates history" },
      { name: "Reverse Physics Loop", type: "Logic", details: "Replays frames backwards" },
      { name: "WebGL Game Screen", type: "Output", details: "Smooth 60fps rendering" }
    ],
    logs: [
      "Initializing Unity player engine...",
      "Preloading game sound clips...",
      "Buffer initialized for time reversal state (120 frames).",
      "WebGL canvas rendered at stable 60 FPS."
    ],
    github: "https://github.com/git2mann/K2Y-Kernel2Year"
  },
  articulate: {
    name: "articulate: Interactive Song",
    role: "Art-to-Audio Visualization Project",
    accentColor: "#ec4899",
    glowColor: "rgba(236, 72, 153, 0.15)",
    description: "An interactive project that allows users to experience and visualize the song 'Articulate' dynamically mapped to and driven by its cover art.",
    metrics: [
      { label: "Sample Rate", value: "44.1 kHz" },
      { label: "Type", value: "Visualizer" },
      { label: "Interactivity", value: "High" }
    ],
    stack: ["TypeScript", "Next.js", "Web Audio API", "Tailwind CSS"],
    flow: [
      { name: "Song Audio File", type: "Input", details: "Stereo soundtrack file" },
      { name: "Audio Frequency Node", type: "Process", details: "Fast Fourier Transform" },
      { name: "Cover Art Color Map", type: "Visuals", details: "HSL color palette extract" },
      { name: "Visualizer Canvas", type: "Output", details: "Reactive canvas rendering" }
    ],
    logs: [
      "Audio context initialized...",
      "Extracting cover art HSL palette...",
      "Binding Web Audio analyzer node...",
      "Reactive rendering loop started."
    ],
    github: "https://github.com/git2mann/articulate"
  },
  gpsWebsite: {
    name: "GPS Website Platform",
    role: "Production Web Experience",
    accentColor: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.15)",
    description: "A modern web application platform designed and engineered with TypeScript, featuring high performance, custom animations, and seamless interactive experiences.",
    metrics: [
      { label: "Loading Speed", value: "<150ms" },
      { label: "PageSpeed Score", value: "98/100" },
      { label: "Dynamic Routes", value: "12+" }
    ],
    stack: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
    flow: [
      { name: "User Navigation", type: "Input", details: "Dynamic client route request" },
      { name: "Server-Side Gen", type: "Process", details: "Incremental Static Regeneration (ISR)" },
      { name: "Animation Controller", type: "UI View", details: "Orchestrated Framer Motion transitions" },
      { name: "Rendered Client", type: "Output", details: "Hydrated responsive viewport" }
    ],
    logs: [
      "Compiling dynamic routes...",
      "Statically generating pages with ISR...",
      "Injecting Framer Motion animations...",
      "Web platform compiled successfully (98/100 PageSpeed rank)."
    ],
    github: "https://github.com/git2mann/gps-website"
  },
  secureAES: {
    name: "Secure AES Cryptography",
    role: "Encrypted Key & Payload Utility",
    accentColor: "#22c55e",
    glowColor: "rgba(34, 197, 94, 0.15)",
    description: "A cryptographic system developed in Python executing secure Advanced Encryption Standard (AES) encryptions for data packages and authentication keys.",
    metrics: [
      { label: "Cipher Strength", value: "256-bit" },
      { label: "Encryption Speed", value: "<1.2ms" },
      { label: "Cipher Mode", value: "CBC / GCM" }
    ],
    stack: ["Python", "Cryptography", "PyCryptodome"],
    flow: [
      { name: "Plaintext Payload", type: "Input", details: "Raw sensitive string or file" },
      { name: "Cryptographic Salt", type: "Process", details: "PBKDF2 key derivation function" },
      { name: "AES Encryption", type: "Logic", details: "256-bit CBC/GCM encryption cycle" },
      { name: "Base64 Ciphertext", type: "Output", details: "Secure encrypted output vector" }
    ],
    logs: [
      "Parsing plain payload block...",
      "Deriving secure cryptographic key via PBKDF2...",
      "Encrypting byte stream using AES-256-CBC...",
      "Cipher block chain verified (Initialization Vector generated)."
    ],
    github: "https://github.com/git2mann/SecureAESProject"
  },
  portfolio: {
    name: "Interactive Portfolio",
    role: "Refractive Glassmorphic Site",
    accentColor: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.15)",
    description: "A bespoke developer portfolio showcasing technical systems and creative releases with high-fidelity glassmorphism, responsive shaders, and smooth timelines.",
    metrics: [
      { label: "Animation Uptime", value: "60 FPS" },
      { label: "Lighthouse Score", value: "100/100" },
      { label: "Fluid Shaders", value: "3 Canvas" }
    ],
    stack: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
    flow: [
      { name: "Sound/Interaction", type: "Input", details: "Web Audio & UI hover triggers" },
      { name: "Theme Switcher", type: "Logic", details: "Seamless CSS variable interpolation" },
      { name: "Figurine Renderer", type: "UI View", details: "Layered aspect ratios and relative offsets" },
      { name: "Hydrated Document", type: "Output", details: "Premium glassmorphic dashboard" }
    ],
    logs: [
      "Bootstrapping Next.js portfolio environment...",
      "Caching layout state transitions...",
      "Initializing interactive Web Audio nodes...",
      "Interface hydration complete (Lighthouse audit passed 100/100)."
    ],
    github: "https://github.com/git2mann/portfolio"
  }
};

export default function LandingPageClient({ recentPosts }: { recentPosts: Post[] }) {
  const [mounted, setMounted] = useState(false);
  const [figurineCycle, setFigurineCycle] = useState(0);
  const [selectedSystem, setSelectedSystem] = useState<keyof typeof systemsData>("qrams");
  const [isTabletPortrait, setIsTabletPortrait] = useState(false);
  const [isSystemWindowOpen, setIsSystemWindowOpen] = useState(false);
  const [isSystemWindowMinimized, setIsSystemWindowMinimized] = useState(false);
  const [isSystemWindowDimmed, setIsSystemWindowDimmed] = useState(false);
  const [isCareerWindowOpen, setIsCareerWindowOpen] = useState(false);
  const [isCareerWindowMinimized, setIsCareerWindowMinimized] = useState(false);
  const [isCareerWindowDimmed, setIsCareerWindowDimmed] = useState(false);
  const [isFilesWindowOpen, setIsFilesWindowOpen] = useState(false);
  const [isFilesWindowMinimized, setIsFilesWindowMinimized] = useState(false);
  const [isFilesWindowDimmed, setIsFilesWindowDimmed] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  
  const [consoleHistory, setConsoleHistory] = useState<{ text: string; type: 'system' | 'input' | 'output' | 'error' }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const consoleContainerRef = useRef<HTMLDivElement>(null);
  const [fluxStats, setFluxStats] = useState({
    cpu: 8,
    latency: 12,
    traffic: 98.4,
    packetLoss: 0
  });

  const systemKeys = Object.keys(systemsData) as Array<keyof typeof systemsData>;
  const selectedSystemIndex = Math.max(systemKeys.indexOf(selectedSystem), 0);

  const cycleSystem = (direction: 'prev' | 'next') => {
    const delta = direction === 'next' ? 1 : -1;
    const nextIndex = (selectedSystemIndex + delta + systemKeys.length) % systemKeys.length;
    const nextSystem = systemKeys[nextIndex];
    if (nextSystem) setSelectedSystem(nextSystem);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setFluxStats({
        cpu: Math.floor(Math.random() * 15) + 5,
        latency: Math.floor(Math.random() * 8) + 8,
        traffic: parseFloat((95 + Math.random() * 10).toFixed(1)),
        packetLoss: Math.random() > 0.95 ? 1 : 0
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // When selectedSystem changes, run boot sequence
  useEffect(() => {
    setConsoleHistory([]);
    const sys = systemsData[selectedSystem];
    const lines = [
      { text: `ssh-connect --target=${selectedSystem}`, type: 'input' as const },
      { text: `Establishing secure connection to ${sys.name}...`, type: 'system' as const },
      { text: `Authentication successful. Shell initialized.`, type: 'system' as const },
      ...sys.logs.map(log => ({ text: log, type: 'output' as const })),
      { text: `Type 'help' for available commands.`, type: 'system' as const }
    ];

    let currentIdx = 0;
    const streamTimer = setInterval(() => {
      if (currentIdx < lines.length) {
        const nextLine = lines[currentIdx];
        if (nextLine) {
          setConsoleHistory(prev => [...prev, nextLine]);
        }
        currentIdx++;
      } else {
        clearInterval(streamTimer);
      }
    }, 150);

    return () => clearInterval(streamTimer);
  }, [selectedSystem]);

  // Scroll terminal container to bottom
  useEffect(() => {
    if (consoleContainerRef.current) {
      consoleContainerRef.current.scrollTop = consoleContainerRef.current.scrollHeight;
    }
  }, [consoleHistory]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const cmd = inputValue.trim().toLowerCase();
    const sys = systemsData[selectedSystem];
    
    // Add input to history
    const newHistory = [
      ...consoleHistory,
      { text: `guest@leon-nduati:~$ ${inputValue}`, type: 'input' as const }
    ];
    
    let outputs: { text: string; type: 'system' | 'output' | 'error' }[] = [];

    switch (cmd) {
      case 'help':
        outputs = [
          { text: "Available commands:", type: 'system' as const },
          { text: "  status   - View system operational status & resource load", type: 'output' as const },
          { text: "  metrics  - Print current engineering key performance indicators", type: 'output' as const },
          { text: "  stack    - List technologies deployed in this architecture", type: 'output' as const },
          { text: "  about    - Print project summary and functional description", type: 'output' as const },
          { text: "  pipeline - Print active data pipeline stages", type: 'output' as const },
          { text: "  github   - Display remote source code repository URL", type: 'output' as const },
          { text: "  clear    - Clear console output history buffer", type: 'output' as const },
          { text: "  run      - Trigger diagnostic compilation scan", type: 'output' as const }
        ];
        break;
      case 'clear':
        setConsoleHistory([]);
        setInputValue("");
        return;
      case 'status':
        outputs = [
          { text: `[${sys.name.toUpperCase()} STATUS REPORT]`, type: 'system' as const },
          { text: `Operational state : ACTIVE / STABLE`, type: 'output' as const },
          { text: `Uptime            : 99.98%`, type: 'output' as const },
          { text: `Diagnostics Check : 0 errors / 0 warnings`, type: 'output' as const },
          { text: `Resource Load     : CPU ${fluxStats.cpu}% / MEM 124MB`, type: 'output' as const }
        ];
        break;
      case 'metrics':
        outputs = [
          { text: `[${sys.name.toUpperCase()} METRICS]`, type: 'system' as const },
          ...sys.metrics.map(m => ({ text: `  ${m.label.padEnd(16)}: ${m.value}`, type: 'output' as const }))
        ];
        break;
      case 'stack':
        outputs = [
          { text: `[${sys.name.toUpperCase()} TECH STACK]`, type: 'system' as const },
          { text: `  Primary Stack: ${sys.stack.join(" // ")}`, type: 'output' as const }
        ];
        break;
      case 'about':
        outputs = [
          { text: `[${sys.name.toUpperCase()} DESCRIPTION]`, type: 'system' as const },
          { text: `  Role: ${sys.role}`, type: 'output' as const },
          { text: `  Details: ${sys.description}`, type: 'output' as const }
        ];
        break;
      case 'pipeline':
        outputs = [
          { text: `[${sys.name.toUpperCase()} PIPELINE STAGES]`, type: 'system' as const },
          ...sys.flow.map((node, i) => ({ text: `  [Stage ${i+1}] ${node.type} -> ${node.name} (${node.details})`, type: 'output' as const }))
        ];
        break;
      case 'github':
        outputs = [
          { text: `Repository URL: ${sys.github}`, type: 'output' as const },
          { text: `Source code hosted securely on GitHub.`, type: 'system' as const }
        ];
        break;
      case 'run':
        outputs = [
          { text: `Starting active compiler scan...`, type: 'system' as const },
          { text: `Scanning all files and dependency nodes...`, type: 'output' as const },
          { text: `Lint check: PASSED.`, type: 'output' as const },
          { text: `Build optimization assets compiled in ${Math.floor(Math.random() * 800) + 200}ms.`, type: 'output' as const },
          { text: `System verification: 100% OK.`, type: 'system' as const }
        ];
        break;
      default:
        outputs = [
          { text: `bash: command not found: ${inputValue}. Type 'help' for a list of available commands.`, type: 'error' as const }
        ];
    }

    setConsoleHistory([...newHistory, ...outputs]);
    setInputValue("");
  };

  useEffect(() => {
    setMounted(true);

    const handleViewportChange = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setIsTabletPortrait(w >= 768 && w < 1024 && h > w);
    };
    handleViewportChange();

    if (window.innerWidth >= 1024) {
      setIsSystemWindowOpen(true);
      setIsSystemWindowMinimized(false);
      setIsSystemWindowDimmed(false);
      setIsCareerWindowOpen(true);
      setIsCareerWindowMinimized(false);
      setIsCareerWindowDimmed(false);
      setIsFilesWindowOpen(true);
      setIsFilesWindowMinimized(false);
      setIsFilesWindowDimmed(false);
    }

    window.addEventListener("resize", handleViewportChange);
    
    // Cycle figurines every 5 seconds
    const interval = setInterval(() => {
      setFigurineCycle(prev => (prev + 1) % 3);
    }, 5000);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleViewportChange);
    };
  }, []);

  const handleVideoHover = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {}); 
    }
  };

  const figurines = [
    { id: 'wave', src: "/assets/LN Portfolio Asset Figurine Hero Wave.png" },
    { id: 'dict', src: "/assets/LN Portfolio Asset Figurine Hero Dictionary.png" },
    { id: 'stance', src: "/assets/LN Portfolio Asset Figurine Hero Stance.png" }
  ];

  const getFigurineStyle = (index: number) => {
    const pos = (index + figurineCycle) % 3;
    const sideOffset = isTabletPortrait ? '34%' : '45%';
    const sideScale = isTabletPortrait ? 0.9 : 0.95;
    const centerScale = isTabletPortrait ? 1.22 : 1.4;
    const sideBlur = isTabletPortrait ? 'blur(3px)' : 'blur(4px)';

    if (pos === 0) return { x: `-${sideOffset}`, scale: sideScale, opacity: 1, zIndex: 10, filter: sideBlur };
    if (pos === 1) return { x: '0%', scale: centerScale, opacity: 1, zIndex: 30, filter: 'blur(0px)' };
    return { x: sideOffset, scale: sideScale, opacity: 1, zIndex: 20, filter: sideBlur };
  };

  const heroItems = [
    { title: "music", href: "/music", image: "/assets/LN Music Still.png", video: "/assets/LN Portfolio Asset Figurine Music Loop Video Square.mp4" },
    { title: "art", href: "/art", image: "/assets/LN Art Still.png", video: "/assets/LN Portfolio Asset Figurine Art Loop Video Square.mp4" },
    { title: "code", href: "/projects", image: "/assets/LN Projects Still.png", video: "/assets/LN Portfolio Asset Figurine Projects Loop Video Square.mp4" }
  ];

  if (!mounted) return <main className="min-h-screen w-full bg-background-primary" />;

  return (
    <main className="w-full bg-background-primary relative font-noto-display-condensed text-primary overflow-x-hidden">
      
      {/* GLOBAL ATMOSPHERE */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
         <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-accent-blue/0 via-accent-blue/20 to-accent-blue/0 transform -translate-y-1/2"></div>
         <div className="absolute top-0 left-0 w-full h-full bg-radial-gradient from-accent-blue/5 to-transparent blur-[180px]" />
      </div>

      <div className="relative z-10 flex flex-col w-full">
        {/* --- SECTION 0: HERO --- */}
          <section className="relative min-h-[92svh] flex flex-col items-center justify-center py-14 lg:py-20">
            <Container className="w-full px-6 lg:px-20">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                 <div className="w-full lg:flex-1 text-center lg:text-left">
                  <div className="mb-6 lg:mb-8 flex flex-col items-center lg:items-start">
                    <span className="mb-4 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-accent-blue font-mono">Creative Technologist</span>
                    <h1 className="text-[4.5rem] sm:text-[5.2rem] lg:text-[9.5rem] font-light tracking-[-0.04em] leading-[0.82] mb-5 lg:mb-6 text-primary uppercase">Leon<br/>Nduati</h1>
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 lg:gap-8 text-xl sm:text-2xl lg:text-3xl font-mono text-secondary">
                         <span>/liː.ɒn n.duː.ɑː.ti/</span>
                         <span className="w-1.5 h-1.5 rounded-full bg-accent-blue shadow-[0_0_15px_rgba(43,69,146,0.5)]"></span>
                         <span>noun</span>
                       </div>
                    </div>
                    
                  <ScrollReveal textClassName="text-2xl sm:text-3xl lg:text-4xl font-light text-primary leading-[1.05] max-w-2xl" stagger={0.08} duration={1}>
                      1. A polymath and creative technologist. 2. A designer of digital environments. That's me.
                    </ScrollReveal>
                 </div>

                 <div className="relative flex items-end justify-center perspective-[1200px] w-full lg:flex-1 max-w-[1100px] h-[50vh] lg:h-[65vh] translate-y-10 lg:translate-y-16">
                    {figurines.map((fig, idx) => {
                      const style = getFigurineStyle(idx);
                      return (
                        <motion.div
                          key={fig.id}
                          animate={{
                            x: style.x,
                            scale: style.scale,
                            zIndex: style.zIndex,
                            filter: style.filter,
                            opacity: style.opacity
                          }}
                          transition={{ 
                            duration: 1.8, 
                            ease: [0.23, 1, 0.32, 1]
                          }}
                          className="absolute bottom-0 w-[95%] h-full origin-bottom"
                        >
                           <Image 
                             src={fig.src} 
                             alt="Leon Nduati Figurine" 
                             fill 
                             className="object-contain" 
                             priority 
                           />
                        </motion.div>
                      );
                    })}
                 </div>
              </div>
            </Container>
        </section>

        {/* --- SECTION 1: CREATIVE SECTORS --- */}
        <section className="relative py-14 md:py-24">
             <Container className="w-full px-6 md:px-20">
          <div className="mb-6 md:mb-10">
                  <span className="text-accent-blue font-mono text-[10px] md:text-xs uppercase tracking-[0.28em]">Navigation Hub</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 lg:gap-12 w-full max-w-[1600px] mx-auto mb-10 md:mb-16">
                  {heroItems.map((item, idx) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="group relative w-full"
                      onMouseEnter={() => handleVideoHover(idx)}
                    >
                      <div className="lg:hidden relative h-36 rounded-[1.1rem] overflow-hidden bg-black shadow-[0_14px_36px_rgba(0,0,0,0.18)]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
                        <div className="absolute inset-0 p-4 flex flex-col justify-between">
                          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/75">Open Section</span>
                          <div className="flex items-end justify-between gap-3">
                            <h3 className="text-[1.75rem] font-light tracking-tight uppercase text-white leading-none">
                              {item.title}
                            </h3>
                            <span className="h-8 w-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 inline-flex items-center justify-center text-white">
                              <ArrowRight size={14} />
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="hidden lg:flex flex-col items-start w-full">
                        <div className="text-left mb-8 md:mb-12 z-30 transition-transform duration-500 group-hover:-translate-y-4">
                          <h3 className="text-5xl sm:text-6xl md:text-[8rem] font-light tracking-tighter uppercase text-primary leading-[0.7]">
                            {item.title}
                          </h3>
                          <div className="w-12 md:w-20 h-1 bg-accent-blue mt-4 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left shadow-[0_0_10px_rgba(43,69,146,0.5)]" />
                        </div>

                        <div className="relative w-full aspect-square md:h-[450px] transition-all duration-700">
                          {/* Hover Video */}
                          <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden rounded-[2.5rem]">
                            <video
                              ref={el => { videoRefs.current[idx] = el; }}
                              autoPlay
                              loop
                              muted
                              playsInline
                              suppressHydrationWarning
                              className="w-full h-full object-contain"
                            >
                              <source src={item.video} type="video/mp4" />
                            </video>
                          </div>

                          {/* Static Still */}
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-contain absolute z-20 transition-all duration-1000 group-hover:opacity-0"
                          />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                 <div className="text-left max-w-5xl mx-auto border-t border-primary/10 pt-7 md:pt-10">
                   <ScrollReveal textClassName="text-lg md:text-4xl text-primary font-light uppercase tracking-tighter leading-tight w-full" stagger={0.04} duration={0.8}>
                      Everything I do in one sector informs the next. Music makes my code rhythmic. Code makes my music structural. Art makes my logic visual.
                   </ScrollReveal>
                </div>
             </Container>
        </section>

        {/* --- SECTION 2: TECHNICAL ARCHITECTURE --- */}
          <section className="relative py-14 lg:py-28 bg-background-secondary/30">
            <Container className="w-full px-6 lg:px-20">
              <div className="mb-8 lg:mb-14">
                <div className="flex items-center gap-3 lg:gap-4 mb-3 lg:mb-4">
                    <span className="w-12 h-px bg-accent-blue text-accent-blue"></span>
                  <span className="text-accent-blue font-medium text-[11px] lg:text-sm uppercase tracking-[0.28em] lg:tracking-[0.5em]">Technical Experience</span>
                 </div>
                <h2 className="text-4xl lg:text-9xl font-light uppercase tracking-tighter leading-none mb-6 lg:mb-10 text-primary">Technical Architecture</h2>
                <ScrollReveal textClassName="text-lg lg:text-4xl text-primary font-light max-w-5xl leading-tight" stagger={0.03} duration={0.8}>
                   I build systems that make sense of the world. From Nairobi to Tallinn, I bridge the gap between raw data and meaningful decision-making through intelligent system optimization and high-level engineering.
                 </ScrollReveal>
              </div>
              <div className="grid grid-cols-1 gap-6 lg:gap-10 max-w-[1600px] mx-auto w-full mt-6 lg:mt-8 animate-in fade-in duration-700">
                {/* System Terminal Window */}
                <div 
                  onClick={() => {
                    if (!isSystemWindowDimmed) return;
                    setIsSystemWindowDimmed(false);
                    setIsSystemWindowOpen(true);
                    setIsSystemWindowMinimized(false);
                  }}
                  className={`rounded-[12px] border border-primary/10 shadow-2xl overflow-hidden flex flex-col transition-all duration-500 ${isSystemWindowOpen && !isSystemWindowMinimized ? 'h-[74svh] max-h-[780px] min-h-[260px]' : 'h-[128px] max-h-[128px] min-h-[128px]'} ${isSystemWindowDimmed ? 'opacity-50 grayscale saturate-50' : 'opacity-100'}`}
                  style={{ 
                    boxShadow: `0 30px 100px -30px ${systemsData[selectedSystem].glowColor}`,
                    background: 'radial-gradient(circle at 20% 0%, #112030 0%, #0b0b0d 38%)'
                  }}
                >
                  <div
                    className="px-4 py-3 flex items-center border-b border-primary/10 select-none"
                    style={{ background: 'linear-gradient(180deg, #1b1d23 0%, #151518 100%)' }}
                  >
                    <div className="flex gap-1.5 items-center mr-6">
                      <button
                        type="button"
                        onClick={() => {
                          setIsSystemWindowOpen(false);
                          setIsSystemWindowMinimized(false);
                          setIsSystemWindowDimmed(true);
                        }}
                        aria-label="Close system window"
                        className="w-3 h-3 rounded-full bg-[#ff5f56]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIsSystemWindowDimmed(false);
                          if (isSystemWindowOpen) setIsSystemWindowMinimized(true);
                        }}
                        aria-label="Minimize system window"
                        className="w-3 h-3 rounded-full bg-[#ffbd2e]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIsSystemWindowOpen(true);
                          setIsSystemWindowMinimized(false);
                          setIsSystemWindowDimmed(false);
                        }}
                        aria-label="Open system window"
                        className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_10px_rgba(39,201,63,0.45)]"
                      />
                    </div>
                    <div className="flex-1 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-[#9fb1c7]">
                      guest@leon-nduati:~/systems/{selectedSystem}
                    </div>
                    <div className="w-12" />
                  </div>

                  {(!isSystemWindowOpen || isSystemWindowMinimized) && (
                    <div className="px-4 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[#7dd3fc]/75 border-b border-primary/10">
                      {!isSystemWindowOpen ? 'click green button to open project window' : 'window minimized - click green to restore'}
                    </div>
                  )}

                  {isSystemWindowOpen && !isSystemWindowMinimized && (
                    <div className="px-3 lg:px-4 py-3 border-b border-primary/10 bg-[#0b111a]/70">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => cycleSystem('prev')}
                          aria-label="Show previous system"
                          className="h-9 w-9 shrink-0 rounded-full border border-primary/20 bg-primary/5 text-primary flex items-center justify-center"
                        >
                          <ChevronLeft size={15} />
                        </button>

                        <div className="min-w-0 flex-1 text-center">
                          <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-secondary">System {selectedSystemIndex + 1} / {systemKeys.length}</p>
                          <p className="text-sm font-semibold uppercase tracking-wide text-primary truncate">{systemsData[selectedSystem].name}</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => cycleSystem('next')}
                          aria-label="Show next system"
                          className="h-9 w-9 shrink-0 rounded-full border border-primary/20 bg-primary/5 text-primary flex items-center justify-center"
                        >
                          <ChevronRight size={15} />
                        </button>
                      </div>

                    </div>
                  )}

                  {isSystemWindowOpen && !isSystemWindowMinimized && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedSystem}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="relative flex-1 min-h-0 flex flex-col justify-between"
                    >
                      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.08)_51%)] [background-size:100%_4px]" />
                      <motion.div
                        className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#7dd3fc]/80 to-transparent"
                        animate={{ y: ['-10%', '110%'] }}
                        transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
                      />

                      <div className="relative z-10 flex-1 p-4 lg:p-8 overflow-y-auto">
                        {/* Title & Github */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 lg:gap-4 mb-5 lg:mb-6">
                          <div>
                            <h3 className="text-2xl lg:text-5xl font-light uppercase tracking-tight text-[#dff4ff]">
                              {systemsData[selectedSystem].name}
                            </h3>
                            <p 
                              className="text-sm font-mono uppercase tracking-widest mt-1 font-semibold"
                              style={{ color: systemsData[selectedSystem].accentColor }}
                            >
                              {systemsData[selectedSystem].role}
                            </p>
                          </div>
                          {systemsData[selectedSystem].github.startsWith("http") ? (
                            <a 
                              href={systemsData[selectedSystem].github} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="self-start px-4 py-2 rounded-md border border-[#7dd3fc]/25 bg-[#38bdf8]/10 text-[10px] lg:text-xs font-mono uppercase tracking-[0.2em] hover:bg-[#38bdf8]/20 flex items-center gap-2 text-[#dff4ff] transition-all duration-300"
                            >
                              Codebase <ExternalLink size={12} style={{ color: systemsData[selectedSystem].accentColor }} />
                            </a>
                          ) : (
                            <Link 
                              href={systemsData[selectedSystem].github} 
                              className="self-start px-4 py-2 rounded-md border border-[#7dd3fc]/25 bg-[#38bdf8]/10 text-[10px] lg:text-xs font-mono uppercase tracking-[0.2em] hover:bg-[#38bdf8]/20 flex items-center gap-2 text-[#dff4ff] transition-all duration-300"
                            >
                              Explore <ArrowRight size={12} style={{ color: systemsData[selectedSystem].accentColor }} />
                            </Link>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-sm lg:text-xl text-[#dff4ff]/85 font-light leading-relaxed mb-5 lg:mb-6 line-clamp-4 lg:line-clamp-none">
                          {systemsData[selectedSystem].description}
                        </p>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 lg:gap-4 mb-6 lg:mb-10">
                          {systemsData[selectedSystem].metrics.slice(0, 2).map((metric, i) => (
                            <div 
                              key={i} 
                              className="p-3.5 lg:p-5 rounded-[10px] bg-[#0f1723]/90 border shadow-inner transition-all duration-300 min-w-0"
                              style={{ borderColor: `${systemsData[selectedSystem].accentColor}30` }}
                            >
                              <span 
                                className="text-xl sm:text-2xl lg:text-4xl font-light block mb-1 tracking-tight font-semibold leading-none break-words"
                                style={{ color: systemsData[selectedSystem].accentColor }}
                              >
                                {metric.value}
                              </span>
                              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#7dd3fc]/70 break-words">
                                {metric.label}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="mb-5 lg:mb-6">
                          <h4 className="text-xs font-mono uppercase tracking-[0.28em] text-[#7dd3fc]/80 mb-3">Core Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {systemsData[selectedSystem].stack.map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-1 rounded-md border border-[#7dd3fc]/25 bg-[#0f1723]/90 text-[10px] font-mono uppercase tracking-[0.16em] text-[#c7ebff]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 lg:mt-6">
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3 px-1 gap-1.5 lg:gap-0">
                          <span className="text-[11px] lg:text-xs font-mono uppercase tracking-[0.18em] lg:tracking-widest text-secondary flex items-center gap-2">
                            <Terminal size={14} style={{ color: systemsData[selectedSystem].accentColor }} className="animate-pulse animate-duration-1000" /> Live Terminal Shell
                          </span>
                          <span 
                            className="text-[9px] lg:text-[10px] font-mono uppercase tracking-[0.16em] lg:tracking-widest font-semibold animate-pulse animate-duration-1000"
                            style={{ color: systemsData[selectedSystem].accentColor }}
                          >
                            SYSTEM STATUS: ONLINE
                          </span>
                          </div>
                          
                          <div ref={consoleContainerRef} className="rounded-[10px] border border-[#7dd3fc]/20 bg-[#0b121d]/90 p-3 lg:p-4 max-h-[26svh] lg:max-h-[180px] min-h-[140px] lg:min-h-0 overflow-y-auto font-mono text-[11px] lg:text-sm flex flex-col gap-1.5 leading-relaxed scrollbar-thin scrollbar-thumb-primary/10">
                            {consoleHistory.slice(-7).map((item, idx) => {
                              if (!item) return null;
                              return (
                                <div 
                                  key={idx} 
                                  className="flex gap-2 items-start"
                                  style={{
                                    color: item.type === 'error' 
                                      ? '#ef4444' 
                                      : item.type === 'input' 
                                        ? '#ffffff' 
                                        : item.type === 'system'
                                          ? systemsData[selectedSystem].accentColor
                                          : `${systemsData[selectedSystem].accentColor}cc`
                                  }}
                                >
                                  {item.type === 'input' ? (
                                    <>
                                      <span className="text-[#7dd3fc]/70 select-none hidden lg:inline">guest@leon-nduati:~$</span>
                                      <span className="text-[#7dd3fc]/70 select-none lg:hidden">guest@ln:~$</span>
                                      <span className="break-all">{item.text.replace("guest@leon-nduati:~$ ", "")}</span>
                                    </>
                                  ) : (
                                    <>
                                      <span className="opacity-50 select-none">&gt;</span>
                                      <span className="break-words">{item.text}</span>
                                    </>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          <div className="mt-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[#7dd3fc]/55">
                            detailed diagnostics available in projects section
                          </div>
                        </div>
                      </div>

                    </motion.div>
                  </AnimatePresence>
                  )}
                </div>
              </div>

              {/* Career Command Center */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 md:gap-8 max-w-[1600px] mx-auto w-full mt-10 md:mt-14">
                <div onClick={() => {
                  if (!isCareerWindowDimmed) return;
                  setIsCareerWindowDimmed(false);
                  setIsCareerWindowOpen(true);
                  setIsCareerWindowMinimized(false);
                }} className={`xl:col-span-2 rounded-[12px] border border-primary/10 overflow-hidden shadow-2xl flex flex-col transition-all duration-500 ${isCareerWindowOpen && !isCareerWindowMinimized ? 'h-[74svh] max-h-[780px] min-h-[260px]' : 'h-[128px] max-h-[128px] min-h-[128px]'} ${isCareerWindowDimmed ? 'opacity-50 grayscale saturate-50' : 'opacity-100'}`} style={{ background: 'radial-gradient(circle at 20% 0%, #112030 0%, #0b0b0d 38%)' }}>
                  <div className="px-4 py-3 border-b border-primary/10 flex items-center" style={{ background: 'linear-gradient(180deg, #1b1d23 0%, #151518 100%)' }}>
                    <div className="flex gap-1.5 items-center mr-6">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCareerWindowOpen(false);
                          setIsCareerWindowMinimized(false);
                          setIsCareerWindowDimmed(true);
                        }}
                        aria-label="Close career window"
                        className="w-3 h-3 rounded-full bg-[#ff5f56]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIsCareerWindowDimmed(false);
                          if (isCareerWindowOpen) setIsCareerWindowMinimized(true);
                        }}
                        aria-label="Minimize career window"
                        className="w-3 h-3 rounded-full bg-[#ffbd2e]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIsCareerWindowOpen(true);
                          setIsCareerWindowMinimized(false);
                          setIsCareerWindowDimmed(false);
                        }}
                        aria-label="Open career window"
                        className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_10px_rgba(39,201,63,0.45)]"
                      />
                    </div>
                    <span className="flex-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#9fb1c7] text-center">guest@leon-nduati:~/career/dossier.log</span>
                    <span className="w-12" />
                  </div>

                  {(!isCareerWindowOpen || isCareerWindowMinimized) && (
                    <div className="px-4 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[#7dd3fc]/75 border-b border-primary/10">
                      {!isCareerWindowOpen ? 'click green button to open career window' : 'window minimized - click green to restore'}
                    </div>
                  )}

                  {isCareerWindowOpen && !isCareerWindowMinimized && (
                  <div className="flex-1 min-h-0 overflow-y-auto p-4 md:p-8 lg:p-10">
                    <div className="mb-5 md:mb-8 rounded-[10px] border border-[#7dd3fc]/20 bg-[#0d141f]/90 px-3.5 md:px-4 py-3 flex flex-wrap items-center justify-between gap-2.5 md:gap-3">
                      <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#9dddf8]">career stack: systems engineering | full-stack | machine learning</span>
                      <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#34d399]">status: available for collaboration</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                      <div className="rounded-[10px] border border-[#7dd3fc]/20 bg-[#0b121d]/90 p-4 md:p-6">
                        <div className="flex items-center justify-between mb-5 md:mb-6">
                          <h3 className="text-[10px] md:text-xs font-mono uppercase tracking-[0.35em] text-[#7dd3fc]">Work History</h3>
                          <Briefcase size={18} className="text-[#7dd3fc]/80" />
                        </div>
                        <div className="space-y-5">
                          <div className="border-l-2 pl-4" style={{ borderColor: '#38bdf8' }}>
                            <div className="text-[#dff4ff] text-lg md:text-2xl font-light uppercase tracking-tight">Inst. of Baltic Studies</div>
                            <div className="text-[#7dd3fc] text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] mt-2">Full-Stack Dev Intern // Estonia // 2026</div>
                          </div>
                          <div className="border-l-2 border-[#7dd3fc]/20 pl-4">
                            <div className="text-[#dff4ff]/90 text-lg md:text-2xl font-light uppercase tracking-tight">Old Mutual Kenya</div>
                            <div className="text-[#7dd3fc]/70 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] mt-2">IT & Infra Intern // 2025</div>
                          </div>
                          <div className="border-l-2 border-[#7dd3fc]/20 pl-4">
                            <div className="text-[#dff4ff]/85 text-lg md:text-2xl font-light uppercase tracking-tight">Strathmore Joint IS Project</div>
                            <div className="text-[#7dd3fc]/70 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] mt-2">Lead Software Dev // 2024</div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-[10px] border border-[#7dd3fc]/20 bg-[#0b121d]/90 p-4 md:p-6">
                        <div className="flex items-center justify-between mb-5 md:mb-6">
                          <h3 className="text-[10px] md:text-xs font-mono uppercase tracking-[0.35em] text-[#7dd3fc]">Education</h3>
                          <GraduationCap size={18} className="text-[#7dd3fc]/80" />
                        </div>
                        <div className="space-y-5">
                          <div>
                            <div className="text-[#dff4ff] text-lg md:text-2xl font-light">Strathmore University // BBIT</div>
                            <div className="text-[#7dd3fc]/75 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] mt-2">Software Engineering & ML Focus</div>
                          </div>
                          <div className="pt-5 border-t border-[#7dd3fc]/15">
                            <div className="text-[#dff4ff] text-lg md:text-2xl font-light">Tallinn University</div>
                            <div className="text-[#7dd3fc]/75 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] mt-2">Exchange Scholar // Estonia</div>
                          </div>
                        </div>

                        <div className="mt-6 pt-5 border-t border-[#7dd3fc]/15">
                          <div className="flex items-center gap-3 mb-4 text-[#7dd3fc]">
                            <Award size={18} />
                            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em]">Achievements</span>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-[10px] border border-[#7dd3fc]/20 bg-[#0f1723]/90 p-4">
                              <span className="text-lg md:text-2xl font-light block mb-1 tracking-tight text-[#dff4ff]">Dean&apos;s List</span>
                              <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-[#7dd3fc]/70">3x Academic Honour</span>
                            </div>
                            <div className="rounded-[10px] border border-[#7dd3fc]/20 bg-[#0f1723]/90 p-4">
                              <span className="text-lg md:text-2xl font-light block mb-1 tracking-tight text-[#38bdf8]">Top 4</span>
                              <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-[#7dd3fc]/70">Digital Explorers</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  )}
                </div>

                <div onClick={() => {
                  if (!isFilesWindowDimmed) return;
                  setIsFilesWindowDimmed(false);
                  setIsFilesWindowOpen(true);
                  setIsFilesWindowMinimized(false);
                }} className={`rounded-[12px] border border-primary/10 overflow-hidden shadow-2xl flex flex-col transition-all duration-500 ${isFilesWindowOpen && !isFilesWindowMinimized ? 'h-[74svh] max-h-[780px] min-h-[260px]' : 'h-[128px] max-h-[128px] min-h-[128px]'} ${isFilesWindowDimmed ? 'opacity-50 grayscale saturate-50' : 'opacity-100'}`} style={{ background: 'radial-gradient(circle at 18% 0%, #12243a 0%, #0b0b0d 45%)' }}>
                  <div className="px-4 py-3 border-b border-primary/10 flex items-center" style={{ background: 'linear-gradient(180deg, #1b1d23 0%, #151518 100%)' }}>
                    <div className="flex gap-1.5 items-center mr-6">
                      <button
                        type="button"
                        onClick={() => {
                          setIsFilesWindowOpen(false);
                          setIsFilesWindowMinimized(false);
                          setIsFilesWindowDimmed(true);
                        }}
                        aria-label="Close files window"
                        className="w-3 h-3 rounded-full bg-[#ff5f56]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIsFilesWindowDimmed(false);
                          if (isFilesWindowOpen) setIsFilesWindowMinimized(true);
                        }}
                        aria-label="Minimize files window"
                        className="w-3 h-3 rounded-full bg-[#ffbd2e]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIsFilesWindowOpen(true);
                          setIsFilesWindowMinimized(false);
                          setIsFilesWindowDimmed(false);
                        }}
                        aria-label="Open files window"
                        className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_10px_rgba(39,201,63,0.45)]"
                      />
                    </div>
                    <span className="flex-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#9fb1c7] text-center">guest@leon-nduati:~/career/commands.sh</span>
                    <span className="w-12" />
                  </div>

                  {(!isFilesWindowOpen || isFilesWindowMinimized) && (
                    <div className="px-4 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[#7dd3fc]/75 border-b border-primary/10">
                      {!isFilesWindowOpen ? 'click green button to open files window' : 'window minimized - click green to restore'}
                    </div>
                  )}

                  {isFilesWindowOpen && !isFilesWindowMinimized && (
                  <div className="flex-1 min-h-0 overflow-y-auto p-4 md:p-7 flex flex-col">
                    <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#9dddf8] mb-3">quick actions</p>
                    <h3 className="text-[#dff4ff] text-xl md:text-3xl font-light leading-tight mb-2.5 md:mb-3">Open the files that matter.</h3>
                    <p className="text-[#9cc7e6] text-sm md:text-base leading-relaxed mb-4 md:mb-6">Download my CV, inspect source repositories, or open a direct line to collaborate.</p>

                    <div className="space-y-3 mt-3 md:mt-6 pb-2">
                      <a href="/Leon_Nduati_CV_Analytics.pdf" download className="w-full rounded-[10px] border border-[#7dd3fc]/25 bg-[#38bdf8]/10 px-4 py-3 flex items-center justify-between hover:bg-[#38bdf8]/20 transition-colors">
                        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#dff4ff]">download cv</span>
                        <FileText size={16} className="text-[#7dd3fc]" />
                      </a>
                      <a href="https://github.com/git2mann" target="_blank" rel="noopener noreferrer" className="w-full rounded-[10px] border border-[#7dd3fc]/25 bg-[#38bdf8]/10 px-4 py-3 flex items-center justify-between hover:bg-[#38bdf8]/20 transition-colors">
                        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#dff4ff]">open github</span>
                        <ExternalLink size={16} className="text-[#7dd3fc]" />
                      </a>
                      <Link href="/contact" className="w-full rounded-[10px] border border-[#34d399]/30 bg-[#34d399]/15 px-4 py-3 flex items-center justify-between hover:bg-[#34d399]/25 transition-colors">
                        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#dff4ff]">contact</span>
                        <ArrowRight size={16} className="text-[#34d399]" />
                      </Link>
                    </div>
                  </div>
                  )}
                </div>
              </div>
            </Container>
        </section>

        {/* --- SECTION 3: THE PAPER TRAIL --- */}
        <section className="relative py-14 md:py-28">
          <Container className="w-full px-6 md:px-20">
            <div className="relative overflow-hidden rounded-[2.4rem] bg-gradient-to-br from-background-primary via-background-secondary/40 to-background-primary p-4 md:p-12">
              <div className="pointer-events-none absolute -top-28 right-[-6rem] h-72 w-72 rounded-full bg-accent-blue/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 left-[-4rem] h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative z-10 mb-8 md:mb-14">
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                  <span className="w-16 h-px bg-accent-blue/70" />
                  <span className="text-accent-blue text-[11px] md:text-sm uppercase tracking-[0.25em] md:tracking-[0.35em]">Recent Writing</span>
                </div>
                <h2 className="text-4xl md:text-[7rem] font-light uppercase tracking-tighter leading-none text-primary mb-3 md:mb-4">The Paper Trail</h2>
                <ScrollReveal textClassName="text-base md:text-2xl text-primary/90 font-light max-w-3xl leading-relaxed" stagger={0.05} duration={0.8}>
                  Essays, process notes, and reflections from the intersection of art, systems, and experiments.
                </ScrollReveal>
              </div>

              {recentPosts[0] && (
                <div className="relative z-10 grid grid-cols-1 xl:grid-cols-[1.3fr_0.7fr] gap-5 md:gap-9 items-start">
                  <motion.article
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.45 }}
                    className="group rounded-[1.3rem] bg-background-primary shadow-[0_20px_70px_rgba(0,0,0,0.08)] overflow-hidden"
                  >
                    <div className="relative h-56 md:h-[460px] overflow-hidden">
                      <Image src={recentPosts[0].coverImage} alt={recentPosts[0].title} fill className="object-cover transition-transform duration-[2200ms] group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>

                    <div className="p-4 md:p-8">
                      <div className="flex flex-wrap items-center gap-3 mb-4 text-[11px] uppercase tracking-[0.2em]">
                        <span className="px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue">Featured</span>
                        <span className="text-secondary">{new Date(recentPosts[0].date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })}</span>
                      </div>

                      <h3 className="text-2xl md:text-5xl font-light tracking-tight leading-[0.95] text-primary mb-3 md:mb-4">
                        <Link href={`/posts/${recentPosts[0].slug}`} className="hover:text-accent-blue transition-colors">{recentPosts[0].title}</Link>
                      </h3>
                      <p className="text-sm md:text-lg text-secondary leading-relaxed mb-5 md:mb-7 max-w-4xl line-clamp-4 md:line-clamp-none">{recentPosts[0].excerpt}</p>

                      <Link href={`/posts/${recentPosts[0].slug}`} className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-primary text-background-primary text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] md:tracking-[0.28em] hover:opacity-90 transition-opacity">
                        Read Feature <ArrowRight size={14} />
                      </Link>
                    </div>
                  </motion.article>

                  <aside className="rounded-[1.2rem] bg-background-primary p-4 md:p-6 shadow-[0_16px_50px_rgba(0,0,0,0.06)]">
                    <div className="flex items-center justify-between pb-4 mb-4">
                      <h3 className="text-xs uppercase tracking-[0.3em] text-secondary">More Stories</h3>
                      <Link href="/blog" className="text-accent-blue text-xs uppercase tracking-[0.2em] hover:tracking-[0.24em] transition-all">View All</Link>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                      {recentPosts.slice(1, 4).map((post, i) => (
                        <motion.article
                          key={post.slug}
                          initial={{ opacity: 0, x: 10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.35, delay: i * 0.08 }}
                          className="group rounded-xl bg-background-secondary/30 p-3.5 md:p-4"
                        >
                          <div className="flex gap-3 items-start">
                            <div className="relative h-14 w-14 rounded-lg overflow-hidden shrink-0">
                              <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                            </div>

                            <div className="min-w-0 flex-1">
                              <h4 className="text-[15px] md:text-lg leading-tight text-primary group-hover:text-accent-blue transition-colors line-clamp-2 mb-1.5 md:mb-2">
                                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                              </h4>
                              <p className="text-xs md:text-sm text-secondary line-clamp-2 mb-2.5 md:mb-3">{post.excerpt}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] uppercase tracking-[0.16em] text-secondary">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}</span>
                                <Link href={`/posts/${post.slug}`} className="text-[11px] uppercase tracking-[0.16em] text-accent-blue group-hover:translate-x-1 transition-transform">Read</Link>
                              </div>
                            </div>
                          </div>
                        </motion.article>
                      ))}
                    </div>
                  </aside>
                </div>
              )}
            </div>
          </Container>
        </section>

        {/* --- SECTION 4: CALL TO ACTION --- */}
          <section className="relative pt-4 md:pt-10 pb-0 flex flex-col items-center">
            <div className="w-full flex-grow flex flex-col items-center justify-center text-center py-12 md:py-16 px-6 md:px-10">
               <Container className="w-full max-w-6xl mx-auto flex flex-col items-center">
                <ScrollReveal textClassName="text-4xl md:text-[9rem] font-light uppercase tracking-tighter mb-5 md:mb-8 leading-none text-center" containerClassName="max-w-5xl mx-auto text-center" stagger={0.08} duration={1}>
                     Let's build something.
                  </ScrollReveal>
                <ScrollReveal textClassName="text-base md:text-3xl font-medium mb-8 md:mb-10 max-w-3xl mx-auto opacity-80 text-center" containerClassName="max-w-3xl mx-auto text-center" stagger={0.05} duration={1}>
                     Looking for the next creative or technical intersection.
                  </ScrollReveal>
                  
                  <RefractiveButton 
                    onClick={() => window.location.href = '/contact'} 
                  className="scale-100 md:scale-125 mx-auto"
                    showShadow={false}
                  >
                  <span className="text-xl md:text-4xl font-light uppercase px-3 md:px-4">Reach Out</span>
                  <ArrowRight size={28} />
                  </RefractiveButton>
               </Container>
            </div>
            
            <div className="w-full">
              <Footer />
            </div>
        </section>
      </div>
    </main>
  );
}
