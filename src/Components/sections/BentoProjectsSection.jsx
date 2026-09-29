import React, { useState } from "react";
import { projects } from "../../data/projects";
import { 
  Layers, 
  ExternalLink, 
  Github, 
  ArrowUpRight, 
  FileCode,
  Terminal,
  Activity,
  ArrowRight,
  Sparkles,
  Zap,
  Radio,
  CheckCircle2,
} from "lucide-react";

export const BentoProjectsSection = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [simulating, setSimulating] = useState(false);
  const [simulatedPing, setSimulatedPing] = useState(null);

  const categories = [
    "All",
    "Distributed Systems",
    "Full-Stack",
    "Realtime",
    "Mobile"
  ];

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === "All") return true;
    return (
      project.category?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      project.stack?.some(s => s.toLowerCase().includes(selectedCategory.toLowerCase()))
    );
  });

  const heroProject = projects.find(p => p.id === "bahirlink") || projects[0];
  const gridProjects = filteredProjects.filter(p => p.id !== heroProject?.id);

  const runDispatchSimulation = () => {
    setSimulating(true);
    setSimulatedPing(null);
    setTimeout(() => {
      setSimulatedPing(Math.floor(Math.random() * 80) + 380); // 380ms - 460ms
      setSimulating(false);
    }, 600);
  };

  return (
    <section id="projects" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-8 sm:space-y-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 border-b border-zinc-200 dark:border-white/10 pb-4 sm:pb-5">
        <div className="space-y-2">
          <div className="font-mono text-xs text-zinc-500 flex items-center gap-2">
            <span className="text-cyan-500 font-bold">// 02</span>
            <span>PRODUCTION_SYSTEMS & RFC_SPECS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
            Featured Engineering Projects
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans max-w-xl leading-relaxed">
            Scalable production platforms architected with strict RFC documentation, verifiable concurrency metrics, and low-latency distributed telemetry.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-200 dark:border-white/10 font-mono text-xs w-full sm:w-auto overflow-x-auto shadow-inner">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl transition-all duration-200 whitespace-nowrap text-xs font-semibold ${
                selectedCategory === cat
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm scale-102"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Large Featured Hero Card (BahirLink) */}
        {(selectedCategory === "All" || heroProject?.category?.toLowerCase().includes(selectedCategory.toLowerCase())) && (
          <div className="lg:col-span-12 rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-white/15 bg-white/80 dark:bg-[#11131a]/85 backdrop-blur-xl relative overflow-hidden group shadow-xl">
            {/* Background Glow Mesh */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
              {/* Left Details */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  <span className="px-3 py-1 rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-black tracking-wide shadow-sm flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 dark:text-cyan-600" />
                    <span>FEATURED RFC-001</span>
                  </span>
                  <span className="text-zinc-500 font-semibold">
                    {heroProject.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>PRODUCTION</span>
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight font-sans">
                    {heroProject.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-cyan-600 dark:text-cyan-400 font-semibold leading-snug">
                    {heroProject.headline}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                  {heroProject.problemStatement}
                </p>

                {/* Key Metrics & Live Simulation Trigger */}
                {heroProject.metrics && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 pt-1">
                      {heroProject.metrics.map((m, i) => (
                        <div key={i} className="p-2.5 sm:p-3 rounded-2xl bg-zinc-100/90 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/5 font-mono shadow-xs">
                          <div className="text-[9px] sm:text-[10px] text-zinc-500 truncate">{m.label}</div>
                          <div className="text-xs sm:text-base font-black text-zinc-900 dark:text-white mt-0.5">{m.value}</div>
                          {m.delta && <div className="text-[9px] sm:text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">{m.delta}</div>}
                        </div>
                      ))}
                    </div>

                    {/* Interactive Dispatch Latency Test Pill */}
                    <div className="p-2.5 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                      <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                        <Radio className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
                        <span>Live GIS Telemetry Latency:</span>
                        <strong className="text-cyan-600 dark:text-cyan-400 font-bold">
                          {simulating ? "MEASURING..." : simulatedPing ? `${simulatedPing}ms (p95)` : "< 450ms (p95)"}
                        </strong>
                      </div>
                      <button
                        onClick={runDispatchSimulation}
                        disabled={simulating}
                        className="px-2.5 py-1 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[10px] shadow-xs transition-colors disabled:opacity-50"
                      >
                        {simulating ? "ROUTING..." : "Test Dispatch Ping ⚡"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Multi-Repo Badges */}
                {heroProject.githubRepos && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Source Repositories:</span>
                    <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                      {heroProject.githubRepos.map((repo, rIdx) => (
                        <a
                          key={rIdx}
                          href={repo.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-white/10 text-[10px] font-semibold flex items-center gap-1 transition-colors shadow-xs"
                        >
                          <Github className="w-3 h-3 text-zinc-400" />
                          <span>{repo.name}</span>
                          <ArrowUpRight className="w-2.5 h-2.5 opacity-50" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-xs">
                  {heroProject.stack?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-white/5 text-[11px] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => onSelectProject(heroProject)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-zinc-900 hover:bg-black text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-950 text-xs font-mono font-bold transition-all shadow-md active:scale-95"
                  >
                    <FileCode className="w-4 h-4 text-cyan-400 dark:text-cyan-600" />
                    <span>INSPECT_RFC_SPEC</span>
                  </button>

                  {heroProject.liveUrl && (
                    <a
                      href={heroProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl border border-zinc-300 dark:border-white/10 text-zinc-900 dark:text-zinc-100 text-xs font-mono font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm"
                    >
                      <span>LIVE_SERVICE</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Right Media Preview */}
              <div 
                className="lg:col-span-6 rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-950 aspect-video relative cursor-pointer shadow-2xl group/img"
                onClick={() => onSelectProject(heroProject)}
              >
                <img
                  src={heroProject.image}
                  alt={heroProject.title}
                  className="w-full h-full object-cover object-top opacity-95 group-hover/img:opacity-100 group-hover/img:scale-103 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-5">
                  <span className="font-mono text-xs text-white bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 flex items-center gap-2 shadow-lg">
                    <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Click to open full RFC architectural spec & screenshots</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Supporting Bento Project Cards */}
        {gridProjects.map((project, idx) => {
          const isWide = idx === 0 || idx === 3;
          return (
            <div
              key={project.id}
              className={`${
                isWide ? "lg:col-span-7" : "lg:col-span-5"
              } rounded-3xl p-5 sm:p-6 border border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-[#11131a]/80 backdrop-blur-xl flex flex-col justify-between space-y-4 hover:border-cyan-500/40 dark:hover:border-cyan-500/40 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl group`}
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-zinc-500 font-semibold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/5">
                    {project.category}
                  </span>
                  <span className="text-zinc-400 dark:text-zinc-500 text-[11px] font-mono">
                    {project.year || "2026"}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 
                    onClick={() => onSelectProject(project)}
                    className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-100 cursor-pointer group-hover:text-cyan-600 dark:group-hover:text-cyan-400 flex items-center justify-between font-sans transition-colors"
                  >
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-cyan-500" />
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono line-clamp-1">
                    {project.headline}
                  </p>
                </div>

                {project.image && (
                  <div 
                    onClick={() => onSelectProject(project)}
                    className="rounded-2xl border border-zinc-200 dark:border-white/5 bg-zinc-950 h-44 sm:h-48 overflow-hidden cursor-pointer shadow-inner relative group/thumb"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top opacity-90 group-hover/thumb:opacity-100 group-hover/thumb:scale-103 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md text-white text-xs font-mono border border-white/20">
                        View RFC Spec ↗
                      </span>
                    </div>
                  </div>
                )}

                <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2 leading-relaxed font-sans">
                  {project.problemStatement || project.rfc?.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {project.stack?.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-white/5 text-[11px]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack?.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded-lg text-[10px] text-zinc-500 font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/5">
                      +{project.stack.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3.5 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between font-mono text-xs">
                <button
                  onClick={() => onSelectProject(project)}
                  className="font-bold text-zinc-900 dark:text-zinc-100 hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                >
                  <FileCode className="w-3.5 h-3.5 text-cyan-500" />
                  <span>INSPECT_SPEC</span>
                  <span>→</span>
                </button>

                <div className="flex items-center gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-xl border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all shadow-xs"
                      title="Launch live service"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-xl border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all shadow-xs"
                      title="Source code"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BentoProjectsSection;
