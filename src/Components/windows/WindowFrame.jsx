import React, { useState, useRef, useEffect } from "react";
import { useWindowsOS } from "../../context/WindowsOSContext";
import {
  Minus,
  Square,
  Copy,
  X,
  FolderGit2,
  Terminal as TerminalIcon,
  Briefcase,
  GraduationCap,
  FileText,
  User,
  Gauge,
  Mail,
  Settings as SettingsIcon,
  Trash2,
  AppWindow,
} from "lucide-react";

// Icon resolver helper
export const getAppIcon = (iconName, className = "w-4 h-4") => {
  switch (iconName) {
    case "FolderGit2":
      return <FolderGit2 className={`${className} text-amber-400`} />;
    case "Terminal":
      return <TerminalIcon className={`${className} text-cyan-400`} />;
    case "Briefcase":
      return <Briefcase className={`${className} text-blue-400`} />;
    case "GraduationCap":
      return <GraduationCap className={`${className} text-emerald-400`} />;
    case "FileText":
      return <FileText className={`${className} text-rose-400`} />;
    case "User":
      return <User className={`${className} text-purple-400`} />;
    case "Gauge":
      return <Gauge className={`${className} text-amber-500`} />;
    case "Mail":
      return <Mail className={`${className} text-sky-400`} />;
    case "Settings":
      return <SettingsIcon className={`${className} text-zinc-400`} />;
    case "Trash2":
      return <Trash2 className={`${className} text-zinc-400`} />;
    default:
      return <AppWindow className={`${className} text-cyan-400`} />;
  }
};

export const WindowFrame = ({ windowId, children }) => {
  const {
    windows,
    activeWindowId,
    focusWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWindowsOS();

  const win = windows[windowId];
  if (!win || !win.isOpen || win.isMinimized) return null;

  const isActive = activeWindowId === windowId;
  const isMaximized = win.isMaximized;

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, winX: 0, winY: 0 });
  const resizeStartRef = useRef({ mouseX: 0, mouseY: 0, width: 0, height: 0 });

  // Handle Dragging
  const handleMouseDownHeader = (e) => {
    if (e.target.closest("button") || isMaximized) return;
    focusWindow(windowId);
    setIsDragging(true);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      winX: win.position.x,
      winY: win.position.y,
    };
  };

  // Handle Resizing
  const handleMouseDownResize = (e) => {
    e.stopPropagation();
    focusWindow(windowId);
    setIsResizing(true);
    resizeStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      width: win.size.width,
      height: win.size.height,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const dx = e.clientX - dragStartRef.current.mouseX;
        const dy = e.clientY - dragStartRef.current.mouseY;
        const newX = Math.max(0, Math.min(window.innerWidth - 100, dragStartRef.current.winX + dx));
        const newY = Math.max(0, Math.min(window.innerHeight - 80, dragStartRef.current.winY + dy));
        updateWindowPosition(windowId, { x: newX, y: newY });
      }

      if (isResizing) {
        const dx = e.clientX - resizeStartRef.current.mouseX;
        const dy = e.clientY - resizeStartRef.current.mouseY;
        const newW = Math.max(380, resizeStartRef.current.width + dx);
        const newH = Math.max(280, resizeStartRef.current.height + dy);
        updateWindowSize(windowId, { width: newW, height: newH });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, windowId, updateWindowPosition, updateWindowSize]);

  // Maximize or normal style
  const style = isMaximized
    ? {
        left: 0,
        top: 0,
        width: "100vw",
        height: "calc(100vh - 48px)", // Leave space for taskbar
        zIndex: win.zIndex,
        borderRadius: 0,
      }
    : {
        left: `${win.position.x}px`,
        top: `${win.position.y}px`,
        width: `${win.size.width}px`,
        height: `${win.size.height}px`,
        zIndex: win.zIndex,
      };

  return (
    <div
      onMouseDown={() => focusWindow(windowId)}
      style={style}
      className={`fixed flex flex-col transition-shadow duration-150 ${
        isMaximized ? "rounded-none" : "rounded-xl border"
      } ${
        isActive
          ? "border-zinc-400/40 dark:border-white/20 shadow-[0_16px_50px_rgba(0,0,0,0.55)] ring-1 ring-white/10"
          : "border-zinc-300/40 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)] opacity-95"
      } backdrop-blur-2xl bg-white/95 dark:bg-[#12141a]/95 text-zinc-900 dark:text-zinc-100 overflow-hidden select-none animate-in zoom-in-95 duration-100`}
    >
      {/* Titlebar */}
      <div
        onMouseDown={handleMouseDownHeader}
        onDoubleClick={() => toggleMaximizeWindow(windowId)}
        className={`h-9 px-3 flex items-center justify-between cursor-move shrink-0 border-b ${
          isActive
            ? "bg-zinc-100 dark:bg-[#181a22] border-zinc-200 dark:border-white/10"
            : "bg-zinc-100/50 dark:bg-[#14161d]/80 border-transparent text-zinc-500"
        }`}
      >
        {/* Left Title & Icon */}
        <div className="flex items-center gap-2.5 truncate font-sans text-xs font-semibold">
          <div className="shrink-0 flex items-center justify-center">
            {getAppIcon(win.icon, "w-4 h-4")}
          </div>
          <span className="truncate tracking-tight">{win.title}</span>
        </div>

        {/* Right Window Action Controls */}
        <div className="flex items-center -mr-3 h-full">
          {/* Minimize */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(windowId);
            }}
            className="w-11 h-full flex items-center justify-center hover:bg-zinc-200/80 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400 transition-colors"
            title="Minimize"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          {/* Maximize / Restore */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximizeWindow(windowId);
            }}
            className="w-11 h-full flex items-center justify-center hover:bg-zinc-200/80 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400 transition-colors"
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? <Copy className="w-3 h-3" /> : <Square className="w-3 h-3" />}
          </button>

          {/* Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(windowId);
            }}
            className="w-11 h-full flex items-center justify-center hover:bg-red-500 hover:text-white text-zinc-600 dark:text-zinc-400 transition-colors group"
            title="Close"
          >
            <X className="w-3.5 h-3.5 group-hover:scale-110" />
          </button>
        </div>
      </div>

      {/* App Body Content */}
      <div className="flex-1 overflow-auto bg-white/60 dark:bg-[#0c0d12]/80 font-sans select-text">
        {children}
      </div>

      {/* Resize Grip Handle (when not maximized) */}
      {!isMaximized && (
        <div
          onMouseDown={handleMouseDownResize}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50 flex items-end justify-end p-0.5 text-zinc-400/40 hover:text-zinc-600 dark:hover:text-zinc-300"
          title="Resize Window"
        >
          <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 10 10">
            <path d="M9 1L1 9M9 5L5 9M9 9L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </div>
  );
};
