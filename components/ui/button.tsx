import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" && "bg-gold text-black hover:bg-gold-soft",
        variant === "secondary" && "border bg-muted text-foreground hover:border-gold",
        variant === "ghost" && "hover:bg-muted",
        className
      )}
      {...props}
    />
  );
}
