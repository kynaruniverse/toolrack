"use client";

import { useState } from "react";
import { calculateBrick, Unit, MORTAR_MIX_PRESETS } from "@/lib/calculations";

const UNIT_PRESETS = {
  brick: { label: "Brick", lengthMm: 215, heightMm: 65 },
  block: { label: "Block (CMU)", lengthMm: 440, heightMm: 215 },
};

export default function BrickCalculator() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [unitType, setUnitType] = useState<"brick" | "block">("brick");
  const [wallLength, setWallLength] = useState("");
  const [wallHeight, setWallHeight] = useState("");
  const [brickLengthMm, setBrickLengthMm] = useState(String(UNIT_PRESETS.brick.lengthMm));
  const [brickHeightMm, setBrickHeightMm] = useState(String(UNIT_PRESETS.brick.heightMm));
  const [mortarJointMm, setMortarJointMm] = useState("10");
  const [mortarBagSizeKg, setMortarBagSizeKg] = useState<20 | 25>(25);
  const [mortarMixIndex, setMortarMixIndex] = useState(0);
  const [wastePercent, setWastePercent] = useState(10);

  const selectUnitType = (type: "brick" | "block") => {
    setUnitType(type);
    setBrickLengthMm(String(UNIT_PRESETS[type].lengthMm));
    setBrickHeightMm(String(UNIT_PRESETS[type].heightMm));
  };

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
        unitType,
        brickLengthMm: bl,
        brickHeightMm: bh,
        mortarJointMm: mj,
        mortarBagSizeKg,
        mortarRatio: MORTAR_MIX_PRESETS[mortarMixIndex],
        wastePercent,
      })
    : null;

  const lengthUnit = unit === "metric" ? "m" : "ft";

  return (
    <div className="w-full max-w-md mx-auto rounded-xl bg-white border border-concrete-dark shadow-sm p-5">
      <div className="rocker flex mb-4 rounded-lg p-1">
        {(["metric", "imperial"] as Unit[]).map((u) => (
          <button
            key={u}
            onClick={() => setUnit(u)}
            className={`flex-1 py-2 rounded-md text-sm font-semibold uppercase tracking-wide transition ${
              unit === u ? "bg-graphite text-white shadow" : "text-neutral-600"
            }`}
          >
            {u === "metric" ? "Metric (m)" : "Imperial (ft)"}
          </button>
        ))}
      </div>

      <div className="rocker flex mb-6 rounded-lg p-1">
        {(["brick", "block"] as const).map((t) => (
          <button
            key={t}
            onClick={() => selectUnitType(t)}
            className={`flex-1 py-2 rounded-md text-sm font-semibold uppercase tracking-wide transition ${
              unitType === t ? "bg-graphite text-white shadow" : "text-neutral-600"
            }`}
          >
            {UNIT_PRESETS[t].label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <Field label={`Wall length (${lengthUnit})`} value={wallLength} onChange={setWallLength} />
        <Field label={`Wall height (${lengthUnit})`} value={wallHeight} onChange={setWallHeight} />
        <Field label={`${UNIT_PRESETS[unitType].label} length (mm)`} value={brickLengthMm} onChange={setBrickLengthMm} />
        <Field label={`${UNIT_PRESETS[unitType].label} height (mm)`} value={brickHeightMm} onChange={setBrickHeightMm} />
        <Field label="Mortar joint (mm)" value={mortarJointMm} onChange={setMortarJointMm} />

        <div>
          <label className="block text-sm font-semibold text-graphite mb-1">
            Mortar bag size
          </label>
          <div className="flex gap-2">
            {[20, 25].map((size) => (
              <button
                key={size}
                onClick={() => setMortarBagSizeKg(size as 20 | 25)}
                className={`flex-1 py-2 rounded-lg border-2 text-sm font-semibold transition ${
                  mortarBagSizeKg === size
                    ? "border-safety-dark bg-safety text-graphite"
                    : "border-concrete-dark text-neutral-600"
                }`}
              >
                {size}kg
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-graphite mb-1">
            Mortar mix ratio
          </label>
          <div className="space-y-2">
            {MORTAR_MIX_PRESETS.map((preset, i) => (
              <button
                key={preset.label}
                onClick={() => setMortarMixIndex(i)}
                className={`w-full text-left py-2 px-3 rounded-lg border-2 text-sm font-medium transition ${
                  mortarMixIndex === i
                    ? "border-safety-dark bg-safety text-graphite"
                    : "border-concrete-dark text-neutral-600"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-graphite mb-1">
            Waste allowance: <span className="text-steel">{wastePercent}%</span>
          </label>
          <input
            type="range"
            min={0}
            max={25}
            value={wastePercent}
            onChange={(e) => setWastePercent(Number(e.target.value))}
            className="w-full accent-safety"
          />
        </div>
      </div>

      {result && (
        <div className="readout-panel mt-6 rounded-lg p-5">
          <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-1">
            You'll need approximately
          </p>
          <p className="readout-digits text-3xl font-semibold mb-3">
            {result.bricksRequired} {unitType === "brick" ? "bricks" : "blocks"}
          </p>
          <p className="text-sm text-neutral-300 leading-relaxed">
            For a wall area of{" "}
            <span className="readout-digits font-semibold">
              {result.wallAreaM2.toFixed(2)} m²
            </span>
            , including a {wastePercent}% waste allowance.
          </p>

          <div className="text-sm text-neutral-300 mt-3 pt-3 border-t border-gunmetal space-y-1">
            <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-1">
              Mortar needed ({result.mortarVolumeM3} m³)
            </p>
            <p>
              Cement:{" "}
              <span className="readout-digits font-semibold">
                {result.mortarMix.cementBags} bags
              </span>{" "}
              ({mortarBagSizeKg}kg)
            </p>
            <p>
              Sand:{" "}
              <span className="readout-digits font-semibold">
                {result.mortarMix.sandM3} m³
              </span>
            </p>
            {result.mortarMix.aggregateM3 > 0 && (
              <p>
                Lime:{" "}
                <span className="readout-digits font-semibold">
                  {result.mortarMix.aggregateM3} m³
                </span>
              </p>
            )}
          </div>
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
