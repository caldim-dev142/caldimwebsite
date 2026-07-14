import React from "react";

export const DataNodeDivider: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center py-8 opacity-70">
      {/* Left Line */}
      <div className="h-px bg-gradient-to-r from-transparent to-blue-500 w-1/4 sm:w-1/3 max-w-[300px]" />
      
      {/* Center Data Node */}
      <div className="flex items-center gap-3 px-4">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
        <div className="w-3 h-3 rotate-45 border-2 border-blue-400 flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.5)]">
          <div className="w-1 h-1 bg-blue-300 shadow-[0_0_5px_rgba(147,197,253,0.8)]" />
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
      </div>

      {/* Right Line */}
      <div className="h-px bg-gradient-to-l from-transparent to-blue-500 w-1/4 sm:w-1/3 max-w-[300px]" />
    </div>
  );
};
