import { getAllPosts } from "@/lib/api";
import { Post } from "@/interfaces/post";
import BlogTabsClient, { CategoryItem } from "./BlogTabsClient";

export default function BlogPage() {
  const posts: Post[] = getAllPosts();
  const categories: CategoryItem[] = [
    {
      category: "Music",
      description: "Explore music production tips, stories, and insights from my experiences as Klense.",
      tagline: "From studio to stage",
      link: "/blog/music",
      icon: "🎵",
      image: "/assets/blog/blog-post-covers/selina-farzaei-x2QHTVg2HqA-unsplash.jpg",
      color: "from-blue-500 to-indigo-600",
      textColor: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      category: "Tech",
      description: "Discover the latest in technology and development from my experiences as git2mann.",
      tagline: "Code, design & innovation",
      link: "/blog/tech",
      icon: "💻",
      image: "/assets/blog/blog-post-covers/pontus-wellgraf-16_bFHg8Ouc-unsplash.jpg",
      color: "from-purple-500 to-pink-600",
      textColor: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
  ];
  return (
    <main className="min-h-screen bg-[var(--background-primary)]">
      {/* Hero Section (With Parallax Effect) */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/blog/blog-post-covers/mr-cup-fabien-barral-Mwuod2cm8g4-unsplash.jpg"
            alt="Blog Hero"
            className="object-cover w-full h-full transform scale-105"
            style={{ filter: 'brightness(0.7)' }}
          />
        </div>
        <div className="relative h-full flex items-center w-full mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
              Blog & Insights
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 animate-fade-in delay-200">
              Discover stories, tutorials, and insights from Music and Tech.
            </p>
          </div>
        </div>
      </div>
      <BlogTabsClient posts={posts} categories={categories} />
    </main>
  );
}