import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Code2,
  FileText,
  Sun,
  Moon,
  Laptop,
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { projects } from "@/data/projects";

export const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Scroll helper
  const scrollToSection = (id) => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(id);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.querySelector(id);
      el?.scrollIntoView({ behavior: "smooth" });
    }
    onClose();
  };

  // Build command groups
  const navigationItems = [
    { id: "nav-hero", title: "Overview & Workstation Top", group: "Navigation", icon: Sparkles, action: () => scrollToSection("#hero") },
    { id: "nav-about", title: "About Elias & Engineering Philosophy", group: "Navigation", icon: FileText, action: () => scrollToSection("#about") },
    { id: "nav-projects", title: "Projects & RFC Case Studies", group: "Navigation", icon: Code2, action: () => scrollToSection("#projects") },
    { id: "nav-skills", title: "Technical Capabilities Matrix", group: "Navigation", icon: Code2, action: () => scrollToSection("#skills") },
    { id: "nav-experience", title: "Engineering Career Timeline", group: "Navigation", icon: FileText, action: () => scrollToSection("#experience") },
    { id: "nav-credentials", title: "Certificates & Credentials", group: "Navigation", icon: FileText, action: () => scrollToSection("#certificates") },
    { id: "nav-contact", title: "Contact & Communications", group: "Navigation", icon: Mail, action: () => scrollToSection("#contact") },
  ];

  const projectItems = projects.map((p) => ({
    id: `proj-${p.id}`,
    title: `${p.title} — ${p.headline}`,
    group: "Case Studies (RFC)",
    icon: Code2,
    badge: p.year,
    action: () => {
      navigate(`/projects/${p.slug}`);
      onClose();
    },
  }));

  const themeItems = [
    { id: "theme-dark", title: "Switch to Dark Mode", group: "Preferences", icon: Moon, action: () => { setTheme("dark"); onClose(); } },
    { id: "theme-light", title: "Switch to Light Mode", group: "Preferences", icon: Sun, action: () => { setTheme("light"); onClose(); } },
    { id: "theme-system", title: "Use System Theme", group: "Preferences", icon: Laptop, action: () => { setTheme("system"); onClose(); } },
  ];

  const externalItems = [
    { id: "ext-github", title: "GitHub Profile (@eliasyirga)", group: "External Links", icon: Github, action: () => window.open("https://github.com/eliasyirga", "_blank") },
    { id: "ext-linkedin", title: "LinkedIn Profile", group: "External Links", icon: Linkedin, action: () => window.open("https://linkedin.com/in/elias-yirga-44a19b2a7", "_blank") },
    { id: "ext-email", title: "Send Email (eliasyirga575@gmail.com)", group: "External Links", icon: Mail, action: () => window.location.href = "mailto:eliasyirga575@gmail.com" },
  ];

  const allItems = [...navigationItems, ...projectItems, ...themeItems, ...externalItems];

  const filteredItems = query.trim() === ""
    ? allItems
    : allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.group.toLowerCase().includes(query.toLowerCase())
      );


  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-start justify-center pt-16 sm:pt-24 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl z-10 overflow-hidden"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 border-b border-zinc-200 dark:border-zinc-800">
              <Search className="w-4 h-4 text-zinc-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search architectures..."
                className="w-full bg-transparent px-3 py-3.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none font-sans"
              />
              <kbd className="hidden sm:inline-block font-mono text-[10px] text-zinc-400 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-1.5 py-0.5 rounded">
                ESC
              </kbd>
            </div>

            {/* Command Results */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-xs text-zinc-500 font-mono">
                  No matching commands found.
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredItems.map((item, idx) => {
                    const isSelected = idx === selectedIndex;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-xs transition-colors ${
                          isSelected
                            ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Icon className="w-4 h-4 shrink-0 text-zinc-400" />
                          <span className="truncate font-medium">{item.title}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                            {item.group}
                          </span>
                          {isSelected && <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Shortcut Hints */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 text-[11px] font-mono text-zinc-400">
              <div className="flex items-center gap-3">
                <span>
                  <kbd className="bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded text-[10px]">↑</kbd>
                  <kbd className="bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded text-[10px] ml-1">↓</kbd> navigate
                </span>
                <span>
                  <kbd className="bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded text-[10px]">↵</kbd> select
                </span>
              </div>
              <span className="text-[10px]">Command Palette</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
