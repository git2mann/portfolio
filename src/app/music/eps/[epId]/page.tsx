import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { eps, getEpById } from '@/data/music';
import { SITE_NAME } from '@/lib/constants';
import EpDetailClient from './EpDetailClient';

interface PageProps {
  params: Promise<{
    epId: string;
  }>;
}

export async function generateStaticParams() {
  return eps.map((ep) => ({
    epId: ep.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const ep = getEpById(resolvedParams.epId);

  if (!ep) {
    return {
      title: `EP Not Found | ${SITE_NAME}`,
    };
  }

  const title = `${ep.title} (${ep.releaseYear}) | Music | ${SITE_NAME}`;
  const description = ep.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [ep.coverImage],
      type: 'music.album',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ep.coverImage],
    },
  };
}

export default async function EPPage({ params }: PageProps) {
  const resolvedParams = await params;
  const ep = getEpById(resolvedParams.epId);

  if (!ep) {
    notFound();
  }

  return <EpDetailClient ep={ep} />;
}
