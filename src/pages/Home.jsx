export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            The future of money is here
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Buy, sell, and manage your crypto portfolio securely and easily.
            Join millions of users around the world using Coinbase.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/signup"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
            >
              Get started
            </a>

            <a
              href="/learn"
              className="rounded-full bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-200 transition"
            >
              Learn more
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}