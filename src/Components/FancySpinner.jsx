import React from "react";
import { motion } from "framer-motion";

const FancySpinner = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[9999] font-[Poppins] overflow-hidden">
      {/* 1. Central Identity */}
      <div className="relative flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase"
        >
          Elias
        </motion.h1>

        {/* 2. Simplified Status Indicator */}
        <div className="mt-4 flex flex-col items-center gap-2">
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-[10px] font-bold tracking-[0.5em] text-slate-400 uppercase"
          >
            System Loading
          </motion.span>

          {/* Minimalist Progress Bar */}
          <div className="w-32 h-[2px] bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1/2 h-full bg-slate-900 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* 3. Subtle Corner Accents (Cyber-Futuristic touch) */}
      <div className="absolute bottom-10 flex gap-4 opacity-20">
        <div className="flex flex-col items-center">
          <span className="text-[8px] font-mono text-slate-900 uppercase">
            Status: 200
          </span>
          <div className="w-8 h-[1px] bg-slate-900 mt-1" />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[8px] font-mono text-slate-900 uppercase">
            Loc: ETH_BD
          </span>
          <div className="w-8 h-[1px] bg-slate-900 mt-1" />
        </div>
      </div>
    </div>
  );
};

export default FancySpinner;
