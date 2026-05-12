"use client";

import { motion } from "framer-motion";

export default function BiNgoLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_20px_50px_rgba(34,197,94,0.3)]"
      >
        <defs>
          <linearGradient id="bingo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="15" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Main Badge Shape */}
        <motion.rect
          x="20"
          y="20"
          width="360"
          height="360"
          rx="80"
          fill="url(#bingo-grad)"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        />

        {/* The Speech Bubble (Negative Space / White) */}
        <motion.path
          d="M100 120C100 108.954 108.954 100 120 100H280C291.046 100 300 108.954 300 120V240C300 251.046 291.046 260 280 260H160L100 300V120Z"
          fill="white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        />

        {/* The Upward Arrow (Trajectory) */}
        <motion.path
          d="M200 140V220M200 140L170 170M200 140L230 170"
          stroke="#22c55e"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
        />

        {/* The Forward Button (Rapid Execution) */}
        <motion.path
          d="M240 180L270 200L240 220V180Z"
          fill="#eab308"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        />
        
        {/* Subtle Decorative Grid Lines */}
        <line x1="20" y1="200" x2="380" y2="200" stroke="white" strokeOpacity="0.1" strokeDasharray="4 4" />
        <line x1="200" y1="20" x2="200" y2="380" stroke="white" strokeOpacity="0.1" strokeDasharray="4 4" />
      </svg>
    </div>
  );
}
