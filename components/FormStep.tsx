
import React, { useEffect, useRef } from 'react';
import { FormData, JobTitle, CompanySize, MonthlyRevenue, ImplementationTimeline, BudgetRange } from '../types';
import { ArrowLeft, ArrowRight, Loader2, Check, Building2, User, Mail, Phone, Globe, BarChart3, Settings2, Target, Calendar, ShieldCheck } from 'lucide-react';
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
  step, formData, updateFormData, onNext, onBack, isSubmitting 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset scroll position on step change
    scrollRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, [step]);

  const toggleTech = (tool: string) => {
    const next = formData.techStack.includes(tool) 
      ? formData.techStack.filter(t => t !== tool) 
      : [...formData.techStack, tool];
    updateFormData({ techStack: next });
  };

  const inputWrapper = "relative group mb-9";
  
  const getFieldClasses = (val: string) => {
    const base = "w-full h-[54px] md:h-[60px] pl-14 pr-6 rounded-full border-2 bg-white/60 backdrop-blur-sm text-[14px] font-bold transition-all duration-300 outline-none shadow-sm";
    if (val && val.trim().length > 0) {
      return `${base} border-slate-900 text-slate-900 focus:ring-4 focus:ring-slate-900/5`;
    }
    return `${base} border-slate-100 text-slate-900 placeholder:text-slate-200 focus:border-slate-900 focus:bg-white`;
  };

  const getIconClasses = (val: string) => {
    const base = "absolute left-6 top-[38px] md:top-[42px] transition-all duration-300";
    if (val && val.trim().length > 0) {
      return `${base} text-slate-900 scale-110`;
    }
    return `${base} text-slate-300 group-focus-within:text-slate-900`;
  };

  const labelStyles = "block text-[8px] font-black uppercase tracking-[0.25em] text-slate-600 mb-2.5 ml-2";
  
  const content = () => {
    const scene = "animate-fade-up w-full max-w-md mx-auto py-2";
    const header = (icon: React.ReactNode, phase: string, title: string, sub: string) => (
      <header className="mb-10 space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/10">{icon}</div>
          <span className="text-[8px] font-black tracking-[0.4em] text-slate-400 uppercase">{phase}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-[900] text-slate-900 tracking-tighter leading-tight">{title}</h2>
        <p className="text-[13px] text-slate-500 font-medium leading-relaxed">{sub}</p>
      </header>
    );

    switch (step) {
      case 2:
        return (
          <div className={scene}>
            {header(<Building2 size={16} />, "Section 1", "Business Info", "Defining your organization's core profile.")}
            <div className="space-y-4">
              <div className={inputWrapper}>
                <label className={labelStyles}>Organization</label>
                <Building2 size={16} className={getIconClasses(formData.companyName)} />
                <input type="text" value={formData.companyName} onChange={e => updateFormData({ companyName: e.target.value })} placeholder="Company Name" className={getFieldClasses(formData.companyName)} />
              </div>
              <div className={inputWrapper}>
                <label className={labelStyles}>Your Name</label>
                <User size={16} className={getIconClasses(formData.userName)} />
                <input type="text" value={formData.userName} onChange={e => updateFormData({ userName: e.target.value })} placeholder="Point of Contact" className={getFieldClasses(formData.userName)} />
              </div>
              <CustomSelect label="Job Title" value={formData.jobTitle} onChange={v => updateFormData({ jobTitle: v as JobTitle })} options={['Founder / Owner', 'Director', 'Operations Manager', 'Sales Manager', 'Marketing Manager', 'Other']} />
            </div>
          </div>
        );
      case 3:
        return (
          <div className={scene}>
            {header(<Mail size={16} />, "Section 2", "Contact Details", "Establishing secure communication channels.")}
            <div className="space-y-4">
              <div className={inputWrapper}>
                <label className={labelStyles}>Work Email</label>
                <Mail size={16} className={getIconClasses(formData.email)} />
                <input type="email" value={formData.email} onChange={e => updateFormData({ email: e.target.value })} placeholder="email@company.com.au" className={getFieldClasses(formData.email)} />
              </div>
              <div className={inputWrapper}>
                <label className={labelStyles}>Phone Number</label>
                <Phone size={16} className={getIconClasses(formData.phone)} />
                <input type="tel" value={formData.phone} onChange={e => updateFormData({ phone: e.target.value })} placeholder="+61..." className={getFieldClasses(formData.phone)} />
              </div>
              <div className={inputWrapper}>
                <label className={labelStyles}>Website (Optional)</label>
                <Globe size={16} className={getIconClasses(formData.website)} />
                <input type="url" value={formData.website} onChange={e => updateFormData({ website: e.target.value })} placeholder="https://..." className={getFieldClasses(formData.website)} />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className={scene}>
            {header(<BarChart3 size={16} />, "Section 3", "Business Details", "Quantifying the scale of your operations.")}
            <div className="space-y-8">
              <CustomSelect label="Company Size" value={formData.companySize} onChange={v => updateFormData({ companySize: v as CompanySize })} options={['Solo / Freelancer', 'Small Team (2–10)', 'Growing Business (11–50)', 'Mid-size (51–200)', 'Enterprise (200+)']} />
              <CustomSelect label="Monthly Revenue (AUD)" value={formData.revenue} onChange={v => updateFormData({ revenue: v as MonthlyRevenue })} options={['Just Starting (< $10k)', 'Early Stage ($10k–$50k)', 'Growing ($50k–$200k)', 'Established ($200k–$1M)', 'Scaled ($1M+)']} />
            </div>
          </div>
        );
      case 5:
        return (
          <div className={scene}>
            {header(<Settings2 size={16} />, "Section 4", "Current Stack", "Tools currently powering your workflow.")}
            <div className="grid grid-cols-1 gap-3 mb-10">
              {['CRM (HubSpot, Salesforce, etc)', 'Email Marketing (Mailchimp, ActiveCampaign, etc)', 'WhatsApp Business', 'Google Sheets / Excel', 'Zapier / Make', 'None – Manual Process', 'Other'].map(tool => (
                <button key={tool} onClick={() => toggleTech(tool)} className={`px-6 h-[58px] text-left rounded-full border-2 transition-all duration-300 flex items-center justify-between active:scale-[0.97] ${formData.techStack.includes(tool) ? 'bg-slate-900 border-slate-900 text-white shadow-lg' : 'bg-white/60 backdrop-blur-sm border-slate-100 hover:border-slate-300 text-slate-500'}`}>
                  <span className="text-[13px] font-bold">{tool}</span>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${formData.techStack.includes(tool) ? 'bg-white' : 'bg-slate-50'}`}>
                    {formData.techStack.includes(tool) && <Check size={10} strokeWidth={4} className="text-slate-900" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className={scene}>
            {header(<Target size={16} />, "Section 5", "Automation Needs", "Isolating the most critical bottlenecks.")}
            <div className="space-y-8">
              <CustomSelect label="Primary Pain Point" value={formData.primaryPainPoint} onChange={v => updateFormData({ primaryPainPoint: v })} options={['Lead follow-up takes too long', 'Manual data entry killing productivity', 'Losing leads due to slow response', 'Customer support overwhelming team', 'Repetitive admin work', 'Scaling without hiring more staff']} />
              <CustomSelect label="What would you automate first?" value={formData.firstAutomationTarget} onChange={v => updateFormData({ firstAutomationTarget: v })} options={['Lead capture & follow-up', 'Sales pipeline & CRM', 'Customer onboarding', 'Customer support', 'Invoicing & payments', 'Internal workflows']} />
            </div>
          </div>
        );
      case 7:
        return (
          <div className={scene}>
            {header(<Calendar size={16} />, "Section 6", "Timeline & Budget", "Defining your strategic execution window.")}
            <div className="space-y-8">
              <CustomSelect label="Implementation Timeline" value={formData.timeline} onChange={v => updateFormData({ timeline: v as ImplementationTimeline })} options={['Urgent – Need solution this month', 'Soon – Within 1–2 months', 'Planning – 3–6 months', 'Exploring – Just researching']} />
              <CustomSelect label="Budget Range (AUD)" value={formData.budget} onChange={v => updateFormData({ budget: v as BudgetRange })} options={['Testing Phase ($500 – $2,000)', 'Starter Investment ($2,000 – $5,000)', 'Serious Implementation ($5,000 – $15,000)', 'Enterprise Solution ($15,000+)', 'Not sure – depends on ROI']} />
            </div>
          </div>
        );
      case 8:
        return (
          <div className={scene}>
            {header(<ShieldCheck size={16} />, "Section 7", "Consent Protocol", "Finalizing your diagnostic report.")}
            <div className="space-y-5 pb-8">
              {[{ k: 'consentTransactional', t: 'I agree to receive transactional messages (appointments, updates, etc).', h: 'Required for processing.' }, { k: 'consentMarketing', t: 'I agree to receive marketing and follow-up messages.', h: 'Optional monthly insights.' }].map(c => (
                <div key={c.k} className="group">
                  <button onClick={() => updateFormData({ [c.k]: !formData[c.k as keyof FormData] })} className={`w-full p-5 rounded-[2rem] border-2 transition-all duration-300 flex items-center gap-5 active:scale-[0.98] text-left ${formData[c.k as keyof FormData] ? 'bg-slate-900 border-slate-900 text-white shadow-lg' : 'bg-white/60 backdrop-blur-sm border-slate-100 hover:border-slate-300 text-slate-500'}`}>
                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 transition-all ${formData[c.k as keyof FormData] ? 'bg-white' : 'bg-slate-100 group-hover:bg-slate-200'}`}>
                      {formData[c.k as keyof FormData] && <Check size={10} strokeWidth={4} className="text-slate-900" />}
                    </div>
                    <span className="text-[12px] font-bold leading-tight">{c.t}</span>
                  </button>
                  <p className="mt-2 ml-2 text-[10px] font-medium text-slate-400">{c.h}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default: return null;
    }
  };

  const valid = () => {
    if (step === 2) return !!(formData.companyName && formData.userName && formData.jobTitle);
    if (step === 3) return formData.email.includes('@') && formData.phone.length > 5;
    if (step === 4) return !!(formData.companySize && formData.revenue);
    if (step === 5) return formData.techStack.length > 0;
    if (step === 6) return !!(formData.primaryPainPoint && formData.firstAutomationTarget);
    if (step === 7) return !!(formData.timeline && formData.budget);
    if (step === 8) return formData.consentTransactional;
    return true;
  };

  return (
    <div className="relative flex flex-col h-full w-full bg-transparent overflow-hidden">
      {/* 
          Main Scrollable Area. 
          'pb-32' ensures content doesn't get hidden behind the fixed footer.
      */}
      <div 
        ref={scrollRef} 
        className="flex-grow overflow-y-auto scrollbar-hide px-[13px] md:px-16 pt-8 md:pt-14 pb-32 overscroll-contain"
      >
        {content()}
      </div>

      {/* 
          Permanently Fixed Navigation Dock.
          'absolute bottom-0' ensures it is strictly locked to the bottom of the container.
      */}
      <div className="absolute bottom-0 left-0 w-full px-[13px] md:px-16 py-5 md:py-6 bg-white/40 backdrop-blur-2xl border-t border-white/20 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] pb-safe">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          {/* Compact Back Button */}
          <button 
            onClick={onBack} 
            className="group flex items-center justify-center w-[48px] h-[48px] rounded-full border-2 border-white/20 text-slate-400 hover:text-slate-900 hover:bg-white/60 transition-all active:scale-90 outline-none flex-shrink-0"
            title="Go Back"
          >
            <ArrowLeft size={18} strokeWidth={3} />
          </button>
          
          {/* Compact Main Action Button */}
          <button
            onClick={onNext}
            disabled={!valid() || isSubmitting}
            className={`flex-grow h-[48px] px-7 rounded-full font-black text-[10px] md:text-[11px] uppercase tracking-[0.25em] transition-all duration-500 flex items-center justify-center gap-2.5 outline-none ${
              valid() && !isSubmitting 
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10 active:scale-[0.98]' 
                : 'bg-slate-400/10 text-slate-300 cursor-not-allowed border border-white/10'
            }`}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                <span className="truncate">{step === 8 ? 'Build Report' : 'Next Step'}</span>
                <ArrowRight size={16} strokeWidth={3} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
