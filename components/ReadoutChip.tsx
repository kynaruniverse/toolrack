export default function ReadoutChip({
  value,
  label,
}: {
  value?: string | number;
  label: string;
}) {
  return (
    <span className="inline-flex items-baseline gap-1.5 rounded bg-graphite px-2 py-0.5">
      {value !== undefined && (
        <span className="readout-digits text-sm font-semibold">{value}</span>
      )}
      <span className="text-[10px] uppercase tracking-wide text-neutral-400">
        {label}
      </span>
    </span>
  );
}