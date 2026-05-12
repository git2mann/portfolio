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
  const params = await props.params;
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "author",
    "content",
    "contentType",
    "coverImage",
    "preview",
    "category"
  ]);

  if (!post) {
    return notFound();
  }

  const content = post.content;
  const contentType = post.contentType;

  return (
    <main className="min-h-screen bg-background-primary pb-40">
      <Alert preview={post.preview} />
      
      {/* 1. CINEMATIC HEADER (Full Width) */}
      <div className="w-full px-6 md:px-20">
         <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date || ""}
            author={post.author}
         />
      </div>

      {/* 2. ARTICLE BODY (Constrained) */}
      <Container className="!max-w-none px-6 md:px-20 flex justify-center">
        <article className="w-full max-w-7xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <PostBody content={content} isMarkdown={contentType === 'markdown'} contentType={contentType} />
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
  const post = getPostBySlug(params.slug, ["title", "ogImage"]);

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
  const posts = getAllPosts(["slug"]);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
