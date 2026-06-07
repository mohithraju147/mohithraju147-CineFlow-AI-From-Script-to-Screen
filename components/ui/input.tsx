import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn("h-10 w-full rounded-md border bg-black px-3 text-sm outline-none focus:border-gold", className)}
    {...props}
  />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn("min-h-28 w-full rounded-md border bg-black px-3 py-2 text-sm outline-none focus:border-gold", className)} {...props} />
));
Textarea.displayName = "Textarea";
