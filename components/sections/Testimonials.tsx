"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { FadeUp } from "../animations/Animations";

const testimonials = [
  {
    quote: "CALDIM's software team delivered a timesheet and payroll system that transformed how we manage our workforce. Reliable, accurate, and exactly what we needed.",
    author: "Director of Operations",
    company: "Manufacturing Enterprise",
    industry: "Manufacturing",
    rating: 5,
  },
  {
    quote: "The procurement platform they built cut our PO processing time significantly. The team understood our engineering workflows from day one.",
    author: "Head of Procurement",
    company: "Industrial Group",
    industry: "Automotive",
    rating: 5,
  },
  {
    quote: "What impressed us was how they combined deep domain knowledge with clean, maintainable code. They're engineers who can build software — that's rare.",
    author: "CTO",
    company: "Tech Solutions Ltd",
    industry: "Technology",
    rating: 5,
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section
      className="section-padding bg-[var(--surface)]"
      id="testimonials"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-wide">
        <FadeUp className="text-center mb-16">
          <div className="badge badge-accent mx-auto mb-4">Client Testimonials</div>
          <h2 id="testimonials-heading" className="text-section-title text-[var(--navy)] mb-4">
            What Our Clients Say
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto">
            Trusted by organizations that demand engineering-grade reliability from their technology partners.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, author, company, industry, rating }, i) => (
            <motion.div
              key={author}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card flex flex-col hover:border-[var(--accent)]/40"
            >
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <Quote size={24} className="text-[var(--accent-muted)] mb-3" style={{ color: "var(--accent)" }} />

              <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-1 mb-6 italic">
                &ldquo;{quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
                <div className="w-9 h-9 rounded-full bg-[var(--navy)]/10 flex items-center justify-center">
                  <span className="text-[var(--navy)] font-700 text-sm">{author[0]}</span>
                </div>
                <div>
                  <div className="font-600 text-[var(--text-primary)] text-sm">{author}</div>
                  <div className="text-[var(--text-muted)] text-xs">{company} · {industry}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
