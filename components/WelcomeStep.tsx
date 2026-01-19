
import React from 'react';
import { ShieldCheck, Zap, Timer, Globe, ArrowRight } from 'lucide-react';

interface WelcomeStepProps {
  onStart: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onStart }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 text-center px-6 safe-pt max-w-3xl mx-auto">
      <div className="relative inline-flex items-center justify-center mb-6 md:mb-10">
        <div className="absolute inset-0 bg-teal-500/5 blur-3xl rounded-full" />
        <div className="relative p-3.5 md:p-5 bg-white/80 shadow-[0_15px_40px_-10px_rgba(20,184,166,0.1)] text-teal-600 rounded-3xl animate-float border border-white/50 backdrop-blur-sm">
          <Globe size={24} className="md:w-8 md:h-8" strokeWidth={1.5} />
        </div>
      </div>
      
      <div className="space-y-3 md:space-y-5 mb-8 md:mb-12">
        <h1 className="text-3xl md:text-6xl font-[900] tracking-tight text-slate-900 leading-[1.1]">
          AI Automation <br className="hidden md:block" /> Assessment
        </h1>
        
        <p className="text-sm md:text-xl text-slate-500 max-w-xl mx-auto leading-relaxed font-light px-4">
          A strategic diagnostic to identify where AI automation can unlock high-impact growth for your business.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-10 md:mb-16">
        {[
          { icon: <Timer size={16} />, text: "2-Minute Diagnostic" },
          { icon: <ShieldCheck size={16} />, text: "Consultant Grade" },
          { icon: <Zap size={16} />, text: "ROI-Focused Lens" }
        ].map((item, i) => (
          <div key={i} className="glass-card px-5 py-4 rounded-2xl flex flex-row md:flex-col items-center gap-3 md:gap-2 transition-all active:scale-[0.98] md:hover:border-teal-500/20 duration-500">
            <span className="text-teal-500 p-1.5 bg-teal-50/50 rounded-lg shrink-0">{item.icon}</span>
            <span className="text-[10px] md:text-[11px] font-[800] uppercase tracking-[0.15em] text-slate-900 text-left md:text-center leading-none">{item.text}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-8">
        <button
          onClick={onStart}
          className="group relative w-full md:w-auto px-10 md:px-14 py-4 md:py-6 bg-slate-900 text-white rounded-full font-bold text-base md:text-lg hover:shadow-[0_20px_40px_-10px_rgba(15,23,42,0.3)] transition-all duration-500 active:scale-95 flex items-center justify-center gap-3"
        >
          <span>Start Assessment</span>
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
        </button>
        
        <div className="flex flex-col items-center gap-4 opacity-30 grayscale pointer-events-none">
          <p className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400">
            Premium Diagnostic for Australian SMBs
          </p>
          <div className="flex gap-6 md:gap-10 text-[10px] md:text-xs font-black tracking-tighter text-slate-500">
             <span>MELBOURNE</span>
             <span>SYDNEY</span>
             <span>BRISBANE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
