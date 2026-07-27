"use client";

import { useState } from "react";
import { calculateRecipeCost, RecipeIngredient, RecipeCostResult } from "@/lib/tools/recipeCost";

let nextId = 1;

export interface RecipeCostFormState {
  ingredients: RecipeIngredient[];
  portions: string;
}

export default function RecipeCostCalculator({
  initialInput,
  onSave,
}: {
  initialInput?: Partial<RecipeCostFormState>;
  onSave?: (entry: { input: RecipeCostFormState; result: RecipeCostResult }) => void;
}) {
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>(() => {
    if (initialInput?.ingredients?.length) {
      const maxIndex = Math.max(
        0,
        ...initialInput.ingredients.map((i) => parseInt(i.id.replace("ing-", ""), 10) || 0)
      );
      nextId = Math.max(nextId, maxIndex + 1);
      return initialInput.ingredients;
    }
    return [{ id: "ing-0", name: "", quantity: 0, unitCost: 0 }];
  });
  const [portions, setPortions] = useState(initialInput?.portions ?? "");

  const updateIngredient = (
    id: string,
    field: keyof RecipeIngredient,
    value: string
  ) => {
    setIngredients((prev) =>
      prev.map((ing) =>
        ing.id === id
          ? {
              ...ing,
              [field]: field === "name" ? value : parseFloat(value) || 0,
            }
          : ing
      )
    );
  };

  const addIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      { id: `ing-${nextId++}`, name: "", quantity: 0, unitCost: 0 },
    ]);
  };

  const removeIngredient = (id: string) => {
    setIngredients((prev) => prev.filter((ing) => ing.id !== id));
  };

  const p = parseFloat(portions) || 0;
  const validIngredients = ingredients.filter(
    (i) => i.quantity > 0 && i.unitCost > 0
  );
  const valid = validIngredients.length > 0 && p > 0;

  const result = valid
    ? calculateRecipeCost({ ingredients: validIngredients, portions: p })
    : null;

  return (
    <div className="w-full max-w-md mx-auto rounded-xl bg-white border border-concrete-dark shadow-sm p-5">
      <div className="space-y-4 mb-4">
        {ingredients.map((ing, idx) => (
          <div
            key={ing.id}
            className="rounded-lg border-2 border-concrete-dark p-3"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Ingredient {idx + 1}
              </span>
              {ingredients.length > 1 && (
                <button
                  onClick={() => removeIngredient(ing.id)}
                  aria-label={`Remove ingredient ${idx + 1}`}
                  className="text-xs font-semibold uppercase tracking-wide text-steel"
                >
                  Remove
                </button>
              )}
            </div>
            <input
              type="text"
              value={ing.name}
              onChange={(e) => updateIngredient(ing.id, "name", e.target.value)}
              placeholder="e.g. Flour"
              aria-label={`Ingredient ${idx + 1} name`}
              className="w-full rounded-lg border-2 border-concrete-dark px-3 py-2 text-base mb-2 focus:outline-none focus:border-steel"
            />
            <div className="flex gap-2">
              <input
                type="number"
                inputMode="decimal"
                min="0"
                value={ing.quantity || ""}
                onChange={(e) =>
                  updateIngredient(ing.id, "quantity", e.target.value)
                }
                placeholder="Quantity used"
                aria-label={`Ingredient ${idx + 1} quantity`}
                className="w-1/2 rounded-lg border-2 border-concrete-dark px-3 py-2 text-base focus:outline-none focus:border-steel"
              />
              <input
                type="number"
                inputMode="decimal"
                min="0"
                value={ing.unitCost || ""}
                onChange={(e) =>
                  updateIngredient(ing.id, "unitCost", e.target.value)
                }
                placeholder="Cost per unit £"
                aria-label={`Ingredient ${idx + 1} cost per unit`}
                className="w-1/2 rounded-lg border-2 border-concrete-dark px-3 py-2 text-base focus:outline-none focus:border-steel"
              />
            </div>
          </div>
        ))}
        <button
          onClick={addIngredient}
          className="w-full rounded-lg border-2 border-dashed border-neutral-400 py-2 text-sm font-semibold uppercase tracking-wide text-neutral-600"
        >
          + Add another ingredient
        </button>
      </div>

      <div className="mb-4">
        <label
          htmlFor="recipe-portions"
          className="block text-sm font-semibold text-graphite mb-1"
        >
          Portions this recipe makes
        </label>
        <input
          id="recipe-portions"
          type="number"
          inputMode="decimal"
          min="0"
          value={portions}
          onChange={(e) => setPortions(e.target.value)}
          placeholder="e.g. 4"
          className="w-full rounded-lg border-2 border-concrete-dark px-3 py-2 text-base focus:outline-none focus:border-steel"
        />
      </div>

      {result && (
        <div className="readout-panel rounded-lg p-5 space-y-1.5 text-sm">
          <div className="flex justify-between text-neutral-300">
            <span>Ingredient total</span>
            <span className="readout-digits">
              £{result.ingredientTotal.toFixed(2)}
            </span>
          </div>
          <div className="border-t border-gunmetal pt-3 mt-2 flex justify-between items-baseline">
            <span className="text-xs uppercase tracking-widest text-neutral-400">
              Cost per portion
            </span>
            <span className="readout-digits text-xl font-semibold">
              £{result.costPerPortion.toFixed(2)}
            </span>
          </div>

          {onSave && (
            <button
              onClick={() => onSave({ input: { ingredients, portions }, result })}
              className="mt-4 w-full rounded-lg bg-safety text-graphite font-semibold text-sm py-2 uppercase tracking-wide"
            >
              Save to project
            </button>
          )}
        </div>
      )}
    </div>
  );
}
