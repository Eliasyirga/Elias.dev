import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const CodeBlock = ({ code, language = "javascript", title, className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  return (
    <div
      className={cn(
        "rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-zinc-100 overflow-hidden font-mono text-xs",
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-950/80 text-zinc-400">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          </div>
          {title && <span className="text-[11px] text-zinc-400 ml-2">{title}</span>}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-wider text-zinc-500">{language}</span>
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
            title="Copy code snippet"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
      <div className="p-4 overflow-x-auto text-[12px] leading-relaxed selection:bg-zinc-800">
        <pre>
          <code>{code.trim()}</code>
        </pre>
      </div>
    </div>
  );
};
