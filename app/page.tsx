import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            📮 Tales & Tiles
          </h1>
          <p className="text-2xl text-gray-800 font-medium mb-8">
            Your stories. Your photos. Real postcards, shipped fast.
          </p>
          
          <div className="bg-white rounded-2xl shadow-xl p-12 mb-12">
            <h2 className="text-3xl font-semibold mb-6">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-5xl mb-4">📸</div>
                <h3 className="text-xl font-semibold mb-2">1. Upload Photo</h3>
                <p className="text-gray-700">Choose your favorite travel moment</p>
              </div>
              <div>
                <div className="text-5xl mb-4">✍️</div>
                <h3 className="text-xl font-semibold mb-2">2. Write Message</h3>
                <p className="text-gray-700">Add your personal touch</p>
              </div>
              <div>
                <div className="text-5xl mb-4">📬</div>
                <h3 className="text-xl font-semibold mb-2">3. Ships Fast!</h3>
                <p className="text-gray-700">Delivered in 3-5 days</p>
              </div>
            </div>
          </div>

          <Link 
            href="/create"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white text-xl font-semibold px-12 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
          >
            Create Your Postcard →
          </Link>

          <div className="mt-12 text-gray-700">
            <p className="text-lg font-medium">Only $3.99 per postcard • Ships in 3-5 days • Worldwide delivery</p>
          </div>
        </div>
      </div>
    </main>
  );
}
