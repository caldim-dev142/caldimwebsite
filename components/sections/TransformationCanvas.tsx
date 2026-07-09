"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const stops = [
  {
    id: "00",
    title: "Industrial Command Center",
    description: "Millions of glowing data particles coming together into one intelligent digital core, driving the journey from Chaos to Governed Database to AI.",
    gradient: "radial-gradient(circle at center, #0a192f 0%, #020c1b 100%)",
  },
  {
    id: "01",
    title: "Birth of Industry",
    description: "An abandoned industrial office. Stacks of Excel sheets, drawings, and paper files floating in the air. Orange AI light entering through the darkness.",
    gradient: "radial-gradient(circle at top left, #23150b 0%, #020c1b 100%)",
  },
  {
    id: "02",
    title: "Legacy vs CALDIM",
    description: "The shift from dusty PCs and red alerts to a modern enterprise control room featuring holographic dashboards and live KPIs.",
    gradient: "linear-gradient(90deg, #1f0b0b 0%, #0b1f13 100%)",
  },
  {
    id: "03",
    title: "Visibility Audit",
    description: "A large digital factory where every department is connected through glowing orange network lines.",
    gradient: "radial-gradient(circle at center, #0f2c42 0%, #020c1b 100%)",
  },
  {
    id: "04",
    title: "AI Revolution",
    description: "Human meets Artificial Intelligence. A huge glowing AI core floating in darkness with a tiny engineer standing in front of it.",
    gradient: "radial-gradient(circle at center, #3d1c00 0%, #020c1b 100%)",
  },
  {
    id: "05",
    title: "Data Cleanliness",
    description: "Messy files flow through a beautiful pipeline of cleaning, validation, and insight generation glowing in orange and blue.",
    gradient: "radial-gradient(ellipse at bottom, #0d2738 0%, #020c1b 100%)",
  },
  {
    id: "06",
    title: "Highway Timeline",
    description: "A futuristic industrial highway evolving from manual processes to pure AI automation at each checkpoint.",
    gradient: "linear-gradient(180deg, #020c1b 0%, #171124 100%)",
  },
  {
    id: "07",
    title: "Foundation Manifesto",
    description: "A large industrial blueprint city, minimal with lots of negative space. Every building connected with glowing orange grids.",
    gradient: "radial-gradient(circle at top right, #091a2f 0%, #020c1b 100%)",
  },
  {
    id: "08",
    title: "Transformation Factory",
    description: "A gigantic futuristic factory. Raw documents enter one side, are processed by AI workflows, and finished dashboards exit the other.",
    gradient: "radial-gradient(circle at center, #1b0909 0%, #020c1b 100%)",
  }
];

