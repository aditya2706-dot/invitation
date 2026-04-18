import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function NameInputPage({ onNext }) {
  const [name, setName] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus input softly after mount
    setTimeout(() => {
      inputRef.current?.focus();
    }, 600);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) onNext(name.trim());
  };

  const springTransition = { type: "spring", stiffness: 60, damping: 20 };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center"
    >
      <div className="max-w-xl w-full flex flex-col items-center justify-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.3 }}
          className="font-serif text-3xl md:text-5xl text-cream font-light mb-16 tracking-tight"
        >
          May we have your name?
        </motion.h2>

        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full relative">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="w-full max-w-md relative"
          >
            <input
              ref={inputRef}
              type="text"
              className="w-full bg-transparent border-b border-white/20 text-cream text-3xl md:text-4xl pb-4 text-center outline-none transition-colors focus:border-gold font-light placeholder:text-white/20 tracking-wide"
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* Ambient input glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gold opacity-0 focus-within:opacity-100 transition-opacity duration-700 blur-[2px]" />
          </motion.div>

          {/* Minimalist floating submit circle */}
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ 
               opacity: name.trim() ? 1 : 0, 
               y: name.trim() ? 0 : 20,
               scale: name.trim() ? 1 : 0.8,
               pointerEvents: name.trim() ? "auto" : "none"
            }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,1)", color: "#000" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="mt-16 w-16 h-16 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          >
            <ArrowRight strokeWidth={1.5} size={24} />
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
