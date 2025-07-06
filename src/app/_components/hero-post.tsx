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
    <section className="mb-16">
      {/* Small, centered "Featured Post" pill badge */}
      <div className="w-full flex justify-center mb-3 pointer-events-none select-none">
        <span
          className="inline-flex items-center px-4 py-1 text-xs font-semibold rounded-full bg-pink-600 text-white shadow-md"
          style={{
            minWidth: 0,
            width: "fit-content",
            maxWidth: "100%",
            whiteSpace: "nowrap",
            letterSpacing: "0.04em",
            fontWeight: 700,
            fontSize: "0.85rem",
            boxShadow: "0 2px 8px 0 #f472b6a0",
            border: "1.5px solid #fff3",
            opacity: 0.97,
          }}
        >
          Featured Post
        </span>
      </div>
      <div className="max-w-3xl mx-auto">
        {/* Cover image with link to post */}
        <div className="relative w-full rounded-lg overflow-hidden aspect-[4/3] sm:aspect-[2/1] lg:aspect-[3/1] bg-gray-100 dark:bg-slate-800">
          <CoverImage title={title} src={coverImage} slug={slug} />
          
          {/* Overlay text block */}
          <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-6 lg:p-10 bg-gradient-to-t from-black/60 via-black/10 to-transparent min-h-0 overflow-auto">
            {/* Post title with link to post */}
            <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-white drop-shadow mb-2">
              <Link href={`/posts/${slug}`} className="hover:underline">
                {title}
              </Link>
            </h3>
            
            {/* Post excerpt */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-100 mb-2 line-clamp-3">
              {excerpt}
            </p>
            
            {/* Author information */}
            <div className="flex items-center gap-3">
              <Avatar name={author.name} picture={author.picture} />
              <span className="text-xs text-gray-200">
                <DateFormatter dateString={date} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}