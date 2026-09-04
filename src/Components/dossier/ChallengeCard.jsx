import React from "react";
import { Cpu, AlertCircle, CheckCircle2 } from "lucide-react";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const ChallengeCard = ({ challenge, index }) => {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6 space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <Cpu className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
        <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 font-sans">
          Challenge 0{index + 1}: {challenge.title}
        </h3>
      </div>

      <div className="space-y-3 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <strong className="text-zinc-900 dark:text-zinc-100 font-semibold font-mono text-xs uppercase block mb-0.5">
              The Engineering Problem:
            </strong>
            <p>{challenge.description}</p>
          </div>
        </div>

        <div className="flex items-start gap-2 pt-1">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <strong className="text-zinc-900 dark:text-zinc-100 font-semibold font-mono text-xs uppercase block mb-0.5">
              The Implemented Solution:
            </strong>
            <p>{challenge.solution}</p>
          </div>
        </div>
      </div>

      {challenge.codeSnippet && (
        <div className="pt-2">
          <CodeBlock
            code={challenge.codeSnippet}
            language={challenge.language || "javascript"}
            title="Production Implementation"
          />
        </div>
      )}
    </div>
  );
};

export default ChallengeCard;
