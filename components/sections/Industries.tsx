"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Factory, Car, TrendingUp, ShoppingBag, Package, 
  ArrowRight, Terminal, Cpu, ShieldAlert, CheckCircle2, 
  Activity, RefreshCw 
} from "lucide-react";
import { FadeUp } from "../animations/Animations";

interface IndustryData {
  id: string;
  icon: React.ElementType;
  title: string;
  headline: string;
  description: string;
  href: string;
  accent: string;
  metrics: { label: string; value: string; detail: string; alert?: boolean }[];
  command: string;
  svgVisual: (color: string) => React.ReactNode;
}

const industriesList: IndustryData[] = [
  {
    id: "manufacturing",
    icon: Factory,
    title: "Manufacturing",
    headline: "Factory Floor Digitalization & OEE Monitoring",
    description: "Real-time Overall Equipment Effectiveness (OEE) dashboards, automated machine telemetry collection, and predictive maintenance anomaly alerts.",
    href: "/industries#manufacturing",
    accent: "#3b82f6", // Blue
    command: "caldim_sys --mode=factory --monitor=oee",
    metrics: [
      { label: "Plant OEE Status", value: "89.4%", detail: "+1.2% this shift" },
      { label: "Assembly Line Speed", value: "42.5 m/m", detail: "Optimal pace" },
      { label: "Predictive Anomaly", value: "NOMINAL", detail: "0 active alerts" }
    ],
    svgVisual: (color) => (
      <svg viewBox="0 0 200 80" className="w-full h-16">
        <path
          d="M0,50 L30,50 L40,20 L50,60 L60,35 L70,50 L110,50 L120,10 L130,70 L140,40 L150,50 L200,50"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="120" cy="10" r="3" fill="#ef4444" className="animate-ping" />
        <circle cx="120" cy="10" r="3" fill="#ef4444" />
      </svg>
    )
  },
  {
    id: "automotive",
    icon: Car,
    title: "Automotive",
    headline: "OEM Supply Chain & Dealer Fulfillment",
    description: "Multi-tier spare parts inventory catalogs, automatic dealer order fulfillment synchronizations, and vehicle build phase tracking pipelines.",
    href: "/industries#automotive",
    accent: "#8b5cf6", // Purple
    command: "caldim_sys --mode=oem --track=vin-pipeline",
    metrics: [
      { label: "VIN Build Rate", value: "128/day", detail: "Shift quota met" },
      { label: "Fulfillment SLA", value: "98.9%", detail: "2-hour dispatch limit" },
      { label: "Active Suppliers", value: "48 Nodes", detail: "Database synced" }
    ],
    svgVisual: (color) => (
      <svg viewBox="0 0 200 80" className="w-full h-16">
        <rect x="10" y="25" width="25" height="30" rx="3" fill="none" stroke={color} strokeWidth="1.5" />
        <rect x="50" y="25" width="25" height="30" rx="3" fill="none" stroke={color} strokeWidth="1.5" />
        <rect x="90" y="25" width="25" height="30" rx="3" fill="none" stroke={color} strokeWidth="1.5" />
        <rect x="130" y="25" width="25" height="30" rx="3" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M35,40 L50,40 M75,40 L90,40 M115,40 L130,40" stroke={color} strokeWidth="2" strokeDasharray="4 2" />
        <circle cx="50" cy="40" r="2" fill={color} className="animate-pulse" />
        <circle cx="90" cy="40" r="2" fill={color} className="animate-pulse" />
      </svg>
    )
  },
  {
    id: "finance",
    icon: TrendingUp,
    title: "Finance",
    headline: "Fintech API Bridges & Audit trail Ledgers",
    description: "Sub-second banking API integrations, automated transaction reconciliation ledgers, and secure, tamper-proof audit trails for reporting.",
    href: "/industries#finance",
    accent: "#06b6d4", // Cyan
    command: "caldim_sys --mode=fintech --ledger=sync-validate",
    metrics: [
      { label: "Validate Rate", value: "1,450 tx/s", detail: "Peak load latency: 12ms" },
      { label: "Audit Match", value: "100%", detail: "Perfect ledger sync" },
      { label: "TLS Integrity", value: "SECURE", detail: "AES-256 standard active" }
    ],
    svgVisual: (color) => (
      <svg viewBox="0 0 200 80" className="w-full h-16">
        <path
          d="M0,70 L20,65 L40,55 L60,58 L80,40 L100,45 L120,25 L140,30 L160,10 L180,15 L200,5"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="160" cy="10" r="3.5" fill={color} />
      </svg>
    )
  },
  {
    id: "retail",
    icon: ShoppingBag,
    title: "Retail",
    headline: "Omnichannel Stocks & POS Sync Engine",
    description: "Unified inventory databases syncing store stock points and e-commerce carts dynamically, with automated low-stock dispatch prompts.",
    href: "/industries#retail",
    accent: "#ec4899", // Pink
    command: "caldim_sys --mode=retail --sync=pos-stocks",
    metrics: [
      { label: "Synced Registers", value: "85 POS", detail: "Real-time processing active" },
      { label: "Stock Accuracy", value: "99.98%", detail: "Automated audit logs match" },
      { label: "Alert Limit", value: "8 SKU Alert", detail: "Low stock flag raised" }
    ],
    svgVisual: (color) => (
      <svg viewBox="0 0 200 80" className="w-full h-16">
        <circle cx="30" cy="40" r="15" fill="none" stroke={color} strokeWidth="1.5" />
        <circle cx="80" cy="40" r="15" fill="none" stroke={color} strokeWidth="1.5" />
        <circle cx="130" cy="40" r="15" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M45,40 L65,40 M95,40 L115,40" stroke={color} strokeWidth="1.5" />
      </svg>
    )
  },
  {
    id: "logistics",
    icon: Package,
    title: "Logistics",
    headline: "Smart Dispatch & Geofenced Fleet Tracking",
    description: "Real-time truck telemetry maps, optimized automated vehicle route generation, and instant geofenced warehouse intake warnings.",
    href: "/industries#logistics",
    accent: "#10b981", // Emerald
    command: "caldim_sys --mode=logistics --track=fleet-gps",
    metrics: [
      { label: "Active Trucks", value: "142 Vehicles", detail: "Geofence links alive" },
      { label: "Routing Efficiency", value: "+14.2%", detail: "Fuel & drive-time saved" },
      { label: "ETA Window SLA", value: "96.4%", detail: "Optimal arrival compliance" }
    ],
    svgVisual: (color) => (
      <svg viewBox="0 0 200 80" className="w-full h-16">
        <path
          d="M10,10 L40,10 L70,40 L120,40 L150,10 L190,10"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <circle cx="70" cy="40" r="4" fill={color} />
        <circle cx="120" cy="40" r="4" fill={color} />
      </svg>
    )
  }
];

