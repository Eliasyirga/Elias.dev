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
} from "lucide-react";

export const AboutSection = () => {
  const pillars = [
    {
      title: "Full-Stack Web Development",
      desc: "Architecting responsive, accessible user interfaces using React, Next.js, and TailwindCSS backed by performant Node.js & Express REST APIs.",
      icon: Layers,
      accent: "text-cyan-500",
    },
    {
      title: "Relational & Spatial Databases",
      desc: "Designing strict normalized PostgreSQL schemas, PostGIS spatial queries, and Redis in-memory caching layers for sub-second responses.",
      icon: Database,
      accent: "text-emerald-500",
    },
    {
      title: "High-Performance Systems",
      desc: "Optimizing query execution plans, indexing strategies, and WebSocket connections to achieve low p95 latencies and 99.98% reliability.",
      icon: Zap,
      accent: "text-amber-500",
    },
    {
      title: "Clean Code & Engineering Rigor",
      desc: "Applying SOLID design principles, automated CI/CD deployment pipelines, multi-stage Docker containerization, and clean Git workflows.",
      icon: Cpu,
      accent: "text-purple-500",
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-10">
      {/* Section Header */}
      <div className="space-y-2 border-b border-zinc-200 dark:border-white/10 pb-5">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
          <User className="w-4 h-4" />
          <span>About Me</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
          Background & Engineering Philosophy
        </h2>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Profile Bio Card */}
        <div className="lg:col-span-6 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#12141a] space-y-5 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
              Driven by architectural clarity and dependable execution.
            </h3>

            <div className="space-y-3.5 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
              <p>
                I am a passionate software engineer and recent Computer Engineering graduate from Bahir Dar University. Over the past 4+ years, I have worked across the entire engineering lifecycle—from interactive frontend design systems to backend spatial event pipelines.
              </p>
              <p>
                My projects include <strong>BahirLink</strong> (real-time municipal emergency dispatch engine), <strong>Jobify</strong>, and commercial trading platforms. I enjoy tackling complex architectural challenges and turning them into fast, reliable digital experiences.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-zinc-700 dark:text-zinc-300">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>B.Sc. Computer Engineering</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Full-Stack & Backends</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>React, Next.js, Node.js</span>
            </div>
            <div className="flex items-center gap-2">
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
                className="rounded-2xl p-5 border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#12141a] space-y-2.5 flex flex-col justify-between shadow-sm hover:border-cyan-500/40 dark:hover:border-cyan-400/40 hover:shadow-md transition-all"
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${p.accent}`} />
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                    {p.title}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {p.desc}
                  </p>
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
