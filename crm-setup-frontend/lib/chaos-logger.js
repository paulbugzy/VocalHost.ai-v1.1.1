import { open } from 'sqlite';
    import sqlite3 from 'sqlite3';
    import logger from './logger';

    const dbPromise = open({
      filename: './chaos.db',
      driver: sqlite3.Database
    });

    export async function logChaosEvent(event) {
      const db = await dbPromise;
      try {
        await db.run(
          `INSERT INTO chaos_events 
          (type, status, service, error, timestamp)
          VALUES (?, ?, ?, ?, ?)`,
          [
            event.type,
            event.status,
            event.service || 'global',
            event.error || null,
            new Date().toISOString()
          ]
        );
        logger.info(`Chaos event logged: ${event.type} - ${event.status}`);
      } catch (error) {
        logger.error('Failed to log chaos event:', error);
      }
    }

    export async function getChaosEvents() {
      const db = await dbPromise;
      return db.all(
        `SELECT * FROM chaos_events 
        ORDER BY timestamp DESC`
      );
    }
