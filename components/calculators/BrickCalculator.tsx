"use client";

import { useState } from "react";
import { calculateBrick, Unit } from "@/lib/calculations";

export default function BrickCalculator() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [wallLength, setWallLength] = useState("");
  const [wallHeight, setWallHeight] = useState("");
  const [brickLengthMm, setBrickLengthMm] = useState("215");
  const [brickHeightMm, setBrickHeightMm] = useState("65");
  const [mortarJointMm, setMortarJointMm] = useState("10");
  const [wastePercent, setWastePercent] = useState(10);

  const wl = parseFloat(wallLength);
  const wh = parseFloat(wallHeight);
  const bl = parseFloat(brickLengthMm);
  const bh = parseFloat(brickHeightMm);
  const mj = parseFloat(mortarJointMm);

  const valid = wl > 0 && wh > 0 && bl > 0 && bh > 0 && mj >= 0;

  const result = valid
    ? calculateBrick({
        wallLength: wl,
        wallHeight: wh,
        unit,
        brickLengthMm: bl,
        brickHeightMm: bh,
        mortarJointMm: mj,
        wastePercent,
      })
    : null;

  const lengthUnit = unit === "metric" ? "m" : "ft";

  return (
    <div className="w-full max-w-md mx-auto">
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

      <div className="space-y-4">
        <Field label={`Wall length (${lengthUnit})`} value={wallLength} onChange={setWallLength} />
        <Field label={`Wall height (${lengthUnit})`} value={wallHeight} onChange={setWallHeight} />
        <Field label="Brick length (mm)" value={brickLengthMm} onChange={setBrickLengthMm} />
        <Field label="Brick height (mm)" value={brickHeightMm} onChange={setBrickHeightMm} />
        <Field label="Mortar joint (mm)" value={mortarJointMm} onChange={setMortarJointMm} />

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
      </div>

      {result && (
        <div className="mt-6 rounded-xl bg-neutral-900 text-white p-5">
          <p className="text-sm text-neutral-300 mb-1">You'll need approximately</p>
          <p className="text-2xl font-bold mb-3">{result.bricksRequired} bricks</p>
          <p className="text-sm text-neutral-300 mb-1">
            For a wall area of {result.wallAreaM2.toFixed(2)} m², including a {wastePercent}% waste allowance.
          </p>
          <p className="text-sm text-neutral-300 mt-2">
            Estimated mortar: <span className="text-white font-semibold">{result.mortarBagsEstimate} bags</span> (25kg, ~100 bricks per bag)
          </p>
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