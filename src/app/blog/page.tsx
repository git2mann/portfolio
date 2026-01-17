import { getAllPosts } from "@/lib/api";
import { Post } from "@/interfaces/post";
import BlogTabsClient, { CategoryItem } from "./BlogTabsClient";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, Terminal, Music } from "lucide-react";

export default function BlogPage() {
  const posts: Post[] = getAllPosts();
  
  const categories: CategoryItem[] = [
    {
      category: "Music",
      description: "Production logs, sonic theory, and performance data.",
      tagline: "AUDIO_ENGINEERING // CREATIVE_PROCESS",
      link: "/blog/music",
      icon: "🎵",
      image: "/assets/blog/blog-post-covers/selina-farzaei-x2QHTVg2HqA-unsplash.jpg",
      color: "hover:bg-[#2B4592] hover:text-white", // Interaction color
      textColor: "text-[#2B4592]",
      bgColor: "bg-[#F4F3EF]"
    },
    {
      category: "Tech",
      description: "Code repositories, system architecture, and development logs.",
      tagline: "FULL_STACK // OPEN_SOURCE",
      link: "/blog/tech",
      icon: "💻",
      image: "/assets/blog/blog-post-covers/pontus-wellgraf-16_bFHg8Ouc-unsplash.jpg",
      color: "hover:bg-[#FF3B30] hover:text-white", // Interaction color
      textColor: "text-[#FF3B30]",
      bgColor: "bg-[#F4F3EF]"
    },
  ];

  return (
    <main className="min-h-screen bg-[#EAE8E3] text-black selection:bg-[#FF3B30] selection:text-white">
      
      {/* 1. BACKGROUND TEXTURE (Graph Paper) */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0" 
           style={{ 
             backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
           }}>
      </div>

      {/* 2. HERO SECTION: THE ARCHIVE HEADER */}
      <div className="relative z-10 w-full border-b-4 border-black bg-[#F4F3EF]">
        {/* Ticker Tape */}
        <div className="w-full bg-black text-[#F4F3EF] py-2 overflow-hidden border-b-2 border-black">
           <div className="animate-marquee whitespace-nowrap font-mono text-xs uppercase tracking-[0.3em] flex items-center gap-12">
              <span>/// ARCHIVE STATUS: OPEN</span>
              <span>/// LATEST LOGS AVAILABLE</span>
              <span>/// READING TIME: VARIABLE</span>
              <span>/// ARCHIVE STATUS: OPEN</span>
              <span>/// LATEST LOGS AVAILABLE</span>
              <span>/// READING TIME: VARIABLE</span>
           </div>
        </div>

        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] min-h-[50vh]">
           
           {/* Left: Typographic Monolith */}
           <div className="p-8 md:p-16 border-b-4 lg:border-b-0 lg:border-r-4 border-black flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4">
                 <div className="w-16 h-16 border-2 border-black rounded-full flex items-center justify-center animate-spin-slow">
                    <ArrowDownRight className="w-8 h-8" />
                 </div>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.85] tracking-tighter mb-6 relative z-10 mix-blend-multiply">
                 Insights<br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2B4592] to-[#FF3B30]">&</span> Logs
              </h1>
              
              <div className="flex flex-col gap-2 max-w-xl">
                 <div className="bg-black text-white px-4 py-2 font-mono text-sm uppercase tracking-widest w-fit transform -skew-x-12">
                    Knowledge_Base_v2.0
                 </div>
                 <p className="text-lg font-medium border-l-4 border-[#F4B400] pl-4 mt-4 text-gray-800">
                    Discover stories, tutorials, and insights from the intersection of Music and Technology.
                 </p>
              </div>
           </div>

           {/* Right: Abstract Visualization / Hero Image */}
           <div className="relative bg-black group overflow-hidden">
              <Image
                src="/assets/blog/blog-post-covers/mr-cup-fabien-barral-Mwuod2cm8g4-unsplash.jpg"
                alt="Archive"
                fill
                className="object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500"
                priority
              />
              {/* Scanlines */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
              
              <div className="absolute bottom-0 left-0 bg-[#F4B400] text-black px-6 py-3 font-bold uppercase tracking-wider border-t-4 border-r-4 border-black">
                 Fig. 01: The Library
              </div>
           </div>
        </div>
      </div>

      {/* 3. CATEGORY MODULES (The "Departments") */}
      <div className="relative z-10 border-b-4 border-black bg-white">
         <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2">
            
            {/* Music Department */}
            <Link href={categories[0].link} className="group relative h-64 md:h-80 border-b-4 md:border-b-0 md:border-r-4 border-black overflow-hidden flex flex-col justify-between p-8 hover:bg-[#2B4592] hover:text-white transition-colors duration-300">
               <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                     <Music className="w-8 h-8 md:w-12 md:h-12" />
                     <span className="font-mono text-xs uppercase tracking-widest opacity-70">Dept. 01</span>
                  </div>
                  <ArrowDownRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity transform -rotate-90 group-hover:rotate-0 duration-300" />
               </div>
               
               <div className="relative z-10">
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-2">{categories[0].category}</h2>
                  <p className="font-mono text-xs md:text-sm uppercase tracking-wider opacity-80 border-t-2 border-current pt-2 inline-block">
                     {categories[0].tagline}
                  </p>
               </div>

               {/* Hover Background Image (Subtle) */}
               <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none mix-blend-multiply">
                  <Image src={categories[0].image} alt="Music" fill className="object-cover grayscale" />
               </div>
            </Link>

            {/* Tech Department */}
            <Link href={categories[1].link} className="group relative h-64 md:h-80 border-black overflow-hidden flex flex-col justify-between p-8 hover:bg-[#FF3B30] hover:text-white transition-colors duration-300">
               <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                     <Terminal className="w-8 h-8 md:w-12 md:h-12" />
                     <span className="font-mono text-xs uppercase tracking-widest opacity-70">Dept. 02</span>
                  </div>
                  <ArrowDownRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity transform -rotate-90 group-hover:rotate-0 duration-300" />
               </div>
               
               <div className="relative z-10">
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-2">{categories[1].category}</h2>
                  <p className="font-mono text-xs md:text-sm uppercase tracking-wider opacity-80 border-t-2 border-current pt-2 inline-block">
                     {categories[1].tagline}
                  </p>
               </div>

               {/* Hover Background Image (Subtle) */}
               <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none mix-blend-multiply">
                  <Image src={categories[1].image} alt="Tech" fill className="object-cover grayscale" />
               </div>
            </Link>

         </div>
      </div>

      {/* 4. MAIN CONTENT FEED */}
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-16 lg:py-24 relative z-10">
         <div className="flex items-center gap-4 mb-12">
            <div className="w-4 h-4 bg-black dark:bg-white animate-pulse"></div>
            <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-gray-500">
               Listing_All_Entries
            </h3>
            <div className="h-[2px] flex-grow bg-black/10 dark:bg-white/10"></div>
         </div>

         {/* The Client Component Wrapper - styled to fit the grid */}
         <div className="bauhaus-feed-wrapper">
            <BlogTabsClient posts={posts} categories={categories} />
         </div>
      </div>

    </main>
  );
}