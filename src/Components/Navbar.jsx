import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 text-white font-[Poppins]">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <motion.img
            whileHover={{ scale: 1.1 }}
            src="/logo.webp"
            alt="Elias Logo"
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
          />
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="text-2xl md:text-3xl font-bold text-blue-400 cursor-pointer hover:text-blue-500 transition-colors duration-300"
          >
            Elias<span className="text-white">.dev</span>
          </motion.h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium">
          {navItems.map((item) => (
            <li key={item.label} className="group relative">
              <a
                href={item.href}
                className="py-1 px-2 hover:text-blue-400 transition-colors duration-300"
              >
                {item.label}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-blue-400 transition-colors duration-300"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        className="md:hidden text-center overflow-hidden transition-all duration-500 bg-gradient-to-b from-black/40 to-black/80"
      >
        <ul className="flex flex-col space-y-4 text-lg font-medium py-4">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block hover:text-blue-400 transition-colors duration-300"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </nav>
  );
};

export default Navbar;
