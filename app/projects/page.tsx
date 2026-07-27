"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Project, getProjects, createProject, renameProject } from "@/lib/projects";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const refresh = () => setProjects(getProjects());

  useEffect(() => {
    refresh();
  }, []);

  const handleCreate = () => {
    if (!newName.trim()) return;
    createProject(newName.trim());
    setNewName("");
    setCreating(false);
    refresh();
  };

  const startRename = (p: Project) => {
    setRenamingId(p.id);
    setRenameValue(p.name);
  };

  const confirmRename = (id: string) => {
    if (renameValue.trim()) renameProject(id, renameValue.trim());
    setRenamingId(null);
    refresh();
  };

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
        {creating ? (
          <div className="rounded-xl bg-white border-2 border-safety-dark shadow-sm p-4 flex gap-2">
            <input
              autoFocus
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              placeholder="Project name, e.g. Smith Patio Job"
              className="flex-1 rounded-lg border-2 border-concrete-dark px-3 py-2 text-base focus:outline-none focus:border-steel"
            />
            <button
              onClick={handleCreate}
              className="rounded-lg bg-safety text-graphite font-semibold text-sm px-4 uppercase tracking-wide"
            >
              Add
            </button>
          </div>
        ) : (
          <button
            onClick={() => setCreating(true)}
            className="w-full rounded-lg border-2 border-dashed border-neutral-400 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-600"
          >
            + New project
          </button>
        )}

        {projects.length === 0 && (
          <p className="text-neutral-500 text-sm text-center py-8">
            No projects yet — tap &quot;Save to project&quot; on any tool&apos;s result to start one, or add one above.
          </p>
        )}

        {projects.map((p) => (
          <div key={p.id} className="docket relative rounded-xl border border-concrete-dark shadow-sm p-4 mt-3">
            <div className="docket-clip docket-clip-sm" />
            {renamingId === p.id ? (
              <div className="flex gap-2">
                <input
                  autoFocus
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && confirmRename(p.id)}
                  className="flex-1 rounded-lg border-2 border-concrete-dark px-3 py-1.5 text-sm focus:outline-none focus:border-steel"
                />
                <button
                  onClick={() => confirmRename(p.id)}
                  className="rounded-lg bg-safety text-graphite font-semibold text-xs px-3 uppercase tracking-wide"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-2">
                <Link href={`/projects/${p.id}`} className="flex-1">
                  <p className="font-semibold text-graphite mb-1">{p.name}</p>
                  <span className="inline-flex items-baseline gap-1 rounded bg-graphite px-2 py-0.5">
                    <span className="readout-digits text-sm font-semibold">{p.entries.length}</span>
                    <span className="text-[10px] uppercase tracking-wide text-neutral-400">
                      {p.entries.length === 1 ? "entry" : "entries"}
                    </span>
                  </span>
                </Link>
                <button
                  onClick={() => startRename(p)}
                  className="text-xs font-semibold uppercase tracking-wide text-steel shrink-0"
                >
                  Rename
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}