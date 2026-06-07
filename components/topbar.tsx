import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export async function Topbar() {
  const session = await getServerSession(authOptions);
  return (
    <header className="sticky top-0 z-10 border-b bg-background/90 px-4 py-3 backdrop-blur lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <Link href="/dashboard" className="font-semibold text-gold lg:hidden">
          CineFlow AI
        </Link>
        <div className="hidden text-sm text-zinc-400 lg:block">Production command center</div>
        <div className="flex items-center gap-3 text-sm">
          <span className="hidden text-zinc-300 sm:inline">{session?.user.email}</span>
          <span className="rounded bg-muted px-2 py-1 text-xs text-gold-soft">{session?.user.role ?? "GUEST"}</span>
          <Button asChild variant="secondary" className="h-8 px-3">
            <Link href="/api/auth/signout">Sign out</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
