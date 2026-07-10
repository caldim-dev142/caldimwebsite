"use client";

import React from "react";
import { motion } from "framer-motion";
import { FadeUp } from "../animations/Animations";

export const HomeWorkflow: React.FC = () => {
  const color = "#10B981"; // Emerald green for CAL-BUY

  const workflow = {
    headline: "CAL-BUY — Automated Procurement Workflow & RFQ Journey",
    description: "This details the automated drawing-to-purchase-order workflow of CAL-BUY. It outlines the journey of an engineering draft through the platform to final vendor fulfillment.",
    phases: [
      {
        name: "Phase 1: Extraction & Ingestion",
        stages: [
          {
            number: 1,
            name: "Upload blueprint drawings",
            action: "Drawing Ingest",
            details: "Upload 2D drawings (PDF/DWG formats) directly to the secure procurement portal."
          },
          {
            number: 2,
            name: "BOM Extraction",
            action: "AI Material Scan",
            details: "AI scans the drawings and extracts plates, hardware, structures, and raw materials in seconds."
          }
        ]
      },
      {
        name: "Phase 2: Estimate & Inventory",
        stages: [
          {
            number: 3,
            name: "AI Should-Costing",
            action: "Market Pricing",
            details: "Calculate market-indexed and ERP catalog estimates using AI Prepare and Costsheet Master models."
          },
          {
            number: 4,
            name: "Smart MRP Check",
            action: "Inventory Sync",
            details: "The system automatically checks existing warehouse inventories for available stock matching the extracted BOM."
          }
        ]
      },
      {
        name: "Phase 3: Sourcing & RFQs",
        stages: [
          {
            number: 5,
            name: "Automatic RFQ Routing",
            action: "Vendor Dispatch",
            details: "Dispatch categorized RFQ email bids directly to pre-qualified, matched vendors on our secure directory."
          },
          {
            number: 6,
            name: "Comparison Matrix",
            action: "Live Quote Rank",
            details: "Incoming vendor quotes are automatically extracted, parsed, validated, and ranked in a real-time matrix dashboard."
          }
        ]
      },
      {
        name: "Phase 4: PO Release",
        stages: [
          {
            number: 7,
            name: "Purchase Order Release",
            action: "ERP Integration",
            details: "Generate compliant, signed purchase orders (POs) and inject them directly into your corporate ERP system."
          }
        ]
      }
    ]
  };

  return (
    <section className="py-24 bg-[#020c1b] text-white relative overflow-hidden border-b border-slate-900">
      {/* Blueprint Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_-20%,rgba(16,185,129,0.1),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none opacity-40" />

      <div className="container-wide relative z-10">
        
        <FadeUp className="text-center mb-16 max-w-3xl mx-auto">
          <div 
            className="badge mb-4 mx-auto uppercase tracking-widest text-[10px] font-bold font-mono"
            style={{ 
              background: `${color}20`, 
              border: `1px solid ${color}30`,
              color: color
            }}
          >
            System Workflow
          </div>
          <h2 className="text-3xl md:text-5xl font-900 text-white tracking-tight mb-4">
            {workflow.headline}
          </h2>
          <p className="text-slate-400 font-600 text-sm md:text-base leading-relaxed">
            {workflow.description}
          </p>
        </FadeUp>

        {/* Dynamic Phases Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
          
          {/* Horizontal line linking columns (desktop only) */}
          <div className="hidden lg:block absolute top-[44px] left-[5%] right-[5%] h-0.5 bg-slate-800 pointer-events-none z-0" />

          {workflow.phases.map((phase, pIdx) => (
            <div key={pIdx} className="relative z-10">
              
              {/* Phase Header */}
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xs font-mono font-800 text-slate-500 uppercase tracking-widest bg-slate-950/60 border border-white/5 px-3 py-1 rounded-full">
                  {phase.name}
                </h3>
              </div>

              {/* Phase Stages List */}
              <div className="flex flex-col gap-4">
                {phase.stages.map((stage) => (
                  <div 
                    key={stage.number} 
                    className="p-5 rounded-2xl bg-[#0a1128]/85 border border-white/10 hover:border-slate-700 transition-all duration-300 relative group flex flex-col justify-between min-h-[160px]"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span 
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md shadow-black/30"
                          style={{ backgroundColor: color }}
                        >
                          {stage.number}
                        </span>
                        <span className="text-[9px] font-mono font-700 uppercase tracking-wider text-slate-500">
                          {stage.action}
                        </span>
                      </div>
                      <h4 className="text-sm font-800 text-white group-hover:text-blue-300 transition-colors">
                        {stage.name}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-600 mt-2">
                      {stage.details}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default HomeWorkflow;
