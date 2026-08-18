import Link from "next/link";

export default function ToolHeader({
  title,
  subtitle,
  backHref,
  backLabel,
  code,
  accent = "site",
}: {
  title: string;
  subtitle: string;
  backHref: string;
  backLabel: string;
  code?: string;
  accent?: "site" | "chit";
}) {
  return (
    <div className="bg-ink px-6 pt-8 pb-10">
      <div className="max-w-md mx-auto">
        <Link
          href={backHref}
          className="inline-block font-mono text-xs uppercase tracking-widest text-safety mb-4"
        >
          &larr; {backLabel}
        </Link>
        <div className="flex items-start justify-between gap-3">
          <h1 className="font-display uppercase text-3xl tracking-tight text-kraft mb-2 leading-none">
            {title}
          </h1>
          {code && (
            <span
              className={`stamp shrink-0 px-1.5 py-0.5 text-[10px] uppercase mt-1 ${
                accent === "chit" ? "text-chit border-chit" : "text-safety border-safety"
              }`}
            >
              {code}
            </span>
          )}
        </div>
        <p className="font-body text-neutral-400 text-sm leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
}
