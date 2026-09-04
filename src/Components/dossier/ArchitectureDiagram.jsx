import React from "react";
import { GitBranch } from "lucide-react";

export const ArchitectureDiagram = ({ diagramText, title = "TOPOLOGY DATA FLOW & SERVICE BOUNDARIES" }) => {
  if (!diagramText) return null;

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-950 p-5 font-mono text-xs overflow-x-auto text-sky-400">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3 text-[11px] text-zinc-500">
        <span className="flex items-center gap-1.5 font-bold tracking-wider">
          <GitBranch className="w-3.5 h-3.5 text-sky-400" />
          <span>{title}</span>
        </span>
        <span className="text-[10px]">ASCII TOPOLOGY</span>
      </div>

      <pre className="leading-relaxed whitespace-pre font-mono selection:bg-sky-950">
        {diagramText.trim()}
      </pre>
    </div>
  );
};

export default ArchitectureDiagram;
