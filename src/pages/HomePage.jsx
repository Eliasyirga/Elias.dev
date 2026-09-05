import React, { useState } from "react";
import { CommandCenterWorkbench } from "../Components/layout/CommandCenterWorkbench";
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
import { LayoutGrid, Terminal } from "lucide-react";

export const HomePage = () => {
  const [layoutMode, setLayoutMode] = useState("workbench"); // "workbench" (Developer Command Center OS) or "stream" (Full-page scroll)
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  return (
    <div>
      {/* View Mode Switcher Floating Pill */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 p-1 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-300 dark:border-white/15 shadow-2xl font-mono text-[11px]">
        <button
          onClick={() => setLayoutMode("workbench")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
            layoutMode === "workbench"
              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-md"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <Terminal className="w-3.5 h-3.5 text-cyan-400 dark:text-cyan-600" />
          <span>OS_WORKBENCH</span>
        </button>

        <button
          onClick={() => setLayoutMode("stream")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
            layoutMode === "stream"
              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-md"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5 text-emerald-500" />
          <span>SHOWCASE_STREAM</span>
        </button>
      </div>

      {layoutMode === "workbench" ? (
        <CommandCenterWorkbench />
      ) : (
        <div className="min-h-screen bg-tech-grid-light dark:bg-tech-grid-dark bg-[#f8fafc] dark:bg-[#09090b] bg-ambient-mesh text-zinc-900 dark:text-zinc-100 selection:bg-cyan-500 selection:text-white dark:selection:bg-cyan-400 dark:selection:text-zinc-950">
          <FloatingNavbar />
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
    </div>
  );
};

export default HomePage;

