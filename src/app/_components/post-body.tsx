import ReactMarkdown from "react-markdown";
import markdownStyles from "./markdown-styles.module.css";

/**
 * PostBody component
 * Renders the main content of a blog post
 */
type Props = {
  content: string;  // Markdown or HTML content
  isMarkdown?: boolean; // Indicates if the content is markdown
};

export function PostBody({ content, isMarkdown }: Props) {
  if (!content) {
    return <div className="text-red-500">Content not available.</div>;
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