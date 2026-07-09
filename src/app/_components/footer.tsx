import Container from "@/app/_components/container";
import { SITE_NAME } from "@/lib/constants";
import { Github, Instagram, Globe, Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    style={{ width: size, height: size }}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/**
 * Footer component
 * Displays the site footer with a clean, Apple-like glassmorphism aesthetic.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "X", url: "https://x.com/leonnduati", icon: XIcon },
    { name: "Instagram", url: "https://instagram.com/thoughtsofman_", icon: Instagram },
    { name: "GitHub", url: "https://github.com/git2mann", icon: Github },
    { name: "Contact", url: "/contact", icon: Mail },
  ];

  const siteLinks = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Music", href: "/music" },
    { name: "Art", href: "/art" },
    { name: "Projects", href: "/projects" },
  ];

  return (
    <footer>
      <div className="liquid-glass p-6 md:p-10 overflow-hidden relative w-full hover:scale-100">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none overflow-hidden">
          <div className="text-[15rem] font-light absolute -bottom-10 -left-10 leading-none uppercase select-none">
            {SITE_NAME}
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Left: Branding & Message */}
            <div>
              <h3 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
                {SITE_NAME}.
              </h3>
              <p className="text-xl text-secondary font-medium max-w-md mb-6 leading-relaxed">
                Constructor of sonic architectures and visual systems. Exploring the boundary between art and logic.
              </p>
              
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a 
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center text-primary hover:bg-accent-blue/10 hover:text-accent-blue transition-all"
                    aria-label={social.name}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Links & CTA */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-base font-medium uppercase tracking-widest text-secondary mb-4">Navigation</h4>
                <ul className="space-y-2">
                  {siteLinks.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-xl font-medium hover:text-accent-blue transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-base font-medium uppercase tracking-widest text-secondary mb-4">Collaboration</h4>
                <p className="text-base text-secondary font-medium mb-4">
                  Interested in starting a project or just want to say hi?
                </p>
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 font-medium text-accent-blue group text-lg"
                >
                  Send a dispatch
                  <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm font-medium text-secondary uppercase tracking-widest">
              © {currentYear} {SITE_NAME}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-medium uppercase tracking-widest text-secondary">System Optimal</span>
              </div>
              <span className="text-xs font-medium uppercase tracking-widest text-secondary opacity-50">NBO // KE</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;