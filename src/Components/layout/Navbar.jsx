import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Command, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export const Navbar = ({ onOpenCommandPalette }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "OVERVIEW", href: "#overview" },
    { label: "PROJECTS", href: "#projects" },
    { label: "ABOUT", href: "#about" },
    { label: "STACK", href: "#stack" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "CREDENTIALS", href: "#credentials" },
    { label: "CONTACT", href: "#contact" },
  ];

  const handleNavClick = (target) => {
    setMobileOpen(false);
    if (target.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const el = document.querySelector(target);
          el?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(target);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/80 py-3"
          : "bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-900/60 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-sm sm:text-base font-bold tracking-tight text-white uppercase hover:text-cyan-400 transition-colors"
          >
            <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-cyan-500/40 shrink-0">
              <img src="/vv.webp" alt="Elias Yirga" className="w-full h-full object-cover" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-pulse ring-1 ring-zinc-900" />
            </div>
            <span>ELIAS YIRGA</span>
          </Link>
          <span className="hidden lg:inline-block font-mono text-[11px] text-zinc-500 border-l border-zinc-800 pl-3">
            SYSTEMS &amp; FRONTEND ARCHITECT
          </span>
        </div>

        {/* Center/Right: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs tracking-wider">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="text-zinc-400 hover:text-white uppercase transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Actions: Hireable Tag, Theme Toggle & Command Palette */}
        <div className="flex items-center gap-2.5">
          {/* Theme Mode Toggle Button (Dark / Light) */}
          <button
            onClick={toggleTheme}
            className="p-1.5 sm:px-2 sm:py-1 rounded-md border border-zinc-800 bg-zinc-900/90 text-zinc-300 hover:text-cyan-400 hover:border-zinc-700 transition-colors flex items-center gap-1.5 font-mono text-[11px]"
            title={`Switch to ${resolvedTheme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Dark/Light Mode"
          >
            {resolvedTheme === "dark" ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">LIGHT</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">DARK</span>
              </>
            )}
          </button>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>[HIREABLE]</span>
          </div>

          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-zinc-800 bg-zinc-900/90 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors font-mono text-[11px]"
            title="Search Commands (Ctrl+K / Cmd+K)"
          >
            <Command className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">⌘K</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 rounded border border-zinc-800 text-zinc-300 md:hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-6 py-5 space-y-3 font-mono text-xs">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-left text-zinc-300 hover:text-cyan-400 py-1.5 uppercase transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px]">
            <span className="text-zinc-500">Theme</span>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 text-cyan-400 font-semibold"
            >
              {resolvedTheme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{resolvedTheme === "dark" ? "LIGHT MODE" : "DARK MODE"}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
