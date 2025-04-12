'use client';

import { useParams } from 'next/navigation';
import Container from "@/app/_components/container";

import { Album } from "@/interfaces/music";
import { useState } from 'react';
import Image from 'next/image';
import InstructionPopup from "@/app/_components/InstructionPopup";

const albums: Album[] = [
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
            text: "See myself in first place consequently, never shocked",
            explanation: "The artist expresses confidence in always being at the top, unshaken by challenges."
          },
          {
            id: "2",
            text: "Make the whole world listen to me anytime I drop, what you got?",
            explanation: "A rhetorical challenge to competitors, emphasizing the artist's global influence."
          },
          {
            id: "3",
            text: "A couple feature verses that nobody even heard in",
            explanation: "A jab at other artists whose collaborations fail to gain attention."
          },
          {
            id: "4",
            text: "A wack attempt at bein′ me, homie, just keep on learnin'",
            explanation: "Criticism of imitators who fail to match the artist's originality."
          },
          {
            id: "5",
            text: "I swore the day I started this that I would always be a",
            explanation: "A declaration of commitment to being a disruptive force in the industry."
          },
          {
            id: "6",
            text: "Thorn in the esophagus of anybody doubtin′ me and tryna diss",
            explanation: "A vivid metaphor for being a persistent and painful challenge to critics."
          },
          {
            id: "7",
            text: "And lyrically, tryna counter this back when I made Lazlo",
            explanation: "A reference to the artist's earlier work, showcasing their lyrical dominance."
          },
          {
            id: "8",
            text: "And I blessed you with my countenance",
            explanation: "A boast about the artist's presence and influence being a gift to the audience."
          },
          {
            id: "9",
            text: "I'm in your walls again; neighbours heard 'em bumpin′ this",
            explanation: "A metaphor for the artist's pervasive impact, with their music being played everywhere."
          },
          {
            id: "10",
            text: "The fans keep on fallin′ in love, anytime I spit",
            explanation: "A nod to the artist's loyal fanbase and their consistent admiration."
          },
          {
            id: "11",
            text: "And oh, I guess when it comes to skill, yours are obelisks",
            explanation: "A clever comparison of others' skills to obelisks: tall but ending abruptly."
          },
          {
            id: "12",
            text: "Taller than a hill but abruptly end at points in this",
            explanation: "A continuation of the obelisk metaphor, highlighting the limitations of others' abilities."
          },
          {
            id: "13",
            text: "Poisonous. I got bars that kill: missile ordnance",
            explanation: "A metaphor comparing the artist's impactful lyrics to deadly weapons."
          },
          {
            id: "14",
            text: "Pointed at any target, I just set the coordinates",
            explanation: "A statement of precision and intent in delivering lyrical attacks."
          },
          {
            id: "15",
            text: "I call 'em in as many times as needed ′til I'm bored of it",
            explanation: "A display of dominance, suggesting the artist can outlast any competition."
          },
          {
            id: "16",
            text: "Exhaust the list of MCs feelin′ conceited; morphine drips they-",
            explanation: "A cutting remark about humbling arrogant rappers, leaving them metaphorically sedated."
          },
          {
            "id": "17",
            "text": "Roast, tell ′em, tell 'em, roast!\nTell ′em, tell 'em, roast! Tell ′em—\nRoast, tell 'em, tell ′em, roast!\nTell 'em, tell 'em, roast! Tell ′em—\nRoast, tell 'em, tell ′em, roast!\nTell 'em, tell 'em, roast! Tell ′em—\nRoast, tell 'em, tell ′em, roast!\nTell 'em, tell 'em, tell ′em—tell ′em—\nRoast, tell 'em, tell ′em, roast!\nTell 'em, tell ′em, roast! Tell 'em—\nRoast, tell ′em, tell 'em, roast!\nTell 'em, tell ′em, roast! Tell 'em—\nRoast! Tell 'em, tell ′em, roast!\nTell 'em, tell ′em, roast! Tell 'em—\nRoast! Tell ′em, tell 'em roast!\nTell 'em, tell ′em, tell ′em—tell 'em roast!",
            "explanation": "The hook emphasizes the theme of 'roasting' or lyrically dismantling opponents, serving as a rallying cry for the artist's confidence and dominance."
          },          
          {
            id: "18",
            text: "I've been thinkin', I know that′s somethin′ you don't do",
            explanation: "A jab at competitors, implying they lack the introspection or creativity the artist possesses."
          },
          {
            id: "19",
            text: "Got my pen and my notebook, and my demos on Pro Tools",
            explanation: "A reference to the artist's dedication to their craft and use of professional tools to create music."
          },
          {
            id: "20",
            text: "Haters woeful ′cause I could kick it old school",
            explanation: "The artist highlights their versatility, being able to excel in both modern and traditional styles of rap."
          },
          {
            id: "21",
            text: "I'm beef, you′re tofu keep 'em wonderin′ who's better sit there like",
            explanation: "A clever wordplay contrasting the artist's substance ('beef') with their competitors' lack of it ('tofu')."
          },
          {
            id: "22",
            text: "Who used the loose pad to craft tracks that noobs can't produce?",
            explanation: "A rhetorical question emphasizing the artist's superior skill in creating music."
          },
          {
            id: "23",
            text: "Recluse if they had the full plan, tryna make a copy of me",
            explanation: "A critique of imitators who fail to replicate the artist's originality, even with a blueprint."
          },
          {
            id: "24",
            text: "In order to Stan, Bruce Lee copied on a beat: I call ′em Liu Kangs",
            explanation: "A reference to Bruce Lee and Liu Kang, comparing imitators to martial artists trying to emulate greatness."
          },
          {
            id: "25",
            text: "And I′m about 'ta mop the competition again",
            explanation: "A declaration of the artist's intent to dominate their rivals once more."
          },
          {
            id: "26",
            text: "Yeah, you may be the one but Imma still be a 10",
            explanation: "A clever play on numbers, asserting the artist's superiority over their competitors."
          },
          {
            id: "27",
            text: "And Imma keep it a hunnid guaranteed again and again",
            explanation: "A promise to maintain authenticity and excellence repeatedly."
          },
          {
            id: "28",
            text: "Again and again; as we begin, this might be intense",
            explanation: "A warning that the artist's performance will be powerful and impactful."
          },
          {
            id: "29",
            text: "I′m never gonna give another MC thought",
            explanation: "A dismissal of competitors, indicating they are not worth the artist's attention."
          },
          {
            id: "30",
            text: "Put 'em under cover like an empty box",
            explanation: "A metaphor for rendering rivals irrelevant or insignificant."
          },
          {
            id: "31",
            text: "When they tell me, 'Boss you ain′t gettin' hot!'",
            explanation: "A reference to critics doubting the artist's success or relevance."
          },
          {
            id: "32",
            text: "I rebut that tell ′em when we drop",
            explanation: "A confident response, asserting that the artist's work will prove the critics wrong."
          },
          {
            id: "33",
            text: "Compare lyricism and then be shocked",
            explanation: "A challenge to compare lyrical abilities, with the expectation that the artist will come out on top."
          },
          {
            id: "34",
            text: "Day you beat me's the day I stop",
            explanation: "A bold claim that the artist will only quit if they are ever defeated, implying it will never happen."
          },
          {
            id: "35",
            text: "The day I don't speak; hear the crowds still cheer",
            explanation: "A statement of the artist's enduring popularity, even in silence."
          },
          {
            id: "36",
            text: "As I draw near, see ′em when they flock!",
            explanation: "A vivid image of fans gathering around the artist, showcasing their magnetic presence."
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
    ]
  }
];

