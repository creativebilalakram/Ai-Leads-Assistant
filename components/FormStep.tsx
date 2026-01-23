
import React, { useEffect, useRef } from 'react';
import { FormData, JobTitle, CompanySize, MonthlyRevenue, ImplementationTimeline, BudgetRange } from '../types';
import { ArrowLeft, ArrowRight, Loader2, Check, Building2, User, Mail, Phone, Globe, BarChart3, Settings2, Target, Calendar, ShieldCheck, Sparkles } from 'lucide-react';
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
    scrollRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, [step]);

  const toggleTech = (tool: string) => {
    const next = formData.techStack.includes(tool) 
      ? formData.techStack.filter(t => t !== tool) 
      : [...formData.techStack, tool];
    updateFormData({ techStack: next });
  };

  const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  const isPhoneValid = (phone: string) => {
    const digitsOnly = phone.replace(/\D/g, '');
    const hasValidLength = digitsOnly.length >= 7 && digitsOnly.length <= 15;
    const hasValidFormat = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone) || 
                          (/^\+?[0-9\s\-()]{7,20}$/.test(phone) && hasValidLength);
    return hasValidFormat && hasValidLength;
  };

  const isNameValid = (name: string) => name.trim().length >= 3;
  const isCompanyValid = (name: string) => name.trim().length >= 2;

  const valid = () => {
    if (step === 2) return isCompanyValid(formData.companyName) && isNameValid(formData.userName) && !!formData.jobTitle;
    if (step === 3) return isEmailValid(formData.email) && isPhoneValid(formData.phone);
    if (step === 4) return !!(formData.companySize && formData.revenue);
    if (step === 5) return formData.techStack.length > 0;
    if (step === 6) return !!(formData.primaryPainPoint && formData.firstAutomationTarget);
    if (step === 7) return !!(formData.timeline && formData.budget);
    if (step === 8) return formData.consentTransactional;
    return true;
  };

  const getFieldClasses = (val: string, validator?: (v: string) => boolean) => {
    const isValid = validator ? validator(val) : val.length > 0;
    const base = "w-full h-[52px] md:h-[64px] pl-12 md:pl-14 pr-6 rounded-full border-2 bg-white/60 backdrop-blur-sm text-[13px] md:text-[14px] font-bold transition-all duration-500 outline-none shadow-sm z-0";
    if (val.length > 0) {
      if (isValid) return `${base} border-slate-900 text-slate-900 focus:ring-8 focus:ring-slate-900/5`;
      return `${base} border-amber-200 text-slate-900 focus:border-slate-900`;
    }
    return `${base} border-slate-100 text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white`;
  };

  const getIconClasses = (val: string, validator?: (v: string) => boolean) => {
    const isValid = validator ? validator(val) : val.length > 0;
    const base = "absolute left-5 md:left-6 top-1/2 -translate-y-1/2 transition-all duration-500 z-10 pointer-events-none";
    if (val.length > 0) {
      if (isValid) return `${base} text-slate-900 scale-110`;
      return `${base} text-amber-400`;
    }
    return `${base} text-slate-400 group-focus-within:text-slate-900 group-focus-within:scale-110`;
  };

  const labelStyles = "block text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 md:mb-3 ml-2";
  const inputWrapper = "relative group";
  
  const content = () => {
    const scene = "w-full max-w-md mx-auto py-1 md:py-2";
    const header = (icon: React.ReactNode, phase: string, title: string, sub: string) => (
      <header className="mb-8 md:mb-12 space-y-2 md:space-y-3 stagger-1">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-900 text-white rounded-[0.8rem] md:rounded-[1rem] flex items-center justify-center shadow-lg transition-transform hover:rotate-12 duration-500 shrink-0">
            {React.cloneElement(icon as React.ReactElement, { size: 16 })}
          </div>
          <span className="text-[8px] md:text-[9px] font-black tracking-[0.3em] text-slate-400 uppercase">{phase}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-[900] text-slate-900 tracking-tighter leading-tight">{title}</h2>
        <p className="text-[13px] md:text-[14px] text-slate-500 font-medium leading-relaxed max-w-[95%]">{sub}</p>
      </header>
    );

    switch (step) {
      case 2:
        return (
          <div className={scene}>
            {header(<Building2 />, "Profile", "Operational Identity", "Define your organization for a tailored strategic diagnostic.")}
            <div className="space-y-5 md:space-y-7">
              <div className={`${inputWrapper} stagger-2`}>
                <label className={labelStyles}>Business Name</label>
                <div className="relative">
                  <Building2 size={14} className={getIconClasses(formData.companyName, isCompanyValid)} />
                  <input type="text" value={formData.companyName} onChange={e => updateFormData({ companyName: e.target.value })} placeholder="Enter business name" className={getFieldClasses(formData.companyName, isCompanyValid)} autoComplete="organization" />
                </div>
              </div>
              <div className={`${inputWrapper} stagger-3`}>
                <label className={labelStyles}>Your Name</label>
                <div className="relative">
                  <User size={14} className={getIconClasses(formData.userName, isNameValid)} />
                  <input type="text" value={formData.userName} onChange={e => updateFormData({ userName: e.target.value })} placeholder="Enter your full name" className={getFieldClasses(formData.userName, isNameValid)} autoComplete="name" />
                </div>
              </div>
              <div className="stagger-4">
                <CustomSelect label="Authority Level" value={formData.jobTitle} onChange={v => updateFormData({ jobTitle: v as JobTitle })} options={['Founder / Owner', 'Director', 'Operations Manager', 'Sales Manager', 'Marketing Manager', 'Other']} placeholder="Select your role" />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className={scene}>
            {header(<Mail />, "Contact", "Strategic Access", "Secure channels for the delivery of your diagnostic results.")}
            <div className="space-y-5 md:space-y-7">
              <div className={`${inputWrapper} stagger-2`}>
                <label className={labelStyles}>Corporate Email</label>
                <div className="relative">
                  <Mail size={14} className={getIconClasses(formData.email, isEmailValid)} />
                  <input type="email" value={formData.email} onChange={e => updateFormData({ email: e.target.value })} placeholder="name@company.com" className={getFieldClasses(formData.email, isEmailValid)} autoComplete="email" />
                </div>
              </div>
              <div className={`${inputWrapper} stagger-3`}>
                <label className={labelStyles}>Phone Number</label>
                <div className="relative">
                  <Phone size={14} className={getIconClasses(formData.phone, isPhoneValid)} />
                  <input type="tel" value={formData.phone} onChange={e => updateFormData({ phone: e.target.value })} placeholder="Enter mobile number" className={getFieldClasses(formData.phone, isPhoneValid)} autoComplete="tel" />
                </div>
              </div>
              <div className={`${inputWrapper} stagger-4`}>
                <label className={labelStyles}>Web Domain</label>
                <div className="relative">
                  <Globe size={14} className={getIconClasses(formData.website)} />
                  <input type="url" value={formData.website} onChange={e => updateFormData({ website: e.target.value })} placeholder="https://www.yourbusiness.com" className={getFieldClasses(formData.website)} autoComplete="url" />
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className={scene}>
            {header(<BarChart3 />, "Scope", "Economic Footprint", "Defining scope ensures your evaluation is modeled with precision.")}
            <div className="space-y-6 md:space-y-10">
              <div className="stagger-2">
                <CustomSelect label="Organizational Size" value={formData.companySize} onChange={v => updateFormData({ companySize: v as CompanySize })} options={['Solo / Freelancer', 'Small Team (2–10)', 'Growing Business (11–50)', 'Mid-size (51–200)', 'Enterprise (200+)']} placeholder="Select headcount" />
              </div>
              <div className="stagger-3">
                <CustomSelect label="Monthly Revenue" value={formData.revenue} onChange={v => updateFormData({ revenue: v as MonthlyRevenue })} options={['Just Starting (< $10k)', 'Early Stage ($10k–$50k)', 'Growing ($50k–$200k)', 'Established ($200k–$1M)', 'Scaled ($1M+)']} placeholder="Select revenue bracket" />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className={scene}>
            {header(<Settings2 />, "Tech", "Digital Ecosystem", "Core platforms constituting your current operational stack.")}
            <div className="grid grid-cols-1 gap-3 md:gap-4 mb-6 stagger-2">
              {[
                'CRM (HubSpot, Salesforce, etc)', 
                'Email Marketing (Mailchimp, ActiveCampaign, etc)', 
                'WhatsApp Business', 
                'Google Sheets / Excel', 
                'Zapier / Make', 
                'None – Manual Process', 
                'Other'
              ].map((tool, i) => (
                <button 
                  key={tool} 
                  onClick={() => toggleTech(tool)} 
                  style={{ animationDelay: `${i * 0.05}s` }}
                  className={`px-5 md:px-6 h-[52px] md:h-[64px] text-left rounded-full border-2 transition-all duration-500 flex items-center justify-between active:scale-[0.98] animate-fade-up ${formData.techStack.includes(tool) ? 'bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/10' : 'bg-white/60 backdrop-blur-sm border-slate-100 hover:border-slate-300 text-slate-600'}`}
                >
                  <span className="text-[12px] md:text-[13px] font-bold">{tool}</span>
                  <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center transition-all duration-500 ${formData.techStack.includes(tool) ? 'bg-white scale-110 rotate-[360deg]' : 'bg-slate-100 border border-slate-200'}`}>
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
            {header(<Target />, "Analysis", "Friction Points", "Segments of your architecture where friction is most prevalent.")}
            <div className="space-y-6 md:space-y-10">
              <div className="stagger-2">
                <CustomSelect label="Primary Bottleneck" value={formData.primaryPainPoint} onChange={v => updateFormData({ primaryPainPoint: v })} options={['Lead follow-up takes too long', 'Manual data entry killing productivity', 'Losing leads due to slow response', 'Customer support overwhelming team', 'Repetitive admin work', 'Scaling without hiring more staff']} placeholder="Identify primary friction" />
              </div>
              <div className="stagger-3">
                <CustomSelect label="What would you automate first?" value={formData.firstAutomationTarget} onChange={v => updateFormData({ firstAutomationTarget: v })} options={['Lead capture & follow-up', 'Sales pipeline & CRM', 'Customer onboarding', 'Customer support', 'Invoicing & payments', 'Internal workflows']} placeholder="Select high-impact target" />
              </div>
            </div>
          </div>
        );
      case 7:
        return (
          <div className={scene}>
            {header(<Calendar />, "Strategy", "Implementation", "Establish the projected pace for your operational transition.")}
            <div className="space-y-6 md:space-y-10">
              <div className="stagger-2">
                <CustomSelect label="Implementation Timeline" value={formData.timeline} onChange={v => updateFormData({ timeline: v as ImplementationTimeline })} options={['Urgent – Need solution this month', 'Soon – Within 1–2 months', 'Planning – 3–6 months', 'Exploring – Just researching']} placeholder="Deployment window" />
              </div>
              <div className="stagger-3">
                <CustomSelect label="Budget Range for AI Automation" value={formData.budget} onChange={v => updateFormData({ budget: v as BudgetRange })} options={['Testing Phase ($500 – $2,000)', 'Starter Investment ($2,000 – $5,000)', 'Serious Implementation ($5,000 – $15,000)', 'Enterprise Solution ($15,000+)', 'Not sure – depends on ROI']} placeholder="Budget tier" />
              </div>
            </div>
          </div>
        );
      case 8:
        return (
          <div className={scene}>
            {header(<ShieldCheck />, "Finalize", "Strategic Intent", "Review your profile. Our strategists will now align your architecture.")}
            <div className="space-y-5 md:space-y-6 pb-4 stagger-2">
              {[
                { k: 'consentTransactional', t: 'Authorize professional appraisal.', h: 'Required.' }, 
                { k: 'consentMarketing', t: 'Receive Strategic Briefing.', h: 'Weekly.' }
              ].map((c, i) => (
                <div key={c.k} className="group" style={{ animationDelay: `${i * 0.1}s` }}>
                  <button onClick={() => updateFormData({ [c.k]: !formData[c.k as keyof FormData] })} className={`w-full p-4 md:p-6 rounded-[1.8rem] md:rounded-[2.2rem] border-2 transition-all duration-500 flex items-center gap-4 md:gap-5 active:scale-[0.98] text-left animate-fade-up ${formData[c.k as keyof FormData] ? 'bg-slate-900 border-slate-900 text-white shadow-xl' : 'bg-white/60 backdrop-blur-sm border-slate-100 hover:border-slate-300 text-slate-600'}`}>
                    <div className={`w-5 h-5 md:w-6 md:h-6 rounded-lg flex items-center justify-center shrink-0 transition-all duration-500 ${formData[c.k as keyof FormData] ? 'bg-white rotate-[360deg]' : 'bg-slate-200 group-hover:bg-slate-300'}`}>
                      {formData[c.k as keyof FormData] && <Check size={10} md:size={12} strokeWidth={4} className="text-slate-900" />}
                    </div>
                    <span className="text-[12px] md:text-[13px] font-bold leading-tight">{c.t}</span>
                  </button>
                  <p className="mt-2 ml-4 text-[8px] md:text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{c.h}</p>
                </div>
              ))}
              <div className="bg-slate-50 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 flex items-center gap-3 md:gap-4 mt-6 animate-pulse">
                <Sparkles size={16} className="text-slate-900 shrink-0" />
                <p className="text-[10px] md:text-[11px] text-slate-600 font-medium leading-relaxed">Briefing will be sent to your corporate email.</p>
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="relative flex flex-col h-full w-full bg-transparent overflow-hidden">
      <div ref={scrollRef} className="flex-grow overflow-y-auto scrollbar-hide px-6 md:px-16 pt-6 md:pt-14 pb-28 md:pb-32 overscroll-contain">
        {content()}
      </div>
      <div className="absolute bottom-0 left-0 w-full px-6 md:px-16 py-4 md:py-8 bg-white/70 backdrop-blur-3xl border-t border-white/20 z-50 shadow-[0_-15px_30px_rgba(0,0,0,0.03)] pb-safe">
        <div className="flex items-center justify-between gap-3 md:gap-4 max-w-lg mx-auto">
          <button onClick={onBack} className="group flex items-center justify-center w-[48px] h-[48px] md:w-[54px] md:h-[54px] rounded-full border-2 border-slate-100 text-slate-400 hover:text-slate-900 hover:bg-white hover:border-slate-900 transition-all active:scale-90 duration-500 flex-shrink-0">
            <ArrowLeft size={18} strokeWidth={3} />
          </button>
          <button
            onClick={onNext}
            disabled={!valid() || isSubmitting}
            className={`flex-grow h-[48px] md:h-[54px] px-6 md:px-8 rounded-full font-black text-[10px] md:text-[12px] uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all duration-700 flex items-center justify-center gap-2 md:gap-3 outline-none relative overflow-hidden ${
              valid() && !isSubmitting ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20 active:scale-[0.98]' : 'bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-100'
            }`}
          >
            {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : (
              <>
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine" />
                </div>
                <span className="relative z-10">{step === 8 ? 'Submit Details' : 'Continue'}</span>
                <ArrowRight size={16} strokeWidth={3} className="relative z-10 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
