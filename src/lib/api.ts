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
  // Get all post slugs
  const slugs = getPostSlugs();
  // Map each slug to its post data
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // Sort posts by date in descending order (newest first)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}