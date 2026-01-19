
import React from 'react';
import { ShieldCheck, Zap, Timer, Layers, ArrowRight } from 'lucide-react';

interface WelcomeStepProps {
  onStart: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onStart }) => {
  return (
    <div className="h-full flex flex-col overflow-y-auto scrollbar-hide px-8 md:px-20 pt-16 md:pt-24 pb-16">
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-slate-900/5 blur-[80px] rounded-full scale-[2]" />
          <div className="relative w-24 h-24 bg-white shadow-2xl rounded-[2.5rem] border border-slate-100 flex items-center justify-center">
            <Layers size={40} className="text-slate-900" strokeWidth={1} />
          </div>
        </div>
        
        <div className="space-y-6 mb-14">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] border border-slate-100/50 mx-auto">
            Strategic Diagnostic
          </div>
          
          <h1 className="text-5xl md:text-7xl font-[900] tracking-tighter text-slate-900 leading-[0.9] max-w-lg mx-auto">
            Creative <span className="text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-slate-700 to-slate-400">CRM AI</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 max-w-md mx-auto leading-relaxed font-medium px-4">
            A precise analysis of your business architecture to identify high-ROI automation gaps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14 w-full max-w-md">
          {[
            { icon: <Timer size={18} />, title: "2 Min", sub: "Review" },
            { icon: <ShieldCheck size={18} />, title: "Secure", sub: "Sydney-Based" },
            { icon: <Zap size={18} />, title: "Live", sub: "Roadmap" }
          ].map((item, i) => (
            <div key={i} className="p-6 bg-white border border-slate-100 rounded-[2rem] flex flex-row md:flex-col items-center justify-start md:justify-center gap-4 transition-all hover:border-slate-900 duration-500 group cursor-default">
              <span className="text-slate-400 group-hover:text-slate-900 transition-colors">{item.icon}</span>
              <div className="flex flex-col md:items-center">
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">{item.title}</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.sub}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          className="group w-full max-w-sm h-[80px] bg-slate-900 text-white rounded-full font-[900] text-xl hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] transition-all duration-700 hover:scale-[1.02] active:scale-[0.97] flex items-center justify-center gap-6 select-none"
        >
          <span className="tracking-tight">Begin Assessment</span>
          <ArrowRight size={26} className="transition-transform group-hover:translate-x-3" strokeWidth={4} />
        </button>
      </div>
      
      <div className="mt-16 flex flex-col items-center opacity-40">
        <p className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-500">
          SYDNEY • LONDON • TOKYO
        </p>
      </div>
    </div>
  );
};
