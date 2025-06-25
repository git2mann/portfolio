'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from "@/app/_components/container";
import { albums, eps, singles } from "@/data/music";
import { FiHeadphones, FiCalendar, FiClock } from 'react-icons/fi';

export default function MusicPage() {
  const [hoveredAlbum, setHoveredAlbum] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('discography');

  return (
    <main className="min-h-screen bg-[var(--background-primary)]">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/blog/blog-post-covers/jawz-9Ut0azurqg0-unsplash.jpg"
            alt="Music Hero"
            fill
            className="object-cover w-full h-full transform scale-105"
            style={{
              filter: 'brightness(0.7)'
            }}
            priority
          />
        </div>
        <div className="relative h-full flex items-center w-full mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
              My Music
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 animate-fade-in delay-200">
              Exploring sound, pushing boundaries, and creating experiences through music.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - Full width sticky bar */}
      <div className="sticky top-16 z-10 w-full bg-[var(--background-primary)]/80 backdrop-blur-lg py-4 -mt-16 rounded-lg shadow-lg border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <nav className="flex flex-wrap justify-center gap-2 md:space-x-4">
            {['discography', 'featured', 'shows', 'videos', 'production'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-[var(--card-background)] text-[var(--text-primary)] scale-105'
                    : 'hover:bg-[var(--hover-background)] text-[var(--text-secondary)]'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <Container>
        {/* Dynamic Content Based on Active Tab */}
        <div className="mt-12 space-y-16">
          {activeTab === 'discography' && (
            <>
              {/* Albums Section */}
              <section>
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[var(--text-primary)]">Albums</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {albums.map((album) => (
                    <Link
                      href={`/music/${album.id}`}
                      key={album.id}
                      className="group relative bg-[var(--card-background)] border border-[var(--border-color)] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                      onMouseEnter={() => setHoveredAlbum(album.id)}
                      onMouseLeave={() => setHoveredAlbum(null)}
                    >
                      <div className="relative aspect-square overflow-hidden rounded-t-xl">
                        <Image
                          src={album.coverImage}
                          alt={`Cover of ${album.title}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                          <FiHeadphones className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--text-accent)] transition-colors">
                          {album.title}
                        </h3>
                        <div className="flex items-center text-sm text-[var(--text-secondary)] mb-3">
                          <FiCalendar className="mr-2" />
                          {album.releaseYear}
                        </div>
                        <p className="text-[var(--text-secondary)]">{album.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* EPs Section */}
              <section>
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[var(--text-primary)]">EPs</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {eps.map((ep) => (
                    <Link
                      href={`/music/eps/${ep.id}`}
                      key={ep.id}
                      className="group relative bg-[var(--card-background)] border border-[var(--border-color)] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-t-xl">
                        <Image
                          src={ep.coverImage}
                          alt={`Cover of ${ep.title}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                          <FiHeadphones className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--text-accent)] transition-colors">
                          {ep.title}
                        </h3>
                        <div className="flex items-center text-sm text-[var(--text-secondary)]">
                          <FiCalendar className="mr-2" />
                          {ep.releaseYear}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Singles Section */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[var(--text-primary)]">Singles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {singles.map((single) => (
                    <Link
                      href={`/music/singles/${single.id}`}
                      key={single.id}
                      className="group relative bg-[var(--card-background)] border border-[var(--border-color)] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-t-xl">
                        <Image
                          src={single.coverImage}
                          alt={`Cover of ${single.title}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                          <FiHeadphones className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--text-accent)] transition-colors">
                          {single.title}
                        </h3>
                        <div className="flex items-center justify-between text-sm text-[var(--text-secondary)]">
                          <div className="flex items-center">
                            <FiCalendar className="mr-2" />
                            {single.releaseYear}
                          </div>
                          <div className="flex items-center">
                            <FiClock className="mr-2" />
                            {single.duration}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                {/* Add extra space after singles */}
                <div className="h-12" />
              </section>
            </>
          )}

          {activeTab !== 'discography' && (
            <div className="flex items-center justify-center h-64">
              <p className="text-lg text-[var(--text-secondary)]">
                Coming soon! Check back later for {activeTab} content.
              </p>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}