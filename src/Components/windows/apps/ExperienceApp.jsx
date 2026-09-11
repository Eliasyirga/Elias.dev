import React, { useState } from "react";
import { experience } from "../../../data/experience";
import { testimonials } from "../../../data/testimonials";
import {
  Briefcase,
  MapPin,
  Calendar,
  CheckCircle2,
  Sparkles,
  Quote,
  Building,
  TrendingUp,
} from "lucide-react";

export const ExperienceApp = () => {
  const [activeTab, setActiveTab] = useState("timeline"); // timeline | testimonials

  return (
    <div className="h-full flex flex-col bg-white/70 dark:bg-[#0c0d12]/90 text-zinc-900 dark:text-zinc-100 font-sans text-xs">
      {/* Top Navigation Bar */}
      <div className="p-3 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between bg-zinc-100/60 dark:bg-[#13151d]/60 shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("timeline")}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all ${
              activeTab === "timeline"
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            }`}
          >
            01 // CAREER MILESTONES
          </button>
          <button
            onClick={() => setActiveTab("testimonials")}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all ${
              activeTab === "testimonials"
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            }`}
          >
            02 // RECOMMENDATIONS ({testimonials.length})
          </button>
        </div>

        <div className="text-[11px] text-zinc-500 font-mono hidden sm:block">
          4+ Years Industry & Systems Experience
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {activeTab === "timeline" && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {experience.map((exp, idx) => (
              <div
                key={exp.id || idx}
                className="p-5 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#12141a] space-y-4 shadow-sm hover:shadow-md transition-all hover:border-zinc-300 dark:hover:border-white/20"
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono font-bold">
                        {exp.type}
                      </span>
                      <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                        {exp.role}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-xs font-semibold">
                      <Building className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{exp.company}</span>
                      <span className="text-zinc-300 dark:text-zinc-700">•</span>
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-500 bg-zinc-100 dark:bg-zinc-800/80 px-2.5 py-1 rounded-lg self-start">
                    <Calendar className="w-3 h-3 text-cyan-500" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-2 pt-1">
                  {exp.highlights.map((point, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-zinc-700 dark:text-zinc-300 leading-relaxed text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Chips */}
                <div className="pt-2 border-t border-zinc-100 dark:border-white/5 flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {exp.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "testimonials" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-5 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#12141a] space-y-3.5 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <Quote className="w-6 h-6 text-cyan-500 opacity-60" />
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-xs italic">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-white/5 space-y-0.5">
                  <div className="font-bold text-zinc-900 dark:text-white text-xs">{t.name}</div>
                  <div className="text-[11px] text-zinc-500">
                    {t.role} • <span className="font-semibold text-cyan-600 dark:text-cyan-400">{t.organization}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