export const IndustriesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("manufacturing");
  const activeIndustry = industriesList.find((ind) => ind.id === activeTab) || industriesList[0];
  const ActiveIcon = activeIndustry.icon;

  return (
    <section 
      id="industries" 
      className="py-24 bg-slate-950 text-white relative overflow-hidden border-b border-slate-900"
      aria-labelledby="industries-heading"
    >
      {/* Dynamic Ambient Background Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[130px] opacity-10 pointer-events-none transition-all duration-700 ease-in-out"
        style={{ backgroundColor: activeIndustry.accent }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

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
            Every module is tailored to sync your physical operations with secure, enterprise-grade cloud systems. Select an industry to inspect its live status model.
          </p>
        </FadeUp>

        {/* 12-Column Console Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (5 Cols): Vertical Selection Tabs */}
          <div className="lg:col-span-5 flex flex-col gap-2 relative">
            <div className="absolute left-[22px] top-4 bottom-4 w-px bg-slate-800" />

            {industriesList.map((ind) => {
              const Icon = ind.icon;
              const isActive = ind.id === activeTab;
              return (
                <div
                  key={ind.id}
                  onMouseEnter={() => setActiveTab(ind.id)}
                  onClick={() => setActiveTab(ind.id)}
                  className="relative cursor-pointer group py-4.5 pl-16 pr-6 rounded-2xl transition-all duration-300 select-none"
                >
                  {/* Glowing active node dot */}
                  <div 
                    className="absolute left-[17px] top-[24px] w-2.5 h-2.5 rounded-full transition-all duration-500 z-10" 
                    style={{ 
                      backgroundColor: isActive ? ind.accent : '#334155',
                      boxShadow: isActive ? `0 0 14px ${ind.accent}` : 'none',
                      transform: isActive ? 'scale(1.2)' : 'scale(1)'
                    }} 
                  />

                  {/* Glass Card Background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndustryCard"
                      className="absolute inset-0 bg-white/[0.03] border border-white/[0.07] rounded-2xl shadow-xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="relative z-10 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                      <Icon size={18} style={{ color: isActive ? ind.accent : undefined }} />
                    </div>
                    <div>
                      <h3 className={`text-lg font-900 transition-colors duration-200 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                        {ind.title}
                      </h3>
                      <p className="text-slate-500 font-600 text-xs mt-0.5 group-hover:text-slate-450 transition-colors">
                        Operational Dashboard Mode
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column (7 Cols): Dynamic Console Terminal Display */}
          <div className="lg:col-span-7 sticky top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndustry.id}
                initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="rounded-3xl border border-white/[0.08] bg-[#070e1e] overflow-hidden shadow-2xl min-h-[460px] flex flex-col relative"
              >
                {/* Simulated browser header */}
                <div className="h-10 bg-[#040812] border-b border-white/5 flex items-center px-4 justify-between">
                  <div className="flex gap-1.5 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700/50" />
                  </div>
                  <div className="mx-auto text-[10px] font-mono text-slate-500 tracking-widest uppercase flex items-center gap-2">
                    <Terminal size={12} className="text-slate-400" />
                    <span>{activeIndustry.command}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-500 text-[10px] font-mono font-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>LIVE</span>
                  </div>
                </div>

                {/* Cyber Grid Pattern Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

                {/* Dashboard content */}
                <div className="p-8 md:p-10 flex-1 flex flex-col justify-between relative z-10">
                  
                  {/* Top: Description & Head */}
                  <div>
                    <div className="flex items-center gap-3.5 mb-5">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center border"
                        style={{ 
                          backgroundColor: `${activeIndustry.accent}15`, 
                          borderColor: `${activeIndustry.accent}30`,
                          boxShadow: `0 0 20px ${activeIndustry.accent}15`
                        }}
                      >
                        <ActiveIcon size={22} style={{ color: activeIndustry.accent }} />
                      </div>
                      <h4 className="text-xl md:text-2xl font-900 text-white tracking-tight">
                        {activeIndustry.headline}
                      </h4>
                    </div>

                    <p className="text-slate-400 font-500 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
                      {activeIndustry.description}
                    </p>
                  </div>

                  {/* Middle: Live SVG Graph visualization */}
                  <div className="mb-8 p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex flex-col justify-center min-h-[90px] relative overflow-hidden">
                    <div className="absolute top-2 left-3 flex items-center gap-1.5 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                      <Activity size={10} /> Active Pipeline Telemetry
                    </div>
                    {activeIndustry.svgVisual(activeIndustry.accent)}
                  </div>

                  {/* Bottom: Metrics Grid & CTA */}
                  <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="grid grid-cols-3 gap-3 flex-1">
                      {activeIndustry.metrics.map((met) => (
                        <div key={met.label} className="bg-white/[0.02] border border-white/5 rounded-xl p-3 text-left">
                          <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider mb-1">{met.label}</div>
                          <div className="text-sm font-950 text-white leading-none mb-1 flex items-center gap-1.5">
                            {met.alert && <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />}
                            <span>{met.value}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-500 leading-tight">{met.detail}</div>
                        </div>
                      ))}
                    </div>

                    <Link 
                      href={activeIndustry.href}
                      className="px-5 py-3 rounded-xl text-white font-800 text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shrink-0 group/btn"
                      style={{ backgroundColor: activeIndustry.accent }}
                    >
                      <span>Explore Case Studies</span>
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

export default IndustriesSection;
