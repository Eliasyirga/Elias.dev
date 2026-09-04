import React from "react";
import { Link } from "react-router-dom";
import { Terminal, FileText, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

export const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-20 md:py-28 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto border-b border-zinc-800/80"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Story & Philosophy */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
            <Terminal className="w-4 h-4" />
            <span>ABOUT THE ENGINEER // ELIAS YIRGA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Engineering robust architectures with aesthetic discipline.
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
            <p>
              I am a software engineer and Computer Engineering graduate based in Ethiopia. My work bridges low-level distributed data layer design with clean, high-performance web frontend architectures.
            </p>
            <p>
              Whether engineering PostgreSQL spatial indexing pipelines for real-time emergency dispatching or tuning React virtual DOM trees for zero-layout-shift rendering, I treat system performance, type contracts, and predictable state machines as non-negotiable foundations.
            </p>
          </div>

          {/* Key Engineering Tenets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs text-zinc-300">
            <div className="flex items-center gap-2 p-3 rounded bg-zinc-900/60 border border-zinc-800">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Sub-100ms p95 Latency Target</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded bg-zinc-900/60 border border-zinc-800">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Strict Type Contracts &amp; ACID</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded bg-zinc-900/60 border border-zinc-800">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Zero Cumulative Layout Shift (CLS)</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded bg-zinc-900/60 border border-zinc-800">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Idempotent Sync Protocols</span>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-4 font-mono text-xs">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-zinc-100 text-zinc-950 font-bold font-sans hover:bg-zinc-300 transition-colors"
            >
              <span>Full Engineering Dossier &amp; Changelog</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-900" />
            </Link>
            <a
              href="/Elias_Yirga_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-cyan-400 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Download CV (PDF)</span>
            </a>
          </div>
        </div>

        {/* Right Column: Visual Photo & Identity Matrix */}
        <div className="lg:col-span-5">
          <div className="relative rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 font-mono text-xs">
              <span className="text-zinc-400 font-semibold">PROFILE SUMMARY</span>
              <span className="text-cyan-400">[VERIFIED 2026]</span>
            </div>

            {/* Profile Image with subtle tech frame */}
            <div className="relative rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 aspect-[4/3]">
              <img
                src="/vv.webp"
                alt="Elias Yirga Profile"
                className="w-full h-full object-cover object-top grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 font-mono text-[11px] text-zinc-300 flex justify-between">
                <span>ELIAS YIRGA</span>
                <span className="text-cyan-400">ADDIS ABABA / BD</span>
              </div>
            </div>

            {/* Academic & Experience Highlights */}
            <div className="space-y-2.5 font-mono text-xs text-zinc-400">
              <div className="flex justify-between py-1 border-b border-zinc-850">
                <span className="text-zinc-500">Degree</span>
                <span className="text-zinc-200">B.Sc. Computer Engineering</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-850">
                <span className="text-zinc-500">Institution</span>
                <span className="text-zinc-200">Bahir Dar University</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-850">
                <span className="text-zinc-500">Production Releases</span>
                <span className="text-cyan-400 font-semibold">08 Deployed Systems</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-500">Engineering SLA</span>
                <span className="text-emerald-400">Response &lt; 24 Hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
