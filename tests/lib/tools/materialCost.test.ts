import { describe, it, expect } from "vitest";
import { calculateMaterialCost } from "@/lib/tools/materialCost";

describe("calculateMaterialCost", () => {
  it("sums line items, adds labour, and applies margin on top", () => {
    const result = calculateMaterialCost({
      items: [
        { id: "1", name: "Cement", quantity: 10, unitPrice: 2.5 },
        { id: "2", name: "Timber", quantity: 3, unitPrice: 15 },
      ],
      labourHours: 5,
      labourRate: 20,
      marginPercent: 10,
    });

    expect(result.materialTotal).toBe(70); // 10*2.5 + 3*15
    expect(result.labourTotal).toBe(100); // 5*20
    expect(result.subtotal).toBe(170);
    expect(result.marginAmount).toBe(17);
    expect(result.finalQuote).toBe(187);
  });

  it("handles an empty item list", () => {
    const result = calculateMaterialCost({
      items: [],
      labourHours: 2,
      labourRate: 25,
      marginPercent: 0,
    });

    expect(result.materialTotal).toBe(0);
    expect(result.finalQuote).toBe(50);
  });

  it("rounds all money figures to 2 decimal places", () => {
    const result = calculateMaterialCost({
      items: [{ id: "1", name: "Odd price", quantity: 3, unitPrice: 1.111 }],
      labourHours: 1,
      labourRate: 1,
      marginPercent: 5,
    });

    expect(result.materialTotal).toBe(3.33);
  });
});
