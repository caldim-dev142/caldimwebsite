"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Zap, Shield, BarChart3, Cloud, Cpu, GitBranch } from "lucide-react";
import { FadeUp } from "../animations/Animations";

/* ─── Animated Hero SVG Dashboard ─────────────────────────────── */
const HeroDashboard: React.FC = () => {
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
        style={{ background: "rgba(7,27,52,0.7)", backdropFilter: "blur(12px)" }}
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
            <span className="text-white/50 text-xs font-mono">portal.caldim.software/dashboard</span>
          </div>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </div>
        </div>

        {/* Dashboard content */}
        <div className="flex" style={{ minHeight: 340 }}>
          {/* Sidebar */}
          <div className="w-44 border-r border-white/8 p-3 flex flex-col gap-1 shrink-0">
            <div className="flex items-center gap-2 px-2 py-1.5 mb-2">
              <div className="w-5 h-5 rounded bg-[var(--accent)] flex items-center justify-center">
                <span className="text-white text-xs font-bold">C</span>
              </div>
              <span className="text-white text-xs font-600">CALDIM Core</span>
            </div>
            {[
              { icon: BarChart3, label: "Dashboard", active: true },
              { icon: GitBranch, label: "Workflows", active: false },
              { icon: Cloud, label: "Cloud Ops", active: false },
              { icon: Shield, label: "Security", active: false },
              { icon: Cpu, label: "AI Engine", active: false },
              { icon: Zap, label: "Automation", active: false },
            ].map(({ icon: Icon, label, active }) => (
              <div
                key={label}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-all ${
                  active
                    ? "bg-[var(--accent)] text-white"
                    : "text-white/40 hover:text-white/70 hover:bg-white/5"
                }`}
              >
                <Icon size={12} />
                <span className="font-500">{label}</span>
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 p-4 flex flex-col gap-4">
            {/* Metric cards row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Active Projects", value: "24", delta: "+3", color: "var(--accent-light)" },
                { label: "System Uptime", value: "99.9%", delta: "SLA", color: "#10B981" },
                { label: "API Requests", value: "1.2M", delta: "/day", color: "#F59E0B" },
              ].map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="rounded-lg p-2.5"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="text-white/50 text-xs mb-1">{metric.label}</div>
                  <div className="text-white font-700 text-lg leading-none">{metric.value}</div>
                  <div className="text-xs mt-1" style={{ color: metric.color }}>{metric.delta}</div>
                </motion.div>
              ))}
            </div>

            {/* Activity chart (SVG sparkline) */}
            <div
              className="rounded-lg p-3 flex-1"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/70 text-xs font-600">System Activity</span>
                <span className="text-xs text-[var(--accent-light)] bg-[var(--accent)]/20 px-2 py-0.5 rounded-full">Live</span>
              </div>
              <svg viewBox="0 0 200 60" className="w-full h-14">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,50 C20,45 30,20 50,25 S80,10 100,15 S140,30 160,20 S190,5 200,8"
                  stroke="var(--accent-light)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M0,50 C20,45 30,20 50,25 S80,10 100,15 S140,30 160,20 S190,5 200,8 L200,60 L0,60 Z"
                  fill="url(#chartGrad)"
                />
                {/* Animated dot on chart */}
                <motion.circle
                  cx="160"
                  cy="20"
                  r="3"
                  fill="var(--accent-light)"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </svg>
            </div>

            {/* Live log feed */}
            <div
              className="rounded-lg p-3"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="text-white/60 text-xs font-600 mb-2">Live System Logs</div>
              <div className="flex flex-col gap-1.5">
                {[
                  { status: "AUTO-APPROVED", msg: "Procurement workflow triggered", color: "#10B981" },
                  { status: "SYNCED", msg: "Data pipeline completed (1.2M rows)", color: "var(--accent-light)" },
                  { status: "DEPLOYED", msg: "v2.4.1 pushed to production VPS", color: "#F59E0B" },
                ].map((log, i) => (
                  <motion.div
                    key={log.msg}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + i * 0.15 }}
                    className="flex items-center gap-2 text-xs"
                  >
                    <span
                      className="px-1.5 py-0.5 rounded text-white text-[10px] font-700 shrink-0"
                      style={{ background: `${log.color}30`, color: log.color }}
                    >
                      {log.status}
                    </span>
                    <span className="text-white/45 truncate">{log.msg}</span>
                  </motion.div>
                ))}
              </div>
            </div>
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
            <div className="text-white text-xs font-600">Enterprise Security</div>
            <div className="text-green-400 text-[11px]">ISO 27001 Ready</div>
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
            <div className="text-white text-xs font-600">AI-Powered</div>
            <div className="text-[var(--accent-light)] text-[11px]">Intelligent automation</div>
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
              className="inline-flex items-center gap-2 badge badge-accent mb-6 bg-blue-50 border border-blue-100 text-blue-600 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              CALDIM-DAS Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-900 text-[var(--navy)] tracking-tight mb-6 leading-tight"
            >
              Engineering Digital Solutions{" "}
              <span className="gradient-text">That Drive Business Growth</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-900 font-700 text-lg md:text-xl max-w-xl leading-relaxed mb-10 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-sm border border-slate-200"
            >
              CALDIM-DAS delivers enterprise software, AI solutions, cloud platforms, digital transformation services, and industry-focused technology solutions built for modern businesses.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/contact" className="btn btn-primary btn-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10 transition-all duration-200" id="hero-cta-primary">
                Book a Consultation
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
                { value: "1+", label: "Years Engineering" },
                { value: "15+", label: "Projects Delivered" },
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
