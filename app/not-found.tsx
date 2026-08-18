import Link from "next/link";

export const metadata = {
  title: "Page Not Found — ToolRack",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-ink flex flex-col">
      <div className="px-6 pt-14 pb-16 flex-1 flex items-center">
        <div className="max-w-md mx-auto text-center">
          <p className="font-mono uppercase tracking-[0.3em] text-safety text-xs mb-3">
            No ticket on file
          </p>
          <span className="stamp inline-block text-chit border-chit px-4 py-1 text-4xl mb-4">
            Void
          </span>
          <h1 className="font-display uppercase text-6xl tracking-tight text-kraft mb-4">
            404
          </h1>
          <p className="font-body text-neutral-400 leading-relaxed mb-8">
            That ticket isn&apos;t in the book. It might&apos;ve been torn
            out, or the number&apos;s wrong — either way, let&apos;s get you
            back to the corkboard.
          </p>
          <Link
            href="/"
            className="inline-block bg-safety text-ink font-display uppercase tracking-wide text-sm px-6 py-3 rounded-sm"
          >
            Back to all departments
          </Link>
        </div>
      </div>
    </main>
  );
}
