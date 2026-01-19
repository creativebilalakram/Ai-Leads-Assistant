
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

  // Keyboard Navigation: Effortless progression
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && step >= 2 && step <= 8) {
        // Logic handled by child components via button state
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step]);

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
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error('Webhook delivery encountered a non-200 status:', response.status);
      }
    } catch (error) {
      console.error('Critical failure sending data to webhook:', error);
    }

    // Synthesis Simulation
    await new Promise(resolve => setTimeout(resolve, 3200));

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
    <div className="min-h-[100dvh] flex flex-col selection:bg-teal-100 selection:text-teal-900 transition-colors duration-1000 relative overflow-x-hidden">
      {/* Dynamic Progress Bar */}
      {step > 1 && step < 9 && (
        <ProgressHeader progress={currentProgress} />
      )}

      <main className="flex-grow flex items-center justify-center relative">
        {/* Soft Background Globs - Adjusted for Mobile to prevent horizontal scroll */}
        <div className="fixed top-[-5%] left-[-15%] w-[80%] md:w-[60%] h-[40%] md:h-[60%] bg-teal-200/15 rounded-full blur-[80px] md:blur-[140px] pointer-events-none z-0" />
        <div className="fixed bottom-[-5%] right-[-15%] w-[80%] md:w-[50%] h-[40%] md:h-[50%] bg-blue-200/10 rounded-full blur-[70px] md:blur-[120px] pointer-events-none z-0" />

        <div className="w-full max-w-2xl z-10 transition-all duration-700 ease-in-out md:p-6 lg:p-0">
          {step === 1 && (
            <div className="py-12 md:py-0">
              <WelcomeStep onStart={nextStep} />
            </div>
          )}

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

          {step === 9 && (
            <div className="py-12 md:py-0">
              <SuccessStep formData={formData} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
