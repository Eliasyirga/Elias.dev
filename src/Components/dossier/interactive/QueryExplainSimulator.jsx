import React, { useState } from "react";
import { Database, Play, CheckCircle2, Zap, Layers } from "lucide-react";

export const QueryExplainSimulator = () => {
  const [useCompoundIndex, setUseCompoundIndex] = useState(true);
  const [filterSalary, setFilterSalary] = useState(true);
  const [filterSkills, setFilterSkills] = useState(true);

  // Simulated metrics based on selected index strategy
  const stats = useCompoundIndex
    ? {
        executionTime: "4.2 ms",
        scanType: "Index Scan using idx_jobs_status_salary_skills on jobs",
        rowsExamined: "148 rows",
        totalRecords: "150,000",
        cost: "0.42..8.45",
        status: "OPTIMAL",
      }
    : {
        executionTime: "184.6 ms",
        scanType: "Seq Scan on jobs (Full Table Scan)",
        rowsExamined: "150,000 rows (100%)",
        totalRecords: "150,000",
        cost: "0.00..4820.00",
        status: "DEGRADED",
      };

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-5 space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span className="font-bold text-zinc-900 dark:text-zinc-100 font-sans text-sm">
            Interactive Playground: PostgreSQL EXPLAIN ANALYZE Query Profiler
          </span>
        </div>
        <span
          className={`px-2 py-0.5 rounded text-[11px] font-bold ${
            useCompoundIndex
              ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
              : "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
          }`}
        >
          {stats.status}
        </span>
      </div>

      {/* Index Strategy Controls */}
      <div className="flex flex-wrap items-center gap-3 p-3 rounded bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
        <span className="text-zinc-500 font-bold uppercase text-[10px]">Index Strategy:</span>

        <button
          onClick={() => setUseCompoundIndex(true)}
          className={`px-2.5 py-1 rounded text-xs transition-colors ${
            useCompoundIndex
              ? "bg-sky-600 text-white font-bold"
              : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300"
          }`}
        >
          Compound B-Tree Index (Target)
        </button>

        <button
          onClick={() => setUseCompoundIndex(false)}
          className={`px-2.5 py-1 rounded text-xs transition-colors ${
            !useCompoundIndex
              ? "bg-amber-600 text-white font-bold"
              : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300"
          }`}
        >
          Sequential Scan (Unindexed Baseline)
        </button>
      </div>

      {/* Query Execution Plan Output */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
          <span className="text-[10px] text-zinc-500 uppercase">Execution Time</span>
          <div
            className={`text-lg font-bold tabular-nums ${
              useCompoundIndex ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
            }`}
          >
            {stats.executionTime}
          </div>
        </div>

        <div className="p-3 rounded bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
          <span className="text-[10px] text-zinc-500 uppercase">Rows Examined</span>
          <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
            {stats.rowsExamined}
          </div>
        </div>

        <div className="p-3 rounded bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
          <span className="text-[10px] text-zinc-500 uppercase">Total Corpus</span>
          <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
            {stats.totalRecords}
          </div>
        </div>

        <div className="p-3 rounded bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
          <span className="text-[10px] text-zinc-500 uppercase">Optimizer Cost</span>
          <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
            {stats.cost}
          </div>
        </div>
      </div>

      {/* Raw Query Output */}
      <div className="p-3 rounded bg-zinc-950 border border-zinc-800 text-sky-400 text-[11px] leading-relaxed overflow-x-auto">
        <div className="text-zinc-500 text-[10px] uppercase font-bold mb-1">// EXPLAIN ANALYZE OUTPUT</div>
        <div>-&gt; {stats.scanType} (cost={stats.cost} rows={stats.rowsExamined} width=32)</div>
        <div className="text-zinc-400 pl-4">Filter: (status = 'ACTIVE' AND salary &gt;= 120000)</div>
        <div className="text-zinc-400 pl-4">Planning Time: 0.12 ms | Execution Time: {stats.executionTime}</div>
      </div>
    </div>
  );
};

export default QueryExplainSimulator;
