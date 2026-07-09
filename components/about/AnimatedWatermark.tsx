"use client";

import React from "react";

export const AnimatedWatermark: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[0] opacity-15 md:opacity-[0.18] flex items-center justify-center overflow-hidden">
      <div className="w-[140vw] max-w-[1400px] h-[90vw] max-h-[900px] relative flex items-center justify-start overflow-hidden">
        <div 
          className="w-full h-full relative flex items-center justify-start overflow-hidden"
          style={{ 
            maskImage: 'linear-gradient(to right, black 65%, transparent 90%)', 
            WebkitMaskImage: 'linear-gradient(to right, black 65%, transparent 90%)' 
          }}
        >
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
              maskPosition: 'left center',
              WebkitMaskPosition: 'left center',
            }}
          />
        </div>
      </div>
    </div>
  );
};
