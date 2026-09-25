---
title: "Articulate: Retrieving Music Through the Shape of Visual Memory"
excerpt: "Traditional streaming search forces you to remember text strings. But our brains remember colors, mood, and imagery. Here is how I built Articulate—using vision models and 384-dimensional vector embeddings to find songs by describing their cover art."
coverImage: "/assets/blog/blog-post-covers/barb-mcmahon-BG61R35VSQ4-unsplash.webp"
date: "2026-01-22T15:30:00.000Z"
author:
  name: Leon Nduati
  picture: "/assets/blog/authors/IMG_7908.webp"
ogImage:
  url: "/assets/blog/blog-post-covers/barb-mcmahon-BG61R35VSQ4-unsplash.webp"
tags: ["Systems", "Creative Coding"]
category: "Tech"
---

Every music lover knows this specific kind of quiet panic.

You’re walking down the street or sitting in a room, and a specific bassline or melody starts echoing in the back of your head. You listened to it obsessively six months ago. You need to hear it right now.

You open Spotify or Apple Music, tap the search bar, and your fingers stop above the keyboard.

You don't remember the name of the track. You have zero recollection of the artist. But you can picture the cover art with eerie, photographic clarity: *“It was a grainy, high-contrast photo of an empty basketball court at dusk, with washed-out indigo shadows and minimalist yellow typography in the bottom corner.”*

You look at the empty search input. It is waiting for exact text: `artist:"..."` or `track:"..."`.

You can’t type what your brain actually retained. You’re forced to scroll aimlessly through hundreds of saved tracks in your library, squinting at micro-thumbnails, praying that your thumb catches the right square before your patience runs out.

