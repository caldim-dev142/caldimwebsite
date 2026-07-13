"use client";
// Force hot reload for new layout
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Package, ShoppingCart, MapPin, Sparkles, FolderKanban, Zap, Warehouse, Cpu, Box } from "lucide-react";
import { FadeUp } from "../animations/Animations";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  contents: string;
  icon: React.ElementType;
  href: string;
  status: "live" | "coming-soon";
  accentColor: string;
}

const products: Product[] = [
  {
    id: "caltims",
    name: "CALTIMS",
    category: "HR & Payroll",
    description: "Timesheet tracking, leave management, and automated payroll processing for modern teams.",
    contents: "CALTIMS is an AI-powered HR & Payroll solution designed for modern teams. It streamlines timesheet tracking, leave management, and automated payroll processing into a single, intuitive platform. Say goodbye to manual calculations and hello to effortless HR management.",
    icon: Clock,
    href: "/products/caltims",
    status: "live",
    accentColor: "#3b82f6", // Blue
  },
  {
    id: "calrims",
    name: "CALRIMS",
    category: "Recruitment",
    description: "An end-to-end hiring platform that automates the full candidate journey from sourcing to onboarding.",
    contents: "CAL-RIMS is a unified recruitment intelligence platform that automates applicant sourcing, intelligent resume screening, virtual interviews, and digital onboarding workflows.",
    icon: Package,
    href: "/products/calrims",
    status: "coming-soon",
    accentColor: "#8B5CF6", // Purple
  },
  {
    id: "calbuy",
    name: "CALBUY",
    category: "Procurement",
    description: "Intelligent Drawing-to-RFQ Procurement.",
    contents: "CALBUY is an AI-powered Procurement portal that turns engineering drawings into validated, cost-estimated Bill of Material(BOM) and vendor RFQs in minutes.",
    icon: ShoppingCart,
    href: "/products/calbuy",
    status: "coming-soon",
    accentColor: "#10B981", // Emerald
  },
  {
    id: "caltrack",
    name: "CALTRACK",
    category: "Field Service Management",
    description: "End-to-end field service platform — from customer booking and GPS dispatch to automated payroll and labor compliance.",
    contents: "CALTRACK bridges the gap between customer bookings and field technician dispatching. It automates timesheets, GPS clock-in verification, mileage reimbursements, and payroll compliance in one platform — reducing administrative processing time by 90% for mobile workforces.",
    icon: MapPin,
    href: "/products/caltrack",
    status: "coming-soon",
    accentColor: "#F59E0B", // Amber
  },
  {
    id: "ai-beauty",
    name: "AI Beauty Consultant",
    category: "Salon & Spa Management",
    description: "AI-powered growth for salons with real-time biometric skin and face-shape analysis.",
    contents: "AI Beauty Consultant automates salon operations while delivering tailored service recommendations based on live biometric scans. It processes image data in under 2 seconds to instantly boost service conversions and tracks booking analytics in real time.",
    icon: Sparkles,
    href: "/products/ai-beauty",
    status: "coming-soon",
    accentColor: "#EC4899", // Pink
  },
  {
    id: "project-management",
    name: "Project Management",
    category: "Engineering Project Management",
    description: "End-to-end lifecycle management for engineering projects — from bid estimation and milestone tracking to invoicing and vendor payments.",
    contents: "CALDIM PMS replaces 5+ disconnected spreadsheets with one integrated system that manages bids, projects, change orders, invoices, and vendor payments across the full engineering project lifecycle.",
    icon: FolderKanban,
    href: "/products/project-management",
    status: "coming-soon",
    accentColor: "#6366F1", // Indigo
  },
  {
    id: "calems",
    name: "CALEMS",
    category: "HR & Employee Management",
    description: "Full employee lifecycle management — from paperless onboarding and attendance to automated payroll.",
    contents: "CALEMS is a secure, multi-tenant HR platform that automates the full employee lifecycle. From paperless onboarding and real-time attendance tracking to payroll processing and policy management — it eliminates 90% of HR administrative workload through intelligent self-service workflows.",
    icon: Package,
    href: "/products/calems",
    status: "coming-soon",
    accentColor: "#3B82F6", // Blue
  },
  {
    id: "warehouse-management",
    name: "Warehouse Management",
    category: "Warehouse Execution & Logistics",
    description: "Smart Warehouse Execution. Zero Packing Errors.",
    contents: "This product automates engine-to-accessory matching, packing, and dispatch workflows. Built for floor managers and dispatch operators in industrial manufacturing. Eliminates manual tracking errors and ensures strict dispatch discipline.",
    icon: Warehouse,
    href: "/products/warehouse-management",
    status: "coming-soon",
    accentColor: "#14B8A6", // Teal
  },
  {
    id: "asset-management",
    name: "Asset Management",
    category: "Engineering Workflow Automation",
    description: "Streamline asset requests from concept to production.",
    contents: "This platform automates the 7-stage engineering asset lifecycle, from initial request to final production. Built for manufacturing engineering teams and designers. Eliminates approval bottlenecks and secures proprietary CAD files.",
    icon: Cpu,
    href: "/products/asset-management",
    status: "coming-soon",
    accentColor: "#64748B", // Slate
  },
  {
    id: "calmisc",
    name: "CAL MISC",
    category: "Steel Estimation",
    description: "Generate precise stair, railing, and guard-rail bids with real-time cost breakdowns in minutes.",
    contents: "CAL MISC is built specifically for structural steel fabricators and estimators. It slashes bid turnaround times by 90% while eliminating manual pricing errors for stairs and railings.",
    icon: Box,
    href: "/products/calmisc",
    status: "coming-soon",
    accentColor: "#F43F5E", // Rose
  }
];

