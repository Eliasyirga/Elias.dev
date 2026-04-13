import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import About from "../Components/About";
import EducationExperience from "../Components/EducationExperience";
import Projects from "../Components/Projects";
import Skills from "../Components/Skills";
import Services from "../Components/Services";
import Contact from "../Components/Contact";
import Certificates from "../Components/Certificates";
import Testimonials from "../Components/Testimonials";

const Home = () => {
  return (
    <div className="bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
      <Navbar />

      <main>
        <Hero />

        <section id="services">
          <Services />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="experience">
          <EducationExperience />
        </section>

        <section id="certificates">
          <Certificates />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="testimonials">
          <Testimonials />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      {/* Optional: Add a simple footer or use your existing one */}
      <footer className="py-10 text-center text-slate-400 text-sm border-t border-slate-100">
        © {new Date().getFullYear()} Elias Yirga. Built with React & Tailwind.
      </footer>
    </div>
  );
};

export default Home;
