'use client';

import { useState, useEffect } from 'react';

export default function InstructionPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // Check if the popup has already been shown in this session
    const hasSeenPopup = sessionStorage.getItem('hasSeenInstructionPopup');
    if (!hasSeenPopup) {
      setIsVisible(true);
      sessionStorage.setItem('hasSeenInstructionPopup', 'true'); // Mark as shown
    }

    // Update the scroll position dynamically
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 animate-fade-in"
    >
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg max-w-md text-center relative animate-slide-down mt-10 mx-auto">
      {/* Close Button */}
      <button
      onClick={() => setIsVisible(false)}
      className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
      aria-label="Close"
      >
      <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-6 h-6"
      >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
      </button>

      {/* Popup Content */}
      <h2 className="text-2xl font-bold mb-4 text-neutral-800 dark:text-neutral-100 gradient-text">
      How to Use the Lyrics Checker
      </h2>
      <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
      Click on a lyric to view its explanation. To select another lyric, deactivate the current one by clicking on it again.
      </p>
      <button
      onClick={() => setIsVisible(false)}
      className="mt-6 px-6 py-3 bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-middle)] to-[var(--gradient-end)] text-white rounded-lg shadow-md hover:opacity-90 transition"
      >
      Got it!
      </button>
      </div>
    </div>
  );
}