import { ResourceForm } from "@/components/forms/resource-form";
import { Card, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";

export default async function EquipmentPage() {
  const [projects, equipment] = await Promise.all([prisma.project.findMany(), prisma.equipment.findMany({ include: { project: true } })]);
  const counts = equipment.reduce<Record<string, number>>((acc, item) => { acc[item.status] = (acc[item.status] ?? 0) + 1; return acc; }, {});
  return <div className="space-y-6"><div><h1 className="text-2xl font-semibold">Equipment Management</h1><p className="text-sm text-zinc-400">Track available, reserved, and maintenance inventory.</p></div><div className="grid gap-4 md:grid-cols-3">{["AVAILABLE", "RESERVED", "MAINTENANCE"].map((s) => <Card key={s}><CardTitle>{s}</CardTitle><p className="mt-3 text-2xl">{counts[s] ?? 0}</p></Card>)}</div><Card><CardTitle>Add Equipment</CardTitle><div className="mt-4"><ResourceForm type="equipment" projects={projects} /></div></Card><Table headers={["Name", "Category", "Status", "Vendor", "Project"]} rows={equipment.map((e) => [e.name, e.category, e.status, e.vendor ?? "", e.project.title])} /></div>;
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) { return <Card><CardTitle>Inventory</CardTitle><div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-zinc-400"><tr>{headers.map((h) => <th key={h} className="border-b py-2 pr-4">{h}</th>)}</tr></thead><tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={`${i}-${j}`} className="border-b py-3 pr-4">{c}</td>)}</tr>)}</tbody></table></div></Card>; }
