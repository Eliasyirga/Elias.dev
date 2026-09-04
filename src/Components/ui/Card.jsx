import React from "react";
import { cn } from "@/lib/utils";

export const Card = ({ children, className, hover = true, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-zinc-200 dark:border-zinc-800/90 bg-white dark:bg-zinc-950/60 p-6 transition-all duration-200",
        hover && "hover:border-zinc-400 dark:hover:border-zinc-700/90 hover:shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
