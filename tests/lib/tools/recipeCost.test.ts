import { describe, it, expect } from "vitest";
import { calculateRecipeCost } from "@/lib/tools/recipeCost";

describe("calculateRecipeCost", () => {
  it("sums ingredient line items and divides by portions", () => {
    const result = calculateRecipeCost({
      ingredients: [
        { id: "1", name: "Flour", quantity: 2, unitCost: 0.5 },
        { id: "2", name: "Sugar", quantity: 1, unitCost: 1.2 },
      ],
      portions: 4,
    });

    expect(result.ingredientTotal).toBe(2.2);
    expect(result.costPerPortion).toBe(0.55);
  });

  it("returns 0 cost per portion rather than dividing by zero", () => {
    const result = calculateRecipeCost({
      ingredients: [{ id: "1", name: "Flour", quantity: 2, unitCost: 0.5 }],
      portions: 0,
    });

    expect(result.costPerPortion).toBe(0);
    expect(result.ingredientTotal).toBe(1);
  });

  it("handles an empty ingredient list", () => {
    const result = calculateRecipeCost({ ingredients: [], portions: 4 });
    expect(result.ingredientTotal).toBe(0);
    expect(result.costPerPortion).toBe(0);
  });
});
