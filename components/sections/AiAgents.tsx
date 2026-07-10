"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Volume2, ArrowRight } from "lucide-react";
import { FadeUp } from "../animations/Animations";
import { RecruitmentSimulator } from "./RecruitmentSimulator";
import { ProcurementSimulator } from "./ProcurementSimulator";

const agents = [
  {
    id: "calbuy",
    title: "CALBUY Procurement",
    subtitle: "PROCUREMENT AGENT",
    action: "Start Scoping",
    color: "#8B5CF6", // Purple
    borderClass: "border-purple-500/80 hover:border-purple-400",
    shadowClass: "drop-shadow-[0_0_15px_rgba(139,92,246,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(139,92,246,0.9)]",
    bgGlow: "bg-purple-500/30",
    dialogue: [
      "User: I need to draft a purchase order for 200 steel rollers.",
      "CALBUY Agent: Scanning pre-approved vendor catalogs...",
      "CALBUY Agent: Found matching item at Vendor B for ₹1,200 per unit. Multi-gate approval path assigned to Manager A.",
      "CALBUY Agent: Draft PO generated. Do you want to submit it?"
    ]
  },
  {
    id: "calrims",
    title: "CALRIMS Recruitment",
    subtitle: "RECRUITMENT AGENT",
    action: "Start Screening",
    color: "#6366F1", // Indigo
    borderClass: "border-indigo-500/80 hover:border-indigo-400",
    shadowClass: "drop-shadow-[0_0_15px_rgba(99,102,241,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(99,102,241,0.9)]",
    bgGlow: "bg-indigo-500/30",
    dialogue: [
      "User: Sync the hiring mailbox and screen new applications.",
      "CALRIMS Agent: Scanning careers@caldimengg.in. Ingested 12 new resumes.",
      "CALRIMS Agent: Extracted work histories. Found 3 candidates matching requirements with score > 85%.",
      "CALRIMS Agent: Automated voice interview invitations dispatched. Recruiter dashboard updated."
    ]
  },
  {
    id: "caltims",
    title: "CalTIMS Payroll",
    subtitle: "PAYROLL & HR AGENT",
    action: "Start Calculation",
    color: "#F59E0B", // Orange
    borderClass: "border-orange-500/80 hover:border-orange-400",
    shadowClass: "drop-shadow-[0_0_15px_rgba(245,158,11,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(245,158,11,0.9)]",
    bgGlow: "bg-orange-500/30",
    dialogue: [
      "User: Run compliance checks for Shift B attendance logs.",
      "CalTIMS Agent: Accessing HikCentral biometric gateway streams...",
      "CalTIMS Agent: Checked 48 punch records. Verified 2 days of approved sick leave for Employee ID 403.",
      "CalTIMS Agent: Calculations finalized with zero audit exceptions. Output: ₹48,200 total payout."
    ]
  },
  {
    id: "caltrack",
    title: "CALTRACK Operations",
    subtitle: "ASSET & LOGISTICS AGENT",
    action: "Start Tracking",
    color: "#10B981", // Green
    borderClass: "border-emerald-500/80 hover:border-emerald-400",
    shadowClass: "drop-shadow-[0_0_15px_rgba(16,185,129,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(16,185,129,0.9)]",
    bgGlow: "bg-emerald-500/30",
    dialogue: [
      "User: Where is shipment container C-104 located?",
      "CALTRACK Agent: Fetching active GPS telemetries...",
      "CALTRACK Agent: Target is currently 12km from warehouse entrance. Speed: 45km/h. ETA: 24 minutes.",
      "CALTRACK Agent: Automated gate opening signal queued."
    ]
  },
];

