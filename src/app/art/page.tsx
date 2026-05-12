"use client";

import React, { useState, useMemo } from "react";
import Container from "@/app/_components/container";
import Image from "next/image";
import Link from "next/link";
import DomeGallery from "./DomeGallery";
import ArtworkModal from "@/app/_components/ArtworkModal";
import { ArrowRight, ChevronRight, Filter, Grid, Globe } from "lucide-react";
import ScrollReveal from "@/app/_components/ScrollReveal";

const HIQU_IMAGES = [
  { src: "/assets/art-assets/hiqugraphs/WhatsApp Image 2026-01-15 at 14.40.28.jpeg", title: "Spectral Void", year: "2026", category: "HiQuGraph" },
  { src: "/assets/art-assets/hiqugraphs/WhatsApp Image 2026-01-15 at 14.40.28 (1).jpeg", title: "Kinetic Flow", year: "2026", category: "HiQuGraph" },
  { src: "/assets/art-assets/hiqugraphs/WhatsApp Image 2026-01-15 at 14.40.28 (2).jpeg", title: "Organic Logic", year: "2026", category: "HiQuGraph" },
  { src: "/assets/art-assets/hiqugraphs/WhatsApp Image 2026-01-15 at 14.40.28 (3).jpeg", title: "Chromatic Rift", year: "2026", category: "HiQuGraph" },
  { src: "/assets/art-assets/hiqugraphs/WhatsApp Image 2026-01-15 at 14.40.28 (6).jpeg", title: "Neural Mesh", year: "2026", category: "HiQuGraph" },
  { src: "/assets/art-assets/hiqugraphs/WhatsApp Image 2026-01-15 at 14.40.28 (7).jpeg", title: "Prismatic Core", year: "2026", category: "HiQuGraph" },
  { src: "/assets/art-assets/hiqugraphs/WhatsApp Image 2026-01-15 at 14.40.28 (8).jpeg", title: "Glass Horizon", year: "2026", category: "HiQuGraph" },
  { src: "/assets/art-assets/hiqugraphs/WhatsApp Image 2026-01-15 at 14.40.28 (9).jpeg", title: "Atmospheric Unit", year: "2026", category: "HiQuGraph" },
];

const BATCH2_DATA = [
  { file: "image00001.jpeg", title: "Amber Labyrinth", year: "2024", category: "Studies" },
  { file: "image00002.jpeg", title: "Reverie", year: "2024", category: "Studies" },
  { file: "image00003.jpeg", title: "Petal Geometry", year: "2024", category: "Studies" },
  { file: "image00004.jpeg", title: "Sunlit Spiral", year: "2024", category: "Studies" },
  { file: "image00005.jpeg", title: "Crimson Bloom", year: "2024", category: "Studies" },
  { file: "image00006.jpeg", title: "Golden Hour", year: "2024", category: "Studies" },
  { file: "image00007.jpeg", title: "Verdant Dream", year: "2024", category: "Studies" },
  { file: "image00008.jpeg", title: "Twilight Veil", year: "2024", category: "Studies" },
].map(item => ({
    ...item,
    src: `/assets/art-assets/batch-2/${item.file}`
}));

const ALL_WORKS = [...HIQU_IMAGES, ...BATCH2_DATA];

