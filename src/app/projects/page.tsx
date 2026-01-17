'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from "@/app/_components/container";
import { ArrowRight, Code, Terminal, Cpu, PenTool, Layout, Box } from 'lucide-react';

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('featured');

  const categories = [
    { id: 'featured', label: 'Priority', icon: Box },
    { id: 'all', label: 'Master Index', icon: Layout },
    { id: 'web', label: 'Web Systems', icon: Code },
    { id: 'mobile', label: 'Mobile Units', icon: Terminal },
    { id: 'open-source', label: 'Open Source', icon: PenTool },
    { id: 'ai', label: 'Neural Nets', icon: Cpu }
  ];

  return (
    <main className="min-h-screen bg-[#EAE8E3] text-black selection:bg-[#F4B400] selection:text-black">
      
      {/* 1. BACKGROUND GRID */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0" 
           style={{ 
             backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
           }}>
      </div>

      {/* 2. HERO: ENGINEERING BLUEPRINT */}
      <div className="relative z-10 w-full border-b-4 border-black bg-[#F4F3EF]">
         {/* Ticker Tape */}
         <div className="w-full bg-black text-[#F4F3EF] py-2 overflow-hidden border-b-2 border-black">
            <div className="animate-marquee whitespace-nowrap font-mono text-xs uppercase tracking-[0.3em] flex items-center gap-12">
               <span>/// PROJECT_LAB: ONLINE</span>
               <span>/// STATUS: DEVELOPMENT</span>
               <span>/// ACCESS_LEVEL: PUBLIC</span>
               <span>/// PROJECT_LAB: ONLINE</span>
               <span>/// STATUS: DEVELOPMENT</span>
               <span>/// ACCESS_LEVEL: PUBLIC</span>
            </div>
         </div>

         <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] min-h-[50vh]">
            <div className="p-8 md:p-16 flex flex-col justify-center border-b-4 lg:border-b-0 lg:border-r-4 border-black relative bg-[#F4F3EF]">
               <div className="mb-6 flex items-center gap-4">
                  <div className="w-4 h-4 bg-[#F4B400] rounded-full animate-pulse border-2 border-black"></div>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-gray-500">
                     System_Architecture
                  </span>
               </div>
               
               <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter mb-8 mix-blend-darken">
                  Applied<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4B400] to-[#FF3B30]">Systems</span>
               </h1>
               
               <p className="text-lg font-medium border-l-4 border-black pl-6 max-w-lg leading-relaxed">
                  Innovative solutions deployed across web, mobile, and emerging technologies.
               </p>
            </div>

            <div className="relative bg-black group overflow-hidden border-b-4 lg:border-b-0 border-black min-h-[300px]">
               <Image
                  src="/assets/blog/blog-post-covers/pontus-wellgraf-16_bFHg8Ouc-unsplash.jpg"
                  alt="Projects"
                  fill
                  className="object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500"
                  priority
               />
               <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
               <div className="absolute top-4 right-4 border-2 border-white text-white px-3 py-1 font-mono text-xs uppercase tracking-widest">
                  Fig. 01: The Lab
               </div>
            </div>
         </div>
      </div>

      {/* 3. CONTROL PANEL (TABS) */}
      <div className="sticky top-20 z-40 bg-[#EAE8E3] border-b-4 border-black shadow-xl">
        <div className="max-w-[1920px] mx-auto">
          <nav className="flex overflow-x-auto no-scrollbar py-4 px-4 md:px-8 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`
                  flex items-center gap-2 px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest border-2 transition-all duration-150
                  whitespace-nowrap
                  ${activeTab === cat.id
                    ? 'bg-black text-white border-black translate-x-[2px] translate-y-[2px] shadow-none'
                    : 'bg-white text-black border-black hover:bg-[#F4B400] hover:border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                  }
                `}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <Container>
        {/* 4. UNDER CONSTRUCTION STATE */}
        <div className="py-24 md:py-32 flex flex-col items-center justify-center text-center px-4 relative z-10">
           
           <div className="border-4 border-black border-dashed p-12 md:p-16 bg-white w-full max-w-3xl shadow-[16px_16px_0px_0px_#F4B400] relative overflow-hidden group">
              
              {/* Construction Tape Effect */}
              <div className="absolute top-0 left-0 w-full h-4 bg-[repeating-linear-gradient(45deg,#F4B400,#F4B400_10px,#000_10px,#000_20px)]"></div>
              <div className="absolute bottom-0 left-0 w-full h-4 bg-[repeating-linear-gradient(45deg,#F4B400,#F4B400_10px,#000_10px,#000_20px)]"></div>

              <div className="w-20 h-20 bg-black text-[#F4B400] mx-auto mb-8 flex items-center justify-center border-4 border-[#F4B400] rounded-full animate-[spin_10s_linear_infinite]">
                 <Code className="w-10 h-10" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 tracking-tighter">
                Under Construction
              </h2>
              
              <div className="bg-[#F4F3EF] border-l-4 border-black p-4 mb-8 text-left max-w-lg mx-auto">
                 <p className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-2">Status Report:</p>
                 <p className="font-medium text-lg leading-relaxed">
                    Projects are currently being compiled for public deployment. Check back soon for source code and case studies.
                 </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <Link 
                    href="/contact" 
                    className="px-8 py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-[#F4B400] hover:text-black hover:border-black border-2 border-transparent transition-all shadow-lg active:translate-y-1 active:translate-x-1 active:shadow-none"
                 >
                    Contact Developer
                 </Link>
                 <Link 
                    href="/" 
                    className="px-8 py-4 bg-transparent text-black font-bold uppercase tracking-widest border-2 border-black hover:bg-black hover:text-white transition-all"
                 >
                    Return Home
                 </Link>
              </div>
           </div>

        </div>
      </Container>
    </main>
  );
}