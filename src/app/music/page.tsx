'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../_components/music-enhancements.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Container from "@/app/_components/container";
import { albums, eps, singles as originalSingles } from "@/data/music";
import { FiArrowRight, FiArrowLeft, FiDisc, FiMusic, FiPlay, FiCpu, FiGlobe, FiActivity, FiBarChart2 } from 'react-icons/fi';

// --- UTILS ---
function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}

const ForwardedClientSlider = dynamic(() => import('../_components/ForwardedClientSlider'), { ssr: false });

// Mock data extension for live albums
const liveAlbums = [
  {
    id: "live-1",
    title: "Squealer and the Aggressors of Peace (Live)",
    coverImage: "/assets/music-assets/Squealer and the Aggressors of Peace (Live) Front Cover.jpeg",
    releaseYear: "2025",
    description: "The electrifying live album from Klense. Raw energy, improvisation, and crowd connection.",
    link: "/music/sataop-live",
    tracks: 12, 
    duration: "1h 14m"
  },
];

// Logic to move 'Goodbye Song'
const singles = (() => {
  if (!originalSingles || !Array.isArray(originalSingles)) return [];
  const idx = originalSingles.findIndex(s => s.title && s.title.toLowerCase().includes('goodbye song'));
  if (idx > 0) {
    const arr = [...originalSingles];
    const [goodbye] = arr.splice(idx, 1);
    arr.unshift(goodbye);
    return arr;
  }
  return originalSingles;
})();

// --- BAUHAUS COMPONENTS ---

