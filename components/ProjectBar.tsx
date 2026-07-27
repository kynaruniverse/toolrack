"use client";

import { useEffect, useState } from "react";
import { Project, getProjects, getOrCreateActiveProject, setActiveProjectId, createProject } from "@/lib/projects";

export default function ProjectBar() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [active, setActive] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");

  const refresh = () => {
    setProjects(getProjects());
    setActive(getOrCreateActiveProject());
  };

  useEffect(() => {
    refresh();
  }, []);

  const selectProject = (id: string) => {
    setActiveProjectId(id);
    refresh();
    setOpen(false);
  };

  const addProject = () => {
    if (!newName.trim()) return;
    createProject(newName.trim());
    setNewName("");
    refresh();
    setOpen(false);
  };

  if (!active) return null;

  return (
    <div className="max-w-md mx-auto px-6 -mt-2 mb-4 relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between rounded-lg border-2 border-concrete-dark bg-white px-3 py-2 text-sm"
      >
        <span className="text-neutral-500">
          Saving to: <span className="font-semibold text-graphite">{active.name}</span>
        </span>
        <span className="text-steel">▾</span>
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full rounded-lg border-2 border-concrete-dark bg-white shadow-lg p-2 space-y-1">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => selectProject(p.id)}
              className={`w-full text-left px-2 py-1.5 rounded text-sm ${
                p.id === active.id ? "bg-concrete font-semibold" : ""
              }`}
            >
              {p.name} <span className="text-neutral-400">({p.entries.length})</span>
            </button>
          ))}
          <div className="flex gap-2 pt-2 border-t border-concrete-dark mt-1">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="New project name"
              className="flex-1 rounded border border-concrete-dark px-2 py-1 text-sm"
            />
            <button onClick={addProject} className="px-3 py-1 rounded bg-safety text-graphite text-sm font-semibold">
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}