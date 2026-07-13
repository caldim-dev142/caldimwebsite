"use client";

import React, { useState } from "react";
import { 
  CheckCircle2, 
  Check, RefreshCw, Loader2, X, ShieldCheck
} from "lucide-react";

interface WorkflowProject {
  id: string;
  name: string;
  employee: string;
  status: "Pending" | "Approved" | "Rejected" | null;
  currentStage: number; // 0 to 5
  logs: string[];
}

const initialProjects: WorkflowProject[] = [
  {
    id: "a1",
    name: "End-to-End Asset Request Lifecycle",
    employee: "REQ-7782: Industrial Robot Arm",
    status: null,
    currentStage: 0,
    logs: ["System: Asset Management system initialized. Awaiting new asset request."]
  }
];

const stages = [
  { label: "1. Submit Request", action: "Create Asset" },
  { label: "2. L1 Validation", action: "Approve Request" },
  { label: "3. Drafting", action: "Submit Design" },
  { label: "4. Checking", action: "Verify Design" },
  { label: "5. Sign-Off", action: "Final Approve" },
  { label: "6. Implementation", action: "Advance Production" }
];

export const AssetManagementSimulator: React.FC = () => {
  const [projects, setProjects] = useState<WorkflowProject[]>(initialProjects);
  const [selectedId] = useState<string>("a1");
  const [loading, setLoading] = useState<boolean>(false);

  const activeProject = projects.find((p) => p.id === selectedId) || projects[0];

  const handleNextStage = (forcedStatus?: "Approved" | "Rejected") => {
    setLoading(true);
    
    setTimeout(() => {
      setProjects((prev) => 
        prev.map((p) => {
          if (p.id !== selectedId) return p;
          
          let nextStage = p.currentStage + 1;
          let newLogs = [...p.logs];
          let updatedStatus = p.status;

          if (p.currentStage === 0) {
            newLogs.push("Engineer: Submitting a new tool requirement with specifications.");
            newLogs.push("System: Request routed to Phase 1 Approval Queue.");
          } else if (p.currentStage === 1) {
            if (forcedStatus) {
              updatedStatus = forcedStatus;
              newLogs.push(`Manager: L1 Validation -> [${forcedStatus}]`);
              if (forcedStatus === "Approved") {
                newLogs.push("System: Request approved. Target completion timeline assigned.");
                newLogs.push("System: Handing off to Phase 2 (Design & Verification).");
              } else {
                newLogs.push("System: Request denied. Engineer notified.");
              }
            }
          } else if (p.currentStage === 2) {
            newLogs.push("Designer: Drafting initiated.");
            newLogs.push("Designer: CAD files uploaded through the secure quarantine pipeline.");
          } else if (p.currentStage === 3) {
            newLogs.push("Checker: Reviewing the documents.");
            newLogs.push("Checker: Design verified and approved for final review.");
          } else if (p.currentStage === 4) {
            newLogs.push("Head of Engineering: Reviewing final asset specifications.");
            newLogs.push("System: Ultimate sign-off on the design completed.");
            newLogs.push("System: Advancing to Phase 3 (Production).");
          } else if (p.currentStage === 5) {
            newLogs.push("Production Agent: Approved design moved into physical production.");
            newLogs.push("System: Asset lifecycle marked complete.");
          } else if (p.currentStage === 6) {
            nextStage = 0;
            newLogs = ["System: Resetting pipeline for new asset request."];
            updatedStatus = null;
          }

          return {
            ...p,
            currentStage: nextStage,
            logs: newLogs,
            status: updatedStatus
          };
        })
      );
      setLoading(false);
    }, 1000);
  };

  const getButtonText = () => {
    switch (activeProject.currentStage) {
      case 0: return "Submit Request";
      case 1: return "Review Request (L1)";
      case 2: return "Upload CAD Files";
      case 3: return "Verify Design";
      case 4: return "Sign-Off Design";
      case 5: return "Advance to Production";
      case 6: return "Reset Simulation";
      default: return "Next Step";
    }
  };

  return (
    <div className="p-6 md:p-8 bg-slate-50 h-full overflow-y-auto">
      <div className="text-center mb-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-900 text-slate-900 mb-1">
          See Asset Management in Action
        </h2>
        <p className="text-xs text-slate-500 font-600">
          Click through the steps to see the End-to-End Asset Request Lifecycle.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden min-h-[500px] flex flex-col">
        
        {/* Workspace */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <ShieldCheck size={18} />
              </div>
              <div>
                <span className="text-[9px] font-mono font-700 text-slate-400 uppercase tracking-widest block leading-none mb-1">
                  Active Lifecycle Pipeline
                </span>
                <h3 className="text-lg font-900 text-slate-900 leading-none">
                  {activeProject.name} • <span className="text-slate-500 text-xs font-700">{activeProject.employee}</span>
                </h3>
              </div>
            </div>
            <div className="text-xs font-mono font-800 text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100 self-start sm:self-center">
              Stage: {activeProject.currentStage < 6 ? stages[activeProject.currentStage].label.split(". ")[1] : "Complete"}
            </div>
          </div>

          {/* Stepper (6 Stages) */}
          <div className="py-6 border-b border-slate-100">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {stages.map((stage, idx) => {
                const isPassed = activeProject.currentStage > idx;
                const isActive = activeProject.currentStage === idx;
                return (
                  <div key={idx} className="flex flex-col items-center text-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border ${
                        isPassed 
                          ? "bg-blue-600 border-blue-600 text-white" 
                          : isActive 
                          ? "bg-white border-blue-500 text-blue-600 ring-2 ring-blue-500/20" 
                          : "bg-slate-100 border-slate-200 text-slate-400"
                      }`}
                    >
                      {isPassed ? <Check size={12} /> : idx + 1}
                    </div>
                    <span className={`text-[9px] font-800 tracking-tight mt-2.5 leading-tight block ${
                      isActive ? "text-blue-600 font-900" : isPassed ? "text-slate-800" : "text-slate-400"
                    }`}>
                      {stage.label}
                    </span>
                    <span className="text-[7px] text-slate-400 font-600 block mt-0.5">{stage.action}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Outputs */}
          <div className="flex-1 py-6 flex flex-col gap-6">
            
            <div className="flex-1 bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-[10px] sm:text-xs text-blue-400 min-h-[160px] max-h-[220px] overflow-y-auto flex flex-col gap-1.5 shadow-inner">
              <div className="text-slate-500 italic text-[9px] tracking-wider mb-1">
                --- ASSET MANAGEMENT TELEMETRY LOGS ---
              </div>
              {activeProject.logs.map((log, lIdx) => (
                <div key={lIdx} className="leading-relaxed">
                  <span className="text-slate-600">&gt;</span> {log}
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-1.5 text-blue-400 animate-pulse mt-2">
                  <Loader2 size={12} className="animate-spin" />
                  <span>Processing step transition...</span>
                </div>
              )}
            </div>

            {/* Stage 1 Choice (L1 Validation) */}
            {activeProject.currentStage === 1 && !loading && (
              <div className="p-4 border border-blue-200 bg-blue-50/50 rounded-2xl flex flex-col gap-3 justify-center items-center text-center animate-fade-in">
                <h4 className="text-xs font-mono font-800 uppercase tracking-widest text-blue-700">
                  Manager Validation Required
                </h4>
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleNextStage("Approved")}
                    className="btn bg-blue-600 hover:bg-blue-700 text-white text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 font-bold"
                  >
                    <CheckCircle2 size={14} />
                    Approve Request
                  </button>
                  <button 
                    onClick={() => handleNextStage("Rejected")}
                    className="btn border border-red-200 bg-white text-red-600 hover:bg-red-50 text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 font-bold"
                  >
                    <X size={14} />
                    Deny Request
                  </button>
                </div>
              </div>
            )}

            {/* Stage 6 (Production Completion) */}
            {activeProject.currentStage === 6 && (
              <div className="p-5 border border-emerald-200 bg-emerald-50/50 rounded-2xl flex flex-col sm:flex-row items-center gap-4 animate-fade-in">
                <div className="w-16 h-16 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-800 uppercase tracking-widest text-emerald-700 mb-0.5">
                    Production Lifecycle Completed
                  </h4>
                  <h3 className="text-sm font-800 text-slate-900 mb-1">
                    Asset Released to Physical Production
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-600">
                    The design has been verified, checked, and signed off. The final asset specifications are successfully advancing into production.
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Footer Control */}
          <div className="border-t border-slate-100 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[10px] text-slate-400 font-mono font-700">
              Workflow Step: {Math.min(activeProject.currentStage + 1, 6)} of 6
            </span>
            {activeProject.currentStage !== 1 && (
              <button
                onClick={() => handleNextStage()}
                disabled={loading}
                className="w-full sm:w-auto btn bg-blue-600 hover:bg-blue-700 text-white text-xs font-800 py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={13} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {activeProject.currentStage === 6 ? (
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
