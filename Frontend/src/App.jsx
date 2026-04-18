import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import StarsBackground from './components/StarsBackground';
import WelcomePage from './components/WelcomePage';
import NameInputPage from './components/NameInputPage';
import EnvelopePage from './components/EnvelopePage';
import ConfirmationPage from './components/ConfirmationPage';

export default function App() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');

  const handleSetHome = () => {
    setStep(1);
    setName('');
  };

  return (
    <div className="relative min-h-screen bg-bg-dark text-cream overflow-hidden">
      <StarsBackground />

      {/* AnimatePresence allows components to animate out before unmounting */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <WelcomePage key="step1" onNext={() => setStep(2)} />
        )}
        
        {step === 2 && (
          <NameInputPage key="step2" onNext={(n) => { setName(n); setStep(3); }} />
        )}
        
        {step === 3 && (
          <EnvelopePage key="step3" name={name} onNext={() => setStep(4)} />
        )}
        
        {step === 4 && (
          <ConfirmationPage key="step4" name={name} onHome={handleSetHome} />
        )}
      </AnimatePresence>
    </div>
  );
}