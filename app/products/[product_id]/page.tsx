import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp } from "@/components/animations/Animations";
import { 
  Package, ShoppingCart, MapPin, Sparkles, FolderKanban, 
  Zap, Warehouse, Cpu, ArrowLeft, ArrowRight, Mail, LayoutGrid 
} from "lucide-react";

interface ProductInfo {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  icon: any;
  color: string;
  capabilities: string[];
}

const productsData: Record<string, ProductInfo> = {
  calrims: {
    id: "calrims",
    name: "CALRIMS",
    category: "Resource & Inventory",
    tagline: "Precision Resource & Inventory Management System",
    description: "CALRIMS is engineered to track factory materials, production batch inputs, and equipment configurations in real time. We are currently implementing custom schema designs and responsive dashboards tailored for plant floor operators.",
    icon: Package,
    color: "#8B5CF6",
    capabilities: [
      "Real-time Raw Material logging",
      "Production Batch input trackers",
      "Equipment Parameter threshold logs",
      "Low stock alert triggers",
      "Visual status reporting widgets"
    ]
  },
  calbuy: {
    id: "calbuy",
    name: "CALBUY",
    category: "Procurement",
    tagline: "Simplified Corporate Procurement & Vendor Management",
    description: "CALBUY automates purchase orders, tracks vendor lead times, and manages stock requests. Integrated multi-stage approval paths remove communication delays between teams.",
    icon: ShoppingCart,
    color: "#10B981",
    capabilities: [
      "Automated PO Generation",
      "Multi-Gate Manager Approval paths",
      "Vendor Catalog & lead-time trackers",
      "Requisition audit log registry",
      "Historical purchase pricing trends"
    ]
  },
  caltrack: {
    id: "caltrack",
    name: "CALTRACK",
    category: "Asset Tracking",
    tagline: "Live Asset Location & Dispatch Optimization",
    description: "CALTRACK tracks high-value machinery, shipping containers, and vehicle fleets. Real-time location logs combined with scheduled maintenance alarms reduce downtime.",
    icon: MapPin,
    color: "#F59E0B",
    capabilities: [
      "Live GPS Coordinate telemetry",
      "Geofenced Alert triggers",
      "Operational mileage estimators",
      "Automatic Maintenance interval notices",
      "Driver dispatch schedules"
    ]
  },
  "ai-beauty": {
    id: "ai-beauty",
    name: "AI BEAUTY",
    category: "AI Solutions",
    tagline: "Intelligent Recommendation & retail trend analytics",
    description: "AI BEAUTY processes demographic and sales statistics to suggest retail stock counts. Uses machine learning models to identify emerging purchase patterns.",
    icon: Sparkles,
    color: "#EC4899",
    capabilities: [
      "Demographic Sales Analytics dashboard",
      "Predictive Stock demand modeling",
      "Intelligent Catalog recommendations",
      "Customer trend classification",
      "Multi-store performance logs"
    ]
  },
  "project-management": {
    id: "project-management",
    name: "Project Management",
    category: "Productivity",
    tagline: "Structured Enterprise Planning & Collaboration",
    description: "Centralized workspace to track project milestones, allocate developer hours, and monitor task completion. Built specifically for industrial and delivery-focused teams.",
    icon: FolderKanban,
    color: "#6366F1",
    capabilities: [
      "Interactive Project Gantt chart view",
      "Task dependencies & milestones logs",
      "Team Member hourly allocations",
      "Real-time collaboration comments",
      "Sprint velocity estimation dashboards"
    ]
  },
  "cal-ems": {
    id: "cal-ems",
    name: "CAL EMS",
    category: "Energy Management",
    tagline: "Industrial Energy Logging & Consumption Audits",
    description: "CAL EMS tracks electrical consumption, plant peak-load cycles, and carbon emissions dynamically. Generates compliance-ready reports for sustainability audits.",
    icon: Zap,
    color: "#FBBF24",
    capabilities: [
      "Real-time energy meter logs",
      "Peak-load alert notifications",
      "Carbon Footprint calculations",
      "Sustainability compliance reports",
      "Historical usage cost analytics"
    ]
  },
  "warehouse-management": {
    id: "warehouse-management",
    name: "Warehouse Management",
    category: "Logistics",
    tagline: "Storage Space & Barcode Logging Optimizer",
    description: "Warehouse Management automates bin space allocation, inventory receiving log streams, and outbound shipping checklists to prevent delay bottlenecks.",
    icon: Warehouse,
    color: "#14B8A6",
    capabilities: [
      "Barcode scanning log interface",
      "Optimal storage aisle mapping",
      "Picking & Packing flow checklists",
      "Real-time loading bay tracking",
      "Automated stock level corrections"
    ]
  },
  "asset-management": {
    id: "asset-management",
    name: "Asset Management",
    category: "Enterprise Infrastructure",
    tagline: "Equipment Lifecycle Registries & Auditing",
    description: "Track equipment maintenance records, depreciation logs, and hardware licenses. Generates structured audit trails for corporate compliance checks.",
    icon: Cpu,
    color: "#64748B",
    capabilities: [
      "Central Hardware registry logs",
      "Depreciation calculations (SLM/WDV)",
      "Scheduled safety checklists",
      "License & Warranty expiration alerts",
      "Maintenance expense log streams"
    ]
  }
};

