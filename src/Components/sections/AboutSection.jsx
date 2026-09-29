import React from "react";
import {
  User,
  CheckCircle2,
  Cpu,
  Layers,
  Database,
  Zap,
  Check,
  Award,
  Globe,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  GitBranch,
} from "lucide-react";

export const AboutSection = () => {
  const pillars = [
    {
      title: "Full-Stack Web Engineering",
      desc: "Architecting responsive, accessible user interfaces using React, Next.js, and modern Tailwind design systems, backed by performant Node.js REST & WebSocket APIs.",
      icon: Layers,
      accent: "text-cyan-500",
      glow: "hover:border-cyan-500/50 hover:shadow-cyan-500/10",
      bgLight: "bg-cyan-500/10",
      tag: "FRONTEND & APIS",
    },
    {
      title: "Relational & Spatial Data",
      desc: "Designing strict normalized PostgreSQL schemas, PostGIS geospatial bounding box queries, and Redis in-memory cache pipelines for sub-second retrieval.",
      icon: Database,
      accent: "text-emerald-500",
      glow: "hover:border-emerald-500/50 hover:shadow-emerald-500/10",
      bgLight: "bg-emerald-500/10",
      tag: "POSTGIS / REDIS",
    },
    {
      title: "High-Throughput Systems",
      desc: "Optimizing query execution plans, indexing strategies, and WebSocket state synchronization to achieve verified low p95 latencies and 99.98% reliability.",
      icon: Zap,
      accent: "text-amber-500",
      glow: "hover:border-amber-500/50 hover:shadow-amber-500/10",
      bgLight: "bg-amber-500/10",
      tag: "p95 < 450ms",
    },
    {
      title: "Architectural Rigor & DevOps",
      desc: "Applying SOLID design principles, automated CI/CD deployment pipelines, multi-stage Docker containerization, and clean Git workflows for continuous delivery.",
      icon: Cpu,
      accent: "text-purple-500",
      glow: "hover:border-purple-500/50 hover:shadow-purple-500/10",
      bgLight: "bg-purple-500/10",
      tag: "DOCKER / CI-CD",
    },
  ];

  return (
    <section id="about" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-8 sm:space-y-10">
      {/* Section Header */}
      <div className="space-y-2 border-b border-zinc-200 dark:border-white/10 pb-4 sm:pb-5">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
          <User className="w-4 h-4" />
          <span>// 01 ARCHITECTURAL PHILOSOPHY</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
          Background & Engineering Principles
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans max-w-2xl leading-relaxed">
          Grounding scalable full-stack applications in disciplined systems engineering, spatial indexing, and elegant frontend craftsmanship.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        {/* Profile Bio Card */}
        <div className="lg:col-span-6 rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-[#11131a]/80 backdrop-blur-xl space-y-6 flex flex-col justify-between shadow-lg relative overflow-hidden group">
          {/* Subtle Ambient Orb */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

          <div className="space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Lifecycle Software Engineer</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white leading-snug">
              Bridging robust backend concurrency with refined, responsive user interfaces.
            </h3>

            <div className="space-y-3.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
              <p>
                I am a passionate software engineer and recent Computer Engineering graduate from <strong>Bahir Dar University</strong>. Over 4+ years of hands-on production engineering, I have developed distributed backends, spatial event dispatch engines, and modern React design systems.
              </p>
              <p>
                Notable systems include <strong>BahirLink</strong> (municipal real-time dispatch with sub-second GIS telemetry), <strong>Jobify</strong> (aggregation platform), and commercial high-concurrency marketplace architectures.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-200 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono text-zinc-700 dark:text-zinc-300 relative z-10">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-100/70 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-white/5">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>B.Sc. Computer Engineering</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-100/70 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-white/5">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Full-Stack & Backends</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-100/70 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-white/5">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>React, Next.js, Node.js</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-100/70 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-white/5">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>PostgreSQL, PostGIS, Redis</span>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className={`rounded-3xl p-5 sm:p-6 border border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-[#11131a]/80 backdrop-blur-xl space-y-3 flex flex-col justify-between shadow-sm ${p.glow} hover:-translate-y-1 transition-all duration-300 group`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-2xl ${p.bgLight} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-5 h-5 ${p.accent}`} />
                    </div>
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                      {p.tag}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight">
                    {p.title}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 group-hover:text-cyan-500 transition-colors">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Production-Grade Architecture</span>
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
