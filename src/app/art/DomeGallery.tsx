"use client";

import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./dome.module.css";
import { Maximize2, X, Move, MousePointer2 } from "lucide-react";

// Use all images from public/assets/art-assets/batch-2
const BATCH2_IMAGES = [
  "image00001.jpeg","image00002.jpeg","image00003.jpeg","image00004.jpeg","image00005.jpeg",
  "image00006.jpeg","image00007.jpeg","image00008.jpeg","image00009.jpeg","image00010.jpeg",
  "image00011.jpeg","image00012.jpeg","image00013.jpeg","image00014.jpeg","image00015.jpeg",
  "image00016.jpeg","image00017.jpeg","image00018.jpeg","image00019.jpeg","image00020.jpeg",
  "image00021.jpeg","image00022.jpeg","image00023.jpeg","image00024.jpeg","image00025.jpeg",
  "image00026.jpeg","image00027.jpeg","image00028.jpeg","image00029.jpeg","image00030.jpeg",
  "image00031.jpeg","image00032.jpeg","image00033.jpeg","image00034.jpeg","image00035.jpeg",
  "image00036.jpeg","image00037.jpeg","image00038.jpeg","image00039.jpeg","image00040.jpeg",
  "image00041.jpeg","image00042.jpeg","image00043.jpeg","image00044.jpeg","image00045.jpeg","image00046.jpeg"
];

const BATCH2_TITLES = [
  "Amber Labyrinth", "Reverie by the Water", "Petal Geometry", "Sunlit Spiral", "Crimson Bloom",
  "Golden Hour Petals", "Verdant Dream", "Twilight Veil", "Opaline Whorl", "Saffron Embrace",
  "Cerulean Mist", "Radiant Core", "Velvet Cascade", "Eclipse in Bloom", "Luminous Fold",
  "Silent Harmony", "Gilded Edge", "Blushing Dawn", "Emerald Pulse", "Dusky Halo",
  "Ivory Tangle", "Frosted Veins", "Auburn Drift", "Celestial Petal", "Obsidian Heart",
  "Roseate Spiral", "Azure Whisper", "Sunset Mosaic", "Opal Bloom", "Shadowed Silk",
  "Gossamer Trace", "Violet Echo", "Coral Mirage", "Golden Spiral", "Indigo Veil",
  "Pearl Radiance", "Scarlet Thread", "Mosslight", "Citrine Veins", "Dewdrop Prism",
  "Sable Bloom", "Lush Reverie", "Orchid Veil", "Sunflare", "Petal Prism",
  "Twilight Bloom", "Aurora Spiral"
];

const ART_ASSETS = BATCH2_IMAGES.map((filename, idx) => ({
  src: `/assets/art-assets/batch-2/${filename}`,
  title: BATCH2_TITLES[idx] || `Untitled #${idx + 1}`,
  artist: "Klense",
  description: "Visual Research / 2026"
}));

interface ArtItemData {
  id: number; src: string; title: string; artist?: string; description?: string;
}

interface DomeGalleryProps {
  isActive: boolean;
  setIsActive: (active: boolean) => void;
}

