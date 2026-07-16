"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Disable default browser scroll restoration on refresh
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Scroll to the very top of the page on initial load
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Record page view on path transition
    fetch(`/api/track?page=${encodeURIComponent(pathname)}`, { method: "POST" })
      .catch(() => {
        // Silently catch fetch errors to prevent Next.js dev overlay popups
      });
  }, [pathname]);

  return null;
}
