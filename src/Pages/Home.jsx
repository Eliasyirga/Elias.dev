import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import About from "../Components/About";
import EducationExperience from "../Components/Edu-background";
import Projects from "../Components/Projects";
import Skills from "../Components/Skills";
import Services from "../Components/Services";
import Contact from "../Components/Contact";

const Home = () => {
  return (
    <div className="bg-gray-900 text-white">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <EducationExperience />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
};

export default Home;
