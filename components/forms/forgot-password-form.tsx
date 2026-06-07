"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function ForgotPasswordForm() {
  const [message, setMessage] = useState("");
  async function submit(formData: FormData) {
    const email = String(formData.get("email"));
    const res = await fetch("/api/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) });
    setMessage(res.ok ? "Reset instructions queued." : "Enter a valid email.");
  }

  return (
    <Card className="w-full max-w-md">
      <CardTitle className="text-xl">Forgot password</CardTitle>
      <form action={submit} className="mt-6 space-y-4">
        <Input name="email" placeholder="Email" type="email" />
        <Button className="w-full">Send reset link</Button>
      </form>
      {message ? <p className="mt-4 text-sm text-gold-soft">{message}</p> : null}
      <Link href="/login" className="mt-4 block text-sm text-zinc-400 hover:text-gold">
        Back to login
      </Link>
    </Card>
  );
}
