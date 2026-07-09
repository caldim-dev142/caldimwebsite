"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp } from "@/components/animations/Animations";
import { 
  ArrowRight, ShieldCheck, Cpu, ArrowUpRight, CheckCircle2, 
  Settings, Layers, Users, Sparkles, Lock, Play, HelpCircle, 
  ChevronRight, Database, Terminal, ShieldAlert
} from "lucide-react";

interface Scenario {
  id: string;
  name: string;
  industry: string;
  prompt: string;
  steps: string[];
}

const scenarios: Scenario[] = [
  {
    id: "restocking",
    name: "Demand & Restocking Prediction",
    industry: "Retail Operations",
    prompt: "Analyze cosmetic store sales statistics for Q2 and suggest inventory adjustments.",
    steps: [
      "Querying local SQL transaction database for SKU trends...",
      "Analyzing sales velocities for foundations, lipsticks, and serums...",
      "Correlating current stock levels against Q3 seasonal demands...",
      "Identifying high risk of stockout for 'Matte Foundation SKU-204'...",
      "Suggested action: Draft Purchase Order for 500 units to vendor B."
    ]
  },
  {
    id: "recommender",
    name: "Customer Catalog Personalization",
    industry: "Customer Experience",
    prompt: "Generate tailored skincare product suggestions based on customer skin type logs.",
    steps: [
      "Accessing customer skin profile questionnaire registry...",
      "Categorizing demographic data points (Dry skin, sensitive, age 25-35)...",
      "Filtering product active ingredients list for non-irritants...",
      "Ranking matching serums by historical satisfaction scores...",
      "Output: Recommended 3-step routine (Moisturizer, Sunscreen, Vitamin C)."
    ]
  },
  {
    id: "supply-chain",
    name: "Supply Chain Risk Management",
    industry: "Logistics & Manufacturing",
    prompt: "Verify shipment timelines from manufacturing plant to central warehouse.",
    steps: [
      "Retrieving current cargo transit GPS location trackers...",
      "Detecting weather delay warning at port entry corridor...",
      "Recalculating estimated time of arrival (ETA: delayed by 36 hours)...",
      "Alerting logistics coordinators and adjusting inventory safety reserves...",
      "Action logged: Buffer stock allocation increased from 10% to 15%."
    ]
  }
];

