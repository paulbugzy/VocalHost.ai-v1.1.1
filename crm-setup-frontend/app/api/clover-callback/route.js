import { open } from 'sqlite';
    import sqlite3 from 'sqlite3';

    export async function GET(request) {
      const { searchParams } = new URL(request.url);
      const code = searchParams.get('code');
      const userId = 1; // TODO: Get from session

      try {
        // Exchange code for access token
        const tokenResponse = await fetch('https://www.clover.com/oauth/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            client_id: process.env.CLOVER_CLIENT_ID,
            client_secret: process.env.CLOVER_CLIENT_SECRET,
            code,
            grant_type: 'authorization_code'
          })
        });

        const { access_token, merchant_id } = await tokenResponse.json();

        // Save credentials
        const db = await open({
          filename: './crm.db',
          driver: sqlite3.Database
        });

        await db.run(
          `INSERT INTO clover_integrations 
          (user_id, merchant_id, access_token) 
          VALUES (?, ?, ?)`,
          [userId, merchant_id, access_token]
        );

        return Response.redirect('/dashboard');
      } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
      }
    }
