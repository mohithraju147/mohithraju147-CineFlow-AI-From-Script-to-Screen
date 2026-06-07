import { ResourceForm } from "@/components/forms/resource-form";
import { Card, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";

export default async function PostProductionPage() {
  const [projects, tasks] = await Promise.all([prisma.project.findMany(), prisma.task.findMany({ include: { project: true }, orderBy: { dueDate: "asc" } })]);
  return <div className="space-y-6"><div><h1 className="text-2xl font-semibold">Post Production Tracking</h1><p className="text-sm text-zinc-400">Editorial, VFX, sound, color, and delivery tasks.</p></div><Card><CardTitle>Add Task</CardTitle><div className="mt-4"><ResourceForm type="tasks" projects={projects} /></div></Card><div className="grid gap-4 lg:grid-cols-3">{["TODO", "IN_PROGRESS", "DONE"].map((status) => <Card key={status}><CardTitle>{status.replace("_", " ")}</CardTitle><div className="mt-4 space-y-2">{tasks.filter((task) => task.status === status).map((task) => <div key={task.id} className="rounded bg-muted p-3 text-sm"><div>{task.title}</div><div className="mt-1 text-xs text-zinc-400">{task.project.title}</div></div>)}</div></Card>)}</div></div>;
}
