import React from "react";
import { Code, RefreshCw, Server } from "lucide-react";

const services = [
  {
    icon: (
      <Code className="w-8 h-8 sm:w-10 sm:h-10 text-white" aria-hidden="true" />
    ),
    title: "Web Development",
    description:
      "Building responsive, fast, and scalable websites and web applications using modern technologies like React, Node.js, and more.",
  },
  {
    icon: (
      <RefreshCw
        className="w-8 h-8 sm:w-10 sm:h-10 text-white"
        aria-hidden="true"
      />
    ),
    title: "Web Maintenance",
    description:
      "Providing ongoing support, updates, bug fixes, and performance optimization to keep your website running smoothly.",
  },
  {
    icon: (
      <Server
        className="w-8 h-8 sm:w-10 sm:h-10 text-white"
        aria-hidden="true"
      />
    ),
    title: "Web Hosting",
    description:
      "Reliable and secure web hosting solutions to ensure your site is always online and accessible with fast loading speeds.",
  },
];

const Services = () => {
  return (
    <section
      aria-labelledby="services-heading"
      className="max-w-6xl w-full mt-16 sm:mt-20 px-4 sm:px-6 mx-auto mb-12 font-sans"
    >
      <h3
        id="services-heading"
        className="text-3xl sm:text-4xl font-extrabold mb-12 sm:mb-16 tracking-tight bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent text-center"
      >
        Services I Offer
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-x-12 sm:gap-y-12">
        {services.map(({ icon, title, description }, i) => (
          <article
            key={i}
            tabIndex={0}
            className="relative group bg-gradient-to-br from-gray-900 to-black border border-blue-700 rounded-3xl p-6 sm:p-8 shadow-lg
              hover:shadow-blue-500/60 transition-shadow duration-500 cursor-pointer text-center
              focus:outline-none focus:ring-4 focus:ring-blue-500
              transform-gpu hover:scale-[1.03] focus:scale-[1.03] will-change-transform"
            aria-label={title}
          >
            <div
              className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-600/90 mb-5 sm:mb-7 mx-auto
              group-hover:bg-blue-500 transition-colors duration-500"
            >
              {icon}
            </div>
            <h4 className="text-lg sm:text-2xl font-semibold text-white mb-3 sm:mb-5 group-hover:text-blue-400 transition-colors duration-500">
              {title}
            </h4>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {description}
            </p>

            <div
              className="absolute -top-6 -right-6 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-500 opacity-30 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
