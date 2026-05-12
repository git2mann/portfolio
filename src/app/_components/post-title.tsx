import { ReactNode } from "react";

/**
 * PostTitle component
 * Displays the title of a blog post with appropriate styling
 */
type Props = {
  children?: ReactNode;  // Title content
};

export function PostTitle({ children }: Props) {
  return (
    <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
      {children}
    </h1>
  );
}