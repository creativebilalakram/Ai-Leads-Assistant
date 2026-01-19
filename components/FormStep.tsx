
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

  const inputClass = "w-full px-6 md:px-9 py-4 md:py-6 rounded-[1.25rem] md:rounded-[1.75rem] border border-slate-200/70 bg-slate-50/40 text-sm md:text-base font-semibold tracking-tight text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-[10px] focus:ring-teal-500/5 focus:border-teal-500/50 focus:bg-white transition-all duration-500 shadow-sm hover:bg-slate-50";
  const labelClass = "block text-[9px] md:text-[10px] font-extrabold uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-400 mb-2 md:mb-4 ml-3";
  const consultantNoteClass = "flex items-start gap-3 p-4 md:p-6 bg-teal-50/40 rounded-2xl md:rounded-[1.75rem] border border-teal-100/30 animate-in fade-in duration-1000";

  const renderFields = () => {
    const fadeIn = "animate-in fade-in slide-in-from-bottom-4 md:slide-in-from-bottom-8 duration-700 ease-out fill-mode-forwards";
    
    switch (step) {
      case 2:
        return (
          <div className={`space-y-8 md:space-y-16 ${fadeIn}`}>
            <header className="space-y-3 md:space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:py-2 rounded-full bg-teal-50/80 text-teal-600 text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] md:tracking-[0.25em] backdrop-blur-sm border border-teal-100/50">
                <Building2 size={12} strokeWidth={2.5} />
                Strategic Context
              </div>
              <h2 className="text-2xl md:text-5xl font-[900] text-slate-900 tracking-tight leading-tight">Professional Identity</h2>
              <p className="text-sm md:text-lg text-slate-500 font-medium leading-relaxed max-w-xl">We begin by understanding who is leading this automation initiative.</p>
            </header>
            
            <div className="space-y-6 md:space-y-10">
              <div>
                <label className={labelClass}>Company Name</label>
                <input 
                  type="text"
                  autoComplete="organization"
                  value={formData.companyName}
                  onChange={e => updateFormData({ companyName: e.target.value })}
                  placeholder="e.g. Acme Solar Solutions"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Your Name</label>
                <input 
                  type="text"
                  autoComplete="name"
                  value={formData.userName}
                  onChange={e => updateFormData({ userName: e.target.value })}
                  placeholder="How should we address you?"
                  className={inputClass}
                />
              </div>
              <div>
                <CustomSelect
                  label="Job Title"
                  value={formData.jobTitle}
                  onChange={val => updateFormData({ jobTitle: val as JobTitle })}
                  options={['Founder / Owner', 'Director', 'Operations Manager', 'Sales Manager', 'Marketing Manager', 'Other']}
                  helperText="Tailors recommendations to your operational perspective."
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className={`space-y-8 md:space-y-16 ${fadeIn}`}>
            <header className="space-y-3 md:space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:py-2 rounded-full bg-blue-50/80 text-blue-600 text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] md:tracking-[0.25em] backdrop-blur-sm border border-blue-100/50">
                Communication channels
              </div>
              <h2 className="text-2xl md:text-5xl font-[900] text-slate-900 tracking-tight leading-tight">Delivery Channels</h2>
              <p className="text-sm md:text-lg text-slate-500 font-medium leading-relaxed max-w-xl">Where should we deliver your personalised strategy?</p>
            </header>

            <div className="space-y-6 md:space-y-10">
              <div>
                <label className={labelClass}>Work Email (Required)</label>
                <input 
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={e => updateFormData({ email: e.target.value })}
                  placeholder="you@company.com.au"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Mobile Phone (Required)</label>
                <input 
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={e => updateFormData({ phone: e.target.value })}
                  placeholder="Direct Australian number"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Company Website (Optional)</label>
                <input 
                  type="url"
                  autoComplete="url"
                  value={formData.website}
                  onChange={e => updateFormData({ website: e.target.value })}
                  placeholder="https://www.business.com.au"
                  className={inputClass}
                />
              </div>
              
              <div className={consultantNoteClass}>
                <Info size={18} className="text-teal-500 mt-0.5 shrink-0" />
                <p className="text-[11px] md:text-sm text-teal-800/70 leading-relaxed font-semibold italic">
                  Privacy Pledge: Your details are used exclusively for sending results and professional follow-up.
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className={`space-y-8 md:space-y-16 ${fadeIn}`}>
            <header className="space-y-3 md:space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:py-2 rounded-full bg-emerald-50/80 text-emerald-600 text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] md:tracking-[0.25em] backdrop-blur-sm border border-emerald-100/50">
                <BarChart3 size={12} strokeWidth={2.5} />
                Market Presence
              </div>
              <h2 className="text-2xl md:text-5xl font-[900] text-slate-900 tracking-tight leading-tight">Operational Scale</h2>
              <p className="text-sm md:text-lg text-slate-500 font-medium leading-relaxed max-w-xl">Gaining a sense of your scope helps us calculate the potential ROI.</p>
            </header>

            <div className="space-y-8 md:space-y-12">
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
                helperText="Matches recommendations to your operational scale."
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className={`space-y-8 md:space-y-16 ${fadeIn}`}>
            <header className="space-y-3 md:space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:py-2 rounded-full bg-indigo-50/80 text-indigo-600 text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] md:tracking-[0.25em] backdrop-blur-sm border border-indigo-100/50">
                <Settings2 size={12} strokeWidth={2.5} />
                Current Tech Stack
              </div>
              <h2 className="text-2xl md:text-5xl font-[900] text-slate-900 tracking-tight leading-tight">Digital Infrastructure</h2>
              <p className="text-sm md:text-lg text-slate-500 font-medium leading-relaxed max-w-xl">Select current tools. We look for high-leverage "gaps" between them.</p>
            </header>

            <div className="grid grid-cols-1 gap-3 md:gap-5">
              {[
                'CRM (HubSpot, Salesforce, etc)',
                'Email Marketing (Mailchimp, ActiveCampaign, etc)',
                'WhatsApp Business',
                'Google Sheets / Excel',
                'Zapier / Make',
                'None – Manual Process',
                'Other'
              ].map(tool => (
                <button
                  key={tool}
                  onClick={() => handleTechToggle(tool)}
                  className={`group relative px-6 md:px-10 py-4 md:py-7 text-left rounded-[1.25rem] md:rounded-[2rem] border transition-all duration-500 flex items-center justify-between active:scale-[0.98] ${
                    formData.techStack.includes(tool)
                      ? 'bg-white border-teal-500 ring-[8px] md:ring-[10px] ring-teal-500/5 text-slate-900 shadow-xl shadow-teal-500/10'
                      : 'bg-white border-slate-100/80 text-slate-500 hover:border-slate-300 hover:bg-slate-50/50 shadow-sm'
                  }`}
                >
                  <span className="text-sm md:text-lg font-bold tracking-tight pr-6">{tool}</span>
                  <div className={`w-7 h-7 md:w-9 md:h-9 shrink-0 rounded-full flex items-center justify-center transition-all duration-500 ${
                    formData.techStack.includes(tool) 
                      ? 'bg-teal-500 scale-110 shadow-lg shadow-teal-500/30' 
                      : 'bg-slate-100 group-hover:bg-slate-200'
                  }`}>
                    {formData.techStack.includes(tool) && <Check size={14} md:size={18} strokeWidth={4} className="text-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className={`space-y-8 md:space-y-16 ${fadeIn}`}>
            <header className="space-y-3 md:space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:py-2 rounded-full bg-rose-50/80 text-rose-600 text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] md:tracking-[0.25em] backdrop-blur-sm border border-rose-100/50">
                <Target size={12} strokeWidth={2.5} />
                Strategic Focus
              </div>
              <h2 className="text-2xl md:text-5xl font-[900] text-slate-900 tracking-tight leading-tight">Problem Identification</h2>
              <p className="text-sm md:text-lg text-slate-500 font-medium leading-relaxed max-w-xl">Pinpointing exactly where manual work slows you down.</p>
            </header>

            <div className="space-y-8 md:space-y-12">
              <CustomSelect
                label="Primary Operational Pain Point"
                value={formData.primaryPainPoint}
                onChange={val => updateFormData({ primaryPainPoint: val })}
                options={[
                  'Lead follow-up takes too long',
                  'Manual data entry killing productivity',
                  'Losing leads due to slow response',
                  'Customer support overwhelming team',
                  'Repetitive admin work',
                  'Scaling without hiring more staff'
                ]}
              />
              <CustomSelect
                label="Highest Priority for Automation"
                value={formData.firstAutomationTarget}
                onChange={val => updateFormData({ firstAutomationTarget: val })}
                options={[
                  'Lead capture & follow-up',
                  'Sales pipeline & CRM',
                  'Customer onboarding',
                  'Customer support',
                  'Invoicing & payments',
                  'Internal workflows'
                ]}
                helperText="We start with your biggest point of leverage."
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className={`space-y-8 md:space-y-16 ${fadeIn}`}>
            <header className="space-y-3 md:space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:py-2 rounded-full bg-amber-50/80 text-amber-600 text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] md:tracking-[0.25em] backdrop-blur-sm border border-amber-100/50">
                Implementation Profile
              </div>
              <h2 className="text-2xl md:text-5xl font-[900] text-slate-900 tracking-tight leading-tight">Resource Alignment</h2>
              <p className="text-sm md:text-lg text-slate-500 font-medium leading-relaxed max-w-xl">Aligning with your specific timeline and investment readiness.</p>
            </header>

            <div className="space-y-8 md:space-y-12">
              <CustomSelect
                label="Anticipated Timeline"
                value={formData.timeline}
                onChange={val => updateFormData({ timeline: val as ImplementationTimeline })}
                options={['Urgent – Need solution this month', 'Soon – Within 1–2 months', 'Planning – 3–6 months', 'Exploring – Just researching']}
              />
              <CustomSelect
                label="Budget Horizon for Automation (AUD)"
                value={formData.budget}
                onChange={val => updateFormData({ budget: val as BudgetRange })}
                options={['Testing Phase ($500 – $2,000)', 'Starter Investment ($2,000 – $5,000)', 'Serious Implementation ($5,000 – $15,000)', 'Enterprise Solution ($15,000+)', 'Not sure – depends on ROI']}
                helperText="Recommending the most cost-effective path for your stage."
              />
            </div>
          </div>
        );

      case 8:
        return (
          <div className={`space-y-8 md:space-y-16 ${fadeIn}`}>
            <header className="space-y-3 md:space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:py-2 rounded-full bg-slate-100/80 text-slate-600 text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] md:tracking-[0.25em] backdrop-blur-sm border border-slate-200/50">
                <ShieldCheck size={12} strokeWidth={2.5} />
                Consent & Confirmation
              </div>
              <h2 className="text-2xl md:text-5xl font-[900] text-slate-900 tracking-tight leading-tight">Final Authorization</h2>
              <p className="text-sm md:text-lg text-slate-500 font-medium leading-relaxed max-w-xl">Confirm your preferences to begin the AI analysis.</p>
            </header>

            <div className="space-y-3.5 md:space-y-5">
              {[
                { key: 'consentTransactional' as const, text: 'I agree to receive transactional messages (appointments, updates, etc).' },
                { key: 'consentMarketing' as const, text: 'I agree to receive personalised marketing and follow-up messages.' }
              ].map((item) => (
                <button 
                  key={item.key}
                  onClick={() => updateFormData({ [item.key]: !formData[item.key] })}
                  className={`flex items-start gap-4 md:gap-6 p-5 md:p-9 rounded-[1.5rem] md:rounded-[2.25rem] border transition-all duration-500 text-left w-full active:scale-[0.98] ${
                    formData[item.key] 
                      ? 'bg-white border-teal-500 ring-[8px] md:ring-[10px] ring-teal-500/5 shadow-2xl shadow-teal-500/10' 
                      : 'bg-slate-50/40 border-slate-200/60 hover:border-slate-300'
                  }`}
                >
                  <div className={`mt-0.5 w-6 h-6 md:w-8 md:h-8 rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-500 shrink-0 ${
                    formData[item.key] ? 'bg-teal-500 shadow-lg shadow-teal-500/30' : 'bg-slate-200'
                  }`}>
                    {formData[item.key] && <Check size={12} md:size={18} strokeWidth={4} className="text-white" />}
                  </div>
                  <span className={`text-[13px] md:text-lg font-bold leading-snug tracking-tight ${formData[item.key] ? 'text-slate-900' : 'text-slate-500'}`}>
                    {item.text}
                  </span>
                </button>
              ))}

              <div className="mt-6 md:mt-8 p-6 md:p-8 bg-slate-100/50 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-200/40 backdrop-blur-sm">
                <p className="text-[8px] md:text-[10px] text-slate-400 leading-relaxed font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">
                  Privacy Standard: Compliant with the Australian Spam Act 2003.
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
    <div className="relative w-full max-w-2xl mx-auto h-[100dvh] md:h-[880px] flex flex-col group/form safe-pb">
      <div className="glass-card md:rounded-[4.5rem] flex flex-col h-full shadow-[0_50px_150px_-30px_rgba(15,23,42,0.25)] md:border border-white/90 overflow-hidden transition-all duration-1000 relative rounded-none md:rounded-t-[3rem] border-none">
        
        <div className="absolute top-0 right-0 w-32 md:w-96 h-32 md:h-96 bg-teal-500/[0.04] rounded-bl-[100px] md:rounded-bl-[300px] pointer-events-none z-0 transition-transform duration-1000 group-hover/form:scale-110" />
        <div className="absolute bottom-0 left-0 w-24 md:w-72 h-24 md:h-72 bg-blue-500/[0.03] rounded-tr-[100px] md:rounded-tr-[240px] pointer-events-none z-0" />

        <div 
          ref={scrollContainerRef}
          className="relative flex-grow scrollbar-hide overflow-y-auto px-6 md:px-20 pt-10 md:pt-20"
        >
          <div className="pb-40 md:pb-80">
            {renderFields()}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-50 pointer-events-none">
           <div className="bg-gradient-to-t from-white via-white/98 to-transparent px-6 md:px-20 py-8 md:py-14 safe-pb flex flex-col md:flex-row items-center justify-between gap-4 md:gap-12 pointer-events-auto border-t border-slate-100/50 backdrop-blur-xl">
              <button
                onClick={onBack}
                className="group flex items-center gap-2 px-6 py-2 text-slate-400 hover:text-slate-900 transition-all font-black text-[10px] md:text-[11px] order-2 md:order-1 tracking-[0.2em] uppercase active:scale-95"
              >
                <ArrowLeft size={16} md:size={20} strokeWidth={3} className="transition-transform group-hover:-translate-x-1" />
                Previous
              </button>
              
              <button
                onClick={onNext}
                disabled={!isStepValid() || isSubmitting}
                className={`w-full md:w-auto flex items-center justify-center gap-4 px-10 md:px-24 py-5 md:py-7 rounded-full font-black transition-all duration-700 order-1 md:order-2 shadow-2xl relative overflow-hidden group/btn ${
                  isStepValid() && !isSubmitting
                    ? 'bg-[#0f172a] text-white hover:bg-black shadow-[0_30px_70px_-15px_rgba(15,23,42,0.55)] hover:scale-[1.03] active:scale-95'
                    : 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-white/10 to-teal-500/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out" />
                
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} md:size={24} />
                    Processing...
                  </>
                ) : step === 8 ? (
                  <span className="flex items-center gap-4 tracking-tight text-lg md:text-2xl">
                    Analyze My Business
                    <Sparkles size={20} md:size={24} className="text-teal-400 animate-pulse" />
                  </span>
                ) : (
                  <div className="flex items-center gap-4 tracking-tight text-lg md:text-2xl">
                    Continue
                    <ArrowRight size={22} md:size={26} strokeWidth={3} className="transition-transform group-hover/btn:translate-x-2" />
                  </div>
                )}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
