import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import {
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaPython,
} from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";

const skillsData = [
  { name: "JavaScript", level: 90, icon: <FaJsSquare /> },
  { name: "React", level: 85, icon: <FaReact /> },
  { name: "Node.js", level: 75, icon: <FaNodeJs /> },
  { name: "Tailwind CSS", level: 80, icon: <SiTailwindcss /> },
  { name: "MongoDB", level: 70, icon: <FaDatabase /> },
  { name: "Python", level: 65, icon: <FaPython /> },
];

const Skills = () => (
  <section
    id="skills"
    className="w-full px-4 sm:px-8 py-16 bg-gradient-to-br from-black via-gray-900 to-black font-[Poppins]"
  >
    <h2 className="text-4xl font-extrabold mb-16 text-center text-transparent bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text">
      My Skills
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      {skillsData.map((skill, idx) => (
        <SkillItem key={idx} {...skill} />
      ))}
    </div>
  </section>
);

const SkillItem = ({ name, level, icon }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.4 });
  const progress = useMotionValue(0);

  const stroke = 4;
  const radius = 36;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset = useTransform(
    progress,
    (value) => circumference - (value / 100) * circumference
  );

  const percentage = useMotionValue(0);
  const rounded = useTransform(percentage, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = rounded.onChange((latest) => setDisplayValue(latest));
    if (inView) {
      animate(progress, level, { duration: 1.7, ease: "easeOut" });
      animate(percentage, level, { duration: 1.7, ease: "easeOut" });
    }
    return () => unsubscribe();
  }, [inView, level, progress, percentage, rounded]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { scale: 0.95 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{
        scale: 1.07,
        boxShadow:
          "0 0 25px 6px rgba(59, 130, 246, 0.7), 0 10px 20px rgba(37, 99, 235, 0.4)",
      }}
      className="relative flex flex-col items-center space-y-4 p-6 bg-black/70 backdrop-blur-md rounded-3xl border border-blue-700 shadow-lg cursor-pointer overflow-hidden focus:outline-none focus:ring-4 focus:ring-blue-500"
      tabIndex={0}
      aria-label={`${name} skill level ${level} percent`}
    >
      {/* Glowing radial background behind icon */}
      <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-gradient-to-br from-blue-600/50 to-blue-400/20 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 w-20 h-20 text-blue-500 drop-shadow-lg">
        {React.cloneElement(icon, { className: "w-full h-full" })}
      </div>

      <div className="relative z-10 w-20 h-20">
        <svg width={radius * 2} height={radius * 2} className="rotate-[-90deg]">
          <circle
            stroke="#111827"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <motion.circle
            stroke="url(#gradient)"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="filter drop-shadow-[0_0_8px_rgba(59,130,246,0.9)]"
          />

          <text
            x={radius}
            y={radius}
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(90 ${radius} ${radius})`} // <-- This keeps text straight
            className="fill-blue-400 font-extrabold text-base sm:text-lg"
            style={{
              userSelect: "none",
              filter: "drop-shadow(0 0 3px rgba(59,130,246,0.9))",
            }}
          >
            {displayValue}%
          </text>

          <defs>
            <linearGradient id="gradient" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <h3 className="relative z-10 text-lg font-extrabold tracking-wider bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent select-none">
        {name}
      </h3>
    </motion.div>
  );
};

export default Skills;
