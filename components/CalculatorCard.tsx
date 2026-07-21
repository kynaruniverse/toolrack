"use client";

import { useState } from "react";
import { Tool, ToolResult } from "@/lib/types";

interface FieldConfig {
  key: string;
  label: string;
  unit?: string;
  defaultValue?: number;
}

export function CalculatorCard({
  tool,
  fields,
}: {
  tool: Tool<any>;
  fields: FieldConfig[];
}) {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(fields.map((f) => [f.key, f.defaultValue ?? 0]))
  );
  const [result, setResult] = useState<ToolResult | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(tool.compute(values));
  }

  return (
    <div className="rounded border border-rack-border bg-rack-surface p-6">
      <h1 className="text-2xl font-bold text-rack-text">{tool.name}</h1>
      <p className="mt-1 text-rack-muted">{tool.description}</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {fields.map((field) => (
          <label key={field.key} className="block">
            <span className="text-sm font-medium text-rack-muted">
              {field.label}
              {field.unit ? ` (${field.unit})` : ""}
            </span>
            <input
              type="number"
              inputMode="decimal"
              step="any"
              value={values[field.key]}
              onChange={(e) =>
                setValues((v) => ({
                  ...v,
                  [field.key]: Number(e.target.value),
                }))
              }
              className="mt-1 w-full rounded border border-rack-border bg-rack-bg px-3 py-2 text-rack-text focus-visible:border-rack-accent"
            />
          </label>
        ))}

        <button
          type="submit"
          className="w-full rounded bg-rack-accent px-4 py-3 font-semibold text-rack-bg transition-colors hover:bg-rack-accentDark"
        >
          Calculate
        </button>
      </form>

      {result && (
        <div className="mt-6 rounded border border-rack-good/30 bg-rack-bg p-4">
          <div className="text-lg font-bold text-rack-good">
            {result.summary}
          </div>
          {result.explanation && (
            <p className="mt-2 text-sm text-rack-muted">
              {result.explanation}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
