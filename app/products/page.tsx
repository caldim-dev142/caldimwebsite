"use client";

import React, { useState } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp } from "@/components/animations/Animations";
import { CTASection } from "@/components/sections/CTA";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, Package, ShoppingCart, MapPin, Sparkles, 
  FolderKanban, Zap, Warehouse, Cpu, ArrowRight, Play, Video, CheckCircle2, Activity, Layers, Terminal, ShieldCheck, ChevronRight, Eye, Sparkle, Box
} from "lucide-react";

interface ProductItem {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ElementType;
  status: "live" | "coming-soon";
  color: string;
  videoTagline: string;
  mediaTitle: string;
  architectureHighlight: string;
  metrics: string[];
  unsplashUrl: string;
}

const products: ProductItem[] = [
  {
    id: "caltims",
    name: "CALTIMS",
    category: "HR & Payroll Engine",
    description: "Our core timesheet and payroll automation engine. CalTIMS bridges the gap between daily work logs and month-end payroll by calculating leaves, task allocations, and tax deductions automatically without manual intervention.",
    icon: Clock,
    status: "live",
    color: "#2563EB",
    videoTagline: "Watch 2-Min Payroll Automation & Timesheet Walkthrough",
    mediaTitle: "Timesheet & Automated Payroll Telemetry Hub",
    architectureHighlight: "Sub-second Zod verified schema verification & real-time leave ledger synchronization.",
    metrics: [
      "Automated Tax & Leave Calculation Engine",
      "Sub-Second Timesheet & Shift Ledger Sync",
      "100% Audit-Ready & Statutory Compliance Verification",
      "Zero Spreadsheet Error Margin across 10,000+ Workers"
    ],
    unsplashUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1920&auto=format&fit=crop"
  },
  {
    id: "calrims",
    name: "CALRIMS",
    category: "Recruitment Intelligence",
    description: "An end-to-end hiring platform that automates the full candidate journey — from application ingestion and candidate screening to interviews, offer management, and onboarding.",
    icon: Package,
    status: "live",
    color: "#8B5CF6",
    videoTagline: "Watch Candidate Resume Parsing & Automated Voice Interview Demo",
    mediaTitle: "Recruitment Pipeline & Auto-Screening Dashboard",
    architectureHighlight: "Encrypted resume parsing with adaptive AI candidate evaluation nodes.",
    metrics: [
      "Automated Candidate Ingestion & Resume Parsing",
      "Interactive Voice & Text Interview Screenings",
      "Visual Kanban Pipeline & Stage Enforcement Policies",
      "Self-Service Digital Onboarding & Document Signatures"
    ],
    unsplashUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1920&auto=format&fit=crop"
  },
  {
    id: "calbuy",
    name: "CALBUY",
    category: "Procurement Pipeline",
    description: "Automate purchase orders, track vendor lead times, and manage inventory requisitions across global suppliers. Integrated multi-stage approval paths completely eliminate chaotic email clutter and unapproved POs.",
    icon: ShoppingCart,
    status: "live",
    color: "#10B981",
    videoTagline: "Watch Automated Requisition & Vendor Approval Pipeline Demo",
    mediaTitle: "Multi-Tier Enterprise Procurement Hub",
    architectureHighlight: "Multi-signature cryptographic approval routing with ERP ledger injection.",
    metrics: [
      "Automated Multi-Stage Governance Approvals",
      "Live Vendor Lead Time & Delivery SLA Tracking",
      "Zero Email Requisition Clutter or Rogue Spend",
      "Instant 3-Way Invoice Matching & Audit Verification"
    ],
    unsplashUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1920&auto=format&fit=crop"
  },
  {
    id: "caltrack",
    name: "CALTRACK",
    category: "Field Service Management",
    description: "CalTrack is an end-to-end platform for managing field operations, automated timesheets, and payroll compliance. Built for service-based businesses and mobile workforces, it bridges the gap between customer bookings and field technician dispatching.",
    icon: MapPin,
    status: "live",
    color: "#F59E0B",
    videoTagline: "Watch Live Field Technician Dispatch & GPS Tracking Radar",
    mediaTitle: "Smart Dispatch & Mobile Workforce Telemetry",
    architectureHighlight: "High-frequency GPS ingestion with real-time labor compliance rules engine.",
    metrics: [
      "Zero Payroll Errors via Automated Calculation",
      "Real-Time Field Workforce Visibility",
      "Guaranteed Overtime & Break Compliance",
      "Seamless Customer Booking & ETA Tracking"
    ],
    unsplashUrl: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1920&auto=format&fit=crop"
  },
  {
    id: "ai-beauty",
    name: "AI BEAUTY",
    category: "AI Neural Analytics",
    description: "AI-based recommendations and trend predictive analytics tailored for cosmetic retailers. Processes demographic statistics, regional climate shifts, and real-time sales velocity to suggest exact stock counts.",
    icon: Sparkles,
    status: "live",
    color: "#EC4899",
    videoTagline: "Watch Neural Trend Predictive Analytics & Stock Engine Demo",
    mediaTitle: "AI Neural Recommendation & Forecasting Engine",
    metrics: [
      "Demographic & Regional Trend Forecasting Matrix",
      "Automated Store Level Stock Count Optimization",
      "Real-Time Cosmetic Retail Sales Velocity Analytics",
      "AI-Driven Consumer Preference Pattern Mapping"
    ],
    architectureHighlight: "Custom LLM & time-series neural network trained on retail purchasing vectors.",
    unsplashUrl: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1920&auto=format&fit=crop"
  },
  {
    id: "project-management",
    name: "Project Management",
    category: "Industrial Scheduling",
    description: "Structured project planners, task allocation systems, and verified milestones logging. Designed specifically for precision scheduling in complex industrial manufacturing and plant setup delivery projects.",
    icon: FolderKanban,
    status: "live",
    color: "#6366F1",
    videoTagline: "Watch Industrial Milestone & Delivery Planner Walkthrough",
    mediaTitle: "Interactive Gantt & Industrial Milestone Matrix",
    metrics: [
      "Precision Industrial & Engineering Scheduling",
      "Automated Task Allocation & Engineer Load Balancing",
      "Verified Milestone & Phase Gate Verification",
      "Real-Time Critical Path Bottleneck Detection"
    ],
    architectureHighlight: "Deterministic DAG scheduling engine with automated resource leveling.",
    unsplashUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1920&auto=format&fit=crop"
  },
  {
    id: "calems",
    name: "CALEMS Employee",
    category: "HR & Employee Management",
    description: "Secure, multi-tenant HR platform that automates the full employee lifecycle. Manages paperless onboarding, real-time attendance, and automated payroll processing.",
    icon: Package,
    status: "live",
    color: "#3B82F6",
    videoTagline: "Watch Real-Time Onboarding & Payroll Processing",
    mediaTitle: "Digital HR & Employee Lifecycle Command",
    metrics: [
      "90% Faster Digital Candidate Onboarding",
      "Real-Time Attendance & Leave Tracking",
      "Automated Complex Payroll Computation",
      "Isolated Multi-Tenant Security Architecture"
    ],
    architectureHighlight: "Encrypted multi-tenant database with automated compliance audit logging.",
    unsplashUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop"
  },
  {
    id: "warehouse-management",
    name: "Warehouse Management",
    category: "Logistics Automation",
    description: "Manage barcode logging, storage aisle optimization, and automated picking checklists. Built for high-volume industrial supply chains, distribution bays, and rapid shipping verification.",
    icon: Warehouse,
    status: "live",
    color: "#14B8A6",
    videoTagline: "Watch Automated Barcode Logging & High-Speed Picking Demo",
    mediaTitle: "Warehouse Logistics & Aisle Optimization Matrix",
    metrics: [
      "High-Speed Barcode & QR Scanner Telemetry Sync",
      "Storage Aisle & Pallet Bay Space Optimization",
      "Automated Picking Checklists & Shipping Verification",
      "Zero Mis-Shipment Rate across High-Volume Bays"
    ],
    architectureHighlight: "Sub-millisecond inventory bin indexing with 3D spatial coordinate routing.",
    unsplashUrl: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1920&auto=format&fit=crop"
  },
  {
    id: "asset-management",
    name: "Asset Management",
    category: "Enterprise Infrastructure",
    description: "Log equipment maintenance schedules, calculate automated depreciation records, and verify hardware usage licenses across your organization. Centralized, audit-ready asset register built for enterprise scale.",
    icon: Cpu,
    status: "live",
    color: "#64748B",
    videoTagline: "Watch Centralized Hardware & License Register Walkthrough",
    mediaTitle: "Enterprise Asset Register & Lifecycle Registry",
    metrics: [
      "Automated Depreciation Schedule & Asset Valuation",
      "Hardware License & Software Expiry Verification",
      "Centralized Audit-Ready Lifecycle Asset Register",
      "Preventive Maintenance Logging & Warranty Tracking"
    ],
    architectureHighlight: "Immutable audit trail logging with barcode register synchronization.",
    unsplashUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1920&auto=format&fit=crop"
  },
  {
    id: "calmisc",
    name: "CAL MISC",
    category: "Steel Estimation",
    description: "Generate precise stair, railing, and guard-rail bids with real-time cost breakdowns. Built specifically for structural steel fabricators and estimators.",
    icon: Box,
    status: "live",
    color: "#F43F5E",
    videoTagline: "Watch Real-Time Steel Estimation & Bidding Walkthrough",
    mediaTitle: "Structural Steel Proposal & BOM Engine",
    metrics: [
      "90% Faster Bid Turnaround Time",
      "Zero Calculation Mistakes via Auto-Formulas",
      "Built-In IBC and OSHA Code Compliance Checks",
      "Instant Print-Ready PDF & BOM Generation"
    ],
    architectureHighlight: "Dynamic multi-variable pricing matrix with real-time geometric calculation engine.",
    unsplashUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1920&auto=format&fit=crop"
  }
];

