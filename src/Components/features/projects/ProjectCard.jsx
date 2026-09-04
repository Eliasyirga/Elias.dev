import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Github, ArrowRight, Activity } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const ProjectCard = ({ project }) => {
  return (
    <div className="group relative rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 p-6 flex flex-col justify-between hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-200">
      <div>
        {/* Header: Status & Category */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {project.category}
            </span>
          </div>
          <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors mb-2">
          <Link to={`/projects/${project.slug}`} className="hover:underline">
            {project.title}
          </Link>
        </h3>

        {/* Technical Problem Statement */}
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5">
          {project.problemStatement}
        </p>

        {/* Architecture Benchmark Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mb-5 p-3 rounded bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 font-mono text-[11px]">
            <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500 mb-2 font-semibold uppercase tracking-wider text-[10px]">
              <Activity className="w-3 h-3 text-emerald-500" />
              <span>Benchmark Metrics</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 truncate">{m.label}</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {m.value}{" "}
                    {m.delta && (
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-normal">
                        ({m.delta})
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Micro-bordered Stack Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.stack.map((tag) => (
            <Badge key={tag} variant="mono">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Direct Action Links */}
      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
        <Link
          to={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
        >
          <span>Architecture RFC</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <div className="flex items-center gap-3">
          {project.githubUrl && project.githubUrl !== "#" && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
              title="View Source Code"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && project.liveUrl !== "#" && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
              title="Visit Live Deployment"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
