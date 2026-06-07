import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getSupabaseAdmin } from "@/lib/supabase";
import { scriptSchema } from "@/lib/validation";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await prisma.script.findMany({ include: { project: true }, orderBy: { createdAt: "desc" } }));
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file");
  let content = String(formData.get("content") ?? "");
  let fileUrl = String(formData.get("fileUrl") ?? "");

  if (file instanceof File) {
    content = await file.text();
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const bucket = process.env.SUPABASE_BUCKET ?? "scripts";
      const path = `${Date.now()}-${file.name}`;
      const uploaded = await supabase.storage.from(bucket).upload(path, file);
      if (!uploaded.error) {
        fileUrl = supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
      }
    }
  }

  const parsed = scriptSchema.safeParse({
    projectId: formData.get("projectId"),
    title: formData.get("title"),
    version: formData.get("version") ?? "1.0",
    content,
    fileUrl
  });
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const script = await prisma.script.create({ data: { ...parsed.data, fileUrl: parsed.data.fileUrl || undefined } });
  return NextResponse.json(script, { status: 201 });
}