export async function generateMetadata({ params }: { params: Promise<{ product_id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = productsData[resolvedParams.product_id];
  if (!product) return {};

  return {
    title: `${product.name} | CALDIM Software Division`,
    description: product.description,
    alternates: { canonical: `/products/${product.id}` }
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ product_id: string }> }) {
  const resolvedParams = await params;
  const product = productsData[resolvedParams.product_id];

  if (!product) {
    notFound();
  }

  const Icon = product.icon;

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Page Hero */}
        <section className="hero-bg py-32 pt-40">
          <div className="container-wide text-center">
            <FadeUp>
              <div 
                className="badge mb-6 mx-auto inline-flex" 
                style={{ 
                  background: `${product.color}25`, 
                  border: `1px solid ${product.color}35`, 
                  color: "#93c5fd" 
                }}
              >
                {product.category}
              </div>
              <h1 className="text-hero text-white mb-6">
                {product.name}
              </h1>
              <p className="text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
                {product.tagline}
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Content Section */}
        <section className="section-padding bg-[var(--background)]">
          <div className="container-wide">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Description & Reusable stub UI */}
              <div className="lg:col-span-7">
                <FadeUp>
                  <div className="flex items-center gap-3.5 mb-6">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${product.color}15` }}
                    >
                      <Icon size={24} style={{ color: product.color }} />
                    </div>
                    <h2 className="text-2xl font-800 text-[var(--navy)]">
                      System Overview
                    </h2>
                  </div>

                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
                    {product.description}
                  </p>

                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 mb-8">
                    <h3 className="text-xs font-700 uppercase tracking-widest text-[var(--text-muted)] mb-3 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300 animate-pulse" />
                      Status: Phase 1 Specifications Complete
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      Our engineering division has finalized the data models, system interfaces, and database schemas. The frontend user portal is scheduled to rollout shortly. Let us know if you require preview access.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Link href="/contact" className="btn text-white btn-sm" style={{ background: product.color }}>
                      Request Preview Access
                      <ArrowRight size={14} />
                    </Link>
                    <Link href="/products" className="btn btn-secondary btn-sm flex items-center gap-1.5">
                      <LayoutGrid size={14} />
                      All Products
                    </Link>
                  </div>
                </FadeUp>
              </div>

              {/* Right Column: Key Planned Features list */}
              <div className="lg:col-span-5">
                <FadeUp delay={0.1}>
                  <div className="card bg-[var(--surface)] border border-[var(--border)] p-8">
                    <h3 className="text-sm font-800 text-[var(--navy)] mb-5 uppercase tracking-wider">
                      Planned Capabilities
                    </h3>
                    <ul className="flex flex-col gap-4">
                      {product.capabilities.map((capability, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs text-[var(--text-secondary)]">
                          <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 shrink-0 mt-0.5 border border-slate-200">
                            {idx + 1}
                          </div>
                          <span className="leading-relaxed">{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeUp>
              </div>

            </div>
          </div>
        </section>

        {/* Reusable Coming Soon Info Section */}
        <section className="section-padding bg-[var(--surface-2)] border-t border-[var(--border)]">
          <div className="container-narrow text-center">
            <FadeUp>
              <div className="w-12 h-12 rounded-full bg-[var(--accent-muted)] flex items-center justify-center mx-auto mb-5 text-[var(--accent)] animate-bounce">
                <Mail size={20} />
              </div>
              <h2 className="text-xl font-800 text-[var(--navy)] mb-3">
                Want to customize {product.name} for your organization?
              </h2>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-sm mx-auto mb-6">
                Our custom software division can prioritize the integration and rollout of this module based on your business requirements.
              </p>
              <Link href="/contact" className="btn btn-primary btn-sm">
                Get in Touch with our Engineers
              </Link>
            </FadeUp>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
