import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { WorkstationToolbar } from "./WorkstationToolbar";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export const DualPaneLayout = ({ activeId, onSelect, children }) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      {/* Mobile Top Header */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-zinc-900 dark:text-zinc-100 font-sans">ELIAS YIRGA</span>
          <span className="text-zinc-400 text-[11px]">// DOSSIER</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded border border-zinc-200 dark:border-zinc-800"
            aria-label="Toggle Theme Mode"
          >
            {resolvedTheme === "dark" ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-sky-600" />}
          </button>

          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-xs font-semibold"
          >
            {mobileDrawerOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span>TREE</span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-start">
          <div className="w-80 max-w-[85vw] h-full bg-white dark:bg-zinc-950 shadow-2xl">
            <Sidebar
              activeId={activeId}
              onSelect={onSelect}
              onCloseMobile={() => setMobileDrawerOpen(false)}
            />
          </div>
          <div className="flex-1" onClick={() => setMobileDrawerOpen(false)} />
        </div>
      )}

      {/* Desktop Left Sticky Pane (320px) */}
      <div className="hidden lg:block w-80 shrink-0 h-screen sticky top-0 z-30">
        <Sidebar activeId={activeId} onSelect={onSelect} />
      </div>

      {/* Right Work Area Pane with Toolbar */}
      <main className="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-6 overflow-y-auto">
        <WorkstationToolbar activeId={activeId} />
        {children}
      </main>
    </div>
  );
};

export default DualPaneLayout;
