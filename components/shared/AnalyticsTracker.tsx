"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Record page view on path transition
    fetch(`/api/track?page=${encodeURIComponent(pathname)}`, { method: "POST" })
      .catch(() => {
        // Silently catch fetch errors to prevent Next.js dev overlay popups
      });
  }, [pathname]);

  return null;
}
