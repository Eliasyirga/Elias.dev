import React from "react";
import {
  FaGraduationCap,
  FaUserTie,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

const education = [
  {
    title: "Bahirdar University",
    sub: "Computer Engineering",
    years: "2022 – Present",
    description:
      "Specializing in Software Development and AI. Engaging in advanced networking and system architecture projects.",
    current: true,
  },
  {
    title: "Atikem Mengesh High School",
    sub: "Secondary Education",
    years: "2018 – 2021",
    description: "Focus on natural sciences and foundational mathematics.",
  },
  {
    title: "Bure Yohanes Primary",
    sub: "Primary Education",
    years: "2010 – 2017",
    description: "Developed strong analytical skills and academic discipline.",
  },
];

const experience = [
  {
    position: "Full-stack Developer Intern",
    place: "Alyah Software",
    duration: "June 2023 – Sept 2023",
    description:
      "Architected MERN stack features and streamlined cloud deployment workflows.",
    current: false,
  },
  {
    position: "Frontend Developer",
    place: "Eaglelion System Technologies",
    duration: "2021 – 2022",
    description:
      "Engineered responsive interfaces using React and Tailwind for enterprise-level clients.",
  },
];

const Card = ({ item }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="group relative mb-12 last:mb-0"
  >
    {/* Minimal Timeline Bullet */}
    <div className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-2 border-slate-900 bg-white z-10 transition-all duration-500 group-hover:bg-slate-900" />

    <div className="relative">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
        <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 group-hover:text-slate-500 transition-colors">
          {item.title || item.position}
        </h3>
        {item.current && (
          <span className="text-[10px] font-black uppercase tracking-widest border border-slate-900 px-3 py-1 text-slate-900">
            Active
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-4">
        <div className="flex items-center gap-2">
          <FaCalendarAlt size={10} className="text-slate-900" />
          <span>{item.years || item.duration}</span>
        </div>
        {(item.place || item.sub) && (
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt size={10} className="text-slate-900" />
            <span>{item.place || item.sub}</span>
          </div>
        )}
      </div>

      <p className="text-slate-500 leading-relaxed font-medium text-sm md:text-base border-l-2 border-slate-50 pl-4 group-hover:border-slate-900 transition-all duration-500">
        {item.description}
      </p>
    </div>
  </motion.div>
);

const Resume = () => {
  return (
    <section className="relative w-full bg-white py-32 px-6 font-[Poppins] overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <header className="mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-4 inline-block text-[11px] font-black uppercase tracking-[0.4em] text-slate-400"
          >
            History
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 uppercase leading-[0.9]"
          >
            Professional <br />
            <span className="outline-text">Timeline.</span>
          </motion.h2>
        </header>

        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
          {/* Education Column */}
          <div className="relative">
            <div className="mb-12 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
                <FaGraduationCap size={18} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-900">
                Academic
              </h3>
            </div>

            <div className="relative border-l border-slate-100 pl-8 ml-5">
              {education.map((edu, idx) => (
                <Card key={idx} item={edu} />
              ))}
            </div>
          </div>

          {/* Experience Column */}
          <div className="relative">
            <div className="mb-12 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
                <FaUserTie size={16} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-900">
                Industrial
              </h3>
            </div>

            <div className="relative border-l border-slate-100 pl-8 ml-5">
              {experience.map((exp, idx) => (
                <Card key={idx} item={exp} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1.5px #1e293b;
          color: transparent;
        }
        @media (max-width: 768px) {
          .outline-text {
            -webkit-text-stroke: 1px #1e293b;
          }
        }
      `}</style>
    </section>
  );
};

export default Resume;
