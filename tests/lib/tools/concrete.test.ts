import { describe, it, expect } from "vitest";
import { calculateConcrete } from "@/lib/tools/concrete";

describe("calculateConcrete", () => {
  it("calculates volume from length x width x depth(mm)", () => {
    const result = calculateConcrete({
      length: 2,
      width: 1,
      depth: 100,
      unit: "metric",
      wastePercent: 0,
      method: "premix",
      bagSizeKg: 25,
      pricePerBag: 5,
    });

    expect(result.volumeM3).toBeCloseTo(0.2, 5);
    expect(result.volumeWithWasteM3).toBeCloseTo(0.2, 5);
  });

  it("applies the waste percentage on top of raw volume", () => {
    const noWaste = calculateConcrete({
      length: 2,
      width: 1,
      depth: 100,
      unit: "metric",
      wastePercent: 0,
      method: "premix",
      bagSizeKg: 25,
    });
    const tenPercentWaste = calculateConcrete({
      length: 2,
      width: 1,
      depth: 100,
      unit: "metric",
      wastePercent: 10,
      method: "premix",
      bagSizeKg: 25,
    });

    expect(tenPercentWaste.volumeWithWasteM3).toBeCloseTo(
      noWaste.volumeM3 * 1.1,
      5
    );
  });

  it("rounds buckets and wheelbarrows up to whole units", () => {
    const result = calculateConcrete({
      length: 2,
      width: 1,
      depth: 100,
      unit: "metric",
      wastePercent: 0,
      method: "premix",
      bagSizeKg: 25,
    });

    // 0.2 m3 = 200L -> 200/13 = 15.38 buckets, 200/65 = 3.08 wheelbarrows
    expect(result.bucketsOf13L).toBe(16);
    expect(result.wheelbarrowsOf65L).toBe(4);
  });

  it("premix mode returns bags and cost, and leaves mix null", () => {
    const result = calculateConcrete({
      length: 2,
      width: 1,
      depth: 100,
      unit: "metric",
      wastePercent: 0,
      method: "premix",
      bagSizeKg: 25,
      pricePerBag: 5,
    });

    expect(result.bagsRequired).toBe(16);
    expect(result.estimatedCost).toBe(80);
    expect(result.mix).toBeNull();
  });

  it("traditional mode returns a mix breakdown, and leaves bags/cost null", () => {
    const result = calculateConcrete({
      length: 2,
      width: 1,
      depth: 100,
      unit: "metric",
      wastePercent: 0,
      method: "traditional",
      mixRatio: { label: "test", cement: 1, sand: 2, aggregate: 4 },
    });

    expect(result.bagsRequired).toBeNull();
    expect(result.estimatedCost).toBeNull();
    expect(result.mix).not.toBeNull();
    expect(result.mix?.sandM3).toBeCloseTo(0.088, 3);
    expect(result.mix?.aggregateM3).toBeCloseTo(0.176, 3);
  });

  it("converts imperial dimensions to metres before calculating volume", () => {
    const result = calculateConcrete({
      length: 10, // feet
      width: 5, // feet
      depth: 100, // still mm
      unit: "imperial",
      wastePercent: 0,
      method: "premix",
      bagSizeKg: 25,
    });

    // 10ft x 5ft x 100mm converted to metres
    expect(result.volumeM3).toBeCloseTo(0.4645152, 5);
  });
});
