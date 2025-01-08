export default function Footer() {
      return (
        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">VocalHost.ai</h3>
                <p className="text-gray-400">
                  Revolutionizing business calls with AI-powered solutions.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="#home" className="text-gray-400 hover:text-white">Home</a></li>
                  <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
                  <li><a href="#pricing" className="text-gray-400 hover:text-white">Pricing</a></li>
                  <li><a href="#signup" className="text-gray-400 hover:text-white">Sign Up</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                <p className="text-gray-400">Email: support@vocalhost.ai</p>
                <p className="text-gray-400">Phone: +1 (123) 456-7890</p>
              </div>
            </div>
          </div>
        </footer>
      );
    }
