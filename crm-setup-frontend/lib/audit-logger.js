import { open } from 'sqlite';
    import sqlite3 from 'sqlite3';
    import logger from './logger';

    const dbPromise = open({
      filename: './audit.db',
      driver: sqlite3.Database
    });

    export async function logAuditEvent(event) {
      const db = await dbPromise;
      try {
        await db.run(
          `INSERT INTO audit_logs 
          (user_id, action, details, ip_address, user_agent)
          VALUES (?, ?, ?, ?, ?)`,
          [
            event.userId,
            event.action,
            JSON.stringify(event.details),
            event.ip,
            event.userAgent
          ]
        );
      } catch (error) {
        logger.error('Failed to log audit event:', error);
      }
    }

    export async function getAuditLogs(userId) {
      const db = await dbPromise;
      return db.all(
        `SELECT * FROM audit_logs 
        WHERE user_id = ?
        ORDER BY created_at DESC`,
        userId
      );
    }
