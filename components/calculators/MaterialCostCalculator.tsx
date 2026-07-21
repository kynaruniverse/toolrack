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
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-4 mb-4">
        {items.map((item, idx) => (
          <div key={item.id} className="rounded-lg border border-neutral-300 p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-neutral-700">
                Material {idx + 1}
              </span>
              {items.length > 1 && (
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-sm text-neutral-400"
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
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-base mb-2 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
            <div className="flex gap-2">
              <input
                type="number"
                inputMode="decimal"
                value={item.quantity || ""}
                onChange={(e) => updateItem(item.id, "quantity", e.target.value)}
                placeholder="Quantity"
                className="w-1/2 rounded-lg border border-neutral-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
              <input
                type="number"
                inputMode="decimal"
                value={item.unitPrice || ""}
                onChange={(e) => updateItem(item.id, "unitPrice", e.target.value)}
                placeholder="Unit price £"
                className="w-1/2 rounded-lg border border-neutral-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
          </div>
        ))}
        <button
          onClick={addItem}
          className="w-full rounded-lg border border-dashed border-neutral-400 py-2 text-sm font-medium text-neutral-600"
        >
          + Add another material
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <Field label="Labour hours" value={labourHours} onChange={setLabourHours} />
        <Field label="Labour rate (£/hr)" value={labourRate} onChange={setLabourRate} />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          Margin: {marginPercent}%
        </label>
        <input
          type="range"
          min={0}
          max={50}
          value={marginPercent}
          onChange={(e) => setMarginPercent(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {result && (
        <div className="rounded-xl bg-neutral-900 text-white p-5 space-y-1 text-sm">
          <Row label="Materials" value={result.materialTotal} />
          <Row label="Labour" value={result.labourTotal} />
          <Row label="Subtotal" value={result.subtotal} />
          <Row label={`Margin (${marginPercent}%)`} value={result.marginAmount} />
          <div className="border-t border-neutral-700 pt-2 mt-2 flex justify-between font-bold text-base">
            <span>Total quote</span>
            <span>£{result.finalQuote.toFixed(2)}</span>
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
      <span>£{value.toFixed(2)}</span>
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
    <div className="w-1/2">
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