
import ReactMarkdown from "react-markdown";
import markdownStyles from "./markdown-styles.module.css";
import { useMemo } from "react";
import { MDXProvider } from "@mdx-js/react";

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
    return <div className="text-secondary opacity-40 font-mono text-xs uppercase tracking-widest text-center py-20">Null_Content // Data missing.</div>;
  }

  if (contentType === 'mdx') {
    return (
      <div className={`max-w-4xl mx-auto ${markdownStyles.markdown} animate-in fade-in duration-700`}>
        <div 
          className="p-8 rounded-2xl border border-accent-blue/10 text-accent-blue font-mono text-[10px] uppercase tracking-widest mb-8"
          style={{ backgroundColor: 'color-mix(in srgb, var(--accent-blue) 5%, transparent)' }}
        >
           Compiler_Note: MDX rendering sequence pending implementation.
        </div>
        <pre className="bg-white/[0.02] border border-white/5 rounded-xl p-8 text-xs font-mono text-secondary overflow-x-auto leading-relaxed">{content}</pre>
      </div>
    );
  }

  return (
    <div className={`max-w-4xl mx-auto ${markdownStyles.markdown} animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300`}>
      <div className="prose-base md:prose-xl prose-invert prose-headings:font-light prose-headings:tracking-tighter prose-headings:uppercase prose-p:text-primary prose-p:leading-relaxed prose-p:font-light prose-p:text-lg md:prose-p:text-2xl prose-a:text-accent-blue prose-strong:text-primary">
        {isMarkdown ? (
          <ReactMarkdown>{content}</ReactMarkdown>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        )}
      </div>
      
      {/* Post Footer / Signal End */}
      <div className="mt-32 pt-16 border-t border-white/5 flex flex-col items-center gap-8 opacity-40">
         <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
         </div>
         <span className="font-mono text-[10px] uppercase tracking-[0.8em]">End_Of_Transmission</span>
      </div>
    </div>
  );
}