
import React from 'react';
import { ShieldCheck, Zap, UserPlus, Timer, Globe } from 'lucide-react';

interface WelcomeStepProps {
  onStart: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onStart }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 text-center px-2">
      <div className="relative inline-flex items-center justify-center mb-8 md:mb-12">
        <div className="absolute inset-0 bg-teal-500/10 blur-2xl md:blur-3xl rounded-full" />
        <div className="relative p-4 md:p-5 bg-white shadow-2xl shadow-teal-500/15 text-teal-600 rounded-[2rem] md:rounded-[2.5rem] animate-float border border-slate-50">
          <Globe size={28} className="md:w-8 md:h-8" strokeWidth={1.5} />
        </div>
      </div>
      
      <h1 className="text-3xl md:text-6xl font-[800] tracking-tight text-slate-900 mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-800 to-slate-500 leading-tight">
        AI Automation Assessment
      </h1>
      
      <p className="text-base md:text-xl text-slate-600 mb-8 md:mb-12 max-w-xl mx-auto leading-relaxed font-light">
        A deep-level strategic diagnostic to uncover high-impact automation multipliers within your core business architecture.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 mb-10 md:mb-16">
        {[
          { icon: <Timer size={18} />, text: "2-Minute Review" },
          { icon: <ShieldCheck size={18} />, text: "Australia Compliant" },
          { icon: <Zap size={18} />, text: "ROI-Focused Lens" }
        ].map((item, i) => (
          <div key={i} className="glass-card px-4 md:px-6 py-4 md:py-5 rounded-[1.5rem] md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center gap-3 transition-all hover:translate-y-[-4px] duration-500 hover:shadow-xl hover:shadow-teal-500/5">
            <span className="text-teal-500 shrink-0">{item.icon}</span>
            <span className="text-[9px] md:text-[10px] font-extrabold uppercase tracking-[0.15em] md:tracking-[0.2em] text-slate-400">{item.text}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        className="group relative w-full md:w-auto overflow-hidden px-8 md:px-14 py-5 md:py-6 bg-slate-900 text-white rounded-full font-bold text-base md:text-lg hover:shadow-[0_25px_50px_-15px_rgba(15,23,42,0.4)] transition-all duration-500 active:scale-95"
      >
        <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
        <span className="relative z-10 flex items-center justify-center gap-3">
          Start Strategic Diagnostic
          <UserPlus size={20} className="text-teal-400 shrink-0" />
        </span>
      </button>
      
      <div className="mt-10 md:mt-14 flex flex-col items-center gap-4 opacity-40">
        <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.25em] text-slate-400">
          Trusted by Leaders in
        </p>
        <div className="flex flex-wrap gap-4 md:gap-8 items-center justify-center grayscale">
           <span className="font-extrabold tracking-tighter text-sm md:text-lg text-slate-500">MELBOURNE</span>
           <span className="font-extrabold tracking-tighter text-sm md:text-lg text-slate-500">SYDNEY</span>
           <span className="font-extrabold tracking-tighter text-sm md:text-lg text-slate-500">BRISBANE</span>
        </div>
      </div>
    </div>
  );
};
