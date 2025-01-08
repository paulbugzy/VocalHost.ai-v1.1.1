import { open } from 'sqlite';
    import sqlite3 from 'sqlite3';

    async function initializeDatabase() {
      const db = await open({
        filename: './crm.db',
        driver: sqlite3.Database,
      });

      await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          fullName TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          businessName TEXT,
          phone TEXT,
          address TEXT,
          plan TEXT NOT NULL,
          subdomain TEXT UNIQUE NOT NULL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS subdomains (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          subdomain TEXT UNIQUE NOT NULL,
          userId INTEGER NOT NULL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY(userId) REFERENCES users(id)
        );
      `);

      console.log('Database initialized successfully');
    }

    initializeDatabase().catch(console.error);
