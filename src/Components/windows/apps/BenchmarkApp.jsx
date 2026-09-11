import React, { useState } from "react";
import { Gauge, Play, RotateCcw, Activity, CheckCircle2, TrendingUp, Zap } from "lucide-react";

export const BenchmarkApp = () => {
  const [running, setRunning] = useState(false);
  const [selectedSuite, setSelectedSuite] = useState("spatial");
  const [result, setResult] = useState(null);

  const runBenchmark = (suite = selectedSuite) => {
    setRunning(true);
    setResult(null);

    setTimeout(() => {
      if (suite === "spatial") {
        setResult({
          title: "PostGIS GiST R-Tree Spatial KNN Search",
          query: "SELECT unit_id, ST_Distance(geom, ST_MakePoint(37.38, 11.59)) FROM emergency_units WHERE status='ACTIVE' ORDER BY 2 LIMIT 1;",
          p95: "14.2ms",
          p99: "26.8ms",
          opsPerSec: "14,820 op/s",
          indexHitRate: "99.94%",
          cost: "0.12ms execution time (Indexed GiST R-Tree)",
          status: "PASSED / 0 DROPPED PACKETS",
        });
      } else if (suite === "redis") {
        setResult({
          title: "Redis In-Memory Pub/Sub Message Broker",
          query: "PUBLISH municipal.incident.dispatch '{\"alert_id\": 94102, \"geo\": [11.59, 37.38], \"urgency\": \"HIGH\"}'",
          p95: "2.8ms",
          p99: "4.1ms",
          opsPerSec: "42,500 msg/s",
          indexHitRate: "100% In-Memory RESP3",
          cost: "0.03ms broker dispatch time",
          status: "PASSED / 0.00% LATENCY DRIFT",
        });
      } else {
        setResult({
          title: "ACID Relational Transaction & Index Scan",
          query: "EXPLAIN ANALYZE SELECT * FROM transactions WHERE user_id = 48291 AND created_at >= NOW() - INTERVAL '30 days';",
          p95: "8.4ms",
          p99: "16.1ms",
          opsPerSec: "18,200 req/s",
          indexHitRate: "99.88%",
          cost: "Index Scan using idx_transactions_user_date (cost=0.42..8.44)",
          status: "PASSED / ACID GUARANTEED",
        });
      }
      setRunning(false);
    }, 650);
  };

  return (
    <div className="h-full flex flex-col bg-white/70 dark:bg-[#0c0d12]/90 text-zinc-900 dark:text-zinc-100 font-sans text-xs">
      <div className="flex-1 overflow-y-auto p-4 sm:p-7 space-y-6 max-w-4xl mx-auto w-full">
        
        <div className="space-y-1 pb-3 border-b border-zinc-200 dark:border-white/10">
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono font-bold text-xs">
            <Gauge className="w-4 h-4 text-emerald-500" />
            <span>INTERACTIVE QUERY & BENCHMARK LAB</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
            Low-Latency Engine Simulation
          </h2>
          <p className="text-zinc-500 text-xs font-sans">
            Simulate real query throughput and p95 latency across spatial, in-memory, and relational systems.
          </p>
        </div>

        {/* Benchmark Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          {[
            { id: "spatial", name: "PostGIS Spatial KNN", desc: "GiST index distance scan" },
            { id: "redis", name: "Redis Pub/Sub Bus", desc: "High-throughput messaging" },
            { id: "relational", name: "ACID Schema Scan", desc: "Indexed transactions" },
          ].map((suite) => {
            const isSelected = selectedSuite === suite.id;
            return (
              <button
                key={suite.id}
                onClick={() => {
                  setSelectedSuite(suite.id);
                  runBenchmark(suite.id);
                }}
                className={`p-3.5 rounded-2xl text-left border transition-all ${
                  isSelected
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-md scale-[1.02]"
                    : "border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 hover:border-zinc-300"
                }`}
              >
                <div className="text-[10px] opacity-70">SUITE://{suite.id}</div>
                <div className="font-bold text-xs mt-1">{suite.name}</div>
                <div className="text-[11px] opacity-80 font-sans mt-0.5">{suite.desc}</div>
              </button>
            );
          })}
        </div>

        {/* Action button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => runBenchmark(selectedSuite)}
            disabled={running}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-md hover:scale-102 active:scale-98 transition-all disabled:opacity-50"
          >
            {running ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            <span>{running ? "EXECUTING QUERY PLAN..." : "TRIGGER BENCHMARK RUN"}</span>
          </button>
        </div>

        {/* Result Output Card */}
        {result && (
          <div className="p-5 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-900 text-zinc-100 font-mono text-xs space-y-4 shadow-xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="font-bold text-cyan-400">{result.title}</span>
              <span className="text-emerald-400 font-bold text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                {result.status}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-black/60 border border-zinc-800 text-[11px] text-zinc-300 overflow-x-auto">
              <span className="text-zinc-500">SQL&gt; </span>
              <span>{result.query}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 text-center">
              <div className="p-3 rounded-xl bg-zinc-800/60 border border-zinc-700/40 space-y-1">
                <div className="text-[10px] text-zinc-400">P95 LATENCY</div>
                <div className="text-base font-black text-emerald-400">{result.p95}</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-800/60 border border-zinc-700/40 space-y-1">
                <div className="text-[10px] text-zinc-400">P99 LATENCY</div>
                <div className="text-base font-black text-cyan-400">{result.p99}</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-800/60 border border-zinc-700/40 space-y-1">
                <div className="text-[10px] text-zinc-400">THROUGHPUT</div>
                <div className="text-base font-black text-white">{result.opsPerSec}</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-800/60 border border-zinc-700/40 space-y-1">
                <div className="text-[10px] text-zinc-400">CACHE / INDEX HIT</div>
                <div className="text-base font-black text-amber-400">{result.indexHitRate}</div>
              </div>
            </div>

            <div className="text-[11px] text-zinc-400 pt-1 border-t border-zinc-800">
              Cost Plan: {result.cost}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
