import React from "react";
import { Terminal, ShieldCheck, CheckCircle2, FileText, ArrowRight, Cpu, Activity, User, Globe, Mail, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { MetricsBar } from "@/components/ui/MetricsBar";
import { LiveClusterRepl } from "./interactive/LiveClusterRepl";

export const OverviewDossier = ({ onSelectProject }) => {
  const telemetry = [
    { label: "Target Latency", value: "< 50 ms", delta: "p95 index", benchmarkTarget: "< 100 ms" },
    { label: "Peak Concurrency", value: "10k req/s", delta: "0% drop", benchmarkTarget: "10k req/s" },
    { label: "Core Web Vitals", value: "100/100", delta: "CLS 0.000", benchmarkTarget: "95+" },
    { label: "Uptime SLA", value: "99.98%", delta: "Postgres/Redis", benchmarkTarget: "99.95%" },
  ];

  return (
    <article className="space-y-12 max-w-4xl mx-auto py-4">
      {/* 1. Header Metadata */}
      <div className="space-y-4 pb-6 border-b border-zinc-200 dark:border-zinc-800 font-mono text-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <Badge variant="rfc">SYS-000</Badge>
            <Badge variant="production">OPERATIONAL</Badge>
            <span className="text-zinc-400 dark:text-zinc-600">•</span>
            <span className="text-zinc-700 dark:text-zinc-300 font-bold">REVISION 2026.1</span>
          </div>
          <div className="text-[11px] text-zinc-500">
            LOCATION: ADDIS ABABA / BAHIR DAR (UTC+3)
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-sans leading-tight">
          Elias Yirga — Principal Systems &amp; Frontend Architect
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
          B.Sc. in Computer Engineering. Specializing in distributed backend pipelines (PostgreSQL, PostGIS, Redis), transactional integrity, and zero-layout-shift React web applications.
        </p>
      </div>

      {/* 2. Interactive Cluster REPL */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-sky-600 dark:text-sky-400 font-bold pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <Sparkles className="w-3.5 h-3.5" />
          <span>01 // LIVE BENCHMARK REPL CLI</span>
        </div>
        <LiveClusterRepl />
      </section>

      {/* 3. Live Telemetry */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <Activity className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>02 // PRODUCTION SLA &amp; BENCHMARKS</span>
        </div>
        <MetricsBar metrics={telemetry} title="ARCHITECTURAL PERFORMANCE TARGETS" />
      </section>

      {/* 4. Core Engineering Tenets */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>03 // NON-NEGOTIABLE ENGINEERING TENETS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
              <span>Sub-100ms p95 Latency</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 font-sans text-xs">
              Every database query and API contract is indexed, cached, and benchmarked against hard SLA targets.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
              <span>Strict ACID &amp; Type Contracts</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 font-sans text-xs">
              Zero tolerant of untyped payloads, double-allocation anomalies, or eventual consistency corruption.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
              <span>Zero Cumulative Layout Shift (CLS)</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 font-sans text-xs">
              Enforcing rigid CSS aspect-ratios, containment boundaries, and instantaneous DOM rendering.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
              <span>Idempotent Sync Protocols</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 font-sans text-xs">
              All payment webhooks, spatial dispatches, and socket relays are guarded with unique deduplication ledgers.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Quick RFC Jump Matrix */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <Terminal className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>04 // FEATURED PRODUCTION RFCS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
          <button
            onClick={() => onSelectProject("bahirlink")}
            className="p-4 text-left rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 hover:border-sky-500 transition-colors group space-y-1"
          >
            <div className="flex justify-between items-center text-zinc-500">
              <span className="text-sky-600 dark:text-sky-400 font-bold">RFC-001</span>
              <span className="text-emerald-600 dark:text-emerald-400 text-[10px]">PRODUCTION</span>
            </div>
            <div className="font-bold text-zinc-900 dark:text-zinc-100 font-sans text-sm group-hover:text-sky-600 dark:group-hover:text-sky-400">
              BahirLink Emergency Dispatch &amp; Spatial Routing
            </div>
            <p className="text-zinc-500 font-sans text-xs line-clamp-2">
              Distributed emergency management infrastructure with PostGIS R-Tree nearest-neighbor routing.
            </p>
          </button>

          <button
            onClick={() => onSelectProject("jobify")}
            className="p-4 text-left rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 hover:border-sky-500 transition-colors group space-y-1"
          >
            <div className="flex justify-between items-center text-zinc-500">
              <span className="text-sky-600 dark:text-sky-400 font-bold">RFC-002</span>
              <span className="text-emerald-600 dark:text-emerald-400 text-[10px]">PRODUCTION</span>
            </div>
            <div className="font-bold text-zinc-900 dark:text-zinc-100 font-sans text-sm group-hover:text-sky-600 dark:group-hover:text-sky-400">
              Jobify Enterprise Hiring Pipeline
            </div>
            <p className="text-zinc-500 font-sans text-xs line-clamp-2">
              Multi-tenant recruitment platform with compound text indexes and sub-50ms candidate filtering.
            </p>
          </button>
        </div>
      </section>
    </article>
  );
};

export default OverviewDossier;
