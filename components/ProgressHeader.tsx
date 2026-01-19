
import React from 'react';

interface ProgressHeaderProps {
  progress: number;
}

export const ProgressHeader: React.FC<ProgressHeaderProps> = ({ progress }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-100/50 backdrop-blur-md z-50">
      <div 
        className="h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-500 transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_0_15px_rgba(20,184,166,0.3)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
