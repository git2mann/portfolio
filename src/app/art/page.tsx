"use client";

import React, { useState, useMemo } from "react";
import Container from "@/app/_components/container";
import Image from "next/image";
import Link from "next/link";
import DomeGallery from "./DomeGallery";
import ArtworkModal from "@/app/_components/ArtworkModal";
import { ArrowRight, ChevronRight, Filter, Grid, Globe, X } from "lucide-react";
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
    <main className="min-h-screen pb-32 bg-background-primary relative selection:bg-accent-blue/30 font-noto-display-condensed">
      
      {/* Background layer */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-background-primary" />

      {/* --- HERO SECTION: DICTIONARY ENTRY --- */}
      <section className="relative min-h-[50vh] md:min-h-[70vh] md:h-[85vh] flex flex-col justify-center overflow-hidden pt-16 pb-4 md:pt-20">
        <div className="absolute inset-0 z-0 pointer-events-none bg-background-primary" />

        <Container className="relative z-10 w-full !max-w-none px-6 md:px-20">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-24">
            {/* Left: Dictionary Text */}
            <div className="flex-1 text-left relative z-10">
              <div className="mb-8 md:mb-12 animate-in fade-in slide-in-from-left-8 duration-1000">
                 <div className="flex items-center gap-4 mb-3 md:mb-4">
                    <span className="block w-8 md:w-12 h-[1px] bg-accent-blue opacity-50"></span>
                    <span className="text-accent-blue font-medium text-[12px] md:text-sm uppercase tracking-[0.5em]">Selected Works</span>
                 </div>
                 
                 <h1 className="text-6xl sm:text-7xl md:text-[11rem] font-light tracking-tighter leading-[0.8] mb-4 md:mb-6 uppercase text-primary">
                   Art
                 </h1>
                 
                 <div className="flex flex-wrap items-center gap-2 md:gap-4 text-lg md:text-3xl font-mono text-secondary">
                   <span>/ɑːrt/</span>
                   <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent-blue/50"></span>
                   <span>noun</span>
                 </div>
              </div>
              
              <ScrollReveal baseOpacity={0} enableBlur={true} blurStrength={10} textClassName="text-xl md:text-5xl font-light text-primary mt-8 md:mt-12 leading-tight max-w-2xl" stagger={0.08} duration={1} autoReveal={true}>
                1. Visual poetry. An exploration of form, light, and narrative. 2. Digital realizations of abstract human emotion and logical structures.
              </ScrollReveal>

              <div className="mt-12 md:mt-24 flex flex-wrap gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                <button onClick={() => setGalleryActive(true)} className="px-10 md:px-12 py-3 md:py-4 rounded-full font-medium text-xs md:text-sm uppercase tracking-widest transition-all bg-primary text-background-primary shadow-xl hover:scale-105 active:scale-95 flex items-center gap-3">
                   <span>Enter 3D Gallery</span>
                   <ArrowRight size={16} />
                </button>
                <a href="#collections" className="px-10 md:px-12 py-3 md:py-4 rounded-full liquid-glass-clear font-medium text-xs md:text-sm uppercase tracking-widest hover:bg-white/5 transition-all hover:scale-105 active:scale-95 text-primary">
                   View Catalog
                </a>
              </div>
            </div>

            {/* Right: Figurine Visual */}
            <div className="flex-[0.6] md:flex-[0.8] w-full max-w-[300px] md:max-w-[600px] relative mt-4 md:mt-0">
               <div className="relative aspect-square w-full group">
                  <div className="absolute inset-0 bg-accent-blue/5 blur-3xl rounded-full opacity-60"></div>
                  <Image 
                    src="/assets/LN Art Still.webp" 
                    alt="Art Figurine"
                    fill 
                    sizes="(max-width: 768px) 300px, 600px"
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
          <DomeGallery isActive={true} setIsActive={setGalleryActive} />
        </section>
      )}

      {/* --- STICKY NAVIGATION TABS --- */}
      <div id="collections" className="sticky top-20 md:top-24 z-40 mb-12 scroll-mt-24 px-2 md:px-0">
        <div className="max-w-full md:max-w-fit mx-auto liquid-glass px-1.5 py-1.5 sm:px-2 sm:py-2 rounded-full shadow-2xl border border-primary/10 overflow-x-auto no-scrollbar">
          <nav className="flex gap-1 items-center justify-start md:justify-center whitespace-nowrap min-w-max">
            {[
              { id: 'all', label: 'Full Catalog' },
              { id: 'hiqugraph', label: 'HiQuGraphs' },
              { id: 'studies', label: 'Editorial Studies' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-3 rounded-full text-xs font-medium uppercase tracking-[0.2em] sm:tracking-[0.25em] transition-all whitespace-nowrap
                  ${activeCategory === cat.id 
                    ? 'bg-primary text-background-primary shadow-xl scale-105' 
                    : 'text-secondary hover:text-primary hover:bg-white/5'
                  }
                `}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* --- COLLECTIONS INDEX --- */}
      <Container className="!max-w-none px-6 md:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="relative mb-10 md:mb-16 rounded-2xl overflow-hidden p-6 md:p-8 bg-primary/[0.02] backdrop-blur-md shadow-lg border border-primary/5">
           <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent"></div>
           
           <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                 <div className="flex items-center gap-3 mb-2">
                     <span className="text-accent-blue font-mono text-[10px] uppercase tracking-[0.2em] font-semibold">Visual Archives</span>
                     <span className="w-1.5 h-1.5 rounded-full bg-accent-blue/40"></span>
                     <span className="text-secondary opacity-50 font-mono text-[10px] uppercase tracking-wider">{filteredWorks.length} Pieces</span>
                 </div>
                 <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter leading-none text-primary">Curated Catalog</h2>
                 <p className="text-secondary text-sm md:text-base mt-2 max-w-xl opacity-60">High-resolution visual experiments in form, light, and generative narrative.</p>
              </div>
           </div>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-7">
           {filteredWorks.map((work, i) => (
             <div 
                key={work.src} 
                className="group relative flex flex-col rounded-2xl bg-primary/[0.02] hover:bg-primary/[0.04] border border-primary/5 hover:border-accent-blue/40 transition-all duration-300 p-3.5 md:p-4 overflow-hidden cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.12)] hover:scale-[1.01] active:scale-[0.99]"
                onClick={() => openArtworkModal(work.src, work.title, work.year, "", String(i))}
             >
                <div className="absolute top-3 right-4 font-mono text-[10px] opacity-20 uppercase tracking-widest pointer-events-none group-hover:opacity-40 text-secondary z-10">{String(i + 1).padStart(3, '0')}</div>
                
                <div className="relative aspect-[4/5] w-full overflow-hidden mb-3 md:mb-5 rounded-xl bg-background-secondary">
                   <Image 
                      src={work.src} 
                      alt={work.title} 
                      fill 
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover opacity-85 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" 
                   />
                </div>

                <div className="flex justify-between items-end mt-auto">
                   <div>
                      <span className="block font-mono text-[9px] uppercase tracking-[0.25em] text-accent-blue mb-1">{work.category}</span>
                      <h3 className="text-sm md:text-base font-light tracking-tight uppercase leading-none truncate group-hover:text-accent-blue transition-colors text-primary">{work.title}</h3>
                   </div>
                   <span className="text-xs font-mono text-secondary opacity-50">{work.year}</span>
                </div>
             </div>
           ))}
        </div>

        {/* Empty State */}
        {filteredWorks.length === 0 && (
           <div className="py-40 text-center liquid-glass rounded-3xl border-dashed border-2 border-primary/10">
              <span className="font-mono text-xs uppercase tracking-[0.5em] opacity-30 text-secondary">No artwork found in this category.</span>
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