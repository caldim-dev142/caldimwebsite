"use client";

import React, { useState } from "react";
import { 
  FileText, CheckCircle2, Cpu, 
  Check, RefreshCw, ShoppingCart, Loader2, Play, LayoutGrid
} from "lucide-react";

interface DrawingProject {
  id: string;
  name: string;
  file: string;
  mode: "Automatic" | "Manual" | null;
  currentStage: number; // 0 to 4
  logs: string[];
}

const initialProjects: DrawingProject[] = [
  {
    id: "p1",
    name: "Steel Roller Assembly",
    file: "SR-402-A.pdf",
    mode: null,
    currentStage: 0,
    logs: ["System: System ready. Upload drawing to start."]
  },
  {
    id: "p2",
    name: "Hydraulic Piston Block",
    file: "HP-901-B.pdf",
    mode: null,
    currentStage: 0,
    logs: ["System: System ready. Upload drawing to start."]
  },
  {
    id: "p3",
    name: "Structural Truss Frame",
    file: "ST-110-C.pdf",
    mode: null,
    currentStage: 0,
    logs: ["System: System ready. Upload drawing to start."]
  }
];

const stages = [
  { label: "1. Upload Drawing", action: "File Ingest" },
  { label: "2. BOM Parse", action: "AI Material Scan" },
  { label: "3. Sourcing Mode", action: "Scoping & RFQs" },
  { label: "4. Live Bids", action: "Comparison Matrix" },
  { label: "5. PO Released", action: "ERP Release" }
];

