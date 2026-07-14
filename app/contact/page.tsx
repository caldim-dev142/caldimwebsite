"use client";

import React, { useState, useCallback } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp } from "@/components/animations/Animations";
import { Mail, Phone, MapPin, Send, Loader2, ShieldCheck, CheckCircle2, Lock, Globe, Building2, Clock } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "Enterprise Web Applications",
    budget: "Enterprise Core Architecture ($15k - $50k)",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    const payload = {
      ...formData,
      message: `[BUDGET SCOPE: ${formData.budget}]\n\n${formData.message}`
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          service: "Enterprise Web Applications",
          budget: "Enterprise Core Architecture ($15k - $50k)",
          message: "",
        });
        await fetch("/api/track?action=consultation_booked", { method: "POST" }).catch(() => {});
      } else {
        const errData = await response.json().catch(() => ({}));
        setError(errData.message || "Failed to submit request. Please verify your details and try again.");
      }
    } catch (err) {
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Clean Executive Hero */}
        <section className="hero-bg py-24 md:py-32 pt-40 border-b border-slate-200/80">
          <div className="container-wide text-center">
            <FadeUp>
              <div className="badge badge-navy mb-5 mx-auto inline-flex items-center gap-2 shadow-sm">
                <ShieldCheck size={14} className="text-blue-600" />
                <span>Direct Engineering Consultation</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-900 text-[var(--navy)] tracking-tight mb-5">
                Book a Scoping Call
              </h1>
              <p className="text-slate-900 font-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Connect directly with our lead developers to scope your technical architecture, review requirements, and establish a clear deployment timeline.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Clean, Spacious Contact Content Section */}
        <section className="py-20 bg-slate-50/60">
          <div className="container-wide">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column (5 Cols): Clean, Breathable Contact Info & SLA */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                <FadeUp>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-900 text-[var(--navy)] tracking-tight mb-4">
                      Let&apos;s Build Together
                    </h2>
                    <p className="text-slate-900 font-600 text-base leading-relaxed">
                      Our division brings deep engineering discipline and domain knowledge to custom software development. We skip sales middlemen to give you direct technical clarity from day one.
                    </p>
                  </div>

                  {/* Clean Contact Cards Grid */}
                  <div className="flex flex-col gap-4">
                    
                    {/* Direct Mail Card */}
                    <div className="bg-gradient-to-br from-blue-50/60 to-white border-2 border-blue-500/80 rounded-2xl p-5 shadow-md flex items-start gap-4 transition-all hover:shadow-lg relative overflow-hidden group">

                      <div className="w-11 h-11 rounded-xl bg-blue-500 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm group-hover:scale-105 transition-transform duration-200">
                        <Mail size={20} />
                      </div>
                      <div>
                        <div className="text-[11px] font-900 text-blue-600 uppercase tracking-wider mb-1">Direct Engineering Channel</div>
                        <a href="mailto:support@caldimengg.in" className="text-lg font-900 text-[var(--navy)] hover:text-blue-600 transition-colors tracking-tight">
                          support@caldimengg.in
                        </a>
                        <div className="text-xs text-slate-900 mt-1.5 font-600 leading-relaxed">
                          Bypass all forms and reach our lead architects directly for immediate scoping support.
                        </div>
                      </div>
                    </div>

                    {/* SLA & Security Protocol Card */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm flex items-start gap-4 transition-all hover:border-blue-300">
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                        <Clock size={20} />
                      </div>
                      <div>
                        <div className="text-[11px] font-800 text-slate-500 uppercase tracking-wider mb-1">Scoping Response SLA</div>
                        <div className="text-sm font-800 text-[var(--navy)]">
                          Guaranteed &lt; 4 hr technical response
                        </div>
                        <div className="text-xs text-slate-900 mt-1.5 font-600 leading-relaxed">
                          Automatic mutual NDA protection upon submission.
                        </div>
                      </div>
                    </div>

                    {/* Headquarters Card */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm flex items-start gap-4 transition-all hover:border-blue-300">
                      <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                        <Globe size={20} />
                      </div>
                      <div>
                        <div className="text-[11px] font-800 text-slate-500 uppercase tracking-wider mb-1">Headquarters & Global Sync</div>
                        <div className="text-sm font-800 text-[var(--navy)]">
                          Chennai & Hosur, India
                        </div>
                        <div className="text-xs text-slate-900 mt-1.5 font-600 leading-relaxed">
                          Operating across EMEA, APAC & North America timezones.
                        </div>
                      </div>
                    </div>

                  </div>
                </FadeUp>
              </div>

              {/* Right Column (7 Cols): Ultra-Clean, Pristine Scoping Form */}
              <div className="lg:col-span-7">
                <FadeUp delay={0.1}>
                  <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xl relative">
                    
                    <div className="mb-8 pb-6 border-b border-slate-100">
                      <h3 className="text-xl sm:text-2xl font-900 text-[var(--navy)] tracking-tight">
                        Scoping Consultation Form
                      </h3>
                      <p className="text-xs text-slate-900 font-600 mt-1.5">
                        Fill out the details below and a lead architect will reach out via email.
                      </p>
                    </div>
                    
                    {success && (
                      <div className="p-5 mb-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm font-600 shadow-sm flex items-start gap-3 animate-fade-in">
                        <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-800 text-emerald-950 mb-1">Request Successfully Sent!</div>
                          Thank you! Your requirements have been received. A lead developer will email you shortly to confirm your scoping consultation schedule.
                        </div>
                      </div>
                    )}

                    {error && (
                      <div className="p-4 mb-8 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-600">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                      
                      {/* Name & Email Row */}
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="name" className="text-xs font-800 text-[var(--navy)] uppercase tracking-wider">
                            Your Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="text-sm font-600 text-slate-900 px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all placeholder-slate-400"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="email" className="text-xs font-800 text-[var(--navy)] uppercase tracking-wider">
                            Work Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@company.com"
                            className="text-sm font-600 text-slate-900 px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all placeholder-slate-400"
                          />
                        </div>
                      </div>

                      {/* Company & Phone Row */}
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="company" className="text-xs font-800 text-[var(--navy)] uppercase tracking-wider">
                            Organization / Company
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Acme Corp"
                            className="text-sm font-600 text-slate-900 px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all placeholder-slate-400"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="phone" className="text-xs font-800 text-[var(--navy)] uppercase tracking-wider">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            className="text-sm font-600 text-slate-900 px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all placeholder-slate-400"
                          />
                        </div>
                      </div>

                      {/* Service & Budget Selects Row */}
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="service" className="text-xs font-800 text-[var(--navy)] uppercase tracking-wider">
                            Area of Interest *
                          </label>
                          <select
                            id="service"
                            name="service"
                            required
                            value={formData.service}
                            onChange={handleChange}
                            className="text-sm font-600 text-slate-900 px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all"
                          >
                            <option value="Enterprise Web Applications">Enterprise Web Applications</option>
                            <option value="AI & Machine Learning Engine">AI & Machine Learning Engine</option>
                            <option value="ERP & Custom API Integrations">ERP & Custom API Integrations</option>
                            <option value="Mobile Applications">Mobile Applications Suite</option>
                            <option value="Workflow & Telemetry Automation">Workflow & Telemetry Automation</option>
                            <option value="General Scoping Consultation">General Scoping Consultation</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="budget" className="text-xs font-800 text-[var(--navy)] uppercase tracking-wider">
                            Estimated Project Scope *
                          </label>
                          <select
                            id="budget"
                            name="budget"
                            required
                            value={formData.budget}
                            onChange={handleChange}
                            className="text-sm font-600 text-slate-900 px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all"
                          >
                            <option value="Rapid Deployment / MVP (< $15k)">Rapid Deployment / MVP (&lt; $15k)</option>
                            <option value="Enterprise Core Architecture ($15k - $50k)">Enterprise Core Architecture ($15k - $50k)</option>
                            <option value="Custom Dedicated Team ($50k+)">Custom Dedicated Team ($50k+)</option>
                            <option value="To Be Scoped During Call">To Be Scoped During Call</option>
                          </select>
                        </div>
                      </div>

                      {/* Message / Requirements Outline */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-xs font-800 text-[var(--navy)] uppercase tracking-wider">
                          Message / Technical Outline *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Please briefly outline your system requirements, key data bottlenecks, or desired deployment timeline."
                          className="text-sm font-600 text-slate-900 px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all resize-none leading-relaxed placeholder-slate-400"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full justify-center flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-4 px-6 rounded-xl text-sm font-800 tracking-wide transition-all shadow-md hover:shadow-lg active:scale-[0.99] mt-2"
                        id="contact-submit-btn"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>Sending Scoping Request...</span>
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            <span>Send Consultation Request</span>
                          </>
                        )}
                      </button>

                      <div className="text-center text-[11px] text-slate-500 font-500 pt-1">
                        Protected by CALDIM&apos;s automatic mutual engineering confidentiality protocol.
                      </div>
                    </form>
                  </div>
                </FadeUp>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
