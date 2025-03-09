# Leon K Nduati - Personal Portfolio & Blog

A modern, performant personal portfolio and blog built with Next.js, TypeScript, and Tailwind CSS. This site showcases my work as a creative professional across multiple disciplines including music, art, and technology.

## Features

- **Blog Platform**: Markdown-based blog with support for rich content
- **Music Portfolio**: 
  - Interactive audio player with waveform visualization
  - Featured tracks with lyrics and annotations
  - Discography and release showcase
- **Art Gallery**: Showcase of visual artwork and exhibitions
- **Projects Section**: Highlighting various creative and technical projects
- **Dark Mode & Theme Switcher**: Multiple theme options including:
  - Light
  - Dark (True Black)
  - Dark Ocean
  - Pastel Pink
  - Forest
  - Ocean
  - Sunset
- **Responsive Design**: Optimized for all screen sizes
- **Performance Optimized**: Built with Next.js for optimal loading speeds
- **TypeScript**: Full type safety throughout the codebase
- **Modern Styling**: Using Tailwind CSS for a clean, modern aesthetic

## Technology Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: Markdown with Gray Matter
- **Audio**: WaveSurfer.js for audio visualization
- **Deployment**: Vercel

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Content Management

Blog posts are stored in `/_posts` as Markdown files with front matter support. Adding a new Markdown file in there will automatically create a new blog post.

### Blog Post Structure

```markdown
---
title: "Post Title"
excerpt: "Post excerpt"
coverImage: "/assets/blog/preview/cover.jpg"
date: "2025-01-01T12:00:00.000Z"
author:
  name: Leon Nduati
  picture: "/assets/blog/authors/IMG_7908.PNG"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
---

Post content in Markdown...
```

## Project Structure

```
├── _posts/           # Blog post markdown files
├── public/           # Static assets
│   ├── assets/      # Images and media
│   └── favicon/     # Favicon files
├── src/
│   ├── app/         # Next.js app directory
│   ├── interfaces/  # TypeScript interfaces
│   └── lib/         # Utility functions
└── styles/          # Global styles
```

## License

All rights reserved © Leon K Nduati 2025
