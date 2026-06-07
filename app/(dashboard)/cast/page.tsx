import { ResourceForm } from "@/components/forms/resource-form";
import { Card, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";

export default async function CastPage() {
  const [projects, cast] = await Promise.all([prisma.project.findMany(), prisma.cast.findMany({ include: { project: true, character: true } })]);
  return <Module title="Cast Management" subtitle="Add, edit, and track actor assignments."><Card><CardTitle>Add Actor</CardTitle><div className="mt-4"><ResourceForm type="cast" projects={projects} /></div></Card><Table headers={["Actor", "Project", "Character", "Status"]} rows={cast.map((c) => [c.actorName, c.project.title, c.character?.name ?? "Unassigned", c.status])} /></Module>;
}

function Module({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) { return <div className="space-y-6"><div><h1 className="text-2xl font-semibold">{title}</h1><p className="text-sm text-zinc-400">{subtitle}</p></div>{children}</div>; }
function Table({ headers, rows }: { headers: string[]; rows: string[][] }) { return <Card><CardTitle>Roster</CardTitle><div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-zinc-400"><tr>{headers.map((h) => <th key={h} className="border-b py-2 pr-4">{h}</th>)}</tr></thead><tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={`${i}-${j}`} className="border-b py-3 pr-4">{c}</td>)}</tr>)}</tbody></table></div></Card>; }
