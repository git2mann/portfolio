"use client";

import React from "react";
import { motion } from "framer-motion";

interface RefractiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  active?: boolean;
  showShadow?: boolean;
}

/**
 * RefractiveButton - Implements the high-fidelity Houdini Liquid Glass button effect
 */
export const RefractiveButton = ({ 
  children, 
  onClick, 
  className = "",
  active = false,
  showShadow = true
}: RefractiveButtonProps) => {
  return (
    <div className={`liquid-glass-wrap ${className}`}>
      <button 
        onClick={onClick}
        className={`
          relative px-6 py-3 rounded-full liquid-glass transition-all duration-500
          ${active ? 'bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]' : ''}
        `}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </button>
      {showShadow && <div className="liquid-glass-shadow"></div>}
    </div>
  );
};
