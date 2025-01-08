export default function Home() {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">CRM Setup Platform</h1>
            <p className="text-gray-600 mb-8">
              Welcome to the CRM setup platform. Please navigate to the registration or dashboard pages.
            </p>
            <div className="space-x-4">
              <a
                href="/register"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Register
              </a>
              <a
                href="/dashboard"
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Dashboard
              </a>
            </div>
          </div>
        </div>
      );
    }
