import React from "react";
import { changelog } from "@/data/changelog";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { GitCommit, GitBranch, ShieldCheck } from "lucide-react";

export const ChangelogView = () => {
  return (
    <section
      id="changelog"
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-zinc-200 dark:border-zinc-800/80"
    >
      <SectionHeader
        index="05"
        tag="Engineering Ledger"
        title="System Changelog & Architecture Revision Log"
        description="Versioned repository commits, deployment milestones, and infrastructural changes."
      />

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 overflow-hidden font-mono">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <GitBranch className="w-3.5 h-3.5 text-zinc-400" />
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">main</span>
            <span className="text-zinc-300 dark:text-zinc-700">/</span>
            <span>HEAD -&gt; origin/main</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400">CI/CD Passing</span>
          </div>
        </div>

        {/* Commit Log Entries */}
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800/80">
          {changelog.map((entry) => (
            <div key={entry.version} className="p-5 sm:p-6 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2.5">
                  <Badge variant="mono" className="bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 font-semibold">
                    {entry.version}
                  </Badge>
                  <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 text-[11px]">
                    <GitCommit className="w-3.5 h-3.5 text-zinc-400" />
                    {entry.commit}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400">{entry.date}</span>
              </div>

              <h4 className="text-sm font-semibold font-sans text-zinc-900 dark:text-zinc-100">
                {entry.title}
              </h4>

              <p className="text-xs font-sans text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {entry.description}
              </p>

              <div className="pt-1">
                <ul className="space-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {entry.changes.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-zinc-400 dark:text-zinc-600">↳</span>
                      <span className="font-mono text-[11px]">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
