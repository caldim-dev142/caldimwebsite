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
  features?: { title: string; desc: string }[];
  whyChoose?: { title: string; desc: string }[];
}

const productsData: Record<string, ProductInfo> = {
  calrims: {
    id: "calrims",
    name: "CALRIMS",
    category: "Recruitment",
    tagline: "Smarter Recruitment. Better Decisions. Stronger Teams.",
    description: "CAL-RIMS replaces fragmented hiring pipelines with a unified platform that manages every step of the hiring journey in one place. By automating administrative tasks and offering structured evaluation pathways, CAL-RIMS helps talent acquisition teams spend less time on paperwork and more time engaging the right candidates.",
    icon: Package,
    color: "#8B5CF6",
    capabilities: [
      "Automated Candidate Sourcing",
      "Intelligent Resume Screening",
      "Interactive Virtual Interviews",
      "Visual Candidate Pipeline",
      "Visual Offer Management",
      "Digital Onboarding Workflow",
      "Recruitment Analytics & Insights"
    ],
    features: [
      {
        title: "Automated Candidate Sourcing",
        desc: "Syncs with dedicated hiring mailboxes to automatically ingest incoming applications. Resumes land in a single visual pipeline, ready to be reviewed instantly."
      },
      {
        title: "Intelligent Resume Screening",
        desc: "Scans and parses resumes automatically to extract candidate skills, work history, and education, assigning an automated fit-score relative to the job requirements."
      },
      {
        title: "Interactive Virtual Interviews",
        desc: "Conducts adaptive voice and text interviews that prompt candidates with relevant questions and evaluate responses in real-time, providing immediate feedback on communication and core competency."
      },
      {
        title: "Visual Candidate Pipeline",
        desc: "Displays hiring progress in a clean Kanban board. Every stage transition is guided to keep evaluations consistent and aligned with organizational policies."
      },
      {
        title: "Visual Offer Management",
        desc: "Enables HR teams to design offer letters using an interactive editor, generate official documents, and host a secure portal where candidates can review and accept their offers digitally."
      },
      {
        title: "Digital Onboarding Workflow",
        desc: "Guides new hires from the moment they accept their offer. Supports self-service photo capture, automated corporate ID card creation, and electronic signing of joining confirmations."
      }
    ],
    whyChoose: [
      {
        title: "Faster Hiring Cycles",
        desc: "Streamlines applicant screening and interview scheduling to close roles quickly."
      },
      {
        title: "Reduced HR Workload",
        desc: "Eliminates repetitive data entry, scheduling coordination, and manual email follow-ups."
      },
      {
        title: "Consistent Evaluations",
        desc: "Ensures every applicant experiences the same structured interview and screening standards."
      },
      {
        title: "Enhanced Candidate Experience",
        desc: "Keeps candidates engaged with clear tracking, quick responses, and an intuitive onboarding portal."
      }
    ]
  },
  calbuy: {
    id: "calbuy",
    name: "CALBUY",
    category: "Procurement",
    tagline: "Simplified Corporate Procurement & Vendor Management",
    description: "CalBuy is an AI-powered procurement portal that turns technical drawings into purchase orders in minutes. It automates Bill of Materials (BOM) extraction, should-cost estimation, inventory checks, and vendor RFQs in a single, seamless workflow.",
    icon: ShoppingCart,
    color: "#10B981",
    capabilities: [
      "90% Reduction in Drafting Times",
      "Dual-Workflow Flexibility",
      "AI-Powered Should costing",
      "Vendor Quotation Analysis",
      "Negotiation AI Agent",
      "Smart Vendor Matching"
    ],
    features: [
      {
        title: "Instant Drawing Extraction",
        desc: "Upload a PDF drawing and let the AI extract raw materials, steel plates, hardware, and structural parts in seconds."
      },
      {
        title: "Dual Sourcing Modes",
        desc: "Choose Automatic for instant hands-free sourcing, or Manual to review and dispatch bids at your own pace."
      },
      {
        title: "AI Should-Costing",
        desc: "Calculate side-by-side estimates using AI Prepare (market-indexed) and Costsheet Master (ERP catalog) pricing models."
      },
      {
        title: "Smart MRP & RFQ Routing",
        desc: "Auto-check warehouse inventory and dispatch categorized RFQ emails directly to qualified vendors."
      },
      {
        title: "Live Comparison Matrix",
        desc: "Automatically validate incoming vendor quotes and rank bids on a live dashboard."
      }
    ],
    whyChoose: [
      {
        title: "Saves Time",
        desc: "Cuts blueprint-to-sourcing cycle times by up to 90%."
      },
      {
        title: "Eliminates Errors",
        desc: "Finds missing grades or size issues before hitting the warehouse."
      },
      {
        title: "Full Visibility",
        desc: "Complete audit trails showing who verified, approved, and dispatched quotes."
      }
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

                  {/* <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 mb-8">
                    <h3 className="text-xs font-700 uppercase tracking-widest text-[var(--text-muted)] mb-3 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300 animate-pulse" />
                      Status: Phase 1 Specifications Complete
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      Our engineering division has finalized the data models, system interfaces, and database schemas. The frontend user portal is scheduled to rollout shortly. Let us know if you require preview access.
                    </p>
                  </div> */}

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

        {/* Features Section */}
        {product.features && product.features.length > 0 && (
          <section className="py-20 bg-slate-50 border-t border-slate-200">
            <div className="container-wide">
              <FadeUp className="mb-12">
                <h2 className="text-3xl font-900 text-[var(--navy)] mb-2">Key System Features</h2>
                <p className="text-sm text-[var(--text-secondary)] font-550 max-w-xl">
                  Deep-dive into the automated mechanics and capabilities built directly into the core engine.
                </p>
              </FadeUp>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-500/10 text-emerald-600 mb-4 font-bold text-sm">
                      {idx + 1}
                    </div>
                    <h3 className="text-lg font-800 text-[var(--navy)] mb-2">{feat.title}</h3>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Why Choose Section */}
        {product.whyChoose && product.whyChoose.length > 0 && (
          <section className="py-20 bg-white border-t border-slate-200">
            <div className="container-wide">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-4">
                  <FadeUp>
                    <div className="badge mb-4 border-blue-900/10 bg-blue-900/5 text-blue-600 font-bold uppercase tracking-wider text-[10px]">
                      Business Impact
                    </div>
                    <h2 className="text-3xl font-900 text-[var(--navy)] mb-4">Why {product.name}?</h2>
                    <p className="text-sm text-[var(--text-secondary)] font-550 leading-relaxed">
                      CALBUY is engineered to translate engineering complexity into streamlined, secure supply chain value.
                    </p>
                  </FadeUp>
                </div>
                <div className="lg:col-span-8 grid md:grid-cols-3 gap-6">
                  {product.whyChoose.map((why, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-800 text-[var(--navy)] mb-2">{why.title}</h3>
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed">{why.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

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
