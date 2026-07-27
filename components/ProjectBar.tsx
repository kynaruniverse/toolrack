"use client";

import { useEffect, useState } from "react";
import { Project, getProjects, getOrCreateActiveProject, setActiveProjectId, createProject } from "@/lib/projects";
import ReadoutChip from "@/components/ReadoutChip";

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
        aria-expanded={open}
        className="w-full flex items-center justify-between rounded-lg border-2 border-concrete-dark bg-white px-4 py-2.5 shadow-sm"
      >
        <span className="text-left">
          <span className="block text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">
            Saving to
          </span>
          <span className="block text-sm font-semibold text-graphite">{active.name}</span>
        </span>
        <span
          className={`text-steel text-lg transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full rounded-lg border-2 border-concrete-dark bg-white shadow-lg p-2 space-y-1">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => selectProject(p.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm text-left transition ${
                p.id === active.id
                  ? "bg-safety/20 border-2 border-safety-dark font-semibold text-graphite"
                  : "border-2 border-transparent text-neutral-600 hover:bg-concrete"
              }`}
            >
              <span>{p.name}</span>
              <ReadoutChip value={p.entries.length} label={p.entries.length === 1 ? "entry" : "entries"} />
            </button>

          <div className="pt-2 mt-1 border-t border-concrete-dark space-y-2">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="New project name"
              className="w-full rounded-lg border-2 border-concrete-dark px-3 py-1.5 text-sm focus:outline-none focus:border-steel"
            />
            <button
              onClick={addProject}
              className="w-full rounded-lg border-2 border-dashed border-neutral-400 py-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-600"
            >
              + New project
            </button>
          </div>
        </div>
      )}
    </div>
  );
}