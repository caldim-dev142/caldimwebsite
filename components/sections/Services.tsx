"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2, Smartphone, Cloud, Brain, Database, Settings2,
  Shield, Layers, GitMerge, Palette, MessageSquare, BarChart,
  ArrowRight, ChevronRight, Terminal
} from "lucide-react";
import { FadeUp } from "../animations/Animations";

interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  details: string[];
  href: string;
  category: string;
  accent: string;
}

const services: Service[] = [
  {
    id: "web",
    icon: Code2,
    title: "Enterprise Web Applications",
    description: "Scalable, secure web applications built with modern frameworks. From internal dashboards to customer portals.",
    details: ["React & Next.js Ecosystems", "Micro-frontend Architectures", "High-Performance SSR/SSG", "Enterprise SSO Integration"],
    href: "/services#enterprise",
    category: "Development",
    accent: "#3b82f6" // Blue
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile Applications",
    description: "Cross-platform mobile apps for iOS and Android that integrate with your enterprise systems seamlessly.",
    details: ["React Native & Flutter", "Offline-First Architectures", "Biometric Authentication", "Native Hardware Integrations"],
    href: "/services#mobile",
    category: "Development",
    accent: "#8b5cf6" // Purple
  },
  {
    id: "ai",
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Intelligent automation, predictive analytics, and tailored AI models for industrial use cases.",
    details: ["Predictive Maintenance Models", "Computer Vision Quality Check", "Custom LLM Fine-Tuning", "Anomaly Detection Engines"],
    href: "/services#ai",
    category: "AI",
    accent: "#ec4899" // Pink
  },
  {
    id: "erp",
    icon: Settings2,
    title: "ERP Solutions",
    description: "Custom ERP systems unifying procurement, ops, and HR into a single pane of glass.",
    details: ["Custom Module Development", "Legacy System Migration", "Real-Time Inventory Sync", "Automated Financial Reporting"],
    href: "/services#erp",
    category: "Enterprise",
    accent: "#10b981" // Emerald
  },
  {
    id: "automation",
    icon: GitMerge,
    title: "Automation & Workflows",
    description: "End-to-end process automation — from approval workflows to robotic process automation (RPA).",
    details: ["Multi-Stage Approval Pipelines", "Document OCR Processing", "System-to-System Webhooks", "Automated Alerting Protocols"],
    href: "/services#automation",
    category: "Automation",
    accent: "#f59e0b" // Amber
  },
  {
    id: "api",
    icon: Layers,
    title: "API Development",
    description: "RESTful and GraphQL APIs designed for enterprise integrations with comprehensive documentation.",
    details: ["GraphQL Subscriptions", "RESTful Core Microservices", "OAuth 2.0 Security Layers", "High-Volume Rate Limiting"],
    href: "/services#api",
    category: "Development",
    accent: "#06b6d4" // Cyan
  },
  {
    id: "devops",
    icon: BarChart,
    title: "DevOps & CI/CD",
    description: "Containerization, automated pipelines, monitoring, and infrastructure-as-code for reliable deployments.",
    details: ["Docker & Kubernetes Clusters", "Zero-Downtime Deployments", "Automated Security Scanning", "Prometheus & Grafana Monitoring"],
    href: "/services#devops",
    category: "Infrastructure",
    accent: "#ef4444" // Red
  },
  {
    id: "design",
    icon: Palette,
    title: "UI/UX Design",
    description: "Human-centered design systems, user research, wireframing, and production-ready assets.",
    details: ["Interactive Prototypes", "Enterprise Design Systems", "User Workflow Optimization", "Accessibility (a11y) Compliance"],
    href: "/services#design",
    category: "Design",
    accent: "#14b8a6" // Teal
  },
  {
    id: "consulting",
    icon: MessageSquare,
    title: "Consulting",
    description: "Technology assessment, architecture reviews, roadmap planning, and vendor-neutral advisory.",
    details: ["System Architecture Reviews", "Scalability Roadmapping", "Tech Stack Modernization", "Compliance & Audit Prep"],
    href: "/services#consulting",
    category: "Strategy",
    accent: "#6366f1" // Indigo
  },
];

