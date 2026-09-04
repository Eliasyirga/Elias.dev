import React from "react";
import { Activity } from "lucide-react";

export const MetricsBar = ({ metrics = [], title = "VERIFIED SYSTEM TELEMETRY" }) => {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-5 font-mono">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 mb-4 text-[11px] text-zinc-500 dark:text-zinc-400">
        <span className="flex items-center gap-1.5 font-bold tracking-wider">
          <Activity className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>{title}</span>
        </span>
        <span className="text-[10px] text-zinc-400 dark:text-zinc-500">BENCHMARK SLA</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {metrics.map((m, idx) => (
          <div key={idx} className="space-y-1">
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block truncate">
              {m.label}
            </span>
            <div className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
              {m.value}
            </div>
            {m.delta && (
              <div className="text-[11px] text-sky-600 dark:text-sky-400">
                {m.delta}
              </div>
            )}
            {m.benchmarkTarget && (
              <div className="text-[10px] text-zinc-400 dark:text-zinc-500">
                Target: {m.benchmarkTarget}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsBar;
