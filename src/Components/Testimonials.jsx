import React from "react";
import { motion } from "framer-motion";
import { Quote, MoveRight } from "lucide-react";

const testimonials = [
  {
    name: "Henok Alelign",
    role: "Founder & CEO, Alyah Software",
    comment:
      "Elias has demonstrated exceptional full-stack development skills. He is not only technically proficient but also highly creative.",
  },
  {
    name: "Zerihun",
    role: "Senior Frontend Developer, Eaglelion Systems",
    comment:
      "Elias’s frontend development skills are outstanding. He implements designs with precision and ensures the UX is seamless.",
  },
  {
    name: "Netsanet Yirga",
    role: "CEO & Founder, Grove Link",
    comment:
      "Elias designed our official website to be highly attractive and user-friendly. His professionalism made the process smooth.",
  },
  {
    name: "Ethio Amber Trading",
    role: "CEO & Founder, Ethio Amber PLC",
    comment:
      "Working with Elias was a seamless experience. He provided an optimized, well-designed solution tailored to our needs.",
  },
];

const TestimonialCard = ({ t }) => {
  // Get initials for a custom avatar look
  const initials = t.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="group relative w-[320px] md:w-[450px] flex-shrink-0 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] bg-[#fcfcfc] border border-slate-100 transition-all duration-700 hover:border-slate-900 hover:bg-white overflow-hidden">
      {/* Decorative Accent */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
        <Quote size={80} />
      </div>

      <div className="relative z-10 flex flex-col h-full justify-between">
        <p className="text-sm md:text-lg font-medium leading-relaxed text-slate-600 mb-10 whitespace-normal">
          “{t.comment}”
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xs font-black tracking-tighter">
              {initials}
            </div>
            <div className="min-w-0">
              <h4 className="text-xs md:text-sm font-black uppercase tracking-tight text-slate-900">
                {t.name}
              </h4>
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">
                {t.role}
              </p>
            </div>
          </div>
          <MoveRight
            size={18}
            className="text-slate-200 group-hover:text-slate-900 transition-colors -rotate-45"
          />
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const row1 = [...testimonials, ...testimonials];
  const row2 = [...testimonials.reverse(), ...testimonials];

  return (
    <section
      id="testimonials"
      className="relative bg-white py-24 md:py-40 overflow-hidden font-[Poppins]"
    >
      {/* Background Decor */}
      <div className="absolute left-10 top-20 text-[15vw] font-black text-slate-50 select-none pointer-events-none uppercase leading-none">
        Feedback
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-20 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white mb-6"
            >
              <div className="w-1 h-1 rounded-full bg-blue-400 animate-ping" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">
                Client Success
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
              Trusted <br />
              <span className="text-slate-300">Partnerships.</span>
            </h2>
          </div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-relaxed max-w-[280px] md:text-right border-l-2 md:border-l-0 md:border-r-2 border-slate-900 pl-6 md:pl-0 md:pr-6 py-2">
            Delivering high-performance digital solutions for industry leaders
            and innovative startups.
          </p>
        </div>
      </div>

      {/* Kinetic Marquee Rows */}
      <div className="space-y-4 md:space-y-8 relative z-10">
        {/* Row 1: Left to Right */}
        <div className="flex overflow-hidden group">
          <motion.div
            animate={{ x: [0, -1900] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 md:gap-8 pr-4 md:pr-8"
          >
            {row1.map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </motion.div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="flex overflow-hidden group">
          <motion.div
            animate={{ x: [-1900, 0] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 md:gap-8 pr-4 md:pr-8"
          >
            {row2.map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Screen Edge Fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-white via-white/80 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-white via-white/80 to-transparent z-20" />
    </section>
  );
};

export default Testimonials;
