import { BudgetChart } from "@/components/budget-chart";
import { ResourceForm } from "@/components/forms/resource-form";
import { Card, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { currency } from "@/lib/utils";

export default async function BudgetPage() {
  const [projects, expenses] = await Promise.all([prisma.project.findMany(), prisma.expense.findMany({ include: { project: true }, orderBy: { paidAt: "desc" } })]);
  const allocated = projects.reduce((sum, project) => sum + Number(project.totalBudget), 0);
  const spent = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const data = Object.entries(expenses.reduce<Record<string, number>>((acc, expense) => { acc[expense.category] = (acc[expense.category] ?? 0) + Number(expense.amount); return acc; }, {})).map(([name, value]) => ({ name, value }));
  return <div className="space-y-6"><div><h1 className="text-2xl font-semibold">Budget Tracking</h1><p className="text-sm text-zinc-400">Expenses, budget remaining, and reports.</p></div><div className="grid gap-4 md:grid-cols-3"><Card><CardTitle>Allocated</CardTitle><p className="mt-3 text-2xl">{currency(allocated)}</p></Card><Card><CardTitle>Spent</CardTitle><p className="mt-3 text-2xl">{currency(spent)}</p></Card><Card><CardTitle>Remaining</CardTitle><p className="mt-3 text-2xl">{currency(allocated - spent)}</p></Card></div><Card><CardTitle>Expense Report</CardTitle><BudgetChart data={data} /></Card><Card><CardTitle>Add Expense</CardTitle><div className="mt-4"><ResourceForm type="expenses" projects={projects} /></div></Card></div>;
}
