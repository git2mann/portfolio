import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

/**
 * CoverImage component
 * Displays a cover image for a post, optionally with a link
 */
type Props = {
  title: string;  // Title for alt text
  src: string;    // Image source URL
  slug?: string;  // Optional slug for linking to post
};

const CoverImage = ({ title, src, slug }: Props) => {
  // Create the image element with appropriate styling
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-sm w-full", {
        "hover:shadow-lg transition-shadow duration-200": slug, // Add hover effect if it's a link
      })}
      width={1300}
      height={630}
      priority // Add priority loading for the main image
      quality={70} // Add this line for better compression
      placeholder="blur" // Optional: use blur-up placeholder
      blurDataURL="/assets/placeholder.png" // Optional: add a tiny placeholder image
    />
  );
  
  return (
    <div className="sm:mx-0">
      {slug ? (
        // If slug is provided, wrap image in a link to the post
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        // Otherwise, just render the image
        image
      )}
    </div>
  );
};

export default CoverImage;