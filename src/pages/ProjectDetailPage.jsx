import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projects } from "../data/projects";
import { FloatingNavbar } from "../Components/layout/FloatingNavbar";
import { ModernFooter } from "../Components/layout/ModernFooter";
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  FileCode,
  ArrowUpRight 
} from "lucide-react";

export const ProjectDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const project = projects.find(
    (p) => p.slug === slug || p.id === slug || p.rfcId?.toLowerCase() === slug?.toLowerCase()
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col justify-between">
        <FloatingNavbar />
        <div className="py-32 text-center max-w-md mx-auto space-y-4 font-mono px-4">
          <div className="text-xs text-zinc-500">404 // RFC_SPECIFICATION_NOT_FOUND</div>
          <h1 className="text-2xl font-bold text-white font-sans">
            RFC Specification Missing
          </h1>
          <p className="text-xs text-zinc-400 font-sans">
            The requested technical RFC could not be retrieved from the active registry.
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-zinc-100 text-zinc-950 text-xs font-semibold font-mono"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN_TO_SHOWCASE</span>
            </button>
          </div>
        </div>
        <ModernFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tech-grid-light dark:bg-tech-grid-dark bg-[#f8fafc] dark:bg-[#09090b] bg-ambient-mesh text-zinc-900 dark:text-zinc-100">
      <FloatingNavbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20 space-y-8 sm:space-y-10">
        {/* Navigation Return */}
        <div>
          <button
            onClick={() => navigate("/#projects")}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-zinc-300 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN_TO_PROJECTS</span>
          </button>
        </div>

        {/* Header Title & Badges */}
        <div className="space-y-4 border-b border-zinc-200 dark:border-zinc-800 pb-6 sm:pb-8">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-2.5 py-0.5 rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold">
              {project.rfcId || "SPEC-001"}
            </span>
            <span className="text-zinc-500">
              {project.category} // {project.year || "2026"}
            </span>
            <span className="text-emerald-600 dark:text-emerald-400">
              [{project.status || "PRODUCTION"}]
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight font-sans">
            {project.title}
          </h1>

          <p className="text-xs sm:text-base text-zinc-600 dark:text-zinc-400 font-mono max-w-3xl leading-relaxed">
            {project.headline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2 font-mono text-xs">
            {project.liveUrl && project.liveUrl !== "#" && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-950 font-semibold transition-colors"
              >
                <span>LAUNCH_SERVICE</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
            {project.githubRepos && project.githubRepos.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {project.githubRepos.map((repo, idx) => (
                  <a
                    key={idx}
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    title={`View ${repo.name} Repository`}
                  >
                    <Github className="w-4 h-4" />
                    <span>{repo.name.toUpperCase()} REPO</span>
                  </a>
                ))}
              </div>
            ) : project.githubUrl && project.githubUrl !== "#" ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>VIEW_REPOSITORY</span>
              </a>
            ) : null}
          </div>
        </div>

        {/* Media & Key Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          <div className="lg:col-span-8 rounded border border-zinc-300 dark:border-zinc-800 bg-zinc-950 aspect-video overflow-hidden">
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top"
              />
            )}
          </div>

          <div className="lg:col-span-4 space-y-4 w-full">
            <div className="tech-card rounded-xl p-4 sm:p-5 border border-zinc-300 dark:border-zinc-800 space-y-3 font-mono text-xs">
              <div className="text-zinc-500 uppercase tracking-wider">
                SYSTEM_TELEMETRY
              </div>
              {project.metrics && (
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                  {project.metrics.map((m, i) => (
                    <div key={i} className="p-2.5 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                      <div className="text-[10px] text-zinc-500">{m.label}</div>
                      <div className="text-sm font-bold text-zinc-900 dark:text-white">{m.value}</div>
                      {m.delta && <div className="text-[10px] text-emerald-600 dark:text-emerald-400">{m.delta}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tech Stack */}
            {project.stack && (
              <div className="tech-card rounded-xl p-5 border border-zinc-300 dark:border-zinc-800 space-y-2 font-mono text-xs">
                <div className="text-zinc-500 uppercase tracking-wider">
                  STACK_COMPONENTS
                </div>
                <div className="flex flex-wrap gap-1">
                  {project.stack.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Problem Statement & Engineered Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.problemStatement && (
            <div className="tech-card rounded-xl p-5 border border-zinc-300 dark:border-zinc-800 space-y-2">
              <div className="font-mono text-xs text-zinc-500">
                [PROBLEM_STATEMENT]
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
                {project.problemStatement}
              </p>
            </div>
          )}

          {project.rfc?.summary && (
            <div className="tech-card rounded-xl p-5 border border-zinc-300 dark:border-zinc-800 space-y-2">
              <div className="font-mono text-xs text-zinc-500">
                [ENGINEERED_SOLUTION]
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
                {project.rfc.summary}
              </p>
            </div>
          )}
        </div>

        {/* Architecture ASCII Diagram */}
        {project.rfc?.architectureDiagram && (
          <div className="space-y-2 font-mono text-xs">
            <div className="text-zinc-500 uppercase tracking-wider">
              SYSTEM_ARCHITECTURE_TOPOLOGY
            </div>
            <div className="p-5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300 overflow-x-auto leading-relaxed">
              <pre>{project.rfc.architectureDiagram}</pre>
            </div>
          </div>
        )}

        {/* Architectural Decisions */}
        {project.rfc?.decisions && project.rfc.decisions.length > 0 && (
          <div className="space-y-3 font-mono text-xs">
            <div className="text-zinc-500 uppercase tracking-wider">
              ENGINEERING_DECISIONS & TRADEOFFS
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.rfc.decisions.map((dec, i) => (
                <div key={i} className="tech-card rounded-xl p-4 border border-zinc-300 dark:border-zinc-800 space-y-1">
                  <div className="font-bold text-zinc-900 dark:text-white">{dec.topic}</div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400">
                    Selected: {dec.chosen}
                  </div>
                  {dec.alternative && (
                    <div className="text-[10px] text-zinc-500">
                      Alt: {dec.alternative}
                    </div>
                  )}
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans pt-1">
                    {dec.rationale}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <ModernFooter />
    </div>
  );
};

export default ProjectDetailPage;
