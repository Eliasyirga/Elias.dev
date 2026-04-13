import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Building2,
  ArrowUpRight,
  Zap,
  CheckCircle2,
  X,
  Maximize2,
  ShieldCheck, // Verified: Imported correctly
} from "lucide-react";

const certificates = [
  {
    id: 1,
    src: "/pic1.jpg",
    title: "Full Stack Development",
    issuer: "Coursera",
    date: "2025",
    size: "lg",
  },
  {
    id: 2,
    src: "/pic2.jpg",
    title: "Advanced React Patterns",
    issuer: "Meta",
    date: "2026",
    size: "sm",
  },
  {
    id: 3,
    src: "/55.png",
    title: "Python for Engineering",
    issuer: "IBM",
    date: "2025",
    size: "sm",
  },
  {
    id: 4,
    src: "/pic3.jpg",
    title: "Cloud Architecture",
    issuer: "AWS",
    date: "2026",
    size: "sm",
  },
  {
    id: 5,
    src: "/pic4.jpg",
    title: "Machine Learning",
    issuer: "Google",
    date: "2025",
    size: "sm",
  },
];

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section className="bg-white py-32 px-6 font-[Poppins] relative overflow-hidden">
      {/* Background Text Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-[0.03] select-none">
        <h1 className="text-[20vw] font-black text-slate-900 leading-none mt-20 uppercase">
          Accredited
        </h1>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white"
            >
              <Zap size={12} className="fill-current" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">
                Verified Credentials
              </span>
            </motion.div>
            <h2 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
              Proven <br />
              <span className="text-slate-300">Expertise.</span>
            </h2>
          </div>
          <div className="lg:text-right border-l-2 lg:border-l-0 lg:border-r-2 border-slate-900 pl-6 lg:pl-0 lg:pr-6 py-2">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-relaxed max-w-[300px]">
              A curated collection of industry-leading certifications in
              software engineering.
            </p>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`group cursor-pointer relative bg-[#fcfcfc] border border-slate-100 p-8 rounded-[2.5rem] overflow-hidden flex flex-col justify-between transition-all duration-700 hover:border-slate-900
                ${cert.size === "lg" ? "md:col-span-4 lg:col-span-3 lg:row-span-2" : "md:col-span-2 lg:col-span-3"}`}
            >
              <div className="relative z-20">
                <div className="flex justify-between items-start mb-12">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white shadow-sm border border-slate-50 rounded-2xl group-hover:bg-slate-900 group-hover:text-white transition-colors duration-500">
                      <Building2 size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        {cert.issuer}
                      </p>
                      <p className="text-xs font-bold text-slate-900">
                        {cert.date}
                      </p>
                    </div>
                  </div>
                  <CheckCircle2
                    size={18}
                    className="text-slate-200 group-hover:text-slate-900 transition-colors"
                  />
                </div>

                <h3
                  className={`font-black text-slate-900 uppercase tracking-tighter leading-tight transition-all duration-500 group-hover:translate-x-2
                  ${cert.size === "lg" ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"}`}
                >
                  {cert.title}
                </h3>
              </div>

              <div className="mt-12 flex items-center justify-between relative z-20">
                <div className="h-[1px] flex-grow bg-slate-100 group-hover:bg-slate-200 transition-colors mr-6" />
                <div className="p-4 bg-white border border-slate-100 rounded-full shadow-sm text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all">
                  <Maximize2 size={20} />
                </div>
              </div>

              {/* Card Hover Image */}
              <div className="absolute inset-0 z-10 pointer-events-none transition-all duration-700 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                <img
                  src={cert.src}
                  className="w-full h-full object-cover grayscale brightness-[0.2]"
                  alt="Preview"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em]">
                    View Full Screen
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Screen Lightbox Overlay */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/95 backdrop-blur-xl p-4 md:p-10"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              className="relative max-w-6xl w-full bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 z-[110] p-3 bg-black/10 hover:bg-black text-black hover:text-white rounded-full transition-all"
              >
                <X size={24} />
              </button>

              {/* Image Container */}
              <div className="lg:w-2/3 bg-[#f8f8f8] p-4 lg:p-12 flex items-center justify-center">
                <img
                  src={selectedCert.src}
                  className="max-w-full max-h-[50vh] lg:max-h-[70vh] shadow-2xl rounded-lg"
                  alt="Certificate"
                />
              </div>

              {/* Sidebar Details */}
              <div className="lg:w-1/3 p-8 lg:p-12 flex flex-col justify-between bg-white border-l border-slate-100">
                <div>
                  <div className="flex items-center gap-2 text-emerald-600 mb-8">
                    <ShieldCheck size={20} />
                    <span className="text-xs font-black uppercase tracking-widest">
                      Verified Credential
                    </span>
                  </div>

                  <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-8 leading-[0.9]">
                    {selectedCert.title}
                  </h3>

                  <div className="space-y-6">
                    <div className="pb-6 border-b border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                        Organization
                      </p>
                      <p className="text-xl font-bold text-slate-900">
                        {selectedCert.issuer}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                        Date Issued
                      </p>
                      <p className="text-xl font-bold text-slate-900">
                        {selectedCert.date}
                      </p>
                    </div>
                  </div>
                </div>

                <motion.a
                  href="#"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-12 w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3"
                >
                  Verify Certificate <ArrowUpRight size={18} />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
