export default function ReadoutChip({
  value,
  label,
}: {
  value?: string | number;
  label: string;
}) {
  return (
    <span className="inline-flex items-baseline gap-1.5 rounded-sm bg-ink px-2 py-0.5">
      {value !== undefined && (
        <span className="font-mono text-kraft text-sm font-semibold tabular-nums">{value}</span>
      )}
      <span className="text-[10px] uppercase tracking-wide text-kraft/60">
        {label}
      </span>
    </span>
  );
}