export default function DomeGallery({ isActive, setIsActive }: DomeGalleryProps) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => { setHasMounted(true); }, []);
  
  const [showMobileDragInfo, setShowMobileDragInfo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const physics = useRef({
    rotation: { x: 0, y: 180 },
    velocity: { x: 0, y: 0 },
    phase: 0,
    isActive: false,
    deltaBuffer: [] as {dx: number, dy: number}[],
  });

  const keysPressed = useRef(new Set<string>());
  const lastPointer = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  
  const [isMobileMode, setIsMobileMode] = useState(false);
  const isMobileRef = useRef(false);
  
  const [selectedItem, setSelectedItem] = useState<ArtItemData | null>(null);
  const [, setTick] = useState(0);
  const requestRef = useRef<number>();
  const [radius, setRadius] = useState(1000); 

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileMode(mobile);
      isMobileRef.current = mobile; 
      setRadius(mobile ? 550 : 1100);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleActive = () => {
    if (selectedItem) { handleCloseModal(); return; }
    const nextState = !isActive;
    setIsActive(nextState);
    physics.current.isActive = nextState;

    if (nextState) {
      if (isMobileMode) {
        document.body.style.overflow = 'hidden';
        setShowMobileDragInfo(true);
        setTimeout(() => setShowMobileDragInfo(false), 3500);
      }
      else if (containerRef.current?.requestFullscreen) containerRef.current.requestFullscreen().catch(() => {});
      setTimeout(() => containerRef.current?.focus(), 50);
    } else {
      if (isMobileMode) document.body.style.overflow = '';
      else if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    }
  };

  useEffect(() => {
    const handleNativeExit = () => {
      if (!document.fullscreenElement && !isMobileMode) {
        setIsActive(false); physics.current.isActive = false; setSelectedItem(null);
      }
    };
    document.addEventListener("fullscreenchange", handleNativeExit);
    return () => document.removeEventListener("fullscreenchange", handleNativeExit);
  }, [isMobileMode, setIsActive]);

  const handleCardClick = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    setSelectedItem(item);
    physics.current.isActive = false; 
  };

  const handleCloseModal = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedItem(null);
    if (isActive) physics.current.isActive = true;
  };

  const animate = useCallback(() => {
    if (selectedItem) {
        requestRef.current = requestAnimationFrame(animate);
        return;
    }

    physics.current.phase += 0.01;

    if (physics.current.isActive) {
      if (!isMobileRef.current) {
        const k = keysPressed.current;
        const keyThrust = 0.3;
        if (k.has("ArrowUp") || k.has("w") || k.has("W")) physics.current.velocity.y += keyThrust;
        if (k.has("ArrowDown") || k.has("s") || k.has("S")) physics.current.velocity.y -= keyThrust;
        if (k.has("ArrowLeft") || k.has("a") || k.has("A")) physics.current.velocity.x += keyThrust;
        if (k.has("ArrowRight") || k.has("d") || k.has("D")) physics.current.velocity.x -= keyThrust;
      }
    }

    if (!isDragging.current) {
      physics.current.rotation.x += physics.current.velocity.y;
      physics.current.rotation.y -= physics.current.velocity.x;
      if (isMobileMode) {
        physics.current.velocity.x *= 0.94;
        physics.current.velocity.y *= 0.94;
      } else {
        physics.current.velocity.x *= 0.92;
        physics.current.velocity.y *= 0.92;
      }
    }

    if (!physics.current.isActive && Math.abs(physics.current.velocity.x) < 0.05) {
        physics.current.rotation.y -= 0.03; 
    }

    setTick(prev => prev + 1);
    requestRef.current = requestAnimationFrame(animate);
  }, [selectedItem]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [animate]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedItem && e.key === "Escape") { handleCloseModal(); return; }
    if (physics.current.isActive && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) e.preventDefault();
    keysPressed.current.add(e.key);
  };
  
  const handleKeyUp = (e: KeyboardEvent) => { keysPressed.current.delete(e.key); };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [selectedItem, isActive]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if(selectedItem) return;
    containerRef.current?.focus();
    physics.current.velocity = { x: 0, y: 0 };
    isDragging.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!physics.current.isActive || selectedItem) return;
    if (!isMobileMode && e.pointerType === 'mouse') return;
    if (!isDragging.current) return;

    const deltaX = e.clientX - lastPointer.current.x;
    const deltaY = e.clientY - lastPointer.current.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    const sensitivity = isMobileMode ? 0.28 : 0.06;

    if (isMobileMode) {
      physics.current.deltaBuffer.push({dx: deltaX, dy: deltaY});
      if (physics.current.deltaBuffer.length > 3) physics.current.deltaBuffer.shift();
      const avg = physics.current.deltaBuffer.reduce((acc, d) => ({dx: acc.dx + d.dx, dy: acc.dy + d.dy}), {dx:0, dy:0});
      const count = physics.current.deltaBuffer.length;
      const smoothDX = avg.dx / count;
      const smoothDY = avg.dy / count;
      physics.current.rotation.y += smoothDX * sensitivity;
      physics.current.rotation.x += smoothDY * sensitivity;
      physics.current.velocity.x = -(smoothDX * sensitivity * 0.7);
      physics.current.velocity.y = smoothDY * sensitivity * 0.7;
    } else {
      physics.current.rotation.y += deltaX * sensitivity;
      physics.current.rotation.x += deltaY * sensitivity;
      physics.current.velocity.x = -(deltaX * sensitivity);
      physics.current.velocity.y = deltaY * sensitivity;
    }
  };

  const randomValuesRef = useRef<{ scaleMultiplier: number; randomSpeed: number; randomPhase: number }[]>([]);
  useEffect(() => {
    const rows = isMobileMode ? 7 : 12;
    const cols = isMobileMode ? 10 : 14;
    const totalItems = rows * cols;
    if (randomValuesRef.current.length !== totalItems) {
      randomValuesRef.current = Array.from({ length: totalItems }).map(() => {
        const rand = Math.random();
        let scaleMultiplier = rand > 0.85 ? 1.6 : rand > 0.6 ? 1.2 : 0.6;
        return {
          scaleMultiplier,
          randomSpeed: 0.5 + Math.random() * 0.5,
          randomPhase: Math.random() * Math.PI * 2,
        };
      });
    }
  }, [isMobileMode]);

  const baseItems = useMemo(() => {
    const rows = isMobileMode ? 7 : 12;
    const cols = isMobileMode ? 10 : 14;
    const totalItems = rows * cols;
    return Array.from({ length: totalItems }).map((_, index) => {
      const row = Math.floor(index / cols); const col = index % cols;
      const phi = (row - (rows - 1) / 2) * 0.22;
      const theta = (col - (cols - 1) / 2) * 0.25 + (row % 2) * 0.125;
      const x = Math.sin(theta) * Math.cos(phi);
      const y = Math.sin(phi);
      const z = Math.cos(theta) * Math.cos(phi);
      const item = ART_ASSETS[index % ART_ASSETS.length];
      const randoms = randomValuesRef.current[index] || { scaleMultiplier: 1, randomSpeed: 1, randomPhase: 0 };
      return {
        id: index, unitX: x, unitY: y, unitZ: z,
        src: item.src, title: item.title, artist: item.artist, description: item.description,
        scaleMultiplier: randoms.scaleMultiplier,
        randomSpeed: randoms.randomSpeed,
        randomPhase: randoms.randomPhase,
      };
    });
  }, [isMobileMode]);

  const rotatePoint = (x: number, y: number, z: number, rX: number, rY: number) => {
    const radX = (rX * Math.PI) / 180; const radY = (rY * Math.PI) / 180;
    const sinX = Math.sin(radX); const cosX = Math.cos(radX);
    const sinY = Math.sin(radY); const cosY = Math.cos(radY);
    const y1 = y * cosX - z * sinX; const z1 = y * sinX + z * cosX; const x1 = x;
    const x2 = x1 * cosY - z1 * sinY; const z2 = x1 * sinY + z1 * cosY;
    return { x: x2, y: y1, z: z2 };
  };

  const { rotation, phase } = physics.current;
  let containerClass = styles.container + (isActive ? " cursor-none" : "");

  if (!hasMounted) return null;

  return (
    <div
      ref={containerRef}
      className={containerClass}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* 3D SCENE CONTAINER */}
      <div className={`w-full h-full absolute inset-0 perspective-[1200px] preserve-3d ${selectedItem ? 'blur-sm brightness-50 transition-all duration-500' : 'transition-all duration-500'}`}>
        <div className="w-full h-full absolute transform-style-3d flex items-center justify-center">
          {baseItems.map((item) => {
            const actualX = item.unitX * radius;
            const actualY = item.unitY * radius;
            const actualZ = item.unitZ * radius;
            const pos = rotatePoint(actualX, actualY, actualZ, rotation.x, rotation.y);
            
            // Calculate scale and visibility
            const pulse = Math.sin(phase * item.randomSpeed + item.randomPhase) * 0.08;
            const depthFactor = (pos.z + (radius * 2)) / (radius * 2); 
            const finalScale = item.scaleMultiplier * depthFactor * (1 + pulse);
            
            // Simpler visibility logic for Bauhaus crispness
            const opacity = Math.max(0, Math.min(1, (pos.z + radius) / (radius * 1.2)));
            const isVisible = opacity > 0.1;

            if (!isVisible) return null;

            return (
              <div
                key={item.id}
                className="absolute transform-3d will-change-transform cursor-pointer group"
                style={{ 
                  transform: `translate3d(${pos.x}px, ${pos.y}px, ${pos.z}px) scale(${finalScale})`,
                  zIndex: Math.floor(pos.z)
                }}
                onPointerDown={(e) => { if (!isMobileMode) e.stopPropagation(); }}
                onClick={(e) => handleCardClick(e, item)}
              >
                {/* THE CARD: Hard edges, borders, no soft shadows */}
                <div className="relative bg-white border-2 border-white overflow-hidden transition-colors duration-200 group-hover:border-[#FF3B30] w-[120px] h-[160px] md:w-[200px] md:h-[260px]">
                  <img 
                    src={item.src} 
                    alt={item.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    loading="lazy" 
                  />
                  
                  {/* Hover Overlay Title */}
                  <div className="absolute inset-0 bg-[#FF3B30]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-2 text-center">
                    <span className="font-mono text-[10px] uppercase font-bold text-black bg-white px-1">
                      {item.title}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* --- HUD / CONTROLS (Bauhaus Style) --- */}
      
      {/* Center "Reticle" Prompt */}
      {!selectedItem && !isActive && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
          <div 
            className="flex flex-col items-center gap-4 pointer-events-auto cursor-pointer group"
            onClick={(e) => { e.stopPropagation(); toggleActive(); }}
          >
            {/* Geometric Button */}
            <div className="w-24 h-24 border-4 border-white bg-black/50 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#FF3B30] group-hover:border-black transition-colors duration-300">
               <Maximize2 className="w-10 h-10 text-white group-hover:text-black" />
            </div>
            
            <div className="bg-black text-white border-2 border-white px-4 py-2 font-mono text-xs uppercase tracking-widest group-hover:bg-white group-hover:text-black group-hover:border-black transition-colors">
               {isMobileMode ? "Tap to Enter" : "Enter Gallery"}
            </div>
          </div>
        </div>
      )}

      {/* Active State Controls */}
      {!selectedItem && isActive && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex gap-4 pointer-events-none">
           <div 
              className="bg-white border-2 border-black px-6 py-3 pointer-events-auto cursor-pointer hover:bg-[#FF3B30] hover:text-white transition-colors flex items-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              onClick={(e) => { e.stopPropagation(); toggleActive(); }}
           >
              <X className="w-4 h-4" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest">Exit View</span>
           </div>
           
           {!isMobileMode && (
             <div className="bg-black text-white px-6 py-3 border-2 border-white font-mono text-xs uppercase tracking-widest flex items-center gap-3 opacity-80">
                <Move className="w-4 h-4" /> Drag / Keys to Navigate
             </div>
           )}
        </div>
      )}

      {/* Mobile Drag Hint */}
      {isActive && isMobileMode && showMobileDragInfo && (
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2B4592] text-white px-6 py-4 border-2 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] font-mono text-xs font-bold uppercase text-center animate-in fade-in zoom-in duration-300 z-50 pointer-events-none">
            Drag to Rotate<br/>Axis
         </div>
      )}

      {/* MODAL (Bauhaus Detail View) */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-md"
            onClick={handleCloseModal}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="relative w-full max-w-5xl bg-[#F4F3EF] border-4 border-black shadow-[16px_16px_0px_0px_rgba(255,255,255,0.2)] overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              
              {/* Close Button */}
              <button 
                className="absolute top-0 right-0 z-20 w-16 h-16 bg-[#FF3B30] text-white flex items-center justify-center hover:bg-black transition-colors"
                onClick={handleCloseModal}
              >
                <X className="w-8 h-8" />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-2/3 bg-black flex items-center justify-center relative overflow-hidden border-b-4 md:border-b-0 md:border-r-4 border-black group">
                 {/* Checkerboard Pattern */}
                 <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                 
                 <img 
                    src={selectedItem.src} 
                    alt={selectedItem.title} 
                    className="max-h-full max-w-full object-contain shadow-2xl"
                 />
              </div>

              {/* Info Section */}
              <div className="w-full md:w-1/3 p-8 flex flex-col justify-between bg-white">
                 <div>
                    <div className="mb-6 border-b-2 border-black pb-4">
                       <span className="bg-black text-white px-2 py-1 font-mono text-[10px] uppercase tracking-widest mb-2 inline-block">
                          Figure {selectedItem.id.toString().padStart(3, '0')}
                       </span>
                       <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter">
                          {selectedItem.title}
                       </h2>
                    </div>
                    
                    <div className="space-y-4">
                       <div>
                          <h3 className="font-mono text-xs uppercase text-gray-500 mb-1">Artist</h3>
                          <p className="font-bold text-lg">{selectedItem.artist || "Klense"}</p>
                       </div>
                       <div>
                          <h3 className="font-mono text-xs uppercase text-gray-500 mb-1">Context</h3>
                          <p className="font-medium text-sm leading-relaxed border-l-2 border-[#2B4592] pl-3">
                             {selectedItem.description || "No data available."}
                          </p>
                       </div>
                    </div>
                 </div>

                 {/* Decorative Footer in Modal */}
                 <div className="mt-8 pt-8 border-t-4 border-black flex gap-2">
                    <div className="w-8 h-8 bg-[#FF3B30] rounded-full border-2 border-black"></div>
                    <div className="w-8 h-8 bg-[#2B4592] border-2 border-black"></div>
                    <div className="w-8 h-8 bg-[#F4B400] rotate-45 border-2 border-black"></div>
                 </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}