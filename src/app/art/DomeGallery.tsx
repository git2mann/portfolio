"use client";

import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./dome.module.css";
import { Maximize2, X, Move, Info, Search, Cpu, Activity, ArrowRight, ArrowLeft, Disc, Zap } from "lucide-react";

// --- ART ASSETS DATA ---
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

const BATCH2_IMAGES = [
  "image00001.jpeg","image00002.jpeg","image00003.jpeg","image00004.jpeg","image00005.jpeg",
  "image00006.jpeg","image00007.jpeg","image00008.jpeg","image00009.jpeg","image00010.jpeg",
];

const DOME_ASSETS = [
  ...HIQU_IMAGES.map(item => ({ ...item, artist: "Leon Nduati", description: "Abstract high-fidelity visual graph investigating the intersection of light and logic." })),
  ...BATCH2_IMAGES.map((filename, idx) => ({
    src: `/assets/art-assets/batch-2/${filename}`,
    title: `Structural Study #${String(idx + 1).padStart(2, '0')}`,
    year: "2024",
    category: "Studies",
    artist: "Leon Nduati",
    description: "Visual logic extraction. High-fidelity rendering of organic structures and geometric anomalies."
  }))
];

interface ArtItemData {
  id: number; src: string; title: string; year: string; category: string; artist?: string; description?: string; unitX: number; unitY: number; unitZ: number;
}

interface DomeGalleryProps {
  isActive: boolean;
  setIsActive: (active: boolean) => void;
}

