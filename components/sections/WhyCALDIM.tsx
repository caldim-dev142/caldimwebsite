"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Cog, Shield, Zap, MessageSquare, BarChart3, Clock, Users } from "lucide-react";
import { FadeUp } from "../animations/Animations";

const reasons = [
  {
    code: "01 // SFT",
    icon: Cog,
    title: "Software-First Architecture",
    description: "Every enterprise application is designed with clean software architectural discipline — scalable, maintainable, and built to last.",
  },
  {
    code: "02 // SEC",
    icon: Shield,
    title: "Enterprise Security",
    description: "Security is embedded in the development process, not bolted on afterward.",
  },
  {
    code: "03 // AGL",
    icon: Zap,
    title: "Agile Delivery",
    description: "Iterative development with regular releases, ensuring you see progress and can provide feedback continuously.",
  },
  {
    code: "04 // DOM",
    icon: BarChart3,
    title: "Domain Expertise",
    description: "Deep understanding of manufacturing, automotive, and industrial business processes.",
  },
  {
    code: "05 // PTR",
    icon: Users,
    title: "Long-term Partnership",
    description: "We don't just build and leave. We maintain, evolve, and optimize your systems over time.",
  },
  {
    code: "06 // COM",
    icon: MessageSquare,
    title: "Transparent Communication",
    description: "Clear project timelines, regular status updates, and honest assessments at every stage.",
  },
  {
    code: "07 // SLA",
    icon: Clock,
    title: "Reliable SLA",
    description: "Defined service level agreements with guaranteed response times and uptime commitments.",
  },
  {
    code: "08 // QUA",
    icon: CheckCircle2,
    title: "Quality Assurance",
    description: "Comprehensive testing strategies including unit, integration, and end-to-end testing on every release.",
  },
];

export const WhyCALDIM: React.FC = () => {
  return (
    <section
      className="section-padding bg-slate-50/50 border-t border-slate-200/60"
      id="why-caldim"
      aria-labelledby="why-heading"
    >
      <div className="container-wide">
        <FadeUp className="text-center mb-16 max-w-3xl mx-auto">
          <div className="badge badge-navy mb-4 shadow-sm bg-blue-50/50 border border-blue-200/50 text-blue-600">Why CALDIM</div>
          <h2 id="why-heading" className="text-section-title text-[var(--navy)] font-900 mb-4 tracking-tight">
            What Sets Us <span className="text-blue-600 italic font-light">Apart</span>
          </h2>
          <p className="text-slate-600 font-semibold text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Built by veteran software architects, our digital division brings rigorous industrial discipline to enterprise software delivery.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map(({ icon: Icon, title, description, code }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="bg-[#0c0f12] border border-[#1e2329]/80 rounded-[28px] p-5 flex flex-col gap-4 shadow-lg hover:shadow-2xl hover:border-blue-500/70 hover:scale-[1.02] transition-all duration-300 group overflow-hidden relative"
            >
              {/* Top visual box with grid and telemetry */}
              <div className="relative w-full aspect-[1.8/1] rounded-2xl overflow-hidden bg-[#13171c] border border-[#1e2329]/50 flex items-center justify-center p-4">
                {/* Blueprint grid lines */}
                <div 
                  className="absolute inset-0 opacity-[0.15] transition-opacity duration-300 group-hover:opacity-[0.28]"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(59,130,246,0.25) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(59,130,246,0.25) 1px, transparent 1px)
                    `,
                    backgroundSize: "16px 16px",
                  }}
                />
                
                {/* Monospace telemetry readings */}
                <div className="absolute top-2.5 left-3 text-[8px] font-bold font-mono text-slate-500 tracking-wider">
                  SYS_STATUS: ACTIVE
                </div>
                <div className="absolute top-2.5 right-3 text-[9px] font-bold font-mono text-blue-400 tracking-wider">
                  {code}
                </div>
                <div className="absolute bottom-2 left-3 text-[8px] font-bold font-mono text-slate-500/80">
                  REF_ID // {1000 + i * 123}
                </div>

                {/* Glassmorphic icon container */}
                <div className="relative w-12 h-12 rounded-xl bg-[#1e2329]/70 border border-[#2c333c]/60 flex items-center justify-center shadow-sm text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 group-hover:shadow-md">
                  <Icon size={20} />
                </div>
              </div>

              {/* Text content block with left indicator bar */}
              <div className="flex gap-3.5 mt-1">
                {/* Animated Left accent line */}
                <div className="w-1 rounded-full bg-blue-500/20 group-hover:bg-blue-500 transition-colors duration-300 shrink-0 self-stretch my-0.5" />
                
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-800 text-white text-base leading-snug group-hover:text-blue-400 transition-colors duration-200">{title}</h3>
                  <p className="text-slate-400 font-500 text-xs md:text-sm leading-relaxed">{description}</p>
                </div>
              </div>

              {/* Monospace Status Strip at the bottom */}
              <div className="pt-3 border-t border-[#1e2329]/50 flex items-center justify-between text-[9px] font-mono text-slate-500 tracking-wider mt-auto">
                <span>SYSTEM: NOMINAL</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  ONLINE
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyCALDIM;