const ArtPage = () => {
  const [galleryActive, setGalleryActive] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState("");
  const [modalYear, setModalYear] = useState("");
  const [modalWriteup, setModalWriteup] = useState("");
  const [modalArtworkId, setModalArtworkId] = useState("");

  const filteredWorks = useMemo(() => {
    if (activeCategory === "all") return ALL_WORKS;
    return ALL_WORKS.filter(work => work.category.toLowerCase() === activeCategory.toLowerCase());
  }, [activeCategory]);

  const openArtworkModal = (src: string, title: string, year: string, writeup: string = "", id: string = "") => {
    setModalImage(src);
    setModalTitle(title);
    setModalYear(year);
    setModalWriteup(writeup);
    setModalArtworkId(id);
    setModalOpen(true);
  };

  const closeArtworkModal = () => {
    setModalOpen(false);
  };

  return (
    <main className="min-h-screen pb-32 bg-background-primary">
      
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
            <source src="/assets/LN Portfolio Asset Figurine Art Loop Video Square.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background-primary/50 via-transparent to-background-primary"></div>
        </div>

        <Container className="relative z-10 w-full !max-w-none px-6 md:px-20">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-24">
            {/* Left: Dictionary Text */}
            <div className="flex-1 text-left relative z-10">
              <div className="mb-8 md:mb-12 animate-in fade-in slide-in-from-left-8 duration-1000">
                 <div className="flex items-center gap-4 mb-3 md:mb-4">
                    <span className="w-8 md:w-12 h-[1px] bg-blue-500/50"></span>
                    <span className="text-blue-500 font-medium text-[12px] md:text-sm uppercase tracking-[0.5em]">Selected Works</span>
                 </div>
                 <h1 className="text-6xl sm:text-7xl md:text-[11rem] font-light tracking-tighter leading-[0.8] mb-4 md:mb-6 uppercase">
                   Art
                 </h1>
                 <div className="flex flex-wrap items-center gap-2 md:gap-4 text-lg md:text-3xl font-mono text-secondary">
                   <span>/ɑːrt/</span>
                   <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500/50"></span>
                   <span>noun</span>
                 </div>
              </div>
              
              <ScrollReveal baseOpacity={0} enableBlur={true} blurStrength={10} textClassName="text-xl md:text-5xl font-light text-primary mt-8 md:mt-12 leading-tight max-w-2xl" stagger={0.08} duration={1} autoReveal={true}>
                1. Visual poetry. An exploration of form, light, and narrative. 2. Digital realizations of abstract human emotion and logical structures.
              </ScrollReveal>

              <div className="mt-12 md:mt-24 flex flex-wrap gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                <button onClick={() => setGalleryActive(true)} className="px-10 md:px-12 py-3 md:py-4 rounded-full font-medium text-xs md:text-sm uppercase tracking-widest transition-all bg-primary text-background-primary shadow-[0_0_30px_rgba(var(--text-primary-rgb),0.2)] hover:scale-105 active:scale-95 flex items-center gap-3">
                   <span>Initiate Sequence</span>
                   <ArrowRight size={16} />
                </button>
                <a href="#collections" className="px-10 md:px-12 py-3 md:py-4 rounded-full liquid-glass-clear font-medium text-xs md:text-sm uppercase tracking-widest hover:bg-white/5 transition-all hover:scale-105 active:scale-95">Access Archive</a>
              </div>
            </div>

            {/* Right: Figurine Visual */}
            <div className="flex-[0.6] md:flex-[0.8] w-full max-w-[300px] md:max-w-[600px] relative mt-8 md:mt-0">
               <div className="relative aspect-square w-full group">
                  <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full opacity-60"></div>
                  <Image 
                    src="/assets/LN Art Still.png" 
                    alt="Art Figurine"
                    fill
                    className="object-contain z-10 transition-all duration-1000 group-hover:scale-105 drop-shadow-[0_20px_80px_rgba(0,0,0,0.4)]"
                    priority
                  />
               </div>
            </div>
          </div>
        </Container>
      </section>

      {/* --- INTERACTIVE DOME --- */}
      {galleryActive && (
        <section className="fixed inset-0 z-[200] bg-background-primary text-primary">
          <div className="absolute top-8 right-8 md:top-10 md:right-10 z-[210] flex gap-4">
             <button onClick={() => setGalleryActive(false)} className="liquid-glass-clear w-12 h-12 rounded-full flex items-center justify-center font-mono text-xl transition-all hover:bg-white/5 hover:scale-105 active:scale-95 border border-primary/10">×</button>
          </div>
          <DomeGallery isActive={true} setIsActive={setGalleryActive} />
        </section>
      )}

      {/* --- COLLECTIONS INDEX --- */}
      <Container id="collections" className="mt-32 md:mt-48 !max-w-none px-6 md:px-20">
        
        {/* Functional Navigation / Filter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 border-b border-primary/10 pb-8">
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <Grid className="text-blue-500 w-5 h-5" />
                 <span className="font-mono text-xs uppercase tracking-[0.4em] opacity-40 text-secondary">Artifact_Index</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-light uppercase tracking-tighter leading-none text-primary">Curated Archive</h2>
           </div>

           <div className="flex flex-wrap gap-2 bg-primary/[0.03] p-1.5 rounded-full border border-primary/5 overflow-hidden">
              {[
                { id: 'all', label: 'Full Catalog' },
                { id: 'hiqugraph', label: 'HiQuGraphs' },
                { id: 'studies', label: 'Editorial Studies' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-medium uppercase tracking-[0.2em] transition-all
                    ${activeCategory === cat.id 
                      ? 'bg-primary text-background-primary shadow-xl' 
                      : 'text-secondary hover:text-primary hover:bg-primary/5'
                    }
                  `}
                >
                  {cat.label}
                </button>
              ))}
           </div>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
           {filteredWorks.map((work, i) => (
             <div 
                key={work.src} 
                className="group relative flex flex-col bg-primary/[0.02] border border-primary/5 hover:border-blue-500/40 transition-all duration-500 rounded-sm p-4 overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => openArtworkModal(work.src, work.title, work.year, "", String(i))}
             >
                <div className="absolute top-2 right-4 font-mono text-[10px] opacity-10 uppercase tracking-widest pointer-events-none group-hover:opacity-30 text-secondary">{String(i + 1).padStart(3, '0')}</div>
                
                <div className="relative aspect-[4/5] w-full overflow-hidden mb-6 rounded-sm bg-background-secondary">
                   <Image 
                      src={work.src} 
                      alt={work.title} 
                      fill 
                      className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" 
                   />
                </div>

                <div className="flex justify-between items-end">
                   <div>
                      <span className="block font-mono text-[9px] uppercase tracking-[0.3em] text-blue-500/60 mb-1">{work.category}</span>
                      <h3 className="text-lg md:text-xl font-light tracking-tight uppercase leading-none truncate group-hover:text-primary transition-colors text-primary">{work.title}</h3>
                   </div>
                   <span className="text-xs font-medium text-secondary opacity-40">{work.year}</span>
                </div>
             </div>
           ))}
        </div>

        {/* Empty State */}
        {filteredWorks.length === 0 && (
           <div className="py-40 text-center liquid-glass rounded-[3rem] border-dashed border-2">
              <span className="font-mono text-xs uppercase tracking-[0.5em] opacity-30 text-secondary">Reference_Not_Found // Sector Empty</span>
           </div>
        )}

      </Container>

      <ArtworkModal 
        isOpen={modalOpen} 
        onClose={closeArtworkModal} 
        imageSrc={modalImage || ""} 
        alt={modalTitle} 
        title={modalTitle} 
        year={modalYear} 
        writeup={modalWriteup} 
        artworkId={modalArtworkId} 
      /> 
    </main>
  );
}

export default ArtPage;