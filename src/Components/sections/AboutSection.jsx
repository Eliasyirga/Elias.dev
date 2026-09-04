import React from "react";
import { 
  User, 
  Terminal, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  GitBranch, 
  FileCode,
  Layers,
  Database,
  Workflow,
  Zap,
  Check
} from "lucide-react";

export const AboutSection = () => {
  const architecturalPillars = [
    {
      code: "RFC-P1",
      title: "Low-Latency Event Pipelines",
      desc: "Sub-second p95 latencies across high-concurrency event streams with Redis pub/sub pipelines and optimized socket transports.",
      icon: Zap,
      accent: "text-amber-500",
    },
    {
      code: "RFC-P2",
      title: "ACID Rigor & Spatial Indexing",
      desc: "Relational data modeling in PostgreSQL, PostGIS spatial queries, and idempotent webhook reconciliation.",
      icon: Database,
      accent: "text-cyan-500",
    },
    {
      code: "RFC-P3",
      title: "Deterministic State Machines",
      desc: "Zero layout shift (CLS), atomic component structures in React, Next.js, and strict type safety.",
      icon: Layers,
      accent: "text-emerald-500",
    },
    {
      code: "RFC-P4",
      title: "Containerized CI/CD Workflows",
      desc: "Multi-stage Docker builds, trunk-based Git flows, and automated cloud deployments.",
      icon: GitBranch,
      accent: "text-indigo-500",
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-10">
      {/* Section Header */}
      <div className="space-y-2 border-b border-zinc-200 dark:border-white/10 pb-5">
        <div className="font-mono text-xs text-zinc-500 flex items-center gap-2">
          <span className="text-cyan-500 font-bold">// 01</span>
          <span>ENGINEERING_PHILOSOPHY & PROFILE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Systems Design Principles & Background
        </h2>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Profile Card */}
        <div className="lg:col-span-6 tech-card rounded-2xl p-6 sm:p-7 border-zinc-200/90 dark:border-white/10 space-y-5 flex flex-col justify-between shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-white/10">
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-900 dark:text-zinc-100 font-bold">
                <Terminal className="w-3.5 h-3.5 text-cyan-500" />
                <span>ENGINEER_RECORD: ELIAS_YIRGA</span>
              </div>
              <div className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>OPERATIONAL</span>
              </div>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
              <p>
                I am a software engineer focused on distributed backends, real-time spatial dispatch engines, and resilient full-stack web applications.
              </p>
              <p>
                Over 4+ years, I have architected and deployed high-throughput platforms including <strong>BahirLink</strong> (emergency response & unit dispatch engine), <strong>Jobify</strong>, and enterprise marketplace infrastructures with ACID consistency and sub-second latencies.
              </p>
              <p>
                My philosophy favors explicit architecture over magic abstractions: clean database normalization, bounded contexts, deterministic state handling, and verifiable benchmarks.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-200 dark:border-white/10 font-mono text-xs grid grid-cols-2 gap-2 text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>B.Sc. Computer Eng (Graduated)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Location: Ethiopia / Remote</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>TypeScript / Node / Go / React</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>PostgreSQL / PostGIS / Redis</span>
            </div>
          </div>
        </div>

        {/* Principles Matrix */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {architecturalPillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="tech-card rounded-2xl p-5 border-zinc-200/90 dark:border-white/10 space-y-2.5 flex flex-col justify-between hover:scale-[1.02] transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-[11px] text-zinc-500">
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">[{p.code}]</span>
                    <Icon className={`w-4 h-4 ${p.accent}`} />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 font-mono">
                    {p.title}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-200 dark:border-white/5 font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  BENCHMARK: SUB-SECOND / ZERO-DROP
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
