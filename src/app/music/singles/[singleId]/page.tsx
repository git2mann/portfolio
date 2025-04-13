'use client';

import { useParams } from 'next/navigation';
import Container from "@/app/_components/container";
import { singles } from "@/data/music"; // Corrected import path
import { useState, useEffect } from "react";
import InstructionPopup from "@/app/_components/InstructionPopup";
import Image from "next/image";
import Tilt from 'react-parallax-tilt';

// Define types for lyricsData
type LyricsGroup = {
  lines: string[];
  explanation: string;
};

type LyricsData = Record<string, LyricsGroup[]>;

const lyricsData: LyricsData = {
  "1": [
    {
      lines: [
        "Uh, I could show you the ropes",
        "But I'm too busy bein' me",
        "On a phenomenal roll",
        "This song here isn't even deep",
      ],
      explanation: "Klense begins with confidence, stating they could teach others but prefer to focus on their own success. They acknowledge the freestyle's casual nature, emphasizing their current creative momentum."
    },
    {
      lines: [
        "I just want you to know",
        "That as far as things go",
        "If I never said it before",
        "That I know I'm always the GOAT",
      ],
      explanation: "Here, Klense directly addresses the audience, declaring themselves the 'Greatest of All Time' with unwavering self-assurance."
    },
    {
      lines: [
        "And I'm back with the finest streak, freestylin' these",
        "Finally, I'm with the high elite",
        "Why are we talkin' 'bout hirin' me?",
        "Irony? I'm at a higher peak",
      ],
      explanation: "Klense reflects on their creative streak and their rise to the top tier of their field, questioning why anyone would doubt their worth."
    },
    {
      lines: [
        "I was the one you would hide, and seek-",
        "Out, and now when I ride a beat",
        "How could you even ride with me?",
        "I'm in the 'Fiery' list and category",
      ],
      explanation: "Klense recalls being overlooked in the past but now asserts their dominance, placing themselves among the most passionate and impactful creators."
    },
    {
      lines: [
        "My life is an allegory of always lookin' up",
        "Better step right out of my territory",
        "My options were very borin'",
        "I'd rather make music",
      ],
      explanation: "Klense describes their life as a metaphor for perseverance and optimism, choosing creativity over mundane options."
    },
    {
      lines: [
        "Than listen to your generic story",
        "Of how you made nothin'",
        "And passed it off like you found your calling",
        "I'm callin' you out",
      ],
      explanation: "Klense critiques unoriginal narratives and false claims of success, directly confronting their critics."
    },
    {
      lines: [
        "I just took my first breath in that verse",
        "Since that little shout, at the beginnin'",
        "I'm binnin' a rapper; an MC's final chapter",
        "Quit hirin' ghostwriters, your material's Casper",
      ],
      explanation: "Klense highlights their effortless delivery while criticizing others for using ghostwriters, calling their work insubstantial."
    },
    {
      lines: [
        "This... this is not planted in the house",
        "This is outside... this is the corridor",
        "Unless Leon knows how to float",
        "Bro thinks this is 'IT'",
        "",
        "But unless Leon knows how to float",
        "...It's, it's, it's, yes",
        "Th- This is the... This is the",
        "The... The... The risk-to-reward ratio right here",
      ],
      explanation: "A skit based on a voice note to Klense, humorously taken out of context to joke about effort and success."
    },
  ],
};

