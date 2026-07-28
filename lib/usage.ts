const STORAGE_KEY = "toolrack:toolUsage";

interface UsageMap {
  [toolSlug: string]: number;
}

function readUsage(): UsageMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UsageMap) : {};
  } catch {
    return {};
  }
}

function writeUsage(usage: UsageMap): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
}

export function recordToolVisit(slug: string): void {
  const usage = readUsage();
  usage[slug] = (usage[slug] || 0) + 1;
  writeUsage(usage);
}

export function getTopTools(limit: number): string[] {
  const usage = readUsage();
  return Object.entries(usage)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([slug]) => slug);
}
