import { Unit, toMetres } from "@/lib/units";

export interface ExcavationInput {
  length: number;
  width: number;
  depth: number; // metres or feet, matches unit (not mm, since trenches are often deep)
  unit: Unit;
  wastePercent: number; // spoil bulking allowance
}

export interface ExcavationResult {
  volumeM3: number;
  bulkedSpoilM3: number; // excavated soil expands when dug (bulking factor)
  skipsRequired: number; // based on an 8-yard skip (~6.1 m3)
}

// Dug soil bulks up by roughly 20-30% once removed from the ground.
const SOIL_BULKING_FACTOR = 1.25;
const SKIP_M3 = 6.1; // standard 8-yard skip capacity

export function calculateExcavation(input: ExcavationInput): ExcavationResult {
  const lengthM = toMetres(input.length, input.unit);
  const widthM = toMetres(input.width, input.unit);
  const depthM = toMetres(input.depth, input.unit);

  const volumeM3 = lengthM * widthM * depthM * (1 + input.wastePercent / 100);
  const bulkedSpoilM3 = volumeM3 * SOIL_BULKING_FACTOR;
  const skipsRequired = Math.ceil(bulkedSpoilM3 / SKIP_M3);

  return {
    volumeM3: Math.round(volumeM3 * 1000) / 1000,
    bulkedSpoilM3: Math.round(bulkedSpoilM3 * 1000) / 1000,
    skipsRequired,
  };
}
