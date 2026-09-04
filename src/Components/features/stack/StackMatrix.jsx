import React from "react";
import { skillCategories } from "@/data/skills";
import { Layers, Terminal, Cpu, Database, Layout, ShieldCheck } from "lucide-react";

export const StackMatrix = () => {
  return (
    <section
      id="stack"
      className="py-20 md:py-28 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto border-b border-zinc-800/80"
    >
      <div className="space-y-4 mb-14">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
          <Cpu className="w-4 h-4" />
          <span>CAPABILITIES &amp; ARCHITECTURE MATRIX</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
          System Technologies &amp; Architectural Rationale
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed">
          Detailed technical breakdown of languages, frontend systems, distributed backends, and deployment infrastructure utilized across production codebases.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((group, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 flex flex-col justify-between hover:border-zinc-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs text-cyan-400 font-semibold">0{idx + 1}</span>
                  <h3 className="text-base font-bold text-white font-sans">{group.category}</h3>
                </div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                  PRODUCTION TESTED
                </span>
              </div>

              <p className="text-xs text-zinc-400 mb-6 leading-relaxed font-sans">
                {group.description}
              </p>

              <div className="space-y-4">
                {group.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 pb-3 border-b border-zinc-800/60 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-zinc-200">{item.name}</span>
                      <span className="font-mono text-[10px] text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                        {item.experienceYears}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400 sm:text-right">
                      {item.context}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
