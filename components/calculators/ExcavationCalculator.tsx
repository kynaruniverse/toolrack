"use client";

import { useState } from "react";
import { calculateExcavation, Unit, ExcavationResult } from "@/lib/calculations";
import { hapticTap } from "@/lib/haptics";

export interface ExcavationFormState {
  unit: Unit;
  length: string;
  width: string;
  depth: string;
  wastePercent: number;
}

export default function ExcavationCalculator({
  initialInput,
  onSave,
}: {
  initialInput?: Partial<ExcavationFormState>;
  onSave?: (entry: { input: ExcavationFormState; result: ExcavationResult }) => void;
}) {
  const [unit, setUnit] = useState<Unit>(initialInput?.unit ?? "metric");
  const [length, setLength] = useState(initialInput?.length ?? "");
  const [width, setWidth] = useState(initialInput?.width ?? "");
  const [depth, setDepth] = useState(initialInput?.depth ?? "");
  const [wastePercent, setWastePercent] = useState(initialInput?.wastePercent ?? 5);

  const l = parseFloat(length);
  const w = parseFloat(width);
  const d = parseFloat(depth);
  const valid = l > 0 && w > 0 && d > 0;

  const result = valid
    ? calculateExcavation({ length: l, width: w, depth: d, unit, wastePercent })
    : null;

  const lengthUnit = unit === "metric" ? "m" : "ft";

  return (
    <div className="w-full max-w-md mx-auto ticket-edge relative bg-kraft border border-kraft-line rounded-sm p-5 pt-7">
      <div className="rocker flex mb-6 rounded-lg p-1" role="radiogroup" aria-label="Unit system">
        {(["metric", "imperial"] as Unit[]).map((u) => (
          <button
            key={u}
            onClick={() => {
              hapticTap();
              setUnit(u);
            }}
            role="radio"
            aria-checked={unit === u}
            className={`tactile flex-1 py-2 rounded-md text-sm font-semibold uppercase tracking-wide transition ${
              unit === u ? "bg-ink text-kraft shadow" : "text-neutral-600"
            }`}
          >
            {u === "metric" ? "Metric (m)" : "Imperial (ft)"}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <Field id="excavation-length" label={`Length (${lengthUnit})`} value={length} onChange={setLength} />
        <Field id="excavation-width" label={`Width (${lengthUnit})`} value={width} onChange={setWidth} />
        <Field id="excavation-depth" label={`Depth (${lengthUnit})`} value={depth} onChange={setDepth} />

        <div>
          <label htmlFor="excavation-waste" className="block text-sm font-semibold text-ink mb-1">
            Extra allowance: <span className="text-ink">{wastePercent}%</span>
          </label>
          <input
            id="excavation-waste"
            type="range"
            min={0}
            max={20}
            value={wastePercent}
            onChange={(e) => setWastePercent(Number(e.target.value))}
            aria-valuetext={`${wastePercent}%`}
            className="w-full accent-safety"
          />
        </div>
      </div>

      {result && (
        <div className="carbon-slip mt-6 rounded-lg p-5">
          <p className="text-[11px] uppercase tracking-widest text-ink/50 mb-1">
            Volume to excavate
          </p>
          <p className="carbon-digits text-3xl font-semibold mb-3">
            {result.volumeM3} m³
          </p>
          <p className="text-sm text-ink/70 leading-relaxed">
            Once dug, bulked spoil is roughly{" "}
            <span className="carbon-digits font-semibold">
              {result.bulkedSpoilM3} m³
            </span>{" "}
            — that&apos;s about{" "}
            <span className="carbon-digits font-semibold">
              {result.skipsRequired} skip{result.skipsRequired > 1 ? "s" : ""}
            </span>{" "}
            (8-yard) to clear it.
          </p>

          {onSave && (
            <button
              onClick={() => {
                hapticTap();
                onSave({
                  input: { unit, length, width, depth, wastePercent },
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

function Field({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-ink mb-1">{label}</label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0"
        className="w-full rounded-lg border-2 border-kraft-line px-3 py-2 text-base focus:outline-none focus:border-safety focus:ring-2 focus:ring-safety/25"
      />
    </div>
  );
}
