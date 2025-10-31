import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = ["/back4.webp", "/back.webp", "/back3.webp"];

const About = () => {
  const [activeImages, setActiveImages] = useState([]);
  const [phase, setPhase] = useState("appear");
  const [index, setIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    let interval;
    if (phase === "appear") {
      interval = setInterval(() => {
        setActiveImages((prev) => {
          if (index < images.length) {
            setIndex(index + 1);
            return [...prev, images[index]];
          } else {
            clearInterval(interval);
            setTimeout(() => {
              setPhase("disappear");
              setIndex(images.length - 1);
            }, 3000);
            return prev;
          }
        });
      }, 1000);
    } else if (phase === "disappear") {
      interval = setInterval(() => {
        setActiveImages((prev) => {
          if (index >= 0) {
            const newActive = prev.slice(0, index);
            setIndex(index - 1);
            return newActive;
          } else {
            clearInterval(interval);
            setTimeout(() => {
              setPhase("appear");
              setIndex(0);
              setActiveImages([]);
            }, 1000);
            return prev;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [phase, index]);

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 md:px-8 py-12 md:py-20 bg-black text-white overflow-hidden"
    >
      {/* Main Content */}
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-10 md:gap-16 items-center z-20 relative">
        {/* Text Panel */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="w-full md:w-1/2 relative bg-black/40 backdrop-blur-xl   p-6 md:p-10  transition-shadow duration-500"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent drop-shadow-xl animate-gradient-x">
            About Me
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-3">
            I'm <span className="text-blue-400 font-semibold">Elias Yirga</span>
            , a{" "}
            <span className="text-blue-500 font-semibold">
              Full Stack Developer
            </span>{" "}
            specialized in the{" "}
            <strong className="text-blue-300">MERN stack</strong>. I build
            clean, scalable, and user-friendly applications.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-3">
            I simplify complex problems using <strong>React</strong>,{" "}
            <strong>Node.js</strong>, <strong>Express</strong>, and{" "}
            <strong>MongoDB</strong>.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-300">
            Beyond coding, I stay updated on tech trends, contribute to open
            source, and continuously improve my skills.
          </p>
        </motion.div>

        {/* Floating Images */}
        <div className="flex justify-center relative w-full max-w-full md:max-w-[450px] h-[250px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
          <AnimatePresence>
            {activeImages.map((img, i) => (
              <motion.img
                key={img}
                src={img}
                alt={`Image ${i}`}
                className="absolute top-0 left-0 w-full h-full object-contain cursor-pointer rounded-2xl"
                style={{ zIndex: i + 10 }}
                initial={{ opacity: 0, x: "100%", rotate: 0, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  x: i * 10,
                  rotate: i * 3,
                  y: -i * 6,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: windowWidth,
                  rotate: 0,
                  y: 0,
                  scale: 0.95,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.05, rotate: i * 3 + 2 }}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Particles / Molecules */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, 20 - Math.random() * 40, 0],
            y: [0, 20 - Math.random() * 40, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 6 + Math.random() * 4,
            delay: i,
          }}
          className="absolute rounded-full"
          style={{
            width: 8 + Math.random() * 12,
            height: 8 + Math.random() * 12,
            background: `rgba(6,182,212,${0.2 + Math.random() * 0.3})`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: "blur(6px)",
          }}
        />
      ))}

      {/* Extra Large Accents */}
      <motion.div
        className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-24 -right-24 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
    </section>
  );
};

export default About;
