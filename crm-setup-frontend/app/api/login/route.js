import { open } from 'sqlite';
    import sqlite3 from 'sqlite3';
    import { createToken, setAuthCookie } from '../../lib/auth';

    export async function POST(request) {
      const { email, password } = await request.json();

      const db = await open({
        filename: './crm.db',
        driver: sqlite3.Database
      });

      const user = await db.get(
        'SELECT * FROM users WHERE email = ?',
        email
      );

      if (!user || user.password !== password) {
        return Response.json({ error: 'Invalid credentials' }, { status: 401 });
      }

      const token = await createToken(user.id);
      setAuthCookie(token);

      return Response.json({ success: true });
    }
