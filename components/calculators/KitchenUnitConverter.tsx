"use client";

import { useState } from "react";
import {
  convertKitchenUnit,
  UNIT_META,
  INGREDIENT_DENSITIES,
  IngredientKey,
  KitchenUnit,
} from "@/lib/tools/kitchenConverter";
import { hapticTap } from "@/lib/haptics";

const INGREDIENT_OPTIONS = Object.entries(INGREDIENT_DENSITIES) as [
  IngredientKey,
  { label: string; gramsPerMl: number }
][];

export interface KitchenConverterFormState {
  value: string;
  fromUnit: KitchenUnit;
  toUnit: KitchenUnit;
  ingredient: IngredientKey;
}

export default function KitchenUnitConverter({
  initialInput,
  onSave,
}: {
  initialInput?: Partial<KitchenConverterFormState>;
  onSave?: (entry: {
    input: KitchenConverterFormState;
    result: { value: number; unit: string };
  }) => void;
}) {
  const [value, setValue] = useState(initialInput?.value ?? "1");
  const [fromUnit, setFromUnit] = useState<KitchenUnit>(initialInput?.fromUnit ?? "cup");
  const [toUnit, setToUnit] = useState<KitchenUnit>(initialInput?.toUnit ?? "g");
  const [ingredient, setIngredient] = useState<IngredientKey>(
    initialInput?.ingredient ?? "all-purpose-flour"
  );

  const fromMeta = UNIT_META.find((u) => u.key === fromUnit)!;
  const toMeta = UNIT_META.find((u) => u.key === toUnit)!;
  const crossesCategory = fromMeta.category !== toMeta.category;

  const v = parseFloat(value);
  const result =
    v || v === 0
      ? convertKitchenUnit(
          v,
          fromUnit,
          toUnit,
          crossesCategory ? ingredient : undefined
        )
      : null;

  return (
    <div className="w-full max-w-md mx-auto rounded-xl bg-white border border-concrete-dark shadow-sm p-5">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="kc-value"
            className="block text-sm font-semibold text-graphite mb-1"
          >
            Value
          </label>
          <input
            id="kc-value"
            type="number"
            inputMode="decimal"
            min="0"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full rounded-lg border-2 border-concrete-dark px-3 py-2 text-base focus:outline-none focus:border-steel"
          />
        </div>

        <div>
          <label
            htmlFor="kc-from"
            className="block text-sm font-semibold text-graphite mb-1"
          >
            From
          </label>
          <select
            id="kc-from"
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value as KitchenUnit)}
            className="w-full rounded-lg border-2 border-concrete-dark px-3 py-2 text-base focus:outline-none focus:border-steel bg-white"
          >
            {UNIT_META.map((u) => (
              <option key={u.key} value={u.key}>
                {u.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="kc-to"
            className="block text-sm font-semibold text-graphite mb-1"
          >
            To
          </label>
          <select
            id="kc-to"
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value as KitchenUnit)}
            className="w-full rounded-lg border-2 border-concrete-dark px-3 py-2 text-base focus:outline-none focus:border-steel bg-white"
          >
            {UNIT_META.map((u) => (
              <option key={u.key} value={u.key}>
                {u.label}
              </option>
            ))}
          </select>
        </div>

        {crossesCategory && (
          <div>
            <label
              htmlFor="kc-ingredient"
              className="block text-sm font-semibold text-graphite mb-1"
            >
              Ingredient
            </label>
            <select
              id="kc-ingredient"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value as IngredientKey)}
              className="w-full rounded-lg border-2 border-concrete-dark px-3 py-2 text-base focus:outline-none focus:border-steel bg-white"
            >
              {INGREDIENT_OPTIONS.map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
            <p className="text-xs text-neutral-500 mt-1">
              Volume-to-weight needs an ingredient, since a cup of flour and a
              cup of honey don&apos;t weigh the same.
            </p>
          </div>
        )}
      </div>

      {result !== null && (
        <div className="readout-panel mt-6 rounded-lg p-5">
          <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-1">
            Result
          </p>
          <p className="readout-digits text-3xl font-semibold">
            {result.toLocaleString(undefined, { maximumFractionDigits: 3 })}
          </p>
          <p className="text-sm text-neutral-300 mt-1">{toMeta.label}</p>

          {onSave && (
            <button
              onClick={() => {
                hapticTap();
                onSave({
                  input: { value, fromUnit, toUnit, ingredient },
                  result: { value: result, unit: toMeta.label },
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
