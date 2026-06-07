import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { canDelete, canManage } from "@/lib/permissions";
import { projectSchema } from "@/lib/validation";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      scripts: true,
      scenes: true,
      characters: true,
      locations: true,
      cast: { include: { character: true } },
      crew: true,
      equipment: true,
      budgets: true,
      expenses: true,
      schedules: true,
      tasks: true
    }
  });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || !canManage(session.user.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const parsed = projectSchema.partial().safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const { id } = await params;
  const project = await prisma.project.update({ where: { id }, data: parsed.data });
  return NextResponse.json(project);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || !canDelete(session.user.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await params;
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
