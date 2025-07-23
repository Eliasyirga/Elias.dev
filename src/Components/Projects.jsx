import React from "react";
import { motion } from "framer-motion";

const Projects = () => {
  const projects = [
    {
      title: "Grove Link Consult – Official Company Website",
      description:
        "A responsive, SEO-optimized business website for Grove Link Consult, built with Vite, React, and Tailwind CSS. Hosted on Vercel with fast performance and modern design.",
      link: "https://www.grovelinkconsult.com/",
      image: "/Capture.PNG",
    },
    {
      title: "Jobify – Job Platform",
      description:
        "A full-featured job application platform built with the MERN stack, including user authentication, job posting, and applicant tracking.",
      link: "https://jobfiy-frontend.vercel.app/",
      image: "/Capture5.PNG",
    },
    {
      title: "ChillMovies – Movie App",
      description:
        "A sleek React app to browse trending and top-rated movies with a custom watchlist feature using TheMovieDB API.",
      link: "https://chill-movies.vercel.app/",
      image: "/Capture6.PNG",
    },
    {
      title: "IMP – Internship Management Portal",
      description:
        "An advanced portal for managing internship programs using Spring Boot and React. Tracks applications, feedback, and evaluations.",
      link: "https://imp-phi.vercel.app/",
      image: "/Capture1.PNG",
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
      className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 font-[Poppins]"
    >
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-12 text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
        Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {projects.map(({ title, description, image, link }, index) => (
          <motion.a
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-br from-black to-gray-900 border border-blue-700 rounded-3xl shadow-lg hover:shadow-blue-600 overflow-hidden block transition-shadow duration-300"
          >
            {image && (
              <div className="overflow-hidden rounded-t-3xl">
                <motion.img
                  src={image}
                  alt={`${title} screenshot`}
                  className="w-full h-40 sm:h-48 md:h-52 object-cover transition-transform duration-500"
                  whileHover={{ scale: 1.05 }}
                />
              </div>
            )}
            <div className="p-4 sm:p-5 flex flex-col justify-between h-full">
              <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold mb-2 sm:mb-3 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent leading-tight">
                {title}
              </h3>
              <p className="text-gray-300 mb-4 flex-grow text-sm sm:text-base leading-relaxed">
                {description}
              </p>
              <span className="self-start px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base bg-gradient-to-r from-blue-600 to-blue-800 rounded-full text-white font-semibold shadow-md select-none">
                View Project
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
