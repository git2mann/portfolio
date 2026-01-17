import Container from "@/app/_components/container";
import { SITE_NAME } from "@/lib/constants";
import { ArrowUpRight, Github, Twitter, Instagram, Globe } from "lucide-react";

/**
 * Footer component
 * Displays the site footer with site name, definition, and social links
 * in a Neo-Bauhaus / Brutalist aesthetic.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F4F3EF] dark:bg-[#0A0A0A] text-black dark:text-[#F4F3EF] border-t-4 border-black dark:border-white relative overflow-hidden font-bauhaus">
      
      {/* 1. THE FOUNDATION STRIP (Decor) */}
      <div className="w-full h-4 flex border-b-4 border-black dark:border-white">
        <div className="w-[20%] bg-[#FF3B30]"></div> {/* Red */}
        <div className="w-[30%] bg-[#2B4592]"></div> {/* Blue */}
        <div className="w-[10%] bg-[#F4B400]"></div> {/* Yellow */}
        <div className="w-[40%] bg-black dark:bg-white"></div>
      </div>

      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-0">
          
          {/* --- LEFT COLUMN: IDENTITY MONOLITH --- */}
          <div className="p-8 md:p-16 lg:border-r-4 border-black dark:border-white flex flex-col justify-between">
            <div>
              <h3 className="text-[15vw] lg:text-[8rem] font-black uppercase leading-[0.8] tracking-tighter mb-8 select-none">
                {SITE_NAME}
                <span className="text-[#FF3B30]">.</span>
              </h3>
              
              {/* The Definition Card */}
              <div className="max-w-md bg-white dark:bg-[#1a1a1a] border-2 border-black dark:border-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-200 cursor-help group">
                <div className="flex items-center justify-between mb-2 border-b-2 border-dashed border-gray-300 pb-2">
                   <span className="font-mono text-xs uppercase tracking-widest text-gray-500">Dictionary_Ref_01</span>
                   <div className="w-3 h-3 bg-[#F4B400] rounded-full border border-black group-hover:animate-pulse"></div>
                </div>
                <div className="font-serif text-2xl font-bold mb-1">
                  klense <span className="font-normal italic text-gray-500 text-lg">/klɛnz/</span>
                </div>
                <div className="font-mono text-sm leading-relaxed">
                  <span className="font-bold bg-black text-white px-1 mr-2">n.</span>
                  the artist; a constructor of sonic architectures and visual systems.
                </div>
              </div>
            </div>

            {/* Quote / Mission */}
            <div className="mt-16 hidden lg:block">
               <p className="text-xl font-bold uppercase tracking-tight max-w-lg leading-tight">
                  "Form follows function. Sound follows emotion."
               </p>
            </div>
          </div>

          {/* --- RIGHT COLUMN: CONNECTIVITY MODULE --- */}
          <div className="flex flex-col border-t-4 lg:border-t-0 border-black dark:border-white">
            
            {/* Social Links List */}
            <ul className="flex-grow flex flex-col">
              {[
                { name: "X (Twitter)", url: "https://x.com/leonnduati", color: "hover:bg-[#000000] hover:text-white", icon: Twitter },
                { name: "Instagram", url: "https://instagram.com/thoughtsofman_", color: "hover:bg-[#E1306C] hover:text-white", icon: Instagram },
                { name: "GitHub", url: "https://github.com/git2mann", color: "hover:bg-[#2B4592] hover:text-white", icon: Github },
                { name: "Portfolio", url: "/", color: "hover:bg-[#F4B400] hover:text-black", icon: Globe },
              ].map(({ name, url, color, icon: Icon }, idx) => (
                <li key={name} className="flex-1">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      group flex items-center justify-between h-full w-full px-8 md:px-12 py-8
                      border-b-2 border-black dark:border-white
                      font-bold text-2xl md:text-3xl uppercase tracking-tighter
                      transition-all duration-300 ease-out
                      ${color}
                    `}
                  >
                    <div className="flex items-center gap-4">
                       <span className="font-mono text-xs font-normal opacity-50">0{idx + 1}</span>
                       <span className="group-hover:translate-x-4 transition-transform duration-300">{name}</span>
                    </div>
                    <Icon className="w-8 h-8 md:w-10 md:h-10 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Newsletter / Contact Box Stub */}
            <div className="bg-[#2B4592] text-white p-8 md:p-12">
               <h4 className="font-mono text-xs uppercase tracking-widest mb-4 opacity-80">Direct Line</h4>
               <a href="mailto:nduatileon@gmail.com" className="text-2xl md:text-4xl font-black uppercase underline decoration-4 underline-offset-8 hover:text-[#F4B400] transition-colors">
                  nduatileon@gmail.com
               </a>
            </div>
          </div>
        </div>
      </div>

      {/* --- FOOTER BASE: TECHNICAL READOUT --- */}
      <div className="bg-black text-white dark:bg-white dark:text-black py-4 px-6 border-t-4 border-white dark:border-black">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center font-mono text-[10px] md:text-xs uppercase tracking-widest gap-4">
            
            <div className="flex items-center gap-4">
               <span>© {currentYear} {SITE_NAME} INC.</span>
               <span className="hidden md:inline">|</span>
               <span>ALL RIGHTS RESERVED</span>
            </div>

            <div className="flex items-center gap-6">
               <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#00FF00] rounded-full animate-pulse"></span>
                  SYSTEM: OPTIMAL
               </span>
               <span>NAIROBI_KE</span>
            </div>

          </div>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;