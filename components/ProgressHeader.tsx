
import React from 'react';

interface ProgressHeaderProps {
  progress: number;
}

export const ProgressHeader: React.FC<ProgressHeaderProps> = ({ progress }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-[6px] bg-slate-100 z-[60]">
      <div 
        className="h-full bg-slate-900 transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] shadow-[0_2px_10px_rgba(15,23,42,0.3)] relative"
        style={{ width: `${progress}%` }}
      >
        <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-r from-transparent to-white/20" />
      </div>
    </div>
  );
};
