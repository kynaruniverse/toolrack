import { describe, it, expect } from "vitest";
import { calculateMenuPrice } from "@/lib/tools/menuPrice";

describe("calculateMenuPrice", () => {
  it("calculates price from a markup percentage", () => {
    const result = calculateMenuPrice({ cost: 5, method: "markup", percent: 50 });

    expect(result.price).toBe(7.5);
    expect(result.profit).toBe(2.5);
    expect(result.equivalentMarkupPercent).toBe(50);
    expect(result.equivalentMarginPercent).toBeCloseTo(33.3, 1);
  });

  it("calculates price from a margin percentage", () => {
    const result = calculateMenuPrice({ cost: 7, method: "margin", percent: 30 });

    expect(result.price).toBe(10);
    expect(result.profit).toBe(3);
    expect(result.equivalentMarginPercent).toBe(30);
    expect(result.equivalentMarkupPercent).toBeCloseTo(42.9, 1);
  });

  it("shows markup and margin are not the same number for equal percentages", () => {
    const markup = calculateMenuPrice({ cost: 10, method: "markup", percent: 25 });
    const margin = calculateMenuPrice({ cost: 10, method: "margin", percent: 25 });

    expect(markup.price).not.toBe(margin.price);
  });
});
