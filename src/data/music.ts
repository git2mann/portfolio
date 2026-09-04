import { albumLyrics } from '@/data/lyrics/albums';
import { epLyrics } from '@/data/lyrics/eps';
import { singleLyrics } from '@/data/lyrics/singles';
import type { Album, Song } from '@/interfaces/music';

const rawAlbums: Album[] = [
  {
    id: "4",
    title: "Half Thoughts",
    coverImage: "/assets/music-assets/HalfThoughts1Cover.webp",
    typefaceImage: "/assets/music-assets/Portfolio Music Typefaces/Half Thoughts Text.svg",
    releaseYear: "2025",
    description: "My monument to the long unsaid. I focused on the heavy mental weight of my own fragments, my missed connections, and the things I left hanging in the air when I could not find the words. This project is me embracing the static of my own incompletion, proving that the silent spaces and half-formed ideas I keep hidden carry the most brutal weight of all.",
    songs: [
      { id: "1", title: "The Evening Dispatch!", duration: "2:05", audioUrl: "", lyrics: [] },
      { id: "2", title: "Saxophone", duration: "2:05", audioUrl: "", lyrics: [] },
      { id: "3", title: "Oze II", duration: "2:09", audioUrl: "", lyrics: [] },
      { id: "4", title: "Oze", duration: "2:19", audioUrl: "", lyrics: [] },
      { id: "5", title: "Wish Ya Told Me!", duration: "1:33", audioUrl: "", lyrics: [] },
      { id: "6", title: "Intermission IV", duration: "2:11", audioUrl: "", lyrics: [] },
      { id: "7", title: "You Are The Reason", duration: "1:53", audioUrl: "", lyrics: [] },
      { id: "8", title: "Blue Salmon", duration: "1:18", audioUrl: "", lyrics: [] },
      { id: "9", title: "Deglupta", duration: "1:37", audioUrl: "", lyrics: [] },
      { id: "10", title: "Kept You Waiting", duration: "1:36", audioUrl: "", lyrics: [] },
      { id: "11", title: "Karl Draisack", duration: "2:37", audioUrl: "", lyrics: [] },
      { id: "12", title: "Forbo", duration: "1:57", audioUrl: "", lyrics: [] },
      { id: "13", title: "Garble Surmount", duration: "2:33", audioUrl: "", lyrics: [] },
      { id: "14", title: "Impromptu", duration: "3:05", audioUrl: "", lyrics: [] },
      { id: "15", title: "Addis Abeba", duration: "2:42", audioUrl: "", lyrics: [] },
      { id: "16", title: "Abide by Klense", duration: "2:03", audioUrl: "", lyrics: [] },
    ],
  },
  {
    id: "1",
    title: "Squealer and the Aggressors of Peace",
    coverImage: "/assets/music-assets/SQUEALER AND THE AGGRESSORS OF PEACE Album Cover.webp",
    typefaceImage: "/assets/music-assets/Portfolio Music Typefaces/Sataop Text.svg",
    releaseYear: "2022",
    description: "My first concept album. A high-pressure confrontation with systemic control and personal conflict. I dissect the violent hypocrisy of institutional peace and the quiet, heavy rage many have no choice but to accept. The album is a personal pressure cooker, mapping the moment where passive endurance starts to sound like friction.",
    songs: [
      { id: "1", title: "Saudade In Err (Intro)", duration: "1:17", audioUrl: "/assets/music/sataop-klense-mp3s/Saudade In Err (Intro) - Klense.mp3", lyrics: [] },
      { id: "2", title: "Hummer's Theme", duration: "2:18", audioUrl: "/assets/music/sataop-klense-mp3s/Hummer's Theme - Klense.mp3", lyrics: [] },
      { id: "3", title: "Chop Your Head", duration: "3:17", audioUrl: "/assets/music/sataop-klense-mp3s/Chop Your Head - Klense.mp3", lyrics: [] },
      { id: "4", title: "Roast", duration: "2:51", audioUrl: "/assets/music/sataop-klense-mp3s/Roast - Klense.mp3", lyrics: [] },
      { id: "5", title: "Salamander Crowd", duration: "2:01", audioUrl: "/assets/music/sataop-klense-mp3s/Salamander Crowd - Klense.mp3", lyrics: [] },
      { id: "6", title: "Me, Myself and I", duration: "2:31", audioUrl: "/assets/music/sataop-klense-mp3s/Me, Myself and I - Klense.mp3", lyrics: [] },
      { id: "7", title: "Help Me Run", duration: "2:50", audioUrl: "/assets/music/sataop-klense-mp3s/Help Me Run - Klense.mp3", lyrics: [] },
      { id: "8", title: "Jungle Law", duration: "2:01", audioUrl: "/assets/music/sataop-klense-mp3s/Jungle Law - Klense.mp3", lyrics: [] },
      { id: "9", title: "Tisa", duration: "3:23", audioUrl: "/assets/music/sataop-klense-mp3s/Tisa - Klense.mp3", lyrics: [] },
      { id: "10", title: "You In Mind", duration: "2:40", audioUrl: "/assets/music/sataop-klense-mp3s/You In Mind - Klense.mp3", lyrics: [] },
    ],
  },
  {
    id: "2",
    title: "Lazlo",
    coverImage: "/assets/music-assets/Lazlo Album Cover (Final).webp",
    typefaceImage: "/assets/music-assets/Portfolio Music Typefaces/Lazlo Text.svg",
    releaseYear: "2021",
    description: "My trip down memory lane. I built this record to reminisce on the days spent in front of a tv, pulling from references like Camp Lazlo to capture that nostalgic drift. Fittingly, I spent a great deal of time during the writing of this record catching up on old cartoons. It is my own quiet ticket into hazy fragments of childhood in front of a widescreen.",
    songs: [
      { id: "1", title: "The Return (Intro)", duration: "0:30", audioUrl: "", lyrics: [] },
      { id: "2", title: "Know About", duration: "1:43", audioUrl: "", lyrics: [] },
      { id: "3", title: "General Ike", duration: "2:15", audioUrl: "", lyrics: [] },
      { id: "4", title: "Me, You (Mii Yu)", duration: "2:25", audioUrl: "", lyrics: [] },
      { id: "5", title: "Lazlo's Camp", duration: "2:35", audioUrl: "", lyrics: [] },
      { id: "6", title: "S a t o r i", duration: "3:25", audioUrl: "", lyrics: [] },
      { id: "7", title: "With U", duration: "3:20", audioUrl: "", lyrics: [] },
      { id: "8", title: "Elay-AZ Theme", duration: "1:06", audioUrl: "", lyrics: [] },
      { id: "9", title: "On Da Fens", duration: "3:20", audioUrl: "", lyrics: [] },
    ],
  },
  {
    id: "3",
    title: "Son Of Ink",
    coverImage: "/assets/music-assets/Son Of Ink Album Cover.webp",
    typefaceImage: "/assets/music-assets/Portfolio Music Typefaces/Son Of Ink Text.svg",
    releaseYear: "2021",
    description: "A heavy dive into the weight of authorship and self-preservation. This is me carving my permanent identity into a world that always seeks to smudge us out. It is the sound of me proving I exist. Now no longer available anywhere.",
    songs: [
      { id: "1", title: "Back Again", duration: "3:17", audioUrl: "", lyrics: [] },
      { id: "2", title: "Witness (Skit) [feat. Jeremy Olendo]", duration: "0:33", audioUrl: "", lyrics: [] },
      { id: "3", title: "Clarity (feat. Prescribed)", duration: "2:41", audioUrl: "", lyrics: [] },
      { id: "4", title: "Ultimate", duration: "3:48", audioUrl: "", lyrics: [] },
      { id: "5", title: "Battle", duration: "1:54", audioUrl: "", lyrics: [] },
      { id: "6", title: "Something", duration: "3:18", audioUrl: "", lyrics: [] },
      { id: "7", title: "Lunchtime (Freestyle)", duration: "1:17", audioUrl: "", lyrics: [] },
      { id: "8", title: "Local (Outro)", duration: "1:51", audioUrl: "", lyrics: [] },
    ],
  },
];

