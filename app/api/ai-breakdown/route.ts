import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = z.object({ projectId: z.string(), script: z.string().min(5) }).safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const scenes = [
    { number: 1, heading: "INT. APARTMENT - NIGHT", summary: "The lead discovers a hidden production file.", timeOfDay: "Night" },
    { number: 2, heading: "EXT. CITY ROOFTOP - DAWN", summary: "The team plans the final shoot under first light.", timeOfDay: "Dawn" },
    { number: 3, heading: "INT. SOUND STAGE - DAY", summary: "A practical stunt shifts the schedule.", timeOfDay: "Day" }
  ];
  const characters = [
    { name: "Alex Vale", description: "Resourceful filmmaker carrying the film's emotional arc." },
    { name: "Riya Cole", description: "Production manager who keeps the shoot moving." },
    { name: "Dante Ross", description: "Lead actor whose availability drives the schedule." }
  ];
  const locations = [
    { name: "Apartment Set", address: "Stage 4", notes: "Controlled interior with night lighting." },
    { name: "City Rooftop", address: "Downtown backlot", notes: "Requires safety officer and dawn call." }
  ];
  const props = ["Encrypted hard drive", "Vintage camera", "Marked script pages", "Gold production binder"];

  await prisma.$transaction([
    prisma.scene.createMany({ data: scenes.map((scene) => ({ ...scene, projectId: parsed.data.projectId })) }),
    prisma.character.createMany({ data: characters.map((character) => ({ ...character, projectId: parsed.data.projectId })) }),
    prisma.location.createMany({ data: locations.map((location) => ({ ...location, projectId: parsed.data.projectId })) })
  ]);

  return NextResponse.json({ scenes, characters, locations, props });
}
