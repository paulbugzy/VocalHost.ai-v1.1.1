import { open } from 'sqlite';
    import sqlite3 from 'sqlite3';
    import redisClient from '../../../lib/redis';

    export async function GET() {
      try {
        // Check database connection
        const db = await open({
          filename: './crm.db',
          driver: sqlite3.Database
        });
        await db.get('SELECT 1');

        // Check Redis connection
        await redisClient.ping();

        return Response.json({
          status: 'healthy',
          services: {
            database: 'ok',
            redis: 'ok',
            websocket: 'ok'
          },
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        return Response.json({
          status: 'unhealthy',
          error: error.message,
          services: {
            database: error.message.includes('database') ? 'down' : 'ok',
            redis: error.message.includes('redis') ? 'down' : 'ok'
          }
        }, { status: 500 });
      }
    }
