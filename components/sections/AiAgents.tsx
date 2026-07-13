"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Volume2, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { FadeUp } from "../animations/Animations";
import { RecruitmentSimulator } from "./RecruitmentSimulator";
import { ProcurementSimulator } from "./ProcurementSimulator";
import { CalemsSimulator } from "./CalemsSimulator";
import { MiscSimulator } from "./MiscSimulator";
import { ProjectManagementSimulator } from "./ProjectManagementSimulator";
import { AssetManagementSimulator } from "./AssetManagementSimulator";
import { WarehouseManagementSimulator } from "./WarehouseManagementSimulator";
import { CaltrackSimulator } from "./CaltrackSimulator";
import { AiBeautySimulator } from "./AiBeautySimulator";
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
  {
    id: "calems",
    title: "CALEMS Employee",
    subtitle: "EMPLOYEE AGENT",
    action: "Start Management",
    color: "#3B82F6", // Blue
    borderClass: "border-blue-500/80 hover:border-blue-400",
    shadowClass: "drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(59,130,246,0.9)]",
    bgGlow: "bg-blue-500/30",
    dialogue: [
      "User: How many employees have pending onboarding tasks?",
      "CALEMS Agent: Checking employee portals...",
      "CALEMS Agent: 4 new hires need to upload tax documents. Sending automated email reminders.",
      "CALEMS Agent: Reminders sent. Onboarding dashboard updated."
    ]
  },
  {
    id: "project-management",
    title: "Project Management",
    subtitle: "ENGINEERING AGENT",
    action: "Start Planning",
    color: "#0EA5E9", // Sky Blue
    borderClass: "border-sky-500/80 hover:border-sky-400",
    shadowClass: "drop-shadow-[0_0_15px_rgba(14,165,233,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(14,165,233,0.9)]",
    bgGlow: "bg-sky-500/30",
    dialogue: [
      "User: Convert the approved Bid Enquiry #402 into a live project.",
      "PMS Agent: Project activated. PO Phases defined and team resources assigned.",
      "PMS Agent: Phase 1 execution complete (140 hours logged). Vendor COR reconciled.",
      "PMS Agent: Milestone invoice generated. Awaiting client approval for payment settlement."
    ]
  },
  {
    id: "calmisc",
    title: "CAL MISC Estimation",
    subtitle: "ESTIMATION AGENT",
    action: "Start Estimating",
    color: "#F43F5E", // Rose
    borderClass: "border-rose-500/80 hover:border-rose-400",
    shadowClass: "drop-shadow-[0_0_15px_rgba(244,63,94,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(244,63,94,0.9)]",
    bgGlow: "bg-rose-500/30",
    dialogue: [
      "System: PDF structural drawing 'Apex_Stair_Details_A4.pdf' uploaded.",
      "MISC AI: Parsing layout lines. 3 flights of monumental stairs identified.",
      "Cost Engine: Bill of Materials generated. Steel: A36 channel (18.5 tons).",
      "Labor Engine: Calculating fabrication hours. Standard rate set at $85/hr.",
      "Margin Engine: Finish (Hot-Dip Galvanized) and scrap rate (4.5%) applied.",
      "Estimator: Standard margin set at 22%. Freight adjustments applied.",
      "System: Final PDF bid proposal generated with complete material schedules."
    ]
  },
  {
    id: "ai-beauty",
    title: "AI Beauty Consultant",
    subtitle: "SALON AGENT",
    action: "Start Analysis",
    color: "#EC4899", // Pink
    borderClass: "border-pink-500/80 hover:border-pink-400",
    shadowClass: "drop-shadow-[0_0_15px_rgba(236,72,153,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(236,72,153,0.9)]",
    bgGlow: "bg-pink-500/30",
    dialogue: [
      "User: Analyze the latest client biometric scan.",
      "AI Beauty Agent: Processing facial structure and skin tone...",
      "AI Beauty Agent: Match found. Recommending deep-cleansing facial and color treatment.",
      "AI Beauty Agent: Service added to client profile. Next available slot is 3:00 PM today."
    ]
  },
  {
    id: "warehouse",
    title: "Warehouse Management",
    subtitle: "LOGISTICS AGENT",
    action: "Start Inventory",
    color: "#EAB308", // Yellow
    borderClass: "border-yellow-500/80 hover:border-yellow-400",
    shadowClass: "drop-shadow-[0_0_15px_rgba(234,179,8,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(234,179,8,0.9)]",
    bgGlow: "bg-yellow-500/30",
    dialogue: [
      "User: Run an inventory check on Sector 4.",
      "Warehouse Agent: Accessing barcode scanners and RFID logs...",
      "Warehouse Agent: Discrepancy detected: 12 units of Product X missing.",
      "Warehouse Agent: Automated cycle count scheduled for Sector 4."
    ]
  },
  {
    id: "asset",
    title: "Asset Management",
    subtitle: "INFRASTRUCTURE AGENT",
    action: "Start Auditing",
    color: "#64748B", // Slate
    borderClass: "border-slate-500/80 hover:border-slate-400",
    shadowClass: "drop-shadow-[0_0_15px_rgba(100,116,139,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(100,116,139,0.9)]",
    bgGlow: "bg-slate-500/30",
    dialogue: [
      "User: Which assets are due for maintenance this week?",
      "Asset Agent: Checking depreciation logs and maintenance schedules...",
      "Asset Agent: 3 HVAC units require filter replacements. Warranty expires in 30 days.",
      "Asset Agent: Maintenance tickets created and assigned to the facilities team."
    ]
  }
];

