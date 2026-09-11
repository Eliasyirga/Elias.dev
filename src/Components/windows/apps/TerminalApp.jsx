import React, { useState, useRef, useEffect } from "react";
import { useWindowsOS } from "../../../context/WindowsOSContext";
import { projects } from "../../../data/projects";
import { experience, education } from "../../../data/experience";
import { certificates } from "../../../data/testimonials";
import { skillCategories } from "../../../data/skills";
import { Terminal, Send, Sparkles, Copy, Check } from "lucide-react";

export const TerminalApp = () => {
  const { openWindow } = useWindowsOS();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    {
      type: "system",
      text: "Windows PowerShell [Version 11.0.22621.1778]\n(c) Microsoft Corporation. All rights reserved.\n\n⚡ ELIAS.DEV WORKBENCH KERNEL v4.8.0\nType 'help' for commands, or 'neofetch' for system overview.",
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandList, setCommandList] = useState([]);
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = (cmdText) => {
    const raw = cmdText.trim();
    if (!raw) return;

    setCommandList((prev) => [...prev, raw]);
    setHistoryIndex(-1);

    const parts = raw.split(" ");
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ").toLowerCase();

    const newHistory = [...history, { type: "user", text: `PS C:\\Users\\Elias> ${raw}` }];

    switch (cmd) {
      case "help":
        newHistory.push({
          type: "output",
          text: `Available Commands:
  neofetch      : Display system specifications & engineer overview
  projects      : List all 8 scaled production systems & RFCs
  cat <name>    : Read project specification (e.g. cat bahirlink, cat grovelink)
  skills        : Inspect technical capability matrix & stack
  experience    : View career milestones & engineering roles
  education     : View B.Sc. Computer Engineering accreditation
  certs         : List verified professional credentials
  cv            : Download Elias Yirga's official CV / Resume (PDF)
  open <app>    : Open OS Window (projects, cv, about, experience, contact, settings)
  contact       : Print communication channels (Email, Telegram, LinkedIn)
  matrix        : Toggle Digital Matrix Rain Mode
  sudo hire     : Fast-track direct recruiter action
  clear / cls   : Clear terminal history`,
        });
        break;

      case "neofetch":
      case "fastfetch":
        newHistory.push({
          type: "output",
          text: `
  .----------------.  Elias Yirga @ Elias-Dev-PC
  | .--------------. |  -------------------------
  | |  _______     | |  OS: EliasOS (Windows 11 Fluent Edition)
  | | |_   __ \\    | |  Host: Full-Stack Architect & Computer Engineer
  | |   | |__) |   | |  Kernel: x86_64 Distributed Event-Bus
  | |   |  ___/    | |  Uptime: 4+ Years Continuous Engineering
  | |  _| |_       | |  Degree: B.Sc. Computer Engineering (Bahir Dar Univ)
  | | |_____|      | |  Languages: TypeScript, JavaScript, Python, SQL, C++, Dart
  | |              | |  Frameworks: React, Next.js, Node.js, Express, TailwindCSS
  | '--------------' |  Data/Infra: PostgreSQL, PostGIS, Redis, Docker, WebSockets
  '----------------'  Status: 🟢 Available for Full-Time / Remote Roles
`,
        });
        break;

      case "projects":
      case "ls":
      case "dir":
        if (arg === "projects" || !arg) {
          newHistory.push({
            type: "output",
            text: projects
              .map(
                (p, idx) =>
                  `[${idx + 1}] ${p.rfcId || "SPEC"} | ${p.title.padEnd(26)} | p95: ${
                    p.metrics?.[0]?.value || "45ms"
                  } | ${p.category}`
              )
              .join("\n") + "\n\nTip: Type 'cat <project-name>' or 'open projects' for full GUI.",
          });
        } else {
          newHistory.push({
            type: "output",
            text: `Directory of C:\\Users\\Elias\\${arg}\n\n[DIR] projects\n[DIR] skills\n[FILE] Elias_Yirga_CV.pdf\n[FILE] about_me.txt\n[FILE] contact_info.json`,
          });
        }
        break;

      case "cat":
        if (!arg) {
          newHistory.push({
            type: "error",
            text: "Usage: cat <project-name> (e.g., cat bahirlink, cat grovelink, cat jobify)",
          });
        } else {
          const matched = projects.find(
            (p) =>
              p.slug.toLowerCase().includes(arg) ||
              p.title.toLowerCase().includes(arg) ||
              p.rfcId?.toLowerCase().includes(arg)
          );
          if (matched) {
            newHistory.push({
              type: "success",
              text: `=== [${matched.rfcId || "RFC"}] ${matched.title.toUpperCase()} ===\nCategory: ${matched.category}\nStatus: ${matched.status || "Production Ready"}\n\nOverview:\n${matched.description}\n\nTech Stack:\n${matched.stack?.join(", ")}\n\nMetrics:\n${matched.metrics?.map((m) => `  - ${m.label}: ${m.value}`).join("\n")}`,
            });
          } else if (arg.includes("about") || arg.includes("bio")) {
            newHistory.push({
              type: "output",
              text: "Elias Yirga is a Computer Engineer & Full-Stack Architect specialized in high-throughput real-time systems, PostGIS spatial algorithms, and modern responsive web architectures.",
            });
          } else {
            newHistory.push({
              type: "error",
              text: `File not found: '${arg}'. Try 'cat bahirlink' or 'projects'.`,
            });
          }
        }
        break;

      case "skills":
      case "stack":
        newHistory.push({
          type: "output",
          text: skillCategories
            .map(
              (cat) =>
                `--- ${cat.category.toUpperCase()} ---\n` +
                cat.items.map((i) => `  * ${i.name.padEnd(24)} [${i.proficiency}] (${i.experienceYears})`).join("\n")
            )
            .join("\n\n"),
        });
        break;

      case "experience":
      case "history":
        newHistory.push({
          type: "output",
          text: experience
            .map(
              (e) =>
                `🏢 ${e.role} @ ${e.company} (${e.period})\n   Location: ${e.location}\n   Highlights:\n` +
                e.highlights.map((h) => `     - ${h}`).join("\n")
            )
            .join("\n\n"),
        });
        break;

      case "education":
        newHistory.push({
          type: "output",
          text: education
            .map(
              (ed) =>
                `🎓 ${ed.degree}\n   ${ed.institution} (${ed.period}) - ${ed.location}\n   Focus: Software Architecture, Distributed Computing, Embedded Systems.`
            )
            .join("\n\n"),
        });
        break;

      case "certs":
      case "certificates":
        newHistory.push({
          type: "output",
          text: certificates
            .map((c, i) => `[${i + 1}] ${c.title} — ${c.issuer} (${c.date})`)
            .join("\n"),
        });
        break;

      case "cv":
      case "resume":
        window.open("/Elias_Yirga_CV.pdf", "_blank");
        newHistory.push({
          type: "success",
          text: "Opening /Elias_Yirga_CV.pdf in a new tab...",
        });
        break;

      case "open":
        if (!arg) {
          newHistory.push({
            type: "error",
            text: "Usage: open <app-name> (e.g. open projects, open cv, open about, open contact, open settings)",
          });
        } else {
          const appMap = {
            project: "projects",
            projects: "projects",
            cv: "cv",
            resume: "cv",
            about: "about",
            me: "about",
            experience: "experience",
            career: "experience",
            education: "education",
            certs: "education",
            certificates: "education",
            contact: "contact",
            mail: "contact",
            settings: "settings",
            benchmark: "benchmark",
            trash: "trash",
          };
          const target = appMap[arg] || arg;
          openWindow(target);
          newHistory.push({
            type: "success",
            text: `Launching Window: [${target.toUpperCase()}]...`,
          });
        }
        break;

      case "contact":
        newHistory.push({
          type: "output",
          text: `Direct Communication Channels:
  Email   : eliasyirga575@gmail.com
  Telegram: https://t.me/Elawazza (@Elawazza)
  LinkedIn: https://linkedin.com/in/elias-yirga-44a19b2a7
  GitHub  : https://github.com/eliasyirga`,
        });
        break;

      case "matrix":
        setIsMatrixMode((prev) => !prev);
        newHistory.push({
          type: "success",
          text: isMatrixMode ? "Exiting Matrix Mode..." : "Entering Digital Matrix Mode. Knock, knock, Neo.",
        });
        break;

      case "sudo":
      case "hire":
      case "sudo hire":
        openWindow("contact");
        newHistory.push({
          type: "success",
          text: "🚀 FAST-TRACK ACCEPTED: Opening Direct Transmission Hub...",
        });
        break;

      case "clear":
      case "cls":
        setHistory([]);
        setInput("");
        return;

      default:
        newHistory.push({
          type: "error",
          text: `'${cmd}' is not recognized as an internal or external command. Type 'help' for a list of valid commands.`,
        });
    }

    setHistory(newHistory);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandList.length > 0) {
        const nextIdx = historyIndex + 1 < commandList.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInput(commandList[commandList.length - 1 - nextIdx] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(commandList[commandList.length - 1 - nextIdx] || "");
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  const quickCommands = ["neofetch", "projects", "cat bahirlink", "skills", "cv", "matrix", "sudo hire"];

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={`h-full flex flex-col justify-between font-mono text-xs p-4 overflow-hidden transition-colors ${
        isMatrixMode
          ? "bg-black text-emerald-400 font-bold"
          : "bg-[#0c0d12] text-zinc-200"
      }`}
    >
      {/* Terminal Output Area */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-2 selection:bg-cyan-500 selection:text-black">
        {history.map((entry, idx) => (
          <div key={idx} className="whitespace-pre-wrap leading-relaxed">
            {entry.type === "user" && (
              <div className="text-cyan-400 font-semibold">{entry.text}</div>
            )}
            {entry.type === "system" && (
              <div className="text-zinc-500">{entry.text}</div>
            )}
            {entry.type === "output" && (
              <div className={isMatrixMode ? "text-emerald-400" : "text-zinc-300"}>
                {entry.text}
              </div>
            )}
            {entry.type === "success" && (
              <div className="text-emerald-400 font-semibold">{entry.text}</div>
            )}
            {entry.type === "error" && (
              <div className="text-rose-400 font-semibold">{entry.text}</div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick Command Chips */}
      <div className="pt-2 pb-1 border-t border-zinc-800 flex flex-wrap gap-1.5 shrink-0">
        <span className="text-[10px] text-zinc-500 self-center">Quick Run:</span>
        {quickCommands.map((q) => (
          <button
            key={q}
            onClick={(e) => {
              e.stopPropagation();
              executeCommand(q);
            }}
            className="px-2 py-0.5 rounded-md bg-zinc-800/80 hover:bg-zinc-700 text-cyan-300 text-[10px] border border-zinc-700/50 hover:border-cyan-500/50 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Command Input Prompt */}
      <div className="pt-2 flex items-center gap-2 shrink-0">
        <span className="text-cyan-400 font-bold shrink-0">PS C:\Users\Elias&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 bg-transparent text-white outline-none border-none font-mono text-xs placeholder-zinc-600 caret-cyan-400"
          placeholder="Type 'help' or command..."
        />
        <button
          onClick={() => executeCommand(input)}
          className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
          title="Send Command"
        >
          <Send className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
