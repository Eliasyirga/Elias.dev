import React, { useState, useEffect } from "react";
import { useWindowsOS } from "../../context/WindowsOSContext";
import {
  Lock,
  ArrowRight,
  ShieldCheck,
  Power,
  Wifi,
  Battery,
  Sparkles,
  KeyRound,
  UserCheck,
} from "lucide-react";

export const WindowsLockScreen = () => {
  const { lockState, setLockState, unlockSystem, wallpaper } = useWindowsOS();
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [pin, setPin] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
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
          weekday: "long",
          month: "long",
          day: "numeric",
        })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleUnlockAttempt = (e) => {
    if (e) e.preventDefault();
    setIsAuthenticating(true);
    setAuthError("");

    setTimeout(() => {
      setIsAuthenticating(false);
      unlockSystem();
    }, 450);
  };

  const handleScreenClick = () => {
    if (lockState === "locked") {
      setLockState("signing_in");
    }
  };

  if (lockState === "unlocked") return null;

  return (
    <div
      onClick={handleScreenClick}
      className="fixed inset-0 z-[9999] flex flex-col justify-between select-none overflow-hidden transition-all duration-500 bg-cover bg-center font-sans"
      style={{
        backgroundImage: `url(${wallpaper.src || "/walleper.png"})`,
      }}
    >
      {/* Dark overlay backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity" />

      {/* 1. LOCK SCREEN VIEW (Slide up on click) */}
      {lockState === "locked" && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between items-center py-14 px-6 text-white animate-in fade-in zoom-in-95 duration-300 cursor-pointer">
          {/* Top Lock status icon */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-xs font-mono font-semibold shadow-lg">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>ELIAS.DEV // SECURED WORKSTATION</span>
          </div>

          {/* Center Clock and Date */}
          <div className="flex flex-col items-center text-center space-y-2 select-none">
            <h1 className="text-7xl sm:text-9xl font-black tracking-tighter drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)] font-mono">
              {time || "12:00"}
            </h1>
            <p className="text-xl sm:text-2xl font-medium tracking-wide text-zinc-200 drop-shadow-md">
              {date || "Friday, September 11"}
            </p>
          </div>

          {/* Bottom Prompt to unlock */}
          <div className="flex flex-col items-center gap-2 text-center text-zinc-300 text-sm animate-bounce">
            <div className="w-9 h-9 rounded-full bg-white/15 border border-white/30 flex items-center justify-center backdrop-blur-md shadow-lg">
              <ArrowRight className="w-4 h-4 text-white -rotate-90" />
            </div>
            <span className="font-semibold tracking-wide drop-shadow text-xs sm:text-sm">
              Click anywhere or swipe up to unlock
            </span>
          </div>
        </div>
      )}

      {/* 2. SIGN IN / WELCOME VIEW */}
      {lockState === "signing_in" && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between items-center py-12 px-6 text-white animate-in slide-in-from-bottom-6 duration-300">
          <div />

          {/* Sign In Box */}
          <div className="w-full max-w-sm flex flex-col items-center text-center space-y-5">
            {/* Avatar with status badge */}
            <div className="relative group">
              <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-white/30 shadow-[0_10px_40px_rgba(0,0,0,0.6)] bg-zinc-900">
                <img
                  src="/vv.webp"
                  alt="Elias Yirga"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 ring-2 ring-zinc-900 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              </span>
            </div>

            {/* Name and Designation */}
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">
                Elias Yirga
              </h2>
              <p className="text-xs sm:text-sm text-cyan-300 font-medium font-mono drop-shadow">
                Computer Engineer & Full-Stack Architect
              </p>
            </div>

            {/* PIN / Password input form */}
            <form onSubmit={handleUnlockAttempt} className="w-full space-y-3 pt-2">
              <div className="relative flex items-center">
                <input
                  type="password"
                  placeholder="Enter PIN (or click Sign In)"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl bg-white/15 hover:bg-white/20 focus:bg-white/25 border border-white/25 focus:border-cyan-400 text-white placeholder-zinc-300/70 text-center text-sm outline-none backdrop-blur-xl transition-all shadow-inner font-mono tracking-widest"
                />
                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="absolute right-2 p-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-zinc-950 transition-all shadow-md active:scale-95 disabled:opacity-50"
                  title="Sign In"
                >
                  {isAuthenticating ? (
                    <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Fast 1-Click Unlock button */}
              <button
                type="button"
                onClick={handleUnlockAttempt}
                className="w-full py-2.5 px-4 rounded-xl bg-white/90 hover:bg-white text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <UserCheck className="w-4 h-4 text-cyan-600" />
                <span>Sign In as Recruiter / Guest</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-300/80 font-mono pt-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Instant Access // Zero Password Required</span>
              </div>
            </form>
          </div>

          {/* Bottom System Status & Power controls */}
          <div className="w-full max-w-4xl flex items-center justify-between text-zinc-300 text-xs px-4">
            <button
              onClick={() => setLockState("locked")}
              className="hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Back to Clock</span>
            </button>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-emerald-400" title="Network Connected 1Gbps">
                <Wifi className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-1" title="Battery 100% High Performance">
                <Battery className="w-4 h-4" />
              </div>
              <button
                onClick={handleUnlockAttempt}
                className="p-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                title="Power Options"
              >
                <Power className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
