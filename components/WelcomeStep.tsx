
import React from 'react';
import { ShieldCheck, Zap, Timer, Layers, ArrowRight } from 'lucide-react';

interface WelcomeStepProps {
  onStart: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onStart }) => {
  return (
    <div className="h-full flex flex-col overflow-y-auto scrollbar-hide px-6 md:px-12 pt-10 md:pt-14 pb-10 md:pb-12">
      <div className="flex-grow flex flex-col items-center justify-center text-center max-w-2xl mx-auto w-full">
        {/* Abstract Logo Mark */}
        <div className="relative mb-6 md:mb-8">
          <div className="absolute inset-0 bg-slate-900/5 blur-[40px] md:blur-[60px] rounded-full scale-[1.5]" />
          <div className="relative w-14 h-14 md:w-20 md:h-20 bg-white shadow-2xl rounded-2xl md:rounded-[2rem] border border-slate-100 flex items-center justify-center group transition-transform duration-700 hover:rotate-[10deg]">
            <Layers size={24} className="text-slate-900 md:hidden" strokeWidth={1.5} />
            <Layers size={32} className="text-slate-900 hidden md:block" strokeWidth={1.2} />
          </div>
        </div>
        
        {/* Heading Section */}
        <div className="space-y-3 md:space-y-4 mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-slate-400 text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] border border-slate-100/50 mx-auto">
            Operational Excellence
          </div>
          
          <h1 className="text-[28px] md:text-5xl lg:text-6xl font-[900] tracking-tighter text-slate-900 leading-[1.1] whitespace-nowrap mx-auto">
            Creative <span className="text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-slate-600 to-slate-400">CRM AI</span>
          </h1>
          
          <p className="text-[13px] md:text-lg text-slate-500 max-w-sm md:max-w-lg mx-auto leading-relaxed font-medium px-4">
            Identify high-ROI automation gaps in your business architecture with our 2-minute strategic diagnostic.
          </p>
        </div>

        {/* Feature Grid - Compacted */}
        <div className="grid grid-cols-3 gap-2 md:gap-3 mb-10 md:mb-12 w-full">
          {[
            { icon: <Timer size={14} />, title: "2 Min", sub: "Review" },
            { icon: <ShieldCheck size={14} />, title: "Secure", sub: "Data" },
            { icon: <Zap size={14} />, title: "Live", sub: "Roadmap" }
          ].map((item, i) => (
            <div key={i} className="p-3 md:p-5 bg-white border border-slate-100 rounded-xl md:rounded-3xl flex flex-col items-center justify-center gap-1 md:gap-2 transition-all hover:border-slate-900 hover:shadow-xl hover:shadow-slate-900/5 duration-500 group cursor-default">
              <span className="text-slate-300 group-hover:text-slate-900 transition-colors duration-300">{item.icon}</span>
              <div className="flex flex-col items-center">
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-900">{item.title}</span>
                <span className="text-[7px] md:text-[8px] font-bold text-slate-300 uppercase tracking-[0.15em] mt-0.5 group-hover:text-slate-400 transition-colors">{item.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="group w-full md:max-w-[340px] h-[60px] md:h-[72px] bg-slate-900 text-white rounded-2xl md:rounded-3xl font-black text-sm md:text-base shadow-xl shadow-slate-900/20 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-700 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-4 select-none"
        >
          <span className="tracking-[0.1em] uppercase">Start Assessment</span>
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" strokeWidth={3} />
        </button>
      </div>
      
      {/* Footer Branding */}
      <div className="mt-8 flex flex-col items-center opacity-30">
        <p className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.5em] text-slate-500">
          SYDNEY • LONDON • TOKYO
        </p>
      </div>
    </div>
  );
};
