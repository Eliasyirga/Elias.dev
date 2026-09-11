import React, { useState } from "react";
import { education } from "../../../data/experience";
import { certificates } from "../../../data/testimonials";
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  ExternalLink,
  ZoomIn,
  X,
  CheckCircle,
} from "lucide-react";

export const EducationCertsApp = () => {
  const [activeTab, setActiveTab] = useState("education"); // education | certs
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <div className="h-full flex flex-col bg-white/70 dark:bg-[#0c0d12]/90 text-zinc-900 dark:text-zinc-100 font-sans text-xs">
      {/* Top Tab Bar */}
      <div className="p-3 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between bg-zinc-100/60 dark:bg-[#13151d]/60 shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("education")}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all ${
              activeTab === "education"
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            }`}
          >
            01 // ACADEMIC DEGREE ({education.length})
          </button>
          <button
            onClick={() => setActiveTab("certs")}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all ${
              activeTab === "certs"
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            }`}
          >
            02 // ACCREDITATIONS & CERTS ({certificates.length})
          </button>
        </div>

        <div className="text-[11px] text-zinc-500 font-mono hidden sm:block">
          Bahir Dar University & Professional Accreditations
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {activeTab === "education" && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {education.map((edu, idx) => (
              <div
                key={edu.id || idx}
                className="p-5 sm:p-6 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#12141a] space-y-4 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                        {edu.type}
                      </span>
                      <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                        {edu.degree}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-xs font-semibold">
                      <GraduationCap className="w-4 h-4 text-emerald-500" />
                      <span>{edu.institution}</span>
                      <span className="text-zinc-300 dark:text-zinc-700">•</span>
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{edu.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-500 bg-zinc-100 dark:bg-zinc-800/80 px-2.5 py-1 rounded-lg self-start">
                    <Calendar className="w-3 h-3 text-cyan-500" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  {edu.highlights.map((point, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-zinc-700 dark:text-zinc-300 leading-relaxed text-xs">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-zinc-100 dark:border-white/5 flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {edu.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "certs" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="group cursor-pointer rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#12141a] hover:border-cyan-500/50 dark:hover:border-cyan-400/50 hover:shadow-lg transition-all p-4 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-3">
                  {/* Certificate Image Preview */}
                  <div className="relative w-full h-36 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <img
                      src={cert.image || cert.src}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-2.5 py-1 rounded-lg bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-white font-mono text-[10px] font-bold flex items-center gap-1 shadow-md">
                        <ZoomIn className="w-3 h-3 text-cyan-500" />
                        <span>Zoom Certificate</span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                      <span className="text-cyan-600 dark:text-cyan-400 font-bold">{cert.issuer}</span>
                      <span>{cert.date}</span>
                    </div>
                    <h4 className="font-bold text-xs text-zinc-900 dark:text-white leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {cert.title}
                    </h4>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed pt-1 border-t border-zinc-100 dark:border-white/5">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certificate Zoom Lightbox Modal */}
      {selectedCert && (
        <div
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl w-full bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="p-3 border-b border-zinc-800 flex items-center justify-between font-mono text-xs">
              <span className="font-bold text-white truncate">{selectedCert.title}</span>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 flex items-center justify-center bg-zinc-950 max-h-[70vh] overflow-auto">
              <img
                src={selectedCert.image || selectedCert.src}
                alt={selectedCert.title}
                className="max-h-[65vh] w-auto object-contain rounded-lg shadow-lg"
              />
            </div>

            <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <div className="text-zinc-400 font-mono text-[11px]">{selectedCert.issuer} • {selectedCert.date}</div>
                <p className="text-zinc-300 text-[11px]">{selectedCert.description}</p>
              </div>
              <a
                href={selectedCert.image || selectedCert.src}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-mono font-bold text-xs flex items-center gap-1 shrink-0 self-start sm:self-center"
              >
                <span>Open Full HD</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
