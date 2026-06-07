import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { scheduleSchema } from "@/lib/validation";

export async function GET() {
  return NextResponse.json(await prisma.schedule.findMany({ include: { project: true, scene: true }, orderBy: { shootDate: "asc" } }));
}

export async function POST(request: Request) {
  const parsed = scheduleSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  return NextResponse.json(await prisma.schedule.create({ data: parsed.data }), { status: 201 });
}
