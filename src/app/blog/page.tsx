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
  bgColor: string;
  tagline: string;
};

export default function BlogPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Staggered animation for a smoother load
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Animation helper function with proper typing
  const fadeInUpClass = (delay: number): string => 
    `transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} 
    transition-all duration-700 ease-out ${delay < 400 ? `delay-${delay}` : `delay-${delay}`}`;

  // Categories data with enhanced styling options
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

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section with enhanced background */}
      <div className="relative bg-white dark:bg-slate-900 py-16 sm:py-20 md:py-32 overflow-hidden">
        {/* Simple yet effective grid background with subtle animation */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Responsive grid pattern */}
          <div
            className="absolute inset-0 opacity-5 dark:opacity-10 transition-opacity duration-500"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: 'clamp(30px, 2.5vw, 40px)'
            }}
          />
          
          {/* Simple gradient overlay with very subtle animation */}
          <div 
            className="absolute inset-0 opacity-15 dark:opacity-20"
            style={{
              background: 'linear-gradient(135deg, rgba(125, 125, 255, 0.2) 0%, rgba(255, 255, 255, 0) 50%, rgba(125, 255, 255, 0.2) 100%)',
              animation: 'simplePulse 10s ease-in-out infinite'
            }}
          />

          {/* CSS animation - extremely subtle and lightweight */}
          <style jsx>{`
            @keyframes simplePulse {
              0%, 100% { opacity: 0.15; }
              50% { opacity: 0.2; }
            }
            
            @media (prefers-reduced-motion: reduce) {
              div[style*="animation"] {
                animation: none !important;
              }
            }
          `}</style>
        </div>
        
        <Container>
          <div className="max-w-6xl mx-auto relative px-4 sm:px-6">
            <section className="text-center">
              <div className={`mb-4 ${fadeInUpClass(100)}`}>
                <span className="inline-block px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs sm:text-sm font-semibold tracking-wider shadow-lg shadow-blue-500/20 dark:shadow-blue-500/10">
                  BLOG & INSIGHTS
                </span>
              </div>
              
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight 
                             mb-6 sm:mb-8 ${fadeInUpClass(200)}`}>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
                  Welcome to the Blog
                </span>
              </h1>
              
              <p className={`text-lg sm:text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300 
                           max-w-3xl mx-auto px-4 sm:px-0 ${fadeInUpClass(300)}`}>
                Discover stories, tutorials, and insights from{" "}
                <span className="font-bold text-blue-600 dark:text-blue-400 relative">
                  Music
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-600/30 dark:bg-blue-400/30 rounded-full"></span>
                </span> and{" "}
                <span className="font-bold text-purple-600 dark:text-purple-400 relative">
                  Tech
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-purple-600/30 dark:bg-purple-400/30 rounded-full"></span>
                </span>.
              </p>
              
            </section>
          </div>
        </Container>
      </div>

      <Container>
        <div className="max-w-7xl mx-auto py-12 sm:py-16 md:py-24 px-4 sm:px-6">
          {/* Category Cards with 3D effect - Mobile optimized */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-16">
            {categories.map(({ category, description, tagline, link, icon, image, color, textColor, bgColor }, index) => (
              <div 
                key={category} 
                className={`${fadeInUpClass(400 + index * 100)}`}
              >
                <Link
                  href={link}
                  className="group relative block bg-white dark:bg-slate-800/80 rounded-2xl overflow-hidden 
                           shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:rotate-1
                           transition duration-500 ease-in-out border border-gray-100 dark:border-slate-700"
                >
                  {/* Feature ribbon */}
                  <div className={`absolute top-3 sm:top-5 right-3 sm:right-5 z-10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold 
                                  text-white bg-gradient-to-r ${color} shadow-md`}>
                    Featured
                  </div>
                  
                  <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
                    <Image
                      src={image}
                      alt={`${category} Category`}
                      fill
                      priority
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 
                                  group-hover:from-black/80 transition-all duration-300 
                                  flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
                      
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full 
                                    backdrop-blur-md flex items-center justify-center mb-3 sm:mb-4
                                    bg-gradient-to-br ${color} border-2 border-white/20 
                                    shadow-lg group-hover:scale-110 transition-all duration-300 ease-out`}>
                        <span className="text-3xl sm:text-4xl md:text-5xl transform group-hover:scale-110 transition-transform duration-300">{icon}</span>
                      </div>
                      
                      <div className="text-center">
                        <span className="block text-white/70 text-xs sm:text-sm font-medium mb-1 sm:mb-2 tracking-wider uppercase">
                          {tagline}
                        </span>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-md
                                    tracking-tight group-hover:tracking-normal transition-all duration-300">
                          {category}
                        </h3>
                      </div>
                      
                      <div className="mt-4 sm:mt-6 md:mt-8 overflow-hidden">
                        <span className="block px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/20 backdrop-blur-md 
                                       text-white text-sm sm:text-base font-medium 
                                       transform group-hover:translate-y-0 group-hover:bg-white/30 
                                       transition-all duration-300 border border-white/10
                                       shadow-lg shadow-black/5">
                          Explore {category}
                          <span className="ml-1 sm:ml-2 inline-block transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
                
                <div className="mt-6 sm:mt-8 px-2 sm:px-4">
                  <p className="text-base sm:text-lg md:text-xl font-medium text-gray-700 dark:text-gray-300">
                    {description}
                  </p>
                  
                  <div className="mt-4 sm:mt-5">
                    <Link 
                      href={link} 
                      className={`inline-flex items-center font-medium text-base sm:text-lg ${textColor} hover:underline decoration-2 underline-offset-4 transition-all`}
                    >
                      Read articles
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 sm:h-5 sm:w-5 ml-1 sm:ml-2 transform transition-transform group-hover:translate-x-1" 
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

{/*           Newsletter subscription section with graphical element - Mobile optimized
          <section className={`mt-16 sm:mt-20 md:mt-28 relative overflow-hidden ${fadeInUpClass(800)}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 
                           dark:from-slate-800 dark:to-slate-700"></div>
                           
            
            <div className="absolute -left-10 -top-10 w-24 sm:w-40 h-24 sm:h-40 bg-blue-300/30 dark:bg-blue-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -right-10 -bottom-10 w-24 sm:w-40 h-24 sm:h-40 bg-purple-300/30 dark:bg-purple-500/20 rounded-full blur-2xl"></div>
            
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
              <div className="px-4 sm:px-8 py-10 sm:py-16 md:px-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                <div className="w-full md:w-1/2">
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl relative w-full h-48 sm:h-64 md:h-80 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                    <Image 
                      src="/assets/blog/blog-post-covers/mr-cup-fabien-barral-Mwuod2cm8g4-unsplash.jpg" 
                      alt="Newsletter illustration"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white">
                    Stay in the loop
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8">
                    Subscribe to our newsletter for the latest articles, tutorials, and insights delivered directly to your inbox.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-grow px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl border border-gray-300 dark:border-slate-600 
                                bg-white dark:bg-slate-800/90 text-gray-800 dark:text-white shadow-md 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                    <button
                      onClick={handleSubscribe}
                      className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 
                                text-white font-medium shadow-lg shadow-blue-500/30 dark:shadow-blue-500/20
                                hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 
                                transform hover:-translate-y-1 whitespace-nowrap"
                    >
                      Subscribe
                    </button>
                  </div>
                  {message && <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">{message}</p>}
                  <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    No spam, unsubscribe at any time.
                  </p>
                </div>
              </div>
            </div>
          </section> */}
        </div>
      </Container>
    </main>
    );
  
  }