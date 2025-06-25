'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from "@/app/_components/container";

// Removed unused icons and types for brevity

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('featured');

  return (
    <main className="min-h-screen bg-[var(--background-primary)]">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/blog/blog-post-covers/pontus-wellgraf-16_bFHg8Ouc-unsplash.jpg"
            alt="Projects Hero"
            fill
            className="object-cover w-full h-full transform scale-105"
            style={{
              filter: 'brightness(0.7)'
            }}
            priority
            sizes="100vw"
          />
        </div>
        <div className="relative h-full flex items-center w-full mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
              My Projects
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 animate-fade-in delay-200">
              Building innovative solutions across web, mobile, and emerging technologies.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - Full width sticky bar */}
      <div className="sticky top-16 z-10 w-full bg-[var(--background-primary)]/80 backdrop-blur-lg py-4 -mt-16 rounded-lg shadow-lg border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <nav className="flex flex-wrap justify-center gap-2 md:space-x-4">
            {['featured', 'all', 'web', 'mobile', 'open-source', 'ai', 'tools'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-[var(--card-background)] text-[var(--text-primary)] scale-105'
                    : 'hover:bg-[var(--hover-background)] text-[var(--text-secondary)]'
                }`}
              >
                {tab === 'open-source' ? 'Open Source' : 
                 tab === 'ai' ? 'AI/ML' : 
                 tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <Container>
        {/* Placeholder Content */}
        <div className="flex flex-col items-center justify-center min-h-[40vh] py-24">
          <svg width="96" height="96" fill="none" viewBox="0 0 96 96" className="mb-6 opacity-60">
            <rect x="8" y="24" width="80" height="48" rx="8" fill="#e5e7eb" />
            <rect x="20" y="36" width="56" height="8" rx="4" fill="#c7d2fe" />
            <rect x="20" y="52" width="32" height="8" rx="4" fill="#c7d2fe" />
            <rect x="56" y="52" width="20" height="8" rx="4" fill="#e0e7ff" />
          </svg>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[var(--text-primary)] text-center">Projects Coming Soon</h2>
          <p className="text-lg text-[var(--text-secondary)] text-center max-w-xl">
            I'm working on some exciting projects! Check back soon for updates, or <Link href="/contact" className="text-blue-600 hover:underline">get in touch</Link> if you'd like to collaborate.
          </p>
        </div>
      </Container>
    </main>
  );
}