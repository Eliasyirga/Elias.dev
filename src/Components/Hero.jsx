import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const roles = ["MERN Stack Developer", "Python Developer"];

const ModernHero = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
    id="home"
      className="relative flex flex-col-reverse md:flex-row items-center justify-between min-h-screen w-full text-white font-[Poppins] overflow-x-hidden px-4 sm:px-8 md:px-14"
      style={{
        backgroundImage: `url('/back2.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 🔹 Overlay */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      {/* 🔹 Left Column */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/3 flex flex-col items-start text-left space-y-4 sm:space-y-6 z-20 mt-6 sm:mt-10 md:mt-0"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 text-transparent bg-clip-text animate-gradient-x">
            Elias Yirga
          </span>
        </h1>

        <motion.p
          key={roleIndex}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-base sm:text-xl font-semibold text-cyan-300"
        >
          {roles[roleIndex]}
        </motion.p>

        {/* 🔹 Mobile Social Icons (under role) */}
        <div className="flex sm:hidden justify-center w-full space-x-4 mt-3">
          {[
            { icon: <FaGithub />, link: "https://github.com" },
            { icon: <FaLinkedin />, link: "https://linkedin.com" },
            { icon: <FaTwitter />, link: "https://twitter.com" },
            { icon: <FaInstagram />, link: "https://instagram.com" },
          ].map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 border border-cyan-400/30 rounded-full backdrop-blur-md shadow-md hover:shadow-cyan-400/40 hover:scale-110 text-cyan-300 transition-all duration-300"
            >
              {item.icon}
            </a>
          ))}
        </div>

        <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg">
          Passionate about crafting sleek, high-performance web experiences. I
          specialize in full-stack development using the MERN stack and Python,
          creating modern, responsive, and scalable digital products.
        </p>

        {/* 🔹 Desktop Buttons */}
        <div className="hidden sm:flex flex-wrap gap-4 mt-6">
          <button
            onClick={() => scrollToSection("contact")}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-cyan-500/50 transition-transform duration-300"
          >
            Contact Me
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="px-6 py-3 border border-cyan-400 text-white rounded-full hover:bg-cyan-500/20 hover:scale-105 transition-all duration-300"
          >
            View Projects
          </button>
        </div>
      </motion.div>

      {/* 🔹 Center Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/3 flex justify-center z-20 mt-8 sm:mt-10 md:mt-0"
      >
        <motion.div className="relative rounded-full overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.6)] border-4 border-blue-500/40 bg-white/10 backdrop-blur-xl hover:scale-105 transition-transform duration-500">
          <img
            src="/vv.webp"
            alt="Elias Yirga"
            className="w-40 xs:w-48 sm:w-60 md:w-72 lg:w-96 max-w-full h-auto object-cover rounded-full"
          />
        </motion.div>
      </motion.div>

      {/* 🔹 Right Column */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/3 flex flex-col items-start md:items-end text-left md:text-right z-20 space-y-4 sm:space-y-6"
      >
        <div className="hidden sm:flex flex-col space-y-4 md:items-end">
          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-md">
            I’m a Computer Engineering student passionate about software
            development, hardware systems, networking, and cybersecurity. I love
            optimizing performance while designing efficient and secure
            solutions.
          </p>
          <a
            href="/Elias_Yirga_CV.pdf"
            download
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-cyan-500/50 transition-transform duration-300 text-center"
          >
            Download CV
          </a>
        </div>
      </motion.div>

      {/* 🔹 Floating Social Links (Desktop) */}
      <div className="hidden sm:flex absolute bottom-8 right-8 z-30 space-x-4">
        {[
          { icon: <FaGithub />, link: "https://github.com/Eliasyirga" },
          { icon: <FaLinkedin />, link: "https://linkedin.com" },
          { icon: <FaTwitter />, link: "https://twitter.com" },
          { icon: <FaInstagram />, link: "https://instagram.com" },
        ].map((item, i) => (
          <a
            key={i}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/10 border border-cyan-400/30 rounded-full backdrop-blur-md shadow-md hover:shadow-cyan-400/40 hover:text-cyan-300 hover:scale-110 transition-all duration-300"
          >
            {item.icon}
          </a>
        ))}
      </div>

      {/* 🔹 Mobile Floating Button Bar */}
      <div className="fixed bottom-3 left-0 right-0 z-40 sm:hidden px-3">
        <div className="flex justify-around items-center gap-3 backdrop-blur-xl bg-black/40 border border-cyan-500/30 rounded-2xl shadow-[0_0_25px_rgba(0,255,255,0.3)] py-2 px-4">
          <button
            onClick={() => scrollToSection("contact")}
            className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-semibold text-sm shadow-md hover:scale-105 transition-transform duration-300"
          >
            Contact
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="flex-1 px-3 py-2 border border-cyan-400 text-white rounded-full font-semibold text-sm hover:bg-cyan-500/20 transition-all duration-300"
          >
            Projects
          </button>
          <a
            href="/Elias_Yirga_CV.pdf"
            download
            className="flex-1 px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold text-sm shadow-md hover:scale-105 transition-transform duration-300 text-center"
          >
            CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default ModernHero;
