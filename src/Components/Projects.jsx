import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Terminal, Code2, Globe } from "lucide-react";

const projects = [
  {
    title: "BahirLink",
    category: "Emergency / Full Stack",
    description:
      "Unified emergency response and public service coordination platform connecting citizens, responders, and agencies.",
    link: "https://bahirdarlinkweb.vercel.app/",
    image: "/bahirlink.PNG",
    tags: ["Flutter", "Node.js", "PostgreSQL"],
    span: "md:col-span-2",
  }, {
    title: "Jobify",
    category: "Full Stack / MERN",
    description:
      "Enterprise-grade job portal with complex authentication, job discovery, and real-time tracking.",
    link: "https://jobfiy-frontend.vercel.app/",
    image: "/Capture77.PNG",
    tags: ["MongoDB", "Express", "Node"],
    span: "md:col-span-1",
  },
  {
    title: "Grove Link Consult",
    category: "Corporate / Vite",
    description:
      "High-performance business platform optimized for core web vitals and global SEO dominance.",
    link: "https://www.grovelinkconsultplc.com/",
    image: "/Capture88.PNG",
    tags: ["React", "Vite", "SEO"],
    span: "md:col-span-2",
  },

  {
    title: "ChillMovies",
    category: "Media / API",
    description:
      "Cinema discovery engine utilizing advanced TMDB API integrations for browsing and discovering movies.",
    link: "https://chill-movies.vercel.app/",
    image: "/Capture6.PNG",
    tags: ["React", "Framer", "API"],
    span: "md:col-span-1",
  }, {
    title: "Vintage Marketplace",
    category: "Marketplace / Full Stack",
    description:
      "Secure used-goods marketplace connecting buyers and sellers with listings, authentication, messaging, and trust features.",
    link: "https://vintage-marketplace-tau.vercel.app/browse",
    image: "/vintage-marketplace.PNG",
    tags: ["React", "Node.js", "PostgreSQL"],
    span: "md:col-span-1",
  },
  {
    title: "Tarikshiro",
    category: "Hospitality UI",
    description:
      "Modern hospitality interface focusing on warm aesthetics and conversion-led UX.",
    link: "https://tarik-shiro.vercel.app/",
    image: "/Capture2.PNG",
    tags: ["Tailwind", "UX", "React"],
    span: "md:col-span-2",
  },
  {
    title: "Ethio Amber",
    category: "Export / Global",
    description:
      "Optimized trading platform for global export performance and multilingual SEO.",
    link: "https://ethioambertrading.com/",
    image: "/Capture213.PNG",
    tags: ["SEO", "cPanel"],
    span: "md:col-span-1",
  },
  {
    title: "Marmik Consult",
    category: "Corporate Identity",
    description:
      "Refined digital presence featuring custom fluid animations and asset optimization.",
    link: "https://marmikconsultplc.com/",
    image: "/marmik.PNG",
    tags: ["Animations", "Corporate"],
    span: "md:col-span-1",
  },


];

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`${project.span} group relative bg-white border border-slate-100 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden flex flex-col h-[450px] md:h-[500px] hover:border-slate-900 transition-all duration-500 shadow-sm hover:shadow-xl`}
    >
      {/* Top Meta Info */}
      <div className="absolute top-4 left-6 md:top-6 md:left-8 z-20 flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
        <span className="text-[8px] md:text-[9px] font-black text-slate-900 uppercase tracking-[0.2em] bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-100">
          Live / 2026
        </span>
      </div>

      {/* Image Section */}
      <div className="relative h-[55%] md:h-[60%] overflow-hidden bg-slate-50">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8 }}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover grayscale-[0.3] md:grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90 md:to-white/80" />

        {/* Desktop Link Overlay */}
        {project.link !== "#" && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold uppercase text-[10px] tracking-widest hover:scale-105 transition-transform"
            >
              Explore <ExternalLink size={14} />
            </a>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 md:p-10 flex flex-col flex-grow bg-white z-10">
        <div className="flex justify-between items-start mb-2 md:mb-4">
          <div className="max-w-[80%]">
            <p className="text-[9px] md:text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">
              {project.category}
            </p>

            <h3 className="text-xl md:text-3xl font-black text-slate-900 uppercase tracking-tighter leading-tight">
              {project.title}
            </h3>
          </div>

          {project.link !== "#" ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="md:hidden p-2 bg-slate-100 rounded-full"
            >
              <ExternalLink size={16} className="text-slate-900" />
            </a>
          ) : (
            <Terminal
              size={20}
              className="hidden md:block text-slate-200"
            />
          )}

          <Terminal size={20} className="hidden md:block text-slate-200" />
        </div>

        <p className="text-slate-500 text-[11px] md:text-xs font-medium leading-relaxed mb-4 md:mb-8 max-w-sm line-clamp-3 md:line-clamp-none">
          {project.description}
        </p>

        {/* Tech Footer */}
        <div className="mt-auto pt-4 md:pt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="flex gap-3">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest"
              >
                #{tag}
              </span>
            ))}
          </div>

          <Code2
            size={16}
            className="text-slate-300 group-hover:text-slate-900 transition-colors"
          />
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section
      id="projects"
      className="bg-white py-16 md:py-32 px-4 md:px-10 relative font-[Poppins]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12 md:mb-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="space-y-2 md:space-y-4">
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-blue-600" />

              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                Deployment Registry
              </span>
            </div>

            <h2 className="text-5xl md:text-9xl font-black text-slate-900 leading-[0.8] tracking-tighter uppercase">
              Selected <br className="hidden md:block" />
              <span className="text-transparent border-text">
                Works.
              </span>
            </h2>
          </div>

          <div className="max-w-xs md:text-right">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-loose border-l-2 md:border-l-0 md:border-r-2 border-blue-600/20 pl-4 md:pl-0 md:pr-4">
              08 Production Releases <br className="hidden md:block" />
              Full-Stack Architecture <br className="hidden md:block" />
              High Performance UI/UX
            </p>
          </div>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .border-text {
          -webkit-text-stroke: 1.5px #0f172a;
        }

        @media (min-width: 768px) {
          .border-text {
            -webkit-text-stroke: 2.5px #0f172a;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;