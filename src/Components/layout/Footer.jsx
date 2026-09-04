import React from "react";
import { ArrowUp, Github, Linkedin, Mail, Terminal } from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/80 py-12 px-4 sm:px-6 lg:px-8 font-mono text-xs text-zinc-500 dark:text-zinc-400">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-zinc-200 dark:border-zinc-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                Elias Yirga — Software Engineer
              </div>
              <div className="text-[11px] text-zinc-400">
                Distributed architectures • Performance engineering
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/eliasyirga"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <a
              href="https://linkedin.com/in/eliasyirga"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <a
              href="mailto:eliasyirga575@gmail.com"
              className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-zinc-400">
          <div>
            <span>© {new Date().getFullYear()} Elias Yirga. All rights reserved. Built with React & Vite.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Systems Operational (100% Uptime)
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
