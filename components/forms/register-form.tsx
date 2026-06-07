"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { register, handleSubmit, formState } = useForm<z.input<typeof registerSchema>, unknown, z.output<typeof registerSchema>>({
    resolver: zodResolver(registerSchema)
  });

  async function onSubmit(values: z.output<typeof registerSchema>) {
    setError("");
    const res = await fetch("/api/auth/register", { method: "POST", body: JSON.stringify(values) });
    if (!res.ok) return setError("Could not create account");
    router.push("/login");
  }

  return (
    <Card className="w-full max-w-md">
      <CardTitle className="text-xl">Create account</CardTitle>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <Input placeholder="Name" {...register("name")} />
        <Input placeholder="Email" type="email" {...register("email")} />
        <Input placeholder="Password" type="password" {...register("password")} />
        <Select {...register("role")}>
          <option value="PRODUCER">Producer</option>
          <option value="DIRECTOR">Director</option>
          <option value="EDITOR">Editor</option>
          <option value="ACTOR">Actor</option>
          <option value="CREW_MEMBER">Crew Member</option>
        </Select>
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        <Button className="w-full" disabled={formState.isSubmitting}>
          Register
        </Button>
      </form>
      <Link href="/login" className="mt-4 block text-sm text-zinc-400 hover:text-gold">
        Back to login
      </Link>
    </Card>
  );
}
