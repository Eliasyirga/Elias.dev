import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, animate } from "framer-motion";
import {
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaPython,
} from "react-icons/fa";
import { SiTailwindcss, SiFlutter, SiNextdotjs } from "react-icons/si";

const skillsData = [
  { name: "JavaScript", level: 90, icon: <FaJsSquare /> },
  { name: "React / Next.js", level: 85, icon: <FaReact /> },
  { name: "Flutter", level: 85, icon: <SiFlutter /> },
  { name: "Node.js", level: 75, icon: <FaNodeJs /> },
  { name: "Tailwind CSS", level: 80, icon: <SiTailwindcss /> },
  { name: "MongoDB", level: 70, icon: <FaDatabase /> },
  { name: "Python", level: 65, icon: <FaPython /> },
];

const SkillRow = ({ name, level, icon, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(0, level, {
        duration: 1.5,
        delay: index * 0.1,
        ease: "easeOut",
        onUpdate: (latest) => setDisplayValue(Math.round(latest)),
      });
      return () => controls.stop();
    }
  }, [inView, level, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative border-b border-slate-100 py-5 md:py-8 transition-all duration-500 hover:px-2 md:hover:px-6 overflow-hidden"
    >
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
        {/* Left Side: Index, Icon, Name */}
        <div className="flex items-center gap-4 md:gap-8">
          <span className="text-[10px] md:text-xs font-black text-slate-300 group-hover:text-blue-600 transition-colors duration-500">
            {index + 1 < 10 ? `0${index + 1}` : index + 1}
          </span>
          <div className="text-xl md:text-4xl text-slate-400 group-hover:text-slate-900 group-hover:rotate-12 transition-all duration-500">
            {icon}
          </div>
          <h3 className="text-lg md:text-4xl font-black uppercase tracking-tighter text-slate-900 leading-none">
            {name}
          </h3>
        </div>

        {/* Right Side: Progress and Value */}
        <div className="flex items-center justify-between sm:justify-end gap-4 md:gap-6 w-full sm:w-auto">
          {/* Progress Bar */}
          <div className="flex-grow w-full sm:w-32 md:w-48 h-[2px] bg-slate-100 overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: `${level}%` } : {}}
              transition={{
                duration: 1.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute h-full bg-blue-600 group-hover:bg-slate-900 transition-colors duration-500"
            />
          </div>
          <span className="text-sm md:text-xl font-black tabular-nums text-slate-900 opacity-60 group-hover:opacity-100 transition-opacity">
            {displayValue}%
          </span>
        </div>
      </div>

      {/* Subtle Hover Reveal Effect - Disabled on small touch devices for better scroll experience */}
      <div className="absolute inset-0 -z-0 translate-y-full bg-slate-50 transition-transform duration-500 ease-out md:group-hover:translate-y-0" />
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="relative min-h-screen w-full bg-white py-12 md:py-32 px-5 md:px-10 font-[Poppins]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-24">
          {/* Left Column */}
          <div className="lg:w-2/5">
            <div className="lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4 md:space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="h-[1px] w-6 md:w-8 bg-blue-600" />
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] text-blue-600">
                    Capabilities
                  </span>
                </div>

                <h2 className="text-4xl sm:text-5xl md:text-8xl font-black leading-[0.9] md:leading-[0.85] tracking-tighter text-slate-900 uppercase">
                  Tech <br />
                  <span className="outline-text">Stack.</span>
                </h2>

                <p className="max-w-xs text-slate-500 text-xs md:text-base font-medium leading-relaxed">
                  Focusing on modern MERN development, Flutter ecosystems, and
                  high-performance system architectures.
                </p>

                <div className="pt-4 hidden md:block">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                    Updated 2026 / Build 04.2
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:flex-1">
            <div className="border-t border-slate-100">
              {skillsData.map((skill, idx) => (
                <SkillRow key={idx} {...skill} index={idx} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1px #0f172a;
          color: transparent;
        }
        @media (min-width: 768px) {
          .outline-text {
            -webkit-text-stroke: 1.5px #0f172a;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
