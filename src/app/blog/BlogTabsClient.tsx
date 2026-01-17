"use client";

import { useState } from "react";
import { Post } from "@/interfaces/post";
import Container from "@/app/_components/container";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Music, Terminal, Star, Clock } from "lucide-react";

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
      setMessage("Input required: Email Address");
      return;
    }
    // Simulate API Call
    setTimeout(() => {
       setMessage("Uplink Established. You are subscribed.");
       setEmail("");
    }, 1000);
  };

  return (
    <>
      {/* 1. THE SWITCHBOARD NAVIGATION */}
      <div className="sticky top-20 z-40 bg-[#EAE8E3] border-b-4 border-black shadow-[0_4px_0_0_rgba(0,0,0,0.1)]">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8">
          <nav className="flex overflow-x-auto no-scrollbar gap-2 py-4">
            {[
               { id: 'featured', label: 'Highlights', icon: Star },
               { id: 'all', label: 'Full Index', icon: Clock },
               { id: 'music', label: 'Audio Logs', icon: Music },
               { id: 'tech', label: 'Dev Log', icon: Terminal },
               { id: 'subscribe', label: 'Connect', icon: Mail }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-6 py-2 font-mono text-xs font-bold uppercase tracking-widest border-2 transition-all duration-100 ease-linear
                  whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'bg-black text-white border-black translate-x-[2px] translate-y-[2px] shadow-none'
                    : 'bg-white text-black border-black hover:bg-[#FF3B30] hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                  }
                `}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-16">
        
        {/* --- FEATURED TAB: THE HERO MODULE --- */}
        {activeTab === "featured" && featuredPost && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             
             {/* The Hero Post */}
             <div className="border-4 border-black bg-white grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] mb-24 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-300 group">
                <div className="p-8 md:p-16 flex flex-col justify-center border-b-4 lg:border-b-0 lg:border-r-4 border-black relative">
                   <div className="absolute top-0 left-0 bg-[#FF3B30] text-white px-4 py-1 font-mono text-xs uppercase tracking-widest">
                      Issue No. 01
                   </div>
                   <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-6 group-hover:text-[#2B4592] transition-colors">
                      <Link href={`/posts/${featuredPost.slug}`}>
                         {featuredPost.title}
                      </Link>
                   </h1>
                   <p className="text-lg font-medium leading-relaxed border-l-4 border-black pl-6 mb-8 text-gray-700">
                      {featuredPost.excerpt}
                   </p>
                   <Link 
                      href={`/posts/${featuredPost.slug}`}
                      className="self-start px-8 py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-[#FF3B30] transition-colors"
                   >
                      Read Article
                   </Link>
                </div>
                <div className="relative min-h-[400px] overflow-hidden bg-black">
                   <Image
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      fill
                      className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-60 transition-all duration-500 grayscale group-hover:grayscale-0"
                   />
                   <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
                </div>
             </div>

             {/* More Stories Grid */}
             {moreStories.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {moreStories.map((post, idx) => (
                      <div key={post.slug} className="border-2 border-black bg-white p-6 hover:shadow-[8px_8px_0px_0px_#2B4592] transition-shadow group">
                         <div className="font-mono text-xs text-gray-500 mb-2">0{idx + 2} // {new Date(post.date).toLocaleDateString()}</div>
                         <h3 className="text-xl font-bold uppercase leading-tight mb-4 group-hover:underline decoration-2 underline-offset-4">
                            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                         </h3>
                         <p className="text-sm text-gray-600 line-clamp-3 mb-4">{post.excerpt}</p>
                         <Link href={`/posts/${post.slug}`} className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-[#2B4592]">
                            Read <ArrowRight className="w-3 h-3" />
                         </Link>
                      </div>
                   ))}
                </div>
             )}

             {/* Categories (The Portals) */}
             <div className="mt-32">
                <div className="flex items-center gap-4 mb-12">
                   <div className="w-4 h-4 bg-black animate-pulse"></div>
                   <h2 className="text-4xl font-black uppercase tracking-tighter">Departments</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-black">
                   {categories.map((cat, i) => (
                      <Link 
                         key={cat.category} 
                         href={cat.link}
                         className={`
                            group relative h-80 border-b-4 md:border-b-0 ${i === 0 ? 'md:border-r-4' : ''} border-black overflow-hidden flex flex-col justify-between p-8 bg-white hover:text-white transition-colors duration-300
                         `}
                      >
                         {/* Hover Background Flood */}
                         <div className={`absolute inset-0 ${i === 0 ? 'bg-[#2B4592]' : 'bg-[#FF3B30]'} transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-0`}></div>
                         
                         <div className="relative z-10 flex justify-between items-start">
                            <span className="font-mono text-xs uppercase tracking-widest border-b-2 border-black group-hover:border-white pb-1">Dept. 0{i + 1}</span>
                            <span className="text-4xl">{cat.icon}</span>
                         </div>
                         
                         <div className="relative z-10">
                            <h3 className="text-5xl font-black uppercase tracking-tighter mb-2">{cat.category}</h3>
                            <p className="font-mono text-xs uppercase tracking-wider opacity-80">{cat.tagline}</p>
                         </div>
                      </Link>
                   ))}
                </div>
             </div>
          </div>
        )}

        {/* --- LISTING TABS (ALL, MUSIC, TECH) --- */}
        {(activeTab === "all" || activeTab === "music" || activeTab === "tech") && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex items-end justify-between border-b-4 border-black pb-4 mb-12">
                <h2 className="text-6xl font-black uppercase tracking-tighter">
                   {activeTab === 'all' ? 'Master Index' : activeTab.toUpperCase() + ' LOGS'}
                </h2>
                <span className="font-mono text-xs uppercase tracking-widest hidden md:block">
                   entries_count: {tabPosts.length}
                </span>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {tabPosts.length === 0 ? (
                   <div className="col-span-full border-2 border-dashed border-black p-12 text-center font-mono uppercase">
                      No Data Found in this Sector.
                   </div>
                ) : (
                   tabPosts.map((post) => (
                      <article key={post.slug} className="group border-2 border-black bg-white flex flex-col hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                         <div className="relative h-48 w-full border-b-2 border-black overflow-hidden bg-black">
                            <Image
                               src={post.coverImage}
                               alt={post.title}
                               fill
                               className="object-cover opacity-80 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                            />
                         </div>
                         <div className="p-6 flex flex-col flex-1">
                            <time className="font-mono text-xs text-gray-500 mb-2 block">{new Date(post.date).toLocaleDateString()}</time>
                            <h3 className="text-xl font-bold uppercase leading-tight mb-4 group-hover:text-[#FF3B30] transition-colors">
                               <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                            </h3>
                            <div className="mt-auto pt-4 border-t-2 border-black/10 flex justify-between items-center">
                               <span className="font-mono text-xs font-bold uppercase">Read File</span>
                               <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform" />
                            </div>
                         </div>
                      </article>
                   ))
                )}
             </div>
          </div>
        )}

        {/* --- SUBSCRIBE TAB --- */}
        {activeTab === "subscribe" && (
          <div className="max-w-2xl mx-auto py-12 animate-in zoom-in-95 duration-300">
             <div className="border-4 border-black bg-white p-8 md:p-12 shadow-[16px_16px_0px_0px_#F4B400]">
                <div className="flex justify-center mb-6">
                   <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
                      <Mail className="text-white w-10 h-10" />
                   </div>
                </div>
                <h2 className="text-4xl font-black text-center uppercase tracking-tighter mb-4">Establish Uplink</h2>
                <p className="text-center font-mono text-sm text-gray-600 mb-8 max-w-md mx-auto">
                   Receive transmission of new logs, sonic experiments, and visual data directly to your inbox.
                </p>
                
                <div className="flex flex-col gap-4">
                   <input
                      type="email"
                      placeholder="ENTER_EMAIL_ADDRESS"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-4 border-2 border-black bg-[#F4F3EF] font-mono text-sm focus:outline-none focus:bg-[#2B4592] focus:text-white focus:placeholder-white/50 transition-colors"
                   />
                   <button
                      onClick={handleSubscribe}
                      className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-[#FF3B30] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none"
                   >
                      Initialize
                   </button>
                </div>
                
                {message && (
                   <div className="mt-6 p-4 border-2 border-black bg-[#F4B400] font-mono text-xs font-bold text-center">
                      {message}
                   </div>
                )}
             </div>
          </div>
        )}

      </div>
    </>
  );
}