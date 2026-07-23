import { describe, it, expect } from "vitest";
import { calculateRebarWeight } from "@/lib/tools/rebar";

describe("calculateRebarWeight", () => {
  it("uses the (d^2)/162 rule of thumb for weight per metre", () => {
    const result = calculateRebarWeight({
      diameterMm: 12,
      barLengthM: 6,
      numberOfBars: 10,
    });

    expect(result.weightPerMetreKg).toBeCloseTo(0.889, 3); // 144/162
  });

  it("multiplies bar length by bar count for total length", () => {
    const result = calculateRebarWeight({
      diameterMm: 12,
      barLengthM: 6,
      numberOfBars: 10,
    });

    expect(result.totalLengthM).toBe(60);
  });

  it("calculates total weight from unrounded weight-per-metre and total length", () => {
    const result = calculateRebarWeight({
      diameterMm: 12,
      barLengthM: 6,
      numberOfBars: 10,
    });

    expect(result.totalWeightKg).toBeCloseTo(53.33, 2);
  });

  it("scales weight up for a larger diameter bar", () => {
    const thin = calculateRebarWeight({ diameterMm: 8, barLengthM: 1, numberOfBars: 1 });
    const thick = calculateRebarWeight({ diameterMm: 32, barLengthM: 1, numberOfBars: 1 });

    expect(thick.weightPerMetreKg).toBeGreaterThan(thin.weightPerMetreKg);
  });
});
