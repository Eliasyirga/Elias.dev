import React from "react";
import { cn } from "@/lib/utils";

export const SectionHeader = ({
  index,
  tag,
  title,
  description,
  className,
  align = "left",
}) => {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-3xl",
        className
      )}
    >
      <div className={cn("flex items-center gap-2 mb-3", align === "center" && "justify-center")}>
        {index && (
          <span className="font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500 tracking-wider">
            {index}
          </span>
        )}
        {index && tag && <span className="text-zinc-300 dark:text-zinc-700">/</span>}
        {tag && (
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-medium">
            {tag}
          </span>
        )}
      </div>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
        {title}
      </h2>
      {description && (
        <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
