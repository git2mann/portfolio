'use client';

import Container from "@/app/_components/container";
import Image from "next/image";
import Link from "next/link";
import { FaSpotify, FaApple, FaYoutube, FaTicketAlt, FaCalendarAlt, FaMicrophoneAlt } from "react-icons/fa";
import { useState } from "react";
// Add this import for global styles
import "@/app/globals.css";

// --- Animated Effects: Flowers & Hummingbirds ---

// Replace SVG flowers with PNG images
function Flower({
  className = "",
  style = {},
  variant = 1,
}: {
  className?: string;
  style?: React.CSSProperties;
  variant?: number;
}) {
  let src = "/assets/music-assets/music-adjacents/FlowersOne.png";
  if (variant === 2) src = "/assets/music-assets/music-adjacents/FlowersTwo.png";
  else if (variant === 3) src = "/assets/music-assets/music-adjacents/FlowersThree.png";
  else if (variant === 4) src = "/assets/music-assets/music-adjacents/FlowersFour.png";
  return (
    <Image
      src={src}
      alt={`Flower ${variant}`}
      width={40}
      height={40}
      className={className}
      style={style}
      draggable={false}
      priority
    />
  );
}

// Replace SVG hummingbirds with PNG images
function Hummingbird({ className = "", style = {}, variant = 1 }: { className?: string; style?: React.CSSProperties; variant?: number }) {
  const src =
    variant === 2
      ? "/assets/music-assets/music-adjacents/HummingbirdTwo.png.png"
      : "/assets/music-assets/music-adjacents/HummingbirdOne.png";
  return (
    <Image
      src={src}
      alt={`Hummingbird ${variant}`}
      width={48}
      height={36}
      className={className}
      style={style}
      draggable={false}
      priority
    />
  );
}

function AnimatedFloaters() {
  // Add more hummingbirds with varied positions and variants
  const floaters = [
    { type: "flower", variant: 4, className: "floater-flower", style: { left: "10%", top: "18%" }, delay: 0.87 },
    { type: "hummingbird", variant: 1, className: "floater-hummingbird", style: { left: "80%", top: "22%" }, delay: 0.23 },
    { type: "flower", variant: 1, className: "floater-flower", style: { left: "70%", top: "80%" }, delay: 1.22 },
    { type: "hummingbird", variant: 2, className: "floater-hummingbird", style: { left: "50%", top: "8%" }, delay: 0.76 },
    { type: "flower", variant: 3, className: "floater-flower", style: { left: "90%", top: "60%" }, delay: 0.86 },
    // More hummingbirds
    { type: "hummingbird", variant: 1, className: "floater-hummingbird", style: { left: "15%", top: "70%" }, delay: 1.5 },
    { type: "hummingbird", variant: 2, className: "floater-hummingbird", style: { left: "60%", top: "40%" }, delay: 2.1 },
    { type: "hummingbird", variant: 1, className: "floater-hummingbird", style: { left: "35%", top: "55%" }, delay: 1.9 },
    { type: "hummingbird", variant: 2, className: "floater-hummingbird", style: { left: "75%", top: "75%" }, delay: 2.5 },
    { type: "hummingbird", variant: 1, className: "floater-hummingbird", style: { left: "25%", top: "35%" }, delay: 1.3 },
    // More flowers with different variants
    { type: "flower", variant: 2, className: "floater-flower", style: { left: "30%", top: "25%" }, delay: 1.1 },
    { type: "flower", variant: 1, className: "floater-flower", style: { left: "60%", top: "10%" }, delay: 1.6 },
    { type: "flower", variant: 4, className: "floater-flower", style: { left: "80%", top: "60%" }, delay: 2.2 },
    { type: "flower", variant: 3, className: "floater-flower", style: { left: "20%", top: "80%" }, delay: 2.5 },
  ];
  return (
    <>
      {floaters.map((floater, i) => (
        <span
          key={i}
          className={`animated-floater ${floater.className}`}
          style={{
            ...floater.style,
            animationDelay: `${floater.delay}s`,
          }}
          aria-hidden="true"
        >
          {floater.type === "flower" && <Flower variant={floater.variant} />}
          {floater.type === "hummingbird" && <Hummingbird variant={floater.variant} />}
        </span>
      ))}
    </>
  );
}

// --- End Animated Effects ---

const LIVE_RELEASE_DATE = "2025-08-15";
const LIVE_YEAR = "2025";
const COVER_IMAGE = "/assets/music-assets/Squealer and the Aggressors of Peace (Live) Front Cover.jpeg";
const HERO_BG = "/assets/music-assets/Squealer and the Aggressors of Peace (Live) Front Cover.jpeg";

