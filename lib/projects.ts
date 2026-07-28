import { ToolType } from "@/lib/types";
import { ConcreteResult } from "@/lib/tools/concrete";
import { BrickResult } from "@/lib/tools/brick";
import { RebarResult } from "@/lib/tools/rebar";
import { ExcavationResult } from "@/lib/tools/excavation";
import { MaterialCostResult } from "@/lib/tools/materialCost";
import { RecipeCostResult } from "@/lib/tools/recipeCost";
import { FoodCostResult } from "@/lib/tools/foodCostPercent";
import { MenuPriceResult } from "@/lib/tools/menuPrice";

export interface ProjectEntry {
  id: string;
  toolSlug: string;
  toolType: ToolType;
  label: string;
  input: Record<string, unknown>;
  result: Record<string, unknown>;
  note?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  rackSlug?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  entries: ProjectEntry[];
}

// A short, tool-specific summary of an entry's saved result — shown on the
// saved-entry card instead of repeating the tool name a second time.
export function summarizeEntry(entry: ProjectEntry): string {
  const r = entry.result;
  switch (entry.toolSlug) {
    case "concrete-calculator": {
      const res = r as unknown as ConcreteResult;
      return res.bagsRequired
        ? `${res.volumeWithWasteM3.toFixed(2)} m³ · ${res.bagsRequired} bags`
        : `${res.volumeWithWasteM3.toFixed(2)} m³`;
    }
    case "brick-calculator": {
      const res = r as unknown as BrickResult;
      return `${res.bricksRequired} bricks · ${res.wallAreaM2.toFixed(1)} m²`;
    }
    case "rebar-calculator": {
      const res = r as unknown as RebarResult;
      return `${res.totalWeightKg} kg total`;
    }
    case "excavation-calculator": {
      const res = r as unknown as ExcavationResult;
      return `${res.bulkedSpoilM3} m³ spoil · ${res.skipsRequired} skip${res.skipsRequired === 1 ? "" : "s"}`;
    }
    case "material-cost-calculator": {
      const res = r as unknown as MaterialCostResult;
      return `£${res.finalQuote.toFixed(2)} quote`;
    }
    case "recipe-cost-calculator": {
      const res = r as unknown as RecipeCostResult;
      return `£${res.costPerPortion.toFixed(2)} per portion`;
    }
    case "food-cost-calculator": {
      const res = r as unknown as FoodCostResult;
      return res.foodCostPercent !== null
        ? `${res.foodCostPercent}% food cost`
        : res.suggestedSellingPrice !== null
        ? `£${res.suggestedSellingPrice.toFixed(2)} suggested price`
        : "";
    }
    case "menu-price-calculator": {
      const res = r as unknown as MenuPriceResult;
      return `£${res.price.toFixed(2)} price`;
    }
    case "unit-converter":
    case "kitchen-unit-converter": {
      const res = r as unknown as { value: number; unit: string };
      return `${res.value} ${res.unit}`;
    }
    default:
      return "";
  }
}

const STORAGE_KEY = "toolrack:projects";
const ACTIVE_KEY = "toolrack:activeProjectId";

// Not cryptographically unique — fine for local, client-only IDs.
function uuid(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function readAll(): Project[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Project[]) : [];
  } catch {
    return [];
  }
}

function writeAll(projects: Project[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function getProjects(): Project[] {
  return readAll().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getProject(id: string): Project | undefined {
  return readAll().find((p) => p.id === id);
}

export function createProject(name: string): Project {
  const now = new Date().toISOString();
  const project: Project = { id: uuid(), name, createdAt: now, updatedAt: now, entries: [] };
  const all = readAll();
  all.push(project);
  writeAll(all);
  setActiveProjectId(project.id);
  return project;
}

export function getActiveProjectId(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ACTIVE_KEY);
}

export function setActiveProjectId(id: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACTIVE_KEY, id);
}

// Always returns a project to save into, creating a default one on first
// use — this is what lets "Save to project" work with zero setup.
export function getOrCreateActiveProject(): Project {
  const activeId = getActiveProjectId();
  if (activeId) {
    const existing = getProject(activeId);
    if (existing) return existing;
  }
  const all = readAll();
  if (all.length > 0) {
    setActiveProjectId(all[0].id);
    return all[0];
  }
  return createProject("My Project");
}

export function addEntryToProject(
  projectId: string,
  entry: Omit<ProjectEntry, "id" | "createdAt">
): ProjectEntry {
  const all = readAll();
  const project = all.find((p) => p.id === projectId);
  if (!project) throw new Error(`Project ${projectId} not found`);
  const fullEntry: ProjectEntry = { ...entry, id: uuid(), createdAt: new Date().toISOString() };
  project.entries.push(fullEntry);
  project.updatedAt = fullEntry.createdAt;
  writeAll(all);
  return fullEntry;
}

export function getEntry(projectId: string, entryId: string): ProjectEntry | undefined {
  return getProject(projectId)?.entries.find((e) => e.id === entryId);
}

export function deleteEntry(projectId: string, entryId: string): void {
  const all = readAll();
  const project = all.find((p) => p.id === projectId);
  if (!project) return;
  project.entries = project.entries.filter((e) => e.id !== entryId);
  project.updatedAt = new Date().toISOString();
  writeAll(all);
}

export function renameProject(id: string, name: string): void {
  const all = readAll();
  const project = all.find((p) => p.id === id);
  if (!project) return;
  project.name = name;
  project.updatedAt = new Date().toISOString();
  writeAll(all);
}

export function deleteProject(id: string): void {
  writeAll(readAll().filter((p) => p.id !== id));
  if (getActiveProjectId() === id) window.localStorage.removeItem(ACTIVE_KEY);
}