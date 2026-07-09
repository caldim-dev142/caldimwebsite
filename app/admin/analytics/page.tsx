"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp } from "@/components/animations/Animations";
import { BarChart3, Clock, Calendar, RefreshCw, LogOut, ArrowLeft, ArrowUpRight } from "lucide-react";

interface AnalyticsData {
  pageViews: Record<string, number>;
  events: Record<string, number>;
  logs: { timestamp: string; action: string; details?: string }[];
}

export default function AdminAnalyticsPage() {
  const router = useRouter();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authorized, setAuthorized] = useState(false);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/track");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        setError("Failed to fetch analytics logs.");
      }
    } catch (err) {
      setError("Network error fetching statistics data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth !== "true") {
      router.push("/admin/login");
    } else {
      setAuthorized(true);
      fetchAnalytics();
    }
  }, [router, fetchAnalytics]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("admin_auth");
    router.push("/admin/login");
  }, [router]);

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white font-mono text-xs">
        Checking authorisation logs...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-24 min-h-screen bg-[var(--background)]">
        <div className="container-wide py-12">
          
          {/* Header */}
          <FadeUp className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <div className="badge badge-accent mb-2">Internal Analytics</div>
              <h1 className="text-3xl font-800 text-[var(--navy)]">Enterprise Analytics Dashboard</h1>
              <p className="text-xs text-[var(--text-muted)]">Real-time tracking of route page views and event logs.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={fetchAnalytics} 
                className="btn btn-secondary btn-sm flex items-center gap-1.5"
                id="analytics-refresh-btn"
              >
                <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                Refresh
              </button>
              <button 
                onClick={handleLogout} 
                className="btn btn-navy btn-sm flex items-center gap-1.5"
                id="analytics-logout-btn"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          </FadeUp>

          {error && (
            <div className="p-4 mb-6 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-500">
              {error}
            </div>
          )}

          {data ? (
            <div className="grid lg:grid-cols-12 gap-8">
              
              {/* Metrics Grid left */}
              <div className="lg:col-span-8 flex flex-col gap-8">
                
                {/* Visual statistics */}
                <FadeUp className="card bg-white border border-[var(--border)] p-6">
                  <h2 className="text-sm font-800 text-[var(--navy)] mb-6 flex items-center gap-2">
                    <BarChart3 size={16} />
                    Page Views by Path
                  </h2>
                  <div className="flex flex-col gap-4">
                    {Object.entries(data.pageViews).map(([path, count]) => (
                      <div key={path} className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-xs font-600 text-[var(--text-primary)]">
                          <span>{path}</span>
                          <span className="text-[var(--accent)] font-bold">{count} views</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div 
                            className="h-full bg-[var(--accent)] rounded-full transition-all duration-500" 
                            style={{ 
                              width: `${Math.min(100, (count / Math.max(1, ...Object.values(data.pageViews))) * 100)}%` 
                            }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </FadeUp>

                {/* Event triggers counts */}
                <FadeUp className="card bg-white border border-[var(--border)] p-6">
                  <h2 className="text-sm font-800 text-[var(--navy)] mb-4 flex items-center gap-2">
                    <ArrowUpRight size={16} />
                    Goal Trigger Metrics
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
                      <div className="text-2xl font-800 text-[var(--navy)] mb-1">
                        {data.events.consultation_booked || 0}
                      </div>
                      <div className="text-[10px] font-700 text-[var(--text-muted)] uppercase tracking-wider">Consultations Booked</div>
                    </div>
                  </div>
                </FadeUp>
              </div>

              {/* Logs timeline right */}
              <div className="lg:col-span-4">
                <FadeUp className="card bg-white border border-[var(--border)] p-6 h-full flex flex-col">
                  <h2 className="text-sm font-800 text-[var(--navy)] mb-6 flex items-center gap-2">
                    <Clock size={16} />
                    Latest System Logs
                  </h2>
                  
                  <div className="flex-1 overflow-y-auto flex flex-col gap-4 max-h-[400px] pr-2">
                    {data.logs.length === 0 ? (
                      <div className="text-center py-12 text-xs text-[var(--text-muted)] italic">
                        No logs recorded yet.
                      </div>
                    ) : (
                      [...data.logs].reverse().map((log, idx) => (
                        <div key={idx} className="flex gap-3 text-[11px] pb-3 border-b border-slate-100 last:border-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0 mt-1.5" />
                          <div className="flex-1">
                            <div className="font-700 text-[var(--text-primary)]">{log.action}</div>
                            <div className="text-[var(--text-muted)] font-mono">{log.details}</div>
                            <div className="text-[9px] text-[var(--text-dim)] mt-0.5">
                              {new Date(log.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </FadeUp>
              </div>

            </div>
          ) : (
            <div className="text-center py-24 text-[var(--text-muted)] text-sm">
              Loading analytics dashboard data...
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
