import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  FileDown,
  Github,
  Linkedin,
  Send,
  Mail,
  Check,
  Copy,
  Sparkles,
  MapPin,
  GraduationCap,
  Briefcase,
  Code2,
  Terminal,
  Activity,
  Zap,
  Globe,
  Clock,
  Play,
} from "lucide-react";
import { ThreeDBackground } from "../features/hero/ThreeDBackground";

export const HeroSection = ({ onSelectProject }) => {
  const [copied, setCopied] = useState(false);
  const [localTime, setLocalTime] = useState("");
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState([
    { text: "sys.init(): Elias Yirga Workstation v2.6 Ready.", type: "system" },
    { text: "Specialization: Full-Stack Web & Distributed Backend Architectures.", type: "info" },
  ]);

  // Live EAT / Addis Ababa Clock
  useEffect(() => {
    const updateClock = () => {
      const options = {
        timeZone: "Africa/Addis_Ababa",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setLocalTime(new Intl.DateTimeFormat([], options).format(new Date()));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("eliasyirga575@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleCommand = (cmd) => {
    const cleanCmd = cmd.trim().toLowerCase();
    let response = "";

    switch (cleanCmd) {
      case "help":
        response = "Available: whoami, skills, projects, rfc, contact, hire, clear";
        break;
      case "whoami":
        response = "Elias Yirga — Full-Stack Engineer & Bahir Dar University Computer Engineering Graduate.";
        break;
      case "skills":
        response = "Core: React, Next.js, Node.js, Express, PostgreSQL, PostGIS, Redis, WebSockets, Docker, Flutter.";
        break;
      case "projects":
      case "rfc":
        response = "Featured RFC-001: BahirLink (Municipal Emergency Real-Time Dispatch System). Scroll to #projects.";
        const projSec = document.getElementById("projects");
        if (projSec) projSec.scrollIntoView({ behavior: "smooth" });
        break;
      case "hire":
      case "contact":
        response = "Opening contact channel... Email: eliasyirga575@gmail.com / Telegram: @Elawazza";
        const contactSec = document.getElementById("contact");
        if (contactSec) contactSec.scrollIntoView({ behavior: "smooth" });
        break;
      case "clear":
        setTerminalLogs([]);
        setTerminalInput("");
        return;
      default:
        response = `Command '${cleanCmd}' not found. Type 'help' for available commands.`;
    }

    setTerminalLogs((prev) => [
      ...prev.slice(-4),
      { text: `$ ${cmd}`, type: "command" },
      { text: response, type: "response" },
    ]);
    setTerminalInput("");
  };

  const commandChips = ["whoami", "skills", "projects", "hire", "clear"];

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full overflow-hidden">
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-50 -z-10">
        <ThreeDBackground />
      </div>

      <div className="space-y-8 sm:space-y-10 relative z-10">
        {/* Main Hero Grid */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-14">
          
          {/* Left Text Content */}
          <div className="flex-1 space-y-5 sm:space-y-6 text-center lg:text-left w-full">
            
            {/* Status & Time HUD Pill */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 p-1.5 px-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-mono shadow-sm">
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold pr-2 border-r border-zinc-200 dark:border-zinc-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] sm:text-xs">AVAILABLE FOR ROLES</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 text-[10px] sm:text-[11px]">
                <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Addis Ababa (EAT):</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">{localTime || "12:00 PM"}</span>
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white tracking-tight leading-[1.1]">
                Hi, I'm <span className="text-cyan-600 dark:text-cyan-400">Elias Yirga</span>
              </h1>
              <p className="text-lg sm:text-2xl font-bold text-zinc-700 dark:text-zinc-300">
                Full-Stack Software Engineer & Computer Engineering Graduate
              </p>
            </div>

            {/* Bio Description */}
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-sans">
              I architect high-performance web platforms, scalable distributed backends (<span className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400">Node.js, PostgreSQL, PostGIS, Redis</span>), and clean responsive frontend design systems.
            </p>

            {/* Interactive Hero Quick CLI */}
            <div className="rounded-2xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-3.5 sm:p-4 space-y-2.5 text-left font-mono text-xs shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2 text-[11px] text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">QUICK_INTERACTIVE_CLI</span>
                </div>
                <span className="text-[10px] hidden sm:inline text-zinc-400">Type a command or click a chip</span>
              </div>

              {/* Logs */}
              <div className="space-y-1 text-[11px] max-h-24 overflow-y-auto">
                {terminalLogs.map((log, i) => (
                  <div key={i} className={`leading-relaxed ${
                    log.type === "command"
                      ? "text-cyan-600 dark:text-cyan-400 font-bold"
                      : log.type === "system"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-zinc-700 dark:text-zinc-300"
                  }`}>
                    {log.text}
                  </div>
                ))}
              </div>

              {/* Input Form & Chips */}
              <div className="space-y-2 pt-1 border-t border-zinc-200 dark:border-zinc-800">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (terminalInput.trim()) handleCommand(terminalInput);
                  }}
                  className="flex items-center gap-2"
                >
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold">$</span>
                  <input
                    type="text"
                    placeholder="Type: whoami, skills, projects, hire..."
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    className="flex-1 bg-transparent text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none text-xs"
                  />
                  <button
                    type="submit"
                    className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-black text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-950 text-[10px] font-bold shrink-0"
                  >
                    RUN
                  </button>
                </form>

                {/* Quick Action Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  <span className="text-[10px] text-zinc-400">Quick run:</span>
                  {commandChips.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => handleCommand(chip)}
                      className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[10px] transition-colors border border-zinc-200 dark:border-zinc-800"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-1">
              <a
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-zinc-900 hover:bg-black text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <span>Explore Featured Systems</span>
                <ArrowRight className="w-4 h-4 text-cyan-400 dark:text-cyan-600" />
              </a>

              <a
                href="/Elias_Yirga_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-white text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-semibold text-xs sm:text-sm transition-all shadow-sm"
              >
                <FileDown className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Download CV</span>
              </a>

              <a
                href="#contact"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm font-medium transition-colors"
              >
                <Mail className="w-4 h-4 text-zinc-400" />
                <span>Contact</span>
              </a>
            </div>

            {/* Social Channels & Email */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-zinc-600 dark:text-zinc-400">
              <a
                href="https://github.com/eliasyirga"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-all shadow-sm"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/elias-yirga-44a19b2a7"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-blue-500 transition-all shadow-sm"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/Elawazza"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-sky-500 transition-all shadow-sm"
                title="Telegram @Elawazza"
              >
                <Send className="w-4 h-4" />
              </a>

              <button
                onClick={copyEmail}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-mono transition-all shadow-sm"
                title="Click to copy email"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[11px] sm:text-xs">{copied ? "Copied" : "eliasyirga575@gmail.com"}</span>
              </button>
            </div>

          </div>

          {/* Right Profile Picture & Badges */}
          <div className="relative shrink-0 mx-auto lg:mx-0">
            <div className="relative w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-3xl overflow-hidden border-2 border-zinc-300 dark:border-zinc-800 shadow-xl bg-zinc-100 dark:bg-zinc-900 group">
              <img
                src="/vv.webp"
                alt="Elias Yirga"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl flex items-center gap-2 sm:gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold">
                <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="text-left">
                <div className="font-bold text-zinc-900 dark:text-white text-[11px] sm:text-xs">4+ Years</div>
                <div className="text-[9px] sm:text-[10px] text-zinc-500">Engineering Exp</div>
              </div>
            </div>

            {/* Floating Degree Badge */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl flex items-center gap-2 sm:gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="text-left">
                <div className="font-bold text-zinc-900 dark:text-white text-[11px] sm:text-xs">B.Sc. Degree</div>
                <div className="text-[9px] sm:text-[10px] text-zinc-500">Bahir Dar Univ</div>
              </div>
            </div>
          </div>

        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          {[
            { label: "Production Experience", val: "4+ Years", desc: "Full-Stack & Distributed" },
            { label: "Production Systems", val: "8+ Projects", desc: "Live Web & Mobile Platforms" },
            { label: "Education", val: "B.Sc. Degree", desc: "Computer Engineering" },
            { label: "Availability", val: "Immediate", desc: "Full-Time & Remote" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 space-y-1 shadow-sm text-center sm:text-left"
            >
              <div className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                {stat.val}
              </div>
              <div className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                {stat.label}
              </div>
              <div className="text-[10px] sm:text-[11px] text-zinc-500">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
