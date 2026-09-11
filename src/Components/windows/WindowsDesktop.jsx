import React, { useState } from "react";
import { useWindowsOS, APP_REGISTRY } from "../../context/WindowsOSContext";
import { WindowFrame, getAppIcon } from "./WindowFrame";
import { WindowsTaskbar } from "./WindowsTaskbar";
import { WindowsStartMenu } from "./WindowsStartMenu";
import { WindowsCalendarFlyout } from "./WindowsCalendarFlyout";
import { WindowsLockScreen } from "./WindowsLockScreen";

// Apps
import { ProjectsApp } from "./apps/ProjectsApp";
import { TerminalApp } from "./apps/TerminalApp";
import { ExperienceApp } from "./apps/ExperienceApp";
import { EducationCertsApp } from "./apps/EducationCertsApp";
import { CvViewerApp } from "./apps/CvViewerApp";
import { AboutApp } from "./apps/AboutApp";
import { ContactApp } from "./apps/ContactApp";
import { SettingsApp } from "./apps/SettingsApp";
import { BenchmarkApp } from "./apps/BenchmarkApp";
import { TrashApp } from "./apps/TrashApp";

import {
  Palette,
  Terminal,
  FolderGit2,
  Lock,
  RotateCcw,
  Sparkles,
  Info,
} from "lucide-react";

