'use client';
    import { useEffect, useState } from 'react';
    import io from 'socket.io-client';

    export default function RealTimeUpdates({ userId }) {
      const [updates, setUpdates] = useState([]);

      useEffect(() => {
        const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
          withCredentials: true
        });

        socket.on('connect', () => {
          console.log('Connected to WebSocket');
          socket.emit('subscribe', userId);
        });

        socket.on('orderUpdate', (data) => {
          setUpdates(prev => [...prev, data]);
        });

        socket.on('paymentUpdate', (data) => {
          setUpdates(prev => [...prev, data]);
        });

        return () => {
          socket.disconnect();
        };
      }, [userId]);

      return (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Real-Time Updates</h3>
          <div className="space-y-2">
            {updates.map((update, index) => (
              <div key={index} className="p-2 bg-white rounded shadow">
                <p>{update.message}</p>
                <small className="text-gray-500">
                  {new Date(update.timestamp).toLocaleTimeString()}
                </small>
              </div>
            ))}
          </div>
        </div>
      );
    }
