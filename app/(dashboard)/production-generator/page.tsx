import { ProductionGenerator } from "@/components/production-generator";
import { prisma } from "@/lib/db";

export default async function ProductionGeneratorPage() {
  const projects = await prisma.project.findMany({ select: { id: true, title: true } });
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-semibold">Production Generator</h1><p className="text-sm text-zinc-400">Upload Script to generate scene, character, prop, and location breakdowns.</p></div>
      <ProductionGenerator projects={projects} />
    </div>
  );
}
