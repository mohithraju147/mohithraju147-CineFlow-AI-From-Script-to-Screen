import Link from "next/link";
import { CalendarDays, Clapperboard, Gauge, HardDrive, Receipt, Sparkles, Users, Wand2 } from "lucide-react";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/projects", label: "Projects", icon: Clapperboard },
  { href: "/production-generator", label: "AI Generator", icon: Wand2 },
  { href: "/scripts", label: "Scripts", icon: Sparkles },
  { href: "/cast", label: "Cast", icon: Users },
  { href: "/crew", label: "Crew", icon: Users },
  { href: "/equipment", label: "Equipment", icon: HardDrive },
  { href: "/budget", label: "Budget", icon: Receipt },
  { href: "/scheduling", label: "Schedule", icon: CalendarDays }
];

export function AppSidebar() {
  return (
    <aside className="hidden min-h-screen w-64 border-r bg-black/70 p-5 lg:block">
      <Link href="/dashboard" className="block">
        <div className="text-xl font-bold text-gold">CineFlow AI</div>
        <div className="mt-1 text-xs text-zinc-400">From Script to Screen, Powered by AI</div>
      </Link>
      <nav className="mt-8 space-y-1">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-300 hover:bg-muted hover:text-gold-soft">
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
