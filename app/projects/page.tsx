"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Project, getProjects } from "@/lib/projects";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  return (
    <main className="min-h-screen bg-concrete">
      <div className="pegboard px-6 pt-8 pb-10">
        <div className="max-w-md mx-auto">
          <Link href="/" className="inline-block text-xs font-semibold uppercase tracking-wider text-safety mb-4">
            ← All departments
          </Link>
          <h1 className="font-display uppercase text-3xl tracking-tight text-white mb-2">Your Projects</h1>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Saved calculations, grouped by job. Stored on this device only.
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-4 pb-14 space-y-3">
        {projects.length === 0 && (
          <p className="text-neutral-500 text-sm text-center py-8">
            No projects yet — tap &quot;Save to project&quot; on any tool&apos;s result to start one.
          </p>
        )}
        {projects.map((p) => (
          <Link
            key={p.id}
            href={`/projects/${p.id}`}
            className="block rounded-xl bg-white border border-concrete-dark shadow-sm p-4"
          >
            <p className="font-semibold text-graphite">{p.name}</p>
            <p className="text-sm text-neutral-500">
              {p.entries.length} {p.entries.length === 1 ? "entry" : "entries"}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}