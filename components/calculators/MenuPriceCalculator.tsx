"use client";

import { useState } from "react";
import { calculateMenuPrice, PricingMethod, MenuPriceResult } from "@/lib/tools/menuPrice";
import { hapticTap } from "@/lib/haptics";

export interface MenuPriceFormState {
  cost: string;
  method: PricingMethod;
  percent: number;
}

export default function MenuPriceCalculator({
  initialInput,
  onSave,
}: {
  initialInput?: Partial<MenuPriceFormState>;
  onSave?: (entry: { input: MenuPriceFormState; result: MenuPriceResult }) => void;
}) {
  const [cost, setCost] = useState(initialInput?.cost ?? "");
  const [method, setMethod] = useState<PricingMethod>(initialInput?.method ?? "markup");
  const [percent, setPercent] = useState(initialInput?.percent ?? 50);

  const c = parseFloat(cost) || 0;
  const valid = c > 0;

  const result = valid
    ? calculateMenuPrice({ cost: c, method, percent })
    : null;

  return (
    <div className="w-full max-w-md mx-auto rounded-xl bg-white border border-concrete-dark shadow-sm p-5">
      <div
        className="rocker flex mb-4 rounded-lg p-1"
        role="radiogroup"
        aria-label="Pricing method"
      >
        {(["markup", "margin"] as PricingMethod[]).map((m) => (
          <button
            key={m}
            onClick={() => {
              hapticTap();
              setMethod(m);
            }}
            role="radio"
            aria-checked={method === m}
            className={`tactile flex-1 py-2 rounded-md text-sm font-semibold uppercase tracking-wide transition ${
              method === m ? "bg-graphite text-white shadow" : "text-neutral-600"
            }`}
          >
            {m === "markup" ? "Markup" : "Margin"}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <label
          htmlFor="menu-cost"
          className="block text-sm font-semibold text-graphite mb-1"
        >
          Dish cost (£)
        </label>
        <input
          id="menu-cost"
          type="number"
          inputMode="decimal"
          min="0"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          placeholder="e.g. 5.00"
          className="w-full rounded-lg border-2 border-concrete-dark px-3 py-2 text-base focus:outline-none focus:ring-0 focus:border-steel"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="menu-percent"
          className="block text-sm font-semibold text-graphite mb-1"
        >
          {method === "markup" ? "Markup" : "Margin"}:{" "}
          <span className="text-steel">{percent}%</span>
        </label>
        <input
          id="menu-percent"
          type="range"
          min={10}
          max={80}
          value={percent}
          onChange={(e) => setPercent(Number(e.target.value))}
          aria-valuetext={`${percent}%`}
          className="w-full accent-safety"
        />
      </div>

      {result && (
        <div className="readout-panel rounded-lg p-5 space-y-1.5 text-sm">
          <div className="flex justify-between text-neutral-300">
            <span>Profit per dish</span>
            <span className="readout-digits">£{result.profit.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-neutral-300">
            <span>
              Equivalent {method === "markup" ? "margin" : "markup"}
            </span>
            <span className="readout-digits">
              {method === "markup"
                ? result.equivalentMarginPercent
                : result.equivalentMarkupPercent}
              %
            </span>
          </div>
          <div className="border-t border-gunmetal pt-3 mt-2 flex justify-between items-baseline">
            <span className="text-xs uppercase tracking-widest text-neutral-400">
              Menu price
            </span>
            <span className="readout-digits text-xl font-semibold">
              £{result.price.toFixed(2)}
            </span>
          </div>

          {onSave && (
            <button
              onClick={() => {
                hapticTap();
                onSave({ input: { cost, method, percent }, result });
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
