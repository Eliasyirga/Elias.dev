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
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4">
            I'm <span className="text-blue-400 font-semibold">Elias Yirga</span>
            , a{" "}
            <span className="text-blue-500 font-semibold">
              Full Stack Developer
            </span>{" "}
            specialized in the{" "}
            <strong className="text-blue-300">MERN stack</strong>. I build
            clean, scalable, and user-friendly applications.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4">
            I simplify complex problems with <strong>React</strong>,{" "}
            <strong>Node.js</strong>, <strong>Express</strong>, and{" "}
            <strong>MongoDB</strong>.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-300">
            Beyond coding, I stay updated on tech trends, contribute to open
            source, and constantly improve my skills.
          </p>
        </motion.div>

        <div
          className="flex justify-center relative w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] h-[220px] sm:h-[300px] md:h-[400px] lg:h-[450px]"
          style={{
            overflow: "visible",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <AnimatePresence>
            {activeImages.map((img, i) => (
              <motion.img
                key={img}
                src={img}
                alt={`Image ${i}`}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl border-2 border-blue-500"
                style={{ zIndex: i + 10 }}
                initial={{ opacity: 0, x: "100%", rotate: 0 }}
                animate={{
                  opacity: 1,
                  x: i * 8,
                  rotate: i * 3,
                  y: -i * 5,
                }}
                exit={{
                  opacity: 0,
                  x: windowWidth,
                  rotate: 0,
                  y: 0,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default About;
