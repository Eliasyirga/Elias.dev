import React, { useState } from "react";
import { useWindowsOS, APP_REGISTRY } from "../../context/WindowsOSContext";
import { getAppIcon } from "./WindowFrame";
import { projects } from "../../data/projects";
import {
  Search,
  Power,
  Lock,
  RotateCcw,
  Sparkles,
  FileCode,
  FileText,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export const WindowsStartMenu = () => {
  const { startMenuOpen, openWindow, lockSystem, closeAllFlyouts } = useWindowsOS();
  const [search, setSearch] = useState("");
  const [powerMenuOpen, setPowerMenuOpen] = useState(false);

  if (!startMenuOpen) return null;

  const appList = Object.values(APP_REGISTRY);

  const filteredApps = search
    ? appList.filter(
        (app) =>
          app.title.toLowerCase().includes(search.toLowerCase()) ||
          app.shortTitle.toLowerCase().includes(search.toLowerCase()) ||
          app.category.toLowerCase().includes(search.toLowerCase())
      )
    : appList;

  const recentItems = [
    { title: "RFC-001 BahirLink Emergency Dispatch", app: "projects", type: "RFC Specification" },
    { title: "Elias_Yirga_CV.pdf", app: "cv", type: "Executive Resume" },
    { title: "RFC-004 GroveLink Consult Portal", app: "projects", type: "Client Architecture" },
    { title: "B.Sc. Computer Engineering Degree", app: "education", type: "Academic Proof" },
  ];

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-14 left-1/2 -translate-x-1/2 z-[9990] w-[95vw] sm:w-[580px] max-h-[85vh] rounded-2xl border border-zinc-300/60 dark:border-white/20 bg-white/90 dark:bg-[#12141a]/95 backdrop-blur-3xl shadow-[0_25px_70px_rgba(0,0,0,0.55)] text-zinc-900 dark:text-zinc-100 flex flex-col justify-between overflow-hidden animate-in slide-in-from-bottom-5 duration-150 font-sans select-none"
    >
      {/* Top Search Input */}
      <div className="p-4 sm:p-5 pb-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
          <input
            type="text"
            placeholder="Type here to search apps, projects, skills, or settings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-200 dark:border-white/10 text-xs focus:ring-2 focus:ring-cyan-500/50 outline-none text-zinc-800 dark:text-zinc-100 placeholder-zinc-500 font-sans"
          />
        </div>
      </div>

      {/* Main Apps & Recommendations Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-2 space-y-5">
        
        {/* Pinned Applications */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-zinc-500">
            <span>PINNED_APPLICATIONS</span>
            <span className="text-[10px] text-cyan-600 dark:text-cyan-400">All Apps</span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
            {filteredApps.map((app) => (
              <button
                key={app.id}
                onClick={() => openWindow(app.id)}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/10 text-center space-y-1.5 transition-all group hover:scale-105 active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/5 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                  {getAppIcon(app.icon, "w-5 h-5")}
                </div>
                <span className="text-[11px] font-medium text-zinc-800 dark:text-zinc-200 truncate w-full">
                  {app.shortTitle}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Recommended & Recent Section */}
        {!search && (
          <div className="space-y-2.5 pt-2 border-t border-zinc-100 dark:border-white/5">
            <div className="text-xs font-mono font-bold text-zinc-500">
              RECOMMENDED_ITEMS
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {recentItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => openWindow(item.app)}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/10 text-left transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                    <FileCode className="w-4 h-4 text-cyan-500" />
                  </div>
                  <div className="truncate">
                    <div className="font-bold text-[11px] text-zinc-800 dark:text-zinc-200 truncate group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-zinc-400 truncate">{item.type}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Bottom User Bar & Power Controls */}
      <div className="p-3.5 sm:px-6 bg-zinc-100/80 dark:bg-[#0c0d12]/90 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between font-mono text-xs shrink-0 relative">
        <button
          onClick={() => openWindow("about")}
          className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 text-left transition-colors"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-cyan-500 shadow-sm shrink-0">
            <img src="/vv.webp" alt="Elias Yirga" className="w-full h-full object-cover" />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-zinc-900 dark:text-white text-xs">Elias Yirga</div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">● Engineer Online</div>
          </div>
        </button>

        {/* Power Menu Button */}
        <div className="relative">
          <button
            onClick={() => setPowerMenuOpen(!powerMenuOpen)}
            className="p-2 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            title="Power & Lock Options"
          >
            <Power className="w-4 h-4 text-rose-500" />
          </button>

          {powerMenuOpen && (
            <div className="absolute right-0 bottom-12 w-44 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-2xl p-1.5 space-y-1 z-50 text-xs font-mono animate-in zoom-in-95 duration-100">
              <button
                onClick={() => {
                  setPowerMenuOpen(false);
                  lockSystem();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-left text-zinc-800 dark:text-zinc-200"
              >
                <Lock className="w-3.5 h-3.5 text-cyan-500" />
                <span>Lock Screen</span>
              </button>
              <button
                onClick={() => {
                  setPowerMenuOpen(false);
                  window.location.reload();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-left text-zinc-800 dark:text-zinc-200"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
                <span>Restart Session</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
