import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const Hero = () => {
  const [role, setRole] = useState("Web");

  useEffect(() => {
    const interval = setInterval(() => {
      setRole((prev) => (prev === "Web" ? "App" : "Web"));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-white flex flex-col items-center justify-center px-4 md:px-6 py-20 overflow-hidden font-[Poppins]">
      {/* 1. Top Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-30 mb-2 md:mb-4 flex items-center gap-2 text-slate-500 font-medium text-xs sm:text-sm md:text-base text-center"
      >
        <span>Hi, my name is Elias Yirga and I am a</span>
      </motion.div>

      {/* 2. Main Typography Layer */}
      <div className="relative z-30 text-center select-none mb-4 md:mb-8">
        <motion.h1 className="text-[15vw] md:text-[9vw] leading-[0.85] font-black text-slate-900 tracking-tighter uppercase flex items-center justify-center flex-wrap">
          <AnimatePresence mode="wait">
            <motion.span
              key={role}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="inline-block"
            >
              {role}
            </motion.span>
          </AnimatePresence>

          <span className="inline-flex items-center justify-center w-[0.8em] h-[0.8em] rounded-full border-[1.5px] sm:border-[2px] md:border-[3px] border-slate-900 mx-1.5 md:mx-4 align-middle">
            <ArrowUpRight
              className="w-1/2 h-1/2 text-slate-900"
              strokeWidth={3}
            />
          </span>
          <span className="block sm:inline">Developer</span>
        </motion.h1>

        {/* Outline Text Layer */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[15vw] md:text-[9vw] leading-[0.85] font-black tracking-tighter uppercase outline-text mt-1 md:mt-0"
        >
          & Engineer
        </motion.h1>
      </div>

      {/* 3. Profile Image */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: 1,
          y: [0, -8, 0],
        }}
        transition={{
          opacity: { duration: 1, delay: 0.4 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-40 w-[280px] sm:w-[320px] md:w-[250px] lg:w-[310px]"
      >
        <img
          src="/vv.webp"
          alt="Elias Yirga"
          className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000 pointer-events-none drop-shadow-2xl"
        />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white via-white/40 to-transparent" />
      </motion.div>

      {/* 4. Footer Content / Buttons */}
      <div className="relative z-[60] mt-8 sm:mt-12 flex flex-col items-center gap-6 text-center pb-12 sm:pb-16">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-slate-500 font-medium text-sm md:text-lg max-w-[250px] sm:max-w-xs md:max-w-none px-4"
        >
          crafting high-end digital experiences{" "}
          <br className="hidden md:block" /> in Bahir Dar, Ethiopia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-row gap-3 md:gap-4 scale-90 sm:scale-100"
        >
          <button className="group relative px-6 sm:px-8 py-3 bg-slate-900 text-white rounded-full font-bold overflow-hidden transition-all shadow-lg hover:shadow-slate-300 text-sm md:text-base whitespace-nowrap">
            <span className="relative z-10">Hire Me</span>
            <div className="absolute inset-0 bg-slate-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          <button className="px-6 sm:px-8 py-3 bg-white border-2 border-slate-900 text-slate-900 rounded-full font-bold hover:bg-slate-50 transition-all text-sm md:text-base whitespace-nowrap">
            View Work
          </button>
        </motion.div>
      </div>

      {/* 5. Minimal Accents */}
      <div className="absolute bottom-8 left-12 hidden xl:block opacity-10 z-10">
        <p className="text-[10px] font-black tracking-[0.5em] uppercase text-slate-900 rotate-90 origin-left">
          Elias Yirga — Portfolio 2026
        </p>
      </div>

      <style>{`
        .outline-text {
          -webkit-text-stroke: 1.5px #e2e8f0;
          color: transparent;
        }
        @media (max-width: 768px) {
          .outline-text {
            -webkit-text-stroke: 0.8px #e2e8f0;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
