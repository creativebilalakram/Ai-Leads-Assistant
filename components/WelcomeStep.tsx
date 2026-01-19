
import React from 'react';
import { ShieldCheck, Zap, UserPlus, Timer, Globe, ArrowRight } from 'lucide-react';

interface WelcomeStepProps {
  onStart: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onStart }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 text-center px-4 safe-pt">
      <div className="relative inline-flex items-center justify-center mb-6 md:mb-12">
        <div className="absolute inset-0 bg-teal-500/10 blur-2xl md:blur-3xl rounded-full" />
        <div className="relative p-4 md:p-6 bg-white shadow-2xl shadow-teal-500/15 text-teal-600 rounded-[2rem] md:rounded-[2.5rem] animate-float border border-slate-50/50 backdrop-blur-sm">
          <Globe size={28} className="md:w-9 md:h-9" strokeWidth={1.5} />
        </div>
      </div>
      
      <div className="space-y-3 md:space-y-6 mb-8 md:mb-14">
        <h1 className="text-3xl md:text-7xl font-[900] tracking-tight text-slate-900 bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-800 to-slate-500 leading-tight">
          AI Automation <br className="hidden md:block" /> Assessment
        </h1>
        
        <p className="text-base md:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-light px-2">
          Identify exactly where AI automation can save your business time, reduce operational costs, and unlock scaled growth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-10 md:mb-20">
        {[
          { icon: <Timer size={18} />, text: "2-Minute Diagnostic", sub: "Effortless process" },
          { icon: <ShieldCheck size={18} />, text: "AU Data Privacy", sub: "Consultant-grade" },
          { icon: <Zap size={18} />, text: "ROI-Focused Lens", sub: "Strategic insights" }
        ].map((item, i) => (
          <div key={i} className="glass-card px-4 py-5 md:px-6 md:py-7 rounded-[1.75rem] md:rounded-[2.25rem] flex flex-row md:flex-col items-center gap-4 md:gap-3 transition-all active:scale-[0.98] md:hover:translate-y-[-6px] duration-500 border-white/40">
            <span className="text-teal-500 p-2 bg-teal-50 rounded-xl shrink-0">{item.icon}</span>
            <div className="space-y-0.5 text-left md:text-center">
              <span className="block text-[10px] md:text-[11px] font-[900] uppercase tracking-[0.15em] md:tracking-[0.2em] text-slate-900">{item.text}</span>
              <span className="block text-[9px] text-slate-400 font-medium tracking-wide uppercase">{item.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-6 md:gap-8">
        <button
          onClick={onStart}
          className="group relative w-full md:w-auto overflow-hidden px-8 md:px-16 py-5 md:py-7 bg-slate-900 text-white rounded-full font-bold text-base md:text-xl hover:shadow-[0_30px_60px_-15px_rgba(15,23,42,0.45)] transition-all duration-700 active:scale-95 flex items-center justify-center gap-3 md:gap-4"
        >
          <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[500%] transition-transform duration-1000 ease-in-out" />
          <span className="relative z-10">Start My Assessment</span>
          <ArrowRight size={20} className="relative z-10 transition-transform group-hover:translate-x-2" strokeWidth={2.5} />
        </button>
        
        <div className="flex flex-col items-center gap-4 opacity-40">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Strategic Diagnostic for Australian Leaders
          </p>
          <div className="flex flex-wrap gap-4 md:gap-12 items-center justify-center grayscale">
             <span className="font-black tracking-tighter text-[10px] md:text-sm text-slate-400">MELBOURNE</span>
             <span className="font-black tracking-tighter text-[10px] md:text-sm text-slate-400">SYDNEY</span>
             <span className="font-black tracking-tighter text-[10px] md:text-sm text-slate-400">BRISBANE</span>
             <span className="font-black tracking-tighter text-[10px] md:text-sm text-slate-400">PERTH</span>
          </div>
        </div>
      </div>
    </div>
  );
};
