export const up = async (db) => {
      await db.exec(`
        CREATE TABLE IF NOT EXISTS audit_logs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          action TEXT NOT NULL,
          details TEXT NOT NULL,
          ip_address TEXT,
          user_agent TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY(user_id) REFERENCES users(id)
        );

        CREATE INDEX idx_audit_user ON audit_logs(user_id);
        CREATE INDEX idx_audit_action ON audit_logs(action);
      `);
    };

    export const down = async (db) => {
      await db.exec(`
        DROP TABLE IF EXISTS audit_logs;
      `);
    };
