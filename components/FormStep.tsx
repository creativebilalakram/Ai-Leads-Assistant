
import React, { useEffect, useRef } from 'react';
import { FormData, JobTitle, CompanySize, MonthlyRevenue, ImplementationTimeline, BudgetRange } from '../types';
import { ArrowLeft, ArrowRight, Loader2, Check, Sparkles, Building2, Target, BarChart3, Settings2, ShieldCheck } from 'lucide-react';
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

  const inputClass = "w-full px-6 md:px-7 py-[1rem] md:py-[1.25rem] rounded-[1.25rem] md:rounded-[1.5rem] border border-slate-200/60 bg-slate-50/50 text-sm font-semibold tracking-tight text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-[8px] focus:ring-teal-500/5 focus:border-teal-500/50 focus:bg-white transition-all duration-500 shadow-sm hover:bg-slate-50";
  const labelClass = "block text-[9px] md:text-[10px] font-extrabold uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-400 mb-3 md:mb-4 ml-2";

  const renderFields = () => {
    const fadeIn = "animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out fill-mode-forwards";
    
    switch (step) {
      case 2:
        return (
          <div className={`space-y-10 md:space-y-12 ${fadeIn}`}>
            <header className="space-y-3 md:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 md:py-1.5 rounded-full bg-teal-50/80 text-teal-600 text-[8px] md:text-[9px] font-[800] uppercase tracking-[0.2em] md:tracking-[0.25em] backdrop-blur-sm border border-teal-100/50">
                <Building2 size={12} strokeWidth={2.5} />
                Strategic Context
              </div>
              <h2 className="text-2xl md:text-3xl font-[800] text-slate-900 tracking-tight leading-tight">Enterprise Identity</h2>
              <p className="text-slate-500 font-medium text-xs md:text-sm leading-relaxed max-w-md">Establishing the context for your bespoke diagnostic.</p>
            </header>
            <div className="space-y-7 md:space-y-8 relative">
              <div>
                <label className={labelClass}>Legal Entity Name</label>
                <input 
                  type="text"
                  autoComplete="organization"
                  value={formData.companyName}
                  onChange={e => updateFormData({ companyName: e.target.value })}
                  placeholder="e.g. Lumina Solutions Pty Ltd"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Consultant Contact Name</label>
                <input 
                  type="text"
                  autoComplete="name"
                  value={formData.userName}
                  onChange={e => updateFormData({ userName: e.target.value })}
                  placeholder="Your Full Name"
                  className={inputClass}
                />
              </div>
              <CustomSelect
                label="Professional Role"
                value={formData.jobTitle}
                onChange={val => updateFormData({ jobTitle: val as JobTitle })}
                options={['Founder / Owner', 'Director', 'Operations Manager', 'Sales Manager', 'Marketing Manager', 'Other']}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className={`space-y-10 md:space-y-12 ${fadeIn}`}>
            <header className="space-y-3 md:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50/80 text-blue-600 text-[8px] md:text-[9px] font-[800] uppercase tracking-[0.2em] md:tracking-[0.25em] backdrop-blur-sm border border-blue-100/50">
                Step 02 / Matrix
              </div>
              <h2 className="text-2xl md:text-3xl font-[800] text-slate-900 tracking-tight leading-tight">Secure Channels</h2>
              <p className="text-slate-500 font-medium text-xs md:text-sm leading-relaxed max-w-md">Where should we deliver your high-impact brief?</p>
            </header>
            <div className="space-y-7 md:space-y-8">
              <div>
                <label className={labelClass}>Business Email</label>
                <input 
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={e => updateFormData({ email: e.target.value })}
                  placeholder="name@company.com.au"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Direct Contact Number</label>
                <input 
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={e => updateFormData({ phone: e.target.value })}
                  placeholder="0400 000 000"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Digital Hub (Optional)</label>
                <input 
                  type="url"
                  autoComplete="url"
                  value={formData.website}
                  onChange={e => updateFormData({ website: e.target.value })}
                  placeholder="https://company.com.au"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className={`space-y-10 md:space-y-12 ${fadeIn}`}>
            <header className="space-y-3 md:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50/80 text-emerald-600 text-[8px] md:text-[9px] font-[800] uppercase tracking-[0.2em] md:tracking-[0.25em] backdrop-blur-sm border border-emerald-100/50">
                <BarChart3 size={12} strokeWidth={2.5} />
                Magnitude Review
              </div>
              <h2 className="text-2xl md:text-3xl font-[800] text-slate-900 tracking-tight leading-tight">Enterprise Scale</h2>
              <p className="text-slate-500 font-medium text-xs md:text-sm leading-relaxed max-w-md">Calibrating recommendations to your operational complexity.</p>
            </header>
            <div className="space-y-9 md:space-y-10">
              <CustomSelect
                label="Human Capital Volume"
                value={formData.companySize}
                onChange={val => updateFormData({ companySize: val as CompanySize })}
                options={['Solo / Freelancer', 'Small Team (2–10)', 'Growing Business (11–50)', 'Mid-size (51–200)', 'Enterprise (200+)']}
              />
              <CustomSelect
                label="Annual Revenue Velocity (AUD)"
                value={formData.revenue}
                onChange={val => updateFormData({ revenue: val as MonthlyRevenue })}
                options={['Just Starting (< $10k)', 'Early Stage ($10k–$50k)', 'Growing ($50k–$200k)', 'Established ($200k–$1M)', 'Scaled ($1M+)']}
                helperText="Helps our team determine relevant ROI benchmarks for your niche."
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className={`space-y-10 md:space-y-12 ${fadeIn}`}>
            <header className="space-y-3 md:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50/80 text-indigo-600 text-[8px] md:text-[9px] font-[800] uppercase tracking-[0.2em] md:tracking-[0.25em] backdrop-blur-sm border border-indigo-100/50">
                <Settings2 size={12} strokeWidth={2.5} />
                Tech Ecosystem
              </div>
              <h2 className="text-2xl md:text-3xl font-[800] text-slate-900 tracking-tight leading-tight">Digital Stack</h2>
              <p className="text-slate-500 font-medium text-xs md:text-sm leading-relaxed max-w-md">Identifying connectivity gaps between your existing core tools.</p>
            </header>
            <div className="grid grid-cols-1 gap-3 md:gap-3.5">
              {[
                'CRM / Sales Platforms',
                'Email Automation Tools',
                'Messaging (WhatsApp/Slack)',
                'Spreadsheet Workflows',
                'Low-Code (Make/Zapier)',
                'Manual Workflows',
                'Custom Core Applications'
              ].map(tool => (
                <button
                  key={tool}
                  onClick={() => handleTechToggle(tool)}
                  className={`group relative px-6 md:px-7 py-4 md:py-5 text-left rounded-[1.25rem] md:rounded-[1.75rem] border transition-all duration-500 flex items-center justify-between ${
                    formData.techStack.includes(tool)
                      ? 'bg-teal-500/5 border-teal-500/40 text-teal-900 ring-[6px] ring-teal-500/5 shadow-md'
                      : 'bg-white border-slate-100/80 text-slate-500 hover:border-slate-300 hover:bg-slate-50/50 shadow-sm'
                  }`}
                >
                  <span className="text-[13px] md:text-[14px] font-bold tracking-tight pr-4">{tool}</span>
                  <div className={`w-6 h-6 md:w-7.5 md:h-7.5 shrink-0 aspect-square rounded-full flex items-center justify-center transition-all duration-500 ${
                    formData.techStack.includes(tool) 
                      ? 'bg-teal-500 scale-110 shadow-lg shadow-teal-500/30' 
                      : 'bg-slate-100 group-hover:bg-slate-200'
                  }`}>
                    {formData.techStack.includes(tool) && <Check size={12} md:size={14} strokeWidth={4} className="text-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className={`space-y-10 md:space-y-12 ${fadeIn}`}>
            <header className="space-y-3 md:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50/80 text-rose-600 text-[8px] md:text-[9px] font-[800] uppercase tracking-[0.2em] md:tracking-[0.25em] backdrop-blur-sm border border-rose-100/50">
                <Target size={12} strokeWidth={2.5} />
                Pain-Point Diagnostic
              </div>
              <h2 className="text-2xl md:text-3xl font-[800] text-slate-900 tracking-tight leading-tight">Operational Friction</h2>
              <p className="text-slate-500 font-medium text-xs md:text-sm leading-relaxed max-w-md">Locating the highest leverage point for automation ROI.</p>
            </header>
            <div className="space-y-9 md:space-y-10">
              <CustomSelect
                label="Primary Constraint"
                value={formData.primaryPainPoint}
                onChange={val => updateFormData({ primaryPainPoint: val })}
                options={[
                  'Lead follow-up latency',
                  'Manual data-entry overhead',
                  'Revenue loss from response time',
                  'Support team capacity overload',
                  'Repetitive admin workflows',
                  'Inability to scale headcount'
                ]}
              />
              <CustomSelect
                label="Highest Leverage Objective"
                value={formData.firstAutomationTarget}
                onChange={val => updateFormData({ firstAutomationTarget: val })}
                options={[
                  'Intelligent Lead Capture',
                  'Sales Pipeline Automation',
                  'Client Onboarding Systems',
                  'Tier-1 Support Automation',
                  'Payment & Invoice Ops',
                  'Internal Admin Sync'
                ]}
                helperText="Prioritize for immediate strategic impact."
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className={`space-y-10 md:space-y-12 ${fadeIn}`}>
            <header className="space-y-3 md:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50/80 text-amber-600 text-[8px] md:text-[9px] font-[800] uppercase tracking-[0.2em] md:tracking-[0.25em] backdrop-blur-sm border border-amber-100/50">
                Step 06 / Velocity
              </div>
              <h2 className="text-2xl md:text-3xl font-[800] text-slate-900 tracking-tight leading-tight">Deployment Profile</h2>
              <p className="text-slate-500 font-medium text-xs md:text-sm leading-relaxed max-w-md">Aligning the roadmap with your growth horizon.</p>
            </header>
            <div className="space-y-9 md:space-y-10">
              <CustomSelect
                label="Target Deployment Horizon"
                value={formData.timeline}
                onChange={val => updateFormData({ timeline: val as ImplementationTimeline })}
                options={['Urgent – This month', 'Soon – 1–2 months', 'Planning – 3–6 months', 'Exploring – Just researching']}
              />
              <CustomSelect
                label="Strategic Investment Tier (AUD)"
                value={formData.budget}
                onChange={val => updateFormData({ budget: val as BudgetRange })}
                options={['Testing Phase ($500 – $2,000)', 'Starter Investment ($2,000 – $5,000)', 'Serious Implementation ($5,000 – $15,000)', 'Enterprise Solution ($15,000+)', 'Not sure – depends on ROI']}
                helperText="Options tailored to both emerging and established enterprises."
              />
            </div>
          </div>
        );

      case 8:
        return (
          <div className={`space-y-10 md:space-y-12 ${fadeIn}`}>
            <header className="space-y-3 md:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/80 text-slate-600 text-[8px] md:text-[9px] font-[800] uppercase tracking-[0.2em] md:tracking-[0.25em] backdrop-blur-sm border border-slate-200/50">
                <ShieldCheck size={12} strokeWidth={2.5} />
                Final Protocols
              </div>
              <h2 className="text-2xl md:text-3xl font-[800] text-slate-900 tracking-tight leading-tight">Data Governance</h2>
              <p className="text-slate-500 font-medium text-xs md:text-sm leading-relaxed max-w-md">Securing your diagnostics and preferences.</p>
            </header>
            <div className="space-y-4 md:space-y-5">
              {[
                { key: 'consentTransactional' as const, text: 'I agree to receive the bespoke diagnostic and operational roadmap.' },
                { key: 'consentMarketing' as const, text: 'Inform me of high-level automation shifts and strategic insights.' }
              ].map((item) => (
                <button 
                  key={item.key}
                  onClick={() => updateFormData({ [item.key]: !formData[item.key] })}
                  className={`flex items-start gap-4 md:gap-5 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border transition-all duration-500 text-left w-full ${
                    formData[item.key] 
                      ? 'bg-white border-teal-500 ring-[6px] md:ring-[8px] ring-teal-500/5 shadow-xl shadow-teal-500/5' 
                      : 'bg-slate-50/50 border-slate-200/60 hover:border-slate-300'
                  }`}
                >
                  <div className={`mt-0.5 w-6 h-6 md:w-6.5 md:h-6.5 rounded-lg flex items-center justify-center transition-all duration-500 shrink-0 ${
                    formData[item.key] ? 'bg-teal-500 shadow-lg shadow-teal-500/30' : 'bg-slate-200'
                  }`}>
                    {formData[item.key] && <Check size={12} md:size={14} strokeWidth={4} className="text-white" />}
                  </div>
                  <span className={`text-[13px] md:text-[14px] font-semibold leading-relaxed tracking-tight ${formData[item.key] ? 'text-slate-900' : 'text-slate-500'}`}>
                    {item.text}
                  </span>
                </button>
              ))}

              <div className="p-6 md:p-8 bg-slate-100/40 rounded-[1.75rem] md:rounded-[2.25rem] mt-6 md:mt-10 backdrop-blur-sm">
                <p className="text-[8px] md:text-[10px] text-slate-400 leading-relaxed font-[800] uppercase tracking-[0.15em] md:tracking-[0.25em]">
                  Compliance Brief: Australian Spam Act 2003 Sovereign. Data is exclusively reviewed by Lumina lead consultants.
                </p>
              </div>
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
    <div className="relative w-full max-w-2xl mx-auto h-[100dvh] md:h-[820px] flex flex-col">
      <div className="glass-card rounded-[2.5rem] md:rounded-[4rem] flex flex-col h-full shadow-[0_40px_100px_-30px_rgba(15,23,42,0.18)] md:shadow-[0_80px_160px_-40px_rgba(15,23,42,0.22)] border border-white/80 overflow-hidden transition-all duration-700">
        
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-teal-500/5 rounded-bl-[100px] md:rounded-bl-[180px] pointer-events-none z-0" />

        {/* Dynamic Scrollable Area */}
        <div 
          ref={scrollContainerRef}
          className="flex-grow scrollbar-hide overflow-y-auto px-6 md:px-14 pt-8 md:pt-14 z-10"
        >
          <div className="pb-32 pt-2">
            {renderFields()}
          </div>
        </div>

        {/* Anchored Nav Footer - Flex Block, No Absolute Overlay Issues */}
        <div className="flex-shrink-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 px-6 md:px-14 py-6 md:py-10 z-[50] safe-pb">
           <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
              <button
                onClick={onBack}
                className="group flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 text-slate-400 hover:text-slate-900 transition-all font-[800] text-[9px] md:text-[11px] order-2 md:order-1 tracking-[0.2em] md:tracking-[0.3em] uppercase"
              >
                <ArrowLeft size={16} strokeWidth={3} className="transition-transform group-hover:-translate-x-1.5" />
                Previous
              </button>
              
              <button
                onClick={onNext}
                disabled={!isStepValid() || isSubmitting}
                className={`w-full md:w-auto flex items-center justify-center gap-3 md:gap-4 px-10 md:px-16 py-4 md:py-6 rounded-full font-[800] transition-all duration-500 order-1 md:order-2 ${
                  isStepValid() && !isSubmitting
                    ? 'bg-[#0f172a] text-white hover:bg-black shadow-[0_20px_50px_-10px_rgba(15,23,42,0.4)] md:shadow-[0_30px_70px_-20px_rgba(15,23,42,0.6)] hover:scale-[1.02] active:scale-95'
                    : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Processing...
                  </>
                ) : step === 8 ? (
                  <span className="flex items-center gap-3 tracking-tight text-base md:text-lg">
                    Complete Analysis
                    <Sparkles size={18} />
                  </span>
                ) : (
                  <div className="flex items-center gap-3 tracking-tight text-base md:text-lg">
                    Continue
                    <ArrowRight size={22} strokeWidth={3} className="transition-transform group-hover:translate-x-2" />
                  </div>
                )}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
