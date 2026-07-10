"use client";

import React, { useState } from "react";
import { 
  User, CheckCircle2, Cpu, 
  Check, RefreshCw, IdCard, Loader2
} from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  role: string;
  score: string;
  experience: string;
  skills: string[];
  currentStage: number; // 0 to 3 (4 stages)
  logs: string[];
}

const initialCandidates: Candidate[] = [
  {
    id: "c1",
    name: "Rahul Sharma",
    role: "Senior Frontend Engineer",
    score: "94%",
    experience: "5 Years",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    currentStage: 0,
    logs: ["System: Resume uploaded to careers mailbox."]
  },
  {
    id: "c2",
    name: "Priya Nair",
    role: "Data Scientist",
    score: "91%",
    experience: "3 Years",
    skills: ["Python", "TensorFlow", "Pandas", "Scikit-Learn"],
    currentStage: 0,
    logs: ["System: Resume uploaded to careers mailbox."]
  },
  {
    id: "c3",
    name: "Aditya Patel",
    role: "DevOps Architect",
    score: "89%",
    experience: "4 Years",
    skills: ["AWS", "Docker", "Kubernetes", "GitHub Actions"],
    currentStage: 0,
    logs: ["System: Resume uploaded to careers mailbox."]
  }
];

const stages = [
  { label: "1. Screening", action: "Resume Ingest & AI Parse" },
  { label: "2. AI Assessment", action: "Adaptive voice interview" },
  { label: "3. Offer Placement", action: "Digital offer package" },
  { label: "4. Onboarding", action: "Corporate ID issued" }
];

export const RecruitmentSimulator: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [selectedId, setSelectedId] = useState<string>("c1");
  const [loading, setLoading] = useState<boolean>(false);

  const activeCandidate = candidates.find((c) => c.id === selectedId) || candidates[0];

  const handleNextStage = () => {
    setLoading(true);
    
    setTimeout(() => {
      setCandidates((prev) => 
        prev.map((c) => {
          if (c.id !== selectedId) return c;
          
          let nextStage = c.currentStage + 1;
          let newLogs = [...c.logs];

          if (c.currentStage === 0) {
            newLogs.push("AI Agent: Ingesting resume structure...");
            newLogs.push(`AI Agent: Parsed skills: [${c.skills.join(", ")}]. Fit Score: ${c.score}.`);
            newLogs.push("Recruiter: Shortslisted. Transitioned to Assessment stage.");
          } else if (c.currentStage === 1) {
            newLogs.push("AI Agent: Initiated proctored online voice assessment session.");
            newLogs.push("AI Agent: Interview Completed. Communication: 9.5/10. Technical: 90%. Passed.");
          } else if (c.currentStage === 2) {
            newLogs.push("Recruiter: Selection confirmed. Offer dispatched.");
            newLogs.push("Candidate: Digitally accepted offer contract terms.");
          } else if (c.currentStage === 3) {
            nextStage = 0;
            newLogs = ["System: Resetting journey simulation for test run."];
          }

          return {
            ...c,
            currentStage: nextStage,
            logs: newLogs
          };
        })
      );
      setLoading(false);
    }, 1200);
  };

  const getButtonText = () => {
    switch (activeCandidate.currentStage) {
      case 0: return "Run AI Resume Screening";
      case 1: return "Evaluate Voice Assessment";
      case 2: return "Send & Accept Offer Contract";
      case 3: return "Reset Candidate Simulation";
      default: return "Process Next Step";
    }
  };

  return (
    <div className="p-6 md:p-8 bg-slate-50">
      <div className="text-center mb-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-900 text-slate-900 mb-1">
          See CAL-RIMS in Action
        </h2>
        <p className="text-xs text-slate-500 font-600">
          Click candidates and trigger actions below to see the interactive candidate screening and onboarding engine live.
        </p>
      </div>

      {/* Console Box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden min-h-[500px] flex flex-col">
          
          {/* Workspace */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <User size={18} />
                </div>
                <div>
                  <span className="text-[9px] font-mono font-700 text-slate-400 uppercase tracking-widest block leading-none mb-1">
                    Active Workspace
                  </span>
                  <h3 className="text-lg font-900 text-slate-900 leading-none">
                    {activeCandidate.name} • <span className="text-slate-500 text-xs font-700">{activeCandidate.role}</span>
                  </h3>
                </div>
              </div>
              <div className="text-xs font-mono font-800 text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100 self-start sm:self-center">
                Stage: {stages[activeCandidate.currentStage].label.split(". ")[1]}
              </div>
            </div>

            {/* Timestepper */}
            <div className="py-6 border-b border-slate-100">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stages.map((stage, idx) => {
                  const isPassed = activeCandidate.currentStage > idx;
                  const isActive = activeCandidate.currentStage === idx;
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
                      <span className={`text-[10px] font-800 tracking-tight mt-2.5 leading-tight block ${
                        isActive ? "text-blue-600 font-900" : isPassed ? "text-slate-800" : "text-slate-400"
                      }`}>
                        {stage.label}
                      </span>
                      <span className="text-[8px] text-slate-400 font-600 block mt-0.5">{stage.action}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Output Panel */}
            <div className="flex-1 py-6 flex flex-col gap-6">
              
              <div className="flex-1 bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-[10px] sm:text-xs text-emerald-400 min-h-[160px] max-h-[220px] overflow-y-auto flex flex-col gap-1.5 shadow-inner">
                <div className="text-slate-500 italic text-[9px] tracking-wider mb-1">
                  --- CALRIMS EVENT TELEMETRY LOGS ---
                </div>
                {activeCandidate.logs.map((log, lIdx) => (
                  <div key={lIdx} className="leading-relaxed">
                    <span className="text-slate-600">&gt;</span> {log}
                  </div>
                ))}
                {loading && (
                  <div className="flex items-center gap-1.5 text-blue-400 animate-pulse">
                    <Loader2 size={12} className="animate-spin" />
                    <span>Processing stage transition...</span>
                  </div>
                )}
              </div>

              {activeCandidate.currentStage === 3 && (
                <div className="p-5 border border-emerald-200 bg-emerald-50/50 rounded-2xl flex flex-col sm:flex-row items-center gap-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <IdCard size={28} />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-800 uppercase tracking-widest text-emerald-700 mb-0.5">
                      Onboarded Complete
                    </h4>
                    <h3 className="text-sm font-800 text-slate-900 mb-1">
                      Digital Employee ID Issued
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-600">
                      Corporate ID Card generated matching verified candidate photo credentials. Employee registered in the HR Payroll register.
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Footer Control */}
            <div className="border-t border-slate-100 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[10px] text-slate-400 font-mono font-700">
                Step: {activeCandidate.currentStage + 1} of 4
              </span>
              <button
                onClick={handleNextStage}
                disabled={loading}
                className="w-full sm:w-auto btn btn-primary bg-blue-600 hover:bg-blue-700 text-white text-xs font-800 py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={13} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {activeCandidate.currentStage === 3 ? (
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
