
export type JobTitle = 
  | 'Founder / Owner'
  | 'Director'
  | 'Operations Manager'
  | 'Sales Manager'
  | 'Marketing Manager'
  | 'Other';

export type CompanySize = 
  | 'Solo / Freelancer'
  | 'Small Team (2–10)'
  | 'Growing Business (11–50)'
  | 'Mid-size (51–200)'
  | 'Enterprise (200+)';

export type MonthlyRevenue = 
  | 'Just Starting (< $10k)'
  | 'Early Stage ($10k–$50k)'
  | 'Growing ($50k–$200k)'
  | 'Established ($200k–$1M)'
  | 'Scaled ($1M+)';

export type ImplementationTimeline = 
  | 'Urgent – This month'
  | 'Soon – 1–2 months'
  | 'Planning – 3–6 months'
  | 'Exploring – Just researching';

export type BudgetRange = 
  | 'Testing Phase ($500 – $2,000)'
  | 'Starter Investment ($2,000 – $5,000)'
  | 'Serious Implementation ($5,000 – $15,000)'
  | 'Enterprise Solution ($15,000+)'
  | 'Not sure – depends on ROI';

export interface FormData {
  companyName: string;
  userName: string;
  jobTitle: JobTitle | '';
  email: string;
  phone: string;
  website: string;
  companySize: CompanySize | '';
  revenue: MonthlyRevenue | '';
  techStack: string[];
  primaryPainPoint: string;
  firstAutomationTarget: string;
  timeline: ImplementationTimeline | '';
  budget: BudgetRange | '';
  consentTransactional: boolean;
  consentMarketing: boolean;
}

export const INITIAL_FORM_DATA: FormData = {
  companyName: '',
  userName: '',
  jobTitle: '',
  email: '',
  phone: '',
  website: '',
  companySize: '',
  revenue: '',
  techStack: [],
  primaryPainPoint: '',
  firstAutomationTarget: '',
  timeline: '',
  budget: '',
  consentTransactional: false,
  consentMarketing: false,
};
