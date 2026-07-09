"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const partners = [
  { name: "Steel Fab Enterprises", logo: "/clients/steel fab img.png" },
  { name: "Servotech", logo: "/clients/servotech img.png" },
  { name: "Shangrila Engineers", logo: "/clients/shangrillaimg.png" },
  { name: "TVS", logo: "/clients/tvs.jpg" },
  { name: "Voomet", logo: "/clients/voomet.png" }
];

export const TrustedBy: React.FC = () => {
  // Multiply the array to ensure enough items for a smooth infinite scroll
  const multipliedPartners = [...partners, ...partners, ...partners, ...partners];
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  return (
    <section className="py-16 bg-[var(--surface)] border-y border-[var(--border)]" aria-label="Trusted by clients">
      <div className="container-wide mb-8">
        <p className="text-center text-[var(--text-muted)] text-sm font-500 uppercase tracking-widest">
          Trusted by industry leaders across sectors
        </p>
      </div>
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[var(--surface)] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[var(--surface)] to-transparent pointer-events-none" />

        <div className="flex gap-8 animate-[marquee_20s_linear_infinite] hover:[animation-play-state:paused] w-max items-center py-4">
          {multipliedPartners.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex items-center justify-center px-8 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-[var(--border)] rounded-xl shrink-0 h-20 min-w-[160px] shadow-sm hover:shadow-md hover:border-[var(--accent)]/50 hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Logo Icon Container */}
              <div className="h-full w-full flex items-center justify-center relative">
                {failedImages.has(partner.name) ? (
                  /* Fallback Text if image fails */
                  <span className="text-[var(--navy)] dark:text-white text-lg font-700 uppercase tracking-wider">
                    {partner.name}
                  </span>
                ) : (
                  /* Actual Image */
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`} 
                    className="h-full w-auto max-w-[200px] object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={() => {
                      setFailedImages(prev => {
                        const newSet = new Set(prev);
                        newSet.add(partner.name);
                        return newSet;
                      });
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
