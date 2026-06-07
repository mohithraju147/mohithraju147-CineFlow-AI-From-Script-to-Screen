import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { taskSchema } from "@/lib/validation";

export async function GET() {
  return NextResponse.json(await prisma.task.findMany({ include: { project: true, assignee: true }, orderBy: { dueDate: "asc" } }));
}

export async function POST(request: Request) {
  const parsed = taskSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  return NextResponse.json(await prisma.task.create({ data: parsed.data }), { status: 201 });
}
