"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Factory, Cog, Award, Users } from "lucide-react";
import { FadeUp, Counter } from "../animations/Animations";

const highlights = [
  { icon: Factory, value: 10, suffix: "+", label: "Years of CALDIM Growth" },
  { icon: Cog, value: 10, suffix: "+", label: "DAS Software Products" },
  { icon: Award, value: 50, suffix: "+", label: "Projects & Deployments" },
  { icon: Users, value: 25, suffix: "+", label: "Enterprise Clients" },
];

export const AboutSection: React.FC = () => {
  return (
    <section className="section-padding bg-[var(--background)]" id="about" aria-labelledby="about-heading">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <FadeUp>
              <div className="badge badge-accent mb-4">About CALDIM • DAS Division</div>
              <h2 id="about-heading" className="text-section-title text-[var(--navy)] mb-6">
                10+ Years of Engineering Rigor,{" "}
                <span className="gradient-text-navy">Leading Software Innovation</span>
              </h2>
              <div className="section-divider mb-6" />
              <p className="text-body-lg mb-4">
                For over a decade (10+ years), CALDIM has grown and expanded as a premier precision engineering and industrial operations powerhouse. Building on this solid foundation of trust and technical excellence, we established <strong className="text-[var(--navy)] font-800">CALDIM-DAS (Digitalization & Automation Solutions)</strong> as our dedicated Software Division.
              </p>
              <p className="text-body mb-8">
                <strong className="text-[var(--navy)] font-800">CALDIM-DAS</strong> operates at the exact intersection of 10 years of industrial mastery and state-of-the-art software architecture. We build cloud ERP platforms, AI automation tools, and specialized web applications tailored specifically for manufacturing, automotive, and industrial enterprises.
              </p>
              <Link href="/about" className="btn btn-navy inline-flex" id="about-learn-more">
                Explore CALDIM • DAS Story
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
