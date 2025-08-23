# Leon K Nduati - Personal Portfolio & Blog

A modern, performant personal portfolio and blog built with Next.js, TypeScript, and Tailwind CSS. This site showcases my work as a creative professional across multiple disciplines including music, art, and technology.

## Features

- **Blog Platform**: 
  - Markdown-based blog with support for rich content.
  - Posts grouped by year and displayed with featured images, excerpts, and tags.
  - Dynamic routing for individual blog posts.
- **Music Portfolio**: 
  - Interactive audio player with waveform visualization.
  - Featured tracks with lyrics and annotations.
  - Discography and release showcase with album details and song lyrics.
- **Art Gallery**: A dedicated section for showcasing visual artwork and exhibitions.
- **Projects Section**: Highlighting various creative and technical projects with detailed descriptions.
- **Dark Mode & Theme Switcher**: Multiple theme options including:
  - Light Mode
  - Dark Mode
  - Dark Ocean
  - Pastel Pink
  - Forest
  - Ocean
  - Sunset
  - **Metallic Silver** (realistic metallic sheen, glassy menus, and subtle highlights)
  - **8-Bit Sunset** (retro pixel look with Lanton's Ant 8-bit grid overlay)
- **Responsive Design**: Optimized for all screen sizes, ensuring a seamless experience on mobile, tablet, and desktop.
- **Performance Optimized**: Built with Next.js for fast loading speeds and efficient rendering.
- **TypeScript**: Full type safety throughout the codebase for better maintainability.
- **Modern Styling**: Clean, modern aesthetic using Tailwind CSS and custom themes.

## Technology Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: Markdown with Gray Matter
- **Audio**: WaveSurfer.js for audio visualization
- **Deployment**: Vercel

## Local Development

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   This will start the development server at `http://localhost:3000`.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Start the production server**:
   ```bash
   npm start
   ```

## Generating a Blog Post

To generate a new blog post, run the following script:

```bash
npx ts-node src/scripts/generatePost.ts
```

Follow the prompts to enter the post title, excerpt, and cover image URL. If you leave the cover image URL blank, a default image will be used.

## Content Management

Blog posts are stored in the `/_posts` directory as Markdown files with front matter support. Adding a new Markdown file in this directory will automatically create a new blog post.

### Blog Post Structure

Each blog post is written in Markdown and includes front matter metadata. Below is an example structure:

```markdown
---
title: "Post Title"
excerpt: "A brief summary of the post."
coverImage: "/assets/blog/preview/cover.jpg"
date: "2025-01-01T12:00:00.000Z"
author:
  name: Leon Nduati
  picture: "/assets/blog/authors/IMG_7908.PNG"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
tags: ["Tag1", "Tag2"]
contentType: "article" # Options: 'article', 'video', 'audio', 'gallery'
mediaUrl: "/path/to/media" # Optional for audio or video posts
---

Post content in Markdown...
```

### Adding a New Blog Post

1. Create a new Markdown file in the `/_posts` directory.
2. Use the structure above to define the metadata and content.
3. Save the file, and it will automatically appear on the blog page.

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
