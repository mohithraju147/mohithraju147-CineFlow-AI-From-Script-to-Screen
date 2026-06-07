import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "CineFlow AI",
  description: "From Script to Screen, Powered by AI"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={cn("min-h-screen bg-background font-sans text-foreground antialiased")}>{children}</body>
    </html>
  );
}