export const WindowsDesktop = () => {
  const {
    windows,
    openWindow,
    wallpaper,
    closeAllFlyouts,
    lockSystem,
  } = useWindowsOS();

  const [selectedIconId, setSelectedIconId] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);

  // Desktop Icons Configuration
  const desktopIcons = [
    { id: "projects", label: "Projects Explorer", icon: "FolderGit2" },
    { id: "terminal", label: "Windows Terminal", icon: "Terminal" },
    { id: "experience", label: "Experience", icon: "Briefcase" },
    { id: "education", label: "Education & Certs", icon: "GraduationCap" },
    { id: "cv", label: "Resume (CV.pdf)", icon: "FileText" },
    { id: "about", label: "About Elias", icon: "User" },
    { id: "benchmark", label: "Benchmark Lab", icon: "Gauge" },
    { id: "contact", label: "Contact Mail", icon: "Mail" },
    { id: "settings", label: "Settings", icon: "Settings" },
    { id: "trash", label: "Recycle Bin", icon: "Trash2" },
  ];

  const handleDesktopClick = (e) => {
    if (e.target === e.currentTarget || e.target.classList.contains("desktop-canvas")) {
      setSelectedIconId(null);
      setContextMenu(null);
      closeAllFlyouts();
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    closeAllFlyouts();
    setContextMenu({
      x: Math.min(e.clientX, window.innerWidth - 220),
      y: Math.min(e.clientY, window.innerHeight - 240),
    });
  };

  const handleIconClick = (id) => {
    setSelectedIconId(id);
  };

  const handleIconDoubleClick = (id) => {
    openWindow(id);
    setSelectedIconId(null);
  };

  return (
    <div
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
      className="desktop-canvas relative w-screen h-screen overflow-hidden select-none bg-cover bg-center font-sans"
      style={{
        backgroundImage: `url(${wallpaper.src || "/walleper.png"})`,
      }}
    >
      {/* Subtle Backdrop Darkening */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* 1. DESKTOP ICONS GRID (Left Aligned Column) */}
      <div className="relative z-10 p-4 pt-6 grid grid-flow-col grid-rows-6 sm:grid-rows-5 gap-3 w-max h-[calc(100vh-60px)]">
        {desktopIcons.map((item) => {
          const isSelected = selectedIconId === item.id;
          return (
            <div
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                handleIconClick(item.id);
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                handleIconDoubleClick(item.id);
              }}
              onTouchEnd={() => {
                // Easy touch launch on mobile
                openWindow(item.id);
              }}
              className={`w-24 h-24 p-2 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                isSelected
                  ? "bg-white/25 dark:bg-white/20 border border-cyan-400/50 shadow-md backdrop-blur-sm"
                  : "hover:bg-white/15 dark:hover:bg-white/10 border border-transparent"
              } group`}
            >
              <div className="w-11 h-11 flex items-center justify-center filter drop-shadow-md group-hover:scale-110 transition-transform">
                {getAppIcon(item.icon, "w-8 h-8")}
              </div>
              <span className="mt-1 text-[11px] font-medium text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] line-clamp-2 leading-tight px-1 rounded">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* 2. ACTIVE WINDOWS CANVAS */}
      <div className="relative z-20 pointer-events-none [&>*]:pointer-events-auto">
        {/* Projects Explorer */}
        <WindowFrame windowId="projects">
          <ProjectsApp />
        </WindowFrame>

        {/* Windows Terminal */}
        <WindowFrame windowId="terminal">
          <TerminalApp />
        </WindowFrame>

        {/* Experience App */}
        <WindowFrame windowId="experience">
          <ExperienceApp />
        </WindowFrame>

        {/* Education & Certs App */}
        <WindowFrame windowId="education">
          <EducationCertsApp />
        </WindowFrame>

        {/* CV / Resume Viewer */}
        <WindowFrame windowId="cv">
          <CvViewerApp />
        </WindowFrame>

        {/* About Elias */}
        <WindowFrame windowId="about">
          <AboutApp />
        </WindowFrame>

        {/* Benchmark Lab */}
        <WindowFrame windowId="benchmark">
          <BenchmarkApp />
        </WindowFrame>

        {/* Contact Mail */}
        <WindowFrame windowId="contact">
          <ContactApp />
        </WindowFrame>

        {/* Settings */}
        <WindowFrame windowId="settings">
          <SettingsApp />
        </WindowFrame>

        {/* Recycle Bin */}
        <WindowFrame windowId="trash">
          <TrashApp />
        </WindowFrame>
      </div>

      {/* 3. RIGHT-CLICK DESKTOP CONTEXT MENU */}
      {contextMenu && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }}
          className="fixed z-[99999] w-52 rounded-xl bg-white/95 dark:bg-[#161822]/95 backdrop-blur-2xl border border-zinc-300 dark:border-white/15 shadow-2xl p-1.5 space-y-1 text-xs font-mono text-zinc-800 dark:text-zinc-200 animate-in zoom-in-95 duration-100 select-none"
        >
          <button
            onClick={() => {
              openWindow("terminal");
              setContextMenu(null);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/10 text-left transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-500" />
            <span>Open PowerShell</span>
          </button>

          <button
            onClick={() => {
              openWindow("projects");
              setContextMenu(null);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/10 text-left transition-colors"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-amber-500" />
            <span>Inspect 8 RFCs</span>
          </button>

          <button
            onClick={() => {
              openWindow("settings");
              setContextMenu(null);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/10 text-left transition-colors"
          >
            <Palette className="w-3.5 h-3.5 text-purple-500" />
            <span>Change Wallpaper</span>
          </button>

          <div className="my-1 border-t border-zinc-200 dark:border-white/10" />

          <button
            onClick={() => {
              openWindow("about");
              setContextMenu(null);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/10 text-left transition-colors"
          >
            <Info className="w-3.5 h-3.5 text-blue-500" />
            <span>System Properties</span>
          </button>

          <button
            onClick={() => {
              setContextMenu(null);
              lockSystem();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/10 text-left transition-colors"
          >
            <Lock className="w-3.5 h-3.5 text-rose-500" />
            <span>Lock Screen</span>
          </button>
        </div>
      )}

      {/* 4. WINDOWS 11 START MENU */}
      <WindowsStartMenu />

      {/* 5. WINDOWS CALENDAR FLYOUT */}
      <WindowsCalendarFlyout />

      {/* 6. WINDOWS 11 TASKBAR */}
      <WindowsTaskbar />

      {/* 7. LOCK & WELCOME SIGN-IN SCREEN */}
      <WindowsLockScreen />
    </div>
  );
};
