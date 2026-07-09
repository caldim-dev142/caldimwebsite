"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Target, Shield, TrendingUp, Users, Lightbulb, Cog, 
  Sparkles, CheckCircle, ArrowUpRight, Cpu, Layers, Activity, ArrowRight, Check
} from "lucide-react";

interface CoreValueNode {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: React.ElementType;
  position: { top: string; left: string }; // For desktop radial positioning
  badge: string;
  metric: string;
  enforcement: string[];
}

const coreValuesData: CoreValueNode[] = [
  {
    id: "precision",
    title: "Precision",
    shortDesc: "Engineering-grade accuracy in every deliverable.",
    fullDesc: "Our industrial heritage taught us that a fraction of a millimeter can ruin an entire physical assembly. In our software division, we apply this exact same rigor: strict TypeScript typing, sub-millisecond database indexing, and verified architectural blueprints before writing code.",
    icon: Target,
    position: { top: "12%", left: "50%" }, // Top center with massive headroom
    badge: "Architectural Rigor",
    metric: "100% Type-Safe & Verified Codebases",
    enforcement: [
      "Zero unverified runtime assumptions or any types",
      "Exact data modeling & schema validation (Zod / SQL)",
      "Automated unit & edge-case regression testing"
    ]
  },
  {
    id: "reliability",
    title: "Reliability",
    shortDesc: "Systems designed for 24/7 uptime and resilience.",
    fullDesc: "Industrial manufacturing plants and field fleets cannot afford server crashes during peak operations. We engineer resilient distributed architectures, failover mechanisms, and automated cloud recovery pipelines so your software runs continuously without interruption.",
    icon: Shield,
    position: { top: "30%", left: "84%" }, // Far right top
    badge: "Continuous Uptime",
    metric: "99.99% High-Availability Target",
    enforcement: [
      "Automated offsite database snapshots & instant failover",
      "Load-balanced Docker container orchestration",
      "Rigorous penetration testing & OWASP compliance"
    ]
  },
  {
    id: "excellence",
    title: "Technical Excellence",
    shortDesc: "Clean architecture, maintainable code, and best practices.",
    fullDesc: "Spaghetti code works until you try to scale. We enforce clean architecture patterns, modular separation of concerns, and clear documentation. Your software is built to remain fast, secure, and easy to extend 10+ years down the road.",
    icon: Cog,
    position: { top: "70%", left: "84%" }, // Far right bottom
    badge: "Long-Term Value",
    metric: "Zero Technical Debt & Spaghetti Code",
    enforcement: [
      "Strict code reviews by senior software architects",
      "Modular micro-frontend & backend domain boundaries",
      "Complete source code ownership & clear API specs"
    ]
  },
  {
    id: "innovation",
    title: "Innovation",
    shortDesc: "Applying modern tech thoughtfully to solve real problems.",
    fullDesc: "We don't chase trendy buzzwords—we deploy pragmatic cutting-edge technology. Whether integrating custom AI predictive maintenance models or real-time IoT telemetry, we innovate only where it directly improves your operational metrics and bottom line.",
    icon: Lightbulb,
    position: { top: "88%", left: "50%" }, // Bottom center with generous padding
    badge: "Pragmatic R&D",
    metric: "Automated AI & Real-Time Telemetry",
    enforcement: [
      "Custom LLM fine-tuning trained on your internal SOPs",
      "High-throughput real-time WebSocket communication",
      "Continuous R&D into industrial hardware/software bridges"
    ]
  },
  {
    id: "partnership",
    title: "Partnership",
    shortDesc: "We work as an extension of your team, not just a vendor.",
    fullDesc: "Typical agencies build what you ask for and disappear when bugs arise. We operate as your dedicated engineering arm. We challenge flawed assumptions, suggest cost-saving architectural alternatives, and stand by your system post-deployment.",
    icon: Users,
    position: { top: "70%", left: "16%" }, // Far left bottom
    badge: "Shared Success",
    metric: "Dedicated Senior Architects Assigned",
    enforcement: [
      "Direct communication channels (Slack/Teams) with engineers",
      "Transparent weekly sprint demos & codebase access",
      "No outsourcing—your project stays with senior staff"
    ]
  },
  {
    id: "improvement",
    title: "Continuous Improvement",
    shortDesc: "We iterate, learn, and improve at every single milestone.",
    fullDesc: "Operational excellence is not a one-time setup; it is a continuous loop of telemetry monitoring, performance benchmarking, and iterative optimization. Every project cycle makes our tools faster, smarter, and more efficient.",
    icon: TrendingUp,
    position: { top: "30%", left: "16%" }, // Far left top
    badge: "Iterative Evolution",
    metric: "Continuous CI/CD Pipeline Telemetry",
    enforcement: [
      "Real-time application performance monitoring (APM)",
      "Proactive automated dependency & security patching",
      "Regular post-deployment performance optimization sweeps"
    ]
  }
];

