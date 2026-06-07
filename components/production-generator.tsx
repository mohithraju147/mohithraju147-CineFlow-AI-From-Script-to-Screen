"use client";

import { useState } from "react";
import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

type Result = {
  scenes: { number: number; heading: string; summary: string; timeOfDay: string }[];
  characters: { name: string; description: string }[];
  locations: { name: string; address: string; notes: string }[];
  props: string[];
};

export function ProductionGenerator({ projects }: { projects: { id: string; title: string }[] }) {
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(formData: FormData) {
    setLoading(true);
    const res = await fetch("/api/ai-breakdown", {
      method: "POST",
      body: JSON.stringify({ projectId: formData.get("projectId"), script: formData.get("script") })
    });
    setResult(await res.json());
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>Upload Script</CardTitle>
        <form action={submit} className="mt-4 grid gap-3">
          <Select name="projectId">{projects.map((project) => <option key={project.id} value={project.id}>{project.title}</option>)}</Select>
          <Textarea name="script" placeholder="Paste script pages here for mock AI analysis" required />
          <Button className="w-max" disabled={loading}><Wand2 className="h-4 w-4" />{loading ? "Generating..." : "Generate Breakdown"}</Button>
        </form>
      </Card>
      {result ? (
        <div className="grid gap-4 xl:grid-cols-2">
          <Card><CardTitle>Scene Breakdown</CardTitle><Table rows={result.scenes.map((s) => [String(s.number), s.heading, s.timeOfDay, s.summary])} headers={["#", "Heading", "Time", "Summary"]} /></Card>
          <Card><CardTitle>Character List</CardTitle><Table rows={result.characters.map((c) => [c.name, c.description])} headers={["Character", "Description"]} /></Card>
          <Card><CardTitle>Location List</CardTitle><Table rows={result.locations.map((l) => [l.name, l.address, l.notes])} headers={["Location", "Address", "Notes"]} /></Card>
          <Card><CardTitle>Props List</CardTitle><div className="mt-4 flex flex-wrap gap-2">{result.props.map((prop) => <span key={prop} className="rounded border px-3 py-1 text-sm text-gold-soft">{prop}</span>)}</div></Card>
        </div>
      ) : null}
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="text-zinc-400"><tr>{headers.map((h) => <th key={h} className="border-b py-2 pr-4">{h}</th>)}</tr></thead>
        <tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, i) => <td key={i} className="border-b py-3 pr-4 align-top">{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
