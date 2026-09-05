import React from "react";
import { 
  Github, 
  Linkedin, 
  Send, 
  Mail, 
  ArrowUp, 
  Terminal, 
  Activity,
  Heart,
  FileDown
} from "lucide-react";

export const ModernFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-[#09090c]/90 backdrop-blur-md text-zinc-900 dark:text-zinc-100 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Col 1 */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5 font-mono text-xs">
              <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold text-[10px]">
                EY
              </div>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">ELIAS_YIRGA</span>
              <span className="text-zinc-400 dark:text-zinc-600">//</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">COMPUTER_ENGINEER</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed font-sans">
              Computer engineering graduate building real-time spatial dispatch pipelines, distributed services, and high-performance web platforms with strict relational integrity.
            </p>
            <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Bahir Dar / Addis Ababa, Ethiopia & Worldwide Remote (UTC+3)</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <div className="text-zinc-400 dark:text-zinc-500 uppercase font-bold tracking-wider text-[11px]">
              DOSSIER_REGISTRIES
            </div>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
              <li>
                <a href="#about" className="hover:text-cyan-600 dark:hover:text-white transition-colors">
                  [01] Systems Philosophy
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-600 dark:hover:text-white transition-colors">
                  [02] Production Projects & RFCs
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-cyan-600 dark:hover:text-white transition-colors">
                  [03] Capability Matrix
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-cyan-600 dark:hover:text-white transition-colors">
                  [04] Career & Education Timeline
                </a>
              </li>
              <li>
                <a href="#certificates" className="hover:text-cyan-600 dark:hover:text-white transition-colors">
                  [05] Accreditations & Credentials
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-600 dark:hover:text-white transition-colors">
                  [06] Direct Transmission Hub
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <div className="text-zinc-400 dark:text-zinc-500 uppercase font-bold tracking-wider text-[11px]">
              CONNECT_CHANNELS
            </div>
            <div className="flex flex-col gap-2 text-zinc-600 dark:text-zinc-400">
              <a
                href="https://github.com/eliasyirga"
                target="_blank"
                rel="noreferrer"
                className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-2"
              >
                <Github className="w-4 h-4 text-zinc-900 dark:text-white" />
                <span>github.com/eliasyirga</span>
              </a>
              <a
                href="https://www.linkedin.com/in/elias-yirga-44a19b2a7"
                target="_blank"
                rel="noreferrer"
                className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-2"
              >
                <Linkedin className="w-4 h-4 text-blue-500" />
                <span>linkedin.com/in/elias-yirga</span>
              </a>
              <a
                href="https://t.me/Elawazza"
                target="_blank"
                rel="noreferrer"
                className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4 text-sky-400" />
                <span>Telegram: @Elawazza</span>
              </a>
              <a
                href="mailto:eliasyirga575@gmail.com"
                className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-rose-400" />
                <span className="truncate">eliasyirga575@gmail.com</span>
              </a>
              <a
                href="/Elias_Yirga_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold pt-1"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} Elias Yirga // Built with React & Tailwind // Architecture First
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-all active:scale-95 shadow-sm"
          >
            <span>BACK_TO_TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;
