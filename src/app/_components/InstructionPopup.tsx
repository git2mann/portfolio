import { useState } from "react";

export default function InstructionPopup() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">How to Use the Lyrics Checker</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          The lyrics checker allows you to explore the meaning behind each lyric. Simply click on a lyric to view its explanation.
        </p>
        <div className="flex justify-center items-center gap-4 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8 text-blue-500"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <p className="text-neutral-600 dark:text-neutral-400">Click on a lyric to reveal its explanation.</p>
        </div>
        <div className="flex justify-center items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8 text-green-500"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-neutral-600 dark:text-neutral-400">Enjoy exploring the deeper meaning of the lyrics!</p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}