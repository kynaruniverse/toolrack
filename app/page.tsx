import Link from "next/link";

const tools = [
  {
    name: "Concrete Calculator",
    href: "/concrete-calculator",
    description: "Cubic metres, bags required, and estimated cost for your slab.",
  },
  {
    name: "Brick Calculator",
    href: "/brick-calculator",
    description: "Bricks and mortar needed for your wall, waste allowance included.",
  },
  {
    name: "Material Cost Calculator",
    href: "/material-cost-calculator",
    description: "Add up materials, labour, and margin to build a quick job quote.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-12">
      <div className="max-w-md mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">ToolRack</h1>
        <p className="text-neutral-600">
          The digital toolbox for skilled trades. Fast, reliable calculators —
          no sign-up, no clutter, built for the job site.
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="block rounded-xl border border-neutral-300 bg-white p-4 hover:border-neutral-900 transition"
          >
            <h2 className="font-semibold text-neutral-900">{tool.name}</h2>
            <p className="text-sm text-neutral-600 mt-1">{tool.description}</p>
          </Link>
        ))}
      </div>

      <p className="text-center text-sm text-neutral-400 mt-10">
        More tools and trades coming soon.
      </p>
    </main>
  );
}