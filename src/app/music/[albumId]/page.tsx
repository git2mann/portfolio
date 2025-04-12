'use client';

import { useParams } from 'next/navigation';
import Container from "@/app/_components/container";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import InstructionPopup from "@/app/_components/InstructionPopup";

const albums = [
  {
    id: "1",
    title: "Squealer and the Aggressors of Peace",
    coverImage: "/assets/music-assets/SQUEALER AND THE AGGRESSORS OF PEACE Album Cover.jpeg",
    releaseYear: "2022",
    description: "A concept album that pushes the signature Klense sound further.",
    songs: [
      { id: "1", title: "Saudade In Err (Intro)", duration: "1:17", audioUrl: "/assets/music/sataop-klense-mp3s/Saudade In Err (Intro) - Klense.mp3", lyrics: [] },
      { id: "2", title: "Hummer's Theme", duration: "2:18", audioUrl: "/assets/music/sataop-klense-mp3s/Hummer's Theme - Klense.mp3", lyrics: [] },
      { id: "3", title: "Chop Your Head", duration: "3:17", audioUrl: "/assets/music/sataop-klense-mp3s/Chop Your Head - Klense.mp3", lyrics: [] },
      { id: "4", title: "Roast", duration: "2:51", audioUrl: "/assets/music/sataop-klense-mp3s/Roast - Klense.mp3", lyrics: [
        {
          id: "1",
          lines: [
            "See myself in first place consequently, never shocked",
            "Make the whole world listen to me anytime I drop",
          ],
          explanation: "The artist expresses confidence in always being at the top.",
        },
        {
          id: "2",
          lines: [
            "I swore the day I started this that I would always be a",
            "Thorn in the esophagus of anybody doubtin′ me and tryna diss",
            "And lyrically, tryna counter this back when I made Lazlo",
            "And I blessed you with my countenance"
          ],
          explanation:
            "This section emphasizes unwavering intent: to be a constant problem for doubters. The 'thorn in the esophagus' is an unusual twist on 'thorn in the side', suggesting something literally hard to swallow — a painful truth. 'Lazlo' is a reference to Klense's previous album of the same name.'Blessed you with my countenance' continues fleshing out this reference as the album cover for Lazlo features a digitally painted portrait of Klense's face... his countenance."
        },
        {
          id: "3",
          lines: [
            "I'm in your walls again; neighbours heard 'em bumpin′ this",
            "The fans keep on fallin′ in love, anytime I spit",
            "And oh, I guess when it comes to skill, yours are obelisks",
            "Taller than a hill but abruptly end at points in this"
          ],
          explanation:
            "The 'in your walls' metaphor suggests his music is everywhere — even hidden, hauntingly present. The 'obelisks' metaphor is brilliant wordplay: while tall and imposing, they end sharply, implying that rival skills look impressive but lack depth or longevity. The rhyming structure enhances the dismissiveness of the critique."
        },
        {
          id: "4",
          lines: [
            "Poisonous. I got bars that kill: missile ordnance",
            "Pointed at any target, I just set the coordinates",
            "I call 'em in as many times as needed ′til I'm bored of it",
            "Exhaust the list of MCs feelin′ conceited; morphine drips they—"
          ],
          explanation:
            "This group leans into war metaphors: his lyrics are as dangerous as missile strikes, precision-targeted and relentless. The idea of getting bored of dismantling rappers underscores his dominance. The final line hints at rivals needing sedation — 'morphine drips' — after facing his lyrical assaults."
        },
        {
          id: "5",
          lines: [
            "Roast, tell ′em, tell 'em, roast!\nTell ′em, tell 'em, roast! Tell ′em—\nRoast, tell 'em, tell ′em, roast!\nTell 'em, tell 'em, roast! Tell ′em—\nRoast, tell 'em, tell ′em, roast!\nTell 'em, tell 'em, roast! Tell ′em—\nRoast, tell 'em, tell ′em, roast!\nTell 'em, tell 'em, tell ′em—tell ′em—\nRoast, tell 'em, tell ′em, roast!\nTell 'em, tell ′em, roast! Tell 'em—\nRoast, tell ′em, tell 'em, roast!\nTell 'em, tell ′em, roast! Tell 'em—\nRoast! Tell 'em, tell ′em, roast!\nTell 'em, tell ′em, roast! Tell 'em—\nRoast! Tell ′em, tell 'em roast!\nTell 'em, tell ′em, tell ′em—tell 'em roast!"
          ],
          explanation:
            "The repeated chant functions as both a battle cry and a ritualistic affirmation of lyrical destruction. The word 'Roast' ties into the theme of dismantling opponents with words. Its aggressive repetition builds energy and hypnotic intensity, almost like a crowd chant at a battle or protest."
        },
        {
          id: "6",
          lines: [
            "I've been thinkin', I know that′s somethin′ you don't do",
            "Got my pen and my notebook, and my demos on Pro Tools",
            "Haters woeful ′cause I could kick it old school",
            "I'm beef, you′re tofu keep 'em wonderin′ who's better sit there like"
          ],
          explanation:
            "He contrasts his introspective, creative process with shallow thinking. 'Pen and notebook' shows authenticity; 'Pro Tools' nods to industry standards. 'Kick it old school' emphasizes range, while the 'beef/tofu' bar is a slick diss: he has substance and flavor, others are bland substitutes. It’s clever, dietary and philosophical."
        },
        {
          id: "7",
          lines: [
            "Who used the loose pad to craft tracks that noobs can't produce?",
            "Recluse if they had the full plan, tryna make a copy of me",
            "In order to Stan, Bruce Lee copied on a beat: I call ′em Liu Kangs",
            "And I′m about 'ta mop the competition again"
          ],
          explanation:
            "'Loose pad' implies raw talent — writing without structure yet outclassing others. The recluse line implies that even with his blueprint, imitators can't capture his essence. The Bruce Lee/Liu Kang bar is rich: Liu Kang was modeled after Bruce, so he uses this to diss clones as second-rate versions. 'Mop the competition' is classic flex energy."
        },
        {
          id: "8",
          lines: [
            "Yeah, you may be the one but Imma still be a 10",
            "And Imma keep it a hunnid guaranteed again and again",
            "Again and again; as we begin, this might be intense",
            "I′m never gonna give another MC thought"
          ],
          explanation:
            "This section is about self-worth and consistency. The 'one/ten' line plays with rankings, asserting superiority. 'Keep it a hunnid' blends authenticity and numeric wordplay. 'Again and again' preps listeners for intensity, and the last line is a brutal dismissal of rivals’ relevance."
        },
        {
          id: "9",
          lines: [
            "Put 'em under cover like an empty box",
            "When they tell me, 'Boss you ain′t gettin' hot!'",
            "I rebut that tell ′em when we drop",
            "Compare lyricism and then be shocked"
          ],
          explanation:
            "Putting 'em under cover like an empty box' implies burial without substance — a mock funeral. The next bars reference critics and doubters, with the rebuttal being the release itself. ‘Compare lyricism’ sets up an inevitable loss for any challenger — the shock is both dramatic and humiliating."
        },
        {
          id: "10",
          lines: [
            "Day you beat me's the day I stop",
            "The day I don't speak; hear the crowds still cheer",
            "As I draw near, see ′em when they flock!"
          ],
          explanation:
            "A poetic close that imagines the impossible — being beaten — as a trigger to silence. Yet, even in silence, his legacy and presence command love. The final line uses bird imagery (‘flock’) to illustrate fans drawn to him like a magnetic force."
        }
        ] },
      { id: "5", title: "Salamander Crowd", duration: "2:01", audioUrl: "/assets/music/sataop-klense-mp3s/Salamander Crowd - Klense.mp3", lyrics: [] },
      { id: "6", title: "Me, Myself and I", duration: "2:31", audioUrl: "/assets/music/sataop-klense-mp3s/Me, Myself and I - Klense.mp3", lyrics: [] },
      { id: "7", title: "Help Me Run", duration: "2:50", audioUrl: "/assets/music/sataop-klense-mp3s/Help Me Run - Klense.mp3", lyrics: [] },
      { id: "8", title: "Jungle Law", duration: "2:01", audioUrl: "/assets/music/sataop-klense-mp3s/Jungle Law - Klense.mp3", lyrics: [] },
      { id: "9", title: "Tisa", duration: "3:23", audioUrl: "/assets/music/sataop-klense-mp3s/Tisa - Klense.mp3", lyrics: [] },
      { id: "10", title: "You In Mind", duration: "2:40", audioUrl: "/assets/music/sataop-klense-mp3s/You In Mind - Klense.mp3", lyrics: [] }
    ]
  },
  {
    id: "2",
    title: "Lazlo",
    coverImage: "/assets/music-assets/Lazlo Album Cover (Final).jpeg",
    releaseYear: "2021",
    description: "An introspective journey through soundscapes and storytelling.",
    songs: [
      { id: "1", title: "The Return (Intro)", duration: "0:30", audioUrl: "/assets/music/lazlo-klense-mp3s/The Return (Intro) - Klense.mp3", lyrics: [] },
      { id: "2", title: "Know About", duration: "1:43", audioUrl: "/assets/music/lazlo-klense-mp3s/Know About - Klense.mp3", lyrics: [] },
      { id: "3", title: "General Ike", duration: "2:15", audioUrl: "/assets/music/lazlo-klense-mp3s/General Ike - Klense.mp3", lyrics: [] },
      { id: "4", title: "Me, You (Mii Yu)", duration: "2:25", audioUrl: "/assets/music/lazlo-klense-mp3s/Me, You (Mii Yu) - Klense.mp3", lyrics: [] },
      { id: "5", title: "Lazlo's Camp", duration: "2:35", audioUrl: "/assets/music/lazlo-klense-mp3s/Lazlo's Camp - Klense.mp3", lyrics: [] },
      { id: "6", title: "S a t o r i", duration: "3:25", audioUrl: "/assets/music/lazlo-klense-mp3s/S a t o r i - Klense.mp3", lyrics: [] },
      { id: "7", title: "With U", duration: "3:20", audioUrl: "/assets/music/lazlo-klense-mp3s/With U - Klense.mp3", lyrics: [] },
      { id: "8", title: "Elay-AZ Theme", duration: "1:06", audioUrl: "/assets/music/lazlo-klense-mp3s/Elay-AZ Theme - Klense.mp3", lyrics: [] },
      { id: "9", title: "On Da Fens", duration: "3:20", audioUrl: "/assets/music/lazlo-klense-mp3s/On Da Fens - Klense.mp3", lyrics: [] }
    ]
  },
  {
    id: "3",
    title: "Son Of Ink",
    coverImage: "/assets/music-assets/Son Of Ink Album Cover.jpeg",
    releaseYear: "2021",
    description: "A deep dive into the paradox of chaos and calm in modern life.",
    songs: [
      { id: "1", title: "Back Again", duration: "3:17", audioUrl: "/assets/music/son-of-ink-klense-mp3s/Back Again - Klense.mp3", lyrics: [] },
      { id: "2", title: "Witness (Skit) (feat. Jeremy Olendo)", duration: "0:33", audioUrl: "/assets/music/son-of-ink-klense-mp3s/Witness (skit) (feat. Jeremy Olendo) - Klense.mp3", lyrics: [] },
      { id: "3", title: "Clarity (feat. Prescribed)", duration: "2:41", audioUrl: "/assets/music/son-of-ink-klense-mp3s/Clarity (feat. Prescribed) - Klense.mp3", lyrics: [] },
      { id: "4", title: "Ultimate", duration: "3:48", audioUrl: "/assets/music/son-of-ink-klense-mp3s/Ultimate - Klense.mp3", lyrics: [] },
      { id: "5", title: "Battle", duration: "1:54", audioUrl: "/assets/music/son-of-ink-klense-mp3s/Battle - Klense.mp3", lyrics: [] },
      { id: "6", title: "Something", duration: "3:18", audioUrl: "/assets/music/son-of-ink-klense-mp3s/Something - Klense.mp3", lyrics: [] },
      { id: "7", title: "Lunchtime (Freestyle)", duration: "1:17", audioUrl: "/assets/music/son-of-ink-klense-mp3s/Lunchtime (Freestyle) - Klense.mp3", lyrics: [] },
      { id: "8", title: "Local (Outro)", duration: "1:51", audioUrl: "/assets/music/son-of-ink-klense-mp3s/Local (Outro) - Klense.mp3", lyrics: [] }
    ],
  },
];

