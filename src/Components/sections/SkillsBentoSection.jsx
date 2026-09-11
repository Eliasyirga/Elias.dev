import React, { useState } from "react";
import { skillCategories } from "../../data/skills";
import { 
  Cpu, 
  Code2, 
  Server, 
  Terminal, 
  Layers, 
  Database, 
  CheckCircle2,
  LayoutGrid,
  Filter,
  Search,
  Sparkles
} from "lucide-react";

export const SkillsBentoSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "ALL", name: "All Domains", code: "00_ALL" },
    { id: "Languages & Core", name: "Languages & Core", code: "01_LANG" },
    { id: "Frontend Architecture", name: "Frontend Architecture", code: "02_UI_ARCH" },
    { id: "Backend & Distributed Systems", name: "Backend & Distributed", code: "03_DIST_SYS" },
    { id: "DevOps & Tooling", name: "DevOps & Tooling", code: "04_DEVOPS" },
  ];

  const filteredCategories = skillCategories
    .map((cat) => {
      if (selectedCategory !== "ALL" && cat.category !== selectedCategory) {
        return null;
      }
      const filteredItems = cat.items.filter((item) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.context?.toLowerCase().includes(q) ||
          item.proficiency?.toLowerCase().includes(q)
        );
      });

      if (filteredItems.length === 0) return null;

      return {
        ...cat,
        items: filteredItems,
      };
    })
    .filter(Boolean);

  const totalFilteredCount = filteredCategories.reduce((acc, curr) => acc + curr.items.length, 0);

  return (
    <section id="skills" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-8 sm:space-y-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 border-b border-zinc-200 dark:border-white/10 pb-4 sm:pb-5">
        <div className="space-y-2">
          <div className="font-mono text-xs text-zinc-500 flex items-center gap-2">
            <span className="text-cyan-500 font-bold">// 03</span>
            <span>CAPABILITIES & DOMAIN_MATRIX</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Technical Competencies & Skills
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans max-w-xl">
            Granular inventory of core languages, distributed backend infrastructure, relational modeling, and frontend component architectures.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search skill (e.g. Node, React, Redis)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-xs font-mono text-zinc-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition-colors shadow-inner"
          />
        </div>
      </div>

      {/* Domain Pills Filter */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-200 dark:border-white/10 font-mono text-xs w-full sm:w-auto overflow-x-auto shadow-inner">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg transition-all text-xs whitespace-nowrap ${
              selectedCategory === cat.id
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grid of All Skill Domains */}
      <div className="space-y-10">
        {filteredCategories.length === 0 ? (
          <div className="p-8 text-center font-mono text-xs text-zinc-500 rounded-2xl border border-dashed border-zinc-300 dark:border-white/10">
            No technical capabilities matched your query "{searchQuery}".
          </div>
        ) : (
          filteredCategories.map((cat) => (
            <div key={cat.category} className="space-y-4">
              {/* Domain Group Header */}
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-white/10 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">{cat.category}</span>
                  <span className="text-zinc-500 hidden sm:inline">// {cat.description}</span>
                </div>
                <span className="text-zinc-500 px-2.5 py-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 text-[11px] font-semibold">
                  {cat.items.length} Primitives
                </span>
              </div>

              {/* Skills Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((skill, idx) => (
                  <div
                    key={idx}
                    className="tech-card rounded-2xl p-5 border-zinc-200/90 dark:border-white/10 space-y-3 flex flex-col justify-between hover:border-zinc-400 dark:hover:border-white/20 transition-all shadow-sm group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                          {skill.name}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                          {skill.proficiency}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                        {skill.context}
                      </p>
                    </div>

                    <div className="font-mono text-[11px] text-zinc-500 pt-3 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between">
                      <span>EXPERIENCE:</span>
                      <span className="font-bold text-zinc-800 dark:text-zinc-200">{skill.experienceYears}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default SkillsBentoSection;
