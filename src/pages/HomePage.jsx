import React, { useState, useEffect } from "react";
import { TerminalCommandView } from "../Components/features/terminal/TerminalCommandView";
import { FloatingNavbar } from "../Components/layout/FloatingNavbar";
import { ModernFooter } from "../Components/layout/ModernFooter";
import { HeroSection } from "../Components/sections/HeroSection";
import { TechMarqueeSection } from "../Components/sections/TechMarqueeSection";
import { AboutSection } from "../Components/sections/AboutSection";
import { BentoProjectsSection } from "../Components/sections/BentoProjectsSection";
import { SkillsBentoSection } from "../Components/sections/SkillsBentoSection";
import { ExperienceTimelineSection } from "../Components/sections/ExperienceTimelineSection";
import { CertificatesSection } from "../Components/sections/CertificatesSection";
import { ContactSection } from "../Components/sections/ContactSection";
import { ProjectModal } from "../Components/features/ProjectModal";
import { CommandPalette } from "../Components/features/command-palette/CommandPalette";
import { LayoutGrid, Terminal } from "lucide-react";

export const HomePage = () => {
  // layoutMode: "stream" (default streamline scroll portfolio) | "terminal" (desktop interactive terminal)
  const [layoutMode, setLayoutMode] = useState("stream");
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  // Track window resizing for mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        // Mobile only allows streamline portfolio
        setLayoutMode("stream");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // When on mobile, always force stream mode
  const effectiveMode = isMobile ? "stream" : layoutMode;

  return (
    <div className="relative selection:bg-cyan-500 selection:text-white dark:selection:bg-cyan-400 dark:selection:text-zinc-950">
      {/* View Mode Switcher Floating Pill: ONLY on desktop (hidden on mobile) */}
      {!isMobile && (
        <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-[99990] hidden md:flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/85 dark:bg-[#11131a]/85 backdrop-blur-xl border border-zinc-200/80 dark:border-white/10 shadow-2xl font-mono text-[10px] sm:text-[11px] select-none ring-1 ring-black/5 dark:ring-white/5">
          {/* Classic Scroll Stream */}
          <button
            onClick={() => setLayoutMode("stream")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all duration-200 ${
              effectiveMode === "stream"
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-md scale-102"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
            title="Standard Streamline Portfolio View"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-emerald-500" />
            <span>STREAM</span>
          </button>

          {/* Interactive Terminal Command Mode */}
          <button
            onClick={() => setLayoutMode("terminal")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all duration-200 ${
              effectiveMode === "terminal"
                ? "bg-cyan-600 text-white font-bold shadow-md scale-102"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
            title="Interactive Developer Terminal Command Mode"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-300" />
            <span>TERMINAL</span>
          </button>
        </div>
      )}

      {/* Render selected experience */}
      {effectiveMode === "terminal" ? (
        <TerminalCommandView
          onSwitchToStream={() => setLayoutMode("stream")}
          onSelectProject={(p) => setActiveProjectModal(p)}
        />
      ) : (
        <div className="min-h-screen w-full overflow-x-hidden bg-[#f8fafc] dark:bg-[#09090b] bg-tech-grid text-zinc-900 dark:text-zinc-100 relative">
          {/* Subtle Ambient Background Gradient Lighting Orbs */}
          <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
            <div className="absolute top-[8%] left-[12%] w-[450px] h-[450px] rounded-full bg-cyan-500/5 dark:bg-cyan-500/10 blur-[120px]" />
            <div className="absolute top-[42%] right-[10%] w-[550px] h-[550px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/8 blur-[140px]" />
            <div className="absolute top-[72%] left-[18%] w-[500px] h-[500px] rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 blur-[130px]" />
          </div>

          <FloatingNavbar
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
            onSwitchToTerminal={!isMobile ? () => setLayoutMode("terminal") : undefined}
          />

          <main className="space-y-6 sm:space-y-10">
            <HeroSection
              onSelectProject={(p) => setActiveProjectModal(p)}
              onSwitchToTerminal={!isMobile ? () => setLayoutMode("terminal") : undefined}
            />
            <TechMarqueeSection />
            <AboutSection />
            <BentoProjectsSection onSelectProject={(p) => setActiveProjectModal(p)} />
            <SkillsBentoSection />
            <ExperienceTimelineSection />
            <CertificatesSection />
            <ContactSection />
          </main>

          <ModernFooter />
        </div>
      )}

      {/* Project Modal for interactive RFC exploration */}
      {activeProjectModal && (
        <ProjectModal
          project={activeProjectModal}
          onClose={() => setActiveProjectModal(null)}
        />
      )}

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSwitchToTerminal={!isMobile ? () => setLayoutMode("terminal") : undefined}
      />
    </div>
  );
};

export default HomePage;
