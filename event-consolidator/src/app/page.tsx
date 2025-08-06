export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-br from-indigo-100 via-white to-purple-100 text-gray-900">
      
      {/* Hero Section */}
      <section className="text-center max-w-2xl">
        <h1 className="text-4xl font-extrabold sm:text-5xl mb-4 text-indigo-800 drop-shadow-sm animate-fade-in">
          Discover Local Events, Instantly
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Find concerts, meetups, shows, and more happening near you — all in one dashboard.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/login"
            className="px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 rounded-lg font-semibold shadow-lg hover:shadow-xl"
          >
            Get Started
          </a>
          <a
            href="/pro"
            className="px-6 py-3 bg-white hover:bg-gray-100 text-indigo-700 border border-indigo-300 rounded-lg font-semibold transition duration-300 shadow-sm hover:shadow-md"
          >
            Learn About Pro
          </a>
        </div>
      </section>

      {/* Features Overview */}
      <section className="mt-20 max-w-3xl text-center px-4 py-8 bg-white/70 backdrop-blur-md rounded-xl shadow-xl border border-indigo-200">
        <h2 className="text-2xl font-bold text-indigo-700 mb-2">Why Our Platform?</h2>
        <p className="text-gray-700 leading-relaxed">
          Our app pulls from multiple event sources and recommends personalized experiences based on your location and preferences.
        </p>
      </section>
    </main>
  );
}