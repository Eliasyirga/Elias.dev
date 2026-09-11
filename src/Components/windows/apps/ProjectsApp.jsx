import React, { useState } from "react";
import { projects } from "../../../data/projects";
import { ProjectModal } from "../../features/ProjectModal";
import {
  FolderGit2,
  Search,
  ExternalLink,
  Github,
  Zap,
  Activity,
  Layers,
  ChevronRight,
  Filter,
  FileCode,
  Sparkles,
} from "lucide-react";

export const ProjectsApp = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ["All", "Distributed Systems", "Full-Stack", "Realtime", "Mobile"];

  const filteredProjects = projects.filter((p) => {
    const matchesCat =
      selectedCategory === "All" ||
      p.category?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      p.stack?.some((s) => s.toLowerCase().includes(selectedCategory.toLowerCase()));

    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.stack?.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex h-full flex-col md:flex-row bg-white/70 dark:bg-[#0c0d12]/90 text-zinc-900 dark:text-zinc-100 font-sans text-xs">
      {/* Explorer Sidebar */}
      <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-white/10 p-3 flex flex-col justify-between shrink-0 bg-zinc-50/70 dark:bg-[#101218]/70">
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-2 py-1 text-zinc-400 font-mono text-[10px] uppercase font-bold tracking-wider">
            <FolderGit2 className="w-3.5 h-3.5 text-amber-500" />
            <span>PROJECT_EXPLORER</span>
          </div>

          <div className="space-y-1">
            {categories.map((cat) => {
              const count =
                cat === "All"
                  ? projects.length
                  : projects.filter(
                      (p) =>
                        p.category?.toLowerCase().includes(cat.toLowerCase()) ||
                        p.stack?.some((s) => s.toLowerCase().includes(cat.toLowerCase()))
                    ).length;

              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all ${
                    isSelected
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60"
                  }`}
                >
                  <span className="truncate">{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-zinc-700 text-white dark:bg-zinc-200 dark:text-zinc-900 font-mono"
                        : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="hidden md:block p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-800 dark:text-cyan-300 font-mono text-[11px] space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span>8 Production RFCs</span>
          </div>
          <p className="text-[10px] opacity-80 leading-tight">
            Click any system below to inspect architectural specifications & benchmarks.
          </p>
        </div>
      </div>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Search / Filter toolbar */}
        <div className="p-3 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between gap-3 bg-zinc-100/50 dark:bg-[#13151d]/50 shrink-0">
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search projects by name, RFC, or tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/10 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500 text-zinc-800 dark:text-zinc-200"
            />
          </div>

          <div className="text-[11px] text-zinc-500 font-mono shrink-0">
            Showing {filteredProjects.length} of {projects.length} systems
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 grid grid-cols-1 xl:grid-cols-2 gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#12141a] hover:border-cyan-500/50 dark:hover:border-cyan-400/50 hover:shadow-xl transition-all p-4 flex flex-col justify-between space-y-3.5"
            >
              <div className="space-y-2.5">
                {/* Header: RFC ID & Category */}
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-cyan-600 dark:text-cyan-400 font-bold border border-zinc-200 dark:border-zinc-700">
                    {project.rfcId || "SPEC"}
                  </span>
                  <span className="text-zinc-500">{project.category}</span>
                </div>

                {/* Title & Preview Image */}
                {project.image && (
                  <div className="relative w-full h-32 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-200 dark:border-zinc-800 group-hover:shadow-md transition-all">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                      <span className="text-[11px] text-white font-mono font-bold flex items-center gap-1">
                        <span>Inspect RFC Dossier</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Bottom: Tech Stack & Benchmarks */}
              <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-white/5">
                {/* Benchmark Metrics Badge */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="flex items-center gap-3 font-mono text-[10px]">
                    <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                      <Activity className="w-3 h-3" />
                      <span>{project.metrics[0].label}: {project.metrics[0].value}</span>
                    </div>
                  </div>
                )}

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1">
                  {project.stack?.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[10px] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack?.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-[10px] font-mono">
                      +{project.stack.length - 4}
                    </span>
                  )}
                </div>

                {/* Action Links */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold font-mono text-[11px] flex items-center gap-1">
                    <span>Open Spec</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                        title="Live Platform"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                        title="Source Code"
                      >
                        <Github className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full RFC Dossier Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
};
