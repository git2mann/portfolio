import { type Author } from "./author";

/**
 * Post interface defining the structure of a blog post
 * @property {string} slug - URL-friendly identifier for the post
 * @property {string} title - Title of the post
 * @property {string} date - Publication date in ISO format
 * @property {string} coverImage - Path to the cover image
 * @property {Author} author - Author information (name and picture)
 * @property {string} excerpt - Short summary of the post
 * @property {Object} ogImage - Open Graph image for social media
 * @property {string} content - Full markdown content of the post
 * @property {boolean} preview - Whether the post is in preview mode
 */
export type Post = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  preview?: boolean;
};