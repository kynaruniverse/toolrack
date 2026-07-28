"use client";

import { useState } from "react";
import { convertUnit, CONVERSION_UNITS, ConversionCategory } from "@/lib/calculations";
import { hapticTap } from "@/lib/haptics";

const CATEGORIES: { key: ConversionCategory; label: string }[] = [
  { key: "length", label: "Length" },
  { key: "area", label: "Area" },
  { key: "volume", label: "Volume" },
  { key: "weight", label: "Weight" },
];

export interface UnitConverterFormState {
  category: ConversionCategory;
  value: string;
  fromKey: string;
  toKey: string;
}

export default function UnitConverter({
  initialInput,
  onSave,
}: {
  initialInput?: Partial<UnitConverterFormState>;
  onSave?: (entry: {
    input: UnitConverterFormState;
    result: { value: number; unit: string };
  }) => void;
}) {
  const [category, setCategory] = useState<ConversionCategory>(initialInput?.category ?? "length");
  const [value, setValue] = useState(initialInput?.value ?? "1");
  const [fromKey, setFromKey] = useState(initialInput?.fromKey ?? CONVERSION_UNITS.length[2].key); // m
  const [toKey, setToKey] = useState(initialInput?.toKey ?? CONVERSION_UNITS.length[4].key); // ft

  const units = CONVERSION_UNITS[category];
  const v = parseFloat(value);
  const result = v || v === 0 ? convertUnit(v, category, fromKey, toKey) : null;

  const selectCategory = (c: ConversionCategory) => {
    setCategory(c);
    setFromKey(CONVERSION_UNITS[c][0].key);
    setToKey(CONVERSION_UNITS[c][1].key);
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-xl bg-white border border-concrete-dark shadow-sm p-5">
      <div className="grid grid-cols-4 gap-2 mb-6" role="radiogroup" aria-label="Conversion category">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => {
              hapticTap();
              selectCategory(c.key);
            }}
            role="radio"
            aria-checked={category === c.key}
            className={`tactile py-2 rounded-lg border-2 text-xs font-semibold uppercase tracking-wide transition ${
              category === c.key
                ? "border-safety-dark bg-safety text-graphite"
                : "border-concrete-dark text-neutral-600"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="converter-value" className="block text-sm font-semibold text-graphite mb-1">Value</label>
          <input
            id="converter-value"
            type="number"
            inputMode="decimal"
            min="0"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full rounded-lg border-2 border-concrete-dark px-3 py-2 text-base focus:outline-none focus:ring-0 focus:border-steel"
          />
        </div>

        <div>
          <label htmlFor="converter-from" className="block text-sm font-semibold text-graphite mb-1">From</label>
          <select
            id="converter-from"
            value={fromKey}
            onChange={(e) => setFromKey(e.target.value)}
            className="w-full rounded-lg border-2 border-concrete-dark px-3 py-2 text-base focus:outline-none focus:border-steel bg-white"
          >
            {units.map((u) => (
              <option key={u.key} value={u.key}>
                {u.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="converter-to" className="block text-sm font-semibold text-graphite mb-1">To</label>
          <select
            id="converter-to"
            value={toKey}
            onChange={(e) => setToKey(e.target.value)}
            className="w-full rounded-lg border-2 border-concrete-dark px-3 py-2 text-base focus:outline-none focus:border-steel bg-white"
          >
            {units.map((u) => (
              <option key={u.key} value={u.key}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {result !== null && (
        <div className="readout-panel mt-6 rounded-lg p-5">
          <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-1">
            Result
          </p>
          <p className="readout-digits text-3xl font-semibold">
            {result.toLocaleString(undefined, { maximumFractionDigits: 4 })}
          </p>
          <p className="text-sm text-neutral-300 mt-1">
            {units.find((u) => u.key === toKey)?.label}
          </p>

          {onSave && (
            <button
              onClick={() => {
                hapticTap();
                onSave({
                  input: { category, value, fromKey, toKey },
                  result: {
                    value: result,
                    unit: units.find((u) => u.key === toKey)?.label ?? "",
                  },
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
