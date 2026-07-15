"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp } from "@/components/animations/Animations";
import { 
  BarChart3, 
  Clock, 
  RefreshCw, 
  LogOut, 
  ArrowUpRight, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Settings, 
  Eye, 
  FileText,
  Play,
  Layers,
  Sparkles
} from "lucide-react";

interface AnalyticsData {
  pageViews: Record<string, number>;
  events: Record<string, number>;
  logs: { timestamp: string; action: string; details?: string }[];
}

interface FeatureItem {
  title: string;
  desc: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  contents: string;
  color: string;
  iconName: string;
  videoTagline: string;
  mediaTitle: string;
  architectureHighlight: string;
  metrics: string[];
  unsplashUrl: string;
  videoUrl: string;
  capabilities: string[];
  features: FeatureItem[];
  whyChoose: FeatureItem[];
}

const DEFAULT_PRODUCT_TEMPLATE: Product = {
  id: "",
  name: "",
  category: "",
  tagline: "",
  description: "",
  contents: "",
  color: "#3b82f6",
  iconName: "Package",
  videoTagline: "Watch product overview & system demo walkthrough",
  mediaTitle: "Interactive Production Management Console",
  architectureHighlight: "Sub-second verified ledger validation routing schema.",
  metrics: ["Metric One Details", "Metric Two Details", "Metric Three Details", "Metric Four Details"],
  unsplashUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1920&auto=format&fit=crop",
  videoUrl: "",
  capabilities: ["Planned Capability One", "Planned Capability Two"],
  features: [
    { title: "Core Feature Title", desc: "Detailed description of core feature mechanics." }
  ],
  whyChoose: [
    { title: "Business Advantage Title", desc: "Description of the operational ROI advantage." }
  ]
};

