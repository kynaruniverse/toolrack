import { HardHat, ChefHat, Wrench, Zap, Briefcase } from "lucide-react";
import { DepartmentIconName } from "@/lib/types";

const ICONS = {
  construction: HardHat,
  catering: ChefHat,
  plumbing: Wrench,
  electrician: Zap,
  business: Briefcase,
} as const;

export default function DepartmentIcon({
  name,
  className = "w-6 h-6",
}: {
  name: DepartmentIconName;
  className?: string;
}) {
  const Icon = ICONS[name];
  return <Icon className={className} strokeWidth={2} />;
}
