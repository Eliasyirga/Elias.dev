import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

const testimonials = [
  {
    name: "Henok Alelign",
    role: "Founder & CEO, Alyah Software",
    comment:
      "Elias has demonstrated exceptional full-stack development skills during his internship. He is not only technically proficient but also highly creative, bringing innovative solutions to complex problems. His ability to collaborate seamlessly with team members makes him a valuable contributor to any project.",
  },
  {
    name: "Zerihun",
    role: "Senior Frontend Developer, Eaglelion Systems Development",
    comment:
      "Elias’s frontend development skills are outstanding. He implements designs with precision, writes clean and maintainable code, and ensures the user experience is seamless. His attention to detail and ability to turn concepts into functional, visually appealing interfaces is impressive.",
  },
  {
    name: "Netsanet Yirga",
    role: "CEO & Founder, Grove Link Consultancy PLC",
    comment:
      "Elias designed our official website to be highly attractive, well-optimized, and user-friendly. He also set up hosting and created customized email solutions for our company. His professionalism and technical expertise made the entire process smooth and efficient.",
  },
  {
    name: "Netsanet Yirga",
    role: "First Client",
    comment:
      "Elias delivered our project with creativity and precision. He understood our requirements thoroughly and implemented a solution that exceeded our expectations. His commitment to quality and client satisfaction is remarkable.",
  },
  {
    name: "Ethio Amber Trading PLC",
    role: "CEO & Founder, Ethio Amber Trading PLC",
    comment:
      "Working with Elias was a seamless experience. He provided an optimized, well-designed solution tailored to our business needs. His professionalism, technical expertise, and attention to detail make him an excellent partner for any digital project.",
  },
];

const TestimonialCard = ({ testimonial, isActive }) => (
  <motion.div
    className={`flex-shrink-0 w-72 sm:w-80 md:w-96 p-6 sm:p-8 rounded-3xl mx-2 flex flex-col items-start backdrop-blur-xl border ${
      isActive
        ? "bg-gradient-to-br from-cyan-900/60 via-black/70 to-blue-800/60 border-cyan-400/70 shadow-[0_0_40px_rgba(6,182,212,0.7)] scale-105"
        : "bg-black/60 border-cyan-700/50 shadow-[0_0_25px_rgba(6,182,212,0.3)] scale-90"
    } transition-transform duration-500 ease-in-out`}
    whileHover={{ scale: 1.07 }}
  >
    <div className="flex items-center mb-5 w-full">
      <div
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-2 ${
          isActive
            ? "border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.8)]"
            : "border-cyan-700"
        }`}
      >
        <FaUserCircle className="text-cyan-400 w-10 h-10 sm:w-12 sm:h-12" />
      </div>
      <div className="ml-4">
        <h3 className="text-cyan-400 font-bold text-lg sm:text-xl">
          {testimonial.name}
        </h3>
        <p className="text-cyan-300 text-sm sm:text-base">{testimonial.role}</p>
      </div>
    </div>
    <p className="text-cyan-100/90 text-sm sm:text-base italic leading-relaxed">
      “{testimonial.comment}”
    </p>
  </motion.div>
);

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (i) => setIndex(i);

  const getOffset = (i) => {
    const total = testimonials.length;
    const offset = (i - index + total) % total;
    return offset > total / 2 ? offset - total : offset;
  };

  return (
    <section
      id="testimonials"
      className="relative py-20 px-4 sm:px-8 bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden"
    >
      {/* Decorative glows */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/30 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/30 rounded-full blur-[100px] animate-pulse"></div>

      <h2 className="text-3xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 mb-14">
        What People Say About Me
      </h2>

      <div className="relative flex justify-center items-center w-full h-[400px] sm:h-[420px]">
        {testimonials.map((testimonial, i) => {
          const offset = getOffset(i);
          if (Math.abs(offset) > 2) return null;
          const scale = offset === 0 ? 1 : 0.85 - Math.abs(offset) * 0.03;
          const x = offset * 260;
          const zIndex = 5 - Math.abs(offset);
          const rotateY = offset * 6;

          return (
            <motion.div
              key={i}
              className="absolute"
              style={{ zIndex }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: Math.abs(offset) > 2 ? 0 : 1,
                scale,
                x,
                rotateY,
              }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            >
              <TestimonialCard
                testimonial={testimonial}
                isActive={offset === 0}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-12 gap-3">
        {testimonials.map((_, i) => (
          <motion.span
            key={i}
            onClick={() => handleDotClick(i)}
            whileHover={{ scale: 1.3 }}
            className={`w-4 h-4 rounded-full cursor-pointer ${
              i === index
                ? "bg-gradient-to-r from-cyan-400 to-blue-400 shadow-[0_0_12px_rgba(6,182,212,0.7)]"
                : "bg-cyan-800/50 hover:bg-cyan-600/60"
            } transition-all duration-300`}
          ></motion.span>
        ))}
      </div>

      {/* Mobile Swipe Hint */}
      <p className="text-center text-sm text-cyan-300/70 mt-6 sm:hidden italic">
        Swipe to explore testimonials →
      </p>
    </section>
  );
};

export default Testimonials;
