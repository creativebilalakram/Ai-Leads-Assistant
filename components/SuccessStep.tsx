
import React, { useEffect, useState } from 'react';
import { Check, Sparkles, Send, ArrowRight, UserCheck, Mail, Clock } from 'lucide-react';
import { FormData } from '../types';

interface SuccessStepProps {
  formData: FormData;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({ formData }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1200),
      setTimeout(() => setPhase(2), 2800),
      setTimeout(() => setPhase(3), 4500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const firstName = formData.userName.split(' ')[0];

  return (
    <div className="text-center animate-in fade-in zoom-in-95 duration-1000 flex flex-col items-center max-w-2xl mx-auto px-4 py-8 md:py-0">
      
      {/* User Icon Header */}
      <div className="relative mb-8 md:mb-10">
        <div className="absolute inset-0 bg-teal-500/15 blur-[40px] rounded-full animate-pulse" />
        <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white shadow-[0_20px_50px_-15px_rgba(20,184,166,0.15)] text-teal-600 rounded-[2rem] md:rounded-[2.5rem] border border-slate-50 flex items-center justify-center">
          <UserCheck size={36} md:size={42} strokeWidth={1.5} className="animate-float" />
        </div>
      </div>

      <h1 className="text-4xl md:text-6xl font-[900] text-slate-900 mb-6 tracking-tight leading-tight">
        Assessment Received
      </h1>
      
      <p className="text-base md:text-xl text-slate-500 mb-10 md:mb-14 max-w-xl mx-auto leading-relaxed font-medium">
        Excellent, {firstName}. Our creative consultancy team is now reviewing your business architecture to develop a high-impact roadmap for <span className="text-slate-900 font-bold underline decoration-teal-500/20 underline-offset-4">Australia</span>.
      </p>

      {/* Progress Checklist Area */}
      <div className="w-full max-w-md space-y-3.5 mb-14 md:mb-16">
        {[
          "Reviewing operational friction points...",
          "Synthesizing high-ROI multipliers...",
          "Finalizing your strategic brief..."
        ].map((text, i) => (
          <div 
            key={i} 
            className={`flex items-center gap-4 md:gap-5 p-5 md:p-6 rounded-[1.75rem] bg-white/70 backdrop-blur-xl border transition-all duration-1000 ${
              phase >= i + 1 
                ? 'opacity-100 translate-x-0 border-teal-500/20 shadow-xl shadow-teal-500/5' 
                : 'opacity-20 -translate-x-4 border-slate-100'
            }`}
          >
            <div className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-white transition-all duration-1000 shrink-0 ${
              phase >= i + 1 ? 'bg-teal-500 scale-110 shadow-lg shadow-teal-500/30' : 'bg-slate-100'
            }`}>
              <Check size={12} md:size={14} strokeWidth={4} />
            </div>
            <span className="text-[10px] md:text-xs font-black tracking-[0.2em] md:tracking-[0.25em] text-slate-500 uppercase text-left leading-none">
              {text}
            </span>
          </div>
        ))}
      </div>

      {/* Insight Quote Card (Matches image style) */}
      <div className={`w-full transition-all duration-[1500ms] transform ease-out ${phase >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
        <div className="p-8 md:p-14 bg-gradient-to-br from-white via-white/95 to-slate-50/50 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[3.5rem] border border-white shadow-[0_40px_100px_-20px_rgba(15,23,42,0.12)] text-slate-800 mb-12 md:mb-16 max-w-xl mx-auto relative group overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/[0.03] rounded-full blur-3xl" />
          
          <div className="absolute top-6 right-8 text-teal-500/30">
            <Sparkles size={24} className="animate-pulse" />
          </div>

          <p className="text-lg md:text-2xl leading-[1.6] italic font-semibold text-slate-700 relative z-10">
            "We've identified <strong className="text-teal-600 font-[900]">multiple efficiency multipliers</strong> specific to your scale. Our team is refining your custom <span className="underline decoration-teal-500/40 underline-offset-8 decoration-[3px]">{formData.firstAutomationTarget || 'Customer Onboarding'}</span> strategy."
          </p>
          
          <div className="mt-8 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-teal-600 bg-teal-50/60 py-2.5 px-5 rounded-full w-fit mx-auto border border-teal-100/50 relative z-10 shadow-sm shadow-teal-500/5">
            <Mail size={14} strokeWidth={3} />
            Inbox Delivery Imminent
          </div>
        </div>

        {/* Action Section (Clean & Secondary CTAs) */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-10">
          <button className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-teal-600/90 text-white rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-teal-600 hover:shadow-[0_20px_40px_-10px_rgba(20,184,166,0.4)] transition-all duration-500 active:scale-95">
            Check My Status
            <Send size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
          
          <button className="group flex items-center gap-2.5 text-slate-400 font-black hover:text-slate-900 transition-all duration-300 text-xs tracking-[0.2em] uppercase">
            Consultant Access
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5 text-slate-300 group-hover:text-teal-500" />
          </button>
        </div>

        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em] mb-12">
          Thank you for choosing Lumina Strategic Services
        </p>
      </div>
    </div>
  );
};
