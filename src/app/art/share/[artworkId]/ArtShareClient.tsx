"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ArtworkModal from "@/app/_components/ArtworkModal";
import Link from "next/link";
import type { Artwork } from "@/data/artworks";

export default function ArtShareClient({ artwork }: { artwork: Artwork }) {
  const router = useRouter();
  const [modalOpen] = useState(true);

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center">
      <ArtworkModal
        isOpen={modalOpen}
        onClose={() => router.push("/art")}
        imageSrc={artwork.src}
        alt={artwork.title}
        title={artwork.title}
        year={artwork.year}
        writeup={artwork.writeup}
        artworkId={artwork.id}
      />
      <Link href="/art" className="mt-8 text-blue-400 underline text-lg">
        ← Back to Art Page
      </Link>
    </main>
  );
}
