import { RegisterForm } from "@/components/forms/register-form";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#2a2112,transparent_35%),#050505] p-4">
      <RegisterForm />
    </main>
  );
}
