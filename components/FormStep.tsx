
import React, { useEffect, useRef } from 'react';
import { FormData, JobTitle, CompanySize, MonthlyRevenue, ImplementationTimeline, BudgetRange } from '../types';
import { ArrowLeft, ArrowRight, Loader2, Check, Building2, User, Mail, Phone, Globe, BarChart3, Settings2, Target, Calendar, ShieldCheck, HelpCircle } from 'lucide-react';
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
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const toggleTech = (tool: string) => {
    const next = formData.techStack.includes(tool) 
      ? formData.techStack.filter(t => t !== tool) 
      : [...formData.techStack, tool];
    updateFormData({ techStack: next });
  };

  const inputWrapper = "relative group";
  const inputIcon = "absolute left-4 top-[38px] text-slate-300 group-focus-within:text-slate-900 transition-colors duration-300";
  const inputStyles = "w-full h-[52px] pl-11 pr-5 rounded-xl border border-slate-200 bg-white text-[14px] font-semibold tracking-tight text-slate-900 placeholder:text-slate-300 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all duration-300 outline-none";
  const labelStyles = "block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1";
  const helperStyles = "mt-2 ml-1 text-[11px] font-medium text-slate-400 leading-tight";
  
  const content = () => {
    const scene = "space-y-10 animate-scene w-full max-w-md mx-auto";
    switch (step) {
      case 2:
        return (
          <div className={scene}>
            <header className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-900 text-white rounded-lg"><Building2 size={16} /></div>
                <span className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">Phase 01 / Identity</span>
              </div>
              <h2 className="text-4xl font-[900] text-slate-900 tracking-tighter">Business <span className="italic font-light text-slate-400 underline decoration-slate-200 decoration-2 underline-offset-4">Context</span></h2>
              <p className="text-[13px] text-slate-500 font-medium">Let's establish the profile of your organisation.</p>
            </header>
            <div className="space-y-8">
              <div className={inputWrapper}>
                <label className={labelStyles}>Organization</label>
                <Building2 size={16} className={inputIcon} />
                <input type="text" value={formData.companyName} onChange={e => updateFormData({ companyName: e.target.value })} placeholder="Legal Entity Name" className={inputStyles} />
                <p className={helperStyles}>The registered name of your business or project.</p>
              </div>
              <div className={inputWrapper}>
                <label className={labelStyles}>Point of Contact</label>
                <User size={16} className={inputIcon} />
                <input type="text" value={formData.userName} onChange={e => updateFormData({ userName: e.target.value })} placeholder="Your Name" className={inputStyles} />
                <p className={helperStyles}>Who should our consultants address in the final brief?</p>
              </div>
              <CustomSelect label="Leadership Tier" value={formData.jobTitle} onChange={v => updateFormData({ jobTitle: v as JobTitle })} options={['Founder / Owner', 'Director', 'Operations Manager', 'Sales Manager', 'Marketing Manager', 'Other']} placeholder="Select your role" />
            </div>
          </div>
        );
      case 3:
        return (
          <div className={scene}>
            <header className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-900 text-white rounded-lg"><Mail size={16} /></div>
                <span className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">Phase 02 / Sync</span>
              </div>
              <h2 className="text-4xl font-[900] text-slate-900 tracking-tighter">Direct <span className="italic font-light text-slate-400 underline decoration-slate-200 decoration-2 underline-offset-4">Channels</span></h2>
              <p className="text-[13px] text-slate-500 font-medium">How should we deliver your automation roadmap?</p>
            </header>
            <div className="space-y-8">
              <div className={inputWrapper}>
                <label className={labelStyles}>Work Email</label>
                <Mail size={16} className={inputIcon} />
                <input type="email" value={formData.email} onChange={e => updateFormData({ email: e.target.value })} placeholder="you@company.com.au" className={inputStyles} />
                <p className={helperStyles}>Where your generated diagnostic brief will be sent.</p>
              </div>
              <div className={inputWrapper}>
                <label className={labelStyles}>Mobile Phone</label>
                <Phone size={16} className={inputIcon} />
                <input type="tel" value={formData.phone} onChange={e => updateFormData({ phone: e.target.value })} placeholder="+61..." className={inputStyles} />
                <p className={helperStyles}>Used for urgent technical follow-ups only.</p>
              </div>
              <div className={inputWrapper}>
                <label className={labelStyles}>Website</label>
                <Globe size={16} className={inputIcon} />
                <input type="url" value={formData.website} onChange={e => updateFormData({ website: e.target.value })} placeholder="https://..." className={inputStyles} />
                <p className={helperStyles}>Allows us to review your current digital presence.</p>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className={scene}>
            <header className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-900 text-white rounded-lg"><BarChart3 size={16} /></div>
                <span className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">Phase 03 / Scale</span>
              </div>
              <h2 className="text-4xl font-[900] text-slate-900 tracking-tighter">Market <span className="italic font-light text-slate-400 underline decoration-slate-200 decoration-2 underline-offset-4">Volume</span></h2>
              <p className="text-[13px] text-slate-500 font-medium">Scale helps us determine the complexity of required AI agents.</p>
            </header>
            <div className="space-y-8">
              <CustomSelect label="Personnel Count" value={formData.companySize} onChange={v => updateFormData({ companySize: v as CompanySize })} options={['Solo / Freelancer', 'Small Team (2–10)', 'Growing Business (11–50)', 'Mid-size (51–200)', 'Enterprise (200+)']} placeholder="Select team size" />
              <CustomSelect label="Annual Revenue (AUD)" value={formData.revenue} onChange={v => updateFormData({ revenue: v as MonthlyRevenue })} options={['Just Starting (< $10k)', 'Early Stage ($10k–$50k)', 'Growing ($50k–$200k)', 'Established ($200k–$1M)', 'Scaled ($1M+)']} placeholder="Select revenue range" />
            </div>
          </div>
        );
      case 5:
        return (
          <div className={scene}>
            <header className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-900 text-white rounded-lg"><Settings2 size={16} /></div>
                <span className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">Phase 04 / Audit</span>
              </div>
              <h2 className="text-4xl font-[900] text-slate-900 tracking-tighter">Current <span className="italic font-light text-slate-400 underline decoration-slate-200 decoration-2 underline-offset-4">Stack</span></h2>
              <p className="text-[13px] text-slate-500 font-medium">Select tools you currently use to identify integration gaps.</p>
            </header>
            <div className="grid grid-cols-1 gap-3">
              {['CRM Tools', 'Email Automation', 'WhatsApp Business', 'Google Sheets / Excel', 'Zapier / Make', 'Manual Processes'].map(tool => (
                <button key={tool} onClick={() => toggleTech(tool)} className={`px-5 h-[56px] text-left rounded-xl border-2 transition-all duration-300 flex items-center justify-between active:scale-[0.98] ${formData.techStack.includes(tool) ? 'bg-slate-900 border-slate-900 text-white shadow-lg' : 'bg-white border-slate-100 hover:border-slate-300 text-slate-500'}`}>
                  <span className="text-[14px] font-bold tracking-tight">{tool}</span>
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
            <header className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-900 text-white rounded-lg"><Target size={16} /></div>
                <span className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">Phase 05 / Diagnostic</span>
              </div>
              <h2 className="text-4xl font-[900] text-slate-900 tracking-tighter">Operation <span className="italic font-light text-slate-400 underline decoration-slate-200 decoration-2 underline-offset-4">Pain</span></h2>
              <p className="text-[13px] text-slate-500 font-medium">Where is the most significant human capital leakage?</p>
            </header>
            <div className="space-y-8">
              <CustomSelect label="Primary Bottleneck" value={formData.primaryPainPoint} onChange={v => updateFormData({ primaryPainPoint: v })} options={['Lead follow-up too slow', 'Manual data entry', 'Losing leads', 'Overwhelmed support', 'Admin work', 'Scaling issues']} placeholder="Select pain point" />
              <CustomSelect label="Automation Priority" value={formData.firstAutomationTarget} onChange={v => updateFormData({ firstAutomationTarget: v })} options={['Lead capture', 'CRM workflows', 'Onboarding', 'Customer Support', 'Payments', 'Internal Ops']} placeholder="Select first target" />
            </div>
          </div>
        );
      case 7:
        return (
          <div className={scene}>
            <header className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-900 text-white rounded-lg"><Calendar size={16} /></div>
                <span className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">Phase 06 / Timeline</span>
              </div>
              <h2 className="text-4xl font-[900] text-slate-900 tracking-tighter">Strategic <span className="italic font-light text-slate-400 underline decoration-slate-200 decoration-2 underline-offset-4">Fit</span></h2>
              <p className="text-[13px] text-slate-500 font-medium">When are you looking to unlock these efficiencies?</p>
            </header>
            <div className="space-y-8">
              <CustomSelect label="Implementation Horizon" value={formData.timeline} onChange={v => updateFormData({ timeline: v as ImplementationTimeline })} options={['Urgent – This month', 'Soon – 1-2 months', 'Planning – 3-6 months', 'Researching']} placeholder="Select timeframe" />
              <CustomSelect label="Budget Allocation" value={formData.budget} onChange={v => updateFormData({ budget: v as BudgetRange })} options={['Testing Phase ($500 – $2,000)', 'Starter Investment ($2,000 – $5,000)', 'Serious Implementation ($5,000 – $15,000)', 'Enterprise Solution ($15,000+)', 'Not sure – depends on ROI']} placeholder="Select budget scope" />
            </div>
          </div>
        );
      case 8:
        return (
          <div className={scene}>
            <header className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-900 text-white rounded-lg"><ShieldCheck size={16} /></div>
                <span className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">Final Stage / Privacy</span>
              </div>
              <h2 className="text-4xl font-[900] text-slate-900 tracking-tighter">Final <span className="italic font-light text-slate-400 underline decoration-slate-200 decoration-2 underline-offset-4">Protocol</span></h2>
              <p className="text-[13px] text-slate-500 font-medium">Please confirm your diagnostic agreement.</p>
            </header>
            <div className="space-y-4">
              {[{ k: 'consentTransactional', t: 'I authorize the generation of a strategic diagnostic brief based on my data.', h: 'Required to receive your assessment.' }, { k: 'consentMarketing', t: 'I authorize periodic strategic updates and AI automation case studies.', h: 'Optional but recommended for staying ahead.' }].map(c => (
                <div key={c.k}>
                  <button onClick={() => updateFormData({ [c.k]: !formData[c.k as keyof FormData] })} className={`w-full p-5 rounded-xl border-2 transition-all duration-300 flex items-center gap-5 active:scale-[0.985] ${formData[c.k as keyof FormData] ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-100 hover:border-slate-300 text-slate-500'}`}>
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all ${formData[c.k as keyof FormData] ? 'bg-white' : 'bg-slate-100'}`}>
                      {formData[c.k as keyof FormData] && <Check size={10} strokeWidth={4} className="text-slate-900" />}
                    </div>
                    <span className="text-[13px] font-bold tracking-tight text-left leading-tight">{c.t}</span>
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
    <div className="flex-grow flex flex-col min-h-0 bg-white">
      {/* CARD BODY */}
      <div 
        ref={scrollRef} 
        className="flex-grow overflow-y-auto scrollbar-hide px-6 md:px-14 pt-12 pb-6"
      >
        {content()}
      </div>

      {/* COMMAND ROW */}
      <div className="shrink-0 px-6 md:px-14 pb-12 pt-6 flex items-center justify-between border-t border-slate-100/60">
        <div className="flex flex-col items-start gap-1">
          <button 
            onClick={onBack} 
            className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black text-[10px] uppercase tracking-widest transition-all active:scale-95"
          >
            <ArrowLeft size={14} strokeWidth={3} /> Back
          </button>
          <span className="text-[9px] font-bold text-slate-200 uppercase tracking-widest ml-1">Step 0{step - 1} / 07</span>
        </div>
        
        <button
          onClick={onNext}
          disabled={!valid() || isSubmitting}
          className={`h-[52px] px-8 rounded-full font-black text-[13px] uppercase tracking-widest transition-all duration-300 flex items-center gap-3 shadow-lg shadow-slate-900/5 ${
            valid() && !isSubmitting 
              ? 'bg-slate-900 text-white hover:translate-y-[-2px] active:scale-95 active:translate-y-0' 
              : 'bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-100'
          }`}
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={18} strokeWidth={3} />
          ) : (
            <>
              {step === 8 ? 'Build Brief' : 'Continue'} 
              <ArrowRight size={16} strokeWidth={3} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
