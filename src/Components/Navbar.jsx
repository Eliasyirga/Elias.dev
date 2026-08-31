import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValue,
} from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 font-[Poppins] ${scrolled
          ? "bg-white/90 backdrop-blur-2xl py-4 border-b border-black/5 shadow-sm"
          : "bg-transparent py-10"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Stark Monochrome Logo */}
        <Magnetic>
          <motion.div className="relative z-[120]">
            <a href="#home" className="group flex items-center">
              <h1 className="text-2xl font-black tracking-tighter uppercase text-black">
                EY
                <span className="inline-block transition-transform duration-500 group-hover:rotate-180 text-black/20 group-hover:text-black">
                  .
                </span>
              </h1>
            </a>
          </motion.div>
        </Magnetic>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12">
          <ul className="flex space-x-10 text-[10px] font-black uppercase tracking-[0.4em] text-black/40">
            {navItems.map((item) => (
              <li key={item.label} className="relative group">
                <a
                  href={item.href}
                  className="hover:text-black transition-colors duration-500 block relative py-2"
                >
                  <motion.span whileHover={{ y: -2 }} className="inline-block">
                    {item.label}
                  </motion.span>
                </a>
                {/* Architectural Underline */}
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right group-hover:origin-left" />
              </li>
            ))}
          </ul>

          {/* High-Contrast Button */}
          <Magnetic>
            <motion.a
              href="#contact"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full overflow-hidden border border-black hover:text-black transition-colors duration-500"
            >
              <span className="relative z-10 flex items-center gap-2">
                Let's Talk
                <ArrowUpRight
                  size={14}
                  className="group-hover:rotate-45 transition-transform duration-500"
                />
              </span>

              {/* Inversion Slide */}
              <motion.div
                className="absolute inset-0 bg-white z-0"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              />
            </motion.a>
          </Magnetic>
        </div>

        {/* Minimalist Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-[130] w-12 h-12 flex items-center justify-center bg-black rounded-full text-white overflow-hidden group"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
              >
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="flex flex-col gap-1"
              >
                <div className="w-5 h-[1.5px] bg-white" />
                <div className="w-3 h-[1.5px] bg-white self-end" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Full-Page Mobile Overlay (Void Style) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-screen bg-black z-[110] md:hidden flex flex-col justify-center px-8"
          >
            <div className="space-y-4">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.1 * i,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-5xl font-black uppercase tracking-tighter text-white/10 hover:text-white transition-all duration-500 block"
                  >
                    <span className="text-[10px] tracking-[0.5em] text-white/30 mr-4 tabular-nums">
                      0{i + 1}
                    </span>
                    {item.label}
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Bottom Info Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-24 border-t border-white/10 pt-10 grid grid-cols-2 gap-8"
            >
              <div>
                <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-4">
                  Availability
                </p>
                <p className="text-white text-xs font-bold uppercase tracking-tighter">
                  Available for <br /> 2026 Projects
                </p>
              </div>
              <div>
                <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-4">
                  Social
                </p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="text-white text-xs font-bold uppercase hover:line-through transition-all"
                  >
                    LI
                  </a>
                  <a
                    href="#"
                    className="text-white text-xs font-bold uppercase hover:line-through transition-all"
                  >
                    GH
                  </a>
                  <a
                    href="#"
                    className="text-white text-xs font-bold uppercase hover:line-through transition-all"
                  >
                    TW
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3);
    y.set(middleY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: sx, y: sy }}
      className="flex items-center justify-center"
    >
      {children}
    </motion.div>
  );
};

export default Navbar;
