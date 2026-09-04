import React, { useState } from "react";
import { Globe, Zap, CheckCircle2, RefreshCw } from "lucide-react";

export const EdgeCdnSimulator = () => {
  const [selectedRegion, setSelectedRegion] = useState("FRA");

  const regions = [
    { code: "ADD", name: "Addis Ababa (Origin)", edgeTtfb: "18ms", originTtfb: "18ms", status: "DIRECT_PEERING" },
    { code: "FRA", name: "Frankfurt (Edge Node)", edgeTtfb: "24ms", originTtfb: "165ms", status: "EDGE_HIT" },
    { code: "IAD", name: "US-East Virginia", edgeTtfb: "32ms", originTtfb: "240ms", status: "EDGE_HIT" },
    { code: "NRT", name: "Tokyo (Edge Node)", edgeTtfb: "48ms", originTtfb: "310ms", status: "EDGE_HIT" },
  ];

  const current = regions.find((r) => r.code === selectedRegion) || regions[0];

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-5 space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span className="font-bold text-zinc-900 dark:text-zinc-100 font-sans text-sm">
            Interactive Playground: Global Anycast Edge CDN Routing Simulator
          </span>
        </div>
        <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
          GLOBAL SLA: &lt; 50ms TTFB
        </span>
      </div>

      {/* Region Selector Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-zinc-500 uppercase text-[10px] font-bold mr-1">Simulate Client Location:</span>
        {regions.map((r) => (
          <button
            key={r.code}
            onClick={() => setSelectedRegion(r.code)}
            className={`px-3 py-1.5 rounded transition-all ${
              selectedRegion === r.code
                ? "bg-sky-600 text-white font-bold ring-2 ring-sky-500/20"
                : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300"
            }`}
          >
            {r.name}
          </button>
        ))}
      </div>

      {/* Performance Comparison Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
          <span className="text-[10px] text-zinc-500 uppercase">Cloudflare Edge TTFB</span>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
            {current.edgeTtfb}
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400">92% Latency Reduction</div>
        </div>

        <div className="p-3 rounded bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
          <span className="text-[10px] text-zinc-500 uppercase">Uncached Origin Roundtrip</span>
          <div className="text-xl font-bold text-zinc-500 line-through tabular-nums">
            {current.originTtfb}
          </div>
          <div className="text-[10px] text-zinc-400">Cross-Continental BGP</div>
        </div>

        <div className="p-3 rounded bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
          <span className="text-[10px] text-zinc-500 uppercase">Edge Routing Status</span>
          <div className="text-sm font-bold text-sky-600 dark:text-sky-400 truncate">
            {current.status}
          </div>
          <div className="text-[10px] text-zinc-400">HTTP/3 QUIC 0-RTT</div>
        </div>
      </div>

      {/* Simulated Raw Edge Header Log */}
      <div className="p-3 rounded bg-zinc-950 border border-zinc-800 text-sky-400 text-[11px] leading-relaxed overflow-x-auto">
        <div className="text-zinc-500 text-[10px] uppercase font-bold mb-1">// CLOUDFLARE EDGE RESPONSE HEADERS</div>
        <div>cf-cache-status: HIT</div>
        <div>cf-ray: 8df48192a01-{(selectedRegion).toLowerCase()} (Anycast Node)</div>
        <div>content-encoding: br (Brotli Level 11)</div>
        <div>alt-svc: h3=":443"; ma=86400</div>
      </div>
    </div>
  );
};

export default EdgeCdnSimulator;
