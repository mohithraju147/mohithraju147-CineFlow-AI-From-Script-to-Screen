import { notFound } from "next/navigation";
import { Card, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { currency } from "@/lib/utils";

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: { scripts: true, scenes: true, characters: true, locations: true, cast: true, crew: true, equipment: true, budgets: true, expenses: true, schedules: true, tasks: true }
  });
  if (!project) notFound();
  const spent = project.expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-semibold">{project.title}</h1><p className="text-sm text-zinc-400">{project.logline}</p></div>
      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardTitle>Status</CardTitle><p className="mt-3">{project.status.replace("_", " ")}</p></Card>
        <Card><CardTitle>Budget</CardTitle><p className="mt-3">{currency(project.totalBudget.toString())}</p></Card>
        <Card><CardTitle>Spent</CardTitle><p className="mt-3">{currency(spent)}</p></Card>
        <Card><CardTitle>Scenes</CardTitle><p className="mt-3">{project.scenes.length}</p></Card>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <List title="Scripts" items={project.scripts.map((item) => `${item.title} v${item.version}`)} />
        <List title="Characters" items={project.characters.map((item) => item.name)} />
        <List title="Locations" items={project.locations.map((item) => item.name)} />
        <List title="Post Production Tasks" items={project.tasks.map((item) => `${item.title} - ${item.status}`)} />
      </div>
    </div>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return <Card><CardTitle>{title}</CardTitle><div className="mt-4 space-y-2">{items.map((item) => <div key={item} className="rounded bg-muted p-3 text-sm">{item}</div>)}</div></Card>;
}
