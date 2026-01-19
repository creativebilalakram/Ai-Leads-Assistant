
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
    // Scroll to top of the inner container on step change
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const toggleTech = (tool: string) => {
    const next = formData.techStack.includes(tool) 
      ? formData.techStack.filter(t => t !== tool) 
      : [...formData.techStack, tool];
    updateFormData({ techStack: next });
  };

  const inputWrapper = "relative group";
  const inputIcon = "absolute left-5 top-[40px] md:top-[44px] text-slate-300 group-focus-within:text-slate-900 transition-colors duration-300";
  const inputStyles = "w-full h-[54px] md:h-[62px] pl-12 pr-5 rounded-2xl border-2 border-slate-100 bg-white text-[15px] font-bold tracking-tight text-slate-900 placeholder:text-slate-200 focus:border-slate-900 focus:ring-8 focus:ring-slate-900/5 transition-all duration-300 outline-none";
  const labelStyles = "block text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-2.5 ml-1";
  const helperStyles = "mt-2 ml-1 text-[11px] font-medium text-slate-400 leading-relaxed";
  
  const content = () => {
    const scene = "space-y-8 md:space-y-12 animate-scene w-full max-w-md mx-auto relative";
    switch (step) {
      case 2:
        return (
          <div className={scene}>
            <header className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/10"><Building2 size={16} /></div>
                <span className="text-[10px] font-black tracking-[0.4em] text-slate-300 uppercase">Phase 01 / Identity</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-[900] text-slate-900 tracking-tighter leading-none">Business <span className="italic font-light text-slate-400">Context</span></h2>
              <p className="text-[14px] text-slate-500 font-medium">Let's establish your professional architecture.</p>
            </header>
            <div className="space-y-8">
              <div className={inputWrapper}>
                <label className={labelStyles}>Organization</label>
                <Building2 size={16} className={inputIcon} />
                <input type="text" value={formData.companyName} onChange={e => updateFormData({ companyName: e.target.value })} placeholder="Legal Entity Name" className={inputStyles} />
                <p className={helperStyles}>Registered business name in Australia.</p>
              </div>
              <div className={inputWrapper}>
                <label className={labelStyles}>Point of Contact</label>
                <User size={16} className={inputIcon} />
                <input type="text" value={formData.userName} onChange={e => updateFormData({ userName: e.target.value })} placeholder="Your Full Name" className={inputStyles} />
              </div>
              <CustomSelect label="Leadership Tier" value={formData.jobTitle} onChange={v => updateFormData({ jobTitle: v as JobTitle })} options={['Founder / Owner', 'Director', 'Operations Manager', 'Sales Manager', 'Marketing Manager', 'Other']} placeholder="Select your role" />
            </div>
          </div>
        );
      case 3:
        return (
          <div className={scene}>
            <header className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/10"><Mail size={16} /></div>
                <span className="text-[10px] font-black tracking-[0.4em] text-slate-300 uppercase">Phase 02 / Sync</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-[900] text-slate-900 tracking-tighter leading-none">Direct <span className="italic font-light text-slate-400">Channels</span></h2>
            </header>
            <div className="space-y-8">
              <div className={inputWrapper}>
                <label className={labelStyles}>Work Email</label>
                <Mail size={16} className={inputIcon} />
                <input type="email" value={formData.email} onChange={e => updateFormData({ email: e.target.value })} placeholder="you@company.com.au" className={inputStyles} />
                <p className={helperStyles}>Where your diagnostic report will land.</p>
              </div>
              <div className={inputWrapper}>
                <label className={labelStyles}>Mobile Phone</label>
                <Phone size={16} className={inputIcon} />
                <input type="tel" value={formData.phone} onChange={e => updateFormData({ phone: e.target.value })} placeholder="+61..." className={inputStyles} />
              </div>
              <div className={inputWrapper}>
                <label className={labelStyles}>Website</label>
                <Globe size={16} className={inputIcon} />
                <input type="url" value={formData.website} onChange={e => updateFormData({ website: e.target.value })} placeholder="https://..." className={inputStyles} />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className={scene}>
            <header className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/10"><BarChart3 size={16} /></div>
                <span className="text-[10px] font-black tracking-[0.4em] text-slate-300 uppercase">Phase 03 / Scale</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-[900] text-slate-900 tracking-tighter leading-none">Market <span className="italic font-light text-slate-400">Volume</span></h2>
            </header>
            <div className="space-y-8">
              <CustomSelect label="Personnel Count" value={formData.companySize} onChange={v => updateFormData({ companySize: v as CompanySize })} options={['Solo / Freelancer', 'Small Team (2–10)', 'Growing Business (11–50)', 'Mid-size (51–200)', 'Enterprise (200+)']} />
              <CustomSelect label="Annual Revenue (AUD)" value={formData.revenue} onChange={v => updateFormData({ revenue: v as MonthlyRevenue })} options={['Just Starting (< $10k)', 'Early Stage ($10k–$50k)', 'Growing ($50k–$200k)', 'Established ($200k–$1M)', 'Scaled ($1M+)']} />
            </div>
          </div>
        );
      case 5:
        return (
          <div className={scene}>
            <header className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/10"><Settings2 size={16} /></div>
                <span className="text-[10px] font-black tracking-[0.4em] text-slate-300 uppercase">Phase 04 / Audit</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-[900] text-slate-900 tracking-tighter leading-none">Current <span className="italic font-light text-slate-400">Stack</span></h2>
            </header>
            <div className="grid grid-cols-1 gap-3 pb-8">
              {['CRM Tools', 'Email Automation', 'WhatsApp Business', 'Google Sheets / Excel', 'Zapier / Make', 'Manual Processes'].map(tool => (
                <button key={tool} onClick={() => toggleTech(tool)} className={`px-5 h-[60px] md:h-[68px] text-left rounded-2xl border-2 transition-all duration-300 flex items-center justify-between active:scale-[0.96] ${formData.techStack.includes(tool) ? 'bg-slate-900 border-slate-900 text-white shadow-xl translate-x-1' : 'bg-white border-slate-50 hover:border-slate-200 text-slate-500'}`}>
                  <span className="text-[14px] font-bold tracking-tight">{tool}</span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${formData.techStack.includes(tool) ? 'bg-white' : 'bg-slate-50'}`}>
                    {formData.techStack.includes(tool) && <Check size={12} strokeWidth={4} className="text-slate-900" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className={scene}>
            <header className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/10"><Target size={16} /></div>
                <span className="text-[10px] font-black tracking-[0.4em] text-slate-300 uppercase">Phase 05 / Diagnostic</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-[900] text-slate-900 tracking-tighter leading-none">Operation <span className="italic font-light text-slate-400">Pain</span></h2>
            </header>
            <div className="space-y-8">
              <CustomSelect label="Primary Bottleneck" value={formData.primaryPainPoint} onChange={v => updateFormData({ primaryPainPoint: v })} options={['Lead follow-up too slow', 'Manual data entry', 'Losing leads', 'Overwhelmed support', 'Admin work', 'Scaling issues']} />
              <CustomSelect label="Automation Priority" value={formData.firstAutomationTarget} onChange={v => updateFormData({ firstAutomationTarget: v })} options={['Lead capture', 'CRM workflows', 'Onboarding', 'Customer Support', 'Payments', 'Internal Ops']} />
            </div>
          </div>
        );
      case 7:
        return (
          <div className={scene}>
            <header className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/10"><Calendar size={16} /></div>
                <span className="text-[10px] font-black tracking-[0.4em] text-slate-300 uppercase">Phase 06 / Timeline</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-[900] text-slate-900 tracking-tighter leading-none">Strategic <span className="italic font-light text-slate-400">Fit</span></h2>
            </header>
            <div className="space-y-8">
              <CustomSelect label="Horizon" value={formData.timeline} onChange={v => updateFormData({ timeline: v as ImplementationTimeline })} options={['Urgent – This month', 'Soon – 1-2 months', 'Planning – 3-6 months', 'Researching']} />
              <CustomSelect label="Budget Allocation" value={formData.budget} onChange={v => updateFormData({ budget: v as BudgetRange })} options={['Testing Phase ($500 – $2,000)', 'Starter Investment ($2,000 – $5,000)', 'Serious Implementation ($5,000 – $15,000)', 'Enterprise Solution ($15,000+)', 'Not sure – depends on ROI']} />
            </div>
          </div>
        );
      case 8:
        return (
          <div className={scene}>
            <header className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/10"><ShieldCheck size={16} /></div>
                <span className="text-[10px] font-black tracking-[0.4em] text-slate-300 uppercase">Final Stage / Privacy</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-[900] text-slate-900 tracking-tighter leading-none">Final <span className="italic font-light text-slate-400">Protocol</span></h2>
            </header>
            <div className="space-y-4 pb-8">
              {[{ k: 'consentTransactional', t: 'Authorize strategic brief generation.', h: 'Necessary for the diagnostic report.' }, { k: 'consentMarketing', t: 'Receive periodic AI growth insights.', h: 'Optional industry updates.' }].map(c => (
                <div key={c.k}>
                  <button onClick={() => updateFormData({ [c.k]: !formData[c.k as keyof FormData] })} className={`w-full p-5 rounded-2xl border-2 transition-all duration-300 flex items-center gap-5 active:scale-[0.98] text-left ${formData[c.k as keyof FormData] ? 'bg-slate-900 border-slate-900 text-white shadow-xl' : 'bg-white border-slate-50 hover:border-slate-200 text-slate-500'}`}>
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all ${formData[c.k as keyof FormData] ? 'bg-white' : 'bg-slate-100'}`}>
                      {formData[c.k as keyof FormData] && <Check size={12} strokeWidth={4} className="text-slate-900" />}
                    </div>
                    <span className="text-[13px] font-bold tracking-tight leading-tight">{c.t}</span>
                  </button>
                  <p className={helperStyles}>{c.h}</p>
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
    <div className="flex-grow flex flex-col min-h-0 h-full bg-white relative overflow-hidden">
      {/* INTEGRATED BACKGROUND LAYER */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
      
      {/* SCROLLABLE MAIN CONTENT */}
      <div 
        ref={scrollRef} 
        className="flex-grow overflow-y-auto scrollbar-hide px-6 md:px-16 pt-10 md:pt-16 pb-12 relative z-10 overscroll-contain"
      >
        {content()}
      </div>

      {/* COMMAND BAR - Now strictly at bottom using flex-shrink-0 */}
      <div className="flex-shrink-0 w-full px-6 md:px-16 py-8 bg-white border-t border-slate-50 z-20">
        <div className="flex items-center justify-between gap-6">
          <button 
            type="button"
            onClick={onBack} 
            className="group flex items-center gap-3 text-slate-300 hover:text-slate-900 font-black text-[10px] uppercase tracking-[0.3em] transition-all active:scale-90 outline-none"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-slate-50 flex items-center justify-center group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
              <ArrowLeft size={16} strokeWidth={4} />
            </div>
            <span className="hidden xs:inline">Back</span>
          </button>
          
          <button
            type="button"
            onClick={onNext}
            disabled={!valid() || isSubmitting}
            className={`flex-grow md:flex-grow-0 h-[60px] md:h-[68px] px-10 md:px-16 rounded-full font-black text-[12px] md:text-[14px] uppercase tracking-[0.3em] transition-all duration-500 flex items-center justify-center gap-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] active:scale-95 outline-none ${
              valid() && !isSubmitting 
                ? 'bg-slate-900 text-white shadow-slate-900/40 hover:shadow-slate-900/60 hover:-translate-y-1' 
                : 'bg-slate-50 text-slate-200 cursor-not-allowed border border-slate-50'
            }`}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={24} strokeWidth={3} />
            ) : (
              <>
                <span>{step === 8 ? 'Build Brief' : 'Continue'}</span>
                <ArrowRight size={20} strokeWidth={4} className="transition-transform group-hover:translate-x-2" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
