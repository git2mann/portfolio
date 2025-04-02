import { remark } from "remark";
import html from "remark-html";
import sanitize from "rehype-sanitize";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

/**
 * Converts markdown content to sanitized HTML
 * @param markdown - The markdown string to convert
 * @returns {Promise<string>} - The converted and sanitized HTML string
 */
export default async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkRehype) // Convert markdown to HTML-compatible syntax
    .use(sanitize) // Sanitize the HTML output
    .use(rehypeStringify) // Convert the syntax tree to an HTML string
    .process(markdown);

  return result.toString();
}