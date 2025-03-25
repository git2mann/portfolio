const fs = require('fs');
const { join } = require('path');
const readline = require('readline');

// Define the directory where Markdown posts are stored
const postsDirectory = join(process.cwd(), '_posts');
const defaultCoverImage = "/assets/blog/blog-post-covers/selina-farzaei-x2QHTVg2HqA-unsplash.jpg";

// Function to prompt the user for input
function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer: string) => {
      rl.close();
      resolve(answer);
    });
  });
}

// Function to generate the blog post template
async function generatePost() {
  const title: string = await prompt('Post Title: ');
  const excerpt: string = await prompt('Post Excerpt: ');
  let coverImage: string = await prompt('Cover Image URL (leave blank for default): ');
  const date: string = new Date().toISOString();

  if (!coverImage) {
    coverImage = defaultCoverImage;
  }

  const slug: string = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  const filePath: string = join(postsDirectory, `${slug}.md`);

  const content: string = `---
title: "${title}"
excerpt: "${excerpt}"
coverImage: "${coverImage}"
date: "${date}"
author:
  name: Leon Nduati
  picture: "/assets/blog/authors/IMG_7908.PNG"
ogImage:
  url: "${coverImage}"
---

# ${title}

Write your content here...
`;

  fs.writeFileSync(filePath, content);
  console.log(`Blog post generated: ${filePath}`);
}

generatePost();
