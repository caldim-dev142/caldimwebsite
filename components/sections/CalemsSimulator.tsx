"use client";

import React, { useState } from "react";
import { 
  Building2, CheckCircle2, UserCheck, 
  Check, RefreshCw, FileText, Loader2, DollarSign, X
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
    id: "w1",
    name: "New Hire Onboarding Pipeline",
    employee: "E-4092: Jane Doe",
    status: null,
    currentStage: 0,
    logs: ["System: Ready for organization provisioning and tenant setup."]
  }
];

const stages = [
  { label: "1. Register Your Tenant", action: "Tenant Account Setup" },
  { label: "2. Complete Document Upload", action: "Verify Candidate Credentials" },
  { label: "3. Attendance Check-In", action: "Log Working Hours" },
  { label: "4. Request Time Off", action: "Apply For Leave" },
  { label: "5. Approve Timesheets", action: "Allocate Project Resources" },
  { label: "6. Distribute Payslips", action: "Compensation Processing" }
];

export const CalemsSimulator: React.FC = () => {
  const [projects, setProjects] = useState<WorkflowProject[]>(initialProjects);
  const [selectedId] = useState<string>("w1");
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
            newLogs.push("System: Administrator creating the organization account.");
            newLogs.push("System: Isolated database spun up successfully.");
          } else if (p.currentStage === 1) {
            newLogs.push("HR Agent: Candidate uploading required identity documents...");
            newLogs.push("AI Agent: Running verification on submitted credentials.");
            newLogs.push("System: Company policies digitally signed via self-service portal.");
          } else if (p.currentStage === 2) {
            newLogs.push("System: Employee clocking in through the self-service portal.");
            newLogs.push("Telemetry: Time and location validated.");
            newLogs.push("System: Daily logs recorded seamlessly.");
          } else if (p.currentStage === 3) {
            if (forcedStatus) {
              updatedStatus = forcedStatus;
              newLogs.push(`Manager: Leave request -> [${forcedStatus}]`);
              if (forcedStatus === "Approved") {
                newLogs.push("System: Leave request approved for instant manager review.");
              } else {
                newLogs.push("System: Leave request denied. Employee notified.");
              }
            }
          } else if (p.currentStage === 4) {
            newLogs.push("System: Managers tracking hours allocated to client deliverables.");
            newLogs.push("Manager: Weekly timesheets reviewed and approved.");
            newLogs.push("System: Verified hours allocated to active client deliverables.");
          } else if (p.currentStage === 5) {
            newLogs.push("Payroll Agent: HR calculating monthly payments.");
            newLogs.push("Payroll Agent: Compensation processing initiated.");
            newLogs.push("System: Secure, encrypted digital payslips released.");
          } else if (p.currentStage === 6) {
            nextStage = 0;
            newLogs = ["System: Resetting pipeline for new simulation."];
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
      case 0: return "Register Tenant";
      case 1: return "Verify Credentials";
      case 2: return "Log Hours";
      case 3: return "Apply Leave";
      case 4: return "Allocate Resources";
      case 5: return "Process Compensation";
      case 6: return "Reset Simulation";
      default: return "Next Step";
    }
  };

  return (
    <div className="p-6 md:p-8 bg-slate-50 h-full overflow-y-auto">
      <div className="text-center mb-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-900 text-slate-900 mb-1">
          See CALEMS in Action
        </h2>
        <p className="text-xs text-slate-500 font-600">
          Click through the steps to see the Hire-to-Payroll digital workflow live.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden min-h-[500px] flex flex-col">
        
        {/* Workspace */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <Building2 size={18} />
              </div>
              <div>
                <span className="text-[9px] font-mono font-700 text-slate-400 uppercase tracking-widest block leading-none mb-1">
                  Active Employee Pipeline
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
                --- CALEMS EVENT TELEMETRY LOGS ---
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

            {/* Stage 3 Choice (Leave Approval) */}
            {activeProject.currentStage === 3 && !loading && (
              <div className="p-4 border border-blue-200 bg-blue-50/50 rounded-2xl flex flex-col gap-3 justify-center items-center text-center animate-fade-in">
                <h4 className="text-xs font-mono font-800 uppercase tracking-widest text-blue-700">
                  Manager Approval Required
                </h4>
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleNextStage("Approved")}
                    className="btn bg-blue-600 hover:bg-blue-700 text-white text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 font-bold"
                  >
                    <CheckCircle2 size={14} />
                    Approve Leave
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

            {/* Stage 6 (Payroll Completion) */}
            {activeProject.currentStage === 6 && (
              <div className="p-5 border border-emerald-200 bg-emerald-50/50 rounded-2xl flex flex-col sm:flex-row items-center gap-4 animate-fade-in">
                <div className="w-16 h-16 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <DollarSign size={28} />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-800 uppercase tracking-widest text-emerald-700 mb-0.5">
                    Payroll Cycle Completed
                  </h4>
                  <h3 className="text-sm font-800 text-slate-900 mb-1">
                    Payslips Distributed to All Active Tenants
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-600">
                    Calculations synced perfectly with daily attendance and approved leave balances. No manual intervention required.
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
            {activeProject.currentStage !== 3 && (
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
