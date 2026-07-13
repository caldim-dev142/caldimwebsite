"use client";

import React, { useState } from "react";
import { 
  CheckCircle2, 
  Check, RefreshCw, Loader2, PackageSearch, Truck
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
    id: "wh1",
    name: "Engine Packing to Dispatch",
    employee: "UNIT-E992: V8 Diesel Engine",
    status: null,
    currentStage: 0,
    logs: ["System: Warehouse Management system active. Awaiting unit scan."]
  }
];

const stages = [
  { label: "1. Scan Engine", action: "Barcode Scan" },
  { label: "2. Match Accessories", action: "System Match" },
  { label: "3. Assign Pallet", action: "Pallet Scan" },
  { label: "4. Print Label", action: "Auto Generate" },
  { label: "5. Load Shipment", action: "Validate Order" },
  { label: "6. Confirm Dispatch", action: "Sync ERP" }
];

export const WarehouseManagementSimulator: React.FC = () => {
  const [projects, setProjects] = useState<WorkflowProject[]>(initialProjects);
  const [selectedId] = useState<string>("wh1");
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
            newLogs.push("Operator: Scanned incoming engine's barcode at the workstation.");
            newLogs.push("System: Engine UNIT-E992 identified. Proceeding to matching.");
          } else if (p.currentStage === 1) {
            newLogs.push("System: Automatically verifying required accessories.");
            newLogs.push("System: Accessory match confirmed for V8 Diesel model.");
          } else if (p.currentStage === 2) {
            newLogs.push("Operator: Engine securely assigned to shipping pallet P-402.");
            newLogs.push("System: Pallet association locked.");
          } else if (p.currentStage === 3) {
            newLogs.push("System: Generating ZPL barcode data.");
            newLogs.push("Hardware: Workstation instantly printed label for the packed unit.");
          } else if (p.currentStage === 4) {
            newLogs.push("Operator: Scanned loaded pallet against outbound manifest.");
            newLogs.push("System: Order validation successful. Ready for dispatch.");
          } else if (p.currentStage === 5) {
            newLogs.push("System: Shipment finalized.");
            newLogs.push("ERP System: Enterprise databases updated automatically.");
            newLogs.push("System: Dispatch confirmed.");
          } else if (p.currentStage === 6) {
            nextStage = 0;
            newLogs = ["System: Resetting pipeline for next engine unit."];
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
      case 0: return "Scan Engine";
      case 1: return "Match Accessories";
      case 2: return "Assign to Pallet";
      case 3: return "Print ZPL Label";
      case 4: return "Validate Shipment";
      case 5: return "Confirm Dispatch";
      case 6: return "Reset Simulation";
      default: return "Next Step";
    }
  };

  return (
    <div className="p-6 md:p-8 bg-slate-50 h-full overflow-y-auto">
      <div className="text-center mb-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-900 text-slate-900 mb-1">
          See Warehouse Management in Action
        </h2>
        <p className="text-xs text-slate-500 font-600">
          Click through the steps to see the Engine Packing to Dispatch workflow.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden min-h-[500px] flex flex-col">
        
        {/* Workspace */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <PackageSearch size={18} />
              </div>
              <div>
                <span className="text-[9px] font-mono font-700 text-slate-400 uppercase tracking-widest block leading-none mb-1">
                  Active Dispatch Pipeline
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
                --- WAREHOUSE EVENT LOGS ---
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

            {/* Stage 6 (Dispatch Completion) */}
            {activeProject.currentStage === 6 && (
              <div className="p-5 border border-emerald-200 bg-emerald-50/50 rounded-2xl flex flex-col sm:flex-row items-center gap-4 animate-fade-in">
                <div className="w-16 h-16 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Truck size={28} />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-800 uppercase tracking-widest text-emerald-700 mb-0.5">
                    Dispatch Completed
                  </h4>
                  <h3 className="text-sm font-800 text-slate-900 mb-1">
                    Shipment Finalized & ERP Synced
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-600">
                    The engine has been successfully packed, labeled, and validated against the manifest. The enterprise database is now up to date.
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
          </div>

        </div>

      </div>
    </div>
  );
};
