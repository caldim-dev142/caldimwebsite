"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Factory, Car, TrendingUp, ShoppingBag, Package, 
  ArrowRight, Terminal, Activity 
} from "lucide-react";
import { FadeUp } from "../animations/Animations";

interface IndustryData {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  accent: string;
  metricLabel: string;
  metricValue: string;
  metricDetail: string;
  svgVisual: (color: string) => React.ReactNode;
}

const industriesList: IndustryData[] = [
  {
    id: "manufacturing",
    icon: Factory,
    title: "Manufacturing",
    description: "Real-time Overall Equipment Effectiveness (OEE) tracking dashboards, automated machine metrics collection, and predictive maintenance alerts.",
    href: "/industries#manufacturing",
    accent: "#3b82f6", // Blue
    metricLabel: "Plant OEE Status",
    metricValue: "89.4%",
    metricDetail: "Optimal rate",
    svgVisual: (color) => (
      <svg viewBox="0 0 200 60" className="w-full h-10">
        <path
          d="M0,40 L30,40 L40,15 L50,45 L60,25 L70,40 L110,40 L120,5 L130,55 L140,30 L150,40 L200,40"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="120" cy="5" r="2.5" fill="#ef4444" className="animate-ping" />
        <circle cx="120" cy="5" r="2.5" fill="#ef4444" />
      </svg>
    )
  },
  {
    id: "automotive",
    icon: Car,
    title: "Automotive",
    description: "Multi-tier spare parts inventory catalogs, automatic dealer order fulfillment updates, and vehicle build phase tracking pipelines.",
    href: "/industries#automotive",
    accent: "#8b5cf6", // Purple
    metricLabel: "VIN Build Rate",
    metricValue: "128/day",
    metricDetail: "Shift quota met",
    svgVisual: (color) => (
      <svg viewBox="0 0 200 60" className="w-full h-10">
        <rect x="25" y="15" width="20" height="25" rx="2" fill="none" stroke={color} strokeWidth="1.5" />
        <rect x="75" y="15" width="20" height="25" rx="2" fill="none" stroke={color} strokeWidth="1.5" />
        <rect x="125" y="15" width="20" height="25" rx="2" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M45,28 L75,28 M95,28 L125,28" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="45" cy="28" r="1.5" fill={color} className="animate-pulse" />
        <circle cx="95" cy="28" r="1.5" fill={color} className="animate-pulse" />
      </svg>
    )
  },
  {
    id: "finance",
    icon: TrendingUp,
    title: "Finance",
    description: "Sub-second banking API integrations, automated transaction reconciliation ledgers, and secure, tamper-proof audit trails for reporting.",
    href: "/industries#finance",
    accent: "#06b6d4", // Cyan
    metricLabel: "Reconciled Rate",
    metricValue: "1,450 tx/s",
    metricDetail: "Latency: 12ms",
    svgVisual: (color) => (
      <svg viewBox="0 0 200 60" className="w-full h-10">
        <path
          d="M0,50 L20,45 L40,35 L60,38 L80,20 L100,25 L120,10 L140,15 L160,3 L180,5 L200,1"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="160" cy="3" r="2.5" fill={color} />
      </svg>
    )
  },
  {
    id: "retail",
    icon: ShoppingBag,
    title: "Retail",
    description: "Unified inventory databases syncing store stock points and e-commerce carts dynamically, with automated low-stock prompts.",
    href: "/industries#retail",
    accent: "#ec4899", // Pink
    metricLabel: "Stock Syncs",
    metricValue: "99.98%",
    metricDetail: "85 registers live",
    svgVisual: (color) => (
      <svg viewBox="0 0 200 60" className="w-full h-10">
        <circle cx="35" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.2" />
        <circle cx="85" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.2" />
        <circle cx="135" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.2" />
        <path d="M47,30 L73,30 M97,30 L123,30" stroke={color} strokeWidth="1.2" />
      </svg>
    )
  },
  {
    id: "logistics",
    icon: Package,
    title: "Logistics",
    description: "Real-time truck telemetry maps, optimized automated vehicle route generation, and instant geofenced warehouse warnings.",
    href: "/industries#logistics",
    accent: "#10b981", // Emerald
    metricLabel: "Active Trucks",
    metricValue: "142 Nodes",
    metricDetail: "ETA window 96%",
    svgVisual: (color) => (
      <svg viewBox="0 0 200 60" className="w-full h-10">
        <path
          d="M15,10 L45,10 L75,40 L125,40 L155,10 L185,10"
          fill="none"
          stroke={color}
          strokeWidth="1.2"
          strokeDasharray="3 2"
        />
        <circle cx="75" cy="40" r="3" fill={color} />
        <circle cx="125" cy="40" r="3" fill={color} />
      </svg>
    )
  }
];

