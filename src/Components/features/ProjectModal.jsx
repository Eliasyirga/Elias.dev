import React, { useState, useEffect } from "react";
import { 
  X, 
  ExternalLink, 
  Github, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  ArrowUpRight,
  FileCode,
  Check,
  Copy,
  Activity,
  Terminal,
  Database,
  Workflow
} from "lucide-react";

export const ProjectModal = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  if (!project) return null;

  const copySnippet = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const tabs = [
    { id: "overview", label: "01 // OVERVIEW", icon: Layers },
    { id: "architecture", label: "02 // ARCHITECTURE", icon: Workflow },
    { id: "decisions", label: "03 // DECISIONS & TRADEOFFS", icon: Database },
    { id: "code", label: "04 // CODE & RECOVERY", icon: FileCode },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#0e0e12] text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-white/10 shadow-2xl p-5 sm:p-8 space-y-6 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 dark:border-white/10 pb-5">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] sm:text-xs">
              <span className="px-2.5 py-0.5 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-black">
                {project.rfcId || "SPEC-001"}
              </span>
              <span className="text-zinc-500">
                {project.category} // {project.year || "2026"}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                [{project.status || "PRODUCTION"}]
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-sans">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-mono">
              {project.headline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl border border-zinc-200 dark:border-white/10 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-200 dark:border-white/5 font-mono text-xs overflow-x-auto shadow-inner">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Media & Key Actions */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-7 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-950 aspect-video overflow-hidden shadow-md">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top"
                  />
                )}
              </div>

              <div className="md:col-span-5 space-y-4">
                <div className="space-y-2 font-mono text-xs">
                  <span className="text-zinc-500 uppercase tracking-wider block font-semibold">
                    DEPLOYMENT_ENDPOINTS
                  </span>
                  <div className="flex flex-col gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-black text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-950 font-bold transition-all shadow-sm"
                      >
                        <span>LAUNCH_LIVE_SERVICE</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-white/10 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>VIEW_SOURCE_CODE</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Metrics */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="space-y-2 pt-1 font-mono text-xs">
                    <span className="text-zinc-500 uppercase tracking-wider block font-semibold">
                      VERIFIED_BENCHMARKS
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {project.metrics.map((m, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-zinc-100/90 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/5">
                          <div className="text-[10px] text-zinc-500 truncate">{m.label}</div>
                          <div className="text-sm font-bold text-zinc-900 dark:text-white mt-0.5">{m.value}</div>
                          {m.delta && <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">{m.delta}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Problem & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.problemStatement && (
                <div className="p-4 rounded-xl bg-zinc-100/90 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/5 space-y-1.5">
                  <div className="font-mono text-xs text-rose-500 font-bold">
                    [01] PROBLEM_STATEMENT
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                    {project.problemStatement}
                  </p>
                </div>
              )}

              {project.rfc?.summary && (
                <div className="p-4 rounded-xl bg-zinc-100/90 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/5 space-y-1.5">
                  <div className="font-mono text-xs text-emerald-500 font-bold">
                    [02] ENGINEERED_SOLUTION
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                    {project.rfc.summary}
                  </p>
                </div>
              )}
            </div>

            {/* Stack Tags */}
            {project.stack && (
              <div className="space-y-2 font-mono text-xs">
                <span className="text-zinc-500 uppercase tracking-wider block font-semibold">
                  TECHNOLOGY_STACK
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/5 text-[11px] font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ARCHITECTURE */}
        {activeTab === "architecture" && (
          <div className="space-y-4 animate-in fade-in duration-150 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-white/5">
              <span className="text-zinc-500 uppercase font-semibold">DISTRIBUTED_TOPOLOGY_DIAGRAM</span>
              <span className="text-emerald-500 text-[11px]">WSS / REST / RESP3</span>
            </div>

            {project.rfc?.architectureDiagram ? (
              <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 text-emerald-400 overflow-x-auto leading-relaxed shadow-inner">
                <pre>{project.rfc.architectureDiagram}</pre>
              </div>
            ) : (
              <p className="text-zinc-500 italic">No ASCII topology diagram provided for this spec.</p>
            )}

            {project.rfc?.schemaSummary && (
              <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/5 space-y-1">
                <div className="text-zinc-500 font-bold">DATABASE_SCHEMA_RIGOR</div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
                  {project.rfc.schemaSummary}
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DECISIONS */}
        {activeTab === "decisions" && (
          <div className="space-y-4 animate-in fade-in duration-150 font-mono text-xs">
            <div className="text-zinc-500 uppercase font-semibold pb-2 border-b border-zinc-200 dark:border-white/5">
              KEY_ARCHITECTURAL_DECISIONS & TRADEOFFS
            </div>

            {project.rfc?.decisions && project.rfc.decisions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.rfc.decisions.map((dec, i) => (
                  <div key={i} className="p-4 rounded-xl bg-zinc-100/90 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/5 space-y-2">
                    <div className="font-bold text-zinc-900 dark:text-white text-sm font-sans">{dec.topic}</div>
                    <div className="text-emerald-600 dark:text-emerald-400 font-bold">
                      ✓ Chosen: {dec.chosen}
                    </div>
                    {dec.alternative && (
                      <div className="text-zinc-500 text-[11px]">
                        ✗ Rejected: {dec.alternative}
                      </div>
                    )}
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans pt-1 border-t border-zinc-200 dark:border-white/5">
                      {dec.rationale}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-zinc-500 italic">No formal decision tradeoff records for this spec.</p>
            )}
          </div>
        )}

        {/* TAB 4: CODE & RECOVERY */}
        {activeTab === "code" && (
          <div className="space-y-4 animate-in fade-in duration-150 font-mono text-xs">
            {project.rfc?.technicalHurdles && project.rfc.technicalHurdles.length > 0 ? (
              project.rfc.technicalHurdles.map((hurdle, i) => (
                <div key={i} className="space-y-3">
                  <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/5 space-y-2">
                    <div className="font-bold text-zinc-900 dark:text-white text-sm font-sans">{hurdle.title}</div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
                      {hurdle.description}
                    </p>
                    <div className="pt-2 border-t border-zinc-200 dark:border-white/5 text-xs text-emerald-600 dark:text-emerald-400 font-sans">
                      <strong>Engineered Resolution:</strong> {hurdle.solution}
                    </div>
                  </div>

                  {hurdle.codeSnippet && (
                    <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 p-4">
                      <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-[11px] text-zinc-400">
                        <span>IMPLEMENTATION_SNIPPET</span>
                        <button
                          onClick={() => copySnippet(hurdle.codeSnippet)}
                          className="flex items-center gap-1 text-zinc-300 hover:text-white"
                        >
                          {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedCode ? "COPIED" : "COPY_CODE"}</span>
                        </button>
                      </div>
                      <pre className="text-zinc-200 pt-3 overflow-x-auto text-[11px] leading-relaxed">
                        <code>{hurdle.codeSnippet}</code>
                      </pre>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-zinc-500 italic">No code hurdles documented for this project.</p>
            )}
          </div>
        )}

        {/* Bottom Close Bar */}
        <div className="pt-4 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between font-mono text-xs">
          <span className="text-zinc-500 hidden sm:inline">RFC Specification // Elias Yirga Portfolio</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-white/10 text-zinc-700 dark:text-zinc-300 text-xs font-mono font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            CLOSE_SPECIFICATION
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
