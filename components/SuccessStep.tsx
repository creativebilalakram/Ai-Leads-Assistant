
import React, { useEffect, useState } from 'react';
import { Check, Sparkles, Layers, Mail } from 'lucide-react';
import { FormData } from '../types';

interface SuccessStepProps {
  formData: FormData;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({ formData }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 1600),
      setTimeout(() => setPhase(3), 2600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const firstName = formData.userName.split(' ')[0] || 'User';

  return (
    <div className="h-full flex flex-col overflow-y-auto scrollbar-hide px-[13px] md:px-16 pt-8 md:pt-16 pb-12">
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <div className="relative mb-6 md:mb-8">
          <div className="absolute inset-0 bg-slate-900/5 blur-[40px] md:blur-[50px] rounded-full animate-pulse" />
          <div className="relative w-16 h-16 md:w-24 md:h-24 bg-white shadow-xl text-slate-900 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 flex items-center justify-center">
            <Layers size={32} className="md:hidden" strokeWidth={1.5} />
            <Layers size={40} className="hidden md:block" strokeWidth={1} />
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-[900] text-slate-900 mb-3 md:mb-6 tracking-tighter leading-tight">
          Creative <span className="font-light italic text-slate-400">Analysis</span>
        </h1>
        
        <p className="text-[12px] md:text-lg text-slate-400 mb-8 md:mb-10 max-w-xs md:max-w-sm mx-auto leading-relaxed font-medium px-2">
          Excellent, {firstName}. We are distilling your data into a high-ROI automation architecture.
        </p>

        <div className="w-full max-w-xs md:max-w-sm space-y-2 md:space-y-3 mb-10 md:mb-12">
          {[
            "Calibrating system constraints",
            "Mapping automation multipliers",
            "Finalizing strategy brief"
          ].map((text, i) => (
            <div 
              key={i} 
              className={`flex items-center gap-3 md:gap-5 p-4 md:p-5 rounded-full bg-white border transition-all duration-700 ${
                phase >= i + 1 
                  ? 'opacity-100 translate-y-0 border-slate-900 shadow-md' 
                  : 'opacity-20 translate-y-2 border-slate-50'
              }`}
            >
              <div className={`w-5 h-5 md:w-7 md:h-7 rounded-full flex items-center justify-center text-white transition-all duration-700 shrink-0 ${
                phase >= i + 1 ? 'bg-slate-900' : 'bg-slate-100'
              }`}>
                <Check size={10} md:size={12} strokeWidth={4} />
              </div>
              <span className="text-[8px] md:text-[10px] font-black tracking-[0.2em] text-slate-900 uppercase text-left leading-none">
                {text}
              </span>
            </div>
          ))}
        </div>

        {phase >= 3 && (
          <div className="animate-fade-in w-full max-w-xs md:max-w-md">
            <div className="p-8 md:p-10 bg-slate-900 rounded-[2.5rem] md:rounded-[3rem] text-white relative overflow-hidden group">
              <div className="absolute top-6 right-6 text-white/10">
                <Sparkles size={16} />
              </div>
              <p className="text-sm md:text-xl leading-relaxed italic font-medium text-slate-300 mb-6 md:mb-8">
                "Our Sydney desk is prioritizing your <strong className="text-white font-[900]">{formData.firstAutomationTarget || 'workflow'}</strong> brief."
              </p>
              <div className="flex items-center justify-center gap-2.5 text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-slate-900 bg-white py-3.5 px-6 rounded-full w-fit mx-auto shadow-xl">
                <Mail size={12} md:size={14} strokeWidth={3} />
                Brief Transmitted
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col items-center gap-4 opacity-10">
         <div className="h-px w-full bg-slate-900" />
         <p className="text-[7px] font-black tracking-[0.4em] uppercase">CREATIVE CRM • SYDNEY</p>
      </div>
    </div>
  );
};
