import { open } from 'sqlite';
    import sqlite3 from 'sqlite3';

    export default async function handler(req, res) {
      const { subdomain } = req.query;

      if (!subdomain) {
        return res.status(400).json({ message: 'Subdomain is required' });
      }

      const db = await open({
        filename: './crm.db',
        driver: sqlite3.Database,
      });

      try {
        const existing = await db.get(
          'SELECT * FROM subdomains WHERE subdomain = ?',
          subdomain
        );

        res.status(200).json({ available: !existing });
      } catch (error) {
        console.error('Error checking subdomain:', error);
        res.status(500).json({ message: 'Failed to check subdomain availability' });
      }
    }
