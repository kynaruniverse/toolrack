import { describe, it, expect } from "vitest";
import { calculateFoodCostPercent } from "@/lib/tools/foodCostPercent";

describe("calculateFoodCostPercent", () => {
  it("calculates food cost percentage and gross profit from a selling price", () => {
    const result = calculateFoodCostPercent({
      ingredientCost: 3,
      sellingPrice: 12,
    });

    expect(result.foodCostPercent).toBe(25);
    expect(result.grossProfit).toBe(9);
  });

  it("calculates a suggested selling price from a target food cost percentage", () => {
    const result = calculateFoodCostPercent({
      ingredientCost: 3,
      targetFoodCostPercent: 30,
    });

    expect(result.suggestedSellingPrice).toBe(10);
  });

  it("returns null for fields that have no input to compute from", () => {
    const result = calculateFoodCostPercent({ ingredientCost: 3 });

    expect(result.foodCostPercent).toBeNull();
    expect(result.grossProfit).toBeNull();
    expect(result.suggestedSellingPrice).toBeNull();
  });
});
