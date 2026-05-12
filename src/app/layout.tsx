import * as React from "react";
import { Analytics } from "@vercel/analytics/next";
import ModalBlurOverlayWrapper from "@/app/_components/ModalBlurOverlayWrapper";
import { themes, STORAGE_KEY, NoFOUCScript } from "@/app/_components/theme-utils";
import Header from "@/app/_components/header";
import FooterWrapper from "@/app/_components/FooterWrapper";
import { SITE_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://nduatileon.site'),
  title: SITE_NAME,
  description: "Leon Nduati's personal portfolio and blog showcasing music, art, and projects",
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon/favicon.ico',
      },
    ],
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const themes = ${JSON.stringify(themes)};
              (${NoFOUCScript.toString()})('${STORAGE_KEY}', themes);
            `,
          }}
        />
      </head>
      <body
        className={
          "font-noto-display-condensed bg-[var(--background-primary)] text-[var(--text-primary)] transition-colors duration-300"
        }
      >
        {/* Strong blur overlay when modal is open */}
        <ModalBlurOverlayWrapper />

        <div className="fixed inset-0 -z-10 bg-[var(--background-primary)]"></div>
        <Header />
        <div className="animate-fade-in">{children}</div>
        <FooterWrapper />
        <Analytics />
      </body>
    </html>
  );
}
