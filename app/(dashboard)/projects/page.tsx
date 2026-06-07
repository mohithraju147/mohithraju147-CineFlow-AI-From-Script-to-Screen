import Link from "next/link";
import { ProjectForm } from "@/components/forms/project-form";
import { Card, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { currency } from "@/lib/utils";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { updatedAt: "desc" }, include: { owner: true, expenses: true } });
  return (
    <div className="space-y-6">
      <Header title="Projects" subtitle="Create, edit, delete, and inspect production projects." />
      <Card><CardTitle>Create Project</CardTitle><div className="mt-4"><ProjectForm /></div></Card>
      <div className="grid gap-4 lg:grid-cols-2">
        {projects.map((project) => {
          const spent = project.expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
          return (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card className="h-full hover:border-gold">
                <CardTitle>{project.title}</CardTitle>
                <p className="mt-2 text-sm text-zinc-400">{project.logline}</p>
                <div className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
                  <span>{project.genre}</span><span className="text-gold-soft">{project.status.replace("_", " ")}</span><span>{currency(spent)} spent</span>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return <div><h1 className="text-2xl font-semibold">{title}</h1><p className="text-sm text-zinc-400">{subtitle}</p></div>;
}