That gap between human visual recall and relational database schemas is the reason I built [**Articulate**](https://github.com/git2mann/articulate).

---

## 1. The Discovery Gap: Human Memory vs. Relational Metadata

Digital streaming platforms were engineered like inventory warehouses. They organize art using rigid, traditional database columns:

```sql
SELECT tracks.id, tracks.title, artists.name 
FROM tracks 
JOIN artists ON tracks.artist_id = artists.id 
WHERE tracks.title ILIKE '%query%' OR artists.name ILIKE '%query%';
```

That schema works wonders if you think like a catalog archivist. But human cognitive memory does not store sensory experiences in relational tables. 

Cognitive psychology has consistently shown that sensory recall—especially visual memory associated with sound—operates through aesthetic associations: color temperature, spatial composition, lighting, emotional mood, and visual symbolism. When you fell in love with a song, your eyes stared at the twelve-inch vinyl sleeve or the illuminated square on your phone screen. The visual aesthetics became deeply entangled with the auditory emotion.

When a digital platform only indexes factual strings, it creates a **discovery gap**. If you forget the metadata, you are effectively locked out of your own music history.

*Articulate* (*Music, "articulated" through art*) was built to close that gap. The goal was simple yet ambitious: **allow a listener to find any song in their personal Spotify library simply by describing the cover art they remember in their mind's eye.**

---

## 2. The Architecture: From Pixels to High-Dimensional Vectors

Translating a messy, subjective human memory into a direct pointer to an audio track requires bridging two very different worlds: raw visual pixels and natural language.

Simple keyword tagging doesn't cut it. If you tag an album with just `"blue"`, `"car"`, `"night"`, you lose all the nuance of texture, framing, and mood. The engine needs to understand that *"a solitary figure standing under a lonely amber streetlight"* shares visual DNA with *"warm solitary neon glow in a dark alleyway."*

Here is how the pipeline works:

```
[Spotify User Library] 
       │
       ▼ (OAuth 2.0 Ingestion)
[Album Cover Artwork Assets] 
       │
       ▼ (Multimodal Vision Engine)
[Dense Semantic Visual Descriptors] 
       │
       ▼ (Local Embedding Pipeline)
[384-Dimensional Vector Embeddings] 
       │
       ▼ (Cosine Similarity Distance)
[Natural Language Memory Query] ──► [Contenders Elimination Loop] ──► [Instant Spotify Playback]
```

### Step 1: Library Ingestion & Multimodal Vision Analysis

The application authenticates directly with the Spotify Web API to access the listener’s collection (`Liked Songs` and saved albums). 

Rather than relying on basic image color pickers, each album cover is analyzed through multimodal vision models. The vision engine deconstructs the artwork into rich, multidimensional visual semantics:

- **Color Palettes & Lighting:** Dominant hex ranges, tonal warmth, contrast ratios, and illumination sources (e.g., golden hour sunlight, stark fluorescent glare, neon backlight).
- **Subject & Composition:** Spatial hierarchy, focal points, human presence, minimalism, rule-of-thirds framing, negative space.
- **Medium & Texture:** 35mm film grain, vector illustration, oil painting, collage, brutalist typography, distorted xerox scans.
- **Emotional Mood:** Somber, nostalgic, euphoric, chaotic, ethereal.

### Step 2: Projecting into 384-Dimensional Vector Space

Once the visual descriptions are synthesized, they are passed into an embedding model that maps each artwork into a **384-dimensional vector space**.

In this space, every album cover is represented not by a file path or a database ID, but by a 384-element mathematical vector:

$$\mathbf{v}_{\text{cover}} = [x_1, x_2, x_3, \dots, x_{384}]$$

In this high-dimensional coordinate system, geometry represents meaning. Albums with similar visual aesthetics—regardless of genre or artist—naturally gravitate toward each other in space.

### Step 3: Semantic Retrieval via Cosine Distance

When a user visits Articulate, they don't enter metadata. They are met with a single, human prompt: **"Describe what you remember."**

When they type:

> *"A grainy black and white photo of a person wearing an oversized coat, looking down at wet pavement with street reflections."*

The natural language query is instantly converted into a 384D query vector $\mathbf{q}$. The engine then computes the **cosine similarity** between the query vector and every artwork vector in the user's indexed library:

$$\text{Similarity}(\mathbf{q}, \mathbf{v}) = \frac{\mathbf{q} \cdot \mathbf{v}}{\|\mathbf{q}\| \|\mathbf{v}\|} = \frac{\sum_{i=1}^{384} q_i v_i}{\sqrt{\sum_{i=1}^{384} q_i^2} \sqrt{\sum_{i=1}^{384} v_i^2}}$$

Within single-digit milliseconds, the engine ranks the entire library by semantic proximity. Even if the user got the artist name wrong, or if the album has no words on the cover at all, the mathematical distance pulls the exact track to the surface.

---

## 3. Designing for Tactile Memory: The Elimination Loop

One of the biggest design revelations while building Articulate was that human memory is rarely a one-shot query.

Memory is an iterative process. You start with a loose, blurry intuition: *"I know it was primarily red and had some kind of geometric shape."* 

As soon as you see a few potential candidates, your subconscious immediately kicks into gear: *"No, not bright red—it was deep crimson, and the geometry was organic, like a distorted circle."*

If the UI was just a static Google-style list of search results, that feedback loop would feel cold and disconnected. The interface had to feel tactile, reactive, and alive.

### The Contenders Panel

During the search phase, candidate matches don't just snap into a grid. They enter through a dedicated **Contenders Panel**, powered by spring physics:

- As you type your first clues, top potential matches spring into the visual field.
- As you append specific details or clarify the scene, candidate scores dynamically recalculate.
- Covers that fall out of similarity gracefully **blur and fade away**, while the true matches pull into sharp, high-contrast focus.

Searching feels less like querying a database and more like focusing a camera lens or tuning an analog radio receiver until the static clears and the signal locks in.

---

## 4. The Visual Matrix: Personal Music Cartography

Once your entire library is mapped into 384 dimensions, a fascinating byproduct emerges: your personal music collection can be explored as a physical, navigable landscape.

I engineered **The Visual Matrix (Semantic Map)** using **Neural Dimensionality Reduction** (projecting the 384D vectors down to a navigable 2D spatial canvas).

Instead of an alphabetical grid sorted by artist name from A to Z, your library is organized by aesthetic affinity:

- Deep, ambient electronic and midnight techno cluster together in a dark slate-blue quadrant.
- Raw, abrasive punk and DIY rock gather around high-contrast monochrome and grainy textures.
- Soul, R&B, and warm acoustic projects gravitate into a sunlit amber pocket.

You can pan, zoom, and traverse your music library visually. You begin to notice aesthetic patterns in your own taste that you never consciously recognized—certain color temperatures you gravitate toward when you're stressed, or specific visual compositions that accompany your late-night listening habits.

---

## 5. Engineering Realities: The Selective Indexing Vault

Building a local-first, vision-driven search engine comes with hard architectural constraints.

If a user has 4,000 saved songs on Spotify, you cannot simply blast 4,000 high-resolution album covers through multimodal vision endpoints in parallel. You would hit rate limits immediately, exhaust browser memory, and generate unnecessary processing costs.

To solve this, I designed the **Selective Indexing Vault**:

1. **Surgical Sync Interface:** A full-screen, high-fidelity synchronization vault that renders the user's Spotify library.
2. **State Diffing:** Albums already processed and embedded in the vector archive are visually grayscaled with subtle indicator badges.
3. **Controlled Batches:** The user has total surgical agency to hand-pick specific albums, playlists, or batches for neural synthesis.
4. **Local Vector Caching:** The 384D embeddings and metadata are stored and indexed locally, ensuring that once an artwork is processed, future semantic searches execute in near-instantaneous offline loops without continuous API overhead.

---

## 6. Software That Meets Cognition Where It Lives

As software engineers, it is very easy to fall into the trap of designing interfaces around our database schemas. It’s easier to build a text filter on a SQL column than it is to build a multimodal vector space that mirrors human perception.

But software is most powerful when it conforms to the human mind, rather than forcing the human mind to conform to machine storage.

We don't remember our favorite moments in life as primary keys. We remember them as light, shadow, color, and sound. *Articulate* was proof that with modern multimodal models and vector embeddings, we can finally build tools that understand how we actually remember.

---

*Explore the codebase, architecture, and UI walkthrough on GitHub: [git2mann/articulate](https://github.com/git2mann/articulate)*
