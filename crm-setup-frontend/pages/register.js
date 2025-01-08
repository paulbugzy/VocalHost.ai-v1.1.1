import { useState } from 'react';
    import axios from 'axios';

    export default function Register() {
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        subdomain: '',
        package: 'basic'
      });

      const checkSubdomain = async () => {
        try {
          const response = await axios.post('/api/check-subdomain', {
            subdomain: formData.subdomain
          });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      return (
        <div className="min-h-screen bg-gray-100 py-8">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">Register</h1>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 border rounded"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Subdomain"
                  className="flex-1 p-2 border rounded"
                  value={formData.subdomain}
                  onChange={(e) => setFormData({...formData, subdomain: e.target.value})}
                />
                <button
                  onClick={checkSubdomain}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Check
                </button>
              </div>
              <select
                className="w-full p-2 border rounded"
                value={formData.package}
                onChange={(e) => setFormData({...formData, package: e.target.value})}
              >
                <option value="basic">Basic</option>
                <option value="pro">Pro</option>
                <option value="enterprise">Enterprise</option>
              </select>
              <button className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600">
                Register
              </button>
            </div>
          </div>
        </div>
      );
    }
