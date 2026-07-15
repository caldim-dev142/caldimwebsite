"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { FadeUp } from "../animations/Animations";

const steps = [
  { number: "01", title: "Discovery", description: "Requirements gathering, stakeholder interviews, and technical scoping to define project objectives." },
  { number: "02", title: "Planning", description: "Architecture design, technology selection, sprint planning, and project roadmap creation." },
  { number: "03", title: "UI/UX Design", description: "Wireframes, user flows, prototypes, and design system creation before a single line of code is written." },
  { number: "04", title: "Development", description: "Agile sprints with regular demos, code reviews, and continuous integration practices throughout." },
  { number: "05", title: "Quality Assurance", description: "Automated testing, manual QA, performance profiling, and security scanning on every release." },
  { number: "06", title: "Deployment", description: "Staged rollout, infrastructure setup, monitoring configuration, and production go-live support." },
  { number: "07", title: "Ongoing Support", description: "Post-launch monitoring, feature iterations, SLA-backed maintenance, and continuous improvement." },
];

export const DevelopmentProcess: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

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
            setActiveStep(0);
          }
        }
      },
      { rootMargin: "-25% 0px -25% 0px", threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-advance steps 1 through 7 (`steps.length`) on a 3.6s loop when visible & not hovered
  useEffect(() => {
    if (!isInView || isHovered) return;
    const timer = setInterval(() => {
      setActiveStep((prevIndex) => (prevIndex + 1) % steps.length);
    }, 3600);
    return () => clearInterval(timer);
  }, [isInView, isHovered]);

  const handleStepClick = useCallback((index: number) => {
    setActiveStep(index);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-[var(--surface)] relative overflow-hidden"
      id="process"
      aria-labelledby="process-heading"
    >
      <div className="container-wide relative z-10">
        <FadeUp className="text-center mb-16">
        
          <h2 id="process-heading" className="text-section-title text-[var(--navy)] mb-4">
            How We Build
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto text-slate-600">
            A structured, transparent delivery process that self-automates step by step right before your eyes, reducing risk and ensuring your project ships on time.
          </p>
        </FadeUp>

        {/* Horizontal timeline — desktop */}
        <div className="hidden lg:block">
          {/* Step indicators */}
          <div className="relative flex items-start gap-0 mb-8">
            {/* Connecting line */}
            <div className="absolute top-5 left-5 right-5 h-px bg-[var(--border)] z-0" />
            <motion.div
              className="absolute top-5 left-5 h-[2px] bg-[var(--accent)] z-0 transition-all duration-500 shadow-[0_0_8px_rgba(37,99,235,0.6)]"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />

            {steps.map((step, i) => {
              const isActive = i === activeStep;
              const isCompleted = i <= activeStep;

              return (
                <button
                  key={step.number}
                  onClick={() => handleStepClick(i)}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="relative flex flex-col items-center flex-1 group cursor-pointer"
                  aria-label={`Step ${step.number}: ${step.title}`}
                >
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-800 z-10 border-2 transition-all duration-300 ${
                      isCompleted
                        ? "bg-[var(--accent)] border-[var(--accent)] text-white shadow-md"
                        : "bg-white border-[var(--border)] text-[var(--text-muted)] group-hover:border-[var(--accent)]/50"
                    } ${isActive ? "ring-4 ring-blue-500/30 scale-110 shadow-[0_0_15px_rgba(37,99,235,0.4)]" : ""}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {step.number}
                  </motion.div>
                  <div
                    className={`mt-3 text-xs font-700 text-center transition-colors ${
                      isActive ? "text-[var(--accent)] font-800 scale-105" : "text-[var(--text-muted)]"
                    }`}
                  >
                    {step.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active step detail */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="card max-w-2xl mx-auto text-center border-2 border-[var(--accent)]/30 shadow-xl relative overflow-hidden group cursor-pointer bg-white"
          >
            {/* Top accent loading bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent)]/15">
              <motion.div 
                key={`${activeStep}-${isHovered}-${isInView}`}
                initial={{ width: "0%" }}
                animate={{ width: isHovered || !isInView ? "0%" : "100%" }}
                transition={{ duration: 3.6, ease: "linear" }}
                className="h-full bg-[var(--accent)] shadow-[0_0_10px_rgba(37,99,235,0.8)]"
              />
            </div>

            <div className="text-5xl font-800 gradient-text mb-3 pt-2">{steps[activeStep].number}</div>
            <h3 className="text-2xl font-800 text-[var(--navy)] mb-3">{steps[activeStep].title}</h3>
            <p className="text-slate-600 text-base leading-relaxed max-w-xl mx-auto">{steps[activeStep].description}</p>
          </motion.div>
        </div>

        {/* Vertical list — mobile */}
        <div className="lg:hidden flex flex-col gap-3 relative">
          {steps.map((step, i) => {
            const isActive = i === activeStep;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleStepClick(i)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`flex gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-white border-[var(--accent)] shadow-lg ring-2 ring-blue-500/20 scale-[1.02]"
                    : "bg-white/60 border-[var(--border)] hover:bg-white"
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-800 shrink-0 z-10 transition-all ${
                  isActive
                    ? "bg-[var(--accent)] text-white shadow-md ring-2 ring-blue-500/30 scale-110"
                    : "bg-slate-100 text-slate-500 border border-slate-200"
                }`}>
                  {step.number}
                </div>
                <div className="pt-0.5">
                  <h3 className={`font-700 text-base mb-1 ${isActive ? "text-[var(--accent)] font-800" : "text-[var(--navy)]"}`}>
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DevelopmentProcess;
