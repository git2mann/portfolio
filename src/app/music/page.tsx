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
    <main className="min-h-screen">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/blog/blog-post-covers/jawz-9Ut0azurqg0-unsplash.jpg"
            alt="Music Hero"
            fill
            className="object-cover transform scale-105"
            style={{
              transform: 'scale(1.1)',
              filter: 'brightness(0.7)'
            }}
            priority
          />
        </div>
        <Container>
          <div className="relative h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
                My Music
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 animate-fade-in delay-200">
                Exploring sound, pushing boundaries, and creating experiences through music.
              </p>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        {/* Navigation Tabs */}
        <div className="sticky top-16 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg py-4 -mt-16 rounded-lg shadow-lg">
          <nav className="flex flex-wrap justify-center gap-2 md:space-x-4">
            {['discography', 'featured', 'shows', 'videos', 'production'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-black text-white dark:bg-white dark:text-black scale-105'
                    : 'hover:bg-gray-100 dark:hover:bg-slate-800'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Dynamic Content Based on Active Tab */}
        <div className="mt-12 space-y-16">
          {activeTab === 'discography' && (
            <>
              {/* Albums Section */}
              <section>
                <h2 className="text-3xl md:text-4xl font-bold mb-8">Albums</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {albums.map((album) => (
                    <Link
                      href={`/music/${album.id}`}
                      key={album.id}
                      className="group relative bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
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
                        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {album.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                          <FiCalendar className="mr-2" />
                          {album.releaseYear}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{album.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* EPs Section */}
              <section>
                <h2 className="text-3xl md:text-4xl font-bold mb-8">EPs</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {eps.map((ep) => (
                    <Link
                      href={`/music/eps/${ep.id}`}
                      key={ep.id}
                      className="group relative bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
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
                        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {ep.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
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
                <h2 className="text-3xl md:text-4xl font-bold mb-8">Singles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {singles.map((single) => (
                    <Link
                      href={`/music/singles/${single.id}`}
                      key={single.id}
                      className="group relative bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
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
                        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {single.title}
                        </h3>
                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
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
              </section>
            </>
          )}

          {activeTab !== 'discography' && (
            <div className="flex items-center justify-center h-64">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Coming soon! Check back later for {activeTab} content.
              </p>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}