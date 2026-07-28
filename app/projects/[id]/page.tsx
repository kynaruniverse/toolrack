"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Project, getProject, deleteEntry, renameProject, summarizeEntry } from "@/lib/projects";
import { getToolBySlug } from "@/lib/racks";
import { hapticTap } from "@/lib/haptics";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState("");

  const refresh = useCallback(() => {
    setProject(getProject(id) ?? null);
    setLoaded(true);
  }, [id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const startRename = () => {
    if (!project) return;
    setRenameValue(project.name);
    setRenaming(true);
  };

  const confirmRename = () => {
    if (renameValue.trim()) renameProject(id, renameValue.trim());
    setRenaming(false);
    refresh();
  };

  if (!loaded) return null;
  if (!project) {
    return <p className="p-6 text-center text-neutral-500">Project not found.</p>;
  }

  return (
    <main className="min-h-screen bg-concrete">
      <div className="pegboard px-6 pt-8 pb-10">
        <div className="max-w-md mx-auto">
          <Link href="/projects" className="inline-block text-xs font-semibold uppercase tracking-wider text-safety mb-4">
            ← Your projects
          </Link>

          {renaming ? (
            <div className="flex gap-2 mb-2">
              <input
                autoFocus
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && confirmRename()}
                className="flex-1 rounded-lg border-2 border-concrete-dark px-3 py-2 text-base bg-white focus:outline-none focus:border-steel"
              />
              <button
                onClick={() => {
                  hapticTap();
                  confirmRename();
                }}
                className="tactile rounded-lg bg-safety text-graphite font-semibold text-sm px-4 uppercase tracking-wide"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between mb-2">
              <h1 className="font-display uppercase text-3xl tracking-tight text-white">{project.name}</h1>
              <button
                onClick={() => {
                  hapticTap();
                  startRename();
                }}
                className="tactile text-xs font-semibold uppercase tracking-wider text-safety shrink-0 ml-3"
              >
                Rename
              </button>
            </div>
          )}

          <p className="text-neutral-300 text-sm leading-relaxed">
            {project.entries.length} saved {project.entries.length === 1 ? "entry" : "entries"}
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-4 pb-14 space-y-3">
        {project.entries.length === 0 && (
          <p className="text-neutral-500 text-sm text-center py-8">
            No entries yet — save a result from any tool to add one here.
          </p>
        )}
        {project.entries.slice().reverse().map((entry) => {
          const tool = getToolBySlug(entry.toolSlug);
          return (
            <div key={entry.id} className="rounded-xl bg-white border border-concrete-dark shadow-sm p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-graphite">{entry.label}</p>
                <button
                  onClick={() => {
                    hapticTap();
                    deleteEntry(project.id, entry.id);
                    refresh();
                  }}
                  className="tactile text-xs font-semibold uppercase tracking-wide text-steel"
                >
                  Remove
                </button>
              </div>
              <p className="text-xs text-neutral-400 uppercase tracking-wide mb-2">
                <span className="inline-block rounded-full bg-concrete px-2 py-0.5 mr-1.5 text-graphite">
                  {capitalize(entry.toolType)}
                </span>
                {summarizeEntry(entry) || (tool?.name ?? entry.toolSlug)}
              </p>
              {tool && (
                <Link
                  href={`/${tool.slug}?projectId=${project.id}&entryId=${entry.id}`}
                  className="text-sm font-semibold text-steel"
                >
                  Reopen in calculator →
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}