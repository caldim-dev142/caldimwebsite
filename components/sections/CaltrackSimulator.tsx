"use client";

import React, { useState } from "react";
import { 
  CheckCircle2, 
  Check, RefreshCw, Loader2, MapPin
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
    id: "ct1",
    name: "HVAC Repair - 402 West Ave",
    employee: "Tech: Alex Mercer",
    status: null,
    currentStage: 0,
    logs: ["System: CALTRACK Field Service initialized. Awaiting customer booking."]
  }
];

const stages = [
  { label: "1. Customer Books Online", action: "Online Portal" },
  { label: "2. Technician Assigned", action: "Smart Dispatch" },
  { label: "3. GPS Clock-In", action: "Location Verified" },
  { label: "4. Job Completed", action: "Digital Checklist" },
  { label: "5. Customer Rates Service", action: "SMS Feedback Link" },
  { label: "6. Payroll Auto-Calculated", action: "Instant Payroll" }
];

export const CaltrackSimulator: React.FC = () => {
  const [projects, setProjects] = useState<WorkflowProject[]>(initialProjects);
  const [selectedId] = useState<string>("ct1");
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
            newLogs.push("Customer: Selected HVAC repair service and preferred time slot.");
            newLogs.push("System: Booking confirmed through the self-service portal.");
          } else if (p.currentStage === 1) {
            newLogs.push("System: Analyzing real-time availability and location.");
            newLogs.push("Admin: Assigned field technician Alex Mercer to the job.");
          } else if (p.currentStage === 2) {
            newLogs.push("Technician: Arrived on-site and triggered clock-in.");
            newLogs.push("System: GPS coordinates verified for accountability.");
          } else if (p.currentStage === 3) {
            newLogs.push("Technician: Uploaded service photos and completed digital checklist.");
            newLogs.push("System: Service marked as completed.");
          } else if (p.currentStage === 4) {
            newLogs.push("System: Automated SMS feedback link dispatched to customer.");
            newLogs.push("Customer: Rated service 5-stars for quality and promptness.");
          } else if (p.currentStage === 5) {
            newLogs.push("System: Processing technician pay, overtime, and mileage.");
            newLogs.push("Payroll System: Reimbursements calculated. Payslip ready.");
            newLogs.push("System: Field service lifecycle completed.");
          } else if (p.currentStage === 6) {
            nextStage = 0;
            newLogs = ["System: Resetting pipeline for next service request."];
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
      case 0: return "Book Online";
      case 1: return "Assign Technician";
      case 2: return "Simulate Clock-In";
      case 3: return "Complete Job";
      case 4: return "Send SMS Feedback";
      case 5: return "Calculate Payroll";
      case 6: return "Reset Simulation";
      default: return "Next Step";
    }
  };

  return (
    <div className="p-6 md:p-8 bg-slate-50 h-full overflow-y-auto">
      <div className="text-center mb-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-900 text-slate-900 mb-1">
          See CALTRACK in Action
        </h2>
        <p className="text-xs text-slate-500 font-600">
          Click through the steps to see the Complete Field Service Lifecycle.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden min-h-[500px] flex flex-col">
        
        {/* Workspace */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600">
                <MapPin size={18} />
              </div>
              <div>
                <span className="text-[9px] font-mono font-700 text-slate-400 uppercase tracking-widest block leading-none mb-1">
                  Active Service Request
                </span>
                <h3 className="text-lg font-900 text-slate-900 leading-none">
                  {activeProject.name} • <span className="text-slate-500 text-xs font-700">{activeProject.employee}</span>
                </h3>
              </div>
            </div>
            <div className="text-xs font-mono font-800 text-orange-600 uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full border border-orange-100 self-start sm:self-center">
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
                          ? "bg-orange-600 border-orange-600 text-white" 
                          : isActive 
                          ? "bg-white border-orange-500 text-orange-600 ring-2 ring-orange-500/20" 
                          : "bg-slate-100 border-slate-200 text-slate-400"
                      }`}
                    >
                      {isPassed ? <Check size={12} /> : idx + 1}
                    </div>
                    <span className={`text-[9px] font-800 tracking-tight mt-2.5 leading-tight block ${
                      isActive ? "text-orange-600 font-900" : isPassed ? "text-slate-800" : "text-slate-400"
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
            
            <div className="flex-1 bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-[10px] sm:text-xs text-orange-400 min-h-[160px] max-h-[220px] overflow-y-auto flex flex-col gap-1.5 shadow-inner">
              <div className="text-slate-500 italic text-[9px] tracking-wider mb-1">
                --- CALTRACK EVENT LOGS ---
              </div>
              {activeProject.logs.map((log, lIdx) => (
                <div key={lIdx} className="leading-relaxed">
                  <span className="text-slate-600">&gt;</span> {log}
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-1.5 text-orange-400 animate-pulse mt-2">
                  <Loader2 size={12} className="animate-spin" />
                  <span>Processing step transition...</span>
                </div>
              )}
            </div>

            {/* Stage 6 (Dispatch Completion) */}
            {activeProject.currentStage === 6 && (
              <div className="p-5 border border-emerald-200 bg-emerald-50/50 rounded-2xl flex flex-col sm:flex-row items-center gap-4 animate-fade-in">
                <div className="w-16 h-16 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-800 uppercase tracking-widest text-emerald-700 mb-0.5">
                    Lifecycle Completed
                  </h4>
                  <h3 className="text-sm font-800 text-slate-900 mb-1">
                    Payroll & Reporting Finalized
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-600">
                    The field service journey is fully complete. GPS data, checklists, customer feedback, and automatic payslips are securely archived.
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
              className="w-full sm:w-auto btn bg-orange-600 hover:bg-orange-700 text-white text-xs font-800 py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
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