const TRACKLIST = [
  "Hummer's Theme",
  "Jungle Law",
  "Tisa",
  "Salamander Crowd",
  "Saudade In Err (Outro)",
];

// Move AnimatedHeading to top-level (outside SataopLivePage)
function AnimatedHeading() {
  const headingTop = "SQUEALER";
  const headingTop2 = "AND THE";
  const headingBottom = "AGGRESSORS";
  const headingBottom2 = "OF PEACE";
  const live = "LIVE";
  return (
    <div
      className="animated-heading font-extrabold tracking-wide mb-3 drop-shadow-lg gradient-text-glow flex flex-col items-center select-none"
      style={{
        fontSize: "clamp(2rem, 7vw, 3.5rem)",
        letterSpacing: "0.12em",
        lineHeight: 1.1,
        position: "relative",
      }}
      aria-label="Squealer and the Aggressors of Peace LIVE"
    >
      {/* Remove heading shine */}
      {/* <span className="heading-shine" aria-hidden="true" /> */}
      <div className="flex justify-center gap-1">
        {headingTop.split("").map((char, i) =>
          char === " " ? (
            <span className="inline-block w-2 xs:w-3 md:w-5" key={i} />
          ) : (
            <span
              className="inline-block animated-letter heading-shine-letter heading-top"
              style={{ animationDelay: `${i * 0.06 + 0.1}s` }}
              key={i}
            >
              {char}
            </span>
          )
        )}
      </div>
      {/* HeadingTop2 styling */}
      <div className="flex justify-center gap-1">
        {headingTop2.split("").map((char, i) =>
          char === " " ? (
            <span className="inline-block w-2 xs:w-3 md:w-5" key={i} />
          ) : (
            <span
              className="inline-block animated-letter heading-shine-letter heading-top2"
              style={{ animationDelay: `${(i + headingTop.length) * 0.06 + 0.1}s` }}
              key={i}
            >
              {char}
            </span>
          )
        )}
      </div>
      <div className="flex justify-center gap-1">
        {headingBottom.split("").map((char, i) =>
          char === " " ? (
            <span className="inline-block w-2 xs:w-3 md:w-5" key={i} />
          ) : (
            <span
              className="inline-block animated-letter heading-shine-letter heading-bottom"
              style={{ animationDelay: `${(i + headingTop.length + headingTop2.length) * 0.06 + 0.1}s` }}
              key={i}
            >
              {char}
            </span>
          )
        )}
      </div>
      <div className="flex justify-center gap-1 items-center">
        {headingBottom2.split("").map((char, i) =>
          char === " " ? (
            <span className="inline-block w-2 xs:w-3 md:w-5" key={i} />
          ) : (
            <span
              className="inline-block animated-letter heading-shine-letter heading-bottom2"
              style={{ animationDelay: `${(i + headingTop.length + headingTop2.length + headingBottom.length) * 0.06 + 0.1}s` }}
              key={i}
            >
              {char}
            </span>
          )
        )}
        {/* LIVE text with pulsing red recording light, adjust dot position to align with text */}
        <span
          className="inline-block animated-letter special-year ml-2 live-pulse"
          style={{
            animationDelay: `${(headingTop.length + headingTop2.length + headingBottom.length + headingBottom2.length) * 0.06 + 0.2}s`,
            position: "relative"
          }}
        >
          {live}
          <span className="live-dot" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

// Add a 3D rotating vinyl sleeve for the album cover, matching Half Thoughts

function VinylSleeve3D({
  className = "",
  size = 340,
}: {
  className?: string;
  size?: number;
}) {
  // Use CSS variable for background so it matches the selected theme
  const vinylMiddleStyle = { background: "var(--vinyl-middle-gradient)" };
  return (
    <div
      className={`vinyl-sleeve ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Multiple middle layers for actual thickness, themed via CSS variable */}
      <div className="vinyl-middle" style={vinylMiddleStyle} />
      <div className="vinyl-middle-1" style={vinylMiddleStyle} />
      <div className="vinyl-middle-2" style={vinylMiddleStyle} />
      <div className="vinyl-middle-3" style={vinylMiddleStyle} />
      <div className="vinyl-middle-4" style={vinylMiddleStyle} />
      <div className="vinyl-middle-5" style={vinylMiddleStyle} />
      <div className="vinyl-middle-6" style={vinylMiddleStyle} />
      {/* Front cover */}
      <div className="vinyl-cover">
        <Image
          src={COVER_IMAGE}
          alt="Squealer and the Aggressors of Peace (Live) Cover"
          width={size}
          height={size}
          className="object-cover w-full h-full"
          style={{
            borderRadius: "1rem",
          }}
          sizes={`(max-width: 768px) 100vw, (max-width: 1200px) ${size}px, ${size}px`}
          priority
        />
      </div>
      {/* Back cover: use the correct back cover image */}
      <div className="vinyl-back-cover">
        <Image
          src="/assets/music-assets/Squealer and the Aggressors of Peace (Live) Back Cover.jpeg"
          alt="Squealer and the Aggressors of Peace (Live) Back Cover"
          width={size}
          height={size}
          className="object-cover w-full h-full"
          style={{
            borderRadius: "1rem",
          }}
          sizes={`(max-width: 768px) 100vw, (max-width: 1200px) ${size}px, ${size}px`}
          priority
        />
      </div>
    </div>
  );
}

export default function SataopLivePage() {
  const [showTracklist, setShowTracklist] = useState(false);

  return (
    <main className="min-h-screen bg-transparent text-white relative overflow-x-hidden">
      {/* Blurred Album Cover Background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none bg-pulse-glow"
        aria-hidden="true"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <Image
          src="/assets/music-assets/Squealer and the Aggressors of Peace (Live) Front Cover.jpeg"
          alt="Live Album Blurred Background"
          fill
          className="object-cover w-full h-full"
          style={{
            filter: "blur(10px) brightness(1.5) saturate(1.8) drop-shadow(0 0 80px #e11d48aa)",
            objectPosition: "center",
            zIndex: 0,
            pointerEvents: "none",
            userSelect: "none",
          }}
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
        {/* Pulsing glow overlay */}
        <div className="absolute inset-0 pointer-events-none bg-pulse-glow" aria-hidden="true" />
      </div>

      {/* Animated floaters in the background */}
      <AnimatedFloaters />

      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center z-10">
        <div className="mb-8 drop-shadow-2xl relative flex justify-center items-center">
          {/* Flowers and hummingbirds around album cover */}
          <Flower className="absolute -left-8 -top-6 flower-anim" style={{ animationDelay: "0.2s" }} />
          <Hummingbird className="absolute right-0 -top-10 hummingbird-anim" style={{ animationDelay: "0.7s" }} />
          <Flower className="absolute left-1/2 -bottom-8 flower-anim" style={{ animationDelay: "1.1s" }} />
          <div className="relative">
            {/* 3D rotating vinyl sleeve */}
            <VinylSleeve3D size={340} />
            {/* Animated ring pulse around album cover */}
            <span className="vinyl-pulse-ring" aria-hidden="true" />
          </div>
        </div>
        <AnimatedHeading />
        {/* Floating Glow & Animations */}
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&display=swap');
          .animated-heading {
            font-family: 'ITC Benguiat', 'Playfair Display', serif !important;
            position: relative;
            overflow: visible;
          }
          /* Shine effect for heading */
          .heading-shine {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            background: linear-gradient(120deg, transparent 0%, #fff8 40%, #fff 50%, #fff8 60%, transparent 100%);
            opacity: 0.0;
            animation: headingShineAnim 3.5s cubic-bezier(.4,0,.2,1) infinite;
            z-index: 2;
            border-radius: 1rem;
            mix-blend-mode: lighten;
          }
          @keyframes headingShineAnim {
            0% { opacity: 0; transform: translateX(-60%) skewX(-18deg);}
            10% { opacity: 0.7; }
            15% { opacity: 1; }
            25% { opacity: 0.7; }
            30% { opacity: 0; }
            100% { opacity: 0; transform: translateX(120%) skewX(-18deg);}
          }
          /* Optional: per-letter shine (subtle) */
          .heading-shine-letter {
            position: relative;
            z-index: 3;
            background: linear-gradient(90deg, #fff2 0%, #fff8 50%, #fff2 100%);
            background-clip: text;
            -webkit-background-clip: text;
            color: #7f1d1d !important;
            animation: letterShineAnim 2.8s cubic-bezier(.4,0,.2,1) infinite;
          }
          @keyframes letterShineAnim {
            0%, 100% { filter: brightness(1); }
            10% { filter: brightness(1.2); }
            15% { filter: brightness(1.5); }
            20% { filter: brightness(1.2); }
            25% { filter: brightness(1); }
          }
          /* LIVE text pulsing red recording light */
          .live-pulse {
            position: relative;
            color: #b91c1c !important;
            text-shadow: 0 0 10px #b91c1c, 0 2px 8px #fff2;
            animation: livePulseText 1.2s cubic-bezier(.4,0,.2,1) infinite;
          }
          @keyframes livePulseText {
            0%, 100% { filter: brightness(1); }
            50% { filter: brightness(1.5); text-shadow: 0 0 18px #b91c1c, 0 2px 8px #fff2; }
          }
          .live-dot {
            display: inline-block;
            margin-left: 0.4em;
            width: 0.4em;
            height: 0.4em;
            border-radius: 50%;
            background: #e11d48;
            box-shadow: 0 0 8px 2px #e11d48, 0 0 0 2px #fff2;
            vertical-align: middle;
            position: absolute;
            left: 90%;
            top: 55%;
            transform: translateY(-50%);
            animation: liveDotPulse 1.2s cubic-bezier(.4,0,.2,1) infinite;
          }
          @keyframes liveDotPulse {
            0%, 100% { opacity: 1; box-shadow: 0 0 8px 2px #e11d48, 0 0 0 2px #fff2;}
            50% { opacity: 0.5; box-shadow: 0 0 18px 4px #e11d48, 0 0 0 2px #fff2;}
          }
          .animate-fade-in {
            animation: fadeIn 1.2s cubic-bezier(.4,0,.2,1) both;
          }
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(32px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          /* Animated floaters */
          .animated-floater {
            position: absolute;
            z-index: 1;
            opacity: 0.7;
            animation: floaterMove 7s ease-in-out infinite alternate;
            pointer-events: none;
          }
          .floater-flower { width: 32px; height: 32px; animation-duration: 8s; }
          .floater-hummingbird { width: 38px; height: 32px; animation-duration: 9s; }
          @keyframes floaterMove {
            0% { transform: translateY(0) scale(1) rotate(0deg);}
            50% { transform: translateY(-18px) scale(1.08) rotate(8deg);}
            100% { transform: translateY(8px) scale(0.95) rotate(-8deg);}
          }
          /* Animated ring pulse around album cover */
          .vinyl-pulse-ring {
            position: absolute;
            inset: -18px;
            border-radius: 50%;
            border: 4px solid #b91c1c;
            opacity: 0.18;
            animation: pulseRing 2.8s cubic-bezier(.4,0,.2,1) infinite;
            pointer-events: none;
            z-index: 1;
          }
          @keyframes pulseRing {
            0% { opacity: 0.18; transform: scale(1);}
            60% { opacity: 0.08; transform: scale(1.18);}
            100% { opacity: 0; transform: scale(1.25);}
          }
          /* Flower and hummingbird animation */
          .flower-anim {
            animation: flowerPop 2.2s ease-in-out infinite;
          }
          .hummingbird-anim {
            animation: hummingbirdFlap 2.8s ease-in-out infinite;
          }
          @keyframes flowerPop {
            0%, 100% { opacity: 0; transform: scale(0.7) rotate(0deg);}
            10% { opacity: 1; transform: scale(1.1) rotate(10deg);}
            20% { opacity: 1; transform: scale(1) rotate(-8deg);}
            80% { opacity: 1; }
            90% { opacity: 0.7; }
          }
          @keyframes hummingbirdFlap {
            0%, 100% { opacity: 0.7; transform: scale(1) rotate(-8deg);}
            10% { opacity: 1; transform: scale(1.1) rotate(8deg);}
            20% { opacity: 1; transform: scale(1.05) rotate(-4deg);}
            80% { opacity: 1; }
            90% { opacity: 0.7; }
          }
          .spin-album {
            animation: spinAlbum 7s linear infinite;
            will-change: transform;
          }
          @keyframes spinAlbum {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
          .vinyl-sleeve {
            position: relative;
            transform-style: preserve-3d;
            animation: rotate-y-axis 20s linear infinite;
            will-change: transform;
            margin: 0 auto;
            perspective: 1200px;
          }
          :root {
            --vinyl-thickness: 6px;
            --vinyl-middle-gradient: linear-gradient(135deg, #b91c1c 0%, #7f1d1d 50%, #b91c1c 100%);
          }
          .vinyl-cover,
          .vinyl-back-cover {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 1rem;
            overflow: hidden;
            top: 0;
            left: 0;
            transform: translateZ(calc(var(--vinyl-thickness) / 2));
            box-shadow: none !important;
            border: none !important;
            z-index: 10;
          }
          .vinyl-back-cover {
            transform: rotateY(180deg) translateZ(calc(var(--vinyl-thickness) / 2));
          }
          .vinyl-middle,
          .vinyl-middle-1,
          .vinyl-middle-2,
          .vinyl-middle-3,
          .vinyl-middle-4,
          .vinyl-middle-5,
          .vinyl-middle-6 {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 1rem;
            background: var(--vinyl-middle-gradient);
            box-shadow: none !important;
            z-index: 5;
          }
          .vinyl-middle { transform: translateZ(0); }
          .vinyl-middle-1 { transform: translateZ(-1px); }
          .vinyl-middle-2 { transform: translateZ(1px); }
          .vinyl-middle-3 { transform: translateZ(-0.5px); }
          .vinyl-middle-4 { transform: translateZ(-2px); }
          .vinyl-middle-5 { transform: translateZ(0.5px); }
          .vinyl-middle-6 { transform: translateZ(2px); }
          @keyframes rotate-y-axis {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
          }
          .vinyl-sleeve:hover {
            animation-play-state: paused;
            transform: rotateY(25deg) rotateX(5deg) scale(1.02);
            transition: transform 0.5s ease;
          }
          .bg-pulse-glow {
            background: radial-gradient(ellipse at center, #e11d48 0%, transparent 90%);
            opacity: 0.01;
            animation: pulseBgGlow 2.8s cubic-bezier(.4,0,.2,1) infinite;
            z-index: 0;
          }
          @keyframes pulseBgGlow {
            0% { opacity: 0.18; }
            60% { opacity: 0.32; }
            100% { opacity: 0.18; }
          }
        `}</style>
      </div>

      {/* About Section */}
      <Container>
        <section className="max-w-3xl mx-auto mt-16 mb-12 bg-black/60 rounded-2xl shadow-xl p-8 border border-fuchsia-900/40 backdrop-blur-md">
          <h2 className="text-3xl font-bold mb-4 text-white">From Klense, For You...</h2>
          <p className="mb-4 text-lg text-white">
            <strong>Squealer and the Aggressors of Peace (Live)</strong> captures the raw energy, improvisation, and crowd connection of Klense's most ambitious project to date. Experience every lyric, every riff, and every
          </p>
          <p className="mb-4 text-white">
            Featuring all-new live arrangements, extended solos, and exclusive on-stage banter, this album brings a new dimension to the original studio release. Whether you were there in person or are hearing it for the first time, this is Klense at his most electrifying.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold shadow transition"
              onClick={() => window.location.href = "#pre-save"}
            >
              <FaTicketAlt /> Get the album
            </button>
          </div>
        </section>
      </Container>

      {/* Tracklist Section */}
      <Container>
        <section id="tracklist" className="max-w-2xl mx-auto mt-10 mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-2 h-8 bg-gradient-to-b from-white via-white to-white rounded-full" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">Tracklist</h2>
          </div>
          <ol className="space-y-3 text-lg bg-black/40 rounded-xl p-6 border border-fuchsia-800/40 shadow-lg animate-fade-in">
            {TRACKLIST.map((track, idx) => (
              <li key={track} className="flex items-center gap-3">
                <span className="inline-block w-8 text-right text-white font-bold">{String(idx + 1).padStart(2, "0")}</span>
                <span className="flex-1 text-white">{track}</span>
                <span className="ml-2 px-2 py-0.5 rounded bg-white text-xs font-semibold text-black">LIVE</span>
              </li>
            ))}
          </ol>
        </section>
      </Container>


      {/* Pre-Save / Streaming Links */}
      <Container>
        <section id="pre-save" className="max-w-2xl mx-auto mb-24 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Be First to Hear It</h2>
          <p className="mb-6 text-white">
            Pre-save the album and get notified the moment it drops on your favorite platform.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <a
              href="https://album.link/sataop-live-klense"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-4 bg-white text-black rounded-lg shadow hover:shadow-xl hover:scale-105 transition-transform"
            >
              <FaSpotify className="text-3xl mb-1" />
              <span className="text-xs font-medium">Spotify</span>
            </a>
            <a
              href="https://album.link/sataop-live-klense"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-4 bg-white text-black rounded-lg shadow hover:shadow-xl hover:scale-105 transition-transform"
            >
              <FaApple className="text-3xl mb-1" />
              <span className="text-xs font-medium">Apple Music</span>
            </a>
            <a
              href="https://album.link/sataop-live-klense"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-4 bg-white text-black rounded-lg shadow hover:shadow-xl hover:scale-105 transition-transform"
            >
              <FaYoutube className="text-3xl mb-1" />
              <span className="text-xs font-medium">YouTube</span>
            </a>
          </div>
          <div className="mt-4 text-white text-sm">
            <span className="font-semibold">Release Date:</span> {LIVE_RELEASE_DATE}
          </div>
        </section>
      </Container>

      {/* Floating Glow & Animations */}
      {/* Move global styles outside of <main> to avoid nested styled-jsx error */}
    </main>
  );
}