export default function DomeGallery({ isActive, setIsActive }: DomeGalleryProps) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => { setHasMounted(true); }, []);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  const physics = useRef({
    rotation: { x: 0, y: 0 },
    velocity: { x: 0, y: 0.1 },
    phase: 0,
  });

  const keysPressed = useRef(new Set<string>());
  const lastPointer = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  
  const [isMobileMode, setIsMobileMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ArtItemData | null>(null);
  const [isGuided, setIsGuided] = useState(true); 
  const [guidedIndex, setGuidedIndex] = useState(0);
  const targetRotation = useRef({ x: 0, y: 0 });
  const isTransitioning = useRef(false);
  const [radius, setRadius] = useState(1200); 
  const [, setTick] = useState(0);
  const requestRef = useRef<number>();

  useEffect(() => {
    if (isGuided) {
        physics.current.velocity = { x: 0, y: 0 };
    }
  }, [isGuided]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileMode(mobile);
      setRadius(mobile ? 700 : 1300);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const baseItems = useMemo(() => {
    const totalItems = DOME_ASSETS.length;
    const phi_step = Math.PI * (3 - Math.sqrt(5)); 
    
    const items = Array.from({ length: totalItems }).map((_, index) => {
      const y = 1 - (index / (totalItems - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi_step * index;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      const item = DOME_ASSETS[index];
      
      return {
        id: index, unitX: x, unitY: y, unitZ: z,
        ...item,
        scaleMultiplier: 1.0,
        randomSpeed: 0.5 + (index % 3) * 0.1,
        randomPhase: index * 0.5,
      };
    });

    const farSequence: any[] = [];
    const used = new Set<number>();
    let currentIdx = 0;
    farSequence.push(items[0]);
    used.add(0);

    while (farSequence.length < items.length) {
        let bestNext = -1;
        let maxDist = -1;
        const current = items[currentIdx];
        for (let i = 0; i < items.length; i++) {
            if (used.has(i)) continue;
            const next = items[i];
            const dist = Math.sqrt(
                Math.pow(current.unitX - next.unitX, 2) +
                Math.pow(current.unitY - next.unitY, 2) +
                Math.pow(current.unitZ - next.unitZ, 2)
            );
            if (dist > maxDist) { maxDist = dist; bestNext = i; }
        }
        if (bestNext !== -1) {
            farSequence.push(items[bestNext]);
            used.add(bestNext);
            currentIdx = bestNext;
        } else break;
    }
    return farSequence;
  }, []);

  const rotatePoint = (x: number, y: number, z: number, rX: number, rY: number) => {
    const radX = (rX * Math.PI) / 180; const radY = (rY * Math.PI) / 180;
    const sinX = Math.sin(radX); const cosX = Math.cos(radX);
    const sinY = Math.sin(radY); const cosY = Math.cos(radY);
    const y1 = y * cosX - z * sinX; const z1 = y * sinX + z * cosX; const x1 = x;
    const x2 = x1 * cosY - z1 * sinY; const z2 = x1 * sinY + z1 * cosY;
    return { x: x2, y: y1, z: z2 };
  };

  const calculateTargetRotation = useCallback((item: any) => {
    const radX = Math.atan2(item.unitY, item.unitZ);
    const degX = (radX * 180) / Math.PI;
    const z1 = item.unitY * Math.sin(radX) + item.unitZ * Math.cos(radX);
    const radY = Math.atan2(item.unitX, z1);
    const degY = (radY * 180) / Math.PI;
    return { x: degX, y: degY }; 
  }, []);

  useEffect(() => {
    if (isGuided && baseItems[guidedIndex]) {
        targetRotation.current = calculateTargetRotation(baseItems[guidedIndex]);
        isTransitioning.current = true;
    }
  }, [isGuided, guidedIndex, baseItems, calculateTargetRotation]);

  const handleCardClick = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    setSelectedItem(item);
    window.dispatchEvent(new CustomEvent('global-blur-toggle', { detail: true }));
  };

  const handleCloseModal = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedItem(null);
    window.dispatchEvent(new CustomEvent('global-blur-toggle', { detail: false }));
  };

  const nextGuided = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setGuidedIndex(prev => (prev + 1) % baseItems.length);
  };

  const prevGuided = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setGuidedIndex(prev => (prev - 1 + baseItems.length) % baseItems.length);
  };

  const animate = useCallback(() => {
    if (selectedItem) {
        requestRef.current = requestAnimationFrame(animate);
        return;
    }

    physics.current.phase += 0.005;

    if (isActive && !isGuided) {
        const k = keysPressed.current;
        const thrust = 0.15;
        if (k.has("arrowup") || k.has("w")) physics.current.velocity.y += thrust;
        if (k.has("arrowdown") || k.has("s")) physics.current.velocity.y -= thrust;
        if (k.has("arrowleft") || k.has("a")) physics.current.velocity.x += thrust;
        if (k.has("arrowright") || k.has("d")) physics.current.velocity.x -= thrust;
    }

    if (isGuided && isTransitioning.current) {
        const lerp = 0.08; 
        let diffX = targetRotation.current.x - physics.current.rotation.x;
        while (diffX > 180) diffX -= 360;
        while (diffX < -180) diffX += 360;
        let diffY = targetRotation.current.y - physics.current.rotation.y;
        while (diffY > 180) diffY -= 360;
        while (diffY < -180) diffY += 360;
        physics.current.rotation.x += diffX * lerp;
        physics.current.rotation.y += diffY * lerp;
        if (Math.abs(diffY) < 0.01 && Math.abs(diffX) < 0.01) {
            physics.current.rotation.x = targetRotation.current.x;
            physics.current.rotation.y = targetRotation.current.y;
            isTransitioning.current = false;
        }
    } else if (!isDragging.current) {
      physics.current.rotation.x += physics.current.velocity.y;
      physics.current.rotation.y -= physics.current.velocity.x;
      physics.current.velocity.x *= 0.96;
      physics.current.velocity.y *= 0.96;
      if (isActive && !isGuided && Math.abs(physics.current.velocity.x) < 0.01) {
          physics.current.rotation.y -= 0.04;
      }
    }

    setTick(prev => prev + 1);
    requestRef.current = requestAnimationFrame(animate);
  }, [selectedItem, isActive, isGuided]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [animate]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedItem && e.key === "Escape") { handleCloseModal(); return; }
    if (e.key === "ArrowRight" && isGuided) nextGuided();
    if (e.key === "ArrowLeft" && isGuided) prevGuided();
    keysPressed.current.add(e.key.toLowerCase());
  };
  
  const handleKeyUp = (e: KeyboardEvent) => { keysPressed.current.delete(e.key.toLowerCase()); };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [selectedItem, isActive, isGuided, guidedIndex]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if(selectedItem) return;
    containerRef.current?.focus();
    physics.current.velocity = { x: 0, y: 0 };
    isDragging.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isActive || selectedItem || isGuided) return;
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastPointer.current.x;
    const deltaY = e.clientY - lastPointer.current.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    const sensitivity = isMobileMode ? 0.35 : 0.08;
    physics.current.rotation.y += deltaX * sensitivity;
    physics.current.rotation.x += deltaY * sensitivity;
    physics.current.velocity.x = -(deltaX * sensitivity * 0.3);
    physics.current.velocity.y = deltaY * sensitivity * 0.3;
  };

  const currentGuidedItem = baseItems[guidedIndex];

  if (!hasMounted) return null;

  return (
    <div
      ref={containerRef}
      className={styles.container}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={() => { isDragging.current = false; }}
      onPointerLeave={() => { isDragging.current = false; }}
    >
      {/* 1. ATMOSPHERIC BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.1] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)' }}></div>
        <div className="absolute inset-0 bg-radial-gradient from-accent-blue/10 via-transparent to-transparent blur-[150px]"></div>
      </div>

      {/* DUAL-COLUMN LAYOUT */}
      <div className="relative w-full h-full flex flex-col md:flex-row overflow-hidden z-10">
        
        {/* TOP/RIGHT COLUMN: 3D SCENE (Z-10) */}
        <div 
          className={`relative w-full h-[55%] md:flex-1 md:h-full z-0 md:z-10 perspective-[2000px] preserve-3d transition-all duration-1000 ${selectedItem ? 'scale-[1.1] grayscale-[0.5] opacity-20' : ''}`}
        >
          <div className="w-full h-full absolute inset-0 transform-style-3d flex items-center justify-center pointer-events-none">
            {baseItems.map((item, idx) => {
              const actualX = item.unitX * radius;
              const actualY = item.unitY * radius;
              const actualZ = item.unitZ * radius;
              const pos = rotatePoint(actualX, actualY, actualZ, physics.current.rotation.x, physics.current.rotation.y);
              const isFocused = isGuided && guidedIndex === idx;
              const pulse = Math.sin(physics.current.phase * item.randomSpeed + item.randomPhase) * 0.05;
              const finalScale = item.scaleMultiplier * (1 + pulse) * (isFocused ? 2.4 : 1);
              const opacity = isFocused ? 1 : Math.max(0, Math.min(0.5, (pos.z + radius) / (radius * 2)));
              const isVisible = isFocused || (opacity > 0.01 && pos.z > -radius * 0.98);
              if (!isVisible) return null;
              return (
                <div
                  key={item.id}
                  className={`${styles.cardWrapper} ${isFocused ? 'shadow-[0_30px_100px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.05)] scale-[1.02]' : ''}`}
                  style={{ 
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    borderRadius: '1rem',
                    transform: `translate3d(${pos.x}px, ${pos.y}px, ${pos.z}px) scale(${finalScale})`,
                    zIndex: isFocused ? 10000 : Math.floor(pos.z + radius),
                    opacity: opacity,
                    filter: isGuided && !isFocused ? 'blur(12px)' : 'none'
                  }}
                  onClick={(e) => handleCardClick(e, item)}
                >
                  <div className={`${styles.cardInner} ${isFocused ? 'border-white/20' : 'border-white/5'}`} style={{ borderRadius: '1rem', borderWidth: isFocused ? '1px' : '0px' }}>
                    <img src={item.src} alt={item.title} loading="lazy" className={isFocused ? 'opacity-100' : ''} />
                    {!isGuided && (
                      <div className={styles.label}>
                          <span>{item.title}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM/LEFT COLUMN: DESCRIPTION (Z-50) */}
        <div className="relative w-full h-[45%] md:w-[45%] md:h-full flex flex-col justify-start md:justify-center px-6 md:px-20 z-50 pointer-events-none pb-12 md:pb-0">
           <AnimatePresence mode="wait">
             {isGuided && currentGuidedItem && !selectedItem && (
               <motion.div 
                 key={guidedIndex}
                 initial={{ opacity: 0, x: -30 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -30 }}
                 transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                 className="flex flex-col gap-3 md:gap-6 max-w-md pointer-events-auto"
               >
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-px bg-accent-blue/40" />
                     <span className="font-mono text-[10px] uppercase tracking-[0.6em] text-accent-blue animate-pulse">Artifact Sequence {guidedIndex + 1}/{baseItems.length}</span>
                  </div>
                  
                  <div className="space-y-1 md:space-y-2">
                     <h2 className="text-3xl md:text-7xl font-light uppercase tracking-tighter leading-none text-primary">
                        {currentGuidedItem.title}
                     </h2>
                     <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-secondary opacity-60">
                        <span>{currentGuidedItem.artist}</span>
                        <span className="w-1 h-1 rounded-full bg-accent-blue/40" />
                        <span>{currentGuidedItem.year}</span>
                     </div>
                  </div>

                  <div className="bg-primary/5 backdrop-blur-md border border-primary/10 p-4 md:p-8 rounded-[1.5rem] md:rounded-[2rem] relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-1 h-full bg-accent-blue/30" />
                     <p className="text-[11px] md:text-lg text-secondary font-light leading-relaxed">
                        {currentGuidedItem.description}
                     </p>
                     <div className="mt-3 md:mt-6 flex items-center gap-6 opacity-40">
                        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest">
                           <Disc size={12} className="animate-spin-slow" />
                           <span>Rotation_Lock</span>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest">
                           <Zap size={12} />
                           <span>Fetch_Mode_Active</span>
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center gap-4">
                     <button onClick={prevGuided} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-primary/10 flex items-center justify-center text-primary hover:bg-primary/5 transition-all">
                       <ArrowLeft size={18} />
                     </button>
                     <button onClick={nextGuided} className="flex-1 h-10 md:h-12 rounded-full bg-primary text-background-primary flex items-center justify-between px-6 font-mono text-[10px] uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-[0.98] transition-all">
                       <span>Fetch Next Artifact</span>
                       <ArrowRight size={16} />
                     </button>
                  </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>

      {/* HUD CONTROLS (FULL SCREEN OVERLAY) */}
      {isActive && !selectedItem && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-700">
           <div className="liquid-glass-clear p-1.5 rounded-full flex items-center shadow-2xl border border-primary/10 bg-background-primary/40 backdrop-blur-xl">
              <button 
                onClick={() => setIsGuided(true)} 
                className={`flex items-center gap-3 px-6 py-2.5 rounded-full font-mono text-[10px] uppercase tracking-[0.4em] transition-all ${isGuided ? 'bg-accent-blue text-white shadow-lg scale-105' : 'text-primary opacity-40 hover:opacity-100'}`}
              >
                 <Activity size={14} />
                 <span>Guided Tour</span>
              </button>
              <button 
                onClick={() => setIsGuided(false)} 
                className={`flex items-center gap-3 px-6 py-2.5 rounded-full font-mono text-[10px] uppercase tracking-[0.4em] transition-all ${!isGuided ? 'bg-primary text-background-primary shadow-lg scale-105' : 'text-primary opacity-40 hover:opacity-100'}`}
              >
                 <Move size={14} />
                 <span>Free Roam</span>
              </button>
           </div>
        </div>
      )}

      {/* DETAIL VIEW MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <div className={styles.detailModal} onClick={handleCloseModal}>
            <motion.div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <button className={styles.closeModalBtn} onClick={handleCloseModal}><X size={24} /></button>
              
              <div className={styles.modalImageWrapper}>
                <img src={selectedItem.src} alt={selectedItem.title} className={styles.modalImage} />
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--text-primary) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
              </div>

              <div className={styles.modalDetails}>
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-10 h-px bg-accent-blue/30" />
                   <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-accent-blue">{selectedItem.category}</span>
                </div>
                <h2 className={styles.modalTitle}>{selectedItem.title}</h2>
                <div className={styles.modalArtist}>{selectedItem.artist || "Leon Nduati"} // {selectedItem.year}</div>
                <div className={styles.modalDivider} />
                <p className={styles.modalDescription}>{selectedItem.description}</p>
                
                <div className="mt-auto pt-10 border-t border-primary/5 flex flex-col gap-4">
                   <div className="flex justify-between items-center font-mono text-[9px] uppercase tracking-[0.4em] opacity-30 text-primary">
                      <span className="flex items-center gap-2"><Cpu size={10} /> Sync_Stable</span>
                      <span className="text-accent-blue">v4.0</span>
                   </div>
                   <div className="w-full h-0.5 bg-primary/5 rounded-full overflow-hidden">
                      <div className="w-[94.2%] h-full bg-accent-blue animate-pulse"></div>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
