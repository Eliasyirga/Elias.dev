import React, { useState } from "react";
import { Trash2, FileX, Sparkles, Check, RotateCcw } from "lucide-react";

export const TrashApp = () => {
  const [items, setItems] = useState([
    { name: "unindexed_table_scan.sql", type: "SQL Script", size: "1.2 GB", date: "Yesterday" },
    { name: "spaghetti_callbacks_v1.js", type: "JavaScript File", size: "450 KB", date: "2021" },
    { name: "undefined_is_not_a_function.log", type: "Crash Log", size: "84 KB", date: "3 days ago" },
    { name: "magic_numbers_hardcoded.ts", type: "TypeScript File", size: "12 KB", date: "Last week" },
    { name: "console_log_everything.js", type: "Debug Script", size: "55 KB", date: "Today" },
  ]);
  const [emptied, setEmptied] = useState(false);

  const handleEmpty = () => {
    setItems([]);
    setEmptied(true);
  };

  const handleRestore = () => {
    setEmptied(false);
    setItems([
      { name: "unindexed_table_scan.sql", type: "SQL Script", size: "1.2 GB", date: "Yesterday" },
      { name: "spaghetti_callbacks_v1.js", type: "JavaScript File", size: "450 KB", date: "2021" },
      { name: "undefined_is_not_a_function.log", type: "Crash Log", size: "84 KB", date: "3 days ago" },
    ]);
  };

  return (
    <div className="h-full flex flex-col bg-white/70 dark:bg-[#0c0d12]/90 text-zinc-900 dark:text-zinc-100 font-sans text-xs">
      {/* Action Header */}
      <div className="p-3 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between bg-zinc-100/60 dark:bg-[#13151d]/60 shrink-0 font-mono text-xs">
        <div className="flex items-center gap-2">
          <Trash2 className="w-4 h-4 text-zinc-500" />
          <span className="font-bold">RECYCLE BIN ({items.length} items)</span>
        </div>

        <div className="flex items-center gap-2">
          {items.length > 0 ? (
            <button
              onClick={handleEmpty}
              className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 font-bold border border-red-500/20 transition-colors"
            >
              Empty Recycle Bin
            </button>
          ) : (
            <button
              onClick={handleRestore}
              className="px-3 py-1.5 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restore Samples</span>
            </button>
          )}
        </div>
      </div>

      {/* Item List or Empty State */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-3 p-6 text-zinc-400 font-mono">
            <Sparkles className="w-8 h-8 text-cyan-500 opacity-60" />
            <div className="space-y-1">
              <div className="text-zinc-800 dark:text-zinc-200 font-bold text-sm">
                Recycle Bin is completely spotless!
              </div>
              <p className="text-[11px] text-zinc-500 font-sans">
                Zero legacy bugs or unoptimized queries remaining in this portfolio.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2 max-w-2xl mx-auto font-mono text-xs">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-[#12141a] flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <FileX className="w-4 h-4 text-red-400 shrink-0" />
                  <div>
                    <div className="font-bold text-zinc-900 dark:text-white text-xs">{item.name}</div>
                    <div className="text-[10px] text-zinc-500 font-sans">{item.type}</div>
                  </div>
                </div>

                <div className="text-right text-[11px] text-zinc-500">
                  <div>{item.size}</div>
                  <div className="text-[10px] text-zinc-400">{item.date}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
