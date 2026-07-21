export type Unit = "metric" | "imperial";

const FT_TO_M = 0.3048;

export function toMetres(value: number, unit: Unit): number {
  return unit === "metric" ? value : value * FT_TO_M;
}

export interface ConcreteInput {
  length: number;
  width: number;
  depth: number; // depth entered in mm for precision, converted inside
  unit: Unit;
  wastePercent: number; // e.g. 10
  bagSizeKg: 20 | 25;
  pricePerBag?: number;
}

export interface ConcreteResult {
  volumeM3: number;
  volumeWithWasteM3: number;
  bagsRequired: number;
  estimatedCost: number | null;
}

// Rule of thumb: a 25kg bag of pre-mixed concrete yields ~0.0125 m³.
// A 20kg bag yields proportionally less (~0.01 m³).
const YIELD_PER_KG_M3 = 0.0125 / 25;

export function calculateConcrete(input: ConcreteInput): ConcreteResult {
  const lengthM = toMetres(input.length, input.unit);
  const widthM = toMetres(input.width, input.unit);
  const depthM = input.depth / 1000; // depth always entered in mm

  const volumeM3 = lengthM * widthM * depthM;
  const volumeWithWasteM3 = volumeM3 * (1 + input.wastePercent / 100);

  const yieldPerBagM3 = YIELD_PER_KG_M3 * input.bagSizeKg;
  const bagsRequired = Math.ceil(volumeWithWasteM3 / yieldPerBagM3);

  const estimatedCost = input.pricePerBag
    ? Math.round(bagsRequired * input.pricePerBag * 100) / 100
    : null;

  return { volumeM3, volumeWithWasteM3, bagsRequired, estimatedCost };
}