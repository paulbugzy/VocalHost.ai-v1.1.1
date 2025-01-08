import { open } from 'sqlite';
    import sqlite3 from 'sqlite3';

    export async function POST(request) {
      const { subdomain, userId } = await request.json();

      const db = await open({
        filename: './crm.db',
        driver: sqlite3.Database
      });

      try {
        await db.run(
          'INSERT INTO subdomains (subdomain, user_id, status) VALUES (?, ?, ?)',
          [subdomain, userId, 'pending']
        );

        // TODO: Add Cloudflare API call to create DNS record

        return Response.json({ success: true });
      } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
      }
    }
