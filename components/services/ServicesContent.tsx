"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Code2, Smartphone, Brain, Settings2, GitMerge, CheckCircle2, 
  ArrowRight, ShieldCheck, Cpu, Terminal, Sparkles, Clock, 
  Check, ChevronRight, Zap, Users, Layers, Lock 
} from "lucide-react";

interface ServiceData {
  id: string;
  icon: React.ElementType;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  deliverables: string[];
  businessImpact: string;
  badge: string;
}

const servicesList: ServiceData[] = [
  {
    id: "enterprise",
    icon: Code2,
    title: "Enterprise Web Applications",
    tagline: "High-speed, secure web portals engineered for scale.",
    badge: "Core Engineering",
    description: "We architect high-concurrency web platforms with strict type safety and sub-second load times to handle your mission-critical operations.",
    techStack: ["Next.js 16", "TypeScript 5.8", "PostgreSQL", "AWS / Cloud"],
    deliverables: [
      "Custom Executive Dashboards & Real-time Data Grids",
      "Secure Role-Based Portals (Customers, Vendors & Employees)",
      "Sub-100ms High-Throughput API Gateways & Microservices"
    ],
    businessImpact: "Centralizes real-time enterprise data into a single, lightning-fast web platform."
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Industrial & Field Mobile Apps",
    tagline: "Offline-first cross-platform apps for field teams.",
    badge: "Field Operations",
    description: "Native and cross-platform apps designed for rugged field environments, featuring automatic offline synchronization and hardware integration.",
    techStack: ["Flutter 3+", "React Native", "Offline Engine", "Biometrics"],
    deliverables: [
      "Offline-First Architecture with Automatic Cloud Syncing",
      "Custom iOS & Android Deployment for Field & Store Teams",
      "Direct Hardware Integration (Barcode, RFID & Biometrics)"
    ],
    businessImpact: "Empowers field teams with digital tools that work flawlessly even without internet connectivity."
  },
  {
    id: "ai",
    icon: Brain,
    title: "AI & Machine Learning Solutions",
    tagline: "Automated decision engines trained on your data.",
    badge: "Intelligence Engine",
    description: "We build custom AI and machine learning models to predict equipment failures, automate document extraction, and query internal SOPs.",
    techStack: ["PyTorch / PyAI", "Custom LLMs", "OCR Pipelines", "Vector DBs"],
    deliverables: [
      "Predictive Equipment Maintenance & Anomaly Detection Models",
      "Custom Enterprise LLM Assistants Trained on Your Internal SOPs",
      "Automated Invoice & Document Extraction via High-Precision OCR"
    ],
    businessImpact: "Automates up to 65% of manual data entry tasks and prevents costly operational downtime."
  },
  {
    id: "erp",
    icon: Settings2,
    title: "ERP Customization & System Bridges",
    tagline: "Unify your disconnected legacy software systems.",
    badge: "System Integration",
    description: "We engineer custom API bridges and tailored ERP modules to synchronize procurement, inventory, HR, and finance into one unified workflow.",
    techStack: ["Custom API Bridges", "Legacy SQL Sync", "SAP/Oracle Connect", "Kafka"],
    deliverables: [
      "Bespoke ERP Modules Tailored Exactly to Your Business Workflow",
      "Zero-Data-Loss Legacy Database Migration & Bi-directional Sync",
      "Automated Financial & Inventory Reconciliation Pipelines"
    ],
    businessImpact: "Saves hundreds of hours monthly by eliminating duplicate manual data entry across systems."
  },
  {
    id: "automation",
    icon: GitMerge,
    title: "Workflow & Process Automation",
    tagline: "Turn manual spreadsheets into automated pipelines.",
    badge: "Process Efficiency",
    description: "We replace slow email chains and spreadsheet tracking with automated workflows that manage approvals, trigger alerts, and auto-generate reports.",
    techStack: ["Automated Gateways", "Dynamic PDF Engine", "Slack/Teams Webhooks"],
    deliverables: [
      "Multi-Tier Sequential & Parallel Automated Approval Gateways",
      "Instant Operational Alerts via Email, SMS, Slack, and MS Teams",
      "Real-time Automated PDF & CSV Compliance Report Generation"
    ],
    businessImpact: "Shortens project approval cycles from days to minutes with zero missing paperwork."
  }
];

