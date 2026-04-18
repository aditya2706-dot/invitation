import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, ArrowDown } from 'lucide-react';

export default function EnvelopePage({ name, onNext }) {
  const [isOpen, setIsOpen] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  // Trigger content stagger animation once the physical card reaches its zenith
  const handleCardReachedTop = () => {
    if (!contentReady) setContentReady(true);
  };

  const cinematicSpring = { type: "spring", stiffness: 50, damping: 15 };

  // Stagger Text Framer Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden w-full"
    >
      
      {/* Title above envelope */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.6 } }}
            transition={{ ...cinematicSpring, delay: 0.5 }}
            className="absolute top-12 md:top-20 text-center z-50 pointer-events-none w-full px-4"
          >
            <p className="text-white/60 tracking-[0.2em] uppercase text-[10px] md:text-xs font-light shadow-black drop-shadow-md">
              You Have Received An Invitation
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Perspective Container - Fully Responsive */}
      <div className="relative w-full max-w-[400px] aspect-[4/3] mt-16 md:mt-24 perspective-[1500px]">
        
        {/* Envelope Body (Moves down slightly when opened) */}
        <motion.div 
          animate={{ 
            y: isOpen ? 50 : 0, 
            scale: isOpen ? 0.92 : 1,
          }}
          transition={{ duration: 1.6, ease: [0.32, 0.72, 0, 1] }}
          whileHover={!isOpen ? { scale: 1.02, y: -2 } : {}}
          className="relative w-full h-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] cursor-pointer group"
        >
          
          {/* Back of Envelope */}
          <div className="absolute inset-0 bg-[#161616] rounded-md overflow-hidden border border-[#d4af37]/20">
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
          </div>

          {/* The Invitation Letter -> More elegant mobile-friendly sizing */}
          <motion.div
             initial={{ opacity: 0, y: "10%", scale: 0.95 }}
             animate={{ 
               opacity: isOpen ? 1 : 0, 
               y: isOpen ? "-75%" : "10%", 
               scale: isOpen ? 1 : 0.95,
               zIndex: 40 
             }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: isOpen ? 0.3 : 0 }}
             onAnimationComplete={() => isOpen && handleCardReachedTop()}
             className="absolute inset-x-2 top-2 bottom-2 bg-gradient-to-b from-[#fdfbf6] to-[#f4eee0] rounded flex flex-col items-center justify-start pt-8 px-6 pb-6 text-center shadow-[0_-10px_40px_rgba(212,175,55,0.15)] border border-[#d4af37]/30 min-h-[420px] md:min-h-[460px]"
          >
            {/* Elegant inner glow */}
            <div className="absolute inset-x-2 top-2 bottom-2 border border-[#d4af37]/10 rounded pointer-events-none" />

            {/* STAGGERED TEXT CONTENT */}
            <AnimatePresence>
              {contentReady && (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="relative z-10 w-full flex flex-col items-center h-full justify-between gap-4"
                >
                  
                  {/* Step 1: Title */}
                  <motion.div variants={itemVariants} className="w-full flex flex-col items-center">
                    <div className="text-[#c59b27] text-3xl mb-2 font-serif italic leading-none">F</div>
                    <h2 className="font-serif text-2xl md:text-3xl text-slate-900 font-light tracking-tight mb-1">Farewell</h2>
                    <p className="text-[#a88220] text-[8px] md:text-[9px] tracking-[0.4em] uppercase mb-4 border-b border-[#d4af37]/30 pb-3 w-3/4 mx-auto">Class of 2026</p>
                  </motion.div>
                  
                  {/* Step 2: Greeting Line */}
                  <motion.div variants={itemVariants} className="w-full">
                    <p className="font-serif text-lg md:text-xl text-slate-800 font-light">
                      Dear <em className="text-slate-900 font-medium not-italic">{name}</em>,
                    </p>
                  </motion.div>
                  
                  {/* Step 3: Message */}
                  <motion.div variants={itemVariants} className="w-full px-2">
                    <p className="text-slate-600 text-[11px] md:text-[13px] leading-relaxed font-light max-w-[280px] mx-auto">
                      We warmly invite you to a night filled with glitz, glamour, and cherished memories.
                      Let us celebrate the journey we have walked together.
                    </p>
                  </motion.div>

                  {/* Step 4: Event Details */}
                  <motion.div variants={itemVariants} className="w-full bg-white/60 border border-[#e5e7eb]/80 rounded-lg p-3 md:p-4 flex flex-col gap-2 shadow-sm mt-2">
                    <div className="flex items-center justify-center gap-2 text-slate-700 text-[9px] md:text-[11px] font-medium tracking-wide">
                      <MapPin size={12} className="text-[#d4af37]" /> MITRC Campus, Alwar
                    </div>
                    <div className="flex items-center justify-center gap-2 text-slate-700 text-[9px] md:text-[11px] font-medium tracking-wide">
                      <Calendar size={12} className="text-[#d4af37]" /> May 15, 2026
                    </div>
                    <div className="flex items-center justify-center gap-2 text-slate-700 text-[9px] md:text-[11px] font-medium tracking-wide">
                      <Clock size={12} className="text-[#d4af37]" /> 4:00 PM onwards
                    </div>
                  </motion.div>

                  {/* Step 5: Action Button */}
                  <motion.div variants={itemVariants} className="mt-4 md:mt-6 w-full">
                    <button
                      onClick={onNext}
                      className="group flex items-center justify-center gap-2 w-full bg-[#1a1a1a] text-[#f5d78a] font-medium px-6 py-3 rounded-md tracking-[0.15em] uppercase text-[9px] shadow-lg hover:shadow-xl hover:bg-black transition-all border border-[#333]"
                    >
                      Confirm Presence 
                      <motion.div animate={{ y: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                        <ArrowDown size={12} />
                      </motion.div>
                    </button>
                  </motion.div>

                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>

          {/* Fully Responsive Flaps using clip-path percentages instead of fixed border pixels */}
          
          {/* Envelope Left Flap */}
          <div 
            className="absolute inset-0 bg-[#222222] z-20 pointer-events-none drop-shadow-xl"
            style={{ clipPath: "polygon(0 0, 50% 50%, 0 100%)" }}
          >
             <div className="absolute inset-0 border-r border-[#d4af37]/10" />
          </div>
          
          {/* Envelope Right Flap */}
          <div 
            className="absolute inset-0 bg-[#202020] z-20 pointer-events-none drop-shadow-2xl shadow-[-10px_0_20px_rgba(0,0,0,0.5)]"
            style={{ clipPath: "polygon(100% 0, 50% 50%, 100% 100%)" }}
          >
             <div className="absolute inset-0 border-l border-[#d4af37]/10" />
          </div>
          
          {/* Envelope Bottom Flap */}
          <div 
            className="absolute inset-0 bg-[#262626] z-30 pointer-events-none drop-shadow-[0_-5px_15px_rgba(0,0,0,0.6)]"
            style={{ clipPath: "polygon(0 100%, 50% 48%, 100% 100%)" }}
          >
             {/* Gold V-trim matching the clip path edges */}
             <div className="absolute inset-0" style={{ 
               background: "linear-gradient(to top right, transparent 49.5%, rgba(212,175,55,0.4) 50%, transparent 50.5%)" 
             }} />
             <div className="absolute inset-0" style={{ 
               background: "linear-gradient(to top left, transparent 49.5%, rgba(212,175,55,0.4) 50%, transparent 50.5%)" 
             }} />
          </div>

          {/* Envelope Top Flap (3D Rotating opening) */}
          <motion.div
             initial={{ rotateX: 0 }}
             animate={{ 
                rotateX: isOpen ? 180 : 0, 
                zIndex: isOpen ? 0 : 50 
             }}
             transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
             style={{ transformOrigin: "top", transformStyle: "preserve-3d" }}
             className="absolute top-0 inset-x-0 h-[60%] z-40 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] flex justify-center cursor-pointer"
             onClick={() => !isOpen && setIsOpen(true)}
          >
            {/* The pointed flap shape via clip-path */}
            <div 
              className="w-full h-full bg-[#2a2a2a] relative overflow-hidden" 
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            >
               <div className="absolute top-0 inset-x-0 border-t border-[#d4af37]/30" />
            </div>
            
            {/* Pulsing Gold Wax Seal */}
            <AnimatePresence>
              {!isOpen && (
                <motion.div 
                  exit={{ opacity: 0, scale: 2, filter: "blur(10px)" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute bottom-[-15%] w-14 h-14 md:w-16 md:h-16 pointer-events-auto rounded-full z-50 flex items-center justify-center transform group-hover:scale-105"
                >
                  <motion.div
                    animate={{ boxShadow: ["0 0 15px rgba(212,175,55,0.3)", "0 0 35px rgba(212,175,55,0.7)", "0 0 15px rgba(212,175,55,0.3)"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-full bg-gradient-to-br from-[#ffd770] via-[#d4af37] to-[#8a6e2e] rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),0_5px_15px_rgba(0,0,0,0.5)] border border-[#a3801f] flex items-center justify-center relative overflow-hidden"
                  >
                    <div className="w-[85%] h-[85%] rounded-full border border-[#8a6e2e]/50 shadow-[inset_0_3px_6px_rgba(0,0,0,0.3)] flex items-center justify-center bg-gradient-to-tl from-[#b8962e] to-[#d4af37]">
                      <span className="text-[#3d3111] font-serif text-xl md:text-2xl italic font-bold drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]">F</span>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </motion.div>
      </div>
    </motion.div>
  );
}
