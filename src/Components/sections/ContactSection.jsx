import React, { useState } from "react";
import {
  Mail,
  Send,
  Copy,
  Check,
  Github,
  Linkedin,
  Clock,
  MapPin,
  ArrowUpRight,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inquiryType, setInquiryType] = useState("Full-Time Role");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const inquiryOptions = [
    "Full-Time Role",
    "Contract / Freelance",
    "Consultation",
    "General Inquiry",
  ];

  const copyEmail = () => {
    navigator.clipboard.writeText("eliasyirga575@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-8 sm:space-y-10">
      {/* Section Header */}
      <div className="space-y-2 border-b border-zinc-200 dark:border-white/10 pb-4 sm:pb-5">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
          <Mail className="w-4 h-4" />
          <span>Contact</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
          Let's Build Something Great Together
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans max-w-xl">
          Interested in working together or have an engineering role opening? Send me a message and I'll get back to you promptly.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        
        {/* Left Info Card */}
        <div className="lg:col-span-5 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#12141a] flex flex-col justify-between space-y-6 shadow-sm">
          <div className="space-y-5">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                Contact Information
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Open for full-time software engineering roles, distributed systems, and modern web application development.
              </p>
            </div>

            {/* Direct Email Card */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 space-y-2.5 font-mono text-xs shadow-sm">
              <div className="flex items-center justify-between text-zinc-500 text-[11px]">
                <span>DIRECT EMAIL</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available</span>
                </span>
              </div>
              <div className="text-sm font-bold text-zinc-900 dark:text-white break-all">
                eliasyirga575@gmail.com
              </div>
              <div className="flex items-center gap-2 pt-1 font-sans text-xs">
                <button
                  onClick={copyEmail}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-black text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-950 font-bold transition-all shadow-sm active:scale-95"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy Email"}</span>
                </button>
                <a
                  href="mailto:eliasyirga575@gmail.com"
                  className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold transition-colors"
                >
                  <span>Mailto</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <a
                href="https://github.com/eliasyirga"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-900 flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-white/20 transition-all hover:scale-102"
              >
                <Github className="w-4 h-4 text-zinc-900 dark:text-white" />
                <span className="font-semibold">GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/elias-yirga-44a19b2a7"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-900 flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-white/20 transition-all hover:scale-102"
              >
                <Linkedin className="w-4 h-4 text-blue-500" />
                <span className="font-semibold">LinkedIn</span>
              </a>

              <a
                href="https://t.me/Elawazza"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-900 flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-white/20 transition-all hover:scale-102"
              >
                <Send className="w-4 h-4 text-sky-400" />
                <span className="font-semibold">Telegram</span>
              </a>

              <div className="p-3 rounded-xl border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-900 flex items-center gap-2 text-zinc-500">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>UTC+3 (EAT)</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-100 dark:border-white/5 text-[11px] font-mono text-zinc-500 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
            <span>Bahir Dar / Addis Ababa, Ethiopia • Remote Worldwide</span>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="lg:col-span-7 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#12141a] shadow-sm flex flex-col justify-between">
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
              Send a Message
            </h3>

            {formSubmitted ? (
              <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 text-center space-y-3 font-mono text-xs animate-in zoom-in-95 duration-150">
                <div className="w-12 h-12 rounded-full border-2 border-emerald-500 text-emerald-500 flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-6 h-6" />
                </div>
                <div className="font-bold text-base text-zinc-900 dark:text-white font-sans">
                  Message Sent Successfully!
                </div>
                <p className="text-zinc-500 font-sans text-xs max-w-sm mx-auto leading-relaxed">
                  Thank you, {formData.name || "friend"}. Your message regarding <strong>{inquiryType}</strong> has been received. I will respond to {formData.email || "your email"} as soon as possible.
                </p>
                <div className="pt-2 font-sans">
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: "", email: "", message: "" });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold text-xs"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                {/* Inquiry Type Selector */}
                <div className="space-y-1.5">
                  <label className="text-zinc-500 font-mono text-[11px] font-semibold block">
                    Inquiry Type
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {inquiryOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setInquiryType(opt)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                          inquiryType === opt
                            ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-sm"
                            : "border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-zinc-500 font-mono text-[11px] font-semibold">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white text-xs focus:ring-1 focus:ring-cyan-500 outline-none transition-colors shadow-inner"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-500 font-mono text-[11px] font-semibold">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white text-xs focus:ring-1 focus:ring-cyan-500 outline-none transition-colors shadow-inner"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-500 font-mono text-[11px] font-semibold">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your project, team, or opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white text-xs focus:ring-1 focus:ring-cyan-500 outline-none transition-colors resize-none shadow-inner leading-relaxed"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 hover:bg-black text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-950 font-bold text-xs transition-all shadow-md active:scale-95"
                >
                  <Send className="w-3.5 h-3.5 text-cyan-400 dark:text-cyan-600" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