export const AiAgentsSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [dialogueIndex, setDialogueIndex] = useState<number>(0);

  const activeCard = agents.find((c) => c.id === activeId);

  const handleStartAgent = (id: string) => {
    setActiveId(id);
    setDialogueIndex(0);
  };

  const handleNextDialogue = () => {
    if (activeCard && dialogueIndex < activeCard.dialogue.length - 1) {
      setDialogueIndex((prev) => prev + 1);
    } else {
      setActiveId(null);
    }
  };

  return (
    <section className="section-padding relative overflow-hidden bg-white border-y border-slate-200">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(10,25,47,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(10,25,47,0.035)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container-wide relative z-10">
        <FadeUp className="text-center mb-20">
          <div className="badge badge-navy mx-auto mb-4 uppercase tracking-widest text-xs flex items-center gap-2 justify-center">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Conversational Interface
          </div>
          <h2 className="text-section-title text-[var(--navy)] mb-4">
            Experience CALDIM Conversational Agents
          </h2>
          <p className="text-body-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Interactive, business-process agents. Designed in our corporate blue and navy styles to help teams automate operations effortlessly.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
            >
              <div onClick={() => handleStartAgent(agent.id)} className="flex flex-col items-center group cursor-pointer w-full">
              {/* Agent Core Hologram */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 mb-8 flex items-center justify-center">
                {/* Center Glow (Radial burst on white) */}
                <div className={`absolute inset-4 rounded-full ${agent.bgGlow} blur-2xl transition-all duration-500 group-hover:scale-125 opacity-70 group-hover:opacity-100`} />

                {/* Rotating Tech Rings (Crisp and colorful against white) */}
                <div className={`absolute inset-0 rounded-full border-2 border-dashed ${agent.borderClass} ${agent.shadowClass} animate-[spin_20s_linear_infinite] transition-all duration-500`} />
                <div className={`absolute inset-6 rounded-full border-2 border-dotted ${agent.borderClass} ${agent.shadowClass} opacity-80 animate-[spin_15s_linear_infinite_reverse] transition-all duration-500`} />
                <div className={`absolute inset-12 rounded-full border border-solid ${agent.borderClass} opacity-60 animate-[spin_10s_linear_infinite] transition-all duration-500`} />
                
                {/* The Button */}
                <button 
                  className="relative z-10 bg-white border-2 border-slate-200 rounded-full py-3 px-6 flex items-center gap-2.5 text-sm font-800 tracking-wide text-[var(--navy)] group-hover:border-[var(--accent)] group-hover:bg-blue-50/50 transition-all shadow-md group-hover:shadow-xl group-hover:scale-105"
                  style={{ boxShadow: `0 4px 20px ${agent.color}35` }}
                >
                  <Play size={14} style={{ color: agent.color, fill: agent.color }} />
                  {agent.action}
                </button>
              </div>

              {/* Text Content */}
              <div className="text-center">
                <div 
                  className="text-[11px] font-800 uppercase tracking-[0.2em] mb-3 transition-colors duration-300"
                  style={{ color: agent.color }}
                >
                  {agent.subtitle}
                </div>
                <h3 className="text-xl sm:text-2xl font-800 text-[var(--navy)] tracking-tight group-hover:text-[var(--accent)] transition-colors">
                  {agent.title}
                </h3>
              </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dialogue Overlay Modal */}
      <AnimatePresence>
        {activeId && activeCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
          >
            {activeId === "calrims" ? (
              <motion.div
                initial={{ scale: 0.95, y: 16 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 16 }}
                className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setActiveId(null)}
                  className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 transition-colors p-2 z-10 bg-slate-100 hover:bg-slate-200 rounded-full"
                >
                  <X size={20} />
                </button>
                <div className="max-h-[90vh] overflow-y-auto">
                  <RecruitmentSimulator />
                </div>
              </motion.div>
            ) : activeId === "calbuy" ? (
              <motion.div
                initial={{ scale: 0.95, y: 16 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 16 }}
                className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setActiveId(null)}
                  className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 transition-colors p-2 z-10 bg-slate-100 hover:bg-slate-200 rounded-full"
                >
                  <X size={20} />
                </button>
                <div className="max-h-[90vh] overflow-y-auto">
                  <ProcurementSimulator />
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.95, y: 16 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 16 }}
                className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setActiveId(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-[var(--navy)] transition-colors p-1"
                >
                  <X size={20} />
                </button>

              {/* Agent info */}
              <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[var(--accent)] shadow-sm">
                  <Volume2 size={18} />
                </div>
                <div>
                  <h4 className="text-[var(--navy)] font-800 text-base leading-none">{activeCard.title}</h4>
                  <span className="text-[10px] font-700 text-slate-500 uppercase tracking-wider block mt-1">{activeCard.subtitle}</span>
                </div>
              </div>

              {/* Dialogue Transcript */}
              <div className="flex-1 flex flex-col gap-3 min-h-[160px] max-h-[260px] font-mono text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 overflow-y-auto shadow-inner">
                {activeCard.dialogue.slice(0, dialogueIndex + 1).map((line, idx) => {
                  const isUser = line.startsWith("User:");
                  return (
                    <div key={idx} className={`p-2.5 rounded-lg max-w-[85%] leading-relaxed ${
                      isUser 
                        ? "bg-blue-600 text-white self-end shadow-sm font-sans" 
                        : "bg-white text-[var(--navy)] self-start border border-slate-200 shadow-sm font-sans font-600"
                    }`}>
                      {line}
                    </div>
                  );
                })}
              </div>

              {/* Control */}
              <div className="flex justify-between items-center text-xs text-slate-500 font-sans font-600">
                <span>Step {dialogueIndex + 1} of {activeCard.dialogue.length}</span>
                <button
                  onClick={handleNextDialogue}
                  className="btn btn-primary btn-sm text-xs font-800 py-2 px-5 rounded-xl flex items-center gap-1.5 bg-[var(--accent)] hover:bg-blue-600 text-white transition-all shadow-md hover:shadow-lg"
                >
                  {dialogueIndex < activeCard.dialogue.length - 1 ? (
                    <>
                      Next Step
                      <ArrowRight size={12} />
                    </>
                  ) : (
                    "End Session"
                  )}
                </button>
              </div>

            </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
