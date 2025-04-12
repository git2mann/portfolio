'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from "@/app/_components/container";
import { albums, eps, singles } from "@/data/music";

export default function MusicPage() {
  const [hoveredAlbum, setHoveredAlbum] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('discography');

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-100 to-white dark:from-slate-900 dark:to-slate-800">
      <Container>
        {/* Hero Section */}
        <section className="relative h-[50vh] sm:h-[60vh] mb-16 rounded-xl overflow-hidden">
          <Image
            src="/assets/blog/blog-post-covers/jawz-9Ut0azurqg0-unsplash.jpg"
            alt="Music Hero"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4">My Music</h1>
              <p className="text-lg sm:text-xl md:text-2xl">Exploring sound, pushing boundaries</p>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <nav className="flex space-x-4 bg-white dark:bg-slate-800 rounded-lg p-2 px-4 overflow-x-auto scrollbar-hide">
            {['discography', 'featured', 'shows', 'videos', 'production'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 whitespace-nowrap rounded-md transition-colors ${
                  activeTab === tab
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Dynamic Content Based on Active Tab */}
        <div className="space-y-16">
          {activeTab === 'discography' && (
            <section>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center sm:text-left">Discography</h2>

              {/* Albums Section */}
              <div className="mb-16">
                <h3 className="text-2xl font-semibold mb-6">Albums</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {albums.map((album) => (
                    <Link
                      href={`/music/${album.id}`}
                      key={album.id}
                      className="group relative rounded-lg overflow-hidden shadow-lg bg-white dark:bg-slate-800 transition-transform transform hover:scale-105 focus:scale-105 focus:outline-none"
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={album.coverImage}
                          alt={`Cover of ${album.title}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg sm:text-xl font-bold mb-2">{album.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{album.releaseYear}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{album.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* EPs Section */}
              <div className="mb-16">
                <h3 className="text-2xl font-semibold mb-6">EPs</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {eps.map((ep) => (
                    <Link
                      href={`/music/eps/${ep.id}`}
                      key={ep.id}
                      className="group relative rounded-lg overflow-hidden shadow-lg bg-white dark:bg-slate-800 transition-transform transform hover:scale-105 focus:scale-105 focus:outline-none"
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={ep.coverImage}
                          alt={`Cover of ${ep.title}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg sm:text-xl font-bold mb-2">{ep.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{ep.releaseYear}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Singles Section */}
              <div>
                <h3 className="text-2xl font-semibold mb-6">Singles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {singles.map((single) => (
                    <Link
                      href={`/music/singles/${single.id}`}
                      key={single.id}
                      className="group relative rounded-lg overflow-hidden shadow-lg bg-white dark:bg-slate-800 transition-transform transform hover:scale-105 focus:scale-105 focus:outline-none"
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={single.coverImage}
                          alt={`Cover of ${single.title}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg sm:text-xl font-bold mb-2">{single.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{single.releaseYear}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{single.duration}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </Container>
    </main>
  );
}
