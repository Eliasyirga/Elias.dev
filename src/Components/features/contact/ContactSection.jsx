import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { testimonials } from "@/data/testimonials";
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy, Check, Quote } from "lucide-react";

export const ContactSection = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("eliasyirga575@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setFormSubmitted(true);
    setTimeout(() => {
      window.location.href = `mailto:eliasyirga575@gmail.com?subject=${encodeURIComponent(
        formData.subject || "Engineering Inquiry"
      )}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\n${formData.message}`
      )}`;
    }, 400);
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        index="06"
        tag="Communications"
        title="Direct Engineering Channels & Peer Endorsements"
        description="Available for staff software engineering roles, distributed architecture consulting, and high-performance frontend contracts."
      />

      {/* Peer Feedback Grid */}
      <div className="mb-16">
        <div className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-6">
          // Peer & Client Feedback
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 p-6 flex flex-col justify-between"
            >
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 font-normal">
                "{t.comment}"
              </p>
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    {t.name}
                  </h5>
                  <p className="text-[11px] font-mono text-zinc-400">
                    {t.role} • {t.organization}
                  </p>
                </div>
                <Quote className="w-4 h-4 text-zinc-300 dark:text-zinc-700" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Contact Matrix & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Specs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                Direct Channels
              </span>
              <Badge variant="mono" className="text-[10px] text-emerald-600 dark:text-emerald-400">
                SLA &lt; 24h Response
              </Badge>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-center justify-between p-3 rounded bg-white dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-zinc-500" />
                  <span className="text-zinc-800 dark:text-zinc-200">eliasyirga575@gmail.com</span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded bg-white dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-zinc-500" />
                  <span className="text-zinc-800 dark:text-zinc-200">+251 946 450 062</span>
                </div>
                <a
                  href="tel:+251946450062"
                  className="text-[11px] text-zinc-500 hover:underline"
                >
                  Call
                </a>
              </div>

              <div className="flex items-center gap-3 p-3 rounded bg-white dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800">
                <MapPin className="w-4 h-4 text-zinc-500" />
                <span className="text-zinc-800 dark:text-zinc-200">Addis Ababa, Ethiopia (UTC+3)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Message Dispatch Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 p-6 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                Transmission Form
              </span>
              <span className="font-mono text-[10px] text-zinc-400">TLS ENCRYPTED</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-500 mb-1">
                  Name / Identifier
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Vance"
                  className="w-full rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-500 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-zinc-500 mb-1">
                Subject / Scope of Work
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. Full-Stack Engineering Position / Architecture Audit"
                className="w-full rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-zinc-500 mb-1">
                Message Payload
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Detail technical requirements, timeline, and stack context..."
                className="w-full rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
              />
            </div>

            <Button type="submit" variant="primary" size="md" className="w-full" icon={Send}>
              {formSubmitted ? "Dispatching..." : "Transmit Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
