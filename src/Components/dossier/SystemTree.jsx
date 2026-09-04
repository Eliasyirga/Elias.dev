import React, { useState } from "react";
import { Folder, FileText, ChevronRight, ChevronDown, Search, Terminal, Cpu, Layers, Briefcase, Award } from "lucide-react";
import { projectsList } from "@/content";
import { Badge } from "@/components/ui/Badge";

export const SystemTree = ({ activeId, onSelect, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [projectsExpanded, setProjectsExpanded] = useState(true);
  const [systemExpanded, setSystemExpanded] = useState(true);

  const filteredProjects = projectsList.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.rfcId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.stack.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const systemDocs = [
    { id: "sys-overview", title: "SYS-000: Executive Summary & Tenets", icon: Terminal, status: "STABLE" },
    { id: "sys-capabilities", title: "SYS-001: Architecture & Capabilities Matrix", icon: Layers, status: "ACTIVE" },
    { id: "sys-experience", title: "SYS-002: Career & Academic Ledger", icon: Briefcase, status: "STABLE" },
    { id: "sys-credentials", title: "SYS-003: Verified Accreditations", icon: Award, status: "ACTIVE" },
  ];

  return (
    <div className="flex flex-col h-full font-mono text-xs">
      {/* Search Input Filter */}
      <div className="p-3 border-b border-zinc-200 dark:border-zinc-800">
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search RFCs, stack, domains..."
            className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-2.5 py-1.5 pl-8 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-sky-500 font-mono"
          />
        </div>
      </div>

      {/* Directory Tree Content */}
      <div className="flex-1 overflow-y-auto p-2 space-y-3">
        {/* System Documents Section */}
        <div>
          <button
            onClick={() => setSystemExpanded(!systemExpanded)}
            className="flex items-center gap-1.5 w-full text-left px-2 py-1 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors uppercase tracking-wider"
          >
            {systemExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            <Folder className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>SYSTEM DOSSIERS</span>
          </button>

          {systemExpanded && (
            <div className="ml-3 mt-1 space-y-0.5 border-l border-zinc-200 dark:border-zinc-800 pl-2">
              {systemDocs.map((doc) => {
                const Icon = doc.icon;
                const isActive = activeId === doc.id;
                return (
                  <button
                    key={doc.id}
                    onClick={() => onSelect(doc.id)}
                    className={`flex items-center justify-between gap-2 w-full text-left px-2 py-1.5 rounded transition-colors text-xs ${
                      isActive
                        ? "bg-sky-50 dark:bg-sky-950/70 text-sky-800 dark:text-sky-300 font-semibold border border-sky-200 dark:border-sky-800"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                    }`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <Icon className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span className="truncate">{doc.title}</span>
                    </span>
                    <span className="text-[10px] text-zinc-400 shrink-0 uppercase">{doc.status}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Project RFCs Section */}
        <div>
          <button
            onClick={() => setProjectsExpanded(!projectsExpanded)}
            className="flex items-center gap-1.5 w-full text-left px-2 py-1 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors uppercase tracking-wider"
          >
            {projectsExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            <Folder className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>ENGINEERING RFCS ({filteredProjects.length})</span>
          </button>

          {projectsExpanded && (
            <div className="ml-3 mt-1 space-y-0.5 border-l border-zinc-200 dark:border-zinc-800 pl-2">
              {filteredProjects.map((project) => {
                const isActive = activeId === project.slug || activeId === project.rfcId.toLowerCase();
                return (
                  <button
                    key={project.rfcId}
                    onClick={() => onSelect(project.slug)}
                    className={`flex items-center justify-between gap-2 w-full text-left px-2 py-1.5 rounded transition-colors text-xs ${
                      isActive
                        ? "bg-sky-50 dark:bg-sky-950/70 text-sky-800 dark:text-sky-300 font-semibold border border-sky-200 dark:border-sky-800"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                    }`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <FileText className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span className="font-bold text-sky-700 dark:text-sky-400">{project.rfcId}:</span>
                      <span className="truncate">{project.title.split(" ")[0]}</span>
                    </span>
                    <Badge variant={project.status.toLowerCase()} className="text-[9px] py-0 px-1">
                      {project.status}
                    </Badge>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemTree;