export const AiAgentsSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [dialogueIndex, setDialogueIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  const scrollLeftBtn = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRightBtn = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  // Smooth infinite continuous scroll using requestAnimationFrame
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const animate = () => {
      if (!isPaused && !activeId) {
        scrollContainer.scrollLeft += 2; // Increased speed (was 1)
        // Since we render agents twice, jump back to start when we reach halfway
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPaused, activeId]);

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

        {/* Hybrid Marquee Carousel (Auto + Manual) */}
        <div 
          className="relative w-full max-w-7xl mx-auto px-4 md:px-12 group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Navigation Controls */}
          <button 
            onClick={scrollLeftBtn}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white border border-slate-200 rounded-full shadow-lg flex items-center justify-center text-[var(--navy)] hover:bg-slate-50 transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>

          <button 
            onClick={scrollRightBtn}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white border border-slate-200 rounded-full shadow-lg flex items-center justify-center text-[var(--navy)] hover:bg-slate-50 transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>

          {/* Fading Edges */}
          <div className="absolute top-0 bottom-0 left-12 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none hidden md:block" />
          <div className="absolute top-0 bottom-0 right-12 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none hidden md:block" />
          
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto hide-scrollbar scroll-smooth py-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Render list twice to create infinite loop effect */}
            {[...agents, ...agents].map((agent, index) => (
              <div
                key={`${agent.id}-${index}`}
                className="w-[33vw] max-w-[400px] shrink-0 px-4 flex justify-center"
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
              </div>
            ))}
          </div>
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
            ) : activeId === "calems" ? (
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
                  <CalemsSimulator />
                </div>
              </motion.div>
            ) : activeId === "calmisc" ? (
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
                  <MiscSimulator />
                </div>
              </motion.div>
            ) : activeId === "project-management" ? (
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
                  <ProjectManagementSimulator />
                </div>
              </motion.div>
            ) : activeId === "asset" ? (
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
                  <AssetManagementSimulator />
                </div>
              </motion.div>
            ) : activeId === "warehouse" ? (
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
                  <WarehouseManagementSimulator />
                </div>
              </motion.div>
            ) : activeId === "caltrack" ? (
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
                  <CaltrackSimulator />
                </div>
              </motion.div>
            ) : activeId === "ai-beauty" ? (
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
                  <AiBeautySimulator />
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
