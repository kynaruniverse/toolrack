"use client";

import { useState } from "react";
import { calculateRebarWeight, RebarResult } from "@/lib/calculations";
import { hapticTap } from "@/lib/haptics";

const STANDARD_DIAMETERS = [6, 8, 10, 12, 16, 20, 25, 32];

export interface RebarFormState {
  diameterMm: number;
  barLengthM: string;
  numberOfBars: string;
}

export default function RebarCalculator({
  initialInput,
  onSave,
}: {
  initialInput?: Partial<RebarFormState>;
  onSave?: (entry: { input: RebarFormState; result: RebarResult }) => void;
}) {
  const [diameterMm, setDiameterMm] = useState(initialInput?.diameterMm ?? 12);
  const [barLengthM, setBarLengthM] = useState(initialInput?.barLengthM ?? "6");
  const [numberOfBars, setNumberOfBars] = useState(initialInput?.numberOfBars ?? "1");

  const bl = parseFloat(barLengthM);
  const nb = parseFloat(numberOfBars);
  const valid = bl > 0 && nb > 0;

  const result = valid
    ? calculateRebarWeight({ diameterMm, barLengthM: bl, numberOfBars: nb })
    : null;

  return (
    <div className="w-full max-w-md mx-auto ticket-edge relative bg-kraft border border-kraft-line rounded-sm p-5 pt-7">
      <div className="mb-4">
        <label id="rebar-diameter-label" className="block text-sm font-semibold text-ink mb-2">
          Bar diameter (mm)
        </label>
        <div className="grid grid-cols-4 gap-2" role="radiogroup" aria-labelledby="rebar-diameter-label">
          {STANDARD_DIAMETERS.map((d) => (
            <button
              key={d}
              onClick={() => {
                hapticTap();
                setDiameterMm(d);
              }}
              role="radio"
              aria-checked={diameterMm === d}
              className={`tactile py-2 rounded-lg border-2 text-sm font-semibold transition ${
                diameterMm === d
                  ? "border-safety-dark bg-safety text-ink"
                  : "border-kraft-line text-neutral-600"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Field id="rebar-bar-length" label="Length per bar (m)" value={barLengthM} onChange={setBarLengthM} />
        <Field id="rebar-number-of-bars" label="Number of bars" value={numberOfBars} onChange={setNumberOfBars} />
      </div>

      {result && (
        <div className="carbon-slip mt-6 rounded-lg p-5">
          <p className="text-[11px] uppercase tracking-widest text-ink/50 mb-1">
            Total weight
          </p>
          <p className="carbon-digits text-3xl font-semibold mb-3">
            {result.totalWeightKg} kg
          </p>
          <p className="text-sm text-ink/70 leading-relaxed">
            {diameterMm}mm bar weighs{" "}
            <span className="carbon-digits font-semibold">
              {result.weightPerMetreKg} kg/m
            </span>{" "}
            over a total length of{" "}
            <span className="carbon-digits font-semibold">
              {result.totalLengthM} m
            </span>
            .
          </p>

          {onSave && (
            <button
              onClick={() => {
                hapticTap();
                onSave({
                  input: { diameterMm, barLengthM, numberOfBars },
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

      <p className="text-xs text-neutral-500 mt-4">
        Estimate only, based on standard steel density — always check bar spec with your supplier.
      </p>
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
