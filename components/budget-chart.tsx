"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function BudgetChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} />
        <YAxis stroke="#a1a1aa" fontSize={12} />
        <Tooltip contentStyle={{ background: "#111", border: "1px solid #2f2f2f", color: "#fff" }} />
        <Bar dataKey="value" fill="#d6a84f" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
