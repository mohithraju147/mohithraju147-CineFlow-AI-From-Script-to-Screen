import { ResourceForm } from "@/components/forms/resource-form";
import { Card, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";

export default async function CrewPage() {
  const [projects, crew] = await Promise.all([prisma.project.findMany(), prisma.crew.findMany({ include: { project: true } })]);
  return <Module title="Crew Management" subtitle="Add crew members and assign departments."><Card><CardTitle>Add Crew</CardTitle><div className="mt-4"><ResourceForm type="crew" projects={projects} /></div></Card><Table headers={["Name", "Department", "Position", "Project"]} rows={crew.map((c) => [c.fullName, c.department, c.position, c.project.title])} /></Module>;
}

function Module({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) { return <div className="space-y-6"><div><h1 className="text-2xl font-semibold">{title}</h1><p className="text-sm text-zinc-400">{subtitle}</p></div>{children}</div>; }
function Table({ headers, rows }: { headers: string[]; rows: string[][] }) { return <Card><CardTitle>Crew</CardTitle><div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-zinc-400"><tr>{headers.map((h) => <th key={h} className="border-b py-2 pr-4">{h}</th>)}</tr></thead><tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={`${i}-${j}`} className="border-b py-3 pr-4">{c}</td>)}</tr>)}</tbody></table></div></Card>; }