export default function AlbumPage() {
  const params = useParams();
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [selectedLyric, setSelectedLyric] = useState<string | null>(null);

  const album = albums.find((a) => a.id === params.albumId);

  if (!album) {
    return <div>Album not found</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-100 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Instruction Popup */}
      <InstructionPopup />

      {/* Page Content Wrapper */}
      <div>
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
              Back to Albums
            </button>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="relative w-full md:w-96 aspect-square">
                <Image
                  src={album.coverImage}
                  alt={album.title}
                  fill
                  className="object-cover rounded-lg shadow-xl"
                  sizes="(max-width: 768px) 100vw, 384px"
                />
              </div>

              <div className="flex-1" onClick={(e) => e.stopPropagation()}>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{album.title}</h1>
                <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-6">{album.releaseYear}</p>
                <p className="text-lg mb-8">{album.description}</p>

                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">Tracks</h2>
                  {album.songs.map((song) => (
                    <div
                      key={song.id}
                      className={`border-b border-neutral-200 dark:border-neutral-700 last:border-0 ${
                        selectedSong === song.id ? "bg-neutral-100 dark:bg-slate-700" : ""
                      }`}
                    >
                      <button
                        onClick={() => setSelectedSong(selectedSong === song.id ? null : song.id)}
                        className="w-full py-4 px-6 text-left hover:bg-neutral-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg">{song.title}</span>
                          <span className="text-sm text-neutral-500">{song.duration}</span>
                        </div>
                      </button>

                      {selectedSong === song.id && (
                        <div
                          className="p-6 bg-neutral-50 dark:bg-slate-800 rounded-lg mb-4 flex flex-col md:flex-row gap-6"
                          onClick={(e) => e.stopPropagation()} // Prevent resetting when clicking inside the lyrics or sidebar
                        >
                          {/* Lyrics Section */}
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-neutral-200">Lyrics</h3>
                            {song.lyrics.length > 0 ? (
                              <div className="space-y-4">
                                {song.lyrics.map((line) => (
                                  <div
                                    key={line.id}
                                    className="group relative flex items-start gap-4"
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent resetting when clicking on a lyric

                                      
                                      if (selectedLyric === line.explanation) {
                                        setSelectedLyric(null); // Deselect if the same
                                      } else {
                                        setSelectedLyric(line.explanation || null); // Always switch
                                      }                                      
                                    }}
                                  >
                                    <p
                                      id={`lyric-${line.id}`} // Add an ID for each lyric
                                      className={`leading-relaxed ${
                                        selectedLyric === line.explanation
                                          ? "bg-primary-light dark:bg-primary-dark text-accent-7 px-2 py-1 rounded cursor-pointer shadow-highlight"
                                          : line.explanation
                                          ? "bg-secondary-light dark:bg-secondary-dark text-accent-7 px-2 py-1 rounded cursor-pointer"
                                          : "text-neutral-700 dark:text-neutral-300"
                                      }`}
                                    >
                                      {line.text}
                                    </p>
                                    {selectedLyric === line.explanation && (
                                      <div className="bg-neutral-50 dark:bg-slate-800 p-4 rounded-lg shadow-lg">
                                        <p className="text-neutral-800 dark:text-neutral-100">{line.explanation}</p>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-neutral-500 dark:text-neutral-400 italic">
                                Lyrics not available for this track.
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
}
