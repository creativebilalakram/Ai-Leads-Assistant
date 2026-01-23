
import React from 'react';

interface ProgressHeaderProps {
  progress: number;
}

export const ProgressHeader: React.FC<ProgressHeaderProps> = ({ progress }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-[6px] bg-slate-50 z-[100] overflow-hidden">
      <div 
        className="h-full bg-slate-900 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] relative shadow-[0_2px_15px_rgba(15,23,42,0.4)]"
        style={{ width: `${progress}%`, animation: progress > 0 ? 'progress-pulse 2s infinite' : 'none' }}
      >
        {/* Glow Sweep */}
        <div className="absolute top-0 right-0 h-full w-40 bg-gradient-to-r from-transparent via-white/40 to-white/60 blur-[2px]" />
      </div>
    </div>
  );
};
