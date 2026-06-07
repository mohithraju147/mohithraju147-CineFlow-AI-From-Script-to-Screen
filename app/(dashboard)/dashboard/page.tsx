import { Card, CardTitle } from "@/components/ui/card";
import { BudgetChart } from "@/components/budget-chart";
import { prisma } from "@/lib/db";
import { currency, percent } from "@/lib/utils";

export default async function DashboardPage() {
  const [projects, expenses, tasks, schedules] = await Promise.all([
    prisma.project.findMany({ include: { expenses: true, tasks: true } }),
    prisma.expense.findMany(),
    prisma.task.findMany({ take: 5, orderBy: { dueDate: "asc" }, include: { project: true } }),
    prisma.schedule.findMany({ take: 5, orderBy: { shootDate: "asc" }, include: { project: true } })
  ]);
  const totalBudget = projects.reduce((sum, project) => sum + Number(project.totalBudget), 0);
  const totalSpent = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const progress = tasks.length ? (tasks.filter((task) => task.status === "DONE").length / tasks.length) * 100 : 0;
  const chart = expenses.reduce<Record<string, number>>((acc, expense) => {
    acc[expense.category] = (acc[expense.category] ?? 0) + Number(expense.amount);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-zinc-400">Active productions, budgets, schedules, and tasks.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Metric label="Active Projects" value={projects.length} />
        <Metric label="Budget Usage" value={`${currency(totalSpent)} / ${currency(totalBudget)}`} />
        <Metric label="Production Progress" value={percent(progress)} />
        <Metric label="Upcoming Shoot Days" value={schedules.length} />
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardTitle>Budget Usage</CardTitle>
          <BudgetChart data={Object.entries(chart).map(([name, value]) => ({ name, value }))} />
        </Card>
        <Card>
          <CardTitle>Tasks</CardTitle>
          <div className="mt-4 space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between rounded-md bg-muted p-3 text-sm">
                <span>{task.title}</span>
                <span className="text-gold-soft">{task.status.replace("_", " ")}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <Card>
      <div className="text-sm text-zinc-400">{label}</div>
      <div className="mt-3 text-2xl font-semibold text-gold-soft">{value}</div>
    </Card>
  );
}
