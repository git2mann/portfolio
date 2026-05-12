"use client";

import { useState } from "react";
import { Post } from "@/interfaces/post";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Music, Terminal, Star, Clock, ChevronRight } from "lucide-react";
import { RefractiveButton } from "@/app/_components/RefractiveButton";

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
  const [website, setWebsite] = useState(""); // Honeypot
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const featuredPost = posts[0];
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

    if (website) {
      setMessage("Uplink Established. You are subscribed.");
      setEmail("");
      setWebsite("");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Uplink Established. You are subscribed.");
        setEmail("");
      } else {
        setMessage(`Error: ${data.error || "Uplink Failed"}`);
      }
    } catch (error) {
      setMessage("Critical Error: Connection Lost.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-16">
      {/* 1. NAVIGATION TABS */}
      <div className="sticky top-24 z-40 mb-12">
        <div className="max-w-fit mx-auto liquid-glass-clear px-2 py-2 rounded-full shadow-2xl border border-white/5 overflow-hidden">
          <nav className="flex gap-1 overflow-x-auto no-scrollbar">
            {[
               { id: 'featured', label: 'Highlights', icon: Star },
               { id: 'all', label: 'All Posts', icon: Clock },
               { id: 'music', label: 'Music Posts', icon: Music },
               { id: 'tech', label: 'Dev Posts', icon: Terminal },
               
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-3 px-8 py-3 rounded-full text-xs font-medium uppercase tracking-[0.3em] transition-all whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'bg-primary text-background-primary shadow-xl'
                    : 'text-secondary hover:text-primary hover:bg-white/5'
                  }
                `}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="min-h-[600px]">
        
        {/* --- FEATURED TAB --- */}
        {activeTab === "featured" && featuredPost && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
             
             {/* The Hero Post artifact */}
             <div className="relative min-h-[600px] md:min-h-[80vh] w-full mb-32 group rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.6)] border border-white/5 flex flex-col justify-end">
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-all duration-[3000ms] group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div 
                  className="absolute inset-0 via-transparent to-transparent opacity-95"
                  style={{ backgroundImage: 'linear-gradient(to top, var(--background-primary), color-mix(in srgb, var(--background-primary) 20%, transparent), transparent)' }}
                ></div>
                
                <div className="relative p-10 md:p-24 lg:p-32 flex flex-col justify-end z-10 mt-20">
                   <div className="max-w-5xl space-y-8 md:space-y-12">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-px bg-accent-blue" />
                         <span className="text-accent-blue font-mono text-[10px] uppercase tracking-[0.6em]">Priority_Sequence // Featured</span>
                      </div>
                      <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-light tracking-tighter uppercase leading-[0.75] text-primary">
                         <Link href={`/posts/${featuredPost.slug}`}>
                            {featuredPost.title}
                         </Link>
                      </h2>
                      <p className="text-xl md:text-3xl text-secondary font-light max-w-3xl leading-relaxed group-hover:opacity-100 transition-opacity">
                         {featuredPost.excerpt}
                      </p>
                      <div className="pt-8">
                         <Link href={`/posts/${featuredPost.slug}`} className="inline-flex items-center gap-6 px-10 py-5 rounded-full bg-primary text-background-primary text-xs font-medium uppercase tracking-[0.4em] hover:scale-105 active:scale-95 transition-all">
                            Open Sequence <ArrowRight size={18} />
                         </Link>
                      </div>
                   </div>
                </div>
             </div>

             {/* Portals */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {categories.map((cat) => (
                   <Link 
                      key={cat.category} 
                      href={cat.link}
                      className="relative h-[500px] overflow-hidden rounded-[2.5rem] flex flex-col justify-end p-12 md:p-16 group shadow-2xl border border-white/5"
                   >
                      <div className="absolute inset-0 z-0">
                         <Image src={cat.image} alt={cat.category} fill className="object-cover opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-[3000ms]" />
                         <div 
                           className="absolute inset-0 via-transparent to-transparent"
                           style={{ backgroundImage: 'linear-gradient(to top, var(--background-primary), color-mix(in srgb, var(--background-primary) 40%, transparent), transparent)' }}
                         ></div>
                      </div>
                      
                      <div className="relative z-10 space-y-8">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-px bg-accent-blue/50" />
                            <span className="text-accent-blue font-mono text-[10px] uppercase tracking-[0.4em] mb-0 block">{cat.tagline}</span>
                         </div>
                         <h3 className="text-7xl md:text-8xl font-light uppercase tracking-tighter text-primary leading-[0.7]">{cat.category}</h3>
                         <p className="text-secondary font-light text-xl max-w-sm group-hover:opacity-100 transition-opacity leading-relaxed">{cat.description}</p>
                         <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.5em] text-accent-blue group-hover:translate-x-4 transition-transform pt-4">
                            Establish_Entry <ChevronRight size={20} />
                         </div>
                      </div>
                   </Link>
                ))}
             </div>
          </div>
        )}

        {/* --- LISTING TABS --- */}
        {(activeTab === "all" || activeTab === "music" || activeTab === "tech") && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {tabPosts.length === 0 ? (
                   <div className="col-span-full py-40 text-center rounded-[3rem] border border-dashed border-white/10">
                      <p className="font-mono text-xs uppercase tracking-[0.6em] text-secondary opacity-50 leading-relaxed">Reference_Not_Found<br/>Sector currently void of data logs.</p>
                   </div>
                ) : (
                   tabPosts.map((post) => (
                      <article key={post.slug} className="group relative flex flex-col bg-white/[0.01] border border-white/5 transition-all duration-700 rounded-2xl p-6 shadow-xl hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)]" style={{ borderColor: 'transparent' }}>
                         <div className="relative aspect-[4/3] w-full overflow-hidden mb-10 rounded-xl">
                            <Image
                               src={post.coverImage}
                               alt={post.title}
                               fill
                               className="object-cover transition-all duration-[3000ms] group-hover:scale-110 opacity-70 group-hover:opacity-100"
                            />
                            <div className="absolute top-4 left-4 inline-block px-3 py-1 rounded-full liquid-glass-clear text-[9px] font-mono uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity">
                               {post.category}
                            </div>
                         </div>
                         <div className="flex flex-col flex-1 px-4 pb-4">
                            <div className="flex items-center gap-4 mb-6">
                               <div className="w-8 h-px" style={{ backgroundColor: 'color-mix(in srgb, var(--accent-blue) 30%, transparent)' }} />
                               <time className="text-[10px] font-mono text-accent-blue uppercase tracking-[0.3em]">
                                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </time>
                            </div>
                            <h3 className="text-4xl font-light tracking-tighter mb-8 group-hover:text-white transition-colors uppercase leading-[0.85]">
                               <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                            </h3>
                            <p className="text-secondary font-light text-base line-clamp-2 mb-10 opacity-70 group-hover:opacity-90 transition-opacity leading-relaxed">
                               {post.excerpt}
                            </p>
                            <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center opacity-60 group-hover:opacity-100 transition-all">
                               <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-secondary">Execute_Log</span>
                               <ArrowRight className="w-5 h-5 text-accent-blue group-hover:translate-x-3 transition-transform" />
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
          <div className="max-w-4xl mx-auto py-12 animate-in zoom-in-95 duration-700">
             <div className="relative overflow-hidden rounded-[3rem] p-16 md:p-32 text-center bg-white/[0.01] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.4)]">
                <div 
                  className="absolute inset-0 opacity-40"
                  style={{ background: 'radial-gradient(circle at center, color-mix(in srgb, var(--accent-blue) 10%, transparent), transparent)' }}
                ></div>
                
                <div className="w-32 h-32 bg-white/5 border border-white/5 rounded-full flex items-center justify-center mx-auto mb-16 shadow-2xl relative z-10 animate-in fade-in zoom-in duration-1000">
                   <Mail className="text-accent-blue w-12 h-12 animate-pulse" />
                </div>
                
                <div className="relative z-10">
                   <div className="flex items-center justify-center gap-4 mb-8">
                      <div className="w-12 h-px" style={{ backgroundColor: 'color-mix(in srgb, var(--accent-blue) 40%, transparent)' }} />
                      <span className="text-accent-blue font-mono text-[10px] uppercase tracking-[0.6em]">System_Establishment</span>
                   </div>
                   <h2 className="text-7xl md:text-8xl font-light uppercase tracking-tighter mb-12 text-primary leading-none">Uplink</h2>
                   <p className="text-secondary font-light text-2xl mb-20 max-w-xl mx-auto leading-relaxed italic opacity-80">
                      Automated dispatches of technical modules, sonic studies, and high-fidelity data logs.
                   </p>
                   
                   <div className="space-y-8 max-w-md mx-auto">
                      <div className="relative">
                         <div className="absolute opacity-0 -z-10 h-0 w-0 overflow-hidden">
                            <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" />
                         </div>

                         <input
                            type="email"
                            placeholder="ENDPOINT_EMAIL"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                            className="w-full px-10 py-6 rounded-full bg-white/[0.03] border border-white/10 font-mono text-sm uppercase tracking-[0.3em] focus:outline-none focus:border-accent-blue/50 focus:bg-white/[0.05] transition-all disabled:opacity-50 text-center text-primary placeholder:text-secondary/30"
                         />
                      </div>
                      
                      <button 
                        onClick={handleSubscribe} 
                        disabled={isLoading}
                        className="w-full h-24 rounded-full bg-primary text-background-primary flex items-center justify-center gap-6 group hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden"
                      >
                         <span className="text-xl font-medium uppercase tracking-[0.5em] relative z-10">{isLoading ? "SYNCING..." : "INITIALIZE_UPLINK"}</span>
                         <ArrowRight size={24} className="relative z-10 group-hover:translate-x-3 transition-transform" />
                         <div className="absolute inset-0 bg-accent-blue translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                      </button>
                   </div>
                   
                   {message && (
                      <div 
                        className="mt-16 p-10 rounded-2xl border font-mono text-[10px] uppercase tracking-[0.5em] animate-in slide-in-from-top-6"
                        style={{ backgroundColor: 'color-mix(in srgb, var(--accent-blue) 5%, transparent)', borderColor: 'color-mix(in srgb, var(--accent-blue) 10%, transparent)', color: 'var(--accent-blue)' }}
                      >
                         {message}
                      </div>
                   )}
                </div>
             </div>
          </div>
        )}

      </div>
    </div>
  );
}
