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
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-10 md:gap-16 items-center">
        {/* Text Content with Glass Panel */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="w-full md:w-1/2 relative bg-black/40 backdrop-blur-lg rounded-3xl p-6 md:p-10 shadow-lg"
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

        {/* Full Images without changing them */}
        <div className="flex justify-center relative w-full max-w-full md:max-w-[450px] h-[250px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
          <AnimatePresence>
            {activeImages.map((img, i) => (
              <motion.img
                key={img}
                src={img}
                alt={`Image ${i}`}
                className="absolute top-0 left-0 w-full h-full object-contain cursor-pointer"
                style={{ zIndex: i + 10 }}
                initial={{ opacity: 0, x: "100%", rotate: 0, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  x: i * 8,
                  rotate: i * 2,
                  y: -i * 5,
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
                whileHover={{ scale: 1.03, rotate: i * 2 + 1 }}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Extra floating accent elements */}
      <motion.div
        className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-20 -right-20 w-60 h-60 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
    </section>
  );
};

export default About;
