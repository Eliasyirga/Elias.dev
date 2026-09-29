import React from "react";
import {
  Code2,
  Database,
  Layers,
  Cpu,
  Server,
  Zap,
  Globe,
  Smartphone,
  Shield,
  Radio,
  Boxes,
} from "lucide-react";

export const TechMarqueeSection = () => {
  const stackItems = [
    { name: "Node.js", role: "Distributed Backends", tag: "v20 LTS", color: "text-emerald-500" },
    { name: "PostgreSQL", role: "Relational Modeling", tag: "ACID", color: "text-blue-400" },
    { name: "PostGIS", role: "Spatial Query Engine", tag: "GeoSpatial", color: "text-cyan-400" },
    { name: "Redis", role: "In-Memory / PubSub", tag: "< 2ms Cache", color: "text-rose-500" },
    { name: "React 19", role: "Frontend Architecture", tag: "Modern UI", color: "text-cyan-400" },
    { name: "Next.js", role: "SSR & Full-Stack", tag: "App Router", color: "text-zinc-100" },
    { name: "TypeScript", role: "Type-Safe Systems", tag: "Strict", color: "text-blue-500" },
    { name: "WebSockets", role: "Full-Duplex Streams", tag: "Real-Time", color: "text-amber-400" },
    { name: "Docker", role: "Container Pipelines", tag: "OCI Compliant", color: "text-sky-400" },
    { name: "Flutter", role: "Cross-Platform Mobile", tag: "Dart", color: "text-cyan-300" },
    { name: "Express.js", role: "REST Microservices", tag: "API Engine", color: "text-emerald-400" },
    { name: "TailwindCSS", role: "Design Systems", tag: "v4", color: "text-cyan-400" },
    { name: "Linux / Arch", role: "Server Environments", tag: "Kernel 6.x", color: "text-amber-500" },
    { name: "Git & CI/CD", role: "Automated Deployments", tag: "DevOps", color: "text-purple-400" },
  ];

  // Duplicate list to achieve continuous infinite marquee loop
  const doubleList = [...stackItems, ...stackItems];

  return (
    <div className="relative w-full overflow-hidden py-4 border-y border-zinc-200/80 dark:border-white/10 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md select-none">
      {/* Edge gradient mask for smooth fade in/out */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#f8fafc] dark:from-[#09090b] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#f8fafc] dark:from-[#09090b] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee items-center gap-3">
        {doubleList.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-[#11131a]/80 shadow-xs hover:border-cyan-500/50 hover:bg-zinc-50 dark:hover:bg-[#161922] transition-all group shrink-0"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-500/70 group-hover:scale-125 transition-transform" />
            <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 font-sans tracking-tight">
              {item.name}
            </span>
            <span className="text-[10px] text-zinc-400 font-mono hidden sm:inline">
              • {item.role}
            </span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono font-semibold">
              {item.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechMarqueeSection;
