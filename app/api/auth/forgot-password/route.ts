import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  const parsed = z.object({ email: z.string().email() }).safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  return NextResponse.json({ message: "Password reset instructions have been queued." });
}
