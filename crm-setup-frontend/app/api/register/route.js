import { open } from 'sqlite';
    import sqlite3 from 'sqlite3';
    import { registerSchema } from '../../lib/validation';
    import { errorHandler } from '../../lib/error-handler';
    import { rateLimit } from '../../lib/rate-limiter';

    export async function POST(request) {
      try {
        const ip = request.ip || request.headers.get('x-forwarded-for') || '127.0.0.1';
        await rateLimit('auth', ip);

        const body = await request.json();
        const data = registerSchema.parse(body);

        const db = await open({
          filename: './crm.db',
          driver: sqlite3.Database
        });

        // Check if email or subdomain exists
        const [emailExists, subdomainExists] = await Promise.all([
          db.get('SELECT id FROM users WHERE email = ?', data.email),
          db.get('SELECT id FROM subdomains WHERE subdomain = ?', data.subdomain)
        ]);

        if (emailExists) {
          throw new APIError('Email already registered', 409);
        }

        if (subdomainExists) {
          throw new APIError('Subdomain not available', 409);
        }

        // Create user
        const result = await db.run(
          `INSERT INTO users (name, email, password, package)
          VALUES (?, ?, ?, ?)`,
          [data.name, data.email, data.password, data.package]
        );

        return Response.json({ 
          success: true,
          userId: result.lastID
        });
      } catch (error) {
        return errorHandler(error);
      }
    }
