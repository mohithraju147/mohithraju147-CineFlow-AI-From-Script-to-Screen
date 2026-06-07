import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { scheduleSchema } from "@/lib/validation";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const parsed = scheduleSchema.partial().safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const { id } = await params;
  return NextResponse.json(await prisma.schedule.update({ where: { id }, data: parsed.data }));
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.schedule.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
