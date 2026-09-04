import React, { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { skillCategories } from "@/data/skills";
import { experience, education } from "@/data/experience";
import { certificates, testimonials } from "@/data/testimonials";
import { ChangelogFeed } from "@/components/features/changelog/ChangelogFeed";
import { ContactSection } from "@/components/features/contact/ContactSection";
import {
  Terminal,
  Layers,
  Briefcase,
  GraduationCap,
  Award,
  GitBranch,
  ArrowUpRight,
  FileText,
} from "lucide-react";

export const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-20">
        {/* Header Summary */}
        <section className="space-y-6 pb-12 border-b border-zinc-850">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
            <Terminal className="w-4 h-4" />
            <span>ENGINEER SPECIFICATION // ELIAS YIRGA</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Building reliable distributed services and zero-latency user interfaces.
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-3xl">
            I am a full-stack engineer and computer engineering graduate specializing in the intersection of scalable backend data layers (PostgreSQL, Node.js, Redis) and low-latency frontend architecture (React, Next.js, Flutter). My engineering approach prioritizes transactional reliability, sub-100ms p95 latencies, and clean architectural boundaries.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
            <a
              href="/Elias_Yirga_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-white text-zinc-950 font-semibold font-sans hover:bg-zinc-200 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Download CV (PDF)</span>
            </a>
            <a
              href="mailto:eliasyirga575@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
            >
              <span>eliasyirga575@gmail.com</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* Technical Domain Matrix */}
        <section className="space-y-8">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400 pb-2 border-b border-zinc-850">
            <Layers className="w-4 h-4" />
            <span>01 // ARCHITECTURE &amp; DOMAIN MATRIX</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((group, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-6 space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <h3 className="font-semibold text-sm text-white">{group.category}</h3>
                  <span className="font-mono text-[11px] text-zinc-500">0{idx + 1}</span>
                </div>
                <div className="space-y-3">
                  {group.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-zinc-200">{item.name}</span>
                        <span className="font-mono text-[10px] text-cyan-400 px-1.5 py-0.2 rounded bg-cyan-500/10">
                          {item.experienceYears}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-zinc-400">
                        {item.context}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Engineering Experience Timeline */}
        <section className="space-y-8">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400 pb-2 border-b border-zinc-850">
            <Briefcase className="w-4 h-4" />
            <span>02 // ENGINEERING HISTORY</span>
          </div>

          <div className="space-y-6">
            {experience.map((exp) => (
              <div
                key={exp.id}
                className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-6 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold text-white">{exp.role}</h3>
                    <div className="text-xs text-zinc-400 font-mono mt-0.5">
                      {exp.company} • {exp.location}
                    </div>
                  </div>
                  <span className="font-mono text-xs text-cyan-400 self-start sm:self-auto">
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 leading-relaxed list-disc list-inside">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-2 font-mono text-[11px] text-zinc-400">
                  <span className="text-zinc-500">Tech:</span>
                  <span>{exp.tech.join(", ")}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Changelog Feed */}
        <section className="space-y-8">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400 pb-2 border-b border-zinc-850">
            <GitBranch className="w-4 h-4" />
            <span>03 // SYSTEM CHANGELOG &amp; REVISION LOG</span>
          </div>

          <ChangelogFeed />
        </section>

        {/* Credentials Registry */}
        <section className="space-y-8">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400 pb-2 border-b border-zinc-850">
            <Award className="w-4 h-4" />
            <span>04 // VERIFIED CREDENTIALS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span>{cert.issuer}</span>
                  <span>{cert.date}</span>
                </div>
                <h4 className="text-xs font-semibold text-zinc-200 line-clamp-2 font-sans">
                  {cert.title}
                </h4>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection />
      </div>
    </Layout>
  );
};

export default AboutPage;
