import React from "react";
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2, GitCommit } from "lucide-react";
import { Badge } from "@/Components/ui/Badge";
import { experience, education } from "@/data/experience";
import { CommitHeatmap } from "./interactive/CommitHeatmap";

export const ExperienceDossier = () => {
  return (
    <article className="space-y-12 max-w-4xl mx-auto py-4">
      {/* 1. Header Metadata */}
      <div className="space-y-4 pb-6 border-b border-zinc-200 dark:border-zinc-800 font-mono text-xs">
        <div className="flex items-center gap-2">
          <Badge variant="rfc">SYS-002</Badge>
          <Badge variant="stable">VERIFIED LEDGER</Badge>
          <span className="text-zinc-400 dark:text-zinc-600">•</span>
          <span className="text-zinc-700 dark:text-zinc-300 font-bold">CAREER &amp; ACADEMICS</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-sans">
          Commercial Software Roles &amp; Academic Background
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
          Chronological record of commercial engineering roles, project achievements, continuous delivery commit telemetry, and computer engineering university degree.
        </p>
      </div>

      {/* 2. Interactive Commit Telemetry Heatmap */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-sky-600 dark:text-sky-400 font-bold pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <GitCommit className="w-3.5 h-3.5" />
          <span>01 // PRODUCTION COMMIT TELEMETRY (365 DAYS)</span>
        </div>
        <CommitHeatmap />
      </section>

      {/* 3. Commercial Software Roles */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <Briefcase className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>02 // COMMERCIAL SOFTWARE ROLES</span>
        </div>

        <div className="space-y-6">
          {experience.map((exp) => (
            <div
              key={exp.id}
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6 space-y-4 font-mono text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-sans">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 mt-1">
                    <span>{exp.company}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-sky-700 dark:text-sky-400 font-bold self-start sm:self-auto">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{exp.period}</span>
                </div>
              </div>

              <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 font-sans text-xs sm:text-sm leading-relaxed">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-sky-600 dark:text-sky-400 font-mono mt-0.5">↳</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 text-[11px] text-zinc-500">
                <span className="uppercase text-[10px] font-bold">Stack:</span>
                <span className="text-zinc-800 dark:text-zinc-200">{exp.tech.join(", ")}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Academic Foundations */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <GraduationCap className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>03 // ACADEMIC FOUNDATIONS</span>
        </div>

        <div className="space-y-4">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6 space-y-3 font-mono text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-2 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-sans">
                    {edu.degree}
                  </h3>
                  <div className="text-zinc-500 dark:text-zinc-400 mt-0.5">{edu.institution}</div>
                </div>
                <span className="text-zinc-400 font-bold">{edu.period}</span>
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 font-sans text-xs leading-relaxed">
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};

export default ExperienceDossier;
