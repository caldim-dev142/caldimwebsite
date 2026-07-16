"use client";

import React, { useState } from "react";
import { 
  FileText, CheckCircle2,
  Check, RefreshCw, FileCheck2, Loader2 
} from "lucide-react";

interface EstimationProject {
  id: string;
  name: string;
  file: string;
  currentLogIndex: number; // 0 to 7
  logs: string[];
}

const initialProjects: EstimationProject[] = [
  {
    id: "p1",
    name: "Apex Monumental Staircase",
    file: "Apex_Stair_Details_A4.pdf",
    currentLogIndex: 0,
    logs: ["System: System ready. Upload drawing to start estimation."]
  }
];

const stages = [
  { label: "1. PDF/CAD Ingest", action: "Layout Parse" },
  { label: "2. BOM Generation", action: "Material Take-offs" },
  { label: "3. Labor Costing", action: "Hour Audit" },
  { label: "4. Bid Release", action: "PDF Proposal" }
];

const telemetrySteps = [
  { log: "System: PDF structural drawing 'Apex_Stair_Details_A4.pdf' uploaded.", stage: 0 },
  { log: "MISC AI: Parsing layout lines. 3 flights of monumental stairs identified.", stage: 0 },
  { log: "Cost Engine: Bill of Materials generated. Steel: A36 channel (18.5 tons).", stage: 1 },
  { log: "Labor Engine: Calculating fabrication hours. Standard rate set at $85/hr.", stage: 2 },
  { log: "Margin Engine: Finish (Hot-Dip Galvanized) and scrap rate (4.5%) applied.", stage: 3 },
  { log: "Estimator: Standard margin set at 22%. Freight adjustments applied.", stage: 3 },
  { log: "System: Final PDF bid proposal generated with complete material schedules.", stage: 3 }
];

