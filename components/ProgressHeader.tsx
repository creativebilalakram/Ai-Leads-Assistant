
import React from 'react';

interface ProgressHeaderProps {
  progress: number;
}

export const ProgressHeader: React.FC<ProgressHeaderProps> = ({ progress }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-slate-100/30 backdrop-blur-xl z-50">
      <div 
        className="h-full bg-slate-900 transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_0_20px_rgba(15,23,42,0.2)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
