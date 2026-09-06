import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

export const ProjectPanel = ({ project, index }) => {
  return (
    <div className="relative w-full min-h-[70vh] md:min-h-[85vh] flex flex-col justify-end overflow-hidden border-b border-zinc-800/80 group">
      {/* Background Visual Layer */}
      <div className="absolute inset-0 z-0 bg-zinc-950">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center grayscale-[0.25] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700 ease-out"
        />
        {/* Scrim Overlay for high-contrast text readability */}
        <div className="absolute inset-0 scrim-bottom-left" />
      </div>

      {/* Index & Year Tag (Top Right) */}
      <div className="absolute top-6 right-6 sm:top-10 sm:right-10 z-10 font-mono text-xs text-zinc-400 flex items-center gap-3">
        <span className="px-2 py-1 rounded bg-zinc-950/80 border border-zinc-800 backdrop-blur-sm text-zinc-300">
          0{index + 1} // {project.year}
        </span>
      </div>

      {/* Bottom-Left Overlay Information */}
      <div className="relative z-10 max-w-5xl px-6 sm:px-12 lg:px-16 pb-12 sm:pb-16 pt-32">
        {/* Category & Status */}
        <div className="flex items-center gap-2.5 mb-3 font-mono text-xs uppercase tracking-widest text-cyan-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>{project.category}</span>
        </div>

        {/* Large Project Title */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-tight">
          <Link
            to={`/projects/${project.slug}`}
            className="hover:text-zinc-200 transition-colors inline-flex items-center gap-3 group/link"
          >
            <span>{project.title}</span>
            <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 opacity-0 -translate-x-3 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-cyan-400" />
          </Link>
        </h2>

        {/* Technical Problem Statement */}
        <p className="text-sm sm:text-base md:text-lg text-zinc-300 font-normal leading-relaxed max-w-3xl mb-6">
          {project.problemStatement}
        </p>

        {/* Comma-Separated Stack & Direct Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-zinc-800/80 font-mono text-xs">
          {/* Stack List */}
          <div className="text-zinc-400">
            <span className="text-zinc-500 uppercase mr-2 text-[11px]">Stack:</span>
            <span className="text-zinc-200">{project.stack.join(", ")}</span>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-4 shrink-0">
            <Link
              to={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-white text-zinc-950 font-semibold font-sans text-xs hover:bg-zinc-200 transition-colors"
            >
              <span>Case Study RFC</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {project.liveUrl && project.liveUrl !== "#" && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-cyan-400 transition-colors"
                title="Open Live Product"
              >
                <span>Live URL</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.githubRepos && project.githubRepos.length > 0 ? (
              <div className="flex items-center gap-2">
                {project.githubRepos.map((repo, idx) => (
                  <a
                    key={idx}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-zinc-400 hover:text-cyan-400 transition-colors text-xs"
                    title={`View ${repo.name} Repository`}
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>{repo.name}</span>
                  </a>
                ))}
              </div>
            ) : project.githubUrl && project.githubUrl !== "#" ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-cyan-400 transition-colors"
                title="View Source Repository"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
