import React, { useState } from "react";
import { DossierHeader } from "./DossierHeader";
import { MetricsBar } from "@/Components/ui/MetricsBar";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { TradeoffsTable } from "./TradeoffsTable";
import { ChallengeCard } from "./ChallengeCard";
import { Modal } from "@/Components/ui/Modal";
import { SpatialSimulator } from "./interactive/SpatialSimulator";
import { EscrowStateMachineSimulator } from "./interactive/EscrowStateMachineSimulator";
import { QueryExplainSimulator } from "./interactive/QueryExplainSimulator";
import { EdgeCdnSimulator } from "./interactive/EdgeCdnSimulator";
import { KitchenOrderSimulator } from "./interactive/KitchenOrderSimulator";
import { Layers, ShieldCheck, AlertTriangle, ArrowLeft, ArrowRight, Image as ImageIcon, Maximize2, Sparkles } from "lucide-react";
import { projectsList } from "@/content";

export const ProjectDossier = ({ project, onNavigate }) => {
  const [activeImage, setActiveImage] = useState(null);

  if (!project) return null;

  const currentIndex = projectsList.findIndex((p) => p.rfcId === project.rfcId);
  const prevProject = currentIndex > 0 ? projectsList[currentIndex - 1] : null;
  const nextProject = currentIndex < projectsList.length - 1 ? projectsList[currentIndex + 1] : null;

  return (
    <article className="space-y-12 max-w-4xl mx-auto py-2">
      {/* 1. Header & RFC Specification Metadata */}
      <DossierHeader project={project} />

      {/* 2. Executive Problem Statement & Summary */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <Layers className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>01 // PROBLEM STATEMENT &amp; MEASURABLE IMPACT</span>
        </div>

        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6 space-y-4 text-xs sm:text-sm leading-relaxed">
          <div>
            <strong className="font-mono text-zinc-900 dark:text-zinc-100 uppercase text-xs block mb-1">
              Core Technical Problem:
            </strong>
            <p className="text-zinc-700 dark:text-zinc-300 font-sans">{project.problemStatement}</p>
          </div>

          <div>
            <strong className="font-mono text-zinc-900 dark:text-zinc-100 uppercase text-xs block mb-1">
              Quantifiable Business Impact:
            </strong>
            <p className="text-zinc-700 dark:text-zinc-300 font-sans">{project.businessImpact}</p>
          </div>
        </div>

        {/* Hard Performance Telemetry Bar */}
        <MetricsBar metrics={project.metrics} />
      </section>

      {/* 3. Interactive RFC Architecture Simulator Playground */}
      {project.rfcId === "RFC-001" && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-sky-600 dark:text-sky-400 font-bold pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>02 // INTERACTIVE SPATIAL DISPATCH PLAYGROUND</span>
          </div>
          <SpatialSimulator />
        </section>
      )}

      {project.rfcId === "RFC-002" && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-sky-600 dark:text-sky-400 font-bold pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>02 // INTERACTIVE EXPLAIN ANALYZE QUERY PROFILER</span>
          </div>
          <QueryExplainSimulator />
        </section>
      )}

      {project.rfcId === "RFC-003" && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-sky-600 dark:text-sky-400 font-bold pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>02 // INTERACTIVE ESCROW STATE MACHINE PLAYGROUND</span>
          </div>
          <EscrowStateMachineSimulator />
        </section>
      )}

      {project.rfcId === "RFC-004" && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-sky-600 dark:text-sky-400 font-bold pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>02 // INTERACTIVE GLOBAL ANYCAST ROUTING PLAYGROUND</span>
          </div>
          <EdgeCdnSimulator />
        </section>
      )}

      {project.rfcId === "RFC-006" && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-sky-600 dark:text-sky-400 font-bold pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>02 // INTERACTIVE WEBSOCKET KITCHEN DISPATCH PLAYGROUND</span>
          </div>
          <KitchenOrderSimulator />
        </section>
      )}

      {/* 4. System Screenshots & Telemetry Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800 font-mono text-xs text-zinc-500 dark:text-zinc-400 font-bold uppercase">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>03 // SYSTEM INTERFACE SCREENSHOTS</span>
            </div>
            <span className="text-[10px] text-zinc-400">CLICK TO INSPECT</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.gallery.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImage(img)}
                className="cursor-pointer rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-100 dark:bg-zinc-900 group hover:border-sky-500 transition-colors"
              >
                <div className="aspect-[16/10] overflow-hidden bg-zinc-950">
                  <img
                    src={img.src}
                    alt={img.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 grayscale-[0.2] group-hover:grayscale-0"
                  />
                </div>
                <div className="p-3 bg-zinc-50 dark:bg-zinc-900/90 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-700 dark:text-zinc-300 truncate text-[11px]">{img.caption}</span>
                  <Maximize2 className="w-3.5 h-3.5 text-zinc-400 group-hover:text-sky-500 shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Architecture Diagram & Service Topology */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <span>04 // SERVICE ARCHITECTURE &amp; DATA FLOW</span>
        </div>
        <ArchitectureDiagram diagramText={project.architectureDiagram} />
        <TradeoffsTable tradeoffs={project.tradeoffs} />
      </section>

      {/* 6. Implementation Hurdles & Code Solutions */}
      {project.challenges && project.challenges.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <span>05 // IMPLEMENTATION CHALLENGES &amp; CODE RESOLUTION</span>
          </div>

          <div className="space-y-4">
            {project.challenges.map((c, idx) => (
              <ChallengeCard key={idx} challenge={c} index={idx} />
            ))}
          </div>
        </section>
      )}

      {/* 7. Retrospective & Reliability */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <span>06 // DATA INTEGRITY &amp; FAILURE MODES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 space-y-2">
            <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>SCHEMA &amp; DATA INTEGRITY</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 font-sans text-xs leading-relaxed">
              {project.schemaSpecification}
            </p>
          </div>

          <div className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 space-y-2">
            <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span>FAILURE MODES HANDLED</span>
            </div>
            <ul className="space-y-1.5 text-zinc-600 dark:text-zinc-400 font-sans text-xs leading-relaxed">
              {project.failureModes?.map((fm, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-sky-600 dark:text-sky-400 font-mono">↳</span>
                  <span>{fm}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 8. Next / Previous RFC Navigation Footer */}
      <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between font-mono text-xs">
        {prevProject ? (
          <button
            onClick={() => onNavigate(prevProject.slug)}
            className="flex flex-col items-start text-left text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <span className="flex items-center gap-1 text-zinc-400 text-[10px] uppercase">
              <ArrowLeft className="w-3 h-3" />
              <span>PREVIOUS RFC</span>
            </span>
            <span className="font-bold text-zinc-900 dark:text-zinc-200 text-xs font-sans mt-0.5">
              {prevProject.rfcId}: {prevProject.title.split(" ")[0]}
            </span>
          </button>
        ) : (
          <div />
        )}

        {nextProject && (
          <button
            onClick={() => onNavigate(nextProject.slug)}
            className="flex flex-col items-end text-right text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <span className="flex items-center gap-1 text-zinc-400 text-[10px] uppercase">
              <span>NEXT RFC</span>
              <ArrowRight className="w-3 h-3" />
            </span>
            <span className="font-bold text-zinc-900 dark:text-zinc-200 text-xs font-sans mt-0.5">
              {nextProject.rfcId}: {nextProject.title.split(" ")[0]}
            </span>
          </button>
        )}
      </div>

      {/* Image Modal */}
      <Modal isOpen={!!activeImage} onClose={() => setActiveImage(null)} title={activeImage?.caption || ""}>
        {activeImage && (
          <div className="space-y-3">
            <div className="rounded border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-950 flex items-center justify-center max-h-[75vh]">
              <img src={activeImage.src} alt={activeImage.caption} className="max-h-[70vh] w-auto object-contain" />
            </div>
            <div className="text-right text-[11px] font-mono text-zinc-500">ESC or click outside to close</div>
          </div>
        )}
      </Modal>
    </article>
  );
};

export default ProjectDossier;
