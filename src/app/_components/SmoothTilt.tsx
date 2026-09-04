"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface SmoothTiltProps {
  children: React.ReactNode;
  className?: string;
  maxAngle?: number;
}

/**
 * SmoothTilt - Fluid, performant 3D tilt component powered by Framer Motion springs.
 * Works seamlessly across Chrome, Firefox, and Safari without layer dropping or flickering.
 */
export default function SmoothTilt({
  children,
  className = "",
  maxAngle = 8,
}: SmoothTiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [maxAngle, -maxAngle]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-maxAngle, maxAngle]);

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
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
          transition: isHovered ? "none" : "transform 0.4s ease-out",
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
