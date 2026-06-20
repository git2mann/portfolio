"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from "@/app/_components/container";
import { Terminal, Cpu, Layout, Globe, Github, ExternalLink } from 'lucide-react';
import ScrollReveal from "@/app/_components/ScrollReveal";
import { motion } from "framer-motion";

const projects = [
  {
    id: "qrams",
    title: "QR-AMS Attendance Manager",
    category: "mobile",
    role: "Proposed Verification System",
    description: "A proposed QR code attendance management system built for Strathmore University, streamlining student check-ins and reducing record manipulation.",
    metrics: [
      { label: "Check-in time", value: "<3s" },
      { label: "Uptime", value: "99.8%" }
    ],
    stack: ["PHP", "Laravel", "Blade", "MySQL"],
    github: "https://github.com/git2mann/QR-AMS",
    link: "https://github.com/git2mann/QR-AMS",
    status: "Staging"
  },
  {
    id: "prison-guide",
    title: "Estonian Prison Tablet Guide",
    category: "web",
    role: "Bilingual Digital Handbook App",
    description: "A secure, tablet-focused digital handbook developed for Estonian prisons. Features offline searchability, dark mode, quick tools, and accessibility controls.",
    metrics: [
      { label: "Loading Speed", value: "<100ms" },
      { label: "Search Index", value: "320+ entries" }
    ],
    stack: ["JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
    github: "https://github.com/git2mann/tablet-prison-guide-estonia",
    link: "https://github.com/git2mann/tablet-prison-guide-estonia",
    status: "Active"
  },
  {
    id: "k2y",
    title: "K2Y: Kernel 2 Year",
    category: "web",
    role: "2D Time-Manipulation Game",
    description: "A 2D puzzle-platformer game featuring reverse-time mechanics, designed and engineered in Unity in collaboration with Hyperlúdica Studio.",
    metrics: [
      { label: "Platform", value: "Unity" },
      { label: "Framerate", value: "60 FPS" }
    ],
    stack: ["C#", "Unity 2D", "WebGL", "FMOD Audio"],
    github: "https://github.com/git2mann/K2Y-Kernel2Year",
    link: "https://github.com/git2mann/K2Y-Kernel2Year",
    status: "Released"
  },
  {
    id: "portfolio",
    title: "Interactive Glassmorphic Portfolio",
    category: "web",
    role: "Personal Developer Site",
    description: "A premium developer portfolio showcasing systems engineering and creative works through custom glassmorphism, dynamic audio controllers, and optimized asset pipelines.",
    metrics: [
      { label: "Performance Score", value: "100/100" },
      { label: "Framerate", value: "60 FPS" }
    ],
    stack: ["TypeScript", "Next.js", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/git2mann/portfolio",
    link: "https://github.com/git2mann/portfolio",
    status: "Active"
  },
  {
    id: "articulate",
    title: "articulate: Interactive Song",
    category: "web",
    role: "Art-to-Audio Visualizer",
    description: "An interactive project that allows users to experience and visualize the song 'Articulate' dynamically mapped to and driven by its cover art.",
    metrics: [
      { label: "Sample Rate", value: "44.1 kHz" },
      { label: "Type", value: "Visualizer" }
    ],
    stack: ["TypeScript", "Next.js", "Web Audio API", "CSS"],
    github: "https://github.com/git2mann/articulate",
    link: "https://github.com/git2mann/articulate",
    status: "Production"
  },
  {
    id: "gps-website",
    title: "GPS Website",
    category: "web",
    role: "Web Application Platform",
    description: "A full-featured web experience engineered with TypeScript, featuring optimized performance, dynamic components, and smooth transitions.",
    metrics: [
      { label: "Uptime", value: "99.9%" },
      { label: "Languages", value: "TypeScript" }
    ],
    stack: ["TypeScript", "Next.js", "Tailwind CSS", "HTML5"],
    github: "https://github.com/git2mann/gps-website",
    link: "https://github.com/git2mann/gps-website",
    status: "Production"
  },
  {
    id: "secure-aes",
    title: "Secure AES Cryptography",
    category: "ai",
    role: "Encrypted Security Utility",
    description: "A cryptographic tool developed in Python executing secure Advanced Encryption Standard (AES) encryptions for data packages and authentication keys.",
    metrics: [
      { label: "Algorithm", value: "AES-256" },
      { label: "Mode", value: "CBC / GCM" }
    ],
    stack: ["Python", "Cryptography", "PyCryptodome"],
    github: "https://github.com/git2mann",
    link: "/contact",
    status: "Internal Tool"
  }
];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [fullScreenProjectId, setFullScreenProjectId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects', icon: Layout },
    { id: 'web', label: 'Web Systems', icon: Globe },
    { id: 'mobile', label: 'Mobile Apps', icon: Terminal },
    { id: 'ai', label: 'Intelligence', icon: Cpu }
  ];

  const filteredProjects = projects.filter(project => {
    if (activeTab === 'all') return true;
    return project.category === activeTab;
  });

  useEffect(() => {
    if (!fullScreenProjectId) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [fullScreenProjectId]);

  const projectBootLog = (project: typeof projects[number]) => [
    `boot --project=${project.id}`,
    `mounting runtime: ${project.stack[0] ?? 'system'}`,
    `loading role profile: ${project.role.toLowerCase()}`,
    `status -> ${project.status.toLowerCase()}`
  ];

  const getProjectAccent = (category: string) => {
    if (category === 'mobile') return '#fb923c';
    if (category === 'ai') return '#34d399';
    return '#38bdf8';
  };

  const fullScreenProject = projects.find(project => project.id === fullScreenProjectId) ?? null;

  return (
    <main className="min-h-screen pb-32 bg-background-primary relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(0,113,227,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,113,227,0.08)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,113,227,0.12),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(0,113,227,0.08),transparent_40%)]" />
      </div>
      
      {/* --- HERO SECTION: DICTIONARY ENTRY --- */}
      <section className="relative min-h-[70vh] md:h-[85vh] flex flex-col justify-center overflow-hidden pt-20 z-10">
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
                    <span className="w-12 md:w-20 h-[1px] bg-accent-blue/50"></span>
                    <span className="text-accent-blue font-medium text-xs md:text-sm uppercase tracking-[0.5em]">Engineering</span>
                 </div>
                 <h1 className="text-6xl sm:text-7xl md:text-[11rem] font-light tracking-tighter leading-[0.8] mb-6 md:mb-10 text-primary uppercase">
                   Code
                 </h1>
                 <div className="flex flex-wrap items-center gap-4 md:gap-8 text-xl md:text-4xl font-mono text-secondary">
                   <span>/koʊd/</span>
                   <span className="w-2 h-2 rounded-full bg-accent-blue/50"></span>
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
                  className="px-8 md:px-10 py-3 md:py-4 rounded-full font-medium text-sm md:text-base uppercase tracking-widest transition-all bg-primary text-background-primary shadow-xl flex items-center gap-3 hover:scale-105 active:scale-95"
                >
                  <Github size={20} /> GitHub Profile
                </Link>
                <Link href="/contact" className="px-8 md:px-10 py-3 md:py-4 rounded-full liquid-glass-clear font-medium text-sm md:text-base uppercase tracking-widest hover:bg-primary/5 transition-all hover:scale-105 active:scale-95 text-primary">
                  Contact
                </Link>
              </div>
            </div>

            {/* Right: Layered Figurine Visual */}
            <div className="flex-[0.6] md:flex-[0.8] w-full max-w-[300px] md:max-w-[600px] relative mt-8 md:mt-0">
               <div className="relative aspect-square w-full group">
                  <div className="absolute inset-0 bg-accent-blue/5 blur-3xl rounded-full opacity-60"></div>
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
      <div id="projects" className="sticky top-16 md:top-24 z-40 mb-10 md:mb-20 pt-4 md:pt-10 font-noto-display-condensed px-3 md:px-0">
        <div className="w-full md:w-auto max-w-full md:max-w-fit mx-auto liquid-glass px-1.5 md:px-2 py-1.5 md:py-2 rounded-full shadow-lg border border-primary/10 overflow-x-auto">
          <nav className="flex gap-1 md:gap-2 whitespace-nowrap min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`
                  flex items-center gap-2 md:gap-3 px-4 md:px-10 py-2 md:py-3.5 rounded-full text-xs md:text-base font-medium uppercase tracking-[0.14em] md:tracking-widest transition-all
                  ${activeTab === cat.id 
                    ? 'bg-primary text-background-primary shadow-xl' 
                    : 'text-secondary hover:text-primary hover:bg-primary/5'
                  }
                `}
              >
                <cat.icon size={14} />
                {cat.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <Container className="!max-w-none px-6 md:px-20 font-noto-display-condensed relative z-10">
        <section className="animate-in fade-in duration-700">
          <div className="mb-10 md:mb-14 rounded-3xl border border-primary/10 bg-background-primary/50 backdrop-blur-xl px-6 py-5 md:px-8 md:py-6 shadow-[0_15px_45px_rgba(0,0,0,0.08)]">
            <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.25em] text-accent-blue">
              guest@projects:~$ ls systems --verbose
            </p>
            <p className="mt-2 text-sm md:text-base text-secondary">
              Showing {filteredProjects.length} executable project modules. Use tabs to filter by domain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-32">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45 }}
                className="group relative flex flex-col rounded-[12px] overflow-hidden border border-primary/10 shadow-[0_20px_60px_rgba(0,0,0,0.14)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(0,0,0,0.2)]"
              >
                <div
                  className="px-4 py-3 border-b border-white/10 flex items-center gap-3"
                  style={{ background: `linear-gradient(180deg, #1b1d23 0%, #151518 100%)` }}
                >
                  <div className="flex gap-1.5 items-center">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <button
                      type="button"
                      aria-label={`Open ${project.title} in fullscreen`}
                      onClick={() => setFullScreenProjectId(project.id)}
                      className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_0_0_rgba(39,201,63,0.0)] transition-all hover:shadow-[0_0_0_4px_rgba(39,201,63,0.2)]"
                    />
                  </div>
                  <div className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/60 ml-2 truncate">
                    guest@leon-nduati:~/projects/{project.id}
                  </div>
                </div>

                <div
                  className="relative text-[#7dd3fc] min-h-[470px] sm:min-h-[500px] md:min-h-[560px] px-4 py-4 md:px-7 md:py-7 font-mono"
                  style={{ background: 'radial-gradient(circle at 20% 0%, #112030 0%, #0b0b0d 38%)' }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-20"
                    style={{ background: `radial-gradient(circle at 82% 12%, ${getProjectAccent(project.category)}33 0%, transparent 35%)` }}
                  />
                  <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.08)_51%)] [background-size:100%_4px]" />
                  <motion.div
                    className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#7dd3fc]/80 to-transparent"
                    animate={{ y: ['-10%', '110%'] }}
                    transition={{ duration: 3.6, repeat: Infinity, ease: 'linear' }}
                  />
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-[#7dd3fc]/10"
                          style={{ borderColor: `${getProjectAccent(project.category)}55`, color: getProjectAccent(project.category) }}
                        >
                          {project.category === 'ai' ? <Cpu size={15} /> : project.category === 'web' ? <Globe size={15} /> : <Terminal size={15} />}
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.24em]" style={{ color: `${getProjectAccent(project.category)}cc` }}>{project.status}</span>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#7dd3fc]/55">system online</span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-semibold mb-2 uppercase tracking-wide text-[#dff4ff] leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.24em] text-[#38bdf8] mb-5">
                      {project.role}
                    </p>

                    <div className="mb-4 rounded-[10px] border border-[#7dd3fc]/15 bg-[#0d141f]/85 px-3 py-2 text-[10px] md:text-xs text-[#9dddf8]">
                      last login: sat jun 20 23:11 on ttys008
                    </div>

                    <div className="space-y-1 text-[11px] md:text-xs leading-relaxed mb-5 text-[#7dd3fc]/90">
                      {projectBootLog(project).map((line, idx) => (
                        <motion.div
                          key={line}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.65 }}
                          transition={{ duration: 0.28, delay: idx * 0.12 }}
                          className="flex gap-2"
                        >
                          <span className="text-[#38bdf8]/55">&gt;</span>
                          <span>{line}</span>
                        </motion.div>
                      ))}
                    </div>

                    <p className="text-[#dff4ff]/80 text-[12px] md:text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-5">
                      {project.metrics.map((m, idx) => (
                        <div key={idx} className="rounded-lg border border-[#7dd3fc]/20 bg-[#0f1723] px-3 py-2.5">
                          <span className="text-lg md:text-xl font-semibold block tracking-tight text-[#dff4ff]">{m.value}</span>
                          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.22em] text-[#7dd3fc]/70">{m.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.stack.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-md bg-[#38bdf8]/10 text-[#bdeaff] text-[10px] md:text-[11px] uppercase tracking-[0.18em] border border-[#38bdf8]/20">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex flex-wrap items-center gap-2.5 md:gap-3 text-[10px] md:text-xs">
                      {project.github.startsWith("http") && (
                        <Link 
                          href={project.github} 
                          target="_blank"
                          className="inline-flex items-center gap-1.5 md:gap-2 rounded-md border border-[#7dd3fc]/25 bg-[#38bdf8]/10 px-2.5 md:px-3 py-2 uppercase tracking-[0.16em] md:tracking-[0.22em] text-[#dff4ff] transition-colors hover:bg-[#38bdf8]/20"
                        >
                          open github <Github size={12} />
                        </Link>
                      )}
                      <Link 
                        href={project.link} 
                        target={project.link.startsWith("http") ? "_blank" : undefined}
                        className="inline-flex items-center gap-1.5 md:gap-2 rounded-md border border-[#22d3ee]/25 bg-[#22d3ee]/10 px-2.5 md:px-3 py-2 uppercase tracking-[0.16em] md:tracking-[0.22em] text-[#dff4ff] transition-colors hover:bg-[#22d3ee]/20"
                      >
                        {project.link.startsWith("/contact") ? "inquire" : "execute launch"} <ExternalLink size={12} />
                      </Link>
                      <span className="text-[#7dd3fc]/70">guest@projects:~$ <span className="animate-pulse">_</span></span>
                    </div>
                  </div>
                </div>

              </motion.article>
            ))}
          </div>
        </section>
      </Container>

      {fullScreenProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-[#030507]/95 backdrop-blur-xl"
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.08, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-24 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full blur-3xl"
              style={{ backgroundColor: `${getProjectAccent(fullScreenProject.category)}50` }}
            />
            <motion.div
              animate={{ x: ['0%', '-40%'] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(125,211,252,0.09)_1px,transparent_1px),linear-gradient(to_bottom,rgba(125,211,252,0.09)_1px,transparent_1px)] [background-size:32px_32px]"
            />
            <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.06)_51%)] [background-size:100%_4px]" />
          </div>

          <div className="relative z-10 flex h-full flex-col p-3 md:p-10">
            <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between rounded-[12px] border border-white/10 bg-[#14161b] px-3 md:px-4 py-2.5 md:py-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Close fullscreen terminal"
                  onClick={() => setFullScreenProjectId(null)}
                  className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-[0_0_0_0_rgba(255,95,86,0)] transition-all hover:shadow-[0_0_0_4px_rgba(255,95,86,0.25)]"
                />
                <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="font-mono text-[9px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-white/60 truncate px-3">
                immersive://{fullScreenProject.id}.session
              </div>
              <span className="font-mono text-[8px] md:text-[10px] uppercase tracking-[0.16em] text-[#7dd3fc]/60">tap green bubble</span>
            </div>

            <div className="mx-auto mt-3 md:mt-4 flex w-full max-w-[1400px] flex-1 flex-col rounded-[12px] border border-white/10 bg-[#06090d]/85 p-3.5 md:p-8 text-[#bdeaff] shadow-[0_0_100px_rgba(56,189,248,0.18)] overflow-hidden">
              <div className="mb-5 flex flex-wrap items-center gap-3 md:gap-4 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em]">
                <span className="rounded-md border px-2.5 py-1" style={{ borderColor: `${getProjectAccent(fullScreenProject.category)}66`, color: getProjectAccent(fullScreenProject.category) }}>
                  {fullScreenProject.status}
                </span>
                <span className="text-white/70">{fullScreenProject.title}</span>
                <span className="text-white/45">role: {fullScreenProject.role}</span>
              </div>

              <div className="mb-4 flex flex-wrap gap-2 font-mono text-[10px] md:text-xs uppercase tracking-[0.18em]">
                <span className="rounded-md border border-[#7dd3fc]/25 bg-[#38bdf8]/10 px-2.5 py-1 text-[#cdecff]">trace live</span>
                <span className="rounded-md border border-[#7dd3fc]/25 bg-[#38bdf8]/10 px-2.5 py-1 text-[#cdecff]">network stable</span>
                <span className="rounded-md border border-[#7dd3fc]/25 bg-[#38bdf8]/10 px-2.5 py-1 text-[#cdecff]">latency 11ms</span>
              </div>

              <div className="grid gap-6 md:grid-cols-[1.3fr_0.7fr] flex-1 min-h-0">
                <div className="rounded-[10px] border border-[#7dd3fc]/20 bg-[#050a10] p-3.5 md:p-5 overflow-auto max-h-[52svh] md:max-h-none">
                  <div className="space-y-2 font-mono text-[10px] sm:text-[11px] md:text-sm leading-relaxed">
                    {projectBootLog(fullScreenProject).map((line, idx) => (
                      <motion.div
                        key={line}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.28, delay: idx * 0.14 }}
                        className="flex gap-2"
                      >
                        <span style={{ color: `${getProjectAccent(fullScreenProject.category)}cc` }}>&gt;</span>
                        <span>{line}</span>
                      </motion.div>
                    ))}

                    {[
                      `network scan -> secure channel established`,
                      `summary -> ${fullScreenProject.description}`,
                      `metrics -> ${fullScreenProject.metrics.map(metric => `${metric.label}: ${metric.value}`).join(' | ')}`,
                      `stack -> ${fullScreenProject.stack.join(' // ')}`,
                      `launch target -> ${fullScreenProject.link}`
                    ].map((line, idx) => (
                      <motion.div
                        key={line}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.55 + idx * 0.16 }}
                        className="flex gap-2 text-[#dff4ff]/85"
                      >
                        <span className="text-[#7dd3fc]/50">$</span>
                        <span>{line}</span>
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                      className="pt-2 text-[#7dd3fc]/80"
                    >
                      guest@immersive:~$ <span className="animate-pulse">_</span>
                    </motion.div>
                  </div>
                </div>

                <div className="rounded-[10px] border border-[#7dd3fc]/20 bg-[#050a10] p-3.5 md:p-5 flex flex-col">
                  <h4 className="mb-4 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#7dd3fc]/80">Action Console</h4>
                  <p className="text-[#dff4ff]/75 text-xs md:text-sm leading-relaxed mb-5">
                    Execute this project session in a dedicated workspace or inspect source directly.
                  </p>

                  <div className="space-y-3 mt-auto">
                    {fullScreenProject.github.startsWith('http') && (
                      <Link
                        href={fullScreenProject.github}
                        target="_blank"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-[#7dd3fc]/25 bg-[#38bdf8]/10 px-4 py-3 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#dff4ff] transition-colors hover:bg-[#38bdf8]/20"
                      >
                        open github <Github size={12} />
                      </Link>
                    )}

                    <Link
                      href={fullScreenProject.link}
                      target={fullScreenProject.link.startsWith('http') ? '_blank' : undefined}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-3 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#dff4ff] transition-colors"
                      style={{
                        borderColor: `${getProjectAccent(fullScreenProject.category)}55`,
                        backgroundColor: `${getProjectAccent(fullScreenProject.category)}22`
                      }}
                    >
                      {fullScreenProject.link.startsWith('/contact') ? 'inquire' : 'execute launch'} <ExternalLink size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </main>
  );
}
