import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

// Define the directory where Markdown posts are stored
const postsDirectory = join(process.cwd(), "_posts");

/**
 * Get all post slugs from the _posts directory
 * @returns {string[]} Array of filenames in the posts directory
 */
export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

/**
 * Get a single post by its slug
 * @param {string} slug - The slug of the post to retrieve
 * @returns {Post} The post data including frontmatter and content
 */
export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.(md|html)$/, "");
  const mdPath = join(postsDirectory, `${realSlug}.md`);
  const htmlPath = join(postsDirectory, `${realSlug}.html`);

  let fileContents: string;
  let contentType: 'markdown' | 'html';

  if (fs.existsSync(mdPath)) {
    fileContents = fs.readFileSync(mdPath, "utf8");
    contentType = 'markdown';
  } else if (fs.existsSync(htmlPath)) {
    fileContents = fs.readFileSync(htmlPath, "utf8");
    contentType = 'html';
  } else {
    throw new Error(`Post not found: ${slug}`);
  }

  if (contentType === 'markdown') {
    const { data, content } = matter(fileContents);
    return { ...data, slug: realSlug, content, contentType, tags: data.tags || [], } as Post;
  }

  // Extract metadata from the <script> tag in HTML
  const metadataMatch = fileContents.match(/<script type="application\/json" id="post-metadata">([\s\S]*?)<\/script>/);
  if (!metadataMatch) {
    throw new Error(`Metadata not found in HTML post: ${slug}`);
  }

  const metadata = JSON.parse(metadataMatch[1]);
  return { ...metadata, slug: realSlug, content: fileContents, contentType } as Post;
}

/**
 * Get all posts sorted by date
 * @returns {Post[]} Array of all posts sorted by date (newest first)
 */
export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts.map((post) => ({
    ...post,
    category: post.category || "Music", // Default to "Music" for uncategorized posts
  }));
}

/**
 * Get posts by category
 * @param {string} category - The category to filter posts by
 * @returns {Post[]} Array of posts in the specified category
 */
export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((post) => post.category === category);
}

/**
 * Get all unique tags from posts
 * @returns {string[]} Array of unique tags
 */
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = posts.flatMap((post) => post.tags || []);
  return Array.from(new Set(tags)); // Remove duplicates
}