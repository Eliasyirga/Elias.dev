import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { 
  Sun, 
  Moon, 
  Terminal, 
  FileDown, 
  Menu, 
  X, 
  Copy, 
  Check,
  Sparkles,
  ArrowUpRight
} from "lucide-react";

export const FloatingNavbar = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [copiedCli, setCopiedCli] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["hero", "about", "projects", "skills", "experience", "certificates", "contact"];
      const scrollPosition = window.scrollY + 220;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { num: "01", name: "Philosophy", href: "#about", id: "about" },
    { num: "02", name: "Projects & RFCs", href: "#projects", id: "projects" },
    { num: "03", name: "Capabilities", href: "#skills", id: "skills" },
    { num: "04", name: "Track Record", href: "#experience", id: "experience" },
    { num: "05", name: "Credentials", href: "#certificates", id: "certificates" },
    { num: "06", name: "Contact", href: "#contact", id: "contact" },
  ];

  const copyCli = () => {
    navigator.clipboard.writeText("npx eliasyirga");
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2200);
  };

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 py-2.5 sm:py-3.5 transition-all duration-300">
      <nav
        className={`w-full max-w-6xl transition-all duration-300 rounded-2xl ${
          scrolled
            ? "tech-card py-2 px-3 sm:px-5 shadow-2xl bg-white/80 dark:bg-[#0c0c10]/85 backdrop-blur-xl border-zinc-200/80 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5"
            : "bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md py-2 px-3 sm:px-4 border border-zinc-200/50 dark:border-white/5"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          {/* Brand Logo / Terminal Prompt */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, "#hero")}
            className="group flex items-center gap-2.5 focus:outline-none shrink-0"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-xl overflow-visible border border-zinc-300/80 dark:border-zinc-700/80 p-0.5 bg-zinc-100 dark:bg-zinc-800 group-hover:border-cyan-400 dark:group-hover:border-cyan-400 transition-colors shadow-sm">
              <img 
                src="/vv.webp" 
                alt="Elias Yirga" 
                className="w-full h-full object-cover rounded-[10px]" 
              />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse ring-2 ring-white dark:ring-zinc-900"></span>
            </div>
            <div className="flex flex-col font-mono text-xs leading-none">
              <div className="flex items-center gap-1 font-bold text-zinc-900 dark:text-zinc-100 tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                <span>elias.dev</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-sans font-semibold">HIRING</span>
              </div>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 hidden sm:inline">
                computer_engineer
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 bg-zinc-100/80 dark:bg-zinc-900/60 p-1 rounded-xl border border-zinc-200/80 dark:border-white/5 font-mono text-xs shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-sm scale-[1.02]"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
                  }`}
                >
                  <span className="opacity-40 mr-1.5 text-[10px]">{link.num}</span>
                  <span>{link.name}</span>
                </a>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            {/* CLI Command Pill */}
            <button
              onClick={copyCli}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50/80 dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white text-xs font-mono transition-all group shadow-sm"
              title="Click to copy terminal command"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-500 group-hover:rotate-6 transition-transform" />
              <span>npx eliasyirga</span>
              {copiedCli ? (
                <span className="flex items-center gap-0.5 text-emerald-500 font-bold text-[11px] animate-in fade-in">
                  <Check className="w-3 h-3" />
                  <span>COPIED</span>
                </span>
              ) : (
                <Copy className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity" />
              )}
            </button>

            {/* Resume Button */}
            <a
              href="/Elias_Yirga_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-black text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-950 text-xs font-mono font-semibold transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              <FileDown className="w-3.5 h-3.5 text-cyan-400 dark:text-cyan-600" />
              <span>CV / RESUME</span>
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-100/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all hover:scale-105 active:scale-95"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-500" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col gap-1.5 font-mono text-xs bg-white/95 dark:bg-[#0c0c10]/95 rounded-xl p-3 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 active:bg-zinc-200 font-medium"
              >
                <span className="flex items-center gap-2">
                  <span className="opacity-40 text-[10px]">{link.num}</span>
                  {link.name}
                </span>
                <span className="text-zinc-400">→</span>
              </a>
            ))}
            <div className="pt-2 mt-1 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between px-3 text-[11px] text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-cyan-500" />
                <span>npx eliasyirga</span>
              </span>
              <button 
                onClick={copyCli} 
                className="px-2.5 py-1 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-bold"
              >
                {copiedCli ? "Copied ✓" : "Copy CLI"}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default FloatingNavbar;
