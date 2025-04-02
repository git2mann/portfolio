import markdownStyles from "./markdown-styles.module.css";

/**
 * PostBody component
 * Renders the main content of a blog post
 */
type Props = {
  content: string;  // HTML content converted from markdown
  isHtml?: boolean;
};

export function PostBody({ content, isHtml }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      {isHtml ? (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <div>{content}</div>
      )}
    </div>
  );
}