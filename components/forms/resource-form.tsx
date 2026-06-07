"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function ResourceForm({ type, projects }: { type: "cast" | "crew" | "equipment" | "expenses" | "schedules" | "tasks"; projects: { id: string; title: string }[] }) {
  const router = useRouter();
  async function submit(formData: FormData) {
    const payload = Object.fromEntries(formData.entries());
    const res = await fetch(`/api/${type}`, { method: "POST", body: JSON.stringify(payload) });
    if (res.ok) router.refresh();
  }

  return (
    <form action={submit} className="grid gap-3 md:grid-cols-3">
      <Select name="projectId" required>{projects.map((project) => <option key={project.id} value={project.id}>{project.title}</option>)}</Select>
      {type === "cast" && <><Input name="actorName" placeholder="Actor name" /><Input name="status" placeholder="Status" /><Input name="rate" type="number" placeholder="Rate" /></>}
      {type === "crew" && <><Input name="fullName" placeholder="Full name" /><Input name="department" placeholder="Department" /><Input name="position" placeholder="Position" /></>}
      {type === "equipment" && <><Input name="name" placeholder="Equipment" /><Input name="category" placeholder="Category" /><Select name="status"><option value="AVAILABLE">Available</option><option value="RESERVED">Reserved</option><option value="MAINTENANCE">Maintenance</option></Select><Input name="vendor" placeholder="Vendor" /></>}
      {type === "expenses" && <><Input name="category" placeholder="Category" /><Input name="vendor" placeholder="Vendor" /><Input name="amount" type="number" placeholder="Amount" /></>}
      {type === "schedules" && <><Input name="title" placeholder="Shoot day title" /><Input name="shootDate" type="date" /><Input name="callTime" type="datetime-local" /><Input name="wrapTime" type="datetime-local" /></>}
      {type === "tasks" && <><Input name="title" placeholder="Task title" /><Select name="status"><option value="TODO">Todo</option><option value="IN_PROGRESS">In progress</option><option value="DONE">Done</option></Select><Input name="dueDate" type="date" /></>}
      <Button className="md:w-max">Add</Button>
    </form>
  );
}
