"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedTimelineItemProps {
  year: string;
  title: string;
  description: string;
  index: number;
}

export const AnimatedTimelineItem: React.FC<AnimatedTimelineItemProps> = ({
  year,
  title,
  description,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -32, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="flex gap-8 pb-10 group"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated glowing dot with pulsing halo on scroll */}
        <motion.div 
          whileInView={{ scale: [0.7, 1.25, 1] }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: index * 0.1 + 0.1 }}
          className="relative w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center z-10 shrink-0 shadow-[0_0_16px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform duration-300"
        >
          <span className="absolute -inset-1 rounded-full bg-blue-400 opacity-25 animate-pulse" />
          <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
        </motion.div>
      </div>
      <motion.div 
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="pb-6 bg-white p-7 rounded-3xl shadow-lg border border-slate-300 hover:border-blue-500 hover:shadow-xl transition-all duration-300 flex-1 ml-2 relative z-20"
      >
        <div className="text-xs font-800 uppercase tracking-widest text-blue-600 mb-2">{year}</div>
        <h3 className="font-900 text-[var(--navy)] text-xl mb-2.5">{title}</h3>
        <p className="text-slate-900 font-600 text-sm md:text-base leading-relaxed">{description}</p>
      </motion.div>
    </motion.div>
  );
};
