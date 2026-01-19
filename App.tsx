
import React, { useState, useCallback, useMemo, useEffect } from 'react';
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
    if (step < TOTAL_STEPS) {
      setStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);

  const prevStep = useCallback(() => {
    if (step > 1) {
      setStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);

  const updateFormData = useCallback((newData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const payload = {
      ...formData,
      submittedAt: new Date().toISOString(),
      source: 'Lumina AI Assessment'
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error('Webhook error:', error);
    }

    await new Promise(resolve => setTimeout(resolve, 2800));
    setIsSubmitting(false);
    setStep(9);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentProgress = useMemo(() => {
    if (step === 1) return 0;
    if (step > 8) return 100;
    return ((step - 1) / (TOTAL_STEPS - 1)) * 100;
  }, [step]);

  return (
    <div className="min-h-[100dvh] flex flex-col relative overflow-hidden bg-[#fcfdfe]">
      {step > 1 && step < 9 && <ProgressHeader progress={currentProgress} />}

      <main className="flex-grow flex items-center justify-center p-0 md:p-6 lg:p-12 relative z-10">
        <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-200/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full flex items-center justify-center transition-all duration-700">
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
        </div>
      </main>
    </div>
  );
};

export default App;
