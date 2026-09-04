import React, { useState } from "react";
import { Terminal, Play, CornerDownLeft, Activity, RefreshCw } from "lucide-react";

export const LiveClusterRepl = () => {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState([
    { type: "system", text: "LIVE_REPL: Connected to cluster node cluster-bd-01. Type 'help' or click quick pills." },
    { type: "command", cmd: "bench --all" },
    { type: "output", text: "Benchmarking active systems:\n- PostGIS Spatial Index: 18.4ms p95 [PASS]\n- Redis Pub/Sub Relay:   8.4ms p95 [PASS]\n- MongoDB Compound Scan: 34.0ms p95 [PASS]\n- Core Web Vitals CLS:   0.000 [OPTIMAL]" },
  ]);

  const runCommand = (cmd) => {
    const raw = cmd.trim();
    if (!raw) return;

    const newEntries = [{ type: "command", cmd: raw }];

    switch (raw.toLowerCase()) {
      case "help":
        newEntries.push({
          type: "output",
          text: `AVAILABLE COMMANDS:
  • bench              - Execute latency & throughput benchmark suite
  • health             - Check active container replica health
  • mem                - Inspect memory RSS usage across cluster workers
  • explain <query>    - Run simulated PostgreSQL query planner
  • clear              - Reset terminal buffer`,
        });
        break;

      case "bench":
      case "bench --all":
        newEntries.push({
          type: "output",
          text: "Running 10,000 synthetic requests @ 100 concurrency:\n  • Requests/sec: 10,480 req/s\n  • p50: 12.2ms\n  • p95: 24.1ms\n  • p99: 48.0ms\n  • 0.00% packet loss.",
        });
        break;

      case "health":
        newEntries.push({
          type: "output",
          text: "CLUSTER HEALTH:\n  • Node-01 (API Gateway):       ONLINE (100%)\n  • Node-02 (PostGIS Dispatch):  ONLINE (100%)\n  • Node-03 (Redis Cluster):     ONLINE (100%)\n  • Node-04 (Worker Ingestion):  ONLINE (100%)",
        });
        break;

      case "mem":
        newEntries.push({
          type: "output",
          text: "MEMORY RSS TELEMETRY:\n  • Process Heap:  142.4 MB / 512 MB (27.8% utilization)\n  • GC Pauses:     < 1.2ms\n  • Memory Leaks:  0 detected over 72h continuous load.",
        });
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        newEntries.push({
          type: "error",
          text: `repl: command not found: ${raw}. Type 'help' for available commands.`,
        });
        break;
    }

    setHistory((prev) => [...prev, ...newEntries]);
    setInputVal("");
  };

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-950 p-4 font-mono text-xs text-zinc-100 space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-zinc-400 text-[11px]">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-sky-400" />
          <span className="font-bold text-white">LIVE BENCHMARK REPL // CLUSTER TELEMETRY</span>
        </div>
        <span className="text-emerald-400 text-[10px]">SAMPLING @ 60 FPS</span>
      </div>

      {/* Terminal History */}
      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-0.5">
            {item.type === "system" && <div className="text-zinc-500 text-[10px]">{item.text}</div>}
            {item.type === "command" && (
              <div className="text-sky-400 font-bold flex items-center gap-1.5">
                <span className="text-zinc-500">$</span>
                <span>{item.cmd}</span>
              </div>
            )}
            {item.type === "output" && (
              <div className="text-zinc-300 whitespace-pre-wrap pl-3 text-[11px] leading-relaxed">
                {item.text}
              </div>
            )}
            {item.type === "error" && (
              <div className="text-rose-400 pl-3 text-[11px]">{item.text}</div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Pills & Input */}
      <div className="pt-2 border-t border-zinc-800 space-y-2">
        <div className="flex flex-wrap items-center gap-1 text-[10px]">
          <span className="text-zinc-500 mr-1 uppercase">Quick Command:</span>
          {["bench", "health", "mem", "help", "clear"].map((p) => (
            <button
              key={p}
              onClick={() => runCommand(p)}
              className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-sky-300 hover:bg-sky-950 hover:border-sky-500 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded px-2.5 py-1.5 text-xs">
          <span className="text-sky-400 font-bold">$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runCommand(inputVal)}
            placeholder="Type command ('bench', 'health', 'mem')..."
            className="w-full bg-transparent text-white placeholder:text-zinc-600 focus:outline-none font-mono"
          />
          <button
            onClick={() => runCommand(inputVal)}
            className="p-1 rounded bg-zinc-800 text-zinc-300 hover:text-white"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveClusterRepl;
