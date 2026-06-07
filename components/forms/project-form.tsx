"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

export function ProjectForm() {
  const router = useRouter();
  const { register, handleSubmit, formState, reset } = useForm<z.input<typeof projectSchema>, unknown, z.output<typeof projectSchema>>({
    resolver: zodResolver(projectSchema)
  });

  async function onSubmit(values: z.output<typeof projectSchema>) {
    const res = await fetch("/api/projects", { method: "POST", body: JSON.stringify(values) });
    if (res.ok) {
      reset();
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 md:grid-cols-2">
      <Input placeholder="Project title" {...register("title")} />
      <Input placeholder="Genre" {...register("genre")} />
      <Input placeholder="Total budget" type="number" {...register("totalBudget")} />
      <Textarea placeholder="Logline" className="md:col-span-2" {...register("logline")} />
      <Button disabled={formState.isSubmitting} className="md:w-max">Create Project</Button>
    </form>
  );
}
