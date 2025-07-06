'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import Tilt from "react-parallax-tilt";

const TRACKS = [
	{
		title: "The Evening Dispatch!",
		filename: "01 The Evening Dispatch!.m4a",
		duration: "2:05",
		theme: "Jazz",
	},
	{
		title: "Saxophone",
		filename: "02 Saxophone.m4a",
		duration: "2:05",
		theme: "Jazz, Hip-Hop",
	},
	{
		title: "Oze II",
		filename: "03 Oze II.m4a",
		duration: "2:09",
		theme: "Songwriting",
	},
	{
		title: "Oze",
		filename: "04 Oze.m4a",
		duration: "2:19",
		theme: "Alternative",
	},
	{
		title: "Wish Ya Told Me!",
		filename: "05 Wish Ya Told Me!.m4a",
		duration: "1:33",
		theme: "Breakcore",
	},
	{
		title: "Intermission IV",
		filename: "06 Intermission IV.m4a",
		duration: "2:11",
		theme: "Ambient",
	},
	{
		title: "You Are The Reason",
		filename: "07 You Are The Reason.m4a",
		duration: "1:53",
		theme: "Songwriting",
	},
	{
		title: "Blue Salmon",
		filename: "08 Blue Salmon.m4a",
		duration: "1:18",
		theme: "Alternative",
	},
	{
		title: "Deglupta",
		filename: "09 Deglupta.m4a",
		duration: "1:37",
		theme: "Rock",
	},
	{
		title: "Kept You Waiting",
		filename: "10 Kept You Waiting.m4a",
		duration: "1:36",
		theme: "Alternative Rap, Hip-Hop",
	},
	{
		title: "Karl Draisack",
		filename: "11 Karl Draisack.m4a",
		duration: "2:37",
		theme: "Alternative",
	},
	{
		title: "Forbo",
		filename: "12 Forbo.m4a",
		duration: "1:57",
		theme: "Alternative",
	},
	{
		title: "Garble Surmount",
		filename: "13 Garble Surmount.m4a",
		duration: "2:33",
		theme: "Alternative",
	},
	{
		title: "Impromptu",
		filename: "14 Impromptu.m4a",
		duration: "3:05",
		theme: "Alternative",
	},
	{
		title: "Addis Abeba",
		filename: "15 Addis Abeba.m4a",
		duration: "2:42",
		theme: "Alternative",
	},
	{
		title: "Abide by Klense",
		filename: "16 Abide by Klense.m4a",
		duration: "2:03",
		theme: "Alternative",
	},
];

/* const TRACK_NOTES = [
	{
		title: "Loops In My Head",
		note: "A beat I kept returning to—sometimes the simplest ideas stick the hardest.",
	},
	{
		title: "Neon Verse",
		note: "A late-night vocal sketch, inspired by city lights and insomnia.",
	},
	{
		title: "Fragments",
		note: "Pieced together from unfinished sessions, this one is all about mood.",
	},
	{
		title: "Night Drive",
		note: "Imagined for empty highways and neon reflections.",
	},
	// ...add more notes as needed
]; */


/* AlbumCoverTilt component */

