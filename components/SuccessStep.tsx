
import React, { useEffect, useState } from 'react';
import { Check, Mail, ShieldCheck } from 'lucide-react';
import { FormData } from '../types';

interface SuccessStepProps {
  formData: FormData;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({ formData }) => {
  const [phase, setPhase] = useState(0);
  const brandLogo = "https://creativebilal.com/wp-content/uploads/2025/12/Black-Blue-Minimalist-Modern-Initial-Font-Logo.png";

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const firstName = formData.userName.split(' ')[0] || 'Executive';

  return (
    <div className="h-full flex flex-col overflow-y-auto scrollbar-hide px-6 md:px-16 pt-10 md:pt-16 pb-10">
      <div className="flex-grow flex flex-col items-center justify-center text-center max-w-md mx-auto w-full">
        {/* Brand Logo Hero */}
        <div className="relative mb-8 md:mb-12">
          <div className="absolute inset-0 bg-slate-900/5 blur-[50px] rounded-full scale-[1.2]" />
          <div className="relative w-20 h-20 md:w-28 md:h-28 bg-white shadow-2xl rounded-[2rem] md:rounded-[3rem] border border-slate-100 flex items-center justify-center p-5 md:p-7">
            <img 
              src={brandLogo} 
              alt="Creative CRM Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* High-Converting Header */}
        <h1 className="text-4xl md:text-5xl font-[900] text-slate-900 mb-4 tracking-tighter leading-none">
          Thank <span className="text-slate-400">You.</span>
        </h1>
        
        <p className="text-[14px] md:text-16px text-slate-500 mb-10 md:mb-14 leading-relaxed font-medium">
          Strategic profile secured, {firstName}. We are aligning your architecture with current industry benchmarks.
        </p>

        {/* Professional Checklist */}
        <div className="w-full space-y-2.5 mb-10 md:mb-14">
          {[
            "Intelligence Secured",
            "Strategist Assigned",
            "Review in Progress"
          ].map((text, i) => (
            <div 
              key={i} 
              className={`flex items-center gap-4 p-4 rounded-full bg-white border transition-all duration-700 ${
                phase >= i + 1 
                  ? 'opacity-100 translate-y-0 border-slate-900 shadow-lg' 
                  : 'opacity-5 translate-y-2 border-slate-50'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white transition-all duration-500 shrink-0 ${
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

        {/* Team Response Box */}
        {phase >= 3 && (
          <div className="animate-fade-up w-full">
            <div className="p-8 md:p-10 bg-slate-50 rounded-[2.5rem] md:rounded-[3rem] border border-slate-200/50 shadow-sm relative overflow-hidden group">
              <div className="absolute -top-4 -right-4 text-slate-100 group-hover:text-slate-200 transition-colors">
                <ShieldCheck size={48} strokeWidth={1} />
              </div>
              <p className="text-[14px] md:text-[16px] leading-relaxed font-bold text-slate-700 mb-8 relative z-10">
                Our creative team will deliver your personalized strategic briefing shortly.
              </p>
              <div className="flex items-center justify-center gap-3 text-[9px] font-black uppercase tracking-[0.3em] text-white bg-slate-900 py-4 px-8 rounded-full w-fit mx-auto shadow-xl hover:scale-105 transition-transform">
                <Mail size={14} strokeWidth={3} />
                Expert Contact
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 flex flex-col items-center opacity-10">
         <p className="text-[7px] font-black tracking-[0.5em] uppercase">SYDNEY HQ • CREATIVE CRM</p>
      </div>
    </div>
  );
};
