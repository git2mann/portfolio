
import ReactMarkdown from "react-markdown";
import markdownStyles from "./markdown-styles.module.css";
import { useMemo } from "react";
import { MDXProvider } from "@mdx-js/react";
import { mdx } from '@mdx-js/react';

/**
 * PostBody component
 * Renders the main content of a blog post
 */

type Props = {
  content: string;  // Markdown, MDX, or HTML content
  isMarkdown?: boolean; // Indicates if the content is markdown
  contentType?: 'markdown' | 'mdx' | 'html';
};

export function PostBody({ content, isMarkdown, contentType }: Props) {
  if (!content) {
    return <div className="text-red-500">Content not available.</div>;
  }

  if (contentType === 'mdx') {
    // Dynamically compile MDX content to a component
    // This requires @mdx-js/react and a dynamic MDX compiler (like @mdx-js/mdx or next-mdx-remote for SSR)
    // For now, show a placeholder (integration with next-mdx-remote or similar is needed for full SSR support)
    return (
      <div className={`max-w-2xl mx-auto ${markdownStyles.markdown}`}>
        {/* TODO: Integrate with next-mdx-remote or a dynamic MDX compiler for SSR/SSG */}
        <div className="text-yellow-600 font-bold">MDX rendering coming soon (requires next-mdx-remote or dynamic import).</div>
        <pre className="bg-yellow-50 text-xs p-2 mt-2 overflow-x-auto">{content}</pre>
      </div>
    );
  }

  return (
    <div className={`max-w-2xl mx-auto ${markdownStyles.markdown}`}>
      {isMarkdown ? (
        // Render markdown content using react-markdown
        <ReactMarkdown>{content}</ReactMarkdown>
      ) : (
        // Render plain HTML content
        <div dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </div>
  );
}