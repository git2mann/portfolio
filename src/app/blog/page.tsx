"use client";

import { useState, useEffect } from "react";
import Container from "@/app/_components/container";
import Link from "next/link";
import Image from "next/image";

// Define types for better TypeScript support
type CategoryItem = {
  category: string;
  description: string;
  link: string;
  icon: string;
  image: string;
  color: string;
  textColor: string;
};

export default function BlogPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Animation helper function with proper typing
  const fadeInUpClass = (delay: number): string => 
    `transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} 
    transition-all duration-700 ease-out delay-${delay}`;

  // Categories data
  const categories: CategoryItem[] = [
    {
      category: "Music",
      description: "Explore music production tips, stories, and insights.",
      link: "/blog/music",
      icon: "🎵",
      image: "/assets/blog/blog-post-covers/selina-farzaei-x2QHTVg2HqA-unsplash.jpg",
      color: "from-blue-500 to-indigo-600",
      textColor: "text-blue-600 dark:text-blue-400"
    },
    {
      category: "Tech",
      description: "Discover the latest in technology and development.",
      link: "/blog/tech",
      icon: "💻",
      image: "/assets/blog/blog-post-covers/pontus-wellgraf-16_bFHg8Ouc-unsplash.jpg",
      color: "from-purple-500 to-pink-600",
      textColor: "text-purple-600 dark:text-purple-400"
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section with subtle pattern background */}
      <div className="relative bg-white dark:bg-slate-900 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div 
            className="absolute inset-0" 
            style={{ 
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
              backgroundSize: '20px 20px'
            }}
          />
        </div>
        
        <Container>
          <div className="max-w-6xl mx-auto relative">
            <section className="text-center">
              <div className={`mb-2 ${fadeInUpClass(100)}`}>
                <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium">
                  BLOG & INSIGHTS
                </span>
              </div>
              
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight 
                             text-gray-800 dark:text-white mb-6 ${fadeInUpClass(200)}`}>
                Welcome to the Blog
              </h1>
              
              <p className={`text-lg md:text-xl font-medium text-gray-700 dark:text-gray-300 
                           max-w-2xl mx-auto ${fadeInUpClass(300)}`}>
                Discover stories, tutorials, and insights from{" "}
                <span className="font-bold text-blue-600 dark:text-blue-400">Music</span> and{" "}
                <span className="font-bold text-purple-600 dark:text-purple-400">Tech</span>.
              </p>
            </section>
          </div>
        </Container>
      </div>

      <Container>
        <div className="max-w-6xl mx-auto py-12 md:py-20">
          {/* Category Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {categories.map(({ category, description, link, icon, image, color, textColor }, index) => (
              <div 
                key={category} 
                className={`text-center ${fadeInUpClass(400 + index * 100)}`}
              >
                <Link
                  href={link}
                  className="block bg-white dark:bg-slate-800 rounded-xl overflow-hidden 
                           shadow-lg hover:shadow-2xl transform hover:-translate-y-2 
                           transition duration-300 ease-in-out"
                >
                  <div className="relative h-64 sm:h-80 md:h-96">
                    <Image
                      src={image}
                      alt={`${category} Category`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-60 hover:bg-opacity-50 
                                  transition-all duration-300 flex flex-col items-center justify-center p-6">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 
                                    backdrop-blur-sm flex items-center justify-center mb-4">
                        <span className="text-4xl md:text-5xl">{icon}</span>
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-bold text-white mt-2 drop-shadow-md">
                        {category}
                      </h3>
                      
                      <div className="mt-4 md:mt-6">
                        <span className="px-4 py-2 rounded-full bg-white/30 backdrop-blur-sm 
                                       text-white text-sm font-medium hover:bg-white/40 transition-colors">
                          Explore {category}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
                
                <div className="mt-6 px-4">
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    {description}
                  </p>
                  
                  <div className="mt-4">
                    <Link 
                      href={link} 
                      className={`inline-flex items-center font-medium ${textColor}`}
                    >
                      Read articles
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 ml-1" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </section>


        </div>
      </Container>
    </main>
  );
}