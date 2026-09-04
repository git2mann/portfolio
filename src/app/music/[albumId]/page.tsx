import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { albums, getAlbumById } from '@/data/music';
import { SITE_NAME } from '@/lib/constants';
import AlbumDetailClient from './AlbumDetailClient';

interface PageProps {
  params: Promise<{
    albumId: string;
  }>;
}

export async function generateStaticParams() {
  return albums.map((album) => ({
    albumId: album.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const album = getAlbumById(resolvedParams.albumId);

  if (!album) {
    return {
      title: `Album Not Found | ${SITE_NAME}`,
    };
  }

  const title = `${album.title} (${album.releaseYear}) | Music | ${SITE_NAME}`;
  const description = album.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [album.coverImage],
      type: 'music.album',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [album.coverImage],
    },
  };
}

export default async function AlbumPage({ params }: PageProps) {
  const resolvedParams = await params;
  const album = getAlbumById(resolvedParams.albumId);

  if (!album) {
    notFound();
  }

  return <AlbumDetailClient album={album} />;
}
