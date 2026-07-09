"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp } from "@/components/animations/Animations";
import { 
  ArrowRight, ShieldCheck, Cpu, ArrowUpRight, CheckCircle2, 
  Settings, Layers, Users, FileSpreadsheet, Lock, BadgeIndianRupee, 
  HelpCircle, Clock, Zap, ChevronDown, Check, AlertCircle, Play
} from "lucide-react";

interface Scenario {
  id: string;
  name: string;
  industry: string;
  icon: any;
  resultHeading: string;
  tableCols: string[];
  tableRows: string[][];
  time: string;
  capsules: string[];
  followups: string[];
}

const scenarios: Scenario[] = [
  {
    id: "biometric",
    name: "Shift Allocation & Biometric Sync",
    industry: "ONSITE OPERATIONS",
    icon: Clock,
    resultHeading: "Synchronization complete. 48 punch logs parsed against shift rosters.",
    tableCols: ["Terminal Location", "Punch Logs Synced", "Status"],
    tableRows: [
      ["Warehouse Main Gateway", "24 entries (Shift A)", "Active"],
      ["Assembly Area B Entrance", "24 entries (Shift B)", "Active"]
    ],
    time: "Completed in 1.4s",
    capsules: ["HikCentral V2.4 API Sync", "Auto-reference shift schedules", "Audit log saved"],
    followups: ["Compare raw punch metrics", "Lock shift differential override", "Check gateway settings"]
  },
  {
    id: "salary",
    name: "Multi-tier Salary Formulation",
    industry: "FINANCE & PAYROLL",
    icon: BadgeIndianRupee,
    resultHeading: "Salary ledger compiled. 4 cascading formula nodes resolved.",
    tableCols: ["Formula Node", "Expression Rule", "Calculation Status"],
    tableRows: [
      ["Basic Salary", "CTC * 40%", "Resolved"],
      ["HRA Allowance", "Basic * 40%", "Resolved"],
      ["PF Contribution", "min(Basic, 15000) * 12%", "Capped at ₹1,800"]
    ],
    time: "Completed in 0.8s",
    capsules: ["Topological evaluation resolved", "Indian Tax compliance check", "Ledger locked"],
    followups: ["View dependency chart", "Edit CTC structure rules", "Recalculate ledger"]
  },
  {
    id: "accruals",
    name: "Leave Accruals & Timesheet Override",
    industry: "HR MANAGEMENT",
    icon: FileSpreadsheet,
    resultHeading: "Leave records checked. 2 days auto-locked in weekly timesheet.",
    tableCols: ["Category", "Duration Requested", "System Action"],
    tableRows: [
      ["Sick Leave", "Mon - Tue (2 days)", "Locked (Paid Time Off)"],
      ["Casual Leave", "No active requests", "Editable"]
    ],
    time: "Completed in 2.1s",
    capsules: ["Leave balance verified", "Manager approved", "LOP bypassed"],
    followups: ["Check approval registry", "View remaining leave limits", "Override manual unlock"]
  },
  {
    id: "audit",
    name: "Custom Role & Permission Audit",
    industry: "SECURITY & COMPLIANCE",
    icon: Lock,
    resultHeading: "System audit complete. 2 interface modules locked.",
    tableCols: ["Access Endpoint", "Authorized Role", "Enforcement Check"],
    tableRows: [
      ["Timesheet Edit", "Project Coordinator", "Permitted (Frontend & API)"],
      ["Timesheet Approval", "Project Coordinator", "Blocked (REST 403)"]
    ],
    time: "Completed in 3.4s",
    capsules: ["RBAC mapping evaluated", "Stateless API logs synced", "Immutable audit entries saved"],
    followups: ["Show security rule matrix", "Audit API router middleware", "Change role metadata"]
  }
];

