import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp } from "@/components/animations/Animations";
import { Mail, LayoutGrid, ArrowRight } from "lucide-react";
import fs from "fs";
import path from "path";
import { getIconComponent } from "@/utils/iconHelper";

interface FeatureItem {
  title: string;
  desc: string;
}

interface ProductInfo {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  iconName: string;
  color: string;
  capabilities: string[];
  features?: FeatureItem[];
  whyChoose?: FeatureItem[];
  workflow?: {
    headline: string;
    description: string;
    phases: {
      name: string;
      stages: {
        number: number;
        name: string;
        action: string;
        details: string;
      }[];
    }[];
  };
}

function getProductData(productId: string): ProductInfo | null {
  try {
    const filePath = path.join(process.cwd(), "data", "products.json");
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf8");
    const list = JSON.parse(raw);
    return list.find((p: any) => p.id === productId) || null;
  } catch (error) {
    console.error("Error reading dynamic product info:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ product_id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = getProductData(resolvedParams.product_id);
  if (!product) return {};

  return {
    title: `${product.name} | CALDIM Software Division`,
    description: product.description,
    alternates: { canonical: `/products/${product.id}` }
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ product_id: string }> }) {
  const resolvedParams = await params;
  const product = getProductData(resolvedParams.product_id);

  if (!product) {
    notFound();
  }

  const Icon = getIconComponent(product.iconName);

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Page Hero */}
        <section className="py-32 pt-40 relative overflow-hidden bg-[#F8FAFC]">
          <div className="absolute inset-0 pointer-events-none opacity-60" style={{ background: `radial-gradient(ellipse 80% 50% at 50% -20%, ${product.color}30, transparent)` }} />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none" />
          <div className="container-wide text-center">
            <FadeUp>
              <div 
                className="badge mb-6 mx-auto inline-flex" 
                style={{ 
                  background: `${product.color}25`, 
                  border: `1px solid ${product.color}35`, 
                  color: product.color, fontWeight: 700 
                }}
              >
                {product.category}
              </div>
              <h1 className="text-hero text-slate-900 tracking-tight mb-6 drop-shadow-sm">
                {product.name}
              </h1>
              <p className="text-slate-600 text-lg md:text-xl font-500 max-w-3xl mx-auto leading-relaxed">
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
                    <h2 className="text-3xl font-900 text-slate-900 tracking-tight">
                      System Overview
                    </h2>
                  </div>

                  <p className="text-slate-600 text-base font-500 leading-relaxed mb-8">
                    {product.description}
                  </p>

                  <div className="flex gap-4">
                    <Link href="/contact" className="btn text-white btn-sm shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 transform hover:-translate-y-0.5" style={{ background: product.color }}>
                      Request Preview Access
                      <ArrowRight size={14} />
                    </Link>
                    <Link href="/products" className="btn btn-secondary btn-sm flex items-center gap-1.5 bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm">
                      <LayoutGrid size={14} />
                      All Products
                    </Link>
                  </div>
                </FadeUp>
              </div>

              {/* Right Column: Key Planned Features list */}
              <div className="lg:col-span-5">
                <FadeUp delay={0.1}>
                  <div className="card bg-white/80 backdrop-blur-xl border border-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem]">
                    <h3 className="text-sm font-800 text-slate-900 mb-6 uppercase tracking-wider">
                      Planned Capabilities
                    </h3>
                    <ul className="flex flex-col gap-4">
                      {product.capabilities.map((capability, idx) => (
                        <li key={idx} className="flex items-start gap-3.5 text-sm text-slate-600 font-500">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 shadow-sm" style={{ backgroundColor: `${product.color}15`, color: product.color }}>
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
          <section className="py-24 bg-slate-50 relative border-t border-slate-200/60">
            <div className="container-wide">
              <FadeUp className="mb-12">
                <h2 className="text-4xl font-900 text-slate-900 tracking-tight mb-3">Key System Features</h2>
                <p className="text-base text-slate-600 font-500 max-w-2xl leading-relaxed">
                  Deep-dive into the automated mechanics and capabilities built directly into the core engine.
                </p>
              </FadeUp>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-400 group">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 font-900 text-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" style={{ background: `${product.color}15`, color: product.color }}>
                      {idx + 1}
                    </div>
                    <h3 className="text-xl font-800 text-slate-900 mb-3 tracking-tight group-hover:text-slate-800 transition-colors">{feat.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-500">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Why Choose Section */}
        {product.whyChoose && product.whyChoose.length > 0 && (
          <section className="py-24 bg-white relative">
            <div className="container-wide">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-4">
                  <FadeUp>
                    <div className="badge mb-6 border-slate-200 bg-slate-50 text-slate-700 font-800 uppercase tracking-widest text-[10px]">
                      Business Impact
                    </div>
                    <h2 className="text-4xl font-900 text-slate-900 tracking-tight mb-6">Why {product.name}?</h2>
                    <p className="text-base text-slate-600 font-500 leading-relaxed">
                      {product.tagline}
                    </p>
                  </FadeUp>
                </div>
                <div className="lg:col-span-8 grid md:grid-cols-3 gap-6">
                  {product.whyChoose.map((why, idx) => (
                    <div key={idx} className="p-8 rounded-[2rem] bg-[#F8FAFC] border border-slate-100 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-400 flex flex-col justify-between group">
                      <div>
                        <h3 className="text-lg font-800 text-slate-900 mb-3 tracking-tight">{why.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed font-500">{why.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Reusable Coming Soon Info Section */}
        <section className="py-24 bg-[#F8FAFC] border-t border-slate-200/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,1)_0%,_transparent_100%)] pointer-events-none" />
          <div className="container-narrow text-center relative z-10">
            <FadeUp>
              <div className="w-16 h-16 rounded-full bg-white shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-slate-100 flex items-center justify-center mx-auto mb-6 text-slate-900 animate-bounce">
                <Mail size={20} />
              </div>
              <h2 className="text-3xl font-900 text-slate-900 tracking-tight mb-4">
                Want to customize {product.name} for your organization?
              </h2>
              <p className="text-base text-slate-600 font-500 leading-relaxed max-w-md mx-auto mb-8">
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
