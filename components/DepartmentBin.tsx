import Link from "next/link";
import { Rack } from "@/lib/types";
import DepartmentIcon from "@/components/DepartmentIcon";

export default function DepartmentBin({ rack }: { rack: Rack }) {
  const content = (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`bin-lip w-full h-1.5 ${
          rack.comingSoon ? "bg-neutral-400" : "bg-safety-dark"
        }`}
      />
      <div
        className={`storage-bin w-full aspect-square flex items-center justify-center ${
          rack.comingSoon ? "bg-neutral-300" : "bg-safety"
        }`}
      >
        <DepartmentIcon
          name={rack.icon}
          className={`w-7 h-7 ${
            rack.comingSoon ? "text-neutral-500" : "text-graphite"
          }`}
        />
      </div>
      <div className="text-center mt-0.5">
        <p
          className={`font-display uppercase text-xs tracking-wide leading-tight ${
            rack.comingSoon ? "text-neutral-500" : "text-graphite"
          }`}
        >
          {rack.name}
        </p>
        <p className="text-[10px] text-neutral-500 mt-0.5">{rack.tagline}</p>
      </div>
    </div>
  );

  if (rack.comingSoon) {
    return <div className="opacity-70">{content}</div>;
  }

  return (
    <Link href={`/departments/${rack.slug}`} className="block group">
      <div className="transition-transform group-hover:-translate-y-0.5">
        {content}
      </div>
    </Link>
  );
}
