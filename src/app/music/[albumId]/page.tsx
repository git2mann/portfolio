'use client';

import { useParams } from 'next/navigation';
import Container from "@/app/_components/container";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import InstructionPopup from "@/app/_components/InstructionPopup";
import Tilt from "react-parallax-tilt";

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
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const album = params ? albums.find((a) => a.id === params.albumId) : null;

  // Function to calculate total album duration
  const calculateAlbumDuration = (songs: { duration: string }[]) => {
    let totalSeconds = 0;

    songs.forEach((song) => {
      const [minutes, seconds] = song.duration.split(":").map(Number);
      totalSeconds += minutes * 60 + seconds;
    });

    const totalMinutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${totalMinutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const albumDuration = album ? calculateAlbumDuration(album.songs) : "0:00";

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
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Album Cover and Sticky Section Wrapper */}
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
              
              {/* Album Cover */}
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
                  src={album.coverImage}
                  alt={`Cover of ${album.title}`}
                  fill
                  className="object-cover transition-transform duration-300"
                />
              </Tilt>

              {/* Sticky Section */}
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
                  {album.title}
                </h1>
                <p className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                  By Klense
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{album.releaseYear}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{albumDuration}</p>
              </div>
              
              {/* Listen Now Section */}
              <div className="w-full">
                <h2 className="text-xl font-semibold mb-4">Listen Now</h2>
                <div className="grid grid-cols-3 gap-4">
                  {/* Spotify */}
                  <a
                    href={`https://open.spotify.com/album/${album.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Listen on Spotify"
                    className="flex flex-col items-center justify-center p-2 bg-[#1DB954] text-white rounded-md shadow hover:shadow-md hover:scale-105 transition-transform"
                  >
                    <img
                      src="/assets/icons/icons8-spotify.svg"
                      alt="Spotify"
                      className="h-8 w-auto mb-1"
                    />
                    <span className="text-xs font-medium">Spotify</span>
                  </a>

                  {/* Apple Music */}
                  <a
                    href={`https://music.apple.com/us/album/${album.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Listen on Apple Music"
                    className="flex flex-col items-center justify-center p-2 bg-black text-white rounded-md shadow hover:shadow-md hover:scale-105 transition-transform"
                  >
                    <img
                      src="/assets/icons/icons8-apple-music.svg"
                      alt="Apple Music"
                      className="h-8 w-auto mb-1"
                    />
                    <span className="text-xs font-medium">Apple Music</span>
                  </a>

                  {/* YouTube */}
                  <a
                    href={`https://www.youtube.com/results?search_query=Klense+${album.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Listen on YouTube"
                    className="flex flex-col items-center justify-center p-2 bg-[#FF0000] text-white rounded-md shadow hover:shadow-md hover:scale-105 transition-transform"
                  >
                    <img
                      src="/assets/icons/icons8-youtube.svg"
                      alt="YouTube"
                      className="h-8 w-auto mb-1"
                    />
                    <span className="text-xs font-medium">YouTube</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Album Details */}
            <div className="flex-1 w-full">
              {/* Behind the Album */}
              <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Behind the Album</h2>
                <div className="space-y-4">
                  {album.id === "squealer" ? (
                    <>
                      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                        <strong>Squealer and the Aggressors of Peace</strong> draws heavy inspiration from George Orwell's <strong>Animal Farm</strong>, using its themes of manipulation, power, and rebellion as a foundation for its narrative. The album explores these ideas through Klense's unique lens, blending storytelling with sharp lyricism.
                      </p>
                      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                        This project also marks Klense's first fully-fledged attempt at producing as much of the album on his own as possible. This hands-on approach explains the album's unified production style, which simultaneously offers a wide variety of sounds. From tracks with a traditional hip-hop feel to songs that lean into grunge, rock, and even pop, the album showcases Klense's versatility and willingness to experiment.
                      </p>
                      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                        With its mix of bold storytelling, intricate production, and genre-defying tracks, <strong>Squealer and the Aggressors of Peace</strong> stands as a testament to Klense's growth as an artist and producer. It's an ambitious project that pushes the boundaries of his signature sound while staying true to his roots.
                      </p>
                      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                        The album also hints at what's to come from Klense, teasing the ever-present evolution of his style. As he continues to explore new sounds and refine his craft, <strong>Squealer and the Aggressors of Peace</strong> serves as both a milestone and a stepping stone in his artistic journey.
                      </p>
                    </>
                  ) : album.id === "son-of-ink" ? (
                    <>
                      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                        <strong>Son of Ink</strong> marks Klense's debut full-length album, a project that established the foundation of his artistic voice. The album serves as both an introduction and a statement of purpose, blending introspective lyricism with experimental production choices that would define his early sound.
                      </p>
                      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                        Throughout the project, Klense explores themes of creative identity, personal growth, and artistic independence. The narrative arc of the album follows a journey of self-discovery, with each track building upon the last to create a cohesive listening experience that rewards multiple revisits.
                      </p>
                      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                        Production-wise, <strong>Son of Ink</strong> features a deliberate contrast between nostalgic boom-bap influences and forward-thinking sound design. This duality reflects Klense's respect for hip-hop's foundations while showcasing his desire to push boundaries and carve out his own unique space in the genre.
                      </p>
                      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                        The album's title itself represents the relationship between creativity ("ink") and legacy ("son of"), themes that recur throughout Klense's discography. Many tracks from this project would later be revisited and reimagined in the <strong>Some of Ink EP</strong>, demonstrating how these early works continue to influence his artistic development.
                      </p>
                    </>
                  ) : album.id === "klense-ology" ? (
                    <>
                      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                        <strong>Klense-ology</strong> represents a conceptual turning point in Klense's discography, diving deep into the psychology and philosophy behind his artistic approach. The album serves as both a reflection on his creative journey and an exploration of the methodologies that drive his work.
                      </p>
                      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                        Sonically, this project showcases a more refined production aesthetic, with Klense experimenting with complex arrangements and unconventional sampling techniques. The beats provide a perfect backdrop for the album's lyrical density, creating layers that reveal new details with each listen.
                      </p>
                      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                        Thematically, <strong>Klense-ology</strong> examines the intersection of personal experience and artistic expression, questioning how memories and observations transform into creative output. Throughout the album, Klense plays with narrative perspective, sometimes speaking directly from his own experiences and other times adopting personas to explore different viewpoints.
                      </p>
                      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                        The project stands as one of Klense's most cohesive bodies of work, with interconnected themes and motifs that weave throughout the tracklist. From the opening track to the finale, there's a deliberate progression that invites listeners to engage with the album as a complete artistic statement rather than a collection of individual songs.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                        <strong>{album.title}</strong> captures a distinct moment in Klense's artistic evolution, showcasing his growth as both a lyricist and producer. The album balances experimental elements with accessible songwriting, creating a body of work that appeals to longtime fans while welcoming new listeners.
                      </p>
                      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                        Throughout this project, Klense explores themes of perception, authenticity, and creative expression. The production features a diverse range of influences, from classic hip-hop to elements of electronic music and live instrumentation, all unified by Klense's distinctive approach to sound design.
                      </p>
                      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                        Each track on <strong>{album.title}</strong> contributes to the larger narrative while maintaining its own unique identity. The sequencing creates a deliberate flow that enhances the thematic elements, encouraging listeners to experience the album in its entirety rather than as isolated songs.
                      </p>
                      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                        This album represents an important chapter in Klense's discography, both building upon his established sound and pointing toward new directions in his artistic journey. The project showcases his willingness to evolve while remaining true to the core elements that define his unique voice in contemporary music.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Tracklist Section */}
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Tracklist</h2>
              <div className="space-y-4 w-full">
                {album.songs.map((song) => (
                  <div key={song.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    {/* Track Title */}
                    <button
                      onClick={() => setSelectedTrack(selectedTrack === song.id ? null : song.id)}
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

                    {/* Lyrics Section */}
                    {selectedTrack === song.id && (
                      <div className="mt-4 space-y-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 underline decoration-[var(--gradient-middle)] decoration-2 underline-offset-4">
                          Lyrics
                        </h3>
                        {song.lyrics?.length > 0 ? (
                          song.lyrics.map((entry, index) => (
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
                                {entry.lines.map((line, lineIndex) => (
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
                                    {entry.explanation}
                                  </p>
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500 italic">Lyrics not available.</p>
                        )}

                        {/* Track Breakdown */}
                        <button
                          onClick={() => setSelectedNote(selectedNote === song.id ? null : song.id)}
                          className="mt-4 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition"
                        >
                          {selectedNote === song.id ? "Hide Track Breakdown" : "Show Track Breakdown"}
                        </button>
                        {selectedNote === song.id && (
                          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg space-y-4">
                            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 italic leading-relaxed">
                              {album.id === "squealer" && song.id === "1" ? (
                                <>
                                  <strong>{song.title}</strong> serves as the opening track for the album, introducing the central characters and establishing the allegorical framework. The production features atmospheric elements that create tension while Klense's lyrics set the stage for the narrative to unfold. This track is crucial for understanding the conceptual foundation of the entire project.
                                </>
                              ) : album.id === "squealer" && song.id === "2" ? (
                                <>
                                  <strong>{song.title}</strong> delves deeper into the power dynamics between the album's characters, focusing on manipulation and control. The track showcases some of Klense's most pointed lyrics, delivered over a haunting beat that enhances the thematic elements. The song's structure mirrors the gradual escalation of conflict within the narrative.
                                </>
                              ) : album.id === "son-of-ink" && song.id === "1" ? (
                                <>
                                  <strong>{song.title}</strong> opens Klense's debut album with confidence and purpose, establishing both his technical abilities and artistic perspective. The production balances classic hip-hop elements with subtle innovations, creating a sound that feels both familiar and fresh. Lyrically, the track introduces recurring themes of creative identity and artistic authenticity.
                                </>
                              ) : album.id === "son-of-ink" && song.id === "2" ? (
                                <>
                                  <strong>{song.title}</strong> showcases Klense's narrative abilities through vivid imagery and detailed storytelling. The track features one of the album's most memorable hooks, anchoring its complex verses with an accessible refrain. Production-wise, the song employs shifting dynamics to emphasize key moments in the lyrical progression.
                                </>
                              ) : album.id === "klense-ology" && song.id === "1" ? (
                                <>
                                  <strong>{song.title}</strong> introduces the album's conceptual framework through intricate wordplay and philosophical references. The production features layered samples and unexpected transitions, reflecting the song's exploration of how perception shapes reality. This opening track establishes both the sonic palette and thematic territory of the entire project.
                                </>
                              ) : album.id === "klense-ology" && song.id === "2" ? (
                                <>
                                  <strong>{song.title}</strong> delves into the creative process itself, examining how experiences transform into artistic expression. The production incorporates elements of jazz and electronic music, creating an evolving soundscape that mirrors the track's lyrical complexity. This song represents one of the album's most technically ambitious moments.
                                </>
                              ) : (
                                <>
                                  <strong>{song.title}</strong> stands as a highlight within the album, showcasing Klense's ability to balance technical skill with emotional resonance. The production creates a distinctive atmosphere that enhances the lyrical themes, while the vocal performance demonstrates his versatility as both a writer and performer. This track encapsulates the album's overall aesthetic while maintaining its own unique identity.
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