export const TransformationCanvas: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Native IntersectionObserver with -25% rootMargin: reliably detects when the section reaches the middle reading zone of the screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry) {
          const visible = entry.isIntersecting;
          setIsInView(visible);
          if (visible) {
            setActiveIndex(0);
          }
        }
      },
      { rootMargin: "-25% 0px -25% 0px", threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-advance cards ONLY when visible, not paused by button, and not currently hovered/clicked
  useEffect(() => {
    if (!isInView || isPaused || isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % stops.length);
    }, 3600);
    return () => clearInterval(timer);
  }, [isInView, isPaused, isHovered]);

  // Smoothly scroll ONLY the horizontal container when activeIndex updates while visible (no vertical window jump)
  useEffect(() => {
    if (!isInView || !scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardEl = container.children[activeIndex] as HTMLElement;
    if (cardEl && typeof cardEl.offsetLeft === "number") {
      const cardLeft = cardEl.offsetLeft;
      const cardWidth = cardEl.offsetWidth;
      const containerWidth = container.clientWidth;
      const targetScrollLeft = cardLeft - (containerWidth / 2) + (cardWidth / 2);
      
      container.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth"
      });
    }
  }, [activeIndex, isInView]);

  const scrollLeft = () => {
    setActiveIndex((prev) => (prev - 1 + stops.length) % stops.length);
  };

  const scrollRight = () => {
    setActiveIndex((prev) => (prev + 1) % stops.length);
  };

  return (
    <section 
      ref={sectionRef}
      className="pt-24 pb-24 bg-[#020c1b] relative overflow-hidden" 
      id="transformation-journey"
      aria-label="Transformation Journey Winding Road"
    >
      {/* Abstract Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container-wide relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="text-orange-500 font-extrabold tracking-widest text-xs uppercase mb-4 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)] flex items-center gap-2">
              <span className="w-8 h-px bg-orange-500/50 block"></span>
              The Journey
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight">
              From Chaos to Automation
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
              Explore the critical milestones in transforming legacy industrial operations into intelligent, AI-driven enterprises. Watch the journey self-automate right before your eyes.
            </p>
          </motion.div>

          {/* Controls & Autoplay Toggle Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`px-4 py-2 rounded-full text-xs font-800 tracking-wider uppercase transition-all duration-300 flex items-center gap-2 border shadow-lg ${
                !isPaused && !isHovered
                  ? "bg-orange-500/15 border-orange-500/40 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.2)]"
                  : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
              }`}
              title={!isPaused ? "Click to pause auto-advancing" : "Click to resume auto-advancing"}
            >
              <span className={`w-2 h-2 rounded-full ${!isPaused && !isHovered ? "bg-orange-400 animate-ping" : "bg-slate-500"}`} />
              {!isPaused ? (isHovered ? "Autoplay Paused (Hovering) ⏸" : "Autoplay Active 🟢") : "Autoplay Paused ⏸"}
            </button>

            <div className="flex gap-3">
              <button 
                onClick={scrollLeft}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 hover:border-white/30 transition-all duration-300 active:scale-95 shadow-md"
                aria-label="Scroll left to previous phase"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <button 
                onClick={scrollRight}
                className="w-12 h-12 rounded-full border border-orange-500/40 flex items-center justify-center text-orange-500 hover:bg-orange-500/20 hover:border-orange-500/80 transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.25)] active:scale-95 group"
                aria-label="Scroll right to next phase"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-0.5"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Step Indicator Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {stops.map((stop, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={stop.id}
                onClick={() => {
                  setActiveIndex(idx);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-900 transition-all duration-300 shrink-0 border ${
                  isActive
                    ? "bg-orange-500 text-slate-950 border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.6)] scale-105"
                    : "bg-[#0a192f]/80 text-slate-400 border-white/10 hover:border-orange-500/30 hover:text-white"
                }`}
              >
                {stop.id} {idx === 0 ? "START" : `PHASE ${idx}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Winding Road Horizontal Container - Self Automating */}
      <div className="relative w-full z-10">
        <div 
          ref={scrollContainerRef}
          className="flex gap-16 sm:gap-24 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 px-4 sm:px-[5vw] lg:px-[10vw] xl:px-[15vw] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {stops.map((stop, index) => {
            const isEven = index % 2 === 0;
            const isLast = index === stops.length - 1;
            const isFirst = index === 0;
            const isActive = index === activeIndex;

            return (
              <div 
                key={stop.id} 
                className="snap-start shrink-0 w-[85vw] sm:w-[380px] lg:w-[420px] relative"
                onClick={() => setActiveIndex(index)}
              >
                {/* Fixed Height Container for Staggering */}
                <div className={`w-full h-[540px] flex flex-col ${isEven ? 'justify-start' : 'justify-end'}`}>
                  
                  {/* The Card */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`bg-[#0a192f] rounded-3xl p-6 sm:p-8 relative overflow-visible group transition-all duration-500 h-[260px] cursor-pointer ${
                      isActive
                        ? "border-2 border-orange-500 shadow-[0_0_35px_rgba(249,115,22,0.45)] scale-[1.03] bg-gradient-to-br from-[#102a4e] to-[#0a192f] ring-2 ring-orange-500/30"
                        : "border border-[#112240] hover:border-orange-500/40 shadow-xl"
                    }`}
                  >
                    
                    {/* Left Dot (Incoming connection) */}
                    {!isFirst && (
                      <div className={`absolute left-[-12px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 items-center justify-center flex z-20 transition-all duration-300 ${
                        isActive || index <= activeIndex
                          ? "border-orange-400 bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.8)] scale-125"
                          : "border-orange-500/60 bg-[#020c1b] shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-slate-950 animate-ping" : "bg-white animate-pulse"}`} />
                      </div>
                    )}

                    {/* Right Dot (Outgoing connection) */}
                    {!isLast && (
                      <div className={`absolute right-[-12px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 items-center justify-center flex z-20 transition-all duration-300 ${
                        isActive || index < activeIndex
                          ? "border-orange-400 bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.8)] scale-125"
                          : "border-orange-500/60 bg-[#020c1b] shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-slate-950 animate-ping" : "bg-white animate-pulse"}`} />
                      </div>
                    )}

                    {/* Hover Gradient Effect */}
                    <div 
                      className={`absolute inset-0 transition-opacity duration-700 pointer-events-none rounded-3xl overflow-hidden ${
                        isActive ? "opacity-30" : "opacity-0 group-hover:opacity-20"
                      }`}
                      style={{ background: stop.gradient }}
                    />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 shadow-inner shrink-0 ${
                            isActive
                              ? "border-orange-500 bg-orange-500 text-slate-950 shadow-[0_0_15px_rgba(249,115,22,0.5)] scale-110"
                              : "border-white/10 text-slate-400 group-hover:text-orange-500 group-hover:border-orange-500/30 group-hover:bg-orange-500/5"
                          }`}>
                            <span className="text-xs font-black">{stop.id}</span>
                          </div>
                          <span className={`font-900 text-[10px] uppercase tracking-[0.2em] block mt-0.5 transition-colors ${
                            isActive ? "text-orange-400" : "text-orange-500/80 group-hover:text-orange-500"
                          }`}>
                            {isFirst ? "Start" : `Phase ${index}`}
                          </span>
                        </div>

                        {isActive && (
                          <span className="text-[9px] font-900 tracking-wider bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full border border-orange-500/30 animate-pulse">
                            ACTIVE STEP
                          </span>
                        )}
                      </div>
                      
                      <h3 className={`text-lg sm:text-xl font-800 mb-2 tracking-tight transition-colors line-clamp-2 ${
                        isActive ? "text-white font-900 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" : "text-white group-hover:text-blue-100"
                      }`}>
                        {stop.title}
                      </h3>
                      
                      <p className={`text-xs sm:text-sm leading-relaxed transition-colors line-clamp-4 ${
                        isActive ? "text-slate-200 font-600" : "text-slate-400 group-hover:text-slate-300"
                      }`}>
                        {stop.description}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Animated Flowing SVG Connecting Arrows from start to end */}
                {!isLast && (
                  <div className="absolute right-[-4rem] sm:right-[-6rem] w-[4rem] sm:w-[6rem] top-[130px] h-[280px] pointer-events-none -z-10">
                    {isEven ? (
                      /* Top Card curving down to Bottom Card */
                      <svg className="w-full h-full overflow-visible drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]" preserveAspectRatio="none" viewBox="0 0 100 100">
                        {/* Base dashed path */}
                        <path 
                          d="M 0 0 C 50 0, 50 100, 100 100" 
                          fill="none" 
                          stroke="url(#hGrad1)" 
                          strokeWidth="2.5" 
                          strokeDasharray="6 6"
                          strokeOpacity="0.6"
                        />
                        {/* High-speed animated energy pulse line */}
                        <path 
                          d="M 0 0 C 50 0, 50 100, 100 100" 
                          fill="none" 
                          stroke="#f97316" 
                          strokeWidth="3.5" 
                          strokeDasharray="18 36"
                          strokeLinecap="round"
                        >
                          <animate attributeName="stroke-dashoffset" from="108" to="0" dur="1.4s" repeatCount="indefinite" />
                        </path>
                        {/* Physical Glowing Particle & Arrow Shooting Along Path */}
                        <circle r="4.5" fill="#f97316" className="drop-shadow-[0_0_10px_#f97316]">
                          <animateMotion dur="1.8s" repeatCount="indefinite" path="M 0 0 C 50 0, 50 100, 100 100" />
                        </circle>
                        <circle r="3" fill="#60a5fa" className="drop-shadow-[0_0_8px_#60a5fa]">
                          <animateMotion dur="1.8s" begin="0.9s" repeatCount="indefinite" path="M 0 0 C 50 0, 50 100, 100 100" />
                        </circle>
                        <defs>
                          <linearGradient id="hGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f97316" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9" />
                          </linearGradient>
                        </defs>
                      </svg>
                    ) : (
                      /* Bottom Card curving up to Top Card */
                      <svg className="w-full h-full overflow-visible drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" preserveAspectRatio="none" viewBox="0 0 100 100">
                        {/* Base dashed path */}
                        <path 
                          d="M 0 100 C 50 100, 50 0, 100 0" 
                          fill="none" 
                          stroke="url(#hGrad2)" 
                          strokeWidth="2.5" 
                          strokeDasharray="6 6"
                          strokeOpacity="0.6"
                        />
                        {/* High-speed animated energy pulse line */}
                        <path 
                          d="M 0 100 C 50 100, 50 0, 100 0" 
                          fill="none" 
                          stroke="#60a5fa" 
                          strokeWidth="3.5" 
                          strokeDasharray="18 36"
                          strokeLinecap="round"
                        >
                          <animate attributeName="stroke-dashoffset" from="108" to="0" dur="1.4s" repeatCount="indefinite" />
                        </path>
                        {/* Physical Glowing Particle & Arrow Shooting Along Path */}
                        <circle r="4.5" fill="#60a5fa" className="drop-shadow-[0_0_10px_#60a5fa]">
                          <animateMotion dur="1.8s" repeatCount="indefinite" path="M 0 100 C 50 100, 50 0, 100 0" />
                        </circle>
                        <circle r="3" fill="#f97316" className="drop-shadow-[0_0_8px_#f97316]">
                          <animateMotion dur="1.8s" begin="0.9s" repeatCount="indefinite" path="M 0 100 C 50 100, 50 0, 100 0" />
                        </circle>
                        <defs>
                          <linearGradient id="hGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#f97316" stopOpacity="0.9" />
                          </linearGradient>
                        </defs>
                      </svg>
                    )}
                  </div>
                )}

              </div>
            );
          })}
        </div>
        
        {/* Edge fade gradients for aesthetic scrolling */}
        <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-24 bg-gradient-to-r from-[#020c1b] to-transparent pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-24 bg-gradient-to-l from-[#020c1b] to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default TransformationCanvas;