function ManualNavButton({ children, onClick, label }: { children: React.ReactNode, onClick: () => void, label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white border-2 border-black text-black hover:bg-[#FF3B30] hover:text-white transition-all duration-0 ease-linear active:translate-y-1 active:translate-x-1 active:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
    >
      {children}
    </button>
  );
}

// 2. The Enhanced Bauhaus Card
function BauhausCard({ 
  id, 
  title, 
  image, 
  year, 
  type, 
  link,
  meta1, // e.g. "5 Tracks"
  meta2, // e.g. "22 Min"
  onHover,
  onLeave
}: { 
  id: string, title: string, image: string, year: string, type: string, link: string, meta1?: string, meta2?: string, onHover?: () => void, onLeave?: () => void 
}) {
  return (
    <Link
      href={link}
      className="group block h-full p-2"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="relative h-full bg-[#F4F3EF] border-2 border-black transition-transform duration-200 ease-linear group-hover:-translate-y-2 group-hover:-translate-x-2 shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col">
        
        {/* Technical Header */}
        <div className="flex justify-between items-center px-3 py-2 border-b-2 border-black bg-white">
            <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500">
              {type}-{(id || '00').toString().padStart(3, '0')}
            </span>
            <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-[#FF3B30] border border-black"></div>
                <div className="w-2 h-2 rounded-full bg-[#2B4592] border border-black"></div>
            </div>
        </div>

        {/* Image */}
        <div className="relative aspect-square w-full border-b-2 border-black overflow-hidden bg-black group">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:grayscale"
            onError={(e) => {
               e.currentTarget.src = `https://placehold.co/400x400/F4F3EF/000000?text=${title}`;
            }}
          />
          {/* Scanline Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
             <div className="w-16 h-16 bg-[#FF3B30] flex items-center justify-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <FiPlay className="text-white w-8 h-8 ml-1" />
             </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 flex-grow flex flex-col justify-between bg-white relative">
           {/* Folded Corner Effect */}
           <div className="absolute top-0 right-0 w-0 h-0 border-l-[24px] border-l-transparent border-t-[24px] border-t-black group-hover:border-t-[#2B4592] transition-colors"></div>
           
           <div>
             <h3 className="text-xl md:text-2xl font-black uppercase leading-[0.9] tracking-tighter mb-2 text-black line-clamp-2">
               {title}
             </h3>
             <p className="font-mono text-xs text-gray-500 mb-4">// {year}</p>
           </div>
           
           {/* Data Badges */}
           <div className="mt-4 pt-4 border-t-2 border-dashed border-black/20 flex justify-between items-end">
              <div className="flex gap-2 font-mono text-[10px] font-bold uppercase">
                 {meta1 && <span className="bg-black text-white px-1 py-0.5">{meta1}</span>}
                 {meta2 && <span className="border border-black px-1 py-0.5">{meta2}</span>}
              </div>
              <FiArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 text-[#FF3B30] transition-transform duration-300" />
           </div>
        </div>
      </div>
    </Link>
  );
}

// 3. Featured Release Component (The "Latest Transmission")
function LatestReleaseDisplay() {
  // Assuming the first album is the latest for this example
  const latest = albums[0]; 
  
  if (!latest) return null;

  return (
    <div className="w-full border-4 border-black bg-[#F4F3EF] relative mb-24 overflow-hidden group">
        {/* Background Stripes */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[repeating-linear-gradient(45deg,#000,#000_2px,#F4F3EF_2px,#F4F3EF_10px)] opacity-5 pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row">
            {/* Visualizer Side */}
            <div className="lg:w-1/2 border-b-4 lg:border-b-0 lg:border-r-4 border-black relative min-h-[400px] bg-black group-hover:bg-[#1a1a1a] transition-colors">
                <Image
                    src={latest.coverImage}
                    alt={latest.title}
                    fill
                    className="object-cover opacity-60 mix-blend-luminosity group-hover:opacity-40 transition-opacity duration-500"
                />
                
                {/* CSS Audio Visualizer */}
                <div className="absolute bottom-0 left-0 w-full h-32 flex items-end justify-center gap-1 px-8 pb-8 mix-blend-screen">
                    {[...Array(20)].map((_, i) => (
                        <div 
                            key={i} 
                            className="w-full bg-[#FF3B30] animate-[bounce_1s_infinite]" 
                            style={{ 
                                height: `${Math.random() * 80 + 20}%`,
                                animationDuration: `${Math.random() * 0.5 + 0.5}s`,
                                animationDelay: `${Math.random() * 0.5}s`
                            }}
                        ></div>
                    ))}
                </div>

                <div className="absolute top-6 left-6 bg-[#FF3B30] text-white px-3 py-1 text-sm font-black uppercase tracking-widest border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                    Latest Transmission
                </div>
            </div>

            {/* Info Side */}
            <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center relative bg-white">
                <div className="font-mono text-xs text-[#2B4592] font-bold tracking-widest mb-4 flex items-center gap-2">
                    <FiActivity className="animate-pulse" />
                    SYSTEM_UPDATE // {latest.releaseYear}
                </div>
                <h2 className="text-5xl lg:text-7xl font-black uppercase leading-[0.85] tracking-tighter mb-6 text-black">
                    {latest.title}
                </h2>
                <p className="text-lg font-medium leading-relaxed border-l-4 border-black pl-6 mb-8 max-w-md text-black">
                    {latest.description}
                </p>
                <div className="flex flex-wrap gap-4">
                    <Link href={`/music/${latest.id}`} className="bg-black text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-[#FF3B30] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all border-2 border-transparent">
                        Initiate Playback
                    </Link>
                    <button className="px-8 py-4 font-bold uppercase tracking-widest border-2 border-black text-black hover:bg-black hover:text-white transition-colors">
                        View Data
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}


export default function MusicPage() {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('discography');
  const tabsRef = useRef<HTMLDivElement>(null);

  const albumSliderRef = useRef<any>(null);
  const epsSliderRef = useRef<any>(null);
  const singlesSliderRef = useRef<any>(null);
  const liveAlbumsSliderRef = useRef<any>(null);

  // Center active tab on mobile click with smooth scroll
  const scrollToTab = (tabId: string) => {
    setActiveTab(tabId);
    if (tabsRef.current) {
        const btn = document.getElementById(`tab-${tabId}`);
        if (btn) {
            btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }
  };

  return (
    <main className="min-h-screen bg-[#EAE8E3] text-black selection:bg-[#FF3B30] selection:text-white">
      
      {/* 1. HERO SECTION (Kinetic Blueprint) */}
      <div className="relative w-full border-b-4 border-black bg-[#F4F3EF] overflow-hidden">
        {/* BACKGROUND TEXTURE: Technical Graph Paper */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ 
               backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
               backgroundSize: '40px 40px'
             }}>
        </div>
        {/* ARTIST IMAGE BACKGROUND */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <Image
            src="/assets/music-assets/music-adjacents/Klense%20Artist%20Image.jpeg"
            alt="Klense Artist Background"
            fill
            className="object-cover object-center scale-105 opacity-40"
            priority
          />
        </div>
        <div className="relative w-full h-8 border-b-2 border-black bg-black text-[#F4F3EF] flex items-center overflow-hidden">
           <div className="animate-marquee whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.3em] flex items-center gap-12">
              <span>// SYSTEM: ONLINE</span><span>// ARTIST: KLENSE</span><span>// FREQUENCY: 20HZ - 20KHZ</span>
              <span>// SYSTEM: ONLINE</span><span>// ARTIST: KLENSE</span><span>// FREQUENCY: 20HZ - 20KHZ</span>
           </div>
        </div>
        <div className="relative z-10 w-full max-w-[1920px] mx-auto min-h-[50vh] flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 p-6 md:p-12 lg:p-16 flex flex-col justify-center border-r-0 md:border-r-4 border-black relative">
             <h1 className="text-[15vw] md:text-[11vw] font-black leading-[0.8] tracking-tighter uppercase mb-4 mix-blend-multiply text-black">
               Klen<br/>se
             </h1>
             <div className="flex flex-col md:flex-row gap-4 md:items-center">
                <span className="bg-black text-white px-4 py-2 text-xl font-bold uppercase tracking-widest inline-block transform -skew-x-12 shadow-[4px_4px_0px_0px_#2B4592]">Audio_Works</span>
             </div>
          </div>
          <div className="w-full md:w-1/3 bg-[#2B4592] relative overflow-hidden border-t-4 md:border-t-0 border-black flex flex-col justify-center items-center p-12">
             <div className="relative z-10 w-48 h-48 bg-[#F4F3EF] border-[6px] border-black rounded-full flex items-center justify-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-spin-slow">
                <div className="w-4 h-4 bg-black rounded-full"></div>
                <div className="absolute top-0 left-1/2 w-1 h-1/2 bg-black origin-bottom transform -translate-x-1/2"></div>
             </div>
          </div>
        </div>
      </div>

      {/* 2. OPTIMIZED TAB VIEWER: THE SWITCHBOARD */}
      <div className="sticky top-16 z-40 bg-[#EAE8E3] border-b-4 border-black shadow-xl">
        <div className="max-w-7xl mx-auto relative">
          
          {/* Gradient masks for scroll indication on Mobile */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#EAE8E3] to-transparent z-10 pointer-events-none lg:hidden"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#EAE8E3] to-transparent z-10 pointer-events-none lg:hidden"></div>

          <nav 
            ref={tabsRef}
            className="flex overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory"
          >
            {['discography', 'featured', 'shows', 'videos', 'production'].map((tab, idx) => (
              <button
                key={tab}
                id={`tab-${tab}`}
                onClick={() => scrollToTab(tab)}
                className={`
                  snap-center flex-shrink-0 px-6 md:px-10 py-4 md:py-5 text-xs md:text-sm font-black uppercase tracking-[0.2em] border-r-2 border-black transition-all duration-200 relative
                  ${idx === 0 ? 'border-l-2' : ''}
                  ${activeTab === tab 
                    ? 'bg-black text-white' 
                    : 'bg-white text-black hover:bg-[#FF3B30] hover:text-white'
                  }
                `}
              >
                {/* Active Indicator Light */}
                {activeTab === tab && (
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#00FF00] rounded-full shadow-[0_0_5px_#00FF00] animate-pulse"></div>
                )}
                {tab}
              </button>
            ))}
            {/* Filler space to ensure last item can be centered on mobile */}
            <div className="flex-shrink-0 w-4 md:hidden"></div>
          </nav>
        </div>
      </div>

      <Container>
        <div className="mt-12 pb-32 space-y-24">
          
          {/* --- STATS DASHBOARD (Visible only on Discography) --- */}
          {activeTab === 'discography' && (
             <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 border-b-4 border-black pb-12">
                {[
                    { label: "Total Albums", val: albums.length.toString().padStart(2, '0') },
                    { label: "EP Count", val: eps.length.toString().padStart(2, '0') },
                    { label: "Singles", val: singles.length.toString().padStart(2, '0') },
                    { label: "Live Sets", val: liveAlbums.length.toString().padStart(2, '0') }
                ].map((stat, i) => (
                    <div key={i} className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow">
                        <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-3xl font-black">{stat.val}</p>
                    </div>
                ))}
             </div>
          )}

          {activeTab === 'discography' && (
            <>
              {/* --- FEATURED RELEASE --- */}
              <LatestReleaseDisplay />

              {/* --- ALBUMS SECTION --- */}
              <section>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b-2 border-black pb-4 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                       <div className="w-3 h-3 bg-[#FF3B30]"></div>
                       <span className="font-mono text-xs uppercase text-gray-500">Archive 01</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">LP Archive</h2>
                  </div>
                  
                  {albums.length > 1 && !isMobile && (
                    <div className="flex gap-3">
                      <ManualNavButton onClick={() => albumSliderRef.current?.slickPrev()} label="Prev">
                          <FiArrowLeft className="w-5 h-5" />
                      </ManualNavButton>
                      <ManualNavButton onClick={() => albumSliderRef.current?.slickNext()} label="Next">
                          <FiArrowRight className="w-5 h-5" />
                      </ManualNavButton>
                    </div>
                  )}
                </div>

                {albums.length > 1 ? (
                  isMobile ? (
                    <div className="flex flex-col gap-8">
                      {albums.map((album, i) => (
                        <BauhausCard 
                          key={album.id} 
                          id={album.id} 
                          title={album.title} 
                          image={album.coverImage} 
                          year={album.releaseYear} 
                          type="LP"
                          link={`/music/${album.id}`}
                          meta1={`${8 + (i % 4)} Tracks`} // Simulated Data
                          meta2="42 Min"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="-mx-2">
                      <ForwardedClientSlider
                        ref={albumSliderRef}
                        dots={false}
                        infinite={albums.length > 3}
                        speed={0} 
                        slidesToShow={Math.min(3, albums.length)}
                        slidesToScroll={1}
                        className="bauhaus-slider"
                        responsive={[
                          { breakpoint: 1024, settings: { slidesToShow: 2 } },
                          { breakpoint: 640, settings: { slidesToShow: 1 } },
                        ]}
                        arrows={false}
                      >
                        {albums.map((album, i) => (
                          <div key={album.id} className="h-full">
                            <BauhausCard 
                              id={album.id} 
                              title={album.title} 
                              image={album.coverImage} 
                              year={album.releaseYear} 
                              type="LP"
                              link={`/music/${album.id}`}
                              meta1={`${8 + (i % 4)} Tracks`}
                              meta2="42 Min"
                            />
                          </div>
                        ))}
                      </ForwardedClientSlider>
                    </div>
                  )
                ) : (
                   <div className="max-w-md">
                      <BauhausCard 
                          id={albums[0].id} 
                          title={albums[0].title} 
                          image={albums[0].coverImage} 
                          year={albums[0].releaseYear} 
                          type="LP"
                          link={`/music/${albums[0].id}`}
                          meta1="12 Tracks"
                          meta2="45 Min"
                        />
                   </div>
                )}
              </section>

              {/* --- EPs SECTION --- */}
              <section>
                 <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b-2 border-black pb-4 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                       <div className="w-3 h-3 bg-[#2B4592]"></div>
                       <span className="font-mono text-xs uppercase text-gray-500">Archive 02</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Extended Plays</h2>
                  </div>
                  
                  {eps.length > 1 && !isMobile && (
                    <div className="flex gap-3">
                      <ManualNavButton onClick={() => epsSliderRef.current?.slickPrev()} label="Prev">
                          <FiArrowLeft className="w-5 h-5" />
                      </ManualNavButton>
                      <ManualNavButton onClick={() => epsSliderRef.current?.slickNext()} label="Next">
                          <FiArrowRight className="w-5 h-5" />
                      </ManualNavButton>
                    </div>
                  )}
                </div>

                <div className="-mx-2">
                    {eps.length > 1 && !isMobile ? (
                       <ForwardedClientSlider
                          ref={epsSliderRef}
                          dots={false}
                          speed={0}
                          slidesToShow={Math.min(3, eps.length)}
                          slidesToScroll={1}
                          arrows={false}
                       >
                          {eps.map((ep, i) => (
                             <div key={ep.id} className="h-full">
                                <BauhausCard 
                                  id={ep.id} 
                                  title={ep.title} 
                                  image={ep.coverImage} 
                                  year={ep.releaseYear} 
                                  type="EP"
                                  link={`/music/eps/${ep.id}`}
                                  meta1={`${4 + (i % 2)} Tracks`}
                                  meta2="18 Min"
                                />
                             </div>
                          ))}
                       </ForwardedClientSlider>
                    ) : (
                       <div className={isMobile ? "flex flex-col gap-8" : "max-w-md"}>
                          {eps.map((ep, i) => (
                             <BauhausCard 
                                key={ep.id}
                                id={ep.id} 
                                title={ep.title} 
                                image={ep.coverImage} 
                                year={ep.releaseYear} 
                                type="EP"
                                link={`/music/eps/${ep.id}`}
                                meta1={`${4 + (i % 2)} Tracks`}
                                meta2="18 Min"
                             />
                          ))}
                       </div>
                    )}
                </div>
              </section>

              {/* --- SINGLES SECTION --- */}
              <section>
                 <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b-2 border-black pb-4 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                       <div className="w-3 h-3 bg-[#F4B400]"></div>
                       <span className="font-mono text-xs uppercase text-gray-500">Archive 03</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Singles</h2>
                  </div>
                  
                  {singles.length > 1 && !isMobile && (
                    <div className="flex gap-3">
                      <ManualNavButton onClick={() => singlesSliderRef.current?.slickPrev()} label="Prev">
                          <FiArrowLeft className="w-5 h-5" />
                      </ManualNavButton>
                      <ManualNavButton onClick={() => singlesSliderRef.current?.slickNext()} label="Next">
                          <FiArrowRight className="w-5 h-5" />
                      </ManualNavButton>
                    </div>
                  )}
                </div>
                
                 <div className="-mx-2">
                    {singles.length > 1 && !isMobile ? (
                       <ForwardedClientSlider
                          ref={singlesSliderRef}
                          dots={false}
                          speed={0}
                          slidesToShow={Math.min(3, singles.length)}
                          slidesToScroll={1}
                          arrows={false}
                       >
                          {singles.map((single) => (
                             <div key={single.id} className="h-full">
                                <BauhausCard 
                                  id={single.id} 
                                  title={single.title} 
                                  image={single.coverImage} 
                                  year={single.releaseYear} 
                                  type="SGL"
                                  link={`/music/singles/${single.id}`}
                                  meta1="Single"
                                  meta2={single.duration}
                                />
                             </div>
                          ))}
                       </ForwardedClientSlider>
                    ) : (
                       <div className={isMobile ? "flex flex-col gap-8" : "max-w-md"}>
                          {singles.map((single) => (
                             <BauhausCard 
                                key={single.id}
                                id={single.id} 
                                title={single.title} 
                                image={single.coverImage} 
                                year={single.releaseYear} 
                                type="SGL"
                                link={`/music/singles/${single.id}`}
                                meta1="Single"
                                meta2={single.duration}
                             />
                          ))}
                       </div>
                    )}
                </div>
              </section>

               {/* --- LIVE ALBUMS --- */}
              <section>
                 <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b-2 border-black pb-4 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                       <div className="w-3 h-3 bg-black"></div>
                       <span className="font-mono text-xs uppercase text-gray-500">Archive 04</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Live Sets</h2>
                  </div>
                </div>

                 <div className="max-w-md">
                     <BauhausCard 
                        id={liveAlbums[0].id} 
                        title={liveAlbums[0].title} 
                        image={liveAlbums[0].coverImage} 
                        year={liveAlbums[0].releaseYear} 
                        type="LIVE"
                        link={liveAlbums[0].link}
                        meta1="12 Tracks"
                        meta2="1h 14m"
                      />
                 </div>
              </section>

            </>
          )}

          {activeTab !== 'discography' && (
            <div className="flex flex-col items-center justify-center h-96 border-4 border-dashed border-black bg-white p-8 text-center">
               <div className="w-20 h-20 bg-[#F4B400] rounded-full mb-6 border-4 border-black animate-[bounce_1s_infinite] flex items-center justify-center">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
               </div>
              <h3 className="text-3xl md:text-5xl font-black uppercase mb-4 tracking-tight">Work In Progress</h3>
              <div className="bg-black text-white px-4 py-2 font-mono text-xs uppercase tracking-widest inline-block">
                Sector: {activeTab} // Status: Pending
              </div>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}