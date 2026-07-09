"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { FadeUp } from "../animations/Animations";

export const CTASection: React.FC = () => {
  return (
    <section
      className="section-padding bg-[var(--navy)] relative overflow-hidden"
      id="cta"
      aria-labelledby="cta-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10"
          style={{ background: "var(--accent)" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-5"
          style={{ background: "#60a5fa" }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="container-narrow relative z-10 text-center">
        <FadeUp>
          <div
            className="badge mx-auto mb-6 inline-flex"
            style={{ background: "rgba(37,99,235,0.2)", border: "1px solid rgba(37,99,235,0.35)", color: "#93c5fd" }}
          >
            <Calendar size={12} />
            Free Consultation Available
          </div>
          <h2 id="cta-heading" className="text-hero text-white mb-6">
            Ready to Build Your Next{" "}
            <span className="gradient-text">Digital Solution?</span>
          </h2>
          <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Tell us about your project. Our engineering team will assess your requirements and propose a technology solution aligned to your business objectives.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn btn-primary btn-lg" id="cta-consultation-btn">
              Book a Consultation
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/products"
              className="btn btn-lg"
              id="cta-products-btn"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "white",
                border: "1.5px solid rgba(255,255,255,0.2)",
              }}
            >
              Explore Our Products
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default CTASection;
