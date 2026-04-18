import { motion } from 'framer-motion';

export default function WelcomePage({ onNext }) {
  // Apple-style smooth, high-damping spring
  const springTransition = { type: "spring", stiffness: 60, damping: 20 };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center"
    >
      <div className="max-w-2xl w-full flex flex-col items-center relative">
        
        {/* Subtle glowing ambient light behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold/10 blur-[100px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.2 }}
          className="inline-block text-[10px] tracking-[0.4em] text-white/70 border border-white/10 px-6 py-2 rounded-full mb-12 uppercase bg-white/5 backdrop-blur-md"
        >
          Special Event · 2026
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream leading-tight mb-8 font-light tracking-tight"
        >
          Welcome to the<br />
          <em className="bg-gradient-to-br from-[#f5d78a] to-[#b8962e] bg-clip-text text-transparent not-italic font-medium">Farewell</em>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, flex: 0 }}
          animate={{ opacity: 1, flex: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          className="text-muted text-lg tracking-wide font-light mb-16 max-w-sm mx-auto"
        >
          A night of memories, friendship, and new beginnings.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...springTransition, delay: 1 }}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="group relative overflow-hidden bg-white/5 border border-white/10 text-cream font-medium px-10 py-4 rounded-full tracking-[0.15em] text-xs transition-all backdrop-blur-xl"
        >
          <span className="relative z-10">Enter Invitation</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
        </motion.button>
      </div>
    </motion.div>
  );
}