function AlbumCoverTilt({
	className = "",
	size = 380,
	isHero = false,
}: {
	className?: string;
	size?: number;
	isHero?: boolean;
}) {
	// Use CSS variable for background so it matches the selected theme
	const vinylMiddleStyle = { background: "var(--vinyl-middle-gradient)" };

	if (isHero) {
		// Hero version with solid 3D box and overlaid covers and multiple middle layers for thickness
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
						src="/assets/music-assets/HalfThoughts1Cover.png"
						alt="Half Thoughts Cover"
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
				{/* Back cover */}
				<div className="vinyl-back-cover">
					<Image
						src="/assets/music-assets/HalfThoughts1BackCover.png"
						alt="Half Thoughts Back Cover"
						
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

	// Regular version with tilt effect for other sections
	return (
		<Tilt
			className={`w-[${size}px] h-[${size}px] rounded-2xl shadow-2xl group transition-all duration-300 hover:scale-105 hover:shadow-2xl mx-auto ${className}`}
			tiltMaxAngleX={15}
			tiltMaxAngleY={15}
			glareEnable={true}
			glareMaxOpacity={0.6}
			glareColor="#ffffff"
			glarePosition="all"
			transitionSpeed={250}
			style={{
				maxWidth: size,
				maxHeight: size,
				borderRadius: "1rem",
				overflow: "hidden",
			}}
		>
			<div
				className="relative w-full h-full"
				style={{
					borderRadius: "1rem",
					overflow: "hidden",
				}}
			>
				<Image
					src="/assets/music-assets/HalfThoughts1Cover.png"
					alt="Half Thoughts Cover"
					
					width={size}
					height={size}
					className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
					style={{
						borderRadius: "1rem",
					}}
					sizes={`(max-width: 768px) 100vw, (max-width: 1200px) ${size}px, ${size}px`}
					priority
				/>
			</div>
		</Tilt>
	);
}

// Small floating music note SVG
function FloatingMusicNote({ className = "" }: { className?: string }) {
	return (
		<svg
			className={`floating-music-note ${className}`}
			width="36"
			height="36"
			viewBox="0 0 36 36"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<g filter="url(#noteShadow)">
				<path
					d="M26 6V22.5C25.1 21.9 23.9 21.5 22.5 21.5C19.5 21.5 17 23.2 17 25.25C17 27.3 19.5 29 22.5 29C25.5 29 28 27.3 28 25.25V10H32V6H26Z"
					fill="#f472b6"
				/>
			</g>
			<defs>
				<filter id="noteShadow" x="0" y="0" width="36" height="36" filterUnits="userSpaceOnUse">
					<feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#f472b6" floodOpacity="0.3"/>
				</filter>
			</defs>
		</svg>
	);
}

// Animated sparkle SVG
function Sparkle({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
	return (
		<svg
			className={`sparkle ${className}`}
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			style={style}
			aria-hidden="true"
		>
			<g>
				<path
					d="M9 0L10.5 6H17L11.5 9.5L13 16L9 12.5L5 16L6.5 9.5L1 6H7.5L9 0Z"
					fill="#fbbf24"
					opacity="0.85"
				/>
			</g>
		</svg>
	);
}

// Utility to split and animate heading letters
function AnimatedHeading() {
	const headingTop = "HALF";
	const headingBottom = "THOUGHTS";
	const year = "'25";
	const colors = [
		"text-pink-500",
		"text-fuchsia-500",
		"text-purple-500",
		"text-blue-500",
		"text-pink-400",
		"text-fuchsia-400",
		"text-purple-400",
		"text-blue-400",
		"text-pink-600",
		"text-fuchsia-600",
		"text-purple-600",
		"text-blue-600",
	];
	return (
		<div
			className="animated-heading font-extrabold tracking-wide mb-3 drop-shadow-lg gradient-text-glow text-gray-900 dark:text-white flex flex-col items-center select-none"
			style={{
				fontSize: "clamp(2rem, 8vw, 4.5rem)",
				letterSpacing: "0.12em",
				lineHeight: 1.1,
			}}
			aria-label="HALF THOUGHTS '25"
		>
			<div className="flex justify-center gap-1">
				{headingTop.split("").map((char, i) =>
					char === " " ? (
						<span className="inline-block w-2 xs:w-3 md:w-5" key={i} />
					) : (
						<span
							className={`inline-block animated-letter ${colors[i % colors.length]}`}
							style={{ animationDelay: `${i * 0.06 + 0.1}s` }}
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
							className={`inline-block animated-letter ${colors[(i + headingTop.length) % colors.length]}`}
							style={{ animationDelay: `${(i + headingTop.length) * 0.06 + 0.1}s` }}
							key={i}
						>
							{char}
						</span>
					)
				)}
				<span
					className="inline-block animated-letter special-year ml-2"
					style={{ animationDelay: `${(headingTop.length + headingBottom.length) * 0.06 + 0.2}s` }}
				>
					{year}
				</span>
			</div>
		</div>
	);
}

// Add this helper for random animation delays
function getRandomDelay(min = 0, max = 2) {
	return (Math.random() * (max - min) + min).toFixed(2) + "s";
}

// Animated floating shapes (stars, circles, notes)
function AnimatedFloaters() {
	const floaters = [
		{ type: "star", className: "floater-star", style: { left: "10%", top: "18%" }, delay: 0.87 },
		{ type: "circle", className: "floater-circle", style: { left: "80%", top: "22%" }, delay: 0.23 },
		{ type: "note", className: "floater-note", style: { left: "18%", top: "70%" }, delay: 2.15 },
		{ type: "star", className: "floater-star", style: { left: "70%", top: "80%" }, delay: 1.22 },
		{ type: "circle", className: "floater-circle", style: { left: "50%", top: "8%" }, delay: 0.76 },
		{ type: "note", className: "floater-note", style: { left: "90%", top: "60%" }, delay: 0.86 },
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
					{floater.type === "star" && (
						<svg width="22" height="22" viewBox="0 0 22 22" fill="none">
							<polygon points="11,2 13,8 20,8 14.5,12 16.5,19 11,15 5.5,19 7.5,12 2,8 9,8"
								fill="#fbbf24" opacity="0.85" />
						</svg>
					)}
					{floater.type === "circle" && (
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
							<circle cx="8" cy="8" r="7" fill="#a5b4fc" opacity="0.7" />
						</svg>
					)}
					{floater.type === "note" && (
						<svg width="18" height="18" viewBox="0 0 36 36" fill="none">
							<g filter="url(#floaterNoteShadow)">
								<path
									d="M26 6V22.5C25.1 21.9 23.9 21.5 22.5 21.5C19.5 21.5 17 23.2 17 25.25C17 27.3 19.5 29 22.5 29C25.5 29 28 27.3 28 25.25V10H32V6H26Z"
									fill="#f472b6"
								/>
							</g>
							<defs>
								<filter id="floaterNoteShadow" x="0" y="0" width="36" height="36" filterUnits="userSpaceOnUse">
									<feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#f472b6" floodOpacity="0.3"/>
								</filter>
							</defs>
						</svg>
					)}
				</span>
			))}
		</>
	);
}

