import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { equipmentSchema } from "@/lib/validation";

export async function GET() {
  return NextResponse.json(await prisma.equipment.findMany({ include: { project: true } }));
}

export async function POST(request: Request) {
  const parsed = equipmentSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  return NextResponse.json(await prisma.equipment.create({ data: parsed.data }), { status: 201 });
}