export const ServicesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];

  return (
    <section className="section-padding bg-[#020c1b] relative border-t border-slate-900 overflow-hidden" id="services">
      
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="container-wide relative z-10">
        <FadeUp className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="badge badge-accent mb-4 border-blue-900/50 bg-blue-900/20 text-blue-300 uppercase tracking-widest text-xs">Engineering Ecosystem</div>
            <h2 id="services-heading" className="text-4xl md:text-5xl font-900 text-white tracking-tight">
              Full-Stack Digital Services
            </h2>
          </div>
          <p className="text-lg text-slate-400 max-w-md leading-relaxed">
            From concept to deployment, we deliver end-to-end software solutions that solve real business problems with engineering discipline.
          </p>
        </FadeUp>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Side: Command Center Tabs */}
          <div className="lg:col-span-4 flex flex-col gap-2 relative">
            {/* Persistent glowing track line */}
            <div className="absolute left-[18px] top-4 bottom-4 w-px bg-slate-800/80 rounded-full" />
            
            {services.map((service, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveIndex(i)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`relative flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left w-full group ${
                    isActive ? "bg-[#0a192f] border border-[#112240]" : "hover:bg-white/[0.02] border border-transparent"
                  }`}
                >
                  {/* Glowing Tracker Dot */}
                  <div className="relative z-10 flex-shrink-0 w-2.5 h-2.5 rounded-full transition-all duration-500"
                    style={{ 
                      background: isActive ? service.accent : '#1e293b',
                      boxShadow: isActive ? `0 0 12px ${service.accent}` : 'none',
                      transform: isActive ? 'scale(1.2)' : 'scale(1)'
                    }} 
                  />

                  <div className="relative z-10">
                    <h3 className={`text-base font-800 transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'}`}>
                      {service.title}
                    </h3>
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className="absolute inset-0 rounded-2xl opacity-10 pointer-events-none"
                      style={{ background: service.accent }}
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Side: Massive Display Monitor */}
          <div className="lg:col-span-8 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, x: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="relative rounded-3xl bg-[#0a192f] border border-[#112240] shadow-2xl overflow-hidden min-h-[600px] flex flex-col"
              >
                {/* Monitor Top Bar */}
                <div className="h-10 bg-[#06101f] border-b border-[#112240] flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-slate-700/50" />
                    <div className="w-3 h-3 rounded-full bg-slate-700/50" />
                    <div className="w-3 h-3 rounded-full bg-slate-700/50" />
                  </div>
                  <div className="mx-auto text-[10px] uppercase tracking-widest text-slate-500 font-mono flex items-center gap-2">
                    <Terminal size={12} /> caldim_services / {activeService.id}.exe
                  </div>
                </div>

                {/* Ambient Monitor Glow */}
                <div 
                  className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none opacity-20"
                  style={{ background: activeService.accent }}
                />

                <div className="p-8 md:p-12 flex-1 flex flex-col relative z-10">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <div className="text-[11px] font-800 uppercase tracking-widest mb-3" style={{ color: activeService.accent }}>
                        {activeService.category} Framework
                      </div>
                      <h3 className="text-3xl md:text-4xl font-900 text-white tracking-tight mb-4">
                        {activeService.title}
                      </h3>
                      <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                        {activeService.description}
                      </p>
                    </div>

                    <div 
                      className="hidden sm:flex w-20 h-20 rounded-2xl items-center justify-center border transition-all duration-500"
                      style={{ background: `${activeService.accent}15`, border: `1px solid ${activeService.accent}30`, boxShadow: `0 0 30px ${activeService.accent}20` }}
                    >
                      <activeService.icon size={36} style={{ color: activeService.accent }} />
                    </div>
                  </div>

                  {/* Tech Details Grid */}
                  <div className="mt-8">
                    <h4 className="text-sm font-700 text-slate-300 mb-6 uppercase tracking-wider">Core Capabilities</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {activeService.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-[#020c1b]/50 border border-white/[0.03]">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: activeService.accent }} />
                          <span className="text-sm font-600 text-slate-300">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-12 flex items-center justify-between border-t border-[#112240]">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: activeService.accent }} />
                      </div>
                      <span className="text-xs font-mono text-slate-500">System Ready. Awaiting Input...</span>
                    </div>

                    <Link href={activeService.href} className="btn flex items-center gap-2 text-white font-bold px-6 py-2.5 rounded-lg transition-all" style={{ background: activeService.accent }}>
                      Deploy Module <ArrowRight size={16} />
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

export default ServicesSection;
