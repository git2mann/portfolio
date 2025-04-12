'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from "@/app/_components/container";

const albums = [
  {
    id: "1",
    title: "Squealer and the Aggressors of Peace",
    coverImage: "/assets/music-assets/SQUEALER AND THE AGGRESSORS OF PEACE Album Cover.jpeg",
    releaseYear: "2022",
    description: "A groundbreaking album that pushes boundaries and challenges conventions."
  },
  {
    id: "2",
    title: "Lazlo",
    coverImage: "/assets/music-assets/Lazlo Album Cover (Final).jpeg",
    releaseYear: "2021",
    description: "Rap inspired by a childhood classic."
  },
  {
    id: "3",
    title: "Son Of Ink",
    coverImage: "/assets/music-assets/Son Of Ink Album Cover.jpeg",
    releaseYear: "2021",
    description: "A journey through personal growth and awakening."
  }
];

export const eps = [
  {
    id: "1",
    title: "Some Of Ink EP",
    coverImage: "/assets/music-assets/Some Of Ink EP Cover.png", // Use the existing image
    releaseYear: "2025",
    tracks: [
      { id: "1", title: "Back Again, Again", duration: "2:02" },
      { id: "2", title: "Still Ultimate", duration: "2:49" },
      { id: "3", title: "Just Words", duration: "2:36" },
    ],
  },
];

export const singles = [
  {
    id: "1",
    title: "Allegory (Freestyle)",
    coverImage: "/assets/music-assets/ALLEGORY (FREESTYLE) Single Cover.jpeg",
    releaseYear: "2025",
    duration: "1:13",
  },
  {
    id: "2",
    title: "Eye Kan",
    coverImage: "/assets/music-assets/Eye Kan Single Cover.jpeg",
    releaseYear: "2021",
    duration: "1:35",
  },
  {
    id: "3",
    title: "First (Interlude)",
    coverImage: "/assets/music-assets/First(Interlude) Single Cover.jpeg",
    releaseYear: "2020",
    duration: "2:33",
  },
];

const featuredPlaylists = [
  {
    title: "Essential Tracks",
    description: "The best of my discography in one playlist",
    image: "/assets/blog/preview/cover.jpg",
    songCount: 15
  },
  {
    title: "Acoustic Sessions",
    description: "Stripped down versions of fan favorites",
    image: "/assets/blog/hello-world/cover.jpg",
    songCount: 8
  }
];

const upcomingEvents = [
  {
    date: "March 15, 2024",
    venue: "The Sound Garden",
    location: "Brooklyn, NY",
    ticketLink: "#"
  },
  {
    date: "April 2, 2024",
    venue: "Midnight Club",
    location: "Los Angeles, CA",
    ticketLink: "#"
  }
];

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

          {activeTab === 'playlists' && (
            <section>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Featured Playlists</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {featuredPlaylists.map((playlist, index) => (
                  <div key={index} className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg">
                    <div className="relative h-40 sm:h-48">
                      <Image
                        src={playlist.image}
                        alt={playlist.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold mb-2">{playlist.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-2">{playlist.description}</p>
                      <p className="text-sm">{playlist.songCount} songs</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'shows' && (
            <section>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Upcoming Shows</h2>
              <div className="flex items-center justify-center h-48 bg-gray-200 dark:bg-slate-700 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">Coming Soon</p>
              </div>
            </section>
          )}

          {activeTab === 'production' && (
            <section>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Production Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Building Your Sound",
                    tips: [
                      "Start with a strong foundation",
                      "Focus on sound design",
                      "Layer your instruments carefully"
                    ]
                  },
                  {
                    title: "Mixing Essentials",
                    tips: [
                      "EQ is your best friend",
                      "Use compression wisely",
                      "Create space in your mix"
                    ]
                  }
                ].map((section, index) => (
                  <div key={index} className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-center">
                          <span className="mr-2">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'featured' && (
            <section>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Featured Tracks</h2>
              <div className="flex items-center justify-center h-48 bg-gray-200 dark:bg-slate-700 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">Coming Soon</p>
              </div>
            </section>
          )}
          {activeTab === 'videos' && (
            <section>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Music Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-200 dark:bg-slate-700">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400">Video content coming soon</p>
                  </div>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-200 dark:bg-slate-700">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400">Video content coming soon</p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Newsletter Section */}
        <section className="mt-16 mb-16 px-4">
          <div className="bg-black text-white dark:bg-white dark:text-black rounded-lg p-6 sm:p-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-sm sm:text-base mb-6">Subscribe for exclusive content and early access to new releases</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-lg text-black dark:text-white bg-white dark:bg-slate-800"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-white text-black dark:bg-black dark:text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </Container>
    </main>
  );
}
