"use client";

import { useState } from "react";
import { Post } from "@/interfaces/post";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Music, Terminal, Star, Clock, ChevronRight, Search, X } from "lucide-react";
import { motion } from "framer-motion";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const featuredPost = posts[0];
  const allPosts = posts;
  const musicPosts = posts.filter((post) => (post.category || "").toLowerCase() === "music");
  const techPosts = posts.filter((post) => (post.category || "").toLowerCase() === "tech");

  // Determine base posts for the current tab
  let tabPosts: Post[] = [];
  if (activeTab === "all") tabPosts = allPosts;
  else if (activeTab === "music") tabPosts = musicPosts;
  else if (activeTab === "tech") tabPosts = techPosts;

  // Extract available tags for the active tab before filters are applied
  const basePostsForTab = activeTab === "all" ? allPosts : activeTab === "music" ? musicPosts : techPosts;
  const availableTags = Array.from(
    new Set(basePostsForTab.flatMap((post) => post.tags || []))
  ).filter(Boolean);

  // Apply filters
  if (selectedTag) {
    tabPosts = tabPosts.filter((post) => post.tags?.includes(selectedTag));
  }

  if (searchQuery.trim() !== "") {
    const query = searchQuery.toLowerCase().trim();
    tabPosts = tabPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags?.some((t) => t.toLowerCase().includes(query)) ||
        post.content?.toLowerCase().includes(query)
    );
  }

  const getReadTime = (content: string) => {
    if (!content) return 1;
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

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
        <div className="max-w-fit mx-auto liquid-glass-clear px-1.5 py-1.5 sm:px-2 sm:py-2 rounded-full shadow-2xl overflow-hidden">
          <nav className="flex gap-1 items-center justify-center overflow-hidden">
            {[
              { id: 'featured', label: 'Highlights', icon: Star },
              { id: 'all', label: 'All Logs', icon: Clock },
              { id: 'music', label: 'Music Logs', icon: Music },
              { id: 'tech', label: 'Dev Logs', icon: Terminal },
              { id: 'subscribe', label: 'Subscribe', icon: Mail },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSearchQuery("");
                  setSelectedTag(null);
                }}
                className={`
                  flex items-center justify-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-8 sm:py-3 rounded-full text-xs font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] transition-all whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'bg-primary text-background-primary shadow-xl scale-105'
                    : 'text-secondary hover:text-primary hover:bg-white/5'
                  }
                `}
              >
                <tab.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="min-h-[600px]">
        
        {/* --- FEATURED TAB --- */}
        {activeTab === "featured" && featuredPost && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-24">
             
             {/* The Hero Post artifact */}
             <div className="relative min-h-[450px] md:min-h-[550px] w-full mb-24 group rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.6)] border border-white/5 flex flex-col justify-end">
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-all duration-[3000ms] group-hover:scale-105 opacity-65 group-hover:opacity-85 blur-[4px] group-hover:blur-[2px]"
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"
                ></div>
                
                <div className="relative p-8 md:p-16 lg:p-20 flex flex-col justify-end z-10 mt-20">
                   <div className="max-w-4xl space-y-4 md:space-y-6">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-px bg-accent-blue animate-pulse" />
                         <span className="text-accent-blue font-mono text-[10px] uppercase tracking-[0.6em]">Priority_Sequence // Featured</span>
                      </div>
                      <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tighter uppercase leading-[0.9] text-white">
                         <Link href={`/posts/${featuredPost.slug}`}>
                            {featuredPost.title}
                         </Link>
                      </h2>
                      <p className="text-base md:text-lg text-white/70 font-light max-w-3xl leading-relaxed">
                         {featuredPost.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 items-center">
                         <Link href={`/posts/${featuredPost.slug}`} className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white text-black hover:bg-white/90 text-[10px] font-medium uppercase tracking-[0.4em] hover:scale-105 active:scale-95 transition-all">
                            Open Sequence <ArrowRight size={14} />
                         </Link>
                         <span className="text-[10px] font-mono text-white/60 tracking-widest px-4 py-2 border border-white/10 rounded-full bg-white/5">
                            {getReadTime(featuredPost.content)} MIN READ
                         </span>
                         <span className="text-[10px] font-mono text-accent-blue tracking-widest px-4 py-2 border border-accent-blue/20 rounded-full bg-accent-blue/10">
                            {featuredPost.category?.toUpperCase()}
                         </span>
                      </div>
                   </div>
                </div>
             </div>

              {/* Recent Logs Section */}
              <div className="space-y-10 py-8">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-px bg-accent-blue/30 animate-pulse" />
                    <h3 className="font-mono text-xs uppercase tracking-[0.5em] text-accent-blue">Recent_Activity // Log_Feed</h3>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.slice(1, 4).map((post, index) => {
                       const words = (post.content || "").trim().split(/\s+/).length;
                       const readTime = Math.max(1, Math.ceil(words / 200));
                       return (
                         <motion.div
                           key={post.slug}
                           initial={{ opacity: 0, y: 30 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.6, delay: index * 0.1 }}
                           className="group relative flex flex-col justify-between p-8 rounded-[2rem] liquid-glass border border-white/5 hover:border-accent-blue/20 transition-all duration-500"
                         >
                            <div className="space-y-4">
                               <div className="flex items-center justify-between text-[10px] font-mono text-secondary/50">
                                  <time>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                                  <span className="uppercase text-accent-blue px-2.5 py-0.5 border border-accent-blue/15 rounded-full bg-accent-blue/5">{post.category}</span>
                               </div>
                               <h4 className="text-xl font-light uppercase tracking-tight group-hover:text-primary transition-colors leading-snug pt-2">
                                  <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                                </h4>
                               <p className="text-sm text-secondary/75 line-clamp-3 leading-relaxed font-light">{post.excerpt}</p>
                            </div>
                            
                            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-secondary group-hover:text-primary transition-colors">
                               <span className="flex items-center gap-2">
                                  <Clock size={12} className="text-secondary/55" />
                                  {readTime} MIN READ
                               </span>
                               <Link href={`/posts/${post.slug}`} className="flex items-center gap-2 text-accent-blue font-semibold uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                                  Read Log <ArrowRight size={12} />
                               </Link>
                            </div>
                         </motion.div>
                      );
                    })}
                 </div>
              </div>

              {/* Portals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {categories.map((cat, index) => (
                   <motion.div
                     key={cat.category}
                     initial={{ opacity: 0, y: 40 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-40px" }}
                     transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                   >
                      <Link 
                         href={cat.link}
                         className="relative h-[500px] overflow-hidden rounded-[2.5rem] flex flex-col justify-end p-12 md:p-16 group shadow-2xl border border-white/5 hover:border-accent-blue/20 transition-colors block w-full"
                      >
                         <div className="absolute inset-0 z-0">
                            <Image src={cat.image} alt={cat.category} fill className="object-cover opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-[3000ms]" />
                            <div 
                              className="absolute inset-0 via-transparent to-transparent"
                              style={{ backgroundImage: 'linear-gradient(to top, var(--background-primary), color-mix(in srgb, var(--background-primary) 40%, transparent), transparent)' }}
                            />
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
                   </motion.div>
                ))}
             </div>
          </div>
        )}

        {/* --- LISTING TABS --- */}
        {(activeTab === "all" || activeTab === "music" || activeTab === "tech") && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
             
             {/* 2. SEARCH & FILTER CONTROLS */}
             <div className="flex flex-col md:flex-row gap-6 items-center justify-between pb-8 border-b border-white/5">
                <div className="relative w-full md:max-w-md">
                   <span className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/40">
                      <Search size={16} />
                   </span>
                   <input
                      type="text"
                      placeholder={`Search ${activeTab === 'all' ? 'all logs' : activeTab === 'music' ? 'music posts' : 'dev logs'}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-14 pr-12 py-4 rounded-full bg-white/[0.02] border border-white/10 text-sm font-mono tracking-wide placeholder:text-secondary/30 focus:outline-none focus:border-accent-blue/40 focus:bg-white/[0.04] transition-all text-primary"
                   />
                   {searchQuery && (
                      <button 
                         onClick={() => setSearchQuery("")}
                         className="absolute right-5 top-1/2 -translate-y-1/2 text-secondary/40 hover:text-primary transition-colors p-1"
                      >
                         <X size={16} />
                      </button>
                   )}
                </div>

                {availableTags.length > 0 && (
                   <div className="flex flex-wrap gap-2 items-center justify-start md:justify-end w-full md:w-auto">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary/40 mr-2">Filter signals:</span>
                      <button
                         onClick={() => setSelectedTag(null)}
                         className={`px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all border ${
                            selectedTag === null
                               ? 'bg-primary text-background-primary border-primary shadow-lg'
                               : 'text-secondary border-white/5 bg-white/[0.01] hover:border-white/10 hover:text-primary'
                         }`}
                      >
                         All
                      </button>
                      {availableTags.map((tag) => (
                         <button
                            key={tag}
                            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                            className={`px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all border ${
                               selectedTag === tag
                                  ? 'bg-accent-blue text-white border-accent-blue shadow-lg'
                                  : 'text-secondary border-white/5 bg-white/[0.01] hover:border-white/10 hover:text-primary'
                            }`}
                         >
                            {tag}
                         </button>
                      ))}
                   </div>
                )}
             </div>

             {/* 3. CARDS GRID */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {tabPosts.length === 0 ? (
                   <div className="col-span-full py-40 text-center rounded-[3rem] border border-dashed border-white/10">
                      <p className="font-mono text-xs uppercase tracking-[0.6em] text-secondary opacity-50 leading-relaxed">Reference_Not_Found<br/>Sector currently void of matching data logs.</p>
                      {(searchQuery || selectedTag) && (
                         <button 
                            onClick={() => { setSearchQuery(""); setSelectedTag(null); }}
                            className="mt-6 font-mono text-[10px] uppercase tracking-wider text-accent-blue hover:underline"
                         >
                            Reset filters
                         </button>
                      )}
                   </div>
                ) : (
                    tabPosts.map((post, index) => (
                       <motion.article 
                         key={post.slug} 
                         initial={{ opacity: 0, y: 30 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         viewport={{ once: true, margin: "-30px" }}
                         transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                         className="group relative flex flex-col liquid-glass rounded-[2rem] p-6 hover:-translate-y-1 transition-all"
                       >
                          <div className="relative aspect-[4/3] w-full overflow-hidden mb-8 rounded-2xl">
                             <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover transition-all duration-[3000ms] group-hover:scale-105 opacity-80 group-hover:opacity-100"
                             />
                             <div className="absolute top-4 left-4 z-10 inline-block px-3 py-1 rounded-full liquid-glass-clear text-[9px] font-mono uppercase tracking-widest text-primary font-semibold">
                                {post.category}
                             </div>
                          </div>
                          <div className="flex flex-col flex-1">
                             <div className="flex items-center justify-between gap-4 mb-6">
                                <div className="flex items-center gap-3">
                                   <div className="w-6 h-px bg-accent-blue/30" />
                                   <time className="text-[10px] font-mono text-accent-blue uppercase tracking-[0.3em]">
                                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </time>
                                </div>
                                <span className="text-[9px] font-mono text-secondary/50 uppercase tracking-widest">
                                   {getReadTime(post.content)} min read
                                 </span>
                             </div>
                             <h3 className="text-3xl font-light tracking-tighter mb-6 group-hover:text-primary transition-colors uppercase leading-[0.9]">
                                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                             </h3>
                             <p className="text-secondary font-light text-sm line-clamp-3 mb-8 leading-relaxed opacity-70 group-hover:opacity-90 transition-opacity">
                                {post.excerpt}
                             </p>
                             
                             {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mb-8 mt-auto">
                                   {post.tags.slice(0, 3).map(tag => (
                                      <span 
                                         key={tag} 
                                         onClick={(e) => {
                                            e.preventDefault();
                                            setSelectedTag(selectedTag === tag ? null : tag);
                                         }}
                                         className={`text-[8px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border cursor-pointer transition-colors ${
                                            selectedTag === tag 
                                               ? 'bg-accent-blue border-accent-blue text-white' 
                                               : 'border-white/5 bg-white/[0.02] text-secondary hover:border-accent-blue/30 hover:text-primary'
                                         }`}
                                      >
                                         #{tag}
                                      </span>
                                   ))}
                                </div>
                             )}

                             <div className="pt-6 border-t border-white/5 flex justify-between items-center opacity-60 group-hover:opacity-100 transition-all">
                                <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-secondary">Execute_Log</span>
                                <ArrowRight className="w-5 h-5 text-accent-blue group-hover:translate-x-3 transition-transform" />
                             </div>
                          </div>
                       </motion.article>
                    ))
                )}
             </div>

             {/* 4. MID-PAGE NEWSLETTER INJECT (Liquid Glass Banner) */}
             <div className="relative overflow-hidden rounded-[2rem] p-10 md:p-16 border border-white/5 liquid-glass shadow-2xl mt-16">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/5 to-transparent opacity-40"></div>
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                   <div className="space-y-3 text-center lg:text-left max-w-xl">
                      <div className="flex items-center gap-3 justify-center lg:justify-start">
                         <Mail size={14} className="text-accent-blue" />
                         <span className="text-accent-blue font-mono text-[9px] uppercase tracking-[0.5em]">SYSTEM_COMMUNICATION</span>
                      </div>
                      <h4 className="text-3xl font-light uppercase tracking-tighter text-primary">Establish Uplink Channel</h4>
                      <p className="text-secondary text-sm font-light leading-relaxed">
                         Receive low-frequency dispatches of experimental systems, synthesis logs, and architectural breakdowns.
                      </p>
                   </div>
                   
                   <div className="flex flex-col sm:flex-row gap-4 w-full lg:max-w-md">
                      <input
                         type="email"
                         placeholder="ENDPOINT_EMAIL"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         className="flex-1 px-6 py-4 rounded-full bg-white/[0.02] border border-white/15 font-mono text-xs uppercase tracking-wider focus:outline-none focus:border-accent-blue/40 text-primary text-center sm:text-left"
                      />
                      <button 
                         onClick={handleSubscribe} 
                         disabled={isLoading}
                         className="px-8 py-4 rounded-full bg-primary text-background-primary text-xs font-semibold uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all"
                      >
                         {isLoading ? "SYNCING..." : "CONNECT"}
                      </button>
                   </div>
                </div>
                {message && (
                   <div className="mt-6 text-center font-mono text-[9px] uppercase tracking-widest text-accent-blue">
                      {message}
                   </div>
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
