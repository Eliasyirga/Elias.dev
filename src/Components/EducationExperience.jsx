import React from "react";
import { GraduationCap, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const educationData = [
  {
    title: "Bure Yohanes Primary School",
    years: "2010 – 2017",
    description:
      "Completed primary education with a strong foundation in core subjects.",
  },
  {
    title: "Ras Bit-Woded Atikem Mengesh High School",
    years: "2018 – 2021",
    description: "Completed secondary education, preparing for higher studies.",
  },
  {
    title: "Bahirdar University",
    years: "2022 – Present",
    description:
      "Currently pursuing higher education with a focus on computer Engineering and software development.",
  },
];

const experiencePoints = [
  "Participated in various college projects, developing practical skills in software development and teamwork.",
  "Completed an internship program at Alyah Software, building full-stack projects using the MERN stack.",
  "Equipped with strong technical skills and hands-on practice in modern web technologies.",
];

const EducationExperience = () => {
  return (
    <div
      className="relative min-h-screen w-full bg-fixed bg-center bg-cover px-4"
      style={{ backgroundImage: "url('/back5.webp')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none" />

      <section className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-16">
        {/* Heading */}
        <motion.h3
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-12 text-center text-white bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent drop-shadow-lg"
        >
          Academics & Experience
        </motion.h3>

        {/* Education Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {educationData.map(({ title, years, description }, i) => (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 30px rgba(59,130,246,0.5)",
              }}
              transition={{ type: "spring", stiffness: 280 }}
              className="bg-black/40 border border-blue-700/50 rounded-3xl p-6 sm:p-8 shadow-lg backdrop-blur-lg text-gray-200 cursor-pointer flex flex-col h-full transform transition-transform duration-500"
            >
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="text-blue-400 w-8 h-8 sm:w-9 sm:h-9" />
                <h4 className="text-lg sm:text-xl font-semibold text-blue-300">
                  {title}
                </h4>
              </div>
              <p className="italic text-blue-400 text-sm sm:text-base mb-3">
                {years}
              </p>
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed flex-grow">
                {description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Experience Card */}
        <motion.div
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(59,130,246,0.6)",
          }}
          transition={{ type: "spring", stiffness: 260 }}
          className="bg-black/40 border border-blue-700/50 rounded-3xl p-7 sm:p-10 shadow-lg backdrop-blur-lg cursor-pointer w-full"
        >
          <div className="flex items-center gap-4 mb-6 sm:mb-10">
            <Briefcase className="text-blue-400 w-8 h-8 sm:w-9 sm:h-9" />
            <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-300">
              Experience
            </h4>
          </div>
          <ul className="list-disc list-inside space-y-4 sm:space-y-5 text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed">
            {experiencePoints.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </motion.div>
      </section>
    </div>
  );
};

export default EducationExperience;
