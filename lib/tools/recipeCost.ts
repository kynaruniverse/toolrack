export interface RecipeIngredient {
  id: string;
  name: string;
  quantity: number;
  unitCost: number;
}

export interface RecipeCostInput {
  ingredients: RecipeIngredient[];
  portions: number;
}

export interface RecipeCostResult {
  ingredientTotal: number;
  costPerPortion: number;
}

export function calculateRecipeCost(input: RecipeCostInput): RecipeCostResult {
  const ingredientTotal = input.ingredients.reduce(
    (sum, ing) => sum + ing.quantity * ing.unitCost,
    0
  );

  const costPerPortion =
    input.portions > 0 ? ingredientTotal / input.portions : 0;

  return {
    ingredientTotal: Math.round(ingredientTotal * 100) / 100,
    costPerPortion: Math.round(costPerPortion * 100) / 100,
  };
}
