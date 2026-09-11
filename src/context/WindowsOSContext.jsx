import React, { createContext, useContext, useState, useEffect } from "react";

const WindowsOSContext = createContext(null);

export const APP_REGISTRY = {
  projects: {
    id: "projects",
    title: "Projects Explorer",
    shortTitle: "Projects",
    icon: "FolderGit2",
    defaultSize: { width: 920, height: 620 },
    defaultPos: { x: 100, y: 50 },
    category: "Development",
  },
  terminal: {
    id: "terminal",
    title: "Windows PowerShell // elias@system",
    shortTitle: "Terminal",
    icon: "Terminal",
    defaultSize: { width: 780, height: 500 },
    defaultPos: { x: 160, y: 110 },
    category: "System",
  },
  experience: {
    id: "experience",
    title: "Experience & Career Milestones",
    shortTitle: "Experience",
    icon: "Briefcase",
    defaultSize: { width: 860, height: 580 },
    defaultPos: { x: 120, y: 70 },
    category: "Career",
  },
  education: {
    id: "education",
    title: "Education & Accreditations",
    shortTitle: "Education",
    icon: "GraduationCap",
    defaultSize: { width: 880, height: 600 },
    defaultPos: { x: 140, y: 80 },
    category: "Education",
  },
  cv: {
    id: "cv",
    title: "Curriculum Vitae (PDF Viewer)",
    shortTitle: "Resume / CV",
    icon: "FileText",
    defaultSize: { width: 840, height: 640 },
    defaultPos: { x: 180, y: 60 },
    category: "Documents",
  },
  about: {
    id: "about",
    title: "About Elias Yirga // System Properties",
    shortTitle: "About Me",
    icon: "User",
    defaultSize: { width: 820, height: 560 },
    defaultPos: { x: 130, y: 90 },
    category: "Personal",
  },
  benchmark: {
    id: "benchmark",
    title: "Live PostGIS & Query Benchmark Lab",
    shortTitle: "Benchmark Lab",
    icon: "Gauge",
    defaultSize: { width: 800, height: 540 },
    defaultPos: { x: 200, y: 100 },
    category: "Performance",
  },
  contact: {
    id: "contact",
    title: "Outlook Transmission Hub // Direct Mail",
    shortTitle: "Contact Mail",
    icon: "Mail",
    defaultSize: { width: 740, height: 540 },
    defaultPos: { x: 220, y: 120 },
    category: "Communication",
  },
  settings: {
    id: "settings",
    title: "Windows Settings // Personalization",
    shortTitle: "Settings",
    icon: "Settings",
    defaultSize: { width: 760, height: 520 },
    defaultPos: { x: 170, y: 100 },
    category: "System",
  },
  trash: {
    id: "trash",
    title: "Recycle Bin",
    shortTitle: "Recycle Bin",
    icon: "Trash2",
    defaultSize: { width: 620, height: 420 },
    defaultPos: { x: 240, y: 140 },
    category: "System",
  },
};

export const WALLPAPERS = [
  { id: "custom-walleper", name: "Custom Desktop", src: "/walleper.png", type: "image" },
  { id: "win11-bloom", name: "Windows 11 Bloom (Dark)", src: "/back3.webp", type: "image" },
  { id: "win11-hero", name: "Aurora Cyan", src: "/back.webp", type: "image" },
  { id: "win11-abstract", name: "Cyber Matrix", src: "/back5.webp", type: "image" },
  { id: "win11-minimal", name: "Minimal Slate", src: "/back2.webp", type: "image" },
  { id: "win11-sunset", name: "Deep Horizon", src: "/back4.webp", type: "image" },
];

