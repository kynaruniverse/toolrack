"use client";

import { useEffect, useState } from "react";
import { Project, getProjects, getOrCreateActiveProject, setActiveProjectId, createProject } from "@/lib/projects";
import ReadoutChip from "@/components/ReadoutChip";
import { hapticTap } from "@/lib/haptics";

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
    <div className="max-w-md mx-auto px-6 py-4 relative">
      <button
        onClick={() => {
          hapticTap();
          setOpen((o) => !o);
        }}
        aria-expanded={open}
        className="tactile w-full flex items-center justify-between rounded-sm border border-kraft-line bg-kraft px-4 py-2.5"
      >
        <span className="text-left">
          <span className="block font-mono text-[10px] uppercase tracking-widest text-ink/50">
            Saving to
          </span>
          <span className="block text-sm font-semibold text-ink">{active.name}</span>
        </span>
        <span
          className={`text-ink/50 text-lg transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          &#9662;
        </span>
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full rounded-sm border border-kraft-line bg-kraft shadow-lg p-2 space-y-1">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => selectProject(p.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-sm text-sm text-left transition ${
                p.id === active.id
                  ? "bg-safety/20 border border-safety-dark font-semibold text-ink"
                  : "border border-transparent text-ink/60 hover:bg-kraft-dark"
              }`}
            >
              <span>{p.name}</span>
              <ReadoutChip value={p.entries.length} label={p.entries.length === 1 ? "entry" : "entries"} />
            </button>
          ))}

          <div className="pt-2 mt-1 border-t border-dashed border-kraft-line space-y-2">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="New project name"
              className="w-full rounded-lg border-2 border-kraft-line px-3 py-1.5 text-sm focus:outline-none focus:ring-0 focus:border-ink"
            />
            <button
              onClick={addProject}
              className="w-full rounded-lg border-2 border-dashed border-ink/30 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink/60"
            >
              + New project
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
