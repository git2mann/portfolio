# Leon K Nduati - Personal Portfolio & Blog

A modern, performant, and cinematic personal portfolio and creative archive built with Next.js 16 (Turbopack), TypeScript, Tailwind CSS, and Framer Motion. This site showcases my work as a multidisciplinary creative across music, visual art, writing, and technology.

---

## Features

### Music Portfolio & Discography
- **Interactive 3D Cover Displays**: Physics-based interactive tilt (`ClearRefractiveCover` & `SmoothTilt`) powered by Framer Motion springs, providing fluid 60fps responsiveness across Chrome, Firefox, and Safari with zero GPU layer culling or flickering.
- **Borderless Modern Architecture**: Completely borderless release layouts across studio albums, EPs, live performances, and singles, utilizing subtle contrast washes and floating glass surfaces.
- **Integrated Mini Audio Player**: Custom compact player (`MiniAudioPlayer`) featuring play/pause controls, draggable timeline scrubbing, duration indicators, and animated frequency bars.
- **Reimagined Lyrics & Liner Notes System**:
  - Naturally flowing page layouts eliminating clunky nested scrollbars.
  - Inline accordion-expanding liner notes directly below annotated verses.
  - Verse-level commentary steppers, "Expand / Collapse All" toggle, and keyboard shortcuts (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `Esc`).
- **Dynamic Mobile Release Stack**: Custom touch-optimized card deck with gesture-based flipping for mobile viewports.

### Art Gallery & Exhibitions
- **Curated Archive**: Grid presentation of digital artwork, HiQuGraphs, and editorial studies.
- **Interactive Dome Gallery**: 3D dome visualization experience for browsing artwork collections.
- **Social Share Pages**: Individual artwork showcase routes (`/art/share/[artworkId]`) optimized with OpenGraph metadata and clean direct visual previews.

### Writing & Blog Platform
- Markdown-driven editorial engine with Gray Matter frontmatter parsing.
- Categorized articles (Music, Tech) with chronological filtering, tag taxonomies, and reading times.
- SEO optimized with OpenGraph and Twitter card previews.

### Design System & Theme Engine
- **Multiple Curated Palettes**:
  - Light & Dark modes
  - Dark Ocean
  - Pastel Pink
  - Forest
  - Ocean
  - Sunset
  - **Metallic Silver**: Glassy menus, metallic sheen, and refractive surface highlights.
  - **8-Bit Sunset**: Retro aesthetic with dynamic pixel grid overlay.
- **Responsive & Accessible**: Mobile-first architecture with smooth viewport transitions and custom typography.

---

## Technology Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS with custom glassmorphism utilities and CSS variables
- **Motion & Physics**: Framer Motion
- **Icons**: Lucide React & React Icons
- **Content**: Markdown with Gray Matter & Next MDX
- **Optimization**: WebP media delivery, dynamic `sitemap.ts`, and `robots.ts`
- **Deployment**: Vercel

---

## Project Structure

```
├── _posts/           # Blog posts and articles in Markdown format
├── public/           # Static public assets
│   ├── assets/       # High-fidelity WebP imagery, audio samples, and SVG typefaces
│   │   ├── blog/     # Author avatars and editorial header images
│   │   └── music-assets/ # Album covers, typefaces, and wallpapers
│   └── favicon.ico   # Site favicon
├── src/
│   ├── app/          # Next.js App Router (pages, layouts, route handlers)
│   │   ├── _components/ # Reusable UI components (Tilt, Player, Lyrics, etc.)
│   │   ├── api/      # Route handlers (/api/contact, /api/subscribe)
│   │   ├── art/      # Art gallery and share pages
│   │   ├── blog/     # Blog index and category feeds
│   │   ├── music/    # Discography, release detail pages, and live projects
│   │   ├── sitemap.ts# Dynamic XML sitemap generator
│   │   └── robots.ts # Search engine crawler instructions
│   ├── data/         # Release metadata, song catalogs, and lyrics data
│   │   └── lyrics/   # Verified lyrics and liner notes (albums, eps, singles)
│   ├── interfaces/   # TypeScript data definitions
│   └── lib/          # Global constants and utility helpers
```

---

## Getting Started

### Prerequisites

- Node.js 18.17+ (or Node.js 20+)
- npm, pnpm, or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Start production build locally**:
   ```bash
   npm start
   ```

---

## Content Management

### Generating a New Blog Post

Generate a pre-formatted blog post template using the CLI script:

```bash
npx ts-node src/scripts/generatePost.ts
```

Follow the prompts to enter title, excerpt, and cover image. Posts are saved to `/_posts` and automatically indexed by the blog feed.

---

## License

All rights reserved © Leon K Nduati
