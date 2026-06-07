import { ScriptUploadForm } from "@/components/forms/script-upload-form";
import { Card, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";

export default async function ScriptsPage() {
  const [projects, scripts] = await Promise.all([prisma.project.findMany(), prisma.script.findMany({ include: { project: true }, orderBy: { createdAt: "desc" } })]);
  return (
    <div className="space-y-6">
      <Header title="Scripts" subtitle="Upload, store, and view script versions." />
      <Card><CardTitle>Upload Script</CardTitle><div className="mt-4"><ScriptUploadForm projects={projects} /></div></Card>
      <Card><CardTitle>Stored Scripts</CardTitle><Table headers={["Title", "Project", "Version"]} rows={scripts.map((s) => [s.title, s.project.title, s.version])} /></Card>
    </div>
  );
}

function Header({ title, subtitle }: { title: string; subtitle: string }) { return <div><h1 className="text-2xl font-semibold">{title}</h1><p className="text-sm text-zinc-400">{subtitle}</p></div>; }
function Table({ headers, rows }: { headers: string[]; rows: string[][] }) { return <div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-zinc-400"><tr>{headers.map((h) => <th key={h} className="border-b py-2 pr-4">{h}</th>)}</tr></thead><tbody>{rows.map((r, i) => <tr key={i}>{r.map((c) => <td key={c} className="border-b py-3 pr-4">{c}</td>)}</tr>)}</tbody></table></div>; }
