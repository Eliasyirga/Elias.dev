import React from "react";
import { experience, education } from "../../../data/experience";
import { skillCategories } from "../../../data/skills";
import {
  FileDown,
  ExternalLink,
  Printer,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  CheckCircle,
  Briefcase,
  GraduationCap,
} from "lucide-react";

export const CvViewerApp = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="h-full flex flex-col bg-zinc-100 dark:bg-[#0c0d12] text-zinc-900 dark:text-zinc-100 font-sans text-xs">
      {/* Top Action Bar */}
      <div className="p-3 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between bg-white dark:bg-[#12141a] shrink-0 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-xs text-zinc-800 dark:text-zinc-200">
            Elias_Yirga_CV.pdf
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-semibold">
            VERIFIED_2026
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={handlePrint}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          <a
            href="/Elias_Yirga_CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold hover:scale-102 active:scale-98 transition-all shadow-sm"
          >
            <FileDown className="w-3.5 h-3.5 text-cyan-400 dark:text-cyan-600" />
            <span>Download Official PDF</span>
          </a>
        </div>
      </div>

      {/* Formatted Resume Document Sheet */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center">
        <div className="w-full max-w-3xl bg-white dark:bg-[#13151d] border border-zinc-200 dark:border-white/10 rounded-2xl p-6 sm:p-10 shadow-lg space-y-6 text-zinc-800 dark:text-zinc-200">
          
          {/* Header */}
          <div className="border-b border-zinc-200 dark:border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
                Elias Yirga
              </h1>
              <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 font-mono">
                Computer Engineer & Full-Stack Architect
              </p>
            </div>

            <div className="space-y-1 font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-cyan-500" />
                <span>eliasyirga575@gmail.com</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-cyan-500" />
                <span>Bahir Dar / Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3 h-3 text-cyan-500" />
                <span>github.com/eliasyirga</span>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              // EXECUTIVE SUMMARY
            </h2>
            <p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
              Results-driven Computer Engineering Graduate and Full-Stack Software Engineer with 4+ years of hands-on experience designing high-performance event-driven web applications, spatial database systems (PostGIS, PostgreSQL), and scalable RESTful API microservices. Demonstrated track record in latency reduction (p95 query optimization by 38%) and production-grade system design.
            </p>
          </div>

          {/* Experience Section */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-blue-500" />
              <span>// PROFESSIONAL EXPERIENCE</span>
            </h2>

            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between font-semibold">
                    <span className="text-zinc-900 dark:text-white font-bold">{exp.role}</span>
                    <span className="text-zinc-500 font-mono text-[11px]">{exp.period}</span>
                  </div>
                  <div className="text-cyan-600 dark:text-cyan-400 text-xs font-medium">
                    {exp.company} • {exp.location}
                  </div>
                  <ul className="space-y-1 pt-1 list-disc list-inside text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
              <span>// ACADEMIC EDUCATION</span>
            </h2>

            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between font-semibold">
                    <span className="text-zinc-900 dark:text-white font-bold">{edu.degree}</span>
                    <span className="text-zinc-500 font-mono text-[11px]">{edu.period}</span>
                  </div>
                  <div className="text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                    {edu.institution} • {edu.location}
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs pt-0.5">
                    {edu.highlights[0]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Technical Capabilities */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xs font-mono font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              // TECHNICAL CAPABILITIES
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {skillCategories.map((cat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/5 space-y-1 font-mono">
                  <div className="font-bold text-zinc-900 dark:text-white text-[11px]">
                    {cat.category}
                  </div>
                  <div className="text-zinc-600 dark:text-zinc-400 text-[11px] leading-tight font-sans">
                    {cat.items.map((i) => i.name).join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
