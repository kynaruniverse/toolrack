"use client";

import { useState } from "react";
import { calculateFoodCostPercent, FoodCostResult } from "@/lib/tools/foodCostPercent";
import { hapticTap } from "@/lib/haptics";

export interface FoodCostFormState {
  ingredientCost: string;
  sellingPrice: string;
  targetPercent: number;
}

export default function FoodCostCalculator({
  initialInput,
  onSave,
}: {
  initialInput?: Partial<FoodCostFormState>;
  onSave?: (entry: { input: FoodCostFormState; result: FoodCostResult }) => void;
}) {
  const [ingredientCost, setIngredientCost] = useState(initialInput?.ingredientCost ?? "");
  const [sellingPrice, setSellingPrice] = useState(initialInput?.sellingPrice ?? "");
  const [targetPercent, setTargetPercent] = useState(initialInput?.targetPercent ?? 30);

  const cost = parseFloat(ingredientCost) || 0;
  const price = parseFloat(sellingPrice) || 0;

  const valid = cost > 0;

  const result = valid
    ? calculateFoodCostPercent({
        ingredientCost: cost,
        sellingPrice: price > 0 ? price : undefined,
        targetFoodCostPercent: targetPercent,
      })
    : null;

  return (
    <div className="w-full max-w-md mx-auto ticket-edge relative bg-kraft border border-kraft-line rounded-sm p-5 pt-7">
      <div className="mb-4">
        <label
          htmlFor="fc-cost"
          className="block text-sm font-semibold text-ink mb-1"
        >
          Ingredient cost per dish (£)
        </label>
        <input
          id="fc-cost"
          type="number"
          inputMode="decimal"
          min="0"
          value={ingredientCost}
          onChange={(e) => setIngredientCost(e.target.value)}
          placeholder="e.g. 3.00"
          className="w-full rounded-lg border-2 border-kraft-line px-3 py-2 text-base focus:outline-none focus:border-safety focus:ring-2 focus:ring-safety/25"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="fc-price"
          className="block text-sm font-semibold text-ink mb-1"
        >
          Current menu price (£) — optional
        </label>
        <input
          id="fc-price"
          type="number"
          inputMode="decimal"
          min="0"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
          placeholder="e.g. 12.00"
          className="w-full rounded-lg border-2 border-kraft-line px-3 py-2 text-base focus:outline-none focus:border-safety focus:ring-2 focus:ring-safety/25"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="fc-target"
          className="block text-sm font-semibold text-ink mb-1"
        >
          Target food cost: <span className="text-ink">{targetPercent}%</span>
        </label>
        <input
          id="fc-target"
          type="range"
          min={15}
          max={45}
          value={targetPercent}
          onChange={(e) => setTargetPercent(Number(e.target.value))}
          aria-valuetext={`${targetPercent}%`}
          className="w-full accent-safety"
        />
      </div>

      {result && (
        <div className="carbon-slip rounded-lg p-5 space-y-1.5 text-sm">
          {result.foodCostPercent !== null && (
            <div className="flex justify-between text-ink/70">
              <span>Food cost at current price</span>
              <span className="carbon-digits">
                {result.foodCostPercent}%
              </span>
            </div>
          )}
          {result.grossProfit !== null && (
            <div className="flex justify-between text-ink/70">
              <span>Gross profit per dish</span>
              <span className="carbon-digits">
                £{result.grossProfit.toFixed(2)}
              </span>
            </div>
          )}
          <div className="border-t border-carbon-ink/15 pt-3 mt-2 flex justify-between items-baseline">
            <span className="text-xs uppercase tracking-widest text-ink/50">
              Price for {targetPercent}% food cost
            </span>
            <span className="carbon-digits text-xl font-semibold">
              £{result.suggestedSellingPrice?.toFixed(2)}
            </span>
          </div>

          {onSave && (
            <button
              onClick={() => {
                hapticTap();
                onSave({
                  input: { ingredientCost, sellingPrice, targetPercent },
                  result,
                });
              }}
              className="tactile mt-4 w-full rounded-lg bg-safety text-ink font-semibold text-sm py-2 uppercase tracking-wide"
            >
              Save to project
            </button>
          )}
        </div>
      )}
    </div>
  );
}
