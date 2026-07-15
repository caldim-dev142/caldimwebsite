"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Factory, Cog, Award, Users } from "lucide-react";
import { FadeUp, Counter } from "../animations/Animations";

const highlights = [
  { icon: Factory, value: 1, suffix: "+", label: "Years of Engineering" },
  { icon: Users, value: 5, suffix: "+", label: "Clients Served" },
  { icon: Award, value: 15, suffix: "+", label: "Projects Delivered" },
  { icon: Cog, value: 10, suffix: "+", label: "Enterprise Products" },
];

export const AboutSection: React.FC = () => {
  return (
    <section className="section-padding bg-[var(--background)]" id="about" aria-labelledby="about-heading">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <FadeUp>
              <div className="badge badge-accent mb-4">About CALDIM</div>
              <h2 id="about-heading" className="text-section-title text-[var(--navy)] mb-6">
                Engineering Heritage,{" "}
                <span className="gradient-text-navy">Software Innovation</span>
              </h2>
              <div className="section-divider mb-6" />
              <p className="text-body-lg mb-4">
                CALDIM is an engineering company with deep industrial roots. Founded on a foundation of precision engineering and technical excellence, CALDIM has expanded its capabilities to include a dedicated Software Division focused on delivering enterprise-grade digital solutions.
              </p>
              <div className="p-5 rounded-2xl bg-blue-900/30 border-l-4 border-l-blue-400 border border-blue-500/30 shadow-lg mb-8">
                <p className="text-slate-200 font-600 text-sm md:text-base leading-relaxed">
                  <span className="text-blue-300 font-800 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-400/40 inline-block mb-1 shadow-sm">
                    CALDIM-DAS (Digitalization & Automation Solutions)
                  </span>{" "}
                  operates at the intersection of industrial precision and modern cloud architecture. We engineer custom enterprise software, AI-powered tools, and automation systems built for scalability and performance.
                </p>
              </div>
              <Link href="/about" className="btn btn-navy inline-flex" id="about-learn-more">
                Learn About CALDIM
                <ArrowRight size={18} />
              </Link>
            </FadeUp>
          </div>

          {/* Right: Highlights grid */}
          <div>
            <FadeUp delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {highlights.map(({ icon: Icon, value, suffix, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                    className="card text-center hover:border-[var(--accent)]/40"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[var(--accent-muted)] flex items-center justify-center mx-auto mb-3">
                      <Icon size={18} className="text-[var(--accent)]" />
                    </div>
                    <div className="text-3xl font-800 text-[var(--navy)] mb-1">
                      <Counter end={value} suffix={suffix} />
                    </div>
                    <div className="text-sm text-[var(--text-muted)]">{label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Core values */}
              <div className="mt-6 p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                <h3 className="font-600 text-[var(--text-primary)] mb-3 text-sm uppercase tracking-wider">
                  Engineering Philosophy
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Precision First", "Scalable by Design", "Security Embedded", "Performance Optimized", "Long-term Partnership"].map((v) => (
                    <span key={v} className="badge badge-navy text-xs">{v}</span>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
