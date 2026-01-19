
import React, { useEffect, useState } from 'react';
import { Check, Sparkles, ArrowRight, Layers, Mail } from 'lucide-react';
import { FormData } from '../types';

interface SuccessStepProps {
  formData: FormData;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({ formData }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),
      setTimeout(() => setPhase(2), 2200),
      setTimeout(() => setPhase(3), 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const firstName = formData.userName.split(' ')[0];

  return (
    <div className="h-full flex flex-col overflow-y-auto scrollbar-hide px-8 md:px-16 pt-16 pb-16">
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-slate-900/5 blur-[50px] rounded-full animate-pulse" />
          <div className="relative w-24 h-24 bg-white shadow-xl text-slate-900 rounded-[2.5rem] border border-slate-100 flex items-center justify-center">
            <Layers size={40} strokeWidth={1} />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-[900] text-slate-900 mb-6 tracking-tighter leading-[1]">
          Creative <span className="font-light italic text-slate-400">Analysis</span> Underway
        </h1>
        
        <p className="text-sm md:text-lg text-slate-400 mb-10 max-w-sm mx-auto leading-relaxed font-medium">
          Excellent, {firstName}. Creative CRM is distilling your data into a high-ROI automation architecture.
        </p>

        <div className="w-full max-w-sm space-y-3 mb-12">
          {[
            "Calibrating system constraints...",
            "Mapping automation multipliers...",
            "Finalizing strategy brief..."
          ].map((text, i) => (
            <div 
              key={i} 
              className={`flex items-center gap-5 p-5 rounded-[2rem] bg-white border transition-all duration-700 ${
                phase >= i + 1 
                  ? 'opacity-100 translate-y-0 border-slate-900 shadow-lg' 
                  : 'opacity-20 translate-y-2 border-slate-100'
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white transition-all duration-700 shrink-0 ${
                phase >= i + 1 ? 'bg-slate-900' : 'bg-slate-100'
              }`}>
                <Check size={12} strokeWidth={4} />
              </div>
              <span className="text-[10px] font-black tracking-[0.2em] text-slate-900 uppercase text-left leading-none">
                {text}
              </span>
            </div>
          ))}
        </div>

        {phase >= 3 && (
          <div className="animate-fade-in w-full max-w-md">
            <div className="p-10 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden group">
              <div className="absolute top-8 right-8 text-white/10">
                <Sparkles size={24} />
              </div>
              <p className="text-lg md:text-xl leading-[1.4] italic font-medium text-slate-300 mb-8">
                "Your scale indicates a <strong className="text-white font-[900]">critical leverage point</strong>. Our Sydney desk is prioritizing your {formData.firstAutomationTarget || 'workflow'} brief."
              </p>
              <div className="flex items-center justify-center gap-3 text-[9px] font-black uppercase tracking-[0.3em] text-slate-900 bg-white py-3.5 px-6 rounded-full w-fit mx-auto hover:scale-105 transition-transform duration-500">
                <Mail size={14} strokeWidth={3} />
                Strategic Brief Sent
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 flex flex-col items-center gap-6 opacity-20 grayscale">
         <div className="h-px w-full bg-slate-200" />
         <p className="text-[9px] font-black tracking-[0.4em] uppercase">CREATIVE CRM • SYDNEY</p>
      </div>
    </div>
  );
};
