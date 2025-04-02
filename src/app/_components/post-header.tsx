import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";

/**
 * PostHeader component
 * Displays the header section of a blog post including title, cover image, date, and author
 */
type Props = {
  title: string;       // Post title
  coverImage: string;  // URL to cover image
  date: string;        // Publication date
  author: Author;      // Author information
};

export function PostHeader({ title, coverImage, date, author }: Props) {
  return (
    <>
      {/* Post title */}
      <PostTitle>{title}</PostTitle>
      
      {/* Author information (desktop view) */}
      {author?.name && author?.picture && (
        <div className="hidden md:block md:mb-12">
          <Avatar name={author.name} picture={author.picture} />
        </div>
      )}
      
      {/* Cover image */}
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      
      <div className="max-w-2xl mx-auto">
        {/* Author information (mobile view) */}
        {author?.name && author?.picture && (
          <div className="block md:hidden mb-6">
            <Avatar name={author.name} picture={author.picture} />
          </div>
        )}
        
        {/* Publication date */}
        {date && (
          <div className="mb-6 text-lg">
            <DateFormatter dateString={date} />
          </div>
        )}
      </div>
    </>
  );
}