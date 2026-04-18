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
        staggerChildren: 0.35, // 0.35s delay between elements
        delayChildren: 0.2
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
      className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden"
    >
      
      {/* Title above envelope, hides when open */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.6 } }}
            transition={{ ...cinematicSpring, delay: 0.5 }}
            className="absolute top-20 text-center z-50 pointer-events-none"
          >
            <p className="text-white/60 tracking-[0.2em] uppercase text-sm font-light mb-2 shadow-black drop-shadow-md">
              You Have Received An Invitation
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Perspective Container */}
      <div className="relative w-full max-w-[440px] aspect-[4/3] mt-24 perspective-[1500px]">
        
        {/* Envelope Body (Moves down when opened) */}
        <motion.div 
          animate={{ 
            y: isOpen ? 80 : 0, 
            scale: isOpen ? 0.95 : 1,
          }}
          transition={{ duration: 1.6, ease: [0.32, 0.72, 0, 1] }}
          whileHover={!isOpen ? { scale: 1.02, y: -5 } : {}}
          className="relative w-full h-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] cursor-pointer group"
        >
          
          {/* Inside of the back of the envelope */}
          <div className="absolute inset-0 bg-[#161616] rounded-xl overflow-hidden border border-[#d4af37]/20">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-t from-transparent to-[#d4af37]" />
          </div>

          {/* 
            The Invitation Letter (Slides Up) 
            Starts opacity: 0 to ensure it's completely hidden behind the closed envelope
          */}
          <motion.div
             initial={{ opacity: 0, y: "15%", scale: 0.95 }}
             animate={{ 
               opacity: isOpen ? 1 : 0, // Reveals precisely as the envelope opens
               y: isOpen ? "-75%" : "15%", 
               scale: isOpen ? 1 : 0.95,
               zIndex: 40 
             }}
             transition={{ 
               duration: 1.5, 
               ease: [0.16, 1, 0.3, 1], 
               delay: isOpen ? 0.3 : 0 
             }}
             onAnimationComplete={() => isOpen && handleCardReachedTop()}
             className="absolute inset-x-3 top-2 bottom-2 bg-[#fcfcfc] rounded-lg flex flex-col items-center justify-start pt-10 px-8 pb-8 text-center shadow-[0_0_40px_rgba(212,175,55,0.15)] border-2 border-[#d4af37]/30 min-h-[460px]"
          >
            {/* Subtle glow highlight across the physical card */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: isOpen ? 1 : 0 }}
               transition={{ delay: 1, duration: 2 }}
               className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-transparent pointer-events-none rounded-lg"
            />

            {/* STAGGERED TEXT CONTENT (Triggers after card is fully drawn) */}
            <AnimatePresence>
              {contentReady && (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="relative z-10 w-full flex flex-col items-center"
                >
                  
                  {/* Step 1: Title */}
                  <motion.div variants={itemVariants} className="w-full flex flex-col items-center">
                    <div className="text-[#d4af37] text-3xl mb-3 font-serif italic leading-none">F</div>
                    <h2 className="font-serif text-3xl text-slate-900 font-light tracking-tight mb-1">Farewell</h2>
                    <p className="text-[#b8962e] text-[10px] tracking-[0.4em] uppercase mb-8 border-b border-[#d4af37]/40 pb-4 w-full">Class of 2026</p>
                  </motion.div>
                  
                  {/* Step 2: Greeting Line */}
                  <motion.div variants={itemVariants} className="w-full">
                    <p className="font-serif text-xl text-slate-800 mb-5 font-light">
                      Dear <em className="text-slate-900 font-medium not-italic">{name}</em>,
                    </p>
                  </motion.div>
                  
                  {/* Step 3: Message Fade In */}
                  <motion.div variants={itemVariants} className="w-full">
                    <p className="text-slate-600 text-[13.5px] leading-relaxed mb-8 font-light max-w-[300px]">
                      We invite you to a night filled with glitz, glamour, and cherished memories.
                      Let us celebrate the journey we have walked together.
                    </p>
                  </motion.div>

                  {/* Step 4: Event Details */}
                  <motion.div variants={itemVariants} className="w-full bg-[#f8f9fa] border border-[#e5e7eb] rounded-xl p-5 flex flex-col gap-3 shadow-inner">
                    <div className="flex items-center justify-center gap-3 text-slate-700 text-[11px] font-medium tracking-wide">
                      <MapPin size={15} strokeWidth={1.5} className="text-[#d4af37]" /> MITRC Campus, Alwar
                    </div>
                    <div className="flex items-center justify-center gap-3 text-slate-700 text-[11px] font-medium tracking-wide">
                      <Calendar size={15} strokeWidth={1.5} className="text-[#d4af37]" /> May 15, 2026
                    </div>
                    <div className="flex items-center justify-center gap-3 text-slate-700 text-[11px] font-medium tracking-wide">
                      <Clock size={15} strokeWidth={1.5} className="text-[#d4af37]" /> 4:00 PM onwards
                    </div>
                  </motion.div>

                  {/* Step 5: Action Button (pops out last) */}
                  <motion.div variants={itemVariants} className="mt-8 w-full">
                    <button
                      onClick={onNext}
                      className="group flex items-center justify-center gap-3 w-full bg-gradient-to-r from-[#d4af37] to-[#b8962e] text-black font-semibold px-8 py-3.5 rounded-full tracking-[0.1em] uppercase text-[10px] shadow-[0_4px_15px_rgba(212,175,55,0.4)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all border border-[#f5d78a]/50"
                    >
                      Confirm My Presence 
                      <motion.div
                        animate={{ y: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ArrowDown size={14} strokeWidth={2.5} />
                      </motion.div>
                    </button>
                  </motion.div>

                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>

          {/* Envelope Left Flap  */}
          <div className="absolute inset-0 z-20 pointer-events-none drop-shadow-2xl">
            <div className="absolute inset-0 border-y-[165px] border-l-[220px] border-r-0 border-solid border-transparent border-l-[#1f1f1f] border-l-[rgba(31,31,31,0.95)]" />
          </div>
          
          {/* Envelope Right Flap */}
          <div className="absolute inset-0 z-20 pointer-events-none drop-shadow-2xl">
            <div className="absolute inset-0 border-y-[165px] border-r-[220px] border-l-0 border-solid border-transparent border-r-[#1f1f1f] border-r-[rgba(31,31,31,0.95)] shadow-[-10px_0_20px_rgba(0,0,0,0.5)]" />
          </div>
          
          {/* Envelope Bottom Flap */}
          <div className="absolute inset-0 z-30 pointer-events-none drop-shadow-[0_-5px_15px_rgba(0,0,0,0.4)]">
             <div className="absolute bottom-0 w-full h-0 border-b-[200px] border-x-[220px] border-solid border-transparent border-b-[#262626]" style={{ borderBottomColor: "#262626" }} />
             {/* Gold trim along top edge of bottom flap */}
             <svg className="absolute bottom-0 w-full h-[200px] z-30" preserveAspectRatio="none" viewBox="0 0 100 100">
               <polygon points="0,100 50,0 100,100" fill="none" stroke="#d4af37" strokeWidth="0.4" strokeOpacity="0.4" />
             </svg>
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
             className="absolute top-0 inset-x-0 h-[180px] drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] flex justify-center"
             onClick={() => !isOpen && setIsOpen(true)}
          >
            {/* The pointed flap shape */}
            <div 
              className="w-full h-full bg-[#303030] relative overflow-hidden" 
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            >
               {/* Gold edge styling on the flap */}
               <div className="absolute inset-0 border-t-[1.5px] border-[#d4af37]/30" />
            </div>
            
            {/* Pulsing Gold Wax Seal */}
            <AnimatePresence>
              {!isOpen && (
                <motion.div 
                  exit={{ opacity: 0, scale: 2, filter: "blur(10px)" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute bottom-[-28px] w-16 h-16 pointer-events-auto rounded-full z-50 flex items-center justify-center transform group-hover:scale-105"
                >
                  <motion.div
                    animate={{ 
                      boxShadow: ["0 0 15px rgba(212,175,55,0.3)", "0 0 35px rgba(212,175,55,0.7)", "0 0 15px rgba(212,175,55,0.3)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-full bg-gradient-to-br from-[#ffd770] via-[#d4af37] to-[#8a6e2e] rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),0_5px_15px_rgba(0,0,0,0.5)] border border-[#a3801f] flex items-center justify-center relative overflow-hidden"
                  >
                    {/* Inner seal stamp indent */}
                    <div className="w-[85%] h-[85%] rounded-full border border-[#8a6e2e]/50 shadow-[inset_0_3px_6px_rgba(0,0,0,0.3)] flex items-center justify-center bg-gradient-to-tl from-[#b8962e] to-[#d4af37]">
                      <span className="text-[#3d3111] font-serif text-2xl italic font-bold drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]">F</span>
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
