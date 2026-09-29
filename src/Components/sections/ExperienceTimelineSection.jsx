import React, { useState } from "react";
import { experience, education } from "../../data/experience";
import { 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Building2, 
  CheckCircle2,
  TrendingUp,
  Award,
  Calendar,
  Sparkles,
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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
            Engineering Track Record & Education
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans max-w-xl leading-relaxed">
            Demonstrated track record engineering high-availability SaaS infrastructure, real-time dispatch systems, and verified B.Sc. Computer Engineering foundations.
          </p>
        </div>

        {/* Tab Filter */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-200 dark:border-white/10 font-mono text-xs shadow-inner">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-xl transition-all text-xs font-semibold ${
              activeTab === "all"
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60"
            }`}
          >
            All Tracks
          </button>
          <button
            onClick={() => setActiveTab("industry")}
            className={`px-3 py-1.5 rounded-xl transition-all text-xs font-semibold ${
              activeTab === "industry"
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60"
            }`}
          >
            Industry Roles
          </button>
          <button
            onClick={() => setActiveTab("academic")}
            className={`px-3 py-1.5 rounded-xl transition-all text-xs font-semibold ${
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
              <span className="flex items-center gap-1.5 font-bold text-zinc-800 dark:text-zinc-200">
                <Briefcase className="w-4 h-4 text-cyan-500" />
                <span>[INDUSTRY_POSITIONS]</span>
              </span>
              <span className="text-[11px] text-zinc-400">Production Systems</span>
            </div>

            <div className="space-y-4">
              {experience.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl p-6 border border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-[#11131a]/80 backdrop-blur-xl space-y-4 shadow-sm hover:border-cyan-500/40 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="space-y-1">
                      <h4 className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-100 font-sans group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {item.role}
                      </h4>
                      <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{item.company}</span>
                        <span className="text-zinc-400">• {item.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-white/5 font-mono text-[11px] text-zinc-700 dark:text-zinc-300 font-semibold">
                      <Calendar className="w-3 h-3 text-cyan-500" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-zinc-200/60 dark:border-white/5 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                    {item.highlights?.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Academic Foundations */}
        {(activeTab === "all" || activeTab === "academic") && (
          <div className="space-y-6">
            <div className="font-mono text-xs uppercase tracking-wider text-zinc-500 pb-2 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-bold text-zinc-800 dark:text-zinc-200">
                <GraduationCap className="w-4 h-4 text-emerald-500" />
                <span>[ACADEMIC_FOUNDATION]</span>
              </span>
              <span className="text-[11px] text-zinc-400">Formal Engineering</span>
            </div>

            <div className="space-y-4">
              {education.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl p-6 border border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-[#11131a]/80 backdrop-blur-xl space-y-4 shadow-sm hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold">
                        <span>GRADUATED</span>
                      </div>
                      <h4 className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-100 font-sans group-hover:text-emerald-500 transition-colors">
                        {item.degree}
                      </h4>
                      <div className="text-xs font-mono text-zinc-600 dark:text-zinc-400 font-semibold">
                        {item.institution} • {item.location}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-white/5 font-mono text-[11px] text-zinc-700 dark:text-zinc-300 font-semibold">
                      <Calendar className="w-3 h-3 text-emerald-500" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                    Core Engineering Curriculum: Distributed Operating Systems, Spatial Information Systems, Computer Architecture, Advanced Database Modeling, Data Structures & Algorithmic Complexity.
                  </p>

                  <div className="pt-2 border-t border-zinc-200/60 dark:border-white/5 flex flex-wrap items-center gap-2 font-mono text-[11px] text-zinc-500">
                    <span className="text-emerald-500 font-bold">Capstone Focus:</span>
                    <span className="text-zinc-700 dark:text-zinc-300">Municipal Real-Time Dispatch Distributed Infrastructure</span>
                  </div>
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
