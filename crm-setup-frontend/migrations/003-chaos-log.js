export const up = async (db) => {
      await db.exec(`
        CREATE TABLE IF NOT EXISTS chaos_events (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          type TEXT NOT NULL,
          status TEXT NOT NULL,
          service TEXT,
          error TEXT,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX idx_chaos_type ON chaos_events(type);
        CREATE INDEX idx_chaos_status ON chaos_events(status);
      `);
    };

    export const down = async (db) => {
      await db.exec(`
        DROP TABLE IF EXISTS chaos_events;
      `);
    };
