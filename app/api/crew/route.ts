import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { crewSchema } from "@/lib/validation";

export async function GET() {
  return NextResponse.json(await prisma.crew.findMany({ include: { project: true } }));
}

export async function POST(request: Request) {
  const parsed = crewSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  return NextResponse.json(await prisma.crew.create({ data: parsed.data }), { status: 201 });
}
