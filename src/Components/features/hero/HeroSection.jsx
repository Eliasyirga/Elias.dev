import React from "react";
import { ArrowDown, Terminal, FileText, ArrowRight, Zap, ShieldCheck, Activity, Cpu, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { SpatialConstellationBackground } from "@/components/features/terminal-hero/SpatialConstellationBackground";
import { InteractiveCyberTerminal } from "@/components/features/terminal-hero/InteractiveCyberTerminal";

export const HeroSection = () => {
  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="overview"
      className="relative min-h-[96vh] flex flex-col justify-center pt-32 pb-20 md:pt-36 md:pb-28 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto border-b border-zinc-800/80 overflow-hidden"
    >
      {/* 1. 3D Spatial Holographic Constellation Background */}
      <SpatialConstellationBackground />

      {/* 2. Directional Radial Contrast Scrim */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-radial from-transparent via-zinc-950/60 to-zinc-950/95" />

      {/* 3. Hero Workstation Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: Headline, Narrative & Direct Action Controls */}
        <div className="lg:col-span-5 space-y-6">
          {/* Status Badge */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="relative flex items-center gap-2 px-3 py-1.5 rounded-md bg-cyan-500/15 border border-cyan-400 text-cyan-300 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.25)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping absolute left-3" />
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="font-bold tracking-wider ml-1">[COMPUTER ENGINEER &amp; FULL-STACK]</span>
            </span>
          </div>

          {/* Primary Punchy Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.06]">
            Architecting low-latency systems &amp; high-density web products.
          </h1>

          {/* Direct Technical Copy */}
          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-lg">
            I am <strong className="text-white font-bold underline decoration-cyan-400 underline-offset-4">Elias Yirga</strong>, a computer engineer and full-stack developer. I build sub-100ms backend pipelines, PostGIS spatial dispatch networks, and high-performance React frontend architectures with strict type contracts.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
            <button
              onClick={() => scrollToSection("#projects")}
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-cyan-400 text-zinc-950 font-extrabold font-sans text-xs hover:bg-cyan-300 transition-all duration-150 shadow-[0_0_20px_rgba(0,240,255,0.35)] active:scale-95"
            >
              <Zap className="w-4 h-4 text-zinc-950 group-hover:rotate-12 transition-transform" />
              <span>Explore Selected Work</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-md border border-zinc-700 bg-zinc-900/90 text-zinc-100 hover:text-white hover:border-cyan-400 backdrop-blur-md transition-all font-sans text-xs font-bold"
            >
              <span>Engineering Dossier</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
            </Link>

            <a
              href="/Elias_Yirga_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-3.5 text-zinc-300 hover:text-cyan-400 transition-colors text-xs font-semibold"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume PDF</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-4 grid grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-zinc-900/70 border border-zinc-800 backdrop-blur-sm space-y-1 hover:border-cyan-500/50 transition-colors">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                p95 Latency
              </span>
              <span className="text-cyan-300 font-bold text-base">24ms</span>
            </div>

            <div className="p-3 rounded-lg bg-zinc-900/70 border border-zinc-800 backdrop-blur-sm space-y-1 hover:border-cyan-500/50 transition-colors">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                Concurrency
              </span>
              <span className="text-white font-bold text-base">10k req/s</span>
            </div>

            <div className="p-3 rounded-lg bg-zinc-900/70 border border-zinc-800 backdrop-blur-sm space-y-1 hover:border-cyan-500/50 transition-colors">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                Uptime SLA
              </span>
              <span className="text-emerald-400 font-bold text-base">99.98%</span>
            </div>
          </div>
        </div>

        {/* Right: Interactive Cyber-Terminal Workstation */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <InteractiveCyberTerminal />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
