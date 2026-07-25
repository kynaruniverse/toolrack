export interface FoodCostInput {
  ingredientCost: number;
  sellingPrice?: number;
  targetFoodCostPercent?: number;
}

export interface FoodCostResult {
  foodCostPercent: number | null;
  grossProfit: number | null;
  suggestedSellingPrice: number | null;
}

export function calculateFoodCostPercent(
  input: FoodCostInput
): FoodCostResult {
  const hasSellingPrice = (input.sellingPrice ?? 0) > 0;
  const hasTarget = (input.targetFoodCostPercent ?? 0) > 0;

  const foodCostPercent = hasSellingPrice
    ? Math.round(
        (input.ingredientCost / (input.sellingPrice as number)) * 1000
      ) / 10
    : null;

  const grossProfit = hasSellingPrice
    ? Math.round(((input.sellingPrice as number) - input.ingredientCost) * 100) /
      100
    : null;

  const suggestedSellingPrice = hasTarget
    ? Math.round(
        (input.ingredientCost / ((input.targetFoodCostPercent as number) / 100)) *
          100
      ) / 100
    : null;

  return { foodCostPercent, grossProfit, suggestedSellingPrice };
}
