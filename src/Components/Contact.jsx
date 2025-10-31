import React from "react";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { FaLinkedin, FaGithub, FaTwitter, FaFacebook } from "react-icons/fa";

const FooterContact = () => {
  return (
    <footer id="contact" className="relative bg-gradient-to-tl from-black via-gray-900 to-black text-gray-300 font-[Poppins] overflow-hidden py-24">
      {/* Soft background wave */}
      <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-[150%] h-96 bg-blue-900/10 rounded-full filter blur-3xl animate-pulse-slow pointer-events-none"></div>
      <div className="absolute -top-32 -right-1/4 w-[60%] h-80 bg-purple-800/10 rounded-full filter blur-3xl animate-pulse-slow pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 space-y-16">
        {/* Header: Logo + Name + Intro */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600/10 p-2 rounded-full shadow-md hover:scale-105 hover:shadow-blue-400 transition-transform duration-500">
              <img
                src="/logo.webp"
                alt="Elias Yirga Logo"
                className="w-16 h-16 rounded-full object-cover"
                draggable={false}
              />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent animate-textSlide select-none">
              Elias Yirga
            </h2>
          </div>
          <p className="max-w-md text-gray-400 text-center sm:text-left leading-relaxed">
            Passionate software developer crafting modern, scalable web
            applications. Let’s connect and build impactful solutions together!
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          <ContactCard
            Icon={HiOutlineMail}
            title="Email"
            value="eliasyirga575@gmail.com"
            href="mailto:eliasyirga575@gmail.com"
            delay="0.1s"
          />
          <ContactCard
            Icon={HiOutlinePhone}
            title="Phone"
            value="+251 946450062"
            href="tel:+251946450062"
            delay="0.3s"
          />
          <ContactCard
            Icon={HiOutlineLocationMarker}
            title="Location"
            value="Addis Ababa, Ethiopia"
            delay="0.5s"
          />
        </div>

        {/* Social Icons */}
        <div className="flex justify-center sm:justify-start gap-8 mt-6">
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
            label="Twitter"
          />
          <SocialLink
            Icon={FaFacebook}
            href="https://facebook.com/eliasyirga"
            label="Facebook"
          />
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800 mt-16 pt-6 text-center text-xs sm:text-sm text-gray-500 select-none relative z-10">
        © {new Date().getFullYear()} Elias Yirga. All rights reserved.
      </div>

      {/* Animations */}
      <style>{`
        @keyframes textSlide {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-textSlide {
          background-size: 200% 200%;
          animation: textSlide 6s ease infinite;
        }

        @keyframes pulseSlow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.15; }
        }
        .animate-pulse-slow {
          animation: pulseSlow 6s ease-in-out infinite;
        }

        @keyframes bounceInUp {
          0% { opacity: 0; transform: translateY(40px); }
          60% { opacity: 1; transform: translateY(-8px); }
          80% { transform: translateY(4px); }
          100% { transform: translateY(0); }
        }
        .animate-bounceInUp {
          animation: bounceInUp 0.8s ease forwards;
        }

        .hover-scale-up:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }

        .subtle-glow {
          box-shadow: 0 0 6px rgba(59, 130, 246, 0.4);
          transition: box-shadow 0.3s ease;
        }
        .subtle-glow:hover {
          box-shadow: 0 0 12px rgba(59, 130, 246, 0.6);
        }

        .glass-card {
          background: rgba(0, 0, 0, 0.65);
          border: 1px solid rgba(59, 130, 246, 0.4);
          backdrop-filter: blur(12px);
        }
      `}</style>
    </footer>
  );
};

const ContactCard = ({ Icon, title, value, href, delay }) => (
  <div
    className="flex flex-col items-center sm:items-start space-y-2 rounded-3xl p-6 glass-card shadow-md hover:shadow-blue-500 hover-scale-up animate-bounceInUp"
    style={{ animationDelay: delay }}
  >
    <Icon className="w-10 h-10 text-blue-400" />
    <h4 className="font-semibold text-lg">{title}</h4>
    {href ? (
      <a
        href={href}
        className="text-gray-300 hover:text-blue-400 text-base break-words text-center sm:text-left"
      >
        {value}
      </a>
    ) : (
      <p className="text-gray-300 text-base text-center sm:text-left">
        {value}
      </p>
    )}
  </div>
);

const SocialLink = ({ Icon, href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="text-gray-400 hover:text-blue-400 transition-transform duration-300 hover-scale-up subtle-glow"
  >
    <Icon className="w-9 h-9 sm:w-8 sm:h-8" />
  </a>
);

export default FooterContact;
