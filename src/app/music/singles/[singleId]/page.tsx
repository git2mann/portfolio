'use client';

import { useParams } from 'next/navigation';
import Container from "@/app/_components/container";
import { singles } from "@/app/music/page"; // Import the Singles data
import { useState, useEffect } from "react";
import InstructionPopup from "@/app/_components/InstructionPopup";
import Image from "next/image";

const lyricsData = {
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
  const { singleId } = useParams();
  const single = singles.find((s) => s.id === singleId);

  const [selectedLyric, setSelectedLyric] = useState<number | null>(null);
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
    return <div>Single not found</div>;
  }

  const lyrics = singleId ? lyricsData[singleId as keyof typeof lyricsData] || [] : [];

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-100 to-white dark:from-slate-900 dark:to-slate-800">
      <InstructionPopup />
      <Container>
        <div className="max-w-6xl mx-auto py-12">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors mb-8"
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

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Single Cover */}
            <div className="relative aspect-square w-full md:w-1/3 rounded-lg overflow-hidden">
              <Image
                src={single.coverImage}
                alt={`Cover of ${single.title}`}
                fill
                className="object-cover"
              />
            </div>

            {/* Single Details */}
            <div className="flex-1">
              {/* Sticky Section */}
              <div
                className="sticky top-20 z-10 animate-gradient-x backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg p-6 mb-8"
                style={{
                  backgroundImage: `linear-gradient(to right, var(--gradient-start), var(--gradient-middle), var(--gradient-end))`,
                }}
              >
                {/* Progress Bar */}
                <div
                  className="h-1 rounded"
                  style={{
                    backgroundColor: `var(--progress-bar-color)`,
                    width: `${scrollProgress}%`,
                  }}
                ></div>

                {/* Title and Details */}
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                  {single.title}
                </h1>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">By Klense</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{single.releaseYear}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{single.duration}</p>
              </div>

              {/* Listen Now Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Listen Now</h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                  {/* Spotify */}
                  <a
                    href={`https://open.spotify.com/track/${single.id}`} // Replace with the actual Spotify link
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Listen on Spotify"
                    className="flex flex-col items-center justify-center p-2 bg-[#1DB954] text-white rounded-md shadow hover:shadow-md hover:scale-105 transition-transform"
                  >
                    <img
                      src="/assets/icons/icons8-spotify.svg" // Path to the Spotify logo
                      alt="Spotify"
                      className="h-8 w-auto mb-1"
                    />
                    <span className="text-xs font-medium">Spotify</span>
                  </a>

                  {/* Apple Music */}
                  <a
                    href={`https://music.apple.com/us/album/${single.id}`} // Replace with the actual Apple Music link
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Listen on Apple Music"
                    className="flex flex-col items-center justify-center p-2 bg-black text-white rounded-md shadow hover:shadow-md hover:scale-105 transition-transform"
                  >
                    <img
                      src="/assets/icons/icons8-apple-music.svg" // Path to the Apple Music logo
                      alt="Apple Music"
                      className="h-8 w-auto mb-1"
                    />
                    <span className="text-xs font-medium">Apple Music</span>
                  </a>

                  {/* YouTube */}
                  <a
                    href={`https://www.youtube.com/results?search_query=${single.title}`} // Replace with the actual YouTube link
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Listen on YouTube"
                    className="flex flex-col items-center justify-center p-2 bg-[#FF0000] text-white rounded-md shadow hover:shadow-md hover:scale-105 transition-transform"
                  >
                    <img
                      src="/assets/icons/icons8-youtube.svg" // Path to the YouTube logo
                      alt="YouTube"
                      className="h-8 w-auto mb-1"
                    />
                    <span className="text-xs font-medium">YouTube</span>
                  </a>
                </div>
              </div>

              {/* Lyrics Section */}
              <h2 className="text-2xl font-semibold mb-4">Lyrics</h2>
              <div className="space-y-8">
                {lyrics.map((group, index) => (
                  <div
                    key={index}
                    className={`space-y-4 p-4 rounded-lg transition-all ${
                      selectedLyric === index
                        ? "bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-blue-100"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setSelectedLyric(selectedLyric === index ? null : index)}
                  >
                    {/* Group of 4 Lines */}
                    <div className="space-y-2">
                      {group.lines.map((line, lineIndex) => (
                        <p key={lineIndex} className="text-sm">
                          {line || <br />}
                        </p>
                      ))}
                    </div>

                    {/* Explanation for the Group */}
                    {selectedLyric === index && (
                      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
                        <p className="text-sm text-gray-700 dark:text-gray-300">{group.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}