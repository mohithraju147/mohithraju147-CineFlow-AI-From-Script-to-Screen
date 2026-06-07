import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { canManage } from "@/lib/permissions";
import { projectSchema } from "@/lib/validation";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const projects = await prisma.project.findMany({
    orderBy: { updatedAt: "desc" },
    include: { owner: true, expenses: true, tasks: true, schedules: true }
  });
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !canManage(session.user.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const parsed = projectSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const project = await prisma.project.create({
    data: { ...parsed.data, ownerId: session.user.id },
    include: { owner: true }
  });
  return NextResponse.json(project, { status: 201 });
}
