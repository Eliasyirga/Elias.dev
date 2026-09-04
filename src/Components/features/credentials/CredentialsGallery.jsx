import React, { useState } from "react";
import { certificates } from "@/data/testimonials";
import { Modal } from "@/components/ui/Modal";
import { Award, Maximize2, CheckCircle, ExternalLink } from "lucide-react";

export const CredentialsGallery = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section
      id="credentials"
      className="py-20 md:py-28 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto border-b border-zinc-800/80"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
            <Award className="w-4 h-4" />
            <span>TECHNICAL ACCREDITATIONS &amp; CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Verified Certifications &amp; Hackathon Awards
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed">
            Formal technical credentials, distributed systems coursework, and AI engineering hackathon achievements. Click any certificate to inspect full resolution.
          </p>
        </div>

        <div className="font-mono text-xs text-zinc-500 self-start md:self-auto">
          <span>{certificates.length} VERIFIED BADGES</span>
        </div>
      </div>

      {/* Grid of Verified Credentials */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            onClick={() => setSelectedCert(cert)}
            className="group cursor-pointer rounded-lg border border-zinc-800 bg-zinc-900/40 overflow-hidden hover:border-zinc-600 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Visual Thumbnail */}
            <div className="relative aspect-[16/10] bg-zinc-950 overflow-hidden border-b border-zinc-800">
              <img
                src={cert.src}
                alt={cert.title}
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-zinc-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-2 rounded-full bg-zinc-950/90 text-cyan-400 border border-zinc-700">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Metadata Footer */}
            <div className="p-4 space-y-1.5">
              <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500">
                <span className="uppercase text-cyan-400">{cert.issuer}</span>
                <span>{cert.date}</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1 font-sans group-hover:text-zinc-200 transition-colors">
                {cert.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* High-Resolution Inspection Modal */}
      <Modal
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        title={selectedCert ? `${selectedCert.title} — ${selectedCert.issuer}` : ""}
      >
        {selectedCert && (
          <div className="space-y-4">
            <div className="rounded border border-zinc-800 overflow-hidden bg-zinc-950 flex items-center justify-center max-h-[75vh]">
              <img
                src={selectedCert.src}
                alt={selectedCert.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="text-cyan-400">Issuer: {selectedCert.issuer}</span>
              <span>Accreditation Year: {selectedCert.date}</span>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
