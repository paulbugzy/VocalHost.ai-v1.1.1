import { useState } from 'react';
    import StripePayment from '../components/PaymentForm';
    import ErrorAlert from '../components/ErrorAlert';
    import SuccessAlert from '../components/SuccessAlert';

    export default function SignUp() {
      const [subdomain, setSubdomain] = useState('');
      const [subdomainAvailable, setSubdomainAvailable] = useState(null);
      const [error, setError] = useState('');
      const [success, setSuccess] = useState('');

      const checkSubdomain = async () => {
        try {
          const response = await fetch(`/api/check-subdomain?subdomain=${subdomain}`);
          const data = await response.json();
          setSubdomainAvailable(data.available);
        } catch (error) {
          setError('Failed to check subdomain availability.');
        }
      };

      const handlePaymentSuccess = async () => {
        try {
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fullName: 'John Doe', // Replace with form data
              email: 'john@example.com', // Replace with form data
              password: 'password123', // Replace with form data
              businessName: 'Example Business', // Replace with form data
              phone: '1234567890', // Replace with form data
              address: '123 Main St', // Replace with form data
              plan: 'Basic', // Replace with form data
              subdomain,
            }),
          });

          if (response.ok) {
            setSuccess('Registration successful!');
          } else {
            setError('Failed to register user.');
          }
        } catch (error) {
          setError('Failed to register user.');
        }
      };

      return (
        <div className="min-h-screen py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Sign Up</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              {/* Form fields */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">CRM Subdomain</h3>
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Choose your subdomain"
                    className="p-3 border border-gray-300 rounded-lg w-full"
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={checkSubdomain}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Check Availability
                  </button>
                </div>
                {subdomainAvailable !== null && (
                  <p className={`mt-2 ${subdomainAvailable ? 'text-green-600' : 'text-red-600'}`}>
                    {subdomainAvailable ? 'Subdomain is available!' : 'Subdomain is not available.'}
                  </p>
                )}
              </div>

              {/* Payment Form */}
              <StripePayment onSuccess={handlePaymentSuccess} />
            </div>
          </div>

          {/* Error and Success Alerts */}
          <ErrorAlert message={error} onClose={() => setError('')} />
          <SuccessAlert message={success} onClose={() => setSuccess('')} />
        </div>
      );
    }
