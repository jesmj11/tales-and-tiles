'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function CreatePostcard() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [message, setMessage] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [recipientCity, setRecipientCity] = useState('');
  const [recipientState, setRecipientState] = useState('');
  const [recipientZip, setRecipientZip] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: upload, 2: write, 3: address

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!imageFile || !message || !recipientName || !recipientAddress) {
      alert('Please fill in all fields!');
      return;
    }

    setLoading(true);

    try {
      // Upload image first
      const formData = new FormData();
      formData.append('image', imageFile);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const { imageUrl } = await uploadRes.json();

      // Create postcard
      const postcardRes = await fetch('/api/create-postcard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl,
          message,
          to: {
            name: recipientName,
            address_line1: recipientAddress,
            address_city: recipientCity,
            address_state: recipientState,
            address_zip: recipientZip,
          },
        }),
      });

      const result = await postcardRes.json();
      
      if (result.success) {
        alert('🎉 Postcard created! Check your Lob dashboard to see it.');
        // Reset form
        setImageFile(null);
        setImagePreview('');
        setMessage('');
        setRecipientName('');
        setRecipientAddress('');
        setRecipientCity('');
        setRecipientState('');
        setRecipientZip('');
        setStep(1);
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      alert('Something went wrong!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8">Create Your Tale & Tile</h1>

        {/* Step Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-300'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Photo</span>
            </div>
            <div className="w-12 h-1 bg-gray-300"></div>
            <div className={`flex items-center ${step >= 2 ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-300'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Message</span>
            </div>
            <div className="w-12 h-1 bg-gray-300"></div>
            <div className={`flex items-center ${step >= 3 ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-300'}`}>
                3
              </div>
              <span className="ml-2 font-medium">Address</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Step 1: Upload Photo */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Upload Your Photo</h2>
              <div className="border-4 border-dashed border-gray-300 rounded-xl p-12 text-center">
                {!imagePreview ? (
                  <div>
                    <div className="text-6xl mb-4">📸</div>
                    <label className="cursor-pointer">
                      <span className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg inline-block">
                        Choose Photo
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-full max-h-96 mx-auto rounded-lg mb-4"
                    />
                    <button
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview('');
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove Photo
                    </button>
                  </div>
                )}
              </div>
              {imagePreview && (
                <button
                  onClick={() => setStep(2)}
                  className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg"
                >
                  Next: Write Message →
                </button>
              )}
            </div>
          )}

          {/* Step 2: Write Message */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Write Your Message</h2>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Dear Friend,&#10;&#10;Wish you were here! The weather is beautiful and..."
                className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg font-handwriting text-lg resize-none"
                maxLength={500}
              />
              <p className="text-sm text-gray-500 mt-2">{message.length}/500 characters</p>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!message}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg disabled:opacity-50"
                >
                  Next: Add Address →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Recipient Address */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Recipient Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Street Address</label>
                  <input
                    type="text"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg"
                    placeholder="123 Main St"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input
                      type="text"
                      value={recipientCity}
                      onChange={(e) => setRecipientCity(e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg"
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">State</label>
                    <input
                      type="text"
                      value={recipientState}
                      onChange={(e) => setRecipientState(e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg"
                      placeholder="NY"
                      maxLength={2}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ZIP Code</label>
                  <input
                    type="text"
                    value={recipientZip}
                    onChange={(e) => setRecipientZip(e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg"
                    placeholder="10001"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg"
                >
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading || !recipientName || !recipientAddress || !recipientCity || !recipientState || !recipientZip}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg disabled:opacity-50"
                >
                  {loading ? 'Creating...' : '🚀 Create Postcard ($5.99)'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
