import React, { useState } from "react";
import { Download, Copy, Check, Terminal, Activity, FileText, ChevronRight } from "lucide-react";
import { getProjectBySlug } from "@/content";

export const WorkstationToolbar = ({ activeId }) => {
  const [copied, setCopied] = useState(false);
  const project = getProjectBySlug(activeId);

  const handleCopyMarkdown = async () => {
    if (!project) return;
    const md = `# ${project.rfcId}: ${project.title}
Status: ${project.status} | Version: ${project.version} | Lead: ${project.lead} | Date: ${project.date}

## 1. Problem Statement
${project.problemStatement}

## 2. Business Impact
${project.businessImpact}

## 3. Metrics
${project.metrics.map((m) => `- ${m.label}: ${m.value} (${m.delta || ""})`).join("\n")}

## 4. Architecture
\`\`\`
${project.architectureDiagram}
\`\`\`

## 5. Tradeoffs
${project.tradeoffs.map((t) => `### ${t.topic}\n- Chosen: ${t.chosen}\n- Alternative: ${t.alternative}\n- Rationale: ${t.rationale}`).join("\n\n")}
`;
    try {
      await navigator.clipboard.writeText(md);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleExportJson = () => {
    if (!project) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(project, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${project.rfcId.toLowerCase()}-${project.slug}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md font-mono text-xs mb-6 select-none">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 text-[11px] truncate">
        <span className="text-zinc-400">workspace</span>
        <ChevronRight className="w-3 h-3 text-zinc-400" />
        <span className="text-zinc-400">dossiers</span>
        <ChevronRight className="w-3 h-3 text-zinc-400" />
        <span className="font-bold text-sky-700 dark:text-sky-400 truncate">
          {project ? `${project.rfcId.toLowerCase()}.md` : `${activeId}.md`}
        </span>
      </div>

      {/* Action Controls & Telemetry Ping */}
      <div className="flex items-center gap-3">
        {/* Live Cluster Heartbeat */}
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>CLUSTER 38ms p95</span>
        </div>

        {/* Action Buttons for RFC */}
        {project && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors text-[11px]"
              title="Copy RFC Markdown Specification"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? "COPIED" : "COPY MD"}</span>
            </button>

            <button
              onClick={handleExportJson}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors text-[11px]"
              title="Export RFC as JSON"
            >
              <Download className="w-3 h-3" />
              <span>EXPORT JSON</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkstationToolbar;
