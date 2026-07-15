"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp } from "@/components/animations/Animations";
import { CTASection } from "@/components/sections/CTA";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Play, Video, CheckCircle2, Activity, Layers, ChevronRight, Box
} from "lucide-react";
import { getIconComponent } from "@/utils/iconHelper";
import staticProducts from "@/data/products.json";

interface ProductItem {
  id: string;
  name: string;
  category: string;
  description: string;
  color: string;
  iconName: string;
  videoTagline: string;
  mediaTitle: string;
  architectureHighlight: string;
  metrics: string[];
  unsplashUrl: string;
  videoUrl: string;
}

export default function ProductsPage() {
  const [productsList, setProductsList] = useState<ProductItem[]>(staticProducts as ProductItem[]);
  const [selectedId, setSelectedId] = useState<string>("caltims");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/admin/products")
      .then(res => {
        if (res.ok) return res.json();
      })
      .then(data => {
        if (data && Array.isArray(data) && data.length > 0) {
          setProductsList(data);
          // If the selected product is not in the list, select the first one
          if (!data.some(p => p.id === selectedId)) {
            setSelectedId(data[0].id);
          }
        }
      })
      .catch(err => console.error("Error refreshing products list:", err));
  }, []);

  // Reset video playback on product change
  useEffect(() => {
    setIsPlaying(false);
  }, [selectedId]);

  const selectedProduct = productsList.find((p) => p.id === selectedId) || productsList[0];

  if (!selectedProduct) return null;

  const SelectedIcon = getIconComponent(selectedProduct.iconName);

  // Parse and render appropriate player
  const renderVideoPlayer = (url: string, title: string) => {
    if (!url) {
      // Fallback sample video
      return (
        <video 
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          controls
          autoPlay
          className="absolute inset-0 w-full h-full object-cover z-20"
        />
      );
    }

    const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
    if (isYouTube) {
      let embedUrl = url;
      if (url.includes("youtube.com/watch?v=")) {
        const vidId = url.split("v=")[1]?.split("&")[0];
        embedUrl = `https://www.youtube.com/embed/${vidId}?autoplay=1`;
      } else if (url.includes("youtu.be/")) {
        const vidId = url.split("youtu.be/")[1]?.split("?")[0];
        embedUrl = `https://www.youtube.com/embed/${vidId}?autoplay=1`;
      } else if (!url.includes("/embed/")) {
        embedUrl = `https://www.youtube.com/embed/${url}?autoplay=1`;
      }
      return (
        <iframe 
          src={embedUrl}
          title={title}
          className="absolute inset-0 w-full h-full border-0 z-20"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      );
    }

    // Direct MP4 link / local file URL
    const safeUrl = encodeURI(url);
    return (
      <video 
        src={safeUrl}
        controls
        autoPlay
        className="absolute inset-0 w-full h-full object-cover z-20"
      />
    );
  };

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Page Hero */}
        <section className="hero-bg py-24 md:py-32 pt-40 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(10,25,47,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(10,25,47,0.035)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          
          <div className="container-wide text-center relative z-10">
            <FadeUp>
              <div className="badge badge-navy mb-5 mx-auto inline-flex items-center gap-2 shadow-sm">
                <Video size={14} className="text-blue-500 animate-pulse" />
                <span>Interactive Split-Screen Command Center</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-900 text-[var(--navy)] tracking-tight mb-5">
                Our Enterprise Product Suite
              </h1>
              <p className="text-slate-600 font-medium text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
                No plain cards. Inspect our entire software division through our interactive side-by-side **Cinematic Video Stage** and technical matrix console below.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* 1. THE CINEMATIC SPLIT-SCREEN COMMAND CONSOLE (Zero Cards!) */}
        <section className="py-12 md:py-16 bg-[var(--navy)] text-white border-y border-white/10 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="container-wide relative z-10">
            
            <div className="grid lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Side: Dynamic Selector Panel (4 cols) */}
              <div className="lg:col-span-4 flex flex-col justify-between">
                
                <div className="flex flex-col gap-2.5 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {productsList.map((item) => {
                    const isSelected = item.id === selectedId;
                    const ItemIcon = getIconComponent(item.iconName);

                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedId(item.id)}
                        className={`w-full text-left p-4 rounded-2xl flex items-center justify-between border transition-all duration-300 group ${
                          isSelected 
                            ? "bg-white/10 border-white/20 shadow-lg" 
                            : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10"
                        }`}
                        style={{
                          borderLeft: isSelected ? `4px solid ${item.color}` : ""
                        }}
                      >
                        <div className="flex items-center gap-3 truncate">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
                            style={{ 
                              background: isSelected ? item.color : "rgba(255,255,255,0.05)",
                              color: isSelected ? "#fff" : item.color
                            }}
                          >
                            <ItemIcon size={18} />
                          </div>
                          <div className="truncate">
                            <div className="text-sm font-800 tracking-tight truncate">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-white/60 font-500 truncate">
                              {item.category}
                            </div>
                          </div>
                        </div>

                        <ChevronRight size={16} className={`shrink-0 transition-transform ${isSelected ? "translate-x-1 text-white" : "text-white/30 group-hover:text-white group-hover:translate-x-0.5"}`} />
                      </button>
                    );
                  })}
                </div>

              </div>

              {/* Right Side: Massive 16:9 Cinematic Video & Telemetry Stage (8 cols) */}
              <div className="lg:col-span-8 flex flex-col h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedProduct.id}
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="bg-[#020c1b] rounded-3xl border border-white/15 shadow-2xl p-6 md:p-8 flex flex-col justify-between h-full relative overflow-hidden"
                  >
                    {/* Top Accent Glow on active stage */}
                    <div 
                      className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] opacity-20 pointer-events-none transition-all duration-700"
                      style={{ background: selectedProduct.color }}
                    />

                    <div>
                      {/* Stage Header Info */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg border border-white/20"
                            style={{ background: selectedProduct.color }}
                          >
                            <SelectedIcon size={24} className="text-white" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono tracking-widest uppercase text-blue-400 block">
                              Active Stage Inspection • {selectedProduct.category}
                            </span>
                            <h3 className="text-2xl md:text-4xl font-900 text-white tracking-tight leading-none mt-1">
                              {selectedProduct.name}
                            </h3>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-800 font-mono">
                            HD Video Ready
                          </span>
                        </div>
                      </div>

                      {/* 16:9 CINEMATIC VIDEO & SCREEN RECORDING STAGE */}
                      <div className="relative w-full min-h-[320px] sm:min-h-[400px] md:min-h-[480px] rounded-2xl bg-[#0A192F] border border-white/20 shadow-2xl overflow-hidden mb-7 group flex flex-col items-center justify-center text-center p-6 md:p-10">
                        
                        {isPlaying ? (
                          renderVideoPlayer(selectedProduct.videoUrl, selectedProduct.mediaTitle)
                        ) : (
                          <>
                            {/* Hookup / Poster Image */}
                            <img 
                              src={`/images/${selectedProduct.id}-poster.jpg`}
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = selectedProduct.unsplashUrl;
                              }}
                              alt={`${selectedProduct.name} Preview`}
                              className="absolute inset-0 w-full h-full object-cover object-center opacity-60 group-hover:opacity-40 transition-all duration-700 pointer-events-none scale-105 group-hover:scale-100"
                            />
                            
                            {/* Blueprint Grid & Simulated Waveforms inside Video Box */}
                            <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none mix-blend-overlay" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020c1b] via-[#020c1b]/60 to-transparent opacity-70 pointer-events-none" />

                            {/* Animated Video Play Center Overlay - Perfectly Centered */}
                            <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto py-6 max-w-xl mx-auto w-full">
                              <motion.div 
                                onClick={() => setIsPlaying(true)}
                                whileHover={{ scale: 1.12 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.6)] cursor-pointer mb-4 border-2 border-white/30 group-hover:ring-4 group-hover:ring-blue-400/30 transition-all shrink-0"
                                title="Launch Video Walkthrough"
                              >
                                <Play size={28} className="fill-white ml-1" />
                              </motion.div>
                              
                              <span className="text-xs font-800 tracking-wider uppercase text-blue-300 font-mono mb-1.5 block">
                                [Interactive Video & Walkthrough Stage]
                              </span>
                              <h4 className="text-xl md:text-2xl font-900 text-white tracking-tight drop-shadow mb-2.5">
                                {selectedProduct.mediaTitle}
                              </h4>
                              <p className="text-xs md:text-sm text-slate-300 font-500 max-w-md mx-auto leading-relaxed">
                                {selectedProduct.videoTagline}. Click Play to watch live screen demo.
                              </p>
                            </div>
                          </>
                        )}

                        {/* Top corner live telemetry badge */}
                        <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] font-mono text-white/80 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 z-10">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                          <span>LIVE FEED PREVIEW • {selectedProduct.id.toUpperCase()}_ENG_STG</span>
                        </div>
                        <div className="absolute top-4 right-4 text-[10px] font-mono text-blue-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 z-10">
                          1080p 60FPS
                        </div>
                      </div>

                      {/* Technical Description & Architecture Highlight */}
                      <p className="text-slate-200 text-sm md:text-base font-medium leading-relaxed mb-6">
                        {selectedProduct.description}
                      </p>

                      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 flex items-start gap-3">
                        <Layers size={18} className="text-blue-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[11px] font-800 uppercase tracking-wider text-blue-300 font-mono block mb-0.5">
                            Architectural Blueprint & Engine Spec:
                          </span>
                          <span className="text-xs md:text-sm text-slate-300 font-600">
                            {selectedProduct.architectureHighlight}
                          </span>
                        </div>
                      </div>

                      {/* 4-Point Verified Operational Metrics */}
                      <div>
                        <span className="text-[11px] font-800 uppercase tracking-widest text-slate-400 font-mono mb-3 block">
                          Verified Operational Capabilities & Metrics:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {selectedProduct.metrics.map((metric, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs md:text-sm font-700 text-white bg-white/5 p-3 rounded-xl border border-white/5">
                              <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                              <span>{metric}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Stage Action CTA Footer */}
                    <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-xs text-slate-400 font-mono">
                        Need exact custom specifications for {selectedProduct.name}?
                      </div>
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Link
                          href={`/products/${selectedProduct.id}`}
                          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-3 rounded-xl text-xs font-800 tracking-wide transition-all shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95 group"
                        >
                          <span>Inspect Full {selectedProduct.name} Architecture</span>
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>

                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

          </div>
        </section>

        {/* 2. INDUSTRIAL HORIZONTAL TECHNICAL MATRIX TABLE (Quick View Spreadsheet - Zero Cards!) */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="badge badge-navy font-600 mx-auto mb-3 flex items-center gap-2">
                <Activity size={14} className="text-blue-600" />
                <span>Spreadsheet / Technical Register</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-900 text-[var(--navy)] tracking-tight mb-3">
                Enterprise Product Matrix Register
              </h2>
              <p className="text-slate-600 font-medium text-sm sm:text-base">
                Prefer scanning all specifications at a glance? Use our horizontal industrial matrix below to compare every engine in our software division.
              </p>
            </div>

            {/* Sleek Horizontal Spreadsheet Matrix Table */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[var(--navy)] text-white text-[11px] font-mono tracking-widest uppercase border-b border-slate-200">
                      <th className="py-4 px-6 font-800">Module ID</th>
                      <th className="py-4 px-6 font-800">Product Name</th>
                      <th className="py-4 px-6 font-800">Primary Domain / Category</th>
                      <th className="py-4 px-6 font-800">Core Capability & Metric</th>
                      <th className="py-4 px-6 font-800 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-700 text-[var(--navy)]">
                    {productsList.map((item) => {
                      const TIcon = getIconComponent(item.iconName);
                      const isSelected = item.id === selectedId;

                      return (
                        <tr 
                          key={item.id}
                          onClick={() => {
                            setSelectedId(item.id);
                            window.scrollTo({ top: 380, behavior: "smooth" });
                          }}
                          className={`hover:bg-blue-50/60 transition-colors cursor-pointer group ${
                            isSelected ? "bg-blue-50/80 font-800 border-l-4 border-blue-600" : ""
                          }`}
                        >
                          <td className="py-4 px-6 font-mono text-slate-400 text-xs">
                            #{item.id.toUpperCase()}
                          </td>
                          <td className="py-4 px-6 font-900 flex items-center gap-2.5">
                            <div 
                              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                              style={{ background: `${item.color}15`, color: item.color }}
                            >
                              <TIcon size={15} />
                            </div>
                            <span className="group-hover:text-blue-600 transition-colors">{item.name}</span>
                          </td>
                          <td className="py-4 px-6 text-slate-600 font-600">
                            {item.category}
                          </td>
                          <td className="py-4 px-6 text-slate-600 font-500 max-w-xs truncate" title={item.metrics[0]}>
                            {item.metrics[0]}
                          </td>
                          <td className="py-4 px-6 text-right">
                            <Link
                              href={`/products/${item.id}`}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-[var(--navy)] text-xs font-800 transition-all shadow-sm"
                            >
                              <span>Inspect</span>
                              <ArrowRight size={13} />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
