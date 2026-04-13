// EditorialRevealer.jsx
import React from "react";
import { motion } from "framer-motion";

const EditorialRevealer = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[9999] font-[Poppins] overflow-hidden">
      {/* 1. Large Background Watermark - Z-10 */}
      <div className="absolute inset-0 z-10 flex items-center justify-center opacity-[0.03]">
        <h2 className="text-[30vw] font-black text-slate-900 uppercase tracking-tighter select-none">
          Elias.
        </h2>
      </div>

      {/* 2. Main Center Component - Z-20 */}
      <div className="relative z-20 text-center flex flex-col items-center">
        {/* Animated Masking Box */}
        <div className="relative mb-12 flex justify-center items-center">
          {/* Main "Outline" Letter */}
          <h1 className="text-9xl md:text-[11rem] font-black tracking-tighter text-slate-900 uppercase outline-text select-none">
            E
          </h1>

          {/* Sliding Mask Box - This creates the "filling" effect */}
          <motion.div
            animate={{
              top: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: [0.76, 0, 0.24, 1], // Custom Cubic Bezier for dramatic feel
            }}
            className="absolute left-0 w-full h-full bg-slate-900 rounded-2xl"
          />

          {/* Solid Letter Inside the Mask */}
          <h1 className="absolute text-9xl md:text-[11rem] font-black tracking-tighter text-white uppercase select-none">
            E
          </h1>
        </div>

        {/* Status Text with Staggered Fade */}
        <div className="space-y-3">
          <motion.p
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
            className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-900"
          >
            System Profile
          </motion.p>

          {/* Staggered DOTS */}
          <div className="flex gap-2 justify-center items-center">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  backgroundColor: ["#e2e8f0", "#0f172a", "#e2e8f0"],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
                className="h-1 w-1 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Inline styles for the outline-text and base styles */}
      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 2px #0f172a;
          color: transparent;
        }
        @media (max-width: 768px) {
          .outline-text {
            -webkit-text-stroke: 1px #0f172a;
          }
        }
      `}</style>
    </div>
  );
};

export default EditorialRevealer;
