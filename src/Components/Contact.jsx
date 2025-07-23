import React from "react";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { FaLinkedin, FaGithub, FaTwitter, FaFacebook } from "react-icons/fa";

const FooterContact = () => {
  return (
    <footer
      id="contact"
      className="bg-gradient-to-br from-black via-gray-900 to-black text-gray-300 font-[Poppins]"
    >
      <section className="max-w-5xl mx-auto px-6 py-16 sm:py-20 space-y-12 text-center sm:text-left">
        {/* Logo and Name */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center space-y-3 sm:space-y-0 sm:space-x-6 animate-fadeIn">
          <div
            className="bg-white p-2 rounded-full shadow-lg cursor-pointer
            animate-float hover:shadow-blue-700 hover:scale-110 hover:-translate-y-1
            transition-transform duration-700 ease-in-out"
            style={{
              width: "72px",
              height: "72px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/logo.webp"
              alt="Elias Yirga Logo"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
              draggable={false}
            />
          </div>

          <h2
            className="text-3xl sm:text-4xl font-extrabold tracking-wide
            bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent
            cursor-default animate-textSlide select-none"
          >
            Elias Yirga
          </h2>
        </div>

        <p className="max-w-xl mx-auto sm:mx-0 text-gray-400 leading-relaxed text-base sm:text-lg">
          Passionate software developer crafting modern, scalable web
          applications. Let’s connect and build impactful solutions together!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 bg-black/90 rounded-3xl p-8 sm:p-10 border border-blue-700 shadow-lg backdrop-blur-md">
          <ContactItem
            Icon={HiOutlineMail}
            value="eliasyirga575@gmail.com"
            href="mailto:eliasyirga575@gmail.com"
            delay="0.1s"
          />
          <ContactItem
            Icon={HiOutlinePhone}
            value="+251 946450062"
            href="tel:+251946450062"
            delay="0.3s"
          />
          <ContactItem
            Icon={HiOutlineLocationMarker}
            value="Addis Ababa, Ethiopia"
            delay="0.5s"
          />
        </div>

        <div className="flex justify-center sm:justify-start gap-10 mt-8">
          <SocialLink
            Icon={FaLinkedin}
            href="https://www.linkedin.com/in/eliasyirga"
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
      </section>

      <div className="border-t border-gray-800 py-4 text-center text-xs sm:text-sm text-gray-500 select-none">
        © {new Date().getFullYear()} Elias Yirga. All rights reserved.
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes textSlide {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-textSlide {
          background-size: 200% 200%;
          animation: textSlide 6s ease infinite;
        }

        @keyframes bounceInUp {
          0% { opacity: 0; transform: translateY(100%); }
          60% { opacity: 1; transform: translateY(-10%); }
          80% { transform: translateY(5%); }
          100% { transform: translateY(0); }
        }
        .animate-bounceInUp {
          animation: bounceInUp 0.8s ease forwards;
        }

        .hover-scale-up:hover {
          transform: scale(1.1);
          transition: transform 0.3s ease;
        }
      `}</style>
    </footer>
  );
};

const ContactItem = ({ Icon, value, href, delay }) => (
  <div
    className="flex flex-col items-center sm:items-start space-y-3 cursor-pointer
               bg-black/80 rounded-xl p-5 shadow-md transition-transform duration-300
               hover:shadow-blue-700 hover-scale-up animate-bounceInUp"
    style={{ animationDelay: delay }}
  >
    <Icon className="w-10 h-10 sm:w-9 sm:h-9 text-blue-600" />
    {href ? (
      <a
        href={href}
        className="hover:text-blue-400 text-lg font-semibold transition duration-300 break-words max-w-xs text-center sm:text-left"
      >
        {value}
      </a>
    ) : (
      <p className="text-lg font-semibold break-words max-w-xs text-center sm:text-left">
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
    className="text-gray-400 hover:text-blue-600 cursor-pointer
               transition-transform duration-300 hover-scale-up"
  >
    <Icon className="w-9 h-9 sm:w-8 sm:h-8" />
  </a>
);

export default FooterContact;
