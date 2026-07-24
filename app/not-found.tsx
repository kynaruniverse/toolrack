import Link from "next/link";

export const metadata = {
  title: "Page Not Found — ToolRack",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-concrete flex flex-col">
      <div className="pegboard px-6 pt-14 pb-16 flex-1 flex items-center">
        <div className="max-w-md mx-auto text-center">
          <p className="font-display uppercase tracking-[0.3em] text-safety text-xs mb-3">
            Not on this rack
          </p>
          <h1 className="font-display uppercase text-6xl tracking-tight text-white mb-4">
            404
          </h1>
          <p className="text-neutral-300 leading-relaxed mb-8">
            That tool isn&apos;t hanging here. It might have moved, or the
            link&apos;s off — either way, let&apos;s get you back to the
            rack.
          </p>
          <Link
            href="/"
            className="inline-block bg-safety text-graphite font-display uppercase tracking-wide text-sm px-6 py-3 rounded-lg"
          >
            Back to all departments
          </Link>
        </div>
      </div>
    </main>
  );
}
