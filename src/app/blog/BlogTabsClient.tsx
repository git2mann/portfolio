"use client";

import { useState } from "react";
import { Post } from "@/interfaces/post";
import Container from "@/app/_components/container";
import Link from "next/link";
import Image from "next/image";
import { HeroPost } from "@/app/_components/hero-post";
import { MoreStories } from "@/app/_components/more-stories";
import { PostPreview } from "@/app/_components/post-preview";

// Define types for better TypeScript support
export type CategoryItem = {
  category: string;
  description: string;
  link: string;
  icon: string;
  image: string;
  color: string;
  textColor: string;
  bgColor: string;
  tagline: string;
};

type Props = {
  posts: Post[];
  categories: CategoryItem[];
};

export default function BlogTabsClient({ posts, categories }: Props) {
  const [activeTab, setActiveTab] = useState("featured");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const featuredPost = posts[0];
  const moreStories = posts.slice(1, 4);
  const allPosts = posts;
  const musicPosts = posts.filter((post) => (post.category || "").toLowerCase() === "music");
  const techPosts = posts.filter((post) => (post.category || "").toLowerCase() === "tech");

  let tabPosts: Post[] = [];
  if (activeTab === "all") tabPosts = allPosts;
  else if (activeTab === "music") tabPosts = musicPosts;
  else if (activeTab === "tech") tabPosts = techPosts;

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setMessage("Subscription successful! Check your inbox.");
        setEmail("");
      } else {
        setMessage("Subscription failed. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      {/* Navigation Tabs - Full width sticky bar */}
      <div className="sticky top-16 z-10 w-full bg-[var(--background-primary)]/80 backdrop-blur-lg py-4 -mt-16 rounded-lg shadow-lg">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <nav className="flex flex-wrap justify-center gap-2 md:space-x-4">
            {['featured', 'all', 'music', 'tech', 'subscribe'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-[var(--card-background)] text-[var(--text-primary)] scale-105'
                    : 'hover:bg-[var(--hover-background)] text-[var(--text-secondary)]'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>
      <Container>
        {/* Dynamic Content Based on Active Tab */}
        <div className="mt-12 space-y-16">
          {activeTab === "featured" && featuredPost && (
            <>
              <HeroPost
                title={featuredPost.title}
                coverImage={featuredPost.coverImage}
                date={featuredPost.date}
                author={featuredPost.author}
                slug={featuredPost.slug}
                excerpt={featuredPost.excerpt}
              />
              {moreStories.length > 0 && <MoreStories posts={moreStories} />}
            </>
          )}

          {(activeTab === "all" || activeTab === "music" || activeTab === "tech") && (
            <section>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[var(--text-primary)]">
                {activeTab === "all"
                  ? "All Posts"
                  : activeTab === "music"
                  ? "Music Posts"
                  : "Tech Posts"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {tabPosts.length === 0 ? (
                  <div className="col-span-full text-center text-[var(--text-secondary)]">
                    No posts found.
                  </div>
                ) : (
                  tabPosts.map((post) => (
                    <PostPreview
                      key={post.slug}
                      title={post.title}
                      coverImage={post.coverImage}
                      date={post.date}
                      author={post.author}
                      slug={post.slug}
                      excerpt={post.excerpt}
                    />
                  ))
                )}
              </div>
            </section>
          )}

          {activeTab === "subscribe" && (
            <section className="max-w-4xl mx-auto">
              <div className="bg-[var(--card-background)] border border-[var(--border-color)] rounded-2xl p-8 md:p-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text-primary)]">
                    Stay Updated
                  </h2>
                  <p className="text-lg text-[var(--text-secondary)]">
                    Subscribe to receive the latest articles, tutorials, and insights delivered directly to your inbox.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow px-4 py-3 rounded-lg border border-[var(--border-color)] bg-[var(--background-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSubscribe}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Subscribe
                  </button>
                </div>
                {message && (
                  <p className="mt-4 text-center text-sm text-[var(--text-secondary)]">
                    {message}
                  </p>
                )}
                <p className="mt-4 text-center text-xs text-[var(--text-secondary)]">
                  No spam, unsubscribe at any time.
                </p>
              </div>
            </section>
          )}
        </div>

        {/* Categories Section */}
        {activeTab === "featured" && (
          <section className="mt-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[var(--text-primary)]">
              Explore Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categories.map(({ category, description, tagline, link, icon, image, color }, index) => (
                <Link
                  href={link}
                  key={category}
                  className="group relative bg-[var(--card-background)] border border-[var(--border-color)] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative h-64 overflow-hidden rounded-t-xl">
                    <Image
                      src={image}
                      alt={`${category} Category`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/80 transition-all duration-300 flex flex-col items-center justify-center p-6">
                      <div className={`w-20 h-20 rounded-full backdrop-blur-md flex items-center justify-center mb-4 bg-gradient-to-br ${color} border-2 border-white/20 shadow-lg group-hover:scale-110 transition-all duration-300`}>
                        <span className="text-4xl">{icon}</span>
                      </div>
                      <span className="block text-white/70 text-sm font-medium mb-2 tracking-wider uppercase">
                        {tagline}
                      </span>
                      <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-md">
                        {category}
                      </h3>
                      <span className="px-6 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium transition-all duration-300 group-hover:bg-white/30 border border-white/10">
                        Explore {category} →
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-[var(--text-secondary)]">{description}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="h-12"></div>
          </section>
        )}
      </Container>
    </>
  );
}
