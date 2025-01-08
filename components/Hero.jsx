import { useState } from 'react';

    export default function Hero() {
      const [phoneNumber, setPhoneNumber] = useState('');
      const [loading, setLoading] = useState(false);
      const [message, setMessage] = useState('');

      const handleCallTest = async () => {
        if (!phoneNumber) {
          setMessage('Please enter a valid phone number.');
          return;
        }

        setLoading(true);
        setMessage('');

        try {
          const response = await fetch('/api/test-call', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNumber }),
          });
          const data = await response.json();
          setMessage(data.message || 'Call initiated successfully!');
        } catch (error) {
          setMessage('Failed to initiate call. Please try again.');
        } finally {
          setLoading(false);
        }
      };

      return (
        <div className="flex flex-col items-center justify-center text-center h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white relative">
          {/* Particle Background */}
          <Particles
            className="absolute top-0 left-0 w-full h-full"
            init={particlesInit}
            options={{
              particles: {
                number: { value: 50 },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: { value: 0.3 },
                size: { value: 3 },
                move: { enable: true, speed: 1 },
              },
            }}
          />

          {/* Hero Content */}
          <div className="relative z-10">
            <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
              Revolutionize Your Business Calls
            </h1>
            <p className="text-lg font-light mb-8">
              AI-powered call handling and customer interaction, seamlessly integrated.
            </p>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Enter your phone number"
                className="p-3 rounded-lg w-64 text-black shadow-lg"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <button
                onClick={handleCallTest}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:shadow-xl"
              >
                {loading ? 'Calling...' : 'Call Me Now'}
              </button>
            </div>
            {message && <p className="mt-4 text-sm">{message}</p>}
          </div>
        </div>
      );
    }
