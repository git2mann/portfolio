"use client";

import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./dome.module.css";

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
  "Amber Labyrinth",
  "Reverie by the Water",
  "Petal Geometry",
  "Sunlit Spiral",
  "Crimson Bloom",
  "Golden Hour Petals",
  "Verdant Dream",
  "Twilight Veil",
  "Opaline Whorl",
  "Saffron Embrace",
  "Cerulean Mist",
  "Radiant Core",
  "Velvet Cascade",
  "Eclipse in Bloom",
  "Luminous Fold",
  "Silent Harmony",
  "Gilded Edge",
  "Blushing Dawn",
  "Emerald Pulse",
  "Dusky Halo",
  "Ivory Tangle",
  "Frosted Veins",
  "Auburn Drift",
  "Celestial Petal",
  "Obsidian Heart",
  "Roseate Spiral",
  "Azure Whisper",
  "Sunset Mosaic",
  "Opal Bloom",
  "Shadowed Silk",
  "Gossamer Trace",
  "Violet Echo",
  "Coral Mirage",
  "Golden Spiral",
  "Indigo Veil",
  "Pearl Radiance",
  "Scarlet Thread",
  "Mosslight",
  "Citrine Veins",
  "Dewdrop Prism",
  "Sable Bloom",
  "Lush Reverie",
  "Orchid Veil",
  "Sunflare",
  "Petal Prism",
  "Twilight Bloom",
  "Aurora Spiral"
];

const ART_ASSETS = BATCH2_IMAGES.map((filename, idx) => ({
  src: `/assets/art-assets/batch-2/${filename}`,
  title: BATCH2_TITLES[idx] || `Untitled #${idx + 1}`,
  artist: undefined,
  description: undefined
}));

interface ArtItemData {
  id: number; src: string; title: string; artist?: string; description?: string;
}

interface DomeGalleryProps {
  isActive: boolean;
  setIsActive: (active: boolean) => void;
}

