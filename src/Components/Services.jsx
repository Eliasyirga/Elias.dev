import React from "react";
import { Code, RefreshCw, Server } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: <Code className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />,
    title: "Web Development",
    description:
      "Building responsive, fast, and scalable websites and web applications using modern technologies like React, Node.js, and more.",
  },
  {
    icon: <RefreshCw className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />,
    title: "Web Maintenance",
    description:
      "Providing ongoing support, updates, bug fixes, and performance optimization to keep your website running smoothly.",
  },
  {
    icon: <Server className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />,
    title: "Web Hosting",
    description:
      "Reliable and secure web hosting solutions to ensure your site is always online and accessible with fast loading speeds.",
  },
];

const Services = () => {
  return (
    <section
      id="services"
      className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 font-sans"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-900 to-black opacity-95 -z-10" />

      {/* Section Title */}
      <h3 className="text-3xl sm:text-4xl font-extrabold mb-20 tracking-tight bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent text-center">
        Services I Offer
      </h3>

      {/* Cards Layout */}
      <div className="flex flex-col md:flex-row md:justify-between gap-12">
        {services.map(({ icon, title, description }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? -3 : 3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: i * 0.2,
              type: "spring",
              stiffness: 120,
            }}
            className="relative flex-1 bg-black/50 backdrop-blur-xl border border-blue-800 rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all duration-500 cursor-pointer text-center"
          >
            {/* Icon with floating effect */}
            <motion.div
              whileHover={{ y: -5, scale: 1.1 }}
              className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-800/20 mb-5 mx-auto shadow-lg"
            >
              {icon}
            </motion.div>

            {/* Title */}
            <h4 className="text-xl sm:text-2xl font-semibold text-white mb-3 hover:text-blue-400 transition-colors duration-300">
              {title}
            </h4>

            {/* Description */}
            <p className="text-blue-200 text-sm sm:text-base leading-relaxed">
              {description}
            </p>

            {/* Glow Layer */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500/20 via-blue-400/10 to-blue-600/20 opacity-0 hover:opacity-40 blur-2xl transition-opacity duration-500 -z-10" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
