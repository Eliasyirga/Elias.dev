import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import { ProjectPanel } from "./ProjectPanel";
import { Filter } from "lucide-react";

export const ProjectFeed = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filterOptions = [
    { id: "all", label: "ALL SYSTEMS" },
    { id: "distributed", label: "DISTRIBUTED & REALTIME" },
    { id: "saas", label: "FULL-STACK SAAS" },
    { id: "frontend", label: "FRONTEND & UI PERFORMANCE" },
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "distributed")
      return (
        project.category.toLowerCase().includes("distributed") ||
        project.category.toLowerCase().includes("backend") ||
        project.category.toLowerCase().includes("e-commerce")
      );
    if (activeFilter === "saas")
      return (
        project.category.toLowerCase().includes("saas") ||
        project.category.toLowerCase().includes("full stack")
      );
    if (activeFilter === "frontend")
      return (
        project.category.toLowerCase().includes("frontend") ||
        project.category.toLowerCase().includes("media") ||
        project.category.toLowerCase().includes("corporate") ||
        project.category.toLowerCase().includes("product")
      );
    return true;
  });

  return (
    <section id="projects" className="w-full">
      {/* Sticky Domain Filter Bar */}
      <div className="sticky top-[61px] z-40 w-full bg-zinc-950/95 backdrop-blur-md border-b border-zinc-850 py-3.5 px-4 sm:px-8 lg:px-16 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
          <Filter className="w-3.5 h-3.5 text-cyan-400" />
          <span className="uppercase tracking-wider">PROJECT FEED // {filteredProjects.length} RELEASES</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setActiveFilter(opt.id)}
              className={`px-3 py-1.5 rounded transition-all text-[11px] uppercase tracking-wider ${
                activeFilter === opt.id
                  ? "bg-zinc-100 text-zinc-950 font-semibold shadow-sm"
                  : "bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Full-Width Project Panels with Smooth Fade-in */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex flex-col w-full"
        >
          {filteredProjects.map((project, index) => (
            <ProjectPanel key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
