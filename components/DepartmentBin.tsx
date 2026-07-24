import Link from "next/link";
import { Rack } from "@/lib/types";
import DepartmentIcon from "@/components/DepartmentIcon";

export default function DepartmentBin({ rack }: { rack: Rack }) {
  const dim = rack.comingSoon;

  const content = (
    <div className="flex flex-col items-center" style={{ perspective: "500px" }}>
      {/* Glass icon panel — floats above the pedestal, tilted slightly for depth */}
      <div
        className={`glass-panel relative w-16 h-16 rounded-2xl flex items-center justify-center mb-[-14px] z-10 ${
          dim ? "is-dim" : ""
        }`}
        style={{ transform: "perspective(500px) rotateX(8deg)" }}
      >
        <div className="glass-streak absolute inset-0 rounded-2xl pointer-events-none" />
        <DepartmentIcon
          name={rack.icon}
          className={`w-7 h-7 relative ${
            dim ? "text-neutral-400" : "text-white"
          }`}
        />
      </div>

      {/* Glow seam between glass panel and pedestal */}
      <div
        className={`glow-ring w-10 ${dim ? "bg-neutral-500/40" : "bg-safety"}`}
      />

      {/* Pedestal base */}
      <div
        className={`pedestal w-20 h-8 rounded-xl ${dim ? "is-dim" : ""}`}
      />

      <div className="text-center mt-3">
        <p
          className={`font-display uppercase text-xs tracking-wide leading-tight ${
            dim ? "text-neutral-500" : "text-graphite"
          }`}
        >
          {rack.name}
        </p>
        <p className="text-[10px] text-neutral-500 mt-0.5">{rack.tagline}</p>
      </div>
    </div>
  );

  if (dim) {
    return <div className="opacity-80">{content}</div>;
  }

  return (
    <Link href={`/departments/${rack.slug}`} className="block group">
      <div className="transition-transform group-active:scale-95">
        {content}
      </div>
    </Link>
  );
}
