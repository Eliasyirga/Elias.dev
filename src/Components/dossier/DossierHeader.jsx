import React from "react";
import { Badge } from "@/components/ui/Badge";
import { ExternalLink, Github, FileText, User, Calendar, Tag, ShieldCheck } from "lucide-react";

export const DossierHeader = ({ project }) => {
  return (
    <div className="space-y-4 pb-6 border-b border-zinc-200 dark:border-zinc-800 font-mono text-xs">
      {/* Top Metadata Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <Badge variant="rfc">{project.rfcId}</Badge>
          <Badge variant={project.status.toLowerCase()}>{project.status}</Badge>
          <span className="text-zinc-400 dark:text-zinc-600">•</span>
          <span className="text-zinc-700 dark:text-zinc-300 font-bold">{project.version}</span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-zinc-700 dark:text-zinc-300">{project.lead}</span>
          </span>
          <span className="text-zinc-400 dark:text-zinc-600">•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
            <span>{project.date}</span>
          </span>
        </div>
      </div>

      {/* Main Document Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-sans leading-tight">
        {project.title}
      </h1>

      {/* Technical Headline */}
      <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
        {project.headline}
      </p>

      {/* Domain & Stack Tags */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-zinc-200 dark:border-zinc-800 text-[11px]">
        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
          <Tag className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span className="text-zinc-800 dark:text-zinc-200 font-semibold">{project.domain}</span>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-3">
          {project.liveUrl && project.liveUrl !== "#" && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors text-xs"
            >
              <span>Live Deployment</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {project.githubRepos && project.githubRepos.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1.5">
              {project.githubRepos.map((repo, idx) => (
                <a
                  key={idx}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white transition-colors text-xs"
                  title={`GitHub: ${repo.name}`}
                >
                  <Github className="w-3 h-3" />
                  <span>{repo.name}</span>
                </a>
              ))}
            </div>
          ) : project.githubUrl && project.githubUrl !== "#" ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white transition-colors text-xs"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Repository</span>
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DossierHeader;