export default function ProductsPage() {
  const [selectedId, setSelectedId] = useState<string>("caltims");
  const selectedProduct = products.find((p) => p.id === selectedId) || products[0];
  const SelectedIcon = selectedProduct.icon;

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Page Hero */}
        <section className="hero-bg py-24 md:py-32 pt-40 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(10,25,47,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(10,25,47,0.035)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          
          <div className="container-wide text-center relative z-10">
            <FadeUp>
              <div className="badge badge-navy mb-5 mx-auto inline-flex items-center gap-2 shadow-sm">
                <Video size={14} className="text-blue-500 animate-pulse" />
                <span>Interactive Split-Screen Command Center</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-900 text-[var(--navy)] tracking-tight mb-5">
                Our Enterprise Product Suite
              </h1>
              <p className="text-slate-600 font-medium text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
                No plain cards. Inspect our entire software division through our interactive side-by-side **Cinematic Video Stage** and technical matrix console below.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* 1. THE CINEMATIC SPLIT-SCREEN COMMAND CONSOLE (Zero Cards!) */}
        <section className="py-12 md:py-16 bg-[var(--navy)] text-white border-y border-white/10 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="container-wide relative z-10">
            
            {/* Top Console Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase block mb-1">
                  CALDIM DAS • Division Console v2.4
                </span>
                <h2 className="text-2xl sm:text-3xl font-900 text-white tracking-tight flex items-center gap-2.5">
                  <Terminal size={24} className="text-blue-400 shrink-0" />
                  <span>Interactive Product Command Matrix</span>
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-700 font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>{products.length} Products Loaded</span>
                </span>
              </div>
            </div>

            {/* Split Screen Grid: Left Side (Selector Dock - 4 Cols) vs Right Side (Cinematic Video Stage - 8 Cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Side: Sleek Product Selector Dock (4 cols) */}
              <div className="lg:col-span-4 bg-[#020c1b]/80 rounded-3xl p-4 md:p-5 border border-white/10 shadow-2xl flex flex-col justify-between max-h-[720px] overflow-y-auto">
                <div className="flex flex-col gap-2">
                  <div className="text-[10px] font-mono tracking-widest uppercase text-blue-300/80 px-3 py-2 border-b border-white/10 flex items-center justify-between">
                    <span>Select Product Module</span>
                    <span className="text-white/40">[{products.length} Items]</span>
                  </div>

                  {products.map((item) => {
                    const ItemIcon = item.icon;
                    const isSelected = item.id === selectedId;

                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedId(item.id)}
                        className={`w-full group flex items-center justify-between p-3.5 rounded-2xl text-left transition-all duration-300 ${
                          isSelected
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-800 scale-[1.02] border border-blue-400/40"
                            : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white font-700 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div 
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                              isSelected ? "bg-white/20 text-white shadow-inner" : "bg-[#0A192F] text-blue-400 group-hover:bg-blue-500/20 group-hover:text-white"
                            }`}
                          >
                            <ItemIcon size={18} />
                          </div>
                          <div className="truncate">
                            <div className="text-sm tracking-tight truncate flex items-center gap-2">
                              <span>{item.name}</span>
                              {item.status === "live" && (
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" title="Live Production" />
                              )}
                            </div>
                            <div className="text-[11px] text-white/60 font-500 truncate">
                              {item.category}
                            </div>
                          </div>
                        </div>

                        <ChevronRight size={16} className={`shrink-0 transition-transform ${isSelected ? "translate-x-1 text-white" : "text-white/30 group-hover:text-white group-hover:translate-x-0.5"}`} />
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 px-3 text-[11px] text-white/50 font-mono flex items-center justify-between">
                  <span>Navigation: Side-by-Side</span>
                  <span>⚡ Instant Switch</span>
                </div>
              </div>

              {/* Right Side: Massive 16:9 Cinematic Video & Telemetry Stage (8 cols) */}
              <div className="lg:col-span-8 flex flex-col h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedProduct.id}
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="bg-[#020c1b] rounded-3xl border border-white/15 shadow-2xl p-6 md:p-8 flex flex-col justify-between h-full relative overflow-hidden"
                  >
                    {/* Top Accent Glow on active stage */}
                    <div 
                      className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] opacity-20 pointer-events-none transition-all duration-700"
                      style={{ background: selectedProduct.color }}
                    />

                    <div>
                      {/* Stage Header Info */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg border border-white/20"
                            style={{ background: selectedProduct.color }}
                          >
                            <SelectedIcon size={24} className="text-white" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono tracking-widest uppercase text-blue-400 block">
                              Active Stage Inspection • {selectedProduct.category}
                            </span>
                            <h3 className="text-2xl md:text-4xl font-900 text-white tracking-tight leading-none mt-1">
                              {selectedProduct.name}
                            </h3>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {selectedProduct.status === "live" ? (
                            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-800 uppercase tracking-wide font-mono flex items-center gap-1.5 shadow">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                              Live Production
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-slate-300 text-xs font-800 uppercase tracking-wide font-mono">
                              In Engineering / Soon
                            </span>
                          )}
                          <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-800 font-mono">
                            HD Video Ready
                          </span>
                        </div>
                      </div>

                      {/* 16:9 CINEMATIC VIDEO & SCREEN RECORDING STAGE (Pre-wired for videos!) */}
                      <div className="relative w-full min-h-[320px] sm:min-h-[400px] md:min-h-[480px] rounded-2xl bg-[#0A192F] border border-white/20 shadow-2xl overflow-hidden mb-7 group flex flex-col items-center justify-center text-center p-6 md:p-10">
                        {/* Hookup / Poster Image (Tries local image first, falls back to dynamic placeholder) */}
                        <img 
                          src={`/images/${selectedProduct.id}-poster.jpg`}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = selectedProduct.unsplashUrl;
                          }}
                          alt={`${selectedProduct.name} Preview`}
                          className="absolute inset-0 w-full h-full object-cover object-center opacity-60 group-hover:opacity-40 transition-all duration-700 pointer-events-none scale-105 group-hover:scale-100"
                        />
                        
                        {/* Blueprint Grid & Simulated Waveforms inside Video Box */}
                        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none mix-blend-overlay" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020c1b] via-[#020c1b]/60 to-transparent opacity-70 pointer-events-none" />

                        {/* Animated Video Play Center Overlay - Perfectly Centered */}
                        <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto py-6 max-w-xl mx-auto w-full">
                          <motion.div 
                            whileHover={{ scale: 1.12 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.6)] cursor-pointer mb-4 border-2 border-white/30 group-hover:ring-4 group-hover:ring-blue-400/30 transition-all shrink-0"
                            title="Launch Video Walkthrough"
                          >
                            <Play size={28} className="fill-white ml-1" />
                          </motion.div>
                          
                          <span className="text-xs font-800 tracking-wider uppercase text-blue-300 font-mono mb-1.5 block">
                            [Interactive Video & Walkthrough Stage]
                          </span>
                          <h4 className="text-xl md:text-2xl font-900 text-white tracking-tight drop-shadow mb-2.5">
                            {selectedProduct.mediaTitle}
                          </h4>
                          <p className="text-xs md:text-sm text-slate-300 font-500 max-w-md mx-auto leading-relaxed">
                            {selectedProduct.videoTagline}. Ready to drop in `<video src="..." />` or interactive product recording!
                          </p>
                        </div>

                        {/* Top corner live telemetry badge */}
                        <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] font-mono text-white/80 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                          <span>LIVE FEED PREVIEW • {selectedProduct.id.toUpperCase()}_ENG_STG</span>
                        </div>
                        <div className="absolute top-4 right-4 text-[10px] font-mono text-blue-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                          1080p 60FPS
                        </div>
                      </div>

                      {/* Technical Description & Architecture Highlight */}
                      <p className="text-slate-200 text-sm md:text-base font-medium leading-relaxed mb-6">
                        {selectedProduct.description}
                      </p>

                      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 flex items-start gap-3">
                        <Layers size={18} className="text-blue-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[11px] font-800 uppercase tracking-wider text-blue-300 font-mono block mb-0.5">
                            Architectural Blueprint & Engine Spec:
                          </span>
                          <span className="text-xs md:text-sm text-slate-300 font-600">
                            {selectedProduct.architectureHighlight}
                          </span>
                        </div>
                      </div>

                      {/* 4-Point Verified Operational Metrics */}
                      <div>
                        <span className="text-[11px] font-800 uppercase tracking-widest text-slate-400 font-mono mb-3 block">
                          Verified Operational Capabilities & Metrics:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {selectedProduct.metrics.map((metric, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs md:text-sm font-700 text-white bg-white/5 p-3 rounded-xl border border-white/5">
                              <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                              <span>{metric}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Stage Action CTA Footer */}
                    <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-xs text-slate-400 font-mono">
                        Need exact custom specifications for {selectedProduct.name}?
                      </div>
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Link
                          href={`/products/${selectedProduct.id}`}
                          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-3 rounded-xl text-xs font-800 tracking-wide transition-all shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95 group"
                        >
                          <span>Inspect Full {selectedProduct.name} Architecture</span>
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>

                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

          </div>
        </section>

        {/* 2. INDUSTRIAL HORIZONTAL TECHNICAL MATRIX TABLE (Quick View Spreadsheet - Zero Cards!) */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="badge badge-navy font-600 mx-auto mb-3 flex items-center gap-2">
                <Activity size={14} className="text-blue-600" />
                <span>Spreadsheet / Technical Register</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-900 text-[var(--navy)] tracking-tight mb-3">
                Enterprise Product Matrix Register
              </h2>
              <p className="text-slate-600 font-medium text-sm sm:text-base">
                Prefer scanning all specifications at a glance? Use our horizontal industrial matrix below to compare every engine in our software division.
              </p>
            </div>

            {/* Sleek Horizontal Spreadsheet Matrix Table */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[var(--navy)] text-white text-[11px] font-mono tracking-widest uppercase border-b border-slate-200">
                      <th className="py-4 px-6 font-800">Module ID</th>
                      <th className="py-4 px-6 font-800">Product Name</th>
                      <th className="py-4 px-6 font-800">Primary Domain / Category</th>
                      <th className="py-4 px-6 font-800">Deployment Status</th>
                      <th className="py-4 px-6 font-800">Core Capability & Metric</th>
                      <th className="py-4 px-6 font-800 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-700 text-[var(--navy)]">
                    {products.map((item) => {
                      const TIcon = item.icon;
                      const isSelected = item.id === selectedId;

                      return (
                        <tr 
                          key={item.id}
                          onClick={() => {
                            setSelectedId(item.id);
                            window.scrollTo({ top: 380, behavior: "smooth" });
                          }}
                          className={`hover:bg-blue-50/60 transition-colors cursor-pointer group ${
                            isSelected ? "bg-blue-50/80 font-800 border-l-4 border-blue-600" : ""
                          }`}
                        >
                          <td className="py-4 px-6 font-mono text-slate-400 text-xs">
                            #{item.id.toUpperCase()}
                          </td>
                          <td className="py-4 px-6 font-900 flex items-center gap-2.5">
                            <div 
                              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                              style={{ background: `${item.color}15`, color: item.color }}
                            >
                              <TIcon size={15} />
                            </div>
                            <span className="group-hover:text-blue-600 transition-colors">{item.name}</span>
                          </td>
                          <td className="py-4 px-6 text-slate-600 font-600">
                            {item.category}
                          </td>
                          <td className="py-4 px-6">
                            {item.status === "live" ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-800 text-[10px] uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Live
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-700 text-[10px] uppercase font-mono">
                                Coming Soon
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-slate-600 font-500 max-w-xs truncate" title={item.metrics[0]}>
                            {item.metrics[0]}
                          </td>
                          <td className="py-4 px-6 text-right">
                            <Link
                              href={`/products/${item.id}`}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-[var(--navy)] text-xs font-800 transition-all shadow-sm"
                            >
                              <span>Inspect</span>
                              <ArrowRight size={13} />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
