'use client';

'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-6"
      style={{ backgroundImage: "url('/data2.png')" }}
    >
      <div className="max-w-2xl bg-white/80 backdrop-blur-md rounded-lg shadow-xl p-10 text-center">
        <h1 className="text-4xl font-bold text-[#1a73e8] mb-4">
        📂 Commercial Data Dashboard
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          An interactive platform to explore, filter, and preview open datasets provided by Saudi Arabia’s Open Data Platform.
        </p>
        <Link
          href="/dashboard"
          className="inline-block bg-[#1a73e8] text-white px-6 py-3 rounded-md text-lg hover:bg-[#0c57c1] transition"
        >
          Enter Dashboard →
        </Link>
      </div>
    </main>
  );
}
