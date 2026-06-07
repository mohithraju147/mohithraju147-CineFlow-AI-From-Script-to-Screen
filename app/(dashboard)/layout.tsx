import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { AppSidebar } from "@/components/app-sidebar";
import { Topbar } from "@/components/topbar";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="min-w-0 flex-1">
        <Topbar />
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
