import React from "react";
import { experience, education } from "@/data/experience";
import { Briefcase, GraduationCap, MapPin, Calendar, CheckCircle2 } from "lucide-react";

export const ExperienceTimeline = () => {
  return (
    <section
      id="experience"
      className="py-20 md:py-28 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto border-b border-zinc-800/80"
    >
      <div className="space-y-4 mb-14">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
          <Briefcase className="w-4 h-4" />
          <span>CAREER &amp; EDUCATION TIMELINE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
          Commercial Engineering &amp; Academic Foundations
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed">
          Chronological record of commercial software engineering roles, system implementations, and academic milestones in Computer Engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Commercial Engineering Experience */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800 font-mono text-xs text-zinc-400">
            <span className="flex items-center gap-2 text-white font-semibold">
              <Briefcase className="w-4 h-4 text-cyan-400" />
              <span>COMMERCIAL SOFTWARE ROLES</span>
            </span>
            <span>2021 – 2026</span>
          </div>

          <div className="space-y-6">
            {experience.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-6 sm:p-7 space-y-4 hover:border-zinc-700 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-white font-sans">
                      {item.role}
                    </h3>
                    <div className="text-xs font-mono text-cyan-400 mt-0.5">
                      {item.company}
                    </div>
                  </div>
                  <div className="flex sm:flex-col sm:items-end gap-2 sm:gap-1 text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-zinc-500" />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-zinc-500">
                      <MapPin className="w-3 h-3 text-zinc-500" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-mono mt-0.5">↳</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 border-t border-zinc-800/80 flex flex-wrap items-center gap-2 font-mono text-xs">
                  <span className="text-zinc-500 text-[11px]">Stack:</span>
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Foundations */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800 font-mono text-xs text-zinc-400">
            <span className="flex items-center gap-2 text-white font-semibold">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>ACADEMIC FOUNDATIONS</span>
            </span>
            <span>BDU FACULTY</span>
          </div>

          <div className="space-y-6">
            {education.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-6 space-y-4 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white font-sans">
                      {item.degree}
                    </h3>
                    <div className="text-xs text-zinc-400 font-mono mt-0.5">
                      {item.institution}
                    </div>
                  </div>
                  <span className="font-mono text-xs text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                    {item.period}
                  </span>
                </div>

                <ul className="space-y-1.5 text-xs text-zinc-300 leading-relaxed font-sans">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-zinc-500 font-mono mt-0.5">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 border-t border-zinc-800/80 flex flex-wrap gap-1.5 font-mono text-[10px] text-zinc-400">
                  {item.tech.map((t) => (
                    <span key={t} className="px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
