"use client";

import { cloneElement, isValidElement, ReactElement, ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { ToolMeta } from "@/lib/types";
import { getEntry, getOrCreateActiveProject, addEntryToProject } from "@/lib/projects";
import ProjectBar from "@/components/ProjectBar";

export default function ToolRunner({ tool, children }: { tool: ToolMeta; children: ReactNode }) {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const entryId = searchParams.get("entryId");
  const existingEntry = projectId && entryId ? getEntry(projectId, entryId) : undefined;

  const handleSave = (payload: { input: Record<string, unknown>; result: Record<string, unknown> }) => {
    const project = getOrCreateActiveProject();
    addEntryToProject(project.id, {
      toolSlug: tool.slug,
      toolType: tool.toolType,
      label: tool.name,
      input: payload.input,
      result: payload.result,
    });
  };

  if (!isValidElement(children)) return <>{children}</>;

  return (
    <>
      <ProjectBar />
      {cloneElement(children as ReactElement<any>, {
        initialInput: existingEntry?.input,
        onSave: handleSave,
      })}
    </>
  );
}