import React from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Github, Linkedin, Mail, FileText, Activity, Terminal, ShieldCheck } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { SystemTree } from "@/components/dossier/SystemTree";

export const Sidebar = ({ activeId, onSelect, onCloseMobile }) => {
  const { resolvedTheme, toggleTheme } = useTheme();

  const handleSelect = (id) => {
    onSelect(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside className="w-full h-full flex flex-col justify-between bg-zinc-50/80 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 font-mono text-xs select-none">
      {/* 1. Developer Identification & Theme Switcher */}
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-zinc-900 dark:text-zinc-100 font-sans tracking-tight text-sm">
              ELIAS YIRGA
            </span>
          </div>

          {/* Instant Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            title={`Switch to ${resolvedTheme === "dark" ? "Light" : "Dark"} Mode`}
            aria-label="Toggle Theme Mode"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-sky-600" />
            )}
          </button>
        </div>

        <div className="text-[11px] text-zinc-500 space-y-1">
          <div>Systems &amp; Frontend Architect</div>
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
            <ShieldCheck className="w-3 h-3" />
            <span>[AVAILABLE FOR CONTRACT / 2026]</span>
          </div>
        </div>
      </div>

      {/* 2. Interactive System Tree (Workstation Navigation) */}
      <div className="flex-1 overflow-hidden">
        <SystemTree activeId={activeId} onSelect={handleSelect} />
      </div>

      {/* 3. Bottom Utility Bar: Contact, Resume & Channels */}
      <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 space-y-2 text-[11px]">
        <div className="flex items-center justify-between text-zinc-500">
          <a
            href="/Elias_Yirga_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-zinc-700 dark:text-zinc-300 hover:text-sky-600 dark:hover:text-sky-400 font-bold"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV.PDF</span>
          </a>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/eliasyirga"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white"
              title="GitHub"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://linkedin.com/in/eliasyirga"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white"
              title="LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href="mailto:eliasyirga575@gmail.com"
              className="hover:text-zinc-900 dark:hover:text-white"
              title="Email"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
