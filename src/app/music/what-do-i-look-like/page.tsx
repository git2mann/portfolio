import { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';
import WhatDoILookLikeClient from './WhatDoILookLikeClient';

export const metadata: Metadata = {
  title: `What Do I Look Like? (2026) | Music | ${SITE_NAME}`,
  description: "An unreleased 2-disc album by Leon Nduati (Klense). Pay-what-you-want download ($0 or whatever you want to pay).",
  openGraph: {
    title: `What Do I Look Like? | ${SITE_NAME}`,
    description: "An unreleased 2-disc album by Leon Nduati (Klense). Pay-what-you-want download ($0 or whatever you want to pay).",
    images: ['/assets/music-assets/WhatDoILookLikeCover.webp'],
    type: 'music.album',
  },
  twitter: {
    card: 'summary_large_image',
    title: `What Do I Look Like? | ${SITE_NAME}`,
    description: "An unreleased 2-disc album by Leon Nduati (Klense). Pay-what-you-want download ($0 or whatever you want to pay).",
    images: ['/assets/music-assets/WhatDoILookLikeCover.webp'],
  },
};

export default function WhatDoILookLikePage() {
  return <WhatDoILookLikeClient />;
}
