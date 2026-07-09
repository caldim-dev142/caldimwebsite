"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp } from "@/components/animations/Animations";
import { Lock, Mail, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic admin credential validation
    if (username === "admin" && password === "caldim2026") {
      // Store a simple local storage flag for visual verification.
      // In production, use standard cookies and secure HTTP sessions.
      localStorage.setItem("admin_auth", "true");
      router.push("/admin/analytics");
    } else {
      setError("Invalid username or password. Please try again.");
      setLoading(false);
    }
  }, [username, password, router]);

  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="relative min-h-screen flex items-center justify-center bg-[var(--background)] hero-bg">
          <div className="container-narrow w-full max-w-sm px-6">
            <FadeUp>
              <div className="card bg-white border border-[var(--border)] p-8 shadow-xl text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--accent-muted)] flex items-center justify-center mx-auto mb-6 text-[var(--accent)]">
                  <Lock size={20} />
                </div>
                
                <h1 className="text-xl font-800 text-[var(--navy)] mb-2">Admin Portal Login</h1>
                <p className="text-xs text-[var(--text-muted)] mb-6">Enter credentials to access the analytics views dashboard.</p>

                {error && (
                  <div className="p-3 mb-4 rounded bg-red-50 border border-red-200 text-red-600 text-[11px] font-600">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="text-[11px] font-700 text-[var(--text-secondary)] uppercase tracking-wider">Username</label>
                    <input
                      type="text"
                      id="username"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="admin"
                      className="text-xs px-3 py-2.5 rounded-lg border border-[var(--border)] bg-slate-50 focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-[11px] font-700 text-[var(--text-secondary)] uppercase tracking-wider">Password</label>
                    <input
                      type="password"
                      id="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="text-xs px-3 py-2.5 rounded-lg border border-[var(--border)] bg-slate-50 focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full justify-center flex items-center gap-2 mt-2"
                    id="admin-login-submit"
                  >
                    {loading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>
              </div>
            </FadeUp>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
