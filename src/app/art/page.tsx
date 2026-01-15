"use client";


import React, { useState, useEffect } from "react";
import Container from "@/app/_components/container";
import Image from "next/image";
import DomeGallery from "./DomeGallery";
import ArtworkModal from "@/app/_components/ArtworkModal";


function ArtPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalAlt, setModalAlt] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalYear, setModalYear] = useState<string>("");
  const [modalWriteup, setModalWriteup] = useState<string>("");
  const [galleryActive, setGalleryActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScrollToGallery = () => {
    window.scrollTo({
      top: window.innerHeight * 0.6,
      behavior: "smooth",
    });
  };

  const openArtworkModal = (src: string, title: string, year: string, writeup?: string) => {
    setModalImage(src);
    setModalTitle(title);
    setModalYear(year);
    setModalAlt(title); // Use title as alt for accessibility
    setModalWriteup(writeup || "");
    setModalOpen(true);
  };

  const closeArtworkModal = () => {
    setModalOpen(false);
    setModalImage(null);
    setModalAlt("");
    setModalTitle("");
    setModalYear("");
    setModalWriteup("");
  };

  return (
    <main className="min-h-screen bg-transparent text-gray-100 selection:bg-white selection:text-black relative overflow-hidden">
      {/* DomeGallery as seamless background for hero + interactive section */}
      <div className="absolute inset-0 w-full h-[150vh] md:h-[160vh] z-0">
        <DomeGallery isActive={galleryActive} setIsActive={setGalleryActive} />
      </div>

      {/* SECTION 1: HERO */}
      {/* Hide hero and label if gallery is active on mobile */}
      {!(galleryActive && isMobile) && (
        <>
          <section className="relative flex flex-col justify-end pb-12 md:pb-20 h-[60vh] z-10 pointer-events-none select-none">
            <Container>
              <div className="max-w-4xl">
                <h1 className="text-6xl md:text-9xl font-extrabold tracking-tighter text-white mb-8 pointer-events-auto select-auto drop-shadow-2xl">
                  Art
                </h1>
              </div>
            </Container>
          </section>
          {/* Interactive label, still overlaid */}
          <div className="absolute top-[60vh] left-6 z-20 pointer-events-none opacity-90 mix-overlay">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">[ An Interactive Gallery by Klense ]</span>
          </div>
        </>
      )}
      {/* Spacer for interactive gallery height, with scroll anchor */}
      <div className="gallery-scroll-anchor h-[85vh] md:h-[90vh] w-full" />
      {/* Lower scroll anchor for deeper scroll on enter */}
      {/* <div className="gallery-scroll-anchor-lower h-[60vh] w-full" /> */}



      {/* SECTION 4: VISUALIZING SOUND (Album/EP/Single Covers) */}
      <section className="py-32 relative z-10 bg-gradient-to-b from-transparent via-[#050505] to-[#050505]">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Visualizing My Sound</h2>
            <p className="text-gray-400 mt-4 md:mt-0 max-w-sm text-right">
              Album artwork and visualizers created for musical projects, including
              <span className="text-white font-medium"> Squealer and the Aggressors of Peace</span>.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: "/assets/music-assets/HalfThoughts1Cover.png", title: "Half Thoughts", year: "2023" },
              { src: "/assets/music-assets/SQUEALER AND THE AGGRESSORS OF PEACE Album Cover.jpeg", title: "Squealer and the Aggressors of Peace", year: "2024" },
              { src: "/assets/music-assets/Lazlo Album Cover (Final).jpeg", title: "Lazlo", year: "2022" },
              { src: "/assets/music-assets/Son Of Ink Album Cover.jpeg", title: "Son Of Ink", year: "2021" },
              { src: "/assets/music-assets/Some Of Ink EP Cover.png", title: "Some Of Ink (EP)", year: "2022" },
              { src: "/assets/music-assets/Squealer and the Aggressors of Peace (Live) Front Cover.jpeg", title: "Squealer and the Aggressors of Peace (Live)", year: "2025" },
              { src: "/assets/music-assets/ALLEGORY (FREESTYLE) Single Cover.jpeg", title: "ALLEGORY (FREESTYLE)", year: "2023" },
              { src: "/assets/music-assets/Eye Kan Single Cover.jpeg", title: "Eye Kan", year: "2023" },
              { src: "/assets/music-assets/First(Interlude) Single Cover.jpeg", title: "First (Interlude)", year: "2023" },
              { src: "/assets/music-assets/GoodbyeSongSingleCover.png", title: "Goodbye Song", year: "2023" }
            ].map(({ src, title, year }) => (
              <div
                key={src}
                className="aspect-square bg-gray-800 relative group overflow-hidden cursor-pointer rounded-sm border border-white/5"
                onClick={() => openArtworkModal(src, title, year)}
                tabIndex={0}
                role="button"
                aria-label="View Artwork"
              >
                <Image
                  src={src}
                  alt={title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white font-mono text-xs uppercase tracking-widest border border-white/30 px-4 py-2 hover:bg-white hover:text-black transition-colors">View Artwork</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>


      {/* SECTION 3: Editorial Pieces (moved below Visualizing Sound) */}
      <section className="py-32 relative z-10 bg-[#050505]">
        <Container>
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Editorial Pieces</h2>
            <p className="text-gray-400 text-lg">
              Beautiful stories for beautful artworks. Showcasing a selection of editorial pieces, created for various publications and platforms.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                folder: "hiqugraphs",
                file: "WhatsApp Image 2026-01-15 at 14.40.28 (1).jpeg",
                title: "The Amber Labyrinth",
                year: "2026",
                writeup: `This is the geometry of warmth. The camera dives into the center of the rose, finding a Fibonacci spiral bathed in the hues of a setting sun. It feels intimate, almost secretive, as if we are being invited into the flower’s private unfolding. The light here is soft and liquid, turning the petals into layers of spun silk and marmalade. It evokes the feeling of a long embrace... a gentle, endless turning inward where the outside world falls away, leaving only color, shadow, and the promise of a bloom that never quite ends.`
              },
              {
                folder: "hiqugraphs",
                file: "WhatsApp Image 2026-01-15 at 14.40.28 (2).jpeg",
                title: "The Weight of a Shilling",
                year: "2026",
                writeup: `There is a profound dignity in the overlooked artifacts of our daily lives. This monochromatic study of the Kenyan shilling elevates a simple unit of currency into a relic of identity. The harsh lighting catches every scratch and dent on the metal, mapping the thousands of hands this coin has passed through, as a tactile history of commerce and exchange. The giraffe, etched in relief, stands as a quiet guardian of the soil. It is a gritty, beautiful reminder that value is not just monetary; it is cultural, weighted by the passage of time and the friction of human touch.`
              },
              {
                folder: "batch-2",
                file: "image00001.jpeg",
                title: "The Velvet Inferno",
                year: "2026",
                writeup: `Nature rarely whispers; often, it commands. This image captures the hibiscus as a biological event; A sudden, velvet explosion. The macro perspective transforms the delicate petals into a landscape of deep, undulating ridges, guiding the eye inevitably toward the golden, dusty architecture of the stamen. It is a study in confidence and saturation, reminding us that beauty often possesses a fierce, almost intimidating vitality. This is life, blushing at its own intensity.`
              },
              {
                folder: "batch-2",
                file: "image00002.jpeg",
                title: "Reverie by the Water",
                year: "2026",
                writeup: `Through the lens of nostalgia, the present moment becomes a memory before it has even faded. This image, with its grainy texture and washed-out background, feels like a found photograph from a forgotten summer. The fiery orange of the Canna lilies stands in defiance against the dreamy, indistinct backdrop of water and architecture. It captures a fleeting stillness—that specific quietude of a humid afternoon where the air is thick, and the only clarity is the striking, resilient color of the garden standing guard over the haze.`
              }
            ].map((img, idx) => (
              <div
                key={img.file}
                className="aspect-square bg-gray-800 relative group overflow-hidden cursor-pointer rounded-sm border border-white/5"
                onClick={() => openArtworkModal(`/assets/art-assets/${img.folder}/${img.file}`, img.title, img.year, img.writeup)}
                tabIndex={0}
                role="button"
                aria-label="View Artwork"
              >
                <Image
                  src={`/assets/art-assets/${img.folder}/${img.file}`}
                  alt={img.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white font-mono text-xs uppercase tracking-widest border border-white/30 px-4 py-2 hover:bg-white hover:text-black transition-colors"
                    onClick={e => { e.stopPropagation(); openArtworkModal(`/assets/art-assets/${img.folder}/${img.file}`, img.title, img.year, img.writeup); }}>
                    View Artwork
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 5: SELECTED WORKS (Editorial Grid) */}
      <section className="py-32 relative z-10 bg-gradient-to-b from-transparent via-[#050505] to-[#050505]">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Selected Works: Flora</h2>
            <p className="text-gray-400 mt-4 md:mt-0 max-w-sm text-right">
              High-fidelity renders and digital compositions of the floral side of nature.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              // Mix of hiqugraphs and batch-2
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
              <div key={img.file} className={`group cursor-pointer${idx === 1 ? ' lg:mt-16' : ''}`}>
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-900 mb-4 rounded-sm">
                  <Image
                    src={`/assets/art-assets/${img.folder}/${img.file}`}
                    alt={`Art Piece ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* No caption or year below image */}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Artwork Modal for interactive high-res cover */}
      <ArtworkModal
        isOpen={modalOpen}
        onClose={closeArtworkModal}
        imageSrc={modalImage || ""}
        alt={modalAlt}
        title={modalTitle}
        year={modalYear}
        writeup={modalWriteup}
      /> 
    </main>
  );
}

export default ArtPage;
