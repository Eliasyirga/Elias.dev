import React, { useState } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const ProjectGrid = () => {
  const [filter, setFilter] = useState("all");

  const categories = [
    { id: "all", label: "All Systems" },
    { id: "distributed", label: "Distributed & Backend" },
    { id: "fullstack", label: "Full Stack SaaS" },
    { id: "frontend", label: "Frontend Architecture" },
  ];

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    if (filter === "distributed")
      return (
        project.category.toLowerCase().includes("distributed") ||
        project.category.toLowerCase().includes("backend") ||
        project.category.toLowerCase().includes("e-commerce")
      );
    if (filter === "fullstack")
      return project.category.toLowerCase().includes("full stack") || project.category.toLowerCase().includes("saas");
    if (filter === "frontend")
      return (
        project.category.toLowerCase().includes("frontend") ||
        project.category.toLowerCase().includes("media") ||
        project.category.toLowerCase().includes("corporate") ||
        project.category.toLowerCase().includes("product")
      );
    return true;
  });

  return (
    <section id="projects" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-zinc-200 dark:border-zinc-800/80">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <SectionHeader
          index="01"
          tag="Production Releases"
          title="Selected Software Architectures & Case Studies"
          description="A registry of production deployments, distributed systems, and frontend architectures engineered for scale and low latency."
          className="mb-0"
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 self-start md:self-auto font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-3 py-1.5 rounded text-xs transition-colors ${
                filter === cat.id
                  ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 font-medium shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};
