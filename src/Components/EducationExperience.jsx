import React from "react";
import { FaSchool, FaLaptopCode } from "react-icons/fa";
import { motion } from "framer-motion";

const education = [
  {
    title: "Bure Yohanes Primary School",
    years: "2010 – 2017",
    description:
      "Completed primary education with a strong foundation in core subjects.",
  },
  {
    title: "Ras Bit-Woded Atikem Mengesh High School",
    years: "2018 – 2021",
    description:
      "Completed secondary education, preparing for higher studies and personal growth.",
  },
  {
    title: "Bahirdar University",
    years: "2022 – Present",
    description:
      "Currently pursuing Computer Engineering, focusing on Software Development, AI, and networking.",
  },
];

const experiencePoints = [
  "Participated in various college projects, developing real-world applications and strong teamwork skills.",
  "Completed internship at Alyah Software, working on full-stack MERN projects.",
  "Worked at Eaglelion System Technologies as a Frontend Developer, crafting modern, responsive UIs.",
  "Equipped with strong problem-solving and practical experience in modern web technologies.",
];

const Resume = () => {
  return (
    <section className="min-h-screen bg-black text-white px-6 md:px-16  font-sans relative overflow-hidden">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 drop-shadow-xl animate-gradient-x"
      >
        My Resume
      </motion.h1>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-12 md:gap-16">
        {/* Education */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-3xl p-6 sm:p-10 border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.25)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all duration-500"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-400 mb-8 flex items-center gap-3">
            <FaSchool className="text-blue-400" /> Education
          </h2>
          <ul className="flex flex-col gap-6">
            {education.map((edu, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group flex flex-col gap-1 p-4 rounded-xl hover:bg-blue-500/10 transition-all duration-300"
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-blue-300 group-hover:text-blue-400">
                  {edu.title}
                </h3>
                <span className="text-sm italic text-blue-200">{edu.years}</span>
                <p className="text-gray-300 text-base leading-relaxed">
                  {edu.description}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-bl from-cyan-900/30 to-blue-900/30 rounded-3xl p-6 sm:p-10 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.25)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-500"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-8 flex items-center gap-3">
            <FaLaptopCode className="text-cyan-400" /> Experience
          </h2>
          <ul className="flex flex-col gap-6">
            {experiencePoints.map((point, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group flex items-start gap-3 p-4 rounded-xl hover:bg-cyan-500/10 transition-all duration-300"
              >
                <FaLaptopCode className="text-cyan-400 mt-1 text-lg flex-shrink-0 group-hover:text-cyan-300 transition-colors" />
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  {point}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Background Accents */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
    </section>
  );
};

export default Resume;
