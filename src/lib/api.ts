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
 * Get a single post by its slug with optional field filtering
 * @param {string} slug - The slug of the post to retrieve
 * @param {string[]} fields - Optional array of fields to retrieve
 * @returns {Post} The post data
 */
export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.(md|mdx|html)$/, "");
  const mdPath = join(postsDirectory, `${realSlug}.md`);
  const mdxPath = join(postsDirectory, `${realSlug}.mdx`);
  const htmlPath = join(postsDirectory, `${realSlug}.html`);

  let fileContents: string;
  let contentType: 'markdown' | 'mdx' | 'html';

  if (fs.existsSync(mdxPath)) {
    fileContents = fs.readFileSync(mdxPath, "utf8");
    contentType = 'mdx';
  } else if (fs.existsSync(mdPath)) {
    fileContents = fs.readFileSync(mdPath, "utf8");
    contentType = 'markdown';
  } else if (fs.existsSync(htmlPath)) {
    fileContents = fs.readFileSync(htmlPath, "utf8");
    contentType = 'html';
  } else {
    throw new Error(`Post not found: ${slug}`);
  }

  type PostItems = {
    [key: string]: any;
  };

  const items: PostItems = {
    slug: realSlug,
    contentType: contentType,
  };

  if (contentType === 'markdown' || contentType === 'mdx') {
    const { data, content } = matter(fileContents);
    
    // If fields are specified, only return those
    if (fields.length > 0) {
      fields.forEach((field) => {
        if (field === "slug") {
          items[field] = realSlug;
        }
        if (field === "content") {
          items[field] = content;
        }
        if (typeof data[field] !== "undefined") {
          items[field] = data[field];
        }
      });
    } else {
      // Return all fields
      Object.assign(items, data);
      items.content = content;
      items.tags = data.tags || [];
    }
    
    return items as Post;
  }

  // Extract metadata from the <script> tag in HTML
  const metadataMatch = fileContents.match(/<script type="application\/json" id="post-metadata">([\s\S]*?)<\/script>/);
  if (!metadataMatch) {
    throw new Error(`Metadata not found in HTML post: ${slug}`);
  }

  const metadata = JSON.parse(metadataMatch[1]);
  
  if (fields.length > 0) {
    fields.forEach((field) => {
      if (field === "slug") {
        items[field] = realSlug;
      }
      if (field === "content") {
        items[field] = fileContents;
      }
      if (typeof metadata[field] !== "undefined") {
        items[field] = metadata[field];
      }
    });
  } else {
    Object.assign(items, metadata);
    items.content = fileContents;
  }

  return items as Post;
}

/**
 * Get all posts sorted by date
 * @param {string[]} fields - Optional array of fields to retrieve
 * @returns {Post[]} Array of all posts sorted by date (newest first)
 */
export function getAllPosts(fields: string[] = []): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts.map((post) => ({
    ...post,
    category: post.category || "Music", // Default to "Music" for uncategorized posts
  }));
}

/**
 * Get posts by category
 * @param {string} category - The category to filter posts by
 * @param {string[]} fields - Optional array of fields to retrieve
 * @returns {Post[]} Array of posts in the specified category
 */
export function getPostsByCategory(category: string, fields: string[] = []): Post[] {
  return getAllPosts(fields).filter((post) => post.category === category);
}

/**
 * Get all unique tags from posts
 * @returns {string[]} Array of unique tags
 */
export function getAllTags(): string[] {
  const posts = getAllPosts(["tags"]);
  const tags = posts.flatMap((post) => post.tags || []);
  return Array.from(new Set(tags)); // Remove duplicates
}