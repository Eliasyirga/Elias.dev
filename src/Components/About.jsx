import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = ["/back4.webp", "/back.webp", "/back3.webp"];

const About = () => {
  const [activeImages, setActiveImages] = useState([]);
  const [phase, setPhase] = useState("appear");
  const [index, setIndex] = useState(0);

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
            }, 4000);
            return prev;
          }
        });
      }, 800);
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
      }, 600);
    }
    return () => clearInterval(interval);
  }, [phase, index]);

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 py-20 md:py-32 bg-white text-slate-900 overflow-hidden font-[Poppins]"
    >
      {/* Minimal Accent Background - Hidden on small mobile to prevent overflow issues */}
      <div className="absolute top-0 right-0 w-[60%] md:w-[40%] h-[100%] bg-slate-50/50 -skew-x-12 translate-x-1/2 pointer-events-none hidden sm:block" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center z-10">
        {/* Left: Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-1"
        >
          <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4 md:mb-6 block">
            The Engineer
          </span>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 leading-[0.85] tracking-tighter uppercase">
            Creating <br />
            <span className="outline-text">The Future.</span>
          </h2>

          <div className="space-y-4 md:space-y-6 text-slate-500 text-base md:text-lg leading-relaxed max-w-xl font-medium">
            <p>
              I’m <span className="text-slate-900 font-black">Elias Yirga</span>
              , a Computer Engineer and Developer focused on the intersection of
              high-end design and robust architecture.
            </p>
            <p>
              By leveraging the{" "}
              <span className="text-slate-900 uppercase text-xs md:text-sm font-bold tracking-widest">
                MERN Stack
              </span>{" "}
              and Flutter, I build digital products that aren't just functional,
              but visually commanding.
            </p>
          </div>

          {/* Minimal Tech Tags */}
          <div className="mt-8 md:mt-12 flex flex-wrap gap-2 md:gap-3">
            {["React", "Flutter", "Node.js", "MongoDB", "Python", "AI"].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-4 md:px-5 py-2 border border-slate-200 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-900 rounded-full hover:bg-slate-900 hover:text-white transition-all cursor-default"
                >
                  {tech}
                </span>
              ),
            )}
          </div>
        </motion.div>

        {/* Right: Premium Image Stack */}
        <div className="relative flex justify-center items-center h-[350px] md:h-[500px] order-1 lg:order-2">
          {/* Constrained container for the stack */}
          <div className="relative w-full max-w-[240px] md:max-w-[320px] aspect-[4/5]">
            <AnimatePresence mode="popLayout">
              {activeImages.map((img, i) => (
                <motion.div
                  key={img}
                  initial={{ opacity: 0, scale: 0.8, x: 40, rotate: 15 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: i * 15, // Reduced offset for mobile
                    y: i * -15, // Reduced offset for mobile
                    rotate: i * 4 - 4,
                    zIndex: i,
                  }}
                  exit={{
                    opacity: 0,
                    x: -80,
                    scale: 0.9,
                    rotate: -10,
                    transition: { duration: 0.4 },
                  }}
                  className="absolute inset-0 p-1.5 md:p-2 bg-white border border-slate-100 rounded-[1.5rem] md:rounded-[2rem] shadow-xl md:shadow-2xl overflow-hidden group"
                >
                  <img
                    src={img}
                    alt={`Portfolio ${i}`}
                    className="w-full h-full object-cover rounded-[1.2rem] md:rounded-[1.6rem] grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {activeImages.length === 0 && (
              <div className="absolute inset-0 border border-slate-100 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center bg-slate-50">
                <span className="text-slate-300 font-black uppercase tracking-[0.3em] text-[9px] md:text-[10px] animate-pulse">
                  Loading Stack
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1.5px #0f172a;
          color: transparent;
        }
        @media (max-width: 768px) {
          .outline-text {
            -webkit-text-stroke: 1.2px #0f172a;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
