import React, { useState } from "react";
import { experience, education } from "../../data/experience";
import { 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Building2, 
  CheckCircle2,
  TrendingUp,
  Award
} from "lucide-react";

export const ExperienceTimelineSection = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <section id="experience" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-8 sm:space-y-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 border-b border-zinc-200 dark:border-white/10 pb-4 sm:pb-5">
        <div className="space-y-2">
          <div className="font-mono text-xs text-zinc-500 flex items-center gap-2">
            <span className="text-cyan-500 font-bold">// 04</span>
            <span>CAREER_TRACK & FOUNDATIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Engineering Track Record & Education
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans max-w-xl">
            Demonstrated experience building SaaS infrastructure, latency optimization, and formal B.Sc. Computer Engineering foundations.
          </p>
        </div>

        {/* Tab Filter */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-200 dark:border-white/10 font-mono text-xs shadow-inner">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "all"
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60"
            }`}
          >
            All Tracks
          </button>
          <button
            onClick={() => setActiveTab("industry")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "industry"
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60"
            }`}
          >
            Industry Roles
          </button>
          <button
            onClick={() => setActiveTab("academic")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "academic"
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60"
            }`}
          >
            Academic Degree
          </button>
        </div>
      </div>

      {/* Timeline Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Industry Experience */}
        {(activeTab === "all" || activeTab === "industry") && (
          <div className="space-y-6">
            <div className="font-mono text-xs uppercase tracking-wider text-zinc-500 pb-2 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-cyan-500" />
                <span>[INDUSTRY_POSITIONS]</span>
              </span>
              <span className="text-[11px] text-zinc-400">Production Systems</span>
            </div>

            <div className="space-y-4">
              {experience.map((item) => (
                <div key={item.id} className="tech-card rounded-2xl p-6 border-zinc-200/90 dark:border-white/10 space-y-4 shadow-sm hover:border-zinc-400 dark:hover:border-white/20 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-sans">
                        {item.role}
                      </h4>
                      <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                        {item.company} <span className="text-zinc-400">// {item.location}</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-zinc-600 dark:text-zinc-300 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 font-semibold">
                      {item.period}
                    </span>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-zinc-200 dark:border-white/5 text-xs text-zinc-600 dark:text-zinc-300 font-sans">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="font-mono text-cyan-500 shrink-0 font-bold">→</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {item.tech && (
                    <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-[11px]">
                      {item.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Academic Foundations */}
        {(activeTab === "all" || activeTab === "academic") && (
          <div className="space-y-6">
            <div className="font-mono text-xs uppercase tracking-wider text-zinc-500 pb-2 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
                <span>[ACADEMIC_FOUNDATIONS]</span>
              </span>
              <span className="text-[11px] text-zinc-400">Formal Qualifications</span>
            </div>

            <div className="space-y-4">
              {education.map((item) => (
                <div key={item.id} className="tech-card rounded-2xl p-6 border-zinc-200/90 dark:border-white/10 space-y-4 shadow-sm hover:border-zinc-400 dark:hover:border-white/20 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-sans">
                        {item.degree}
                      </h4>
                      <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                        {item.institution} <span className="text-zinc-400">// {item.location}</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-zinc-600 dark:text-zinc-300 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 font-semibold">
                      {item.period}
                    </span>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-zinc-200 dark:border-white/5 text-xs text-zinc-600 dark:text-zinc-300 font-sans">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="font-mono text-emerald-500 shrink-0 font-bold">→</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {item.tech && (
                    <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-[11px]">
                      {item.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceTimelineSection;
