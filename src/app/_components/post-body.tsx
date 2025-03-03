import markdownStyles from "./markdown-styles.module.css";

/**
 * PostBody component
 * Renders the main content of a blog post
 */
type Props = {
  content: string;  // HTML content converted from markdown
};

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Render the HTML content with markdown styling */}
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}