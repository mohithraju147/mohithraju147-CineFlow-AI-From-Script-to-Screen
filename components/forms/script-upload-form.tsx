"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function ScriptUploadForm({ projects }: { projects: { id: string; title: string }[] }) {
  const router = useRouter();
  async function submit(formData: FormData) {
    const res = await fetch("/api/scripts", { method: "POST", body: formData });
    if (res.ok) router.refresh();
  }
  return (
    <form action={submit} className="grid gap-3 md:grid-cols-2">
      <Select name="projectId" required>
        {projects.map((project) => <option key={project.id} value={project.id}>{project.title}</option>)}
      </Select>
      <Input name="title" placeholder="Script title" required />
      <Input name="version" placeholder="Version" defaultValue="1.0" />
      <Input name="file" type="file" accept=".txt,.fdx,.pdf" />
      <Textarea name="content" placeholder="Paste script text if no file is uploaded" className="md:col-span-2" />
      <Button className="md:w-max">Upload Script</Button>
    </form>
  );
}