export default function AdminAnalyticsPage() {
  const router = useRouter();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authorized, setAuthorized] = useState(false);

  // Tabs state: "analytics" | "products"
  const [activeTab, setActiveTab] = useState<"analytics" | "products">("analytics");

  // Products manager state
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

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

  const fetchProducts = useCallback(async () => {
    setProductsLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      if (res.ok) {
        const json = await res.json();
        setProducts(json);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setProductsLoading(false);
    }
  }, []);

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth !== "true") {
      router.push("/admin/login");
    } else {
      setAuthorized(true);
      fetchAnalytics();
      fetchProducts();
    }
  }, [router, fetchAnalytics, fetchProducts]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("admin_auth");
    router.push("/admin/login");
  }, [router]);

  // Products CRUD actions
  const handleEditProduct = (prod: Product) => {
    setEditingProduct(JSON.parse(JSON.stringify(prod))); // Deep clone
    setIsCreatingNew(false);
    setSaveError(null);
    setSaveSuccess(false);
  };

  const handleCreateProduct = () => {
    setEditingProduct({ ...DEFAULT_PRODUCT_TEMPLATE });
    setIsCreatingNew(true);
    setSaveError(null);
    setSaveSuccess(false);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setIsCreatingNew(false);
  };

  const handleInputChange = (field: keyof Product, value: any) => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      [field]: value
    });
  };

  const handleMetricChange = (index: number, val: string) => {
    if (!editingProduct) return;
    const newMetrics = [...editingProduct.metrics];
    newMetrics[index] = val;
    setEditingProduct({ ...editingProduct, metrics: newMetrics });
  };

  // Capabilities helper
  const handleCapabilityChange = (index: number, val: string) => {
    if (!editingProduct) return;
    const newCaps = [...editingProduct.capabilities];
    newCaps[index] = val;
    setEditingProduct({ ...editingProduct, capabilities: newCaps });
  };

  const addCapability = () => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      capabilities: [...editingProduct.capabilities, "New Capability Bullet"]
    });
  };

  const removeCapability = (index: number) => {
    if (!editingProduct) return;
    const newCaps = editingProduct.capabilities.filter((_, idx) => idx !== index);
    setEditingProduct({ ...editingProduct, capabilities: newCaps });
  };

  // Features helper
  const handleFeatureChange = (index: number, field: keyof FeatureItem, val: string) => {
    if (!editingProduct) return;
    const newFeatures = [...editingProduct.features];
    newFeatures[index] = {
      ...newFeatures[index],
      [field]: val
    };
    setEditingProduct({ ...editingProduct, features: newFeatures });
  };

  const addFeature = () => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      features: [...editingProduct.features, { title: "Feature Title", desc: "Feature Description" }]
    });
  };

  const removeFeature = (index: number) => {
    if (!editingProduct) return;
    const newFeatures = editingProduct.features.filter((_, idx) => idx !== index);
    setEditingProduct({ ...editingProduct, features: newFeatures });
  };

  // WhyChoose helper
  const handleWhyChooseChange = (index: number, field: keyof FeatureItem, val: string) => {
    if (!editingProduct) return;
    const newWhy = [...editingProduct.whyChoose];
    newWhy[index] = {
      ...newWhy[index],
      [field]: val
    };
    setEditingProduct({ ...editingProduct, whyChoose: newWhy });
  };

  const addWhyChoose = () => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      whyChoose: [...editingProduct.whyChoose, { title: "Benefit Title", desc: "Benefit Description" }]
    });
  };

  const removeWhyChoose = (index: number) => {
    if (!editingProduct) return;
    const newWhy = editingProduct.whyChoose.filter((_, idx) => idx !== index);
    setEditingProduct({ ...editingProduct, whyChoose: newWhy });
  };

  // Submit Save
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setSaveLoading(true);
    setSaveError(null);
    setSaveSuccess(false);

    // Validate Slug ID is filled and alphanumeric
    if (!editingProduct.id.trim() || !/^[a-zA-Z0-9_-]+$/.test(editingProduct.id)) {
      setSaveError("Slug ID must be filled and consist only of letters, numbers, hyphens or underscores.");
      setSaveLoading(false);
      return;
    }

    let updatedList = [...products];
    if (isCreatingNew) {
      // Check for duplicate ID
      if (products.some(p => p.id === editingProduct.id)) {
        setSaveError(`A product with Slug ID "${editingProduct.id}" already exists.`);
        setSaveLoading(false);
        return;
      }
      updatedList.push(editingProduct);
    } else {
      updatedList = products.map(p => p.id === editingProduct.id ? editingProduct : p);
    }

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: "caldim2026",
          products: updatedList
        })
      });

      if (res.ok) {
        setSaveSuccess(true);
        setProducts(updatedList);
        setTimeout(() => {
          setEditingProduct(null);
          setIsCreatingNew(false);
          setSaveSuccess(false);
        }, 1200);
      } else {
        const errJson = await res.json();
        setSaveError(errJson.error || "Failed to update product details.");
      }
    } catch (err) {
      setSaveError("Connection error while submitting product data.");
    } finally {
      setSaveLoading(false);
    }
  };

  // Delete product action
  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm(`Are you absolutely sure you want to delete product "${id}"? This cannot be undone.`)) {
      return;
    }

    const updatedList = products.filter(p => p.id !== id);

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: "caldim2026",
          products: updatedList
        })
      });

      if (res.ok) {
        setProducts(updatedList);
        alert("Product deleted successfully.");
      } else {
        alert("Failed to delete product.");
      }
    } catch (err) {
      alert("Network error deleting product.");
    }
  };

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
              <div className="badge badge-accent mb-2">CALDIM • DAS Command Control</div>
              <h1 className="text-3xl font-900 text-[var(--navy)] tracking-tight">Enterprise Admin Center</h1>
              <p className="text-xs text-[var(--text-muted)]">Configure live system platforms and review traffic telemetry.</p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Tab Toggles */}
              <div className="bg-slate-100 p-1.5 rounded-xl border border-slate-200 flex gap-1">
                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`px-4 py-2 rounded-lg text-xs font-800 transition-all ${
                    activeTab === "analytics"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <BarChart3 size={14} className="inline mr-1" />
                  Analytics logs
                </button>
                <button
                  onClick={() => setActiveTab("products")}
                  className={`px-4 py-2 rounded-lg text-xs font-800 transition-all ${
                    activeTab === "products"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Settings size={14} className="inline mr-1" />
                  Product Manager
                </button>
              </div>

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

          {/* MAIN PANELS CONDITIONAL RENDER */}
          {activeTab === "analytics" ? (
            /* ========================================================================= */
            /* ANALYTICS TAB PANEL                                                       */
            /* ========================================================================= */
            <>
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
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-sm font-800 text-[var(--navy)] flex items-center gap-2">
                          <BarChart3 size={16} />
                          Page Views by Path
                        </h2>
                        <button 
                          onClick={fetchAnalytics} 
                          className="text-slate-500 hover:text-slate-900 text-xs font-700 flex items-center gap-1"
                        >
                          <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
                          Refresh
                        </button>
                      </div>
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
            </>
          ) : (
            /* ========================================================================= */
            /* PRODUCT MANAGER TAB PANEL                                                 */
            /* ========================================================================= */
            <div className="grid lg:grid-cols-12 gap-8">
              
              {/* Left Column: Products List */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <FadeUp className="card bg-white border border-slate-200 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-sm font-900 text-[var(--navy)] uppercase tracking-wider">Product Inventory</h2>
                    <button
                      onClick={handleCreateProduct}
                      className="btn btn-primary btn-sm flex items-center gap-1"
                    >
                      <Plus size={14} />
                      Add Product
                    </button>
                  </div>

                  {productsLoading ? (
                    <div className="text-center py-12 text-xs text-slate-500 font-mono">
                      Querying products list...
                    </div>
                  ) : products.length === 0 ? (
                    <div className="text-center py-12 text-xs text-slate-400 italic">
                      No products registered yet. Click Add Product to create one.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {products.map((prod) => (
                        <div 
                          key={prod.id} 
                          className={`p-4 rounded-xl border transition-all flex justify-between items-center group ${
                            editingProduct?.id === prod.id 
                              ? "border-blue-600 bg-blue-50/50 shadow-sm"
                              : "border-slate-100 hover:border-slate-300 bg-slate-50/50 hover:bg-white"
                          }`}
                        >
                          <div className="truncate">
                            <div className="font-800 text-sm text-[var(--navy)] flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: prod.color }} />
                              {prod.name}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">{prod.id} • {prod.category}</div>
                          </div>

                          <div className="flex gap-1 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEditProduct(prod)}
                              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 shadow-sm transition-colors"
                              title="Edit product"
                            >
                              <Edit size={12} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(prod.id)}
                              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-300 shadow-sm transition-colors"
                              title="Delete product"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </FadeUp>
              </div>

              {/* Right Column: Interactive Editor Form */}
              <div className="lg:col-span-8">
                {editingProduct ? (
                  <FadeUp className="card bg-white border border-slate-200 p-8 shadow-xl">
                    <div className="flex justify-between items-center pb-4 mb-6 border-b border-slate-100">
                      <div>
                        <h2 className="text-xl font-900 text-[var(--navy)] tracking-tight">
                          {isCreatingNew ? "Create New CALDIM Product" : `Edit System: ${editingProduct.name}`}
                        </h2>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">
                          {isCreatingNew ? "Assign properties for live registry catalog" : `ID Key: ${editingProduct.id}`}
                        </p>
                      </div>
                      <button
                        onClick={handleCancelEdit}
                        className="p-2 text-slate-400 hover:text-slate-700 bg-slate-50 rounded-full"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {saveError && (
                      <div className="p-4 mb-6 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-700">
                        {saveError}
                      </div>
                    )}

                    {saveSuccess && (
                      <div className="p-4 mb-6 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-700">
                        Product database updated successfully! Reloading inventory...
                      </div>
                    )}

                    <form onSubmit={handleSaveProduct} className="flex flex-col gap-6">
                      
                      {/* Section 1: Basic Info */}
                      <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                        <h3 className="text-xs font-800 uppercase tracking-wider text-blue-600 mb-4 flex items-center gap-1.5">
                          <FileText size={14} />
                          1. Base Brand Specifications
                        </h3>
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-800 text-slate-500 uppercase tracking-wide">Slug ID Key (Unique URL Key)*</label>
                            <input
                              type="text"
                              required
                              disabled={!isCreatingNew}
                              value={editingProduct.id}
                              onChange={(e) => handleInputChange("id", e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
                              placeholder="e.g. caltims"
                              className="text-xs px-3.5 py-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-blue-600 font-mono disabled:bg-slate-100 disabled:text-slate-400"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-800 text-slate-500 uppercase tracking-wide">Product Title Name*</label>
                            <input
                              type="text"
                              required
                              value={editingProduct.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                              placeholder="e.g. CALTIMS"
                              className="text-xs px-3.5 py-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-blue-600 font-bold"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-800 text-slate-500 uppercase tracking-wide">Category Label*</label>
                            <input
                              type="text"
                              required
                              value={editingProduct.category}
                              onChange={(e) => handleInputChange("category", e.target.value)}
                              placeholder="e.g. HR & Payroll"
                              className="text-xs px-3.5 py-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-blue-600"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-800 text-slate-500 uppercase tracking-wide">Accent Color Theme Hex*</label>
                            <div className="flex gap-2">
                              <input
                                type="color"
                                value={editingProduct.color}
                                onChange={(e) => handleInputChange("color", e.target.value)}
                                className="w-11 h-11 p-1 rounded-lg border border-slate-200 bg-white cursor-pointer"
                              />
                              <input
                                type="text"
                                required
                                value={editingProduct.color}
                                onChange={(e) => handleInputChange("color", e.target.value)}
                                placeholder="#3b82f6"
                                className="text-xs px-3.5 py-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-blue-600 flex-1 font-mono"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col gap-1 sm:col-span-2">
                            <label className="text-[10px] font-800 text-slate-500 uppercase tracking-wide">Marketing Icon Style*</label>
                            <select
                              value={editingProduct.iconName}
                              onChange={(e) => handleInputChange("iconName", e.target.value)}
                              className="text-xs px-3.5 py-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-blue-600"
                            >
                              {["Clock", "Package", "ShoppingCart", "MapPin", "Sparkles", "FolderKanban", "Warehouse", "Cpu", "Box", "Globe"].map(iName => (
                                <option key={iName} value={iName}>{iName}</option>
                              ))}
                            </select>
                          </div>

                          <div className="flex flex-col gap-1 sm:col-span-2">
                            <label className="text-[10px] font-800 text-slate-500 uppercase tracking-wide">Elevator Tagline Line*</label>
                            <input
                              type="text"
                              required
                              value={editingProduct.tagline}
                              onChange={(e) => handleInputChange("tagline", e.target.value)}
                              placeholder="e.g. Sync timesheets to payroll instantly."
                              className="text-xs px-3.5 py-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-blue-600"
                            />
                          </div>

                          <div className="flex flex-col gap-1 sm:col-span-2">
                            <label className="text-[10px] font-800 text-slate-500 uppercase tracking-wide">Interactive Catalog Summary Description*</label>
                            <textarea
                              required
                              rows={3}
                              value={editingProduct.description}
                              onChange={(e) => handleInputChange("description", e.target.value)}
                              placeholder="Describe core functionalities & target operators..."
                              className="text-xs px-3.5 py-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-blue-600 leading-relaxed"
                            />
                          </div>

                          <div className="flex flex-col gap-1 sm:col-span-2">
                            <label className="text-[10px] font-800 text-slate-500 uppercase tracking-wide">Homepage Grid Hover Description*</label>
                            <textarea
                              required
                              rows={3}
                              value={editingProduct.contents}
                              onChange={(e) => handleInputChange("contents", e.target.value)}
                              placeholder="Expanded description displayed in the interactive grid on the homepage..."
                              className="text-xs px-3.5 py-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-blue-600 leading-relaxed"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Media and Visual Links */}
                      <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                        <h3 className="text-xs font-800 uppercase tracking-wider text-purple-600 mb-4 flex items-center gap-1.5">
                          <Play size={14} />
                          2. Video & Media Telemetry Stage
                        </h3>

                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-800 text-slate-500 uppercase tracking-wide">Product Video Link (URL, Youtube, Vimeo, or Local Path)</label>
                            <input
                              type="text"
                              value={editingProduct.videoUrl}
                              onChange={(e) => handleInputChange("videoUrl", e.target.value)}
                              placeholder="e.g. https://www.w3schools.com/html/mov_bbb.mp4 or YouTube URL"
                              className="text-xs px-3.5 py-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-blue-600 font-mono"
                            />
                            <div className="text-[10px] text-slate-400 mt-1 font-600">Provide an MP4 direct link, YouTube URL, or local path to trigger immediate player sync.</div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-800 text-slate-500 uppercase tracking-wide">Video Overlay Headline Title</label>
                            <input
                              type="text"
                              required
                              value={editingProduct.mediaTitle}
                              onChange={(e) => handleInputChange("mediaTitle", e.target.value)}
                              placeholder="e.g. Timesheet & Automated Payroll Telemetry Hub"
                              className="text-xs px-3.5 py-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-blue-600"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-800 text-slate-500 uppercase tracking-wide">Video Subtitle / Tagline Callout</label>
                            <input
                              type="text"
                              required
                              value={editingProduct.videoTagline}
                              onChange={(e) => handleInputChange("videoTagline", e.target.value)}
                              placeholder="e.g. Watch 2-Min Payroll Automation & Timesheet Walkthrough"
                              className="text-xs px-3.5 py-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-blue-600"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-800 text-slate-500 uppercase tracking-wide">Architecture Blueprint Headline</label>
                            <input
                              type="text"
                              required
                              value={editingProduct.architectureHighlight}
                              onChange={(e) => handleInputChange("architectureHighlight", e.target.value)}
                              placeholder="e.g. Sub-second Zod verified schema verification..."
                              className="text-xs px-3.5 py-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-blue-600 font-600 text-slate-800"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-800 text-slate-500 uppercase tracking-wide">Unsplash Catalog Cover Image Link</label>
                            <input
                              type="text"
                              required
                              value={editingProduct.unsplashUrl}
                              onChange={(e) => handleInputChange("unsplashUrl", e.target.value)}
                              placeholder="https://images.unsplash.com/photo-..."
                              className="text-xs px-3.5 py-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-blue-600 font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Technical Metrics bullets */}
                      <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                        <h3 className="text-xs font-800 uppercase tracking-wider text-emerald-600 mb-4 flex items-center gap-1.5">
                          <Layers size={14} />
                          3. Interactive Dashboard Metrics (Exactly 4 Bullets)
                        </h3>

                        <div className="flex flex-col gap-3">
                          {editingProduct.metrics.map((met, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-400 w-4 font-mono">#{idx+1}</span>
                              <input
                                type="text"
                                required
                                value={met}
                                onChange={(e) => handleMetricChange(idx, e.target.value)}
                                placeholder="Enter operational result or certification detail..."
                                className="text-xs px-3.5 py-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-blue-600 flex-1"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Section 4: Capabilities dynamic list */}
                      <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xs font-800 uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
                            <Sparkles size={14} />
                            4. Planned Technical Capabilities
                          </h3>
                          <button
                            type="button"
                            onClick={addCapability}
                            className="text-[11px] font-800 text-blue-600 hover:text-blue-500 flex items-center gap-0.5"
                          >
                            <Plus size={12} /> Add capability
                          </button>
                        </div>

                        <div className="flex flex-col gap-3">
                          {editingProduct.capabilities.map((cap, idx) => (
                            <div key={idx} className="flex gap-2 items-center">
                              <input
                                type="text"
                                required
                                value={cap}
                                onChange={(e) => handleCapabilityChange(idx, e.target.value)}
                                className="text-xs px-3.5 py-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-blue-600 flex-1"
                              />
                              <button
                                type="button"
                                onClick={() => removeCapability(idx)}
                                className="p-2.5 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-red-600 hover:border-red-300"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Section 5: Features list */}
                      <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xs font-800 uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
                            <Settings size={14} />
                            5. Key Technical Features
                          </h3>
                          <button
                            type="button"
                            onClick={addFeature}
                            className="text-[11px] font-800 text-blue-600 hover:text-blue-500 flex items-center gap-0.5"
                          >
                            <Plus size={12} /> Add feature
                          </button>
                        </div>

                        <div className="flex flex-col gap-4">
                          {editingProduct.features.map((feat, idx) => (
                            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col gap-2 relative">
                              <button
                                type="button"
                                onClick={() => removeFeature(idx)}
                                className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-red-600 bg-slate-50 rounded"
                              >
                                <Trash2 size={12} />
                              </button>
                              <div className="flex flex-col gap-1 pr-8">
                                <label className="text-[9px] font-800 text-slate-400 uppercase tracking-wide">Feature Title</label>
                                <input
                                  type="text"
                                  required
                                  value={feat.title}
                                  onChange={(e) => handleFeatureChange(idx, "title", e.target.value)}
                                  className="text-xs px-3 py-2 rounded-lg border border-slate-100 bg-slate-50 focus:outline-none focus:border-blue-600 font-bold"
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-[9px] font-800 text-slate-400 uppercase tracking-wide">Feature Mechanics Description</label>
                                <textarea
                                  required
                                  rows={2}
                                  value={feat.desc}
                                  onChange={(e) => handleFeatureChange(idx, "desc", e.target.value)}
                                  className="text-xs px-3 py-2 rounded-lg border border-slate-100 bg-slate-50 focus:outline-none focus:border-blue-600"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Section 6: whyChoose (Benefits) list */}
                      <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xs font-800 uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                            <ArrowUpRight size={14} />
                            6. Business Impact benefits
                          </h3>
                          <button
                            type="button"
                            onClick={addWhyChoose}
                            className="text-[11px] font-800 text-blue-600 hover:text-blue-500 flex items-center gap-0.5"
                          >
                            <Plus size={12} /> Add benefit
                          </button>
                        </div>

                        <div className="flex flex-col gap-4">
                          {editingProduct.whyChoose.map((why, idx) => (
                            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col gap-2 relative">
                              <button
                                type="button"
                                onClick={() => removeWhyChoose(idx)}
                                className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-red-600 bg-slate-50 rounded"
                              >
                                <Trash2 size={12} />
                              </button>
                              <div className="flex flex-col gap-1 pr-8">
                                <label className="text-[9px] font-800 text-slate-400 uppercase tracking-wide">Benefit Title</label>
                                <input
                                  type="text"
                                  required
                                  value={why.title}
                                  onChange={(e) => handleWhyChooseChange(idx, "title", e.target.value)}
                                  className="text-xs px-3 py-2 rounded-lg border border-slate-100 bg-slate-50 focus:outline-none focus:border-blue-600 font-bold"
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-[9px] font-800 text-slate-400 uppercase tracking-wide">Benefit Impact Description</label>
                                <textarea
                                  required
                                  rows={2}
                                  value={why.desc}
                                  onChange={(e) => handleWhyChooseChange(idx, "desc", e.target.value)}
                                  className="text-xs px-3 py-2 rounded-lg border border-slate-100 bg-slate-50 focus:outline-none focus:border-blue-600"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Footer Actions inside Form */}
                      <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="btn btn-secondary"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={saveLoading}
                          className="btn btn-primary flex items-center gap-1.5"
                        >
                          <Save size={16} />
                          {saveLoading ? "Saving Platforms Registry..." : "Save Product Details"}
                        </button>
                      </div>

                    </form>
                  </FadeUp>
                ) : (
                  <div className="h-full flex flex-col justify-center items-center text-center p-12 bg-white border border-slate-100 rounded-3xl min-h-[300px]">
                    <Settings size={48} className="text-slate-300 animate-spin-slow mb-4" />
                    <h3 className="font-800 text-base text-[var(--navy)] mb-1">Product Configuration Stage</h3>
                    <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                      Select any product from the registry on the left to edit its specifications or click "Add Product" to spin up a new platform module.
                    </p>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
