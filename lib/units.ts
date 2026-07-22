export type Unit = "metric" | "imperial";

const FT_TO_M = 0.3048;

export function toMetres(value: number, unit: Unit): number {
  return unit === "metric" ? value : value * FT_TO_M;
}

// --- Mix ratio (cement : sand : aggregate, or cement : lime : sand) ---
// Shared by the Concrete tool (mix-your-own mode) and the Brick tool (mortar).

export interface MixRatio {
  label: string;
  cement: number;
  sand: number;
  aggregate: number; // 0 for mortar-only ratios (no coarse aggregate)
}

export const CONCRETE_MIX_PRESETS: MixRatio[] = [
  { label: "General purpose (1:2:4)", cement: 1, sand: 2, aggregate: 4 },
  { label: "Paving / standard (1:1.5:3)", cement: 1, sand: 1.5, aggregate: 3 },
  { label: "Foundations / mass fill (1:3:6)", cement: 1, sand: 3, aggregate: 6 },
];

export const MORTAR_MIX_PRESETS: MixRatio[] = [
  { label: "General purpose (1:1:6 cement:lime:sand)", cement: 1, sand: 6, aggregate: 1 },
  { label: "Strong / exposed (1:4 cement:sand)", cement: 1, sand: 4, aggregate: 0 },
  { label: "Standard (1:5 cement:sand)", cement: 1, sand: 5, aggregate: 0 },
];

export interface MixRatioInput {
  dryVolumeM3: number; // wet/finished volume required
  ratio: MixRatio;
  cementBagSizeKg?: 20 | 25;
}

export interface MixResult {
  cementBags: number;
  sandM3: number;
  aggregateM3: number;
}

// Wet volume needs ~1.54x dry material volume to account for voids/shrinkage on mixing.
const DRY_VOLUME_FACTOR = 1.54;
const CEMENT_KG_PER_M3 = 1440; // bulk density of cement

export function calculateMixRatio(input: MixRatioInput): MixResult {
  const totalParts = input.ratio.cement + input.ratio.sand + input.ratio.aggregate;
  const dryMaterialVolume = input.dryVolumeM3 * DRY_VOLUME_FACTOR;

  const cementVolumeM3 = (dryMaterialVolume * input.ratio.cement) / totalParts;
  const sandM3 = (dryMaterialVolume * input.ratio.sand) / totalParts;
  const aggregateM3 = (dryMaterialVolume * input.ratio.aggregate) / totalParts;

  const cementBagSizeKg = input.cementBagSizeKg ?? 25;
  const cementBags = Math.ceil((cementVolumeM3 * CEMENT_KG_PER_M3) / cementBagSizeKg);

  return {
    cementBags,
    sandM3: Math.round(sandM3 * 1000) / 1000,
    aggregateM3: Math.round(aggregateM3 * 1000) / 1000,
  };
}
