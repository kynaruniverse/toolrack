import { describe, it, expect } from "vitest";
import { calculateBrick } from "@/lib/tools/brick";

describe("calculateBrick", () => {
  it("uses the 60 bricks/m2 baseline when brick dimensions match the baseline exactly", () => {
    const result = calculateBrick({
      wallLength: 10,
      wallHeight: 1,
      unit: "metric",
      unitType: "brick",
      brickLengthMm: 215,
      brickHeightMm: 65,
      mortarJointMm: 10,
      mortarBagSizeKg: 25,
      mortarRatio: { label: "1:5", cement: 1, sand: 5, aggregate: 0 },
      wastePercent: 0,
    });

    expect(result.wallAreaM2).toBe(10);
    expect(result.bricksRequired).toBe(600); // 10 m2 * 60 bricks/m2
  });

  it("needs proportionally more units for a smaller brick size", () => {
    const baseline = calculateBrick({
      wallLength: 10,
      wallHeight: 1,
      unit: "metric",
      unitType: "brick",
      brickLengthMm: 215,
      brickHeightMm: 65,
      mortarJointMm: 10,
      mortarBagSizeKg: 25,
      mortarRatio: { label: "1:5", cement: 1, sand: 5, aggregate: 0 },
      wastePercent: 0,
    });
    const smallerBrick = calculateBrick({
      wallLength: 10,
      wallHeight: 1,
      unit: "metric",
      unitType: "brick",
      brickLengthMm: 100,
      brickHeightMm: 50,
      mortarJointMm: 10,
      mortarBagSizeKg: 25,
      mortarRatio: { label: "1:5", cement: 1, sand: 5, aggregate: 0 },
      wastePercent: 0,
    });

    expect(smallerBrick.bricksRequired).toBeGreaterThan(baseline.bricksRequired);
  });

  it("applies waste percentage on top of the raw brick count", () => {
    const noWaste = calculateBrick({
      wallLength: 10,
      wallHeight: 1,
      unit: "metric",
      unitType: "brick",
      brickLengthMm: 215,
      brickHeightMm: 65,
      mortarJointMm: 10,
      mortarBagSizeKg: 25,
      mortarRatio: { label: "1:5", cement: 1, sand: 5, aggregate: 0 },
      wastePercent: 0,
    });
    const withWaste = calculateBrick({
      wallLength: 10,
      wallHeight: 1,
      unit: "metric",
      unitType: "brick",
      brickLengthMm: 215,
      brickHeightMm: 65,
      mortarJointMm: 10,
      mortarBagSizeKg: 25,
      mortarRatio: { label: "1:5", cement: 1, sand: 5, aggregate: 0 },
      wastePercent: 10,
    });

    expect(withWaste.bricksRequired).toBeGreaterThanOrEqual(
      Math.ceil(noWaste.bricksRequired * 1.1) - 1
    );
  });

  it("returns a mortar mix breakdown alongside the brick count", () => {
    const result = calculateBrick({
      wallLength: 10,
      wallHeight: 1,
      unit: "metric",
      unitType: "brick",
      brickLengthMm: 215,
      brickHeightMm: 65,
      mortarJointMm: 10,
      mortarBagSizeKg: 25,
      mortarRatio: { label: "1:5", cement: 1, sand: 5, aggregate: 0 },
      wastePercent: 0,
    });

    expect(result.mortarVolumeM3).toBeCloseTo(18, 3);
    expect(result.mortarMix.aggregateM3).toBe(0); // mortar-only ratio has no aggregate
    expect(result.mortarMix.cementBags).toBeGreaterThan(0);
  });
});
