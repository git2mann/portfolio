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
  // Remove .md extension from slug if present
  const realSlug = slug.replace(/\.md$/, "");
  // Construct the full path to the post file
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  // Read the file contents
  const fileContents = fs.readFileSync(fullPath, "utf8");
  // Parse the frontmatter and content using gray-matter
  const { data, content } = matter(fileContents);

  // Return the post data with the slug and content
  return { ...data, slug: realSlug, content } as Post;
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