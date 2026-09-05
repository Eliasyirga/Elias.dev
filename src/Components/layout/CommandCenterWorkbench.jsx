import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { projects } from "../../data/projects";
import { skillCategories } from "../../data/skills";
import { experience, education } from "../../data/experience";
import { certificates, testimonials } from "../../data/testimonials";
import { ProjectModal } from "../features/ProjectModal";
import {
  Terminal,
  Activity,
  Cpu,
  Layers,
  FileCode,
  Briefcase,
  GraduationCap,
  Award,
  Send,
  Sparkles,
  ShieldCheck,
  Sun,
  Moon,
  Github,
  Linkedin,
  Mail,
  FileDown,
  Copy,
  Check,
  Search,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  Maximize2,
  Clock,
  MapPin,
  Menu,
  X,
  Play,
  RotateCcw,
  Radio,
  Zap,
  LayoutGrid,
  ListFilter
} from "lucide-react";

export const CommandCenterWorkbench = ({ onToggleMode, isCommandCenterMode }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [searchParams, setSearchParams] = useSearchParams();

  // Active Workspace Tab
  const [activeTab, setActiveTab] = useState("overview"); // overview, projects, skills, history, credentials, terminal, contact
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [copied, setCopied] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Live Packet Telemetry & Clock
  const [packetCount, setPacketCount] = useState(15420);
  const [currentTime, setCurrentTime] = useState("");
  const [selectedNode, setSelectedNode] = useState("dispatcher");

  // Terminal Interactive State
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState([
    { type: "system", text: "ELIAS.DEV KERNEL v4.2.0-RELEASE (x86_64-pc-none-elf)" },
    { type: "system", text: "Type 'help' to inspect available system commands or 'projects' to list RFCs." }
  ]);
  const terminalBottomRef = useRef(null);

  // Skills search
  const [skillSearch, setSkillSearch] = useState("");
  // Project filter
  const [projectCategory, setProjectCategory] = useState("All");

  // Contact form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [inquiryType, setInquiryType] = useState("Full-Time Role");

  // Real-Time Clock & Telemetry Tick
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
        }) + " EAT (UTC+3)"
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    const packetTimer = setInterval(() => {
      setPacketCount((prev) => prev + Math.floor(Math.random() * 12) + 4);
    }, 1200);

    return () => {
      clearInterval(timer);
      clearInterval(packetTimer);
    };
  }, []);

  // Handle URL RFC Params
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

  const copyEmail = () => {
    navigator.clipboard.writeText("eliasyirga575@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const copyCli = () => {
    navigator.clipboard.writeText("npx eliasyirga");
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2200);
  };

  // Terminal Command Executor
  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...terminalHistory, { type: "user", text: `$ ${terminalInput}` }];

    switch (cmd) {
      case "help":
        newHistory.push({
          type: "system",
          text: "Available Commands:\n  - whoami        : View engineer credentials\n  - projects      : List all 8 production systems\n  - skills        : Print core tech stack\n  - topology      : Inspect live node cluster\n  - contact       : View communication channels\n  - cv            : Open download link for PDF Resume\n  - clear         : Clear terminal console\n  - sudo hire     : Fast-track recruiter action",
        });
        break;
      case "whoami":
        newHistory.push({
          type: "output",
          text: "Elias Yirga // B.Sc. Computer Engineering Graduate (Bahir Dar University)\nFocus: Distributed Systems, Low-Latency Spatial Backends & Modern Web Architectures.",
        });
        break;
      case "projects":
      case "rfcs":
        newHistory.push({
          type: "output",
          text: projects
            .map(
              (p) => `[${p.rfcId || "SPEC"}] ${p.title.padEnd(26)} -> p95: ${p.metrics?.[0]?.value || "45ms"} (${p.category})`
            )
            .join("\n"),
        });
        break;
      case "skills":
      case "stack":
        newHistory.push({
          type: "output",
          text: "Core Stack: TypeScript, Node.js, Go, React, Next.js, PostgreSQL, PostGIS, Redis, Docker, TailwindCSS.",
        });
        break;
      case "topology":
        newHistory.push({
          type: "output",
          text: "Cluster Status: 4 Nodes Online\n- Dispatcher (WSS): 18ms p95 [OPTIMAL]\n- Spatial PostGIS: 42ms p95 [INDEXED]\n- Redis Pub/Sub: 3.2ms p95 [SYNCED]\n- API Gateway: 8.5ms p95 [HEALTHY]",
        });
        break;
      case "contact":
        newHistory.push({
          type: "output",
          text: "Email: eliasyirga575@gmail.com\nTelegram: @Elawazza\nGitHub: github.com/eliasyirga\nLinkedIn: linkedin.com/in/elias-yirga-44a19b2a7",
        });
        break;
      case "cv":
      case "resume":
        window.open("/Elias_Yirga_CV.pdf", "_blank");
        newHistory.push({ type: "output", text: "Opening /Elias_Yirga_CV.pdf in a new tab..." });
        break;
      case "sudo hire":
      case "hire":
        setActiveTab("contact");
        newHistory.push({ type: "success", text: "SUCCESS: Switching active pane to TRANSMISSION_HUB..." });
        break;
      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      default:
        newHistory.push({
          type: "error",
          text: `zsh: command not found: ${cmd}. Type 'help' for valid commands.`,
        });
    }

    setTerminalHistory(newHistory);
    setTerminalInput("");
    setTimeout(() => {
      terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const navItems = [
    { id: "overview", label: "01 // SYSTEM OVERVIEW", icon: Activity, desc: "Topology & Telemetry" },
    { id: "projects", label: "02 // PRODUCTION RFCS", icon: FileCode, desc: "8 Scaled Systems", badge: "8" },
    { id: "skills", label: "03 // CAPABILITY MATRIX", icon: Cpu, desc: "Technical Stack" },
    { id: "history", label: "04 // TRACK RECORD", icon: Briefcase, desc: "Experience & Degree" },
    { id: "credentials", label: "05 // ACCREDITATIONS", icon: Award, desc: "Certificates & Proof" },
    { id: "terminal", label: "06 // CLI SANDBOX", icon: Terminal, desc: "Interactive Shell" },
    { id: "contact", label: "07 // TRANSMISSION HUB", icon: Send, desc: "Direct Recruiter Link" },
  ];

  const topologyNodes = {
    dispatcher: {
      name: "WebSocket Dispatcher",
      protocol: "WSS / TCP-8080",
      p95: "18ms",
      throughput: "12,400 msg/s",
      desc: "Full-duplex bidirectional event bus for continuous GPS telemetry and field dispatch commands.",
      status: "HEALTHY",
      load: "42%",
    },
    spatial: {
      name: "PostGIS Spatial Engine",
      protocol: "RDBMS / PostGIS 15",
      p95: "42ms",
      throughput: "4,800 query/s",
      desc: "Multi-polygon boundary geofencing and real-time nearest-responder routing algorithms.",
      status: "INDEXED",
      load: "58%",
    },
    pubsub: {
      name: "Redis Pub/Sub Layer",
      protocol: "In-Memory / RESP3",
      p95: "3.2ms",
      throughput: "35,000 op/s",
      desc: "Low-latency message broker distributing incident alerts across municipal agency nodes.",
      status: "SYNCED",
      load: "29%",
    },
    gateway: {
      name: "Edge API Gateway",
      protocol: "HTTP/3 + TLS 1.3",
      p95: "8.5ms",
      throughput: "18,500 req/s",
      desc: "Rate limiting, JWT token validation, and reverse-proxy routing to downstream clusters.",
      status: "OPTIMAL",
      load: "36%",
    },
  };

  const filteredProjects = projects.filter((p) => {
    if (projectCategory === "All") return true;
    return (
      p.category?.toLowerCase().includes(projectCategory.toLowerCase()) ||
      p.stack?.some((s) => s.toLowerCase().includes(projectCategory.toLowerCase()))
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-cyan-500 selection:text-white dark:selection:bg-cyan-400 dark:selection:text-zinc-950">
      
      {/* 1. TOP SYSTEM BAR */}
      <header className="sticky top-0 z-40 h-14 border-b border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-[#0c0c10]/90 backdrop-blur-xl flex items-center justify-between px-3 sm:px-6 font-mono text-xs shadow-sm">
        {/* Left: Branding & Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-1.5 rounded-lg border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Toggle Navigation Sidebar"
          >
            {mobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-7 h-7 rounded-lg overflow-hidden border border-zinc-300 dark:border-zinc-700 shadow-sm">
              <img src="/vv.webp" alt="Elias Yirga" className="w-full h-full object-cover" />
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white dark:ring-zinc-900" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-zinc-100 leading-none">
                <span>ELIAS.DEV</span>
                <span className="text-[10px] text-zinc-400 font-normal hidden sm:inline">:: WORKBENCH_OS</span>
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold leading-none mt-0.5">
                ● OPERATIONAL // FULL-TIME READY
              </span>
            </div>
          </div>
        </div>

        {/* Center: Live Telemetry Ticker (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-4 text-[11px] text-zinc-500 bg-zinc-100/70 dark:bg-zinc-900/60 px-3 py-1 rounded-full border border-zinc-200 dark:border-white/5">
          <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
            <Clock className="w-3.5 h-3.5 text-cyan-500" />
            <span>{currentTime || "00:00:00 UTC+3"}</span>
          </div>
          <span className="text-zinc-300 dark:text-zinc-700">|</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{packetCount.toLocaleString()} MSGS STREAMED</span>
          </div>
        </div>

        {/* Right: Mode Switcher & Quick Actions */}
        <div className="flex items-center gap-2">
          {/* CLI pill */}
          <button
            onClick={copyCli}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-300"
            title="Click to copy 'npx eliasyirga'"
          >
            <Terminal className="w-3 h-3 text-cyan-500" />
            <span>npx eliasyirga</span>
            {copiedCli ? <Check className="w-3 h-3 text-emerald-500 ml-1" /> : <Copy className="w-3 h-3 opacity-40 ml-1" />}
          </button>

          {/* 1-Click CV */}
          <a
            href="/Elias_Yirga_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-[11px] shadow-sm hover:scale-102 transition-transform"
          >
            <FileDown className="w-3 h-3 text-cyan-400 dark:text-cyan-600" />
            <span>CV.PDF</span>
          </a>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-500" />}
          </button>
        </div>
      </header>

      {/* 2. DUAL-PANE BODY */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT WORKSPACE SIDEBAR (Desktop Fixed, Mobile Drawer) */}
        <aside
          className={`${
            mobileSidebarOpen ? "fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-[#0c0c10] shadow-2xl flex flex-col" : "hidden lg:flex"
          } lg:static lg:w-72 shrink-0 border-r border-zinc-200 dark:border-white/10 flex-col justify-between bg-zinc-50/50 dark:bg-[#09090c]/80 select-none`}
        >
          {/* Mobile Close Button */}
          {mobileSidebarOpen && (
            <div className="lg:hidden flex items-center justify-between p-4 border-b border-zinc-200 dark:border-white/10 font-mono text-xs">
              <span className="font-bold text-zinc-900 dark:text-zinc-100">NAVIGATION_DRAWER</span>
              <button onClick={() => setMobileSidebarOpen(false)} className="p-1 rounded border border-zinc-200 dark:border-zinc-800">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Engineer Profile Bio Card */}
          <div className="p-4 border-b border-zinc-200 dark:border-white/10 space-y-3 font-mono text-xs">
            <div className="space-y-1">
              <div className="font-bold text-zinc-900 dark:text-zinc-100 text-sm font-sans">Elias Yirga</div>
              <div className="text-[11px] text-zinc-500">B.Sc. Computer Engineering</div>
              <div className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold">Distributed Systems & Web</div>
            </div>

            <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 space-y-1 text-[11px]">
              <div className="text-zinc-500 text-[10px] uppercase">Availability Status</div>
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>OPEN FOR ROLES (REMOTE)</span>
              </div>
            </div>
          </div>

          {/* Navigation Workspace Tabs */}
          <div className="flex-1 p-3 space-y-1 overflow-y-auto font-mono text-xs">
            <div className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase px-3 py-1 tracking-wider">
              WORKSTATION_PANES
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
                    isActive
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-md scale-[1.01]"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-cyan-400 dark:text-cyan-600" : "text-zinc-400"}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? "bg-cyan-500 text-white dark:bg-zinc-900 dark:text-cyan-400" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Sidebar Socials & Email */}
          <div className="p-3 border-t border-zinc-200 dark:border-white/10 bg-white/60 dark:bg-zinc-900/60 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between text-zinc-500 text-[11px]">
              <span>Direct Link:</span>
              <button onClick={copyEmail} className="text-zinc-700 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 font-bold flex items-center gap-1">
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copied" : "Copy Email"}</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-1 pt-1">
              <a
                href="https://github.com/eliasyirga"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-900 flex justify-center items-center text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
                title="GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/elias-yirga-44a19b2a7"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-900 flex justify-center items-center text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
                title="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-500" />
              </a>
              <a
                href="https://t.me/Elawazza"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-900 flex justify-center items-center text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
                title="Telegram @Elawazza"
              >
                <Send className="w-3.5 h-3.5 text-sky-400" />
              </a>
            </div>
          </div>
        </aside>

        {/* RIGHT ACTIVE WORKBENCH STAGE */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 space-y-8 bg-ambient-mesh max-w-6xl mx-auto w-full">

          {/* TAB 1: SYSTEM OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Monolithic Lead Card */}
              <div className="tech-card rounded-2xl p-6 sm:p-8 border-zinc-300 dark:border-white/10 space-y-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
                
                <div className="space-y-3 relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-mono text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>COMMAND_CENTER // ACTIVE WORKBENCH</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight">
                    Elias Yirga
                    <br />
                    <span className="bg-gradient-to-r from-zinc-700 via-zinc-900 to-zinc-600 dark:from-zinc-200 dark:via-zinc-400 dark:to-zinc-500 bg-clip-text text-transparent font-medium">
                      Distributed Systems & Full-Stack Architect
                    </span>
                  </h1>

                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed font-sans">
                    Designing resilient event-driven dispatch pipelines, low-latency spatial queries (PostGIS, Redis, Node.js), and zero-CLS web applications backed by rigid ACID schema design.
                  </p>
                </div>

                {/* Fast Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
                  <button
                    onClick={() => setActiveTab("projects")}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-black text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-950 font-bold shadow-md transition-all active:scale-95"
                  >
                    <FileCode className="w-4 h-4 text-cyan-400 dark:text-cyan-600" />
                    <span>EXPLORE_8_RFCS</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("terminal")}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-white/10 bg-zinc-50/80 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold transition-all shadow-sm"
                  >
                    <Terminal className="w-4 h-4 text-cyan-500" />
                    <span>LAUNCH_CLI_SHELL</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("contact")}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-white/10 bg-zinc-50/80 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold transition-all shadow-sm"
                  >
                    <Send className="w-4 h-4 text-emerald-500" />
                    <span>DIRECT_TRANSMISSION</span>
                  </button>
                </div>
              </div>

              {/* Interactive Topology Monitor & Stats Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Node Monitor */}
                <div className="lg:col-span-7 tech-card rounded-2xl p-6 border-zinc-300 dark:border-white/10 space-y-4 shadow-lg">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-white/10 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">SYSTEM_TOPOLOGY_MONITOR</span>
                    </div>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">AWS DOCKER CLUSTER</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                    {Object.keys(topologyNodes).map((key) => {
                      const isSelected = selectedNode === key;
                      const node = topologyNodes[key];
                      return (
                        <button
                          key={key}
                          onClick={() => setSelectedNode(key)}
                          className={`p-3 rounded-xl text-left border transition-all ${
                            isSelected
                              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 border-zinc-900 dark:border-zinc-100 font-bold shadow-md"
                              : "border-zinc-200 dark:border-white/5 bg-zinc-50/80 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400"
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] opacity-70">
                            <span>NODE://{key}</span>
                            <span className="text-emerald-500 font-bold">{node.p95}</span>
                          </div>
                          <div className="truncate font-semibold mt-0.5">{node.name}</div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-100/90 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/5 space-y-2 font-mono text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500">PROTOCOL:</span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200 bg-zinc-200/80 dark:bg-zinc-800 px-2 py-0.5 rounded text-[11px]">
                        {topologyNodes[selectedNode].protocol}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500">P95_LATENCY:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{topologyNodes[selectedNode].p95} (Sub-Second)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500">THROUGHPUT:</span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">{topologyNodes[selectedNode].throughput}</span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 font-sans pt-2 border-t border-zinc-200 dark:border-zinc-800">
                      {topologyNodes[selectedNode].desc}
                    </p>
                  </div>
                </div>

                {/* Telemetry Stats */}
                <div className="lg:col-span-5 space-y-3">
                  {[
                    { label: "PRODUCTION_EXPERIENCE", val: "4+ YEARS", desc: "Distributed Backends & Frontend" },
                    { label: "TECHNICAL_RFCS", val: "08 SPECS", desc: "High-Concurrency Architectures" },
                    { label: "DISPATCH_LATENCY", val: "< 450ms", desc: "p95 Spatial Emergency Dispatch" },
                    { label: "ACID_INTEGRITY", val: "99.98%", desc: "Strict Relational Consistency" },
                  ].map((s, idx) => (
                    <div key={idx} className="tech-card rounded-xl p-4 border-zinc-200/90 dark:border-white/10 flex items-center justify-between font-mono">
                      <div>
                        <div className="text-[10px] text-zinc-500 uppercase">//{s.label}</div>
                        <div className="text-xl font-bold text-zinc-900 dark:text-white mt-0.5">{s.val}</div>
                        <div className="text-[11px] text-zinc-500 font-sans">{s.desc}</div>
                      </div>
                      <Zap className="w-4 h-4 text-cyan-500 opacity-60" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTION RFCS */}
          {activeTab === "projects" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-white/10">
                <div className="space-y-1 font-mono">
                  <div className="text-xs text-cyan-500 font-bold">// 02 SPECIFICATIONS</div>
                  <h2 className="text-2xl font-black text-zinc-900 dark:text-white font-sans">
                    Production Systems & Architectural RFCs
                  </h2>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 font-mono text-xs">
                  {["All", "Distributed Systems", "Full-Stack", "Realtime", "Mobile"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setProjectCategory(cat)}
                      className={`px-3 py-1 rounded-lg text-xs transition-all ${
                        projectCategory === cat
                          ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="tech-card rounded-2xl p-6 border-zinc-200/90 dark:border-white/10 flex flex-col justify-between space-y-4 hover:border-zinc-400 dark:hover:border-white/20 transition-all shadow-md group"
                  >
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="font-bold text-cyan-600 dark:text-cyan-400">
                          [{project.rfcId || "SPEC-001"}]
                        </span>
                        <span className="text-zinc-500 text-[11px]">{project.category}</span>
                      </div>

                      <div className="space-y-1">
                        <h3
                          onClick={() => setActiveProjectModal(project)}
                          className="text-lg font-bold text-zinc-900 dark:text-zinc-100 cursor-pointer group-hover:text-cyan-600 dark:group-hover:text-cyan-400 flex items-center justify-between font-sans transition-colors"
                        >
                          <span>{project.title}</span>
                          <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                        </h3>
                        <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 line-clamp-1">
                          {project.headline}
                        </p>
                      </div>

                      {project.image && (
                        <div
                          onClick={() => setActiveProjectModal(project)}
                          className="rounded-xl border border-zinc-200 dark:border-white/5 overflow-hidden bg-zinc-950 h-44 cursor-pointer relative group/thumb shadow-inner"
                        >
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover object-top opacity-90 group-hover/thumb:opacity-100 group-hover/thumb:scale-102 transition-all duration-300"
                          />
                        </div>
                      )}

                      <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2 leading-relaxed font-sans">
                        {project.problemStatement || project.rfc?.summary}
                      </p>

                      <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                        {project.stack?.slice(0, 4).map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/5 text-[11px]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between font-mono text-xs">
                      <button
                        onClick={() => setActiveProjectModal(project)}
                        className="font-bold text-zinc-900 dark:text-zinc-100 hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center gap-1.5"
                      >
                        <FileCode className="w-3.5 h-3.5 text-cyan-500" />
                        <span>INSPECT_RFC_SPEC</span>
                        <span>→</span>
                      </button>

                      <div className="flex items-center gap-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                            title="Live URL"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                            title="GitHub"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CAPABILITY MATRIX */}
          {activeTab === "skills" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-white/10">
                <div className="space-y-1 font-mono">
                  <div className="text-xs text-cyan-500 font-bold">// 03 DOMAIN_MATRIX</div>
                  <h2 className="text-2xl font-black text-zinc-900 dark:text-white font-sans">
                    Technical Stack & Core Primitives
                  </h2>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search primitive..."
                    value={skillSearch}
                    onChange={(e) => setSkillSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-xs font-mono text-zinc-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="space-y-8">
                {skillCategories.map((cat) => {
                  const filtered = cat.items.filter((item) =>
                    !skillSearch
                      ? true
                      : item.name.toLowerCase().includes(skillSearch.toLowerCase()) ||
                        item.context.toLowerCase().includes(skillSearch.toLowerCase())
                  );

                  if (filtered.length === 0) return null;

                  return (
                    <div key={cat.category} className="space-y-3 font-mono">
                      <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-white/10 text-xs">
                        <span className="font-bold text-zinc-900 dark:text-zinc-100">{cat.category}</span>
                        <span className="text-zinc-500 text-[11px]">{filtered.length} Items</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filtered.map((skill, idx) => (
                          <div
                            key={idx}
                            className="tech-card rounded-2xl p-4 border-zinc-200/90 dark:border-white/10 space-y-2 shadow-sm"
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-zinc-900 dark:text-zinc-100">{skill.name}</span>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                                {skill.proficiency}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
                              {skill.context}
                            </p>
                            <div className="pt-2 border-t border-zinc-200 dark:border-white/5 text-[11px] text-zinc-500 flex justify-between">
                              <span>EXP:</span>
                              <span className="font-bold text-zinc-800 dark:text-zinc-200">{skill.experienceYears}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: TRACK RECORD */}
          {activeTab === "history" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1 font-mono pb-4 border-b border-zinc-200 dark:border-white/10">
                <div className="text-xs text-cyan-500 font-bold">// 04 CAREER_TRACK</div>
                <h2 className="text-2xl font-black text-zinc-900 dark:text-white font-sans">
                  Engineering Positions & Education
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="font-mono text-xs uppercase font-bold text-zinc-500 pb-2 border-b border-zinc-200 dark:border-white/10 flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-cyan-500" />
                    <span>INDUSTRY_EXPERIENCE</span>
                  </div>

                  {experience.map((exp) => (
                    <div key={exp.id} className="tech-card rounded-2xl p-5 border-zinc-200/90 dark:border-white/10 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-base text-zinc-900 dark:text-white font-sans">{exp.role}</div>
                          <div className="font-mono text-xs text-cyan-600 dark:text-cyan-400">{exp.company} // {exp.location}</div>
                        </div>
                        <span className="font-mono text-xs text-zinc-500">{exp.period}</span>
                      </div>

                      <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300 font-sans list-disc list-inside">
                        {exp.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="font-mono text-xs uppercase font-bold text-zinc-500 pb-2 border-b border-zinc-200 dark:border-white/10 flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
                    <span>ACADEMIC_QUALIFICATION</span>
                  </div>

                  {education.map((edu) => (
                    <div key={edu.id} className="tech-card rounded-2xl p-5 border-zinc-200/90 dark:border-white/10 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-base text-zinc-900 dark:text-white font-sans">{edu.degree}</div>
                          <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400">{edu.institution} // {edu.location}</div>
                        </div>
                        <span className="font-mono text-xs text-zinc-500">{edu.period}</span>
                      </div>

                      <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300 font-sans list-disc list-inside">
                        {edu.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ACCREDITATIONS */}
          {activeTab === "credentials" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1 font-mono pb-4 border-b border-zinc-200 dark:border-white/10">
                <div className="text-xs text-cyan-500 font-bold">// 05 CREDENTIALS</div>
                <h2 className="text-2xl font-black text-zinc-900 dark:text-white font-sans">
                  Verified Certifications & Endorsements
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {certificates.map((cert) => {
                  const imgSrc = cert.src || cert.image;
                  return (
                    <div key={cert.id} className="tech-card rounded-2xl p-5 border-zinc-200/90 dark:border-white/10 space-y-3 flex flex-col justify-between">
                      <div className="space-y-2 font-mono">
                        <div className="flex justify-between text-[11px] text-zinc-500 pb-1 border-b border-zinc-200 dark:border-white/5">
                          <span className="font-bold text-zinc-900 dark:text-zinc-100">{cert.issuer}</span>
                          <span>{cert.date}</span>
                        </div>
                        <h4 className="font-bold text-sm text-zinc-900 dark:text-white font-sans">{cert.title}</h4>
                        {imgSrc && (
                          <div className="aspect-[16/10] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-200 dark:border-white/5">
                            <img src={imgSrc} alt={cert.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        {cert.description && (
                          <p className="text-xs text-zinc-600 dark:text-zinc-300 font-sans line-clamp-3">{cert.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-bold pt-2 border-t border-zinc-200 dark:border-white/5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>VERIFIED_CREDENTIAL</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 6: INTERACTIVE TERMINAL SANDBOX */}
          {activeTab === "terminal" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1 font-mono pb-3 border-b border-zinc-200 dark:border-white/10">
                <div className="text-xs text-cyan-500 font-bold">// 06 SHELL_EMULATOR</div>
                <h2 className="text-2xl font-black text-zinc-900 dark:text-white font-sans">
                  Interactive Engineer Terminal
                </h2>
              </div>

              <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-5 font-mono text-xs text-zinc-300 shadow-2xl space-y-4 min-h-[420px] flex flex-col justify-between">
                {/* Console Log Area */}
                <div className="space-y-2 overflow-y-auto max-h-[360px] pr-2">
                  {terminalHistory.map((item, idx) => (
                    <div
                      key={idx}
                      className={`leading-relaxed whitespace-pre-wrap ${
                        item.type === "user"
                          ? "text-cyan-400 font-bold"
                          : item.type === "system"
                          ? "text-zinc-500"
                          : item.type === "error"
                          ? "text-rose-400"
                          : item.type === "success"
                          ? "text-emerald-400 font-bold"
                          : "text-zinc-300"
                      }`}
                    >
                      {item.text}
                    </div>
                  ))}
                  <div ref={terminalBottomRef} />
                </div>

                {/* Input Prompt */}
                <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-3 border-t border-zinc-800">
                  <span className="text-emerald-400 font-bold">elias@portfolio:~#</span>
                  <input
                    type="text"
                    autoFocus
                    placeholder="type 'help', 'projects', 'skills', 'contact', 'cv'..."
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    className="flex-1 bg-transparent text-white focus:outline-none text-xs font-mono placeholder-zinc-600"
                  />
                  <button type="submit" className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-[11px]">
                    EXEC
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 7: TRANSMISSION HUB */}
          {activeTab === "contact" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1 font-mono pb-4 border-b border-zinc-200 dark:border-white/10">
                <div className="text-xs text-cyan-500 font-bold">// 07 TRANSMISSION_HUB</div>
                <h2 className="text-2xl font-black text-zinc-900 dark:text-white font-sans">
                  Direct Engineering Inquiry Channel
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-5 tech-card rounded-2xl p-6 border-zinc-200/90 dark:border-white/10 space-y-4 font-mono text-xs">
                  <div className="font-bold text-zinc-900 dark:text-white text-sm">CONTACT_DIRECTIVES</div>
                  <p className="text-zinc-600 dark:text-zinc-400 font-sans">
                    Available for full-time distributed backend & full-stack roles, system design reviews, and high-concurrency projects.
                  </p>
                  <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 space-y-2">
                    <div className="text-[10px] text-zinc-500">PRIMARY_EMAIL</div>
                    <div className="font-bold text-zinc-900 dark:text-white break-all">eliasyirga575@gmail.com</div>
                    <button
                      onClick={copyEmail}
                      className="w-full py-1.5 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold text-xs"
                    >
                      {copied ? "COPIED TO CLIPBOARD" : "COPY EMAIL"}
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 tech-card rounded-2xl p-6 border-zinc-200/90 dark:border-white/10">
                  {formSubmitted ? (
                    <div className="p-8 text-center space-y-3 font-mono text-xs">
                      <div className="w-10 h-10 rounded-full border-2 border-emerald-500 text-emerald-500 flex items-center justify-center mx-auto">
                        <Check className="w-5 h-5" />
                      </div>
                      <div className="font-bold text-base text-zinc-900 dark:text-white font-sans">Message Dispatched</div>
                      <p className="text-zinc-500 font-sans">Thank you! Your message regarding {inquiryType} has been received.</p>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setFormSubmitted(true);
                      }}
                      className="space-y-4 font-mono text-xs"
                    >
                      <div className="space-y-1">
                        <label className="text-zinc-500">SENDER_NAME</label>
                        <input
                          type="text"
                          required
                          placeholder="Your Name / Organization"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 text-xs text-zinc-900 dark:text-white font-sans"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-zinc-500">EMAIL_ADDRESS</label>
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 text-xs text-zinc-900 dark:text-white font-sans"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-zinc-500">PAYLOAD</label>
                        <textarea
                          rows={3}
                          required
                          placeholder="Role scope or inquiry details..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 text-xs text-zinc-900 dark:text-white font-sans resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold shadow-md hover:scale-102 transition-transform"
                      >
                        DISPATCH_TRANSMISSION
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* RFC Technical Inspector Modal */}
      {activeProjectModal && (
        <ProjectModal project={activeProjectModal} onClose={() => setActiveProjectModal(null)} />
      )}
    </div>
  );
};

export default CommandCenterWorkbench;
