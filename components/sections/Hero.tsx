"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Zap, Shield, BarChart3, Cpu, GitBranch } from "lucide-react";
import { FadeUp } from "../animations/Animations";

/* ─── Animated Hero SVG Dashboard ─────────────────────────────── */
const HeroDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<string>("Dashboard");

  const navItems = [
    { icon: BarChart3, label: "Dashboard", id: "Dashboard" },
    { icon: GitBranch, label: "Workflows", id: "Workflows" },
    { icon: Shield, label: "Security", id: "Security" },
    { icon: Cpu, label: "AI Engine", id: "AI Engine" },
    { icon: Zap, label: "Automation", id: "Automation" },
  ];

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Outer glow */}
      <div className="absolute inset-0 bg-[var(--accent)] opacity-10 blur-3xl rounded-3xl scale-95" />

      {/* Browser frame */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl"
        style={{ background: "rgba(7,27,52,0.85)", backdropFilter: "blur(16px)" }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10" style={{ background: "rgba(255,255,255,0.04)" }}>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-400/80" />
          </div>
          <div className="flex-1 mx-4 flex items-center gap-1.5 bg-white/8 rounded-md px-3 py-1">
            <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/60 text-xs font-mono transition-all duration-300">
              portal.caldim.software/{activeTab.toLowerCase().replace(/\s+/g, "-")}
            </span>
          </div>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </div>
        </div>

        {/* Dashboard content */}
        <div className="flex" style={{ minHeight: 370 }}>
          {/* Sidebar */}
          <div className="w-44 border-r border-white/10 p-3 flex flex-col gap-1.5 shrink-0 bg-white/[0.02]">
            <div className="flex items-center gap-2 px-2 py-1.5 mb-2">
              <div className="w-5 h-5 rounded bg-[var(--accent)] flex items-center justify-center shadow-sm shadow-[var(--accent)]/50">
                <span className="text-white text-xs font-bold">C</span>
              </div>
              <span className="text-white text-xs font-700 tracking-wide">CALDIM Core</span>
            </div>
            {navItems.map(({ icon: Icon, label, id }) => {
              const active = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  type="button"
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/30 font-600 scale-[1.02]"
                      : "text-white/50 hover:text-white/85 hover:bg-white/8 font-500"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={13} className={active ? "text-white" : "text-white/60"} />
                    <span>{label}</span>
                  </div>
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm shadow-white animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Main content */}
          <div className="flex-1 p-4 flex flex-col gap-3.5 overflow-hidden">
            {activeTab === "Dashboard" && (
              <motion.div
                key="Dashboard"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-3.5 h-full"
              >
                {/* Metric cards row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Agent Autonomy", value: "94.2%", delta: "Autonomous Fleet", color: "var(--accent-light)" },
                    { label: "Inference Speed", value: "185ms", delta: "Gemini-Flash Core", color: "#10B981" },
                    { label: "Orchestrated Tasks", value: "3.4M", delta: "Completed today", color: "#F59E0B" },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-lg p-2.5 transition-all hover:bg-white/8"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <div className="text-white/50 text-[11px] mb-1">{metric.label}</div>
                      <div className="text-white font-700 text-lg leading-none">{metric.value}</div>
                      <div className="text-[10px] mt-1 font-600" style={{ color: metric.color }}>{metric.delta}</div>
                    </div>
                  ))}
                </div>

                {/* Activity chart (SVG sparkline) */}
                <div
                  className="rounded-lg p-3 flex-1 flex flex-col justify-between"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80 text-xs font-700 flex items-center gap-1.5">
                      <BarChart3 size={13} className="text-[var(--accent-light)]" />
                      AI Token Inference Velocity
                    </span>
                    <span className="text-[10px] font-700 text-[#10B981] bg-[#10B981]/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                      Live Feed
                    </span>
                  </div>
                  <svg viewBox="0 0 200 50" className="w-full h-14">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,42 C20,38 30,18 50,22 S80,10 100,15 S140,28 160,18 S190,5 200,8"
                      stroke="var(--accent-light)"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0,42 C20,38 30,18 50,22 S80,10 100,15 S140,28 160,18 S190,5 200,8 L200,50 L0,50 Z"
                      fill="url(#chartGrad)"
                    />
                    <motion.circle
                      cx="160"
                      cy="18"
                      r="3.5"
                      fill="var(--accent-light)"
                      animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </svg>
                </div>

                {/* Live log feed */}
                <div
                  className="rounded-lg p-3"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="text-white/70 text-[11px] font-700 mb-2 flex items-center justify-between">
                    <span>Recent Agentic Operations</span>
                    <span className="text-white/40 font-mono text-[9px]">UTC 14:28:09</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { status: "AGENT CALBUY", msg: "Negotiated 12% saving with steel supplier", color: "#10B981" },
                      { status: "AGENT CALRIMS", msg: "Scanned 1,240 resumes & invited 3 leads to screening", color: "var(--accent-light)" },
                      { status: "AGENT CALTIMS", msg: "Flagged shift anomaly & updated payroll profile", color: "#F59E0B" },
                    ].map((log) => (
                      <div key={log.msg} className="flex items-center gap-2 text-[11px]">
                        <span
                          className="px-1.5 py-0.5 rounded text-white text-[9px] font-800 shrink-0 tracking-wider"
                          style={{ background: `${log.color}30`, color: log.color, border: `1px solid ${log.color}40` }}
                        >
                          {log.status}
                        </span>
                        <span className="text-white/60 truncate">{log.msg}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "Workflows" && (
              <motion.div
                key="Workflows"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-3.5 h-full"
              >
                {/* Metric cards row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Active Pipelines", value: "18", delta: "4 running live", color: "var(--accent-light)" },
                    { label: "Time Saved", value: "4,280h", delta: "+24% vs last mo", color: "#10B981" },
                    { label: "Success Rate", value: "99.8%", delta: "0 failed jobs", color: "#A855F7" },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-lg p-2.5"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <div className="text-white/50 text-[11px] mb-1">{metric.label}</div>
                      <div className="text-white font-700 text-lg leading-none">{metric.value}</div>
                      <div className="text-[10px] mt-1 font-600" style={{ color: metric.color }}>{metric.delta}</div>
                    </div>
                  ))}
                </div>

                {/* Workflow Pipeline Diagram */}
                <div
                  className="rounded-lg p-3 flex-1 flex flex-col justify-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-white/80 text-xs font-700 flex items-center gap-1.5">
                      <GitBranch size={13} className="text-[#A855F7]" />
                      Live Automation Pipeline
                    </span>
                    <span className="text-[10px] font-700 text-[#A855F7] bg-[#A855F7]/20 px-2 py-0.5 rounded-full">
                      Automated Flow
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 items-center text-center">
                    <div className="bg-white/8 border border-white/12 rounded-md p-2 flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mb-1 text-xs font-bold">1</div>
                      <span className="text-white font-600 text-[11px]">Webhook Trigger</span>
                      <span className="text-white/40 text-[9px] mt-0.5">Instant • 12ms</span>
                    </div>
                    <div className="bg-white/8 border border-white/12 rounded-md p-2 flex flex-col items-center relative">
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mb-1 text-xs font-bold">2</div>
                      <span className="text-white font-600 text-[11px]">AI Classification</span>
                      <span className="text-white/40 text-[9px] mt-0.5">Gemini • 85ms</span>
                    </div>
                    <div className="bg-white/8 border border-white/12 rounded-md p-2 flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mb-1 text-xs font-bold">3</div>
                      <span className="text-white font-600 text-[11px]">ERP Auto-Sync</span>
                      <span className="text-white/40 text-[9px] mt-0.5">Validated • 45ms</span>
                    </div>
                  </div>
                </div>

                {/* Recent Workflow Runs */}
                <div
                  className="rounded-lg p-3"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="text-white/70 text-[11px] font-700 mb-2">Active Workflow Execution</div>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { name: "Invoicing Automation #4928", status: "SUCCESS", desc: "142 invoices processed", color: "#10B981" },
                      { name: "Lead Routing AI #4927", status: "RUNNING", desc: "Classifying batch (38 leads)", color: "var(--accent-light)" },
                      { name: "Inventory Threshold Alert #4926", status: "COMPLETED", desc: "PO #9912 generated", color: "#A855F7" },
                    ].map((flow) => (
                      <div key={flow.name} className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-2 truncate">
                          <span
                            className="px-1.5 py-0.5 rounded text-white text-[9px] font-800 tracking-wider shrink-0"
                            style={{ background: `${flow.color}30`, color: flow.color, border: `1px solid ${flow.color}40` }}
                          >
                            {flow.status}
                          </span>
                          <span className="text-white font-600 truncate">{flow.name}</span>
                        </div>
                        <span className="text-white/45 text-[10px] shrink-0">{flow.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "Security" && (
              <motion.div
                key="Security"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-3.5 h-full"
              >
                {/* Metric cards row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Threat Score", value: "A+", delta: "99/100 Security Rating", color: "#10B981" },
                    { label: "Active Firewall", value: "WAF+", delta: "Blocking 142 req/m", color: "var(--accent-light)" },
                    { label: "Compliance", value: "SOC 2", delta: "ISO 27001 Certified", color: "#A855F7" },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-lg p-2.5"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <div className="text-white/50 text-[11px] mb-1">{metric.label}</div>
                      <div className="text-white font-700 text-lg leading-none">{metric.value}</div>
                      <div className="text-[10px] mt-1 font-600" style={{ color: metric.color }}>{metric.delta}</div>
                    </div>
                  ))}
                </div>

                {/* Security Protection Status */}
                <div
                  className="rounded-lg p-3 flex-1"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-white/80 text-xs font-700 flex items-center gap-1.5">
                      <Shield size={13} className="text-[#10B981]" />
                      Real-Time Intrusion & Threat Defense
                    </span>
                    <span className="text-[10px] font-700 text-[#10B981] bg-[#10B981]/20 px-2 py-0.5 rounded-full">
                      Zero Breaches
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { rule: "WAF Rule #104", action: "BLOCKED", desc: "SQL injection attempt intercepted from IP 192.168.x.x", color: "#EF4444" },
                      { rule: "Zero-Trust IAM", action: "VERIFIED", desc: "MFA challenge completed for DevOps admin session", color: "#10B981" },
                      { rule: "Vulnerability Scan", action: "PASSED", desc: "Automated daily dependency auditing passed cleanly", color: "var(--accent-light)" },
                    ].map((sec) => (
                      <div key={sec.rule} className="flex items-center gap-2 text-[11px] bg-white/[0.03] p-2 rounded border border-white/5">
                        <span
                          className="px-1.5 py-0.5 rounded text-white text-[9px] font-800 shrink-0 tracking-wider"
                          style={{ background: `${sec.color}30`, color: sec.color, border: `1px solid ${sec.color}40` }}
                        >
                          {sec.action}
                        </span>
                        <div className="truncate">
                          <span className="text-white font-600 mr-1.5">{sec.rule}:</span>
                          <span className="text-white/50 text-[10px]">{sec.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Encryption badge */}
                <div
                  className="rounded-lg p-3 flex items-center justify-between"
                  style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#10B981]/20 flex items-center justify-center text-[#10B981]">
                      <Shield size={15} />
                    </div>
                    <div>
                      <div className="text-white font-700 text-[11px]">End-to-End Enterprise Encryption</div>
                      <div className="text-[#10B981] text-[10px]">256-bit AES data-at-rest & TLS 1.3 in-transit active</div>
                    </div>
                  </div>
                  <span className="text-xs text-[#10B981] font-800 px-2 py-0.5 bg-[#10B981]/20 rounded">SECURE</span>
                </div>
              </motion.div>
            )}

            {activeTab === "AI Engine" && (
              <motion.div
                key="AI Engine"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-3.5 h-full"
              >
                {/* Metric cards row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Active Models", value: "Gemini 3.1", delta: "Fine-tuned & Local", color: "var(--accent-light)" },
                    { label: "Avg Response", value: "180 ms", delta: "High-throughput mode", color: "#10B981" },
                    { label: "Tokens Processed", value: "4.8M", delta: "+18% speedup today", color: "#F59E0B" },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-lg p-2.5"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <div className="text-white/50 text-[11px] mb-1">{metric.label}</div>
                      <div className="text-white font-700 text-lg leading-none">{metric.value}</div>
                      <div className="text-[10px] mt-1 font-600" style={{ color: metric.color }}>{metric.delta}</div>
                    </div>
                  ))}
                </div>

                {/* AI Agents & Models Pipeline */}
                <div
                  className="rounded-lg p-3 flex-1"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-white/80 text-xs font-700 flex items-center gap-1.5">
                      <Cpu size={13} className="text-[var(--accent-light)]" />
                      Autonomous AI Agents & Inferencing
                    </span>
                    <span className="text-[10px] font-700 text-[var(--accent-light)] bg-[var(--accent)]/30 px-2 py-0.5 rounded-full">
                      Neural Core v3
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      { agent: "DocuExtract Agent v2.1", task: "Extracting unstructured PDF invoices to structured JSON schema", status: "ACTIVE", color: "var(--accent-light)" },
                      { agent: "Predictive Maintenance AI", task: "Monitoring live IoT telemetry streams for anomaly signatures", status: "RUNNING", color: "#10B981" },
                      { agent: "Customer NLP Router", task: "Classifying & auto-routing support tickets (98.4% accuracy)", status: "ONLINE", color: "#A855F7" },
                    ].map((item) => (
                      <div key={item.agent} className="flex items-center justify-between bg-white/5 rounded px-2.5 py-1.5 border border-white/8">
                        <div className="truncate pr-2">
                          <div className="text-white font-600 text-[11px]">{item.agent}</div>
                          <div className="text-white/50 text-[10px] truncate">{item.task}</div>
                        </div>
                        <span className="text-[9px] font-800 px-1.5 py-0.5 rounded shrink-0" style={{ background: `${item.color}25`, color: item.color, border: `1px solid ${item.color}40` }}>
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vector Database status */}
                <div
                  className="rounded-lg p-3 flex items-center justify-between"
                  style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-white font-600 text-[11px]">Real-Time Vector Embedding Index Active</span>
                  </div>
                  <span className="text-blue-400 font-700 text-[10px]">Sub-10ms similarity search</span>
                </div>
              </motion.div>
            )}

            {activeTab === "Automation" && (
              <motion.div
                key="Automation"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-3.5 h-full"
              >
                {/* Metric cards row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Active RPA Bots", value: "32 Bots", delta: "Working 24/7 autonomous", color: "var(--accent-light)" },
                    { label: "Tasks Automated", value: "14.2K", delta: "/ day without manual effort", color: "#10B981" },
                    { label: "ROI Efficiency", value: "12x", delta: "Verified cost savings", color: "#A855F7" },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-lg p-2.5"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <div className="text-white/50 text-[11px] mb-1">{metric.label}</div>
                      <div className="text-white font-700 text-lg leading-none">{metric.value}</div>
                      <div className="text-[10px] mt-1 font-600" style={{ color: metric.color }}>{metric.delta}</div>
                    </div>
                  ))}
                </div>

                {/* Robotic Process & Integration Tasks */}
                <div
                  className="rounded-lg p-3 flex-1"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-white/80 text-xs font-700 flex items-center gap-1.5">
                      <Zap size={13} className="text-[#F59E0B]" />
                      Robotic Process & Integration Bots
                    </span>
                    <span className="text-[10px] font-700 text-[#F59E0B] bg-[#F59E0B]/20 px-2 py-0.5 rounded-full">
                      Zero Human Error
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      { name: "SAP to Salesforce Sync Bot", detail: "Synced 450 customer accounts in last 5 mins", status: "SUCCESS", color: "#10B981" },
                      { name: "Payroll & Timesheet Reconciler", detail: "Scheduled weekly run every Friday 18:00 UTC", status: "SCHEDULED", color: "var(--accent-light)" },
                      { name: "Customer Onboarding Auto-Mail", detail: "Sent welcome kit & portal credentials to 14 users", status: "COMPLETED", color: "#A855F7" },
                    ].map((bot) => (
                      <div key={bot.name} className="flex items-center justify-between bg-white/5 rounded px-2.5 py-1.5 border border-white/8">
                        <div className="truncate pr-2">
                          <div className="text-white font-600 text-[11px]">{bot.name}</div>
                          <div className="text-white/50 text-[10px] truncate">{bot.detail}</div>
                        </div>
                        <span className="text-[9px] font-800 px-1.5 py-0.5 rounded shrink-0" style={{ background: `${bot.color}25`, color: bot.color, border: `1px solid ${bot.color}40` }}>
                          {bot.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Autonomous processing card */}
                <div
                  className="rounded-lg p-3 flex items-center justify-between"
                  style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}
                >
                  <div className="flex items-center gap-2">
                    <Zap size={14} className="text-[#F59E0B]" />
                    <span className="text-white font-700 text-[11px]">Continuous Autonomous Execution Mode</span>
                  </div>
                  <span className="text-[#F59E0B] font-700 text-[10px]">100% Unattended</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Floating cards */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute -left-20 top-12 hidden lg:block z-20"
        style={{ animation: "float 5s ease-in-out infinite" }}
      >
        <div
          className="rounded-xl px-4 py-3 flex items-center gap-3 shadow-xl border border-white/12 backdrop-blur-md"
          style={{
            background: "rgba(7,27,52,0.9)",
          }}
        >
          <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
            <Shield size={14} className="text-green-400" />
          </div>
          <div>
            <div className="text-white text-xs font-600">94.2% Autonomy</div>
            <div className="text-green-400 text-[11px]">Agentic Workflow Fleet</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="absolute -right-18 bottom-20 hidden lg:block z-20"
        style={{ animation: "float 6s ease-in-out 1s infinite" }}
      >
        <div
          className="rounded-xl px-4 py-3 flex items-center gap-3 shadow-xl border border-white/12 backdrop-blur-md"
          style={{
            background: "rgba(7,27,52,0.9)",
          }}
        >
          <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/20 flex items-center justify-center">
            <Zap size={14} className="text-[var(--accent-light)]" />
          </div>
          <div>
            <div className="text-white text-xs font-600">Gemini-Flash Core</div>
            <div className="text-[var(--accent-light)] text-[11px]">Sub-185ms Inference</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ─── Hero Section ─────────────────────────────────────────────── */
export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden hero-bg pt-16 lg:pt-20"
      aria-label="Hero section"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Horizontal color-graded glow based on our theme */}
      <div className="absolute top-0 inset-x-0 h-[400px] pointer-events-none overflow-hidden z-0">
        {/* Center Blue Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-500/10 rounded-full blur-[80px]" />
        {/* Left Indigo/Purple Glow */}
        <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[250px] bg-indigo-500/8 rounded-full blur-[60px]" />
        {/* Right Cyan Glow */}
        <div className="absolute top-0 right-1/4 translate-x-1/2 w-[500px] h-[250px] bg-cyan-400/8 rounded-full blur-[60px]" />
      </div>

      {/* Spotlights */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, var(--accent) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, #60a5fa 0%, transparent 70%)",
        }}
      />

      <div className="container-wide relative z-10 py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* Left: Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-start gap-1.5 mb-6"
            >
              {/* Ornamental flourish design element */}
              <div className="flex items-center gap-1.5 text-blue-500/30">
                <div className="w-6 h-px bg-current" />
                <span className="text-[8px]">✦</span>
                <div className="w-6 h-px bg-current" />
              </div>
              <span className="text-[10px] font-700 tracking-wider text-blue-600 uppercase">
                Enterprise Digital Automation Suite
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 badge badge-accent mb-6 bg-blue-50/90 border border-blue-200/80 text-blue-700 px-4 py-1.5 rounded-full shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="font-800 tracking-wide">CALDIM • DAS</span>
              <span className="text-slate-300">|</span>
              <span className="font-600 text-slate-700">Digitalization & Automation Solutions</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-900 text-[var(--navy)] tracking-tight mb-6 leading-tight"
            >
              Next-Generation Software & AI{" "}
              <span className="gradient-text">That Drives Business Growth</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-900 font-700 text-lg md:text-xl max-w-xl leading-relaxed mb-10 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-sm border border-slate-200"
            >
              <strong className="text-blue-700 font-800">CALDIM-DAS (Digitalization & Automation Solutions)</strong> delivers enterprise software, AI solutions and industry-focused technology solutions built for modern businesses.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/contact" className="btn btn-primary btn-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10 transition-all duration-200" id="hero-cta-primary">
                Schedule a Demo
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/services"
                className="btn btn-secondary btn-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all duration-200"
                id="hero-cta-secondary"
              >
                Explore Our Services
                <ChevronRight size={18} />
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-3 gap-6"
            >
              {[
                { value: "1+", label: "Years" },
                { value: "15+", label: "Products" },
                { value: "10+", label: "Enterprise Products" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-3xl font-900 text-[var(--navy)] mb-1">{value}</div>
                  <div className="text-slate-900 font-700 text-xs md:text-sm">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Dashboard visual */}
          <div className="relative">
            <HeroDashboard />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-slate-400 text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-0.5 h-8 bg-gradient-to-b from-slate-300 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