export const MiscSimulator: React.FC = () => {
  const [projects, setProjects] = useState<EstimationProject[]>(initialProjects);
  const [selectedId, setSelectedId] = useState<string>("p1");
  const [loading, setLoading] = useState<boolean>(false);

  const activeProject = projects.find((p) => p.id === selectedId) || projects[0];

  const getActiveStage = (logIndex: number) => {
    if (logIndex === 0) return 0;
    if (logIndex >= 7) return 4; // Completed state
    return telemetrySteps[logIndex - 1].stage;
  };

  const activeStage = getActiveStage(activeProject.currentLogIndex);

  const handleNextStep = () => {
    setLoading(true);
    
    setTimeout(() => {
      setProjects((prev) => 
        prev.map((p) => {
          if (p.id !== selectedId) return p;
          
          let nextLogIndex = p.currentLogIndex + 1;
          let newLogs = [...p.logs];

          if (p.currentLogIndex === 0) {
            newLogs = [telemetrySteps[0].log];
          } else if (p.currentLogIndex < 7) {
            newLogs.push(telemetrySteps[p.currentLogIndex].log);
          } else if (p.currentLogIndex === 7) {
            nextLogIndex = 0;
            newLogs = ["System: Resetting estimation pipeline for test run."];
          }

          return {
            ...p,
            currentLogIndex: nextLogIndex,
            logs: newLogs
          };
        })
      );
      setLoading(false);
    }, 800);
  };

  const getButtonText = () => {
    switch (activeProject.currentLogIndex) {
      case 0: return "Upload Drawing";
      case 1: return "Parse Layout Lines";
      case 2: return "Generate Bill of Materials";
      case 3: return "Calculate Labor Costs";
      case 4: return "Apply Margins & Finishes";
      case 5: return "Apply Adjustments";
      case 6: return "Release Bid Proposal";
      case 7: return "Reset Simulation Run";
      default: return "Process Next Step";
    }
  };

  return (
    <div className="p-6 md:p-8 bg-slate-50 rounded-b-3xl h-full">
      <div className="text-center mb-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-900 text-slate-900 mb-1">
          See CALMISC in Action
        </h2>
        <p className="text-xs text-slate-500 font-600">
          Click through to see the active drawing-to-bid estimation flow live.
        </p>
      </div>

      {/* Main console box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden flex flex-col min-h-[500px]">
        
        {/* Workspace */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
                <FileText size={18} />
              </div>
              <div>
                <span className="text-[9px] font-mono font-700 text-slate-400 uppercase tracking-widest block leading-none mb-1">
                  Estimation Bid: Rev 1
                </span>
                <h3 className="text-lg font-900 text-slate-900 leading-none">
                  {activeProject.name} • <span className="text-slate-500 text-xs font-700">{activeProject.file}</span>
                </h3>
              </div>
            </div>
            {activeStage < 4 && (
              <div className="text-xs font-mono font-800 text-rose-600 uppercase tracking-wider bg-rose-50 px-3 py-1 rounded-full border border-rose-100 self-start sm:self-center">
                Stage: {stages[activeStage].label.split(". ")[1]}
              </div>
            )}
          </div>

          {/* Stepper */}
          <div className="py-6 border-b border-slate-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stages.map((stage, idx) => {
                const isPassed = activeStage > idx;
                const isActive = activeStage === idx;
                return (
                  <div key={idx} className="flex flex-col items-center text-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border ${
                        isPassed 
                          ? "bg-rose-600 border-rose-600 text-white" 
                          : isActive 
                          ? "bg-white border-rose-500 text-rose-600 ring-2 ring-rose-500/20" 
                          : "bg-slate-100 border-slate-200 text-slate-400"
                      }`}
                    >
                      {isPassed ? <Check size={12} /> : idx + 1}
                    </div>
                    <span className={`text-[10px] font-800 tracking-tight mt-2.5 leading-tight block ${
                      isActive ? "text-rose-600 font-900" : isPassed ? "text-slate-800" : "text-slate-400"
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
            
            <div className="flex-1 bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-[10px] sm:text-xs text-rose-400 min-h-[160px] max-h-[220px] overflow-y-auto flex flex-col gap-1.5 shadow-inner">
              <div className="text-slate-500 italic text-[9px] tracking-wider mb-1">
                --- MISC EVENT TELEMETRY LOGS ---
              </div>
              {activeProject.logs.map((log, lIdx) => (
                <div key={lIdx} className="leading-relaxed">
                  <span className="text-slate-600">&gt;</span> {log}
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-1.5 text-rose-400 animate-pulse">
                  <Loader2 size={12} className="animate-spin" />
                  <span>Processing step transition...</span>
                </div>
              )}
            </div>

            {/* Stage 4 (Success Status Card) */}
            {activeStage === 4 && (
              <div className="p-5 border border-rose-200 bg-rose-50/50 rounded-2xl flex flex-col sm:flex-row items-center gap-4 animate-fade-in">
                <div className="w-16 h-16 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/20 shrink-0">
                  <FileCheck2 size={28} />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-800 uppercase tracking-widest text-rose-700 mb-0.5">
                    BID PROPOSAL GENERATED
                  </h4>
                  <h3 className="text-sm font-800 text-slate-900 mb-1">
                    Proposal Package Ready
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-600">
                    Bill of Materials (BOM), fabrication labor hours, finishes, and margins fully audited. Commercial bid proposal generated for client submission.
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Footer Control */}
          <div className="border-t border-slate-100 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[10px] text-slate-400 font-mono font-700">
              Workflow Step: {Math.min(activeProject.currentLogIndex, 7)} of 7
            </span>
            <button
              onClick={() => handleNextStep()}
              disabled={loading}
              className="w-full sm:w-auto btn btn-primary bg-rose-600 hover:bg-rose-700 text-white text-xs font-800 py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {activeProject.currentLogIndex === 7 ? (
                    <RefreshCw size={13} />
                  ) : (
                    <CheckCircle2 size={13} />
                  )}
                  {getButtonText()}
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
