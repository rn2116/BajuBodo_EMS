import { cn } from "@/lib/utils";
import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "gold" | "sage" | "terracotta" | "neutral" | "outline";
}

export function Badge({
  className,
  variant = "neutral",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    gold: "bg-gold-light text-gold-deep border border-gold/30",
    sage: "bg-sage-light text-sage-dark border border-sage/30",
    terracotta: "bg-terracotta-light text-terracotta-dark border border-terracotta/30",
    neutral: "bg-cream-200 text-taupe-dark border border-sand",
    outline: "bg-transparent text-umber border border-sand",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
