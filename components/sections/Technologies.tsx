"use client";

import React from "react";
import { motion } from "framer-motion";
import { FadeUp } from "../animations/Animations";

const techStack = {
  Frontend: [
    { name: "React", color: "#61DAFB" },
    { name: "Next.js", color: "#000000" },
    { name: "TypeScript", color: "#3178C6" },
    { name: "JavaScript", color: "#F7DF1E" },
  ],
  Backend: [
    { name: "Node.js", color: "#339933" },
    { name: "REST APIs", color: "#2563EB" },
    { name: "GraphQL", color: "#E10098" },
  ],
  Cloud: [
    { name: "VPS Hosting", color: "#0062CC" },
    { name: "Docker", color: "#2496ED" },
    { name: "Nginx", color: "#009639" },
  ],
  Database: [
    { name: "MongoDB", color: "#47A248" },
    { name: "PostgreSQL", color: "#336791" },
    { name: "Redis", color: "#DC382D" },
  ],
  DevOps: [
    { name: "GitHub Actions", color: "#2088FF" },
    { name: "Docker", color: "#2496ED" },
    { name: "Linux", color: "#FCC624" },
  ],
  AI: [
    { name: "OpenAI", color: "#412991" },
    { name: "LangChain", color: "#1C7A77" },
    { name: "Python ML", color: "#306998" },
  ],
};

export const TechnologiesSection: React.FC = () => {
  const row1 = [...techStack.Frontend, ...techStack.Backend, ...techStack.AI];
  const row2 = [...techStack.Cloud, ...techStack.Database, ...techStack.DevOps];

  // Double the arrays for infinite scrolling
  const row1Doubled = [...row1, ...row1, ...row1];
  const row2Doubled = [...row2, ...row2, ...row2];

  return (
    <section
      className="section-padding bg-white border-y border-slate-200 overflow-hidden relative"
      id="technologies"
      aria-labelledby="tech-heading"
    >
      <div className="container-wide mb-12 sm:mb-20 relative z-10">
        <FadeUp className="text-center">
          <div className="badge badge-navy mx-auto mb-4 flex items-center gap-2 justify-center">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            Technology Stack
          </div>
          <h2 id="tech-heading" className="text-3xl md:text-5xl font-extrabold text-[var(--navy)] mb-6 leading-tight tracking-tight">
            Built with Modern Technology
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            We use production-proven technologies — not experimental frameworks — to ensure absolute reliability and long-term maintainability for your enterprise.
          </p>
        </FadeUp>
      </div>

      <div className="relative w-full flex flex-col gap-6 sm:gap-8">
        {/* Fade Edges for the marquee */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none" />

        {/* Row 1 - Moves Left */}
        <div className="flex animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused] w-max gap-4 sm:gap-6">
          {row1Doubled.map((tech, i) => (
            <div
              key={`r1-${tech.name}-${i}`}
              className="flex items-center gap-3 px-5 sm:px-6 py-3 sm:py-4 bg-slate-50 border border-slate-200/80 rounded-xl shrink-0 hover:border-[var(--accent)] hover:bg-white hover:shadow-md transition-all group cursor-default"
            >
              <div 
                className="w-3.5 h-3.5 rounded-full shadow-sm border border-black/10 group-hover:scale-110 transition-transform shrink-0" 
                style={{ background: tech.color }} 
              />
              <span className="text-[var(--navy)] font-800 tracking-wide group-hover:text-[var(--accent)] transition-colors">{tech.name}</span>
            </div>
          ))}
        </div>

        {/* Row 2 - Moves Right (Reverse Marquee) */}
        <div className="flex animate-[marquee_45s_linear_infinite_reverse] hover:[animation-play-state:paused] w-max gap-4 sm:gap-6 ml-[-200px]">
          {row2Doubled.map((tech, i) => (
            <div
              key={`r2-${tech.name}-${i}`}
              className="flex items-center gap-3 px-5 sm:px-6 py-3 sm:py-4 bg-slate-50 border border-slate-200/80 rounded-xl shrink-0 hover:border-[var(--accent)] hover:bg-white hover:shadow-md transition-all group cursor-default"
            >
              <div 
                className="w-3.5 h-3.5 rounded-full shadow-sm border border-black/10 group-hover:scale-110 transition-transform shrink-0" 
                style={{ background: tech.color }} 
              />
              <span className="text-[var(--navy)] font-800 tracking-wide group-hover:text-[var(--accent)] transition-colors">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
