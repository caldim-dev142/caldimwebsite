"use client";

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp } from "@/components/animations/Animations";
import { CTASection } from "@/components/sections/CTA";
import { 
  Factory, Car, TrendingUp, ShoppingBag, Package, 
  CheckCircle2, AlertTriangle, ArrowRight, Layers, Activity, Cpu, ShieldCheck, Terminal, ChevronRight, Zap, RefreshCw, BarChart3, ArrowDownRight, GitBranch, Database, ShieldAlert, CheckCircle, Network, HardDrive, Building2
} from "lucide-react";

interface IndustrySection {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  domainName: string;
  icon: React.ElementType;
  themeColor: string;
  badgeBg: string;
  badgeText: string;
  stripBg: string;
  textColor: string;
  legacyBottleneck: string;
  caldimTransformation: string;
  softwareStack: {
    layer: string;
    title: string;
    description: string;
    engine: string;
  }[];
  metrics: {
    label: string;
    value: string;
  }[];
}

const industryStrips: IndustrySection[] = [
  {
    id: "construction",
    number: "01",
    title: "Construction & Fabrication",
    subtitle: "Massive Infrastructure BIM & Raw Material Tracking",
    domainName: "Heavy Engineering & Mega-Project Sites",
    icon: Building2,
    themeColor: "#f59e0b",
    badgeBg: "bg-amber-100 border-amber-300 text-amber-900",
    badgeText: "Real-Time Site Automation",
    stripBg: "bg-[#0A192F] text-white",
    textColor: "text-white",
    legacyBottleneck: "Disjointed contractor schedules, lost raw materials leading to massive budget overruns, and manual paper-based safety compliance logs.",
    caldimTransformation: "Centralized structural BIM (Building Information Modeling) integrations, automated supply chain GPS routing, and instant digital compliance sign-offs.",
    softwareStack: [
      { layer: "Layer 01 • Material Sync", title: "Supplier Procurement Portal", description: "Automated PO generation and raw material lead-time tracking for steel and concrete.", engine: "CALBUY" },
      { layer: "Layer 02 • Site Logistics", title: "Heavy Equipment GPS Radar", description: "Live tracking of critical heavy machinery and fleet transit across mega-sites.", engine: "CALTRACK" },
      { layer: "Layer 03 • Daily Logs", title: "Digital Compliance & Safety Ledger", description: "Timestamped mobile safety checklists replacing traditional contractor paperwork.", engine: "CALTIMS" },
      { layer: "Layer 04 • Executive BIM", title: "3D Project Lifecycle Matrix", description: "Real-time project completion mapping synced directly with ERP financial ledgers.", engine: "Core Suite" }
    ],
    metrics: [
      { label: "Material Waste Reduction", value: "-45%" },
      { label: "Contractor Log Accuracy", value: "100%" },
      { label: "Project Delay Mitigation", value: "+30%" },
      { label: "Safety Audit Readiness", value: "Instant" }
    ]
  },
  {
    id: "manufacturing",
    number: "02",
    title: "Manufacturing & Heavy Industry",
    subtitle: "Plant Floor Automation & High-Speed Machine Telemetry",
    domainName: "Heavy Industrial Stamping & Assembly Bays",
    icon: Factory,
    themeColor: "#2563EB",
    badgeBg: "bg-blue-600/15 border-blue-400/40 text-blue-300",
    badgeText: "24/7 Floor Telemetry Sync",
    stripBg: "bg-slate-50 text-[var(--navy)] border-y border-slate-200",
    textColor: "text-[var(--navy)]",
    legacyBottleneck: "Paper checksheet inspection logs, siloed PLC status across isolated machinery, and blind machine downtime that halts entire production shifts.",
    caldimTransformation: "Direct IoT sensor ingestion, live OEE (Overall Equipment Effectiveness) status monitors, and automated paperless shift-to-shift handover verification.",
    softwareStack: [
      { layer: "Layer 01 • Edge Capture", title: "PLC & Sensor Status Ingestion", description: "Real-time machine telemetry & cycle counting synced via WebSocket.", engine: "CALRIMS" },
      { layer: "Layer 02 • Alarm & Radar", title: "Predictive Wear Threshold Alarms", description: "Automated alert generation hours before mechanical equipment failure.", engine: "CALTRACK" },
      { layer: "Layer 03 • Operations", title: "Paperless SOP & Shift Ledger", description: "Timestamped digital checklists synced with worker timesheet payroll.", engine: "CALTIMS" },
      { layer: "Layer 04 • Executive OEE", title: "Real-Time Yield & Quality Matrix", description: "Live plant floor throughput, scrap analysis, and audit readiness grids.", engine: "CAL EMS" }
    ],
    metrics: [
      { label: "Plant Throughput Gain", value: "+38%" },
      { label: "Paper Checksheet Elimination", value: "100%" },
      { label: "Audit Readiness Sync", value: "Sub-Sec" },
      { label: "Unplanned Downtime Reduction", value: "-64%" }
    ]
  },
  {
    id: "automotive",
    number: "03",
    title: "Automotive & Logistics Systems",
    subtitle: "Just-In-Time Assembly & Multi-Tier Supply Chain Radar",
    domainName: "Automotive Assembly Lines & Global Dealer Networks",
    icon: Car,
    themeColor: "#8B5CF6",
    badgeBg: "bg-purple-100 border-purple-300 text-purple-900",
    badgeText: "Just-In-Time Assembly Radar",
    stripBg: "bg-[#020c1b] text-white border-b border-white/10",
    textColor: "text-white",
    legacyBottleneck: "Chaotic multi-tier parts requisitions, untracked delivery routes across global suppliers, and high-margin assembly line yield delays.",
    caldimTransformation: "Automated vendor lead-time portals, real-time high-value machinery GPS radar, and synchronized parts inventory matrices.",
    softwareStack: [
      { layer: "Layer 01 • Procurement", title: "Multi-Tier Requisition & PO Route", description: "Automated purchase order governance, lead-time tracking, and vendor SLA verification.", engine: "CALBUY" },
      { layer: "Layer 02 • Global Radar", title: "Transport Fleet & High-Value GPS", description: "Live geofencing and continuous transit SLA monitoring across international routes.", engine: "CALTRACK" },
      { layer: "Layer 03 • Line Sync", title: "Automated Parts Inventory Index", description: "Sub-second barcode synchronization across assembly bays to eliminate stockouts.", engine: "CALRIMS" },
      { layer: "Layer 04 • Quality DB", title: "Assembly Yield & Warranty Portal", description: "Instant defect logging and automated dealer warranty claim verification.", engine: "Asset Mgmt" }
    ],
    metrics: [
      { label: "Parts Shortage Delays", value: "-82%" },
      { label: "Procurement Email Clutter", value: "Zero" },
      { label: "Fleet GPS Geofence Accuracy", value: "99.99%" },
      { label: "Assembly Yield Verification", value: "Live" }
    ]
  },
  {
    id: "finance",
    number: "04",
    title: "Finance & Fintech Systems",
    subtitle: "High-Performance Transaction Ledgers & Audit Governance",
    domainName: "Global Corporate Treasuries & Multi-Entity Ledger Networks",
    icon: TrendingUp,
    themeColor: "#10B981",
    badgeBg: "bg-emerald-500/15 border-emerald-400/40 text-emerald-300",
    badgeText: "Immutable Cryptographic Ledger",
    stripBg: "bg-white text-[var(--navy)] border-b border-slate-200",
    textColor: "text-[var(--navy)]",
    legacyBottleneck: "Manual corporate expense reconciliation, vulnerable spreadsheet payroll calculations, and opaque audit trails during statutory compliance review.",
    caldimTransformation: "Zod-verified schema calculations, automated tax and leave deduction engines, and immutable multi-signature audit trails.",
    softwareStack: [
      { layer: "Layer 01 • Ingestion", title: "Automated OCR & Invoice matching", description: "Three-way cryptographic matching verification of vendor invoices against purchase orders.", engine: "CALBUY" },
      { layer: "Layer 02 • Core Engine", title: "Granular Payroll & Statutory Engine", description: "Sub-second leave ledger & tax calculation verified without manual spreadsheet margin of error.", engine: "CALTIMS" },
      { layer: "Layer 03 • Dispatch", title: "Automated Email Invoicing Pipeline", description: "Secure Nodemailer-backed PDF dispatch and real-time receipt verification logs.", engine: "Core API" },
      { layer: "Layer 04 • Audit Trail", title: "Cryptographic Regulatory Index", description: "Immutable transaction log indexing designed for instant statutory compliance reviews.", engine: "Asset Mgmt" }
    ],
    metrics: [
      { label: "Payroll Calculation Accuracy", value: "100%" },
      { label: "Statutory Audit Prep Time", value: "-90%" },
      { label: "Rogue & Unapproved Spend", value: "$0.00" },
      { label: "Transaction Schema Latency", value: "<15ms" }
    ]
  },
  {
    id: "retail",
    number: "05",
    title: "Retail & E-Commerce Systems",
    subtitle: "Multichannel SKU Synchronization & Neural Stock Forecasting",
    domainName: "High-Volume SKU Catalogs & Multichannel Fulfillment Centers",
    icon: ShoppingBag,
    themeColor: "#EC4899",
    badgeBg: "bg-pink-100 border-pink-300 text-pink-900",
    badgeText: "AI Neural Forecasting Engine",
    stripBg: "bg-[#0A192F] text-white",
    textColor: "text-white",
    legacyBottleneck: "Disconnected online store catalogs versus physical warehouse stock, leading to backorders, dead inventory buildup, and slow order fulfillment.",
    caldimTransformation: "Real-time multichannel inventory synchronization, AI-based demographic sales velocity prediction, and high-speed warehouse picking verification.",
    softwareStack: [
      { layer: "Layer 01 • Multichannel Sync", title: "E-Commerce & POS Order Ingestion", description: "Real-time synchronization across online store checkout and physical retail checkout nodes.", engine: "Core Bridge" },
      { layer: "Layer 02 • Neural AI", title: "Trend Sales Velocity Forecasting", description: "Custom LLM & neural prediction models suggesting exact store-level stock replenishment counts.", engine: "AI BEAUTY" },
      { layer: "Layer 03 • Aisle Routing", title: "High-Speed Barcode Picking Grid", description: "Spatial warehouse picking checklists to cut order fulfillment time by two-thirds.", engine: "Warehouse Mgmt" },
      { layer: "Layer 04 • Vendor Loop", title: "Automated Replenishment Trigger", description: "Direct purchase order creation when high-velocity SKUs hit safety thresholds.", engine: "CALBUY" }
    ],
    metrics: [
      { label: "Stockout & Backorder Rate", value: "-76%" },
      { label: "Warehouse Picking Speed", value: "+3x" },
      { label: "AI Forecast Accuracy", value: "94.8%" },
      { label: "SKU Catalog Scalability", value: "100K+" }
    ]
  },
  {
    id: "logistics",
    number: "06",
    title: "Supply Chain & Logistics",
    subtitle: "High-Volume Warehouse Bays & Real-Time Freight Radar",
    domainName: "International Distribution Hubs & High-Speed Dock Bays",
    icon: Package,
    themeColor: "#F59E0B",
    badgeBg: "bg-amber-500/15 border-amber-400/40 text-amber-300",
    badgeText: "3D Spatial Bin Indexing",
    stripBg: "bg-slate-50 text-[var(--navy)] border-t border-slate-200",
    textColor: "text-[var(--navy)]",
    legacyBottleneck: "Inaccurate warehouse bin allocations, untracked fleet transport delays, and manual shipping barcode check-ins that cause dock congestion.",
    caldimTransformation: "Custom barcode tracker integrations, automated shipping delay triggers, and high-precision spatial warehouse coordinate routing.",
    softwareStack: [
      { layer: "Layer 01 • Dock Capture", title: "Inbound QR & Barcode Ingestion", description: "Instant scanner verification and digital receipt checks upon arrival at loading bays.", engine: "Warehouse Mgmt" },
      { layer: "Layer 02 • 3D Routing", title: "Spatial Bin & Pallet Allocation", description: "Automated 3D warehouse coordinate indexing to maximize storage bay square footage.", engine: "CALRIMS" },
      { layer: "Layer 03 • Fleet Radar", title: "Transport Fleet Dispatch Grid", description: "GPS geofence routing and live driver shift allocation across long-haul transit.", engine: "CALTRACK" },
      { layer: "Layer 04 • API Bridges", title: "Third-Party Shipping Integration", description: "Automated customs waybill generation and real-time operational delay triggers.", engine: "Core Suite" }
    ],
    metrics: [
      { label: "Dock Bay Congestion", value: "-55%" },
      { label: "Mis-Shipment Error Rate", value: "0.02%" },
      { label: "Real-Time Tracking Uptime", value: "99.99%" },
      { label: "Logistics Labor Optimization", value: "+40%" }
    ]
  }
];

