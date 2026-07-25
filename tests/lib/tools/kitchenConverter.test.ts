import { describe, it, expect } from "vitest";
import { convertKitchenUnit } from "@/lib/tools/kitchenConverter";

describe("convertKitchenUnit", () => {
  it("converts within the volume category", () => {
    expect(convertKitchenUnit(1, "l", "ml")).toBe(1000);
    expect(convertKitchenUnit(1, "cup", "ml")).toBeCloseTo(236.588, 2);
  });

  it("converts within the weight category", () => {
    expect(convertKitchenUnit(1000, "g", "kg")).toBe(1);
    expect(convertKitchenUnit(1, "kg", "lb")).toBeCloseTo(2.20462, 2);
  });

  it("converts volume to weight using an ingredient density", () => {
    const water = convertKitchenUnit(1, "cup", "g", "water");
    const flour = convertKitchenUnit(1, "cup", "g", "all-purpose-flour");

    expect(water).toBeCloseTo(236.588, 2);
    expect(flour).toBeCloseTo(125.155, 1);
    // Flour is less dense than water, so 1 cup should weigh less
    expect(flour as number).toBeLessThan(water as number);
  });

  it("converts weight to volume using an ingredient density", () => {
    const result = convertKitchenUnit(100, "g", "ml", "water");
    expect(result).toBeCloseTo(100, 1);
  });

  it("returns null when crossing categories without an ingredient", () => {
    const result = convertKitchenUnit(1, "cup", "g");
    expect(result).toBeNull();
  });
});
