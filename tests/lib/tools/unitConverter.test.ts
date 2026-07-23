import { describe, it, expect } from "vitest";
import { convertUnit } from "@/lib/tools/unitConverter";

describe("convertUnit", () => {
  it("converts length units via the shared base unit", () => {
    expect(convertUnit(1000, "length", "mm", "m")).toBeCloseTo(1, 5);
    expect(convertUnit(1, "length", "m", "ft")).toBeCloseTo(3.28084, 4);
  });

  it("converts area units", () => {
    expect(convertUnit(10, "area", "m2", "ft2")).toBeCloseTo(107.639, 2);
  });

  it("converts volume units", () => {
    expect(convertUnit(1, "volume", "m3", "l")).toBeCloseTo(1000, 5);
  });

  it("converts weight units", () => {
    expect(convertUnit(1, "weight", "t", "kg")).toBeCloseTo(1000, 5);
  });

  it("returns 0 for an unknown unit key rather than throwing", () => {
    expect(convertUnit(5, "length", "made-up", "m")).toBe(0);
  });
});
