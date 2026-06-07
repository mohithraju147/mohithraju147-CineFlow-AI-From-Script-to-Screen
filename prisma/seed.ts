import { PrismaClient, Role, EquipmentStatus, ProjectStatus, TaskStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.notification.deleteMany();
  await prisma.task.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.budget.deleteMany();
  await prisma.equipment.deleteMany();
  await prisma.cast.deleteMany();
  await prisma.crew.deleteMany();
  await prisma.scene.deleteMany();
  await prisma.location.deleteMany();
  await prisma.character.deleteMany();
  await prisma.script.deleteMany();
  await prisma.project.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("password123", 10);

  const producer = await prisma.user.upsert({
    where: { email: "producer@cineflow.ai" },
    update: {},
    create: { name: "Ava Stone", email: "producer@cineflow.ai", role: Role.PRODUCER, passwordHash }
  });

  const director = await prisma.user.upsert({
    where: { email: "director@cineflow.ai" },
    update: {},
    create: { name: "Marcus Lee", email: "director@cineflow.ai", role: Role.DIRECTOR, passwordHash }
  });

  const project = await prisma.project.create({
    data: {
      title: "Neon Horizon",
      logline: "A pilot uncovers a signal that could reset humanity's future.",
      genre: "Sci-Fi Thriller",
      status: ProjectStatus.PRODUCTION,
      startDate: new Date("2026-07-01"),
      endDate: new Date("2026-09-15"),
      totalBudget: 2400000,
      ownerId: producer.id,
      scripts: {
        create: {
          title: "Neon Horizon Draft",
          version: "2.1",
          content: "INT. OBSERVATORY - NIGHT\nMIRA decodes a gold pulse across the sky."
        }
      },
      locations: {
        create: [
          { name: "Desert Observatory", address: "Lancaster, CA", notes: "Night shoots, generator required" },
          { name: "Hangar Stage", address: "Burbank, CA", notes: "Controlled cockpit interiors" }
        ]
      },
      characters: {
        create: [
          { name: "Mira Vale", description: "A disciplined test pilot hiding a family secret." },
          { name: "Jon Ives", description: "A mission controller with shifting loyalties." }
        ]
      },
      crew: {
        create: [
          { fullName: "Marcus Lee", department: "Direction", position: "Director", userId: director.id },
          { fullName: "Priya Nair", department: "Camera", position: "Director of Photography" }
        ]
      },
      equipment: {
        create: [
          { name: "ARRI Alexa 35 Package", category: "Camera", status: EquipmentStatus.RESERVED, vendor: "Gold Coast Rentals" },
          { name: "Aputure 1200D Kit", category: "Lighting", status: EquipmentStatus.AVAILABLE, vendor: "Stagehouse" },
          { name: "Drone Unit", category: "Aerial", status: EquipmentStatus.MAINTENANCE, vendor: "SkyRig" }
        ]
      },
      budgets: {
        create: [
          { category: "Cast", allocated: 650000 },
          { category: "Crew", allocated: 520000 },
          { category: "Locations", allocated: 280000 },
          { category: "Post", allocated: 410000 }
        ]
      },
      expenses: {
        create: [
          { category: "Crew", vendor: "Payroll Week 1", amount: 86000 },
          { category: "Locations", vendor: "Observatory Permit", amount: 42000 },
          { category: "Equipment", vendor: "Gold Coast Rentals", amount: 78000 }
        ]
      },
      tasks: {
        create: [
          { title: "Lock night shoot permits", status: TaskStatus.IN_PROGRESS, dueDate: new Date("2026-06-20") },
          { title: "Approve VFX turnover template", status: TaskStatus.TODO, dueDate: new Date("2026-06-24") },
          { title: "Finalize cockpit set dressing", status: TaskStatus.DONE, dueDate: new Date("2026-06-10") }
        ]
      },
      schedules: {
        create: [
          {
            title: "Shoot Day 01 - Observatory",
            shootDate: new Date("2026-07-01"),
            callTime: new Date("2026-07-01T13:00:00Z"),
            wrapTime: new Date("2026-07-02T02:00:00Z")
          }
        ]
      }
    }
  });

  const mira = await prisma.character.findFirst({ where: { projectId: project.id, name: "Mira Vale" } });
  if (mira) {
    await prisma.cast.create({
      data: { actorName: "Elena Cruz", status: "Attached", rate: 125000, projectId: project.id, characterId: mira.id }
    });
  }

  await prisma.scene.createMany({
    data: [
      { number: 1, heading: "INT. OBSERVATORY - NIGHT", summary: "Mira detects the impossible signal.", timeOfDay: "Night", projectId: project.id },
      { number: 2, heading: "EXT. DESERT ROAD - DAWN", summary: "Jon arrives with classified orders.", timeOfDay: "Dawn", projectId: project.id }
    ]
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
