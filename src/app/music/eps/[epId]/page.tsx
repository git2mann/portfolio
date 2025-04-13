'use client';

import { useParams } from 'next/navigation';
import Container from "@/app/_components/container";
import { useState, useEffect } from "react";
import InstructionPopup from "@/app/_components/InstructionPopup";
import Image from "next/image";
import Tilt from 'react-parallax-tilt';

const eps = [
  {
    id: "1",
    title: "Some Of Ink",
    coverImage: "/assets/music-assets/Some Of Ink EP Cover.png",
    releaseYear: "2025",
    duration: "7:27",
    songs: [
      {
        id: "1",
        title: "Back Again, Again",
        duration: "2:02",
        lyrics: [
          {
            lines: ["I call this track a queue", "The way you look at back again"],
            explanation: "Wordplay on 'queue' and 'cue', introducing the recurring theme of returning or re-emerging.",
          },
          {
            lines: ["Dan Kuso playin’ Bakugan", "He’s back, look at Drago hand me a championship belt"],
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
            explanation: "Issuing a challenge while observing others play it safe. Also a reference to the 'Trump' card (and cards in general, given how the last few lines are phrased with bluffing/jokers imagery), and the Trump and Biden (Joke/Joe, Bidin'/Biden) presidencies. Triple entendres are pretty nice, eh?",
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
        lyrics: [],
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
  const params = useParams();
  const epId = params?.epId as string | undefined;
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [selectedLyric, setSelectedLyric] = useState<number | null>(null);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
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
        <div className="max-w-6xl mx-auto py-8 pt-0">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* EP Cover with Tilt Effect - Now includes back button */}
            <div className="md:sticky md:top-16 md:self-start flex flex-col gap-6 w-full md:w-1/3">
              {/* Back button moved here */}
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
                  src={ep.coverImage}
                  alt={`Cover of ${ep.title}`}
                  fill
                  className="object-cover"
                />
              </Tilt>
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
                  {ep.title}
                </h1>
                <p className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                  By Klense
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{ep.releaseYear}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{ep.duration}</p>
              </div>
              
              {/* Listen Now Section */}
              <div className="w-full">
                <h2 className="text-xl font-semibold mb-4">Listen Now</h2>
                <div className="grid grid-cols-3 gap-4">
                  {/* Spotify, Apple Music, and YouTube Links */}
                  {ep.id === "1" && (
                    <>
                      <a
                        href="https://album.link/some-of-ink-klense"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Listen to Some Of Ink"
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
                        href="https://album.link/some-of-ink-klense"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Listen to Some Of Ink"
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
                        href="https://album.link/some-of-ink-klense"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Listen to Some Of Ink"
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

            {/* EP Details */}
            <div className="flex-1 w-full">
              {/* Behind the EP */}
              <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Behind the EP</h2>
                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    The <strong>Some Of Ink EP</strong> takes its name from <strong>Son Of Ink</strong>, Klense's debut album. This latest project serves as a reimagining of select tracks from that album, blending the nostalgia of his early work with the growth and evolution he has experienced as an artist.
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    Among the highlights of the EP are reworked versions of <strong>Back Again</strong> (now titled <strong>Back Again, Again</strong>) and <strong>Ultimate</strong> (now titled <strong>Still Ultimate</strong>). These tracks have been meticulously refined to reflect Klense's current style and perspective, while still preserving the essence that made them resonate with listeners in the first place.
                  </p>
                </div>
              </div>

              {/* Tracklist Section */}
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Tracklist</h2>
              <div className="space-y-4">
                {ep.songs.map((song) => (
                  <div key={song.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <button
                      onClick={() => setSelectedTrack(selectedTrack === song.id ? null : song.id)}
                      className="w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
                          {song.title}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 italic">
                          {song.duration}
                        </span>
                      </div>
                    </button>
                    {selectedTrack === song.id && (
                      <div className="mt-4 space-y-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 underline decoration-[var(--gradient-middle)] decoration-2 underline-offset-4">
                          Lyrics
                        </h3>
                        {song.lyrics.length > 0 ? (
                          song.lyrics.map((group, groupIndex) => (
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
                              {selectedLyric === groupIndex && (
                                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
                                  {group.explanation.split("\n").map((line, index) => (
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
                        
                        {/* Track Breakdown - Added to match Album page */}
                        <button
                          onClick={() => {
                            const newSelectedNote = selectedNote === song.id ? null : song.id;
                            setSelectedNote(newSelectedNote);
                          }}
                          className="mt-4 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition"
                        >
                          {selectedNote === song.id ? "Hide Track Breakdown" : "Show Track Breakdown"}
                        </button>
                        {selectedNote === song.id && (
                          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg space-y-4">
                            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 italic leading-relaxed">
                              {ep.id === "1" && song.id === "1" ? (
                                <>
                                  <strong>Back Again, Again</strong> serves as a reimagined version of the original "Back Again" from Klense's debut album. This updated rendition preserves the core energy of the original while introducing new production elements and refined lyrics. The track encapsulates Klense's artistic growth since his early work, demonstrating how his technical abilities have evolved while maintaining his authentic voice.
                                </>
                              ) : ep.id === "1" && song.id === "2" ? (
                                <>
                                  <strong>Still Ultimate</strong> represents a fresh take on one of Klense's fan-favorite tracks. The reworked production creates a more immersive sonic landscape, while the updated lyrics reflect his current perspective. This track particularly showcases Klense's improved vocal delivery and more nuanced approach to wordplay. This track is a reimagining of the original 'Ultimate' from Klense's debut album.
                                </>
                              ) : ep.id === "1" && song.id === "3" ? (
                                <>
                                  <strong>Just Words</strong> is a technical display of lyrical skill at every turn, tapping into the spirit of what made <strong>The Son Of Ink</strong> album so memorable as a start for Klense. The production is busy and intricate, complementing the dense wordplay and showcasing his growth as an artist while staying true to his roots.
                                </>
                              ) : (
                                <>
                                  <strong>{song.title}</strong> is a standout track that highlights Klense's evolution as both a producer and lyricist. The production creates a distinctive atmosphere that enhances the thematic elements, while the vocal performance demonstrates his versatility and technical skill. This track effectively balances nostalgia for his earlier work with his current artistic approach.
                                </>
                              )}
                            </p>
                          </div>
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