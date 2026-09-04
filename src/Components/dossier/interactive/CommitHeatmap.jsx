import React, { useState } from "react";
import { GitCommit, Activity, Flame, ShieldCheck } from "lucide-react";

export const CommitHeatmap = () => {
  const [hoveredDay, setHoveredDay] = useState(null);

  // Generate 48 weeks of commit cells (7 days each)
  const weeks = 48;
  const daysPerWeek = 7;
  const grid = Array.from({ length: weeks }, (_, w) =>
    Array.from({ length: daysPerWeek }, (_, d) => {
      const seed = Math.sin(w * 13.5 + d * 7.2) * 100;
      const count = Math.max(0, Math.floor((seed % 8) + (w > 20 ? 3 : 1)));
      return {
        week: w,
        day: d,
        count: count,
        date: `2025-W${w + 1}-D${d + 1}`,
      };
    })
  );

  const totalCommits = grid.flat().reduce((acc, c) => acc + c.count, 0);

  const getCellColor = (count) => {
    if (count === 0) return "bg-zinc-200 dark:bg-zinc-850";
    if (count < 3) return "bg-sky-200 dark:bg-sky-950 text-sky-800";
    if (count < 6) return "bg-sky-400 dark:bg-sky-700 text-white";
    return "bg-sky-600 dark:bg-sky-400 text-white";
  };

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-5 space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <GitCommit className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span className="font-bold text-zinc-900 dark:text-zinc-100 font-sans text-sm">
            Continuous Delivery Ledger &amp; Commit Telemetry
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-zinc-500">
          <span className="text-zinc-900 dark:text-zinc-100 font-bold">{totalCommits.toLocaleString()} Total Commits</span>
          <span>•</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">99.8% Production Success Rate</span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-1 min-w-[620px]">
          {grid.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1 flex-1">
              {week.map((cell, dIdx) => (
                <div
                  key={dIdx}
                  onMouseEnter={() => setHoveredDay(cell)}
                  onMouseLeave={() => setHoveredDay(null)}
                  className={`w-full aspect-square rounded-[2px] transition-colors cursor-pointer ${getCellColor(
                    cell.count
                  )} hover:ring-2 hover:ring-sky-500`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip Bar & Legend */}
      <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60">
        <div>
          {hoveredDay ? (
            <span className="text-zinc-900 dark:text-zinc-100 font-bold">
              {hoveredDay.count} commits on {hoveredDay.date}
            </span>
          ) : (
            <span>Hover over any block to inspect historical release commits</span>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-[10px]">
          <span>Less</span>
          <span className="w-2.5 h-2.5 rounded-[1px] bg-zinc-200 dark:bg-zinc-850" />
          <span className="w-2.5 h-2.5 rounded-[1px] bg-sky-200 dark:bg-sky-950" />
          <span className="w-2.5 h-2.5 rounded-[1px] bg-sky-400 dark:bg-sky-700" />
          <span className="w-2.5 h-2.5 rounded-[1px] bg-sky-600 dark:bg-sky-400" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default CommitHeatmap;
