import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { singles, getSingleById } from '@/data/music';
import { SITE_NAME } from '@/lib/constants';
import SingleDetailClient from './SingleDetailClient';

interface PageProps {
  params: Promise<{
    singleId: string;
  }>;
}

export async function generateStaticParams() {
  return singles.map((single) => ({
    singleId: single.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const single = getSingleById(resolvedParams.singleId);

  if (!single) {
    return {
      title: `Single Not Found | ${SITE_NAME}`,
    };
  }

  const title = `${single.title} (${single.releaseYear}) | Music | ${SITE_NAME}`;

  return {
    title,
    openGraph: {
      title,
      images: [single.coverImage],
      type: 'music.song',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      images: [single.coverImage],
    },
  };
}

export default async function SinglePage({ params }: PageProps) {
  const resolvedParams = await params;
  const single = getSingleById(resolvedParams.singleId);

  if (!single) {
    notFound();
  }

  return <SingleDetailClient single={single} />;
}
