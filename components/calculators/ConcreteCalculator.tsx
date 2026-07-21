"use client";

import { useState } from "react";
import { calculateConcrete, Unit } from "@/lib/calculations";

export default function ConcreteCalculator() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState(""); // mm
  const [wastePercent, setWastePercent] = useState(10);
  const [bagSizeKg, setBagSizeKg] = useState<20 | 25>(25);
  const [pricePerBag, setPricePerBag] = useState("");

  const l = parseFloat(length);
  const w = parseFloat(width);
  const d = parseFloat(depth);
  const price = parseFloat(pricePerBag);

  const valid = l > 0 && w > 0 && d > 0;

  const result = valid
    ? calculateConcrete({
        length: l,
        width: w,
        depth: d,
        unit,
        wastePercent,
        bagSizeKg,
        pricePerBag: price > 0 ? price : undefined,
      })
    : null;

  const lengthUnit = unit === "metric" ? "m" : "ft";

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Unit toggle */}
      <div className="flex mb-6 rounded-lg bg-neutral-200 p-1">
        {(["metric", "imperial"] as Unit[]).map((u) => (
          <button
            key={u}
            onClick={() => setUnit(u)}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
              unit === u ? "bg-white shadow text-neutral-900" : "text-neutral-500"
            }`}
          >
            {u === "metric" ? "Metric (m)" : "Imperial (ft)"}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="space-y-4">
        <Field label={`Length (${lengthUnit})`} value={length} onChange={setLength} />
        <Field label={`Width (${lengthUnit})`} value={width} onChange={setWidth} />
        <Field label="Depth (mm)" value={depth} onChange={setDepth} />

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Waste allowance: {wastePercent}%
          </label>
          <input
            type="range"
            min={0}
            max={25}
            value={wastePercent}
            onChange={(e) => setWastePercent(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Bag size
          </label>
          <div className="flex gap-2">
            {[20, 25].map((size) => (
              <button
                key={size}
                onClick={() => setBagSizeKg(size as 20 | 25)}
                className={`flex-1 py-2 rounded-lg border text-sm font-medium ${
                  bagSizeKg === size
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-300 text-neutral-700"
                }`}
              >
                {size}kg
              </button>
            ))}
          </div>
        </div>

        <Field
          label="Price per bag (£, optional)"
          value={pricePerBag}
          onChange={setPricePerBag}
        />
      </div>

      {/* Result */}
      {result && (
        <div className="mt-6 rounded-xl bg-neutral-900 text-white p-5">
          <p className="text-sm text-neutral-300 mb-1">You'll need approximately</p>
          <p className="text-2xl font-bold mb-3">
            {result.volumeWithWasteM3.toFixed(2)} m³ of concrete
          </p>
          <p className="text-sm text-neutral-300 mb-1">
            That's about <span className="text-white font-semibold">{result.bagsRequired} bags</span> ({bagSizeKg}kg each), including a {wastePercent}% allowance for uneven ground.
          </p>
          {result.estimatedCost !== null && (
            <p className="text-sm text-neutral-300 mt-2">
              Estimated material cost:{" "}
              <span className="text-white font-semibold">£{result.estimatedCost.toFixed(2)}</span>
            </p>
          )}
        </div>
      )}
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
      <label className="block text-sm font-medium text-neutral-700 mb-1">{label}</label>
      <input
        type="number"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0"
        className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-neutral-900"
      />
    </div>
  );
}