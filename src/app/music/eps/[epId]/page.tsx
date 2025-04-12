'use client';

import { useParams } from 'next/navigation';
import Container from "@/app/_components/container";
import { useState, useEffect } from "react";
import InstructionPopup from "@/app/_components/InstructionPopup";
import Image from "next/image";

const eps = [
  {
    id: "1",
    title: "Some Of Ink",
    coverImage: "/assets/music-assets/Some Of Ink EP Cover.png",
    releaseYear: "2025",
    duration: "7:27",
    tracks: [
      {
        id: "1",
        title: "Back Again, Again",
        duration: "2:02",
        lyrics: [
          {
            lines: [
              "I call this track a queue",
              "The way you look at back again",
            ],
            explanation: "Wordplay on 'queue' and 'cue', introducing the recurring theme of returning or re-emerging.",
          },
          {
            lines: [
              "Dan Kuso playin’ Bakugan",
              "He’s back, look at Drago hand me a championship belt",
              "The Son Of Ink,",
              "How many guessed",
            ],
            explanation: "Referencing childhood heroism and fantasy (Bakugan) to build a persona of comeback and earned recognition.",
          },
          {
            lines: [
              "He came to go ham",
              "When he said",
              "That Somno the rapper has slept?",
            ],
            explanation: "Suggests being underestimated and now returning with full force.\nOriginally, Leon's stage name was Somno (early 2019). This was before coming up with the moniker Klense as a play on the word 'cleanse', and his own initials.",
          },
          {
            lines: [
              "No braggadocio",
              "This rollercoaster",
              "Is s’posed to",
              "Put me where I’m s’posed to be",
            ],
            explanation: "Acknowledges the ups and downs of the journey, with faith in eventual purpose.",
          },
          {
            lines: [
              "On top",
              "Like receipts buyin’ groceries",
              "Own beats",
              "And hold up a feat.",
            ],
            explanation: "A clever metaphor for dominance and independence in music.",
          },
          {
            lines: [
              "Boy I don’t go to sleep",
              "I know that we already did this",
              "But I don’t wanna leave",
            ],
            explanation: "Persistence despite repetition — a refusal to quit.",
          },
          {
            lines: [
              "Goin’ back to my roots",
              "The reason I started rappin’",
              "When Covid made me recluse",
              "But maybe that’s not the truth",
            ],
            explanation: "Introspective moment tracing the origins of the creative journey.",
          },
          {
            lines: [
              "The reason I’m in this booth:",
              "To grab a hold of another beat",
              "Just to snap it in two",
              "A natural, In fact,",
            ],
            explanation: "Driven by the need to create and destroy tracks effortlessly — a born talent.",
          },
          {
            lines: [
              "An animal on tracks",
              "Harambe silverback",
              "And havin’ to get past",
              "Any opposition",
            ],
            explanation: "Drawing primal strength and determination from iconic imagery (Harambe).",
          },
          {
            lines: [
              "That’s hangin’ on my back",
              "I’m angered and I can’t",
              "Be flattered when I rap",
              "Part of me thinks",
            ],
            explanation: "Burdened by critics and self-doubt, yet pushing forward.",
          },
          {
            lines: [
              "That it’s all gon’ sound as bad",
              "As rappers tryna challenge that",
            ],
            explanation: "Still fears mediocrity, but confident it won’t be worse than weak opposition.",
          },
          {
            lines: [
              "and then I be up",
              "They seein’ me",
              "Seein’ Leon",
              "Like Bruce,",
            ],
            explanation: "Sudden rise and visibility, likening himself to Bruce Lee — iconic and sharp.",
          },
          {
            lines: [
              "Kick n’ snarin’ ‘em easy",
              "Made a truce, hear ‘em still speak",
            ],
            explanation: "Mastery over rhythm and opponents, even in peace they acknowledge his prowess.",
          },
          {
            lines: [
              "And it’s been a long time",
              "Since I saw myself",
              "In the frontlines",
              "So I front lines",
            ],
            explanation: "Long absence from prominence, but ready to take charge again.",
          },
          {
            lines: [
              "And dare anyone to trump mine",
              "Seein’ while they joke, bidin’ time",
            ],
            explanation: "Issuing a challenge while observing others play it safe.",
          },
          {
            lines: [
              "At home, writin’ lines",
              "And oh, I don’t mind",
              "I’m fine",
              "Been a long time",
            ],
            explanation: "Finding peace in solitude and dedication to the craft.",
          },
          {
            lines: [
              "Now I wind your minds so tight",
              "You could have lines that divide!",
            ],
            explanation: "Wordplay on intricate lyricism that causes division or provokes thought.",
          },
          {
            lines: [
              "I hear the engine go on and on again",
              "So intricate, I’d be honoured if",
              "I could get to it",
              "Climbin’ on the fence",
            ],
            explanation: "Motif of persistent ambition and seeking entrance into greatness.",
          },
          {
            lines: [
              "To be on da fens",
              "Defensive when I make it on, I guess",
              "Super slow, U-N-O",
              "Golf again",
            ],
            explanation: "Wordplay continues with indecision, caution, and unexpected metaphors.",
          },
          {
            lines: [
              "Or sumo, they been waitin’ on me then",
              "Scale see me break it",
              "I’m Kong, Godzilla",
              "And long been wantin’",
            ],
            explanation: "Massive presence being held back, now ready to erupt.",
          },
          {
            lines: [
              "To stomp again",
              "Blockin’ ‘em",
              "From the first place",
              "In the first place",
            ],
            explanation: "Dominance and return to rightful position at the top.",
          },
          {
            lines: [
              "That right there got ‘em at loggerheads",
              "Make ‘em feel they lost their edge",
              "Lookin’ like sausages",
              "Stuck on a skewer",
            ],
            explanation: "Opponents appear ridiculous and confused in comparison.",
          },
          {
            lines: [
              "Rotisserie’d and served with some omelettes",
              "That I just had to get off my chest",
              "I stay up rackin’ up records",
              "I’m backin’ ‘em back in a corner",
            ],
            explanation: "Unloading built-up bars and pushing back competition.",
          },
          {
            lines: [
              "And wrapped in a sorta",
              "Mish-mash of the flora and fauna",
              "Imported in August",
              "I’m givin’ the orders",
            ],
            explanation: "Eclectic, artistic authority that stands out from the ordinary.",
          },
          {
            lines: [
              "Obsessive Compulsive Disorder",
              "When I’m takin’ beats",
              "And I vow to destroy ‘em",
              "Powder keg goin’ off",
            ],
            explanation: "Explosive precision in attacking beats, driven by obsession.",
          },
          {
            lines: [
              "I’m never goin’ soft",
              "Raisin’ the bar like I pilot a Boeing, y’all borin’ ahhh!",
            ],
            explanation: "Refuses to compromise quality, elevating above a dull crowd.",
          },
          {
            lines: [
              "(MCs you cannot feel)",
              "Yeah (Yeah)",
              "Yeah (Yeah)",
              "(MCs you cannot feel)",
            ],
            explanation: "Mocking emotionless or uninspired MCs.",
          },
          {
            lines: [
              "Yeah, yeah (Yeah, yeah)",
              "Yeah (Yeah)",
              "(MCs you cannot feel)",
              "I’m back (I’m back)",
            ],
            explanation: "Reaffirmation of return with disdain for unfeeling rappers.",
          },
        ],
      },
      {
        id: "2",
        title: "Still Ultimate",
        duration: "2:49",
        lyrics: [
          {
            lines: ["Still the ultimate, no debate"],
            explanation: "Klense asserts their dominance in the music industry.",
          },
        ],
      },
      {
        id: "3",
        title: "Just Words",
        duration: "2:36",
        lyrics: [],
      },
    ],
  },
];

