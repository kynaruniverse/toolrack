import Link from "next/link";

export default function ToolHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="pegboard px-6 pt-8 pb-10">
      <div className="max-w-md mx-auto">
        <Link
          href="/"
          className="inline-block text-xs font-semibold uppercase tracking-wider text-safety mb-4"
        >
          ← Back to the rack
        </Link>
        <h1 className="font-display uppercase text-3xl tracking-tight text-white mb-2">
          {title}
        </h1>
        <p className="text-neutral-300 text-sm leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
}
