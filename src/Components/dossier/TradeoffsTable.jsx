import React from "react";
import { GitCompare, CheckCircle2, XCircle } from "lucide-react";

export const TradeoffsTable = ({ tradeoffs = [] }) => {
  if (!tradeoffs || tradeoffs.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold">
        <GitCompare className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
        <span>ARCHITECTURAL TRADE-OFFS &amp; DECISION MATRIX</span>
      </div>

      <div className="space-y-3">
        {tradeoffs.map((item, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5 space-y-3 font-mono text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-zinc-200 dark:border-zinc-800">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 font-sans text-sm">
                {item.topic}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-[11px] font-bold">
                <CheckCircle2 className="w-3 h-3" />
                <span>Adopted: {item.chosen}</span>
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2 text-zinc-500 dark:text-zinc-400 text-[11px]">
                <XCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                <div>
                  <span className="uppercase text-[10px] mr-2">Alternative Evaluated:</span>
                  <span className="line-through text-zinc-600 dark:text-zinc-400">{item.alternative}</span>
                </div>
              </div>

              <div className="text-zinc-700 dark:text-zinc-300 font-sans text-xs leading-relaxed pl-5">
                <strong className="font-mono text-zinc-900 dark:text-zinc-200 uppercase text-[10px] block mb-1">
                  Engineering Rationale:
                </strong>
                {item.rationale}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradeoffsTable;
