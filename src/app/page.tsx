import { getAllPosts } from "@/lib/api";
import LandingPageClient from "./page-client";

/**
 * Home page component (Server-side)
 * Fetches data and passes it to the Client Component
 */
export default function Index() {
  const recentPosts = getAllPosts([
    "title",
    "date",
    "excerpt",
    "coverImage",
    "slug",
  ]).slice(0, 3);

  return <LandingPageClient recentPosts={recentPosts} />;
}
