"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Clock,
  Package,
  ShoppingCart,
  MapPin,
  Zap,
  ArrowRight,
  Terminal,
  Cpu
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  isMega?: boolean;
  children?: { label: string; href: string; description?: string }[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Enterprise Software", href: "/services#enterprise", description: "Custom web & mobile applications" },
      { label: "AI & Machine Learning", href: "/services#ai", description: "Intelligent automation solutions" },
      { label: "ERP & Automation", href: "/services#erp", description: "End-to-end business automation" },
      { label: "DevOps & Security", href: "/services#devops", description: "Secure, reliable deployments" },
      { label: "UI/UX Design", href: "/services#design", description: "Human-centred design systems" },
    ],
  },
  {
    label: "Products",
    href: "/products",
    isMega: true,
  },
  { label: "Industries", href: "/industries" },
  { label: "Contact", href: "/contact" },
];

const productsList = [
  {
    name: "CalTIMS",
    desc: "Time & Payroll Management",
    href: "/products/caltims",
    icon: Clock,
    iconColor: "text-blue-400",
  },
  {
    name: "CALRIMS",
    desc: "Resource & Inventory",
    href: "/products#calrims",
    icon: Package,
    iconColor: "text-emerald-400",
  },
  {
    name: "CALBUY",
    desc: "Procurement Platform",
    href: "/products#calbuy",
    icon: ShoppingCart,
    iconColor: "text-amber-400",
  },
  {
    name: "CALTRACK",
    desc: "Asset Tracking System",
    href: "/products#caltrack",
    icon: MapPin,
    iconColor: "text-rose-400",
  },
  {
    name: "CAL EMS",
    desc: "Energy Management",
    href: "/products#cal-ems",
    icon: Zap,
    iconColor: "text-cyan-400",
  },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Scroll Spy Observer logic
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const sections = ["about", "services", "products", "industries"];
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // triggers in the viewport middle
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) {
            setActiveSection(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const heroElement = document.getElementById("hero");
    if (heroElement) observer.observe(heroElement);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  // Scroll to section smoothly on Homepage instead of page redirect
  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    if (pathname === "/") {
      const targetId = 
        label.toLowerCase() === "home" ? "hero" :
        label.toLowerCase() === "about" ? "about" :
        label.toLowerCase() === "services" ? "services" :
        label.toLowerCase() === "products" ? "products" :
        label.toLowerCase() === "industries" ? "industries" : null;
      
      if (targetId) {
        const element = document.getElementById(targetId);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          setActiveDropdown(null);
          setMobileOpen(false);
        }
      }
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-4 md:px-6 flex justify-center">
        {/* Floating pill navigation container - Navy Theme */}
        <nav
          className={`w-full max-w-6xl mt-4 md:mt-6 pointer-events-auto rounded-full transition-all duration-500 border ${
            scrolled
              ? "bg-[#071B34]/95 border-white/20 shadow-[0_8px_32px_rgba(7,27,52,0.8)] backdrop-blur-xl py-1"
              : "bg-[#071B34]/80 border-white/10 shadow-2xl backdrop-blur-md py-2"
          }`}
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="px-6 md:px-8 flex items-center justify-between h-14">
            
            {/* Brand Logo - White/Blue theme */}
            <Link
              href="/"
              className="flex items-center gap-3 font-display font-900 text-xl tracking-tight text-white shrink-0 group"
              aria-label="CALDIM home"
            >
              <div className="relative h-8 w-12 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-md group-hover:bg-blue-500/40 transition-all duration-500" />
                <img
                  src="/logo/image.png"
                  alt="CALDIM CD Logo"
                  className="relative h-7 w-auto max-w-none object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <span className="text-white group-hover:text-blue-100 transition-colors">
                CALDIM{" "}
                <span className="font-400 text-white">
                  - DAS
                </span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => {
                const hasChildren = item.children || item.isMega;
                const isActive = activeDropdown === item.label;

                const isCurrentActive = 
                  (pathname === "/" && activeSection && item.href.includes(activeSection)) ||
                  (pathname === item.href && !activeSection) ||
                  (pathname === "/" && item.label === "Home" && (!activeSection || activeSection === "hero"));

                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => hasChildren && setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                        <Link
                          href={item.href}
                          onClick={(e) => handleNavLinkClick(e, item.href, item.label)}
                          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-800 tracking-wider uppercase transition-all duration-300 ${
                            isActive
                              ? "bg-white/10 text-white"
                              : isCurrentActive
                              ? "text-blue-400 bg-blue-500/10"
                              : "text-slate-300 hover:text-white hover:bg-white/5"
                          }`}
                          aria-current={isCurrentActive ? "page" : undefined}
                        >
                      {item.label}
                      {hasChildren && <ChevronDown size={14} className={`opacity-60 transition-transform duration-300 ${isActive ? "rotate-180" : ""}`} />}
                    </Link>

                    {/* Standard Dropdown Container (Dark Mode) */}
                    <AnimatePresence>
                      {item.children && isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 bg-[#0a192f]/95 backdrop-blur-xl rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-[#112240] p-2 z-50 overflow-hidden"
                        >
                          {/* Inner glowing edge */}
                          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                          
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="flex flex-col gap-1 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors duration-200 group"
                            >
                              <span className="text-sm font-700 text-slate-200 group-hover:text-blue-400 transition-colors">
                                {child.label}
                              </span>
                              {child.description && (
                                <span className="text-[11px] text-slate-500 font-500 leading-relaxed">{child.description}</span>
                              )}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Mega Dropdown Panel for Products (Dark Mode) */}
                    <AnimatePresence>
                      {item.isMega && isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[800px] bg-[#0a192f]/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-[#112240] p-2 z-50 flex overflow-hidden"
                        >
                          {/* Inner glowing edge */}
                          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

                          {/* Products List (Left Side) */}
                          <div className="flex-1 p-6 flex flex-col">
                            <span className="text-[10px] font-800 tracking-widest text-slate-500 uppercase mb-4 flex items-center gap-2">
                              <Terminal size={12} /> Enterprise Suite
                            </span>
                            <div className="grid grid-cols-2 gap-2">
                              {productsList.map((prod) => {
                                const Icon = prod.icon;
                                return (
                                  <Link
                                    key={prod.name}
                                    href={prod.href}
                                    className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-white/5 transition-all group"
                                  >
                                    <div className={`w-10 h-10 rounded-xl bg-[#020c1b] border border-white/5 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-blue-500/30 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] ${prod.iconColor}`}>
                                      <Icon size={18} />
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                      <span className="text-sm font-800 text-slate-200 group-hover:text-white transition-colors">
                                        {prod.name}
                                      </span>
                                      <span className="text-[11px] text-slate-500 font-500 leading-tight">
                                        {prod.desc}
                                      </span>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>

                          {/* Promotional Feature Card (Right Side) */}
                          <div className="w-[280px] bg-[#020c1b]/50 p-6 flex flex-col justify-center border-l border-[#112240] relative overflow-hidden group">
                            {/* Ambient Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[40px] rounded-full pointer-events-none group-hover:bg-blue-500/20 transition-colors duration-500" />
                            
                            <div className="relative w-full h-[120px] rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-[#0a192f] border border-white/10 shadow-inner flex items-center justify-center p-4 mb-6">
                              <Cpu size={40} className="text-slate-700/50 absolute" />
                              <span className="text-white font-900 text-xl tracking-tight select-none relative z-10 drop-shadow-md">
                                Dashboard
                              </span>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                              <span className="text-[10px] font-800 tracking-widest text-blue-400 uppercase">
                                Unified Workspace
                              </span>
                              <span className="text-base font-800 text-white">
                                CALDIM Dashboard
                              </span>
                              <p className="text-[11px] text-slate-400 font-500 leading-relaxed">
                                Access all your digital automation services, time sheets, and intelligence tools inside a single, secure enterprise portal.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Mobile Menu Action Toggle */}
            <button
              className="lg:hidden p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Nav Overlay Menu (Dark Mode) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-45 bg-[#020c1b]/95 backdrop-blur-2xl pt-28 px-6 pb-8 flex flex-col gap-8 lg:hidden overflow-y-auto"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              {navItems.map((item) => {
                const isCurrentActive = 
                  (pathname === "/" && activeSection && item.href.includes(activeSection)) ||
                  (pathname === item.href && !activeSection) ||
                  (pathname === "/" && item.label === "Home" && (!activeSection || activeSection === "hero"));

                return (
                  <div key={item.href} className="border-b border-[#112240] pb-2">
                    {item.children || item.isMega ? (
                      <div className="flex flex-col gap-2">
                        <span className="text-[11px] font-900 tracking-widest text-slate-500 uppercase px-4 py-2">
                          {item.label}
                        </span>
                        <div className="pl-4 flex flex-col gap-1">
                          {item.isMega
                            ? productsList.map((prod) => (
                                <Link
                                  key={prod.name}
                                  href={prod.href}
                                  className="py-2.5 px-4 rounded-xl text-slate-300 text-sm font-700 hover:bg-white/5 hover:text-white transition-colors"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {prod.name} <span className="text-slate-500 font-500 ml-2">— {prod.desc}</span>
                                </Link>
                              ))
                            : item.children?.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="py-2.5 px-4 rounded-xl text-slate-300 text-sm font-700 hover:bg-white/5 hover:text-white transition-colors"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {child.label}
                                </Link>
                              ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center py-3 px-4 rounded-xl text-slate-200 font-800 text-lg hover:bg-white/5 transition-colors ${
                          isCurrentActive ? "text-blue-400 bg-blue-500/10" : ""
                        }`}
                        onClick={(e) => {
                          handleNavLinkClick(e, item.href, item.label);
                          setMobileOpen(false);
                        }}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
