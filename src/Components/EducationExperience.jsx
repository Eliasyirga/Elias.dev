import React from "react";
import { FaGraduationCap, FaUserTie, FaCircle } from "react-icons/fa";
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
      "Currently pursuing Computer Engineering, focusing on Software Development, AI, and Networking.",
  },
];

const experience = [
  {
    position: "College Projects",
    place: "Bahirdar University",
    duration: "2022 – Present",
    description:
      "Developed full-stack apps and collaborated with peers on real-world academic projects.",
  },
  {
    position: "Full-stack Developer Intern",
    place: "Alyah Software",
    duration: "June 2023 – Sept 2023",
    description:
      "Worked on MERN projects and cloud deployment solutions in a fast-paced environment.",
  },
  {
    position: "Frontend Developer",
    place: "Eaglelion System Technologies",
    duration: "2021 – 2022",
    description:
      "Built responsive, user-friendly UIs using React, Tailwind, and Framer Motion.",
  },
  {
    position: "Web Technologies Enthusiast",
    place: "Personal/Academic",
    duration: "Ongoing",
    description:
      "Exploring AI, web optimization, and emerging technologies in modern web ecosystems.",
  },
];

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const Timeline = ({ items, isEducation }) => (
  <motion.ul
    className="flex flex-col gap-8 relative pl-6"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.25 }}
    variants={stagger}
  >
    <span
      className={`absolute left-2 top-4 bottom-0 w-1 rounded-full bg-gradient-to-b ${
        isEducation
          ? "from-blue-600/80 to-transparent"
          : "from-sky-500/80 to-transparent"
      }`}
    ></span>
    {items.map((item, i) => (
      <motion.li
        className="relative flex items-start gap-5 group"
        variants={fadeInUp}
        key={i}
      >
        <span className="relative z-10 flex items-center justify-center mt-2">
          {isEducation ? (
            i === items.length - 1 ? (
              <FaGraduationCap className="text-blue-400 text-2xl animate-bounce" />
            ) : (
              <FaCircle className="text-blue-300 text-base group-hover:text-blue-400 transition-colors" />
            )
          ) : i === 0 ? (
            <FaUserTie className="text-sky-400 text-2xl animate-pulse" />
          ) : (
            <FaCircle className="text-sky-300 text-base group-hover:text-sky-400 transition-colors" />
          )}
        </span>

        <div className="bg-gradient-to-r from-black/70 via-blue-900/30 to-sky-900/30 border border-blue-400/20 hover:border-blue-400/60 rounded-2xl p-5 shadow-lg w-full transition-all duration-300 group-hover:scale-[1.03] backdrop-blur-lg">
          <h3
            className={`${
              isEducation ? "text-blue-300" : "text-sky-300"
            } text-lg sm:text-xl md:text-2xl font-semibold mb-1 group-hover:text-blue-400 transition-colors`}
          >
            {isEducation ? item.title : item.position}
          </h3>
          <span className="block text-sm italic mb-1 text-blue-200">
            {isEducation ? item.years : item.duration}
          </span>
          {!isEducation && (
            <span className="block text-xs mb-2 text-blue-100 uppercase tracking-wide">
              {item.place}
            </span>
          )}
          <p className="text-gray-200 text-base leading-relaxed">
            {item.description}
          </p>
        </div>
      </motion.li>
    ))}
  </motion.ul>
);

const Resume = () => {
  return (
    <section className="no-scrollbar min-h-screen relative py-16 px-4 sm:px-8 md:px-12 bg-gradient-to-br from-black via-gray-950 to-blue-950 flex flex-col items-center justify-center w-full overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute -top-60 -left-60 w-[500px] h-[500px] bg-blue-800/30 blur-3xl rounded-full"></div>
      <div className="pointer-events-none absolute -bottom-80 -right-80 w-[500px] h-[450px] bg-sky-700/20 blur-3xl rounded-full"></div>

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300 tracking-wide drop-shadow-[0_2px_20px_rgba(0,180,255,0.3)]"
      >
        Education & Experience
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-gray-300 text-center text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-14 font-light"
      >
        A journey of growth — blending strong education with real-world experience in tech innovation.
      </motion.p>

      <div className="z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 w-full max-w-6xl">
        {/* Education */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <FaGraduationCap className="text-3xl text-blue-400 animate-pulse" />
            <h2 className="text-2xl md:text-3xl font-bold text-blue-300">
              Education
            </h2>
          </div>
          <Timeline items={education} isEducation />
        </motion.div>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <FaUserTie className="text-3xl text-sky-400 animate-pulse" />
            <h2 className="text-2xl md:text-3xl font-bold text-sky-300">
              Experience
            </h2>
          </div>
          <Timeline items={experience} />
        </motion.div>
      </div>

      <div className="absolute left-1/2 bottom-2 -translate-x-1/2 w-[180px] h-2 bg-gradient-to-r from-blue-500 via-sky-400 to-blue-600 rounded-full blur-sm opacity-70" />
    </section>
  );
};

export default Resume;
