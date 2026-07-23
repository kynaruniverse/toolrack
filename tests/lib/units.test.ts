import { describe, it, expect } from "vitest";
import { toMetres, calculateMixRatio } from "@/lib/units";

describe("toMetres", () => {
  it("passes metric values through unchanged", () => {
    expect(toMetres(5, "metric")).toBe(5);
  });

  it("converts feet to metres", () => {
    expect(toMetres(5, "imperial")).toBeCloseTo(1.524, 5);
  });
});

describe("calculateMixRatio", () => {
  it("splits a 1:2:4 mix proportionally and rounds cement bags up", () => {
    const result = calculateMixRatio({
      dryVolumeM3: 1,
      ratio: { label: "test", cement: 1, sand: 2, aggregate: 4 },
      cementBagSizeKg: 25,
    });

    expect(result.cementBags).toBe(13); // 316.8kg cement / 25kg -> ceil(12.672)
    expect(result.sandM3).toBe(0.44);
    expect(result.aggregateM3).toBe(0.88);
  });

  it("uses a smaller bag size and needs more bags for the same volume", () => {
    const result = calculateMixRatio({
      dryVolumeM3: 1,
      ratio: { label: "test", cement: 1, sand: 2, aggregate: 4 },
      cementBagSizeKg: 20,
    });

    expect(result.cementBags).toBe(16); // 316.8kg cement / 20kg -> ceil(15.84)
  });

  it("defaults to a 25kg bag when none is specified", () => {
    const withDefault = calculateMixRatio({
      dryVolumeM3: 1,
      ratio: { label: "test", cement: 1, sand: 2, aggregate: 4 },
    });
    const explicit25 = calculateMixRatio({
      dryVolumeM3: 1,
      ratio: { label: "test", cement: 1, sand: 2, aggregate: 4 },
      cementBagSizeKg: 25,
    });

    expect(withDefault.cementBags).toBe(explicit25.cementBags);
  });
});
