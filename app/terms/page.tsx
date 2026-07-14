"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp } from "@/components/animations/Animations";
import { ShieldCheck } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="hero-bg py-24 md:py-32 pt-40 border-b border-slate-200/80">
          <div className="container-wide text-center">
            <FadeUp>
              <div className="badge badge-navy mb-5 mx-auto inline-flex items-center gap-2 shadow-sm">
                <ShieldCheck size={14} className="text-blue-600" />
                <span>Legal & Compliance</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-900 text-[var(--navy)] tracking-tight mb-5">
                Terms of Service
              </h1>
              <p className="text-slate-900 font-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                General conditions and engineering SLAs for CALDIM software products.
              </p>
            </FadeUp>
          </div>
        </section>

        <section className="py-20 bg-slate-50/60">
          <div className="container-wide max-w-4xl">
            <FadeUp delay={0.1}>
              <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-xl prose prose-slate max-w-none">
                <p className="text-sm font-800 text-slate-500 uppercase tracking-widest mb-8">
                  Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>

                <h3 className="text-xl font-900 text-[var(--navy)] mt-8 mb-4">1. Acceptance of Terms</h3>
                <p className="text-slate-700 font-500 leading-relaxed mb-6">
                  By accessing or utilizing software, engineering modules, or consultation services provided by CALDIM Software Division ("CALDIM"), you agree to be bound by these Terms of Service. If you do not agree with any part of the terms, you may not access the Service.
                </p>

                <h3 className="text-xl font-900 text-[var(--navy)] mt-8 mb-4">2. Engineering & Scoping Services</h3>
                <p className="text-slate-700 font-500 leading-relaxed mb-6">
                  CALDIM provides custom enterprise software development, system integrations, and pre-built operational modules. All technical estimates, architectural blueprints, and deployment timelines discussed during scoping phases are estimates based on provided requirements and are subject to final formalized Master Service Agreements (MSAs).
                </p>

                <h3 className="text-xl font-900 text-[var(--navy)] mt-8 mb-4">3. Intellectual Property</h3>
                <p className="text-slate-700 font-500 leading-relaxed mb-6">
                  Unless otherwise explicitly stated in a custom engineering contract, all software architecture, source code, UI/UX designs, and proprietary modules (including but not limited to CalTIMS, CalRIMS, and CalTrack) remain the exclusive intellectual property of CALDIM. Client data processed through these platforms remains the exclusive property of the client.
                </p>

                <h3 className="text-xl font-900 text-[var(--navy)] mt-8 mb-4">4. Warranties and Limitation of Liability</h3>
                <p className="text-slate-700 font-500 leading-relaxed mb-6">
                  CALDIM engineers software to the highest industry standards. However, services and platforms are provided "as is" and "as available" without any warranty or condition, express, implied, or statutory. In no event shall CALDIM be liable for any lost profits or special, incidental, or consequential damages arising out of or in connection with our site, our services, or these Terms.
                </p>
                
                <h3 className="text-xl font-900 text-[var(--navy)] mt-8 mb-4">5. Governing Law</h3>
                <p className="text-slate-700 font-500 leading-relaxed mb-6">
                  These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>

                <h3 className="text-xl font-900 text-[var(--navy)] mt-8 mb-4">6. Contact Us</h3>
                <p className="text-slate-700 font-500 leading-relaxed mb-6">
                  For legal inquiries or clarifications regarding these Terms of Service, please contact us at: <br/>
                  <a href="mailto:support@caldimengg.in" className="text-blue-600 hover:underline font-700">support@caldimengg.in</a>
                </p>
              </div>
            </FadeUp>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
