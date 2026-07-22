"use client";

import { useState } from "react";
import { calculateMaterialCost, MaterialLineItem } from "@/lib/calculations";

let nextId = 1;

export default function MaterialCostCalculator() {
  const [items, setItems] = useState<MaterialLineItem[]>([
    { id: "item-0", name: "", quantity: 0, unitPrice: 0 },
  ]);
  const [labourHours, setLabourHours] = useState("");
  const [labourRate, setLabourRate] = useState("");
  const [marginPercent, setMarginPercent] = useState(15);

  const updateItem = (id: string, field: keyof MaterialLineItem, value: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: field === "name" ? value : parseFloat(value) || 0,
            }
          : item
      )
    );
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: `item-${nextId++}`, name: "", quantity: 0, unitPrice: 0 },
    ]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const lh = parseFloat(labourHours) || 0;
  const lr = parseFloat(labourRate) || 0;

  const validItems = items.filter((i) => i.quantity > 0 && i.unitPrice > 0);
  const valid = validItems.length > 0;

  const result = valid
    ? calculateMaterialCost({
        items: validItems,
        labourHours: lh,
        labourRate: lr,
        marginPercent,
      })
    : null;

  return (
    <div className="w-full max-w-md mx-auto rounded-xl bg-white border border-concrete-dark shadow-sm p-5">
      <div className="space-y-4 mb-4">
        {items.map((item, idx) => (
          <div key={item.id} className="rounded-lg border-2 border-concrete-dark p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Material {idx + 1}
              </span>
              {items.length > 1 && (
                <button
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove material ${idx + 1}`}
                  className="text-xs font-semibold uppercase tracking-wide text-steel"
                >
                  Remove
                </button>
              )}
            </div>
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateItem(item.id, "name", e.target.value)}
              placeholder="e.g. Timber"
              aria-label={`Material ${idx + 1} name`}
              className="w-full rounded-lg border-2 border-concrete-dark px-3 py-2 text-base mb-2 focus:outline-none focus:border-steel"
            />
            <div className="flex gap-2">
              <input
                type="number"
                inputMode="decimal"
                min="0"
                value={item.quantity || ""}
                onChange={(e) => updateItem(item.id, "quantity", e.target.value)}
                placeholder="Quantity"
                aria-label={`Material ${idx + 1} quantity`}
                className="w-1/2 rounded-lg border-2 border-concrete-dark px-3 py-2 text-base focus:outline-none focus:border-steel"
              />
              <input
                type="number"
                inputMode="decimal"
                min="0"
                value={item.unitPrice || ""}
                onChange={(e) => updateItem(item.id, "unitPrice", e.target.value)}
                placeholder="Unit price £"
                aria-label={`Material ${idx + 1} unit price`}
                className="w-1/2 rounded-lg border-2 border-concrete-dark px-3 py-2 text-base focus:outline-none focus:border-steel"
              />
            </div>
          </div>
        ))}
        <button
          onClick={addItem}
          className="w-full rounded-lg border-2 border-dashed border-neutral-400 py-2 text-sm font-semibold uppercase tracking-wide text-neutral-600"
        >
          + Add another material
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <Field id="material-labour-hours" label="Labour hours" value={labourHours} onChange={setLabourHours} />
        <Field id="material-labour-rate" label="Labour rate (£/hr)" value={labourRate} onChange={setLabourRate} />
      </div>

      <div className="mb-4">
        <label htmlFor="material-margin" className="block text-sm font-semibold text-graphite mb-1">
          Margin: <span className="text-steel">{marginPercent}%</span>
        </label>
        <input
          id="material-margin"
          type="range"
          min={0}
          max={50}
          value={marginPercent}
          onChange={(e) => setMarginPercent(Number(e.target.value))}
          aria-valuetext={`${marginPercent}%`}
          className="w-full accent-safety"
        />
      </div>

      {result && (
        <div className="readout-panel rounded-lg p-5 space-y-1.5 text-sm">
          <Row label="Materials" value={result.materialTotal} />
          <Row label="Labour" value={result.labourTotal} />
          <Row label="Subtotal" value={result.subtotal} />
          <Row label={`Margin (${marginPercent}%)`} value={result.marginAmount} />
          <div className="border-t border-gunmetal pt-3 mt-2 flex justify-between items-baseline">
            <span className="text-xs uppercase tracking-widest text-neutral-400">
              Total quote
            </span>
            <span className="readout-digits text-xl font-semibold">
              £{result.finalQuote.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between text-neutral-300">
      <span>{label}</span>
      <span className="readout-digits">£{value.toFixed(2)}</span>
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
    <div className="w-1/2">
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