export const WindowsOSProvider = ({ children }) => {
  // Lock screen state: "locked" | "signing_in" | "unlocked"
  const [lockState, setLockState] = useState("locked");
  
  // Windows state map
  const [windows, setWindows] = useState({
    about: {
      ...APP_REGISTRY.about,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: 70, y: 50 },
      size: { width: 840, height: 560 },
    },
    projects: {
      ...APP_REGISTRY.projects,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 9,
      position: { x: 110, y: 70 },
      size: { width: 920, height: 600 },
    },
    terminal: {
      ...APP_REGISTRY.terminal,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 8,
      position: { x: 160, y: 100 },
      size: { width: 780, height: 480 },
    },
  });

  const [activeWindowId, setActiveWindowId] = useState("about");
  const [topZIndex, setTopZIndex] = useState(15);
  const [wallpaper, setWallpaper] = useState(WALLPAPERS[0]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [quickSettingsOpen, setQuickSettingsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accentColor, setAccentColor] = useState("#0ea5e9"); // Sky / Windows Cyan

  // Audio Play helper (simple synthetic Web Audio API beeps/tones for authentic OS sounds)
  const playSound = (type = "click") => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "unlock") {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === "open") {
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === "close") {
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      }
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  const openWindow = (id, extraProps = {}) => {
    playSound("open");
    setStartMenuOpen(false);
    setSearchOpen(false);

    const appDef = APP_REGISTRY[id] || {
      id,
      title: id.toUpperCase(),
      shortTitle: id,
      icon: "AppWindow",
      defaultSize: { width: 750, height: 500 },
      defaultPos: { x: 120, y: 80 },
    };

    const nextZ = topZIndex + 1;
    setTopZIndex(nextZ);
    setActiveWindowId(id);

    setWindows((prev) => {
      const current = prev[id];
      if (current) {
        return {
          ...prev,
          [id]: {
            ...current,
            isOpen: true,
            isMinimized: false,
            zIndex: nextZ,
            ...extraProps,
          },
        };
      }
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const initialPos = isMobile
        ? { x: 10, y: 20 }
        : {
            x: Math.min(Math.max(appDef.defaultPos.x + (Object.keys(prev).length * 20) % 120, 20), (window?.innerWidth || 1200) - 600),
            y: Math.min(Math.max(appDef.defaultPos.y + (Object.keys(prev).length * 15) % 80, 20), (window?.innerHeight || 800) - 450),
          };

      return {
        ...prev,
        [id]: {
          ...appDef,
          isOpen: true,
          isMinimized: false,
          isMaximized: isMobile,
          zIndex: nextZ,
          position: initialPos,
          size: isMobile ? { width: (window?.innerWidth || 400) - 20, height: (window?.innerHeight || 700) - 120 } : appDef.defaultSize,
          ...extraProps,
        },
      };
    });
  };

  const closeWindow = (id) => {
    playSound("close");
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isOpen: false,
          isMinimized: false,
        },
      };
    });
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const minimizeWindow = (id) => {
    playSound("click");
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isMinimized: true,
        },
      };
    });
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const toggleMaximizeWindow = (id) => {
    playSound("click");
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isMaximized: !prev[id].isMaximized,
        },
      };
    });
  };

  const focusWindow = (id) => {
    if (activeWindowId === id && windows[id] && !windows[id].isMinimized) {
      return;
    }
    const nextZ = topZIndex + 1;
    setTopZIndex(nextZ);
    setActiveWindowId(id);

    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isMinimized: false,
          zIndex: nextZ,
        },
      };
    });
  };

  const updateWindowPosition = (id, newPos) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          position: newPos,
        },
      };
    });
  };

  const updateWindowSize = (id, newSize) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          size: newSize,
        },
      };
    });
  };

  const unlockSystem = () => {
    playSound("unlock");
    setLockState("unlocked");
  };

  const lockSystem = () => {
    playSound("close");
    setStartMenuOpen(false);
    setCalendarOpen(false);
    setQuickSettingsOpen(false);
    setSearchOpen(false);
    setLockState("locked");
  };

  const toggleStartMenu = () => {
    playSound("click");
    setCalendarOpen(false);
    setQuickSettingsOpen(false);
    setSearchOpen(false);
    setStartMenuOpen((prev) => !prev);
  };

  const toggleCalendar = () => {
    playSound("click");
    setStartMenuOpen(false);
    setQuickSettingsOpen(false);
    setSearchOpen(false);
    setCalendarOpen((prev) => !prev);
  };

  const toggleQuickSettings = () => {
    playSound("click");
    setStartMenuOpen(false);
    setCalendarOpen(false);
    setSearchOpen(false);
    setQuickSettingsOpen((prev) => !prev);
  };

  const toggleSearch = () => {
    playSound("click");
    setStartMenuOpen(false);
    setCalendarOpen(false);
    setQuickSettingsOpen(false);
    setSearchOpen((prev) => !prev);
  };

  const closeAllFlyouts = () => {
    setStartMenuOpen(false);
    setCalendarOpen(false);
    setQuickSettingsOpen(false);
    setSearchOpen(false);
  };

  // Keyboard shortcut for Win+L lock, Esc to close menus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeAllFlyouts();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <WindowsOSContext.Provider
      value={{
        lockState,
        setLockState,
        unlockSystem,
        lockSystem,
        windows,
        activeWindowId,
        openWindow,
        closeWindow,
        minimizeWindow,
        toggleMaximizeWindow,
        focusWindow,
        updateWindowPosition,
        updateWindowSize,
        wallpaper,
        setWallpaper,
        soundEnabled,
        setSoundEnabled,
        accentColor,
        setAccentColor,
        startMenuOpen,
        toggleStartMenu,
        calendarOpen,
        toggleCalendar,
        quickSettingsOpen,
        toggleQuickSettings,
        searchOpen,
        toggleSearch,
        closeAllFlyouts,
        playSound,
      }}
    >
      {children}
    </WindowsOSContext.Provider>
  );
};

export const useWindowsOS = () => {
  const context = useContext(WindowsOSContext);
  if (!context) {
    throw new Error("useWindowsOS must be used within a WindowsOSProvider");
  }
  return context;
};