export const ProductsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = products[activeIndex];

  return (
    <section className="section-padding bg-[#020c1b] relative overflow-hidden border-b border-slate-900" id="products">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-wide relative z-10">
        <FadeUp className="mb-16 md:mb-24">
          <div className="badge badge-accent mb-4 uppercase tracking-widest text-xs border-blue-900/50 bg-blue-900/20 text-blue-300">Enterprise Product Suite</div>
          <h2 id="products-heading" className="text-4xl md:text-5xl font-900 text-white tracking-tight mb-4 max-w-3xl">
            Software Built for Industrial Scale
          </h2>
          <p className="text-slate-200 font-600 text-lg max-w-2xl leading-relaxed">
            A specialized suite of enterprise-grade applications covering HR, procurement, logistics, and resource management. Hover to explore capabilities.
          </p>
        </FadeUp>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start min-h-[600px]">

          {/* Left Column: Interactive List */}
          <div className="lg:col-span-5 flex flex-col gap-2 relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[22px] top-4 bottom-4 w-px bg-slate-800" />

            {products.map((product, i) => {
              const isActive = i === activeIndex;
              const Icon = product.icon;
              return (
                <div
                  key={product.id}
                  className="relative cursor-pointer group py-4 pl-16 pr-6 rounded-2xl transition-all duration-300"
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => setActiveIndex(i)}
                >
                  {/* Active Indicator Dot */}
                  <div className="absolute left-[17px] top-[26px] w-3 h-3 rounded-full transition-all duration-500 z-10"
                    style={{
                      background: isActive ? product.accentColor : '#1e293b',
                      boxShadow: isActive ? `0 0 15px ${product.accentColor}` : 'none',
                      transform: isActive ? 'scale(1)' : 'scale(0.7)'
                    }}
                  />

                  {/* Active Background Highlighting */}
                  {isActive && (
                    <motion.div
                      layoutId="activeProductBg"
                      className="absolute inset-0 bg-white/[0.03] border border-white/[0.08] rounded-2xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="relative z-10 flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <h3 className={`text-xl font-800 transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                        {product.name}
                      </h3>
                      {product.status === "live" && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Live</span>
                      )}
                    </div>
                    <p className={`text-sm font-600 transition-colors duration-300 ${isActive ? 'text-slate-200' : 'text-slate-400'}`}>
                      {product.category}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Canvas Preview */}
          <div className="lg:col-span-7 h-[500px] lg:h-full relative lg:sticky lg:top-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-0 rounded-3xl border border-white/[0.08] bg-[#0a1128] overflow-hidden shadow-2xl flex flex-col"
              >
                {/* Tech grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_20%,#000_20%,transparent_100%)] pointer-events-none" />

                {/* Glowing top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${activeProduct.accentColor}, transparent)` }} />

                <div className="flex-1 p-10 md:p-10 flex flex-col relative z-10 justify-between">
                  <div>
                    {/* Big Icon */}
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 relative" style={{ background: `${activeProduct.accentColor}15`, border: `1px solid ${activeProduct.accentColor}30` }}>
                      <div className="absolute inset-0 blur-xl opacity-50" style={{ background: activeProduct.accentColor }} />
                      <activeProduct.icon size={36} style={{ color: activeProduct.accentColor }} className="relative z-10" />
                    </div>

                    <h3 className="text-3xl font-900 text-white mb-4 tracking-tight">{activeProduct.name}</h3>
                    <p className="text-slate-200 font-600 text-lg leading-relaxed max-w-md">
                      {activeProduct.description}
                    </p>
                  </div>

                  {/* Product Overview Text Block */}
                  <div className="mt-6 flex flex-col gap-3 text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeProduct.accentColor }} />
                      <span className="text-[9px] font-mono tracking-widest uppercase text-slate-500">Overview</span>
                    </div>
                    <p className="text-sm font-550 leading-relaxed text-slate-300">
                      {activeProduct.contents}
                    </p>
                  </div>

                  <div className="mt-12 flex items-center gap-4">
                    <Link href={activeProduct.href} className="btn text-white hover:opacity-90 transition-opacity border-none font-bold" style={{ background: activeProduct.accentColor }}>
                      Explore {activeProduct.name} <ArrowRight size={16} />
                    </Link>
                    {activeProduct.status === "coming-soon" && (
                      <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest">In Development</span>
                    )}
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

export default ProductsSection;
