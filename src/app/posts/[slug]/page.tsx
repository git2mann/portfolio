import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { SITE_NAME } from "@/lib/constants";
import ReactMarkdown from "react-markdown";
import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import PostInteractivity from "@/app/_components/PostInteractivity";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";

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

  // Strip out manual Back to Archive/Home buttons from content to avoid duplicate or broken links
  const rawContent = post.content || "";
  const content = rawContent.replace(/<p>\s*<a href="[^"]*">Back to [^<]*<\/a>\s*<\/p>|<a href="[^"]*">Back to [^<]*<\/a>/gi, "");
  const contentType = post.contentType;

  // Retrieve related posts in the same category
  const allPosts = getAllPosts(["title", "date", "coverImage", "slug", "category", "excerpt"]);
  const relatedPosts = allPosts
    .filter((p) => p.slug !== params.slug && p.category === post.category)
    .slice(0, 2);

  return (
    <main className="relative min-h-screen bg-background-primary pb-40 overflow-x-hidden">
      <Alert preview={post.preview} />
      
      {/* Background Atmosphere using the cover image's colors (optimized for Firefox & WebRender compatibility) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-[0.14] dark:opacity-[0.22] transition-opacity duration-1000 transform-gpu will-change-transform" 
          style={{ 
            transform: 'translate3d(0,0,0)', 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
           <Image 
             src={post.coverImage} 
             alt="" 
             fill 
             className="object-cover scale-150 blur-[80px] transform-gpu" 
             priority 
             style={{ 
               transform: 'translate3d(0,0,0)', 
               backfaceVisibility: 'hidden',
               WebkitBackfaceVisibility: 'hidden'
             }}
           />
        </div>
        {/* Noise overlay to break up banding blocks */}
        <div className="absolute inset-0 z-10 opacity-[0.12] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url(/noise.png)' }}></div>
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-background-primary/10 via-background-primary/85 to-background-primary"></div>
      </div>

      <div className="relative z-10">
        {/* Scroll interactivity tools */}
        <PostInteractivity />
        
        {/* 1. CINEMATIC HEADER (Full Width) */}
        <div className="w-full px-6 md:px-20">
           <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date || ""}
              author={post.author}
           />
        </div>

        {/* 2. ARTICLE BODY (Constrained with Glassmorphic Container) */}
        <Container className="!max-w-none px-4 sm:px-6 md:px-20 flex flex-col items-center justify-center relative">
          <article className="w-full max-w-5xl bg-white/[0.02] dark:bg-black/40 border border-white/5 dark:border-white/[0.04] rounded-[2.5rem] p-6 sm:p-10 md:p-16 shadow-2xl relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <PostBody content={content} isMarkdown={contentType === 'markdown'} contentType={contentType} />
          </article>
          
          {/* Persistent and fully working Back to Archive Button */}
          <div className="mt-16 text-center animate-in fade-in duration-1000 delay-700">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-4 px-8 py-3 rounded-full liquid-glass-clear text-secondary hover:text-primary font-mono text-xs uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 group shadow-lg"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" /> Back to Archive
            </Link>
          </div>
        </Container>

        {/* 3. RELATED POSTS SECTION */}
        {relatedPosts.length > 0 && (
          <Container className="!max-w-none px-6 md:px-20 mt-32">
            <div className="max-w-4xl mx-auto border-t border-white/5 pt-16 space-y-12 animate-in fade-in duration-1000 delay-700">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-accent-blue/40" />
                <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-accent-blue">Related_Sequences // Continuing the Stream</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link 
                    key={relatedPost.slug} 
                    href={`/posts/${relatedPost.slug}`}
                    className="group relative block liquid-glass rounded-[2rem] p-6 hover:-translate-y-1 transition-all"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden mb-6 rounded-xl">
                      <Image
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        fill
                        className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      />
                    </div>
                    <time className="text-[9px] font-mono text-accent-blue uppercase tracking-[0.3em] mb-3 block">
                      {new Date(relatedPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </time>
                    <h4 className="text-xl font-light uppercase tracking-tighter mb-4 text-primary leading-tight group-hover:text-accent-blue transition-colors">
                      {relatedPost.title}
                    </h4>
                    <p className="text-secondary font-light text-xs line-clamp-2 leading-relaxed mb-6 opacity-75">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-[0.3em] text-secondary opacity-60 group-hover:opacity-100 transition-opacity">
                      <span>Execute_Log</span>
                      <ArrowRight size={14} className="text-accent-blue group-hover:translate-x-2 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        )}
      </div>
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