const processSteps = [
  {
    number: "01",
    title: "Discovery & Architectural Blueprint",
    time: "Weeks 1–2",
    description: "We analyze your technical bottlenecks, audit existing databases, map out exact security protocols, and deliver a comprehensive software architecture blueprint before writing a single line of code."
  },
  {
    number: "02",
    title: "Agile Sprint Engineering",
    time: "Weeks 3–8+",
    description: "Our dedicated engineering team builds your software in fast 2-week sprints. You get live staging environment access, weekly demo walk-throughs, and complete visibility over clean, type-safe codebase progress."
  },
  {
    number: "03",
    title: "Rigorous Security & Stress Testing",
    time: "Pre-Launch",
    description: "We run penetration tests, simulate high-concurrency user loads, verify zero-data-leakage database rules, and ensure your application meets enterprise compliance (ISO/OWASP baselines)."
  },
  {
    number: "04",
    title: "Zero-Downtime Launch & SLA Support",
    time: "Ongoing",
    description: "We deploy your software to high-availability cloud infrastructure (`AWS/Azure/Docker`) with automated backups, 24/7 telemetry monitoring, and dedicated DevOps maintenance."
  }
];

export const ServicesContent: React.FC = () => {
  return (
    <div className="w-full">
      {/* 1. Services Grid with Precision High-Tech Cards */}
      <section className="py-20 bg-slate-50/70 border-b border-slate-200/60">
        <div className="container-wide">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-900 text-[var(--navy)] tracking-tight mb-4">
              Our Core Engineering Disciplines
            </h2>
            <p className="text-slate-900 font-600 text-base md:text-lg">
              Every service includes full source code ownership, strict type safety, enterprise-grade security, and a dedicated team of senior software engineers.
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {servicesList.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-white rounded-3xl border border-slate-300 shadow-xl hover:shadow-2xl hover:border-blue-500 transition-all duration-500 overflow-hidden group"
                >
                  {/* Top Bar with Badge & Tech Stack */}
                  <div className="bg-[var(--navy)] px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 text-white border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-700 text-xs uppercase tracking-wider border border-blue-400/30">
                        {service.badge}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {service.techStack.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-2.5 py-0.5 rounded-md bg-white/10 text-white font-600 text-[11px] font-mono tracking-tight"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Main Clean Executive Layout (2 Columns: Left = Overview, Right = 3 Deliverables + CTA) */}
                  <div className="p-7 md:p-9 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Left Pane: Title, Tagline, & Short 2-line Overview (6 cols) */}
                    <div className="lg:col-span-6 flex flex-col justify-between h-full pr-0 lg:pr-6 border-b lg:border-b-0 lg:border-r border-slate-200/80 pb-6 lg:pb-0">
                      <div>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300 shadow-sm">
                            <Icon size={24} className="text-blue-600 group-hover:text-white transition-colors duration-300" />
                          </div>
                          <h3 className="text-2xl md:text-3xl font-900 text-[var(--navy)] tracking-tight">
                            {service.title}
                          </h3>
                        </div>

                        <p className="font-800 text-blue-600 text-sm md:text-base mb-3 leading-snug">
                          {service.tagline}
                        </p>
                        <p className="text-slate-900 font-600 text-sm md:text-base leading-relaxed mb-4">
                          {service.description}
                        </p>
                      </div>

                      {/* Clean Impact Line */}
                      <div className="flex items-center gap-2.5 text-slate-900 font-700 text-xs md:text-sm bg-blue-50/70 border border-blue-100 px-4 py-2.5 rounded-xl">
                        <Sparkles size={16} className="text-blue-600 shrink-0" />
                        <span>{service.businessImpact}</span>
                      </div>
                    </div>

                    {/* Right Pane: Exactly 3 Deliverable Bullets & Direct Action Button (6 cols) */}
                    <div className="lg:col-span-6 flex flex-col justify-between h-full pl-0 lg:pl-2">
                      <div>
                        <h4 className="font-800 text-xs uppercase tracking-widest text-slate-500 mb-3.5 flex items-center gap-2">
                          <Terminal size={14} className="text-blue-600" />
                          Core Engineering Deliverables:
                        </h4>

                        <div className="flex flex-col gap-2.5 mb-6">
                          {service.deliverables.map((item, idx) => (
                            <div 
                              key={idx} 
                              className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-blue-300 hover:shadow-sm transition-all duration-200"
                            >
                              <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                              <span className="text-xs md:text-sm font-700 text-slate-900 leading-snug">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sleek Action Button Row */}
                      <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200/70">
                        <span className="text-xs font-700 text-slate-600 hidden sm:inline">
                          Direct consultation with senior architects.
                        </span>
                        <Link
                          href={`/contact?service=${service.id}`}
                          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[var(--navy)] hover:bg-blue-600 text-white font-700 text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 shrink-0 group/btn"
                        >
                          <span>Request Technical Roadmap</span>
                          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>

                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 2. The 4-Stage Engineering Blueprint Section */}
      <section className="py-24 bg-[var(--navy)] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="container-wide relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-700 text-xs uppercase tracking-widest mb-4">
              <Layers size={14} /> Our Proven Process
            </div>
            <h2 className="text-3xl md:text-5xl font-900 text-white tracking-tight mb-6">
              How We Take You From Idea to Enterprise Production
            </h2>
            <p className="text-slate-300 font-medium text-base md:text-lg leading-relaxed">
              When you hire CALDIM, you don&apos;t get junior developers guessing at requirements. You get a systematic, milestone-driven engineering methodology designed for zero downtime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <div 
                key={step.number} 
                className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-blue-400/50 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between group/step"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono font-900 text-4xl text-blue-400 group-hover/step:scale-110 transition-transform">
                      {step.number}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 font-600 text-xs">
                      {step.time}
                    </span>
                  </div>
                  <h3 className="font-800 text-xl text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-300 font-medium text-sm leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-700 text-blue-300">
                  <Check size={14} className="text-blue-400" /> Phase {idx + 1} Deliverable Verified
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The Enterprise Guarantee Bar */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex items-start gap-4 p-7 rounded-3xl bg-white border border-slate-300 shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Lock size={24} />
              </div>
              <div>
                <h4 className="font-900 text-[var(--navy)] text-base mb-1.5">100% IP & Code Ownership</h4>
                <p className="text-slate-900 font-600 text-xs md:text-sm leading-relaxed">
                  You own every line of source code, architectural blueprint, and database schema we write from Day 1. Zero vendor lock-in.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-7 rounded-3xl bg-white border border-slate-300 shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-900 text-[var(--navy)] text-base mb-1.5">Bank-Grade Security & ISO Alignment</h4>
                <p className="text-slate-900 font-600 text-xs md:text-sm leading-relaxed">
                  Every system is built strictly against OWASP Top 10 security standards, with encrypted local/cloud databases and audit trails.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-7 rounded-3xl bg-white border border-slate-300 shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Cpu size={24} />
              </div>
              <div>
                <h4 className="font-900 text-[var(--navy)] text-base mb-1.5">Senior Architects Only</h4>
                <p className="text-slate-900 font-600 text-xs md:text-sm leading-relaxed">
                  We don&apos;t outsource to junior contractors. Your project is engineered by senior full-stack developers and industrial automation specialists.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