export default function SinglePage() {
  const params = useParams<{ singleId: string }>();
  const singleId = params?.singleId;
  const single = singles.find((s) => s.id === singleId);

  const [selectedLyric, setSelectedLyric] = useState<number | null>(null);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / windowHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!single) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Single not found. Please check the URL or go back to the discography.
        </p>
      </main>
    );
  }

  const lyrics = singleId ? lyricsData[singleId] || [] : [];

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-100 to-white dark:from-slate-900 dark:to-slate-800">
      <InstructionPopup />
      <Container>
        <div className="max-w-6xl mx-auto py-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Single Cover and Sticky Section Wrapper */}
            <div className="md:sticky md:top-16 md:self-start flex flex-col gap-6 w-full md:w-1/3">
              {/* Back Button - Moved to sticky section */}
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Discography
              </button>
              
              {/* Single Cover with Tilt Effect */}
              <Tilt
                className="aspect-square rounded-lg overflow-hidden shadow-lg"
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                glareEnable={true}
                glareMaxOpacity={0.6}
                glareColor="#ffffff"
                glarePosition="all"
                transitionSpeed={250}
              >
                <Image
                  src={single.coverImage}
                  alt={`Cover of ${single.title}`}
                  fill
                  className="object-cover"
                />
              </Tilt>

              {/* Sticky Info Section */}
              <div
                className="animate-gradient-x backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg p-6 w-full"
                style={{
                  backgroundImage: `linear-gradient(to right, var(--gradient-start), var(--gradient-middle), var(--gradient-end))`,
                }}
              >
                <div
                  className="h-1 rounded"
                  style={{
                    backgroundColor: `var(--progress-bar-color)`,
                    width: `${scrollProgress}%`,
                  }}
                ></div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                  {single.title}
                </h1>
                <p className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                  By Klense
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{single.releaseYear}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{single.duration}</p>
              </div>

              {/* Listen Now Section */}
              <div className="w-full">
                <h2 className="text-xl font-semibold mb-4">Listen Now</h2>
                <div className="grid grid-cols-3 gap-4">
                  {/* Allegory Freestyle */}
                  {single.id === "1" && (
                    <>
                      <a
                        href="https://song.link/allegory-freestyle-klense"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Listen to Allegory Freestyle"
                        className="flex flex-col items-center justify-center p-2 bg-[#1DB954] text-white rounded-md shadow hover:shadow-md hover:scale-105 transition-transform"
                      >
                        <img
                          src="/assets/icons/icons8-spotify.svg"
                          alt="Spotify"
                          className="h-8 w-auto mb-1"
                        />
                        <span className="text-xs font-medium">Spotify</span>
                      </a>
                      <a
                        href="https://song.link/allegory-freestyle-klense"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Listen to Allegory Freestyle"
                        className="flex flex-col items-center justify-center p-2 bg-black text-white rounded-md shadow hover:shadow-md hover:scale-105 transition-transform"
                      >
                        <img
                          src="/assets/icons/icons8-apple-music.svg"
                          alt="Apple Music"
                          className="h-8 w-auto mb-1"
                        />
                        <span className="text-xs font-medium">Apple Music</span>
                      </a>
                      <a
                        href="https://song.link/allegory-freestyle-klense"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Listen to Allegory Freestyle"
                        className="flex flex-col items-center justify-center p-2 bg-[#FF0000] text-white rounded-md shadow hover:shadow-md hover:scale-105 transition-transform"
                      >
                        <img
                          src="/assets/icons/icons8-youtube.svg"
                          alt="YouTube"
                          className="h-8 w-auto mb-1"
                        />
                        <span className="text-xs font-medium">YouTube</span>
                      </a>
                    </>
                  )}

                  {/* Eye Kan */}
                  {single.id === "2" && (
                    <>
                      <a
                        href="https://song.link/eye-kan-klense"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Listen to Eye Kan"
                        className="flex flex-col items-center justify-center p-2 bg-[#1DB954] text-white rounded-md shadow hover:shadow-md hover:scale-105 transition-transform"
                      >
                        <img
                          src="/assets/icons/icons8-spotify.svg"
                          alt="Spotify"
                          className="h-8 w-auto mb-1"
                        />
                        <span className="text-xs font-medium">Spotify</span>
                      </a>
                      <a
                        href="https://song.link/eye-kan-klense"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Listen to Eye Kan"
                        className="flex flex-col items-center justify-center p-2 bg-black text-white rounded-md shadow hover:shadow-md hover:scale-105 transition-transform"
                      >
                        <img
                          src="/assets/icons/icons8-apple-music.svg"
                          alt="Apple Music"
                          className="h-8 w-auto mb-1"
                        />
                        <span className="text-xs font-medium">Apple Music</span>
                      </a>
                      <a
                        href="https://song.link/eye-kan-klense"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Listen to Eye Kan"
                        className="flex flex-col items-center justify-center p-2 bg-[#FF0000] text-white rounded-md shadow hover:shadow-md hover:scale-105 transition-transform"
                      >
                        <img
                          src="/assets/icons/icons8-youtube.svg"
                          alt="YouTube"
                          className="h-8 w-auto mb-1"
                        />
                        <span className="text-xs font-medium">YouTube</span>
                      </a>
                    </>
                  )}

                  {/* First Interlude */}
                  {single.id === "3" && (
                    <>
                      <a
                        href="https://song.link/first-interlude-klense"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Listen to First Interlude"
                        className="flex flex-col items-center justify-center p-2 bg-[#1DB954] text-white rounded-md shadow hover:shadow-md hover:scale-105 transition-transform"
                      >
                        <img
                          src="/assets/icons/icons8-spotify.svg"
                          alt="Spotify"
                          className="h-8 w-auto mb-1"
                        />
                        <span className="text-xs font-medium">Spotify</span>
                      </a>
                      <a
                        href="https://song.link/first-interlude-klense"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Listen to First Interlude"
                        className="flex flex-col items-center justify-center p-2 bg-black text-white rounded-md shadow hover:shadow-md hover:scale-105 transition-transform"
                      >
                        <img
                          src="/assets/icons/icons8-apple-music.svg"
                          alt="Apple Music"
                          className="h-8 w-auto mb-1"
                        />
                        <span className="text-xs font-medium">Apple Music</span>
                      </a>
                      <a
                        href="https://song.link/first-interlude-klense"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Listen to First Interlude"
                        className="flex flex-col items-center justify-center p-2 bg-[#FF0000] text-white rounded-md shadow hover:shadow-md hover:scale-105 transition-transform"
                      >
                        <img
                          src="/assets/icons/icons8-youtube.svg"
                          alt="YouTube"
                          className="h-8 w-auto mb-1"
                        />
                        <span className="text-xs font-medium">YouTube</span>
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Single Details - Right Column */}
            <div className="flex-1 w-full">
              {/* Behind the Single */}
              <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Behind the Single</h2>
                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    <strong>{single.title}</strong> is a bold statement of Klense's artistry, blending intricate wordplay with a hard-hitting beat. This single showcases his ability to balance technical skill with raw emotion.
                  </p>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    The track dives into themes of self-confidence, perseverance, and artistic growth, offering listeners a glimpse into Klense's creative process and personal journey.
                    </p>
                </div>
              </div>

              {/* Lyrics Section */}
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Lyrics</h2>
              <div className="space-y-4">
                {lyrics.map((group, index) => (
                  <div
                    key={index}
                    className={`space-y-2 p-4 rounded-lg transition-all ${
                      selectedLyric === index
                        ? "bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-middle)] to-[var(--gradient-end)] text-[var(--text-primary)] shadow-lg"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setSelectedLyric(selectedLyric === index ? null : index)}
                  >
                    {/* Group of Lines */}
                    <div className="space-y-2">
                      {group.lines.map((line, lineIndex) => (
                        <p
                          key={lineIndex}
                          className={`text-sm sm:text-base font-medium leading-relaxed ${
                            selectedLyric === index
                              ? "text-[var(--text-primary)]"
                              : "text-gray-800 dark:text-gray-200"
                          }`}
                        >
                          {line || <br />}
                        </p>
                      ))}
                    </div>

                    {/* Explanation */}
                    {selectedLyric === index && (
                      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
                        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 italic">
                          {group.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Track Breakdown */}
                <button
                  onClick={() => setSelectedNote(selectedNote === single.id ? null : single.id)}
                  className="mt-6 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition"
                >
                  {selectedNote === single.id ? "Hide Track Breakdown" : "Show Track Breakdown"}
                </button>
                {selectedNote === single.id && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg space-y-4">
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 italic leading-relaxed">
                      <strong>{single.title}</strong> features a production style that blends intricate beats with Klense's signature flow. The instrumental's dynamic bassline and melodic undertones complement the lyrical content perfectly, creating a cohesive listening experience that showcases Klense's growth as an artist.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}