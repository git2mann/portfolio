import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { SITE_NAME } from "@/lib/constants";
import ReactMarkdown from "react-markdown";
import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";

/**
 * Individual blog post page component
 * Renders a single blog post based on the slug parameter
 */
export default async function Post(props: Params) {
  // Extract the slug parameter from props
  const params = await props.params;
  // Get the post data for the given slug
  const post = getPostBySlug(params.slug);

  // If post not found, return 404
  if (!post) {
    return notFound();
  }

  // Pass raw markdown content directly to PostBody
  const content = post.content;

  return (
    <main>
      {/* Alert banner for preview mode */}
      <Alert preview={post.preview} />
      <Container>
        {/* Removed redundant Header component */}
        <article className="mb-32">
          {/* Post header with title, cover image, date, and author */}
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date || ""}
            author={post.author}
          />
          {/* Pass raw markdown content */}
          <PostBody content={content} isMarkdown={post.contentType === 'markdown'} />
        </article>
      </Container>
    </main>
  );
}

// Type definition for the page parameters
type Params = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * Generate metadata for the post page (for SEO)
 */
export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | ${SITE_NAME}`;
  const ogImageUrl = post.ogImage?.url || "/default-og-image.jpg"; // Fallback to a default image

  return {
    title,
    openGraph: {
      title,
      images: [ogImageUrl],
    },
  };
}

/**
 * Generate static paths for all posts at build time
 * This enables static generation of all post pages
 */
export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
