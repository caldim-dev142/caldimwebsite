"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp } from "@/components/animations/Animations";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
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
                Privacy Policy
              </h1>
              <p className="text-slate-900 font-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                How CALDIM Software Division collects, uses, and protects your enterprise data.
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

                <h3 className="text-xl font-900 text-[var(--navy)] mt-8 mb-4">1. Information We Collect</h3>
                <p className="text-slate-700 font-500 leading-relaxed mb-6">
                  CALDIM Software Division ("CALDIM," "we," "us," or "our") collects information necessary to provide enterprise software solutions, scoping consultations, and digital transformation services. This includes personal identification information (Name, Email Address, Phone Number), corporate information, and technical requirements provided voluntarily through our scoping forms or direct correspondence.
                </p>

                <h3 className="text-xl font-900 text-[var(--navy)] mt-8 mb-4">2. Use of Your Information</h3>
                <p className="text-slate-700 font-500 leading-relaxed mb-6">
                  Information collected is strictly utilized to:
                </p>
                <ul className="list-disc pl-6 text-slate-700 font-500 leading-relaxed mb-6 space-y-2">
                  <li>Facilitate engineering consultations and project scoping.</li>
                  <li>Deliver, maintain, and secure our enterprise software modules (e.g., CalTIMS, CalRIMS).</li>
                  <li>Provide customer support and technical assistance.</li>
                  <li>Ensure compliance with mutual Non-Disclosure Agreements (NDAs).</li>
                </ul>

                <h3 className="text-xl font-900 text-[var(--navy)] mt-8 mb-4">3. Data Security & Architecture</h3>
                <p className="text-slate-700 font-500 leading-relaxed mb-6">
                  As an engineering-first division, we prioritize architectural security. We implement robust cryptographic protocols, automated vulnerability scanning, and isolated tenant environments to protect against unauthorized access, alteration, disclosure, or destruction of your corporate and personal data.
                </p>

                <h3 className="text-xl font-900 text-[var(--navy)] mt-8 mb-4">4. Data Sharing and Third Parties</h3>
                <p className="text-slate-700 font-500 leading-relaxed mb-6">
                  We do not sell, trade, or rent your proprietary business logic or personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification with our trusted infrastructure partners solely for the purposes of hosting and deployment telemetry.
                </p>

                <h3 className="text-xl font-900 text-[var(--navy)] mt-8 mb-4">5. Contact Us</h3>
                <p className="text-slate-700 font-500 leading-relaxed mb-6">
                  If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact our engineering operations desk at: <br/>
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
