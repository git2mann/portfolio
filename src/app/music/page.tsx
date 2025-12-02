'use client';

import { useState, useRef, useEffect } from 'react';
// Simple mobile detection hook
function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}
import dynamic from 'next/dynamic';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../_components/music-enhancements.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Container from "@/app/_components/container";
import { albums, eps, singles as originalSingles } from "@/data/music"; // Restored original import structure

import { FiHeadphones, FiCalendar, FiClock, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Removed the old ArrowLeft/ArrowRight components as they are no longer needed
// because we are using simple buttons wired to the slider ref.

import ForwardedClientSlider from '../_components/ForwardedClientSlider';

const liveAlbums = [
  {
    id: "live-1",
    title: "Squealer and the Aggressors of Peace (Live)",
    coverImage: "/assets/music-assets/Squealer and the Aggressors of Peace (Live) Front Cover.jpeg",
    releaseYear: "2025",
    description:
      "The electrifying live album from Klense, capturing the raw energy, improvisation, and crowd connection of Squealer and the Aggressors of Peace. Featuring all-new live arrangements, and extended solos.",
    link: "/music/sataop-live",
  },
];

// Helper component for manual navigation buttons
// This takes a click handler and applies consistent styling
function ManualNavButton({ children, onClick, label }: { children: React.ReactNode, onClick: () => void, label: string }) {
    return (
        <button
            type="button"
            className="p-1 transition-colors duration-200"
            onClick={onClick}
            aria-label={label}
        >
            {children}
        </button>
    );
}


// Move 'Goodbye Song (Demo)' to the top of the singles list
const singles = (() => {
  if (!originalSingles || !Array.isArray(originalSingles)) return [];
  const idx = originalSingles.findIndex(s => s.title && s.title.toLowerCase().includes('goodbye song'));
  if (idx > 0) {
    const arr = [...originalSingles];
    const [goodbye] = arr.splice(idx, 1);
    arr.unshift(goodbye);
    return arr;
  }
  return originalSingles;
})();

export default function MusicPage() {
  const isMobile = useIsMobile();
  const [hoveredAlbum, setHoveredAlbum] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('discography');

  // Refs for manual slider control
  const albumSliderRef = useRef<any>(null);
  const epsSliderRef = useRef<any>(null);
  const singlesSliderRef = useRef<any>(null);
  const liveAlbumsSliderRef = useRef<any>(null);


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
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/1920x1080/000000/FFFFFF?text=Music+Hero';
              e.currentTarget.alt = 'Placeholder Music Hero';
            }}
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
              {/* Albums Section with Carousel */}
              <section>
                {/* Manual control buttons placed next to the title */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">Albums</h2>
                  {albums.length > 1 && !isMobile && (
                    <div className="flex gap-2 text-[var(--text-primary)]">
                      <ManualNavButton onClick={() => albumSliderRef.current?.slickPrev()} label="Previous Album">
                          <FiChevronLeft className="w-7 h-7 hover:text-[var(--text-accent)]" />
                      </ManualNavButton>
                      <ManualNavButton onClick={() => albumSliderRef.current?.slickNext()} label="Next Album">
                          <FiChevronRight className="w-7 h-7 hover:text-[var(--text-accent)]" />
                      </ManualNavButton>
                    </div>
                  )}
                </div>
                {albums.length > 1 ? (
                  isMobile ? (
                    <div className="flex flex-col gap-4">
                      {albums.map((album) => (
                        <Link
                          key={album.id}
                          href={`/music/${album.id}`}
                          className={`group relative bg-[var(--card-background)] rounded-xl shadow-lg ${styles['music-card']} block h-full`}
                          onMouseEnter={() => setHoveredAlbum(album.id)}
                          onMouseLeave={() => setHoveredAlbum(null)}
                        >
                          <div className="relative aspect-square overflow-hidden rounded-t-xl min-h-[220px]">
                            <Image
                              src={album.coverImage}
                              alt={`Cover of ${album.title}`}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                              sizes="100vw"
                              onError={(e) => {
                                e.currentTarget.src = `https://placehold.co/400x400/333333/FFFFFF?text=${album.title.replace(/\s/g, '+')}`;
                                e.currentTarget.alt = `Placeholder for ${album.title}`;
                              }}
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
                  ) : (
                    <ForwardedClientSlider
                      ref={albumSliderRef}
                      dots={true}
                      infinite={albums.length > 3}
                      speed={350}
                      slidesToShow={Math.min(3, albums.length)}
                      slidesToScroll={1}
                      responsive={[
                        { breakpoint: 1024, settings: { slidesToShow: Math.min(2, albums.length) } },
                        { breakpoint: 640, settings: { slidesToShow: 1 } },
                      ]}
                      arrows={false}
                      autoplay={true}
                      autoplaySpeed={2500}
                    >
                      {albums.map((album) => (
                        <div key={album.id} className="p-2">
                          <Link
                            href={`/music/${album.id}`}
                            className={`group relative bg-[var(--card-background)] rounded-xl shadow-lg ${styles['music-card']} block h-full`}
                            onMouseEnter={() => setHoveredAlbum(album.id)}
                            onMouseLeave={() => setHoveredAlbum(null)}
                          >
                            <div className="relative aspect-square overflow-hidden rounded-t-xl min-h-[260px] md:min-h-[220px]">
                              <Image
                                src={album.coverImage}
                                alt={`Cover of ${album.title}`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                onError={(e) => {
                                  e.currentTarget.src = `https://placehold.co/400x400/333333/FFFFFF?text=${album.title.replace(/\s/g, '+')}`;
                                  e.currentTarget.alt = `Placeholder for ${album.title}`;
                                }}
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
                        </div>
                      ))}
                    </ForwardedClientSlider>
                  )
                ) : (
                  // Single item rendering logic remains the same
                  <div className="flex max-w-xs">
                    <Link
                      href={`/music/${albums[0].id}`}
                      className={`group relative bg-[var(--card-background)] rounded-xl shadow-lg ${styles['music-card']} w-full`}
                      onMouseEnter={() => setHoveredAlbum(albums[0].id)}
                      onMouseLeave={() => setHoveredAlbum(null)}
                    >
                      <div className="relative aspect-square overflow-hidden rounded-t-xl min-h-[260px] md:min-h-[220px]">
                        <Image
                          src={albums[0].coverImage}
                          alt={`Cover of ${albums[0].title}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          onError={(e) => {
                            e.currentTarget.src = `https://placehold.co/400x400/333333/FFFFFF?text=${albums[0].title.replace(/\s/g, '+')}`;
                            e.currentTarget.alt = `Placeholder for ${albums[0].title}`;
                          }}
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                          <FiHeadphones className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--text-accent)] transition-colors">
                          {albums[0].title}
                        </h3>
                        <div className="flex items-center text-sm text-[var(--text-secondary)] mb-3">
                          <FiCalendar className="mr-2" />
                          {albums[0].releaseYear}
                        </div>
                        <p className="text-[var(--text-secondary)]">{albums[0].description}</p>
                      </div>
                    </Link>
                  </div>
                )}
              </section>

              {/* EPs Section with Carousel */}
              <section>
                {/* Manual control buttons placed next to the title */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">EPs</h2>
                    {eps.length > 1 && !isMobile && (
                    <div className="flex gap-2 text-[var(--text-primary)]">
                      <ManualNavButton onClick={() => epsSliderRef.current?.slickPrev()} label="Previous EP">
                        <FiChevronLeft className="w-7 h-7 hover:text-[var(--text-accent)]" />
                      </ManualNavButton>
                      <ManualNavButton onClick={() => epsSliderRef.current?.slickNext()} label="Next EP">
                        <FiChevronRight className="w-7 h-7 hover:text-[var(--text-accent)]" />
                      </ManualNavButton>
                    </div>
                    )}
                </div>
                {eps.length > 1 ? (
                  isMobile ? (
                    <div className="flex flex-col gap-4">
                      {eps.map((ep) => (
                        <Link
                          key={ep.id}
                          href={`/music/eps/${ep.id}`}
                          className={`group relative bg-[var(--card-background)] rounded-xl shadow-lg ${styles['music-card']} block h-full`}
                        >
                          <div className="relative aspect-square overflow-hidden rounded-t-xl min-h-[220px]">
                            <Image
                              src={ep.coverImage}
                              alt={`Cover of ${ep.title}`}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                              sizes="100vw"
                              onError={(e) => {
                                e.currentTarget.src = `https://placehold.co/400x400/333333/FFFFFF?text=${ep.title.replace(/\s/g, '+')}`;
                                e.currentTarget.alt = `Placeholder for ${ep.title}`;
                              }}
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
                  ) : (
                    <ForwardedClientSlider
                      ref={epsSliderRef}
                      dots={true}
                      infinite={eps.length > 3}
                      speed={350}
                      slidesToShow={Math.min(3, eps.length)}
                      slidesToScroll={1}
                      responsive={[
                        { breakpoint: 1024, settings: { slidesToShow: Math.min(2, eps.length) } },
                        { breakpoint: 640, settings: { slidesToShow: 1 } },
                      ]}
                      arrows={false}
                      autoplay={true}
                      autoplaySpeed={2500}
                    >
                      {eps.map((ep) => (
                        <div key={ep.id} className="p-2">
                          <Link
                            href={`/music/eps/${ep.id}`}
                            className={`group relative bg-[var(--card-background)] rounded-xl shadow-lg ${styles['music-card']} block h-full`}
                          >
                            <div className="relative aspect-square overflow-hidden rounded-t-xl min-h-[260px] md:min-h-[220px]">
                              <Image
                                src={ep.coverImage}
                                alt={`Cover of ${ep.title}`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                onError={(e) => {
                                  e.currentTarget.src = `https://placehold.co/400x400/333333/FFFFFF?text=${ep.title.replace(/\s/g, '+')}`;
                                  e.currentTarget.alt = `Placeholder for ${ep.title}`;
                                }}
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
                        </div>
                      ))}
                    </ForwardedClientSlider>
                  )
                ) : (
                  // Single item rendering logic remains the same
                  <div className="flex max-w-xs">
                    <Link
                      href={`/music/eps/${eps[0].id}`}
                      className={`group relative bg-[var(--card-background)] rounded-xl shadow-lg ${styles['music-card']} w-full`}
                    >
                      <div className="relative aspect-square overflow-hidden rounded-t-xl min-h-[260px] md:min-h-[220px]">
                        <Image
                          src={eps[0].coverImage}
                          alt={`Cover of ${eps[0].title}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          onError={(e) => {
                            e.currentTarget.src = `https://placehold.co/400x400/333333/FFFFFF?text=${eps[0].title.replace(/\s/g, '+')}`;
                            e.currentTarget.alt = `Placeholder for ${eps[0].title}`;
                          }}
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                          <FiHeadphones className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--text-accent)] transition-colors">
                          {eps[0].title}
                        </h3>
                        <div className="flex items-center text-sm text-[var(--text-secondary)]">
                          <FiCalendar className="mr-2" />
                          {eps[0].releaseYear}
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
              </section>

              {/* Singles Section with Carousel */}
              <section className="mb-16">
                {/* Manual control buttons placed next to the title */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">Singles</h2>
                    {singles.length > 1 && !isMobile && (
                    <div className="flex gap-2 text-[var(--text-primary)]">
                      <ManualNavButton onClick={() => singlesSliderRef.current?.slickPrev()} label="Previous Single">
                        <FiChevronLeft className="w-7 h-7 hover:text-[var(--text-accent)]" />
                      </ManualNavButton>
                      <ManualNavButton onClick={() => singlesSliderRef.current?.slickNext()} label="Next Single">
                        <FiChevronRight className="w-7 h-7 hover:text-[var(--text-accent)]" />
                      </ManualNavButton>
                    </div>
                    )}
                </div>
                {singles.length > 1 ? (
                  isMobile ? (
                    <div className="flex flex-col gap-4">
                      {singles.map((single) => (
                        <Link
                          key={single.id}
                          href={`/music/singles/${single.id}`}
                          className={`group relative bg-[var(--card-background)] rounded-xl shadow-lg ${styles['music-card']} block h-full`}
                        >
                          <div className="relative aspect-square overflow-hidden rounded-t-xl min-h-[220px]">
                            <Image
                              src={single.coverImage}
                              alt={`Cover of ${single.title}`}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                              sizes="100vw"
                              onError={(e) => {
                                e.currentTarget.src = `https://placehold.co/400x400/333333/FFFFFF?text=${single.title.replace(/\s/g, '+')}`;
                                e.currentTarget.alt = `Placeholder for ${single.title}`;
                              }}
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
                  ) : (
                    <ForwardedClientSlider
                      ref={singlesSliderRef}
                      dots={true}
                      infinite={singles.length > 3}
                      speed={350}
                      slidesToShow={Math.min(3, singles.length)}
                      slidesToScroll={1}
                      responsive={[
                        { breakpoint: 1024, settings: { slidesToShow: Math.min(2, singles.length) } },
                        { breakpoint: 640, settings: { slidesToShow: 1 } },
                      ]}
                      arrows={false}
                      autoplay={true}
                      autoplaySpeed={2500}
                    >
                      {singles.map((single) => (
                        <div key={single.id} className="p-2">
                          <Link
                            href={`/music/singles/${single.id}`}
                            className={`group relative bg-[var(--card-background)] rounded-xl shadow-lg ${styles['music-card']} block h-full`}
                          >
                            <div className="relative aspect-square overflow-hidden rounded-t-xl min-h-[260px] md:min-h-[220px]">
                              <Image
                                src={single.coverImage}
                                alt={`Cover of ${single.title}`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                onError={(e) => {
                                  e.currentTarget.src = `https://placehold.co/400x400/333333/FFFFFF?text=${single.title.replace(/\s/g, '+')}`;
                                  e.currentTarget.alt = `Placeholder for ${single.title}`;
                                }}
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
                        </div>
                      ))}
                    </ForwardedClientSlider>
                  )
                ) : (
                  // Single item rendering logic remains the same
                  <div className="flex max-w-xs">
                    <Link
                      href={`/music/singles/${singles[0].id}`}
                      className={`group relative bg-[var(--card-background)] rounded-xl shadow-lg ${styles['music-card']} w-full`}
                    >
                      <div className="relative aspect-square overflow-hidden rounded-t-xl min-h-[260px] md:min-h-[220px]">
                        <Image
                          src={singles[0].coverImage}
                          alt={`Cover of ${singles[0].title}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          onError={(e) => {
                            e.currentTarget.src = `https://placehold.co/400x400/333333/FFFFFF?text=${singles[0].title.replace(/\s/g, '+')}`;
                            e.currentTarget.alt = `Placeholder for ${singles[0].title}`;
                          }}
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                          <FiHeadphones className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--text-accent)] transition-colors">
                          {singles[0].title}
                        </h3>
                        <div className="flex items-center justify-between text-sm text-[var(--text-secondary)]">
                          <div className="flex items-center">
                            <FiCalendar className="mr-2" />
                            {singles[0].releaseYear}
                          </div>
                          <div className="flex items-center">
                            <FiClock className="mr-2" />
                            {singles[0].duration}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
              </section>
            </>
          )}

          {/* --- Live Albums Section with Carousel --- */}
          <section>
            {/* Manual control buttons placed next to the title */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">Live Albums</h2>
              {liveAlbums.length > 1 && (
                <div className="flex gap-2 text-[var(--text-primary)]">
                    <ManualNavButton onClick={() => liveAlbumsSliderRef.current?.slickPrev()} label="Previous Live Album">
                        <FiChevronLeft className="w-7 h-7 hover:text-[var(--text-accent)]" />
                    </ManualNavButton>
                    <ManualNavButton onClick={() => liveAlbumsSliderRef.current?.slickNext()} label="Next Live Album">
                        <FiChevronRight className="w-7 h-7 hover:text-[var(--text-accent)]" />
                    </ManualNavButton>
                </div>
              )}
            </div>
            {liveAlbums.length > 1 ? (
              <ForwardedClientSlider
                ref={liveAlbumsSliderRef}
                dots={true}
                infinite={liveAlbums.length > 3}
                speed={350}
                slidesToShow={Math.min(3, liveAlbums.length)}
                slidesToScroll={1}
                responsive={[
                  { breakpoint: 1024, settings: { slidesToShow: Math.min(2, liveAlbums.length) } },
                  { breakpoint: 640, settings: { slidesToShow: 1 } },
                ]}
                arrows={false} // Disable default react-slick arrows
                autoplay={true}
                autoplaySpeed={4000}
              >
                {liveAlbums.map((album) => (
                  <div key={album.id} className="p-2">
                    <Link
                      href={album.link}
                      className={`group relative bg-[var(--card-background)] rounded-xl shadow-lg flex flex-col ${styles['music-card']} block h-full`}
                    >
                      <div className="relative aspect-square overflow-hidden rounded-t-xl min-h-[260px] md:min-h-[220px]">
                        <Image
                          src={album.coverImage}
                          alt={`Cover of ${album.title}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          onError={(e) => {
                            e.currentTarget.src = `https://placehold.co/400x400/333333/FFFFFF?text=${album.title.replace(/\s/g, '+')}`;
                            e.currentTarget.alt = `Placeholder for ${album.title}`;
                          }}
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                          <FiHeadphones className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--text-accent)] transition-colors">
                          {album.title}
                        </h3>
                        <div className="flex items-center text-sm text-[var(--text-secondary)] mb-3">
                          <FiCalendar className="mr-2" />
                          {album.releaseYear}
                        </div>
                        <p className="text-[var(--text-secondary)] flex-1">{album.description}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </ForwardedClientSlider>
            ) : (
              // Single item rendering logic remains the same
              <div className="flex max-w-xs">
                <Link
                  href={liveAlbums[0].link}
                  className={`group relative bg-[var(--card-background)] rounded-xl shadow-lg flex flex-col ${styles['music-card']} w-full`}
                >
                  <div className="relative aspect-square overflow-hidden rounded-t-xl min-h-[260px] md:min-h-[220px]">
                    <Image
                      src={liveAlbums[0].coverImage}
                      alt={`Cover of ${liveAlbums[0].title}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/400x400/333333/FFFFFF?text=${liveAlbums[0].title.replace(/\s/g, '+')}`;
                        e.currentTarget.alt = `Placeholder for ${liveAlbums[0].title}`;
                      }}
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                      <FiHeadphones className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--text-accent)] transition-colors">
                      {liveAlbums[0].title}
                    </h3>
                    <div className="flex items-center text-sm text-[var(--text-secondary)] mb-3">
                      <FiCalendar className="mr-2" />
                      {liveAlbums[0].releaseYear}
                    </div>
                    <p className="text-[var(--text-secondary)] flex-1">{liveAlbums[0].description}</p>
                  </div>
                </Link>
              </div>
            )}
            {/* Add extra space after singles */}
            <div className="h-12" />
          </section>

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