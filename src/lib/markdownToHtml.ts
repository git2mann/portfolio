import { remark } from "remark";
import html from "remark-html";

/**
 * Convert markdown string to HTML
 * @param {string} markdown - The markdown content to convert
 * @returns {Promise<string>} The HTML string converted from markdown
 */
export default async function markdownToHtml(markdown: string) {
  // Process the markdown content using remark and remark-html
  const result = await remark().use(html).process(markdown);
  // Return the HTML string
  return result.toString();
}