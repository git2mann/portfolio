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
      <div className="w-full flex justify-center mb-4 pointer-events-none select-none">
        <span
          className="inline-flex items-center px-6 py-2 text-base font-medium rounded-full bg-pink-600 text-white shadow-md"
          style={{
            minWidth: 0,
            width: "fit-content",
            maxWidth: "100%",
            whiteSpace: "nowrap",
            letterSpacing: "0.04em",
            fontWeight: 700,
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
          <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-8 lg:p-12 bg-gradient-to-t from-black/60 via-black/10 to-transparent min-h-0 overflow-auto">
            {/* Post title with link to post */}
            <h3 className="text-3xl sm:text-4xl lg:text-6xl font-light text-white drop-shadow mb-3">
              <Link href={`/posts/${slug}`} className="hover:underline">
                {title}
              </Link>
            </h3>
            
            {/* Post excerpt */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 mb-3 line-clamp-3">
              {excerpt}
            </p>
            
            {/* Author information */}
            <div className="flex items-center gap-4">
              <Avatar name={author.name} picture={author.picture} />
              <span className="text-base text-gray-200">
                <DateFormatter dateString={date} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}