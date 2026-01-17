"use client";

import React, { useState, useEffect } from "react";
import Container from "@/app/_components/container";
import Image from "next/image";
import DomeGallery from "./DomeGallery";
import ArtworkModal from "@/app/_components/ArtworkModal";
import { Eye, Maximize2, ArrowDown, Grid, Layers, PenTool } from "lucide-react";

function ArtPage() {
   const [modalOpen, setModalOpen] = useState(false);
   const [modalImage, setModalImage] = useState<string | null>(null);
   const [modalAlt, setModalAlt] = useState<string>("");
   const [modalTitle, setModalTitle] = useState<string>("");
   const [modalYear, setModalYear] = useState<string>("");
   const [modalWriteup, setModalWriteup] = useState<string>("");
   const [modalArtworkId, setModalArtworkId] = useState<string | undefined>(undefined);
  
  // Gallery state
  const [galleryActive, setGalleryActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

   // Helper to slugify title for id fallback
   function slugify(str: string) {
      return str
         .toLowerCase()
         .replace(/[^a-z0-9]+/g, "-")
         .replace(/-+/g, "-")
         .replace(/^-|-$/g, "");
   }

   const openArtworkModal = (src: string, title: string, year: string, writeup?: string, artworkId?: string) => {
      setModalImage(src);
      setModalTitle(title);
      setModalYear(year);
      setModalAlt(title);
      setModalWriteup(writeup || "");
      setModalArtworkId(artworkId || slugify(title));
      setModalOpen(true);
   };

   const closeArtworkModal = () => {
      setModalOpen(false);
      setModalImage(null);
      setModalAlt("");
      setModalTitle("");
      setModalYear("");
      setModalWriteup("");
      setModalArtworkId(undefined);
   };

  return (
    <main className="min-h-screen bg-[#EAE8E3] text-black selection:bg-[#2B4592] selection:text-white relative overflow-x-hidden">
      
      {/* 1. BACKGROUND GRID TEXTURE */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0" 
           style={{ 
             backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
           }}>
      </div>

      {/* 2. HERO: THE OBSERVATION DECK */}
      <div className="relative w-full h-screen max-h-[1200px] border-b-4 border-black bg-[#111] overflow-hidden flex flex-col">
        
        {/* Top Control Bar */}
        <div className="absolute top-0 left-0 w-full z-30 flex justify-between items-center px-4 md:px-8 py-4 bg-black text-white border-b-2 border-white/20">
           <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-[#FF3B30] rounded-full animate-pulse"></div>
              <span className="font-mono text-xs uppercase tracking-[0.2em]">Visual_Research_Lab</span>
           </div>
           <div className="hidden md:flex font-mono text-[10px] uppercase tracking-widest gap-8">
              <span>X: 00.00</span>
              <span>Y: 00.00</span>
              <span>ZOOM: 100%</span>
           </div>
        </div>

        {/* The Dome Gallery (Interactive Canvas) */}
        <div className="relative flex-grow w-full z-10">
           {/* If gallery is active on mobile, we might want to hide overlay elements, 
               but strictly keeping styling, we frame it. */}
           <DomeGallery isActive={galleryActive} setIsActive={setGalleryActive} />
           
           {/* Overlay Vignette / Frame */}
           <div className="absolute inset-0 border-[20px] md:border-[40px] border-[#EAE8E3] pointer-events-none z-20"></div>
           
           {/* Hero Title Overlay (Visible when not interactive or desktop) */}
           {(!galleryActive || !isMobile) && (
             <div className="absolute bottom-12 left-8 md:left-16 z-30 pointer-events-none">
                <div className="bg-black text-white px-4 py-1 font-mono text-xs uppercase tracking-widest w-fit mb-4">
                   ///// AN INTERACTIVE GALLERY.
                </div>
                        <div className="flex items-center gap-0">
                           <div className="h-full w-4 md:w-8 bg-[#FF3B30] border-black mr-2 md:mr-4" style={{minHeight: '80px'}}></div>
                           <div className="inline-block px-6 py-2 md:px-12 md:py-4 bg-white border-4 border-black rounded-xl">
                              <h1 className="text-7xl md:text-9xl font-black uppercase leading-none tracking-tighter text-black">
                                 Art<br/>Work
                              </h1>
                           </div>
                        </div>
             </div>
           )}

           
        </div>
      </div>


      {/* 3. VISUALIZING SOUND (ALBUM ART) */}
      <section className="relative z-10 border-b-4 border-black bg-[#F4F3EF] py-24">
        <Container>
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
             <div>
                <div className="flex items-center gap-3 mb-2">
                   <Layers className="w-6 h-6" />
                   <span className="font-mono text-xs uppercase tracking-widest text-gray-500">Collection 01</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                   Visualizing<br/><span className="text-[#2B4592]">Sound</span>
                </h2>
             </div>
             <p className="font-medium text-lg max-w-sm border-l-4 border-[#2B4592] pl-6">
                Graphic identities and cover art for sonic projects.
             </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t-2 border-l-2 border-black">
            {[
              { src: "/assets/music-assets/HalfThoughts1Cover.png", title: "Half Thoughts Cover", year: "2023" },
              { src: "/assets/music-assets/SQUEALER AND THE AGGRESSORS OF PEACE Album Cover.jpeg", title: "Squealer And The Aggressors Of Peace Cover", year: "2024" },
              { src: "/assets/music-assets/Lazlo Album Cover (Final).jpeg", title: "Lazlo Cover", year: "2022" },
              { src: "/assets/music-assets/Son Of Ink Album Cover.jpeg", title: "Son Of Ink Cover", year: "2021" },
              { src: "/assets/music-assets/Some Of Ink EP Cover.png", title: "Some Of Ink Cover", year: "2022" },
              { src: "/assets/music-assets/Squealer and the Aggressors of Peace (Live) Front Cover.jpeg", title: "Squealer And The Aggressors Of Peace (Live) Cover", year: "2025" },
              { src: "/assets/music-assets/ALLEGORY (FREESTYLE) Single Cover.jpeg", title: "Allegory (Freestyle) Cover", year: "2023" },
              { src: "/assets/music-assets/Eye Kan Single Cover.jpeg", title: "Eye Kan Cover", year: "2023" },
              { src: "/assets/music-assets/First(Interlude) Single Cover.jpeg", title: "First (Interlude) Cover", year: "2023" },
              { src: "/assets/music-assets/GoodbyeSongSingleCover.png", title: "Goodbye Song (Demo) Cover", year: "2023" }
            ].map(({ src, title, year }, i) => (
              <div
                key={src}
                className="group relative border-r-2 border-b-2 border-black bg-white aspect-square overflow-hidden cursor-pointer"
                onClick={() => openArtworkModal(src, title, year)}
              >
                <div className="absolute inset-0 p-4 flex flex-col justify-between z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                   <div className="flex justify-between items-start">
                      <span className="bg-black text-white font-mono text-[10px] px-2 py-1">{year}</span>
                      <Maximize2 className="w-6 h-6 text-black bg-white p-1 border-2 border-black" />
                   </div>
                   <span className="font-bold uppercase text-xl leading-none bg-white border-2 border-black px-2 py-1 w-fit">
                      {title}
                   </span>
                </div>
                
                {/* Image */}
                <Image
                  src={src}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105 group-hover:grayscale"
                />
                
                {/* Hover Tint */}
                <div className="absolute inset-0 bg-[#2B4592] mix-blend-multiply opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-10"></div>
              </div>
            ))}
          </div>
        </Container>
      </section>


      {/* 4. EDITORIAL PIECES (Grid with Text) */}
      <section className="relative z-10 border-b-4 border-black bg-white py-24">
        <Container>
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
             <div>
                <div className="flex items-center gap-3 mb-2">
                   <PenTool className="w-6 h-6" />
                   <span className="font-mono text-xs uppercase tracking-widest text-gray-500">Collection 02</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                   Editorial<br/><span className="text-[#FF3B30]">Index</span>
                </h2>
             </div>
             <p className="font-medium text-lg max-w-sm border-l-4 border-[#FF3B30] pl-6">
                Narrative-driven visual compositions.
             </p>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {[
              {
                folder: "hiqugraphs",
                file: "WhatsApp Image 2026-01-15 at 14.40.28 (1).jpeg",
                title: "The Amber Labyrinth",
                year: "2026",
                writeup: `This is the geometry of warmth. The camera dives into the center of the rose, finding a Fibonacci spiral bathed in the hues of a setting sun. It feels intimate, almost secretive.`
              },
              {
                folder: "hiqugraphs",
                file: "WhatsApp Image 2026-01-15 at 14.40.28 (2).jpeg",
                title: "Weight of a Shilling",
                year: "2026",
                writeup: `There is a profound dignity in the overlooked artifacts of our daily lives. This monochromatic study of the Kenyan shilling elevates a simple unit of currency into a relic of identity.`
              },
              {
                folder: "batch-2",
                file: "image00001.jpeg",
                title: "The Velvet Inferno",
                year: "2026",
                writeup: `Nature rarely whispers; often, it commands. This image captures the hibiscus as a biological event; A sudden, velvet explosion.`
              },
              {
                folder: "batch-2",
                file: "image00002.jpeg",
                title: "Reverie by the Water",
                year: "2026",
                writeup: `Through the lens of nostalgia, the present moment becomes a memory before it has even faded. This image feels like a found photograph from a forgotten summer.`
              }
            ].map((img, idx) => (
              <div key={img.file} className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-200 bg-[#F4F3EF]">
                 
                 {/* Image Side */}
                 <div 
                    className="relative min-h-[400px] border-b-4 md:border-b-0 md:border-r-4 border-black overflow-hidden group cursor-pointer md:min-h-[320px]"
                    onClick={() => openArtworkModal(`/assets/art-assets/${img.folder}/${img.file}`, img.title, img.year, img.writeup)}
                 >
                    <Image
                       src={`/assets/art-assets/${img.folder}/${img.file}`}
                       alt={img.title}
                       fill
                       className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 bg-[#FF3B30] text-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest border-t-2 border-r-2 border-black">
                       Figure 0{idx + 1}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20">
                       <div className="bg-white border-2 border-black px-6 py-2 font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                          Inspect
                       </div>
                    </div>
                 </div>

                 {/* Text Side */}
                 <div className="p-8 flex flex-col justify-between">
                    <div>
                       <div className="flex justify-between items-start mb-6 border-b-2 border-black/10 pb-4">
                          <h3 className="text-3xl font-black uppercase leading-none tracking-tight">{img.title}</h3>
                          <span className="font-mono text-xs font-bold text-gray-500">{img.year}</span>
                       </div>
                       <p className="text-sm font-medium leading-relaxed text-gray-800">
                          {img.writeup}
                       </p>
                    </div>
                    <button 
                       className="mt-8 self-start flex items-center gap-2 font-bold uppercase text-xs tracking-widest hover:text-[#FF3B30] transition-colors"
                       onClick={() => openArtworkModal(`/assets/art-assets/${img.folder}/${img.file}`, img.title, img.year, img.writeup)}
                    >
                       Read Full Analysis <Eye className="w-4 h-4" />
                    </button>
                 </div>
              </div>
            ))}
          </div>
        </Container>
      </section>


      {/* 5. SELECTED WORKS (Masonry / Gallery Wall) */}
      <section className="relative z-10 bg-[#F4F3EF] py-24 pb-48">
        <Container>
          <div className="flex items-center gap-4 mb-16">
             <Grid className="w-8 h-8" />
             <h2 className="text-4xl font-black uppercase tracking-tighter">Flora Studies</h2>
             <div className="h-1 flex-grow bg-black opacity-10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { folder: "hiqugraphs", file: "WhatsApp Image 2026-01-15 at 14.40.28 (3).jpeg" },
              { folder: "hiqugraphs", file: "WhatsApp Image 2026-01-15 at 14.40.28 (6).jpeg" },
              { folder: "batch-2", file: "image00003.jpeg" },
              { folder: "batch-2", file: "image00037.jpeg" },
              { folder: "hiqugraphs", file: "WhatsApp Image 2026-01-15 at 14.40.28 (7).jpeg" },
              { folder: "batch-2", file: "image00005.jpeg" },
              { folder: "hiqugraphs", file: "WhatsApp Image 2026-01-15 at 14.40.28 (8).jpeg" },
              { folder: "batch-2", file: "image00009.jpeg" },
              { folder: "batch-2", file: "image00008.jpeg" }
            ].map((img, idx) => (
              <div 
                 key={img.file} 
                 className={`
                    group relative border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200 cursor-pointer
                    ${idx % 2 !== 0 ? 'md:translate-y-12' : ''}
                 `}
                 onClick={() => openArtworkModal(`/assets/art-assets/${img.folder}/${img.file}`, `Flora Study ${idx + 1}`, "2026")}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={`/assets/art-assets/${img.folder}/${img.file}`}
                    alt={`Art Piece ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#F4B400] mix-blend-multiply opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
                <div className="p-3 border-t-4 border-black bg-white flex justify-between items-center">
                   <span className="font-mono text-xs font-bold uppercase tracking-widest">Study_0{idx + 1}</span>
                   <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Artwork Modal */}
         <ArtworkModal
            isOpen={modalOpen}
            onClose={closeArtworkModal}
            imageSrc={modalImage || ""}
            alt={modalAlt}
            title={modalTitle}
            year={modalYear}
            writeup={modalWriteup}
            artworkId={modalArtworkId}
         /> 
    </main>
  );
}

export default ArtPage;