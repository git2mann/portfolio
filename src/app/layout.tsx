import Footer from "@/app/_components/footer";
import { SITE_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";
import { ThemeSwitcher } from "./_components/theme-switcher";

import "./globals.css";

// Load Inter font with Latin subset
const inter = Inter({ subsets: ["latin"] });

// Define metadata for the application (used for SEO and social sharing)
export const metadata: Metadata = {
  title: SITE_NAME,
  description: "Personal portfolio and blog showcasing music, art, and projects",
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
};

/**
 * Root layout component that wraps all pages
 * Provides the HTML structure, font, theme switching, and footer
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={cn(inter.className, "dark:bg-slate-900 dark:text-slate-400")}
      >
        {/* Theme switcher component for light/dark mode */}
        <ThemeSwitcher />
        {/* Main content area with minimum height to push footer down */}
        <div className="min-h-screen">{children}</div>
        {/* Global footer component */}
        <Footer />
      </body>
    </html>
  );
}