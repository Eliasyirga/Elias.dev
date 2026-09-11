import React, { useState } from "react";
import {
  Mail,
  Send,
  Check,
  Copy,
  Github,
  Linkedin,
  Sparkles,
  Phone,
  Clock,
  ShieldCheck,
} from "lucide-react";

export const ContactApp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Engineering Opportunity / Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("eliasyirga575@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-white/70 dark:bg-[#0c0d12]/90 text-zinc-900 dark:text-zinc-100 font-sans text-xs">
      {/* Left Sidebar Info */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-white/10 p-5 flex flex-col justify-between shrink-0 bg-zinc-50/80 dark:bg-[#101218]/80 space-y-4">
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono font-bold text-xs">
              <Mail className="w-4 h-4" />
              <span>OUTLOOK TRANSMISSION</span>
            </div>
            <p className="text-zinc-500 text-[11px] leading-relaxed">
              Direct communication link to Elias Yirga for full-time engineering roles, contracting, and technical collaboration.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 space-y-2 text-xs shadow-sm font-mono">
            <div className="text-[10px] text-zinc-400 uppercase font-bold">Direct Email</div>
            <div className="text-zinc-800 dark:text-zinc-200 font-bold truncate">eliasyirga575@gmail.com</div>
            <button
              onClick={copyEmail}
              className="w-full py-1.5 px-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied to Clipboard" : "Copy Email"}</span>
            </button>
          </div>

          {/* Social Links */}
          <div className="space-y-2 font-mono text-xs">
            <div className="text-[10px] text-zinc-400 uppercase font-bold">Fast Channels</div>
            <a
              href="https://t.me/Elawazza"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 p-2 rounded-xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900 hover:border-cyan-500/50 text-zinc-700 dark:text-zinc-300 transition-all"
            >
              <Send className="w-3.5 h-3.5 text-sky-400" />
              <span>Telegram: @Elawazza</span>
            </a>
            <a
              href="https://linkedin.com/in/elias-yirga-44a19b2a7"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 p-2 rounded-xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900 hover:border-cyan-500/50 text-zinc-700 dark:text-zinc-300 transition-all"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-500" />
              <span>LinkedIn Profile</span>
            </a>
            <a
              href="https://github.com/eliasyirga"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 p-2 rounded-xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900 hover:border-cyan-500/50 text-zinc-700 dark:text-zinc-300 transition-all"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repositories</span>
            </a>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>RECRUITER FAST-TRACK ACTIVE</span>
        </div>
      </div>

      {/* Right Form Pane */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-7 flex flex-col justify-between">
        {submitted ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 max-w-md mx-auto animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
              <Check className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                Message Dispatched Successfully!
              </h3>
              <p className="text-zinc-500 text-xs leading-relaxed font-sans">
                Thank you, {formData.name || "friend"}. Your transmission has been queued. Elias will review and respond promptly.
              </p>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: "", email: "", subject: "Engineering Opportunity", message: "" });
              }}
              className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-mono font-bold text-xs"
            >
              Send Another Transmission
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto w-full">
            <div className="space-y-1">
              <h2 className="font-bold text-base text-zinc-900 dark:text-white">
                Send Direct Message
              </h2>
              <p className="text-zinc-500 text-xs font-sans">
                Fill out the fields below or reach out directly at eliasyirga575@gmail.com
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-zinc-500 font-mono text-[10px] uppercase font-bold">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Recruiter"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-xs focus:ring-1 focus:ring-cyan-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-500 font-mono text-[10px] uppercase font-bold">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-xs focus:ring-1 focus:ring-cyan-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-zinc-500 font-mono text-[10px] uppercase font-bold">Subject / Inquiry Type</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-xs focus:ring-1 focus:ring-cyan-500 outline-none font-mono"
              >
                <option value="Full-Time Engineering Role">Full-Time Engineering Role</option>
                <option value="Contract / Project Architecture">Contract / Project Architecture</option>
                <option value="Technical Consultation">Technical Consultation</option>
                <option value="General Engineering Inquiry">General Engineering Inquiry</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-zinc-500 font-mono text-[10px] uppercase font-bold">Message Content</label>
              <textarea
                required
                rows={4}
                placeholder="Describe project specifications, timeline, team stack, or role details..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-xs focus:ring-1 focus:ring-cyan-500 outline-none resize-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-black text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-950 font-bold font-mono text-xs flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <Send className="w-3.5 h-3.5 text-cyan-400 dark:text-cyan-600" />
              <span>TRANSMIT MESSAGE NOW</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
