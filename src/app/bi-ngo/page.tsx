"use client";

import React from "react";
import Container from "@/app/_components/container";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Target, Shield, Cpu, Network, Layout, Globe, ExternalLink } from "lucide-react";
import ScrollReveal from "@/app/_components/ScrollReveal";
import { motion } from "framer-motion";
import TextPressure from "@/app/_components/TextPressure";

export default function BiNgoPage() {
  const pillars = [
    { id: 'B', title: 'Blueprint', description: 'Architecting the structural foundation for technological sovereignty. Designing systems that scale with African ambition.', icon: Layout, color: 'text-green-400' },
    { id: 'I', title: 'Initiative', description: 'Driving proactive execution over bureaucratic deliberation. The momentum of invention over the inertia of extraction.', icon: Target, color: 'text-yellow-400' },
    { id: 'N', title: 'Network', description: 'Forging a decentralized mesh of creators and innovators. Connecting local nodes into a global force of creation.', icon: Network, color: 'text-white' },
    { id: 'G', title: 'Guard', description: 'Defining and defending the ethical standards of our data. Protecting the digital trajectory of the continent.', icon: Shield, color: 'text-green-400' },
    { id: 'O', title: 'Operator', description: 'Intelligent system optimization in real-time. The rapid execution of machine logic powered by human intuition.', icon: Cpu, color: 'text-yellow-400' }
  ];

  return (
    <main className="min-h-screen pb-32 bg-background-primary text-primary overflow-x-hidden relative">
      {/* Global Branding Tint - Balanced for maximum legibility */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_10%,rgba(34,197,94,0.15)_0%,transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at:90%_90%,rgba(34,197,94,0.15)_0%,transparent_50%)]"></div>
      </div>
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-20 border-b border-green-500/10">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-green-500/5 via-yellow-500/5 to-transparent opacity-40"></div>
        </div>

        <Container className="relative z-10 w-full !max-w-none px-6 md:px-20">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-32">
            <div className="flex-1 text-left relative z-10">
              <div className="mb-12 animate-in fade-in slide-in-from-left-8 duration-1000">
                 <div className="flex items-center gap-4 mb-6">
                    <span className="w-16 h-[2px] bg-gradient-to-r from-green-500 via-yellow-500 to-white"></span>
                    <span className="text-green-400 font-medium text-xs md:text-sm uppercase tracking-[0.5em]">Project.Manifesto.00</span>
                 </div>
                 <div className="h-24 md:h-48 mb-8">
                    <TextPressure 
                      text="The BI NGO" 
                      flex={true} 
                      textColor="#4ade80" 
                      minFontSize={80} 
                      mouseMode={true} 
                      fontFamily="Noto Serif Display"
                      minWdth={62.5}
                      maxWdth={85}
                      minWght={100}
                      maxWght={900}
                      className="!justify-start !text-left font-light" 
                    />
                 </div>
                 <div className="flex flex-wrap items-center gap-4 text-2xl md:text-4xl font-mono text-green-400/80">
                   <span>/biː aɪ ɛn dʒiː oʊ/</span>
                   <span className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]"></span>
                   <span>organization</span>
                 </div>
              </div>
              
              <ScrollReveal baseOpacity={0} enableBlur={true} blurStrength={15} textClassName="text-3xl md:text-6xl font-light text-primary mt-12 leading-tight max-w-4xl" stagger={0.06} duration={1.2} autoReveal={true}>
                "We have seen the options. We know the answer, and the moment we found this answer, we said 'Bingo.'"
              </ScrollReveal>
            </div>

            <div className="flex-[0.7] w-full max-w-[600px] relative">
               <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="relative aspect-square w-full group">
                  <div className="absolute inset-0 bg-green-500/5 blur-[120px] rounded-full opacity-40"></div>
                  <Image 
                    src="/assets/BI NGO Logo Final.png" 
                    alt="The BI NGO Final Logo" 
                    fill 
                    className="object-contain z-10 transition-all duration-1000 group-hover:scale-105 drop-shadow-[0_20px_80px_rgba(34,197,94,0.3)]" 
                    priority 
                  />
               </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* --- CORE PHILOSOPHY: THE SEMANTIC BINGO --- */}
      <section className="py-40 relative border-t border-green-500/5">
         <Container className="!max-w-none px-6 md:px-20">
            <div className="flex flex-col lg:flex-row gap-20 items-start">
               <div className="flex-[0.8]">
                  <div className="flex items-center gap-4 mb-10 font-mono text-xs uppercase tracking-[0.4em] opacity-40">
                     <span>Intelligence_Extraction</span>
                     <span className="w-1 h-1 rounded-full bg-green-500"></span>
                     <span>Semantic_Exactitude</span>
                  </div>
                  <h2 className="text-6xl md:text-9xl font-light uppercase tracking-tighter mb-8 leading-tight text-primary">The Semantic<br/>Bingo</h2>
               </div>

               <div className="flex-1 space-y-24">
                  <div>
                     <h3 className="text-2xl md:text-3xl font-light uppercase tracking-widest text-green-400 mb-6 flex items-center gap-4">
                        <span className="w-8 h-px bg-green-400/40"></span>
                        Not a Game
                     </h3>
                     <ScrollReveal textClassName="text-2xl md:text-5xl font-light text-primary leading-tight" stagger={0.03} duration={0.8}>
                        Bingo is not a game; it is the visceral human reaction to exactitude. It is the precise click of a complex reality being perfectly and succinctly defined. It is the sound of a problem losing its complexity through the power of a single, correct observation.
                     </ScrollReveal>
                  </div>

                  <div>
                     <h3 className="text-2xl md:text-3xl font-light uppercase tracking-widest text-green-400 mb-6 flex items-center gap-4">
                        <span className="w-8 h-px bg-green-400/40"></span>
                        True Intelligence
                     </h3>
                     <ScrollReveal textClassName="text-2xl md:text-5xl font-light text-primary leading-tight" stagger={0.03} duration={0.8}>
                        Business Intelligence (BI) is the architectural ability to cut through superficial noise and keyword clutter. It is the rigorous discipline of extraction—revealing the exact, underlying semantic truth hidden within the chaos of institutional jargon.
                     </ScrollReveal>
                  </div>

                  <div>
                     <h3 className="text-2xl md:text-3xl font-light uppercase tracking-widest text-green-400 mb-6 flex items-center gap-4">
                        <span className="w-8 h-px bg-green-400/40"></span>
                        The Diagnostic Engine
                     </h3>
                     <ScrollReveal textClassName="text-2xl md:text-5xl font-light text-primary leading-tight" stagger={0.03} duration={0.8}>
                        Historically, the continent's challenges have been fundamentally misdiagnosed, leading to a graveyard of incorrect solutions. The BI NGO acts as the ultimate diagnostic engine—defining root problems so clearly that the only logical response is, "Bingo."
                     </ScrollReveal>
                  </div>
               </div>
            </div>
         </Container>
      </section>

      {/* --- THE VISION SECTION --- */}
      <section className="py-40 bg-green-950/10 border-y border-green-500/10 relative overflow-hidden">
         <Container className="!max-w-none px-6 md:px-20 relative z-10">
            <div className="flex flex-col md:flex-row gap-20 items-start">
               <div className="flex-1">
                  <div className="flex items-center gap-4 mb-10 font-mono text-xs uppercase tracking-[0.4em] opacity-40">
                     <span>Protocol_Vision_01</span>
                     <span className="w-1 h-1 rounded-full bg-green-500"></span>
                     <span>Trajectory_Active</span>
                  </div>
                  <h2 className="text-5xl md:text-9xl font-light uppercase tracking-tighter mb-12 leading-none text-primary">Technological<br/>Sovereignty</h2>
               </div>
               <div className="flex-1 pt-4 md:pt-24">
                  <ScrollReveal textClassName="text-2xl md:text-4xl font-light text-primary leading-relaxed" stagger={0.03} duration={0.8}>
                    Africa must move from extraction to invention, and from consumers to creators, using AI as the leverage point for technological sovereignty. We are architecting the shift from raw data to collective empowerment.
                  </ScrollReveal>
                  <div className="mt-16 h-[2px] w-full bg-gradient-to-r from-green-500/40 via-yellow-500/20 to-transparent"></div>
               </div>
            </div>
         </Container>
      </section>

      {/* --- THE B-I-N-G-O FRAMEWORK --- */}
      <section className="py-40 relative">
        <Container className="!max-w-none px-6 md:px-20">
          <div className="mb-24">
             <span className="text-green-400 font-medium text-sm uppercase tracking-[0.4em] mb-4 block">The System Architecture</span>
             <h2 className="text-6xl md:text-[10rem] font-light uppercase tracking-tighter text-primary">The Framework</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {pillars.map((pillar, i) => (
              <motion.div key={pillar.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.8 }} 
                className="bg-green-950/20 border border-green-500/20 backdrop-blur-md group p-10 flex flex-col items-start min-h-[400px] hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-500 rounded-sm"
              >
                <div className="text-7xl md:text-9xl font-light opacity-10 mb-8 font-mono group-hover:opacity-40 group-hover:text-green-400 transition-all duration-700 text-green-500">{pillar.id}</div>
                <div className={`w-12 h-12 rounded-xl bg-white/5 ${pillar.color} mb-8 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform`}>
                   <pillar.icon size={24} />
                </div>
                <h3 className="text-3xl font-light uppercase tracking-tight mb-4 text-primary">{pillar.title}</h3>
                <p className="text-primary text-base font-medium leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                   {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* --- VISUAL ARCHITECTURE --- */}
      <section className="py-40 bg-green-700 text-primary relative overflow-hidden">
         <Container className="!max-w-none px-6 md:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="order-2 lg:order-1">
                  <div className="mb-16">
                     <span className="font-medium text-sm uppercase tracking-[0.4em] opacity-60 mb-4 block">Design Intelligence</span>
                     <h2 className="text-5xl md:text-9xl font-light uppercase tracking-tighter leading-none text-primary">Visual<br/>Semantics</h2>
                  </div>
                  <div className="space-y-12">
                     <div className="flex gap-8 items-start">
                        <div className="text-4xl font-light opacity-20">01</div>
                        <div>
                           <h4 className="text-2xl font-medium uppercase tracking-tight mb-2 text-primary">The Speech Bubble</h4>
                           <p className="text-xl text-primary leading-relaxed">Defining ethical standards. A negative space vessel for discourse, policy, and the human voice within machine logic.</p>
                        </div>
                     </div>
                     <div className="flex gap-8 items-start">
                        <div className="text-4xl font-light opacity-20">02</div>
                        <div>
                           <h4 className="text-2xl font-medium uppercase tracking-tight mb-2 text-primary">The Upward Arrow</h4>
                           <p className="text-xl text-primary leading-relaxed">The trajectory of progress. An uncompromising vector directed toward technological sovereignty and economic elevation.</p>
                        </div>
                     </div>
                     <div className="flex gap-8 items-start">
                        <div className="text-4xl font-light opacity-20">03</div>
                        <div>
                           <h4 className="text-2xl font-medium uppercase tracking-tight mb-2 text-primary">The Forward Button</h4>
                           <p className="text-xl text-primary leading-relaxed">Rapid execution. The command for momentum, ensuring that vision is always met with immediate, efficient action.</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="order-1 lg:order-2 flex justify-center">
                  <div className="relative w-full max-w-[500px] aspect-square group">
                     <div className="absolute inset-0 bg-white/5 blur-[100px] rounded-full animate-pulse"></div>
                     <Image src="/assets/BI NGO Logo Final.png" alt="Logo Breakdown" fill className="object-contain transition-transform duration-1000 group-hover:rotate-3" />
                  </div>
               </div>
            </div>
         </Container>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-40 text-center relative z-10">
         <Container>
            <h2 className="text-6xl md:text-[10rem] font-light uppercase tracking-tighter mb-12 text-primary">Action Protocol</h2>
            <Link href="https://nduatileon.site" target="_blank" className="inline-flex items-center gap-6 text-3xl md:text-6xl font-light uppercase border-b-4 border-green-400 text-green-400 hover:gap-12 transition-all duration-500 pb-2">Access System <ArrowRight size={48} /></Link>
         </Container>
      </section>
    </main>
  );
}
