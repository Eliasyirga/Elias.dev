import React, { useState } from "react";
import { certificates, testimonials } from "../../data/testimonials";
import { 
  Award, 
  ShieldCheck, 
  Maximize2, 
  X, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  FileText,
  Quote,
  ArrowUpRight,
  ExternalLink
} from "lucide-react";

export const CertificatesSection = () => {
  const [activeCert, setActiveCert] = useState(null);

  return (
    <section id="certificates" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-12">
      {/* Section Header */}
      <div className="space-y-2 border-b border-zinc-200 dark:border-white/10 pb-5">
        <div className="font-mono text-xs text-zinc-500 flex items-center gap-2">
          <span className="text-cyan-500 font-bold">// 05</span>
          <span>ACCREDITATIONS & VERIFIED_CREDENTIALS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Certifications & Peer Recommendations
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans max-w-2xl">
          Verified professional certifications in distributed architectures, modern frontend systems, and engineering endorsements.
        </p>
      </div>

      {/* Certificates Grid */}
      <div className="space-y-4">
        <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-bold text-zinc-800 dark:text-zinc-200">
            <Award className="w-3.5 h-3.5 text-cyan-500" />
            <span>[VERIFIED_CERTIFICATES_REGISTRY]</span>
          </span>
          <span className="text-[11px] text-zinc-400">{certificates.length} Verified Accreditations</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => {
            const imgSrc = cert.src || cert.image;
            return (
              <div
                key={cert.id}
                onClick={() => setActiveCert(cert)}
                className="tech-card rounded-2xl p-5 sm:p-6 border-zinc-200/90 dark:border-white/10 flex flex-col justify-between space-y-4 cursor-pointer hover:border-zinc-400 dark:hover:border-white/20 transition-all shadow-md group"
              >
                <div className="space-y-3">
                  {/* Header Strip */}
                  <div className="flex items-center justify-between font-mono text-[11px] text-zinc-500 pb-2 border-b border-zinc-200 dark:border-white/5">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">{cert.issuer}</span>
                    <span className="flex items-center gap-1 text-zinc-400">
                      <Calendar className="w-3 h-3" />
                      <span>{cert.date}</span>
                    </span>
                  </div>

                  {/* Certificate Title */}
                  <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 font-sans group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                    {cert.title}
                  </h3>

                  {/* Image Preview Thumbnail */}
                  {imgSrc && (
                    <div className="relative aspect-[16/10] rounded-xl border border-zinc-200 dark:border-white/5 overflow-hidden bg-zinc-950 shadow-inner group/thumb">
                      <img
                        src={imgSrc}
                        alt={cert.title}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-102 transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-zinc-900/90 text-white text-xs font-mono px-3 py-1.5 rounded-lg border border-white/20 flex items-center gap-1.5 shadow-lg">
                          <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                          <span>EXPAND_VIEW</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {cert.description && (
                    <p className="text-zinc-600 dark:text-zinc-300 font-sans text-xs leading-relaxed line-clamp-3">
                      {cert.description}
                    </p>
                  )}
                </div>

                {/* Verified Issuer Badge */}
                <div className="flex items-center justify-between font-mono text-[11px] pt-3 border-t border-zinc-200 dark:border-white/5 text-zinc-500">
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>VERIFIED</span>
                  </span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 flex items-center gap-1 transition-colors">
                    <span>Inspect</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Engineering Endorsements & Testimonials */}
      <div className="space-y-4 pt-6">
        <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
          <Quote className="w-3.5 h-3.5 text-cyan-500" />
          <span>[PEER_ENDORSEMENTS & COLLABORATIONS]</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="tech-card rounded-2xl p-6 sm:p-7 border-zinc-200/90 dark:border-white/10 space-y-4 flex flex-col justify-between shadow-md"
            >
              <div className="space-y-3">
                <Quote className="w-6 h-6 text-cyan-500/50" />
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-white/5 flex items-center justify-between font-mono text-xs">
                <div>
                  <div className="font-bold text-zinc-900 dark:text-zinc-100 font-sans">{t.name}</div>
                  <div className="text-[11px] text-zinc-500">{t.role}</div>
                </div>
                <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5">
                  {t.organization}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen Certificate Modal */}
      {activeCert && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveCert(null)}
        >
          <div 
            className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#0e0e12] text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-white/10 shadow-2xl p-5 sm:p-7 space-y-4 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-3 border-b border-zinc-200 dark:border-white/10 font-mono text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">{activeCert.issuer}</span>
                  <span className="text-zinc-500">// {activeCert.date}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold font-sans text-zinc-900 dark:text-white mt-1">
                  {activeCert.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveCert(null)}
                className="p-1.5 rounded-xl border border-zinc-200 dark:border-white/10 text-zinc-500 hover:text-zinc-900 dark:hover:text-white shrink-0 ml-2"
                aria-label="Close certificate preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {(activeCert.src || activeCert.image) && (
              <div className="rounded-xl border border-zinc-200 dark:border-white/10 overflow-hidden bg-zinc-950 flex items-center justify-center max-h-[55vh] sm:max-h-[65vh] shadow-inner">
                <img
                  src={activeCert.src || activeCert.image}
                  alt={activeCert.title}
                  className="max-h-[50vh] sm:max-h-[60vh] w-auto object-contain"
                />
              </div>
            )}

            {activeCert.description && (
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
                {activeCert.description}
              </p>
            )}

            <div className="pt-3 border-t border-zinc-200 dark:border-white/10 flex justify-between items-center font-mono text-xs text-zinc-500">
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                <ShieldCheck className="w-4 h-4" />
                Verified Credential Record
              </span>
              <button
                onClick={() => setActiveCert(null)}
                className="px-4 py-1.5 rounded-xl border border-zinc-300 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-semibold"
              >
                CLOSE_VIEW
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificatesSection;
