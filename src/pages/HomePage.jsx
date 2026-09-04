import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
import { projects } from "../data/projects";

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  useEffect(() => {
    const rfcParam = searchParams.get("rfc") || searchParams.get("doc") || searchParams.get("project");
    if (rfcParam) {
      const found = projects.find(
        (p) => p.slug === rfcParam || p.id === rfcParam || p.rfcId?.toLowerCase() === rfcParam.toLowerCase()
      );
      if (found) {
        setActiveProjectModal(found);
      }
    }
  }, [searchParams]);

  const handleSelectProject = (project) => {
    setActiveProjectModal(project);
    setSearchParams({ rfc: project.slug || project.id });
  };

  const handleCloseModal = () => {
    setActiveProjectModal(null);
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-tech-grid-light dark:bg-tech-grid-dark bg-[#f8fafc] dark:bg-[#09090b] bg-ambient-mesh text-zinc-900 dark:text-zinc-100 selection:bg-cyan-500 selection:text-white dark:selection:bg-cyan-400 dark:selection:text-zinc-950">
      {/* Precision Floating Header */}
      <FloatingNavbar />

      {/* Main Single Page Content Flow */}
      <main className="space-y-4">
        <HeroSection onSelectProject={handleSelectProject} />
        <AboutSection />
        <BentoProjectsSection onSelectProject={handleSelectProject} />
        <SkillsBentoSection />
        <ExperienceTimelineSection />
        <CertificatesSection />
        <ContactSection />
      </main>

      {/* High-Density Footer */}
      <ModernFooter />

      {/* Technical RFC Inspector Modal */}
      {activeProjectModal && (
        <ProjectModal
          project={activeProjectModal}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default HomePage;
