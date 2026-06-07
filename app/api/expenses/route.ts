import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { expenseSchema } from "@/lib/validation";

export async function GET() {
  return NextResponse.json(await prisma.expense.findMany({ include: { project: true }, orderBy: { paidAt: "desc" } }));
}

export async function POST(request: Request) {
  const parsed = expenseSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  return NextResponse.json(await prisma.expense.create({ data: parsed.data }), { status: 201 });
}
