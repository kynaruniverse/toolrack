import { describe, it, expect } from "vitest";
import { calculateExcavation } from "@/lib/tools/excavation";

describe("calculateExcavation", () => {
  it("calculates raw volume with waste applied", () => {
    const result = calculateExcavation({
      length: 4,
      width: 2,
      depth: 1,
      unit: "metric",
      wastePercent: 20,
    });

    expect(result.volumeM3).toBeCloseTo(9.6, 3); // 4*2*1*1.2
  });

  it("bulks the spoil volume beyond the dug volume", () => {
    const result = calculateExcavation({
      length: 4,
      width: 2,
      depth: 1,
      unit: "metric",
      wastePercent: 20,
    });

    expect(result.bulkedSpoilM3).toBeCloseTo(12, 3); // 9.6 * 1.25
    expect(result.bulkedSpoilM3).toBeGreaterThan(result.volumeM3);
  });

  it("rounds skips required up to a whole skip", () => {
    const result = calculateExcavation({
      length: 4,
      width: 2,
      depth: 1,
      unit: "metric",
      wastePercent: 20,
    });

    expect(result.skipsRequired).toBe(2); // ceil(12 / 6.1)
  });
});
