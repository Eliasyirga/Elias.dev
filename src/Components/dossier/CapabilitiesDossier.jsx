import React from "react";
import { Layers, Cpu, Server, Terminal, ShieldCheck, Database, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { skillCategories } from "@/data/skills";

export const CapabilitiesDossier = () => {
  return (
    <article className="space-y-12 max-w-4xl mx-auto py-4">
      {/* 1. Header Metadata */}
      <div className="space-y-4 pb-6 border-b border-zinc-200 dark:border-zinc-800 font-mono text-xs">
        <div className="flex items-center gap-2">
          <Badge variant="rfc">SYS-001</Badge>
          <Badge variant="active">ACTIVE MATRIX</Badge>
          <span className="text-zinc-400 dark:text-zinc-600">•</span>
          <span className="text-zinc-700 dark:text-zinc-300 font-bold">REVISION 2026.1</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-sans">
          Architecture &amp; Engineering Capabilities Matrix
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
          Comprehensive inventory of core languages, database indexing engines, UI rendering pipelines, and distributed protocols.
        </p>
      </div>

      {/* 2. Categorized Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((group, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6 space-y-4 font-mono text-xs"
          >
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100">
                <Layers className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span className="uppercase">{group.category}</span>
              </div>
              <span className="text-zinc-400 text-[10px]">DOMAIN 0{idx + 1}</span>
            </div>

            <div className="space-y-3">
              {group.items.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60 last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">{item.name}</span>
                    <span className="text-[10px] text-sky-700 dark:text-sky-400 font-mono px-1.5 py-0.5 rounded bg-sky-100 dark:bg-sky-950/60 border border-sky-300 dark:border-sky-800">
                      {item.experienceYears}
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-500 font-sans">{item.context}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default CapabilitiesDossier;
