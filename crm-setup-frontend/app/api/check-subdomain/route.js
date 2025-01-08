import { open } from 'sqlite';
    import sqlite3 from 'sqlite3';

    export async function POST(request) {
      const { subdomain } = await request.json();

      const db = await open({
        filename: './crm.db',
        driver: sqlite3.Database
      });

      const existing = await db.get(
        'SELECT * FROM subdomains WHERE subdomain = ?',
        subdomain
      );

      return Response.json({
        available: !existing
      });
    }
