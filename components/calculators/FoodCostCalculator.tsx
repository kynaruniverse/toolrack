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
    <div className="w-full max-w-md mx-auto rounded-xl bg-white border border-concrete-dark shadow-sm p-5">
      <div className="mb-4">
        <label
          htmlFor="fc-cost"
          className="block text-sm font-semibold text-graphite mb-1"
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
          className="w-full rounded-lg border-2 border-concrete-dark px-3 py-2 text-base focus:outline-none focus:ring-0 focus:border-steel"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="fc-price"
          className="block text-sm font-semibold text-graphite mb-1"
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
          className="w-full rounded-lg border-2 border-concrete-dark px-3 py-2 text-base focus:outline-none focus:ring-0 focus:border-steel"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="fc-target"
          className="block text-sm font-semibold text-graphite mb-1"
        >
          Target food cost: <span className="text-steel">{targetPercent}%</span>
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
        <div className="readout-panel rounded-lg p-5 space-y-1.5 text-sm">
          {result.foodCostPercent !== null && (
            <div className="flex justify-between text-neutral-300">
              <span>Food cost at current price</span>
              <span className="readout-digits">
                {result.foodCostPercent}%
              </span>
            </div>
          )}
          {result.grossProfit !== null && (
            <div className="flex justify-between text-neutral-300">
              <span>Gross profit per dish</span>
              <span className="readout-digits">
                £{result.grossProfit.toFixed(2)}
              </span>
            </div>
          )}
          <div className="border-t border-gunmetal pt-3 mt-2 flex justify-between items-baseline">
            <span className="text-xs uppercase tracking-widest text-neutral-400">
              Price for {targetPercent}% food cost
            </span>
            <span className="readout-digits text-xl font-semibold">
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
              className="tactile mt-4 w-full rounded-lg bg-safety text-graphite font-semibold text-sm py-2 uppercase tracking-wide"
            >
              Save to project
            </button>
          )}
        </div>
      )}
    </div>
  );
}
