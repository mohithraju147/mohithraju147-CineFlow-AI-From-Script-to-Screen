import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["PRODUCER", "DIRECTOR", "EDITOR", "ACTOR", "CREW_MEMBER"]).default("PRODUCER")
});

export const projectSchema = z.object({
  title: z.string().min(2),
  logline: z.string().min(5),
  genre: z.string().min(2),
  status: z.enum(["DEVELOPMENT", "PRE_PRODUCTION", "PRODUCTION", "POST_PRODUCTION", "COMPLETED", "ARCHIVED"]).optional(),
  totalBudget: z.coerce.number().nonnegative().default(0)
});

export const scriptSchema = z.object({
  projectId: z.string().min(1),
  title: z.string().min(2),
  version: z.string().default("1.0"),
  content: z.string().min(5),
  fileUrl: z.string().url().optional().or(z.literal(""))
});

export const castSchema = z.object({
  projectId: z.string().min(1),
  actorName: z.string().min(2),
  status: z.string().default("Negotiating"),
  rate: z.coerce.number().nonnegative().default(0),
  characterId: z.string().optional()
});

export const crewSchema = z.object({
  projectId: z.string().min(1),
  fullName: z.string().min(2),
  department: z.string().min(2),
  position: z.string().min(2)
});

export const equipmentSchema = z.object({
  projectId: z.string().min(1),
  name: z.string().min(2),
  category: z.string().min(2),
  status: z.enum(["AVAILABLE", "RESERVED", "MAINTENANCE"]),
  vendor: z.string().optional()
});

export const expenseSchema = z.object({
  projectId: z.string().min(1),
  category: z.string().min(2),
  vendor: z.string().min(2),
  amount: z.coerce.number().positive()
});

export const scheduleSchema = z.object({
  projectId: z.string().min(1),
  title: z.string().min(2),
  shootDate: z.coerce.date(),
  callTime: z.coerce.date(),
  wrapTime: z.coerce.date().optional()
});

export const taskSchema = z.object({
  projectId: z.string().min(1),
  title: z.string().min(2),
  description: z.string().optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).default("TODO"),
  dueDate: z.coerce.date().optional()
});
