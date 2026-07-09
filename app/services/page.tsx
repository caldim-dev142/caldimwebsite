import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp } from "@/components/animations/Animations";
import { CTASection } from "@/components/sections/CTA";
import { ServicesContent } from "@/components/services/ServicesContent";

export const metadata: Metadata = {
  title: "Services | CALDIM Software Division",
  description: "Explore our range of full-stack digital services, from custom web and mobile development to AI/ML solutions, cloud architecture, and industrial automation.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Page Hero */}
        <section className="hero-bg py-32 pt-40">
          <div className="container-wide text-center">
            <FadeUp>
              <div className="badge mb-6 mx-auto inline-flex bg-blue-50 border border-blue-100 text-blue-600 shadow-sm">
                Our Capabilities
              </div>
              <h1 className="text-4xl md:text-6xl font-900 text-[var(--navy)] tracking-tight mb-6 leading-tight">
                Enterprise-Grade Services
              </h1>
              <p className="text-slate-900 font-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-sm border border-slate-200 inline-block">
                We deliver robust, engineering-driven software solutions designed for high reliability, performance, and long-term scalability.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Detailed High-Tech Engineering Services Section */}
        <ServicesContent />

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
