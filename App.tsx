
import React, { useState, useCallback, useMemo } from 'react';
import { FormStep } from './components/FormStep';
import { WelcomeStep } from './components/WelcomeStep';
import { SuccessStep } from './components/SuccessStep';
import { ProgressHeader } from './components/ProgressHeader';
import { FormData, INITIAL_FORM_DATA } from './types';

const TOTAL_STEPS = 8;
const WEBHOOK_URL = 'https://n8n-n8n.oborax.easypanel.host/webhook/alileadassistant';

const App: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = useCallback(() => {
    if (step < TOTAL_STEPS) setStep(prev => prev + 1);
  }, [step]);

  const prevStep = useCallback(() => {
    if (step > 1) setStep(prev => prev - 1);
  }, [step]);

  const updateFormData = useCallback((newData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const payload = { ...formData, submittedAt: new Date().toISOString(), source: 'Creative CRM Pro' };
    try {
      await fetch(WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    } catch (e) { console.error(e); }
    await new Promise(r => setTimeout(r, 2000));
    setIsSubmitting(false);
    setStep(9);
  };

  const progress = useMemo(() => step === 1 ? 0 : step > 8 ? 100 : ((step - 1) / (TOTAL_STEPS - 1)) * 100, [step]);

  return (
    <div className="h-[100dvh] w-full flex items-center justify-center p-0 md:p-12 overflow-hidden bg-transparent">
      {step > 1 && step < 9 && <ProgressHeader progress={progress} />}
      
      <main className="w-full max-w-xl h-full md:h-[800px] md:max-h-[85vh] bg-white/70 backdrop-blur-3xl md:bg-white/80 md:rounded-[2.5rem] md:border md:border-white/50 md:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] relative flex flex-col animate-fade-up overflow-hidden">
        {step === 1 && <WelcomeStep onStart={nextStep} />}
        {step >= 2 && step <= 8 && (
          <FormStep
            step={step}
            formData={formData}
            updateFormData={updateFormData}
            onNext={step === 8 ? handleSubmit : nextStep}
            onBack={prevStep}
            isSubmitting={isSubmitting}
          />
        )}
        {step === 9 && <SuccessStep formData={formData} />}
      </main>
    </div>
  );
};

export default App;
