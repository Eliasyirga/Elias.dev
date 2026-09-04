import React, { useState } from "react";
import { Award, ExternalLink, Maximize2, ShieldCheck, Calendar, FileText } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { certificates } from "@/data/testimonials";
import { Modal } from "@/components/ui/Modal";

export const CredentialsDossier = () => {
  const [activeCert, setActiveCert] = useState(null);

  return (
    <article className="space-y-12 max-w-4xl mx-auto py-4">
      {/* 1. Header Metadata */}
      <div className="space-y-4 pb-6 border-b border-zinc-200 dark:border-zinc-800 font-mono text-xs">
        <div className="flex items-center gap-2">
          <Badge variant="rfc">SYS-003</Badge>
          <Badge variant="active">VERIFIED REGISTRY</Badge>
          <span className="text-zinc-400 dark:text-zinc-600">•</span>
          <span className="text-zinc-700 dark:text-zinc-300 font-bold">ACCREDITATIONS</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-sans">
          Verified Professional Credentials &amp; Certifications
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
          Accredited credentials across software architecture, distributed systems, full-stack frameworks, and developer leadership.
        </p>
      </div>

      {/* 2. Grid of Credentials with Rich Image Previews */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {certificates.map((cert) => {
          const imgSrc = cert.src || cert.image;
          return (
            <div
              key={cert.id}
              onClick={() => setActiveCert(cert)}
              className="cursor-pointer rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 overflow-hidden hover:border-sky-500 transition-all duration-200 group p-5 space-y-4 font-mono text-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header Strip */}
                <div className="flex items-center justify-between text-zinc-500 text-[11px] pb-2 border-b border-zinc-200 dark:border-zinc-800">
                  <span className="font-bold text-sky-700 dark:text-sky-400">{cert.issuer}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-zinc-400" />
                    <span>{cert.date}</span>
                  </span>
                </div>

                {/* Certificate Title */}
                <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 font-sans group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-snug">
                  {cert.title}
                </h3>

                {/* Large Certificate Preview Image */}
                {imgSrc && (
                  <div className="relative aspect-[16/11] rounded border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-950 shadow-sm">
                    <img
                      src={imgSrc}
                      alt={cert.title}
                      className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-2 right-2 bg-zinc-950/80 border border-zinc-800 px-2 py-1 rounded text-[10px] text-zinc-300 flex items-center gap-1">
                      <Maximize2 className="w-3 h-3 text-sky-400" />
                      <span>INSPECT</span>
                    </div>
                  </div>
                )}

                {/* Description */}
                {cert.description && (
                  <p className="text-zinc-600 dark:text-zinc-400 font-sans text-xs leading-relaxed">
                    {cert.description}
                  </p>
                )}
              </div>

              {/* Verified Issuer Badge */}
              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Accreditation</span>
                </span>
                <span className="text-sky-600 dark:text-sky-400 font-bold flex items-center gap-1">
                  <span>Full View</span>
                  <Maximize2 className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full-Screen Certificate Modal */}
      <Modal isOpen={!!activeCert} onClose={() => setActiveCert(null)} title={activeCert?.title || ""}>
        {activeCert && (
          <div className="space-y-4 font-mono text-xs">
            <div className="flex justify-between text-zinc-400 pb-2 border-b border-zinc-800">
              <span className="font-bold text-sky-400">{activeCert.issuer}</span>
              <span>{activeCert.date}</span>
            </div>

            {(activeCert.src || activeCert.image) && (
              <div className="rounded border border-zinc-800 overflow-hidden bg-zinc-950 flex items-center justify-center max-h-[75vh]">
                <img
                  src={activeCert.src || activeCert.image}
                  alt={activeCert.title}
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>
            )}

            {activeCert.description && (
              <p className="text-zinc-300 font-sans text-xs leading-relaxed">
                {activeCert.description}
              </p>
            )}

            <div className="text-right text-[11px] text-zinc-500">ESC or click outside to dismiss</div>
          </div>
        )}
      </Modal>
    </article>
  );
};

export default CredentialsDossier;
