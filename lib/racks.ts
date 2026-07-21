import { Rack } from "./types";
import { concreteCalculator } from "./tools/concrete";
import { brickCalculator } from "./tools/brick";
import { materialCostCalculator } from "./tools/material-cost";

// Racks are additive — a new trade means a new rack + new tools registered
// here, not a redesign. MVP scope is Construction only (see concept doc §6).
export const racks: Rack[] = [
  {
    id: "construction",
    slug: "construction",
    name: "Construction",
    description: "Materials, measurements, and costing for builders on-site.",
    tools: [concreteCalculator, brickCalculator, materialCostCalculator],
  },
];

export function getRack(slug: string): Rack | undefined {
  return racks.find((r) => r.slug === slug);
}

export function getTool(rackSlug: string, toolSlug: string) {
  return getRack(rackSlug)?.tools.find((t) => t.slug === toolSlug);
}
