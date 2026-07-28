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
    <main className="min-h-screen bg-concrete">
      <div className="pegboard px-6 pt-10 pb-8">
        <div className="max-w-md mx-auto">
          <Link href="/" className="text-safety text-xs uppercase tracking-widest">
            ← All departments
          </Link>
          <h1 className="font-display uppercase text-3xl tracking-tight text-white mt-3">
            Your Projects
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Saved calculations, grouped by job. Stored on this device only.
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-4">
        {/* Clean, fully-contained New Project input block */}
        <form onSubmit={handleCreate} className="bg-white rounded-xl border-2 border-dashed border-concrete-dark p-3 shadow-sm">
          <div className="flex gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="New project name..."
              className="flex-1 rounded-lg border border-concrete-dark px-3 py-2 text-sm focus:outline-none focus:border-graphite"
            />
            <button
              type="submit"
              onClick={hapticTap}
              className="tactile bg-graphite text-white font-display uppercase tracking-wider text-xs px-4 py-2 rounded-lg hover:bg-black transition"
            >
              + Create
            </button>
          </div>
        </form>

        {/* Projects List */}
        <div className="space-y-3">
          {projects.map((p) => (
            <div key={p.id} className="rounded-xl bg-white border-2 border-concrete-dark shadow-sm p-4">
              {renamingId === p.id ? (
                <div className="flex items-center gap-2">
                  <input
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    className="flex-1 border border-concrete-dark rounded px-2 py-1 text-sm"
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
                    <p className="font-semibold text-graphite mb-1.5">{p.name}</p>
                    <ReadoutChip value={p.entries.length} label={p.entries.length === 1 ? "entry" : "entries"} />
                  </Link>
                  <button
                    onClick={() => {
                      hapticTap();
                      setRenamingId(p.id);
                      setRenameValue(p.name);
                    }}
                    className="tactile text-xs font-semibold text-neutral-400 hover:text-graphite uppercase tracking-wide"
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
