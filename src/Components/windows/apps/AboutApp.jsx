import React, { useState } from "react";
import { skillCategories } from "../../../data/skills";
import { useWindowsOS } from "../../../context/WindowsOSContext";
import {
  User,
  ShieldCheck,
  Cpu,
  Terminal,
  FileDown,
  Mail,
  Send,
  Github,
  Linkedin,
  Sparkles,
  Search,
  CheckCircle2,
  Code2,
} from "lucide-react";

export const AboutApp = () => {
  const { openWindow } = useWindowsOS();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchSkill, setSearchSkill] = useState("");

  const allSkills = skillCategories.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, category: cat.category }))
  );

  const filteredSkills = allSkills.filter((s) => {
    const matchesCat = activeCategory === "All" || s.category === activeCategory;
    const matchesSearch =
      !searchSkill ||
      s.name.toLowerCase().includes(searchSkill.toLowerCase()) ||
      s.context.toLowerCase().includes(searchSkill.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="h-full flex flex-col bg-white/70 dark:bg-[#0c0d12]/90 text-zinc-900 dark:text-zinc-100 font-sans text-xs">
      <div className="flex-1 overflow-y-auto p-4 sm:p-7 space-y-6 max-w-5xl mx-auto w-full">
        
        {/* System Properties / Bio Hero Card */}
        <div className="p-6 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#12141a] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-cyan-500/30 shadow-md">
                <img src="/vv.webp" alt="Elias Yirga" className="w-full h-full object-cover" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
                  Elias Yirga
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                  AVAILABLE
                </span>
              </div>
              <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                Computer Engineer & Full-Stack Architect
              </p>
              <div className="text-[11px] text-zinc-500 font-mono">
                B.Sc. Computer Engineering (Bahir Dar University, 2026)
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs w-full md:w-auto">
            <button
              onClick={() => openWindow("projects")}
              className="flex-1 md:flex-initial px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-black text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-950 font-bold transition-all"
            >
              Inspect 8 RFCs
            </button>
            <button
              onClick={() => openWindow("terminal")}
              className="flex-1 md:flex-initial px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-500" />
              <span>CLI Shell</span>
            </button>
          </div>
        </div>

        {/* Philosophy & Architecture Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
          {[
            {
              title: "01 // LOW LATENCY",
              desc: "PostGIS spatial indexing & Redis pub/sub routing achieving sub-second emergency response times (<450ms p95).",
              icon: Cpu,
            },
            {
              title: "02 // RELATIONAL RIGOR",
              desc: "ACID transactions, strict schema constraints, and PostgreSQL query optimization reducing p95 latency by 38%.",
              icon: ShieldCheck,
            },
            {
              title: "03 // MODERN FRONTEND",
              desc: "Zero-layout-shift UI, fluid 60fps micro-interactions with Framer Motion, and atomic design token systems.",
              icon: Code2,
            },
          ].map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#12141a] space-y-2 shadow-sm"
              >
                <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-xs">
                  <Icon className="w-4 h-4" />
                  <span>{pillar.title}</span>
                </div>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Technical Capability Matrix */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-200 dark:border-white/10 font-mono">
            <div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                // Technical Capability Matrix
              </h2>
              <div className="text-[11px] text-zinc-500 font-sans">
                Interactive capability lookup by proficiency and domain
              </div>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-1 text-[10px]">
              {["All", ...skillCategories.map((c) => c.category)].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    activeCategory === cat
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-sm"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Skill items grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredSkills.map((skill, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#12141a] space-y-1.5 shadow-sm hover:border-zinc-300 dark:hover:border-white/20 transition-all font-mono"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-900 dark:text-white text-xs">{skill.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold">
                    {skill.proficiency}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 font-sans leading-tight">
                  {skill.context}
                </p>
                <div className="text-[10px] text-zinc-400 pt-1 border-t border-zinc-100 dark:border-white/5">
                  Experience: {skill.experienceYears}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