export default function DomeGallery({ isActive, setIsActive }: DomeGalleryProps) {
  // Show drag info on mobile after entering
  const [showMobileDragInfo, setShowMobileDragInfo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // -- PHYSICS & STATE --
  // Start with y: 180 to show the opposite side (fewer pictures)
  const physics = useRef({
    rotation: { x: 0, y: 180 },
    velocity: { x: 0, y: 0 },
    phase: 0,
    isActive: false,
    deltaBuffer: [] as {dx: number, dy: number}[],
  });

  const keysPressed = useRef(new Set<string>());
  const lastPointer = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false); // Track dragging state
  
  const [isMobileMode, setIsMobileMode] = useState(false);
  const isMobileRef = useRef(false); // Ref for loop access
  
  // isActive and setIsActive are now props
  const [selectedItem, setSelectedItem] = useState<ArtItemData | null>(null);
  
  const [, setTick] = useState(0);
  const requestRef = useRef<number>();
  const [radius, setRadius] = useState(1000); 

  // -- DETECT PLATFORM & RESIZE --
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

  // -- ACTIVATION LOGIC --
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

  // -- ANIMATION LOOP --
  const animate = useCallback(() => {
    if (selectedItem) {
        requestRef.current = requestAnimationFrame(animate);
        return;
    }

    physics.current.phase += 0.01;

    // Apply Momentum & Inputs
    if (physics.current.isActive) {
      
      // DESKTOP: Keyboard Acceleration
      if (!isMobileRef.current) {
        const k = keysPressed.current;
        const keyThrust = 0.3;
        if (k.has("ArrowUp") || k.has("w") || k.has("W")) physics.current.velocity.y += keyThrust;
        if (k.has("ArrowDown") || k.has("s") || k.has("S")) physics.current.velocity.y -= keyThrust;
        if (k.has("ArrowLeft") || k.has("a") || k.has("A")) physics.current.velocity.x += keyThrust;
        if (k.has("ArrowRight") || k.has("d") || k.has("D")) physics.current.velocity.x -= keyThrust;
      }
      
      // MOBILE: 
      // If dragging, we DO NOT apply velocity to rotation here.
      // Rotation is handled directly in handlePointerMove for 1:1 control.
      // We only apply friction/inertia when the user is NOT dragging.
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

    // Idle Rotation
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

  // -- INPUT HANDLERS --
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

  // --- TOUCH / MOUSE INTERACTION ---

  const handlePointerDown = (e: React.PointerEvent) => {
    if(selectedItem) return;
    containerRef.current?.focus();
    
    // Stop momentum immediately on touch (Catch the ball)
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
      // Smoothing: keep a buffer of last 3 deltas
      physics.current.deltaBuffer.push({dx: deltaX, dy: deltaY});
      if (physics.current.deltaBuffer.length > 3) physics.current.deltaBuffer.shift();
      const avg = physics.current.deltaBuffer.reduce((acc, d) => ({dx: acc.dx + d.dx, dy: acc.dy + d.dy}), {dx:0, dy:0});
      const count = physics.current.deltaBuffer.length;
      const smoothDX = avg.dx / count;
      const smoothDY = avg.dy / count;
      physics.current.rotation.y += smoothDX * sensitivity;
      physics.current.rotation.x += smoothDY * sensitivity;
      // More inertia for mobile
      physics.current.velocity.x = -(smoothDX * sensitivity * 0.7);
      physics.current.velocity.y = smoothDY * sensitivity * 0.7;
    } else {
      physics.current.rotation.y += deltaX * sensitivity;
      physics.current.rotation.x += deltaY * sensitivity;
      physics.current.velocity.x = -(deltaX * sensitivity);
      physics.current.velocity.y = deltaY * sensitivity;
    }
  };

  // -- RENDER HELPERS --
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
      const rand = Math.random();
      let scaleMultiplier = rand > 0.85 ? 1.6 : rand > 0.6 ? 1.2 : 0.6;
      return { 
          id: index, unitX: x, unitY: y, unitZ: z, 
          src: item.src, title: item.title, artist: item.artist, description: item.description,
          scaleMultiplier, randomSpeed: 0.5 + Math.random() * 0.5, randomPhase: Math.random() * Math.PI * 2 
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
  let containerClass = styles.container;
  if (isActive) containerClass += ` ${styles.active}`;
  if (isActive && isMobileMode) containerClass += ` ${styles.mobileOverlay}`;
  if (selectedItem) containerClass += ` ${styles.containerBlurred}`;

  return (
    <div 
      ref={containerRef} 
      className={containerClass} 
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}      // Critical for inertia
      onPointerLeave={handlePointerUp}   // Critical for inertia
      onPointerCancel={handlePointerUp}  // Critical for inertia
    >
      <div className={`${styles.galleryContent} ${selectedItem ? styles.blurred : ''}`}>
        <div className={styles.dome}>
          {baseItems.map((item) => {
            const actualX = item.unitX * radius;
            const actualY = item.unitY * radius;
            const actualZ = item.unitZ * radius;
            const pos = rotatePoint(actualX, actualY, actualZ, rotation.x, rotation.y);
            const pulse = Math.sin(phase * item.randomSpeed + item.randomPhase) * 0.08;
            const depthFactor = (pos.z + (radius * 2)) / (radius * 2); 
            const finalScale = item.scaleMultiplier * depthFactor * (1 + pulse);
            const opacity = Math.max(0.15, Math.min(1, (pos.z + radius) / radius));
            const blurRadius = isMobileMode ? 0 : Math.max(0, ( -pos.z - (radius * 0.1) ) / 150); 
            const filter = isMobileMode ? `brightness(${opacity})` : `blur(${blurRadius}px) brightness(${opacity})`;

            // Intense bokeh for all except selected when modal is open
            let cardClass = styles.cardWrapper;
            const isBokeh = selectedItem && item.id !== selectedItem.id;
            if (isBokeh) cardClass += ` ${styles.bokeh}`;
            const cardStyle = isBokeh
              ? { transform: `translate3d(${pos.x}px, ${pos.y}px, ${pos.z}px) scale(${finalScale})`, opacity, zIndex: Math.floor(pos.z) }
              : { transform: `translate3d(${pos.x}px, ${pos.y}px, ${pos.z}px) scale(${finalScale})`, filter, opacity, zIndex: Math.floor(pos.z) };
            return (
              <div
                key={item.id} className={cardClass}
                style={cardStyle}
                onPointerDown={(e) => {
                  if (!isMobileMode) e.stopPropagation();
                }}
                onClick={(e) => handleCardClick(e, item)}
              >
                <div className={styles.cardInner}>
                  <img src={item.src} alt={item.title} loading="lazy" />
                  <div className={styles.shine} />
                  <div className={styles.overlay} />
                  <div className={styles.label}><span>{item.title}</span></div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* INSTRUCTIONS */}
        {/* Show the enter button only if not active and not selected */}
        {!selectedItem && !isActive && (
          <div className={styles.instructions}>
            <div
              className={styles.instrContent}
              onClick={(e) => {
                e.stopPropagation();
                toggleActive();
              }}
              style={{ display: isActive ? 'none' : undefined }}
            >
              <span className={styles.icon}>✦</span>
              <span className={styles.desktopText}>Click to Enter Fullscreen</span>
              <span className={styles.mobileText}>Tap to Explore</span>
            </div>
          </div>
        )}
        {!selectedItem && isActive && !isMobileMode && (
          <div className={styles.instructions}>
            <div className={styles.instrContent} onClick={(e) => { e.stopPropagation(); toggleActive(); }}>
              Use Arrows to Move • Click to Exit
            </div>
          </div>
        )}
        {/* Mobile: Exit button and drag info */}
        {!selectedItem && isActive && isMobileMode && (
          <>
            <div className={styles.instructions}>
              <div
                className={styles.instrContent}
                onClick={(e) => { e.stopPropagation(); toggleActive(); }}
                style={{ display: isActive ? undefined : 'none' }}
              >
                <span className={styles.icon}>✦</span>
                <span className={styles.mobileText}>Exit</span>
              </div>
            </div>
            {showMobileDragInfo && (
              <div className={styles.instructions} style={{ top: '38%', left: '50%', transform: 'translate(-50%, 0)', bottom: 'auto', pointerEvents: 'none' }}>
                <div className={styles.instrContent} style={{ pointerEvents: 'none', opacity: 0.5, fontSize: '1.05em', cursor: 'default' }}>
                  <span className={styles.mobileText}>Drag to move around the space</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className={styles.detailModal}
            onClick={handleCloseModal}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <motion.div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 40 }}
              transition={{ duration: 0.36, ease: [0.4, 0, 0.2, 1] }}
            >
              <button className={styles.closeModalBtn} onClick={handleCloseModal}>×</button>
              <motion.div className={styles.modalImageWrapper} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <img src={selectedItem.src} alt={selectedItem.title} className={styles.modalImage} />
              </motion.div>
              <div className={styles.modalDetails}>
                <motion.h2 className={styles.modalTitle} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>{selectedItem.title}</motion.h2>
                <motion.h3 className={styles.modalArtist} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>{selectedItem.artist}</motion.h3>
                <motion.div className={styles.modalDivider} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3 }} />
                <motion.p className={styles.modalDescription} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>{selectedItem.description}</motion.p>
              </div>
            </motion.div>
            {/* Art and label under modal (hidden when modal is open) */}
            {/* (Removed as per user request) */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}