export interface Artwork {
  id: string;
  src: string;
  title: string;
  year: string;
  writeup?: string;
  category?: string;
}

export const ARTWORKS: Artwork[] = [
  // Visualizing Sound
  { id: "half-thoughts-cover", src: "/assets/music-assets/HalfThoughts1Cover.webp", title: "Half Thoughts", year: "2023", category: "Visualizing Sound" },
  { id: "squealer-and-the-aggressors-of-peace-cover", src: "/assets/music-assets/SQUEALER AND THE AGGRESSORS OF PEACE Album Cover.webp", title: "Squealer and the Aggressors of Peace", year: "2024", category: "Visualizing Sound" },
  { id: "lazlo-cover", src: "/assets/music-assets/Lazlo Album Cover (Final).webp", title: "Lazlo", year: "2022", category: "Visualizing Sound" },
  { id: "son-of-ink-cover", src: "/assets/music-assets/Son Of Ink Album Cover.webp", title: "Son Of Ink", year: "2021", category: "Visualizing Sound" },
  { id: "some-of-ink-cover", src: "/assets/music-assets/Some Of Ink EP Cover.webp", title: "Some Of Ink (EP)", year: "2022", category: "Visualizing Sound" },
  { id: "squealer-and-the-aggressors-of-peace-live-cover", src: "/assets/music-assets/Squealer and the Aggressors of Peace (Live) Front Cover.webp", title: "Squealer and the Aggressors of Peace (Live)", year: "2025", category: "Visualizing Sound" },
  { id: "allegory-freestyle-cover", src: "/assets/music-assets/ALLEGORY (FREESTYLE) Single Cover.webp", title: "ALLEGORY (FREESTYLE)", year: "2023", category: "Visualizing Sound" },
  { id: "eye-kan-cover", src: "/assets/music-assets/Eye Kan Single Cover.webp", title: "Eye Kan", year: "2023", category: "Visualizing Sound" },
  { id: "first-interlude-cover", src: "/assets/music-assets/First(Interlude) Single Cover.webp", title: "First (Interlude)", year: "2023", category: "Visualizing Sound" },
  { id: "goodbye-song-demo-cover", src: "/assets/music-assets/GoodbyeSongSingleCover.webp", title: "Goodbye Song", year: "2023", category: "Visualizing Sound" },
  // Editorial Pieces
  {
    id: "the-amber-labyrinth",
    src: "/assets/art-assets/hiqugraphs/WhatsApp Image 2026-01-15 at 14.40.28 (1).jpeg",
    title: "Amber Labyrinth",
    year: "2026",
    category: "Editorial",
    writeup: "This is the geometry of warmth. The camera dives into the center of the rose, finding a Fibonacci spiral bathed in the hues of a setting sun. It feels intimate, almost secretive, as if we are being invited into the flower’s private unfolding. The light here is soft and liquid, turning the petals into layers of spun silk and marmalade. It evokes the feeling of a long embrace... a gentle, endless turning inward where the outside world falls away, leaving only color, shadow, and the promise of a bloom that never quite ends."
  },
  {
    id: "weight-of-a-shilling",
    src: "/assets/art-assets/hiqugraphs/WhatsApp Image 2026-01-15 at 14.40.28 (2).jpeg",
    title: "Weight of a Shilling",
    year: "2026",
    category: "Editorial",
    writeup: "There is a profound dignity in the overlooked artifacts of our daily lives. This monochromatic study of the Kenyan shilling elevates a simple unit of currency into a relic of identity. The harsh lighting catches every scratch and dent on the metal, mapping the thousands of hands this coin has passed through, as a tactile history of commerce and exchange. The giraffe, etched in relief, stands as a quiet guardian of the soil. It is a gritty, beautiful reminder that value is not just monetary; it is cultural, weighted by the passage of time and the friction of human touch."
  },
  {
    id: "the-velvet-inferno",
    src: "/assets/art-assets/batch-2/image00001.jpeg",
    title: "Velvet Inferno",
    year: "2026",
    category: "Editorial",
    writeup: "Nature rarely whispers; often, it commands. This image captures the hibiscus as a biological event; A sudden, velvet explosion. The macro perspective transforms the delicate petals into a landscape of deep, undulating ridges, guiding the eye inevitably toward the golden, dusty architecture of the stamen. It is a study in confidence and saturation, reminding us that beauty often possesses a fierce, almost intimidating vitality. This is life, blushing at its own intensity."
  },
  {
    id: "reverie-by-the-water",
    src: "/assets/art-assets/batch-2/image00002.jpeg",
    title: "Reverie by the Water",
    year: "2026",
    category: "Editorial",
    writeup: "Through the lens of nostalgia, the present moment becomes a memory before it has even faded. This image, with its grainy texture and washed-out background, feels like a found photograph from a forgotten summer. The fiery orange of the Canna lilies stands in defiance against the dreamy, indistinct backdrop of water and architecture. It captures a fleeting stillness—that specific quietude of a humid afternoon where the air is thick, and the only clarity is the striking, resilient color of the garden standing guard over the haze."
  },
];

export function getArtworkById(id: string): Artwork | undefined {
  const decoded = decodeURIComponent(id).toLowerCase();
  return ARTWORKS.find((a) => a.id.toLowerCase() === decoded);
}
