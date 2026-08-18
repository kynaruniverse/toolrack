import Link from "next/link";

// A single pinned job ticket — the shared visual unit for browsing ToolRack.
// Department-level (homepage) tickets pass `code` and get a rotated ink
// stamp; tool-level (department page) tickets omit it and stay smaller.
// A `comingSoon` ticket renders unfilled: same shape, no ink, dashed —
// paperwork that hasn't been written on yet, rather than a greyed-out card.

interface JobTicketProps {
  title: string;
  meta: string;
  number: string; // e.g. "No. 01" or "No. CON-03"
  accent?: "site" | "chit";
  href?: string;
  comingSoon?: boolean;
  code?: string; // 2-4 letter stamp, department tickets only
  rotate?: "left" | "right";
}

const accentText = {
  site: "text-safety-dark",
  chit: "text-chit",
};

const accentBorder = {
  site: "border-safety-dark",
  chit: "border-chit",
};

export default function JobTicket({
  title,
  meta,
  number,
  accent = "site",
  href,
  comingSoon = false,
  code,
  rotate = "left",
}: JobTicketProps) {
  const rotateClass = rotate === "right" ? "rotate-[0.6deg]" : "-rotate-[0.6deg]";

  if (comingSoon) {
    return (
      <div
        className={`ticket-edge relative bg-kraft/40 border border-dashed border-kraft-line rounded-sm px-4 pt-5 pb-4 ${rotateClass}`}
      >
        <span className="absolute left-3 top-1.5 w-1.5 h-1.5 rounded-full bg-ink/25" aria-hidden />
        <span className="absolute right-3 top-2 px-1.5 py-0.5 text-[10px] tracking-widest border border-dashed border-ink/25 text-ink/35 font-display uppercase">
          Soon
        </span>
        <h3 className="font-display uppercase tracking-wide text-ink/35 text-xl pr-10 leading-none">
          {title}
        </h3>
        <p className="font-body text-xs text-ink/30 mt-1.5 leading-snug">{meta}</p>
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-dashed border-kraft-line">
          <span className="font-mono text-[10px] text-ink/25 tracking-wide">{number}</span>
        </div>
      </div>
    );
  }

  const inner = (
    <div
      className={`ticket-edge relative bg-kraft border border-kraft-line rounded-sm px-4 pt-5 pb-4 ${rotateClass} transition-transform duration-150 ${
        href ? "group-hover:rotate-0 group-hover:-translate-y-0.5" : ""
      }`}
    >
      <span className="absolute left-3 top-1.5 w-1.5 h-1.5 rounded-full bg-ink/70" aria-hidden />
      {code && (
        <span
          className={`stamp absolute right-3 top-2 px-1.5 py-0.5 text-[10px] tracking-widest uppercase ${accentText[accent]} ${accentBorder[accent]}`}
        >
          {code}
        </span>
      )}
      <h3
        className={`font-display uppercase tracking-wide text-ink leading-none ${
          code ? "text-xl pr-10" : "text-sm"
        }`}
      >
        {title}
      </h3>
      <p className="font-body text-xs text-ink/60 mt-1.5 leading-snug line-clamp-2">{meta}</p>
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-dashed border-kraft-line">
        <span className={`font-mono text-[10px] tracking-wide ${accentText[accent]}`}>{number}</span>
        {href && <span className={`text-xs ${accentText[accent]}`}>&rarr;</span>}
      </div>
    </div>
  );

  if (!href) return inner;

  return (
    <Link href={href} className="block group">
      {inner}
    </Link>
  );
}
