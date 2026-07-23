"use client";

import { useState } from "react";
import {
  calculateConcrete,
  Unit,
  CONCRETE_MIX_PRESETS,
} from "@/lib/calculations";

export default function ConcreteCalculator() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState(""); // mm
  const [wastePercent, setWastePercent] = useState(10);
  const [method, setMethod] = useState<"premix" | "traditional">("premix");
  const [bagSizeKg, setBagSizeKg] = useState<20 | 25>(25);
  const [pricePerBag, setPricePerBag] = useState("");
  const [mixIndex, setMixIndex] = useState(0);

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
        method,
        bagSizeKg: method === "premix" ? bagSizeKg : undefined,
        pricePerBag: method === "premix" && price > 0 ? price : undefined,
        mixRatio: method === "traditional" ? CONCRETE_MIX_PRESETS[mixIndex] : undefined,
      })
    : null;

  const lengthUnit = unit === "metric" ? "m" : "ft";

  return (
    <div className="w-full max-w-md mx-auto rounded-xl bg-white border border-concrete-dark shadow-sm p-5">
      {/* Rocker unit toggle */}
      <div className="rocker flex mb-4 rounded-lg p-1" role="radiogroup" aria-label="Unit system">
        {(["metric", "imperial"] as Unit[]).map((u) => (
          <button
            key={u}
            onClick={() => setUnit(u)}
            role="radio"
            aria-checked={unit === u}
            className={`flex-1 py-2 rounded-md text-sm font-semibold uppercase tracking-wide transition ${
              unit === u ? "bg-graphite text-white shadow" : "text-neutral-600"
            }`}
          >
            {u === "metric" ? "Metric (m)" : "Imperial (ft)"}
          </button>
        ))}
      </div>

      {/* Mix method */}
      <div className="rocker flex mb-6 rounded-lg p-1" role="radiogroup" aria-label="Mix method">
        {(["premix", "traditional"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMethod(m)}
            role="radio"
            aria-checked={method === m}
            className={`flex-1 py-2 rounded-md text-xs font-semibold uppercase tracking-wide transition ${
              method === m ? "bg-graphite text-white shadow" : "text-neutral-600"
            }`}
          >
            {m === "premix" ? "Pre-mix bags" : "Mix my own"}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="space-y-4">
        <Field id="concrete-length" label={`Length (${lengthUnit})`} value={length} onChange={setLength} />
        <Field id="concrete-width" label={`Width (${lengthUnit})`} value={width} onChange={setWidth} />
        <Field id="concrete-depth" label="Depth (mm)" value={depth} onChange={setDepth} />

        <div>
          <label htmlFor="concrete-waste" className="block text-sm font-semibold text-graphite mb-1">
            Waste allowance: <span className="text-steel">{wastePercent}%</span>
          </label>
          <input
            id="concrete-waste"
            type="range"
            min={0}
            max={25}
            value={wastePercent}
            onChange={(e) => setWastePercent(Number(e.target.value))}
            aria-valuetext={`${wastePercent}%`}
            className="w-full accent-safety"
          />
        </div>

        {method === "premix" ? (
          <>
            <div>
              <label id="concrete-bag-size-label" className="block text-sm font-semibold text-graphite mb-1">
                Bag size
              </label>
              <div className="flex gap-2" role="radiogroup" aria-labelledby="concrete-bag-size-label">
                {[20, 25].map((size) => (
                  <button
                    key={size}
                    onClick={() => setBagSizeKg(size as 20 | 25)}
                    role="radio"
                    aria-checked={bagSizeKg === size}
                    className={`flex-1 py-2 rounded-lg border-2 text-sm font-semibold transition ${
                      bagSizeKg === size
                        ? "border-safety-dark bg-safety text-graphite"
                        : "border-concrete-dark text-neutral-600"
                    }`}
                  >
                    {size}kg
                  </button>
                ))}
              </div>
            </div>
            <Field
              id="concrete-price-per-bag"
              label="Price per bag (£, optional)"
              value={pricePerBag}
              onChange={setPricePerBag}
            />
          </>
        ) : (
          <div>
            <label id="concrete-mix-ratio-label" className="block text-sm font-semibold text-graphite mb-1">
              Mix ratio
            </label>
            <div className="space-y-2" role="radiogroup" aria-labelledby="concrete-mix-ratio-label">
              {CONCRETE_MIX_PRESETS.map((preset, i) => (
                <button
                  key={preset.label}
                  onClick={() => setMixIndex(i)}
                  role="radio"
                  aria-checked={mixIndex === i}
                  className={`w-full text-left py-2 px-3 rounded-lg border-2 text-sm font-medium transition ${
                    mixIndex === i
                      ? "border-safety-dark bg-safety text-graphite"
                      : "border-concrete-dark text-neutral-600"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Digital readout */}
      {result && (
        <div className="readout-panel mt-6 rounded-lg p-5">
          <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-1">
            You&apos;ll need approximately
          </p>
          <p className="readout-digits text-3xl font-semibold mb-3">
            {result.volumeWithWasteM3.toFixed(2)} m³
          </p>
          <p className="text-sm text-neutral-300 leading-relaxed">
            That&apos;s roughly{" "}
            <span className="readout-digits font-semibold">
              {result.bucketsOf13L} buckets
            </span>{" "}
            or{" "}
            <span className="readout-digits font-semibold">
              {result.wheelbarrowsOf65L} wheelbarrow loads
            </span>{" "}
            — handy for quick on-site estimation.
          </p>

          {result.bagsRequired !== null && (
            <p className="text-sm text-neutral-300 mt-3 pt-3 border-t border-gunmetal">
              <span className="readout-digits font-semibold">
                {result.bagsRequired} bags
              </span>{" "}
              ({bagSizeKg}kg each), including a {wastePercent}% allowance.
            </p>
          )}
          {result.estimatedCost !== null && (
            <p className="text-sm text-neutral-300 mt-2">
              Estimated material cost:{" "}
              <span className="readout-digits font-semibold">
                £{result.estimatedCost.toFixed(2)}
              </span>
            </p>
          )}

          {result.mix && (
            <div className="text-sm text-neutral-300 mt-3 pt-3 border-t border-gunmetal space-y-1">
              <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-1">
                Mix breakdown
              </p>
              <p>
                Cement:{" "}
                <span className="readout-digits font-semibold">
                  {result.mix.cementBags} bags
                </span>{" "}
                (25kg)
              </p>
              <p>
                Sand:{" "}
                <span className="readout-digits font-semibold">
                  {result.mix.sandM3} m³
                </span>
              </p>
              {result.mix.aggregateM3 > 0 && (
                <p>
                  Aggregate:{" "}
                  <span className="readout-digits font-semibold">
                    {result.mix.aggregateM3} m³
                  </span>
                </p>
              )}
            </div>
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
      <label htmlFor={id} className="block text-sm font-semibold text-graphite mb-1">{label}</label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0"
        className="w-full rounded-lg border-2 border-concrete-dark px-3 py-2 text-base focus:outline-none focus:border-steel"
      />
    </div>
  );
}
