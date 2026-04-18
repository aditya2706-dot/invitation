import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function ConfirmationPage({ name, onHome }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    try {
      const url = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/rsvp';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      
      if (!response.ok) throw new Error('Failed to submit RSVP');
      
      setStatus('success');
      
      // Fire premium monochromatic gold/silver confetti
      const count = 250;
      const defaults = {
        origin: { y: 0.8 },
        colors: ['#d4af37', '#ffffff', '#7a7a7a', '#f5d78a']
      };

      function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio)
        }));
      }

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });

    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const springTransition = { type: "spring", stiffness: 60, damping: 20 };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md w-full"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
            className="text-gold mb-8 flex justify-center"
          >
            <CheckCircle2 strokeWidth={1} size={90} />
          </motion.div>
          <h2 className="font-serif text-5xl text-cream mb-6 tracking-tight font-light">See you there.</h2>
          <p className="text-white/40 text-[13px] mb-12 leading-relaxed max-w-xs mx-auto font-light">
            Your presence has been recorded. We will send updates to <span className="text-white/80 font-medium">{email}</span>.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onHome}
            className="border text-white/30 border-white/10 px-8 py-3 rounded-full uppercase tracking-widest text-[10px] hover:text-white hover:border-white/30 shadow-lg transition-all backdrop-blur-md"
          >
            Return to Beginning
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6"
    >
      <motion.div
        initial={{ y: 20, filter: "blur(10px)" }}
        animate={{ y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full bg-black/40 border border-white/5 backdrop-blur-3xl rounded-2xl p-10 md:p-12 shadow-2xl relative"
      >
        <div className="text-center mb-10">
          <div className="text-gold text-xs tracking-[0.3em] uppercase mb-4 font-medium">Final Step</div>
          <h2 className="font-serif text-3xl text-cream font-light mb-2 tracking-tight">One Last Confirmation</h2>
          <p className="text-white/40 text-[11px] tracking-wide">We want to make this night perfect for you.</p>
        </div>

        {/* Event Summary */}
        <div className="border border-white/5 rounded-xl p-5 mb-8 bg-white/[0.02]">
          {[
            ['Dress Code', 'Formal — Black & Gold'],
            ['Arrival', 'By 3:30 PM for red carpet'],
            ['Venue', 'MITRC Campus Main Hall'],
            ['Date', 'May 15, 2026'],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between py-2.5 border-b border-white/5 last:border-0 text-[11px]">
              <span className="text-white/40 tracking-widest uppercase">{label}</span>
              <span className="text-cream font-light text-right max-w-[60%]">{value}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleConfirm} className="flex flex-col gap-5 w-full">
          <div>
             <input
                type="text"
                value={name}
                disabled
                className="w-full bg-white/5 border border-white/5 rounded-lg px-4 py-3 text-cream text-[13px] opacity-50 cursor-not-allowed font-light"
             />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="w-full bg-transparent border-b border-white/20 text-cream text-[15px] pb-3 pt-2 outline-none transition-all focus:border-gold placeholder:text-white/30 placeholder:font-light font-light"
            />
          </div>
          <div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="A short message for the class (optional)"
              rows={2}
              className="w-full bg-transparent border-b border-white/20 text-cream text-[15px] pb-3 pt-3 outline-none transition-all focus:border-gold placeholder:text-white/30 placeholder:font-light font-light resize-none mt-2"
            />
          </div>

          <AnimatePresence>
            {status === 'error' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-red-400 text-xs flex items-center gap-2 pt-2">
                <AlertCircle size={14} /> Failed to submit. Please try again.
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={!email.trim() || status === 'loading'}
            whileHover={email.trim() && status !== 'loading' ? { scale: 1.02 } : {}}
            whileTap={email.trim() && status !== 'loading' ? { scale: 0.98 } : {}}
            className="w-full mt-6 bg-cream text-black font-medium px-8 py-4 rounded-full tracking-[0.15em] uppercase text-[10px] shadow-lg transition-all disabled:opacity-30 flex justify-center items-center"
          >
            {status === 'loading' ? 'Confirming...' : "Yes, I'll be there"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
