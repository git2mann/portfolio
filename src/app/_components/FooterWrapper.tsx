"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./footer";

/**
 * Client-side wrapper for the footer
 * Conditionally hides the global footer on the home page
 * to allow for a custom scroll-snap integration there.
 */
export default function FooterWrapper() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  
  if (isHome) return null;
  return <Footer />;
}
