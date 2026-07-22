import { Unit, toMetres, MixRatio, MixResult, calculateMixRatio } from "@/lib/units";

export interface ConcreteInput {
  length: number;
  width: number;
  depth: number; // depth entered in mm for precision, converted inside
  unit: Unit;
  wastePercent: number; // e.g. 10
  method: "premix" | "traditional";
  bagSizeKg?: 20 | 25; // premix only
  pricePerBag?: number; // premix only
  mixRatio?: MixRatio; // traditional only
}

export interface ConcreteResult {
  volumeM3: number;
  volumeWithWasteM3: number;
  bagsRequired: number | null;
  estimatedCost: number | null;
  bucketsOf13L: number;
  wheelbarrowsOf65L: number;
  mix: MixResult | null;
}

// Rule of thumb: a 25kg bag of pre-mixed concrete yields ~0.0125 m³.
// A 20kg bag yields proportionally less (~0.01 m³).
const YIELD_PER_KG_M3 = 0.0125 / 25;
const BUCKET_L = 13; // standard builder's bucket
const WHEELBARROW_L = 65; // standard single builder's wheelbarrow load

export function calculateConcrete(input: ConcreteInput): ConcreteResult {
  const lengthM = toMetres(input.length, input.unit);
  const widthM = toMetres(input.width, input.unit);
  const depthM = input.depth / 1000; // depth always entered in mm

  const volumeM3 = lengthM * widthM * depthM;
  const volumeWithWasteM3 = volumeM3 * (1 + input.wastePercent / 100);

  const bucketsOf13L = Math.ceil((volumeWithWasteM3 * 1000) / BUCKET_L);
  const wheelbarrowsOf65L = Math.ceil((volumeWithWasteM3 * 1000) / WHEELBARROW_L);

  let bagsRequired: number | null = null;
  let estimatedCost: number | null = null;
  let mix: MixResult | null = null;

  if (input.method === "premix" && input.bagSizeKg) {
    const yieldPerBagM3 = YIELD_PER_KG_M3 * input.bagSizeKg;
    bagsRequired = Math.ceil(volumeWithWasteM3 / yieldPerBagM3);
    estimatedCost = input.pricePerBag
      ? Math.round(bagsRequired * input.pricePerBag * 100) / 100
      : null;
  } else if (input.method === "traditional" && input.mixRatio) {
    mix = calculateMixRatio({ dryVolumeM3: volumeWithWasteM3, ratio: input.mixRatio });
  }

  return { volumeM3, volumeWithWasteM3, bagsRequired, estimatedCost, bucketsOf13L, wheelbarrowsOf65L, mix };
}
