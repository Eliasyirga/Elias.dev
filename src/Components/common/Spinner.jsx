import React from "react";
import { cn } from "@/lib/utils";

export const Spinner = ({ className, size = "md", label = "Loading..." }) => {
  const sizeMap = {
    sm: "w-4 h-4 border",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-2",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 p-8", className)}>
      <div
        className={cn(
          "rounded-full border-zinc-300 dark:border-zinc-700 border-t-zinc-900 dark:border-t-zinc-100 animate-spin",
          sizeMap[size]
        )}
      />
      {label && (
        <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400 tracking-wider uppercase">
          {label}
        </span>
      )}
    </div>
  );
};