export default function AiBeautyPage() {
  const [selectedScenario, setSelectedScenario] = useState<string>("restocking");
  const [runningStep, setRunningStep] = useState<number>(4);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const activeScenario = scenarios.find((s) => s.id === selectedScenario) || scenarios[0];

  const handleScenarioChange = useCallback((id: string) => {
    setSelectedScenario(id);
    setRunningStep(0);
    setIsSimulating(true);
  }, []);

  // Simulates step-by-step reasoning
  React.useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setRunningStep((prev) => {
        if (prev < activeScenario.steps.length - 1) {
          return prev + 1;
        } else {
          setIsSimulating(false);
          clearInterval(interval);
          return prev;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSimulating, activeScenario]);

  return (
    <>
      <Navbar />

      <main id="main-content" className="bg-[#F8FAFC] text-slate-800 min-h-screen selection:bg-blue-500/10 selection:text-blue-700">
        
        {/* Page Header / Hero */}
        <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden border-b border-slate-200 bg-white">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-dot-pattern opacity-[0.03] pointer-events-none" />
          
          <div className="container-wide relative z-10 text-center">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-100 bg-blue-50 text-blue-600 text-xs font-semibold tracking-wide mb-6 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                CALDIM AI Agent Platform
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="text-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto mb-6 leading-tight">
                Deploy AI agents that automate complex retail and beauty workflows
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                From inventory demand predictions to personalized product matchmaking. Build, manage, and scale autonomous AI agents on your own secure infrastructure with zero vendor lock-in.
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

        {/* Observation Simulator ("See Arya/Agent in action") */}
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="container-wide">
            <FadeUp className="text-center mb-12">
              <div className="badge badge-navy mx-auto mb-2">Observability Demo</div>
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">See the agent reason in real time</h2>
              <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">Pick a retail scenario. Watch the agent evaluate parameters and execute steps autonomously.</p>
            </FadeUp>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Selector Column */}
              <div className="lg:col-span-4 flex flex-col gap-2.5">
                {scenarios.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleScenarioChange(s.id)}
                    className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                      selectedScenario === s.id
                        ? "bg-blue-50 border-blue-200 shadow-sm"
                        : "bg-slate-50/50 border-slate-100 hover:border-slate-200"
                    }`}
                  >
                    <span className="text-[10px] font-700 text-blue-600 uppercase tracking-wider block mb-1">{s.industry}</span>
                    <span className="text-slate-950 font-bold text-xs block">{s.name}</span>
                  </button>
                ))}
              </div>

              {/* Right Execution View */}
              <div className="lg:col-span-8">
                <div className="rounded-xl border border-slate-200 bg-slate-950 p-6 font-mono text-[10px] text-slate-400 shadow-sm min-h-[250px] flex flex-col">
                  
                  {/* Console Header */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <span className="flex items-center gap-1.5 text-slate-300 font-sans font-bold">
                      <Terminal size={14} className="text-blue-500" />
                      agent_observability_pipeline
                    </span>
                    {isSimulating ? (
                      <span className="text-blue-400 animate-pulse text-[9px] font-bold">REASONING ACTIVE</span>
                    ) : (
                      <span className="text-emerald-400 text-[9px] font-bold">PROCESS RESOLVED</span>
                    )}
                  </div>

                  {/* Input Statement */}
                  <div className="mb-4 text-xs text-slate-200">
                    <span className="text-slate-500">Query: </span>
                    &ldquo;{activeScenario.prompt}&rdquo;
                  </div>

                  {/* Executed Steps */}
                  <div className="flex-1 flex flex-col gap-2">
                    {activeScenario.steps.slice(0, runningStep + 1).map((step, i) => (
                      <FadeUp key={i} className="flex gap-2">
                        <span className="text-blue-500">[{i + 1}]</span>
                        <span className={i === runningStep && isSimulating ? "text-white font-bold" : "text-slate-300"}>{step}</span>
                      </FadeUp>
                    ))}
                  </div>

                  {/* Trace Control Button */}
                  <div className="border-t border-slate-800 pt-3 mt-4 flex justify-between items-center text-[9px]">
                    <span className="text-slate-500">observability checkpoint logic: active</span>
                    <button
                      disabled={isSimulating}
                      onClick={() => handleScenarioChange(selectedScenario)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-sans font-bold px-3 py-1.5 rounded transition-all flex items-center gap-1"
                    >
                      <Play size={10} fill="currentColor" />
                      Re-run Simulation
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-20 border-b border-slate-200">
          <div className="container-wide">
            
            <FadeUp className="text-center mb-16">
              <div className="badge badge-navy mx-auto mb-2">Agent Benefits</div>
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">From Prototypes to Production</h2>
            </FadeUp>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {[
                { title: "Sovereign by Design", desc: "Data compliance DPDP ready. Deploys inside your local infrastructure with no offshore leakage dependencies.", icon: ShieldCheck },
                { title: "Point-and-Click Audit", desc: "Every model recommendation is traceable. Trace back any database parameter or raw transaction log instantly.", icon: Layers },
                { title: "Deploy in Days", desc: "Focus entirely on operational triggers. Our framework handles execution orchestration and checkpoints.", icon: Cpu },
                { title: "Model Agnostic", desc: "Connect local models or switch API providers without rebuilding core workflow rules.", icon: Settings }
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

        {/* Enterprise Governance Pillars */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              <div>
                <FadeUp>
                  <div className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">Scalable Infrastructure</div>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Built for the demands of production AI</h2>
                  <div className="w-12 h-0.5 bg-blue-600 mb-8" />
                </FadeUp>

                <div className="flex flex-col gap-6">
                  {[
                    { title: "Never Breaks Halfway", desc: "Every step is checkpointed. Failures recover instantly with no lost progress. Multi-stage workflows run with total stability." },
                    { title: "Runs Wherever Data Lives", desc: "VPS hosting, private cloud, or fully air-gapped environments. Same agent registry across local and cloud databases." },
                    { title: "Secure by Default", desc: "Connect your enterprise APIs without exposing them. Scoped permissions guarantee each agent has isolated memory parameters." }
                  ].map((item, idx) => (
                    <FadeUp key={idx} delay={idx * 0.1} className="flex gap-3">
                      <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-slate-900 font-bold text-xs mb-0.5">{item.title}</h4>
                        <p className="text-slate-500 text-[11px] leading-relaxed">{item.desc}</p>
                      </div>
                    </FadeUp>
                  ))}
                </div>
              </div>

              <div>
                <FadeUp delay={0.2}>
                  <div className="card bg-white border border-slate-200 p-8 shadow-sm">
                    <h3 className="text-xs font-800 text-slate-900 mb-5 uppercase tracking-wider">Forward-Deployed Support</h3>
                    <p className="text-slate-500 text-xs leading-relaxed mb-6">
                      Our software developers work directly with your technology team to customize templates, hook up database APIs, and stay until your autonomous agents go live.
                    </p>
                    <ul className="flex flex-col gap-3">
                      {["Joint workflow scoping and pipeline design", "Integration with Hikvision and database endpoints", "Ongoing cost and resource utilization tuning", "SLA-backed priority system updates"].map((s, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-[11px] text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeUp>
              </div>

            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-20 text-center bg-slate-900 text-white">
          <div className="container-narrow">
            <FadeUp>
              <h2 className="text-xl md:text-2xl font-extrabold mb-3">
                Ship in days. Scale to millions of transactions.
              </h2>
              <p className="text-slate-400 text-xs mb-6">
                Connect with our AI engineers to schedule a live product demonstration.
              </p>
              <div className="flex justify-center">
                <Link href="/contact" className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-2.5 text-xs flex items-center gap-1.5">
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
