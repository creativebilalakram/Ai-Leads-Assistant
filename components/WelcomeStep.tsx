
import React from 'react';
import { ShieldCheck, Zap, Timer, Layers, ArrowRight } from 'lucide-react';

interface WelcomeStepProps {
  onStart: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onStart }) => {
  return (
    <div className="h-full flex flex-col overflow-y-auto scrollbar-hide px-6 md:px-20 pt-12 md:pt-24 pb-12 md:pb-16">
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <div className="relative mb-8 md:mb-12">
          <div className="absolute inset-0 bg-slate-900/5 blur-[60px] md:blur-[80px] rounded-full scale-[2]" />
          <div className="relative w-16 h-16 md:w-24 md:h-24 bg-white shadow-2xl rounded-2xl md:rounded-[2.5rem] border border-slate-100 flex items-center justify-center">
            <Layers size={28} className="text-slate-900 md:hidden" strokeWidth={1.5} />
            <Layers size={40} className="text-slate-900 hidden md:block" strokeWidth={1} />
          </div>
        </div>
        
        <div className="space-y-4 md:space-y-6 mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 md:gap-3 px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-slate-50 text-slate-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] border border-slate-100/50 mx-auto">
            Strategic Diagnostic
          </div>
          
          <h1 className="text-4xl md:text-7xl font-[900] tracking-tighter text-slate-900 leading-[1] md:leading-[0.9] max-w-lg mx-auto">
            Creative <span className="text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-slate-700 to-slate-400">CRM AI</span>
          </h1>
          
          <p className="text-sm md:text-xl text-slate-500 max-w-md mx-auto leading-relaxed font-medium px-2">
            A precise analysis of your business architecture to identify high-ROI automation gaps.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-10 md:mb-14 w-full max-w-sm md:max-w-md">
          {[
            { icon: <Timer size={14} />, title: "2 Min", sub: "Review" },
            { icon: <ShieldCheck size={14} />, title: "Secure", sub: "Sydney" },
            { icon: <Zap size={14} />, title: "Live", sub: "Roadmap" }
          ].map((item, i) => (
            <div key={i} className="p-3 md:p-6 bg-white border border-slate-100 rounded-2xl md:rounded-[2rem] flex flex-col items-center justify-center gap-1.5 md:gap-4 transition-all hover:border-slate-900 duration-500 group cursor-default">
              <span className="text-slate-400 group-hover:text-slate-900 transition-colors">{item.icon}</span>
              <div className="flex flex-col items-center">
                <span className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-slate-900">{item.title}</span>
                <span className="hidden md:block text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.sub}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          className="group w-full max-w-sm h-[64px] md:h-[80px] bg-slate-900 text-white rounded-full font-[900] text-lg md:text-xl shadow-xl shadow-slate-900/20 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] transition-all duration-700 hover:scale-[1.02] active:scale-[0.97] flex items-center justify-center gap-4 md:gap-6 select-none"
        >
          <span className="tracking-tight">Begin Assessment</span>
          <ArrowRight size={22} className="transition-transform group-hover:translate-x-3" strokeWidth={4} />
        </button>
      </div>
      
      <div className="mt-8 md:mt-16 flex flex-col items-center opacity-40">
        <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-slate-500">
          SYDNEY • LONDON • TOKYO
        </p>
      </div>
    </div>
  );
};
