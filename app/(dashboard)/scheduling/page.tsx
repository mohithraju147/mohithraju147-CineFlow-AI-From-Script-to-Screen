import { format } from "date-fns";
import { ResourceForm } from "@/components/forms/resource-form";
import { Card, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";

export default async function SchedulingPage() {
  const [projects, schedules] = await Promise.all([prisma.project.findMany(), prisma.schedule.findMany({ include: { project: true }, orderBy: { shootDate: "asc" } })]);
  return <div className="space-y-6"><div><h1 className="text-2xl font-semibold">Scheduling</h1><p className="text-sm text-zinc-400">Calendar-based shoot planning and call times.</p></div><Card><CardTitle>Add Shoot Day</CardTitle><div className="mt-4"><ResourceForm type="schedules" projects={projects} /></div></Card><div className="grid gap-4 lg:grid-cols-2">{schedules.map((s) => <Card key={s.id}><CardTitle>{s.title}</CardTitle><p className="mt-3 text-sm text-zinc-300">{s.project.title}</p><p className="mt-2 text-gold-soft">{format(s.shootDate, "PPP")} call {format(s.callTime, "p")}</p></Card>)}</div></div>;
}
