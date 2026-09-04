import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ARTWORKS, getArtworkById } from '@/data/artworks';
import { SITE_NAME } from '@/lib/constants';
import ArtShareClient from './ArtShareClient';

interface PageProps {
  params: Promise<{
    artworkId: string;
  }>;
}

export async function generateStaticParams() {
  return ARTWORKS.map((artwork) => ({
    artworkId: artwork.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const artwork = getArtworkById(resolvedParams.artworkId);

  if (!artwork) {
    return {
      title: `Artwork Not Found | ${SITE_NAME}`,
    };
  }

  const title = `${artwork.title} (${artwork.year}) | Art | ${SITE_NAME}`;
  const description = artwork.writeup || `${artwork.title} - Artwork by Leon K Nduati (${artwork.year})`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [artwork.src],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [artwork.src],
    },
  };
}

export default async function ShareArtworkPage({ params }: PageProps) {
  const resolvedParams = await params;
  const artwork = getArtworkById(resolvedParams.artworkId);

  if (!artwork) {
    notFound();
  }

  return <ArtShareClient artwork={artwork} />;
}
