import React from "react";
import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const FooterContact = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative bg-white text-black py-24 md:py-40 px-6 md:px-12 overflow-hidden font-[Poppins]"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 mb-24 md:mb-40">
          {/* Brand & Identity Column */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="h-[1px] w-8 bg-black" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black/40">
                  Contact
                </span>
              </motion.div>

              <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] mb-10">
                Let's <br />
                <span className="outline-text">Connect.</span>
              </h2>

              <p className="text-xl md:text-2xl text-black/50 font-medium leading-tight max-w-md">
                Crafting digital experiences that blend aesthetic elegance with
                technical precision.
              </p>
            </div>

            {/* Social Links Grid */}
            <div className="flex flex-wrap gap-4">
              <SocialLink
                Icon={FaLinkedin}
                href="https://linkedin.com/in/eliasyirga"
                label="LinkedIn"
              />
              <SocialLink
                Icon={FaGithub}
                href="https://github.com/eliasyirga"
                label="GitHub"
              />
              <SocialLink
                Icon={FaTwitter}
                href="https://twitter.com/eliasyirga"
                label="X-Twitter"
              />
            </div>
          </div>

          {/* Contact Details Grid */}
          <div className="lg:col-span-5 flex flex-col justify-end">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ContactCard
                Icon={HiOutlineMail}
                label="Message"
                value="eliasyirga575@gmail.com"
                href="mailto:eliasyirga575@gmail.com"
              />
              <ContactCard
                Icon={HiOutlinePhone}
                label="Call"
                value="+251 946 450 062"
                href="tel:+251946450062"
              />
              <ContactCard
                Icon={HiOutlineLocationMarker}
                label="Base"
                value="Addis Ababa, ET"
              />

              {/* Status Card */}
              <motion.div
                whileHover={{ y: -5 }}
                className="flex flex-col justify-between p-10 rounded-[2.5rem] bg-black text-white min-h-[200px]"
              >
                <div className="flex justify-between items-start">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-40">
                    Status
                  </span>
                </div>
                <p className="text-xl font-bold uppercase tracking-tighter leading-none">
                  Open for <br /> Collaboration
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <div className="text-xl font-black tracking-tighter">EY.</div>
            <p className="text-[10px] text-black/30 font-black uppercase tracking-[0.3em]">
              © {currentYear} — Addis Ababa
            </p>
          </div>

          <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-black/40">
            <a
              href="#"
              className="hover:text-black hover:line-through transition-all"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-black hover:line-through transition-all"
            >
              Terms
            </a>
            <p className="hidden md:block">Built with React</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1.5px #000;
          color: transparent;
        }
        @media (max-width: 768px) {
          .outline-text {
            -webkit-text-stroke: 1px #000;
          }
        }
      `}</style>
    </footer>
  );
};

const ContactCard = ({ Icon, label, value, href }) => (
  <motion.a
    href={href}
    target={href ? "_blank" : undefined}
    whileHover={href ? { y: -5, backgroundColor: "#000", color: "#fff" } : {}}
    className={`group flex flex-col justify-between p-10 rounded-[2.5rem] border border-black/5 bg-[#fafafa] transition-all duration-500 ${!href && "cursor-default"}`}
  >
    <div className="mb-8">
      <Icon
        size={24}
        className={
          href ? "group-hover:text-white transition-colors" : "text-black/20"
        }
      />
    </div>
    <div>
      <span className="block text-[9px] font-black uppercase tracking-widest mb-1 opacity-40">
        {label}
      </span>
      <span className="font-bold text-sm tracking-tight truncate block">
        {value}
      </span>
    </div>
  </motion.a>
);

const SocialLink = ({ Icon, href, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="group flex items-center gap-4 pl-4 pr-8 py-4 rounded-full border border-black/5 bg-white hover:bg-black hover:text-white transition-all duration-500 shadow-sm"
  >
    <div className="h-8 w-8 flex items-center justify-center rounded-full bg-black/5 group-hover:bg-white/10">
      <Icon size={16} />
    </div>
    <span className="text-[10px] font-black uppercase tracking-widest">
      {label}
    </span>
  </motion.a>
);

export default FooterContact;
