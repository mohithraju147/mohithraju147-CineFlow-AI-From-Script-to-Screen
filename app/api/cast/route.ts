import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { castSchema } from "@/lib/validation";

export async function GET() {
  return NextResponse.json(await prisma.cast.findMany({ include: { project: true, character: true } }));
}

export async function POST(request: Request) {
  const parsed = castSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  return NextResponse.json(await prisma.cast.create({ data: parsed.data }), { status: 201 });
}
