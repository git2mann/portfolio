"use client";

import { useRef, useEffect, useState } from "react";
import Container from "@/app/_components/container";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cpu, Briefcase, GraduationCap, Award, FileText, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/app/_components/ScrollReveal";
import { Footer } from "@/app/_components/footer";
import { Post } from "@/interfaces/post";
import { RefractiveButton } from "@/app/_components/RefractiveButton";

export default function LandingPageClient({ recentPosts }: { recentPosts: Post[] }) {
  const [mounted, setMounted] = useState(false);
  const [figurineCycle, setFigurineCycle] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
    
    // Cycle figurines every 5 seconds
    const interval = setInterval(() => {
      setFigurineCycle(prev => (prev + 1) % 3);
    }, 5000);
    
    return () => clearInterval(interval);
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
    if (pos === 0) return { x: '-45%', scale: 0.95, opacity: 1, zIndex: 10, filter: 'blur(4px)' };
    if (pos === 1) return { x: '0%', scale: 1.4, opacity: 1, zIndex: 30, filter: 'blur(0px)' };
    return { x: '45%', scale: 0.95, opacity: 1, zIndex: 20, filter: 'blur(4px)' };
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
        <section className="relative min-h-[90svh] flex flex-col items-center justify-center py-20">
            <Container className="w-full px-6 md:px-20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
                 <div className="w-full md:flex-1 text-center md:text-left">
                    <div className="mb-8 flex flex-col items-center md:items-start">
                       <h1 className="text-6xl sm:text-7xl md:text-[9.5rem] font-light tracking-tighter leading-[0.8] mb-6 text-primary uppercase">Leon<br/>Nduati</h1>
                       <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8 text-lg md:text-3xl font-mono text-secondary">
                         <span>/liː.ɒn n.duː.ɑː.ti/</span>
                         <span className="w-1.5 h-1.5 rounded-full bg-accent-blue shadow-[0_0_15px_rgba(43,69,146,0.5)]"></span>
                         <span>noun</span>
                       </div>
                    </div>
                    
                    <ScrollReveal textClassName="text-xl md:text-4xl font-light text-primary leading-tight max-w-2xl" stagger={0.08} duration={1}>
                      1. A polymath and creative technologist. 2. A designer of digital environments. That's me.
                    </ScrollReveal>
                 </div>

                 <div className="relative flex items-end justify-center perspective-[1200px] w-full md:flex-1 max-w-[1100px] h-[50vh] md:h-[65vh] translate-y-10 md:translate-y-16">
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
                            opacity: style.opacity,
                            y: [0, -10, 0]
                          }}
                          transition={{ 
                            duration: 1.8, 
                            ease: [0.23, 1, 0.32, 1],
                            y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }
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
        <section className="relative py-32 md:py-40">
             <Container className="w-full px-6 md:px-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-[1600px] mx-auto mb-16">
                   {heroItems.map((item, idx) => (
                     <Link 
                       key={item.title} 
                       href={item.href} 
                       className="group relative flex flex-col items-start w-full"
                       onMouseEnter={() => handleVideoHover(idx)}
                     >
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
                            className="object-contain relative z-20 transition-all duration-1000 group-hover:opacity-0" 
                          />
                       </div>
                     </Link>
                   ))}
                </div>
                <div className="text-left max-w-5xl mx-auto border-t border-primary/10 pt-10">
                   <ScrollReveal textClassName="text-xl md:text-4xl text-primary font-light uppercase tracking-tighter leading-tight w-full" stagger={0.04} duration={0.8}>
                      Everything I do in one sector informs the next. Music makes my code rhythmic. Code makes my music structural. Art makes my logic visual.
                   </ScrollReveal>
                </div>
             </Container>
        </section>

        {/* --- SECTION 2: TECHNICAL ARCHITECTURE --- */}
        <section className="relative py-32 md:py-48 bg-background-secondary/30">
            <Container className="w-full px-6 md:px-20">
              <div className="mb-16 md:mb-24">
                 <div className="flex items-center gap-4 mb-4">
                    <span className="w-12 h-px bg-accent-blue"></span>
                    <span className="text-accent-blue font-medium text-sm uppercase tracking-[0.5em]">Technical Experience</span>
                 </div>
                 <h2 className="text-5xl md:text-9xl font-light uppercase tracking-tighter leading-none mb-10 text-primary">Technical Architecture</h2>
                 <ScrollReveal textClassName="text-xl md:text-4xl text-primary font-light max-w-5xl leading-tight" stagger={0.03} duration={0.8}>
                   I build systems that make sense of the world. From Nairobi to Tallinn, I bridge the gap between raw data and meaningful decision-making through intelligent system optimization and high-level engineering.
                 </ScrollReveal>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-[1600px] mx-auto w-full">
                {/* Primary Narrative Card */}
                <div className="col-span-1 md:col-span-2 liquid-glass p-8 md:p-14 flex flex-col justify-between group rounded-[3rem] shadow-2xl relative overflow-hidden border border-primary/5">
                   <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity text-accent-blue">
                      <Cpu size={160} />
                   </div>
                   <div className="relative z-10">
                      <h3 className="text-3xl md:text-5xl font-light mb-8 flex items-center gap-4 uppercase tracking-tight text-primary">
                        <div className="w-2.5 h-12 bg-accent-blue rounded-full shadow-[0_0_15px_rgba(43,69,146,0.5)]"></div>
                        Intelligence
                      </h3>
                      <div className="space-y-8">
                        <div className="p-6 md:p-8 rounded-2xl bg-primary/[0.03] border border-primary/5 group-hover:border-accent-blue/30 transition-all shadow-xl">
                           <h4 className="text-accent-blue font-mono text-xs uppercase tracking-[0.4em] mb-3 font-semibold">Recent Achievement</h4>
                           <p className="text-xl md:text-2xl text-primary font-normal leading-relaxed">
                              Developed an ML pipeline achieving 92% accuracy in anomaly detection using Scikit-learn and TensorFlow.
                           </p>
                        </div>
                        <p className="text-xl md:text-2xl text-primary font-light leading-relaxed opacity-90">
                           Architecting robust back-ends and intelligent models. From QR-based verification systems to NLP-driven metadata classification of 15,000+ records.
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-6 mt-10 text-sm md:text-base font-mono uppercase tracking-[0.4em] text-accent-blue">
                         <span className="flex items-center gap-2 font-semibold"><Award size={16} /> Dean's List x3</span>
                         <span className="w-1.5 h-1.5 rounded-full bg-primary/20"></span>
                         <span className="flex items-center gap-2 font-semibold"><Award size={16} /> Digital Explorers Top 4</span>
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-6 mt-12 md:mt-16">
                      <div className="p-8 md:p-10 rounded-[2rem] bg-primary/[0.03] border border-primary/5 group-hover:border-accent-blue/30 transition-all shadow-inner">
                         <span className="text-4xl md:text-6xl font-light block mb-2 tracking-tighter text-primary">1st</span>
                         <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary">Class Honours Track</span>
                      </div>
                      <div className="p-8 md:p-10 rounded-[2rem] bg-primary/[0.03] border border-primary/5 group-hover:border-accent-blue/30 transition-all shadow-inner">
                         <span className="text-4xl md:text-6xl font-light block mb-2 tracking-tighter text-accent-blue">ICT</span>
                         <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary">& BI Exp</span>
                      </div>
                   </div>
                </div>

                {/* Experience & Education */}
                <div className="col-span-1 md:col-span-2 liquid-glass p-8 md:p-14 group overflow-hidden relative rounded-[3rem] shadow-2xl flex flex-col border border-primary/5">
                   <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-10">
                         <h3 className="text-xs font-mono uppercase tracking-[0.5em] text-accent-blue font-semibold">Work History</h3>
                         <Briefcase size={24} className="text-accent-blue/60" />
                      </div>
                      
                      <div className="space-y-10 flex-1">
                        <div className="border-l-2 border-accent-blue pl-8 py-2 bg-primary/[0.02]">
                           <div className="text-primary font-medium text-2xl md:text-3xl uppercase tracking-tight">Inst. of Baltic Studies</div>
                           <div className="text-accent-blue text-sm md:text-base font-mono uppercase tracking-widest mt-2 font-semibold">Full-Stack Dev Intern // Estonia // 2026</div>
                        </div>
                        <div className="border-l-2 border-primary/10 pl-8 py-2">
                           <div className="text-primary font-medium text-2xl md:text-3xl uppercase tracking-tight opacity-90">Old Mutual Kenya</div>
                           <div className="text-secondary opacity-100 text-sm md:text-base font-mono uppercase tracking-widest mt-2">IT & Infra Intern // 2025</div>
                        </div>
                        <div className="border-l-2 border-primary/10 pl-8 py-2">
                           <div className="text-primary font-medium text-2xl md:text-3xl uppercase tracking-tight opacity-80">Strathmore Joint IS Project</div>
                           <div className="text-secondary opacity-100 text-sm md:text-base font-mono uppercase tracking-widest mt-2">Lead Software Dev // 2024</div>
                        </div>
                      </div>

                      <div className="mt-16 pt-10 border-t border-primary/10">
                        <div className="flex items-center gap-4 mb-6 text-accent-blue">
                           <GraduationCap size={24} />
                           <span className="font-mono text-xs uppercase tracking-widest font-semibold">Education</span>
                        </div>
                        <div className="text-primary font-medium text-2xl md:text-3xl">Strathmore University // BBIT</div>
                        <p className="text-sm md:text-base text-primary opacity-90 uppercase tracking-widest mt-2 font-mono">Software Engineering & ML Focus</p>
                      </div>
                   </div>
                </div>

                {/* External Links */}
                <div className="col-span-1 md:col-span-4 mt-8 flex flex-col md:flex-row gap-6 md:gap-10 items-stretch md:items-center">
                   <div className="flex-1 liquid-glass p-8 md:p-10 rounded-[2.5rem] flex items-center justify-between border-accent-blue/30 bg-accent-blue/[0.05] shadow-lg">
                      <span className="font-mono text-xs md:text-base uppercase tracking-[0.4em] text-accent-blue animate-pulse font-semibold">Full-Stack Developer & ML Engineer | Focused on building intelligent systems & delivering impact</span>
                   </div>
                   
                   <div className="grid grid-cols-2 md:flex md:flex-row gap-4 md:gap-6">
                      <a href="/Leon_Nduati_CV_Analytics.pdf" download className="liquid-glass px-6 py-8 md:px-10 md:py-8 rounded-[2.5rem] group hover:bg-accent-blue transition-all flex flex-col items-center gap-4 border border-primary/5 shadow-xl">
                         <FileText size={28} className="text-accent-blue group-hover:text-white transition-colors" />
                         <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-primary group-hover:text-white text-center font-semibold">Download CV</span>
                      </a>
                      <a href="https://github.com/git2mann" target="_blank" rel="noopener noreferrer" className="liquid-glass px-6 py-8 md:px-10 md:py-8 rounded-[2.5rem] group hover:bg-primary transition-all flex flex-col items-center gap-4 border border-primary/5 shadow-xl">
                         <ExternalLink size={28} className="text-accent-blue group-hover:text-background-primary transition-colors" />
                         <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-primary group-hover:text-background-primary text-center font-semibold">GitHub</span>
                      </a>
                      <Link href="/contact" className="col-span-2 md:col-span-1 liquid-glass px-6 py-8 md:px-10 md:py-8 rounded-[2.5rem] group hover:bg-primary transition-all flex flex-col items-center gap-4 border border-primary/5 shadow-xl">
                         <ArrowRight size={28} className="text-primary group-hover:text-background-primary transition-colors" />
                         <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-primary group-hover:text-background-primary text-center font-semibold">Contact</span>
                      </Link>
                   </div>
                </div>
              </div>
            </Container>
        </section>

        {/* --- SECTION 3: THE PAPER TRAIL --- */}
        <section className="relative py-32 md:py-48">
            <Container className="w-full px-6 md:px-20">
              <div className="flex flex-col md:flex-row gap-16 md:gap-28 items-start relative z-10">
                <div className="w-full md:flex-[1.2] flex flex-col">
                  <div className="mb-12 md:mb-16">
                     <div className="flex items-center gap-6 mb-3">
                        <span className="w-16 h-px bg-accent-blue shadow-[0_0_10px_rgba(43,69,146,0.5)]"></span>
                        <span className="text-accent-blue font-medium text-sm uppercase tracking-[0.5em]">Recent Writing</span>
                     </div>
                     <h2 className="text-5xl md:text-[8rem] font-light uppercase tracking-tighter mb-4 leading-none text-primary">The Paper Trail</h2>
                     <ScrollReveal textClassName="text-xl md:text-2xl text-primary font-light opacity-90 max-w-2xl mt-6 leading-relaxed" stagger={0.05} duration={0.8}>
                       A digital log of experiments, failures, and breakthroughs.
                     </ScrollReveal>
                  </div>
                  {recentPosts[0] && (
                    <article className="group relative w-full max-w-4xl">
                      <div className="flex flex-col gap-8 md:gap-10">
                         <div className="relative h-64 md:h-[400px] w-full overflow-hidden rounded-[3rem] transition-all duration-1000 border border-primary/5 shadow-2xl">
                            <Image src={recentPosts[0].coverImage} alt={recentPosts[0].title} fill className="object-cover transition-transform duration-[3000ms] group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-background-primary via-transparent to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
                         </div>
                         <div className="flex flex-col items-start px-2">
                            <h3 className="text-4xl md:text-6xl font-light mb-6 group-hover:text-accent-blue transition-colors uppercase tracking-tight leading-tight text-primary">
                               <Link href={`/posts/${recentPosts[0].slug}`}>{recentPosts[0].title}</Link>
                            </h3>
                            <Link href={`/posts/${recentPosts[0].slug}`} className="group/btn flex items-center gap-6 px-10 py-4 rounded-full liquid-glass-clear text-xs font-semibold uppercase tracking-[0.4em] hover:scale-105 active:scale-95 transition-all text-primary border border-primary/10">Read Document <ArrowRight size={20} /></Link>
                         </div>
                      </div>
                    </article>
                  )}
                </div>
                <div className="w-full md:flex-1 flex flex-col mt-16 md:mt-32">
                   <div className="flex justify-between items-center mb-8 md:mb-10 border-b border-primary/10 pb-6">
                      <span className="text-sm font-mono uppercase tracking-[0.5em] text-primary font-semibold">Latest Posts</span>
                      <Link href="/blog" className="text-accent-blue font-mono font-bold text-xs uppercase tracking-[0.4em] hover:gap-4 flex items-center gap-2 transition-all">Archive [→]</Link>
                   </div>
                   <div className="flex flex-col gap-4 md:gap-6">
                     {recentPosts.slice(1, 3).map((post, i) => (
                       <article key={post.slug} className="group flex flex-row items-center gap-8 py-8 border-b border-primary/5 hover:bg-primary/[0.02] transition-all px-6 rounded-[2.5rem] bg-primary/[0.01]">
                          <div className="flex flex-col justify-center items-center opacity-70 group-hover:opacity-100 transition-opacity text-accent-blue">
                             <span className="font-mono text-[10px] uppercase tracking-widest font-bold">Post</span>
                             <span className="font-mono text-3xl font-light">0{i + 2}</span>
                          </div>
                          <div className="flex flex-col flex-1 min-w-0">
                             <h4 className="text-2xl md:text-3xl font-medium leading-tight mb-3 group-hover:text-accent-blue transition-colors uppercase tracking-tighter truncate text-primary">
                                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                             </h4>
                             <p className="text-primary text-base line-clamp-1 opacity-80 mb-6 font-light">{post.excerpt}</p>
                             <Link href={`/posts/${post.slug}`} className="text-[10px] font-mono uppercase tracking-[0.4em] text-accent-blue opacity-100 group-hover:translate-x-3 transition-all font-bold">Read Full Post</Link>
                          </div>
                          <div className="relative h-20 w-20 md:h-24 md:w-24 flex-shrink-0 overflow-hidden rounded-2xl opacity-80 group-hover:opacity-100 transition-all border border-primary/5">
                             <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                          </div>
                       </article>
                     ))}
                   </div>
                </div>
              </div>
            </Container>
        </section>

        {/* --- SECTION 4: CALL TO ACTION --- */}
        <section className="relative pt-32 md:pt-48 pb-0 flex flex-col items-center">
            <div className="w-full flex-grow flex flex-col items-center justify-center text-center py-20 px-10">
               <Container className="w-full max-w-6xl mx-auto flex flex-col items-center">
                  <ScrollReveal textClassName="text-6xl md:text-[9rem] font-light uppercase tracking-tighter mb-8 leading-none text-center" containerClassName="max-w-5xl mx-auto text-center" stagger={0.08} duration={1}>
                     Let's build something.
                  </ScrollReveal>
                  <ScrollReveal textClassName="text-xl md:text-3xl font-medium mb-16 max-w-3xl mx-auto opacity-80 text-center" containerClassName="max-w-3xl mx-auto text-center" stagger={0.05} duration={1}>
                     Looking for the next creative or technical intersection.
                  </ScrollReveal>
                  
                  <RefractiveButton 
                    onClick={() => window.location.href = '/contact'} 
                    className="scale-110 md:scale-125 mx-auto"
                    showShadow={false}
                  >
                     <span className="text-2xl md:text-4xl font-light uppercase px-4">Reach Out</span>
                     <ArrowRight size={40} />
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
