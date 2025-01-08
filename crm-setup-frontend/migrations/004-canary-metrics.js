export const up = async (db) => {
      await db.exec(`
        CREATE TABLE IF NOT EXISTS canary_metrics (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          version TEXT NOT NULL,
          success_rate REAL NOT NULL,
          error_rate REAL NOT NULL,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX idx_canary_version ON canary_metrics(version);
      `);
    };

    export const down = async (db) => {
      await db.exec(`
        DROP TABLE IF EXISTS canary_metrics;
      `);
    };
