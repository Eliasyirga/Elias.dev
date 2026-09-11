import React, { useState, useEffect } from "react";
import { useWindowsOS } from "../../context/WindowsOSContext";
import { Calendar as CalendarIcon, Clock, ShieldCheck, Sparkles, Send, Bell } from "lucide-react";

export const WindowsCalendarFlyout = () => {
  const { calendarOpen, openWindow } = useWindowsOS();
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!calendarOpen) return null;

  // Calendar matrix generator for current month
  const today = new Date();
  const currentMonthName = today.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const currentDay = today.getDate();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDayIndex = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

  const daysArray = [];
  for (let i = 0; i < firstDayIndex; i++) {
    daysArray.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    daysArray.push(d);
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-14 right-3 z-[9990] w-84 rounded-2xl border border-zinc-300/60 dark:border-white/20 bg-white/90 dark:bg-[#12141a]/95 backdrop-blur-3xl shadow-[0_25px_70px_rgba(0,0,0,0.55)] text-zinc-900 dark:text-zinc-100 p-4 space-y-4 font-sans select-none animate-in slide-in-from-bottom-5 duration-150 text-xs"
    >
      {/* Clock & Date Header */}
      <div className="pb-3 border-b border-zinc-200 dark:border-white/10 space-y-0.5 font-mono">
        <div className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
          {time}
        </div>
        <div className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold">
          {date}
        </div>
      </div>

      {/* Recruiter Notifications Banner */}
      <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 space-y-1 font-mono text-[11px]">
        <div className="flex items-center gap-1.5 font-bold text-cyan-700 dark:text-cyan-300">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
          <span>RECRUITER STATUS: OPEN</span>
        </div>
        <p className="text-[10px] text-zinc-600 dark:text-zinc-400 font-sans leading-tight">
          Available for Full-Stack, Backend, or Distributed Systems roles.
        </p>
      </div>

      {/* Mini Calendar Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between font-mono font-bold text-xs text-zinc-700 dark:text-zinc-300">
          <span>{currentMonthName}</span>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px]">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="text-zinc-400 font-bold py-1">
              {day}
            </div>
          ))}

          {daysArray.map((d, idx) => {
            if (!d) return <div key={idx} />;
            const isToday = d === currentDay;
            return (
              <div
                key={idx}
                className={`py-1.5 rounded-lg flex items-center justify-center font-medium ${
                  isToday
                    ? "bg-cyan-500 text-white font-bold shadow-sm"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                {d}
              </div>
            );
          })}
        </div>
      </div>

      {/* Fast Action */}
      <div className="pt-2 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between font-mono text-[11px]">
        <button
          onClick={() => openWindow("contact")}
          className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline flex items-center gap-1"
        >
          <Send className="w-3 h-3" />
          <span>Send Message</span>
        </button>
        <button
          onClick={() => openWindow("cv")}
          className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
        >
          View Resume
        </button>
      </div>
    </div>
  );
};
