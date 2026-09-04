import React, { useState, useEffect } from "react";
import { 
  ArrowRight, 
  Terminal, 
  FileDown, 
  Github, 
  Linkedin, 
  Cpu, 
  Server, 
  Layers, 
  Activity, 
  CheckCircle2, 
  Copy, 
  Check,
  Database,
  Radio,
  ArrowUpRight,
  Sparkles,
  Zap,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export const HeroSection = ({ onSelectProject }) => {
  const [copied, setCopied] = useState(false);
  const [activeNode, setActiveNode] = useState("dispatcher");
  const [recruiterOpen, setRecruiterOpen] = useState(true);
  const [packetCount, setPacketCount] = useState(14820);

  // Live Packet Telemetry Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPacketCount((prev) => prev + Math.floor(Math.random() * 14) + 6);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("eliasyirga575@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

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

  const stats = [
    { label: "PRODUCTION_EXP", value: "4+ YRS", context: "Full-Stack & Distributed Backends" },
    { label: "TECHNICAL_RFCS", value: "08 SPECS", context: "High-Concurrency Architectures" },
    { label: "DISPATCH_LATENCY", value: "< 450ms", context: "p95 Pub/Sub Spatial Routing" },
    { label: "ACID_INTEGRITY", value: "99.98%", context: "Strict Relational Consistency" },
  ];

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      <div className="space-y-10">
        
        {/* Recruiter Fast-Track Executive Snapshot Banner */}
        <div className="tech-card rounded-2xl p-4 sm:p-5 border-zinc-200/90 dark:border-white/10 bg-gradient-to-r from-cyan-500/5 via-emerald-500/5 to-transparent relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div className="font-mono text-xs">
                <span className="font-bold text-zinc-900 dark:text-zinc-100">RECRUITER_FAST_TRACK:</span>{" "}
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Available for Full-Time Roles (Global Remote / Relocation)</span>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <button 
                onClick={() => setRecruiterOpen(!recruiterOpen)}
                className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <span>{recruiterOpen ? "Hide Snapshot" : "View Executive Snapshot"}</span>
                {recruiterOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {recruiterOpen && (
            <div className="mt-4 pt-4 border-t border-zinc-200/80 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-white/5 space-y-1">
                <div className="text-[10px] text-zinc-500 uppercase">Degree & Education</div>
                <div className="font-bold text-zinc-900 dark:text-white font-sans">B.Sc. Computer Engineering</div>
                <div className="text-[11px] text-zinc-600 dark:text-zinc-400">Bahir Dar University</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-white/5 space-y-1">
                <div className="text-[10px] text-zinc-500 uppercase">Core Strengths</div>
                <div className="font-bold text-zinc-900 dark:text-white font-sans">Distributed Systems & Web</div>
                <div className="text-[11px] text-zinc-600 dark:text-zinc-400">Sub-100ms p95, High Availability</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-white/5 space-y-1">
                <div className="text-[10px] text-zinc-500 uppercase">Primary Stack</div>
                <div className="font-bold text-zinc-900 dark:text-white font-sans">TypeScript, Node, Go, React</div>
                <div className="text-[11px] text-zinc-600 dark:text-zinc-400">PostgreSQL, PostGIS, Redis, Docker</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-white/5 flex flex-col justify-between">
                <div className="text-[10px] text-zinc-500 uppercase">Fast Action</div>
                <div className="flex items-center gap-2 pt-1">
                  <a
                    href="/Elias_Yirga_CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-1 rounded bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-bold hover:scale-102 transition-transform"
                  >
                    1-Click CV
                  </a>
                  <a
                    href="#contact"
                    className="flex-1 text-center py-1 rounded border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Monolithic Headline & Interactive Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-mono text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ARCHITECTURAL DOSSIER & RFC PORTFOLIO</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-[1.06] font-sans">
                Elias Yirga.
                <br />
                <span className="bg-gradient-to-r from-zinc-700 via-zinc-900 to-zinc-600 dark:from-zinc-200 dark:via-zinc-400 dark:to-zinc-500 bg-clip-text text-transparent font-medium">
                  Full-stack software & distributed systems engineer.
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-xl leading-relaxed font-sans">
              I design and deploy resilient event-driven architectures, low-latency spatial dispatch pipelines, and performant web interfaces backed by clean relational schema design.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-gradient-to-r from-zinc-900 to-zinc-800 hover:from-black hover:to-zinc-900 text-white dark:from-zinc-100 dark:to-zinc-200 dark:hover:from-white dark:hover:to-zinc-100 dark:text-zinc-950 font-mono text-xs font-bold transition-all shadow-lg hover:shadow-xl hover:scale-102 active:scale-98 text-center"
              >
                <span>EXPLORE_PROJECT_RFCS</span>
                <ArrowRight className="w-4 h-4 text-cyan-400 dark:text-cyan-600" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-zinc-300 dark:border-white/15 hover:border-zinc-900 dark:hover:border-white text-zinc-900 dark:text-zinc-100 bg-white/50 dark:bg-zinc-900/40 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 font-mono text-xs font-semibold transition-all text-center shadow-sm"
              >
                <span>TRANSMIT_MESSAGE</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>

              <button
                onClick={copyEmail}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50/80 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-mono text-xs transition-all shadow-sm group"
                title="Copy direct email"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 opacity-50 group-hover:opacity-100" />}
                <span className="truncate">{copied ? "COPIED TO CLIPBOARD" : "eliasyirga575@gmail.com"}</span>
              </button>
            </div>
          </div>

          {/* Interactive Live Architecture Inspector Workbench */}
          <div className="lg:col-span-5 w-full">
            <div className="tech-card rounded-2xl p-5 sm:p-6 border-zinc-300 dark:border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">SYSTEM_TOPOLOGY_MONITOR</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-zinc-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>{packetCount.toLocaleString()} MSGS</span>
                </div>
              </div>

              {/* Node Selector Buttons */}
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                {Object.keys(topologyNodes).map((key) => {
                  const isSelected = activeNode === key;
                  const node = topologyNodes[key];
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveNode(key)}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        isSelected
                          ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 border-zinc-900 dark:border-zinc-100 font-bold shadow-md scale-[1.02]"
                          : "border-zinc-200 dark:border-white/5 bg-zinc-50/80 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-white/20"
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

              {/* Selected Node Details Display */}
              <div className="p-4 rounded-xl bg-zinc-100/90 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/5 space-y-2.5 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">PROTOCOL:</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-right truncate ml-2 bg-zinc-200/70 dark:bg-zinc-800/80 px-2 py-0.5 rounded text-[11px]">{topologyNodes[activeNode].protocol}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">P95_LATENCY:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{topologyNodes[activeNode].p95} (Sub-Second)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">THROUGHPUT:</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">{topologyNodes[activeNode].throughput}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">HEALTH_STATE:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{topologyNodes[activeNode].status} // {topologyNodes[activeNode].load} LOAD</span>
                  </span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed pt-2 border-t border-zinc-200 dark:border-zinc-800 font-sans">
                  {topologyNodes[activeNode].desc}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-1">
                <span>Cluster: AWS / Docker Container</span>
                <span className="text-emerald-500 font-bold">Uptime: 99.98%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Telemetry Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 pt-2">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="tech-card rounded-xl p-4 sm:p-5 border-zinc-200/90 dark:border-white/10 space-y-1 hover:border-zinc-400 dark:hover:border-white/20 transition-all group"
            >
              <div className="text-xs font-mono text-zinc-500 flex items-center justify-between">
                <span>//{stat.label}</span>
                <Zap className="w-3.5 h-3.5 text-cyan-500 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-zinc-900 dark:text-zinc-50 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 font-sans">
                {stat.context}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
