import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";

/**
 * MoreStories component
 * Displays a grid of blog post previews
 * Used on the home page to show additional posts beyond the hero post
 */
type Props = {
  posts: Post[];  // Array of posts to display
};

export function MoreStories({ posts }: Props) {
  return (
    <section>
      {/* Section title */}
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      
      {/* Grid of post previews */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}