import React, { useState, useEffect } from "react";
import { WindowsOSProvider } from "../context/WindowsOSContext";
import { WindowsDesktop } from "../Components/windows/WindowsDesktop";
import { FloatingNavbar } from "../Components/layout/FloatingNavbar";
import { ModernFooter } from "../Components/layout/ModernFooter";
import { HeroSection } from "../Components/sections/HeroSection";
import { AboutSection } from "../Components/sections/AboutSection";
import { BentoProjectsSection } from "../Components/sections/BentoProjectsSection";
import { SkillsBentoSection } from "../Components/sections/SkillsBentoSection";
import { ExperienceTimelineSection } from "../Components/sections/ExperienceTimelineSection";
import { CertificatesSection } from "../Components/sections/CertificatesSection";
import { ContactSection } from "../Components/sections/ContactSection";
import { ProjectModal } from "../Components/features/ProjectModal";
import { CommandPalette } from "../Components/features/command-palette/CommandPalette";
import { LayoutGrid } from "lucide-react";

export const HomePage = () => {
  // Only "windows" (Windows 11 Desktop) and "stream" (Full-page scroll showcase)
  const [layoutMode, setLayoutMode] = useState("windows"); // "windows" | "stream"
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Global hotkey listener for Cmd+K / Ctrl+K and custom event
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    const handleCustomOpen = () => setCommandPaletteOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, []);

  return (
    <div>
      {/* View Mode Switcher Floating Pill */}
      <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-[99990] flex items-center gap-1 p-1 rounded-2xl bg-white/95 dark:bg-[#12141c]/95 border border-zinc-300 dark:border-zinc-800 shadow-2xl font-mono text-[10px] sm:text-[11px] select-none">
        {/* Windows 11 OS Mode */}
        <button
          onClick={() => setLayoutMode("windows")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
            layoutMode === "windows"
              ? "bg-cyan-600 text-white font-bold shadow-md scale-102"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
          title="Microsoft Windows 11 Desktop Mode"
        >
          {/* Windows 11 4-tile logo SVG */}
          <svg className="w-3.5 h-3.5 fill-current text-cyan-200" viewBox="0 0 24 24">
            <path d="M0 0h11v11H0zM13 0h11v11H13zM0 13h11v11H0zM13 13h11v11H13z" />
          </svg>
          <span>WINDOWS 11</span>
        </button>

        {/* Classic Scroll Stream */}
        <button
          onClick={() => setLayoutMode("stream")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
            layoutMode === "stream"
              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-md scale-102"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
          title="Classic Full Page Portfolio Stream"
        >
          <LayoutGrid className="w-3.5 h-3.5 text-emerald-500" />
          <span>STREAM</span>
        </button>
      </div>

      {/* Render selected experience */}
      {layoutMode === "windows" ? (
        <WindowsOSProvider>
          <WindowsDesktop />
        </WindowsOSProvider>
      ) : (
        <div className="min-h-screen bg-tech-grid-light dark:bg-tech-grid-dark bg-[#f8fafc] dark:bg-[#09090b] bg-ambient-mesh text-zinc-900 dark:text-zinc-100 selection:bg-cyan-500 selection:text-white dark:selection:bg-cyan-400 dark:selection:text-zinc-950">
          <FloatingNavbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
          <main className="space-y-4">
            <HeroSection onSelectProject={(p) => setActiveProjectModal(p)} />
            <AboutSection />
            <BentoProjectsSection onSelectProject={(p) => setActiveProjectModal(p)} />
            <SkillsBentoSection />
            <ExperienceTimelineSection />
            <CertificatesSection />
            <ContactSection />
          </main>
          <ModernFooter />
          {activeProjectModal && (
            <ProjectModal project={activeProjectModal} onClose={() => setActiveProjectModal(null)} />
          )}
        </div>
      )}

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </div>
  );
};

export default HomePage;


