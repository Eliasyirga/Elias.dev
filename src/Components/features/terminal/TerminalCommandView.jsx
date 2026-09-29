import React, { useState, useEffect, useRef } from "react";
import {
  Terminal as TerminalIcon,
  LayoutGrid,
  Maximize2,
  Minimize2,
  X,
  Minus,
  Square,
  Sparkles,
  ExternalLink,
  Github,
  Mail,
  Send,
  Linkedin,
  Copy,
  Check,
  Code2,
  Cpu,
  Activity,
  Layers,
  FileDown,
  ArrowRight,
  Sun,
  Moon,
  Trash2,
  Compass,
} from "lucide-react";
import { projects } from "../../../data/projects";
import { skillCategories } from "../../../data/skills";
import { experience, education } from "../../../data/experience";
import { certificates } from "../../../data/testimonials";
import { useTheme } from "../../../context/ThemeContext";

export const TerminalCommandView = ({ onSwitchToStream, onSelectProject }) => {
  const { theme, toggleTheme } = useTheme();
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState([
    {
      type: "system",
      text: "⚡ ELIAS YIRGA — INTERACTIVE DEVELOPER TERMINAL v3.4.0\nComputer Engineer & Full-Stack Systems Architect (Bahir Dar University)\nType 'help' for command list, 'neofetch' for system specs, or click any chip below.\nType 'stream' or click 'STREAM VIEW' in the top-right to return to the portfolio scroll view.",
    },
    {
      type: "user",
      text: "neofetch",
    },
    {
      type: "neofetch",
    },
  ]);

  const [commandHistory, setCommandHistory] = useState(["neofetch"]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);
  const canvasRef = useRef(null);

  // Live EAT Time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Africa/Addis_Ababa",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " EAT"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Matrix Rain Effect
  useEffect(() => {
    if (!isMatrixMode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    const characters = "0101010101ABCDEFHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテト";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#10b981";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMatrixMode]);

  // Scroll to bottom on new history entry
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Focus input on click anywhere in terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (rawCommand) => {
    const raw = rawCommand.trim();
    if (!raw) return;

    // Add to recall history
    setCommandHistory((prev) => [...prev, raw]);
    setHistoryIndex(-1);

    const parts = raw.split(" ");
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ").trim().toLowerCase();

    const newHistory = [...history, { type: "user", text: raw }];

    switch (cmd) {
      case "help":
      case "?":
        newHistory.push({
          type: "help",
        });
        break;

      case "whoami":
      case "bio":
        newHistory.push({
          type: "output",
          text: `Elias Yirga — Full-Stack Systems Engineer & Computer Engineering Graduate (Bahir Dar University).\n\nSpecialized in:\n  • High-throughput distributed backends (Node.js, PostgreSQL, PostGIS, Redis, WebSockets)\n  • Modern, high-performance web frontends (React, Next.js, TailwindCSS)\n  • Low-latency spatial routing and real-time municipal emergency dispatch systems\n  • Cross-platform mobile engineering (Flutter / Dart)\n\nLocation: Addis Ababa, Ethiopia\nAvailability: Immediate for Full-Time / Remote Software Engineering roles.`,
        });
        break;

      case "neofetch":
      case "fastfetch":
        newHistory.push({
          type: "neofetch",
        });
        break;

      case "projects":
      case "ls":
      case "dir":
        newHistory.push({
          type: "projects_list",
          projects: projects,
        });
        break;

      case "cat":
      case "project":
        if (!arg) {
          newHistory.push({
            type: "error",
            text: "Usage: cat <project-slug> (e.g. 'cat bahirlink', 'cat jobify', 'cat taskflow')\nType 'projects' to see all available slugs.",
          });
        } else {
          const matched = projects.find(
            (p) =>
              p.slug.toLowerCase().includes(arg) ||
              p.title.toLowerCase().includes(arg) ||
              p.id.toLowerCase().includes(arg) ||
              p.rfcId?.toLowerCase().includes(arg)
          );
          if (matched) {
            newHistory.push({
              type: "project_detail",
              project: matched,
            });
          } else {
            newHistory.push({
              type: "error",
              text: `Project '${arg}' not found in registry. Type 'projects' to see available releases.`,
            });
          }
        }
        break;

      case "skills":
      case "stack":
        newHistory.push({
          type: "skills",
          categories: skillCategories,
        });
        break;

      case "experience":
      case "history":
        newHistory.push({
          type: "experience",
          experience: experience,
        });
        break;

      case "education":
        newHistory.push({
          type: "education",
          education: education,
        });
        break;

      case "certs":
      case "certificates":
        newHistory.push({
          type: "certs",
          certificates: certificates,
        });
        break;

      case "cv":
      case "resume":
        window.open("/Elias_Yirga_CV.pdf", "_blank");
        newHistory.push({
          type: "success",
          text: "Opening /Elias_Yirga_CV.pdf in a new tab...",
        });
        break;

      case "contact":
        newHistory.push({
          type: "contact",
        });
        break;

      case "hire":
      case "sudo":
        newHistory.push({
          type: "hire",
        });
        break;

      case "matrix":
        setIsMatrixMode((prev) => !prev);
        newHistory.push({
          type: "success",
          text: isMatrixMode ? "Exiting Digital Matrix Mode..." : "Entering Digital Matrix Mode. Stream sequence engaged.",
        });
        break;

      case "theme":
        toggleTheme();
        newHistory.push({
          type: "success",
          text: `Active theme toggled to: ${theme === "dark" ? "LIGHT" : "DARK"}.`,
        });
        break;

      case "stream":
      case "exit":
      case "gui":
      case "portfolio":
        if (onSwitchToStream) {
          onSwitchToStream();
          return;
        }
        newHistory.push({
          type: "output",
          text: "Switching to Streamline Portfolio Showcase...",
        });
        break;

      case "clear":
      case "cls":
        setHistory([]);
        setInputVal("");
        return;

      default:
        newHistory.push({
          type: "error",
          text: `zsh: command not found: '${raw}'. Type 'help' for available commands or 'projects' to inspect releases.`,
        });
        break;
    }

    setHistory(newHistory);
    setInputVal("");
  };

  // Keyboard navigation for command history & tab autocomplete
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const current = inputVal.toLowerCase().trim();
      const available = [
        "help",
        "whoami",
        "neofetch",
        "projects",
        "cat bahirlink",
        "cat jobify",
        "cat taskflow",
        "skills",
        "experience",
        "education",
        "certs",
        "cv",
        "contact",
        "hire",
        "matrix",
        "theme",
        "stream",
        "clear",
      ];
      const match = available.find((c) => c.startsWith(current));
      if (match) {
        setInputVal(match);
      }
    }
  };

  const copyCli = () => {
    navigator.clipboard.writeText("npx eliasyirga");
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const quickChips = [
    "help",
    "neofetch",
    "projects",
    "cat bahirlink",
    "skills",
    "experience",
    "education",
    "certs",
    "contact",
    "cv",
    "matrix",
  ];

  return (
    <div
      onClick={handleTerminalClick}
      className="relative min-h-screen w-full flex flex-col bg-[#090b10] text-[#e2e8f0] font-mono selection:bg-cyan-500 selection:text-black overflow-hidden"
    >
      {/* Optional Matrix Canvas Overlay */}
      {isMatrixMode && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none opacity-25 z-0"
        />
      )}

      {/* Terminal Title Bar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-2.5 bg-[#0e111a] border-b border-zinc-800 text-xs select-none">
        {/* Left Mac/Linux Style Window Dots */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onSwitchToStream) onSwitchToStream();
            }}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
            title="Exit to Stream View"
          >
            <X className="w-2 h-2 text-red-950 opacity-0 group-hover:opacity-100" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setHistory([]);
            }}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center group"
            title="Clear Buffer"
          >
            <Minus className="w-2 h-2 text-yellow-950 opacity-0 group-hover:opacity-100" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMatrixMode((prev) => !prev);
            }}
            className="w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors flex items-center justify-center group"
            title="Toggle Matrix Mode"
          >
            <Square className="w-2 h-2 text-emerald-950 opacity-0 group-hover:opacity-100" />
          </button>
          <span className="text-zinc-500 text-[11px] ml-2 hidden sm:inline">
            elias@dev-workstation: ~ (zsh)
          </span>
        </div>

        {/* Center Status Badges */}
        <div className="flex items-center gap-2 text-[10px] text-zinc-400">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold hidden md:inline">SYSTEM ONLINE</span>
          </div>
          <div className="hidden lg:flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400">
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span>NODE: ADDIS_ABABA ({currentTime})</span>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              copyCli();
            }}
            className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 text-[10px] transition-colors"
            title="Copy CLI command"
          >
            {copiedCli ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span className="hidden sm:inline">{copiedCli ? "COPIED" : "npx eliasyirga"}</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMatrixMode((prev) => !prev);
            }}
            className={`px-2 py-1 rounded text-[10px] transition-colors border ${
              isMatrixMode
                ? "bg-emerald-950/80 border-emerald-500 text-emerald-400 font-bold"
                : "bg-zinc-800/80 border-zinc-700 text-zinc-300 hover:bg-zinc-700"
            }`}
            title="Toggle Matrix Digital Rain"
          >
            MATRIX
          </button>

          {/* Switch to Stream Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onSwitchToStream) onSwitchToStream();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[10px] shadow-sm transition-all"
            title="Return to standard Portfolio Stream view"
          >
            <LayoutGrid className="w-3 h-3" />
            <span>STREAM VIEW</span>
          </button>
        </div>
      </div>

      {/* Main Terminal Buffer Screen */}
      <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1.5 leading-relaxed">
            {/* User Prompt Entry */}
            {item.type === "user" && (
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <span className="text-emerald-400">elias@dev-workstation</span>
                <span className="text-zinc-500">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-zinc-400">$</span>
                <span className="text-white">{item.text}</span>
              </div>
            )}

            {/* System Message */}
            {item.type === "system" && (
              <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800/80 text-zinc-300 whitespace-pre-line text-xs">
                {item.text}
              </div>
            )}

            {/* Generic Output */}
            {item.type === "output" && (
              <div className="text-zinc-300 whitespace-pre-line pl-2 border-l border-zinc-800">
                {item.text}
              </div>
            )}

            {/* Success Message */}
            {item.type === "success" && (
              <div className="text-emerald-400 pl-2 border-l border-emerald-500/50">
                {item.text}
              </div>
            )}

            {/* Error Message */}
            {item.type === "error" && (
              <div className="text-rose-400 pl-2 border-l border-rose-500/50">
                {item.text}
              </div>
            )}

            {/* Neofetch System Banner */}
            {item.type === "neofetch" && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                <div className="md:col-span-4 text-cyan-400 font-mono text-[11px] leading-tight select-none">
                  <pre className="whitespace-pre overflow-x-auto">
{`   ███████╗██╗     ██╗ █████╗ ███████╗
   ██╔════╝██║     ██║██╔══██╗██╔════╝
   █████╗  ██║     ██║███████║███████╗
   ██╔══╝  ██║     ██║██╔══██║╚════██║
   ███████╗███████╗██║██║  ██║███████║
   ╚══════╝╚══════╝╚═╝╚═╝  ╚═╝╚══════╝`}
                  </pre>
                  <div className="mt-2 text-zinc-400 text-[10px]">
                    Elias Yirga — Addis Ababa, ET
                  </div>
                </div>

                <div className="md:col-span-8 space-y-1 text-xs">
                  <div className="font-bold text-white border-b border-zinc-800 pb-1">
                    elias@elias-dev-box
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-zinc-300 pt-1">
                    <div>
                      <span className="text-cyan-400 font-semibold">OS:</span> EliasOS v3.4 (Arch/Linux Base)
                    </div>
                    <div>
                      <span className="text-cyan-400 font-semibold">Kernel:</span> 6.8.9-x86_64 Distributed
                    </div>
                    <div>
                      <span className="text-cyan-400 font-semibold">Role:</span> Full-Stack Systems Engineer
                    </div>
                    <div>
                      <span className="text-cyan-400 font-semibold">Education:</span> B.Sc. Computer Engineering
                    </div>
                    <div>
                      <span className="text-cyan-400 font-semibold">Institution:</span> Bahir Dar University
                    </div>
                    <div>
                      <span className="text-cyan-400 font-semibold">Experience:</span> 4+ Years Continuous
                    </div>
                    <div>
                      <span className="text-cyan-400 font-semibold">Languages:</span> TypeScript, JS, Python, SQL, C++, Dart
                    </div>
                    <div>
                      <span className="text-cyan-400 font-semibold">Frameworks:</span> React, Next.js, Node.js, Express, Flutter
                    </div>
                    <div>
                      <span className="text-cyan-400 font-semibold">Data/Infra:</span> PostgreSQL, PostGIS, Redis, Docker
                    </div>
                    <div>
                      <span className="text-cyan-400 font-semibold">Availability:</span>{" "}
                      <span className="text-emerald-400 font-bold">Immediate (Full-Time / Remote)</span>
                    </div>
                  </div>

                  {/* Terminal Palette Swatches */}
                  <div className="flex gap-1.5 pt-2">
                    <span className="w-3.5 h-3.5 rounded bg-zinc-800" />
                    <span className="w-3.5 h-3.5 rounded bg-red-500" />
                    <span className="w-3.5 h-3.5 rounded bg-green-500" />
                    <span className="w-3.5 h-3.5 rounded bg-yellow-500" />
                    <span className="w-3.5 h-3.5 rounded bg-blue-500" />
                    <span className="w-3.5 h-3.5 rounded bg-purple-500" />
                    <span className="w-3.5 h-3.5 rounded bg-cyan-500" />
                    <span className="w-3.5 h-3.5 rounded bg-white" />
                  </div>
                </div>
              </div>
            )}

            {/* Help Directory */}
            {item.type === "help" && (
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2 text-xs">
                <div className="font-bold text-cyan-400 border-b border-zinc-800 pb-1 flex items-center justify-between">
                  <span>AVAILABLE TERMINAL COMMANDS</span>
                  <span className="text-[10px] text-zinc-500">Tip: Click chip or press Tab to autocomplete</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-zinc-300">
                  <div><span className="text-emerald-400 font-bold">whoami</span> — Overview of Elias Yirga & background</div>
                  <div><span className="text-emerald-400 font-bold">neofetch</span> — Print full developer system telemetry</div>
                  <div><span className="text-emerald-400 font-bold">projects / ls</span> — List all 8 scaled production releases & RFCs</div>
                  <div><span className="text-emerald-400 font-bold">cat &lt;slug&gt;</span> — Inspect specific project architecture (e.g. cat bahirlink)</div>
                  <div><span className="text-emerald-400 font-bold">skills / stack</span> — Capability matrix and engineering stack</div>
                  <div><span className="text-emerald-400 font-bold">experience</span> — Career history & track record</div>
                  <div><span className="text-emerald-400 font-bold">education</span> — B.Sc. Computer Engineering degree</div>
                  <div><span className="text-emerald-400 font-bold">certs</span> — Professional certifications</div>
                  <div><span className="text-emerald-400 font-bold">cv / resume</span> — Download or preview official CV (PDF)</div>
                  <div><span className="text-emerald-400 font-bold">contact</span> — Email, Telegram, LinkedIn, GitHub</div>
                  <div><span className="text-emerald-400 font-bold">hire</span> — Recruiter fast-track contact information</div>
                  <div><span className="text-emerald-400 font-bold">matrix</span> — Toggle Cyberpunk digital code rain</div>
                  <div><span className="text-emerald-400 font-bold">theme</span> — Toggle dark / light color scheme</div>
                  <div><span className="text-emerald-400 font-bold">stream / exit</span> — Switch back to Showcase Stream</div>
                  <div><span className="text-emerald-400 font-bold">clear / cls</span> — Reset terminal buffer</div>
                </div>
              </div>
            )}

            {/* Projects List */}
            {item.type === "projects_list" && (
              <div className="space-y-2">
                <div className="text-xs text-zinc-400 font-bold flex items-center justify-between border-b border-zinc-800 pb-1">
                  <span>PRODUCTION SYSTEMS & RFC SPECIFICATIONS ({item.projects.length})</span>
                  <span className="text-[10px] text-cyan-400">Click any card to inspect specification</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                  {item.projects.map((proj) => (
                    <div
                      key={proj.id}
                      onClick={() => handleCommand(`cat ${proj.slug}`)}
                      className="p-3 rounded-lg bg-zinc-900/70 border border-zinc-800 hover:border-cyan-500/60 cursor-pointer transition-all hover:bg-zinc-850 space-y-1.5 group"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {proj.title}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500 px-1.5 py-0.5 rounded bg-zinc-800">
                          {proj.rfcId || "RFC"}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 line-clamp-2">
                        {proj.headline}
                      </p>
                      <div className="flex items-center justify-between pt-1 text-[10px] text-zinc-500">
                        <span>p95: <strong className="text-cyan-400">{proj.metrics?.[0]?.value || "45ms"}</strong></span>
                        <span className="text-emerald-400 group-hover:underline">cat {proj.slug} →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Single Project Detail RFC */}
            {item.type === "project_detail" && (
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-2">
                  <div>
                    <span className="text-[10px] text-cyan-400 font-mono mr-2">[{item.project.rfcId || "SPEC-001"}]</span>
                    <strong className="text-white text-sm">{item.project.title}</strong>
                    <span className="text-zinc-400 text-xs ml-2">({item.project.category})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {onSelectProject && (
                      <button
                        onClick={() => onSelectProject(item.project)}
                        className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[10px] transition-colors flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Open Modal</span>
                      </button>
                    )}
                    {item.project.liveUrl && (
                      <a
                        href={item.project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[10px] transition-colors flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Live Site</span>
                      </a>
                    )}
                    {item.project.githubUrl && (
                      <a
                        href={item.project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[10px] transition-colors flex items-center gap-1"
                      >
                        <Github className="w-3 h-3" />
                        <span>Source</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-zinc-400 font-semibold">Overview:</div>
                  <p className="text-zinc-300 leading-relaxed">{item.project.headline}</p>
                  {item.project.problemStatement && (
                    <p className="text-zinc-400 text-[11px] pt-1 leading-relaxed">
                      <strong className="text-zinc-300">Challenge: </strong>
                      {item.project.problemStatement}
                    </p>
                  )}
                </div>

                {/* Metrics */}
                {item.project.metrics && item.project.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                    {item.project.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="p-2 rounded bg-zinc-950/80 border border-zinc-800">
                        <div className="text-[10px] text-zinc-500">{m.label}</div>
                        <div className="text-sm font-bold text-cyan-400">{m.value}</div>
                        {m.delta && <div className="text-[9px] text-emerald-400">{m.delta}</div>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack */}
                <div className="pt-1">
                  <span className="text-zinc-400 text-[11px] mr-2">Stack:</span>
                  <div className="inline-flex flex-wrap gap-1.5">
                    {item.project.stack?.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Skills Matrix */}
            {item.type === "skills" && (
              <div className="space-y-3 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs">
                <div className="font-bold text-white border-b border-zinc-800 pb-1">
                  TECHNICAL CAPABILITY MATRIX
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {item.categories.map((cat, cIdx) => (
                    <div key={cIdx} className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80 space-y-2">
                      <div className="font-bold text-cyan-400 text-xs">{cat.category}</div>
                      <div className="space-y-1.5">
                        {cat.items.map((skill) => (
                          <div key={skill.name} className="space-y-0.5">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-zinc-300">{skill.name}</span>
                              <span className="text-[10px] text-zinc-500">{skill.proficiency}</span>
                            </div>
                            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-cyan-500 rounded-full"
                                style={{
                                  width:
                                    skill.proficiency === "Expert"
                                      ? "95%"
                                      : skill.proficiency === "Advanced"
                                      ? "85%"
                                      : "75%",
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience Timeline */}
            {item.type === "experience" && (
              <div className="space-y-3 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs">
                <div className="font-bold text-white border-b border-zinc-800 pb-1">
                  PROFESSIONAL TRACK RECORD
                </div>
                <div className="space-y-3">
                  {item.experience.map((exp, eIdx) => (
                    <div key={eIdx} className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80 space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <strong className="text-white text-xs">{exp.role}</strong>
                        <span className="text-cyan-400 text-[11px] font-mono">{exp.period}</span>
                      </div>
                      <div className="text-zinc-400 text-[11px]">
                        {exp.company} • {exp.location}
                      </div>
                      <ul className="list-disc list-inside text-zinc-300 text-[11px] space-y-0.5 pt-1">
                        {exp.highlights?.map((h, hIdx) => (
                          <li key={hIdx}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {item.type === "education" && (
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2 text-xs">
                <div className="font-bold text-white border-b border-zinc-800 pb-1">
                  ACADEMIC ACCREDITATION
                </div>
                {item.education.map((ed, edIdx) => (
                  <div key={edIdx} className="space-y-1">
                    <div className="text-cyan-400 font-bold">{ed.degree}</div>
                    <div className="text-white font-semibold">{ed.institution} ({ed.period})</div>
                    <div className="text-zinc-400 text-[11px]">{ed.location}</div>
                    <p className="text-zinc-300 text-[11px] pt-1">
                      Focus: Distributed Computing, Embedded Systems, Spatial Information Systems, Computer Architecture.
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Certifications */}
            {item.type === "certs" && (
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2 text-xs">
                <div className="font-bold text-white border-b border-zinc-800 pb-1">
                  VERIFIED CREDENTIALS ({item.certificates.length})
                </div>
                <div className="space-y-1.5">
                  {item.certificates.map((c, cIdx) => (
                    <div key={cIdx} className="flex items-center justify-between p-2 rounded bg-zinc-950/60 border border-zinc-800">
                      <div>
                        <div className="text-white font-semibold">{c.title}</div>
                        <div className="text-[10px] text-zinc-400">{c.issuer}</div>
                      </div>
                      <span className="text-[10px] text-cyan-400 font-mono">{c.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Direct Contact Channels */}
            {item.type === "contact" && (
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2.5 text-xs">
                <div className="font-bold text-white border-b border-zinc-800 pb-1">
                  DIRECT COMMUNICATION CHANNELS
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-300">
                  <a
                    href="mailto:eliasyirga575@gmail.com"
                    className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 hover:border-cyan-500 flex items-center gap-2 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <div className="text-[10px] text-zinc-500">Email Address</div>
                      <div className="text-white font-mono text-[11px]">eliasyirga575@gmail.com</div>
                    </div>
                  </a>

                  <a
                    href="https://t.me/Elawazza"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 hover:border-cyan-500 flex items-center gap-2 transition-colors"
                  >
                    <Send className="w-4 h-4 text-sky-400 shrink-0" />
                    <div>
                      <div className="text-[10px] text-zinc-500">Telegram Direct</div>
                      <div className="text-white font-mono text-[11px]">@Elawazza</div>
                    </div>
                  </a>

                  <a
                    href="https://linkedin.com/in/elias-yirga-44a19b2a7"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 hover:border-cyan-500 flex items-center gap-2 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-blue-400 shrink-0" />
                    <div>
                      <div className="text-[10px] text-zinc-500">LinkedIn Profile</div>
                      <div className="text-white font-mono text-[11px]">elias-yirga</div>
                    </div>
                  </a>

                  <a
                    href="https://github.com/eliasyirga"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 hover:border-cyan-500 flex items-center gap-2 transition-colors"
                  >
                    <Github className="w-4 h-4 text-zinc-300 shrink-0" />
                    <div>
                      <div className="text-[10px] text-zinc-500">GitHub Open Source</div>
                      <div className="text-white font-mono text-[11px]">@eliasyirga</div>
                    </div>
                  </a>
                </div>
              </div>
            )}

            {/* Recruiter Fast Track / Hire */}
            {item.type === "hire" && (
              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/60 space-y-2 text-xs">
                <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>DIRECT RECRUITER & HIRING INVITATION</span>
                </div>
                <p className="text-zinc-300 leading-relaxed">
                  Elias Yirga is available for immediate hire across Full-Stack, Backend, and Distributed Systems roles (Full-Time or Contract, Remote).
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="mailto:eliasyirga575@gmail.com?subject=Software%20Engineering%20Opportunity%20-%20Elias%20Yirga"
                    className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Hiring Email</span>
                  </a>
                  <a
                    href="https://t.me/Elawazza"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Telegram @Elawazza</span>
                  </a>
                  <a
                    href="/Elias_Yirga_CV.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg border border-zinc-700 hover:bg-zinc-800 text-zinc-300 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <FileDown className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Download CV</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Live Input Form Row */}
        <div className="pt-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(inputVal);
            }}
            className="flex items-center gap-2 text-xs sm:text-sm"
          >
            <span className="text-emerald-400 font-bold shrink-0">elias@dev-workstation</span>
            <span className="text-zinc-500 shrink-0">:</span>
            <span className="text-blue-400 shrink-0">~</span>
            <span className="text-cyan-400 font-bold shrink-0">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              placeholder="Type command... (try: 'projects', 'cat bahirlink', 'skills', 'stream')"
              className="flex-1 bg-transparent text-white placeholder-zinc-600 focus:outline-none font-mono text-xs sm:text-sm"
            />
          </form>
        </div>

        <div ref={terminalEndRef} />
      </div>

      {/* Quick Action Chips Footer */}
      <div className="relative z-10 p-2.5 px-4 bg-[#0e111a] border-t border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-xs select-none">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider mr-1">
            Quick Run:
          </span>
          {quickChips.map((chip) => (
            <button
              key={chip}
              onClick={(e) => {
                e.stopPropagation();
                handleCommand(chip);
              }}
              className="px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-cyan-400 text-[10px] font-mono transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-[10px] text-zinc-500">
          <span>Tab: Autocomplete</span>
          <span>•</span>
          <span>↑/↓: History</span>
          <span>•</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCommand("clear");
            }}
            className="text-zinc-400 hover:text-rose-400 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default TerminalCommandView;
