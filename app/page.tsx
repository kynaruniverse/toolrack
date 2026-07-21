export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold mb-2">ToolRack</h1>
      <p className="text-neutral-600 mb-8">
        The digital toolbox for skilled trades. Calculators are coming online one by one — starting here.
      </p>
      <a
        href="/concrete-calculator"
        className="rounded-lg bg-neutral-900 text-white px-5 py-3 font-medium"
      >
        Try the Concrete Calculator →
      </a>
    </main>
  );
}