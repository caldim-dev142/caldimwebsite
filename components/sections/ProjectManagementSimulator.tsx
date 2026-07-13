"use client";

import React, { useState } from "react";
import { 
  FolderKanban, CheckCircle2,
  Check, RefreshCw, FileCheck2, Loader2 
} from "lucide-react";

interface PMSProject {
  id: string;
  name: string;
  client: string;
  currentLogIndex: number; // 0 to 6
  logs: string[];
}

const initialProjects: PMSProject[] = [
  {
    id: "pms1",
    name: "Structural Steel Package",
    client: "Client: Apex Construction",
    currentLogIndex: 0,
    logs: ["System: Ready to log new bid enquiry."]
  }
];

const stages = [
  { label: "1. Log Bid", action: "Bid Entry" },
  { label: "2. Review", action: "Mgmt Review" },
  { label: "3. Activate", action: "Project Master" },
  { label: "4. Track", action: "Hours & CORs" },
  { label: "5. Invoice", action: "Invoicing" },
  { label: "6. Settle", action: "Payments" }
];

const telemetrySteps = [
  { log: "Sales Team: Client enquiry logged with full scope and pricing details.", stage: 0 },
  { log: "Management: Estimation model reviewed and approved. Advancing to activation.", stage: 1 },
  { log: "System: Live project activated. PO phases and vendor assignments defined.", stage: 2 },
  { log: "Team: Hours tracked. Change order requests captured and audited successfully.", stage: 3 },
  { log: "System: Milestone-linked invoices generated automatically and sent to client.", stage: 4 },
  { log: "Finance: Customer and vendor payments recorded and reconciled. Project closed.", stage: 5 }
];

export const ProjectManagementSimulator: React.FC = () => {
  const [projects, setProjects] = useState<PMSProject[]>(initialProjects);
  const [selectedId, setSelectedId] = useState<string>("pms1");
  const [loading, setLoading] = useState<boolean>(false);

  const activeProject = projects.find((p) => p.id === selectedId) || projects[0];

  const getActiveStage = (logIndex: number) => {
    if (logIndex === 0) return 0;
    if (logIndex >= 6) return 6; // Completed state
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
          } else if (p.currentLogIndex < 6) {
            newLogs.push(telemetrySteps[p.currentLogIndex].log);
          } else if (p.currentLogIndex === 6) {
            nextLogIndex = 0;
            newLogs = ["System: Resetting project pipeline for test run."];
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
      case 0: return "Log Bid Enquiry";
      case 1: return "Review Estimation";
      case 2: return "Activate Project";
      case 3: return "Track Hours";
      case 4: return "Generate Invoice";
      case 5: return "Settle Payments";
      case 6: return "Reset Simulation Run";
      default: return "Process Next Step";
    }
  };

  return (
    <div className="p-6 md:p-8 bg-slate-50 rounded-b-3xl h-full">
      <div className="text-center mb-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-900 text-slate-900 mb-1">
          See CALDIM PMS in Action
        </h2>
        <p className="text-xs text-slate-500 font-600">
          Click through to see the live end-to-end engineering project lifecycle.
        </p>
      </div>

      {/* Main console box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden flex flex-col min-h-[500px]">
        
        {/* Workspace */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                <FolderKanban size={18} />
              </div>
              <div>
                <span className="text-[9px] font-mono font-700 text-slate-400 uppercase tracking-widest block leading-none mb-1">
                  {activeProject.client}
                </span>
                <h3 className="text-lg font-900 text-slate-900 leading-none">
                  {activeProject.name}
                </h3>
              </div>
            </div>
            {activeStage < 6 && (
              <div className="text-xs font-mono font-800 text-sky-600 uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-100 self-start sm:self-center">
                Stage: {stages[Math.min(activeStage, 5)].label.split(". ")[1]}
              </div>
            )}
          </div>

          {/* Stepper */}
          <div className="py-6 border-b border-slate-100">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {stages.map((stage, idx) => {
                const isPassed = activeStage > idx;
                const isActive = activeStage === idx;
                return (
                  <div key={idx} className="flex flex-col items-center text-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border ${
                        isPassed 
                          ? "bg-sky-500 border-sky-500 text-white" 
                          : isActive 
                          ? "bg-white border-sky-400 text-sky-500 ring-2 ring-sky-400/20" 
                          : "bg-slate-100 border-slate-200 text-slate-400"
                      }`}
                    >
                      {isPassed ? <Check size={12} /> : idx + 1}
                    </div>
                    <span className={`text-[10px] font-800 tracking-tight mt-2.5 leading-tight block ${
                      isActive ? "text-sky-600 font-900" : isPassed ? "text-slate-800" : "text-slate-400"
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
            
            <div className="flex-1 bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-[10px] sm:text-xs text-sky-400 min-h-[160px] max-h-[220px] overflow-y-auto flex flex-col gap-1.5 shadow-inner">
              <div className="text-slate-500 italic text-[9px] tracking-wider mb-1">
                --- PMS EVENT TELEMETRY LOGS ---
              </div>
              {activeProject.logs.map((log, lIdx) => (
                <div key={lIdx} className="leading-relaxed">
                  <span className="text-slate-600">&gt;</span> {log}
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-1.5 text-sky-400 animate-pulse">
                  <Loader2 size={12} className="animate-spin" />
                  <span>Processing step transition...</span>
                </div>
              )}
            </div>

            {/* Stage 6 (Success Status Card) */}
            {activeStage === 6 && (
              <div className="p-5 border border-sky-200 bg-sky-50/50 rounded-2xl flex flex-col sm:flex-row items-center gap-4 animate-fade-in">
                <div className="w-16 h-16 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/20 shrink-0">
                  <FileCheck2 size={28} />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-800 uppercase tracking-widest text-sky-700 mb-0.5">
                    PROJECT CLOSED & RECONCILED
                  </h4>
                  <h3 className="text-sm font-800 text-slate-900 mb-1">
                    Lifecycle Complete
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-600">
                    The project has been successfully executed from initial bid estimation to final payment settlement with zero manual handoffs.
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Footer Control */}
          <div className="border-t border-slate-100 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[10px] text-slate-400 font-mono font-700">
              Workflow Step: {Math.min(activeProject.currentLogIndex, 6)} of 6
            </span>
            <button
              onClick={() => handleNextStep()}
              disabled={loading}
              className="w-full sm:w-auto btn btn-primary bg-sky-500 hover:bg-sky-600 text-white text-xs font-800 py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {activeProject.currentLogIndex === 6 ? (
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
