"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Project, getProject, deleteEntry } from "@/lib/projects";
import { getToolBySlug } from "@/lib/racks";

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(() => {
    setProject(getProject(id) ?? null);
    setLoaded(true);
  }, [id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

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
          <h1 className="font-display uppercase text-3xl tracking-tight text-white mb-2">{project.name}</h1>
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
                    deleteEntry(project.id, entry.id);
                    refresh();
                  }}
                  className="text-xs font-semibold uppercase tracking-wide text-steel"
                >
                  Remove
                </button>
              </div>
              <p className="text-xs text-neutral-400 uppercase tracking-wide mb-2">
                {tool?.name ?? entry.toolSlug}
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