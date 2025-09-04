import React from "react";
import { motion } from "framer-motion";

const Projects = () => {
  const projects = [
    {
      title: "Grove Link Consult – Official Company Website",
      description:
        "A responsive, SEO-optimized business website for Grove Link Consult, built with Vite, React, and Tailwind CSS. Hosted on Vercel with fast performance and modern design.",
      link: "https://www.grovelinkconsult.com/",
      image: "/Capture88.PNG",
    },
    {
      title: "Jobify – Job Platform",
      description:
        "A full-featured job application platform built with the MERN stack, including user authentication, job posting, and applicant tracking.",
      link: "https://jobfiy-frontend.vercel.app/",
      image: "/Capture77.PNG",
    },
    {
      title: "ChillMovies – Movie App",
      description:
        "A sleek React app to browse trending and top-rated movies with a custom watchlist feature using TheMovieDB API.",
      link: "https://chill-movies.vercel.app/",
      image: "/Capture6.PNG",
    },

    {
      title: "Tarikshiro – Restaurant Website",
      description:
        "A modern and responsive restaurant site with an interactive menu, reservation system, and customer testimonials built using React & Tailwind.",
      link: "https://tarik-shiro.vercel.app/",
      image: "/Capture2.PNG",
    },
  ];

  return (
    <section
      id="projects"
      className="w-full bg-gradient-to-b from-black via-gray-900 to-black py-20 font-[Poppins]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl font-extrabold mb-14 text-center 
          bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent drop-shadow-lg"
        >
          Projects
        </motion.h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map(({ title, description, image, link }, index) => (
            <motion.a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
              className="relative rounded-3xl overflow-hidden group shadow-2xl border border-gray-800
              hover:border-blue-500/60 hover:shadow-blue-500/40 transition-all duration-500 bg-gradient-to-br from-gray-900 to-black"
            >
              {/* Image */}
              <motion.img
                src={image}
                alt={`${title} screenshot`}
                className="w-full h-56 sm:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark overlay (for readability) */}
              <div className="absolute inset-0 bg-black/40 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500" />

              {/* Overlay content */}
              <div
                className="absolute inset-0 flex flex-col justify-end items-start 
                text-left p-6
                opacity-100 translate-y-0  
                sm:opacity-0 sm:translate-y-10 sm:group-hover:opacity-100 sm:group-hover:translate-y-0
                transition-all duration-700 ease-out"
              >
                <h3
                  className="text-lg sm:text-xl md:text-2xl font-extrabold mb-2 
                  bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent drop-shadow-md"
                >
                  {title}
                </h3>
                <p className="text-gray-300 mb-5 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-3">
                  {description}
                </p>

                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="px-5 py-2 text-xs sm:text-sm md:text-base relative
                  bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-800 
                  rounded-full text-white font-semibold shadow-lg select-none 
                  overflow-hidden group/button"
                >
                  <span className="relative z-10"> View Project </span>
                  {/* Shine effect */}
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                    -translate-x-full group-hover/button:translate-x-full transition-transform duration-700"
                  />
                </motion.span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