export default function IndustriesPage() {
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
                <Network size={14} className="text-blue-500 animate-pulse" />
                <span>Zero Cards • Zero Console Box • Panoramic Highway</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-900 text-[var(--navy)] tracking-tight mb-5">
                Physical-to-Digital Highway
              </h1>
              <p className="text-slate-600 font-medium text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
                We don't use cards or tabbed boxes here. Scroll down our panoramic Architecture Highway to inspect how CALDIM transforms the physical operations of each major industry layer by layer.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* PANORAMIC SCROLLYTELLING ARCHITECTURE HIGHWAY (Section-by-Section Alternating Strips) */}
        <div>
          {industryStrips.map((strip, index) => {
            const Icon = strip.icon;
            const isDark = strip.stripBg.includes("0A192F") || strip.stripBg.includes("020c1b");

            return (
              <section 
                key={strip.id} 
                id={strip.id}
                className={`py-20 md:py-28 relative overflow-hidden transition-colors ${strip.stripBg}`}
              >
                {/* Background Blueprint Engineering Grid on Dark Strips */}
                {isDark && (
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
                )}

                <div className="container-wide relative z-10">
                  
                  {/* Top Strip Identifier Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-12 border-b border-current/15">
                    <div className="flex items-center gap-4">
                      <span 
                        className="text-3xl sm:text-5xl font-900 font-mono tracking-tighter opacity-40 shrink-0"
                        style={{ color: strip.themeColor }}
                      >
                        {strip.number}
                      </span>
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-800 font-mono border uppercase tracking-wider ${strip.badgeBg}`}>
                            {strip.badgeText}
                          </span>
                          <span className="text-xs font-mono opacity-60 uppercase tracking-widest">
                            {strip.domainName}
                          </span>
                        </div>
                        <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-900 tracking-tight leading-none mt-2 ${strip.textColor}`}>
                          {strip.title}
                        </h2>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shrink-0 border border-current/20"
                        style={{ background: strip.themeColor }}
                      >
                        <Icon size={24} className="text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Panoramic 2-Column Physical-to-Digital Transformation Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                    
                    {/* Left Column (6 Cols): Physical Bottleneck vs Engineered Digital Transformation + KPI Dials */}
                    <div className="lg:col-span-6 flex flex-col justify-between h-full gap-8">
                      <div>
                        <p className={`text-base sm:text-lg font-600 leading-relaxed mb-6 ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                          {strip.subtitle}. We bridge the gap between heavy physical assets and high-speed digital automation.
                        </p>

                        {/* Bottleneck vs Solution Cards (Architecture Window) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                          <div className={`p-5 rounded-2xl border transition-all ${isDark ? "bg-red-500/10 border-red-500/30 text-red-200" : "bg-red-50 border-red-200 text-red-950"}`}>
                            <div className="flex items-center gap-2 text-red-500 font-800 text-xs uppercase font-mono tracking-wider mb-2.5">
                              <ShieldAlert size={16} />
                              <span>Physical Bottleneck</span>
                            </div>
                            <p className="text-xs sm:text-sm font-500 leading-relaxed opacity-90">
                              {strip.legacyBottleneck}
                            </p>
                          </div>

                          <div className={`p-5 rounded-2xl border transition-all shadow-lg ${isDark ? "bg-blue-600/15 border-blue-400/40 text-white" : "bg-blue-600 text-white border-blue-700"}`}>
                            <div className="flex items-center gap-2 text-blue-300 font-800 text-xs uppercase font-mono tracking-wider mb-2.5">
                              <CheckCircle size={16} className="text-emerald-400" />
                              <span>Digital Transformation</span>
                            </div>
                            <p className="text-xs sm:text-sm font-600 leading-relaxed">
                              {strip.caldimTransformation}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* 4 Performance Telemetry Dials inside the strip */}
                      <div className={`p-6 rounded-3xl border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200/90 shadow-md"}`}>
                        <span className={`text-[10px] font-mono tracking-widest uppercase block mb-4 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                          Verified {strip.title.split("&")[0].trim()} Performance Gains:
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {strip.metrics.map((kpi, idx) => (
                            <div key={idx} className={`p-3 rounded-2xl border text-center ${isDark ? "bg-black/30 border-white/5" : "bg-slate-50 border-slate-200/80"}`}>
                              <div className="text-xl sm:text-2xl font-900 font-mono tracking-tight" style={{ color: strip.themeColor }}>
                                {kpi.value}
                              </div>
                              <div className={`text-[10px] font-700 uppercase tracking-tight mt-1 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                                {kpi.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column (6 Cols): Step-by-Step 4-Layer Software Stack & Operational Flow Ladder */}
                    <div className="lg:col-span-6">
                      <div className={`p-6 md:p-8 rounded-3xl border shadow-xl relative ${isDark ? "bg-[#020c1b]/90 border-white/15" : "bg-white border-slate-200/90"}`}>
                        <div className="flex items-center justify-between pb-4 mb-6 border-b border-current/10">
                          <span className={`text-xs font-800 uppercase tracking-widest font-mono flex items-center gap-2 ${strip.textColor}`}>
                            <GitBranch size={16} style={{ color: strip.themeColor }} />
                            <span>CALDIM 4-Layer Software Architecture Ladder</span>
                          </span>
                          <span className="text-[10px] font-mono opacity-60 uppercase">
                            End-to-End Flow
                          </span>
                        </div>

                        {/* Vertical Ladder Steps */}
                        <div className="flex flex-col gap-4 relative">
                          {/* Vertical Data Connection Line */}
                          <div className="absolute left-6 top-6 bottom-6 w-0.5 opacity-30 pointer-events-none hidden sm:block" style={{ background: strip.themeColor }} />

                          {strip.softwareStack.map((layer, lIdx) => (
                            <div 
                              key={lIdx}
                              className={`relative z-10 flex items-start gap-4 p-4 rounded-2xl border transition-all ${
                                isDark 
                                  ? "bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/20" 
                                  : "bg-slate-50 hover:bg-blue-50/60 border-slate-200/80 hover:border-blue-300"
                              }`}
                            >
                              <div 
                                className="w-8 h-8 rounded-xl text-white font-mono font-900 text-xs flex items-center justify-center shrink-0 shadow-md"
                                style={{ background: strip.themeColor }}
                              >
                                {lIdx + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                                  <span className="text-[10px] font-mono font-800 uppercase tracking-wider opacity-60 block">
                                    {layer.layer}
                                  </span>
                                  <span 
                                    className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-800 uppercase tracking-wide self-start sm:self-center border shadow-sm"
                                    style={{
                                      background: `${strip.themeColor}15`,
                                      borderColor: `${strip.themeColor}40`,
                                      color: strip.themeColor === "#2563EB" ? "#3b82f6" : strip.themeColor
                                    }}
                                  >
                                    Powered by: {layer.engine}
                                  </span>
                                </div>
                                <h4 className={`text-sm sm:text-base font-900 tracking-tight mb-1 ${strip.textColor}`}>
                                  {layer.title}
                                </h4>
                                <p className={`text-xs font-500 leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                                  {layer.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Strip Action Link */}
                        <div className="mt-6 pt-5 border-t border-current/10 flex items-center justify-between">
                          <span className="text-xs font-mono opacity-60">
                            Custom specs required for {strip.title.split("&")[0].trim()}?
                          </span>
                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-800 tracking-wide transition-all shadow-md group hover:scale-105 active:scale-95 text-white"
                            style={{ background: strip.themeColor }}
                          >
                            <span>Request Sector Consultation</span>
                            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </section>
            );
          })}
        </div>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
