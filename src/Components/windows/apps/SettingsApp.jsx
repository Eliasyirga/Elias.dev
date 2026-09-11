import React from "react";
import { useWindowsOS, WALLPAPERS } from "../../../context/WindowsOSContext";
import { useTheme } from "../../../context/ThemeContext";
import {
  Settings,
  Palette,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Monitor,
  Cpu,
  ShieldCheck,
  Check,
  Sparkles,
} from "lucide-react";

export const SettingsApp = () => {
  const {
    wallpaper,
    setWallpaper,
    soundEnabled,
    setSoundEnabled,
    accentColor,
    setAccentColor,
  } = useWindowsOS();
  const { theme, toggleTheme } = useTheme();

  const accentColors = [
    { name: "Windows Cyan", hex: "#0ea5e9" },
    { name: "Emerald Tech", hex: "#10b981" },
    { name: "Violet Flow", hex: "#8b5cf6" },
    { name: "Amber Flame", hex: "#f59e0b" },
    { name: "Rose Pulse", hex: "#f43f5e" },
  ];

  return (
    <div className="h-full flex flex-col bg-white/70 dark:bg-[#0c0d12]/90 text-zinc-900 dark:text-zinc-100 font-sans text-xs">
      <div className="flex-1 overflow-y-auto p-4 sm:p-7 space-y-6 max-w-4xl mx-auto w-full">
        
        {/* Settings Header */}
        <div className="space-y-1 pb-4 border-b border-zinc-200 dark:border-white/10">
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono font-bold text-xs">
            <Settings className="w-4 h-4" />
            <span>WINDOWS SETTINGS // PERSONALIZATION</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
            System & Personalization
          </h2>
        </div>

        {/* 1. Wallpaper Selection */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-mono font-bold text-xs text-zinc-700 dark:text-zinc-300">
            <Palette className="w-4 h-4 text-cyan-500" />
            <span>SELECT DESKTOP WALLPAPER</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {WALLPAPERS.map((wp) => {
              const isSelected = wallpaper.id === wp.id;
              return (
                <button
                  key={wp.id}
                  onClick={() => setWallpaper(wp)}
                  className={`group rounded-xl overflow-hidden border p-1 text-left transition-all ${
                    isSelected
                      ? "border-cyan-500 ring-2 ring-cyan-500/30 scale-102 shadow-md"
                      : "border-zinc-200 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/20"
                  }`}
                >
                  <div className="w-full h-20 rounded-lg overflow-hidden bg-zinc-900 relative">
                    <img
                      src={wp.src}
                      alt={wp.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-md">
                          <Check className="w-3 h-3" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-1.5 px-1 font-mono text-[10px] truncate text-zinc-700 dark:text-zinc-300">
                    {wp.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Color Theme & Audio Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Light/Dark Toggle */}
          <div className="p-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#12141a] space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-bold text-zinc-900 dark:text-white text-xs">System Theme</div>
                <div className="text-[11px] text-zinc-500">Choose your visual aesthetic</div>
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
              </button>
            </div>
            <div className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
              Currently: {theme.toUpperCase()} MODE
            </div>
          </div>

          {/* Sound Toggle */}
          <div className="p-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#12141a] space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-bold text-zinc-900 dark:text-white text-xs">Sound Effects</div>
                <div className="text-[11px] text-zinc-500">Interactive Web Audio beeps</div>
              </div>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-xl transition-colors ${
                  soundEnabled
                    ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"
                }`}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
            <div className="text-[11px] font-mono text-zinc-500">
              {soundEnabled ? "Audio Cues Enabled (Synthetic Beeps)" : "Audio Cues Muted"}
            </div>
          </div>

        </div>

        {/* 3. System Device Specifications */}
        <div className="p-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#12141a] space-y-3 font-mono text-xs">
          <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
            <Cpu className="w-4 h-4 text-emerald-500" />
            <span>DEVICE & WORKSTATION SPECIFICATIONS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
            <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-white/5 flex justify-between">
              <span className="text-zinc-500">Developer:</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200">Elias Yirga</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-white/5 flex justify-between">
              <span className="text-zinc-500">Edition:</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200">Windows 11 Fluent Portfolio</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-white/5 flex justify-between">
              <span className="text-zinc-500">System Architecture:</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200">x86_64 React 19 + Tailwind</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-white/5 flex justify-between">
              <span className="text-zinc-500">Production Status:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">100% OPERATIONAL</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
