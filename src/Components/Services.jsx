import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  Code2,
  Database,
  Cpu,
  Globe,
  ArrowUpRight,
  Smartphone,
} from "lucide-react";

const services = [
  {
    icon: <Code2 size={22} />,
    title: "MERN Stack",
    description:
      "Scalable, high-performance full-stack apps built with MongoDB, Express, React, and Node.js.",
  },
  {
    icon: <Smartphone size={22} />,
    title: "Mobile Apps",
    description:
      "Cross-platform Flutter and React solutions for premium mobile experiences.",
  },
  {
    icon: <Database size={22} />,
    title: "Backend Design",
    description:
      "Optimized RESTful APIs and robust database architectures designed for speed.",
  },
  {
    icon: <Cpu size={22} />,
    title: "Python & AI",
    description:
      "Automation and intelligent data processing tools powered by modern Python libraries.",
  },
  {
    icon: <Globe size={22} />,
    title: "Cloud & DevOps",
    description:
      "Efficient deployment strategies on AWS and Vercel with a focus on maximum uptime.",
  },
];

const ServiceCard = ({ service, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={onMouseMove}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 transition-all hover:border-slate-900 hover:shadow-2xl hover:shadow-slate-200"
    >
      {/* Subtle Monochrome Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(300px circle at ${x}px ${y}px, rgba(15, 23, 42, 0.03), transparent 80%)`,
          ),
        }}
      />

      <div className="relative z-10">
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-900 transition-all duration-500 group-hover:bg-slate-900 group-hover:text-white group-hover:scale-110">
          {service.icon}
        </div>
        <h3 className="mb-3 text-xl font-black uppercase tracking-tight text-slate-900">
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed text-slate-500 font-medium">
          {service.description}
        </p>
      </div>

      <div className="relative z-10 mt-8 flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-900 transition-colors cursor-pointer">
        View Project Detail
        <ArrowUpRight
          size={14}
          className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section
      id="services"
      className="w-full bg-white px-6 py-32 font-[Poppins]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-4 inline-block text-[11px] font-black uppercase tracking-[0.4em] text-slate-400"
          >
            Capabilities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 uppercase"
          >
            Technical <br />
            <span className="outline-text">Expertise.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1.5px #1e293b;
          color: transparent;
        }
        @media (max-width: 768px) {
          .outline-text {
            -webkit-text-stroke: 1px #1e293b;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;
