import { open } from 'sqlite';
    import sqlite3 from 'sqlite3';
    import path from 'path';
    import fs from 'fs';

    const migrationsDir = path.join(process.cwd(), 'migrations');
    const dbPath = path.join(process.cwd(), 'crm.db');

    async function runMigrations() {
      const db = await open({
        filename: dbPath,
        driver: sqlite3.Database
      });

      // Create migrations table if it doesn't exist
      await db.exec(`
        CREATE TABLE IF NOT EXISTS migrations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Get executed migrations
      const executedMigrations = await db.all(
        'SELECT name FROM migrations ORDER BY id ASC'
      );

      const executedNames = new Set(executedMigrations.map(m => m.name));

      // Get migration files
      const migrationFiles = fs.readdirSync(migrationsDir)
        .filter(file => file.endsWith('.js'))
        .sort();

      for (const file of migrationFiles) {
        if (!executedNames.has(file)) {
          console.log(`Running migration: ${file}`);
          const migration = await import(path.join(migrationsDir, file));
          await migration.up(db);
          await db.run(
            'INSERT INTO migrations (name) VALUES (?)',
            file
          );
        }
      }

      console.log('Migrations complete');
      await db.close();
    }

    runMigrations().catch(err => {
      console.error('Migration failed:', err);
      process.exit(1);
    });