export default function AlbumPage() {
  const params = useParams();
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [selectedLyric, setSelectedLyric] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const album = albums.find((a) => a.id === params.albumId);

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

  if (!album) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Album not found. Please check the URL or go back to the discography.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-100 to-white dark:from-slate-900 dark:to-slate-800">
      <InstructionPopup />

      <Container>
        <div className="max-w-6xl mx-auto py-12">
          {/* Back Button */}
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
            {/* Album Cover */}
            <div className="relative w-full md:w-1/3 aspect-square rounded-lg overflow-hidden">
              <Image
                src={album.coverImage}
                alt={`Cover of ${album.title}`}
                fill
                className="object-cover"
              />
            </div>

            {/* Album Details */}
            <div className="flex-1 w-full">
              <div
                className="sticky top-20 z-10 animate-gradient-x backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg p-6 mb-8 w-full"
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
                  {album.title}
                </h1>
                <p className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                  By Klense
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{album.releaseYear}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{album.description}</p>
              </div>

              {/* Tracklist Section */}
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Tracklist</h2>
              <div className="space-y-4 w-full">
                {album.songs.map((song) => (
                  <div key={song.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    {/* Track Title */}
                    <button
                      onClick={() => {
                        setSelectedSong(selectedSong === song.id ? null : song.id);
                        setSelectedLyric(null); // Reset lyric state on track change
                      }}
                      className="w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
                          {song.title}
                        </span>
                        <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400 italic">
                          {song.duration}
                        </span>
                      </div>
                    </button>

                    {/* Lyrics */}
                    {selectedSong === song.id && (
                      <div className="mt-4 space-y-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 underline decoration-[var(--gradient-middle)] decoration-2 underline-offset-4">
                          Lyrics
                        </h3>
                        {song.lyrics?.length > 0 ? (
                          song.lyrics.map((entry, index) => {
                            const isActive = selectedLyric === index;

                            return (
                              <div
                                key={index}
                                className={`space-y-2 p-4 rounded-lg transition-all cursor-pointer ${
                                  isActive
                                    ? "bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-middle)] to-[var(--gradient-end)] text-[var(--text-primary)] shadow-lg"
                                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                }`}
                                onClick={() =>
                                  setSelectedLyric(isActive ? null : index)
                                }
                              >
                                {/* Line Group */}
                                <div className="space-y-2">
                                  {Array.isArray(entry.lines) &&
                                    entry.lines.map((line, i) => (
                                      <p
                                        key={i}
                                        className={`text-sm sm:text-base font-medium leading-relaxed ${
                                          isActive
                                            ? "text-[var(--text-primary)]"
                                            : "text-gray-800 dark:text-gray-200"
                                        }`}
                                      >
                                        {line}
                                      </p>
                                    ))}
                                </div>

                                {/* Explanation */}
                                {isActive && entry.explanation && (
                                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
                                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 italic">
                                      {entry.explanation}
                                    </p>
                                  </div>
                                )}
                              </div>
                            );
                          })
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
