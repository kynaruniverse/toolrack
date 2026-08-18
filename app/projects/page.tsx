"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Project, getProjects, createProject, renameProject } from "@/lib/projects";
import ReadoutChip from "@/components/ReadoutChip";
import { hapticTap } from "@/lib/haptics";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newName, setNewName] = useState("");
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const refresh = () => setProjects(getProjects());

  useEffect(() => {
    refresh();
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    createProject(newName.trim());
    setNewName("");
    refresh();
  };

  const handleRename = (id: string) => {
    if (!renameValue.trim()) return;
    renameProject(id, renameValue.trim());
    setRenamingId(null);
    refresh();
  };

  return (
    <main className="min-h-screen bg-kraft-dark">
      <div className="bg-ink px-6 pt-10 pb-8">
        <div className="max-w-md mx-auto">
          <Link href="/" className="font-mono text-safety text-xs uppercase tracking-widest">
            &larr; All departments
          </Link>
          <h1 className="font-display uppercase text-3xl tracking-tight text-kraft mt-3">
            Your Projects
          </h1>
          <p className="font-mono text-xs text-neutral-400 mt-1">
            Saved calculations, grouped by job. Stored on this device only.
          </p>
        </div>
      </div>

      <div className="corkboard max-w-md mx-auto px-6 py-6 space-y-4">
        {/* A blank ticket ready to be filled in and pinned to the board */}
        <form onSubmit={handleCreate} className="bg-kraft/50 rounded-sm border-2 border-dashed border-kraft-line p-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="New project name..."
              className="flex-1 rounded-lg border border-kraft-line bg-kraft px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:border-ink"
            />
            <button
              type="submit"
              onClick={hapticTap}
              className="tactile bg-ink text-kraft font-display uppercase tracking-wider text-xs px-4 py-2 rounded-sm hover:bg-black transition"
            >
              + Create
            </button>
          </div>
        </form>

        {/* Project tickets */}
        <div className="space-y-3">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className={`ticket-edge relative bg-kraft border border-kraft-line rounded-sm p-4 pt-6 ${
                i % 2 === 0 ? "-rotate-[0.4deg]" : "rotate-[0.4deg]"
              }`}
            >
              <span className="absolute left-3 top-1.5 w-1.5 h-1.5 rounded-full bg-ink/70" aria-hidden />
              {renamingId === p.id ? (
                <div className="flex items-center gap-2">
                  <input
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    className="flex-1 border border-kraft-line rounded px-2 py-1 text-sm bg-kraft"
                  />
                  <button
                    onClick={() => {
                      hapticTap();
                      handleRename(p.id);
                    }}
                    className="tactile text-xs font-semibold uppercase text-safety-dark"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <Link href={`/projects/${p.id}`} className="flex-1">
                    <p className="font-display uppercase tracking-wide text-ink mb-1.5">{p.name}</p>
                    <ReadoutChip value={p.entries.length} label={p.entries.length === 1 ? "entry" : "entries"} />
                  </Link>
                  <button
                    onClick={() => {
                      hapticTap();
                      setRenamingId(p.id);
                      setRenameValue(p.name);
                    }}
                    className="tactile font-mono text-[10px] font-semibold text-ink/40 hover:text-ink uppercase tracking-wide"
                  >
                    Rename
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
