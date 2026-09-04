import React from "react";
import { cn } from "@/lib/utils";

export const Button = React.forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      className,
      disabled,
      icon: Icon,
      iconRight: IconRight,
      as: Component = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-md transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const sizeStyles = {
      sm: "text-xs px-2.5 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2 gap-2",
      lg: "text-sm md:text-base px-5 py-2.5 gap-2.5",
      icon: "p-2 aspect-square",
    };

    const variantStyles = {
      primary:
        "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 shadow-sm border border-transparent",
      secondary:
        "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800",
      outline:
        "bg-transparent text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-300 dark:border-zinc-700",
      ghost:
        "bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900",
      link:
        "bg-transparent text-zinc-900 dark:text-zinc-100 underline-offset-4 hover:underline p-0 h-auto",
    };

    return (
      <Component
        ref={ref}
        disabled={disabled}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {Icon && <Icon className="w-4 h-4 shrink-0" />}
        {children}
        {IconRight && <IconRight className="w-4 h-4 shrink-0" />}
      </Component>
    );
  }
);

Button.displayName = "Button";
