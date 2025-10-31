import React from "react";
import { motion } from "framer-motion";
import { Code2, Database, Cpu, Globe } from "lucide-react";

const services = [
  {
    icon: <Code2 size={40} />,
    title: "MERN Stack Development",
    description:
      "Building full-stack web applications using MongoDB, Express, React, and Node.js — scalable, responsive, and modern.",
  },
  {
    icon: <Database size={40} />,
    title: "Backend & API Design",
    description:
      "Designing efficient RESTful APIs and integrating databases with optimized architecture for speed and reliability.",
  },
  {
    icon: <Cpu size={40} />,
    title: "Python Development",
    description:
      "Creating automation tools, data processing scripts, and intelligent AI-powered solutions using Python.",
  },
  {
    icon: <Globe size={40} />,
    title: "Web Deployment & Optimization",
    description:
      "Deploying and optimizing web apps on platforms like Vercel and AWS for performance and seamless scalability.",
  },
];

const Services = () => {
  return (
    <section
      id="services"
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-black via-[#0a0f1f] to-[#010409] text-white font-[Poppins] px-6 py-20 overflow-hidden"
    >
      {/* Section Header */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 text-transparent bg-clip-text"
      >
        My Services
      </motion.h2>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl z-20 relative">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="group bg-black/30 border border-cyan-500/20 backdrop-blur-md p-6 rounded-3xl shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.5)] hover:-translate-y-2 transition-all duration-300"
          >
            <div className="text-blue-400 mb-4 group-hover:text-cyan-400 transition-colors duration-300">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Floating Particles */}
      {Array.from({ length: 6 }).map((_, i) => (
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
          className={`absolute rounded-full`}
          style={{
            width: 40 + Math.random() * 40,
            height: 40 + Math.random() * 40,
            background: `rgba(6,182,212,${0.1 + Math.random() * 0.2})`,
            top: `${10 + Math.random() * 80}%`,
            left: `${10 + Math.random() * 80}%`,
            filter: "blur(20px)",
          }}
        />
      ))}
    </section>
  );
};

export default Services;
