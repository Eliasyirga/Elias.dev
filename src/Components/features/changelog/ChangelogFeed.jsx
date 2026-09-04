import React from "react";
import { changelog } from "@/data/changelog";
import { GitCommit, GitBranch, ShieldCheck } from "lucide-react";

export const ChangelogFeed = () => {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden font-mono text-xs">
      {/* Title Header */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-950/80 border-b border-zinc-800 text-zinc-400">
        <div className="flex items-center gap-2">
          <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-zinc-200">main</span>
          <span className="text-zinc-600">/</span>
          <span>git rev-list --all</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>CI VERIFIED</span>
        </div>
      </div>

      {/* Revision Stream */}
      <div className="divide-y divide-zinc-800/80">
        {changelog.map((entry) => (
          <div key={entry.version} className="p-5 sm:p-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-semibold text-cyan-400 text-[11px]">
                  {entry.version}
                </span>
                <span className="flex items-center gap-1 text-zinc-500 text-[11px]">
                  <GitCommit className="w-3.5 h-3.5 text-zinc-400" />
                  {entry.commit}
                </span>
              </div>
              <span className="text-zinc-500 text-[11px]">{entry.date}</span>
            </div>

            <h4 className="text-sm font-semibold font-sans text-white">
              {entry.title}
            </h4>

            <p className="text-xs font-sans text-zinc-300 leading-relaxed">
              {entry.description}
            </p>

            <ul className="space-y-1.5 text-xs text-zinc-400 pt-1">
              {entry.changes.map((change, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-cyan-400 font-mono">↳</span>
                  <span className="font-mono text-[11px]">{change}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
