import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

/**
 * PostPreview component
 * Displays a preview of a blog post for use in lists
 */
type Props = {
  title: string;       // Post title
  coverImage: string;  // URL to cover image
  date: string;        // Publication date
  excerpt: string;     // Short excerpt from the post
  author: Author;      // Author information
  slug: string;        // Post slug for linking
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <div>
      {/* Cover image with link to post */}
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      
      {/* Post title with link to post */}
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      
      {/* Publication date */}
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      
      {/* Post excerpt */}
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      
      {/* Author information */}
      <Avatar name={author.name} picture={author.picture} />
    </div>
  );
}