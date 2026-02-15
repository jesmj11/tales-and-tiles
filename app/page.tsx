import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6" style={{ color: '#002D04' }}>
            📮 Tales & Tiles
          </h1>
          <p className="text-2xl font-medium mb-12" style={{ color: '#617480' }}>
            Your stories. Your photos. Real postcards, shipped fast.
          </p>
          
          <div className="bg-gray-50 rounded-2xl shadow-lg p-12 mb-12 border border-gray-200">
            <h2 className="text-3xl font-bold mb-8" style={{ color: '#20262A' }}>How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-5xl mb-4">📸</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#08283E' }}>1. Upload Photo</h3>
                <p style={{ color: '#617480' }}>Choose your favorite travel moment</p>
              </div>
              <div>
                <div className="text-5xl mb-4">✍️</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#08283E' }}>2. Write Message</h3>
                <p style={{ color: '#617480' }}>Add your personal touch</p>
              </div>
              <div>
                <div className="text-5xl mb-4">📬</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#08283E' }}>3. Ships Fast!</h3>
                <p style={{ color: '#617480' }}>Delivered in 3-5 days</p>
              </div>
            </div>
          </div>

          <Link 
            href="/create"
            className="inline-block text-white text-xl font-bold px-12 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#00890B' }}
          >
            Create Your Postcard →
          </Link>

          <div className="mt-12" style={{ color: '#20262A' }}>
            <p className="text-lg font-semibold">Only $3.99 per postcard • Ships in 3-5 days • Worldwide delivery</p>
          </div>
        </div>
      </div>
    </main>
  );
}