export const CoreValuesNodeMap: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>("precision");
  const [visitedNodes, setVisitedNodes] = useState<Set<string>>(new Set(["precision"]));

  const handleNodeSelect = (nodeId: string) => {
    setActiveNodeId(nodeId);
    setVisitedNodes((prev) => new Set(prev).add(nodeId));
  };

  const activeNode = coreValuesData.find((n) => n.id === activeNodeId) || coreValuesData[0];
  const ActiveIcon = activeNode.icon;

  // Find the exact next unvisited node in sequence for the guidance arrow
  const nextGuideNode = coreValuesData.find((n) => !visitedNodes.has(n.id));
  const allCompleted = visitedNodes.size === coreValuesData.length;

  return (
    <div className="w-full py-16">
      
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="badge badge-navy font-600 mx-auto mb-3 flex items-center gap-2">
          <Activity size={14} className="text-blue-500 animate-pulse" />
          Interactive Core Ecosystem
        </div>
        <h2 className="text-3xl md:text-5xl font-900 text-[var(--navy)] tracking-tight mb-4">
          What We Stand For
        </h2>
        <p className="text-slate-600 font-medium text-base md:text-lg">
          Explore our radial engineering ethos. Click any node around our central hub to inspect exactly how our industrial roots drive our software excellence.
        </p>
      </div>

      {/* Main Integrated Eye-Level Dashboard Grid (Side-by-Side = Zero Scrolling Down!) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch max-w-6xl mx-auto">
        
        {/* Left Side: Compact, Ultra-Breathable Hub & Spoke Radial Node Map (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-xl relative overflow-hidden min-h-[480px] md:min-h-[540px] flex items-center justify-center">
          
          {/* Subtle Blueprint Grid & Radial Glow Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent opacity-60 pointer-events-none" />

          {/* Central Hub Node (Compact 112px = 48px more breathing headroom!) */}
          <div className="relative z-20 flex flex-col items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-full bg-[var(--navy)] text-white shadow-2xl border-4 border-blue-400/30 text-center p-3 animate-pulse">
            <span className="text-[9px] md:text-[10px] font-700 text-blue-300 uppercase tracking-widest font-mono mb-1">
              Core Ethos
            </span>
            <span className="text-xs md:text-sm font-900 leading-tight tracking-tight">
              CALDIM<br />DAS
            </span>
            <span className="text-[8px] text-white/60 mt-1 font-mono">
              ENGINEERING
            </span>
          </div>

          {/* Radial Dashed Connecting Lines Spanning Across Spacious Coordinates */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block z-10" xmlns="http://www.w3.org/2000/svg">
            <line x1="50%" y1="50%" x2="50%" y2="14%" stroke={activeNodeId === "precision" ? "#3b82f6" : "#cbd5e1"} strokeWidth={activeNodeId === "precision" ? "3" : "1.5"} strokeDasharray="6 6" />
            <line x1="50%" y1="50%" x2="84%" y2="30%" stroke={activeNodeId === "reliability" ? "#3b82f6" : "#cbd5e1"} strokeWidth={activeNodeId === "reliability" ? "3" : "1.5"} strokeDasharray="6 6" />
            <line x1="50%" y1="50%" x2="84%" y2="70%" stroke={activeNodeId === "excellence" ? "#3b82f6" : "#cbd5e1"} strokeWidth={activeNodeId === "excellence" ? "3" : "1.5"} strokeDasharray="6 6" />
            <line x1="50%" y1="50%" x2="50%" y2="86%" stroke={activeNodeId === "innovation" ? "#3b82f6" : "#cbd5e1"} strokeWidth={activeNodeId === "innovation" ? "3" : "1.5"} strokeDasharray="6 6" />
            <line x1="50%" y1="50%" x2="16%" y2="70%" stroke={activeNodeId === "partnership" ? "#3b82f6" : "#cbd5e1"} strokeWidth={activeNodeId === "partnership" ? "3" : "1.5"} strokeDasharray="6 6" />
            <line x1="50%" y1="50%" x2="16%" y2="30%" stroke={activeNodeId === "improvement" ? "#3b82f6" : "#cbd5e1"} strokeWidth={activeNodeId === "improvement" ? "3" : "1.5"} strokeDasharray="6 6" />
          </svg>

          {/* The 6 Orbiting Spoke Pills (Sleek & Compact to prevent ANY congestion) */}
          <div className="absolute inset-0 hidden md:block pointer-events-none z-30">
            {coreValuesData.map((node) => {
              const NodeIcon = node.icon;
              const isActive = activeNodeId === node.id;
              const isVisited = visitedNodes.has(node.id);
              const isNextGuide = nextGuideNode?.id === node.id && !allCompleted;

              // Override position to maintain wide open margin inside the 7-col box
              const customTop =
                node.id === "precision" ? "14%" :
                node.id === "innovation" ? "86%" :
                node.id === "reliability" || node.id === "improvement" ? "30%" : "70%";
              const customLeft =
                node.id === "precision" || node.id === "innovation" ? "50%" :
                node.id === "reliability" || node.id === "excellence" ? "84%" : "16%";

              return (
                <div
                  key={node.id}
                  style={{ top: customTop, left: customLeft }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto flex flex-col items-center"
                >
                  {/* Interactive Guide Arrow - Appears ONLY on the next unvisited node right until all nodes are clicked */}
                  {isNextGuide && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: [1, 1.15, 1], y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.2 }}
                      className="absolute -top-8 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white text-[10px] font-800 tracking-tight py-1 px-2.5 rounded-full shadow-xl border border-white/40 flex items-center gap-1 whitespace-nowrap pointer-events-none"
                    >
                      <span>Click Next</span>
                      <ArrowRight size={11} className="animate-pulse" />
                    </motion.div>
                  )}

                  <button
                    onClick={() => handleNodeSelect(node.id)}
                    className={`cursor-pointer group flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all duration-300 shadow-md ${
                      isActive
                        ? "bg-blue-600 text-white scale-110 shadow-blue-500/30 ring-4 ring-blue-500/20 font-800"
                        : isVisited
                        ? "bg-emerald-50 text-emerald-950 border border-emerald-300/80 font-700 hover:bg-emerald-100"
                        : "bg-white text-[var(--navy)] hover:bg-slate-50 border border-slate-200/90 font-700 hover:border-blue-400"
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isActive 
                        ? "bg-white/20 text-white" 
                        : isVisited
                        ? "bg-emerald-500 text-white"
                        : "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                    }`}>
                      {isVisited && !isActive ? <Check size={14} strokeWidth={3} /> : <NodeIcon size={15} />}
                    </div>
                    <span className="text-xs tracking-tight whitespace-nowrap">
                      {node.title}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Mobile Grid Layout for Nodes (Hidden on desktop) */}
          <div className="grid grid-cols-2 gap-2.5 w-full z-30 md:hidden mt-4">
            {coreValuesData.map((node) => {
              const NodeIcon = node.icon;
              const isActive = activeNodeId === node.id;
              const isVisited = visitedNodes.has(node.id);
              const isNextGuide = nextGuideNode?.id === node.id && !allCompleted;

              return (
                <button
                  key={node.id}
                  onClick={() => handleNodeSelect(node.id)}
                  className={`cursor-pointer relative flex items-center gap-2 p-3 rounded-xl text-left transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md font-800 ring-2 ring-blue-400"
                      : isVisited
                      ? "bg-emerald-50 text-emerald-950 border border-emerald-300 font-700"
                      : "bg-slate-50 text-[var(--navy)] border border-slate-200 font-700"
                  }`}
                >
                  {isNextGuide && (
                    <span className="absolute -top-2 -right-1 bg-blue-600 text-white text-[9px] font-800 px-2 py-0.5 rounded-full animate-bounce shadow">
                      Next ➔
                    </span>
                  )}
                  <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 ${
                    isActive ? "bg-white/20 text-white" : isVisited ? "bg-emerald-500 text-white" : "bg-blue-100 text-blue-600"
                  }`}>
                    {isVisited && !isActive ? <Check size={13} strokeWidth={3} /> : <NodeIcon size={15} />}
                  </div>
                  <span className="text-xs tracking-tight">{node.title}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Right Side: Eye-Level Interactive Inspection Console (5 cols = Zero Scrolling Down!) */}
        <div className="lg:col-span-5 flex flex-col h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-[var(--navy)] text-white rounded-3xl p-7 md:p-8 shadow-2xl border border-white/10 flex flex-col justify-between h-full relative overflow-hidden"
            >
              {/* Top Accent Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                {/* Node Status Header */}
                <div className="flex items-center justify-between mb-5 pb-3.5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center border border-blue-400/30">
                      <ActiveIcon size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-blue-300">
                        Selected Node
                      </span>
                      <h3 className="text-xl md:text-2xl font-900 text-white tracking-tight leading-none">
                        {activeNode.title}
                      </h3>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white/90 font-700 text-[11px] font-mono">
                    {activeNode.badge}
                  </span>
                </div>

                {/* Core Description */}
                <p className="text-slate-200 font-medium text-xs md:text-sm leading-relaxed mb-5">
                  {activeNode.fullDesc}
                </p>

                {/* Proof Metric Box */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 mb-5">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-blue-300 mb-1 flex items-center gap-1.5">
                    <Sparkles size={13} /> Metric Benchmark
                  </div>
                  <div className="text-xs md:text-sm font-800 text-white">
                    {activeNode.metric}
                  </div>
                </div>

                {/* How We Enforce This */}
                <div>
                  <div className="text-[11px] font-800 uppercase tracking-widest text-white/80 mb-2.5 flex items-center gap-1.5">
                    <Layers size={13} className="text-blue-400" /> Operational Enforcement:
                  </div>
                  <ul className="flex flex-col gap-2">
                    {activeNode.enforcement.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-slate-300 font-medium leading-snug">
                        <CheckCircle size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Navigation Prompts & Exploration Pills */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Dynamic guidance prompt or completion badge */}
                {nextGuideNode && !allCompleted ? (
                  <button
                    onClick={() => handleNodeSelect(nextGuideNode.id)}
                    className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-4 py-2 rounded-xl text-xs font-800 shadow-lg shadow-blue-500/25 transition-all hover:scale-105 active:scale-95 group"
                  >
                    <span>Next: {nextGuideNode.title}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : allCompleted ? (
                  <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-xs font-800">
                    <CheckCircle size={14} className="text-emerald-400" />
                    <span>All 6 Ethos Nodes Explored</span>
                  </div>
                ) : (
                  <span className="text-[11px] text-white/60 font-mono">
                    Node {coreValuesData.findIndex(n => n.id === activeNode.id) + 1} of {coreValuesData.length}
                  </span>
                )}

                <div className="flex items-center gap-2">
                  {coreValuesData.map((n) => {
                    const isV = visitedNodes.has(n.id);
                    return (
                      <button
                        key={n.id}
                        onClick={() => handleNodeSelect(n.id)}
                        title={`${n.title} ${isV ? "(Visited)" : ""}`}
                        className={`cursor-pointer w-3 h-3 rounded-full transition-all flex items-center justify-center ${
                          activeNode.id === n.id 
                            ? "bg-blue-400 scale-125 ring-2 ring-blue-400/40" 
                            : isV
                            ? "bg-emerald-400 hover:bg-emerald-300"
                            : "bg-white/20 hover:bg-white/50"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
};
