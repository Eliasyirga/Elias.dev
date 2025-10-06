import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const roles = ["Full Stack Developer", "React Specialist", "AI Enthusiast"];

const ModernHero = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-950 via-black to-blue-900 text-white font-[Poppins] overflow-hidden">
      {/* Desktop Layout */}
      <div className="hidden md:grid relative z-10 grid-cols-3 gap-6 items-center max-w-7xl px-6">
        {/* Left Side - MERN */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-center md:text-right space-y-4 z-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-blue-400">
            MERN Stack Developer
          </h2>
          <p className="text-white md:text-lg">
            I build scalable web apps using{" "}
            <span className="text-blue-300 font-semibold">
              MongoDB, Express, React, and Node.js
            </span>
            . My focus is delivering smooth user experiences with clean,
            maintainable code.
          </p>
        </motion.div>

        {/* Middle Image */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center relative z-10"
        >
          <img
            src="/well.webp"
            alt="Elias Yirga"
            className="w-[500px] sm:w-[550px] md:w-[600px] h-[500px] sm:h-[550px] md:h-[600px] object-cover rounded-xl shadow-2xl"
          />
        </motion.div>

        {/* Right Side - Python */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-center md:text-left space-y-4 z-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-blue-400">
            Python Developer
          </h2>
          <p className="text-white md:text-lg">
            Experienced in{" "}
            <span className="text-blue-300 font-semibold">
              Django, Flask, and AI/ML
            </span>
            . I create robust backends, APIs, and intelligent applications that
            solve real-world problems.
          </p>
        </motion.div>
      </div>

      {/* Name + Role for Desktop */}
      <div className="hidden md:flex flex-col items-center absolute bottom-10 w-full z-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight text-center"
        >
          Hey, I'm <span className="text-blue-400">Elias Yirga</span>
        </motion.h1>
        <motion.div
          key={roleIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl md:text-3xl font-semibold text-blue-300 mt-2 text-center"
        >
          {roles[roleIndex]}
        </motion.div>
      </div>

      {/* Mobile Only Layout */}
      <div className="flex flex-col items-center justify-center w-full h-full md:hidden">
        <motion.img
          src="/well.webp"
          alt="Elias Yirga"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-xl shadow-2xl"
        />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-3xl sm:text-4xl font-extrabold mt-4 text-center"
        >
          Hey, I'm <span className="text-blue-400">Elias Yirga</span>
        </motion.h1>

        <motion.div
          key={roleIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl sm:text-2xl font-semibold text-blue-300 mt-2 text-center"
        >
          {roles[roleIndex]}
        </motion.div>
      </div>
    </section>
  );
};

export default ModernHero;
