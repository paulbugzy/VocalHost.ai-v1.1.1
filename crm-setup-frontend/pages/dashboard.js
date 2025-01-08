import { useEffect, useState } from 'react';
    import axios from 'axios';

    export default function Dashboard() {
      const [dashboardData, setDashboardData] = useState({
        subdomain: '',
        crmStatus: '',
        cloverStatus: 'Not Connected'
      });

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('/api/get-dashboard-data');
            setDashboardData(response.data);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
      }, []);

      const connectClover = () => {
        window.location.href = '/api/connect-clover';
      };

      return (
        <div className="min-h-screen bg-gray-100 py-8">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Subdomain</h2>
                <p>{dashboardData.subdomain || 'Not set'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">CRM Status</h2>
                <p>{dashboardData.crmStatus || 'Not installed'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Clover Integration</h2>
                <p>Status: {dashboardData.cloverStatus}</p>
                <button
                  onClick={connectClover}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Connect Clover
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
