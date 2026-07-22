"use client";

import { useState } from "react";
import { calculateRebarWeight } from "@/lib/calculations";

const STANDARD_DIAMETERS = [6, 8, 10, 12, 16, 20, 25, 32];

export default function RebarCalculator() {
  const [diameterMm, setDiameterMm] = useState(12);
  const [barLengthM, setBarLengthM] = useState("6");
  const [numberOfBars, setNumberOfBars] = useState("1");

  const bl = parseFloat(barLengthM);
  const nb = parseFloat(numberOfBars);
  const valid = bl > 0 && nb > 0;

  const result = valid
    ? calculateRebarWeight({ diameterMm, barLengthM: bl, numberOfBars: nb })
    : null;

  return (
    <div className="w-full max-w-md mx-auto rounded-xl bg-white border border-concrete-dark shadow-sm p-5">
      <div className="mb-4">
        <label className="block text-sm font-semibold text-graphite mb-2">
          Bar diameter (mm)
        </label>
        <div className="grid grid-cols-4 gap-2">
          {STANDARD_DIAMETERS.map((d) => (
            <button
              key={d}
              onClick={() => setDiameterMm(d)}
              className={`py-2 rounded-lg border-2 text-sm font-semibold transition ${
                diameterMm === d
                  ? "border-safety-dark bg-safety text-graphite"
                  : "border-concrete-dark text-neutral-600"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Field label="Length per bar (m)" value={barLengthM} onChange={setBarLengthM} />
        <Field label="Number of bars" value={numberOfBars} onChange={setNumberOfBars} />
      </div>

      {result && (
        <div className="readout-panel mt-6 rounded-lg p-5">
          <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-1">
            Total weight
          </p>
          <p className="readout-digits text-3xl font-semibold mb-3">
            {result.totalWeightKg} kg
          </p>
          <p className="text-sm text-neutral-300 leading-relaxed">
            {diameterMm}mm bar weighs{" "}
            <span className="readout-digits font-semibold">
              {result.weightPerMetreKg} kg/m
            </span>{" "}
            over a total length of{" "}
            <span className="readout-digits font-semibold">
              {result.totalLengthM} m
            </span>
            .
          </p>
        </div>
      )}

      <p className="text-xs text-neutral-500 mt-4">
        Estimate only, based on standard steel density — always check bar spec with your supplier.
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-graphite mb-1">{label}</label>
      <input
        type="number"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0"
        className="w-full rounded-lg border-2 border-concrete-dark px-3 py-2 text-base focus:outline-none focus:border-steel"
      />
    </div>
  );
}
