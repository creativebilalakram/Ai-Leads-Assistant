
import React, { useEffect, useState } from 'react';
import { Check, Sparkles, Send, ArrowRight, UserCheck, Mail } from 'lucide-react';
import { FormData } from '../types';

interface SuccessStepProps {
  formData: FormData;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({ formData }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),
      setTimeout(() => setPhase(2), 2500),
      setTimeout(() => setPhase(3), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="text-center animate-in zoom-in-95 duration-1000 flex flex-col items-center max-w-2xl mx-auto px-2 md:px-4">
      <div className="relative mb-6 md:mb-8">
        <div className="absolute inset-0 bg-teal-500/20 blur-[30px] md:blur-[40px] rounded-full animate-pulse" />
        <div className="relative p-5 md:p-6 bg-white shadow-2xl shadow-teal-500/20 text-teal-600 rounded-[1.75rem] md:rounded-[2.25rem] border border-slate-50">
          <UserCheck size={36} md:size={44} strokeWidth={1.5} className="animate-float" />
        </div>
      </div>

      <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 md:mb-5 tracking-tight leading-tight">
        Assessment Received
      </h1>
      
      <p className="text-sm md:text-lg text-slate-500 mb-8 md:mb-10 max-w-lg mx-auto leading-relaxed font-light">
        Excellent, {formData.userName.split(' ')[0]}. Our creative consultancy team is now reviewing your business architecture to develop a high-impact roadmap for <span className="text-slate-900 font-semibold">{formData.companyName}</span>.
      </p>

      <div className="w-full max-w-md space-y-2.5 md:space-y-3.5 mb-10 md:mb-12 text-left px-2">
        {[
          "Reviewing operational friction points...",
          "Synthesizing high-ROI multipliers...",
          "Finalizing your strategic brief..."
        ].map((text, i) => (
          <div key={i} className={`flex items-center gap-3 md:gap-4 p-3.5 md:p-4 rounded-xl md:rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-100 shadow-sm transition-all duration-1000 ${phase >= i + 1 ? 'opacity-100 translate-x-0' : 'opacity-20 -translate-x-4'}`}>
            <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-white transition-all duration-1000 shrink-0 ${phase >= i + 1 ? 'bg-teal-500 scale-110 shadow-lg shadow-teal-500/20' : 'bg-slate-100'}`}>
              <Check size={10} md:size={13} strokeWidth={4} />
            </div>
            <span className="text-[10px] md:text-sm font-bold tracking-[0.1em] md:tracking-[0.15em] text-slate-600 uppercase">{text}</span>
          </div>
        ))}
      </div>

      <div className={`w-full transition-all duration-1000 transform ${phase >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="p-6 md:p-10 bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-3xl rounded-[1.75rem] md:rounded-[2.5rem] border border-white shadow-[0_20px_60px_-15px_rgba(15,23,42,0.1)] text-slate-800 mb-8 md:mb-12 max-w-xl mx-auto relative group overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-500/5 rounded-full blur-3xl" />
          
          <div className="absolute top-4 right-6 md:top-6 md:right-8 text-teal-500/40 group-hover:text-teal-500 transition-colors duration-500">
            <Sparkles size={18} md:size={22} />
          </div>
          <p className="text-base md:text-xl leading-relaxed italic font-medium px-1 text-slate-800 relative z-10">
            "We've identified <strong className="text-teal-600 font-bold">multiple efficiency multipliers</strong> specific to your scale. Our team is refining your custom <span className="underline decoration-teal-500/40 underline-offset-8 decoration-2">{formData.firstAutomationTarget || 'Automation'}</span> strategy."
          </p>
          <div className="mt-5 md:mt-6 flex items-center justify-center gap-2 text-[8px] md:text-[10px] font-extrabold uppercase tracking-[0.15em] md:tracking-[0.2em] text-teal-600/70 bg-teal-50/50 py-1.5 md:py-2 px-3 md:px-4 rounded-full w-fit mx-auto border border-teal-100/50 relative z-10">
            <Mail size={10} md:size={12} strokeWidth={3} />
            Inbox delivery imminent
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 mb-8 px-4">
          <button className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4.5 bg-teal-600 text-white rounded-[1.25rem] font-bold hover:bg-teal-700 hover:shadow-[0_20px_40px_-10px_rgba(20,147,130,0.35)] transition-all duration-500 active:scale-95 whitespace-nowrap">
            Check My Status
            <Send size={16} md:size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
          
          <button className="group flex items-center gap-2.5 text-slate-400 font-bold hover:text-slate-900 transition-all duration-300 text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.25em] uppercase whitespace-nowrap">
            Consultant Access
            <ArrowRight size={14} md:size={16} className="transition-transform group-hover:translate-x-1.5 text-slate-300 group-hover:text-teal-500" />
          </button>
        </div>
      </div>
    </div>
  );
};