export const ProcurementSimulator: React.FC = () => {
  const [projects, setProjects] = useState<DrawingProject[]>(initialProjects);
  const [selectedId, setSelectedId] = useState<string>("p1");
  const [loading, setLoading] = useState<boolean>(false);

  const activeProject = projects.find((p) => p.id === selectedId) || projects[0];

  const handleNextStage = (forcedMode?: "Automatic" | "Manual") => {
    setLoading(true);
    
    setTimeout(() => {
      setProjects((prev) => 
        prev.map((p) => {
          if (p.id !== selectedId) return p;
          
          let nextStage = p.currentStage + 1;
          let newLogs = [...p.logs];
          let updatedMode = p.mode;

          if (p.currentStage === 0) {
            newLogs.push(`System: File ${p.file} successfully uploaded to secure ingestion bucket.`);
            newLogs.push("AI Agent: Ingesting 2D blueprint drawings. Splitting layers...");
            newLogs.push("AI Agent: BOM Extraction complete. 12 carbon steel rollers, 4 seal hardware units parsed.");
          } else if (p.currentStage === 1) {
            if (forcedMode) {
              updatedMode = forcedMode;
              newLogs.push(`User: Selected Sourcing Mode -> [${forcedMode}]`);
              newLogs.push("AI Agent: Running Should-Cost calculations against Costsheet Master catalog...");
              newLogs.push("AI Agent: Should-Cost Estimate finalized at ₹14,200. Dispatching categorized RFQs to pre-qualified vendors.");
            }
          } else if (p.currentStage === 2) {
            newLogs.push("System: Incoming vendor bids received in quotation portal.");
            newLogs.push("AI Agent: Extracted line items from vendor invoice PDFs. Populating live comparison matrix.");
          } else if (p.currentStage === 3) {
            newLogs.push(`AI Agent: Selecting Vendor A based on should-cost compliance. Generating PO.`);
            newLogs.push(`System: Compliant Purchase Order issued. Transaction synced to ERP registry.`);
          } else if (p.currentStage === 4) {
            nextStage = 0;
            newLogs = ["System: Resetting drawing pipeline for test run."];
            updatedMode = null;
          }

          return {
            ...p,
            currentStage: nextStage,
            logs: newLogs,
            mode: updatedMode
          };
        })
      );
      setLoading(false);
    }, 1200);
  };

  const getButtonText = () => {
    switch (activeProject.currentStage) {
      case 0: return "Upload & Run AI BOM Scan";
      case 1: return "Choose Sourcing Mode";
      case 2: return "Simulate Incoming Bids";
      case 3: return "Issue Final Purchase Order";
      case 4: return "Reset Simulation Run";
      default: return "Process Next Step";
    }
  };

  return (
    <div className="p-6 md:p-8 bg-slate-50">
      <div className="text-center mb-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-900 text-slate-900 mb-1">
          See CAL-BUY in Action
        </h2>
        <p className="text-xs text-slate-500 font-600">
          Click blueprint projects and trigger steps to see drawing-to-RFQ procurement flow live.
        </p>
      </div>

      {/* Main console box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden min-h-[500px] flex flex-col">
        
        {/* Workspace */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <FileText size={18} />
              </div>
              <div>
                <span className="text-[9px] font-mono font-700 text-slate-400 uppercase tracking-widest block leading-none mb-1">
                  Active Document Ingestion
                </span>
                <h3 className="text-lg font-900 text-slate-900 leading-none">
                  {activeProject.name} • <span className="text-slate-500 text-xs font-700">{activeProject.file}</span>
                </h3>
              </div>
            </div>
            <div className="text-xs font-mono font-800 text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 self-start sm:self-center">
              Stage: {stages[activeProject.currentStage].label.split(". ")[1]}
            </div>
          </div>

          {/* Stepper */}
          <div className="py-6 border-b border-slate-100">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {stages.map((stage, idx) => {
                const isPassed = activeProject.currentStage > idx;
                const isActive = activeProject.currentStage === idx;
                return (
                  <div key={idx} className="flex flex-col items-center text-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border ${
                        isPassed 
                          ? "bg-emerald-600 border-emerald-600 text-white" 
                          : isActive 
                          ? "bg-white border-emerald-500 text-emerald-600 ring-2 ring-emerald-500/20" 
                          : "bg-slate-100 border-slate-200 text-slate-400"
                      }`}
                    >
                      {isPassed ? <Check size={12} /> : idx + 1}
                    </div>
                    <span className={`text-[10px] font-800 tracking-tight mt-2.5 leading-tight block ${
                      isActive ? "text-emerald-600 font-900" : isPassed ? "text-slate-800" : "text-slate-400"
                    }`}>
                      {stage.label}
                    </span>
                    <span className="text-[8px] text-slate-400 font-600 block mt-0.5">{stage.action}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Outputs */}
          <div className="flex-1 py-6 flex flex-col gap-6">
            
            <div className="flex-1 bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-[10px] sm:text-xs text-emerald-400 min-h-[160px] max-h-[220px] overflow-y-auto flex flex-col gap-1.5 shadow-inner">
              <div className="text-slate-500 italic text-[9px] tracking-wider mb-1">
                --- CALBUY EVENT TELEMETRY LOGS ---
              </div>
              {activeProject.logs.map((log, lIdx) => (
                <div key={lIdx} className="leading-relaxed">
                  <span className="text-slate-600">&gt;</span> {log}
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-1.5 text-emerald-400 animate-pulse">
                  <Loader2 size={12} className="animate-spin" />
                  <span>Processing step transition...</span>
                </div>
              )}
            </div>

            {/* Stage 1 Choice (Choose Sourcing Mode) */}
            {activeProject.currentStage === 1 && !loading && (
              <div className="p-4 border border-blue-200 bg-blue-50/50 rounded-2xl flex flex-col gap-3 justify-center items-center text-center">
                <h4 className="text-xs font-mono font-800 uppercase tracking-widest text-blue-700">
                  Sourcing Mode Decision Required
                </h4>
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleNextStage("Automatic")}
                    className="btn btn-primary bg-emerald-600 hover:bg-emerald-700 text-white text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5"
                  >
                    Automatic (AI Should-Cost)
                  </button>
                  <button 
                    onClick={() => handleNextStage("Manual")}
                    className="btn btn-secondary border-blue-300 text-blue-800 hover:bg-blue-100/50 text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5"
                  >
                    Manual Review Mode
                  </button>
                </div>
              </div>
            )}

            {/* Stage 3 (Live Bids Comparison Matrix Table) */}
            {activeProject.currentStage === 3 && (
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[9px]">
                      <th className="py-2.5 px-4">Vendor</th>
                      <th className="py-2.5 px-4">Quote Price</th>
                      <th className="py-2.5 px-4">Lead Time</th>
                      <th className="py-2.5 px-4">AI Analysis</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="py-2.5 px-4 font-bold text-slate-900">Vendor A (Industrial Machining)</td>
                      <td className="py-2.5 px-4 text-slate-700">₹12,800</td>
                      <td className="py-2.5 px-4 text-emerald-600 font-bold">3 Days</td>
                      <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[9px]">Rank 1 (Matched)</span></td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-2.5 px-4 font-bold text-slate-900">Vendor B (Apex Fabrication)</td>
                      <td className="py-2.5 px-4 text-slate-700">₹13,500</td>
                      <td className="py-2.5 px-4 text-slate-500">5 Days</td>
                      <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-bold text-[9px]">Rank 2 (Acceptable)</span></td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-slate-900">Vendor C (Core Foundry)</td>
                      <td className="py-2.5 px-4 text-slate-700">₹15,000</td>
                      <td className="py-2.5 px-4 text-red-600 font-bold">12 Days</td>
                      <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded bg-red-50 text-red-700 font-bold text-[9px]">Rank 3 (High Cost)</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Stage 4 (PO Release transaction stamp) */}
            {activeProject.currentStage === 4 && (
              <div className="p-5 border border-emerald-200 bg-emerald-50/50 rounded-2xl flex flex-col sm:flex-row items-center gap-4 animate-fade-in">
                <div className="w-16 h-16 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <ShoppingCart size={28} />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-800 uppercase tracking-widest text-emerald-700 mb-0.5">
                    Purchase Order Released
                  </h4>
                  <h3 className="text-sm font-800 text-slate-900 mb-1">
                    PO-2026-CAL-ROLLERS Issued
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-600">
                    BOM parts successfully matched and allocated. Order details synced to ERP vendor inventory catalogs.
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Footer Control */}
          <div className="border-t border-slate-100 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[10px] text-slate-400 font-mono font-700">
              Workflow Step: {activeProject.currentStage + 1} of 5
            </span>
            {activeProject.currentStage !== 1 && (
              <button
                onClick={() => handleNextStage()}
                disabled={loading}
                className="w-full sm:w-auto btn btn-primary bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-800 py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={13} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {activeProject.currentStage === 4 ? (
                      <RefreshCw size={13} />
                    ) : (
                      <CheckCircle2 size={13} />
                    )}
                    {getButtonText()}
                  </>
                )}
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