export default function HalfThoughtsPage() {
	const [expanded, setExpanded] = useState(false);

	return (
		<main className="min-h-screen font-sans relative overflow-x-hidden bg-white dark:bg-black transition-colors duration-300">
			{/* Animated floaters in the background */}
			<AnimatedFloaters />
			{/* HERO BANNER */}
			<section className="relative flex flex-col items-center justify-center text-center min-h-[70vh] px-4 animate-fadein">
				{/* Animated floating music note in hero */}
				<div className="absolute left-8 top-16 z-20 pointer-events-none hidden md:block">
					<FloatingMusicNote />
				</div>
				{/* Add extra space */}
				<div className="h-12" />
				<div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
					{/* Album cover showcased at the top, larger and centered, with vinyl sleeve effect */}
					<div
						className="w-full flex justify-center items-center mb-8 mt-10 relative"
						style={{ perspective: "1200px" }}
					>
						{/* Sparkles around album cover */}
						<Sparkle className="absolute -left-8 -top-6 sparkle-anim" style={{ animationDelay: "0.2s" }} />
						<Sparkle className="absolute right-0 -top-10 sparkle-anim" style={{ animationDelay: "0.7s" }} />
						<Sparkle className="absolute left-1/2 -bottom-8 sparkle-anim" style={{ animationDelay: "1.1s" }} />
						<AlbumCoverTilt size={400} className="mx-auto" isHero={true} />
						{/* Animated ring pulse around album cover */}
						<span className="vinyl-pulse-ring" aria-hidden="true" />
					</div>
					{/* --- Replace the old h1 with the animated heading --- */}
					<AnimatedHeading />
					<p className="text-lg md:text-2xl italic mb-6 font-medium max-w-xl mx-auto text-gray-700 dark:text-gray-200 animate-fadein-delayed">
						A collection of unreleased ideas, demos &amp; fragments.
					</p>
					<Link
						href="https://gum.new/gum/cmcqw6b0b001q04l22b1v26my"
						download
						className="mt-2 inline-block px-10 py-4 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 text-white font-bold rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200 glow-btn focus:outline-none focus:ring-4 focus:ring-pink-400"
						aria-label="Download Half Thoughts ZIP"
					>
						Download for Free
					</Link>
					<div className="mt-3 text-gray-600 dark:text-gray-400 text-sm">
						or{" "}
						<Link
							href="https://klense.gumroad.com/l/cnjnik"
							target="_blank"
							rel="noopener noreferrer"
							className="underline hover:text-blue-600 dark:hover:text-blue-300"
						>
							name your price
						</Link>{" "}
						on Gumroad
					</div>
				</div>
				<div className="absolute inset-0 pointer-events-none"
					style={{
						background:
							"linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(30,30,30,0.12) 100%)"
					}}
				/>
			</section>

			{/* Animated divider between hero and about */}
			<div className="w-full flex justify-center items-center my-6">
				<svg width="120" height="18" viewBox="0 0 120 18" fill="none" className="motion-divider" aria-hidden="true">
					<path d="M0 9 Q30 0 60 9 Q90 18 120 9" stroke="#f472b6" strokeWidth="2.5" fill="none"/>
				</svg>
			</div>

			{/* BLOG / INTRO SECTION */}
			<section className="max-w-2xl mx-auto p-8 mt-10 bg-white dark:bg-[var(--card-background)] rounded-xl shadow-lg border border-gray-200 dark:border-[var(--border-color)] transition-colors duration-300">
				<h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
					About <span className="text-pink-600 dark:text-pink-400">Half Thoughts</span>
				</h2>
				<p className="mb-4 text-lg text-gray-800 dark:text-gray-200">
					<strong>Half Thoughts</strong> is a gift to everyone who's followed my
					journey so far. It's a collection of demos, fragments, and sonic sketches
					from the year 2025; moments that never quite became "songs," but
					still mean something to me.
				</p>
				<p className="mb-4 text-gray-600 dark:text-gray-400">
					These aren't polished singles. They're honest, raw, and sometimes
					unfinished. Some are loops I couldn't get out of my head. Others are
					verses or melodies that felt too personal to throw away. I hope you find
					something here that resonates, inspires, or just makes you nod your head.
				</p>
				{/* <button
					className="text-blue-600 dark:text-blue-400 underline mt-2 hover:text-pink-600 dark:hover:text-pink-400 transition"
					onClick={() => setExpanded((v) => !v)}
					aria-expanded={expanded}
					aria-controls="track-notes"
					role="button"
				>
					{expanded ? "Hide Track Notes" : "Show Track Notes"}
				</button> */}
				{expanded && (
					<div className="mt-4 text-gray-600 dark:text-gray-400 text-base space-y-3" id="track-notes">
						<details open>
							<summary className="font-semibold cursor-pointer">Track Notes</summary>
							<ul className="list-disc pl-6 mt-2 space-y-2">
								{/* {TRACK_NOTES.map((note) => (
									<li key={note.title}>
										<strong>{note.title}:</strong> {note.note}
									</li>
								))} */}
							</ul>
						</details>
					</div>
				)}
			</section>

			{/* TRACKLIST & AUDIO PREVIEWS */}
			<section className="max-w-2xl mx-auto mt-14 px-4">
				<h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
					Tracklist &amp; Previews
				</h2>
				<div className="flex flex-col gap-4">
					{TRACKS.map((track, idx) => (
						<div
							key={track.filename}
							className="flex items-center gap-4 bg-gray-100 dark:bg-[var(--card-background)] rounded-lg px-4 py-3 shadow hover:bg-gray-200 dark:hover:bg-[var(--hover-background)] border border-gray-200 dark:border-[var(--border-color)] transition"
						>
							<span className="text-lg font-semibold flex-shrink-0 w-8 text-pink-600 dark:text-pink-400">
								{String(idx + 1).padStart(2, "0")}
							</span>
							<div className="flex-1">
								<span className="font-medium text-gray-900 dark:text-white">{track.title}</span>
								<span className="ml-3 text-xs text-gray-600 dark:text-gray-400">{track.duration}</span>
								<span className={`ml-3 inline-block px-2 py-0.5 rounded text-xs font-semibold
									${track.theme === "Loops" ? "bg-pink-200 text-pink-800 dark:bg-pink-900 dark:text-pink-100" :
										track.theme === "Vocals" ? "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-100" :
										track.theme === "Ambient" ? "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-100" :
										track.theme === "Synthwave" ? "bg-purple-200 text-purple-800 dark:bg-purple-900 dark:text-purple-100" :
										"bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
									}`}
								>
									{track.theme}
								</span>
							</div>
						</div>
					))}
				</div>
				<div className="text-center text-gray-600 dark:text-gray-400 text-sm mt-4">
					All tracks available in the ZIP download above.
				</div>
			</section>

			{/* DOWNLOAD PANEL */}
			<section className="max-w-2xl mx-auto mt-16 px-4">
				<div className="bg-white dark:bg-[var(--card-background)] rounded-xl border border-gray-200 dark:border-[var(--border-color)] shadow-lg p-8 text-center flex flex-col items-center transition-colors duration-300">
					<h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Download the Full Project</h2>
					<a
						href="https://klense.gumroad.com/l/cnjnik"
						download
						className="inline-block px-8 py-4 bg-gray-900 dark:bg-[var(--text-primary)] text-white dark:text-[var(--background-primary)] font-semibold rounded-full shadow-lg hover:opacity-90 transition text-lg"
						aria-label="Download ZIP (MP3s + Cover)"
					>
						Download ZIP (MP3s + Cover)
					</a>
					<div className="mt-3 text-gray-600 dark:text-gray-400 text-sm">
						Want to support?{" "}
						<Link
							href="https://gumroad.com/klense"
							target="_blank"
							rel="noopener noreferrer"
							className="underline hover:text-pink-600 dark:hover:text-pink-400"
						>
							Name your price
						</Link>{" "}
						or{" "}
						<a
							href="https://ko-fi.com/klense"
							target="_blank"
							rel="noopener noreferrer"
							className="underline hover:text-blue-600 dark:hover:text-blue-400"
						>
							buy me a coffee
						</a>
						.
					</div>
					<div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
						No email required. For bonus liner notes, donate any amount.
					</div>
				</div>
			</section>

			{/* ARTWORK & CREDITS */}
			<section className="max-w-xl mx-auto mt-20 px-4 text-center relative">
				{/* Sparkle on artwork */}
				<Sparkle className="absolute left-2 top-2 sparkle-anim" style={{ animationDelay: "0.5s" }} />
				<AlbumCoverTilt size={320} />
				<div className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
					Artwork by <span className="font-semibold text-gray-900 dark:text-white">Klense</span>
				</div>
				<div className="mt-2 text-gray-500 dark:text-gray-400 text-xs">
					All music written, produced &amp; mixed by Klense.
					<br />
					Released {new Date().getFullYear()}.
				</div>
			</section>

			{/* FAN CONNECT PANEL */}
			<section className="max-w-2xl mx-auto mt-16 px-4 pb-24">
				<div className="bg-white dark:bg-[var(--card-background)] rounded-xl border border-gray-200 dark:border-[var(--border-color)] shadow-lg p-8 text-center flex flex-col items-center transition-colors duration-300">
					<h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Thoughts?</h2>
					<p className="mb-4 text-gray-600 dark:text-gray-400">
						I'd love to hear your feedback, favorite tracks, or just a hello.
					</p>
					<Link
						href="/contact"
						className="inline-block px-6 py-3 bg-pink-500 text-white rounded-full font-semibold shadow hover:bg-pink-600 transition"
						aria-label="Send Feedback"
					>
						Send Feedback
					</Link>
					{/* <div className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
						Or join the mailing list for future releases.
					</div>
					<form
						action="https://tinyletter.com/klense"
						method="post"
						target="popupwindow"
						className="flex flex-col sm:flex-row gap-2 justify-center mt-2 w-full max-w-md mx-auto"
					>
						<input
							type="email"
							name="email"
							placeholder="Your email"
							className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-[var(--border-color)] focus:outline-none flex-1"
							required
							aria-label="Your email"
						/>
						<button
							type="submit"
							className="px-6 py-2 bg-gray-700 dark:bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-600 dark:hover:bg-gray-700 transition"
							aria-label="Join Mailing List"
						>
							Join List
						</button>
					</form> */}
				</div>
			</section>
			<div className="h-12" />
			<style jsx global>{`
                /* Simple, Clean 3D Vinyl Sleeve - minimal and visually clean */
                .vinyl-sleeve {
                    position: relative;
                    transform-style: preserve-3d;
                    animation: rotate-y-axis 20s linear infinite;
                    will-change: transform;
                    margin: 0 auto;
                    perspective: 1200px;
                }

                /* Simple thickness - matching the gap between covers */
                :root {
                    --vinyl-thickness: 6px;
                    --vinyl-middle-gradient: linear-gradient(135deg, #2a2a2a 0%, #404040 50%, #2a2a2a 100%);
                }

                /* Theme vinyl gradients */
                .theme-pastel {
                    --vinyl-middle-gradient: linear-gradient(135deg, #f9a8d4 0%, #f472b6 50%, #a21caf 100%);
                }
                .theme-forest {
                    --vinyl-middle-gradient: linear-gradient(135deg, #166534 0%, #22c55e 50%, #a3e635 100%);
                }
                .theme-ocean {
                    --vinyl-middle-gradient: linear-gradient(135deg, #0ea5e9 0%, #2563eb 50%, #38bdf8 100%);
                }
                .theme-sunset {
                    --vinyl-middle-gradient: linear-gradient(135deg, #fbbf24 0%, #f472b6 50%, #f43f5e 100%);
                }
                .theme-metallic-silver {
                    --vinyl-middle-gradient: linear-gradient(135deg, #e5e7eb 0%, #a3a3a3 50%, #f3f4f6 100%);
                }
                .dark {
                    --vinyl-middle-gradient: linear-gradient(135deg, #6366f1 0%, #a21caf 50%, #f472b6 100%);
                }
                .light {
                    --vinyl-middle-gradient: linear-gradient(135deg, #f472b6 0%, #a21caf 50%, #6366f1 100%);
                }

                /* Remove all box-shadows from vinyl covers and middles */
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
                    /* Remove all box-shadow and border for a flat look */
                    box-shadow: none !important;
                    border: none !important;
                    z-index: 10;
                }
                .vinyl-back-cover {
                    transform: rotateY(180deg) translateZ(calc(var(--vinyl-thickness) / 2));
                }

                /* Multiple middle layers for actual thickness */
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
                    /* Remove box-shadow for flat look */
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

                /* Enhanced rotation animation */
                @keyframes rotate-y-axis {
                    0% { transform: rotateY(0deg); }
                    100% { transform: rotateY(360deg); }
                }

                /* Hover effect */
                .vinyl-sleeve:hover {
                    animation-play-state: paused;
                    transform: rotateY(25deg) rotateX(5deg) scale(1.02);
                    transition: transform 0.5s ease;
                }

                /* Animated floaters */
				.animated-floater {
					position: absolute;
					z-index: 1;
					opacity: 0.7;
					animation: floaterMove 6s ease-in-out infinite alternate;
					pointer-events: none;
				}
				.floater-star { width: 22px; height: 22px; animation-duration: 7s; }
				.floater-circle { width: 16px; height: 16px; animation-duration: 8s; }
				.floater-note { width: 18px; height: 18px; animation-duration: 6.5s; }
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
					border: 4px solid #f472b6;
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

				/* Fade-in for subtitle */
				.animate-fadein-delayed {
					animation: fadeInDelayed 1.2s cubic-bezier(.4,0,.2,1) both;
					animation-delay: 0.7s;
				}
				@keyframes fadeInDelayed {
					0% { opacity: 0; transform: translateY(24px);}
					100% { opacity: 1; transform: translateY(0);}
				}

                /* Responsive adjustments */
                @media (max-width: 768px) {
                    :root {
                        --vinyl-thickness: 5px;
                    }
                }

                @media (max-width: 480px) {
                    :root {
                        --vinyl-thickness: 4px;
                    }
                }
                
				/* Floating music note animation */
				.floating-music-note {
					animation: floatNote 3.5s ease-in-out infinite alternate;
					filter: drop-shadow(0 2px 8px #f472b6aa);
				}
				@keyframes floatNote {
					0% { transform: translateY(0) rotate(-8deg) scale(1);}
					100% { transform: translateY(-18px) rotate(8deg) scale(1.08);}
				}

				/* Sparkle animation */
				.sparkle-anim {
					animation: sparklePop 2.2s ease-in-out infinite;
				}
				@keyframes sparklePop {
					0%, 100% { opacity: 0; transform: scale(0.7) rotate(0deg);}
					10% { opacity: 1; transform: scale(1.1) rotate(10deg);}
					20% { opacity: 1; transform: scale(1) rotate(-8deg);}
					80% { opacity: 1; }
					90% { opacity: 0.7; }
				}

				/* Animated divider motion */
				.motion-divider {
					animation: dividerWave 4s ease-in-out infinite alternate;
				}
				@keyframes dividerWave {
					0% { transform: translateY(0);}
					100% { transform: translateY(4px);}
				}

				.animated-heading .animated-letter {
					text-shadow: 0 2px 8px #ec48992e, 0 0 #fff;
					filter: drop-shadow(0 1px 4px #f472b6aa);
					cursor: pointer;
					transition: transform 0.18s, filter 0.18s;
					animation: 0.7s cubic-bezier(.4,.2,.2,1.2) both letterPop;
					position: relative;
				}
				.animated-heading .animated-letter:hover {
					filter: drop-shadow(0 0 12px #f472b6cc) brightness(1.2);
					z-index: 2;
					transform: scale(1.18) rotate(-6deg);
				}
				@keyframes letterPop {
					0% { opacity: 0; transform: translateY(30px) scale(0.7) rotate(-10deg);}
					60% { opacity: 1; transform: translateY(-8px) scale(1.12) rotate(4deg);}
					100% { opacity: 1; transform: translateY(0) scale(1) rotate(0);}
				}
				.animated-heading .special-year {
					color: #f472b6;
					text-shadow: 0 0 10px #f472b6cc, 0 2px 8px #fff2;
					vertical-align: super;
					letter-spacing: .1em;
					font-size: .7em;
					animation: 1.2s cubic-bezier(.4,.2,.2,1.2) both yearGlow;
				}
				@keyframes yearGlow {
					0% { opacity: 0; filter: blur(4px);}
					60% { opacity: 1; filter: blur(0);}
					100% { opacity: 1; filter: blur(0);}
				}
			`}</style>
		</main>
	);
}