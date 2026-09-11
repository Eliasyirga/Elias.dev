import React, { useState, useEffect } from "react";
import { useWindowsOS, APP_REGISTRY } from "../../context/WindowsOSContext";
import { getAppIcon } from "./WindowFrame";
import { useTheme } from "../../context/ThemeContext";
import {
  Search,
  Wifi,
  Volume2,
  VolumeX,
  Battery,
  Sun,
  Moon,
  FolderGit2,
  Terminal,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Gauge,
  Mail,
  Settings,
  ShieldCheck,
} from "lucide-react";

export const WindowsTaskbar = () => {
  const {
    windows,
    activeWindowId,
    openWindow,
    focusWindow,
    minimizeWindow,
    startMenuOpen,
    toggleStartMenu,
    calendarOpen,
    toggleCalendar,
    soundEnabled,
    setSoundEnabled,
  } = useWindowsOS();
  const { theme, toggleTheme } = useTheme();

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        })
      );
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  // Pinned taskbar quick launch apps
  const pinnedAppIds = ["projects", "terminal", "cv", "about", "experience", "education", "benchmark", "contact"];

  // Open window instances
  const openWindowList = Object.values(windows).filter((w) => w.isOpen);

  // Handle clicking taskbar app icon
  const handleAppClick = (appId) => {
    const win = windows[appId];
    if (!win || !win.isOpen) {
      openWindow(appId);
    } else if (win.isMinimized) {
      focusWindow(appId);
    } else if (activeWindowId === appId) {
      minimizeWindow(appId);
    } else {
      focusWindow(appId);
    }
  };

  return (
    <footer className="fixed bottom-0 inset-x-0 h-12 z-[9995] bg-white/75 dark:bg-[#101218]/85 backdrop-blur-2xl border-t border-zinc-300/40 dark:border-white/10 flex items-center justify-between px-2 sm:px-3 text-zinc-900 dark:text-zinc-100 font-sans select-none shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
      
      {/* Left: Weather / Portfolio Status Widget */}
      <div className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/40 dark:hover:bg-white/10 transition-colors font-mono text-[11px] cursor-pointer"
        onClick={() => openWindow("about")}
      >
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-bold text-zinc-800 dark:text-zinc-200">EliasOS 11</span>
        <span className="text-zinc-400 text-[10px] hidden lg:inline">:: RECRUITER READY</span>
      </div>

      {/* Center: Windows 11 Taskbar Icons (Start, Search, Pinned, Running) */}
      <div className="flex-1 md:flex-initial flex items-center justify-center gap-1 sm:gap-1.5 h-full">
        
        {/* Windows 11 Start Button */}
        <button
          onClick={toggleStartMenu}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            startMenuOpen
              ? "bg-cyan-500/20 text-cyan-500 shadow-inner scale-95"
              : "hover:bg-zinc-200/70 dark:hover:bg-white/10 text-cyan-500 active:scale-90"
          }`}
          title="Start Menu (Win)"
        >
          {/* Windows 11 Blue 4-tile logo SVG */}
          <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0 0h11v11H0zM13 0h11v11H13zM0 13h11v11H0zM13 13h11v11H13z" />
          </svg>
        </button>

        {/* Taskbar Apps List */}
        {pinnedAppIds.map((appId) => {
          const app = APP_REGISTRY[appId];
          if (!app) return null;

          const win = windows[appId];
          const isOpen = win && win.isOpen;
          const isActive = isOpen && activeWindowId === appId && !win.isMinimized;

          return (
            <button
              key={appId}
              onClick={() => handleAppClick(appId)}
              className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all group ${
                isActive
                  ? "bg-zinc-200 dark:bg-white/15 shadow-sm scale-102"
                  : isOpen
                  ? "bg-zinc-100/80 dark:bg-white/5 hover:bg-zinc-200/80 dark:hover:bg-white/10"
                  : "hover:bg-zinc-200/60 dark:hover:bg-white/10 active:scale-95"
              }`}
              title={app.title}
            >
              <div className="transition-transform group-hover:scale-110">
                {getAppIcon(app.icon, "w-5 h-5")}
              </div>

              {/* Running indicator pill / dot underneath */}
              {isOpen && (
                <span
                  className={`absolute bottom-1 h-1 rounded-full transition-all ${
                    isActive
                      ? "w-4 bg-cyan-500 shadow-sm"
                      : "w-1.5 bg-zinc-400 dark:bg-zinc-500"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Right: System Tray & Clock */}
      <div className="flex items-center gap-1 h-full font-mono text-xs">
        
        {/* Tray status icons */}
        <div className="hidden sm:flex items-center gap-1 px-1.5 py-1 rounded-lg hover:bg-zinc-200/50 dark:hover:bg-white/5 transition-colors">
          <div className="p-1 text-emerald-500" title="Online 1 Gbps">
            <Wifi className="w-3.5 h-3.5" />
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            title={soundEnabled ? "Mute Sounds" : "Unmute Sounds"}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={toggleTheme}
            className="p-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            title="Toggle Dark/Light Mode"
          >
            {theme === "dark" ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-500" />}
          </button>
        </div>

        {/* Date & Time Flyout Trigger */}
        <button
          onClick={toggleCalendar}
          className={`flex flex-col items-end px-2.5 py-1 rounded-lg transition-all ${
            calendarOpen
              ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400"
              : "hover:bg-zinc-200/70 dark:hover:bg-white/10"
          }`}
          title="Date and Time"
        >
          <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 leading-tight">
            {time || "12:00"}
          </span>
          <span className="text-[10px] text-zinc-500 leading-tight">
            {date || "9/11/2026"}
          </span>
        </button>

        {/* Show Desktop Peek Bar (at the extreme right) */}
        <div
          onClick={() => {
            // Minimize all open windows
            Object.keys(windows).forEach((id) => {
              if (windows[id]?.isOpen) minimizeWindow(id);
            });
          }}
          className="w-1.5 h-7 my-auto ml-1 border-l border-zinc-400/40 dark:border-white/20 hover:bg-cyan-500/30 cursor-pointer transition-colors"
          title="Show Desktop"
        />
      </div>
    </footer>
  );
};
