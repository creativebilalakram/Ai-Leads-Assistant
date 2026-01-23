
import React from 'react';
import { ShieldCheck, Target, Zap, ArrowRight } from 'lucide-react';

interface WelcomeStepProps {
  onStart: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onStart }) => {
  const brandLogo = "https://creativebilal.com/wp-content/uploads/2025/12/Black-Blue-Minimalist-Modern-Initial-Font-Logo.png";

  return (
    <div className="h-full flex flex-col overflow-y-auto scrollbar-hide px-6 md:px-12 pt-5 md:pt-10 pb-8">
      <div className="flex-grow flex flex-col items-center justify-center text-center max-w-xl mx-auto w-full">
        {/* Brand Logo - Compact & High Quality */}
        <div className="relative mb-4 md:mb-8">
          <div className="absolute inset-0 bg-slate-900/5 blur-[40px] rounded-full scale-[1.3]" />
          <div className="relative w-14 h-14 md:w-20 md:h-20 bg-white shadow-xl rounded-[1.2rem] md:rounded-[2rem] border border-slate-100 flex items-center justify-center p-3 md:p-4 group transition-all duration-700 hover:scale-105">
            <img 
              src={brandLogo} 
              alt="Creative CRM Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        {/* Heading Section - Single Line Guaranteed */}
        <div className="space-y-2 md:space-y-4 mb-6 md:mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[7px] md:text-[9px] font-black uppercase tracking-[0.25em] mx-auto shadow-md">
            Professional Diagnostic
          </div>
          
          <h1 className="text-[20px] md:text-3xl lg:text-4xl font-[900] tracking-tighter text-slate-900 leading-none whitespace-nowrap">
            AI Strategy Assessment
          </h1>
          
          <p className="text-[12px] md:text-[15px] text-slate-500 max-w-[260px] md:max-w-md mx-auto leading-relaxed font-medium">
            Optimize operations. Evaluate architectural potential and alignment with our professional diagnostic.
          </p>
        </div>

        {/* Authority Pillars - High Visibility */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8 md:mb-14 w-full">
          {[
            { icon: <Zap size={16} />, title: "Executive", sub: "Audit" },
            { icon: <Target size={16} />, title: "Strategic", sub: "Focus" },
            { icon: <ShieldCheck size={16} />, title: "Priority", sub: "Response" }
          ].map((item, i) => (
            <div key={i} className="p-3 md:p-6 bg-white border border-slate-100 rounded-[1.5rem] md:rounded-[2rem] flex flex-col items-center justify-center gap-1.5 md:gap-2 transition-all hover:border-slate-900 hover:shadow-xl hover:shadow-slate-900/5 duration-700 group cursor-default">
              <div className="p-1.5 md:p-2 rounded-lg md:rounded-xl bg-slate-50 text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                {item.icon}
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.1em] text-slate-900">{item.title}</span>
                <span className="text-[6px] md:text-[8px] font-bold text-slate-400 uppercase tracking-[0.1em] group-hover:text-slate-500 transition-colors">{item.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button - Professional & Clear */}
        <button
          onClick={onStart}
          className="group relative w-full max-w-[240px] md:max-w-[300px] h-[50px] md:h-[64px] bg-slate-900 text-white rounded-full font-black text-[10px] md:text-[12px] shadow-xl shadow-slate-900/20 hover:shadow-slate-900/40 transition-all duration-700 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 md:gap-4 select-none outline-none overflow-hidden mx-auto"
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine" />
          </div>

          <span className="relative z-10 tracking-[0.2em] md:tracking-[0.3em] uppercase">Begin Audit</span>
          <ArrowRight size={16} md:size={18} className="relative z-10 transition-transform group-hover:translate-x-1" strokeWidth={3} />
        </button>
      </div>
      
      {/* Footer Minimal */}
      <div className="mt-4 md:mt-6 flex flex-col items-center opacity-20">
        <p className="text-[6px] md:text-[7px] font-black uppercase tracking-[0.4em] text-slate-400">
          SYDNEY • EXECUTIVE STANDARDS
        </p>
      </div>
    </div>
  );
};