export default function EPPage() {
  const { epId } = useParams();
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [selectedLyric, setSelectedLyric] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const ep = eps.find((e) => e.id === epId);

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

  if (!ep) {
    return <div>EP not found</div>;
  }

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
            {/* EP Cover */}
            <div className="relative aspect-square w-full md:w-1/3 rounded-lg overflow-hidden">
              <Image
                src={ep.coverImage}
                alt={`Cover of ${ep.title}`}
                fill
                className="object-cover"
              />
            </div>

            {/* EP Details */}
            <div className="flex-1 w-full">
              {/* Sticky Section */}
              <div
                className="sticky top-20 z-10 animate-gradient-x backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg p-6 mb-8 w-full"
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
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                  {ep.title}
                </h1>
                <p className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                  By Klense
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{ep.releaseYear}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{ep.duration}</p>
              </div>

              {/* Tracklist Section */}
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Tracklist</h2>
              <div className="space-y-4 w-full">
                {ep.tracks.map((track) => (
                  <div key={track.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    {/* Track Title */}
                    <button
                      onClick={() => setSelectedTrack(selectedTrack === track.id ? null : track.id)}
                      className="w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
                          {track.title}
                        </span>
                        <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400 italic">
                          {track.duration}
                        </span>
                      </div>
                    </button>
                    
                    {/* Lyrics Section */}
                    {selectedTrack === track.id && (
                      <div className="mt-4 space-y-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 underline decoration-[var(--gradient-middle)] decoration-2 underline-offset-4">
                          Lyrics
                        </h3>
                        {track.lyrics.length > 0 ? (
                          track.lyrics.map((group, groupIndex) => (
                            <div
                              key={groupIndex}
                              className={`space-y-2 p-4 rounded-lg transition-all ${
                                selectedLyric === groupIndex
                                  ? "bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-middle)] to-[var(--gradient-end)] text-[var(--text-primary)] shadow-lg"
                                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
                              }`}
                              onClick={() =>
                                setSelectedLyric(selectedLyric === groupIndex ? null : groupIndex)
                              }
                            >
                              {/* Group of Lines */}
                              <div className="space-y-2">
                                {group.lines.map((line, lineIndex) => (
                                  <p
                                    key={lineIndex}
                                    className={`text-sm sm:text-base font-medium leading-relaxed ${
                                      selectedLyric === groupIndex
                                        ? "text-[var(--text-primary)]"
                                        : "text-gray-800 dark:text-gray-200"
                                    }`}
                                  >
                                    {line || <br />}
                                  </p>
                                ))}
                              </div>

                              {/* Explanation */}
                              {selectedLyric === groupIndex && (
                                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
                                  {group.explanation.split('\n').map((line, index) => (
                                    <p
                                      key={index}
                                      className="text-sm sm:text-base text-gray-700 dark:text-gray-300 italic leading-relaxed"
                                    >
                                      {line}
                                    </p>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500 italic">Lyrics not available.</p>
                        )}
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