"use client";

import React, { useState } from "react";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LazyVideoEmbedProps {
  videoId: string; // E.g., "dQw4w9WgXcQ" for YouTube or "123456789" for Vimeo
  provider?: "youtube" | "vimeo";
  thumbnailUrl: string; // Custom preview image URL
  title?: string;
}

export const LazyVideoEmbed: React.FC<LazyVideoEmbedProps> = ({
  videoId,
  provider = "youtube",
  thumbnailUrl,
  title = "Product Walkthrough Video",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Generate embed URLs
  const embedUrl =
    provider === "youtube"
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
      : `https://player.vimeo.com/video/${videoId}?autoplay=1`;

  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-950 group">
      <AnimatePresence mode="wait">
        {!isPlaying ? (
          <motion.div
            key="thumbnail"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 w-full h-full cursor-pointer select-none"
          >
            {/* Thumbnail Image */}
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />

            {/* Dark glass overlay */}
            <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors duration-300 flex items-center justify-center" />

            {/* Glowing Monospace Video Metadata Details */}
            <div className="absolute bottom-4 left-5 bg-slate-950/75 backdrop-blur-md border border-white/10 py-1.5 px-3 rounded-lg text-[10px] font-mono text-slate-300 tracking-wider flex items-center gap-2 select-none pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>3:00 // WALKTHROUGH</span>
            </div>

            {/* Glassmorphic Glowing Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:border-blue-500 text-blue-600 group-hover:text-white group-hover:shadow-blue-500/30">
                {/* External glowing ring */}
                <div className="absolute inset-[-4px] rounded-full border border-white/10 group-hover:border-blue-500/30 group-hover:scale-105 transition-all duration-300" />
                <Play size={28} className="fill-current ml-1" />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="video-player"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 w-full h-full"
          >
            <iframe
              src={embedUrl}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LazyVideoEmbed;
