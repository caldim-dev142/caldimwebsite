"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ArrowRight, Play, X, Volume2, Sparkles } from "lucide-react";
import { FadeUp } from "../animations/Animations";

interface AICard {
  id: string;
  title: string;
  sublabel: string;
  gradient: string;
  buttonText: string;
  dialogue: string[];
}

const aiCards: AICard[] = [
  {
    id: "calbuy",
    title: "CALBUY Procurement",
    sublabel: "Procurement Agent",
    gradient: "from-blue-500/20 via-indigo-500/20 to-purple-500/10",
    buttonText: "Start Scoping",
    dialogue: [
      "User: I need to draft a purchase order for 200 steel rollers.",
      "CALBUY Agent: Scanning pre-approved vendor catalogs...",
      "CALBUY Agent: Found matching item at Vendor B for ₹1,200 per unit. Multi-gate approval path assigned to Manager A.",
      "CALBUY Agent: Draft PO generated. Do you want to submit it?"
    ]
  },
  {
    id: "caltims",
    title: "CalTIMS Payroll",
    sublabel: "Payroll & HR Agent",
    gradient: "from-cyan-500/20 via-blue-500/20 to-indigo-500/10",
    buttonText: "Start Calculation",
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
    sublabel: "Asset & Logistics Agent",
    gradient: "from-blue-600/20 via-cyan-400/20 to-teal-500/10",
    buttonText: "Start Tracking",
    dialogue: [
      "User: Where is shipment container C-104 located?",
      "CALTRACK Agent: Fetching active GPS telemetries...",
      "CALTRACK Agent: Target is currently 12km from warehouse entrance. Speed: 45km/h. ETA: 24 minutes.",
      "CALTRACK Agent: Automated gate opening signal queued."
    ]
  }
];

export const ExperienceAI: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [dialogueIndex, setDialogueIndex] = useState<number>(0);

  const activeCard = aiCards.find((c) => c.id === activeId);

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
    <section className="py-20 bg-white border-y border-slate-200" id="experience-ai">
      <div className="container-wide">
        
        <FadeUp className="text-center mb-16">
          <div className="badge badge-accent mx-auto mb-4">Conversational Interface</div>
          <h2 className="text-section-title text-[var(--navy)] mb-4">
            Experience CALDIM Conversational Agents
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto">
            Interactive, business-process agents. Designed in our corporate blue and navy styles to help teams automate operations.
          </p>
        </FadeUp>

        {/* 3 Samvaad style motif shape cards */}
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {aiCards.map((card) => (
            <FadeUp key={card.id} className="text-center flex flex-col items-center">
              {/* Outer Motif shape with custom rosette SVG */}
              <div className="relative w-64 h-64 flex items-center justify-center hover:scale-105 transition-transform duration-300 group">
                {/* Rosette SVG */}
                <svg
                  viewBox="0 0 200 200"
                  className="absolute inset-0 w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.06)]"
                >
                  <defs>
                    <radialGradient id={`radGrad-${card.id}`} cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor={
                        card.id === "calbuy" ? "#d8b4fe" : card.id === "caltims" ? "#fed7aa" : "#bbf7d0"
                      } stopOpacity="0.85" />
                      <stop offset="60%" stopColor={
                        card.id === "calbuy" ? "#a5b4fc" : card.id === "caltims" ? "#fdba74" : "#86efac"
                      } stopOpacity="0.45" />
                      <stop offset="100%" stopColor={
                        card.id === "calbuy" ? "#c7d2fe" : card.id === "caltims" ? "#ffedd5" : "#f0fdf4"
                      } stopOpacity="0.1" />
                    </radialGradient>
                  </defs>
                  
                  {/* 12-lobed Rosette Path with top, bottom, left, right points */}
                  <path
                    d="M 100,6 
                       C 118,12 122,28 138,18 
                       C 154,28 160,44 175,34 
                       C 184,50 178,66 193,56 
                       C 198,72 188,88 198,98 
                       C 198,102 198,102 198,110
                       C 188,120 198,136 193,152 
                       C 178,142 184,158 175,174 
                       C 160,164 154,180 138,190 
                       C 122,180 118,196 100,202 
                       C 82,196 78,180 62,190 
                       C 46,180 40,164 25,174 
                       C 16,158 22,142 7,152 
                       C 2,136 12,120 2,110 
                       C 2,102 2,102 2,98 
                       C 12,88 2,72 7,56 
                       C 22,66 16,50 25,34 
                       C 40,44 46,28 62,18 
                       C 78,28 82,12 100,6 Z"
                    fill={`url(#radGrad-${card.id})`}
                    className={`stroke-[1.5] transition-colors duration-500 ${
                      card.id === "calbuy"
                        ? "stroke-purple-300/40 group-hover:stroke-purple-400/60"
                        : card.id === "caltims"
                        ? "stroke-orange-300/40 group-hover:stroke-orange-400/60"
                        : "stroke-green-300/40 group-hover:stroke-green-400/60"
                    }`}
                  />
                </svg>

                {/* Center visual glow ring */}
                <div className="absolute inset-10 rounded-full border border-dashed border-white/30 group-hover:rotate-45 transition-transform duration-1000" />
                
                {/* Interactive button in the center */}
                <button
                  onClick={() => handleStartAgent(card.id)}
                  className="z-10 px-5 py-2.5 bg-white/95 text-slate-800 border border-slate-200/80 font-sans font-bold text-xs rounded-full shadow-md hover:bg-white hover:text-black transition-all flex items-center gap-1.5 backdrop-blur-sm"
                >
                  <Play size={10} fill="currentColor" className={
                    card.id === "calbuy" ? "text-purple-600" : card.id === "caltims" ? "text-orange-600" : "text-green-600"
                  } />
                  {card.buttonText}
                </button>
              </div>

              {/* Title & Underlabel */}
              <div className="mt-6">
                <span className={`text-[10px] font-700 uppercase tracking-widest block mb-1 ${
                  card.id === "calbuy" ? "text-purple-600" : card.id === "caltims" ? "text-orange-600" : "text-green-600"
                }`}>
                  {card.sublabel}
                </span>
                <h3 className="font-800 text-[var(--navy)] text-base">
                  {card.title}
                </h3>
              </div>
            </FadeUp>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 16 }}
              className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col"
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveId(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X size={18} />
              </button>

              {/* Agent info */}
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
                  <Volume2 size={16} />
                </div>
                <div>
                  <h4 className="text-slate-900 font-extrabold text-sm leading-none">{activeCard.title}</h4>
                  <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block mt-1">{activeCard.sublabel}</span>
                </div>
              </div>

              {/* Dialogue Transcript */}
              <div className="flex-1 flex flex-col gap-3 min-h-[160px] font-mono text-[11px] text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200/50 mb-6 overflow-y-auto">
                {activeCard.dialogue.slice(0, dialogueIndex + 1).map((line, idx) => {
                  const isUser = line.startsWith("User:");
                  return (
                    <div key={idx} className={`p-2 rounded max-w-[85%] ${
                      isUser 
                        ? "bg-blue-100/50 text-blue-800 self-end border border-blue-200/30" 
                        : "bg-white text-slate-700 self-start border border-slate-200/55"
                    }`}>
                      {line}
                    </div>
                  );
                })}
              </div>

              {/* Control */}
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-sans">
                <span>Step {dialogueIndex + 1} of {activeCard.dialogue.length}</span>
                <button
                  onClick={handleNextDialogue}
                  className="btn btn-primary btn-sm text-xs font-bold py-1.5 px-4 rounded-lg flex items-center gap-1 bg-blue-600 text-white"
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
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ExperienceAI;
