"use client";

import React, { useState } from "react";
import { 
  CheckCircle2, 
  Check, RefreshCw, Loader2, Sparkles
} from "lucide-react";

interface WorkflowProject {
  id: string;
  name: string;
  client: string;
  status: "Pending" | "Approved" | "Rejected" | null;
  currentStage: number; // 0 to 5
  logs: string[];
}

const initialProjects: WorkflowProject[] = [
  {
    id: "ab1",
    name: "Client Biometric Intake",
    client: "Sarah Jenkins",
    status: null,
    currentStage: 0,
    logs: ["System: AI_Beauty_Consultant initialized. Awaiting biometric scan."]
  }
];

const stages = [
  { label: "1. Facial Analysis", action: "Live Scan" },
  { label: "2. Services Matched", action: "AI Recommendation" },
  { label: "3. Slot Secured", action: "Smart Booking" },
  { label: "4. Risk Evaluated", action: "No-Show Predictor" },
  { label: "5. Service Completed", action: "Status Update" },
  { label: "6. Profit Analyzed", action: "AI Insights" }
];

export const AiBeautySimulator: React.FC = () => {
  const [projects, setProjects] = useState<WorkflowProject[]>(initialProjects);
  const [selectedId] = useState<string>("ab1");
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
            newLogs.push("Client: Uploaded photo for live scan.");
            newLogs.push("AI Engine: Analyzing skin texture and face-shape...");
            newLogs.push("System: Biometric analysis complete.");
          } else if (p.currentStage === 1) {
            newLogs.push("AI Engine: Matching biometric results with salon services.");
            newLogs.push("System: Recommended customized 'HydraFacial + Contour'.");
          } else if (p.currentStage === 2) {
            newLogs.push("Client: Reserved available time slot.");
            newLogs.push("System: Smart booking confirmed instantly.");
          } else if (p.currentStage === 3) {
            newLogs.push("No-Show Predictor: Evaluating appointment risk based on history...");
            newLogs.push("System: Flagged as 'Low Risk' to the salon owner.");
          } else if (p.currentStage === 4) {
            newLogs.push("Salon Owner: Marked appointment as completed.");
            newLogs.push("System: Status updated and digital invoice generated.");
          } else if (p.currentStage === 5) {
            newLogs.push("Gemini AI: Processing completed appointment data.");
            newLogs.push("AI Insights: Generating actionable business performance strategies.");
            newLogs.push("System: Business analytics updated successfully.");
          } else if (p.currentStage === 6) {
            nextStage = 0;
            newLogs = ["System: Resetting pipeline for next client."];
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
      case 0: return "Run Live Scan";
      case 1: return "Match Services";
      case 2: return "Secure Slot";
      case 3: return "Evaluate Risk";
      case 4: return "Complete Service";
      case 5: return "Analyze Profit";
      case 6: return "Reset Simulation";
      default: return "Next Step";
    }
  };

  return (
    <div className="p-6 md:p-8 bg-slate-50 h-full overflow-y-auto">
      <div className="text-center mb-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-900 text-slate-900 mb-1">
          See AI_Beauty_Consultant in Action
        </h2>
        <p className="text-xs text-slate-500 font-600">
          Click through the steps to see the Biometric Discovery to Business Analytics workflow.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden min-h-[500px] flex flex-col">
        
        {/* Workspace */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-600">
                <Sparkles size={18} />
              </div>
              <div>
                <span className="text-[9px] font-mono font-700 text-slate-400 uppercase tracking-widest block leading-none mb-1">
                  Active Client Session
                </span>
                <h3 className="text-lg font-900 text-slate-900 leading-none">
                  {activeProject.name} • <span className="text-slate-500 text-xs font-700">{activeProject.client}</span>
                </h3>
              </div>
            </div>
            <div className="text-xs font-mono font-800 text-pink-600 uppercase tracking-wider bg-pink-50 px-3 py-1 rounded-full border border-pink-100 self-start sm:self-center">
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
                          ? "bg-pink-600 border-pink-600 text-white" 
                          : isActive 
                          ? "bg-white border-pink-500 text-pink-600 ring-2 ring-pink-500/20" 
                          : "bg-slate-100 border-slate-200 text-slate-400"
                      }`}
                    >
                      {isPassed ? <Check size={12} /> : idx + 1}
                    </div>
                    <span className={`text-[9px] font-800 tracking-tight mt-2.5 leading-tight block ${
                      isActive ? "text-pink-600 font-900" : isPassed ? "text-slate-800" : "text-slate-400"
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
            
            <div className="flex-1 bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-[10px] sm:text-xs text-pink-400 min-h-[160px] max-h-[220px] overflow-y-auto flex flex-col gap-1.5 shadow-inner">
              <div className="text-slate-500 italic text-[9px] tracking-wider mb-1">
                --- AI_BEAUTY_CONSULTANT EVENT LOGS ---
              </div>
              {activeProject.logs.map((log, lIdx) => (
                <div key={lIdx} className="leading-relaxed">
                  <span className="text-slate-600">&gt;</span> {log}
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-1.5 text-pink-400 animate-pulse mt-2">
                  <Loader2 size={12} className="animate-spin" />
                  <span>Processing AI analysis...</span>
                </div>
              )}
            </div>

            {/* Stage 6 (Completion) */}
            {activeProject.currentStage === 6 && (
              <div className="p-5 border border-emerald-200 bg-emerald-50/50 rounded-2xl flex flex-col sm:flex-row items-center gap-4 animate-fade-in">
                <div className="w-16 h-16 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-800 uppercase tracking-widest text-emerald-700 mb-0.5">
                    Workflow Completed
                  </h4>
                  <h3 className="text-sm font-800 text-slate-900 mb-1">
                    Business Analytics Ready
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-600">
                    The biometric discovery pipeline is complete. Salon owner dashboard has been updated with new AI-generated performance strategies.
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
            <button
              onClick={() => handleNextStage()}
              disabled={loading}
              className="w-full sm:w-auto btn bg-pink-600 hover:bg-pink-700 text-white text-xs font-800 py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
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
          </div>

        </div>

      </div>
    </div>
  );
};