export const IndustriesSection: React.FC = () => {
  return (
    <section 
      id="industries" 
      className="py-24 bg-[#020c1b] text-white relative overflow-hidden border-b border-slate-900"
      aria-labelledby="industries-heading"
    >
      {/* Faint Technical Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-40" />

      <div className="container-wide relative z-10">
        
        {/* Section Header */}
        <FadeUp className="text-center mb-16">
          <div className="badge mb-4 mx-auto border-blue-900/50 bg-blue-900/20 text-blue-300 uppercase tracking-widest text-xs">
            Core Target Verticals
          </div>
          <h2 id="industries-heading" className="text-4xl md:text-5xl font-900 text-white tracking-tight mb-4">
            Built for Industrial Complexity
          </h2>
          <p className="text-slate-400 font-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Every module is tailored to sync your physical operations with secure, enterprise-grade cloud systems.
          </p>
        </FadeUp>

        {/* 5-Column Grid of High-Tech Terminal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {industriesList.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="h-full"
              >
                <Link
                  href={ind.href}
                  className="group relative flex flex-col justify-between rounded-3xl border border-white/[0.06] bg-[#0a192f]/60 hover:bg-[#0a192f]/90 hover:border-blue-500/85 transition-all duration-500 overflow-hidden min-h-[440px] p-6 shadow-xl hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)] cursor-pointer h-full"
                  style={{
                    // Standard tailwind hover border handled dynamically
                  }}
                  id={`industry-card-${ind.id}`}
                >
                  {/* Soft Background Neon Light Spot on Hover */}
                  <div 
                    className="absolute -top-24 -left-24 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: ind.accent }}
                  />

                  {/* Card Terminal Header */}
                  <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/5">
                    <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-500 tracking-wider">
                      <Terminal size={10} />
                      <span>{ind.id}.sys</span>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-mono font-700" style={{ color: ind.accent }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      <span>LIVE</span>
                    </div>
                  </div>

                  {/* Icon, Title, and Description */}
                  <div className="mb-4 flex-1">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center border mb-4 group-hover:scale-105 transition-transform duration-300"
                      style={{ 
                        backgroundColor: `${ind.accent}12`, 
                        borderColor: `${ind.accent}20` 
                      }}
                    >
                      <Icon size={18} style={{ color: ind.accent }} />
                    </div>
                    <h3 className="text-lg font-900 text-white mb-2 group-hover:text-blue-300 transition-colors">
                      {ind.title}
                    </h3>
                    <p className="text-slate-400 font-600 text-xs leading-relaxed min-h-[90px]">
                      {ind.description}
                    </p>
                  </div>

                  {/* Dynamic Sparkline Visual */}
                  <div className="my-4 p-3 rounded-xl bg-[#020c1b]/80 border border-white/5 flex flex-col justify-center min-h-[60px] relative overflow-hidden">
                    <div className="absolute top-1.5 left-2 flex items-center gap-1 text-[8px] font-mono text-slate-500 uppercase tracking-widest">
                      <Activity size={8} /> Signal Profile
                    </div>
                    <div className="opacity-50 group-hover:opacity-100 transition-opacity duration-300 scale-95 mt-2">
                      {ind.svgVisual(ind.accent)}
                    </div>
                  </div>

                  {/* Metrics Row */}
                  <div className="mt-2 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="text-left">
                      <div className="text-[8px] font-mono text-slate-500 uppercase tracking-wider">{ind.metricLabel}</div>
                      <div className="text-sm font-950 text-white">{ind.metricValue}</div>
                      <div className="text-[9px] text-slate-500 font-500 mt-0.5">{ind.metricDetail}</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default IndustriesSection;
