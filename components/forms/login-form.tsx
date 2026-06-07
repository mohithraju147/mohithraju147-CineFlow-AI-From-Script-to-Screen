"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const schema = z.object({ email: z.string().email(), password: z.string().min(8) });

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { register, handleSubmit, formState } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  async function onSubmit(values: z.infer<typeof schema>) {
    setError("");
    const result = await signIn("credentials", { ...values, redirect: false });
    if (result?.error) return setError("Invalid email or password");
    router.push("/dashboard");
  }

  return (
    <Card className="w-full max-w-md">
      <CardTitle className="text-xl">Sign in</CardTitle>
      <p className="mt-2 text-sm text-zinc-400">Use `producer@cineflow.ai` and `password123` after seeding.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <Input placeholder="Email" type="email" {...register("email")} />
        <Input placeholder="Password" type="password" {...register("password")} />
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        <Button className="w-full" disabled={formState.isSubmitting}>
          Login
        </Button>
      </form>
      <div className="mt-4 flex justify-between text-sm text-zinc-400">
        <Link href="/register" className="hover:text-gold">
          Register
        </Link>
        <Link href="/forgot-password" className="hover:text-gold">
          Forgot password
        </Link>
      </div>
    </Card>
  );
}
