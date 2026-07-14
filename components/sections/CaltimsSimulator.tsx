"use client";

import React, { useState } from "react";
import { 
  Building2, CheckCircle2, UserCheck, 
  Check, RefreshCw, FileText, Loader2, DollarSign, X, Clock
} from "lucide-react";

interface WorkflowProject {
  id: string;
  name: string;
  employee: string;
  status: "Approved" | "Rejected" | null;
  currentStage: number; // 0 to 6
  logs: string[];
}

const initialProjects: WorkflowProject[] = [
  {
    id: "w1",
    name: "Timesheet & Payroll Pipeline",
    employee: "T-802: John Smith",
    status: null,
    currentStage: 0,
    logs: ["System: Ready for biometric sync and attendance logging."]
  }
];

const stages = [
  { label: "1. Biometric Sync", action: "Import Attendance Logs" },
  { label: "2. Leave Management", action: "Request & Approve Leaves" },
  { label: "3. Timesheet Entry", action: "Auto-populate & Log Hours" },
  { label: "4. Manager Review", action: "Approve Timesheets" },
  { label: "5. Payroll Engine", action: "Process LOP & Deductions" },
  { label: "6. Payout & Payslips", action: "Distribute Compensation" }
];

export const CaltimsSimulator: React.FC = () => {
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
            newLogs.push("System: Node-cron triggering HikCentral biometric sync...");
            newLogs.push("Telemetry: Importing daily punch logs.");
            newLogs.push("System: Active attendance records synchronized to database.");
          } else if (p.currentStage === 1) {
            newLogs.push("Employee: Applying for annual leave via portal.");
            newLogs.push("Manager: Leave request reviewed and approved.");
            newLogs.push("System: Leave mapped to employee calendar & balances updated.");
          } else if (p.currentStage === 2) {
            newLogs.push("System: Fetching approved leaves & holidays for the week.");
            newLogs.push("System: Locking non-working slots in timesheet layout.");
            newLogs.push("Employee: Logging daily task hours and submitting timesheet.");
            newLogs.push("System: Timesheet status updated to SUBMITTED.");
          } else if (p.currentStage === 3) {
            if (forcedStatus) {
              updatedStatus = forcedStatus;
              newLogs.push(`Manager: Timesheet -> [${forcedStatus}]`);
              if (forcedStatus === "Approved") {
                newLogs.push("System: Timesheet status set to APPROVED & entries frozen.");
              } else {
                newLogs.push("System: Timesheet reverted to DRAFT. Employee notified.");
              }
            }
          } else if (p.currentStage === 4) {
            newLogs.push("System: Fetching approved timesheet hours & leave data.");
            newLogs.push("Payroll Engine: Calculating Loss of Pay (LOP) and Gross Earnings.");
            newLogs.push("Payroll Engine: Computing statutory deductions (PF, ESI, IT).");
            newLogs.push("System: Payroll Batch created (Status: DRAFT).");
          } else if (p.currentStage === 5) {
            newLogs.push("Admin: Payroll Batch verified and approved.");
            newLogs.push("System: Disbursing salaries via Razorpay gateway integration.");
            newLogs.push("System: Generating and emailing digital PDF payslips.");
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
      case 0: return "Sync Biometrics";
      case 1: return "Process Leaves";
      case 2: return "Submit Timesheet";
      case 3: return "Review Timesheet";
      case 4: return "Run Payroll Engine";
      case 5: return "Disburse Salaries";
      case 6: return "Reset Simulation";
      default: return "Next Step";
    }
  };

  return (
    <div className="p-6 md:p-8 bg-slate-50 h-full overflow-y-auto">
      <div className="text-center mb-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-900 text-slate-900 mb-1">
          See CalTIMS in Action
        </h2>
        <p className="text-xs text-slate-500 font-600">
          Click through the steps to see the integrated Timesheet-to-Payroll workflow live.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden min-h-[500px] flex flex-col">
        
        {/* Workspace */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Clock size={18} />
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
            <div className="text-xs font-mono font-800 text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 self-start sm:self-center">
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
                          ? "bg-indigo-600 border-indigo-600 text-white" 
                          : isActive 
                          ? "bg-white border-indigo-500 text-indigo-600 ring-2 ring-indigo-500/20" 
                          : "bg-slate-100 border-slate-200 text-slate-400"
                      }`}
                    >
                      {isPassed ? <Check size={12} /> : idx + 1}
                    </div>
                    <span className={`text-[9px] font-800 tracking-tight mt-2.5 leading-tight block ${
                      isActive ? "text-indigo-600 font-900" : isPassed ? "text-slate-800" : "text-slate-400"
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
            
            <div className="flex-1 bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-[10px] sm:text-xs text-indigo-400 min-h-[160px] max-h-[220px] overflow-y-auto flex flex-col gap-1.5 shadow-inner">
              <div className="text-slate-500 italic text-[9px] tracking-wider mb-1">
                --- CALTIMS EVENT TELEMETRY LOGS ---
              </div>
              {activeProject.logs.map((log, lIdx) => (
                <div key={lIdx} className="leading-relaxed">
                  <span className="text-slate-600">&gt;</span> {log}
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-1.5 text-indigo-400 animate-pulse mt-2">
                  <Loader2 size={12} className="animate-spin" />
                  <span>Processing step transition...</span>
                </div>
              )}
            </div>

            {/* Stage 3 Choice (Timesheet Approval) */}
            {activeProject.currentStage === 3 && !loading && (
              <div className="p-4 border border-indigo-200 bg-indigo-50/50 rounded-2xl flex flex-col gap-3 justify-center items-center text-center animate-fade-in">
                <h4 className="text-xs font-mono font-800 uppercase tracking-widest text-indigo-700">
                  Manager Approval Required
                </h4>
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleNextStage("Approved")}
                    className="btn bg-indigo-600 hover:bg-indigo-700 text-white text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 font-bold"
                  >
                    <CheckCircle2 size={14} />
                    Approve Timesheet
                  </button>
                  <button 
                    onClick={() => handleNextStage("Rejected")}
                    className="btn border border-red-200 bg-white text-red-600 hover:bg-red-50 text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 font-bold"
                  >
                    <X size={14} />
                    Reject Entries
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
                    Payslips Distributed to All Employees
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-600">
                    Calculations synced perfectly with submitted timesheets and approved leave balances. Deductions applied automatically.
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
                className="w-full sm:w-auto btn bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-800 py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
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