export const albums: Album[] = rawAlbums.map((album) => {
  const lyricsForAlbum = albumLyrics[album.id] || {};
  return {
    ...album,
    songs: album.songs.map((song) => ({
      ...song,
      lyrics: lyricsForAlbum[song.id] || [],
    })),
  };
});

export const eps = [
  {
    id: "2",
    title: "Controlled Demolition",
    coverImage: "/assets/music-assets/ControlledDemolitionCover_v2.webp",
    typefaceImage: "/assets/music-assets/Portfolio Music Typefaces/Controlled Demolition Text.svg",
    releaseYear: "2026",
    description: "My calculated collapse. This is about the absolute necessity of tearing down old structures when they no longer serve me. Here, I channel my cold, flat, Tallinn-dorm energy, realising that I’ll never change my always changing ways.",
    tracks: [
      { id: "1", title: "Read Only Memories", duration: "1:06" },
      { id: "2", title: "In The Nile", duration: "1:37" },
      { id: "3", title: "608-856-4955", duration: "1:05" },
      { id: "4", title: "President Crook", duration: "1:21" },
      { id: "5", title: "The World! (Interlude)", duration: "1:23" },
      { id: "6", title: "Best Not", duration: "1:46" },
      { id: "7", title: "These Long Long Days (Outro)", duration: "1:24" },
    ],
  },
  {
    id: "1",
    title: "Some Of Ink EP",
    coverImage: "/assets/music-assets/Some Of Ink EP Cover.webp",
    typefaceImage: "/assets/music-assets/Portfolio Music Typefaces/Some Of Ink Text.svg",
    releaseYear: "2025",
    description: "Focused explorations of specific sonic environments. Capturing the iterative process of the archive.",
    tracks: [
      { id: "1", title: "Back Again, Again", duration: "2:02" },
      { id: "2", title: "Still Ultimate", duration: "2:49" },
      { id: "3", title: "Just Words", duration: "2:36" },
    ],
  },
].map((ep) => {
  const lyricsForEp = epLyrics[ep.id] || {};
  const songs = (ep.tracks || []).map((track) => ({
    id: track.id,
    title: track.title,
    duration: track.duration,
    audioUrl: "",
    lyrics: lyricsForEp[track.id] || [],
  }));
  return {
    ...ep,
    songs,
  };
});

export const singles = [
  {
    id: "1",
    title: "Allegory (Freestyle)",
    coverImage: "/assets/music-assets/ALLEGORY (FREESTYLE) Single Cover.webp",
    releaseYear: "2025",
    duration: "1:13",
  },
  {
    id: "2",
    title: "Eye Kan",
    coverImage: "/assets/music-assets/Eye Kan Single Cover.webp",
    releaseYear: "2021",
    duration: "1:35",
  },
  {
    id: "3",
    title: "First (Interlude)",
    coverImage: "/assets/music-assets/First(Interlude) Single Cover.webp",
    releaseYear: "2020",
    duration: "2:33",
  },
  {
    id: "4",
    title: "Goodbye Song (Demo)",
    coverImage: "/assets/music-assets/GoodbyeSongSingleCover.webp",
    releaseYear: "2025",
    duration: "",
  },
].map((single) => ({
  ...single,
  lyrics: singleLyrics[single.id] || [],
}));

export function getAlbumById(id: string): Album | undefined {
  return albums.find((a) => a.id === id);
}

export function getEpById(id: string) {
  return eps.find((e) => e.id === id);
}

export function getSingleById(id: string) {
  return singles.find((s) => s.id === id);
}