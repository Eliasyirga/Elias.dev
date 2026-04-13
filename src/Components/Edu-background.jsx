import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const MinimalistCertificates = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="bg-white py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-12 block">
          Technical Validation
        </span>

        <div className="flex flex-col border-t border-slate-100">
          {certificates.map((cert, index) => (
            <div
              key={cert.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex items-center justify-between py-10 border-b border-slate-100 cursor-pointer"
            >
              <div className="z-10">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                  {cert.issuer}
                </span>
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 group-hover:translate-x-4 transition-transform duration-500">
                  {cert.title}
                </h3>
              </div>

              <div className="z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-45">
                <ArrowUpRight size={40} className="text-slate-900" />
              </div>

              {/* Floating Image Preview */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -20 }}
                    className="absolute right-[20%] pointer-events-none z-0 hidden lg:block"
                  >
                    <img
                      src={cert.src}
                      alt="Preview"
                      className="w-64 h-40 object-cover rounded-2xl shadow-2xl grayscale"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MinimalistCertificates;
