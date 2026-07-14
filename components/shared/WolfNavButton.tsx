"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Gamepad2, Cpu, Mail, X } from "lucide-react";
import { GameCenter } from "./GameCenter";

interface MenuItem {
  label: string;
  icon: React.ElementType;
  href?: string;
  onClick?: () => void;
  dx: number;
  dy: number;
}

export const WolfNavButton: React.FC = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isEvading, setIsEvading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showGames, setShowGames] = useState(false);
  
  const buttonRef = useRef<HTMLDivElement>(null);

  const menuItems: MenuItem[] = [
    { label: "Home", icon: Home, href: "/", dx: -90, dy: 0 },
    { label: "Play Games", icon: Gamepad2, onClick: () => setShowGames(true), dx: -75, dy: -55 },
    { label: "Products", icon: Cpu, href: "/products", dx: -55, dy: -75 },
    { label: "Contact", icon: Mail, href: "/contact", dx: 0, dy: -90 },
  ];

  // Listen for Ctrl+Shift key press globally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey) {
        setIsUnlocked(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (!e.ctrlKey || !e.shiftKey) {
        setIsUnlocked(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Proximity-based evasion logic
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isExpanded || showGames || !buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const btnWidth = rect.width;
      const btnHeight = rect.height;

      // Current center coordinates of the button in viewport space
      const btnCenterX = rect.left + btnWidth / 2;
      const btnCenterY = rect.top + btnHeight / 2;

      // Mouse coordinates
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Distance vector
      const dx = btnCenterX - mouseX;
      const dy = btnCenterY - mouseY;
      const dist = Math.hypot(dx, dy);

      // Detection & evasion parameters
      const detectRadius = 160;
      const returnRadius = 240;

      // Determine home (zero offset) screen center coordinates
      const homeCenterX = btnCenterX - offset.x;
      const homeCenterY = btnCenterY - offset.y;

      // If Ctrl+Shift is held, we do not evade and return to original center
      if ((e.shiftKey && e.ctrlKey) || isUnlocked) {
        setOffset({ x: 0, y: 0 });
        setIsEvading(false);
        return;
      }

      if (dist < detectRadius) {
        setIsEvading(true);
        const angle = Math.atan2(dy, dx);
        const force = detectRadius - dist + 60; // Push strength

        // Target new center
        const targetBtnX = btnCenterX + Math.cos(angle) * force;
        const targetBtnY = btnCenterY + Math.sin(angle) * force;

        // Viewport padding to prevent going off-screen
        const padding = 50;
        const minX = padding;
        const maxX = window.innerWidth - padding;
        const minY = padding;
        const maxY = window.innerHeight - padding;

        const clampedBtnX = Math.max(minX, Math.min(maxX, targetBtnX));
        const clampedBtnY = Math.max(minY, Math.min(maxY, targetBtnY));

        // Convert back to offset relative to home
        setOffset({
          x: clampedBtnX - homeCenterX,
          y: clampedBtnY - homeCenterY,
        });
      } else if (dist > returnRadius && isEvading) {
        // Return to home center if mouse is far enough away
        setOffset({ x: 0, y: 0 });
        setIsEvading(false);
      }
    },
    [offset, isEvading, isExpanded, showGames, isUnlocked]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  const toggleMenu = () => {
    // Only allow expanding if shift is pressed, OR if already expanded (to close it)
    if (isExpanded || isUnlocked) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div
      ref={buttonRef}
      className="fixed z-50 pointer-events-none"
      style={{
        bottom: "32px",
        right: "32px",
      }}
    >
      {/* Container that implements smooth spring movement */}
      <motion.div
        animate={{
          x: offset.x,
          y: offset.y,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 14,
          mass: 0.8,
        }}
        className="relative flex items-center justify-center pointer-events-auto"
      >
        {/* Lock indicator ring when Shift is pressed */}
        <AnimatePresence>
          {isUnlocked && !isExpanded && !showGames && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.15, opacity: 0.8 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400 animate-[spin_8s_linear_infinite]"
            />
          )}
        </AnimatePresence>

        {/* Radial Menu Items */}
        <AnimatePresence>
          {isExpanded &&
            menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                  animate={{
                    opacity: 1,
                    x: item.dx,
                    y: item.dy,
                    scale: 1,
                  }}
                  exit={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: index * 0.05,
                  }}
                  className="absolute"
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="flex flex-col items-center justify-center w-9 h-9 rounded-full bg-slate-900/90 border border-slate-700 hover:border-cyan-400 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-all shadow-lg group relative"
                      aria-label={item.label}
                    >
                      <Icon size={14} />
                      <span className="absolute -top-8 px-2 py-0.5 bg-slate-950 border border-slate-800 text-[9px] text-slate-300 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md">
                        {item.label}
                      </span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        item.onClick?.();
                        setIsExpanded(false);
                      }}
                      className="flex flex-col items-center justify-center w-9 h-9 rounded-full bg-slate-900/90 border border-slate-700 hover:border-cyan-400 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-all shadow-lg group relative cursor-pointer"
                      aria-label={item.label}
                    >
                      <Icon size={14} />
                      <span className="absolute -top-8 px-2 py-0.5 bg-slate-950 border border-slate-800 text-[9px] text-slate-300 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-md">
                        {item.label}
                      </span>
                    </button>
                  )}
                </motion.div>
              );
            })}
        </AnimatePresence>

        {/* Main Wolf Button */}
        <motion.button
          onClick={toggleMenu}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className={`relative w-14 h-14 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 outline-none bg-[#071B34]/95 border border-white/20 shadow-[0_8px_32px_rgba(7,27,52,0.8)] backdrop-blur-xl ${
            isExpanded
              ? "text-red-500 hover:text-red-400"
              : isUnlocked
              ? "text-cyan-400 cursor-pointer"
              : "text-blue-400 hover:text-blue-300"
          }`}
          style={{
            cursor: isUnlocked || isExpanded ? "pointer" : "default",
          }}
          aria-label={isExpanded ? "Close menu" : "Wolf navigation menu"}
        >
          {isExpanded ? (
            <X size={22} className="stroke-[2.5]" />
          ) : (
            <>
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md pointer-events-none" />
              <img
                src="/logo/image.png"
                alt="CALDIM CD Logo"
                className="h-8 w-auto max-w-none object-contain transition-transform duration-300 hover:scale-110 relative z-10"
              />
            </>
          )}
        </motion.button>

        {/* Embedded Game Overlay */}
        <AnimatePresence>
          {showGames && (
            <GameCenter onClose={() => setShowGames(false)} />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
