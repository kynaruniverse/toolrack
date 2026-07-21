import { Tool } from "../types";

export interface BrickInput {
  wallLengthM: number;
  wallHeightM: number;
  bricksPerM2?: number; // standard UK brick, half-brick wall ≈ 60/m²
  wastePercent?: number;
}

export const brickCalculator: Tool<BrickInput> = {
  id: "brick-calculator",
  slug: "brick-calculator",
  name: "Brick Calculator",
  description: "Work out bricks and mortar needed from wall length and height.",
  rackId: "construction",
  compute: ({ wallLengthM, wallHeightM, bricksPerM2 = 60, wastePercent = 5 }) => {
    const areaM2 = wallLengthM * wallHeightM;
    const rawBricks = areaM2 * bricksPerM2;
    const bricksWithWaste = Math.ceil(rawBricks * (1 + wastePercent / 100));
    // Rough rule of thumb: 1 tonne of mortar sand covers ~10m² for a standard bed.
    const mortarBagsApprox = Math.ceil(areaM2 / 10);

    return {
      summary: `${bricksWithWaste} bricks`,
      explanation: `You'll need approximately ${bricksWithWaste} bricks for a ${areaM2.toFixed(
        1
      )} m² wall, including a ${wastePercent}% waste allowance. Budget for roughly ${mortarBagsApprox} bags of mortar mix.`,
      values: {
        areaM2: Number(areaM2.toFixed(2)),
        bricksWithWaste,
        mortarBagsApprox,
      },
    };
  },
};