export default function CalTimsPage() {
  const [selectedScenario, setSelectedScenario] = useState<string>("biometric");
  const [activeFaq, setActiveFaq] = useState<boolean>(false);
  const [interactiveLog, setInteractiveLog] = useState<string>("Click a follow-up above to continue");

  const activeScenario = scenarios.find((s) => s.id === selectedScenario) || scenarios[0];

  const handleScenarioChange = useCallback((id: string) => {
    setSelectedScenario(id);
    setInteractiveLog("Click a follow-up above to continue");
  }, []);

  const handleFollowupClick = useCallback((followup: string) => {
    setInteractiveLog(`Executing: "${followup}" ... Checked status: Resolved successfully.`);
  }, []);

  return (
    <>
      <Navbar />

      <main id="main-content" className="bg-[#F8FAFC] text-slate-800 min-h-screen selection:bg-blue-500/10 selection:text-blue-700">
        
        {/* Hero Section */}
        <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden border-b border-slate-200 bg-white">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-dot-pattern opacity-[0.03] pointer-events-none" />
          
          <div className="container-wide relative z-10 text-center">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-100 bg-blue-50 text-blue-600 text-xs font-semibold tracking-wide mb-6 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                CalTIMS Enterprise Engine
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="text-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto mb-6 leading-tight">
                Deploy a payroll and timekeeping engine that automates complex workforce operations
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                From shift compliance to multi-tier salary payouts, with full calculation traceability.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="btn btn-primary btn-lg px-8 py-3.5 text-sm font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10 transition-all duration-200">
                  Get Started
                </Link>
                <Link href="/contact" className="btn btn-secondary btn-lg px-8 py-3.5 text-sm font-semibold rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-all duration-200">
                  Talk to Sales
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Observation Simulator ("See CalTIMS in action" - Arya Layout Grid style) */}
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="container-wide">
            <FadeUp className="text-center mb-12">
              <div className="badge badge-navy mx-auto mb-2">Engine Observability</div>
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">See CalTIMS in Action</h2>
              <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">Pick a scenario. Watch the engine process logs, resolve policies, and compute ledgers step-by-step.</p>
            </FadeUp>

            {/* Main Outer Showcase Window */}
            <FadeUp>
              <div className="border border-slate-200 bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row min-h-[500px]">
                
                {/* Left Sidebar */}
                <div className="w-full md:w-80 border-r border-slate-200 bg-slate-50/50 p-4 flex flex-col gap-1 shrink-0">
                  <div className="flex items-center gap-2 px-3 py-2 mb-3">
                    <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                      C
                    </div>
                    <span className="text-slate-900 text-xs font-bold tracking-tight">CalTIMS Engine</span>
                  </div>

                  {scenarios.map((s) => {
                    const SideIcon = s.icon;
                    const isActive = selectedScenario === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => handleScenarioChange(s.id)}
                        className={`flex items-start gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200 ${
                          isActive
                            ? "bg-white border border-slate-200 shadow-sm"
                            : "hover:bg-slate-100/50"
                        }`}
                      >
                        <div className={`w-7 h-7 rounded flex items-center justify-center shrink-0 ${
                          isActive ? "bg-blue-50 text-blue-600" : "bg-slate-200/50 text-slate-500"
                        }`}>
                          <SideIcon size={14} />
                        </div>
                        <div>
                          <span className="text-slate-900 font-bold text-xs block leading-tight">{s.name}</span>
                          <span className="text-[9px] font-semibold text-slate-400 block mt-0.5 tracking-wider">{s.industry}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Right Content Panel */}
                <div className="flex-1 p-6 md:p-8 flex flex-col bg-white">
                  
                  {/* Panel Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                    <span className="text-slate-900 font-bold text-sm tracking-tight">
                      {activeScenario.name}
                    </span>
                    <span className="text-[9px] font-bold text-blue-600 tracking-widest bg-blue-50 px-2.5 py-1 rounded">
                      {activeScenario.industry}
                    </span>
                  </div>

                  {/* Execution Statement */}
                  <div className="mb-6">
                    <h3 className="text-slate-900 font-extrabold text-base leading-snug mb-2">
                      {activeScenario.resultHeading}
                    </h3>
                  </div>

                  {/* Detail Table */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden mb-6 bg-white shadow-sm flex-1">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-200 text-slate-400 font-bold">
                          {activeScenario.tableCols.map((col) => (
                            <th key={col} className="px-4 py-3 text-[10px] uppercase tracking-wider">{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {activeScenario.tableRows.map((row, rIdx) => (
                          <tr key={rIdx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                            <td className="px-4 py-3.5 font-bold text-slate-900">{row[0]}</td>
                            <td className="px-4 py-3.5 text-slate-500">{row[1]}</td>
                            <td className="px-4 py-3.5">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                row[2].includes("Locked") || row[2].includes("Blocked")
                                  ? "bg-red-50 text-red-600 border border-red-100"
                                  : row[2].includes("Capped")
                                  ? "bg-amber-50 text-amber-600 border border-amber-100"
                                  : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                              }`}>
                                <span className={`w-1 h-1 rounded-full ${
                                  row[2].includes("Locked") || row[2].includes("Blocked")
                                    ? "bg-red-500"
                                    : row[2].includes("Capped")
                                    ? "bg-amber-500"
                                    : "bg-emerald-500"
                                }`} />
                                {row[2]}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Performance Indicators / Badges */}
                  <div className="flex flex-wrap items-center gap-3 mb-8">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-100">
                      <Clock size={12} className="shrink-0" />
                      {activeScenario.time}
                    </span>
                    {activeScenario.capsules.map((cap) => (
                      <span key={cap} className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-semibold border border-slate-200/55">
                        {cap}
                      </span>
                    ))}
                  </div>

                  {/* Interactive Action Recommendation Pills */}
                  <div className="flex flex-wrap gap-2.5 mb-8">
                    {activeScenario.followups.map((followup) => (
                      <button
                        key={followup}
                        onClick={() => handleFollowupClick(followup)}
                        className="px-4 py-2 text-[10px] font-bold text-blue-600 border border-blue-200 bg-white hover:bg-blue-50/50 rounded-full transition-all shadow-sm"
                      >
                        ✦ {followup}
                      </button>
                    ))}
                  </div>

                  {/* Bottom Console Dialog input block */}
                  <div className="border-t border-slate-100 pt-4 flex items-center justify-between bg-slate-50/20 px-4 py-3 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-[10px] font-semibold italic">
                      {interactiveLog}
                    </span>
                    <button className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md">
                      <ArrowUpRight size={14} />
                    </button>
                  </div>

                </div>

              </div>
            </FadeUp>
          </div>
        </section>

        {/* Benefits Grid ("From Clunky Spreadsheets to Running a Payroll Engine") */}
        <section className="py-20 border-b border-slate-200">
          <div className="container-wide">
            
            <FadeUp className="text-center mb-16">
              <div className="badge badge-navy mx-auto mb-2">Operational Shift</div>
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">From spreadsheets to running a payroll engine</h2>
              <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">Manual sheets are flexible. But enterprise payroll is complex. CalTIMS is built for the moment when basic tracking ends and strict financial compliance begins.</p>
            </FadeUp>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {[
                { title: "Localized by Design", desc: "Automatic processing of Provident Fund (PF), Employee State Insurance (ESI), Professional Tax (PT), and TDS under old and new regimes.", icon: BadgeIndianRupee },
                { title: "See everything. Audit anything.", desc: "Know exactly how HRA, PF caps, and tax deductions were resolved for each employee with point-and-click verification.", icon: Layers },
                { title: "Launch in Hours", desc: "No weeks of handoffs. Our guided onboarding sets up departments, configures policies, and seeds templates instantly.", icon: Clock },
                { title: "Ecosystem Integrations", desc: "Native hooks to biometric gates, cloud storage, payment APIs, and corporate Single Sign-On (SSO).", icon: Settings }
              ].map((benefit, i) => (
                <FadeUp key={i} delay={i * 0.05} className="h-full">
                  <div className="p-5 rounded-xl border border-slate-100 bg-white hover:shadow-md transition-all duration-200 h-full flex flex-col">
                    <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20 text-blue-600">
                      <benefit.icon size={14} />
                    </div>
                    <h3 className="text-slate-900 font-bold text-xs mb-1.5">{benefit.title}</h3>
                    <p className="text-slate-500 text-[11px] leading-relaxed flex-1">{benefit.desc}</p>
                  </div>
                </FadeUp>
              ))}

            </div>
          </div>
        </section>

        {/* Core Pillars ("What CalTIMS unlocks for your Enterprise") */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="container-wide">
            
            <FadeUp className="text-center mb-16">
              <div className="badge badge-navy mx-auto mb-2">Platform Capabilities</div>
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">What CalTIMS Unlocks for Your Enterprise</h2>
            </FadeUp>

            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Production Ready */}
              <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col gap-6">
                <div>
                  <h3 className="text-slate-900 font-extrabold text-base mb-1">Production-ready from day one</h3>
                  <p className="text-[11px] text-[var(--text-muted)]">Reliable core infrastructure built for enterprise scale operations.</p>
                </div>
                <div className="flex flex-col gap-4">
                  {[
                    { title: "Enterprise-grade calculation reliability", desc: "CalTIMS checkpoints every calculation step. A database hiccup won't corrupt runs; recovery is instant." },
                    { title: "Total ledger visibility", desc: "Every timesheet log, leave deduction, and compliance contribution is itemized and inspectable in the system ledger." },
                    { title: "Secure by default", desc: "Connect terminals securely. Granular RBAC ensures employees only access their assigned features." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-2.5">
                      <CheckCircle2 size={14} className="text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-slate-900 font-bold text-xs mb-0.5">{item.title}</h4>
                        <p className="text-slate-500 text-[10px] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Built to Scale */}
              <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col gap-6">
                <div>
                  <h3 className="text-slate-900 font-extrabold text-base mb-1">Built to scale</h3>
                  <p className="text-[11px] text-[var(--text-muted)]">Engineered to manage growing teams and complex subsidiary networks.</p>
                </div>
                <div className="flex flex-col gap-4">
                  {[
                    { title: "Tenant isolation", desc: "Deploy across multiple subsidiaries or locations without data contamination at the frontend or database layers." },
                    { title: "Immutable records", desc: "Once a payroll batch is locked and marked as Paid, it becomes immutable. Future changes never alter history." },
                    { title: "Long-run reliability", desc: "Manage historical logs spanning years with zero performance degradation, making audits lookup instant." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-2.5">
                      <CheckCircle2 size={14} className="text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-slate-900 font-bold text-xs mb-0.5">{item.title}</h4>
                        <p className="text-slate-500 text-[10px] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Performance & Compliance Specs */}
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="container-wide">
            <FadeUp className="text-center mb-16">
              <div className="badge badge-navy mx-auto mb-2">System Specs</div>
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">Performance & Compliance Specs</h2>
            </FadeUp>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { label: "Reliability", title: "Calculates accurately, always", desc: "Validation checks lock timesheets upon approval, preventing retrospective alterations that can throw off financial balances." },
                { label: "Auditing", title: "Comprehensive compliance log", desc: "Every timesheet approval, role modification, or salary configuration change creates an immutable entry in the system-wide Audit Log." },
                { label: "Portability", title: "Stateless REST Architecture", desc: "Our modern React SPA and Node.js REST API run smoothly in standard cloud containers, on-premise, or local dev setups." }
              ].map((spec, idx) => (
                <FadeUp key={idx} delay={idx * 0.05} className="flex flex-col gap-2">
                  <span className="text-[10px] font-700 text-blue-600 uppercase tracking-wider">{spec.label}</span>
                  <h4 className="text-slate-900 font-bold text-sm">{spec.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{spec.desc}</p>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Implementation partnership support */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="container-narrow text-center">
            <FadeUp>
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4 border border-blue-500/20 text-blue-600">
                <Users size={18} />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-4">Dedicated Implementation Partnership</h2>
              <p className="text-slate-500 text-xs leading-relaxed max-w-sm mx-auto mb-8">
                Our support team works alongside your HR and Finance leads to configure salary bands, map leaves, and integrate biometric terminals.
              </p>
              <ul className="flex flex-col gap-3 max-w-xs mx-auto text-left mb-8">
                {["Direct onboarding partner", "Joint workflow and policy configuration", "SLA-backed priority support for payroll runs"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-20 text-center bg-slate-900 text-white">
          <div className="container-narrow">
            <FadeUp>
              <h2 className="text-xl md:text-2xl font-extrabold mb-3">
                Onboard in hours. Scale to thousands of employees.
              </h2>
              <p className="text-slate-400 text-xs mb-6">
                Configure your workspace parameters today.
              </p>
              <div className="flex justify-center">
                <Link href="/contact" className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-2.5 text-xs flex items-center gap-1.5" id="talk-to-sales-btn">
                  Talk to Sales
                  <ArrowRight size={12} />
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
