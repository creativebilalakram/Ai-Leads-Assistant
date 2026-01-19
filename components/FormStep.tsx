
import React, { useEffect, useRef } from 'react';
import { FormData, JobTitle, CompanySize, MonthlyRevenue, ImplementationTimeline, BudgetRange } from '../types';
import { ArrowLeft, ArrowRight, Loader2, Check, Sparkles, Building2, Target, BarChart3, Settings2, ShieldCheck, Info } from 'lucide-react';
import { CustomSelect } from './CustomSelect';

interface FormStepProps {
  step: number;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export const FormStep: React.FC<FormStepProps> = ({ 
  step, 
  formData, 
  updateFormData, 
  onNext, 
  onBack,
  isSubmitting 
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleTechToggle = (tool: string) => {
    const current = formData.techStack;
    if (current.includes(tool)) {
      updateFormData({ techStack: current.filter(t => t !== tool) });
    } else {
      updateFormData({ techStack: [...current, tool] });
    }
  };

  const inputClass = "w-full px-5 md:px-7 py-3.5 md:py-5 rounded-2xl border border-slate-200/60 bg-slate-50/30 text-sm md:text-base font-semibold tracking-tight text-slate-900 placeholder:text-slate-400 focus:bg-white transition-all duration-300 shadow-sm";
  const labelClass = "block text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-2";
  const consultantNoteClass = "flex items-start gap-3 p-4 bg-teal-50/30 rounded-2xl border border-teal-100/20";

  const renderFields = () => {
    const fadeIn = "animate-in fade-in slide-in-from-bottom-2 duration-700";
    
    switch (step) {
      case 2:
        return (
          <div className={`space-y-8 md:space-y-12 ${fadeIn}`}>
            <header className="space-y-2 md:space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-teal-50 text-teal-600 text-[8px] md:text-[9px] font-black uppercase tracking-widest border border-teal-100/50">
                <Building2 size={10} strokeWidth={3} />
                Strategic Context
              </div>
              <h2 className="text-2xl md:text-4xl font-[900] text-slate-900 tracking-tight leading-tight">Professional Identity</h2>
              <p className="text-xs md:text-base text-slate-500 font-medium max-w-md">Who is leading this automation initiative?</p>
            </header>
            
            <div className="space-y-5 md:space-y-8">
              <div>
                <label className={labelClass}>Company Name</label>
                <input type="text" value={formData.companyName} onChange={e => updateFormData({ companyName: e.target.value })} placeholder="Business Name" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Your Name</label>
                <input type="text" value={formData.userName} onChange={e => updateFormData({ userName: e.target.value })} placeholder="Your Name" className={inputClass} />
              </div>
              <CustomSelect
                label="Job Title"
                value={formData.jobTitle}
                onChange={val => updateFormData({ jobTitle: val as JobTitle })}
                options={['Founder / Owner', 'Director', 'Operations Manager', 'Sales Manager', 'Marketing Manager', 'Other']}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className={`space-y-8 md:space-y-12 ${fadeIn}`}>
            <header className="space-y-2 md:space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-[8px] md:text-[9px] font-black uppercase tracking-widest border border-blue-100/50">
                Delivery Channels
              </div>
              <h2 className="text-2xl md:text-4xl font-[900] text-slate-900 tracking-tight leading-tight">Communication</h2>
              <p className="text-xs md:text-base text-slate-500 font-medium max-w-md">Where should we deliver your strategy?</p>
            </header>

            <div className="space-y-5 md:space-y-8">
              <div>
                <label className={labelClass}>Work Email</label>
                <input type="email" value={formData.email} onChange={e => updateFormData({ email: e.target.value })} placeholder="you@company.com.au" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Mobile Phone</label>
                <input type="tel" value={formData.phone} onChange={e => updateFormData({ phone: e.target.value })} placeholder="Australian number" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Website (Optional)</label>
                <input type="url" value={formData.website} onChange={e => updateFormData({ website: e.target.value })} placeholder="https://..." className={inputClass} />
              </div>
              <div className={consultantNoteClass}>
                <div className="p-1 bg-white rounded-full text-teal-500"><Info size={12} strokeWidth={3} /></div>
                <p className="text-[10px] md:text-[13px] text-teal-800/60 font-medium italic">Details used strictly for report delivery.</p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className={`space-y-8 md:space-y-12 ${fadeIn}`}>
            <header className="space-y-2 md:space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[8px] md:text-[9px] font-black uppercase tracking-widest">
                <BarChart3 size={10} />
                Market Presence
              </div>
              <h2 className="text-2xl md:text-4xl font-[900] text-slate-900 tracking-tight leading-tight">Operational Scale</h2>
            </header>

            <div className="space-y-6 md:space-y-10">
              <CustomSelect
                label="Current Team Size"
                value={formData.companySize}
                onChange={val => updateFormData({ companySize: val as CompanySize })}
                options={['Solo / Freelancer', 'Small Team (2–10)', 'Growing Business (11–50)', 'Mid-size (51–200)', 'Enterprise (200+)']}
              />
              <CustomSelect
                label="Monthly Revenue (AUD)"
                value={formData.revenue}
                onChange={val => updateFormData({ revenue: val as MonthlyRevenue })}
                options={['Just Starting (< $10k)', 'Early Stage ($10k–$50k)', 'Growing ($50k–$200k)', 'Established ($200k–$1M)', 'Scaled ($1M+)']}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className={`space-y-8 md:space-y-12 ${fadeIn}`}>
            <header className="space-y-2 md:space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[8px] md:text-[9px] font-black uppercase tracking-widest">
                <Settings2 size={10} />
                Tech Stack
              </div>
              <h2 className="text-2xl md:text-4xl font-[900] text-slate-900 tracking-tight leading-tight">Infrastructure</h2>
            </header>

            <div className="grid grid-cols-1 gap-2.5 md:gap-3.5">
              {[
                'CRM (HubSpot, Salesforce, etc)',
                'Email Marketing Tools',
                'WhatsApp Business',
                'Google Sheets / Excel',
                'Zapier / Make',
                'Manual Processes'
              ].map(tool => (
                <button
                  key={tool}
                  onClick={() => handleTechToggle(tool)}
                  className={`group px-5 md:px-8 py-4 md:py-5 text-left rounded-2xl border transition-all duration-300 flex items-center justify-between active:scale-[0.98] ${
                    formData.techStack.includes(tool)
                      ? 'bg-white border-teal-500 shadow-lg text-slate-900 ring-4 ring-teal-500/5'
                      : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  <span className="text-xs md:text-[15px] font-bold tracking-tight">{tool}</span>
                  <div className={`w-5 h-5 md:w-6 md:h-6 shrink-0 rounded-full flex items-center justify-center transition-all ${
                    formData.techStack.includes(tool) ? 'bg-teal-500' : 'bg-slate-100'
                  }`}>
                    {formData.techStack.includes(tool) && <Check size={10} md:size={12} strokeWidth={4} className="text-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className={`space-y-8 md:space-y-12 ${fadeIn}`}>
            <header className="space-y-2 md:space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 text-[8px] md:text-[9px] font-black uppercase tracking-widest">
                <Target size={10} />
                Strategic Focus
              </div>
              <h2 className="text-2xl md:text-4xl font-[900] text-slate-900 tracking-tight leading-tight">Pain Identification</h2>
            </header>

            <div className="space-y-6 md:space-y-10">
              <CustomSelect
                label="Primary Pain Point"
                value={formData.primaryPainPoint}
                onChange={val => updateFormData({ primaryPainPoint: val })}
                options={['Lead follow-up too slow', 'Manual data entry', 'Losing leads', 'Overwhelmed support', 'Admin work', 'Scaling issues']}
              />
              <CustomSelect
                label="Target for Automation"
                value={formData.firstAutomationTarget}
                onChange={val => updateFormData({ firstAutomationTarget: val })}
                options={['Lead capture', 'CRM workflows', 'Onboarding', 'Customer Support', 'Payments', 'Internal Ops']}
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className={`space-y-8 md:space-y-12 ${fadeIn}`}>
            <header className="space-y-2 md:space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 text-[8px] md:text-[9px] font-black uppercase tracking-widest">
                Implementation
              </div>
              <h2 className="text-2xl md:text-4xl font-[900] text-slate-900 tracking-tight leading-tight">Resource Alignment</h2>
            </header>

            <div className="space-y-6 md:space-y-10">
              <CustomSelect
                label="Timeline"
                value={formData.timeline}
                onChange={val => updateFormData({ timeline: val as ImplementationTimeline })}
                options={['Urgent – 1 Month', 'Soon – 2 Months', 'Planning – 6 Months', 'Researching']}
              />
              <CustomSelect
                label="Investment Horizon (AUD)"
                value={formData.budget}
                onChange={val => updateFormData({ budget: val as BudgetRange })}
                options={['$500 – $2,000', '$2,000 – $5,000', '$5,000 – $15,000', '$15,000+', 'Not sure']}
              />
            </div>
          </div>
        );

      case 8:
        return (
          <div className={`space-y-8 md:space-y-12 ${fadeIn}`}>
            <header className="space-y-2 md:space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[8px] md:text-[9px] font-black uppercase tracking-widest">
                <ShieldCheck size={10} />
                Verification
              </div>
              <h2 className="text-2xl md:text-4xl font-[900] text-slate-900 tracking-tight leading-tight">Final Authorization</h2>
            </header>

            <div className="space-y-3 md:space-y-4">
              {[
                { key: 'consentTransactional' as const, text: 'I agree to receive transactional updates.' },
                { key: 'consentMarketing' as const, text: 'I agree to receive strategic follow-ups.' }
              ].map((item) => (
                <button 
                  key={item.key}
                  onClick={() => updateFormData({ [item.key]: !formData[item.key] })}
                  className={`flex items-center gap-4 p-5 md:p-7 rounded-[1.25rem] border transition-all duration-300 text-left w-full active:scale-[0.98] ${
                    formData[item.key] 
                      ? 'bg-white border-teal-500 shadow-md ring-4 ring-teal-500/5' 
                      : 'bg-slate-50/20 border-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-5 h-5 md:w-6 md:h-6 rounded-lg flex items-center justify-center shrink-0 ${
                    formData[item.key] ? 'bg-teal-500' : 'bg-slate-200'
                  }`}>
                    {formData[item.key] && <Check size={10} strokeWidth={4} className="text-white" />}
                  </div>
                  <span className={`text-xs md:text-[15px] font-bold ${formData[item.key] ? 'text-slate-900' : 'text-slate-500'}`}>
                    {item.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 2: return !!(formData.companyName && formData.userName && formData.jobTitle);
      case 3: return !!(formData.email.includes('@') && formData.phone.length > 5);
      case 4: return !!(formData.companySize && formData.revenue);
      case 5: return formData.techStack.length > 0;
      case 6: return !!(formData.primaryPainPoint && formData.firstAutomationTarget);
      case 7: return !!(formData.timeline && formData.budget);
      case 8: return formData.consentTransactional;
      default: return true;
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto h-[100dvh] md:h-auto flex flex-col safe-pb md:py-12">
      <div className="glass-card md:rounded-[2.5rem] flex flex-col h-full md:min-h-[700px] shadow-2xl md:border border-white/80 overflow-hidden relative">
        
        {/* Scroll area with massive bottom padding to allow absolute dropdowns to breathe */}
        <div 
          ref={scrollContainerRef}
          className="relative flex-grow scrollbar-hide overflow-y-auto overflow-x-visible px-6 md:px-12 pt-10 md:pt-14 pb-64 md:pb-72"
        >
          {renderFields()}
        </div>

        {/* Navigation Bar: Low z-index so dropdowns float over it */}
        <div className="absolute bottom-0 left-0 right-0 z-[40] p-6 md:p-10 bg-gradient-to-t from-white via-white/95 to-transparent flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-100/50 backdrop-blur-xl">
           <button
             onClick={onBack}
             className="group flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-slate-900 transition-all font-black text-[9px] md:text-[10px] tracking-widest uppercase active:scale-95"
           >
             <ArrowLeft size={14} strokeWidth={3} className="transition-transform group-hover:-translate-x-1" />
             Back
           </button>
           
           <button
             onClick={onNext}
             disabled={!isStepValid() || isSubmitting}
             className={`w-full md:w-auto px-10 md:px-16 py-4 md:py-5 rounded-full font-black transition-all duration-500 shadow-xl ${
               isStepValid() && !isSubmitting
                 ? 'bg-slate-900 text-white hover:bg-black hover:scale-[1.02] active:scale-95'
                 : 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'
             }`}
           >
             {isSubmitting ? (
               <div className="flex items-center gap-2"><Loader2 className="animate-spin" size={18} /> Processing...</div>
             ) : (
               <div className="flex items-center gap-3 tracking-tight text-base md:text-lg">
                 {step === 8 ? 'Analyze Business' : 'Continue'}
                 <ArrowRight size={18} strokeWidth={3} className="transition-transform group-hover:translate-x-1" />
               </div>
             )}
           </button>
        </div>
      </div>
    </div>
  );
};
