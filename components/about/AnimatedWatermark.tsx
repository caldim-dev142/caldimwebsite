"use client";

import React from "react";

export const AnimatedWatermark: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[0] opacity-15 md:opacity-[0.18] flex items-center justify-center overflow-hidden">
      <div className="w-[120vw] max-w-[1400px] h-[80vw] max-h-[850px] relative flex items-center justify-center overflow-hidden">
        {/* Directly mask using CALDIM's signature corporate navy (#0A192F) at a subtle 18% opacity so the CD watermark is a light, professional shade of the exact brand theme color */}
        <div 
          className="w-full h-full bg-[#0A192F]"
          style={{
            maskImage: 'url(/logo/image.png)',
            WebkitMaskImage: 'url(/logo/image.png)',
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskPosition: 'center center',
            WebkitMaskPosition: 'center center',
          }}
        />
      </div>
    </div>
  );
};
