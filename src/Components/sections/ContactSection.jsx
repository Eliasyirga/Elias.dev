import React, { useState } from "react";
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  Github, 
  Linkedin, 
  Terminal, 
  Clock, 
  MapPin, 
  ArrowUpRight,
  Sparkles,
  MessageSquare
} from "lucide-react";

export const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inquiryType, setInquiryType] = useState("Full-Time Role");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const inquiryOptions = [
    "Full-Time Role",
    "Technical Architecture Review",
    "Contract / Consulting",
    "Engineering Chat"
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
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-10">
      {/* Section Header */}
      <div className="space-y-2 border-b border-zinc-200 dark:border-white/10 pb-5">
        <div className="font-mono text-xs text-zinc-500 flex items-center gap-2">
          <span className="text-cyan-500 font-bold">// 06</span>
          <span>CONNECT & COLLABORATION</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Direct Engineering Inquiry & Transmission Hub
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans max-w-xl">
          Direct channel for recruiters, engineering leaders, and collaborators. Sub-24h turnaround on inquiries.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Channels */}
        <div className="lg:col-span-5 tech-card rounded-2xl p-6 sm:p-7 border-zinc-200/90 dark:border-white/10 flex flex-col justify-between space-y-6 shadow-md">
          <div className="space-y-5">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-mono flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cyan-500" />
                <span>COMMUNICATION_CHANNELS</span>
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                Currently open for full-time distributed backend & full-stack roles, system design audits, and high-impact engineering projects.
              </p>
            </div>

            {/* Email Card */}
            <div className="p-4 rounded-xl bg-zinc-100/90 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/5 space-y-3 font-mono text-xs shadow-inner">
              <div className="flex items-center justify-between text-zinc-500 text-[11px]">
                <span>PRIMARY_INBOX</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>ONLINE & MONITORED</span>
                </span>
              </div>
              <div className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white break-all">
                eliasyirga575@gmail.com
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                <button
                  onClick={copyEmail}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900 hover:bg-black text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-950 font-bold transition-all shadow-sm active:scale-95"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "COPIED" : "COPY_EMAIL"}</span>
                </button>
                <a
                  href="mailto:eliasyirga575@gmail.com"
                  className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg border border-zinc-300 dark:border-white/10 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors font-semibold"
                >
                  <span>MAILTO</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
              <a
                href="https://github.com/eliasyirga"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl border border-zinc-200 dark:border-white/5 bg-zinc-50/80 dark:bg-zinc-900/50 flex items-center gap-2.5 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-white/20 transition-all hover:scale-102"
              >
                <Github className="w-4 h-4 text-zinc-900 dark:text-white" />
                <span className="font-semibold">GitHub Profile</span>
              </a>

              <a
                href="https://www.linkedin.com/in/elias-yirga-44a19b2a7"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl border border-zinc-200 dark:border-white/5 bg-zinc-50/80 dark:bg-zinc-900/50 flex items-center gap-2.5 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-white/20 transition-all hover:scale-102"
              >
                <Linkedin className="w-4 h-4 text-blue-500" />
                <span className="font-semibold">LinkedIn Profile</span>
              </a>

              <a
                href="https://t.me/Elawazza"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl border border-zinc-200 dark:border-white/5 bg-zinc-50/80 dark:bg-zinc-900/50 flex items-center gap-2.5 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-white/20 transition-all hover:scale-102"
              >
                <Send className="w-4 h-4 text-sky-400" />
                <span className="truncate font-semibold">@Elawazza</span>
              </a>

              <div className="p-3 rounded-xl border border-zinc-200 dark:border-white/5 bg-zinc-50/80 dark:bg-zinc-900/50 flex items-center gap-2 text-zinc-500">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>UTC+3 (EAT Timezone)</span>
              </div>
            </div>
          </div>

          <div className="pt-3.5 border-t border-zinc-200 dark:border-white/5 font-mono text-[11px] text-zinc-500 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
            <span>ETHIOPIA // REMOTE WORLDWIDE // RELOCATION AVAILABLE</span>
          </div>
        </div>

        {/* Right Form */}
        <div className="lg:col-span-7 tech-card rounded-2xl p-6 sm:p-7 border-zinc-200/90 dark:border-white/10 shadow-md flex flex-col justify-between">
          <div className="space-y-4">
            <div className="space-y-1 pb-3 border-b border-zinc-200 dark:border-white/10 font-mono text-xs">
              <span className="font-bold text-zinc-900 dark:text-zinc-100">TRANSMISSION_FORM</span>
              <span className="text-zinc-500 ml-2">// RFC & Job Inquiry</span>
            </div>

            {formSubmitted ? (
              <div className="p-8 rounded-2xl bg-zinc-100/90 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/5 text-center space-y-3 font-mono text-xs animate-in zoom-in-95 duration-150">
                <div className="w-10 h-10 rounded-full border-2 border-emerald-500 text-emerald-500 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                  <Check className="w-5 h-5" />
                </div>
                <div className="font-bold text-base text-zinc-900 dark:text-zinc-100 font-sans">
                  Transmission Delivered Successfully
                </div>
                <p className="text-zinc-500 font-sans text-xs max-w-sm mx-auto leading-relaxed">
                  Thank you! Your transmission regarding <strong>{inquiryType}</strong> has been queued. I will review and reply to {formData.email || "your email"} promptly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: "", email: "", message: "" });
                    }}
                    className="px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold"
                  >
                    SEND_ANOTHER_MESSAGE
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                {/* Inquiry Type Selector */}
                <div className="space-y-1.5">
                  <label className="text-zinc-500 block">
                    INQUIRY_INTENT
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {inquiryOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setInquiryType(opt)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                          inquiryType === opt
                            ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 border-zinc-900 dark:border-white font-bold shadow-sm"
                            : "border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-white/20"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-zinc-500">
                      SENDER_NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 text-zinc-900 dark:text-white font-sans text-xs focus:outline-none focus:border-cyan-500 transition-colors shadow-inner"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-500">
                      EMAIL_ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 text-zinc-900 dark:text-white font-sans text-xs focus:outline-none focus:border-cyan-500 transition-colors shadow-inner"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-500">
                    MESSAGE_PAYLOAD
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details on project scope, role requirements, or architectural challenge..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 text-zinc-900 dark:text-white font-sans text-xs focus:outline-none focus:border-cyan-500 transition-colors resize-none shadow-inner"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 hover:bg-black text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-950 font-bold font-mono transition-all shadow-md active:scale-95"
                >
                  <Send className="w-3.5 h-3.5 text-cyan-400 dark:text-cyan-600" />
                  <span>TRANSMIT_INQUIRY</span>
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
