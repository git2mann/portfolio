"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ClearRefractiveCoverProps {
  src: string;
  alt?: string;
  size?: number;
  priority?: boolean;
}

/**
 * ClearRefractiveCover - Smooth 3D tilt album cover with ambient glow.
 * Built with native Framer Motion physics to prevent Firefox layer culling and blank screen issues.
 */
export default function ClearRefractiveCover({
  src,
  alt = "Cover",
  size = 380,
  priority = true,
}: ClearRefractiveCoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    const xPct = clientX / rect.width - 0.5;
    const yPct = clientY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative group select-none w-full max-w-[380px] sm:max-w-[400px] mx-auto lg:mx-0">
      {/* Ambient background glow */}
      <div className="absolute inset-4 bg-accent-blue/15 blur-[60px] rounded-full animate-pulse opacity-40 group-hover:opacity-80 transition-opacity duration-1000 pointer-events-none" />

      {/* 3D Tilt Container */}
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full relative z-10 cursor-pointer"
        style={{ perspective: 1000 }}
      >
        <motion.div
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            transformStyle: "preserve-3d",
            transition: isHovered ? "none" : "transform 0.5s ease-out",
          }}
          className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 90vw, 400px"
            className="object-cover block"
            priority={priority}
            unoptimized
          />
        </motion.div>
      </div>
    </div>
  );
}
