import React, { useState, useEffect, useRef } from "react";
import { Terminal, Code2, Activity, GitBranch, Play, Copy, Check, CornerDownLeft, Sparkles, Server, Network } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { projects } from "@/data/projects";

export const InteractiveCyberTerminal = () => {
  const [activeTab, setActiveTab] = useState("terminal"); // 'terminal' | 'editor' | 'telemetry' | 'topology'
  const [inputVal, setInputVal] = useState("");
  const [copied, setCopied] = useState(false);
  const [commandHistory, setCommandHistory] = useState([
    {
      type: "system",
      text: "SYSTEM_INITIALIZED: Cluster node online. Type 'help' or click quick pills below for available commands.",
    },
    {
      type: "command",
      cmd: "whoami",
    },
    {
      type: "output",
      text: "Elias Yirga — Principal Full-Stack & Systems Software Architect. Specializing in low-latency distributed web applications and high-density React frontend architectures.",
    },
  ]);

  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Scroll terminal to bottom
  useEffect(() => {
    if (activeTab === "terminal") {
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [commandHistory, activeTab]);

  const executeCommand = (cmdText) => {
    const raw = cmdText.trim();
    if (!raw) return;

    const parts = raw.split(" ");
    const command = parts[0].toLowerCase();

    const newEntries = [{ type: "command", cmd: raw }];

    switch (command) {
      case "help":
        newEntries.push({
          type: "output",
          text: `AVAILABLE COMMANDS:
  • help           - Display command dictionary
  • bio            - View full engineering background summary
  • projects       - List production releases & RFC architectures
  • project <name> - Open dedicated case study RFC (e.g. 'project bahirlink')
  • skills / stack - Inspect engineering capabilities matrix
  • metrics        - Check live p95 latency and concurrency benchmarks
  • contact        - View direct communication channels
  • clear          - Reset terminal screen buffer
  • resume / cv    - Open curriculum vitae document`,
        });
        break;

      case "bio":
        newEntries.push({
          type: "output",
          text: "Elias Yirga: B.Sc. Computer Engineering (Bahir Dar University). Experience at Alyah Software and Eaglelion Systems. Specialized in PostgreSQL/PostGIS spatial data layers, Node.js distributed pipelines, and React micro-frontends.",
        });
        break;

      case "projects":
        newEntries.push({
          type: "output",
          text: `DEPLOYED PRODUCTION RELEASES (Type 'project <name>' to view RFC):
  [1] bahirlink           - Unified Emergency Response Distributed System
  [2] jobify              - Enterprise Recruitment Pipeline & Aggregation
  [3] vintage-marketplace - High-Concurrence C2C E-Commerce Escrow Protocol
  [4] grovelink           - Enterprise Multi-Regional Corporate Platform
  [5] chillmovies         - Media Catalog & Real-Time Discovery Engine
  [6] tarikshiro          - High-Conversion Hospitality Ordering Engine
  [7] ethioamber          - Global B2B Export & Trade Infrastructure
  [8] marmik              - Corporate Architectural Engineering Identity`,
        });
        break;

      case "project":
        const slug = parts[1]?.toLowerCase();
        if (!slug) {
          newEntries.push({
            type: "error",
            text: "Usage: project <slug> (e.g. 'project bahirlink' or 'project jobify')",
          });
        } else {
          const match = projects.find((p) => p.slug === slug || p.id === slug);
          if (match) {
            newEntries.push({
              type: "success",
              text: `Navigating to RFC Deep Dive for '${match.title}'...`,
            });
            setTimeout(() => navigate(`/projects/${match.slug}`), 600);
          } else {
            newEntries.push({
              type: "error",
              text: `Error: Project '${slug}' not located in release registry. Type 'projects' to list all.`,
            });
          }
        }
        break;

      case "skills":
      case "stack":
        newEntries.push({
          type: "output",
          text: `TECHNICAL STACK & DOMAINS:
  • Languages: JavaScript (ES6+), TypeScript, Python, Dart, C++, Java, SQL
  • Frontend:  React, Next.js, Tailwind CSS, Zustand, Framer Motion, Zero CLS
  • Backend:   Node.js, Express, PostgreSQL, PostGIS, MongoDB, Redis Pub/Sub
  • Systems:   Docker, WebSockets, Linux/Bash, Cloudflare CDN, Vite, CI/CD`,
        });
        break;

      case "metrics":
        newEntries.push({
          type: "output",
          text: `SYSTEM TELEMETRY BENCHMARKS:
  • p95 Latency:      24ms (Target: < 100ms)
  • Peak Concurrency: 10,000 req/s verified
  • Core Web Vitals:  LCP 0.68s • CLS 0.000 • FID 12ms
  • Node Cluster:     8 Replicas Healthy (100% Uptime)`,
        });
        break;

      case "contact":
        newEntries.push({
          type: "output",
          text: `COMMUNICATION CHANNELS:
  • Email:    eliasyirga575@gmail.com (SLA < 24h)
  • Phone:    +251 946 450 062
  • Location: Addis Ababa, Ethiopia (UTC+3)
  • GitHub:   https://github.com/eliasyirga
  • LinkedIn: https://linkedin.com/in/eliasyirga`,
        });
        break;

      case "clear":
        setCommandHistory([]);
        setInputVal("");
        return;

      case "resume":
      case "cv":
        newEntries.push({
          type: "success",
          text: "Opening Curriculum Vitae PDF...",
        });
        window.open("/Elias_Yirga_CV.pdf", "_blank");
        break;

      default:
        newEntries.push({
          type: "error",
          text: `bash: command not found: ${command}. Type 'help' for available commands.`,
        });
        break;
    }

    setCommandHistory((prev) => [...prev, ...newEntries]);
    setInputVal("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    }
  };

  const handleCopyCode = async () => {
    const code = `// ClusterNode.ts - Distributed Node Dispatcher
import { RedisCluster, PostGIS } from '@core/infrastructure';

export class ClusterNode extends WorkerNode {
  private p95TargetMs = 24;

  async processTelemetry(packet: SpatialPacket): Promise<DispatchACK> {
    const optimalUnit = await PostGIS.findNearestResponder({
      coordinates: packet.coords,
      jurisdictionBoundary: packet.sectorId,
    });

    await this.redis.publish('incident:dispatch', {
      id: packet.incidentId,
      unitId: optimalUnit.id,
      timestamp: Date.now(),
    });

    return { status: 'DISPATCHED', latency: this.p95TargetMs };
  }
}`;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full rounded-xl border border-zinc-750 bg-zinc-950/90 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden font-mono text-xs flex flex-col">
      {/* 1. Terminal Window Top Bar with Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-zinc-800 bg-zinc-900/90 px-4 py-2.5 gap-3">
        {/* Left: Window Action Dots */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80 hover:opacity-100 transition-opacity" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 hover:opacity-100 transition-opacity" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 hover:opacity-100 transition-opacity" />
          <span className="text-zinc-500 text-[11px] ml-2 hidden sm:inline">
            elias_workstation // bash
          </span>
        </div>

        {/* Center: Interactive Mode Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-md bg-zinc-950/80 border border-zinc-800 text-[11px]">
          <button
            onClick={() => setActiveTab("terminal")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
              activeTab === "terminal"
                ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>&gt;_ TERMINAL</span>
          </button>

          <button
            onClick={() => setActiveTab("editor")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
              activeTab === "editor"
                ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>CODE [Cluster.ts]</span>
          </button>

          <button
            onClick={() => setActiveTab("telemetry")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
              activeTab === "telemetry"
                ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>TELEMETRY (LIVE)</span>
          </button>

          <button
            onClick={() => setActiveTab("topology")}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
              activeTab === "topology"
                ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Network className="w-3.5 h-3.5 text-cyan-400" />
            <span>TOPOLOGY</span>
          </button>
        </div>

        {/* Right Status Indicator */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-semibold">ONLINE</span>
        </div>
      </div>

      {/* 2. TAB CONTENT VIEWPORT */}
      <div className="h-[360px] sm:h-[400px] overflow-y-auto p-4 sm:p-5 bg-zinc-950/95 flex flex-col justify-between">
        {/* --- TAB 1: INTERACTIVE EXECUTABLE TERMINAL --- */}
        {activeTab === "terminal" && (
          <div className="flex flex-col justify-between h-full space-y-4">
            <div className="space-y-3 overflow-y-auto pr-1">
              {commandHistory.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  {item.type === "system" && (
                    <div className="text-zinc-500 text-[11px] leading-relaxed border-l-2 border-cyan-500/50 pl-2">
                      {item.text}
                    </div>
                  )}

                  {item.type === "command" && (
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <span className="text-cyan-400 font-bold">elias@workstation:~$</span>
                      <span>{item.cmd}</span>
                    </div>
                  )}

                  {item.type === "output" && (
                    <div className="text-zinc-300 whitespace-pre-wrap leading-relaxed pl-4 font-sans text-xs">
                      {item.text}
                    </div>
                  )}

                  {item.type === "error" && (
                    <div className="text-rose-400 pl-4 text-xs font-mono">
                      {item.text}
                    </div>
                  )}

                  {item.type === "success" && (
                    <div className="text-emerald-400 pl-4 text-xs font-mono font-semibold">
                      {item.text}
                    </div>
                  )}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Input Bar & Quick Pills */}
            <div className="pt-3 border-t border-zinc-850 space-y-2.5">
              {/* Quick Command Pills */}
              <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                <span className="text-zinc-500 uppercase mr-1">Quick Run:</span>
                {["help", "projects", "skills", "metrics", "bio", "contact", "clear"].map(
                  (pill) => (
                    <button
                      key={pill}
                      onClick={() => executeCommand(pill)}
                      className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-colors"
                    >
                      {pill}
                    </button>
                  )
                )}
              </div>

              {/* Input field */}
              <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-700/80 rounded px-3 py-2 text-xs">
                <span className="text-cyan-400 font-bold">elias@workstation:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type 'help' or command..."
                  className="w-full bg-transparent text-white placeholder:text-zinc-600 focus:outline-none font-mono"
                  autoFocus
                />
                <button
                  onClick={() => executeCommand(inputVal)}
                  className="p-1 rounded bg-zinc-800 text-zinc-300 hover:text-white"
                  title="Execute command"
                >
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: LIVE CODE EDITOR VIEW --- */}
        {activeTab === "editor" && (
          <div className="flex flex-col justify-between h-full space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-850 text-xs">
              <div className="flex items-center gap-2 text-zinc-300">
                <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-semibold text-white">src/core/ClusterNode.ts</span>
                <span className="text-[10px] text-zinc-500">[TypeScript 5.4]</span>
              </div>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-colors text-[11px]"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "COPIED" : "COPY CODE"}</span>
              </button>
            </div>

            <div className="font-mono text-[11px] sm:text-xs leading-relaxed space-y-1 overflow-x-auto text-zinc-200">
              <div><span className="text-zinc-600 mr-3">01</span><span className="text-emerald-400">// ClusterNode.ts — Distributed Telemetry Dispatcher</span></div>
              <div><span className="text-zinc-600 mr-3">02</span><span className="text-rose-400">import</span> &#123; RedisCluster, PostGIS &#125; <span className="text-rose-400">from</span> <span className="text-emerald-300">'@core/infrastructure'</span>;</div>
              <div><span className="text-zinc-600 mr-3">03</span></div>
              <div><span className="text-zinc-600 mr-3">04</span><span className="text-rose-400">export class</span> <span className="text-yellow-300">ClusterNode</span> <span className="text-rose-400">extends</span> <span className="text-cyan-400">WorkerNode</span> &#123;</div>
              <div><span className="text-zinc-600 mr-3">05</span>  <span className="text-cyan-400">private</span> p95TargetMs = <span className="text-purple-400">24</span>;</div>
              <div><span className="text-zinc-600 mr-3">06</span></div>
              <div><span className="text-zinc-600 mr-3">07</span>  <span className="text-cyan-400">async</span> <span className="text-blue-400">processTelemetry</span>(packet: <span className="text-yellow-300">SpatialPacket</span>): <span className="text-yellow-300">Promise</span>&lt;<span className="text-yellow-300">DispatchACK</span>&gt; &#123;</div>
              <div><span className="text-zinc-600 mr-3">08</span>    <span className="text-cyan-400">const</span> optimalUnit = <span className="text-rose-400">await</span> PostGIS.<span className="text-blue-400">findNearestResponder</span>(&#123;</div>
              <div><span className="text-zinc-600 mr-3">09</span>      coordinates: packet.coords,</div>
              <div><span className="text-zinc-600 mr-3">10</span>      jurisdictionBoundary: packet.sectorId,</div>
              <div><span className="text-zinc-600 mr-3">11</span>    &#125;);</div>
              <div><span className="text-zinc-600 mr-3">12</span></div>
              <div><span className="text-zinc-600 mr-3">13</span>    <span className="text-rose-400">await</span> <span className="text-cyan-400">this</span>.redis.<span className="text-blue-400">publish</span>(<span className="text-emerald-300">'incident:dispatch'</span>, &#123;</div>
              <div><span className="text-zinc-600 mr-3">14</span>      id: packet.incidentId,</div>
              <div><span className="text-zinc-600 mr-3">15</span>      unitId: optimalUnit.id,</div>
              <div><span className="text-zinc-600 mr-3">16</span>      timestamp: <span className="text-yellow-300">Date</span>.<span className="text-blue-400">now</span>(),</div>
              <div><span className="text-zinc-600 mr-3">17</span>    &#125;);</div>
              <div><span className="text-zinc-600 mr-3">18</span>    <span className="text-rose-400">return</span> &#123; status: <span className="text-emerald-300">'DISPATCHED'</span>, latency: <span className="text-cyan-400">this</span>.p95TargetMs &#125;;</div>
              <div><span className="text-zinc-600 mr-3">19</span>  &#125;</div>
              <div><span className="text-zinc-600 mr-3">20</span>&#125;</div>
            </div>

            <div className="pt-2 border-t border-zinc-850 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
              <span>UTF-8 • LF • TypeScript</span>
              <span className="text-cyan-400 font-semibold">SYNTAX VERIFIED</span>
            </div>
          </div>
        )}

        {/* --- TAB 3: LIVE TELEMETRY STREAM & OSCILLOSCOPE --- */}
        {activeTab === "telemetry" && (
          <div className="flex flex-col justify-between h-full space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-850 text-xs">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className="font-semibold text-white">LIVE CLUSTER LATENCY &amp; LOAD PROFILER</span>
              </div>
              <span className="text-emerald-400 font-bold text-[11px]">SAMPLING @ 60 Hz</span>
            </div>

            {/* Metrics Graph Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 space-y-1">
                <span className="text-[10px] text-zinc-400 uppercase">p95 Latency</span>
                <div className="text-xl font-bold text-cyan-300 font-mono">24.2 ms</div>
                <div className="text-[10px] text-emerald-400">Optimal (Target &lt; 100ms)</div>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 space-y-1">
                <span className="text-[10px] text-zinc-400 uppercase">Throughput</span>
                <div className="text-xl font-bold text-white font-mono">10,480 req/s</div>
                <div className="text-[10px] text-cyan-400">Peak Capacity 100%</div>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 space-y-1">
                <span className="text-[10px] text-zinc-400 uppercase">Memory RSS</span>
                <div className="text-xl font-bold text-white font-mono">142 MB</div>
                <div className="text-[10px] text-emerald-400">Zero Memory Leak</div>
              </div>
            </div>

            {/* Oscilloscope Visual Wave */}
            <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-2">
              <div className="flex justify-between text-[11px] text-zinc-400">
                <span>TCP STREAM OSCILLOSCOPE</span>
                <span className="text-cyan-400 font-mono">0.00% PACKET DROP</span>
              </div>
              <div className="h-14 flex items-end gap-1 overflow-hidden">
                {Array.from({ length: 36 }).map((_, idx) => {
                  const h = Math.sin(idx * 0.4 + Date.now() * 0.003) * 18 + 24;
                  return (
                    <div
                      key={idx}
                      className="flex-1 bg-cyan-400/70 hover:bg-cyan-300 transition-all rounded-t"
                      style={{ height: `${Math.max(6, h)}px` }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="text-[11px] text-zinc-500 flex justify-between">
              <span>Cluster ID: BD-ETH-PROD-01</span>
              <span className="text-emerald-400">ALL 8 WORKERS HEALTHY</span>
            </div>
          </div>
        )}

        {/* --- TAB 4: SYSTEM TOPOLOGY MAP --- */}
        {activeTab === "topology" && (
          <div className="flex flex-col justify-between h-full space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-850 text-xs">
              <div className="flex items-center gap-2">
                <Network className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-semibold text-white">DISTRIBUTED SYSTEM TOPOLOGY</span>
              </div>
              <span className="text-cyan-400 text-[11px]">INTERCONNECT: TLS 1.3</span>
            </div>

            {/* Topology Flow Graph */}
            <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 font-mono text-xs text-cyan-300 space-y-3">
              <div className="flex items-center justify-between p-2.5 rounded bg-zinc-950 border border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white font-bold">[Edge CDN] Cloudflare</span>
                </div>
                <span className="text-zinc-400">Anycast BGP Routing</span>
              </div>

              <div className="text-center text-zinc-600 text-xs">▼ (Low-Latency WebSocket &amp; HTTPS)</div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                  <div className="text-white font-bold mb-1">[Gateway] Node.js Cluster</div>
                  <div className="text-[11px] text-zinc-400">Reverse Proxy &amp; Auth</div>
                </div>
                <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                  <div className="text-white font-bold mb-1">[Pub/Sub] Redis Cluster</div>
                  <div className="text-[11px] text-zinc-400">Sub-10ms Event Broadcast</div>
                </div>
              </div>

              <div className="text-center text-zinc-600 text-xs">▼ (Connection Pool &amp; PostGIS Spatial R-Tree)</div>

              <div className="p-2.5 rounded bg-zinc-950 border border-cyan-500/30 text-white font-bold flex justify-between items-center">
                <span>[Persistence] PostgreSQL + PostGIS R-Tree</span>
                <span className="text-cyan-400 text-[11px]">ACID TRANSACTIONS</span>
              </div>
            </div>

            <div className="text-[11px] text-zinc-500 flex justify-between font-mono">
              <span>Zero-Partition Resilient</span>
              <span className="text-emerald-400">99.98% SLA VERIFIED</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveCyberTerminal;
