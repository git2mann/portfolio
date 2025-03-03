import Avatar from "@/app/_components/avatar";
import CoverImage from "@/app/_components/cover-image";
import { type Author } from "@/interfaces/author";
import Link from "next/link";
import DateFormatter from "./date-formatter";

/**
 * HeroPost component
 * Displays a featured blog post with larger styling
 * Used on the home page to highlight the most recent or important post
 */
type Props = {
  title: string;       // Post title
  coverImage: string;  // URL to cover image
  date: string;        // Publication date
  excerpt: string;     // Short excerpt from the post
  author: Author;      // Author information
  slug: string;        // Post slug for linking
};

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <section>
      {/* Cover image with link to post */}
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={coverImage} slug={slug} />
      </div>
      
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          {/* Post title with link to post */}
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          
          {/* Publication date */}
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter dateString={date} />
          </div>
        </div>
        
        <div>
          {/* Post excerpt */}
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          
          {/* Author information */}
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </section>
  );
}